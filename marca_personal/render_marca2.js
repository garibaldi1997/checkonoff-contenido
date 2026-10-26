// Marca personal v2 (referencias que pidió Garibaldi): una sola imagen de alto impacto
// · mito con foto · humor laboral · infografía de lista · infografía comparativa · frase · reto.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { CSS } = require('../plantillas/premium_base');
const D = __dirname;
const b64 = (f, m) => `data:${m};base64,` + fs.readFileSync(path.join(D, f)).toString('base64');
const AV = b64('avatar.png', 'image/png');
const F = n => b64(`fotos/${n}.jpg`, 'image/jpeg');
const SERIF = `@font-face{font-family:PF;font-weight:700;src:url(${b64('playfair_700.woff2', 'font/woff2')})}`;
const K = { bg: '#0F1E36', bg2: '#16294A', t: '#2EC4B6', o: '#F5B841', r: '#FF5A5F', s: '#B8C4D6' };
const MCSS = `${CSS}${SERIF}
.f{background:${K.bg};color:#fff}
.firma{position:absolute;left:60px;right:60px;bottom:44px;display:flex;align-items:center;gap:18px;font-size:24px;color:${K.s};z-index:9}
.firma img{width:68px;height:68px;border-radius:50%;border:3px solid ${K.t}}
.firma b{color:#fff;font-size:26px;display:block}
.up{text-transform:uppercase;font-weight:800;letter-spacing:-.01em;line-height:1.02}
.ac{color:${K.t}}.or{color:${K.o}}.rd{color:${K.r}}`;
const firma = (claro) => `<div class="firma" style="${claro ? `color:#4a5670` : ''}"><img src="${AV}"><div><b style="${claro ? 'color:#0F1E36' : ''}">Dr. Garibaldi Corona</b>Médico laboral · Fundador de CheckONOFF y Dieloxia</div></div>`;
const P = {};

// 1 · Mito con foto
P.mito_postura = `<img src="${F('escritorio')}" style="position:absolute;left:0;top:-60px;width:1080px">
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,30,54,0) 35%,rgba(15,30,54,.85) 60%,${K.bg} 78%)"></div>
<div style="position:absolute;left:60px;top:56px;background:${K.r};color:#fff;font-weight:800;font-size:26px;letter-spacing:.1em;padding:10px 20px;border-radius:12px">MITO DE OFICINA</div>
<div class="up" style="position:absolute;left:60px;right:60px;top:820px;font-size:70px;text-align:center">La <span class="ac">“postura perfecta”</span> no existe: tu espalda necesita que te <span class="or">muevas.</span></div>
${firma()}`;

// 2 · Humor laboral
P.humor_registro = `<div style="position:absolute;inset:0;background:#fff"></div>
<div style="position:absolute;left:60px;right:60px;top:60px;color:#0F1E36;font-size:44px;font-weight:600;line-height:1.38">
— Jefe: ¿Te puedes quedar un ratito más?<br>— Yo: Claro, ¿lo apunto como hora extra?<br>— Jefe: Mejor no lo apuntes.<br>— El registro electrónico obligatorio en 2027:</div>
<div style="position:absolute;left:60px;right:60px;top:440px;bottom:150px;border-radius:24px;overflow:hidden">
 <img src="${F('escepticismo')}" style="position:absolute;left:0;top:-170px;width:960px">
 <div style="position:absolute;left:40px;bottom:40px;font-size:66px;font-weight:800;color:#fff;-webkit-text-stroke:8px #0F1E36;paint-order:stroke fill">Ya lo apunté yo. 👀</div></div>
${firma(true)}`;

// 2b · Humor laboral (serie "Jueves de realidad con humor": el formato con más alcance en LinkedIn, 10,015 impresiones)
P.humor_horas_extra = `<div style="position:absolute;inset:0;background:#fff"></div>
<div style="position:absolute;left:60px;right:60px;top:60px;color:#0F1E36;font-size:44px;font-weight:600;line-height:1.38">
— RRHH: ¿Quién autorizó 14 horas extra?<br>— Supervisor: Nadie, se fueron juntando solitas.<br>— RRHH: ¿Y el tope no era de 9?<br>— La nómina del jueves:</div>
<div style="position:absolute;left:60px;right:60px;top:440px;bottom:150px;border-radius:24px;overflow:hidden">
 <img src="${F('sorpresa')}" style="position:absolute;left:0;top:-180px;width:960px">
 <div style="position:absolute;left:40px;bottom:40px;font-size:66px;font-weight:800;color:#fff;-webkit-text-stroke:8px #0F1E36;paint-order:stroke fill">¿Las triples también? 😳</div></div>
${firma(true)}`;

