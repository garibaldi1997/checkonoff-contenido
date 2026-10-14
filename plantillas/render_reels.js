// Genera reels 1080x1920 cuadro por cuadro (animaciones CSS controladas por tiempo) y los convierte a MP4.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const OUT = path.join(__dirname, 'out_reels'); fs.mkdirSync(OUT, { recursive: true });
const FPS = 30;

const CSS = `
.tile,.brand .t,.brand .tile{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.tile img,.brand .t img,.brand img{object-fit:contain}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;width:1080px;height:1920px;overflow:hidden}
*,*::before,*::after{animation-play-state:paused!important;animation-fill-mode:both!important}
.f{position:absolute;inset:0;overflow:hidden;color:#fff}
.dark{background:radial-gradient(ellipse 90% 50% at 80% 100%,rgba(52,182,20,.5),transparent 60%),#111C3B}
.green{background:radial-gradient(ellipse 75% 60% at 50% 45%,#34B614 0%,#45C21F 45%,#9BDC86 80%,#DDF3D6 100%);color:#111C3B}
.scene{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 90px;text-align:center}
.h{font-weight:800;letter-spacing:-.045em;line-height:1.02}
.gr{color:#7DD818}
.chip{display:inline-flex;align-items:center;gap:16px;background:#fff;color:#111C3B;border-radius:28px;padding:26px 38px;font-size:46px;font-weight:700;box-shadow:0 24px 50px rgba(0,0,0,.35);white-space:nowrap}
.brand{position:absolute;top:120px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:16px;font-size:38px;font-weight:700;z-index:9}
.brand .t{width:72px;height:72px;border-radius:18px;background:#111C3B;display:grid;place-items:center;box-shadow:0 0 0 2px rgba(255,255,255,.15)}.brand img{width:66px}
.pill{display:inline-block;background:#111C3B;color:#fff;border-radius:999px;padding:30px 56px;font-size:48px;font-weight:700}
.bar{position:absolute;left:0;bottom:0;height:12px;background:#34B614;animation:bar linear}
@keyframes bar{from{width:0}to{width:100%}}
@keyframes inS{0%{opacity:0;transform:scale(.85) translateY(40px)}100%{opacity:1;transform:none}}
@keyframes out{to{opacity:0;transform:scale(1.04)}}
@keyframes pop{0%{opacity:0;transform:scale(.4) rotate(var(--r,0deg))}70%{transform:scale(1.08) rotate(var(--r,0deg))}100%{opacity:1;transform:scale(1) rotate(var(--r,0deg))}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-10px)}75%{transform:translateX(10px)}}
@keyframes flash{0%{opacity:0}100%{opacity:1}}
@keyframes count{from{transform:translateY(0)}to{transform:translateY(var(--y))}}
`;
// Escena visible entre a y b segundos (entra con inS y sale con out)
const scene = (a, b, html, cls = '') => `<div class="scene ${cls}" style="opacity:0;animation:inS .45s ease-out ${a}s, out .35s ease-in ${b - .35}s">${html}</div>`;
const brand = `<div class="brand"><span class="t"><img src="${LOGO}"></span>CheckONOFF</div>`;
const cta = (a) => scene(a, 999, `
  <div style="width:220px;height:220px;border-radius:56px;background:#111C3B;display:grid;place-items:center;box-shadow:0 30px 70px rgba(0,0,0,.3)"><img src="${LOGO}" style="width:200px"></div>
  <div class="h" style="font-size:96px;margin-top:60px">Deja de armar la nómina a mano.</div>
  <div class="pill" style="margin-top:60px">Prueba 14 días gratis</div>
  <div style="font-size:52px;font-weight:800;margin-top:36px">checkonoff.mx</div>`);

