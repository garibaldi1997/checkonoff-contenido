const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'render2.js'), 'utf8');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const CSS = src.slice(src.indexOf('const CSS = `') + 13, src.indexOf('`;', src.indexOf('const CSS = `')));
const OUT = path.join(__dirname, 'out_reloj'); fs.mkdirSync(OUT, { recursive: true });
const brand = `<div class="brand"><div class="tile"><img src="${LOGO}"></div><span>CheckONOFF</span></div>`;
const count = (n, t) => `<div class="count">${n}/${t}</div>`;
const H = 1350, SH = 1920;
const S = [];
const add = (name, h, cls, body) => S.push([name, h, `<div class="f ${cls}">${body}</div>`]);
const li = (items, ic, color) => items.map(t => `<div style="display:flex;gap:22px;align-items:flex-start;font-size:42px;font-weight:600;line-height:1.3;margin:22px 0"><span style="flex:none;width:62px;height:62px;border-radius:50%;background:${color};color:#fff;display:grid;place-items:center;font-size:36px;font-weight:900">${ic}</span><span>${t}</span></div>`).join('');
add('r_01', H, 'dark', `${brand}${count(1, 6)}
<div style="margin-top:auto;align-self:flex-start">
  <div class="icon">⏰</div>
  <div class="h h1" style="margin-top:50px">¿El reloj checador ya es <span style="color:#FF4B3E">obligatorio</span> en México?</div>
  <div class="sub" style="margin-top:34px;font-size:42px;color:#fff">Respuesta corta: lo obligatorio es el <b class="gr">registro electrónico</b> de la jornada. Y ya está en la ley.</div>
  <div class="pill grn" style="margin-top:50px">Desliza →</div>
</div>`);
add('r_02', H, 'cream', `${brand}${count(2, 6)}
<div style="margin:auto 0;width:100%">
  <div style="font-size:30px;font-weight:800;letter-spacing:4px;color:#0A4E94">LO QUE DICE LA LEY</div>
  <div class="card" style="margin-top:26px;padding:44px;border-left:14px solid #0A4E94">
    <div style="font-size:44px;font-weight:600;line-height:1.38">"Registrar de manera electrónica la jornada laboral de cada persona trabajadora, incluyendo el horario de inicio y finalización; así como proporcionarlo a la autoridad cuando se le requiera."</div>
    <div style="font-size:30px;margin-top:24px;opacity:.7">— Art. 132, fracción XXXIV, LFT</div>
  </div>
  <div class="sub" style="margin-top:40px;font-size:38px">📅 En la ley desde el <b>1 de mayo de 2026</b> (DOF). Las reglas de la STPS entran en vigor el <b>1 de enero de 2027</b>.</div>
</div>`);
add('r_03', H, 'dark', `${brand}${count(3, 6)}
<div style="margin:auto 0;width:100%">
  <div class="h h2">Lo que <span style="color:#FF4B3E">ya no alcanza</span> ❌</div>
  <div style="margin-top:40px">${li(['Tarjetas de papel o libreta de asistencia', 'Excel llenado a mano al final de la quincena', 'Mensajes sueltos de WhatsApp o fotos de la lista', '"Él checa por mí"'], '✕', '#E21B20')}</div>
  <div class="sub" style="margin-top:30px;font-size:36px">No son un registro electrónico confiable de inicio y fin de cada jornada.</div>
</div>`);
add('r_04', H, 'cream', `${brand}${count(4, 6)}
<div style="margin:auto 0;width:100%">
  <div class="h h2">No tiene que ser de huella. Lo que <span class="gr">sí debe tener</span> ✅</div>
  <div style="margin-top:36px">${li(['Hora de entrada y salida de cada persona, cada día', 'Que identifique a quien registra', 'Que no se pueda alterar sin dejar rastro', 'Que puedas entregarlo a la autoridad cuando lo pida'], '✓', '#34B614')}</div>
  <div class="sub" style="margin-top:24px;font-size:34px">Puede ser reloj biométrico, app o kiosco. La STPS definirá los detalles en sus reglas.</div>
</div>`);
add('r_05', H, 'dark', `${brand}${count(5, 6)}
<div style="margin:auto 0;width:100%">
  <div class="h h2">¿Y si no lo tengo? 💸</div>
  <div class="card" style="margin-top:40px;padding:36px 40px">
    <div style="font-size:30px;font-weight:800;letter-spacing:3px;color:#E21B20">MULTA · ART. 994 FR. IV BIS</div>
    <div style="font-size:66px;font-weight:900;margin-top:8px">250 a 5,000 UMA</div>
    <div style="font-size:36px;margin-top:6px;opacity:.75">≈ $29,327 a $586,550 (UMA 2026)</div>
  </div>
  <div style="margin-top:30px">${li(['En una demanda, la empresa debe probar los horarios (Arts. 784 y 804)', 'El registro hace prueba plena solo si lo <b>acordaste por escrito</b> con el trabajador'], '!', '#F5A300')}</div>
</div>`);
add('r_06', H, 'green', `${brand}${count(6, 6)}
<div style="margin:auto 0;text-align:center">
  <div class="h h2">Cumple sin cambiar todo tu equipo</div>
  <div class="card" style="margin:44px auto 0;width:880px;padding:28px 40px;text-align:left">
    ${[['📲', 'App con geocerca y foto (funciona sin internet)'], ['🖐️', 'Conecta el biométrico que ya tienes'], ['💬', 'O checa por WhatsApp'], ['📊', 'Horas, extras y pre-nómina en automático']].map(([e, t]) => `<div style="font-size:38px;font-weight:700;margin:16px 0">${e} ${t}</div>`).join('')}
  </div>
  <div class="pill blk" style="margin-top:44px;font-size:40px;padding:26px 48px">Prueba 14 días gratis →</div>
  <div style="margin-top:22px;font-size:34px;font-weight:700">checkonoff.mx</div>
</div>`);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [n, h, body] of S) {
    await p.setViewportSize({ width: 1080, height: h });
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}.f{width:1080px;height:${h}px}</style></head><body>${body}</body></html>`);
    await p.waitForTimeout(100); await p.screenshot({ path: path.join(OUT, n + '.png') }); console.log('ok', n);
  }
  await b.close();
})();
