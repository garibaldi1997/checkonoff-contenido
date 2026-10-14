const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'out_buk');
fs.mkdirSync(OUT, { recursive: true });
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const img = f => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'photos', f)).toString('base64');

const CSS = `
.tile,.brand .t,.brand .tile{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.tile img,.brand .t img,.brand img{object-fit:contain}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
.f{position:relative;overflow:hidden;color:#fff}
.bgph{position:absolute;inset:-60px;background-size:cover;background-position:center;filter:blur(14px) saturate(.95) brightness(1.05)}
.ov{position:absolute;inset:0;background:linear-gradient(115deg,rgba(14,100,8,.96) 0%,rgba(30,150,18,.86) 38%,rgba(52,182,20,.55) 68%,rgba(52,182,20,.22) 100%)}
.ov2{position:absolute;inset:0;background:radial-gradient(ellipse 60% 45% at 85% 20%,rgba(255,255,255,.18),transparent 70%),linear-gradient(to bottom,rgba(0,0,0,0) 60%,rgba(5,40,2,.35))}
.kick{font-size:30px;font-weight:600;letter-spacing:9px;text-transform:uppercase;opacity:.92}
.logo{display:flex;align-items:center;gap:14px;font-size:36px;font-weight:600;letter-spacing:-1px}
.logo .t{width:66px;height:66px;border-radius:16px;background:#111C3B;display:grid;place-items:center;box-shadow:0 8px 20px rgba(0,0,0,.25)}.logo img{width:60px}
h1{font-weight:800;letter-spacing:-.035em;line-height:1.06;text-shadow:0 4px 30px rgba(0,30,0,.25)}
.cover{position:absolute;border-radius:26px;background:linear-gradient(160deg,#2FBF1D,#1C8E10 70%,#16760C);box-shadow:0 50px 90px rgba(0,25,0,.45),0 0 0 2px rgba(255,255,255,.12) inset;overflow:hidden;color:#fff}
.cover .ck{font-size:17px;font-weight:600;letter-spacing:5px;opacity:.9}
.pillw{display:inline-flex;align-items:center;background:rgba(255,255,255,.93);color:#0E5A07;border-radius:999px;font-weight:600;box-shadow:0 16px 40px rgba(0,30,0,.25)}
.btn{display:inline-flex;align-items:center;gap:22px;background:#fff;color:#111C3B;border-radius:44px;font-weight:600;box-shadow:0 20px 50px rgba(0,30,0,.35)}
`;

/* Reloj realista en SVG */
const clock = (size, h = 10, m = 10) => {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = i * 6 * Math.PI / 180, r1 = 172, r2 = i % 5 ? 164 : 150;
    return `<line x1="${200 + r1 * Math.sin(a)}" y1="${200 - r1 * Math.cos(a)}" x2="${200 + r2 * Math.sin(a)}" y2="${200 - r2 * Math.cos(a)}" stroke="#111C3B" stroke-width="${i % 5 ? 2 : 5}" stroke-linecap="round"/>`;
  }).join('');
  const nums = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1, a = n * 30 * Math.PI / 180;
    return `<text x="${200 + 126 * Math.sin(a)}" y="${200 - 126 * Math.cos(a) + 15}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="44" fill="#111C3B">${n}</text>`;
  }).join('');
  const ha = (h % 12 + m / 60) * 30, ma = m * 6;
  return `<svg width="${size}" height="${size * 1.08}" viewBox="0 -30 400 432" style="filter:drop-shadow(0 40px 50px rgba(0,25,0,.45))">
  <defs>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b6f73"/><stop offset=".35" stop-color="#2a2d30"/><stop offset=".7" stop-color="#121314"/><stop offset="1" stop-color="#4a4d50"/></linearGradient>
    <radialGradient id="face" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#eef3f2"/><stop offset="1" stop-color="#cfd8d6"/></radialGradient>
    <linearGradient id="crown" x1="0" x2="1"><stop offset="0" stop-color="#777"/><stop offset=".5" stop-color="#ddd"/><stop offset="1" stop-color="#666"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="182" y="-26" width="36" height="34" rx="6" fill="url(#crown)"/><rect x="176" y="-6" width="48" height="12" rx="5" fill="#444"/>
  ${Array.from({ length: 8 }, (_, i) => `<line x1="${186 + i * 4}" y1="-24" x2="${186 + i * 4}" y2="6" stroke="#555" stroke-width="1"/>`).join('')}
  <circle cx="200" cy="200" r="198" fill="url(#rim)"/>
  <circle cx="200" cy="200" r="182" fill="#0d0e0f"/>
  <circle cx="200" cy="200" r="178" fill="url(#face)"/>
  ${ticks}${nums}
  <g transform="rotate(${ha} 200 200)"><rect x="193" y="98" width="14" height="118" rx="7" fill="#111C3B"/></g>
  <g transform="rotate(${ma} 200 200)"><rect x="195" y="52" width="10" height="164" rx="5" fill="#111C3B"/></g>
  <g transform="rotate(${ma + 150} 200 200)"><line x1="200" y1="235" x2="200" y2="58" stroke="#D93025" stroke-width="3"/></g>
  <circle cx="200" cy="200" r="13" fill="#111C3B"/><circle cx="200" cy="200" r="6" fill="#c9a227"/>
  <path d="M60 120 A 160 160 0 0 1 250 40 A 200 200 0 0 0 60 120Z" fill="url(#glass)"/>
  </svg>`;
};

