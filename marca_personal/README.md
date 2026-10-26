# Marca personal de Garibaldi en LinkedIn

Contenido interactivo (solo LinkedIn, cuenta `garibaldi` en `cuentas.json`) sobre todo lo que hace Garibaldi:
medicina laboral y salud ocupacional (NOM-030, NOM-035, ergonomía, Ley Silla), RRHH y reforma laboral,
IA aplicada a negocios, finanzas y rentabilidad, y su historia como fundador de CheckONOFF y Dieloxia.

- Estilo propio: azul profundo `#0F1E36`, turquesa `#2EC4B6`, dorado `#F5B841`; firma con foto abajo (nunca logo arriba).
- Referencias de Garibaldi (20/10/2026): posts de UNA imagen de alto impacto como los virales de LinkedIn: mito con foto y titular en mayúsculas, humor laboral (diálogo + foto con remate), infografía de lista con íconos, infografía comparativa (mal vs bien), frase con foto, reto. Texto largo tipo historia con gancho en la 1.ª línea. Render: `node marca_personal/render_marca2.js` → `marca_personal/out2/`.
- Formatos que rotan: encuesta (`tipo: encuesta`), carrusel PDF (`tipo: documento`), quiz verdadero/falso,
  autoevaluación con puntaje, "adivina el dato", reto (pausa activa), detrás de cámaras.
- Si LinkedIn no acepta la encuesta o el PDF por API, el publicador lo sube como post normal con las imágenes
  y `texto_respaldo` (votar en comentarios).
- Render: `node marca_personal/render_marca.js` → `marca_personal/out/`.
- Hora: 7:40 CDMX, lunes a viernes. Cada post termina con una pregunta fácil de contestar.
- **Series fijas (desde 26/10/2026):** jueves = meme "Jueves de realidad con humor" (`P.humor_*`, 10,015 impresiones el 22/10); viernes = "nota a mano" con un dilema de RRHH (`P.nota_control` como base: hoja de libreta, letra Kalam, resaltador, firma; referencia de alto impacto: post "REINGRESO" de Alexis Ibarra). Texto: pregunta polémica en la 1.ª línea, postura personal equilibrada, "¿Tú qué opinas?" y llamado a comentar una palabra ("GUÍA") en lugar de enlace. Más detalle en ESTRATEGIA.md.
