const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'out_ad');
fs.mkdirSync(OUT, { recursive: true });
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const img = f => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'photos', f)).toString('base64');
eval(fs.readFileSync(path.join(__dirname, 'clock.inc.js'), 'utf8').replace('const clock', 'globalThis.clock'));

/* Zona segura de anuncios en historias (Meta): dejar libres ~270px arriba y ~380px abajo. */
const CSS = `
.tile,.brand .t,.brand .tile{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.tile img,.brand .t img,.brand img{object-fit:contain}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
.f{position:relative;overflow:hidden;width:1080px;height:1920px;color:#fff;background:#111C3B}
.bgph{position:absolute;inset:-60px;background-size:cover;background-position:center;filter:blur(16px) saturate(.9)}
.ov{position:absolute;inset:0;background:linear-gradient(160deg,rgba(17,28,59,.97) 0%,rgba(10,78,148,.9) 55%,rgba(52,182,20,.6) 100%)}
.ov2{position:absolute;inset:0;background:radial-gradient(ellipse 70% 40% at 80% 30%,rgba(255,255,255,.16),transparent 70%),linear-gradient(to bottom,transparent 70%,rgba(17,28,59,.8))}
.top{position:absolute;left:90px;right:90px;top:290px;display:flex;justify-content:space-between;align-items:center}
.tag{display:inline-flex;align-items:center;gap:12px;background:#E21B20;color:#fff;border-radius:999px;padding:14px 26px;font-size:28px;font-weight:800;letter-spacing:1px;box-shadow:0 12px 30px rgba(0,0,0,.25)}
.logo{display:flex;align-items:center;gap:12px;font-size:30px;font-weight:600}
.logo .t{width:60px;height:60px;border-radius:15px;background:#111C3B;display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.3)}.logo img{width:56px}
h1{font-weight:800;letter-spacing:-.035em;line-height:1.04;text-shadow:0 6px 30px rgba(0,25,0,.3)}
.hl{color:#C8FFB8}
.waBtn{display:flex;align-items:center;justify-content:center;gap:22px;background:#25D366;color:#fff;border-radius:999px;font-weight:800;letter-spacing:-.5px;box-shadow:0 24px 60px rgba(0,0,0,.35),0 0 0 6px rgba(255,255,255,.25)}
.check{display:flex;align-items:center;gap:20px;font-size:38px;font-weight:600;margin:16px 0}
.check i{flex-shrink:0;width:52px;height:52px;border-radius:50%;background:#fff;color:#017313;display:grid;place-items:center;font-style:normal;font-weight:900;font-size:30px}
.free{display:inline-block;background:#fff;color:#111C3B;font-weight:900;border-radius:14px;padding:4px 18px;transform:rotate(-3deg)}
`;

const waIcon = s => `<svg width="${s}" height="${s}" viewBox="0 0 48 48"><path fill="#fff" d="M24 4C13 4 4 12.9 4 23.8c0 3.6 1 7 2.8 9.9L4 44l10.6-2.7c2.8 1.5 6 2.3 9.4 2.3 11 0 20-8.9 20-19.8S35 4 24 4z"/><path fill="#25D366" d="M34.6 29.4c-.5 1.4-2.8 2.7-3.9 2.8-1 .2-2.3.2-3.7-.2-.9-.3-2-.6-3.4-1.2-6-2.6-9.9-8.6-10.2-9-.3-.4-2.4-3.2-2.4-6.1s1.5-4.3 2.1-4.9c.5-.6 1.2-.7 1.6-.7h1.1c.4 0 .9-.1 1.4 1.1.5 1.2 1.7 4.1 1.8 4.4.1.3.2.7 0 1.1-.2.4-.3.7-.6 1-.3.4-.6.8-.9 1.1-.3.3-.6.6-.3 1.2.4.6 1.6 2.6 3.4 4.2 2.3 2.1 4.3 2.7 4.9 3 .6.3 1 .3 1.3-.2.4-.4 1.5-1.8 1.9-2.4.4-.6.8-.5 1.4-.3.6.2 3.6 1.7 4.2 2s1 .5 1.2.7c.1.3.1 1.5-.5 2.9z"/></svg>`;