const REELS = {
  reel_calculadora: { dur: 14, cls: 'dark', html: `
    ${scene(0, 2.8, `<div class="h" style="font-size:96px">¿Tu nómina sigue calculando horas extra con <span class="gr">3 horas × 3 días</span>? 😬</div>`)}
    ${scene(2.8, 7.8, `
      <div class="h" style="font-size:84px;margin-bottom:60px">Desde el 1 de mayo de 2026 <span class="gr">cambió</span>:</div>
      ${[['⏱️','Dobles: 4 h al día, máx. 4 días',3.3],['🔥','Triples: máximo 4 h a la semana',4.4],['⛔','Nunca más de 12 h al día',5.5]].map(([e,t,d])=>`<div class="chip" style="font-size:44px;margin:20px 0;opacity:0;animation:pop .45s ease-out ${d}s">${e} ${t}</div>`).join('')}`)}
    ${scene(7.8, 11.0, `<div style="font-size:150px">🧮</div><div class="h" style="font-size:100px;margin-top:20px">Calcula tu caso <span class="gr">gratis</span></div>
      <div class="chip" style="font-size:40px;margin-top:50px;opacity:0;animation:pop .5s ease-out 8.4s">checkonoff.mx/calculadora-horas-extra</div>
      <div style="font-size:44px;font-weight:600;margin-top:40px;opacity:.9">Link en nuestra bio 👆</div>`)}
    <div class="f green" style="opacity:0;animation:flash .3s ease 10.9s">${cta(11.0)}</div>` },

  reel_quincena: { dur: 13, cls: 'dark', html: `
    ${scene(0, 2.8, `<div class="h" style="font-size:150px">POV:</div><div class="h" style="font-size:92px;margin-top:30px">eres de RRHH y es <span class="gr">jueves de quincena</span> 😵‍💫</div>`)}
    ${scene(2.8, 7.4, `
      <div class="h" style="font-size:80px;margin-bottom:70px">10:47 p.m. y todavía…</div>
      ${[['🗂️','3 sucursales sin reporte',-4,3.1],['💬','47 mensajes sin leer',3,3.9],['📊','Asistencia_FINAL_v7.xlsx',-3,4.7],['❓','¿Quién faltó en Norte?',2,5.5]].map(([e,t,r,d])=>`<div class="chip" style="--r:${r}deg;margin:18px 0;opacity:0;animation:pop .45s ease-out ${d}s">${e} ${t}</div>`).join('')}`)}
    ${scene(7.4, 10.4, `<div class="h" style="font-size:100px">Con <span class="gr">CheckONOFF</span>:</div>
      <div class="chip" style="font-size:58px;margin-top:70px;opacity:0;animation:pop .5s ease-out 8.0s">⚡ Pre-nómina en 1 clic</div>
      <div class="chip" style="font-size:46px;margin-top:36px;opacity:0;animation:pop .5s ease-out 8.6s">✅ Horas, extras, retardos y faltas</div>
      <div class="chip" style="font-size:46px;margin-top:36px;opacity:0;animation:pop .5s ease-out 9.2s">📲 Checan por WhatsApp</div>`)}
    <div class="f green" style="opacity:0;animation:flash .3s ease 10.3s">${cta(10.4)}</div>` },

  reel_errores: { dur: 16, cls: 'dark', html: `
    ${scene(0, 2.8, `<div class="h" style="font-size:120px">3 errores de RRHH que terminan en <span class="gr">demanda</span> ⚖️</div>`)}
    ${[[1,'Faltas sin registro','Si no la documentas, no la puedes probar.',2.8],[2,'Tiempo extra mal pagado','Hasta 9 h a la semana al doble. Al triple, solo 4 h más.',5.9],[3,'Vacaciones mal calculadas','Desde el primer año son 12 días.',9.0]].map(([n,t,d,a])=>scene(a,a+3.1,`
      <div class="h" style="font-size:340px;color:#34B614;line-height:.9">${n}</div>
      <div class="h" style="font-size:96px;margin-top:20px">${t}</div>
      <div style="font-size:50px;font-weight:500;margin-top:40px;opacity:.9;line-height:1.3">${d}</div>`)).join('')}
    <div class="f green" style="opacity:0;animation:flash .3s ease 12.0s">${cta(12.1)}</div>` },

  reel_40horas: { dur: 13, cls: 'dark', html: `
    ${scene(0, 2.6, `<div class="h" style="font-size:110px">La jornada laboral en México <span class="gr">se está reduciendo</span> ⏰</div>`)}
    ${scene(2.6, 8.6, `
      <div style="height:420px;overflow:hidden"><div style="--y:-1680px;animation:count 4.6s cubic-bezier(.6,0,.2,1) 3.2s">
        ${[['48 h','Hoy'],['46 h','2027'],['44 h','2028'],['42 h','2029'],['40 h','2030']].map(([h,y])=>`<div style="height:420px;display:flex;flex-direction:column;justify-content:center"><div class="h" style="font-size:300px;line-height:1">${h}</div><div style="font-size:60px;font-weight:700;color:#7DD818">${y}</div></div>`).join('')}
      </div></div>
      <div style="font-size:48px;font-weight:600;margin-top:60px;opacity:.9">Máximo de horas por semana · sin bajar salarios</div>`)}
    ${scene(8.6, 10.9, `<div class="h" style="font-size:110px">¿Tu empresa ya tiene <span class="gr">un plan?</span> 🤔</div><div style="font-size:52px;margin-top:40px;opacity:.9">Cada hora tendrá que quedar registrada.</div>`)}
    <div class="f green" style="opacity:0;animation:flash .3s ease 10.8s">${cta(10.9)}</div>` },
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1920 });
  const only = process.argv[2];
  for (const [name, r] of Object.entries(REELS)) {
    if (only && name !== only) continue;
    const dir = path.join(OUT, name); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir);
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>
      <div class="f ${r.cls}">${brand}${r.html}<div class="bar" style="animation-duration:${r.dur}s"></div></div></body></html>`);
    await page.waitForTimeout(300);
    const frames = Math.round(r.dur * FPS);
    for (let i = 0; i < frames; i++) {
      const t = (i / FPS) * 1000;
      await page.evaluate(t => document.getAnimations().forEach(a => { a.currentTime = t; }), t);
      await page.screenshot({ path: path.join(dir, `f${String(i).padStart(4, '0')}.jpg`), type: 'jpeg', quality: 92 });
    }
    const mp4 = path.join(OUT, name + '.mp4');
    execSync(`ffmpeg -y -loglevel error -framerate ${FPS} -i ${dir}/f%04d.jpg -f lavfi -i anullsrc=r=44100:cl=stereo -shortest -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 20 -preset medium -movflags +faststart -c:a aac -b:a 128k ${mp4}`);
    execSync(`ffmpeg -y -loglevel error -ss 1.5 -i ${mp4} -frames:v 1 ${path.join(OUT, name + '_portada.jpg')}`);
    console.log('ok', name, frames, 'cuadros');
  }
  await browser.close();
})();
