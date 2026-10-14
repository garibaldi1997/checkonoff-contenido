const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const LOGOF = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo_full.png')).toString('base64');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const G = '#34B614', INK = '#111C3B', CREAM = '#F2F6FB';

const brand = (dark) => `<div class="brand ${dark ? 'on-dark' : ''}"><span class="tile"><img src="${LOGO}"></span>CheckONOFF</div>`;
let n = 0;
const page = (body, cls = '', foot = true) => { n++; return `<section class="pg ${cls}">${body}${foot ? `<div class="foot"><span>Guía RRHH · Jornada de 40 horas</span><span>checkonoff.mx · ${n}</span></div>` : ''}</section>`; };
const head = (num, kicker, title) => `${brand()}<div class="kicker">${num ? `<b>${num}</b>` : ''}${kicker}</div><h2>${title}</h2>`;
const check = (items) => `<ul class="chk">${items.map(t => `<li><span class="box"></span><div>${t}</div></li>`).join('')}</ul>`;

const P = [];
// 1 Portada
P.push(page(`
  ${brand(true)}
  <img src="${LOGOF}" style="position:absolute;right:.75in;top:.55in;height:1.25in;background:#fff;border-radius:18px;padding:8px">
  <div class="cover-tag">GUÍA GRATUITA PARA RRHH</div>
  <h1>Cómo preparar a tu empresa para la <span>jornada de 40 horas</span></h1>
  <p class="lead">Calendario 2027–2030, nuevas reglas de tiempo extra, registro electrónico obligatorio, plan paso a paso y checklist año por año.</p>
  <div class="steps-cover">
    ${[['48 h','Hoy'],['46 h','2027'],['44 h','2028'],['42 h','2029'],['40 h','2030']].map(([h,y],i)=>`<div class="sc ${i==4?'last':''}"><b>${h}</b><span>${y}</span></div>`).join('<i>→</i>')}
  </div>
  <div class="cover-foot">Edición octubre 2026 · Basada en el decreto publicado en el DOF el 1 de mayo de 2026 · checkonoff.mx</div>`, 'cover', false));

// 2 Índice + cómo usar
P.push(page(`${head('', 'Contenido', 'Lo que vas a encontrar')}
  <ol class="toc">
    ${['Qué cambia y cuándo','Lo que no cambia','Paso 1 · Mide la jornada real','Paso 2 · Rediseña turnos','Paso 3 · Actualiza documentos','Paso 4 · Controla el tiempo extra','Paso 5 · Registro electrónico obligatorio','Checklist año por año','Plantilla de diagnóstico'].map((t,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b>${t}</li>`).join('')}
  </ol>
  <div class="note"><b>Para quién es:</b> gerentes y analistas de RRHH, responsables de nómina y dueños de PyMEs con personal operativo (manufactura, retail, restaurantes, logística, construcción, salud).</div>
  <div class="note warn"><b>Importante:</b> esta guía resume el decreto de reforma a la Ley Federal del Trabajo publicado en el Diario Oficial de la Federación el 1 de mayo de 2026. Es informativa y no sustituye asesoría legal: antes de cambiar contratos o reglamentos, consulta a tu abogado laboral.</div>`));

// 3 Qué cambia
P.push(page(`${head('01', 'Calendario', 'Qué cambia y cuándo')}
  <p class="p">El decreto entró en vigor el <b>1 de mayo de 2026</b>. De mayo a diciembre de 2026 es un periodo de ajuste, y a partir de 2027 la jornada máxima baja 2 horas cada 1 de enero, <b>sin reducir sueldos, salarios ni prestaciones</b>.</p>
  <table class="tb">
    <tr><th>Año</th><th>Jornada máxima semanal</th><th>Extra al doble (máx. por semana)</th><th>Ejemplo de distribución</th></tr>
    <tr><td>2026</td><td><b>48 h</b></td><td>9 h</td><td>6 días × 8 h</td></tr>
    <tr><td>2027</td><td><b>46 h</b></td><td>9 h</td><td>5 días × 8 h + 1 día × 6 h</td></tr>
    <tr><td>2028</td><td><b>44 h</b></td><td>10 h</td><td>5 días × 8 h + 1 día × 4 h</td></tr>
    <tr><td>2029</td><td><b>42 h</b></td><td>11 h</td><td>6 días × 7 h</td></tr>
    <tr class="hl"><td>2030</td><td><b>40 h</b></td><td>12 h</td><td>5 días × 8 h</td></tr>
  </table>
  <div class="bars">${[48,46,44,42,40].map((h,i)=>`<div class="bar"><div class="fill" style="width:${h/48*100}%"><span>${h} h</span></div><em>${['2026','2027','2028','2029','2030'][i]}</em></div>`).join('')}</div>
  <div class="note"><b>Clave para RRHH:</b> cada año cambian dos límites, la jornada ordinaria y las horas extra al doble. No basta con ajustar una vez: necesitas un plan de 4 etapas y datos reales de cuántas horas trabaja cada puesto.</div>`));

// 4 Lo que no cambia
P.push(page(`${head('02', 'Sin confusiones', 'Lo que no cambia')}
  <div class="grid2">
    ${[['💵','El salario no baja','La reducción de horas no autoriza a reducir sueldos ni prestaciones.'],
       ['🗓️','Un día de descanso','Por cada 6 días de trabajo, al menos 1 día de descanso con goce de salario íntegro (Art. 69 LFT).'],
       ['🛡️','La carga de la prueba','Si hay una demanda por jornada u horas extra, la empresa debe probar los horarios (Arts. 784 y 804 LFT).'],
       ['📅','Tus otras obligaciones','Jornada diaria de 8 h (diurna), vacaciones, prima vacacional, prima dominical, días festivos y aguinaldo siguen igual.']]
      .map(([e,t,d])=>`<div class="card"><div class="em">${e}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
  <div class="note"><b>Error frecuente:</b> “si bajo la jornada, también bajo el sueldo proporcional”. No. Ajusta la operación, no el salario.</div>
  <div class="note warn"><b>Lo que SÍ cambió además de la jornada:</b> las reglas del tiempo extra (Paso 4) y la obligación de registrar la jornada de forma electrónica (Paso 5).</div>`));