/* Mockup del grupo de WhatsApp */
const groupPhone = (w, style) => {
  const s = w / 500;
  const msg = (who, color, body, time, extra = '') => `<div style="background:#fff;border-radius:${14 * s}px;border-top-left-radius:${3 * s}px;padding:${12 * s}px ${16 * s}px;max-width:88%;box-shadow:0 1px 1px rgba(0,0,0,.1);font-size:${18 * s}px;line-height:1.35;color:#111">
    <div style="font-size:${15 * s}px;font-weight:700;color:${color}">${who}</div>${extra}${body}<div style="text-align:right;font-size:${12 * s}px;color:#888">${time}</div></div>`;
  const doc = (icon, name, meta, bg) => `<div style="display:flex;gap:${12 * s}px;align-items:center;background:${bg};border-radius:${10 * s}px;padding:${12 * s}px;margin:${6 * s}px 0"><div style="width:${46 * s}px;height:${54 * s}px;border-radius:${6 * s}px;background:#E53935;color:#fff;display:grid;place-items:center;font-size:${14 * s}px;font-weight:800">${icon}</div><div><b style="font-size:${17 * s}px">${name}</b><div style="font-size:${13 * s}px;color:#777">${meta}</div></div></div>`;
  return `<div style="width:${w}px;height:${1010 * s}px;background:#0A0A0A;border-radius:${76 * s}px;padding:${16 * s}px;box-shadow:0 60px 110px rgba(0,0,20,.55),0 0 0 3px #3A3A3A;${style}">
  <div style="width:100%;height:100%;border-radius:${62 * s}px;overflow:hidden;background:#EEF3F9;display:flex;flex-direction:column;position:relative">
    <div style="position:absolute;top:${22 * s}px;left:50%;transform:translateX(-50%);width:${140 * s}px;height:${40 * s}px;background:#000;border-radius:${24 * s}px;z-index:2"></div>
    <div style="height:${80 * s}px;background:#fff"></div>
    <div style="display:flex;align-items:center;gap:${14 * s}px;padding:${10 * s}px ${20 * s}px ${16 * s}px;background:#fff;border-bottom:1px solid #eee;color:#111">
      <span style="font-size:${26 * s}px">←</span>
      <div style="width:${56 * s}px;height:${56 * s}px;border-radius:50%;background:#111C3B;display:grid;place-items:center"><img src="${LOGO}" style="width:${52 * s}px"></div>
      <div><b style="font-size:${21 * s}px">Jornada 40 Horas MX 🇲🇽</b><div style="font-size:${15 * s}px;color:#777">Comunidad RRHH · por CheckONOFF</div></div>
    </div>
    <div style="flex:1;padding:${16 * s}px;display:flex;flex-direction:column;gap:${12 * s}px">
      <div style="align-self:center;background:#FFF5C4;color:#5B4A00;font-size:${14 * s}px;border-radius:${8 * s}px;padding:${6 * s}px ${12 * s}px">Te uniste al grupo 🎉</div>
      ${msg('CheckONOFF', '#017313', '¡Bienvenido! 👋 Aquí tienes tu guía gratis:', '9:00', '')}
      ${msg('CheckONOFF', '#017313', '', '9:01', doc('PDF', 'Guía implementación 40 h.pdf', '24 páginas · Checklist incluido', '#F5F5F5'))}
      ${msg('CheckONOFF', '#017313', '⏱️ <b>Calendario 2027–2030</b><br>2027 → 46 h · 2028 → 44 h<br>2029 → 42 h · 2030 → 40 h', '9:02')}
      ${msg('CheckONOFF', '#017313', '🎥 <b>Clase en vivo:</b> cómo reducir la jornada sin perder productividad.<br>📍 Próximo jueves · 7:00 p.m.', '9:05')}
    </div>
    <div style="display:flex;gap:${10 * s}px;align-items:center;padding:${12 * s}px ${16 * s}px ${20 * s}px"><div style="flex:1;background:#fff;border-radius:99px;padding:${14 * s}px ${20 * s}px;color:#888;font-size:${18 * s}px">Mensaje</div>
      <div style="width:${52 * s}px;height:${52 * s}px;border-radius:50%;background:#25A35A;display:grid;place-items:center;color:#fff;font-size:${22 * s}px">🎤</div></div>
  </div></div>`;
};

const bg = (photo = 'rrhh.jpg') => `<div class="bgph" style="background-image:url('${img(photo)}')"></div><div class="ov"></div><div class="ov2"></div>`;
const top = (tag) => `<div class="top"><div class="tag">${tag}</div><div class="logo"><span class="t"><img src="${LOGO}"></span>CheckONOFF</div></div>`;
const swipe = t => `<div style="position:absolute;left:0;right:0;bottom:250px;text-align:center;font-size:30px;font-weight:600;opacity:.85">${t}</div>`;

