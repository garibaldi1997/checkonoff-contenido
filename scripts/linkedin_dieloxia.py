#!/usr/bin/env python3
"""Lleva a la página de LinkedIn de Dieloxia el mejor contenido diario de Dieloxia.

Lee el calendario público de garibaldi1997/dieloxia-contenido y, cuando una pieza
ya salió en el Instagram de Dieloxia, la publica una vez en LinkedIn.
Hasta 3 piezas al día (carrusel, un reel y un post de imagen), separadas al menos 2 horas
y solo entre 8:00 y 21:00 (hora CDMX), para equilibrar con las publicaciones de CheckONOFF.
Estado en estado/linkedin_dieloxia.json.
"""
import json
import os
import sys
import tempfile
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from linkedin import CuentaLinkedIn, ErrorLinkedIn, texto_linkedin  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ESTADO = os.path.join(RAIZ, "estado", "linkedin_dieloxia.json")
BASE = "https://raw.githubusercontent.com/garibaldi1997/dieloxia-contenido/main/"
TIPOS = {"carrusel": 0, "reel": 1, "imagen": 2}   # qué piezas van a LinkedIn y en qué prioridad
MAX_DIA = 3                   # máximo de posts de Dieloxia por día en LinkedIn (1 por tipo)
SEPARACION = timedelta(hours=2)
HORARIO = (8, 21)             # horas CDMX en que se publica
VENTANA = timedelta(hours=36)
CDMX = timezone(timedelta(hours=-6))
PIE = "\n\n🤖 Dieloxia: asistentes de WhatsApp con IA para negocios, con control humano en 1 clic. Más tips en instagram.com/dieloxia · dieloxia.com"
ORG_DIELOXIA = "143944437"  # página de empresa de Dieloxia en LinkedIn


def leer(ruta):
    with urllib.request.urlopen(BASE + urllib.parse.quote(ruta), timeout=60) as r:
        return r.read()


def main():
    # Token de páginas (app Publiqo Pages); el mismo que usa la página de CheckONOFF
    token = os.environ.get("LINKEDIN_TOKEN_CHECKONOFF", "").strip()
    if not token:
        print("⏸️ Sin token de LinkedIn")
        return 0
    try:
        cal = json.loads(leer("calendario.json"))
        pub = json.loads(leer("estado/publicados.json"))
    except Exception as err:  # noqa: BLE001
        print(f"⚠️ No se pudo leer el calendario de Dieloxia: {err}")
        return 0
    estado = json.load(open(ESTADO, encoding="utf-8")) if os.path.exists(ESTADO) else {}
    ahora = datetime.now(timezone.utc)
    hoy = ahora.astimezone(CDMX).date().isoformat()
    ya_hoy = sum(1 for v in estado.values() if v.get("dia") == hoy)
    tipos_hoy = {v.get("tipo") for v in estado.values() if v.get("dia") == hoy}
    ultimo = max((datetime.fromisoformat(v["fecha"]) for v in estado.values() if v.get("fecha")), default=None)
    if not HORARIO[0] <= ahora.astimezone(CDMX).hour < HORARIO[1]:
        print("⏸️ Fuera del horario de LinkedIn")
        return 0
    if ultimo and ahora - ultimo < SEPARACION:
        print("⏸️ Aún no pasan 2 h desde el último post de Dieloxia en LinkedIn")
        return 0
    li = CuentaLinkedIn(token, ORG_DIELOXIA)
    # Prioridad: carrusel, luego el reel (primero los reels con historia), luego un post de imagen; lo más reciente primero
    orden = lambda x: (TIPOS.get(x.get("tipo"), 9), "historia" not in x["id"], -datetime.fromisoformat(x["fecha"]).timestamp())
    for e in sorted(cal, key=orden):
        if ya_hoy >= MAX_DIA:
            break
        if e["id"] in estado or e.get("tipo") not in TIPOS or e.get("tipo") in tipos_hoy:
            continue
        ig = (pub.get(e["id"]) or {}).get("instagram") or {}
        if not ig.get("id") or ig.get("borrado"):
            continue  # solo lo que ya salió bien en Instagram
        if ahora - datetime.fromisoformat(e["fecha"]) > VENTANA:
            continue
        base = "\n".join(l for l in e.get("texto", "").splitlines() if "BOT" not in l)  # lección: sin "Escríbenos BOT"
        texto = e.get("texto_linkedin") or (texto_linkedin(base).strip() + PIE)
        with tempfile.TemporaryDirectory() as tmp:
            rutas = []
            for i, img in enumerate(e.get("imagenes", [])[:9]):
                ruta = os.path.join(tmp, f"{i:02d}.jpg")
                open(ruta, "wb").write(leer(img))
                rutas.append(ruta)
            video = None
            if e.get("tipo") == "reel" and e.get("video"):
                video = os.path.join(tmp, "reel.mp4")
                open(video, "wb").write(leer(e["video"]))
            try:
                pid = li.publicar(texto, imagenes=rutas, video=video)
            except ErrorLinkedIn as err:
                print(f"❌ {e['id']}: {err}")
                return 1
        estado[e["id"]] = {"id": pid, "dia": hoy, "tipo": e.get("tipo"), "fecha": ahora.isoformat(timespec="seconds")}
        ya_hoy += 1
        json.dump(estado, open(ESTADO, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print(f"✅ Dieloxia → LinkedIn: {e['id']} ({pid})")
        break  # una pieza por corrida; la siguiente respeta la separación de 2 h
    return 0


if __name__ == "__main__":
    sys.exit(main())