/* Portada de guía (mockup) */
const guideCover = (w, h, title, sub, style) => `<div class="cover" style="width:${w}px;height:${h}px;${style}">
  <div style="padding:${w * .08}px">
    <div class="ck">DESCARGABLE &nbsp;|&nbsp; GUÍA</div>
    <div style="font-size:${w * .072}px;font-weight:800;letter-spacing:-.5px;line-height:1.15;margin-top:${w * .05}px">${title}</div>
    <div style="font-size:${w * .062}px;font-weight:400;line-height:1.25;margin-top:6px;opacity:.95">${sub}</div>
  </div>
  <div style="position:absolute;left:0;right:0;bottom:${h * .14}px;height:${h * .42}px">
    <div style="position:absolute;right:-${w * .05}px;top:0;width:${w * .78}px;height:100%;border-radius:${h}px 0 0 ${h}px;background:#0F5F08"></div>
    ${['📅', '⚖️', '✅'].map((e, i) => `<div style="position:absolute;left:${w * (.1 + i * .02)}px;top:${h * (.04 + i * .13)}px;width:${w * .1}px;height:${w * .1}px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:${w * .05}px;box-shadow:0 6px 14px rgba(0,0,0,.25)">${e}</div>
      <div style="position:absolute;left:${w * (.21 + i * .02)}px;top:${h * (.04 + i * .13) + w * .05}px;width:${w * .2}px;border-top:2px dashed rgba(255,255,255,.6)"></div>`).join('')}
    <div style="position:absolute;right:${w * .06}px;top:${h * .05}px;width:${w * .5}px;height:${h * .32}px;border-radius:14px;background:#fff;padding:${w * .025}px;box-shadow:0 10px 24px rgba(0,0,0,.3)">
      <div style="font-size:${w * .03}px;font-weight:700;color:#111C3B;margin-bottom:6px">Horas máximas por semana</div>
      ${[['2027', 46], ['2028', 44], ['2029', 42], ['2030', 40]].map(([y, v]) => `<div style="display:flex;align-items:center;gap:6px;margin:${w * .009}px 0">
        <span style="font-size:${w * .026}px;color:#555;width:${w * .07}px">${y}</span>
        <div style="height:${w * .026}px;width:${(v - 36) * w * .028}px;background:#34B614;border-radius:6px"></div>
        <b style="font-size:${w * .028}px;color:#111C3B">${v}h</b></div>`).join('')}
    </div>
  </div>
  <div style="position:absolute;left:${w * .08}px;bottom:${w * .06}px;display:flex;align-items:center;gap:10px;font-size:${w * .045}px;font-weight:600">
    <span style="width:${w * .09}px;height:${w * .09}px;border-radius:10px;background:#111C3B;display:grid;place-items:center"><img src="${LOGO}" style="width:${w * .085}px"></span>CheckONOFF</div>
</div>`;

