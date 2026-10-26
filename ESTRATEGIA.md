# Estrategia de contenido · CheckONOFF

**Meta:** 100,000 seguidores de RRHH en Instagram y Facebook, convertidos en pruebas gratis de 14 días en checkonoff.mx.

## Identidad visual (usar SIEMPRE)
Colores tomados del logo oficial (`marca/logo-checkonoff.png`, ícono en `marca/icono-checkonoff.png`):
| Uso | Color |
|---|---|
| Azul marino (fondos oscuros, texto) | `#111C3B` |
| Azul (cambios de ley, tablas) | `#0A4E94` |
| Verde (marca, "ON", CTA, cumplimiento) | `#34B614` · claro `#7DD818` |
| Rojo ("OFF", errores, alertas, multas) | `#E21B20` |
| Blanco / fondo claro | `#FFFFFF` · `#F2F6FB` |
| Negro | `#000000` |

## Fotos: nunca repetir (indicación del dueño, 23/10/2026)
- **Ninguna foto se repite**, en ninguna pieza ni marca. Una misma persona o sesión de fotos solo puede volver como "personaje ocasional", **máximo 1 vez cada 30 días**.
- La biblioteca `plantillas/hq/` ya está toda usada: cada pieza nueva lleva fotos NUEVAS de Unsplash (personas mexicanas/latinas, en empresas).
- Antes de usar una foto: `python scripts/fotos.py revisar foto.jpg --fotografo "<autor Unsplash>"` (rechaza la misma foto aunque cambie de nombre o recorte, y la misma sesión antes de 30 días). Al usarla: `python scripts/fotos.py usar foto.jpg <id-pieza> --unsplash <id> --fotografo "<autor>"`. Registro en `estado/fotos_usadas.json` (se sube con cada commit).
- El script no reconoce a la misma persona en OTRA foto: antes de elegir, arma una hoja de contacto con las fotos usadas en los últimos 30 días (`python scripts/fotos.py lista`) y compárala con Read; si la persona ya salió, elige otra. Evita usar dos fotos del mismo fotógrafo en 30 días.

## Público y formatos (indicación del dueño y métricas, 23/10/2026)
- **Todo el contenido va dirigido a las EMPRESAS** (dueños, gerentes, RRHH, nómina, supervisores), nunca a los empleados: se habla de obligaciones, costos, riesgos y soluciones de la empresa, no de "tus derechos como trabajador". Si un tema es un derecho del trabajador, se cuenta como lo que la empresa debe cumplir.
- Métricas al 23/10: carruseles 7.9 de alcance promedio, reels 1, imágenes 0.5, historias 0 (sin seguidores nadie las ve).
- **Historias pausadas** hasta tener 100 seguidores.
- **Más reels con historia del día a día de RRHH** (jueves de quincena, hora de comida, inspección, el que llega tarde, el Excel FINAL_v7) con gancho en el primer segundo y los efectos de `plantillas/efectos`.
- Se mantiene el carrusel de mediodía; las imágenes sueltas bajan al mínimo.
- Semana tipo: carrusel diario 12:00, "Para RRHH" (mini carrusel) 15:00 de lunes a viernes, 1 reel con historia diario a las 18:00 (alternando voz de mujer y hombre), máximo 1 imagen suelta por semana.

## Aprendizajes semana 43 (21–25 oct 2026) · aplicados en la semana del 26 oct
- **Alcance:** carruseles 7 de alcance promedio, reels 1, imágenes 1 (38 posts medidos). Instagram sigue sin seguidores (0–1): el algoritmo casi no reparte.
- **Los 2 mejores posts de la historia** ("¿Tu turno es vespertino?" 52 y "¿El reloj checador ya es obligatorio?" 39) tenían **portada tipográfica**: pregunta-mito grande sobre azul marino, palabra clave en rojo, respuesta corta en verde ("No existe", "Ya está en la ley") y botón "Desliza". Desde que pasamos a portadas con foto (semana 43) el alcance bajó.
- **Prueba A/B de esta semana:** los 5 "Para RRHH" y 4 carruseles de mediodía vuelven a la portada tipográfica (con el logo abajo, nunca arriba); 3 carruseles mantienen la portada con foto. El domingo 1/11 se compara alcance, guardados y compartidos de cada grupo y se queda el formato ganador.
- **Reels:** 7 reels con efectos (plantilla por escenas `plantillas/efectos/reel_spec.html` + `armar_reel.py`), voces Dalia/Jorge alternadas.
- **Meme de humor** (formato que llegó a 10,015 impresiones en LinkedIn) se prueba también en Instagram y Facebook el jueves.

