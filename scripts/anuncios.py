"""Anuncios de Meta (Marketing API) para CheckONOFF.

Reglas del dueño: las campañas se crean SIEMPRE en pausa; nunca se activan ni se sube el gasto sin su autorización escrita.

  python scripts/anuncios.py verificar        → revisa el acceso (solo lectura) y deja estado/anuncios.json
  python scripts/anuncios.py crear <clave>    → crea EN PAUSA la campaña de campana/anuncios/<clave>.json (no gasta nada)
  Si el json trae "tipo": "enlace", crea anuncios de imagen (A/B) que llevan a un enlace (p. ej. el grupo de WhatsApp),
  con un conjunto por grupo de posiciones (feed / historias) y un anuncio por imagen.
  python scripts/anuncios.py metricas         → resultados por anuncio de cada campaña de estado/campanas.json → estado/anuncios_metricas.json
  python scripts/anuncios.py activar <clave> <dias>  → SOLO con autorización escrita del dueño: enciende campaña, conjuntos y anuncios con fecha de fin
  python scripts/anuncios.py pausar <ad_id>   → pausa un anuncio (solo baja el gasto; activar o subir gasto requiere al dueño)
  python scripts/anuncios.py renovar <clave>  → borra el anuncio en pausa y lo vuelve a crear con el video actual (p. ej. tras corregir el audio)

Variables: META_ADS_TOKEN (secreto), META_AD_ACCOUNT (p. ej. act_1648565720071394), GRAPH_VERSION.
"""
import base64, json, os, pathlib, sys, time, urllib.parse, urllib.request
from datetime import datetime, timedelta, timezone

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


