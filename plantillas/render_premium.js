// Estándar premium: foto real a sangre, titular grande, burbujas, poco texto.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const D = __dirname;
const b64 = (f, m) => `data:${m};base64,` + fs.readFileSync(path.join(D, f)).toString('base64');
const LOGO = b64('logo.png', 'image/png');
const FOTO = n => b64(`hq/${n}.jpg`, 'image/jpeg');
const QR = b64('qr_registro.png', 'image/png');
const FONTS = [400, 500, 600, 700, 800].map(w => `@font-face{font-family:IT;font-weight:${w};src:url(${b64(`fonts_it_${w}.ttf`, 'font/ttf')})}`).join('');
const OUT = path.join(D, 'out_premium'); fs.mkdirSync(OUT, { recursive: true });
const C = { navy: '#111C3B', g: '#34B614', lime: '#7DD818', r: '#E21B20', b: '#0A4E94' };

const CSS = `${FONTS}
*{box-sizing:border-box;margin:0;padding:0}body{font-family:IT,sans-serif;-webkit-font-smoothing:antialiased}
.f{position:relative;width:1080px;height:1350px;overflow:hidden;color:#fff;background:${C.navy}}
.ph{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sh{position:absolute;inset:0}
.top{position:absolute;top:56px;left:72px;right:72px;display:flex;justify-content:space-between;align-items:center;z-index:5}
.brand{display:flex;align-items:center;gap:14px;font-weight:700;font-size:28px;letter-spacing:-.01em}
.brand .tile{width:50px;height:50px;border-radius:13px;background:#fff;display:grid;place-items:center}.brand img{width:38px}
.cnt{font-size:26px;font-weight:600;letter-spacing:.08em;opacity:.85}
.body{position:absolute;left:72px;right:72px;z-index:4}
.h{font-weight:800;letter-spacing:-.022em;line-height:1.02}
.k{font-size:26px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.bar{width:120px;height:10px;border-radius:5px}
.swipe{display:inline-flex;align-items:center;gap:12px;font-size:28px;font-weight:700;padding:16px 28px;border-radius:99px;background:rgba(255,255,255,.14);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.25)}
.nt{position:absolute;z-index:3;display:flex;gap:18px;align-items:center;background:rgba(255,255,255,.93);color:${C.navy};border-radius:26px;padding:20px 26px;box-shadow:0 20px 50px rgba(0,0,0,.35);backdrop-filter:blur(14px)}
.nt .ic{flex:none;width:58px;height:58px;border-radius:15px;display:grid;place-items:center;font-size:30px;color:#fff;font-weight:800}
.nt b{display:block;font-size:26px;font-weight:700}.nt span{font-size:23px;color:#4A556F}
.nt i{font-style:normal;font-size:20px;color:#8A93A8;margin-left:auto;align-self:flex-start;padding-left:14px}
.foot{position:absolute;bottom:52px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:22px;opacity:.7;z-index:5}
`;
const top = (n, t, dark) => `<div class="top" style="color:${dark ? C.navy : '#fff'}"><div class="brand"><div class="tile" style="${dark ? `background:${C.navy}` : ''}"><img src="${LOGO}"></div>CheckONOFF</div><div class="cnt">${String(n).padStart(2, '0')} / ${String(t).padStart(2, '0')}</div></div>`;
const nt = (x, y, rot, ic, col, t, s, h) => `<div class="nt" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg)"><div class="ic" style="background:${col}">${ic}</div><div><b>${t}</b><span>${s}</span></div><i>${h}</i></div>`;
const S = [];
const add = (n, html) => S.push([n, html]);