// 3 · Infografía de lista
const senales = [['😴', 'Cansancio que no se quita', 'ni después del fin de semana'], ['📅', 'Más faltas y retardos', 'sin motivo claro'], ['⚠️', 'Errores en lo que ya dominaban', 'tareas de siempre, mal hechas'], ['😤', 'Irritabilidad', 'discusiones por cosas pequeñas'], ['🔇', 'Silencio en las juntas', 'nadie propone nada'], ['🪑', 'Presentismo', 'están, pero no rinden'], ['🚪', 'Hablan de irse', 'o actualizan su CV en horario']];
P.info_burnout = `<div style="position:absolute;inset:0;background:#F4F6FA"></div>
<div class="up" style="position:absolute;left:60px;right:60px;top:54px;color:${K.bg};font-size:64px;text-align:center">7 señales de que tu equipo está <span class="rd">agotado</span></div>
<div style="position:absolute;left:60px;right:60px;top:210px;text-align:center;font-size:32px;font-weight:600;color:#4a5670">(y no te lo va a decir)</div>
<div style="position:absolute;left:60px;right:60px;top:290px;display:grid;grid-template-columns:1fr 1fr;gap:18px">
${senales.map(([e, t, d], i) => `<div style="background:#fff;border-radius:24px;padding:22px 24px;display:flex;gap:18px;align-items:center;box-shadow:0 8px 20px rgba(15,30,54,.08);${i === 6 ? 'grid-column:1/3' : ''}">
 <div style="width:78px;height:78px;border-radius:50%;background:${K.bg};display:grid;place-items:center;font-size:40px;flex-shrink:0">${e}</div>
 <div><div style="font-size:21px;font-weight:800;color:${K.t}">${i + 1}</div><div style="font-size:30px;font-weight:800;color:${K.bg};line-height:1.1">${t}</div><div style="font-size:23px;color:#5b667a;margin-top:4px">${d}</div></div></div>`).join('')}</div>
<div style="position:absolute;left:60px;right:60px;top:1150px;text-align:center;font-size:22px;color:#6b7690">Basado en mi práctica como médico laboral y en la NOM-035-STPS-2018 (factores de riesgo psicosocial)</div>
${firma(true)}`;

// 4 · Infografía comparativa
const malo = [['⏱️', 'Horas extra que nadie autorizó', 'y que igual se pagan'], ['⚖️', 'Demandas sin prueba', 'ante la autoridad, la ley presume lo que diga el trabajador'], ['🥱', 'Fatiga y accidentes', 'jornadas largas que nadie ve'], ['🧾', 'Nómina con errores', 'capturas a mano cada quincena']];
const bueno = [['✅', 'Pagas lo justo', 'ni más ni menos'], ['📂', 'Tienes la prueba', 'registro de cada entrada y salida'], ['💚', 'Turnos sanos', 'descansos y límites que se cumplen'], ['⚡', 'Quincena en minutos', 'la pre-nómina sale sola']];
const col = (items, c, x) => `<div style="position:absolute;left:${x}px;width:450px;top:580px;display:flex;flex-direction:column;gap:46px">${items.map(([e, t, d]) => `<div style="display:flex;gap:18px;align-items:flex-start">
 <div style="width:64px;height:64px;border-radius:50%;border:3px solid ${c};display:grid;place-items:center;font-size:30px;flex-shrink:0">${e}</div>
 <div><div style="font-size:33px;font-weight:800;line-height:1.1">${t}</div><div style="font-size:25px;color:${K.s};margin-top:6px;line-height:1.25">${d}</div></div></div>`).join('')}</div>`;
P.info_costo = `<div class="up" style="position:absolute;left:60px;right:60px;top:60px;font-size:60px;text-align:center">El costo oculto de<br><span class="or" style="font-size:84px">no medir la jornada</span></div>
<div style="position:absolute;left:60px;right:60px;top:330px;text-align:center;font-size:30px;color:${K.s};line-height:1.35">No siempre el problema es la gente:<br>a veces es lo que nadie mide.</div>
<div style="position:absolute;left:180px;right:180px;top:440px;height:3px;background:${K.o}"></div>
<div class="up" style="position:absolute;left:60px;top:480px;font-size:34px" ><span class="rd">✕ Sin registro</span></div>
<div class="up" style="position:absolute;left:570px;top:480px;font-size:34px"><span class="ac">✓ Con registro</span></div>
${col(malo, K.r, 60)}${col(bueno, K.t, 570)}
<div style="position:absolute;left:540px;top:490px;width:2px;height:640px;background:rgba(255,255,255,.15)"></div>
${firma()}`;

