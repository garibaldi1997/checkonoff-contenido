"""Anuncios de Meta (Marketing API) para CheckONOFF.

Reglas del dueño: las campañas se crean SIEMPRE en pausa; nunca se activan ni se sube el gasto sin su autorización escrita.

  python scripts/anuncios.py verificar   → revisa el acceso (solo lectura) y deja estado/anuncios.json

Variables: META_ADS_TOKEN (secreto), META_AD_ACCOUNT (p. ej. act_1648565720071394), GRAPH_VERSION.
"""
import json, os, pathlib, sys, urllib.parse, urllib.request
from datetime import datetime, timezone

GRAPH = "https://graph.facebook.com/" + os.environ.get("GRAPH_VERSION", "v26.0")
TOKEN = os.environ.get("META_ADS_TOKEN", "").strip()
CUENTA = os.environ.get("META_AD_ACCOUNT", "act_1648565720071394")
ESTADO = pathlib.Path(__file__).resolve().parent.parent / "estado" / "anuncios.json"


def get(ruta, **params):
    params["access_token"] = TOKEN
    try:
        with urllib.request.urlopen(f"{GRAPH}/{ruta}?{urllib.parse.urlencode(params)}", timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        return {"error": json.load(e).get("error", {}).get("message", str(e))}


def verificar():
    if not TOKEN:
        sys.exit("Falta el secreto META_ADS_TOKEN.")
    res = {"revisado": datetime.now(timezone.utc).isoformat(timespec="seconds"),
           "usuario": get("me", fields="id,name"),
           "cuenta": get(CUENTA, fields="name,account_status,currency,timezone_name,amount_spent,spend_cap,funding_source_details"),
           "campanas": get(f"{CUENTA}/campaigns", fields="name,status,objective,daily_budget", limit=25),
           "paginas": get("me/accounts", fields="name,id")}
    if isinstance(res["cuenta"].get("funding_source_details"), dict):  # solo el tipo, nunca datos de la tarjeta
        res["cuenta"]["funding_source_details"] = {"tipo": res["cuenta"]["funding_source_details"].get("type")}
    ESTADO.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False, indent=1))
    if any("error" in v for v in res.values() if isinstance(v, dict)):
        sys.exit(1)


if __name__ == "__main__":
    {"verificar": verificar}[sys.argv[1] if len(sys.argv) > 1 else "verificar"]()