// ── Carrusel: cierre de quincena (6) ──
const T = 6;
add('q_01', `<img class="ph" src="${FOTO('estres2')}" style="object-position:50% 75%">
<div class="sh" style="background:linear-gradient(180deg,rgba(17,28,59,.55) 0%,rgba(17,28,59,0) 28%,rgba(17,28,59,.2) 45%,rgba(17,28,59,.96) 72%)"></div>
${top(1, T)}
${nt(440, 170, 2, '💬', C.g, 'Coordinación · 47 sin leer', '"¿Ya quedó la asistencia?"', 'ahora')}
${nt(500, 330, -2, 'X', '#1D6F42', 'Asistencia_FINAL_v7.xlsx', 'Se modificó hace 2 min', '22:40')}
${nt(560, 485, 1.5, '!', C.r, '3 sucursales sin reporte', 'Cierre: mañana 9:00', 'jue')}
<div class="body" style="bottom:120px">
  <div class="bar" style="background:${C.r}"></div>
  <div class="h" style="font-size:96px;margin-top:34px">Si tu cierre de quincena se ve así,</div>
  <div class="h" style="font-size:96px;color:${C.lime}">es momento de un cambio.</div>
  <div style="margin-top:44px"><span class="swipe">Desliza →</span></div>
</div>`);
add('q_02', `<div class="sh" style="background:${C.navy}"></div>
${top(2, T)}
<div class="body" style="top:50%;transform:translateY(-46%)">
  <div class="k" style="color:${C.lime}">El problema</div>
  <div class="h" style="font-size:92px;margin-top:28px">No es tu equipo.<br><span style="color:${C.lime}">Es el proceso.</span></div>
  <div style="margin-top:80px;border-top:2px solid rgba(255,255,255,.14)">
    ${[['01', 'Revisar checadas a mano, sucursal por sucursal'], ['02', 'Corregir retardos y faltas uno por uno'], ['03', 'Calcular horas extra con fórmulas que nadie entiende']].map(([n, t]) => `<div style="display:flex;gap:36px;align-items:baseline;padding:34px 0;border-bottom:2px solid rgba(255,255,255,.14)"><span style="font-size:30px;font-weight:700;color:${C.lime}">${n}</span><span style="font-size:44px;font-weight:600;line-height:1.2">${t}</span></div>`).join('')}
  </div>
</div>`);
add('q_03', `<div class="sh" style="background:#fff"></div>
${top(3, T, true)}
<div class="body" style="top:50%;transform:translateY(-46%);color:${C.navy}">
  <div class="k" style="color:${C.r}">Y desde 2026</div>
  <div class="h" style="font-size:84px;margin-top:28px">La reforma cambió las reglas del tiempo extra.</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:70px">
    ${[['4 h', 'máximo de extras dobles por día'], ['4 días', 'máximo con extras por semana'], ['4 h', 'tope de triples a la semana'], ['12 h', 'tope total de trabajo por día']].map(([n, t], i) => `<div style="border-radius:28px;padding:38px 36px;background:${i === 3 ? C.navy : '#F2F6FB'};color:${i === 3 ? '#fff' : C.navy}"><div style="font-size:84px;font-weight:800;letter-spacing:-.04em;color:${i === 3 ? C.lime : C.b}">${n}</div><div style="font-size:32px;font-weight:500;margin-top:8px;line-height:1.25">${t}</div></div>`).join('')}
  </div>
  <div style="font-size:24px;margin-top:34px;color:#5B6782">Arts. 66 y 68 LFT · DOF 01/05/2026</div>
</div>`);
add('q_04', `<img class="ph" src="${FOTO('feliz')}" style="object-position:62% 40%">
<div class="sh" style="background:linear-gradient(180deg,rgba(17,28,59,.5) 0%,rgba(17,28,59,0) 25%,rgba(17,28,59,0) 42%,rgba(17,28,59,.95) 74%)"></div>
${top(4, T)}
${nt(80, 200, -1.5, '✓', C.g, 'Asistencia de 3 sucursales', 'Lista y sin capturas', '17:02')}
${nt(330, 345, 1.5, '✓', C.b, 'Extras dobles y triples', 'Calculadas con la ley 2026', '17:03')}
${nt(150, 490, -1, '✓', C.navy, 'Pre-nómina en Excel', 'Exportada', '17:05')}
<div class="body" style="bottom:120px">
  <div class="bar" style="background:${C.g}"></div>
  <div class="h" style="font-size:96px;margin-top:34px">Así se ve un cierre<br>con <span style="color:${C.lime}">CheckONOFF.</span></div>
  <div style="font-size:38px;font-weight:500;margin-top:28px;opacity:.9">Viernes, 17:05. Y te vas a casa.</div>
</div>`);
add('q_05', `<div class="sh" style="background:${C.navy}"></div>
${top(5, T)}
<div class="body" style="top:50%;transform:translateY(-46%)">
  <div class="k" style="color:${C.lime}">Cómo funciona</div>
  <div class="h" style="font-size:88px;margin-top:28px">3 pasos.<br>Cero capturas.</div>
  <div style="margin-top:70px;display:flex;flex-direction:column;gap:22px">
    ${[[C.g, '1', 'Tu equipo checa', 'App con foto y geocerca, biométrico o WhatsApp'], [C.b, '2', 'CheckONOFF calcula', 'Retardos, faltas, extras dobles y triples'], [C.r, '3', 'Tú revisas y exportas', 'Pre-nómina lista para tu sistema de nómina']].map(([c, n, t, s]) => `<div style="display:flex;gap:32px;align-items:center;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:28px;padding:32px 36px"><div style="flex:none;width:84px;height:84px;border-radius:50%;background:${c};display:grid;place-items:center;font-size:42px;font-weight:800">${n}</div><div><div style="font-size:44px;font-weight:700;letter-spacing:-.02em">${t}</div><div style="font-size:30px;opacity:.72;margin-top:6px">${s}</div></div></div>`).join('')}
  </div>
</div>`);
add('q_06', `<div class="sh" style="background:${C.g}"></div>
<div class="sh" style="background:radial-gradient(circle at 85% 10%,${C.lime} 0,rgba(125,216,24,0) 45%)"></div>
${top(6, T)}
<div class="body" style="top:260px">
  <div class="h" style="font-size:112px">Cierra la quincena en minutos,</div>
  <div class="h" style="font-size:112px;color:${C.navy}">no en noches.</div>
  <div style="display:flex;gap:40px;align-items:center;margin-top:90px">
    <div style="background:#fff;border-radius:28px;padding:18px"><img src="${QR}" style="width:220px;height:220px;image-rendering:pixelated;display:block"></div>
    <div>
      <div style="display:inline-block;background:${C.navy};color:#fff;font-size:40px;font-weight:700;padding:26px 40px;border-radius:99px">Prueba 14 días gratis →</div>
      <div style="font-size:30px;font-weight:600;margin-top:22px">Sin tarjeta · checkonoff.mx</div>
    </div>
  </div>
</div>
<div class="foot" style="opacity:.85"><span>Guarda este post para tu próximo cierre</span><span>🔖</span></div>`);

// ── Portada de impacto: reforma 40 h ──
add('ref_01', `<img class="ph" src="${FOTO('fabrica')}" style="object-position:50% 50%;filter:saturate(.85)">
<div class="sh" style="background:linear-gradient(180deg,rgba(10,16,36,.75) 0%,rgba(10,16,36,.35) 30%,rgba(10,16,36,.75) 55%,rgba(10,16,36,.98) 80%)"></div>
${top(1, 7)}
<div class="body" style="bottom:120px">
  <div class="k" style="color:#fff;opacity:.85">Reforma LFT · Jornada de 40 horas</div>
  <div class="h" style="font-size:108px;margin-top:30px">Menos horas de trabajo.</div>
  <div style="display:flex;gap:28px;align-items:stretch;margin-top:18px"><div style="flex:none;width:12px;border-radius:6px;background:${C.r}"></div><div class="h" style="font-size:108px;color:#FF5A4E">Más horas extra si no te preparas.</div></div>
  <div style="margin-top:48px"><span class="swipe">Desliza →</span></div>
</div>`);

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