## Referencia: "nota a mano" de Alexis Ibarra (LinkedIn, 26/10/2026)
Post de una headhunter: 48 reacciones, 4 comentarios y 3 compartidos en 3 h (nuestro mejor post personal: 6 reacciones).
- **Imagen:** hoja de libreta con "ASUNTO:", letra a mano, frase central con resaltador rosa, 4 flechas con resaltador amarillo y firma en óvalo. Se siente escrita por una persona, no por una marca.
- **Tema:** un dilema donde todos tienen opinión ("¿Regresarías a una empresa de la que renunciaste?"), con postura personal clara pero equilibrada.
- **Texto:** pregunta en la primera línea, párrafos de 1–2 renglones, "desde mi experiencia…", cierre con "¿Tú qué opinas?" y al final una oferta de su servicio.
- **Lo aplicamos:** plantilla `P.nota_control` en marca_personal/render_marca2.js (letra Kalam). Serie semanal de "nota a mano" con un dilema de RRHH (los viernes en el LinkedIn personal), postura propia + pregunta de opinión + "comenta GUÍA" como llamado (comentarios en lugar de enlace).

## Aprendizaje: meme de humor laboral en LinkedIn (dato del dueño, 25/10/2026)
El post del 22/10 "Jueves de realidad con humor" (diálogo Jefe/Yo + cara expresiva en primer plano + remate en la foto) en el LinkedIn personal llegó a **10,015 impresiones**: el mayor alcance de todo el contenido (las páginas de empresa rondan 7–100). Pero solo 6 reacciones y 0 comentarios (0.06 %).
- **Qué funcionó:** situación que todo RRHH reconoce, diálogo corto de 4 líneas, cara con emoción fuerte, remate legible en la imagen, fondo blanco limpio. LinkedIn reparte mucho más el perfil personal que la página.
- **Qué falló:** el CTA ("cuéntame tu anécdota") pide exponerse en público contra su jefe; nadie comenta. Y no había camino a nada (ni grupo ni prueba).
- **Reglas desde ahora:**
  1. Serie fija **"Jueves de realidad con humor"** cada jueves 7:40 en el LinkedIn personal, mismo formato (marca_personal/render_marca2.js → P.humor_*), un tema de RRHH distinto cada semana con dato legal verificado en el texto.
  2. CTA de baja fricción: responder con una letra (A/B/C) o una palabra, nunca "cuéntame tu anécdota".
  3. Sin enlaces en el texto (LinkedIn baja el alcance); el dueño pone el enlace del grupo de WhatsApp en el primer comentario.
  4. Probar el mismo formato meme en Instagram/Facebook de CheckONOFF 1 vez por semana (como imagen suelta o carrusel de 2 láminas) y comparar.
  5. Foto: cara expresiva en primer plano, nunca repetida.

## Solo el negocio, nunca la persona (indicación del dueño, 21/10/2026)
- El contenido de la marca **nunca habla del dueño**: sin nombre, sin "soy el doctor…", sin su foto ni su cargo, ni en textos, ni en imágenes, ni en voz en off.
- Los cierres de reels hablan del producto (qué resuelve) y terminan con guardar/compartir + logo al centro.

## Reels: efectos obligatorios (indicación del dueño, 22/10/2026)
- Todos los reels usan `plantillas/efectos/efectos.js` (10 efectos: orbit, frame break, UI world, digital zoom, phone mockup, headline wall, zoom through, chart grow, doodle boil, glass type): mínimo 4 por reel, cambio de escena cada 2–4 s, voz de Edge alternando mujer/hombre (nunca la voz del dueño, indicación del 22/10/2026) y subtítulos palabra por palabra. Detalle en `plantillas/efectos/README.md`.

## Logo (indicación de Garibaldi, 19/10/2026)
- **Nunca el logo en la parte superior** de posts, carruseles, historias ni reels: se ve feo.
- En feed: logo pequeño abajo a la derecha (como `premium_base.js`) o solo en la última lámina.
- En reels: sin logo durante el video; el logo grande va solo en la pantalla final de CTA.
- En historias: logo pequeño abajo, por encima de la zona segura inferior.

