"""Arma y renderiza un reel por escenas: python armar_reel.py <spec.json> [t_prueba ...]
spec.json: {"voz": "voz/<n>", "salida": "contenido/checkonoff/<carpeta>", "escenas": [{"fx": "glass|wall|doodle|zoom|orbit|phone|chart|cierre", "w": "palabra", "n": 0, ...}]}
Revisa que cada palabra clave exista en el guion, copia efectos.js, arma bed.wav (música + golpes en cada escena) y llama a make_reel.py."""
import json, pathlib, re, shutil, subprocess, sys
R = pathlib.Path(__file__).resolve().parents[2]
spec = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding='utf-8'))
voz = R / spec['voz']; W = json.load(open(voz.with_suffix('.json')))
toks = [t.strip('.,…:¿?¡!').lower() for l in voz.with_suffix('.txt').read_text().splitlines() if not l.startswith('#voz') for t in l.split() if re.search(r'\w', t)]
def at(w, n=0):
    m = [i for i, s in enumerate(toks) if (s == w if len(w) <= 3 else s.startswith(w))]
    assert m, f'la palabra "{w}" no está en el guion'
    return W[m[min(n, len(m) - 1)]]['t'] if len(W) == len(toks) else None
ts = [0.05] + [at(e['w'], e.get('n', 0)) for e in spec['escenas'][1:]]
assert all(b > a for a, b in zip(ts, ts[1:])), f'escenas fuera de orden: {ts}'
d = R / spec['salida']; d.mkdir(parents=True, exist_ok=True)
shutil.copy(R / 'plantillas/efectos/efectos.js', d)
for fuente in ('kalam_700.ttf', 'nunito_900.woff2'):
    shutil.copy(R / 'marca_personal' / fuente, d)
(d / 'reel.html').write_text((R / 'plantillas/efectos/reel_spec.html').read_text(encoding='utf-8').replace('/*SPEC*/', json.dumps(spec, ensure_ascii=False)), encoding='utf-8')
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(voz.with_suffix('.mp3'))]))
orb = next((t for t, e in zip(ts, spec['escenas']) if e['fx'] == 'orbit'), dur * .5)
subprocess.run([sys.executable, str(R / 'plantillas/reel_historia/bed.py'), str(d / 'bed.wav'), str(dur + .6), ','.join(f'{t:.2f}' for t in ts[1:]), f'{orb - .4:.2f},{orb + .4:.2f}'], check=True)
subprocess.run([sys.executable, str(R / 'plantillas/reel_historia/make_reel.py'), str(d), str(voz), '1.0', str(R / 'plantillas/logo.png'), *sys.argv[2:]], check=True)
if len(sys.argv) == 2:
    for f in ('frames', 'bed.wav', 'efectos.js', 'reel.html', 'kalam_700.ttf', 'nunito_900.woff2'):
        p = d / f; shutil.rmtree(p) if p.is_dir() else p.unlink(missing_ok=True)
print('escenas', [round(t, 2) for t in ts])