/* Celular con app (para la pieza de registro) */
const phoneApp = (w, style) => {
  const s = w / 500;
  return `<div style="width:${w}px;height:${1010 * s}px;background:#0A0A0A;border-radius:${76 * s}px;padding:${16 * s}px;box-shadow:0 60px 110px rgba(0,25,0,.5),0 0 0 3px #3A3A3A;${style}">
  <div style="width:100%;height:100%;border-radius:${62 * s}px;overflow:hidden;background:#F4F6FA;position:relative;color:#111C3B">
    <div style="position:absolute;top:${22 * s}px;left:50%;transform:translateX(-50%);width:${140 * s}px;height:${40 * s}px;background:#000;border-radius:${24 * s}px"></div>
    <div style="background:#fff;padding:${90 * s}px ${26 * s}px ${26 * s}px;border-radius:0 0 ${34 * s}px ${34 * s}px">
      <div style="font-size:${19 * s}px;color:#8A8F99">Bienvenido,</div><div style="font-size:${30 * s}px;font-weight:700">Laura Mendoza</div>
      <div style="display:inline-block;margin-top:${12 * s}px;font-family:monospace;font-size:${16 * s}px;background:#F1F3F6;border-radius:99px;padding:${7 * s}px ${14 * s}px">🕘 14/10/2026 09:01:59 a.m.</div><br>
      <div style="display:inline-block;margin-top:${10 * s}px;font-size:${16 * s}px;font-weight:700;color:#1E7A12;background:#E7F7E3;border-radius:99px;padding:${7 * s}px ${14 * s}px">📍 GPS ±16m</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:${18 * s}px;padding:${26 * s}px">
      ${[['✓', 'Entrada', 'Iniciar turno', '#3B7BF0,#2152D6'], ['⇥', 'Salida', 'Terminar turno', '#2B3245,#161A24'], ['☕', 'Comida', 'Tomar break', '#F68A2A,#E8620F'], ['◷', 'Regreso', 'Volver del break', '#17B29C,#0F8C7A']].map(([i, t, d, g]) => `
      <div style="border-radius:${26 * s}px;height:${190 * s}px;padding:${24 * s}px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;background:linear-gradient(135deg,${g});position:relative">
        <span style="position:absolute;top:${22 * s}px;left:${24 * s}px;font-size:${40 * s}px">${i}</span><b style="font-size:${28 * s}px">${t}</b><span style="font-size:${17 * s}px;opacity:.85">${d}</span></div>`).join('')}
    </div>
  </div></div>`;
};

const PIECES = [];

/* 1 · Guía gratuita · Historia */
PIECES.push(['01_guia_40h_historia', 1920, `<div class="f" style="width:1080px;height:1920px">
  <div class="bgph" style="background-image:url('${img('rrhh.jpg')}')"></div><div class="ov"></div><div class="ov2"></div>
  <div style="position:absolute;left:110px;right:110px;top:300px;display:flex;justify-content:space-between;align-items:center">
    <div class="kick">Guía gratuita</div><div class="logo"><span class="t"><img src="${LOGO}"></span></div></div>
  <h1 style="position:absolute;left:110px;right:120px;top:450px;font-size:100px">¿Cómo preparar a tu empresa para la jornada laboral de 40 horas?</h1>
  ${guideCover(400, 540, 'Jornada de 40 horas:', 'lo que debes ajustar hoy para no perder el control en 2027', 'right:80px;top:1010px;transform:rotate(3deg)')}
  <div style="position:absolute;left:30px;top:1060px">${clock(560)}</div>
  <div style="position:absolute;left:80px;top:1600px" class="pillw"><span style="font-size:52px;padding:20px 50px">¡Descarga tu guía aquí!</span></div>
  <div style="position:absolute;left:300px;top:1730px" class="btn"><span style="font-size:64px;padding:22px 52px 22px 34px;display:flex;align-items:center;gap:22px"><span style="color:#34B614;font-size:60px">⤓</span>Descargar</span></div>
</div>`]);