// 5 Paso 1
P.push(page(`${head('03', 'Paso 1', 'Mide la jornada real de hoy')}
  <p class="p">No puedes planear 46 horas si no sabes cuántas horas trabaja hoy cada puesto. El horario del contrato casi nunca coincide con la realidad.</p>
  <h4>Qué medir durante 4 semanas</h4>
  ${check(['Horas reales por colaborador, por puesto y por sucursal.','Entradas, salidas y tiempo de comida o descanso.','Horas extra actuales: quién, cuántas y en qué días.','Retardos, faltas y permisos (para no confundirlos con jornada).','Picos de demanda: días y horas con más trabajo.'])}
  <div class="callout"><b>Resultado esperado:</b> una tabla con la jornada promedio por puesto. Todo puesto arriba de 46 h semanales es tu prioridad para 2027. Usa la plantilla de la última página.</div>`));

// 6 Paso 2
P.push(page(`${head('04', 'Paso 2', 'Rediseña turnos sin perder cobertura')}
  <p class="p">Con menos horas por persona, la pregunta no es “¿cuántas horas quito?”, sino “¿cómo cubro la operación?”.</p>
  <div class="grid2">
    ${[['Turnos escalonados','Las entradas y salidas en horarios distintos cubren los picos sin alargar la jornada de nadie.'],
       ['Jornada de 5 días','Para 2030, 5 × 8 h es el esquema más simple. Puedes probarlo antes en áreas administrativas.'],
       ['Días parciales','En 2027 y 2028, un sexto día corto (6 h o 4 h) te ayuda a cuidar la cobertura.'],
       ['Polivalencia','Capacitar a tu personal en 2 o más puestos reduce la dependencia de horas extra.']]
      .map(([t,d])=>`<div class="card sm"><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
  <h4>Preguntas para cada área</h4>
  ${check(['¿Qué horas del día tienen menos actividad?','¿Qué tareas se pueden automatizar o eliminar?','¿Necesito contratar o basta con reorganizar?','¿Cómo afecta a las sucursales con poco personal?'])}`));

// 7 Paso 3
P.push(page(`${head('05', 'Paso 3', 'Actualiza tus documentos')}
  <p class="p">Cada cambio de jornada debe quedar por escrito. Así evitas conflictos y tienes evidencia ante una inspección o una demanda.</p>
  <table class="tb">
    <tr><th>Documento</th><th>Qué revisar</th></tr>
    <tr><td><b>Contratos individuales</b></td><td>Horario, duración de la jornada y días de descanso.</td></tr>
    <tr><td><b>Contrato colectivo</b></td><td>Si existe, cláusulas de jornada y tiempo extra (negociar con el sindicato).</td></tr>
    <tr><td><b>Reglamento interior</b></td><td>Horarios, tolerancias, descansos y reglas para autorizar tiempo extra.</td></tr>
    <tr><td><b>Avisos al personal</b></td><td>Fecha de cambio y nuevo horario, con firma de enterado.</td></tr>
    <tr><td><b>Política de tiempo extra</b></td><td>Quién lo autoriza, cómo se solicita y cómo se registra.</td></tr>
  </table>
  <div class="note warn"><b>Recomendación:</b> haz estos cambios con tu abogado laboral, sobre todo si tienes contrato colectivo.</div>`));

// 8 Paso 4
P.push(page(`${head('06', 'Paso 4', 'Controla el tiempo extra: reglas nuevas')}
  <p class="p">La reforma cambió los Arts. 66 y 68 de la LFT. El tiempo extra sigue siendo voluntario y ahora tiene topes claros:</p>
  <table class="tb">
    <tr><th>Regla</th><th>Límite</th></tr>
    <tr><td><b>Horas extra al doble</b></td><td>Hasta 9 h por semana en 2026 y 2027; 10 h en 2028, 11 h en 2029 y 12 h en 2030</td></tr>
    <tr><td><b>Por día y por semana</b></td><td>Máximo 4 h extra al día, en máximo 4 días de la semana</td></tr>
    <tr><td><b>Horas extra al triple</b></td><td>Solo hasta 4 h más por semana (200 % más del salario por hora)</td></tr>
    <tr><td><b>Tope diario total</b></td><td>Jornada ordinaria + extra: nunca más de 12 h al día</td></tr>
  </table>
  <div class="calc">
    <div class="calc-h">Ejemplo de impacto en 2027 (cifras ilustrativas)</div>
    <div class="row"><span>Salario diario · salario por hora (jornada de 8 h)</span><b>$350 · $43.75</b></div>
    <div class="row"><span>Si sigue trabajando 48 h → 2 h extra al doble por semana</span><b>$175 / semana</b></div>
    <div class="row"><span>Por 50 colaboradores × 52 semanas</span><b class="big">≈ $455,000 al año</b></div>
  </div>
  <h4>Cómo evitarlo</h4>
  ${check(['Autoriza el tiempo extra por escrito y antes de trabajarlo.','Revisa cada semana quién se acerca al tope de horas dobles del año.','Vigila los 4 días y las 4 horas diarias: rebasarlos es incumplir la ley.'])}`));

// 9 Paso 5
P.push(page(`${head('07', 'Paso 5', 'Registro electrónico obligatorio')}
  <p class="p">La reforma agregó la fracción XXXIV al Art. 132 de la LFT: la empresa debe <b>registrar de manera electrónica la jornada de cada persona trabajadora</b>, con su hora de inicio y de fin, y entregarla a la autoridad cuando se le pida.</p>
  <div class="grid2">
    ${[['📅','Desde 2027','Las disposiciones de la STPS (alcance y excepciones) entran en vigor el 1 de enero de 2027.'],
       ['💸','Multa','De 250 a 5,000 UMA por incumplir esta obligación (Art. 994 fr. IV Bis LFT).'],
       ['🤝','Prueba plena','El registro electrónico hace prueba plena si se acredita que fue acordado entre la empresa y la persona trabajadora.'],
       ['🛡️','Tu defensa','En una demanda por jornada u horas extra, la empresa debe probar los horarios (Arts. 784 y 804 LFT).']]
      .map(([e,t,d])=>`<div class="card sm"><div class="em">${e}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
  <h4>Qué hacer desde ahora</h4>
  ${check(['Elegir un sistema que registre entradas, salidas, descansos y tiempo extra de cada colaborador.','Firmar con cada persona un acuerdo para el uso del registro electrónico.','Entregar el aviso de privacidad si usas foto, ubicación o datos biométricos.','Definir cómo se aclaran y corrigen los registros sin borrar el original.'])}`));

// 10 Checklist año por año
const yrs = [
  ['Ahora · fin de 2026', ['Medir la jornada real por puesto (4 semanas).','Detectar puestos arriba de 46 h.','Definir los responsables del proyecto (RRHH, operación, nómina).','Revisar contratos, reglamento y contrato colectivo.','Implementar el registro electrónico y firmar los acuerdos con cada persona.']],
  ['2027 · 46 h', ['Aplicar los nuevos horarios y avisar por escrito.','Vigilar el tiempo extra cada semana (9 h dobles, 4 triples).','Aplicar las reglas de la STPS sobre el registro electrónico.','Medir el costo real contra el presupuesto.']],
  ['2028 · 44 h', ['Ajustar turnos con los datos de 2027 (el tope de horas dobles sube a 10).','Capacitar en polivalencia a las áreas críticas.']],
  ['2029 · 42 h', ['Evaluar si hace falta contratar personal.','Automatizar las tareas que consumen más horas.']],
  ['2030 · 40 h', ['Consolidar el esquema final (por ejemplo, 5 × 8 h).','Auditar los registros y la política de tiempo extra.']],
];
P.push(page(`${head('08', 'Checklist', 'Año por año')}
  <div class="years">${yrs.map(([t,it])=>`<div class="yr"><div class="yt">${t}</div>${check(it)}</div>`).join('')}</div>`));

// 11 Plantilla
P.push(page(`${head('09', 'Plantilla', 'Diagnóstico de jornada por puesto')}
  <p class="p">Llénala con 4 semanas de registros reales. Marca en rojo cualquier puesto arriba del límite del año siguiente.</p>
  <table class="tb tpl">
    <tr><th>Puesto / área</th><th>Sucursal</th><th>Personas</th><th>Horas reales / semana</th><th>Horas extra / semana</th><th>¿Arriba de 46 h?</th></tr>
    ${Array.from({length:10}).map(()=>'<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>').join('')}
  </table>`));

// 12 CTA
P.push(page(`${brand(true)}
  <div class="cta-wrap">
    <div class="cover-tag">SIGUIENTE PASO</div>
    <h1 style="font-size:46px">Con menos horas, <span>cada minuto tiene que quedar registrado.</span></h1>
    <p class="lead">CheckONOFF registra entradas, salidas, descansos y tiempo extra de todas tus sucursales, y te entrega la pre-nómina en un clic.</p>
    <div class="feat">${['Registro electrónico de entradas y salidas por WhatsApp, con hora, GPS y foto','Horas trabajadas y tiempo extra por colaborador y sucursal','Retardos, faltas, permisos y vacaciones según la LFT','Pre-nómina lista para exportar'].map(t=>`<div>✓ ${t}</div>`).join('')}</div>
    <a class="cta-btn" href="https://checkonoff.mx">Prueba 14 días gratis en checkonoff.mx</a>
    <p class="small">Desde $39 MXN por colaborador al mes.</p>
    <a class="wa" href="${'https://chat.whatsapp.com/DyoKg8wa7IQCWzT9UgOyge'}"><b>💬 Únete a la comunidad Jornada 40 hrs MX</b><span>Clases en vivo, plantillas y novedades de la reforma para RRHH. Gratis por WhatsApp.</span><em>Unirme al grupo →</em></a>
  </div>`, 'cover', false));

const CSS = `@page{size:Letter;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;color:${INK};-webkit-font-smoothing:antialiased;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.pg{width:8.5in;height:11in;padding:.7in .75in .9in;position:relative;overflow:hidden;page-break-after:always;background:#fff}
.cover{background:radial-gradient(ellipse 80% 45% at 85% 100%,rgba(52,182,20,.45),transparent 65%),${INK};color:#fff}
.brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px;letter-spacing:-.2px}
.brand .tile{display:grid;place-items:center}.brand img{height:34px}

.cover-tag{display:inline-block;margin-top:1.4in;background:${G};color:#fff;font-weight:800;font-size:12px;letter-spacing:2.5px;padding:8px 16px;border-radius:99px}
h1{font-size:54px;line-height:1.02;letter-spacing:-.045em;font-weight:800;margin-top:22px}
h1 span{color:#7DD818}
.lead{font-size:18px;line-height:1.5;color:#D4DCEA;margin-top:22px;max-width:5.6in}
.steps-cover{display:flex;align-items:center;gap:8px;margin-top:.7in}
.steps-cover i{color:#6B7690;font-style:normal;font-size:18px}
.sc{flex:1;border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:14px 8px;text-align:center}
.sc b{display:block;font-size:26px;letter-spacing:-.03em}.sc span{font-size:12px;color:#7DD818;font-weight:700}
.sc.last{background:${G};border-color:${G}}.sc.last span{color:#111C3B}
.cover-foot{position:absolute;bottom:.6in;left:.75in;font-size:12px;color:#8A93A8}
.kicker{margin-top:.45in;font-size:12px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:${G};display:flex;gap:10px;align-items:center}
.kicker b{background:${G};color:#fff;border-radius:6px;padding:3px 7px}
h2{font-size:36px;letter-spacing:-.04em;line-height:1.08;font-weight:800;margin-top:10px}
h3{font-size:16px;font-weight:700;letter-spacing:-.01em;margin-top:6px}
h4{font-size:15px;font-weight:800;margin-top:24px;letter-spacing:-.01em}
.p{font-size:15px;line-height:1.6;color:#2E3A55;margin-top:16px}
.toc{list-style:none;margin-top:22px}.toc li{display:flex;gap:18px;padding:12px 0;border-bottom:1px solid #E6EBF3;font-size:16px;font-weight:600}.toc b{color:${G};width:24px}
.note{margin-top:20px;background:${CREAM};border-radius:12px;padding:14px 18px;font-size:13.5px;line-height:1.55;color:#2E3A55}
.note.warn{background:#FDECEC;border-left:5px solid #E21B20}
.callout{margin-top:24px;border-left:5px solid ${G};background:#EAF7E4;border-radius:0 12px 12px 0;padding:16px 20px;font-size:14px;line-height:1.55}
.tb{width:100%;border-collapse:separate;border-spacing:0;margin-top:22px;font-size:13.5px;border:1px solid #DCE3EE;border-radius:12px;overflow:hidden}
.tb th{background:#0A4E94;color:#fff;text-align:left;padding:11px 12px;font-weight:700;font-size:12.5px}
.tb td{padding:11px 12px;border-top:1px solid #E6EBF3;line-height:1.4}
.tb tr.hl td{background:#EAF7E4}
.tpl td{height:.42in}
.bars{margin-top:24px}.bar{display:flex;align-items:center;gap:12px;margin:7px 0}.bar em{font-style:normal;font-size:12px;font-weight:700;color:#4A5670;width:40px;order:-1}
.fill{background:${G};height:26px;border-radius:7px;display:flex;align-items:center;justify-content:flex-end;padding-right:10px}.fill span{color:#fff;font-weight:800;font-size:12px}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
.card{background:${CREAM};border-radius:14px;padding:18px}.card p{font-size:13.5px;line-height:1.5;color:#4A5670;margin-top:6px}.card .em{font-size:24px}
.chk{list-style:none;margin-top:12px}.chk li{display:flex;gap:12px;align-items:flex-start;font-size:14px;line-height:1.45;padding:7px 0}
.box{flex:none;width:16px;height:16px;border:2px solid ${G};border-radius:4px;margin-top:2px}
.calc{margin-top:22px;border:1px solid #DCE3EE;border-radius:14px;overflow:hidden}
.calc-h{background:${INK};color:#fff;font-weight:700;font-size:13px;padding:11px 16px}
.calc .row{display:flex;justify-content:space-between;padding:11px 16px;border-top:1px solid #E6EBF3;font-size:14px}
.calc .big{color:${G};font-size:18px}
.years{margin-top:14px}.yr{border:1px solid #DCE3EE;border-radius:12px;padding:10px 16px;margin-top:10px}.yt{font-weight:800;font-size:14px;color:${G}}.yr .chk{margin-top:2px}.yr .chk li{padding:3px 0;font-size:13px}
.foot{position:absolute;left:.75in;right:.75in;bottom:.45in;display:flex;justify-content:space-between;font-size:10.5px;color:#8A93A8;border-top:1px solid #E6EBF3;padding-top:10px}
.cta-wrap{margin-top:.6in}.feat{margin-top:26px;display:grid;gap:10px}.feat div{font-size:15px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 16px}
.cta-btn{margin-top:30px;display:inline-block;background:${G};color:#fff;font-weight:800;font-size:18px;padding:16px 28px;border-radius:99px}
.wa{display:block;margin-top:34px;text-decoration:none;color:#fff;border:1px solid rgba(79,209,61,.5);background:rgba(52,182,20,.14);border-radius:16px;padding:18px 22px}.wa b{display:block;font-size:17px}.wa span{display:block;font-size:13.5px;color:#D4DCEA;margin-top:6px;line-height:1.45}.wa em{display:inline-block;margin-top:10px;font-style:normal;font-weight:800;color:#7DD818;font-size:14px}a.cta-btn{text-decoration:none}
.small{font-size:12.5px;color:#8A93A8;margin-top:14px}`;

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><title>Guía RRHH: jornada de 40 horas · CheckONOFF</title><style>${CSS}</style></head><body>${P.join('')}</body></html>`);
  await p.waitForTimeout(300);
  await p.pdf({ path: path.join(__dirname, 'guia-40-horas-checkonoff.pdf'), format: 'Letter', printBackground: true, preferCSSPageSize: true });
  await b.close(); console.log('ok');
})();