def post(ruta, **params):
    datos = {k: (json.dumps(v) if isinstance(v, (dict, list)) else v) for k, v in params.items()}
    datos["access_token"] = TOKEN
    try:
        with urllib.request.urlopen(urllib.request.Request(f"{GRAPH}/{ruta}", data=urllib.parse.urlencode(datos).encode()), timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        err = json.load(e).get("error", {})
        return {"error": err.get("error_user_msg") or err.get("message", str(e)), "detalle": err.get("error_user_title", "")}


def crear(clave):
    """Crea campaña, conjunto y anuncio EN PAUSA. Guarda los ids en estado/campanas.json; si ya existen, los reutiliza."""
    cfg = json.loads((ESTADO.parent.parent / "campana" / "anuncios" / f"{clave}.json").read_text(encoding="utf-8"))
    reg_path = ESTADO.parent / "campanas.json"
    reg = json.loads(reg_path.read_text(encoding="utf-8")) if reg_path.exists() else {}
    c = reg.setdefault(clave, {"config": cfg, "estado": "PAUSADA (falta autorización del dueño)"})
    guardar = lambda: reg_path.write_text(json.dumps(reg, ensure_ascii=False, indent=1), encoding="utf-8")

    def paso(nombre, fn):
        if c.get(nombre):
            return c[nombre]
        r = fn()
        if "error" in r:
            c["error"] = f"{nombre}: {r['error']} {r.get('detalle', '')}".strip(); guardar(); sys.exit(c["error"])
        c[nombre] = r.get("id") or r; c.pop("error", None); guardar()
        return c[nombre]

    def buscar_ig():
        r = get(cfg["pagina_id"], fields="instagram_business_account")
        if "instagram_business_account" in r:
            return {"id": r["instagram_business_account"]["id"]}
        # respaldo: el token de publicación de la página (el mismo que usa publicar.py)
        tok = os.environ.get("META_TOKEN_CHECKONOFF", "").strip()
        if tok:
            with urllib.request.urlopen(f"{GRAPH}/me?{urllib.parse.urlencode({'fields': 'instagram_business_account', 'access_token': tok})}", timeout=30) as x:
                r2 = json.load(x)
            if "instagram_business_account" in r2:
                return {"id": r2["instagram_business_account"]["id"]}
        return {"error": "no se encontró la cuenta de Instagram de la página", "detalle": str(r.get("error", ""))}
    ig = paso("instagram_id", buscar_ig)
    if not c.get("intereses"):
        ints = []
        for q in cfg["intereses"]:
            r = get("search", type="adinterest", q=q, locale="es_LA", limit=1)
            if r.get("data"):
                ints.append({"id": r["data"][0]["id"], "name": r["data"][0]["name"]})
        c["intereses"] = ints; guardar()
    camp = paso("campana_id", lambda: post(f"{CUENTA}/campaigns", name=cfg["nombre"], objective="OUTCOME_TRAFFIC", status="PAUSED",
                                            special_ad_categories=[], is_adset_budget_sharing_enabled="false"))
    if cfg.get("tipo") == "enlace":
        return crear_enlace(cfg, c, paso, ig, camp, guardar)
    targeting = {"geo_locations": {"countries": [cfg["pais"]]}, "age_min": cfg["edad_min"], "age_max": cfg["edad_max"],
                 "publisher_platforms": ["instagram"], "instagram_positions": ["stream", "reels"],
                 "targeting_automation": {"advantage_audience": 0}}  # público exacto, sin ampliación automática
    if c["intereses"]:
        targeting["flexible_spec"] = [{"interests": c["intereses"]}]
    adset = paso("conjunto_id", lambda: post(f"{CUENTA}/adsets", name=f"{cfg['nombre']} · MX {cfg['edad_min']}-{cfg['edad_max']}", campaign_id=camp,
                                             status="PAUSED", daily_budget=int(cfg["presupuesto_diario_mxn"] * 100), billing_event="IMPRESSIONS",
                                             optimization_goal="VISIT_INSTAGRAM_PROFILE", destination_type="INSTAGRAM_PROFILE",
                                             bid_strategy="LOWEST_COST_WITHOUT_CAP", targeting=targeting))
    if cfg.get("video"):  # anuncio nuevo a partir del MP4 (no depende de la app con la que se publicó el post original)
        vid = paso("video_id", lambda: post(f"{CUENTA}/advideos", name=cfg["nombre"], file_url=cfg["video"]))
        for _ in range(30):  # espera a que Meta procese el video
            st = get(vid, fields="status,thumbnails{uri,is_preferred}")
            if st.get("status", {}).get("video_status") == "ready" and st.get("thumbnails", {}).get("data"):
                break
            time.sleep(10)
        thumbs = st.get("thumbnails", {}).get("data", [])
        miniatura = next((t["uri"] for t in thumbs if t.get("is_preferred")), thumbs[0]["uri"] if thumbs else None)
        creat = paso("creativo_id", lambda: post(f"{CUENTA}/adcreatives", name=cfg["nombre"], object_story_spec={
            "page_id": cfg["pagina_id"], "instagram_user_id": ig,
            "video_data": {"video_id": vid, "message": cfg["texto"], "image_url": miniatura}}))
    else:
        creat = paso("creativo_id", lambda: post(f"{CUENTA}/adcreatives", name=cfg["nombre"], object_id=cfg["pagina_id"], instagram_user_id=ig,
                                                 source_instagram_media_id=cfg["instagram_media_id"]))
    ad = paso("anuncio_id", lambda: post(f"{CUENTA}/ads", name=cfg["nombre"], adset_id=adset, creative={"creative_id": creat}, status="PAUSED"))
    prev = get(f"{ad}/previews", ad_format="INSTAGRAM_REELS")
    if prev.get("data"):
        c["vista_previa"] = prev["data"][0].get("body", "")
    c["revisado"] = datetime.now(timezone.utc).isoformat(timespec="seconds"); guardar()
    print(json.dumps({k: v for k, v in c.items() if k != "vista_previa"}, ensure_ascii=False, indent=1))


def crear_enlace(cfg, c, paso, ig, camp, guardar):
    """Anuncios de imagen hacia cfg["enlace"]: un conjunto por grupo de posiciones y un anuncio por imagen (prueba A/B)."""
    raiz = ESTADO.parent.parent
    for g, conj in cfg["conjuntos"].items():
        targeting = {"geo_locations": {"countries": [cfg["pais"]]}, "age_min": cfg["edad_min"], "age_max": cfg["edad_max"],
                     "targeting_automation": {"advantage_audience": 0}, **conj["posiciones"]}
        if c["intereses"]:
            targeting["flexible_spec"] = [{"interests": c["intereses"]}]
        adset = paso(f"conjunto_{g}", lambda: post(f"{CUENTA}/adsets", name=f"{cfg['nombre']} · {g}", campaign_id=camp, status="PAUSED",
                                                   daily_budget=int(conj["presupuesto_mxn"] * 100), billing_event="IMPRESSIONS",
                                                   optimization_goal="LINK_CLICKS", destination_type="WEBSITE",
                                                   bid_strategy="LOWEST_COST_WITHOUT_CAP", targeting=targeting))
        for v, img in conj["anuncios"].items():
            def subir():
                r = post(f"{CUENTA}/adimages", bytes=base64.b64encode((raiz / img).read_bytes()).decode(), name=pathlib.Path(img).name)
                return r if "error" in r else {"id": next(iter(r["images"].values()))["hash"]}
            h = paso(f"imagen_{v}_{g}", subir)
            creat = paso(f"creativo_{v}_{g}", lambda: post(f"{CUENTA}/adcreatives", name=f"{cfg['nombre']} · {v} · {g}", object_story_spec={
                "page_id": cfg["pagina_id"], "instagram_user_id": ig,
                "link_data": {"link": cfg["enlace"], "message": cfg["texto"], "image_hash": h, "name": cfg["titulos"][v],
                              "description": cfg.get("descripcion", ""), "call_to_action": {"type": cfg.get("boton", "LEARN_MORE"), "value": {"link": cfg["enlace"]}}}}))
            ad = paso(f"anuncio_{v}_{g}", lambda: post(f"{CUENTA}/ads", name=f"{cfg['nombre']} · {v} · {g}", adset_id=adset,
                                                      creative={"creative_id": creat}, status="PAUSED"))
            prev = get(f"{ad}/previews", ad_format="INSTAGRAM_STANDARD" if g == "feed" else "INSTAGRAM_STORY")
            if prev.get("data"):
                c.setdefault("vistas_previas", {})[f"{v}_{g}"] = prev["data"][0].get("body", "")
    c["revisado"] = datetime.now(timezone.utc).isoformat(timespec="seconds"); guardar()
    print(json.dumps({k: v for k, v in c.items() if k not in ("vista_previa", "vistas_previas", "config")}, ensure_ascii=False, indent=1))


def renovar(clave):
    reg_path = ESTADO.parent / "campanas.json"
    reg = json.loads(reg_path.read_text(encoding="utf-8"))
    c = reg[clave]
    if c.get("anuncio_id"):
        r = post(c["anuncio_id"], status="DELETED")
        if "error" in r:
            sys.exit(f"no se pudo borrar el anuncio anterior: {r['error']}")
    for k in ("video_id", "creativo_id", "anuncio_id", "vista_previa", "error"):
        c.pop(k, None)
    reg_path.write_text(json.dumps(reg, ensure_ascii=False, indent=1), encoding="utf-8")
    crear(clave)


def metricas():
    reg = json.loads((ESTADO.parent / "campanas.json").read_text(encoding="utf-8"))
    res = {"revisado": datetime.now(timezone.utc).isoformat(timespec="seconds"), "campanas": {}}
    campos = "ad_id,ad_name,impressions,reach,frequency,inline_link_clicks,cost_per_inline_link_click,ctr,spend,actions"
    for clave, c in reg.items():
        if not c.get("campana_id"):
            continue
        estado = get(c["campana_id"], fields="status,effective_status,start_time,stop_time")
        ins = get(f"{c['campana_id']}/insights", level="ad", fields=campos, date_preset="maximum", limit=50)
        res["campanas"][clave] = {"estado": estado, "anuncios": ins.get("data", ins)}
    (ESTADO.parent / "anuncios_metricas.json").write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False, indent=1))


