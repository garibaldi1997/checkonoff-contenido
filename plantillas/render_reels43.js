// Reels de la semana 21–25 oct 2026: foto real a sangre con movimiento + texto premium.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const { LOGO, FOTO, C, CSS } = require('./premium_base');
const OUT = path.join(__dirname, 'out_reels43'); fs.mkdirSync(OUT, { recursive: true });
const FPS = 30;

const RCSS = `${CSS}
*,*::before,*::after{animation-play-state:paused!important;animation-fill-mode:both!important}
.f{width:1080px;height:1920px;background:${C.navy}}
.sc{position:absolute;inset:0;overflow:hidden}
.sc img.bg{position:absolute;left:-60px;top:0;width:1200px;height:1920px;object-fit:cover}
.grad{position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,28,59,.15) 20%,rgba(17,28,59,.55) 50%,rgba(17,28,59,.92) 75%)}
.tx{position:absolute;left:80px;right:110px;top:1000px;color:#fff}
.k{display:inline-block;background:${C.lime};color:${C.navy};font-size:34px;font-weight:800;letter-spacing:.05em;padding:12px 24px;border-radius:14px}
.t{font-size:96px;font-weight:800;letter-spacing:-.03em;line-height:1.03;margin-top:26px}
.s{font-size:46px;font-weight:600;line-height:1.3;margin-top:28px;opacity:.92}
.chip{display:inline-block;background:#fff;color:${C.navy};font-size:46px;font-weight:700;padding:22px 34px;border-radius:26px;margin-top:22px;box-shadow:0 20px 40px rgba(0,0,0,.3)}
.gr{color:${C.lime}}
.brand{position:absolute;top:230px;left:80px;display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.92);color:${C.navy};font-weight:700;font-size:32px;padding:10px 22px 10px 10px;border-radius:99px;z-index:9}
.brand img{width:48px;height:48px}
.bar{position:absolute;left:0;bottom:0;height:12px;background:${C.g};animation:bar linear;z-index:9}
@keyframes bar{from{width:0}to{width:100%}}
@keyframes kb{from{transform:scale(1.02) translateX(0)}to{transform:scale(1.14) translateX(-30px)}}
@keyframes vis{0%{opacity:0}6%{opacity:1}94%{opacity:1}100%{opacity:0}}
@keyframes up{from{opacity:0;transform:translateY(50px)}to{opacity:1;transform:none}}
@keyframes pop{0%{opacity:0;transform:scale(.5)}70%{transform:scale(1.07)}100%{opacity:1;transform:scale(1)}}
`;
// Escena con foto entre a y b segundos
const sc = (a, b, foto, html, pos = '50% 30%') => `<div class="sc" style="opacity:0;animation:vis ${b - a}s linear ${a}s">
  <img class="bg" src="${FOTO(foto)}" style="object-position:${pos};animation:kb ${b - a}s linear ${a}s">
  <div class="grad"></div><div class="tx">${html.replace(/@A/g, a)}</div></div>`;
const up = (a, d = .15) => `style="opacity:0;animation:up .5s ease-out ${a + d}s"`;
const pop = a => `style="opacity:0;animation:pop .45s ease-out ${a}s"`;
const cta = (a, b) => `<div class="sc" style="opacity:0;animation:vis ${b - a + .5}s linear ${a}s;background:radial-gradient(ellipse 80% 55% at 50% 45%,#34B614 0%,#45C21F 45%,#9BDC86 80%,#DDF3D6 100%)">
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 90px;color:${C.navy}">
   <div style="width:200px;height:200px;border-radius:52px;background:${C.navy};display:grid;place-items:center"><img src="${LOGO}" style="width:180px"></div>
   <div style="font-size:92px;font-weight:800;letter-spacing:-.03em;line-height:1.04;margin-top:56px">Cada hora,<br>registrada.</div>
   <div style="background:${C.navy};color:#fff;border-radius:99px;padding:28px 52px;font-size:46px;font-weight:700;margin-top:56px">Prueba 14 días gratis</div>
   <div style="font-size:52px;font-weight:800;margin-top:34px">checkonoff.mx</div>
   <div style="font-size:38px;font-weight:600;margin-top:40px;opacity:.8">📌 Guárdalo y compártelo</div>
  </div></div>`;

const REELS = {
  reel_comida: { dur: 15, html: `
    ${sc(0, 3.2, 'mx_pensando', `<div class="k" ${up(0, 0)}>POV</div><div class="t" ${up(0, .1)}>Tu equipo come en su lugar <span class="gr">"para avanzar"</span> 🌮</div>`)}
    ${sc(3.2, 7, 'mx_enserio', `<div class="t" ${up(3.2)}>Para la ley, esa hora <span class="gr">cuenta como jornada.</span></div><div class="s" ${up(3.2, .5)}>Si no pueden salir del lugar, es tiempo trabajado (art. 64 LFT).</div>`)}
    ${sc(7, 11.2, 'mx_laptop', `<div class="t" ${up(7)}>9:00 a 18:00 sin salir = <span class="gr">9 horas.</span></div>
      <div class="chip" ${pop(8.0)}>⏱️ 1 h extra al día</div><br><div class="chip" ${pop(8.8)}>📅 5 h extra a la semana</div><br><div class="chip" ${pop(9.6)}>⚖️ Riesgo si no las pagas</div>`)}
    ${cta(11.2, 15)}` },
  reel_aguinaldo: { dur: 15, html: `
    ${sc(0, 3.2, 'mx_feliz', `<div class="k" ${up(0, 0)}>RRHH</div><div class="t" ${up(0, .1)}>Entró en julio. <span class="gr">¿Le toca aguinaldo?</span> 🤔</div>`, '50% 20%')}
    ${sc(3.2, 7, 'mx_joven', `<div class="t" ${up(3.2)}>Sí: la parte <span class="gr">proporcional.</span></div><div class="s" ${up(3.2, .5)}>Mínimo 15 días por año completo (art. 87 LFT).</div>`)}
    ${sc(7, 11.2, 'mx_senor', `<div class="t" ${up(7)}>15 × 184 días ÷ 365 = <span class="gr">7.56 días</span></div>
      <div class="chip" ${pop(8.0)}>💵 Con $400 diarios: $3,024.66</div><br><div class="chip" ${pop(8.8)}>📅 Se paga antes del 20 de dic.</div>`)}
    ${cta(11.2, 15)}` },
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  const only = process.argv[2];
  for (const [name, r] of Object.entries(REELS)) {
    if (only && name !== only) continue;
    const dir = path.join(OUT, name); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${RCSS}</style></head><body>
      <div class="f">${r.html}<div class="brand"><img src="${LOGO}">CheckONOFF</div><div class="bar" style="animation-duration:${r.dur}s"></div></div></body></html>`);
    await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(300);
    const frames = Math.round(r.dur * FPS);
    for (let i = 0; i < frames; i++) {
      const t = (i / FPS) * 1000;
      await page.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), t);
      await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 90 });
    }
    const mp4 = path.join(OUT, name + '.mp4');
    execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -f lavfi -i anullsrc=r=44100:cl=stereo -shortest -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -preset medium -movflags +faststart -c:a aac -b:a 128k ${mp4}`);
    for (const s of [1.5, 5, 9.5, 13]) execSync(`ffmpeg -y -loglevel error -ss ${s} -i ${mp4} -frames:v 1 -vf scale=360:-1 ${path.join(OUT, `${name}_${s}.jpg`)}`);
    console.log('ok', name, frames, 'cuadros');
  }
  await browser.close();
})();
