"""Manual de campaña pagada CheckONOFF · Guía 40 h → grupo de WhatsApp → prueba gratis."""
import base64, pathlib
from playwright.sync_api import sync_playwright

D = pathlib.Path(__file__).parent
OUT = pathlib.Path('/home/user/checkonoff-contenido/plantillas/out_campana')
img = lambda p: 'data:image/jpeg;base64,' + base64.b64encode(pathlib.Path(p).read_bytes()).decode()
REF = img('/root/.claude/uploads/ca17d5c6-aa38-54ef-8d42-0e4ff3f574b9/81834d4b-image.jpg')
GUIA = 'https://raw.githubusercontent.com/garibaldi1997/checkonoff-contenido/main/guias/guia-40-horas-checkonoff.pdf'
GRUPO = 'https://chat.whatsapp.com/DyoKg8wa7IQCWzT9UgOyge'
PRIV = 'https://app.checkonoff.mx/privacy-policy'
REG = 'https://app.checkonoff.mx/registro-empresa'

def copy(t): return f'<div class="copy">{t}</div>'

H = f"""<!doctype html><html><head><meta charset="utf-8"><style>
*{{box-sizing:border-box;margin:0;padding:0}}body{{font-family:Inter,sans-serif;color:#1b2430;font-size:12.5px;line-height:1.5}}
section{{padding:34px 40px;page-break-after:always}}h1{{font-size:40px;line-height:1.05;margin:10px 0 14px}}h2{{font-size:22px;color:#111C3B;margin:0 0 10px}}h3{{font-size:15px;color:#111C3B;margin:16px 0 6px}}
.cover{{background:#111C3B;color:#fff;min-height:100vh}}.cover p{{font-size:15px;opacity:.9;max-width:640px}}.k{{font-weight:800;letter-spacing:.14em;font-size:11px;color:#34B614}}.cover .k{{color:#7DD818}}
.box{{background:#F2F6FB;border-radius:14px;padding:14px 16px;margin:10px 0}}.ok{{border-left:5px solid #34B614}}.warn{{border-left:5px solid #E21B20}}
table{{width:100%;border-collapse:collapse;margin:8px 0}}th{{background:#111C3B;color:#fff;text-align:left;padding:7px 8px;font-size:11.5px}}td{{border-bottom:1px solid #e3e7ee;padding:7px 8px;vertical-align:top}}
.copy{{font-family:'DejaVu Sans Mono',monospace;font-size:11px;background:#f7f8fa;border:1px solid #e3e7ee;border-radius:8px;padding:9px 11px;white-space:pre-wrap;margin:6px 0}}
.row{{display:flex;gap:16px;align-items:flex-start}}.row img{{border-radius:10px;box-shadow:0 6px 18px rgba(17,28,59,.18)}}
ol,ul{{padding-left:20px}}li{{margin-bottom:5px}}.flow{{display:flex;gap:8px;align-items:stretch;margin:12px 0}}.flow div{{flex:1;background:#fff;color:#111C3B;border-radius:12px;padding:10px;font-size:11.5px;text-align:center}}.flow b{{display:block;font-size:13px;color:#34B614}}
</style></head><body>

<section class="cover"><div class="k">MANUAL DE CAMPAÑA PAGADA · ACTUALIZADO 20/10/2026</div>
<h1>Guía 40 horas → grupo de WhatsApp → prueba gratis</h1>
<p>Cómo lanzar en Meta (Instagram y Facebook) el anuncio de la guía gratuita para RRHH, con el estilo de anuncio que está funcionando en el mercado, y cómo convertir cada descarga en un prospecto de CheckONOFF.</p>
<div class="flow"><div><b>1 · Anuncio</b>"¿Pasarías una inspección de la STPS?"</div><div><b>2 · Formulario</b>Nombre, WhatsApp, empresa y tamaño</div><div><b>3 · Guía PDF</b>Descarga inmediata (con QR al grupo)</div><div><b>4 · Grupo</b>Jornada 40 Horas MX · Comunidad RRHH</div><div><b>5 · Venta</b>Prueba 14 días o asesor</div></div>
<div class="box" style="color:#1b2430"><b>Qué cambió respecto al plan anterior:</b><ul>
<li>El anuncio ya no invita "al grupo": ofrece una <b>guía práctica para descargar</b>, con un gancho de urgencia (inspección de la STPS y fecha concreta). Es lo que hace el anuncio de referencia y suele traer gente más interesada.</li>
<li>Se usa un <b>formulario instantáneo</b> de Meta: te deja nombre, WhatsApp, correo, empresa y número de colaboradores, sin necesidad de bot. El grupo y la venta van después.</li>
<li>Diseños nuevos con el estándar premium de CheckONOFF (foto real, colores de marca, logo abajo).</li>
<li>La guía ya existe: 20 páginas, con QR al grupo y a la prueba gratis en la última página.</li></ul></div></section>

<section><div class="k">1 · LA REFERENCIA</div><h2>Por qué funciona el anuncio de SuperCompany</h2>
<div class="row"><img src="{REF}" style="width:190px"><div>
<ol><li><b>Gancho de miedo concreto:</b> "¿RH pasarías una inspección de la STPS?". Habla de un riesgo real con fecha.</li>
<li><b>Dato que da urgencia:</b> "registro electrónico obligatorio en enero".</li>
<li><b>Oferta clara y gratis:</b> "Guía práctica · Descárgala gratis".</li>
<li><b>Prueba visual:</b> la portada de la guía en 3D: la persona ve lo que recibe.</li>
<li><b>Un solo botón:</b> "Descargar".</li>
<li>Va dirigido a RRHH y no vende el software en el anuncio; vende después.</li></ol>
<div class="box ok"><b>Lo que hacemos igual, con lo nuestro:</b> mismo tipo de gancho y de oferta, pero con nuestra guía (20 páginas, calendario 2026–2030, horas extra, multas, checklist), nuestros colores y el embudo al grupo de WhatsApp. No copiamos textos ni diseño.</div>
<div class="box warn"><b>Cuidado con lo que prometemos:</b> las reglas de la STPS para el registro electrónico entran el 1 de enero de 2027, pero aún no se publican los detalles. Por eso el anuncio pregunta ("¿pasarías…?") y no afirma multas automáticas.</div></div></div></section>

<section><div class="k">2 · CREATIVIDADES</div><h2>Dos ganchos para probar (A/B)</h2>
<div class="row"><img src="{img(OUT/'A_feed.jpg')}" style="width:165px"><img src="{img(OUT/'A_historia.jpg')}" style="width:117px"><img src="{img(OUT/'B_feed.jpg')}" style="width:165px"><img src="{img(OUT/'B_historia.jpg')}" style="width:117px"></div>
<p style="margin-top:6px"><b>A · Inspección STPS</b> (miedo/urgencia) y <b>B · 46 horas en 2027</b> (dato/planeación). Cada uno en feed 4:5 y en historia/reel 9:16. Archivos: <i>A_feed.jpg, A_historia.jpg, B_feed.jpg, B_historia.jpg</i>.</p>
<h3>Textos del anuncio · Variante A</h3>
<b>Texto principal</b>{copy('¿Tu empresa pasaría hoy una inspección de la STPS? 🔍\n\nDesde el 1 de enero de 2027 el registro de la jornada debe ser electrónico, y la jornada baja a 46 horas.\n\nPreparamos una guía práctica para RRHH (20 páginas, sin costo):\n✅ Calendario 2026–2030\n✅ Reglas nuevas de horas extra (dobles y triples)\n✅ Multas y cómo evitarlas\n✅ Checklist año por año\n\nDescárgala gratis 👇')}
<b>Título</b>{copy('Guía gratis: jornada de 40 horas para RRHH')}<b>Descripción</b>{copy('Basada en el DOF del 1/05/2026')}<b>Botón</b>{copy('Descargar')}
<h3>Textos del anuncio · Variante B</h3>
<b>Texto principal</b>{copy('En 2027 la jornada laboral baja a 46 horas. ¿Ya sabes cómo ajustar turnos sin pagar de más? ⏰\n\nGuía práctica para RRHH, gratis:\n✅ Ejemplos de turnos legales\n✅ Horas extra dobles y triples con sus nuevos topes\n✅ Registro electrónico obligatorio desde enero\n✅ Checklist imprimible\n\nDescárgala aquí 👇')}
<b>Título</b>{copy('Jornada de 46 horas: guía práctica gratis')}<b>Descripción</b>{copy('Sin costo · 20 páginas')}<b>Botón</b>{copy('Descargar')}</section>

<section><div class="k">3 · PASO A PASO EN META</div><h2>Crear la campaña en el Administrador de anuncios</h2>
<p>Entra a <b>adsmanager.facebook.com</b> con la cuenta de la página CheckONOFF (o desde Meta Business Suite → Anuncios → Administrador de anuncios).</p>
<table><tr><th style="width:26%">Paso</th><th>Qué elegir</th></tr>
<tr><td>1. Objetivo</td><td><b>Clientes potenciales</b> → Formulario instantáneo.</td></tr>
<tr><td>2. Campaña</td><td>Nombre: "Guía 40h · Formulario · oct-2026". Activa la <b>prueba A/B</b> por creatividad, o crea 2 conjuntos iguales (A y B).</td></tr>
<tr><td>3. Presupuesto</td><td><b>$150 a $300 MXN al día por variante</b>, durante 5 a 7 días. Prueba total aproximada: $1,500 a $4,200 MXN.</td></tr>
<tr><td>4. Público</td><td>México · 25 a 60 años · español. Público <b>Advantage+</b> con sugerencias: Recursos humanos, Nómina, Administración de personal, Contabilidad, Pequeñas y medianas empresas, Dueños de negocio. Si quieres arrancar más local: San Luis Potosí, Guanajuato, Querétaro, Jalisco, Nuevo León y CDMX.</td></tr>
<tr><td>5. Ubicaciones</td><td><b>Advantage+</b> (automáticas). Sube la versión 4:5 para feed y la 9:16 para historias y reels en el mismo anuncio ("Personalizar recurso por ubicación").</td></tr>
<tr><td>6. Anuncio</td><td>Identidad: página CheckONOFF + Instagram @checkonoff. Imagen, textos y botón <b>Descargar</b> de la sección 2.</td></tr>
<tr><td>7. Formulario</td><td>Crear formulario nuevo (siguiente página).</td></tr>
<tr><td>8. Revisar y publicar</td><td>Meta tarda de minutos a 24 h en aprobar el anuncio.</td></tr></table>
<h3>El formulario instantáneo</h3>
<table><tr><th style="width:26%">Parte</th><th>Qué poner</th></tr>
<tr><td>Tipo</td><td><b>Mayor intención</b> (agrega un paso para confirmar; llegan menos, pero mejores).</td></tr>
<tr><td>Introducción</td><td>Título: "Guía práctica: jornada de 40 horas para RRHH". Texto: "Calendario 2026–2030, horas extra, registro electrónico y checklist. Gratis."</td></tr>
<tr><td>Preguntas prellenadas</td><td>Nombre completo · Correo · Número de teléfono (WhatsApp)</td></tr>
<tr><td>Preguntas propias</td><td>1) Empresa · 2) Puesto · 3) ¿Cuántos colaboradores tienen? (1–10 / 11–50 / 51–200 / Más de 200) · 4) ¿Cómo registran hoy la asistencia? (Papel o Excel / Reloj checador / App / No la registramos)</td></tr>
<tr><td>Aviso de privacidad</td><td>{PRIV}</td></tr>
<tr><td>Pantalla final</td><td>Título "¡Listo! Aquí está tu guía". Texto: "En la última página está el QR para unirte gratis a la comunidad Jornada 40 Horas MX". Botón <b>Descargar</b> → enlace de la guía:<div class="copy">{GUIA}</div></td></tr></table>
</section>

<section><div class="k">4 · DESPUÉS DEL FORMULARIO</div><h2>Convertir cada descarga en prospecto</h2>
<ol><li><b>Descarga los contactos diario</b>: Meta Business Suite → Todas las herramientas → Formularios instantáneos (Centro de clientes potenciales) → Descargar CSV.</li>
<li><b>Escríbeles por WhatsApp en menos de 1 hora</b> desde el WhatsApp de CheckONOFF (no desde tu personal). Mensaje:</li></ol>
{copy(f'Hola {{nombre}} 👋 Soy de CheckONOFF. Vi que descargaste la guía de la jornada de 40 horas. ¿Te llegó bien?\n\nTe invito a la comunidad Jornada 40 Horas MX, donde compartimos cambios de ley, plantillas y clases en vivo para RRHH:\n{GRUPO}\n\nSi quieres ver cómo registrar la jornada de forma electrónica en tu empresa, te muestro CheckONOFF en 15 minutos o puedes probarlo 14 días gratis: {REG}')}
<ol start="3"><li><b>Prioriza por tamaño:</b> 51 o más colaboradores → ofrécele una demo con asesor (+52 333 021 3199). De 1 a 50 → invita a la prueba de 14 días.</li>
<li><b>Si respondió "Papel o Excel" o "No la registramos"</b>, es el mejor prospecto: el registro electrónico es justo su problema.</li></ol>
<h3>Camino alterno: anuncio directo a WhatsApp (probar en la semana 2)</h3>
<p>Objetivo <b>Interacción → Mensajes → WhatsApp</b>, con el mensaje que la persona envía de un toque: <i>"Hola, quiero la guía de la jornada de 40 horas"</i>. En WhatsApp Business configura el <b>mensaje de bienvenida</b> (Herramientas para la empresa) con este texto:</p>
{copy(f'¡Hola! 👋 Gracias por escribir a CheckONOFF. Aquí está tu guía gratis de la jornada de 40 horas:\n{GUIA}\n\nÚnete a la comunidad Jornada 40 Horas MX:\n{GRUPO}\n\n¿Cuántos colaboradores tiene tu empresa? Así te comparto lo que más te sirve.')}
<p>Compara el costo por contacto de los dos caminos y quédate con el más barato <b>que sí responde</b>.</p></section>

<section><div class="k">5 · EL GRUPO</div><h2>Jornada 40 Horas MX · Comunidad RRHH</h2>
<p>Link: <b>{GRUPO}</b>. Solo administradores escriben, la guía va fijada. Recuerda: todos los miembros ven el número de los administradores (usa el número de CheckONOFF, no el personal). Límite: 1,024 personas; al llegar a unas 900 abrimos el grupo 2 o lo pasamos a Comunidad.</p>
<h3>Mensaje de bienvenida (fijado)</h3>{copy('Bienvenidos a Jornada 40 Horas MX 👋\nAquí compartimos, sin vender a cada rato:\n📌 Cambios de ley y fechas clave (40 h, registro electrónico, horas extra)\n📌 Plantillas y checklists para RRHH\n📌 Avisos de clases en vivo\n\nLa guía completa está fijada arriba. Dudas: escribe al asesor +52 333 021 3199.')}
<h3>Calendario de las primeras 4 semanas (3 mensajes por semana)</h3>
<table><tr><th>Semana</th><th>Lunes · dato de ley</th><th>Miércoles · plantilla o ejemplo</th><th>Viernes · pregunta o CheckONOFF</th></tr>
<tr><td>1</td><td>Calendario 48→40 h y qué cambia el 1/01/2027</td><td>3 turnos legales de 46 h (de la guía)</td><td>Encuesta: ¿cómo registran hoy la asistencia?</td></tr>
<tr><td>2</td><td>Horas extra: 9 h dobles, 4 h triples y tope de 12 h al día</td><td>Ejemplo de cálculo de extras en pesos</td><td>Calculadora gratis: checkonoff.mx/calculadora-horas-extra</td></tr>
<tr><td>3</td><td>Registro electrónico: qué dice el art. 132 fr. XXXIV</td><td>Checklist: ¿pasarías una inspección?</td><td>Cómo checa un equipo sin internet (CheckONOFF, 1 mensaje)</td></tr>
<tr><td>4</td><td>Multas: 250 a 5,000 UMA (art. 994)</td><td>Plantilla de acuerdo de horario (art. 58)</td><td>Invitación a clase en vivo o a la prueba de 14 días</td></tr></table>
<p>Regla: de cada 4 mensajes, máximo 1 habla de CheckONOFF. El grupo vale por lo útil que es.</p></section>

<section><div class="k">6 · MEDIR Y DECIDIR</div><h2>Qué mirar y cuándo cambiar</h2>
<table><tr><th>Cuándo</th><th>Qué revisar</th><th>Decisión</th></tr>
<tr><td>Día 3</td><td>Costo por cliente potencial de A y B</td><td>Apaga la variante más cara si cuesta claramente más (por ejemplo, 30 % o más).</td></tr>
<tr><td>Día 7</td><td>Costo por contacto que <b>respondió</b> en WhatsApp y % que entró al grupo</td><td>Sube el presupuesto de la ganadora 20 a 30 % cada 2 o 3 días (no lo dupliques de golpe).</td></tr>
<tr><td>Día 14</td><td>Pruebas gratis y demos que salieron de la campaña</td><td>Calcula cuánto te costó cada prueba y cada cliente; con eso decides cuánto invertir al mes.</td></tr>
<tr><td>Si se cansa</td><td>Si el costo sube y la frecuencia pasa de 3</td><td>Cambia la imagen o el gancho (yo te hago variantes nuevas).</td></tr></table>
<p>Pásame cada semana el CSV de contactos o una captura del Administrador de anuncios y te digo qué ajustar; también ajusto el contenido orgánico con lo que aprendamos.</p>
<h3>Checklist antes de lanzar</h3>
<ul><li>☐ La página de Facebook y el Instagram de CheckONOFF están vinculados en el Administrador de anuncios y tienes método de pago.</li>
<li>☐ El link de la guía abre en el celular: {GUIA}</li>
<li>☐ El grupo existe, la guía está fijada y solo administradores escriben.</li>
<li>☐ El WhatsApp de CheckONOFF tiene el mensaje de bienvenida (si usas el camino alterno).</li>
<li>☐ Link de bio de Instagram con la guía o el grupo.</li>
<li>☐ Alguien responde los contactos en menos de 1 hora (lunes a viernes).</li></ul>
<p style="margin-top:14px;font-size:11px;color:#6b7690">La guía es informativa y no sustituye asesoría legal. Los montos de presupuesto son un punto de partida para la prueba; el costo real por contacto lo define Meta según la competencia.</p></section>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg = b.new_page(); pg.set_content(H); pg.wait_for_timeout(300)
    pg.pdf(path=str(D / 'Manual_Campana_CheckONOFF.pdf'), format='Letter', print_background=True, margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'})
    b.close()
print('ok')
