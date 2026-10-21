"""Voz en off con la voz clonada del dueño (Chatterbox Multilingual, gratis) y tiempos por palabra.

Por cada voz/<nombre>.txt cuya primera línea empieza con "#voz clon" y que aún no tiene .mp3 crea:
  voz/<nombre>.mp3   narración
  voz/<nombre>.json  [{"t": inicio_s, "d": duración_s, "w": "palabra"}, ...] una entrada por palabra escrita
La muestra de voz llega descifrada en la ruta de VOZ_REF (en el repo solo vive cifrada: voz/ref.enc).
Opcional en la primera línea: "#voz clon 0.5 0.5" = exageración y cfg.
"""
import difflib, json, os, pathlib, re, subprocess, sys, unicodedata
import numpy as np, torch, torchaudio
from chatterbox.mtl_tts import ChatterboxMultilingualTTS
from faster_whisper import WhisperModel

REF = os.environ.get("VOZ_REF", "ref.wav")
# Siglas y términos que la voz debe decir completos
PRON = {r"\bRRHH\b": "recursos humanos", r"\bRH\b": "recursos humanos", r"\bSTPS\b": "ese te pe ese",
        r"\bLFT\b": "Ley Federal del Trabajo", r"\bNOM-0?(\d+)\b": r"norma cero \1", r"\bWhatsApp\b": "guatsap",
        r"\bUMA\b": "umas", r"\bIA\b": "inteligencia artificial", r"CheckONOFF": "chek on of", r"\bDieloxia\b": "dieloxia"}
norm = lambda s: re.sub(r"[^a-z0-9ñ]", "", unicodedata.normalize("NFKD", s.lower()).encode("ascii", "ignore").decode())


def hablar(s):
    for k, v in PRON.items():
        s = re.sub(k, v, s)
    return s


def generar(txt, tts, asr):
    lineas = txt.read_text(encoding="utf-8").splitlines()
    cab = lineas.pop(0).split()
    exag = float(cab[2]) if len(cab) > 2 else 0.5
    cfg = float(cab[3]) if len(cab) > 3 else 0.5
    escritas = [t for l in lineas for t in l.split() if re.search(r"\w", t)]
    texto = hablar(" ".join(l.strip() for l in lineas if l.strip()))
    torch.manual_seed(7)
    partes = []
    for f in [f.strip() for f in re.split(r"(?<=[.!?…])\s+", texto) if f.strip()]:
        partes += [tts.generate(f, language_id="es", audio_prompt_path=REF, exaggeration=exag, cfg_weight=cfg), torch.zeros(1, int(tts.sr * 0.22))]
    crudo = txt.with_suffix(".crudo.wav")
    torchaudio.save(str(crudo), torch.cat(partes, dim=1), tts.sr)
    mp3 = txt.with_suffix(".mp3")
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(crudo), "-af",
                    "silenceremove=start_periods=1:start_threshold=-45dB:stop_periods=-1:stop_duration=0.32:stop_threshold=-42dB,loudnorm=I=-16,apad=pad_dur=1.2",
                    "-ar", "44100", "-b:a", "160k", str(mp3)], check=True)
    crudo.unlink()
    # tiempos: whisper sobre lo hablado y de vuelta a cada palabra escrita
    habladas, dueno = [], []
    for i, t in enumerate(escritas):
        for h in hablar(t).split():
            habladas.append(h); dueno.append(i)
    pcm = np.frombuffer(subprocess.check_output(["ffmpeg", "-v", "error", "-i", str(mp3), "-f", "s16le", "-ac", "1", "-ar", "16000", "-"]), np.int16).astype(np.float32) / 32768
    segs, _ = asr.transcribe(pcm, language="es", word_timestamps=True, initial_prompt=" ".join(habladas))
    ww = [w for s in segs for w in s.words]
    a, b = [norm(h) for h in habladas], [norm(w.word) for w in ww]
    tiempos = [None] * len(habladas)
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                tiempos[i1 + k] = (ww[j1 + k].start, ww[j1 + k].end)
        elif tag == "replace":
            s, e = ww[j1].start, ww[j2 - 1].end
            for k in range(i2 - i1):
                tiempos[i1 + k] = (s + (e - s) * k / (i2 - i1), s + (e - s) * (k + 1) / (i2 - i1))
    for i in range(len(tiempos)):
        if tiempos[i] is None:
            p = tiempos[i - 1][1] if i else 0
            n = next((x[0] for x in tiempos[i + 1:] if x), p + 0.3)
            tiempos[i] = (p, max(p + 0.1, n))
    salida = []
    for i, t in enumerate(escritas):
        ks = [k for k, d in enumerate(dueno) if d == i]
        s, e = tiempos[ks[0]][0], tiempos[ks[-1]][1]
        salida.append({"t": round(s, 3), "d": round(e - s, 3), "w": t.strip(".,…:;¿?¡!")})
    txt.with_suffix(".json").write_text(json.dumps(salida, ensure_ascii=False, indent=1), encoding="utf-8")
    print("ok", txt.name, len(salida), "palabras")


def main():
    pend = [t for t in sorted(pathlib.Path("voz").glob("*.txt"))
            if t.read_text(encoding="utf-8").startswith("#voz clon") and (not t.with_suffix(".mp3").exists() or "--todo" in sys.argv)]
    if not pend:
        print("Sin textos pendientes con voz clonada."); return
    tts = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
    asr = WhisperModel("small", device="cpu", compute_type="int8")
    for t in pend:
        generar(t, tts, asr)


main()