## Estándar de calidad visual (referencias: Humand, Bain LATAM, Mandü/Visma, Experiencia SET)
1. **Una sola idea por portada**: titular de 5 a 9 palabras, enorme (≥ 90 px en 1080), 2 pesos tipográficos máximo; una palabra clave en color de acento.
2. **Foto real protagonista a sangre completa** (alta resolución, ≥ 1080 px), personas reales con emoción o acción; nada de ilustraciones caricaturescas ni íconos genéricos como protagonistas.
3. **Recorte de persona sobre fondo de color de marca** (estilo Mandü) o **foto con degradado oscuro para el texto** (estilo Experiencia SET).
4. **Burbujas tipo chat sobre la foto** para "dolores" (estilo Mandü: "340 CVs", "Coordinar entrevistas a las 22:40").
5. **Mucho aire**: márgenes ≥ 70 px, máximo 25 palabras por lámina, sin cajas de texto apiladas.
6. **Sistema consistente**: logo pequeño siempre abajo a la derecha (nunca arriba), contador 01/05 discreto, "Deslizá →" en la portada.
7. **Emojis**: máximo uno por lámina, nunca como ilustración principal.
8. **Tono**: gancho emocional o provocador en la portada ("Tu cliente juzga lo que ve…"), datos y ley en las láminas internas, CTA solo en la última.

## A quién le hablamos
- Gerentes y analistas de **RRHH**, responsables de **nómina** y **dueños de PyMEs** con personal operativo (manufactura, retail, restaurantes, logística, construcción, salud).
- Nunca al trabajador: los temas de ley se cuentan como *"lo que tu empresa debe cumplir"* y *"el error que te cuesta dinero"*.

## Pilares (rotan cada semana)
| Pilar | Para qué | Formato estrella |
|---|---|---|
| **Dolor de RRHH** (quincena, Excel, sucursales) | Identificación → seguidores | Reel POV / humor |
| **Cumplimiento LFT** (vacaciones, tiempo extra, faltas, reformas) | Guardados y compartidos | Carrusel educativo |
| **Reforma 40 horas** (2027-2030) | Urgencia → prospectos | Carrusel checklist + reel |
| **Producto** (WhatsApp, offline, pre-nómina) | Conversión a prueba | Carrusel demo + historia CTA |

## Ritmo semanal
- **Feed:** 1 carrusel diario a las 10:00 + 1 "¿Sabías que?" para RRHH a las 12:00 (lun-vie).
- **Reels:** 3 por semana a las 18:00 (gancho en el primer segundo, 10-16 s, texto en pantalla).
- **Historias:** 1-2 diarias a las 12:30-13:30 (pregunta, tip, aviso de nuevo post, CTA).
- **Fines de semana:** contenido ligero de cumplimiento (no venta directa).

## Cómo aprendemos (cada semana)
1. `Leer métricas` guarda diario me gusta, comentarios, compartidos y guardados de cada post en `estado/metricas.json`.
2. Cada domingo se analiza qué **formato, pilar, gancho y hora** rindió más (prioridad: guardados y compartidos > comentarios > me gusta).
3. El plan de la siguiente semana duplica lo que ganó y reemplaza lo que perdió.

## Indicadores
| Indicador | Meta inicial |
|---|---|
| Crecimiento semanal de seguidores | +5 % |
| Guardados por carrusel | creciente semana a semana |
| Clics a checkonoff.mx / mensajes "DEMO" | registrar cada semana |

## Datos verificados de la reforma (fuente: DOF 1/05/2026, carpeta "Guia 40 hrs." en Drive)
- Vigencia del decreto: 1 de mayo de 2026; mayo-diciembre 2026 es periodo de ajuste.
- Jornada máxima semanal: 48 (2026), 46 (2027), 44 (2028), 42 (2029), 40 (2030); cada 1 de enero. Sin reducir sueldos ni prestaciones.
- Tiempo extra (Arts. 66 y 68): al doble hasta 9 h/sem (2026-2027), 10 (2028), 11 (2029), 12 (2030); máx. 4 h al día en máx. 4 días; al triple solo 4 h más por semana; ordinaria + extra ≤ 12 h al día. Ya NO aplica la regla de "3 horas, 3 veces".
- Art. 69: al menos 1 día de descanso por cada 6 de trabajo.
- Art. 132 fr. XXXIV: registro electrónico obligatorio de la jornada (inicio y fin). Reglas de la STPS desde el 1/01/2027. Multa 250-5,000 UMA (Art. 994 fr. IV Bis). Prueba plena si fue acordado entre empresa y trabajador.
- Temas pendientes para contenido: acuerdo de registro electrónico, aviso de privacidad para biométricos, tope de 56 h a la semana en 2030, conciliación registro-nómina.

