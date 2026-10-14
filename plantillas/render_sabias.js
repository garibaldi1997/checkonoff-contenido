const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'out_sabias');
fs.mkdirSync(OUT, { recursive: true });
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const img = f => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'photos', f)).toString('base64');

const THEMES = {
  dark:  { bg: '#111C3B', ink: '#FFFFFF', sub: '#C5CCDA', hl: '#7DD818', kbg: '#34B614', kink: '#111C3B', chip: '#FFFFFF', chipInk: '#111C3B' },
  cream: { bg: '#F2F6FB', ink: '#111C3B', sub: '#4A5670', hl: '#34B614', kbg: '#111C3B', kink: '#FFFFFF', chip: '#34B614', chipInk: '#111C3B' },
  blue:  { bg: '#0A4E94', ink: '#FFFFFF', sub: '#D4E4F5', hl: '#7DD818', kbg: '#E21B20', kink: '#FFFFFF', chip: '#FFFFFF', chipInk: '#111C3B' },
  green: { bg: '#34B614', ink: '#111C3B', sub: '#111C3B', hl: '#FFFFFF', kbg: '#111C3B', kink: '#FFFFFF', chip: '#FFFFFF', chipInk: '#111C3B' },
};

const post = ({ photo, pos = 'center', theme, kicker, title, sub, chip, stickers = '' }) => {
  const t = THEMES[theme];
  return `<div class="f" style="background:${t.bg};color:${t.ink}">
  <div class="ph" style="background-image:url('${img(photo)}');background-position:${pos}"></div>
  <div class="fade" style="background:linear-gradient(to bottom,rgba(0,0,0,0) 0%,${t.bg} 100%)"></div>
  <div class="brand"><span class="tile"><img src="${LOGO}"></span><span>CheckONOFF</span></div>
  <div class="chip" style="background:${t.chip};color:${t.chipInk}">${chip}</div>
  ${stickers}
  <div class="body">
    <div class="kick" style="background:${t.kbg};color:${t.kink}">${kicker}</div>
    <div class="title">${title.replace(/\*\*(.+?)\*\*/g, `<span style="color:${t.hl}">$1</span>`)}</div>
    <div class="sub" style="color:${t.sub}">${sub}</div>
    <div class="foot"><span>¿Lo sabías? Guárdalo 📌</span><b>checkonoff.mx</b></div>
  </div></div>`;
};

const CSS = `
.tile,.brand .t,.brand .tile{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.tile img,.brand .t img,.brand img{object-fit:contain}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
.f{width:1080px;height:1350px;position:relative;overflow:hidden}
.ph{position:absolute;left:0;right:0;top:0;height:720px;background-size:cover;filter:saturate(1.08) contrast(1.04)}
.fade{position:absolute;left:0;right:0;top:470px;height:260px}
.brand{position:absolute;top:44px;left:50px;display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.94);color:#111C3B;border-radius:999px;padding:8px 26px 8px 8px;font-size:28px;font-weight:600;letter-spacing:-.5px;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2)}
.brand .tile{width:54px;height:54px;border-radius:50%;background:#111C3B;display:grid;place-items:center;overflow:hidden}.brand img{width:50px}
.chip{position:absolute;top:52px;right:50px;border-radius:999px;padding:16px 26px;font-size:26px;font-weight:700;z-index:3;box-shadow:0 10px 30px rgba(0,0,0,.2)}
.body{position:absolute;left:70px;right:70px;top:600px;bottom:60px;display:flex;flex-direction:column;z-index:2}
.kick{align-self:flex-start;border-radius:999px;padding:14px 28px;font-size:30px;font-weight:800;letter-spacing:1px;text-transform:uppercase}
.title{font-size:80px;font-weight:700;letter-spacing:-.045em;line-height:1.04;margin-top:34px}
.sub{font-size:40px;line-height:1.32;font-weight:500;margin-top:26px;letter-spacing:-.01em}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:32px;font-weight:600;opacity:.9}
.st{position:absolute;z-index:3;background:#fff;color:#111C3B;border-radius:22px;padding:16px 24px;font-size:28px;font-weight:600;box-shadow:0 16px 36px rgba(0,0,0,.28);white-space:nowrap}
.em{position:absolute;z-index:3;width:110px;height:110px;border-radius:50%;display:grid;place-items:center;font-size:58px;box-shadow:0 16px 36px rgba(0,0,0,.3)}`;

const st = (t, pos, r = 0) => `<div class="st" style="${pos};transform:rotate(${r}deg)">${t}</div>`;
const em = (e, bg, pos, r = 0) => `<div class="em" style="background:${bg};${pos};transform:rotate(${r}deg)">${e}</div>`;

