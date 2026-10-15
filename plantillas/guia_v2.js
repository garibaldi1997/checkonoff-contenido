// Guía PDF "Jornada de 40 horas" v2 · colores del logo · ilustraciones SVG · QR
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const b64 = (f, t) => `data:${t};base64,` + fs.readFileSync(path.join(__dirname, f)).toString('base64');
const LOGO = b64('logo.png', 'image/png'), LOGOF = b64('logo_full.png', 'image/png');
const QRWEB = b64('qr_registro.png', 'image/png'), QRWA = b64('qr_grupo.png', 'image/png'), QRASE = b64('qr_asesor.png', 'image/png');
const PH_COVER = b64('ph_cover.jpg', 'image/jpeg'), PH_BACK = b64('ph_back.jpg', 'image/jpeg');
const FONTS = [400, 500, 600, 700, 800].map(w => `@font-face{font-family:'IT';font-weight:${w};src:url(${b64('fonts_it_' + w + '.ttf', 'font/ttf')}) format('truetype')}`).join('');
const QRCALC = b64('qr_calc.png', 'image/png'), CALC_HE = 'https://checkonoff.mx/calculadora-horas-extra/';
const REG = 'https://app.checkonoff.mx/registro-empresa', ASESOR = 'https://wa.me/523330213199?text=Hola%2C%20soy%20de%20RRHH%20y%20descargu%C3%A9%20la%20gu%C3%ADa%20de%2040%20horas', CALC_VAC = 'https://checkonoff.mx/calculadora-vacaciones/';
const NAVY = '#111C3B', BLUE = '#0A4E94', GREEN = '#34B614', LIME = '#7DD818', RED = '#E21B20', LIGHT = '#F2F6FB';
const WA_LINK = 'https://chat.whatsapp.com/DyoKg8wa7IQCWzT9UgOyge';

/* ---------- Ilustraciones (SVG plano) ---------- */
const SKIN = ['#F2C7A5', '#D9A07B', '#B97A56', '#8D5A3B'];
function persona({ x = 0, y = 0, s = 1, skin = 1, hair = '#2B1D14', shirt = BLUE, pants = NAVY, mood = 'smile', helmet = false, long = false, prop = '', arm = 'down', tie = false } = {}) {
  const sk = SKIN[skin];
  const mouth = mood === 'smile' ? `<path d="M88 74 Q100 84 112 74" stroke="#5A2E1E" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : mood === 'sad' ? `<path d="M88 80 Q100 71 112 80" stroke="#5A2E1E" stroke-width="3" fill="none" stroke-linecap="round"/>`
    : `<path d="M90 77 H110" stroke="#5A2E1E" stroke-width="3" stroke-linecap="round"/>`;
  const brows = mood === 'sad' ? `<path d="M84 50 L94 54 M116 50 L106 54" stroke="#3A2418" stroke-width="3" stroke-linecap="round"/>` : '';
  const hairBack = long ? `<path d="M64 60 Q62 20 100 18 Q138 20 136 60 L140 118 Q100 128 60 118 Z" fill="${hair}"/>` : '';
  const hairTop = helmet
    ? `<path d="M64 52 Q66 14 100 14 Q134 14 136 52 Z" fill="#FFFFFF" stroke="#D5DCE8" stroke-width="2"/><rect x="58" y="48" width="84" height="9" rx="4" fill="#FFFFFF" stroke="#D5DCE8" stroke-width="2"/><rect x="94" y="16" width="12" height="34" rx="5" fill="${GREEN}"/>`
    : `<path d="M66 54 Q64 18 100 18 Q138 18 134 56 Q124 34 100 36 Q78 36 66 54 Z" fill="${hair}"/>`;
  const armR = arm === 'up'
    ? `<path d="M140 120 Q170 100 168 62" stroke="${shirt}" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="168" cy="56" r="11" fill="${sk}"/>`
    : arm === 'point'
    ? `<path d="M140 122 Q178 124 196 108" stroke="${shirt}" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="198" cy="106" r="11" fill="${sk}"/>`
    : `<path d="M140 124 Q150 170 146 206" stroke="${shirt}" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="146" cy="214" r="11" fill="${sk}"/>`;
  const props = {
    phone: `<rect x="150" y="184" width="30" height="52" rx="6" fill="${NAVY}"/><rect x="154" y="190" width="22" height="36" rx="3" fill="${LIME}"/>`,
    clip: `<rect x="40" y="160" width="46" height="60" rx="5" fill="#FFFFFF" stroke="${NAVY}" stroke-width="3"/><rect x="52" y="154" width="22" height="10" rx="3" fill="${NAVY}"/><path d="M48 180 H78 M48 192 H78 M48 204 H70" stroke="#9AA6BD" stroke-width="3"/>`,
  };
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="100" cy="342" rx="62" ry="9" fill="rgba(17,28,59,.12)"/>
    <rect x="72" y="226" width="24" height="108" rx="10" fill="${pants}"/><rect x="104" y="226" width="24" height="108" rx="10" fill="${pants}"/>
    <rect x="64" y="326" width="36" height="14" rx="7" fill="#1B1B1B"/><rect x="100" y="326" width="36" height="14" rx="7" fill="#1B1B1B"/>
    <path d="M60 128 Q60 102 100 100 Q140 102 140 128 L136 236 H64 Z" fill="${shirt}"/>
    ${tie ? `<path d="M100 104 L94 118 L100 170 L106 118 Z" fill="${RED}"/>` : `<path d="M88 102 L100 118 L112 102" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="4"/>`}
    <path d="M60 124 Q50 170 54 206" stroke="${shirt}" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="54" cy="214" r="11" fill="${sk}"/>
    ${armR}
    ${hairBack}
    <rect x="90" y="86" width="20" height="18" fill="${sk}"/>
    <circle cx="100" cy="62" r="34" fill="${sk}"/>
    ${hairTop}
    <circle cx="88" cy="62" r="4" fill="#2A1A12"/><circle cx="112" cy="62" r="4" fill="#2A1A12"/>${brows}
    ${mouth}
    ${props[prop] || ''}
  </g>`;
}
const svg = (w, h, inner, vb) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb || `0 0 ${w} ${h}`}">${inner}</svg>`;
const reloj = (x, y, r, hh = 10, mm = 10) => {
  const a = (v, max) => (v / max) * 2 * Math.PI - Math.PI / 2;
  const ticks = Array.from({ length: 12 }, (_, i) => { const t = a(i, 12); return `<line x1="${x + Math.cos(t) * r * .78}" y1="${y + Math.sin(t) * r * .78}" x2="${x + Math.cos(t) * r * .9}" y2="${y + Math.sin(t) * r * .9}" stroke="${NAVY}" stroke-width="${r * .05}" stroke-linecap="round"/>`; }).join('');
  const h = a(hh % 12 + mm / 60, 12), m = a(mm, 60);
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${BLUE}"/><circle cx="${x}" cy="${y}" r="${r * .86}" fill="#fff"/>${ticks}
  <line x1="${x}" y1="${y}" x2="${x + Math.cos(h) * r * .45}" y2="${y + Math.sin(h) * r * .45}" stroke="${NAVY}" stroke-width="${r * .08}" stroke-linecap="round"/>
  <line x1="${x}" y1="${y}" x2="${x + Math.cos(m) * r * .68}" y2="${y + Math.sin(m) * r * .68}" stroke="${GREEN}" stroke-width="${r * .06}" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${r * .07}" fill="${RED}"/>`;
};
const celular = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect width="150" height="290" rx="24" fill="${NAVY}"/><rect x="9" y="12" width="132" height="266" rx="16" fill="#ECF1F7"/>
  <rect x="9" y="12" width="132" height="44" rx="16" fill="#0B6B3A"/><rect x="9" y="40" width="132" height="16" fill="#0B6B3A"/>
  <circle cx="30" cy="34" r="11" fill="#fff"/><rect x="48" y="27" width="70" height="7" rx="3" fill="#fff"/><rect x="48" y="38" width="44" height="5" rx="2" fill="rgba(255,255,255,.7)"/>
  <rect x="20" y="70" width="96" height="30" rx="10" fill="#fff"/><rect x="28" y="80" width="70" height="6" rx="3" fill="#9AA6BD"/>
  <rect x="44" y="110" width="88" height="30" rx="10" fill="#D9FDD3"/><rect x="54" y="121" width="56" height="6" rx="3" fill="#5A8A50"/>
  <rect x="20" y="150" width="104" height="58" rx="10" fill="#fff"/><text x="30" y="172" font-size="13" font-weight="800" fill="${GREEN}">✓ ENTRADA</text><text x="30" y="192" font-size="12" fill="${NAVY}">07:58 · 📍 GPS</text>
  <rect x="44" y="218" width="88" height="30" rx="10" fill="#D9FDD3"/><text x="54" y="238" font-size="12" font-weight="700" fill="#2B6B22">¡Registro listo!</text>