const PIECES = [
/* ===== HISTORIA PRINCIPAL (anuncio de una sola imagen) ===== */
['00_ANUNCIO_principal', `<div class="f">${bg()}
  ${top('🎁 100% GRATIS')}
  <h1 style="position:absolute;left:90px;right:90px;top:400px;font-size:84px">Jornada de 40 horas: <span class="hl">impleméntala paso a paso</span></h1>
  <div style="position:absolute;left:90px;top:800px;width:540px">
    <div class="check"><i>✓</i>Guía de implementación</div>
    <div class="check"><i>✓</i>Calendario 2027–2030</div>
    <div class="check"><i>✓</i>Clases en vivo</div>
    <div class="check"><i>✓</i>Checklist para RRHH</div>
  </div>
  ${groupPhone(390, 'position:absolute;right:55px;top:770px;transform:rotate(5deg)')}
  <div style="position:absolute;left:90px;top:1150px;display:flex;align-items:center;gap:18px;background:rgba(0,0,0,.28);border:2px solid rgba(255,255,255,.25);border-radius:24px;padding:20px 28px;font-size:30px;font-weight:600;line-height:1.25">
    <span style="font-size:52px">⏳</span><span>La reducción empieza el<br><b style="font-size:38px;color:#7DD818">1 de enero de 2027</b></span></div>
  <div class="waBtn" style="position:absolute;left:90px;right:90px;top:1420px;height:135px;font-size:52px">${waIcon(68)}Únete gratis al grupo</div>
  ${swipe('Toca <b>“Enviar mensaje”</b> 👇')}
</div>`],

/* ===== VERSIÓN CARRUSEL DE 3 HISTORIAS ===== */
['01_carrusel_gancho', `<div class="f">${bg('obra.jpg')}
  ${top('⚠️ REFORMA LABORAL')}
  <div style="position:absolute;left:0;right:0;top:420px;text-align:center"><div style="display:inline-block">${clock(560, 8, 0)}</div></div>
  <h1 style="position:absolute;left:90px;right:90px;top:1060px;font-size:96px;text-align:center">El 1 de enero de 2027 la jornada baja a <span class="hl">46 horas.</span></h1>
  <div style="position:absolute;left:90px;right:90px;top:1420px;text-align:center;font-size:52px;font-weight:700">¿Tu empresa ya tiene un plan? 🤔</div>
  ${swipe('Toca para ver más →')}
</div>`],

['02_carrusel_valor', `<div class="f">${bg()}
  ${top('🎁 100% GRATIS')}
  <h1 style="position:absolute;left:90px;right:90px;top:400px;font-size:84px">Te enseñamos a implementarla <span class="hl">paso a paso</span></h1>
  <div style="position:absolute;left:90px;top:760px;width:520px">
    <div class="check"><i>✓</i>Guía en PDF</div>
    <div class="check"><i>✓</i>Calendario 48 → 40 h</div>
    <div class="check"><i>✓</i>Turnos sin perder productividad</div>
    <div class="check"><i>✓</i>Clases en vivo</div>
    <div class="check"><i>✓</i>Checklist para RRHH</div>
  </div>
  ${groupPhone(420, 'position:absolute;right:50px;top:720px;transform:rotate(5deg)')}
  ${swipe('Toca para ver más →')}
</div>`],

['03_carrusel_cta', `<div class="f">${bg('obra.jpg')}
  ${top('📲 GRUPO DE WHATSAPP')}
  <div style="position:absolute;left:0;right:0;top:470px;text-align:center"><div style="display:inline-grid;place-items:center;width:250px;height:250px;border-radius:64px;background:#25D366;box-shadow:0 40px 90px rgba(0,0,0,.35)">${waIcon(170)}</div></div>
  <h1 style="position:absolute;left:90px;right:90px;top:800px;font-size:100px;text-align:center">Únete <span class="free">GRATIS</span><br>a la comunidad</h1>
  <div style="position:absolute;left:110px;right:110px;top:1110px;text-align:center;font-size:42px;font-weight:500;line-height:1.35;opacity:.95">Recibe la guía hoy mismo y entérate primero de las clases en vivo.</div>
  <div class="waBtn" style="position:absolute;left:90px;right:90px;top:1400px;height:140px;font-size:54px">${waIcon(70)}Quiero unirme</div>
  ${swipe('Toca <b>“Enviar mensaje”</b> 👇')}
</div>`],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  for (const [name, body] of PIECES) {
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
