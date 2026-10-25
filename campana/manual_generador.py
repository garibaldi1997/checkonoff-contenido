"""Manual de campaña pagada CheckONOFF · anuncio → grupo de WhatsApp (guía 40 h fijada) → prueba gratis."""
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

<section class="cover"><div class="k">MANUAL DE CAMPAÑA PAGADA · ACTUALIZADO 25/10/2026</div>
<h1>Anuncio → grupo de WhatsApp con la guía 40 horas → prueba gratis</h1>
<p>Cómo funciona el anuncio que invita a RRHH y dueños de empresa a unirse gratis a la comunidad <b>Jornada 40 hrs MX</b>, qué falta hacer antes de encenderlo y cómo convertir a los miembros del grupo en clientes de CheckONOFF.</p>
<div class="flow"><div><b>1 · Anuncio</b>Instagram y Facebook, 2 variantes (A/B)</div><div><b>2 · Clic</b>Abre el grupo directo en WhatsApp</div><div><b>3 · Grupo</b>Guía PDF fijada + bienvenida</div><div><b>4 · Contenido</b>3 mensajes útiles por semana</div><div><b>5 · Venta</b>Prueba 14 días o demo con asesor</div></div>
<div class="box" style="color:#1b2430"><b>Qué cambió respecto a la versión del 20/10:</b><ul>
<li>Ya no hay formulario: el anuncio lleva <b>directo al grupo</b>. Es más simple, más barato por persona y la guía se entrega dentro del grupo (fijada arriba).</li>
<li>La campaña <b>ya está creada en pausa</b> en tu cuenta publicitaria "CheckONOFF Ads" (no gasta nada hasta que la actives).</li>
<li>Fotos nuevas que nunca se habían usado (una supervisora de oficina y un supervisor de almacén), con el logo abajo.</li></ul></div>
<div class="box ok" style="color:#1b2430"><b>Ya está hecho:</b><ul>
<li>✅ Cuenta publicitaria "CheckONOFF Ads" con tarjeta y <b>límite de gasto de $2,000 MXN al mes</b>.</li>
<li>✅ Usuario del sistema y app "CheckONOFF Anuncios" (no tocan el bot de WhatsApp).</li>
<li>✅ Creatividades A/B en feed y en historias/reels.</li>
<li>✅ Campaña "Grupo WhatsApp · Jornada 40 hrs MX" creada <b>en pausa</b>, con 4 anuncios.</li></ul></div></section>

<section><div class="k">1 · LA REFERENCIA</div><h2>Por qué funciona el anuncio de SuperCompany</h2>
<div class="row"><img src="{REF}" style="width:190px"><div>
<ol><li><b>Gancho de miedo concreto:</b> "¿RH pasarías una inspección de la STPS?". Habla de un riesgo real con fecha.</li>
<li><b>Oferta clara y gratis</b>, y la persona ve lo que recibe (la portada de la guía en 3D).</li>
<li><b>Un solo botón</b> y no vende el software en el anuncio: vende después.</li></ol>
<div class="box ok"><b>Lo que hacemos igual, con lo nuestro:</b> mismo tipo de gancho, pero la oferta es entrar gratis a una comunidad con la guía fijada, clases en vivo y plantillas. Así no solo bajan un PDF: se quedan, y les hablamos cada semana.</div>
<div class="box warn"><b>Cuidado con lo que prometemos:</b> las reglas de la STPS para el registro electrónico entran el 1 de enero de 2027, pero aún no se publican todos los detalles. Por eso el anuncio pregunta ("¿pasaría…?") y no afirma multas automáticas.</div></div></div></section>

<section><div class="k">2 · CREATIVIDADES</div><h2>Dos ganchos para probar (A/B)</h2>
<div class="row"><img src="{img(OUT/'A_feed.jpg')}" style="width:165px"><img src="{img(OUT/'A_historia.jpg')}" style="width:117px"><img src="{img(OUT/'B_feed.jpg')}" style="width:165px"><img src="{img(OUT/'B_historia.jpg')}" style="width:117px"></div>
<p style="margin-top:6px"><b>A · Inspección STPS</b> (miedo/urgencia) y <b>B · 46 horas en 2027</b> (dato/planeación). Cada una en feed 4:5 y en historia/reel 9:16.</p>
<b>Texto principal (igual en A y B)</b>{copy('La jornada laboral en México baja a 40 horas, y en 2027 empiezan los primeros cambios para las empresas 📉\n\nCreamos una comunidad gratuita en WhatsApp para equipos de RRHH y dueños de negocio:\n\n📌 Guía PDF fijada: calendario 2026–2030, horas extra, registro electrónico y checklist\n🎓 Clases en vivo y plantillas\n🔕 Solo los administradores publican: cero spam\n\n👉 Únete gratis y prepara a tu empresa antes de enero.')}
<table><tr><th>Variante</th><th>Título</th><th>Descripción</th><th>Botón</th></tr>
<tr><td>A</td><td>¿Tu empresa pasaría una inspección de la STPS?</td><td rowspan="2">Guía PDF fijada · clases en vivo · plantillas</td><td rowspan="2">Más información → abre el grupo</td></tr>
<tr><td>B</td><td>Grupo gratis para RRHH: jornada de 40 horas</td></tr></table>
<p>Enlace de destino: <b>{GRUPO}</b> (sin los parámetros de rastreo que trae el enlace al copiarlo).</p></section>