</g>`;
const bubble = (x, y, w, lines, col = '#fff', tc = NAVY, tail = 'left') => {
  const h = 22 + lines.length * 19;
  const tx = tail === 'left' ? x + 26 : x + w - 26;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="${col}" stroke="rgba(17,28,59,.12)" stroke-width="2"/>
  <path d="M${tx - 10} ${y + h - 1} L${tx + (tail === 'left' ? -16 : 16)} ${y + h + 18} L${tx + 12} ${y + h - 1} Z" fill="${col}"/>
  ${lines.map((l, i) => `<text x="${x + 16}" y="${y + 28 + i * 19}" font-size="15" font-weight="${i === 0 ? 800 : 500}" fill="${tc}" font-family="IT">${l}</text>`).join('')}</g>`;
};
const rol = p => p.helmet ? '👷' : p.tie ? '👔' : p.prop === 'clip' ? '🧾' : '👩‍💼';
const escena = (a, b, la, lb, bien = true) => `<div class="chat ${bien ? 'ok' : 'no'}">
  <div class="msg l"><span class="av">${rol(a)}</span><p>${la.join(' ')}</p></div>
  <div class="msg r"><p>${lb.join(' ')}</p><span class="av rr">${rol(b)}</span></div></div>`;
const ICONS = {
  check: c => `<circle cx="20" cy="20" r="20" fill="${c || GREEN}"/><path d="M11 21 L18 28 L30 13" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
  x: c => `<circle cx="20" cy="20" r="20" fill="${c || RED}"/><path d="M13 13 L27 27 M27 13 L13 27" stroke="#fff" stroke-width="5" stroke-linecap="round"/>`,
  warn: () => `<path d="M20 3 L38 36 H2 Z" fill="${RED}" stroke="${RED}" stroke-width="3" stroke-linejoin="round"/><rect x="18" y="13" width="4" height="12" rx="2" fill="#fff"/><circle cx="20" cy="30" r="2.6" fill="#fff"/>`,
};
const ic = (n, s = 40, c) => svg(s, s, ICONS[n](c), '0 0 40 40');

/* ---------- Bloques ---------- */
let pageNo = 0;
const brand = (dark) => `<div class="brand ${dark ? 'dk' : ''}"><img src="${LOGO}">CheckONOFF</div>`;
const page = (body, cls = '', foot = true) => { pageNo++; return `<section class="pg ${cls}">${body}${foot ? `<div class="foot"><span>Guía RRHH · Jornada de 40 horas · Basada en el DOF del 1/05/2026</span><span>checkonoff.mx · ${pageNo}</span></div>` : ''}</section>`; };
const head = (num, kicker, title, color = GREEN) => `<div class="top">${brand()}<div class="pill" style="background:${color}">${num ? num + ' · ' : ''}${kicker}</div></div><h2>${title}</h2>`;
const chk = (items, icon = 'check') => `<ul class="chk">${items.map(t => `<li>${ic(icon, 22)}<div>${t}</div></li>`).join('')}</ul>`;
const box = (items) => `<ul class="box">${items.map(t => `<li><span></span><div>${t}</div></li>`).join('')}</ul>`;
const bienMal = (bien, mal) => `<div class="bm"><div class="b">${ic('check', 34)}<b>ASÍ SÍ</b><p>${bien}</p></div><div class="m">${ic('x', 34)}<b>ASÍ NO</b><p>${mal}</p></div></div>`;
const tabla = (cols, rows, cls = '') => `<table class="tb ${cls}"><tr>${cols.map(c => `<th>${c}</th>`).join('')}</tr>${rows.map(r => `<tr class="${r.cls || ''}">${(r.c || r).map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</table>`;
const nota = (t, cls = '') => `<div class="note ${cls}">${t}</div>`;
const ctaCalc = () => `<a class="ctab calc" href="${CALC_HE}"><div><b>🧮 Calcula tus horas extra con la reforma</b><span>Calculadora gratis: escribe la semana, el salario y las horas de cada día; separa dobles y triples y te avisa si algo no está permitido. Toca o escanea →</span></div><img src="${QRCALC}"></a>`;
const cta = (t = 'Prueba CheckONOFF 14 días gratis') => `<a class="ctab" href="${REG}"><div><b>${t}</b><span>14 días gratis, sin tarjeta · Registro electrónico de jornada, horas extra y pre-nómina · Toca o escanea →</span></div><img src="${QRWEB}"></a>`;

const P = [];

/* 1 · Portada */
P.push(page(`
  <div class="cv-logo"><img src="${LOGOF}"></div>
  <div class="cv-tag">GUÍA GRATUITA PARA RRHH · EDICIÓN 2026</div>
  <h1>Jornada de <span>40 horas</span>: lo que tu empresa debe hacer, paso a paso</h1>
  <p class="lead">Reglas nuevas de horas extra, tipos de jornada, registro electrónico obligatorio, multas, CFDI de nómina, ejemplos de bien y mal, y un plan año por año.</p>
  <div class="cv-photo" style="background-image:url(${PH_COVER})"><div class="cv-badge">${svg(64, 64, reloj(32, 32, 30, 8, 0))}<div><b>De 48 a 40 h</b><span>2027 – 2030 · sin bajar salarios</span></div></div></div>
  <div class="cv-steps">${[['48 h', '2026'], ['46 h', '2027'], ['44 h', '2028'], ['42 h', '2029'], ['40 h', '2030']].map(([h, y], i) => `<div class="${i === 4 ? 'last' : ''}"><b>${h}</b><span>${y}</span></div>`).join('')}</div>
  <div class="cv-foot">Basada en el decreto de reforma a la Ley Federal del Trabajo publicado en el DOF el 1 de mayo de 2026</div>`, 'cover', false));

/* 2 · En 1 minuto */
P.push(page(`${head('', 'Resumen', 'La reforma en 1 minuto')}
  <p class="p">Si solo vas a leer una página, que sea esta. Estos son los números que RRHH tiene que dominar desde el <b>1 de mayo de 2026</b>:</p>
  <div class="kpis">
    ${[['40 h', 'Jornada ordinaria máxima por semana en 2030 (baja 2 h cada 1 de enero desde 2027).', GREEN],
       ['12 h', 'Tope absoluto por día: jornada ordinaria + horas extra (art. 68).', BLUE],
       ['4 × 4', 'Horas extra dobles: hasta 4 h al día, en máximo 4 días de la semana (art. 66).', BLUE],
       ['4 h', 'Máximo de horas extra triples por semana. Antes no tenían tope (art. 68).', RED],
       ['0 h', 'Horas extra para menores de 18 años: prohibidas.', RED],
       ['$586,550', 'Multa máxima por no llevar registro electrónico de jornada (5,000 UMA, art. 994).', NAVY]]
      .map(([n, t, c]) => `<div class="kpi" style="border-top:6px solid ${c}"><b style="color:${c}">${n}</b><p>${t}</p></div>`).join('')}
  </div>
  <div class="hero2"><span class="hav">💡</span>
    <div><b>Lo más importante no es trabajar menos horas: es poder demostrar cada hora.</b><p>La ley ahora obliga a registrar la jornada de forma electrónica. Sin registro, la empresa no tiene cómo defenderse en una inspección o una demanda.</p></div></div>
  ${nota('<b>Aviso:</b> esta guía es informativa y no sustituye la asesoría de tu abogado laboral o tu contador. Las reglas de la STPS sobre el registro electrónico aún no se publican.', 'warn')}`));

/* 3 · Constitución vs LFT + calendario */
P.push(page(`${head('01', 'Qué cambió', 'Constitución, LFT y calendario 2026-2030')}
  ${tabla(['Tema', 'Constitución (art. 123)', 'Ley Federal del Trabajo'], [
    ['<b>Jornada</b>', '40 h semanales, gradual', 'Arts. 58 a 68: cómo se distribuye y organiza'],
    ['<b>Horas extra</b>', 'Hasta 12 h/sem: 4 h diarias, máx. 4 días, pago doble', 'Cálculo, autorización, dobles y triples, sanciones'],
    ['<b>Menores</b>', 'Prohibido el tiempo extra a menores de 18', 'Obligaciones, inspección y sanciones'],
    ['<b>Salario</b>', 'Prohibido reducir sueldo o prestaciones', 'Mecanismos para conservarlos'],
    ['<b>Registro</b>', 'No lo regula', 'Art. 132 fr. XXXIV: registro electrónico obligatorio'],
  ])}
  <h4>Calendario oficial (transitorios segundo y cuarto)</h4>
  ${tabla(['Año', 'Jornada ordinaria', 'Extra dobles', 'Extra triples', 'Extra total', 'Máximo semanal'], [
    ['2026', '48 h', '9 h', '4 h', '13 h', '61 h'], ['2027', '<b>46 h</b>', '9 h', '4 h', '13 h', '59 h'],
    ['2028', '<b>44 h</b>', '10 h', '4 h', '14 h', '58 h'], ['2029', '<b>42 h</b>', '11 h', '4 h', '15 h', '57 h'],
    { cls: 'hl', c: ['2030', '<b>40 h</b>', '12 h', '4 h', '16 h', '56 h'] }], 'center')}
  ${nota('<b>Ojo:</b> los límites diarios no cambian con los años: 8 h diurna, 7 nocturna y 7.5 mixta (art. 61) y nunca más de 12 h totales en un día (art. 68). Los "7.66 h por día" que circulan en redes son promedios, no límites legales.')}
  ${escena({ skin: 2, shirt: BLUE, helmet: true, mood: 'neutral' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['¿Entonces en 2026', 'no cambia nada?'], ['Sí cambia: desde el 1 de mayo', 'hay nuevos topes de horas', 'extra y el registro electrónico.'], true, 58)}
  ${nota('<b>Fechas clave:</b> vigencia 1/05/2026 · ajuste mayo-diciembre 2026 · cada reducción el 1 de enero · reglas de la STPS del registro electrónico desde el 1/01/2027 · nunca se reduce el salario (transitorio séptimo).', 'blue')}`));

/* 4 · Tipos de jornada */
P.push(page(`${head('02', 'Tipos de jornada', 'Diurna, nocturna y mixta: los máximos legales')}
  <div class="jt">
    ${[['☀️', 'Diurna', '06:00 a 20:00', '8 h', '#F5B700'], ['🌙', 'Nocturna', '20:00 a 06:00', '7 h', BLUE], ['🌗', 'Mixta', 'Abarca ambas; el periodo nocturno es menor de 3.5 h', '7.5 h', GREEN]]
      .map(([e, t, h, m, c]) => `<div style="border-color:${c}"><span class="e">${e}</span><b>${t}</b><small>${h}</small><em style="background:${c}">${m} máx. al día</em></div>`).join('')}
  </div>
  ${nota('<b>Mito:</b> la jornada "vespertina" no existe en la ley. Un turno de 14:00 a 21:30 es <b>mixto</b> (tiene 1.5 h nocturnas). Si el periodo nocturno es de 3.5 h o más, la jornada se considera <b>nocturna</b> (art. 60).', 'warn')}
  <h4>Tope semanal efectivo por tipo de jornada</h4>
  <p class="p sm">El tope del art. 59 solo aplica cuando es menor que 6 días × el máximo diario. Por eso cada jornada empieza a bajar en un año distinto:</p>
  ${tabla(['Año', '☀️ Diurna', '🌗 Mixta', '🌙 Nocturna'], [
    ['2026', '48 h', '45 h', '42 h'], ['2027', '<b class="g">↓ 46 h</b>', '45 h', '42 h'], ['2028', '<b class="g">↓ 44 h</b>', '<b class="g">↓ 44 h</b>', '42 h'],
    ['2029', '<b class="g">↓ 42 h</b>', '<b class="g">↓ 42 h</b>', '42 h'], { cls: 'hl', c: ['2030', '<b class="g">↓ 40 h</b>', '<b class="g">↓ 40 h</b>', '<b class="g">↓ 40 h</b>'] }], 'center')}
  ${escena({ skin: 1, hair: '#24170F', shirt: '#FFFFFF', tie: true, mood: 'neutral' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['Tu turno es vespertino,', 'de 14:00 a 21:30.'], ['Legalmente es MIXTO:', 'máximo 7.5 h al día.', 'La vespertina no existe.'], true, 58)}
  <h4>¿Cómo pueden quedar los turnos en 2030? (de común acuerdo, art. 58)</h4>
  ${tabla(['Turno', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom', 'Total'], [
    ['☀️ Diurno', '8', '8', '8', '8', '8', 'Desc.', 'Desc.', '<b>40 h</b>'],
    ['🌙 Nocturno', '7', '7', '7', '7', '7', '5', 'Desc.', '<b>40 h</b>'],
    ['🌗 Mixto', '7.5', '7.5', '7.5', '7.5', '7.5', '2.5', 'Desc.', '<b>40 h</b>']], 'center sm')}`));

/* 5 · Comidas, descanso y domingo */
P.push(page(`${head('03', 'Descansos', 'Comida, descanso semanal y prima dominical')}
  <p class="p">En jornada continua hay al menos <b>30 minutos de descanso</b> (art. 63). Si el trabajador <b>no puede salir</b> del lugar en su comida, ese tiempo cuenta como trabajado (art. 64).</p>
  <div class="two">
    ${tabla(['30 min dentro de la jornada', ''], [['Entrada', '08:01'], ['Inicio de descanso', '12:01'], ['Fin de descanso', '12:31'], ['Salida', '16:01'], { cls: 'hl', c: ['<b>Jornada computable</b>', '<b>8 h</b>'] }])}
    ${tabla(['1 h de comida fuera de la jornada', ''], [['Entrada', '08:01'], ['Salida a comer', '12:01'], ['Regreso', '13:01'], ['Salida', '17:01'], { cls: 'hl', c: ['<b>Trabajo efectivo · permanencia</b>', '<b>8 h · 9 h</b>'] }])}
  </div>
  ${bienMal('Registrar salida y regreso de comida. Así el sistema separa el tiempo efectivo del descanso y lo puedes probar.', 'Descontar 1 h de comida "en automático" cuando el trabajador come en su puesto: ese tiempo es jornada y puede convertirse en horas extra no pagadas.')}
  ${escena({ skin: 2, shirt: BLUE, helmet: true, mood: 'neutral' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['Yo como aquí mismo,', 'no me muevo de mi lugar.'], ['Entonces ese tiempo cuenta', 'como jornada trabajada', '(art. 64).'], true, 58)}
  <h4>Descanso semanal y domingo</h4>
  <p class="p sm">Por cada 6 días de trabajo, al menos 1 de descanso con salario íntegro (art. 69). Se procurará que sea el domingo; quien trabaje en domingo recibe una prima de al menos 25 % (art. 71).</p>
  ${tabla(['Salario diario $500', 'Descansa en domingo', 'Descansa en lunes (trabaja domingo)'], [
    ['6 días trabajados', '$3,000', '$3,000'], ['Descanso pagado', '$500', '$500'], ['Prima dominical 25 %', '$0', '<b class="r">$125</b>'], { cls: 'hl', c: ['<b>Costo de la semana</b>', '<b>$3,500</b>', '<b>$3,625</b>'] }], 'center')}`));

/* 6 · Artículos antes vs ahora */
P.push(page(`${head('04', 'Antes vs. ahora', 'Los artículos que cambiaron', BLUE)}
  ${tabla(['Art.', 'Antes', 'Ahora (DOF 1/05/2026)'], [
    ['<b>58</b>', 'Jornada: tiempo a disposición del patrón', 'Igual, y se puede distribuir de común acuerdo (respetando el tope diario)'],
    ['<b>59</b>', 'Repartir horas para descansar el sábado', '<b>Máximo 40 h semanales</b> (gradual a 2030)'],
    ['<b>61</b>', '8 h diurna, 7 nocturna, 7.5 mixta', 'Los mismos máximos, ahora <b>diarios</b> y bajo el tope semanal'],
    ['<b>66</b>', 'Extra: máx. 3 h diarias, 3 veces por semana', '<b>Hasta 4 h diarias en máx. 4 días</b>; tope semanal 9 → 12 h; pago doble'],
    ['<b>67</b>', 'Segundo párrafo', 'Derogado'],
    ['<b>68</b>', 'Exceso pagado triple, sin tope', '<b>Triples: máx. 4 h por semana</b> (200 % adicional) y nunca más de 12 h al día'],
    ['<b>69</b>', '1 día de descanso por cada 6', 'Igual, con goce de salario íntegro'],
    ['<b>71</b>', 'Prima dominical 25 %', 'Igual'],
    ['<b>132 XXXIV</b>', '—', '<b>Registro electrónico de la jornada</b> (inicio y fin) y entregarlo a la autoridad'],
    ['<b>994 IV Bis</b>', '—', '<b>Multa de 250 a 5,000 UMA</b> por no llevar el registro']], 'sm')}
  <div class="two">
    <div class="card">${ic('x', 30)}<h3>Antes</h3><p>3 h × 3 días = 9 h dobles. Lo demás, triple y sin límite. Menores: prohibición desde 16 años.</p></div>
    <div class="card g">${ic('check', 30)}<h3>Ahora</h3><p>4 h × 4 días (9 → 12 h dobles) + máx. 4 h triples. Tope de 12 h al día. Menores de 18: cero horas extra.</p></div>
  </div>
  ${escena({ skin: 3, hair: '#1B120C', shirt: NAVY, mood: 'smile', prop: 'clip' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['Pues seguimos igual:', '3 horas extra, 3 días.'], ['Ya no: ahora son hasta 4 h', 'en 4 días, máx. 4 triples', 'y nunca más de 12 h al día.'])}`));

/* 7 · Horas extra: reglas + ejemplo legal 2026 */
P.push(page(`${head('05', 'Horas extra', 'Cómo se calculan ahora, sin errores')}
  <div class="rules">
    ${[['1', 'Cuenta las horas que pasan de la jornada ordinaria del día (8/7/7.5 h).'], ['2', 'Las primeras van al <b>doble</b>: hasta 4 h por día, en máx. 4 días, hasta el tope semanal del año (9 h en 2026-2027).'], ['3', 'Lo que pase de esos límites va al <b>triple</b>: máximo 4 h en la semana.'], ['4', 'Revisa que ningún día pase de <b>12 h totales</b>. Si pasa, ese tiempo no debe trabajarse.']]
      .map(([n, t]) => `<div><i>${n}</i><p>${t.replace(/<b>/g,'<strong>').replace(/<\/b>/g,'</strong>')}</p></div>`).join('')}
  </div>
  <h4>${ic('check', 22)} Ejemplo 100 % legal en 2026 (jornada diurna, lunes a sábado)</h4>
  ${tabla(['Día', 'Ordinaria', 'Extra', 'Dobles', 'Triples', 'Total del día', 'Estatus'], [
    ['Lunes', '8', '4', '4', '0', '12', '<b class="g">Cumple (límite)</b>'], ['Martes', '8', '4', '4', '0', '12', '<b class="g">Cumple (límite)</b>'],
    ['Miércoles', '8', '3', '1', '2', '11', '<b class="g">Cumple</b>'], ['Jueves', '8', '2', '0', '2', '10', '<b class="g">Cumple</b>'],
    ['Viernes', '8', '0', '0', '0', '8', '<b class="g">Cumple</b>'], ['Sábado', '8', '0', '0', '0', '8', '<b class="g">Cumple</b>'],
    { cls: 'hl', c: ['<b>Totales</b>', '<b>48</b>', '<b>13</b>', '<b>9</b>', '<b>4</b>', '<b>61</b>', '<b class="g">100 % legal</b>'] }], 'center sm')}
  <h4>${ic('check', 22)} Ejemplo 100 % legal en 2030 (40 h + 12 dobles + 4 triples = 56 h, el máximo)</h4>
  ${tabla(['Día', 'Ordinaria', 'Extra', 'Dobles', 'Triples', 'Total'], [
    ['Lunes', '6', '5', '4', '1', '11'], ['Martes', '8', '4', '4', '0', '12'], ['Miércoles', '8', '4', '4', '0', '12'], ['Jueves', '8', '3', '0', '3', '11'],
    ['Viernes', '6', '0', '0', '0', '6'], ['Sábado', '4', '0', '0', '0', '4'], { cls: 'hl', c: ['<b>Totales</b>', '<b>40</b>', '<b>16</b>', '<b>12</b>', '<b>4</b>', '<b>56</b>'] }], 'center sm')}`));

/* 8 · Caso antes vs después */
P.push(page(`${head('06', 'Caso práctico', 'El mismo trabajador, antes y después de la reforma', RED)}
  <p class="p">Salario de <b>$500</b> al día · jornada diurna de 8 h · hora simple <b>$62.50</b> · doble <b>$125</b> · triple <b>$187.50</b>. La empresa quiere 15 horas extra: lunes, miércoles y viernes 5 h.</p>
  <div class="vs">
    <div class="old">
      <div class="vh"><span class="hav o">⏳</span><div><small>HASTA EL 30 DE ABRIL DE 2026</small><b>15 h extra = $2,250</b></div></div>
      ${tabla(['Día', 'Extra', 'Dobles', 'Triples'], [['Lunes', '5', '3', '2'], ['Miércoles', '5', '3', '2'], ['Viernes', '5', '3', '2'], { cls: 'hl', c: ['<b>Total</b>', '<b>15</b>', '<b>9</b>', '<b>6</b>'] }], 'center sm')}
      <p class="sm2">9 × $125 + 6 × $187.50 = $2,250. (Ya entonces, 5 h en un día rebasaba el límite de 3 h diarias.)</p>
    </div>
    <div class="new">
      <div class="vh"><span class="hav">✅</span><div><small>DESDE EL 1 DE MAYO DE 2026</small><b>Máximo legal 13 h = $1,875</b></div></div>
      ${tabla(['Día', 'Dobles', 'Triples', 'Total día'], [['Lunes', '4', '0', '12'], ['Miércoles', '4', '0', '12'], ['Viernes', '1', '3', '12'], ['Martes o jueves', '0', '1', '9'], { cls: 'hl', c: ['<b>Total</b>', '<b>9</b>', '<b>4</b>', ''] }], 'center sm')}
      <p class="sm2">9 × $125 + 4 × $187.50 = $1,875.</p>
    </div>
  </div>
  ${bienMal('Redistribuir: máx. 4 h extra por día, nunca más de 12 h en el día y solo 4 h triples. Las <b>2 horas sobrantes no se trabajan</b>: se cubren con otra persona o con otro turno.', 'Seguir con 5 + 5 + 5: son días de 13 h (rebasan el tope de 12) y 6 h triples (rebasan el máximo de 4). Es incumplimiento aunque se paguen.')}
  ${ctaCalc()}`));

/* 9 · Disfrazar como bono */
P.push(page(`${head('07', 'Error caro', 'Disfrazar horas extra como "bono"', RED)}
  <p class="p">Cuando las horas ya no caben en el tope, algunas empresas las pagan como "bono de productividad". El recibo suma lo mismo… y ahí está el problema.</p>
  <div class="two">
    <div class="rcpt ok"><div class="rh">${ic('check', 26)} Hasta el 30 de abril · correcto</div>
      <div class="row"><span>Sueldo ordinario</span><b>$3,000</b></div><div class="row"><span>Horas extra dobles (9 h)</span><b>$1,125</b></div><div class="row"><span>Horas extra triples (6 h)</span><b>$1,125</b></div><div class="row t"><span>Total</span><b>$5,250</b></div>
      <p>El CFDI refleja lo que el registro dice.</p></div>
    <div class="rcpt bad"><div class="rh">${ic('x', 26)} Después del 1 de mayo · incorrecto</div>
      <div class="row"><span>Sueldo ordinario</span><b>$3,000</b></div><div class="row"><span>Horas extra dobles (9 h)</span><b>$1,125</b></div><div class="row"><span>Horas extra triples (4 h)</span><b>$750</b></div><div class="row r"><span>"Bono de productividad"</span><b>$375</b></div><div class="row t"><span>Total</span><b>$5,250</b></div>
      <p>Esas 2 h eran horas triples disfrazadas.</p></div>
  </div>
  <div class="risk">${ic('warn', 34)}<div><b>Riesgo:</b> el registro electrónico no coincide con el CFDI, el bono no tiene materialidad y la autoridad puede reclasificarlo: riesgo laboral, de IMSS y fiscal.</div></div>
  ${escena({ skin: 3, hair: '#1B120C', shirt: NAVY, mood: 'smile', prop: 'clip' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['Las 2 horas que sobran', 'las ponemos como bono.'], ['¡No! Eso es simulación.', 'Si se trabajaron, se pagan', 'como horas extra.'], false)}
  <h4>Percepciones variables (CFDI clave 038 "Otros ingresos por salarios")</h4>
  ${tabla(['Concepto', 'Evidencia que debes tener', 'Riesgo'], [
    ['Bono de productividad', 'Política, indicadores, metas, cálculo y autorización', '<b class="r">Alto si solo existe el CFDI</b>'],
    ['Incentivo por ventas', 'Reporte de ventas, % pactado, cálculo y autorización', '<b class="g">Menor con trazabilidad</b>'],
    ['Bono por metas', 'Metas previas + evidencia de cumplimiento', '<b class="g">Menor</b>'],
    ['"Otros ingresos" sin descripción', 'Ninguna', '<b class="r">Muy alto</b>'],
    ['Pago fijo recurrente "bono"', 'Analizar su naturaleza salarial', '<b class="r">Muy alto</b>']], 'sm')}`));

/* 10 · Valor de la hora extra */
P.push(page(`${head('08', 'Costos', 'Cada año, la hora extra sale más cara')}
  <p class="p">El salario no baja, pero cubre menos horas. Si calculas la hora dividiendo el salario diario entre el promedio de horas diarias (tope semanal ÷ 6), con un salario de <b>$400</b> diarios:</p>
  ${tabla(['Año', 'Tope semanal', 'Hora simple', 'Hora doble', 'Hora triple'], [
    ['2026', '48 h', '$50.00', '$100.00', '$150.00'], ['2027', '46 h', '$52.22', '$104.44', '$156.66'], ['2028', '44 h', '$54.57', '$109.14', '$163.71'],
    ['2029', '42 h', '$57.14', '$114.29', '$171.43'], { cls: 'hl', c: ['2030', '40 h', '$59.97', '<b>$119.94</b>', '<b>$179.91</b>'] }], 'center')}
  <div class="bar2">${[100, 104.44, 109.14, 114.29, 119.94].map((v, i) => `<div><i style="height:${(v - 80) * 2.4}px"></i><b>$${v.toFixed(0)}</b><span>${2026 + i}</span></div>`).join('')}<p>Hora extra doble, salario $400</p></div>
  ${nota('<b>Importante:</b> es un método de cálculo, no una regla de la ley. Si en 2030 tu empresa trabaja 5 días de 8 h, tu contador puede usar otro divisor. Defínelo por escrito y aplícalo igual para todos.', 'warn')}
  <div class="hero2"><span class="hav">📈</span>
    <div><b>Con 50 colaboradores que sigan trabajando 48 h en 2027:</b><p>2 h dobles × $104.44 × 50 personas × 52 semanas ≈ <b>$543,000 al año</b> solo en horas extra. Medir hoy la jornada real es la forma más barata de evitarlo.</p></div></div>
  ${ctaCalc()}`));

/* 11 · Registro electrónico */
P.push(page(`${head('09', 'Nueva obligación', 'Registro electrónico de jornada', BLUE)}
  <div class="quote">"Registrar de manera electrónica la jornada laboral de cada persona trabajadora, incluyendo el horario de inicio y finalización; así como proporcionarlo a la autoridad cuando se le requiera." <span>— Art. 132, fracción XXXIV, LFT</span></div>
  <div class="grid4">
    ${[['📅', 'Desde 2027', 'Las reglas de la STPS (alcance y excepciones) entran en vigor el 1 de enero de 2027. La obligación ya está en la ley.'],
       ['🤝', 'Prueba plena', 'El registro hace prueba plena si se acredita que fue acordado entre la empresa y el trabajador.'],
       ['🛡️', 'Tu defensa', 'En una demanda por jornada u horas extra, la empresa es quien debe probar los horarios (arts. 784 y 804).'],
       ['🔍', 'Inspección', 'La STPS lo usará para verificar que se cumpla la jornada de 40 horas.']]
      .map(([e, t, d]) => `<div class="card"><span class="e">${e}</span><h3>${t}</h3><p>${d}</p></div>`).join('')}
  </div>
  <h4>¿Y si no cumplo? Multa del art. 994, fr. IV Bis</h4>
  <div class="fine"><div><small>MÍNIMA · 250 UMA</small><b>$29,327.50</b></div><div class="mx"><small>MÁXIMA · 5,000 UMA</small><b>$586,550</b></div></div>
  <p class="p xs">Importes con la UMA 2026. Además: demandas laborales que no puedes defender y cuestionamientos del SAT a la nómina.</p>
  <div class="hero2"><span class="hav r">⚠️</span>
    <div><b>"¿Y si no compro el checador?"</b><p>Con tarjetas de papel, Excel o mensajes sueltos no tienes un registro electrónico confiable, ni acordado, ni fácil de entregar a la autoridad. La pregunta ya no es si registrar, sino cómo hacerlo bien.</p></div></div>`));

/* 12 · 3 capas + obligaciones */
P.push(page(`${head('10', 'Cumplimiento', 'Las 3 capas que te protegen', BLUE)}
  <div class="layers">
    ${[['1', 'Aviso de privacidad', 'Informa qué datos personales se recaban y para qué. Su fundamento está en el art. 16 de la Constitución y el art. 15 de la ley de protección de datos personales, no en la LFT.', BLUE],
       ['2', 'Acuerdo del registro electrónico', 'Documento firmado donde trabajador y empresa conocen y aceptan el mecanismo de registro. Es lo que le da prueba plena.', GREEN],
       ['3', 'Registro electrónico', 'La evidencia diaria de entrada, salida, descansos, jornada y tiempo extra.', NAVY]]
      .map(([n, t, d, c]) => `<div style="border-left:8px solid ${c}"><b style="background:${c}">${n}</b><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}
  </div>
  <h4>Lo que debe cumplir tu sistema de registro</h4>
  <div class="two">
    ${chk(['Registra entradas, salidas, descansos y horas extra.', 'Identifica a la persona que checa (no "yo checo por él").', 'Guarda registros completos y en orden cronológico.', 'No permite cambios sin dejar rastro: quién, cuándo y por qué.'])}
    ${chk(['Conserva la información y tiene respaldos.', 'El trabajador puede consultar sus registros.', 'Emite reportes para inspecciones o controversias.', 'Si usa foto, GPS o biometría, se cubre con el aviso de privacidad.'])}
  </div>
  ${bienMal('Corregir una checada con justificación: se conserva el registro original, el cambio y quién lo autorizó.', 'Borrar o sobrescribir la checada original, o "acomodar" los horarios en Excel antes de la nómina.')}`));

/* 13 · Quién, directivos, olvidos */
P.push(page(`${head('11', 'Casos difíciles', '¿Quién debe registrarse y qué hago si no lo hace?')}
  <div class="two">
    <div class="card g">${ic('check', 30)}<h3>Sí deben registrarse</h3><p>Todo trabajador con jornada sujeta al control del patrón: operativos, administrativos, supervisores, gerentes, personal de confianza y directivos con contrato y horario.</p></div>
    <div class="card r">${ic('x', 30)}<h3>Generalmente no</h3><p>Socios, accionistas, administradores únicos, prestadores de servicios independientes y personas sin relación laboral subordinada.</p></div>
  </div>
  <p class="p xs">Es la interpretación más extendida; la STPS definirá el alcance y las excepciones en sus reglas.</p>
  <h4>"El director no quiere checar"</h4>
  <p class="p sm">Si tiene contrato y horario, está obligado. Sin su registro, una inspección puede multar a la empresa y, si un día demanda, la empresa no tendrá con qué probar su horario. Explícale que el registro <b>protege a la empresa</b>, no es desconfianza.</p>
  ${escena({ skin: 1, hair: '#24170F', shirt: '#FFFFFF', tie: true, mood: 'neutral' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['Yo soy director,', 'yo no checo.'], ['Con contrato y horario', 'estás obligado. Te protege', 'a ti y a la empresa.'])}
  <h4>"Siempre se le olvida checar"</h4>
  ${bienMal('Formato de "justificación de incidencia" firmado por el trabajador y su jefe, el mismo día. La nómina queda respaldada.', 'Dejar el hueco en blanco, llenarlo a mano sin respaldo o descontar el día aunque sí trabajó.')}
  <h4>Plan para blindar a la empresa</h4>
  ${box(['<b>Reglamento interior:</b> registro obligatorio para todos los niveles, qué hacer si se olvida (ej. avisar a RRHH en los primeros 30 min) y consecuencias de la reincidencia (las suspensiones sin goce son de máximo 8 días, art. 423).', '<b>Contratos:</b> cláusula de obligación de usar el sistema de control de asistencia.', '<b>Bitácora:</b> toda corrección con evidencia y firma.'])}`));

/* 14 · Registro ↔ CFDI */
P.push(page(`${head('12', 'Nómina', 'Que tu registro y tu CFDI digan lo mismo', BLUE)}
  <p class="p">El SAT, el IMSS y la STPS pueden cruzar información. Lo que dice el checador tiene que verse en el complemento de nómina:</p>
  ${tabla(['Dato del registro', 'En el CFDI de nómina', 'Debe coincidir así'], [
    ['Días trabajados', 'NumDiasPagados', 'Si faltó 2 días sin justificar, los días pagados bajan'],
    ['Faltas', 'Deducción 020 (ausencia)', 'Lo que el registro marca como falta se descuenta aquí'],
    ['Incapacidades', 'Nodo Incapacidad (01, 02, 03)', 'Los mismos días que el registro'],
    ['Vacaciones', 'Percepción 001 o según política', 'Sin checadas en días de vacaciones'],
    ['Horas extra dobles', 'Percepción 019 · TipoHoras 01', 'Hasta 4 h/día, 4 días, tope semanal del año'],
    ['Horas extra triples', 'Percepción 019 · TipoHoras 02', 'Lo que excede el art. 66, máx. 4 h/semana']], 'sm')}
  <h4>La trampa del turno de 12 horas</h4>
  <div class="two">
    <div class="card">${ic('warn', 30)}<h3>El SAT acepta "Otra jornada"</h3><p>El catálogo c_TipoJornada incluye "por turnos" u "otra jornada" (99). Que el CFDI se timbre no vuelve legal un turno de 12×12: la LFT solo tiene diurna, nocturna y mixta.</p></div>
    <div class="card r">${ic('x', 30)}<h3>Biométrico vs. CFDI</h3><p>Si el registro dice 08:00 a 20:00 y el CFDI no trae horas extra, hay omisión de pago, posible impacto en ISR e IMSS y violación de los topes.</p></div>
  </div>
  ${escena({ skin: 3, hair: '#1B120C', shirt: NAVY, mood: 'smile', prop: 'clip' }, { skin: 0, hair: '#5A3A22', shirt: GREEN, long: true, mood: 'smile' }, ['El turno de 12×12 lo', 'timbramos como "otra jornada".'], ['El SAT lo timbra, pero la', 'LFT no lo permite: hay que', 'pagar y registrar horas extra.'], false)}
  ${nota('<b>Dato IMSS:</b> las horas extra dentro de los márgenes de la LFT no integran al salario base de cotización; las que los exceden sí (art. 27 LSS). Por eso pasarse de los topes también cuesta en cuotas.', 'blue')}`));

/* 15 · Riesgos */
P.push(page(`${head('13', 'Riesgos', 'Lo que cuesta implementarlo mal', RED)}
  <div class="three">
    <div class="rk"><h3>⚖️ Laborales</h3>${chk(['Horas extra constantes por mantener la misma carga con menos horas.', 'Simular horarios (registrar 40 h y trabajar 48): nulidad de registros y posibles sanciones.', 'Sin registro: no puedes acreditar los horarios reales.', 'Inspecciones y multas de la STPS.'], 'x')}</div>
    <div class="rk"><h3>🏥 IMSS</h3>${chk(['Integración incorrecta de horas extra al SBC (art. 27 LSS).', 'Diferencias en cuotas, capitales constitutivos, recargos.', 'No avisar cambios de salario por nuevos turnos (art. 15 fr. I LSS).'], 'x')}</div>
    <div class="rk"><h3>🧾 SAT</h3>${chk(['Horas extra timbradas sin evidencia de asistencia: requerimientos y cartas invitación.', 'Perder la deducción de la nómina sin materialidad (art. 27 fr. V LISR; 29 y 29-A CFF).', 'Cruces CFDI-IMSS-registro: presunción de simulación.'], 'x')}</div>
  </div>
  <h4>Ejemplo real de incumplimiento que el registro va a evidenciar</h4>
  ${tabla(['Día', 'Entrada', 'Salida', 'Total', 'Extra', 'Problema'], [
    ['Lunes', '08:00', '21:00', '13 h', '5 h', '<b class="r">Pasa de 12 h y de 4 h extra</b>'], ['Miércoles', '08:00', '21:00', '13 h', '5 h', '<b class="r">Pasa de 12 h y de 4 h extra</b>'],
    ['Viernes', '08:00', '21:00', '13 h', '5 h', '<b class="r">Pasa de 12 h y de 4 h extra</b>'], { cls: 'hl', c: ['<b>Semana</b>', '', '', '', '<b>15 h</b>', '<b class="r">6 h triples (máx. 4)</b>'] }], 'center sm')}
  ${bienMal('Mismas horas de trabajo, mejor repartidas: lunes a jueves 2 h extra = 8 h dobles, dentro de todos los topes.', 'Concentrar las horas extra en pocos días largos. El checador lo deja todo a la vista.')}`));

/* 16 · Errores comunes */
const errores = [
  ['Seguir con la regla de "3 horas, 3 veces"', 'Ya no existe: ahora son hasta 4 h al día en máx. 4 días, con tope semanal de 9 a 12 h.'],
  ['Pagar triples sin tope', 'Solo pueden ser 4 h a la semana. Más allá, no deben trabajarse.'],
  ['Días de más de 12 horas', 'Jornada + extra nunca pasa de 12 h al día, aunque se paguen.'],
  ['Horas extra a menores de 18', 'Prohibidas, sin excepción.'],
  ['Revisar solo el total semanal', 'Desde el 1 de mayo de 2026 se revisa también la jornada diaria.'],
  ['Clasificar mal el turno', '"Vespertina" no existe: es diurna o mixta. Con 3.5 h nocturnas o más, es nocturna.'],
  ['Bajar el sueldo "proporcional"', 'La reducción nunca implica bajar sueldos, salarios ni prestaciones.'],
  ['Disfrazar horas extra como bono', 'Sin materialidad, la autoridad puede reclasificarlo.'],
  ['Registrar 40 h y trabajar 48', 'Simulación de horarios: nulidad de registros y sanciones.'],
  ['No firmar el acuerdo del registro', 'Sin acuerdo, el registro pierde su fuerza de prueba plena.'],
  ['Corregir checadas borrando el original', 'Toda corrección debe dejar rastro y justificación.'],
  ['Esperar a 2030 para actuar', 'El registro y los topes de horas extra ya aplican; la jornada baja desde 2027.'],
];
P.push(page(`${head('14', 'Errores comunes', '12 errores de RRHH que te pueden costar caro', RED)}
  <div class="errs">${errores.map(([e, f], i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><div><b>${ic('x', 18)} ${e}</b><p>${ic('check', 18)} ${f}</p></div></div>`).join('')}</div>`));

/* 17 · Autodiagnóstico */
const preguntas = ['¿Sabes cuántas horas trabaja realmente cada puesto, por día y por semana?', '¿Tu sistema registra entrada, salida y descansos de cada persona?', '¿Detecta en automático cuando alguien pasa de 4 h extra en un día o de 12 h totales?', '¿Separa horas extra dobles y triples según los topes del año?', '¿Tienes firmado el acuerdo del registro electrónico con cada trabajador?', '¿Tienes aviso de privacidad si usas foto, GPS o biometría?', '¿Las correcciones de checadas dejan rastro y justificación?', '¿Tu registro coincide con días pagados, faltas, incapacidades y horas extra del CFDI?', '¿Puedes entregar un reporte de jornada a la autoridad hoy mismo?', '¿Tienes un plan de turnos para la jornada de 46 h de 2027?'];
P.push(page(`${head('15', 'Autodiagnóstico', '¿Tu empresa está lista? Responde en 3 minutos')}
  <div class="quiz">${preguntas.map((q, i) => `<div><span>${i + 1}</span><p>${q}</p><em><i class="bx"></i>Sí</em><em><i class="bx"></i>No</em></div>`).join('')}</div>
  <div class="score">
    <div style="background:${GREEN}"><b>9-10 "Sí"</b><p>Vas muy bien. Mantén el control mes a mes.</p></div>
    <div style="background:#F5A300"><b>6-8 "Sí"</b><p>Tienes huecos que pueden salir caros en una inspección.</p></div>
    <div style="background:${RED}"><b>0-5 "Sí"</b><p>Tu empresa está expuesta. Empieza por el registro electrónico.</p></div>
  </div>
  ${cta('¿Respondiste "No" a 3 o más? CheckONOFF te ayuda a resolverlas')}`));

/* 18 · Plan año por año */
const yrs = [['Ahora · resto de 2026', ['Medir la jornada real por puesto durante 4 semanas.', 'Implementar el registro electrónico y firmar los acuerdos y el aviso de privacidad.', 'Ajustar ya las horas extra: 4 h/día, 4 días, 9 dobles, 4 triples, 12 h/día.', 'Actualizar contratos, reglamento interior y política de horas extra.']],
  ['2027 · 46 h', ['Aplicar los nuevos horarios (diurna) y avisar por escrito.', 'Aplicar las reglas de la STPS del registro electrónico.', 'Conciliar cada nómina: registro vs. CFDI.']],
  ['2028 · 44 h', ['Ajustar turnos; la mixta también baja. Horas dobles: hasta 10.', 'Capacitar en polivalencia a las áreas críticas.']],
  ['2029 · 42 h', ['Evaluar contrataciones y automatizar tareas. Dobles: hasta 11.']],
  ['2030 · 40 h', ['Esquema final para todas las jornadas (incluida la nocturna). Dobles: hasta 12.', 'Auditar registros, políticas y nómina.']]];
P.push(page(`${head('16', 'Plan', 'Tu plan de implementación año por año')}
  <div class="tl">${yrs.map(([t, it], i) => `<div class="ty"><div class="dot" style="background:${[RED, GREEN, GREEN, BLUE, NAVY][i]}"></div><div><h3>${t}</h3>${box(it)}</div></div>`).join('')}</div>
  <h4>Plantilla rápida de diagnóstico</h4>
  ${tabla(['Puesto / área', 'Turno', 'Personas', 'Horas reales/sem', 'Extra/sem', '¿Días de +12 h?'], Array.from({ length: 5 }, () => ['', '', '', '', '', '']), 'tpl')}
  <a class="tool" href="${CALC_VAC}"><span>🧮</span><div><b>Herramienta gratis: calculadora de vacaciones y prima vacacional</b><small>Días según el art. 76 de la LFT y cuánto pagar. Toca aquí →</small></div></a>`));

/* 19 · CheckONOFF */
const feats = [['📲', 'Checa como prefieras', 'App Android/iOS con geocercas y foto, tu checador biométrico actual o el bot de WhatsApp.'],
  ['📶', 'Funciona sin internet', 'La app guarda el registro y lo sincroniza al recuperar señal.'],
  ['🚨', 'Avisos de topes de la LFT', 'Te avisa cuando un turno rebasa los límites de jornada y horas extra.'],
  ['📊', 'Pre-nómina automática', 'Horas, tiempo extra, bonos y descuentos; exporta a Excel.'],
  ['🏖️', 'Vacaciones LFT', 'Saldo por antigüedad acreditado en automático, con aprobación del supervisor.'],
  ['🗂️', 'Expedientes digitales', 'IMSS, incapacidades, contratos y actas administrativas en un solo lugar.']];
P.push(page(`<div class="top">${brand()}<div class="pill" style="background:${GREEN}">La solución</div></div>
  <h2>Cumple la reforma sin complicarte: <span class="g">CheckONOFF</span></h2>
  <div class="prod">
    <div>${svg(240, 320, `${celular(40, 10, 1.05)}`)}</div>
    <div class="feats">${feats.map(([e, t, d]) => `<div><span>${e}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
  </div>
  ${tabla(['La reforma te pide…', 'CheckONOFF te ayuda con…'], [
    ['Registro electrónico de inicio y fin de jornada', 'Checadas por app con geocerca y foto, biométrico conectado a la nube o WhatsApp'],
    ['No rebasar los topes de jornada y horas extra', 'Avisos cuando un turno rebasa los límites y cálculo automático del tiempo extra'],
    ['Separar horas dobles y triples', 'Pre-nómina con dobles y triples separadas'],
    ['Evidencia para inspecciones y demandas', 'Historial por colaborador y sucursal, listo para consultar'],
    ['Que el registro coincida con la nómina', 'Faltas, retardos, permisos y vacaciones en un solo lugar']], 'sm')}
  <div class="price">${[['Esencial', '$39', 'Mín. 13 colaboradores · checador offline, GPS, biométrico, WhatsApp, vacaciones LFT'], ['Profesional', '$59', 'Mín. 9 · reportes avanzados, guardias y coberturas, multi-sucursal sin límite'], ['Corporativo', '$89', 'Mín. 6 · soporte prioritario, multi-coordinador sin límite']].map(([n, p, d]) => `<div><small>${n}</small><b>${p}</b><span>MXN por colaborador al mes + IVA</span><p>${d}</p></div>`).join('')}</div>
  ${cta('Pruébalo 14 días gratis, sin tarjeta')}`));

/* 20 · Contraportada QR */
P.push(page(`
  <div class="cv-logo"><img src="${LOGOF}"></div>
  <div class="cv-tag">SIGUIENTE PASO</div>
  <h1 style="font-size:42px">Con menos horas, <span>cada minuto tiene que quedar registrado.</span></h1>
  <p class="lead">Empieza hoy: prueba CheckONOFF 14 días gratis y sin tarjeta, únete a la comunidad de RRHH o pregúntale a un asesor cómo conectar tu checador actual.</p>
  <div class="qrs">
    <a href="${REG}"><img src="${QRWEB}"><b>Prueba 14 días gratis</b><span>Sin tarjeta · app.checkonoff.mx</span></a>
    <a href="${WA_LINK}"><img src="${QRWA}"><b>Comunidad RRHH</b><span>Grupo de WhatsApp: clases y plantillas</span></a>
    <a href="${ASESOR}"><img src="${QRASE}"><b>Habla con un asesor</b><span>WhatsApp +52 333 021 3199</span></a>
  </div>
  <div class="cv-photo back" style="background-image:url(${PH_BACK})"><div class="cv-badge"><span style="font-size:30px">📲</span><div><b>Tu equipo checa desde el celular</b><span>App, WhatsApp o tu biométrico · hora, GPS y foto</span></div></div></div>
  <div class="cv-foot">Escanea los códigos con la cámara de tu celular · Guía informativa, no sustituye asesoría legal o contable.</div>`, 'cover', false));

const CSS = `${FONTS}@page{size:Letter;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'IT',sans-serif;color:${NAVY};-webkit-font-smoothing:antialiased;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
.pg{width:8.5in;height:11in;padding:.55in .62in .8in;position:relative;overflow:hidden;page-break-after:always;background:#fff}
.cover{background:radial-gradient(ellipse 85% 40% at 85% 105%,rgba(52,182,20,.5),transparent 65%),radial-gradient(ellipse 70% 40% at 0% 0%,rgba(10,78,148,.55),transparent 70%),${NAVY};color:#fff;padding-top:.5in}
.cv-logo{display:inline-block;background:#fff;border-radius:22px;padding:10px 16px}.cv-logo img{height:1.05in;display:block}
.cv-tag{display:inline-block;margin-top:26px;background:${GREEN};font-weight:800;font-size:12px;letter-spacing:2.5px;padding:8px 16px;border-radius:99px}
h1{font-size:46px;line-height:1.04;letter-spacing:-.045em;font-weight:800;margin-top:16px}h1 span{color:${LIME}}
.lead{font-size:16px;line-height:1.5;color:#D4DCEA;margin-top:14px;max-width:6.6in}
.cv-art{margin-top:6px}.cv-art2{margin-top:18px;display:flex;justify-content:center}
.cv-steps{display:flex;gap:8px;margin-top:14px}.cv-steps div{flex:1;border:1px solid rgba(255,255,255,.22);border-radius:12px;padding:10px 6px;text-align:center}.cv-steps b{display:block;font-size:22px}.cv-steps span{font-size:11px;color:${LIME};font-weight:700}.cv-steps .last{background:${GREEN};border-color:${GREEN}}.cv-steps .last span{color:${NAVY}}
.cv-foot{position:absolute;bottom:.45in;left:.62in;right:.62in;font-size:11px;color:#9FB0CC}
.top{display:flex;justify-content:space-between;align-items:center}
.brand{display:flex;align-items:center;gap:8px;font-weight:800;font-size:14px}.brand img{height:30px}
.pill{color:#fff;font-weight:800;font-size:11px;letter-spacing:1.8px;text-transform:uppercase;padding:7px 14px;border-radius:99px}
h2{font-size:30px;letter-spacing:-.035em;line-height:1.1;font-weight:800;margin-top:18px}
h3{font-size:14.5px;font-weight:800;margin-top:4px}
h4{font-size:14.5px;font-weight:800;margin-top:18px;display:flex;align-items:center;gap:8px}
.g{color:${GREEN}}.r{color:${RED}}
.p{font-size:14px;line-height:1.55;color:#2E3A55;margin-top:12px}.p.sm{font-size:12.5px;margin-top:6px}.p.xs{font-size:11px;color:#6B7690;margin-top:6px}
.note{margin-top:12px;background:${LIGHT};border-left:5px solid ${GREEN};border-radius:0 10px 10px 0;padding:10px 14px;font-size:12px;line-height:1.5;color:#2E3A55}
.note.warn{background:#FDECEC;border-left-color:${RED}}.note.blue{background:#E8F0FA;border-left-color:${BLUE}}
.tb{width:100%;border-collapse:separate;border-spacing:0;margin-top:12px;font-size:12.5px;border:1px solid #DCE3EE;border-radius:10px;overflow:hidden}
.tb th{background:${BLUE};color:#fff;text-align:left;padding:8px 10px;font-weight:700;font-size:11.5px}
.tb td{padding:8px 10px;border-top:1px solid #E6EBF3;line-height:1.35}.tb tr:nth-child(odd) td{background:#FAFCFE}
.tb tr.hl td{background:#EAF7E4}.tb.center td,.tb.center th{text-align:center}.tb.sm td{font-size:11.2px;padding:6px 9px}.tb.tpl td{height:.36in}
.kpis{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:16px}
.kpi{background:${LIGHT};border-radius:12px;padding:14px}.kpi b{font-size:30px;letter-spacing:-.03em;font-weight:800}.kpi p{font-size:12px;line-height:1.45;margin-top:4px;color:#2E3A55}
.hero2{display:flex;align-items:center;gap:16px;margin-top:16px;background:linear-gradient(120deg,#EAF7E4,#E8F0FA);border-radius:16px;padding:16px 20px}
.hero2 b{font-size:15px;line-height:1.35}.hero2 p{font-size:12.5px;line-height:1.5;margin-top:6px;color:#2E3A55}
.jt{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:16px}
.jt div{border:2px solid;border-radius:14px;padding:14px;text-align:center}.jt .e{font-size:30px}.jt b{display:block;font-size:18px;margin-top:4px}.jt small{display:block;font-size:11.5px;color:#4A5670;margin-top:4px;min-height:30px}
.jt em{display:inline-block;margin-top:8px;font-style:normal;color:#fff;font-weight:800;font-size:13px;padding:5px 12px;border-radius:99px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:4px}.three{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px}
.card{background:${LIGHT};border-radius:12px;padding:14px;margin-top:10px}.card.g{background:#EAF7E4}.card.r{background:#FDECEC}.card p{font-size:12px;line-height:1.45;margin-top:4px;color:#2E3A55}.card .e{font-size:24px}
.bm{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px}
.bm>div{border-radius:14px;padding:14px;position:relative}.bm .b{background:#EAF7E4;border:2px solid ${GREEN}}.bm .m{background:#FDECEC;border:2px solid ${RED}}
.bm svg{position:absolute;top:-12px;right:12px}.bm>div>b{font-size:12px;letter-spacing:2px}.bm .b>b{color:#1F7A0E}.bm .m>b{color:${RED}}.bm p{font-size:12px;line-height:1.45;margin-top:6px}
.chk{list-style:none;margin-top:6px}.chk li{display:flex;gap:8px;align-items:flex-start;font-size:12px;line-height:1.4;padding:4px 0}.chk svg{flex:none;margin-top:1px}
.box{list-style:none;margin-top:4px}.box li{display:flex;gap:9px;font-size:12px;line-height:1.42;padding:4px 0}.box span{flex:none;width:14px;height:14px;border:2px solid ${GREEN};border-radius:4px;margin-top:2px}
.rules{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}.rules>div{display:flex;gap:10px;background:${LIGHT};border-radius:12px;padding:12px}
.rules i{font-style:normal;font-weight:800;flex:none;width:28px;height:28px;border-radius:50%;background:${BLUE};color:#fff;display:grid;place-items:center;font-size:14px}.rules p{font-size:12px;line-height:1.45}
.vs{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px}.vs>div{border-radius:14px;padding:12px}.vs .old{background:#FFF4E6}.vs .new{background:#EAF7E4}
.vh{display:flex;align-items:center;gap:6px}.vh small{display:block;font-size:10px;font-weight:800;letter-spacing:1.5px;color:#4A5670}.vh b{font-size:17px}.sm2{font-size:11px;margin-top:6px;color:#4A5670;line-height:1.4}
.ctab.calc{background:${BLUE}}
.ctab{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:16px;background:${NAVY};color:#fff;border-radius:16px;padding:14px 18px}
.ctab b{display:block;font-size:15px}.ctab span{font-size:11.5px;color:#C5CCDA}.ctab img{width:74px;height:74px;background:#fff;border-radius:8px;padding:4px}
.rcpt{border-radius:14px;padding:14px;margin-top:12px;border:2px solid}.rcpt.ok{border-color:${GREEN};background:#F4FBF1}.rcpt.bad{border-color:${RED};background:#FFF6F6}
.rh{display:flex;align-items:center;gap:8px;font-weight:800;font-size:12.5px;margin-bottom:8px}
.rcpt .row{display:flex;justify-content:space-between;font-size:12px;padding:5px 0;border-bottom:1px dashed #C9D2E0}.rcpt .row.r{color:${RED};font-weight:700}.rcpt .row.t{border:0;font-size:14px;font-weight:800}
.rcpt p{font-size:11px;margin-top:6px;color:#4A5670}
.risk{display:flex;gap:12px;align-items:center;margin-top:14px;background:#FFF4E6;border:2px solid #F5A300;border-radius:14px;padding:12px 16px;font-size:12.5px;line-height:1.45}
.bar2{display:flex;align-items:flex-end;gap:16px;margin-top:16px;padding:12px 16px 8px;background:${LIGHT};border-radius:14px;position:relative}
.bar2>div{flex:1;text-align:center}.bar2 i{display:block;background:linear-gradient(${GREEN},${BLUE});border-radius:8px 8px 0 0}.bar2 b{display:block;font-size:13px;margin-top:4px}.bar2 span{font-size:11px;color:#4A5670}
.bar2 p{position:absolute;top:10px;left:16px;font-size:11px;font-weight:700;color:#4A5670}
.quote{margin-top:14px;background:${BLUE};color:#fff;border-radius:16px;padding:18px 20px;font-size:15px;line-height:1.5;font-weight:600}.quote span{display:block;font-size:11.5px;margin-top:8px;color:#BFD3EE;font-weight:500}
.grid4{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
.fine{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:10px}.fine div{border-radius:14px;padding:14px 18px;background:#FDECEC}.fine .mx{background:${RED};color:#fff}
.fine small{display:block;font-size:11px;font-weight:800;letter-spacing:1.5px}.fine b{font-size:30px;letter-spacing:-.03em}
.layers>div{display:flex;gap:14px;align-items:flex-start;background:${LIGHT};border-radius:12px;padding:14px;margin-top:10px}
.layers b{flex:none;width:34px;height:34px;border-radius:50%;color:#fff;display:grid;place-items:center;font-size:16px}.layers p{font-size:12px;line-height:1.45;margin-top:3px;color:#2E3A55}
.rk{background:#FFF6F6;border-radius:12px;padding:12px}.rk h3{margin-bottom:4px}
.errs{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:14px}
.errs>div{display:flex;gap:10px;background:${LIGHT};border-radius:12px;padding:13px}.errs>div>span{flex:none;font-size:20px;font-weight:800;color:${RED};width:30px}
.errs b{display:flex;gap:6px;align-items:center;font-size:12.5px}.errs p{display:flex;gap:6px;align-items:flex-start;font-size:12px;line-height:1.4;margin-top:5px;color:#2E3A55}.errs svg{flex:none}
.quiz>div{display:flex;align-items:center;gap:10px;border-bottom:1px solid #E6EBF3;padding:11px 0}.quiz span{flex:none;width:24px;height:24px;border-radius:50%;background:${BLUE};color:#fff;font-size:12px;font-weight:800;display:grid;place-items:center}
.quiz p{flex:1;font-size:13.5px;line-height:1.35}.quiz em{font-style:normal;font-size:12px;font-weight:700;width:46px}
.score{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px}.score div{color:#fff;border-radius:12px;padding:12px}.score b{font-size:15px}.score p{font-size:11.5px;margin-top:4px;line-height:1.4}
.tl{margin-top:10px}.ty{display:flex;gap:14px;padding:6px 0}.ty .dot{flex:none;width:16px;height:16px;border-radius:50%;margin-top:4px}
.prod{display:grid;grid-template-columns:240px 1fr;gap:10px;align-items:center;margin-top:6px}
.feats{display:grid;grid-template-columns:1fr 1fr;gap:9px}.feats>div{display:flex;gap:8px;background:${LIGHT};border-radius:12px;padding:10px}.feats span{font-size:20px}.feats b{font-size:12.5px}.feats p{font-size:11px;line-height:1.4;margin-top:2px;color:#2E3A55}
.price{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px}.price div{border:2px solid ${GREEN};border-radius:14px;padding:10px;text-align:center}.price small{font-size:11px;font-weight:700;color:#4A5670}.price b{display:block;font-size:28px;color:${GREEN}}.price span{font-size:10.5px;color:#4A5670}.price p{font-size:10.5px;line-height:1.35;margin-top:6px;color:#2E3A55}
.qrs{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:22px}.qrs a{background:#fff;color:${NAVY};border-radius:20px;padding:18px;text-align:center}
.qrs img{width:1.6in;height:1.6in}.qrs b{display:block;font-size:16px;margin-top:6px}.qrs span{font-size:11.5px;color:#4A5670}
.scene{margin-top:14px}.scene svg{width:100%;height:auto;display:block}
.tool{display:flex;gap:12px;align-items:center;margin-top:12px;background:${BLUE};color:#fff;border-radius:14px;padding:10px 16px}.tool span{font-size:26px}.tool b{font-size:13px;display:block}.tool small{font-size:11px;color:#BFD3EE}
.cv-photo{position:relative;margin-top:20px;height:3.3in;border-radius:22px;background-size:cover;background-position:center}.cv-photo.back{height:2.7in;margin-top:22px}
.cv-badge{position:absolute;left:18px;bottom:18px;display:flex;align-items:center;gap:12px;background:#fff;color:${NAVY};border-radius:16px;padding:10px 16px 10px 10px}.cv-badge b{display:block;font-size:15px}.cv-badge span{font-size:11.5px;color:#4A5670}
.qrs img{image-rendering:pixelated}.ctab img{image-rendering:pixelated}
.chat{margin-top:14px;border-radius:16px;padding:14px 16px;background:#EEF3F9}.chat.ok{background:#EAF7E4}
.msg{display:flex;gap:10px;align-items:flex-end;margin:6px 0}.msg.r{justify-content:flex-end}
.msg p{max-width:72%;font-size:12.5px;line-height:1.45;padding:10px 14px;border-radius:14px;background:#fff;color:${NAVY}}.msg.l p{border-bottom-left-radius:4px}
.msg.r p{background:${BLUE};color:#fff;border-bottom-right-radius:4px;font-weight:600}.chat.ok .msg.r p{background:${GREEN}}
.av{flex:none;width:34px;height:34px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:18px}
.hav{flex:none;width:64px;height:64px;border-radius:18px;background:#fff;display:grid;place-items:center;font-size:32px}.hav.r{background:#FDECEC}.hav.o{background:#FFF1DB}
.bx{display:inline-block;width:12px;height:12px;border:2px solid ${BLUE};border-radius:3px;margin-right:5px;vertical-align:-1px}
.vh .hav{width:46px;height:46px;font-size:22px;border-radius:12px;margin-right:6px}
.foot{position:absolute;left:.62in;right:.62in;bottom:.4in;display:flex;justify-content:space-between;font-size:9.5px;color:#8A93A8;border-top:1px solid #E6EBF3;padding-top:8px}`;

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><title>Guía RRHH · Jornada de 40 horas · CheckONOFF</title><style>${CSS}</style></head><body>${P.join('')}</body></html>`);
  await p.waitForTimeout(500);
  const out = process.argv[2] || path.join(__dirname, 'guia-40-horas-checkonoff.pdf');
  await p.pdf({ path: out, format: 'Letter', printBackground: true, preferCSSPageSize: true });
  await b.close(); console.log('ok', P.length, 'páginas');
})();
