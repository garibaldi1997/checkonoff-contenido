#!/usr/bin/env python3
"""Publica al momento en las páginas de LinkedIn el carrusel más reciente de CheckONOFF y de Dieloxia.

Uso manual (acción "LinkedIn: publicar ahora en las páginas"). No toca el registro normal
(estado/publicados.json); guarda lo publicado en estado/linkedin_paginas.json para no repetir.
"""
import json
import os
import sys
import tempfile
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from linkedin import CuentaLinkedIn, ErrorLinkedIn, texto_linkedin  # noqa: E402
import linkedin_dieloxia as dx  # noqa: E402

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ESTADO = os.path.join(RAIZ, "estado", "linkedin_paginas.json")
ORG_CHECKONOFF = "144005971"


def ultimo_carrusel(cal, publicado):
    hechos = [e for e in cal if e.get("tipo") == "carrusel" and publicado(e)]
    return max(hechos, key=lambda e: e["fecha"]) if hechos else None


def main():
    token = os.environ.get("LINKEDIN_TOKEN_CHECKONOFF", "").strip()
    if not token:
        print("⏸️ Sin LINKEDIN_TOKEN_CHECKONOFF")
        return 1
    estado = json.load(open(ESTADO, encoding="utf-8")) if os.path.exists(ESTADO) else {}
    ahora = datetime.now(timezone.utc).isoformat(timespec="seconds")
    errores = 0

    # CheckONOFF: carrusel más reciente ya publicado en Instagram
    cal = json.load(open(os.path.join(RAIZ, "calendario.json"), encoding="utf-8"))
    pub = json.load(open(os.path.join(RAIZ, "estado", "publicados.json"), encoding="utf-8"))
    e = ultimo_carrusel([x for x in cal if x.get("cuenta") == "checkonoff"], lambda x: (pub.get(x["id"]) or {}).get("instagram", {}).get("id"))
    clave = f"checkonoff:{e['id']}" if e else None
    if e and clave not in estado:
        try:
            li = CuentaLinkedIn(token, ORG_CHECKONOFF)
            texto = e.get("texto_linkedin") or texto_linkedin(e.get("texto", ""))
            pid = li.publicar(texto, imagenes=[os.path.join(RAIZ, i) for i in e.get("imagenes", [])])
            estado[clave] = {"id": pid, "fecha": ahora}
            print(f"✅ CheckONOFF → página de LinkedIn: {e['id']} ({pid})")
        except ErrorLinkedIn as err:
            print(f"❌ CheckONOFF: {err}"); errores += 1

    # Dieloxia: carrusel más reciente ya publicado en su Instagram
    cal_d = json.loads(dx.leer("calendario.json"))
    pub_d = json.loads(dx.leer("estado/publicados.json"))
    e = ultimo_carrusel(cal_d, lambda x: (pub_d.get(x["id"]) or {}).get("instagram", {}).get("id"))
    clave = f"dieloxia:{e['id']}" if e else None
    if e and clave not in estado:
        try:
            li = CuentaLinkedIn(token, dx.ORG_DIELOXIA)
            base = "\n".join(l for l in e.get("texto", "").splitlines() if "BOT" not in l)
            texto = e.get("texto_linkedin") or (texto_linkedin(base).strip() + dx.PIE)
            with tempfile.TemporaryDirectory() as tmp:
                rutas = []
                for i, img in enumerate(e.get("imagenes", [])[:9]):
                    ruta = os.path.join(tmp, f"{i:02d}.jpg")
                    open(ruta, "wb").write(dx.leer(img))
                    rutas.append(ruta)
                pid = li.publicar(texto, imagenes=rutas)
            estado[clave] = {"id": pid, "fecha": ahora}
            print(f"✅ Dieloxia → página de LinkedIn: {e['id']} ({pid})")
        except ErrorLinkedIn as err:
            print(f"❌ Dieloxia: {err}"); errores += 1

    json.dump(estado, open(ESTADO, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    return 1 if errores else 0


if __name__ == "__main__":
    sys.exit(main())
