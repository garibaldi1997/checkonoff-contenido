"""Genera imágenes y videos con fal.ai desde GitHub Actions (la llave vive en el secreto FAL_KEY).
Cada ia/<trabajo>.json: {"tareas": [{"modelo": "fal-ai/...", "entrada": {...}, "salida": "marca/tico/x.png"}]}
Solo corre las tareas cuya salida aún no existe. Las URLs "repo:<ruta>" se cambian por la URL pública del archivo en GitHub."""
import json, os, pathlib, sys, time, urllib.request
R = pathlib.Path(__file__).resolve().parents[1]
KEY = os.environ.get("FAL_KEY") or sys.exit("Falta el secreto FAL_KEY")
RAW = "https://raw.githubusercontent.com/garibaldi1997/checkonoff-contenido/main/"
H = {"Authorization": f"Key {KEY}", "Content-Type": "application/json"}

def pedir(url, datos=None):
    req = urllib.request.Request(url, data=json.dumps(datos).encode() if datos is not None else None, headers=H, method="POST" if datos is not None else "GET")
    with urllib.request.urlopen(req, timeout=120) as r:
        return json.load(r)

def repo(x):
    if isinstance(x, str) and x.startswith("repo:"): return RAW + x[5:]
    if isinstance(x, dict): return {k: repo(v) for k, v in x.items()}
    if isinstance(x, list): return [repo(v) for v in x]
    return x

def urls(x):
    if isinstance(x, dict):
        if isinstance(x.get("url"), str): yield x["url"]
        for v in x.values(): yield from urls(v)
    elif isinstance(x, list):
        for v in x: yield from urls(v)

fallas = 0
for trabajo in sorted((R / "ia").glob("*.json")):
    for t in json.loads(trabajo.read_text(encoding="utf-8"))["tareas"]:
        sal = R / t["salida"]
        if sal.exists(): continue
        print("→", t["modelo"], t["salida"], flush=True)
        try:
            q = pedir(f"https://queue.fal.run/{t['modelo']}", repo(t["entrada"]))
            for _ in range(240):
                s = pedir(q["status_url"])
                if s.get("status") == "COMPLETED": break
                time.sleep(5)
            res = pedir(q["response_url"])
            u = list(urls(res))
            if not u: raise RuntimeError(f"sin archivo en la respuesta: {json.dumps(res)[:500]}")
            sal.parent.mkdir(parents=True, exist_ok=True)
            urllib.request.urlretrieve(u[0], sal)
            sal.with_suffix(sal.suffix + ".json").write_text(json.dumps({"modelo": t["modelo"], "entrada": t["entrada"], "respuesta": res}, ensure_ascii=False, indent=2))
            print("  ok", sal.stat().st_size, "bytes")
        except Exception as e:
            fallas += 1
            msg = e.read().decode()[:800] if hasattr(e, "read") else str(e)
            print("  ERROR", msg)
sys.exit(1 if fallas else 0)