<section><div class="k">3 · LA CAMPAÑA (YA CREADA, EN PAUSA)</div><h2>Qué hay dentro y cómo revisarla</h2>
<table><tr><th style="width:26%">Parte</th><th>Configuración</th></tr>
<tr><td>Campaña</td><td>"Grupo WhatsApp · Jornada 40 hrs MX" · objetivo <b>Tráfico</b> (clics al enlace).</td></tr>
<tr><td>Conjunto "feed"</td><td>$75 MXN al día · Feed de Facebook y de Instagram · anuncios A y B en 4:5.</td></tr>
<tr><td>Conjunto "historias"</td><td>$75 MXN al día · Historias de Facebook e Instagram y Reels · anuncios A y B en 9:16.</td></tr>
<tr><td>Público</td><td>México · 25 a 55 años · intereses: Recursos humanos, Administración de empresas, Pymes, Gestión de RRHH. Sin ampliación automática (solo ese público).</td></tr>
<tr><td>Total</td><td><b>$150 MXN al día</b>. 7 días ≈ $1,050 MXN. Tu límite mensual de $2,000 MXN lo frena aunque algo falle.</td></tr></table>
<h3>Cómo verla en tu celular o computadora</h3>
<ol><li>Abre <b>adsmanager.facebook.com</b> (en la computadora) o la app <b>Meta Ads Manager</b>. No uses el enlace de Business Suite: abre otra pantalla.</li>
<li>Arriba elige la cuenta <b>CheckONOFF Ads</b>.</li>
<li>En "Campañas" verás "Grupo WhatsApp · Jornada 40 hrs MX" con el interruptor apagado. Entra → Anuncios → toca un anuncio → <b>Vista previa</b>.</li></ol>
<h3>Cómo activarla</h3>
<p>Escríbeme <b>"activa la del grupo"</b> y la enciendo con fecha de fin a 7 días. O hazlo tú: enciende el interruptor de la campaña, de los 2 conjuntos y de los 4 anuncios. <b>Yo nunca la activo ni subo el gasto sin tu autorización por escrito.</b></p>
<div class="box warn"><b>Antes de activar, completa la sección 4.</b> Si alguien entra hoy, verá un grupo vacío y se saldrá: pagarías clics que no sirven.</div></section>

<section><div class="k">4 · ANTES DE ACTIVAR</div><h2>Dejar el grupo listo (15 minutos)</h2>
<ol><li><b>Sube la guía y fíjala.</b> Descárgala en tu celular desde este enlace y compártela en el grupo como documento:<div class="copy">{GUIA}</div>Mantén presionado el mensaje → ⋮ → <b>Fijar</b> → "30 días".</li>
<li><b>Publica y fija el mensaje de bienvenida</b> (abajo).</li>
<li><b>Ajustes del grupo:</b> Info del grupo → Permisos → "Enviar mensajes": <b>solo administradores</b>. "Aprobar nuevos miembros": <b>apagado</b> (si no, cada persona espera tu aprobación y muchas se van).</li>
<li><b>Tu número:</b> en un grupo, <b>todos los miembros ven el número de los administradores</b>. Lo ideal es que el administrador sea el WhatsApp de CheckONOFF (no tu número personal). Si hoy el grupo es de tu número personal: agrega el número de CheckONOFF como administrador y luego deja de ser administrador (o sal del grupo).</li>
<li>Pon una <b>foto del grupo</b> con el logo de CheckONOFF (te la puedo hacer).</li></ol>
<h3>Mensaje de bienvenida (fijado)</h3>{copy('Bienvenidos a Jornada 40 hrs MX 👋\nComunidad gratuita para RRHH y dueños de empresa sobre la reducción de la jornada a 40 horas en México.\n\n📌 Arriba está fijada la guía PDF: calendario 2026–2030, horas extra, registro electrónico y checklist.\n📌 Aquí compartimos cambios de ley, plantillas y avisos de clases en vivo.\n🔕 Solo los administradores publican.\n\nDudas o asesoría: +52 333 021 3199 · checkonoff.mx')}</section>

