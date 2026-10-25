"""Mensajes del grupo de WhatsApp "Jornada 40 hrs MX": de grupo/semana-NN.json a grupo/semana-NN.md con botón para compartir.

  python grupo/generar.py grupo/semana-44.json

El json: {"semana": 44, "mensajes": [{"fecha": "2026-10-26", "tipo": "texto|encuesta", "texto": "...", "opciones": [...]}]}
Solo administradores publican en el grupo; la API oficial no permite grupos grandes, así que el dueño reenvía con 1 toque.
"""
import json, pathlib, sys, urllib.parse
from datetime import date

DIAS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
src = pathlib.Path(sys.argv[1]); d = json.loads(src.read_text(encoding="utf-8"))
out = [f"# Grupo Jornada 40 hrs MX · semana {d['semana']}", "",
       "Toca **Compartir en WhatsApp**, elige el grupo *Jornada 40 hrs MX - Comunidad RRHH* y envía.", ""]
for m in d["mensajes"]:
    f = date.fromisoformat(m["fecha"])
    out += [f"## {DIAS[f.weekday()].capitalize()} {f.day}/{f.month} · {m['tema']}", ""]
    if m["tipo"] == "encuesta":
        out += ["Encuesta (créala en el grupo: 📎 → Encuesta, desactiva *Permitir varias respuestas*):", "",
                f"**Pregunta:** {m['texto']}", ""] + [f"- {o}" for o in m["opciones"]] + [""]
        if m.get("despues"):
            out += ["Después de la encuesta, envía:", "", "> " + m["despues"].replace("\n", "\n> "), "",
                    f"[📲 Compartir en WhatsApp](https://wa.me/?text={urllib.parse.quote(m['despues'])})", ""]
    else:
        if m.get("imagen"):
            out += [f"Imagen (descárgala y adjúntala): [{m['imagen']}]({m['imagen']})", ""]
        out += ["> " + m["texto"].replace("\n", "\n> "), "", f"[📲 Compartir en WhatsApp](https://wa.me/?text={urllib.parse.quote(m['texto'])})", ""]
src.with_suffix(".md").write_text("\n".join(out), encoding="utf-8")
print("ok", src.with_suffix(".md"))