/* 2 · Calendario de la reforma · Feed */
PIECES.push(['02_reforma_40h_feed', 1350, `<div class="f" style="width:1080px;height:1350px">
  <div class="bgph" style="background-image:url('${img('obra.jpg')}')"></div><div class="ov"></div><div class="ov2"></div>
  <div style="position:absolute;left:90px;right:90px;top:80px;display:flex;justify-content:space-between;align-items:center">
    <div class="kick">Reforma laboral</div><div class="logo"><span class="t"><img src="${LOGO}"></span>CheckONOFF</div></div>
  <h1 style="position:absolute;left:90px;right:90px;top:200px;font-size:84px">La jornada de 48 a 40 horas ya es ley. <span style="color:#D9FFD0">¿Tu empresa está lista?</span></h1>
  <div style="position:absolute;left:-40px;top:640px">${clock(470, 8, 0)}</div>
  <div style="position:absolute;right:70px;top:640px;width:500px;background:rgba(255,255,255,.96);border-radius:32px;padding:36px 40px;color:#111C3B;box-shadow:0 40px 80px rgba(0,25,0,.4)">
    <div style="font-size:22px;font-weight:700;letter-spacing:4px;color:#34B614">CALENDARIO OFICIAL</div>
    <div style="font-size:30px;font-weight:700;margin:8px 0 18px">Horas máximas por semana</div>
    ${[['Hoy', 48, '#B9B9B0'], ['2027', 46, '#34B614'], ['2028', 44, '#34B614'], ['2029', 42, '#34B614'], ['2030', 40, '#111C3B']].map(([y, v, c]) => `
    <div style="display:flex;align-items:center;gap:14px;margin:12px 0"><span style="width:78px;font-size:26px;font-weight:600;color:#4A5670">${y}</span>
      <div style="flex:1;height:34px;background:#F0EFE7;border-radius:99px;overflow:hidden"><div style="height:100%;width:${(v - 30) / 18 * 100}%;background:${c};border-radius:99px"></div></div>
      <b style="font-size:32px;width:70px;text-align:right">${v}h</b></div>`).join('')}
    <div style="font-size:21px;color:#4A5670;margin-top:14px">Sin reducción de salario ni prestaciones.</div>
  </div>
  <div style="position:absolute;left:90px;top:1170px" class="btn"><span style="font-size:40px;padding:22px 44px;display:flex;align-items:center;gap:16px"><span style="color:#34B614">●</span>Prepárate en checkonoff.mx</span></div>
</div>`]);

/* 3 · Registro de jornada · Historia */
PIECES.push(['03_registro_jornada_historia', 1920, `<div class="f" style="width:1080px;height:1920px">
  <div class="bgph" style="background-image:url('${img('obra.jpg')}')"></div><div class="ov"></div><div class="ov2"></div>
  <div style="position:absolute;left:110px;right:110px;top:300px;display:flex;justify-content:space-between;align-items:center">
    <div class="kick">Jornada 40 horas</div><div class="logo"><span class="t"><img src="${LOGO}"></span></div></div>
  <h1 style="position:absolute;left:110px;right:110px;top:450px;font-size:92px">Con menos horas, cada minuto <span style="color:#D9FFD0">tiene que quedar registrado.</span></h1>
  <div style="position:absolute;left:110px;top:1080px;font-size:40px;line-height:1.35;font-weight:500;max-width:470px;opacity:.95">Entradas, salidas, breaks y tiempo extra con hora, GPS y foto.</div>
  ${phoneApp(460, 'position:absolute;right:90px;top:1010px;transform:rotate(5deg)')}
  <div style="position:absolute;left:110px;top:1330px">${clock(300, 9, 0)}</div>
  <div style="position:absolute;left:80px;top:1660px" class="pillw"><span style="font-size:50px;padding:20px 48px">Prueba 14 días gratis</span></div>
  <div style="position:absolute;left:330px;top:1780px" class="btn"><span style="font-size:58px;padding:20px 50px 20px 32px;display:flex;align-items:center;gap:20px"><span style="color:#34B614">↗</span>Empezar</span></div>
</div>`]);

/* 4 · Guía gratuita · Feed (versión cuadrada 4:5) */
PIECES.push(['04_guia_40h_feed', 1350, `<div class="f" style="width:1080px;height:1350px">
  <div class="bgph" style="background-image:url('${img('rrhh.jpg')}')"></div><div class="ov"></div><div class="ov2"></div>
  <div style="position:absolute;left:90px;right:90px;top:80px;display:flex;justify-content:space-between;align-items:center">
    <div class="kick">Guía gratuita</div><div class="logo"><span class="t"><img src="${LOGO}"></span>CheckONOFF</div></div>
  <h1 style="position:absolute;left:90px;right:120px;top:200px;font-size:86px">¿Cómo preparar a tu empresa para la jornada de 40 horas?</h1>
  ${guideCover(380, 512, 'Jornada de 40 horas:', 'lo que debes ajustar hoy para no perder el control en 2027', 'right:80px;top:620px;transform:rotate(3deg)')}
  <div style="position:absolute;left:20px;top:650px">${clock(470)}</div>
  <div style="position:absolute;left:70px;top:1170px" class="btn"><span style="font-size:44px;padding:22px 46px 22px 30px;display:flex;align-items:center;gap:18px"><span style="color:#34B614">⤓</span>Descarga la guía gratis</span></div>
</div>`]);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [name, h, body] of PIECES) {
    await page.setViewportSize({ width: 1080, height: h });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${body}</body></html>`);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