<section><div class="k">5 · EL GRUPO</div><h2>Qué publicar y cómo convertir</h2>
<p>Límite: 1,024 personas; al llegar a unas 900 abrimos el grupo 2 o lo pasamos a Comunidad.</p>
<h3>Calendario de las primeras 4 semanas (3 mensajes por semana)</h3>
<table><tr><th>Semana</th><th>Lunes · dato de ley</th><th>Miércoles · plantilla o ejemplo</th><th>Viernes · pregunta o CheckONOFF</th></tr>
<tr><td>1</td><td>Calendario 48→40 h y qué cambia el 1/01/2027</td><td>3 turnos legales de 46 h (de la guía)</td><td>Encuesta: ¿cómo registran hoy la asistencia?</td></tr>
<tr><td>2</td><td>Horas extra: 9 h dobles, 4 h triples y tope de 12 h al día</td><td>Ejemplo de cálculo de extras en pesos</td><td>Calculadora gratis: checkonoff.mx/calculadora-horas-extra</td></tr>
<tr><td>3</td><td>Registro electrónico: qué dice el art. 132 fr. XXXIV</td><td>Checklist: ¿pasarías una inspección?</td><td>Cómo checa un equipo sin internet (CheckONOFF, 1 mensaje)</td></tr>
<tr><td>4</td><td>Multas: 250 a 5,000 UMA (art. 994)</td><td>Plantilla de acuerdo de horario (art. 58)</td><td>Invitación a clase en vivo o a la prueba de 14 días</td></tr></table>
<p>Regla: de cada 4 mensajes, máximo 1 habla de CheckONOFF. El grupo vale por lo útil que es.</p>
<h3>Convertir miembros en prospectos</h3>
<ol><li>La <b>encuesta de la semana 1</b> te dice quién registra en papel o Excel, o no registra: esos son los mejores prospectos.</li>
<li>A quien vote eso, escríbele en privado desde el WhatsApp de CheckONOFF:</li></ol>
{copy(f'Hola 👋 Vi tu respuesta en la encuesta del grupo Jornada 40 hrs MX. Desde enero el registro de la jornada debe ser electrónico. Si quieres, te muestro en 15 minutos cómo lo resuelve CheckONOFF desde el celular, o lo pruebas 14 días gratis: {REG}')}
<ol start="3"><li>51 o más colaboradores → demo con asesor (+52 333 021 3199). De 1 a 50 → prueba de 14 días.</li></ol></section>

<section><div class="k">6 · MEDIR Y DECIDIR</div><h2>Qué mirar y cuándo cambiar</h2>
<table><tr><th>Cuándo</th><th>Qué revisar</th><th>Decisión</th></tr>
<tr><td>Día 2</td><td>Costo por clic en el enlace de cada anuncio</td><td>Si una variante cuesta 30 % más por clic, apágala y deja la otra.</td></tr>
<tr><td>Día 3</td><td>Miembros nuevos del grupo ÷ clics</td><td>Si menos del 30 % de los clics entra al grupo, revisamos el grupo (descripción, foto, ajustes) antes de gastar más.</td></tr>
<tr><td>Día 7</td><td>Costo por miembro nuevo (gasto ÷ miembros nuevos)</td><td>Si está por debajo de $15 MXN, vale la pena seguir; sube 20 a 30 % cada 2 o 3 días, nunca el doble de golpe.</td></tr>
<tr><td>Día 14</td><td>Pruebas gratis y demos que salieron del grupo</td><td>Con eso decides cuánto invertir al mes.</td></tr>
<tr><td>Si se cansa</td><td>El costo sube y la frecuencia pasa de 3</td><td>Cambio la imagen o el gancho (te hago variantes nuevas).</td></tr></table>
<p>Yo reviso la campaña en la revisión diaria y te aviso. Anota cuántos miembros tiene el grupo el día que la actives para medir cuántos llegaron por el anuncio.</p>
<h3>Checklist antes de activar</h3>
<ul><li>☐ Guía PDF subida al grupo y fijada.</li>
<li>☐ Mensaje de bienvenida publicado y fijado.</li>
<li>☐ Solo administradores envían mensajes; aprobación de miembros apagada.</li>
<li>☐ El administrador visible es el número de CheckONOFF, no tu número personal.</li>
<li>☐ Foto del grupo con el logo.</li>
<li>☐ Revisaste la vista previa de los 4 anuncios en Ads Manager.</li>
<li>☐ Me escribes "activa la del grupo".</li></ul>
<p style="margin-top:14px;font-size:11px;color:#6b7690">La guía es informativa y no sustituye asesoría legal. El costo real por clic lo define Meta según la competencia; los montos son un punto de partida.</p></section>
</body></html>"""

with sync_playwright() as p:
    b = p.chromium.launch(executable_path='/opt/pw-browsers/chromium')
    pg = b.new_page(); pg.set_content(H); pg.wait_for_timeout(300)
    pg.pdf(path=str(D / 'Manual_Campana_CheckONOFF.pdf'), format='Letter', print_background=True, margin={'top': '0', 'bottom': '0', 'left': '0', 'right': '0'})
    b.close()
print('ok')
