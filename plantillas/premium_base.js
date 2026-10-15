// Base del estándar premium (ref. Mandü / Humand): fotos claras a sangre, caja de titular,
// burbujas tipo chat con colita, logo pequeño y mucho aire.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const D = __dirname;
const b64 = (f, m) => `data:${m};base64,` + fs.readFileSync(path.join(D, f)).toString('base64');
const LOGO = b64('logo.png', 'image/png');
const FOTO = n => b64(`hq/${n}.jpg`, 'image/jpeg');
const QR = b64('qr_registro.png', 'image/png');
const FONTS = [400, 500, 600, 700, 800].map(w => `@font-face{font-family:IT;font-weight:${w};src:url(${b64(`fonts_it_${w}.ttf`, 'font/ttf')})}`).join('');
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
const G = s => `<span style="color:${C.lime}">${s}</span>`;
const GD = s => `<span style="color:${C.g}">${s}</span>`;
const ph = (n, top, extra = '') => `<img class="ph" src="${FOTO(n)}" style="top:${top}px;${extra}">`;

async function render(S, out) {
  const OUT = path.join(D, out); fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body] of S) {
    if (only.length && !only.some(o => n.startsWith(o))) continue;
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="f">${body}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(OUT, n + '.png') }); console.log('ok', n);
  }
  await b.close();
}
module.exports = { b64, LOGO, FOTO, C, CSS, ast, bb, logo, ph, G, GD, render };
