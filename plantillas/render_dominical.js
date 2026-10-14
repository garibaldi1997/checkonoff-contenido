const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'render2.js'), 'utf8');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const CSS = src.slice(src.indexOf('const CSS = `
.tile,.brand .t,.brand .tile{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.tile img,.brand .t img,.brand img{object-fit:contain}
') + 13, src.indexOf('`;', src.indexOf('const CSS = `')));
const brand = `<div class="brand"><div class="tile"><img src="${LOGO}"></div><span>CheckONOFF</span></div>`;
const count = (n, t) => `<div class="count">${n}/${t}</div>`;
const S = [
['dominical_02', `<div class="f cream">${brand}${count(2,3)}
  <div class="h h3 c" style="margin-top:60px">¿Cómo se <span class="gr">calcula?</span></div>
  <div class="sub c" style="margin-top:18px;font-size:32px">Ejemplo con un salario diario de $400</div>
  <div class="card" style="width:100%;margin-top:50px;padding:20px 0;overflow:hidden">
    ${[['💼','Salario de un día','$400'],['☀️','Prima dominical (25 %)','+ $100'],['✅','Ese domingo cobras','$500']].map(([e,t,v],i)=>`
    <div style="display:flex;align-items:center;gap:26px;padding:34px 44px;${i<2?'border-bottom:1px solid #EEF3F9':'background:#EAF8E6'}">
      <span style="font-size:54px">${e}</span><span style="font-size:38px;font-weight:600;flex:1">${t}</span>
      <b style="font-size:52px;letter-spacing:-1px;${i==2?'color:#239616':''}">${v}</b></div>`).join('')}
  </div>
  <div class="sub c" style="margin-top:40px;font-size:30px">Mínimo 25 % sobre el salario de un día ordinario de trabajo.</div>
  <div class="chip" style="margin-top:34px;font-size:28px">⚖️ Art. 71, Ley Federal del Trabajo</div>
</div>`],
['dominical_03', `<div class="f green">${brand}${count(3,3)}
  <div style="margin:auto 0;text-align:center">
    <div class="icon" style="margin:0 auto">☀️</div>
    <div class="h h2" style="margin-top:50px">¿Tu empresa sabe quién trabajó cada domingo?</div>
    <div class="sub" style="margin-top:30px;color:#111C3B">CheckONOFF registra cada día trabajado, incluidos los domingos, para que tu pre-nómina no se salte ninguno.</div>
    <div class="pill blk" style="margin-top:56px;font-size:42px;padding:28px 52px">Prueba 14 días gratis →</div>
    <div style="margin-top:28px;font-size:36px;font-weight:700">checkonoff.mx</div>
  </div>
</div>`],
];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setViewportSize({ width: 1080, height: 1350 });
  for (const [n, body] of S) {
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}.f{width:1080px;height:1350px}</style></head><body>${body}</body></html>`);
    await p.waitForTimeout(120); await p.screenshot({ path: path.join(__dirname, 'out_sabias', n + '.png') }); console.log('ok', n);
  }
  await b.close();
})();