// 5 · Frase
P.frase_salud = `<img src="${F('agave')}" style="position:absolute;left:0;top:-200px;width:1080px">
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,250,240,.95) 0%,rgba(255,250,240,.88) 48%,rgba(255,250,240,0) 70%)"></div>
<div style="position:absolute;left:70px;right:70px;top:110px;text-align:center;font-family:PF,serif;font-weight:700;font-size:74px;line-height:1.12;color:#0F1E36">Una empresa sana no es la que no tiene problemas, sino la que los detecta a tiempo.</div>
<div style="position:absolute;left:0;right:0;top:620px;text-align:center;font-size:30px;font-weight:700;letter-spacing:.12em;color:#0F1E36">— DR. GARIBALDI CORONA</div>
${firma()}`;

// 6 · Reto pausa activa
const ej = [['🙆', 'Cuello', 'Oreja al hombro, 15 s por lado'], ['🔄', 'Hombros', '10 círculos lentos hacia atrás'], ['✋', 'Muñecas', 'Palma al frente, jala suave 15 s'], ['🚶', 'Camina', '1 minuto o sube un piso']];
P.info_pausa = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% 0%,#1d3a66,${K.bg})"></div>
<div style="position:absolute;left:60px;top:60px;background:${K.o};color:${K.bg};font-weight:800;font-size:26px;letter-spacing:.1em;padding:10px 20px;border-radius:12px">RETO · 2 MINUTOS</div>
<div class="up" style="position:absolute;left:60px;right:60px;top:150px;font-size:84px">Pausa activa<br><span class="ac">conmigo</span></div>
<div style="position:absolute;left:60px;right:60px;top:420px;display:grid;grid-template-columns:1fr 1fr;gap:22px">${ej.map(([e, t, d], i) => `<div style="background:${K.bg2};border:2px solid rgba(255,255,255,.08);border-radius:28px;padding:30px;height:300px">
 <div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:90px">${e}</span><span style="font-size:60px;font-weight:800;color:${K.t}">${i + 1}</span></div>
 <div style="font-size:44px;font-weight:800;margin-top:18px">${t}</div><div style="font-size:28px;color:${K.s};margin-top:8px;line-height:1.3">${d}</div></div>`).join('')}</div>
