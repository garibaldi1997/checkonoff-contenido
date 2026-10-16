#!/usr/bin/env python3
"""Lleva a LinkedIn (perfil de Garibaldi) el mejor contenido diario de Dieloxia.

Lee el calendario público de garibaldi1997/dieloxia-contenido y, cuando una pieza
ya salió en el Instagram de Dieloxia, la publica una vez en LinkedIn.
Por defecto solo el carrusel del día (1 post diario), para no saturar el perfil.
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
TIPOS = {"carrusel"}          # qué piezas de Dieloxia van a LinkedIn
MAX_DIA = 1                   # máximo de posts de Dieloxia por día en LinkedIn
VENTANA = timedelta(hours=36)
CDMX = timezone(timedelta(hours=-6))
PIE = "\n\n🤖 Esto lo comparto desde Dieloxia, mi proyecto de asistentes de WhatsApp con IA para negocios (con control humano en 1 clic). Más tips en instagram.com/dieloxia · dieloxia.com"


def leer(ruta):
    with urllib.request.urlopen(BASE + urllib.parse.quote(ruta), timeout=60) as r:
        return r.read()


def main():
    token = os.environ.get("LINKEDIN_TOKEN_GARIBALDI", "").strip()
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
    li = CuentaLinkedIn(token)
    for e in sorted(cal, key=lambda x: x["fecha"]):
        if ya_hoy >= MAX_DIA:
            break
        if e["id"] in estado or e.get("tipo") not in TIPOS:
            continue
        ig = (pub.get(e["id"]) or {}).get("instagram") or {}
        if not ig.get("id") or ig.get("borrado"):
            continue  # solo lo que ya salió bien en Instagram
        if ahora - datetime.fromisoformat(e["fecha"]) > VENTANA:
            continue
        texto = e.get("texto_linkedin") or (texto_linkedin(e.get("texto", "")) + PIE)
        with tempfile.TemporaryDirectory() as tmp:
            rutas = []
            for i, img in enumerate(e.get("imagenes", [])[:9]):
                ruta = os.path.join(tmp, f"{i:02d}.jpg")
                open(ruta, "wb").write(leer(img))
                rutas.append(ruta)
            try:
                pid = li.publicar(texto, imagenes=rutas)
            except ErrorLinkedIn as err:
                print(f"❌ {e['id']}: {err}")
                return 1
        estado[e["id"]] = {"id": pid, "dia": hoy, "fecha": ahora.isoformat(timespec="seconds")}
        ya_hoy += 1
        print(f"✅ Dieloxia → LinkedIn: {e['id']} ({pid})")
        json.dump(estado, open(ESTADO, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    return 0


if __name__ == "__main__":
    sys.exit(main())
