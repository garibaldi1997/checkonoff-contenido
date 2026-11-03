#!/usr/bin/env python3
"""Radar de reels del nicho (Business Discovery de Instagram).

Lee las cuentas públicas de radar/cuentas.txt (empresas y creadores de RRHH, nómina y negocio en México),
toma sus publicaciones recientes y marca las que rindieron muy por encima del promedio de su propia cuenta
(likes + 3 × comentarios). Guarda estado/radar.json y estado/radar.md para que el plan semanal adapte los formatos.
No descarga ni vuelve a publicar contenido de otros: solo analiza qué funcionó.
"""
import json, os, statistics, urllib.parse, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

R = Path(__file__).resolve().parents[1]
GRAPH = "https://graph.facebook.com/" + os.environ.get("GRAPH_VERSION", "v26.0")
TOKEN = os.environ.get("META_TOKEN_CHECKONOFF", "").strip()
IG = "17841415891192650"  # Instagram de CheckONOFF
CAMPOS = "username,name,followers_count,media_count,media.limit(30){id,media_type,media_product_type,caption,like_count,comments_count,timestamp,permalink}"


def consultar(usuario):
    q = urllib.parse.urlencode({"fields": f"business_discovery.username({usuario}){{{CAMPOS}}}", "access_token": TOKEN})
    try:
        with urllib.request.urlopen(f"{GRAPH}/{IG}?{q}", timeout=60) as r:
            return json.load(r)["business_discovery"]
    except urllib.error.HTTPError as e:
        return {"error": json.load(e).get("error", {}).get("message", str(e))[:160]}


def main():
    cuentas = [l.strip().lstrip("@") for l in (R / "radar/cuentas.txt").read_text().splitlines() if l.strip() and not l.startswith("#")]
    salida, destacados, fallas = {}, [], []
    for u in cuentas:
        d = consultar(u)
        if "error" in d:
            fallas.append(f"@{u}: {d['error']}"); continue
        posts = d.get("media", {}).get("data", [])
        score = lambda p: (p.get("like_count") or 0) + 3 * (p.get("comments_count") or 0)
        med = statistics.median([score(p) for p in posts]) if posts else 0
        salida[u] = {"seguidores": d.get("followers_count"), "publicaciones": d.get("media_count"), "mediana": med}
        for p in posts:
            s = score(p)
            if med and s >= 3 * med and s >= 30:
                destacados.append({"cuenta": u, "seguidores": d.get("followers_count"), "veces_promedio": round(s / med, 1),
                                   "tipo": p.get("media_product_type") or p.get("media_type"), "likes": p.get("like_count"),
                                   "comentarios": p.get("comments_count"), "fecha": p.get("timestamp", "")[:10],
                                   "enlace": p.get("permalink"), "texto": (p.get("caption") or "")[:300]})
    destacados.sort(key=lambda x: -x["veces_promedio"])
    ahora = datetime.now(timezone.utc).isoformat(timespec="seconds")
    (R / "estado/radar.json").write_text(json.dumps({"revisado": ahora, "cuentas": salida, "destacados": destacados, "fallas": fallas}, ensure_ascii=False, indent=1))
    md = [f"# Radar de reels del nicho\n_Revisado: {ahora}_\n", "## Lo que más funcionó (vs. el promedio de su propia cuenta)\n"]
    for x in destacados[:25]:
        md.append(f"- **{x['veces_promedio']}×** · @{x['cuenta']} ({x['seguidores']} seg.) · {x['tipo']} · {x['likes']} likes, {x['comentarios']} coment. · {x['fecha']} · [ver]({x['enlace']})\n  > {x['texto'][:160].replace(chr(10), ' ')}")
    md.append("\n## Cuentas revisadas\n" + "\n".join(f"- @{u}: {v['seguidores']} seguidores, mediana {v['mediana']}" for u, v in salida.items()))
    if fallas:
        md.append("\n## No se pudieron leer\n" + "\n".join(f"- {f}" for f in fallas))
    (R / "estado/radar.md").write_text("\n".join(md) + "\n")
    print("\n".join(md))


if __name__ == "__main__":
    main()
