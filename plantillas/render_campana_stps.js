// Campaña pagada de formulario (contactos): guía 40 h gratis a cambio de nombre, WhatsApp y empresa · estándar premium
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { b64, LOGO, C, CSS, ph, G } = require('./premium_base');
const GUIA = b64('guia_portada.png', 'image/png');
const S = [];
const add = (n, html, h) => S.push([n, html, h]);
const libro = (x, y, w, rot) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg);z-index:6">
  <div style="position:absolute;inset:0;transform:translate(14px,14px);background:#dfe5ec;border-radius:10px"></div>
  <div style="position:absolute;inset:0;transform:translate(7px,7px);background:#eef2f6;border-radius:10px"></div>
  <img src="${GUIA}" style="position:relative;display:block;width:100%;border-radius:10px;box-shadow:0 40px 80px rgba(17,28,59,.45)"></div>`;
const chip = (t, bg, col, x, y, s = 30) => `<div style="position:absolute;left:${x}px;top:${y}px;background:${bg};color:${col};font-weight:800;font-size:${s}px;letter-spacing:.06em;padding:12px 22px;border-radius:14px;z-index:7">${t}</div>`;
const cta = (x, y, s = 40) => `<div style="position:absolute;left:${x}px;top:${y}px;z-index:7;display:flex;flex-direction:column;gap:14px">
  <div style="background:${C.g};color:#fff;font-weight:800;font-size:${s}px;padding:22px 38px;border-radius:99px;box-shadow:0 16px 36px rgba(52,182,20,.4)">Descarga la guía gratis →</div>
  <div style="color:#fff;font-weight:600;font-size:${s * .62}px;opacity:.9;padding-left:8px">Guía práctica · 20 páginas · sin costo</div></div>`;
const grad = h => `<div style="position:absolute;left:0;right:0;bottom:0;height:${h}px;background:linear-gradient(180deg,rgba(17,28,59,0) 0%,rgba(17,28,59,.88) 38%,${C.navy} 70%);z-index:2"></div>`;
const lista = (items, x, y, s) => `<div style="position:absolute;left:${x}px;top:${y}px;z-index:7;color:#fff;font-size:${s}px;font-weight:600;line-height:1.55">${items.map(t => `<div><span style="color:${C.lime};font-weight:800">✓</span> ${t}</div>`).join('')}</div>`;
const marca = bottom => `<div class="logo" style="bottom:${bottom}px;z-index:8"><img src="${LOGO}">CheckONOFF</div>`;

const piezas = {
  A: { foto: 'u_SoiVEdJKzhY', top: -260, ext: '', chip: ['INSPECCIÓN STPS · ENERO 2027', C.r, '#fff'],
       t: `¿Tu empresa pasaría una inspección de la ${G('STPS')} en enero?`,
       s: 'Desde el 1 de enero de 2027 el registro de la jornada debe ser electrónico.',
       l: ['Calendario 2026–2030', 'Horas extra: reglas nuevas', 'Checklist de registro', 'Plan año por año'] },
  B: { foto: 'u_CGio_d3e1uc', top: -200, ext: '', chip: ['GUÍA GRATIS PARA RRHH', C.lime, C.navy],
       t: `En 2027 la jornada baja a ${G('46 horas.')}`,
       s: 'Turnos, horas extra y registro electrónico: lo que tu empresa debe hacer antes de enero.',
       l: ['Ejemplos de turnos legales', 'Dobles, triples y sus topes', 'Multas y cómo evitarlas', 'Checklist imprimible'] },
};
for (const [k, p] of Object.entries(piezas)) {
  // Feed 4:5: foto arriba con la persona visible, panel azul abajo con titular, guía y botón
  add(`${k}_feed`, `${ph(p.foto, p.top, p.ext)}
<div style="position:absolute;left:0;right:0;top:560px;bottom:0;background:linear-gradient(180deg,rgba(17,28,59,0),${C.navy} 140px);z-index:2"></div>
${chip(p.chip[0], p.chip[1], p.chip[2], 56, 56, 26)}
<div style="position:absolute;left:64px;width:600px;top:640px;z-index:7;color:#fff;font-size:58px;font-weight:800;letter-spacing:-.02em;line-height:1.06">${p.t}<div style="font-size:29px;font-weight:600;margin-top:18px;opacity:.88;line-height:1.3">${p.s}</div></div>
${libro(690, 650, 330, 6)}
${cta(64, 1060, 38)}${marca(40)}`, 1350);
  // Historia/Reel 9:16: nada importante en los 250 px de arriba ni en los 340 px de abajo
  add(`${k}_historia`, `${ph(p.foto, p.top + 60, p.ext)}
<div style="position:absolute;left:0;right:0;top:820px;bottom:0;background:linear-gradient(180deg,rgba(17,28,59,0),${C.navy} 160px);z-index:2"></div>
${chip(p.chip[0], p.chip[1], p.chip[2], 64, 260, 30)}
<div style="position:absolute;left:64px;right:64px;top:920px;z-index:7;color:#fff;font-size:72px;font-weight:800;letter-spacing:-.02em;line-height:1.05">${p.t}<div style="font-size:34px;font-weight:600;margin-top:20px;opacity:.88;line-height:1.3;width:560px">${p.s}</div></div>
${libro(680, 1060, 330, 6)}
${cta(64, 1420, 42)}${marca(345)}`, 1920);
}

(async () => {
  const OUT = path.join(__dirname, 'out_campana'); fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body, h] of S) {
    if (process.argv[2] && !n.startsWith(process.argv[2])) continue;
    await pg.setViewportSize({ width: 1080, height: h });
    await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="f" style="height:${h}px">${body}</div></body></html>`);
    await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    await pg.screenshot({ path: path.join(OUT, n + '.jpg'), type: 'jpeg', quality: 92 }); console.log('ok', n);
  }
  await b.close();
})();