def activar(clave, dias):
    reg_path = ESTADO.parent / "campanas.json"
    reg = json.loads(reg_path.read_text(encoding="utf-8")); c = reg[clave]
    fin = (datetime.now(timezone.utc) + timedelta(days=int(dias))).replace(microsecond=0)
    ids = [("conjunto", v) for k, v in c.items() if k.startswith("conjunto") and isinstance(v, str)]
    ids += [("anuncio", v) for k, v in c.items() if k.startswith("anuncio") and isinstance(v, str)]
    for tipo, i in ids:
        r = post(i, status="ACTIVE", **({"end_time": fin.isoformat()} if tipo == "conjunto" else {}))
        if "error" in r:
            sys.exit(f"{tipo} {i}: {r['error']}")
    r = post(c["campana_id"], status="ACTIVE")
    if "error" in r:
        sys.exit(f"campaña: {r['error']}")
    c["estado"] = f"ACTIVA hasta {fin.isoformat()} (autorizada por el dueño)"
    c["activada"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    reg_path.write_text(json.dumps(reg, ensure_ascii=False, indent=1), encoding="utf-8")
    print(c["estado"])


def pausar(ad_id):
    r = post(ad_id, status="PAUSED")
    print(json.dumps(r, ensure_ascii=False))
    if "error" in r:
        sys.exit(1)


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
    accion = (sys.argv[1] if len(sys.argv) > 1 else "verificar").split()
    if not TOKEN:
        sys.exit("Falta el secreto META_ADS_TOKEN.")
    {"verificar": lambda: verificar(), "crear": lambda: crear(accion[1]), "renovar": lambda: renovar(accion[1]),
     "metricas": lambda: metricas(), "pausar": lambda: pausar(accion[1]),
     "activar": lambda: activar(accion[1], accion[2])}[accion[0]]()