<div style="position:absolute;left:60px;right:60px;top:1100px;text-align:center;font-size:22px;color:${K.s}">Si sientes dolor, detente. No sustituye una valoración médica.</div>
${firma()}`;

// ═════ Semana 2–6 nov 2026 ═════
// Adivina el dato (lunes)
const opc = (l, t, x) => `<div style="position:absolute;left:${x}px;width:300px;top:700px;height:300px;border-radius:30px;background:${K.bg2};border:3px solid rgba(255,255,255,.12);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px"><div style="width:76px;height:76px;border-radius:50%;background:${K.o};color:${K.bg};font-size:44px;font-weight:800;display:grid;place-items:center">${l}</div><div style="font-size:44px;font-weight:800;text-align:center;line-height:1.1">${t}</div></div>`;
P.dato_triples = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse 80% 55% at 50% 0%,#1d3a66,${K.bg})"></div>
<div style="position:absolute;left:60px;top:60px;background:${K.o};color:${K.bg};font-weight:800;font-size:26px;letter-spacing:.1em;padding:10px 20px;border-radius:12px">ADIVINA EL DATO</div>
<div class="up" style="position:absolute;left:60px;right:60px;top:170px;font-size:68px">¿Cuántas horas extra <span class="or">triples</span> se pueden pagar a la semana desde la reforma?</div>
${opc('A', '0 horas', 60)}${opc('B', '4 horas', 390)}${opc('C', 'Sin límite', 720)}
<div style="position:absolute;left:60px;right:60px;top:1080px;text-align:center;font-size:34px;font-weight:700;color:${K.t}">Responde con A, B o C 👇 · la respuesta va al final del post</div>
${firma()}`;
// Mito sin foto (martes)
P.mito_nom035 = `<div style="position:absolute;inset:0;background:${K.bg}"></div>
<div style="position:absolute;left:60px;top:60px;background:${K.r};color:#fff;font-weight:800;font-size:26px;letter-spacing:.1em;padding:10px 20px;border-radius:12px">MITO DE RRHH</div>
<div class="up" style="position:absolute;left:60px;right:60px;top:170px;font-size:78px;text-decoration:line-through;text-decoration-color:${K.r}cc;text-decoration-thickness:5px;color:#C9D3E2">“La NOM-035 es solo un cuestionario”</div>
<div style="position:absolute;left:60px;top:520px;background:${K.t};color:${K.bg};font-weight:800;font-size:26px;letter-spacing:.1em;padding:10px 20px;border-radius:12px">LA REALIDAD</div>
<div style="position:absolute;left:60px;right:60px;top:600px;display:flex;flex-direction:column;gap:26px">${[['📝', 'Una política de prevención', 'de riesgos psicosociales, escrita y difundida'], ['🔎', 'Identificar y analizar', 'los factores de riesgo de tu centro de trabajo'], ['🛠️', 'Medidas concretas', 'para prevenir y controlar lo que encuentres'], ['📂', 'Registros y seguimiento', 'no una encuesta que se archiva']].map(([e, t, d]) => `<div style="display:flex;gap:22px;align-items:center"><div style="width:84px;height:84px;border-radius:24px;background:${K.bg2};display:grid;place-items:center;font-size:42px;flex-shrink:0">${e}</div><div><div style="font-size:40px;font-weight:800">${t}</div><div style="font-size:28px;color:${K.s}">${d}</div></div></div>`).join('')}</div>
${firma()}`;
// Comparativa finanzas (miércoles)
const malo2 = [['📋', 'Copia el del año pasado', 'más un porcentaje “por si acaso”'], ['🤷', 'Gastos sin dueño', 'nadie responde por cada partida'], ['📅', 'Se revisa en diciembre', 'cuando ya no hay nada que corregir'], ['✂️', 'Recortes parejos', 'a todo por igual, sirva o no']];
const bueno2 = [['🎯', 'Cada gasto, un resultado', 'que se puede medir'], ['🙋', 'Un responsable por partida', 'que rinde cuentas'], ['📈', 'Revisión mensual', 'para corregir a tiempo'], ['🔁', 'Recortas lo que no da', 'y reinviertes en lo que sí']];
P.info_presupuesto = `<div class="up" style="position:absolute;left:60px;right:60px;top:60px;font-size:60px;text-align:center">¿Tu presupuesto<br><span class="or" style="font-size:84px">trabaja para ti?</span></div>
<div style="position:absolute;left:60px;right:60px;top:330px;text-align:center;font-size:30px;color:${K.s};line-height:1.35">Lo que veo en muchas empresas<br>vs. lo que sí funciona.</div>
<div style="position:absolute;left:180px;right:180px;top:440px;height:3px;background:${K.o}"></div>
<div class="up" style="position:absolute;left:60px;top:480px;font-size:34px"><span class="rd">✕ Por inercia</span></div>
<div class="up" style="position:absolute;left:570px;top:480px;font-size:34px"><span class="ac">✓ Por resultados</span></div>
${col(malo2, K.r, 60)}${col(bueno2, K.t, 570)}
<div style="position:absolute;left:540px;top:490px;width:2px;height:640px;background:rgba(255,255,255,.15)"></div>
${firma()}`;
// Humor laboral (jueves, serie "Jueves de realidad con humor")
P.humor_ley_silla = `<div style="position:absolute;inset:0;background:#fff"></div>
<div style="position:absolute;left:60px;right:60px;top:60px;color:#0F1E36;font-size:44px;font-weight:600;line-height:1.38">
— Gerente: Aquí siempre se ha trabajado de pie.<br>— Cajera: ¿Y si me pongo una silla?<br>— Gerente: Las sillas son para los clientes.<br>— La Ley Silla:</div>
<div style="position:absolute;left:60px;right:60px;top:440px;bottom:150px;border-radius:24px;overflow:hidden">
 <img src="${F('seria')}" style="position:absolute;left:0;top:-420px;width:960px">
 <div style="position:absolute;left:40px;bottom:40px;font-size:66px;font-weight:800;color:#fff;-webkit-text-stroke:8px #0F1E36;paint-order:stroke fill">¿Perdón? 🪑</div></div>
${firma(true)}`;
// Frase sin foto (viernes)
P.frase_fundador = `<div style="position:absolute;inset:0;background:radial-gradient(ellipse 90% 60% at 50% 100%,#123b4a,${K.bg})"></div>
<div style="position:absolute;left:70px;top:120px;font-family:PF,serif;font-size:220px;line-height:1;color:${K.t};opacity:.6">“</div>
<div style="position:absolute;left:80px;right:80px;top:400px;font-family:PF,serif;font-weight:700;font-size:72px;line-height:1.15">No construí CheckONOFF para vigilar a nadie.<br><span style="color:${K.o}">Lo construí para que nadie trabaje horas que no se pagan… ni se paguen horas que no se trabajaron.</span></div>
<div style="position:absolute;left:80px;top:1080px;font-size:28px;font-weight:700;letter-spacing:.14em;color:${K.s}">— DR. GARIBALDI CORONA · FUNDADOR</div>
${firma()}`;