## Datos del negocio (fuente: checkonoff.mx y llms.txt, 14/10/2026)
- Registro con 14 días gratis, sin tarjeta: https://app.checkonoff.mx/registro-empresa
- Asesor por WhatsApp: +52 333 021 3199 (https://wa.me/523330213199) · contacto@checkonoff.mx · San Luis Potosí.
- Planes (MXN por colaborador al mes + IVA): Esencial $39 (mín. 13), Profesional $59 (mín. 9), Corporativo $89 (mín. 6).
- Registro por app Android/iOS (geocercas + foto, sin internet), checador biométrico existente conectado a la nube, o bot de WhatsApp (todos los planes).
- Calculadoras: https://checkonoff.mx/calculadora-vacaciones/ (correcta) y https://checkonoff.mx/calculadora-horas-extra/ (actualizada con la reforma el 14/10/2026: usarla como imán en posts, reels y la guía).
- Páginas por industria: restaurantes, manufactura, construcción. Comparativa: alternativa a Factorial.

## Embudo de WhatsApp
- Grupo **Jornada 40 hrs MX · Comunidad RRHH**: https://chat.whatsapp.com/DyoKg8wa7IQCWzT9UgOyge (solo admins escriben; guía PDF fijada).
- Imán: `guias/guia-40-horas-checkonoff.pdf`. Usar este link en posts e historias de la reforma de 40 h.
- Límite: 1,024 miembros por grupo; al acercarse, abrir grupo 2 o pasar a Comunidad.

## Aceleradores (fuera de este repositorio)
- **Anuncios pagados** de "Enviar mensaje" a WhatsApp con la historia de la guía de 40 horas.
- **Colaboraciones** con despachos contables y creadores de contenido de RRHH.
- **Responder comentarios en la primera hora** después de cada publicación.

> El orgánico solo rara vez lleva a 100,000 seguidores en un nicho B2B; la combinación de contenido constante, anuncios a WhatsApp y colaboraciones es lo que escala.

### Personas en las fotos (indicación del cliente)
- Siempre personas con rasgos mexicanos o latinos, en escenas luminosas (no oscuras).
- Estilo aprobado: foto clara a sangre + caja de titular redondeada + burbujas tipo chat con colita (ver `plantillas/render_premium.js`).

## Aprendizajes semana 1 (14–18 oct 2026) · aplicados desde el 21 oct
- **Ganó:** carrusel con gancho de "mito de la ley" en forma de pregunta ("¿Tu turno es vespertino?", "¿El reloj checador ya es obligatorio?"), publicado a mediodía (miércoles 15:00): 52 y 38 de alcance.
- **Perdió:** imágenes sueltas en la mañana o en la noche (alcance 0–1) y reels (alcance 2–3).
- **Cambios:**
  - El carrusel del día pasa de 10:00 a **12:00** (y 14:30 el miércoles); el "Para RRHH" pasa de imagen suelta a **mini carrusel de 3 láminas** a las 14:30. Historias a las 13:15.
  - Portadas con **pregunta-mito + "Depende"** o dato con número; láminas internas con ejemplo en pesos y artículo de la LFT (más guardables).
  - Reels con **foto real a sangre** y movimiento (antes eran solo texto sobre fondo).
- **Freno principal:** 0 seguidores en Instagram y Facebook. Sin una base inicial (invitar amigos de Facebook, grupo de WhatsApp, colaboraciones o un impulso pagado pequeño), el algoritmo casi no muestra los posts.

## Reels con historia (desde 19/10/2026, referencia de la competencia de Dieloxia)
- De los 3 reels semanales, **al menos 1 es una historia con voz en off** sobre CheckONOFF (ver `plantillas/reel_historia/`): dolor real de RRHH con reloj en pantalla → caos (listas en papel, Excel, WhatsApp) → rebobinar ⏪ → "Ahora, con CheckONOFF" → producto resolviendo → final feliz → cierre con logo al centro.
- Varía el escenario cada semana: oficina de RRHH, taller/maquila, restaurante con turnos, obra, tienda con sucursales, clínica, logística/almacén, call center.
- Siempre relacionado con lo que hace CheckONOFF: checadas por app/WhatsApp/checador con foto y ubicación, sin internet, faltas/retardos/extra automáticos, pre-nómina en 1 clic, reforma 40 h y registro electrónico 2027.
- Guías para hacerlos con personajes en movimiento en Flow: `flow/`.
