const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'render2.js'), 'utf8');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const CSS = src.slice(src.indexOf('const CSS = `') + 13, src.indexOf('`;', src.indexOf('const CSS = `')));
const OUT = path.join(__dirname, 'out_hoy'); fs.mkdirSync(OUT, { recursive: true });
const brand = `<div class="brand"><div class="tile"><img src="${LOGO}"></div><span>CheckONOFF</span></div>`;
const count = (n, t) => `<div class="count">${n}/${t}</div>`;
const H = 1350, SH = 1920;
const S = [];
const add = (name, h, cls, body) => S.push([name, h, `<div class="f ${cls}">${body}</div>`]);
const tipo = (n, e, t, horario, max, nota, cls, color) => add(`j_0${n}`, H, cls, `${brand}${count(n, 6)}
<div style="margin:auto 0;align-self:flex-start;width:100%">
  <div style="font-size:150px">${e}</div>
  <div class="h h1" style="margin-top:20px">Jornada <span style="color:${color}">${t}</span></div>
  <div class="card" style="margin-top:50px;padding:36px 40px">
    <div style="font-size:30px;font-weight:700;letter-spacing:3px;color:${color}">HORARIO</div>
    <div style="font-size:54px;font-weight:800;margin-top:6px">${horario}</div>
    <div style="font-size:30px;font-weight:700;letter-spacing:3px;color:${color};margin-top:30px">MÁXIMO AL DÍA (ART. 61)</div>
    <div style="font-size:80px;font-weight:900;margin-top:6px">${max}</div>
  </div>
  <div class="sub" style="margin-top:36px;font-size:38px">${nota}</div>
</div>`);
add('j_01', H, 'dark', `${brand}${count(1, 6)}
<div style="margin-top:auto;align-self:flex-start">
  <div class="icon">🤔</div>
  <div class="h h1" style="margin-top:50px">¿Tu turno es <span style="color:#FF4B3E">"vespertino"</span>?</div>
  <div class="h h2" style="margin-top:30px">Para la Ley Federal del Trabajo, <span class="gr">no existe.</span></div>
  <div class="sub" style="margin-top:30px;font-size:40px;color:#fff">Solo hay 3 tipos de jornada (Art. 60). Si lo clasificas mal, calculas mal las horas extra.</div>
  <div class="pill grn" style="margin-top:50px">Desliza →</div>
</div>`);
tipo(2, '☀️', 'diurna', '06:00 a 20:00', '8 horas', 'Todo el turno queda dentro del horario de día.', 'cream', '#0A4E94');
tipo(3, '🌙', 'nocturna', '20:00 a 06:00', '7 horas', 'También es nocturna si el turno tiene <b>3.5 h o más</b> después de las 20:00.', 'dark', '#7DD818');
tipo(4, '🌗', 'mixta', 'Abarca día y noche', '7.5 horas', 'Siempre que la parte nocturna sea <b>menor de 3.5 h</b>.', 'cream', '#34B614');
add('j_05', H, 'dark', `${brand}${count(5, 6)}
<div style="margin:auto 0;width:100%">
  <div class="h h2">Ejemplos reales</div>
  ${[['07:00 – 15:00','0 h nocturnas','☀️ DIURNA · máx. 8 h','#F5B700'],['14:00 – 21:30','1.5 h nocturnas','🌗 MIXTA · máx. 7.5 h','#34B614'],['16:00 – 00:00','4 h nocturnas','🌙 NOCTURNA · máx. 7 h → 1 h extra','#E21B20']].map(([h,n,r,c])=>`
  <div class="card" style="margin-top:34px;padding:30px 36px;display:flex;justify-content:space-between;align-items:center;gap:20px">
    <div><div style="font-size:46px;font-weight:900;white-space:nowrap">${h}</div><div style="font-size:30px;opacity:.75;margin-top:4px">${n}</div></div>
    <div style="font-size:30px;font-weight:800;color:#fff;background:${c};border-radius:999px;padding:14px 22px;text-align:center;max-width:430px">${r}</div>
  </div>`).join('')}
  <div class="sub" style="margin-top:36px;font-size:36px">El turno de 16:00 a 00:00 parece "de 8 horas", pero por ley es nocturno: la octava hora es <b>tiempo extra</b>.</div>
</div>`);
add('j_06', H, 'green', `${brand}${count(6, 6)}
<div style="margin:auto 0;text-align:center">
  <div class="h h2">Y con la reforma, el tope semanal cambia distinto para cada una</div>
  <div class="card" style="margin:46px auto 0;width:860px;padding:30px 40px;text-align:left">
    ${[['☀️ Diurna','48 → 46 h en 2027'],['🌗 Mixta','45 → 44 h en 2028'],['🌙 Nocturna','42 → 40 h en 2030']].map(([a,b])=>`<div style="display:flex;justify-content:space-between;font-size:40px;font-weight:700;margin:16px 0"><span>${a}</span><span style="color:#0A4E94">${b}</span></div>`).join('')}
  </div>
  <div class="sub" style="margin-top:40px;color:#111C3B">CheckONOFF clasifica cada turno y calcula las horas extra según la ley.</div>
  <div class="pill blk" style="margin-top:40px;font-size:40px;padding:26px 48px">Prueba 14 días gratis →</div>
  <div style="margin-top:24px;font-size:34px;font-weight:700">checkonoff.mx</div>
</div>`);
add('st_vespertino', SH, 'dark', `${brand}
<div style="margin:auto 0;text-align:center">
  <div style="font-size:180px">🤔</div>
  <div class="pill grn" style="margin-top:30px">Pregunta para RRHH</div>
  <div class="h h2" style="margin-top:50px">Un turno de <span class="gr">16:00 a 00:00</span>, ¿es diurno, mixto o nocturno?</div>
  <div class="sub" style="margin-top:50px">La respuesta en nuestro nuevo carrusel 👆</div>
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