// Nota a mano (referencia: post de Alexis Ibarra "REINGRESO", 48 reacciones en 3 h): hoja de libreta, letra a mano, resaltador, firma.
const MANO = `@font-face{font-family:Mano;font-weight:700;src:url(${b64('kalam_700.ttf', 'font/ttf')})}`;
const hl = (t, c = '#FFE36E') => `<span style="background:linear-gradient(transparent 38%,${c} 38%,${c} 88%,transparent 88%);padding:0 6px">${t}</span>`;
const flecha = `<span style="color:#F06B7A;font-family:IT,sans-serif;font-weight:800;margin-right:18px">→</span>`;
P.nota_control = `<style>${MANO}</style><div style="position:absolute;inset:0;background:#EFE9DD"></div>
<div style="position:absolute;left:40px;top:50px;width:1040px;height:1300px;background:#FBF8F1;box-shadow:0 20px 60px rgba(60,40,10,.18);transform:rotate(-2.2deg);transform-origin:0 0">
 <div style="position:absolute;left:60px;right:60px;top:70px;height:120px;border:2px solid #9a9488;display:flex">
  <div style="width:220px;border-right:2px solid #9a9488;display:grid;place-items:center;font-size:30px;letter-spacing:.14em;color:#6d675c">ASUNTO:</div>
  <div style="flex:1;display:flex;align-items:center;padding-left:34px;font-family:Mano;font-size:60px;color:#1d2433">${hl('REGISTRO DE JORNADA')}</div></div>
 <div style="position:absolute;left:60px;right:60px;top:190px;bottom:60px;border:2px solid #9a9488;border-top:0"></div>
 <div style="position:absolute;left:100px;right:90px;top:240px;font-family:Mano;color:#1d2433;font-size:62px;line-height:1.28">
  Registrar la hora de entrada no es desconfiar de tu equipo:<br>${hl('es proteger a los dos.', '#F7A1AC')}
  <div style="margin-top:44px;font-size:48px;line-height:1.25">
   <div>${flecha}${hl('Protege al trabajador.')}<div style="font-size:36px;margin:4px 0 22px 58px;color:#3a4152">Cada hora extra queda probada y se paga.</div></div>
   <div>${flecha}${hl('Protege a la empresa.')}<div style="font-size:36px;margin:4px 0 22px 58px;color:#3a4152">Pagas lo trabajado, ni más ni menos.</div></div>
   <div>${flecha}${hl('Se acaban las discusiones.')}<div style="font-size:36px;margin:4px 0 22px 58px;color:#3a4152">Nadie pelea por "a qué hora llegó".</div></div>
   <div>${flecha}${hl('Y desde 2027 es obligatorio.')}<div style="font-size:36px;margin:4px 0 0 58px;color:#3a4152">El registro debe ser electrónico.</div></div>
  </div></div>
 <div style="position:absolute;right:110px;bottom:110px;font-family:Mano;font-size:46px;color:#1d2433;padding:14px 34px;border:3px solid #F06B7A;border-radius:50%;transform:rotate(-6deg)">Dr. Garibaldi Corona</div>
</div>`;

(async () => {
  const OUT = path.join(D, 'out2'); fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of Object.entries(P)) {
    if (process.argv[2] && n !== process.argv[2]) continue;
    await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${MCSS}</style></head><body><div class="f">${body}</div></body></html>`);
    await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    await pg.screenshot({ path: path.join(OUT, n + '.jpg'), type: 'jpeg', quality: 90 }); console.log('ok', n);
  }
  await b.close();
})();