const POSTS = [
  ['sabias_01_aguinaldo', { photo: 'f_aguinaldo.jpg', theme: 'dark', kicker: '📋 Para RRHH', chip: '⚖️ Art. 87 LFT',
    title: 'Aguinaldo: **antes del 20 de diciembre** y con el proporcional bien calculado.',
    sub: 'Mínimo 15 días de salario. A quien no cumplió el año le toca la parte proporcional a los días trabajados.',
    stickers: em('🎄', '#34B614', 'left:70px;top:300px', -8) + st('🧮 Días trabajados × proporcional', 'right:60px;top:380px', 4) }],
  ['sabias_02_tiempo_extra', { photo: 'f_extra.jpg', theme: 'blue', kicker: '📢 RRHH: cambió la ley', chip: '⚖️ DOF 1/05/2026',
    title: 'Tiempo extra: **máx. 4 h al día y en máx. 4 días** por semana.',
    sub: 'Al doble, hasta 9 h por semana (sube a 12 en 2030). Al triple, solo 4 h más. Y nunca más de 12 h de trabajo al día.',
    stickers: st('⏱️ Hasta 9 h → x2', 'left:60px;top:250px', -4) + st('🔥 Máx. 4 h más → x3', 'right:60px;top:380px', 3) }],
  ['sabias_09_calculadora', { photo: 'f_extra.jpg', theme: 'blue', kicker: '🧮 Herramienta gratis', chip: '✅ Reforma LFT 2026',
    title: 'Calcula tus horas extra **con las reglas nuevas.**',
    sub: 'Escribe la semana, el salario y las horas de cada día: separa dobles y triples y te avisa si algo no está permitido.',
    stickers: st('⏱️ Dobles: 4 h × 4 días', 'left:60px;top:250px', -4) + st('🔥 Triples: máx. 4 h', 'right:60px;top:380px', 3) }],
  ['sabias_08_registro', { photo: 'rrhh.jpg', pos: 'center 30%', theme: 'dark', kicker: '📢 RRHH: nueva obligación', chip: '⚖️ Art. 132 fr. XXXIV LFT',
    title: 'Registrar la jornada **de forma electrónica** ya es obligatorio.',
    sub: 'Inicio y fin de la jornada de cada trabajador. Las reglas de la STPS aplican desde el 1 de enero de 2027.',
    stickers: st('💸 Multa: 250 a 5,000 UMA', 'left:60px;top:300px', -3) + em('📲', '#34B614', 'right:80px;top:200px', 6) }],
  ['sabias_03_faltas', { photo: 'f_faltas.jpg', theme: 'dark', kicker: '¿Sabías que…?', chip: '⚖️ Art. 47 fr. X LFT',
    title: 'Más de **3 faltas injustificadas en 30 días** es causa de rescisión.',
    sub: 'Sin responsabilidad para el patrón. Por eso cada falta debe quedar registrada y documentada.',
    stickers: em('⚠️', '#fff', 'right:80px;top:250px', 6) + st('❌ Falta · ❌ Falta · ❌ Falta · ❌ Falta', 'left:60px;top:420px', -3) }],
  ['sabias_04_ley_silla', { photo: 'f_silla.jpg', theme: 'blue', kicker: '📢 RRHH: cambio en la ley', chip: '🪑 “Ley Silla”',
    title: '¿Tu personal trabaja de pie? La ley ya te obliga a darle **una silla con respaldo.**',
    sub: 'Y a permitir periodos de descanso sentado durante la jornada. Revisa tu reglamento interior y tus procesos.',
    stickers: st('✅ Comercios · Servicios · Industria', 'left:60px;top:330px', -3) }],
  ['sabias_05_carga_prueba', { photo: 'rrhh.jpg', pos: 'center 30%', theme: 'cream', kicker: '¿Sabías que…?', chip: '⚖️ Arts. 784 y 804 LFT',
    title: 'Si te demandan por la jornada, **la empresa tiene que probarla.**',
    sub: 'Tus registros de asistencia son tu mejor defensa. Sin ellos, es muy difícil demostrar horarios y horas extra.',
    stickers: st('📋 Registros de asistencia = tu defensa', 'left:60px;top:430px', -3) + em('🛡️', '#34B614', 'right:80px;top:200px', 6) }],
  ['sabias_06_paternidad', { photo: 'f_papa.jpg', pos: 'center 25%', theme: 'green', kicker: '📋 Para RRHH', chip: '⚖️ Art. 132 fr. XXVII Bis',
    title: 'Permiso de paternidad: **5 días laborables con goce de sueldo.**',
    sub: 'Por nacimiento o adopción. ¿Tu equipo de RRHH lo registra como permiso con goce o termina descontado como falta?',
    stickers: em('💚', '#fff', 'left:70px;top:330px', -6) }],
  ['sabias_07_prima_dominical', { photo: 'f_dominical.jpg', pos: 'center 30%', theme: 'dark', kicker: '¿Sabías que…?', chip: '⚖️ Art. 71 LFT',
    title: 'Si trabajas en domingo, te pagan **25 % extra** de tu salario de ese día.',
    sub: 'Se llama prima dominical y aplica aunque el domingo sea parte de tu horario normal.',
    stickers: st('☀️ Domingo = +25 %', 'right:60px;top:300px', 4) + em('💵', '#34B614', 'left:70px;top:420px', -6) }],
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1080, height: 1350 });
  for (const [name, o] of POSTS) {
    if (process.argv[2] && !name.startsWith(process.argv[2])) continue;
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${post(o)}</body></html>`);
    await page.waitForTimeout(120);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
