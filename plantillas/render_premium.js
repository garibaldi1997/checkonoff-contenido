// Estándar premium (ref. Mandü / Humand): fotos claras a sangre, caja de titular,
// burbujas tipo chat con colita, logo pequeño y mucho aire.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const D = __dirname;
const b64 = (f, m) => `data:${m};base64,` + fs.readFileSync(path.join(D, f)).toString('base64');
const LOGO = b64('logo.png', 'image/png');
const FOTO = n => b64(`hq/${n}.jpg`, 'image/jpeg');
const QR = b64('qr_registro.png', 'image/png');
const FONTS = [400, 500, 600, 700, 800].map(w => `@font-face{font-family:IT;font-weight:${w};src:url(${b64(`fonts_it_${w}.ttf`, 'font/ttf')})}`).join('');
const OUT = path.join(D, 'out_premium'); fs.mkdirSync(OUT, { recursive: true });
const C = { navy: '#111C3B', g: '#34B614', lime: '#7DD818', mint: '#D9F5CC', r: '#E21B20', b: '#0A4E94' };

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:IT,sans-serif;-webkit-font-smoothing:antialiased}
.f{position:relative;width:1080px;height:1350px;overflow:hidden;background:#EEF1F4;color:${C.navy}}
.ph{position:absolute;left:0;width:1080px}
.box{position:absolute;left:64px;right:64px;border-radius:40px;padding:44px 52px;text-align:center;font-weight:700;letter-spacing:-.015em;line-height:1.12;box-shadow:0 18px 40px rgba(17,28,59,.18)}
.bb{position:absolute;font-weight:700;font-size:36px;line-height:1.2;letter-spacing:-.01em;padding:22px 32px;border-radius:26px;box-shadow:0 14px 34px rgba(17,28,59,.22)}
.bb:after{content:"";position:absolute;bottom:-14px;width:30px;height:30px;background:inherit;transform:rotate(45deg);border-radius:4px}
.bb.l:after{left:34px}.bb.r:after{right:34px}
.n{background:${C.navy};color:#fff}.m{background:${C.mint};color:${C.navy}}.w{background:#fff;color:${C.navy}}
.ast{position:absolute;width:90px;height:90px}.ast i{position:absolute;left:37px;top:0;width:16px;height:90px;border-radius:8px;background:${C.lime}}
.ast i:nth-child(2){transform:rotate(60deg)}.ast i:nth-child(3){transform:rotate(-60deg)}
.logo{position:absolute;right:56px;bottom:52px;display:flex;align-items:center;gap:12px;font-weight:700;font-size:26px;padding:10px 20px 10px 10px;border-radius:99px;background:rgba(255,255,255,.92);color:${C.navy}}
.logo img{width:40px;height:40px}
.sw{position:absolute;left:64px;bottom:56px;font-size:28px;font-weight:700;padding:16px 28px;border-radius:99px;background:${C.navy};color:#fff}
`;
const ast = (x, y, s = 1) => `<div class="ast" style="left:${x}px;top:${y}px;transform:scale(${s})"><i></i><i></i><i></i></div>`;
const bb = (x, y, cls, t, side = 'l') => `<div class="bb ${cls} ${side}" style="left:${x}px;top:${y}px">${t}</div>`;
const logo = `<div class="logo"><img src="${LOGO}">CheckONOFF</div>`;
const ph = (n, top, extra = '') => `<img class="ph" src="${FOTO(n)}" style="top:${top}px;${extra}">`;
const S = [];
const add = (n, html) => S.push([n, html]);
const G = s => `<span style="color:${C.lime}">${s}</span>`;
const GD = s => `<span style="color:${C.g}">${s}</span>`;

// 1 · Portada (Mandü): foto clara, caja de titular, burbujas del dolor
add('q_01', `${ph('estres_luz', -40)}
<div class="box n" style="top:60px;font-size:62px">Si tu cierre de ${G('quincena')} se ve así, es momento de un cambio</div>
${ast(900, 360, .8)}
${bb(600, 560, 'n r', '47 mensajes<br>sin leer.', 'r')}
${bb(560, 760, 'm r', 'Asistencia_FINAL_v7.xlsx', 'r')}
${bb(44, 1000, 'n l', 'Cuadrando checadas<br>a las 22:40 hrs.')}
${logo}`);

// 2 · El problema
add('q_02', `${ph('pensando', 150)}
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(238,241,244,1) 0%,rgba(238,241,244,.95) 22%,rgba(238,241,244,0) 40%)"></div>
<div style="position:absolute;left:72px;right:72px;top:90px;font-size:78px;font-weight:800;letter-spacing:-.025em;line-height:1.04">Cinco fuentes de asistencia.<br>${GD('Ninguna coincide.')}</div>
${bb(56, 900, 'n l', '🕒 Checador')}
${bb(70, 1050, 'm l', '💬 WhatsApp')}
${bb(720, 880, 'n r', '📄 Papel', 'r')}
${bb(700, 1030, 'm r', '📊 Excel', 'r')}
${bb(380, 1170, 'm l', '📞 “¿Quién faltó en Norte?”')}
${logo.replace('class="logo"', 'class="logo" style="bottom:auto;top:-200px"')}`);

// 3 · La ley cambió
add('q_03', `${ph('duda', -60)}
${ast(950, 120, .7)}
${bb(600, 230, 'n r', 'Máx. <b style="color:#7DD818">4 h</b> extra<br>dobles por día', 'r')}
${bb(640, 430, 'm r', 'Triples: tope<br><b>4 h</b> a la semana', 'r')}
${bb(600, 630, 'n r', 'Nunca más de<br><b style="color:#7DD818">12 h</b> en un día', 'r')}
<div class="box w" style="bottom:150px;font-size:58px;text-align:left">Y desde mayo de 2026,<br>la ley ${GD('también cambió.')}<div style="font-size:26px;font-weight:500;margin-top:16px;opacity:.6">Arts. 66 y 68 LFT · DOF 01/05/2026</div></div>
${logo}`);

// 4 · La solución
add('q_04', `${ph('feliz', -330, 'width:1400px;left:-160px')}
<div class="box" style="top:60px;font-size:60px;background:${C.g};color:#fff">Con CheckONOFF,<br>tu cierre se ve así</div>
${ast(900, 330, .7)}
${bb(48, 420, 'w l', '✅ 3 sucursales listas')}
${bb(48, 560, 'n l', '✅ Extras calculadas<br>con la LFT 2026')}
${bb(48, 740, 'm l', '✅ Pre-nómina en Excel')}
<div class="bb n r" style="right:48px;bottom:150px;font-size:34px">Viernes 17:05. A casa. 🏡</div>
${logo}`);

// 5 · Cómo checan
add('q_05', `${ph('laptop', -140)}<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(244,245,246,.97) 0%,rgba(244,245,246,.9) 22%,rgba(244,245,246,0) 38%)"></div>
<div style="position:absolute;left:72px;right:72px;top:110px;font-size:80px;font-weight:800;letter-spacing:-.025em;line-height:1.04">Tu equipo checa<br>${GD('como le acomode.')}</div>
${bb(56, 340, 'n l', '📱 App con foto')}
${bb(400, 340, 'm l', '💬 WhatsApp')}
${bb(730, 340, 'n r', '🖐️ Biométrico', 'r')}
<div class="box n" style="bottom:150px;font-size:52px">Y todo cae en ${G('un solo registro.')}<div style="font-size:30px;font-weight:500;margin-top:14px;opacity:.8">Horas, retardos, faltas y extras en automático</div></div>
${logo}`);

// 6 · CTA
add('q_06', `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#F4FBF0 0%,#DDF4D2 100%)"></div>
${ast(880, 120, 1.3)}${ast(930, 640, .6)}
<div style="position:absolute;left:72px;right:72px;top:300px;font-size:104px;font-weight:800;letter-spacing:-.03em;line-height:1.0">Recupera tus<br>noches de<br>${GD('quincena.')}</div>
<div style="position:absolute;left:72px;top:770px;font-size:38px;font-weight:500;line-height:1.35;width:820px;opacity:.85">Prueba CheckONOFF 14 días gratis.<br>Sin tarjeta. Te ayudamos a configurarlo.</div>
<div style="position:absolute;left:72px;top:960px;display:flex;gap:36px;align-items:center">
  <div style="background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 34px rgba(17,28,59,.12)"><img src="${QR}" style="width:200px;height:200px;image-rendering:pixelated;display:block"></div>
  <div><div style="background:${C.navy};color:#fff;font-size:38px;font-weight:700;padding:24px 40px;border-radius:99px">Empieza gratis →</div><div style="font-size:30px;font-weight:700;margin-top:18px;color:${C.g}">checkonoff.mx</div></div>
</div>
${logo}`);

(async () => {
  const only = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of S) {
    if (only.length && !only.some(o => n.startsWith(o))) continue;
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="f">${body}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(OUT, n + '.png') }); console.log('ok', n);
  }
  await b.close();
})();
