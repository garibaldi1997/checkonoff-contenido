// Serie "Rumbo a las 46 horas" (estándar premium aprobado)
const { b64, FOTO, C, ast, bb, logo, ph, G, GD, render } = require('./premium_base');
const QRCALC = b64('qr_calc.png', 'image/png'), QRREG = b64('qr_registro.png', 'image/png');
const S = [];
const add = (n, html) => S.push([n, html]);
const H = (t, top, size = 80) => `<div style="position:absolute;left:72px;right:72px;top:${top}px;font-size:${size}px;font-weight:800;letter-spacing:-.025em;line-height:1.05">${t}</div>`;
const K = (t, top, col = C.g) => `<div style="position:absolute;left:72px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${col}">${t}</div>`;
const card = (inner, cls = 'w', extra = '') => `<div class="${cls}" style="border-radius:30px;padding:30px 34px;box-shadow:0 12px 30px rgba(17,28,59,.12);${extra}">${inner}</div>`;
const pill = (t, bg = C.navy) => `<div style="position:absolute;left:72px;bottom:150px;background:${bg};color:#fff;font-size:34px;font-weight:700;padding:22px 36px;border-radius:99px">${t}</div>`;
const dias = (hs, hi) => `<div style="display:flex;gap:12px">${['L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => `<div style="flex:1;text-align:center;border-radius:22px;padding:18px 0;background:${hi && hi.includes(i) ? C.navy : '#fff'};color:${hi && hi.includes(i) ? '#fff' : C.navy};box-shadow:0 8px 20px rgba(17,28,59,.1)"><div style="font-size:26px;font-weight:700;opacity:.6">${d}</div><div style="font-size:40px;font-weight:800;letter-spacing:-.02em;margin-top:4px">${hs[i]}</div></div>`).join('')}</div>`;
const total = (t, ok = true) => `<div style="margin-top:22px;display:flex;justify-content:space-between;align-items:center;font-size:34px;font-weight:700"><span>Total semanal</span><span style="background:${ok ? C.mint : '#FDE1E1'};color:${ok ? '#1F7A0E' : C.r};padding:12px 26px;border-radius:99px">${t}</span></div>`;
const BG = `<div style="position:absolute;inset:0;background:linear-gradient(170deg,#F7F9FB 0%,#E9EEF3 100%)"></div>`;

// ── POST: ¿Me van a bajar el sueldo? ──
add('s46_01', `<div style="position:absolute;inset:0;background:rgb(197,197,189)"></div>${ph('mx_piensa', 230, 'width:1180px;left:-20px')}
<div style="position:absolute;left:0;right:0;top:200px;height:120px;background:linear-gradient(180deg,rgb(197,197,189),rgba(197,197,189,0))"></div>
<div class="box n" style="top:60px;font-size:58px">¿Me van a bajar el sueldo por trabajar ${G('menos horas')}?</div>
${ast(70, 420, .7)}
${bb(40, 860, 'm l', '<span style="font-size:48px;font-weight:800">No.</span><br>La ley lo prohíbe.')}
${bb(40, 1060, 'n l', 'Sin reducción de sueldos<br>ni prestaciones.')}
<div style="position:absolute;left:44px;bottom:60px;font-size:22px;font-weight:600;color:${C.navy};opacity:.75">Transitorio 7º · Reforma LFT, DOF 01/05/2026</div>
${logo}`);

// ── CARRUSEL: Lo que cambia y lo que no en 2027 ──
add('c46_01', `${ph('mx_duda', -40)}
${bb(40, 120, 'n l', '48 h → <span style="color:#7DD818">46 h</span>')}
${bb(640, 210, 'm r', '¿Y las horas<br>extra?', 'r')}
${bb(40, 300, 'w l', '¿Y mi turno<br>nocturno?')}
${ast(930, 470, .7)}
<div class="box n" style="bottom:140px;font-size:58px">1 de enero de 2027: la jornada baja a ${G('46 horas.')}<br><span style="font-size:40px;font-weight:600;opacity:.85">Lo que cambia y lo que no 👉</span></div>
${logo}`);
add('c46_02', `${BG}${K('Lo que sí cambia', 170)}${H(`Tu semana tiene<br>${GD('2 horas menos.')}`, 220, 88)}
<div style="position:absolute;left:72px;right:72px;top:530px;display:flex;flex-direction:column;gap:30px">
${card(`<div style="display:flex;align-items:center;gap:30px"><div style="font-size:110px;font-weight:800;letter-spacing:-.04em;color:${C.b}">48<span style="color:${C.navy};opacity:.35"> → </span><span style="color:${C.g}">46</span></div><div style="font-size:32px;font-weight:600;line-height:1.25">horas máximas<br>a la semana<br><span style="opacity:.55;font-size:26px">Art. 59 LFT</span></div></div>`)}
${card(`<div style="font-size:26px;font-weight:700;letter-spacing:.12em;color:${C.lime}">TAMBIÉN EL 1 DE ENERO</div><div style="font-size:44px;font-weight:700;line-height:1.2;margin-top:10px">Entran en vigor las reglas de la STPS para el <span style="color:${C.lime}">registro electrónico</span> de la jornada.</div><div style="font-size:26px;opacity:.65;margin-top:12px">Art. 132 fr. XXXIV · Transitorio 5º</div>`, 'n')}
</div>${logo}`);
add('c46_03', `${BG}${K('Lo que NO cambia', 150, C.b)}${H('Ojo: no todo<br>baja en 2027.', 200, 88)}
<div style="position:absolute;left:72px;right:72px;top:500px;display:grid;grid-template-columns:1fr 1fr;gap:20px">
${[['8 · 7 · 7.5 h', 'Máximo diario:<br>diurna · nocturna · mixta'], ['45 h', 'Jornada mixta<br>(baja hasta 2028)'], ['42 h', 'Jornada nocturna<br>(baja hasta 2030)'], ['9 h', 'Extra dobles<br>por semana']].map(([a, t]) => card(`<div style="font-size:${a.length > 6 ? 52 : 72}px;font-weight:800;letter-spacing:-.03em;color:${C.b}">${a}</div><div style="font-size:28px;font-weight:600;line-height:1.25;margin-top:8px">${t}</div>`)).join('')}
${card(`<div style="font-size:38px;font-weight:700;line-height:1.25">💰 Tu sueldo y prestaciones: <span style="color:${C.lime}">no pueden bajar.</span><div style="font-size:26px;font-weight:500;opacity:.7;margin-top:8px">Triples: tope de 4 h a la semana · nunca más de 12 h en un día</div></div>`, 'n', 'grid-column:1/3')}
</div>${logo}`);
add('c46_04', `${ph('mx_hombre_piensa', -60)}
${bb(40, 150, 'w l', 'Hora más cara =<br>extra más cara 💸')}
${bb(40, 350, 'm l', 'Y en 2027 las extras<br>siguen topadas en 9 h')}
${ast(70, 560, .6)}
<div class="box n" style="bottom:140px;font-size:56px;text-align:left">El mismo sueldo ahora<br>paga ${G('menos horas.')}<div style="font-size:32px;font-weight:500;margin-top:16px;opacity:.85">Cada minuto sin controlar te cuesta más.</div></div>
${logo}`);
add('c46_05', `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#F4FBF0 0%,#DDF4D2 100%)"></div>
${ast(880, 120, 1.3)}
${H(`Calcula tus horas<br>extra de 2027<br>${GD('gratis.')}`, 260, 100)}
<div style="position:absolute;left:72px;top:690px;font-size:36px;font-weight:500;line-height:1.35;width:850px;opacity:.85">Pon tu turno y te dice cuántas son dobles, cuántas triples y si te pasas de la ley.</div>
<div style="position:absolute;left:72px;top:900px;display:flex;gap:36px;align-items:center">
  <div style="background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 34px rgba(17,28,59,.12)"><img src="${QRCALC}" style="width:200px;height:200px;image-rendering:pixelated;display:block"></div>
  <div><div style="background:${C.navy};color:#fff;font-size:36px;font-weight:700;padding:24px 38px;border-radius:99px">Usar la calculadora →</div><div style="font-size:28px;font-weight:700;margin-top:18px;color:${C.g}">checkonoff.mx/calculadora-horas-extra</div></div>
</div>
<div style="position:absolute;left:72px;bottom:66px;font-size:24px;font-weight:600;opacity:.7">📌 Guarda este post para enero</div>
${logo}`);

// ── CARRUSEL: tu turno de lunes a sábado en 46 h ──
add('t46_01', `${ph('mx_escribe', -20)}
<div class="box n" style="top:60px;font-size:58px">Tu turno de 8&nbsp;h de lunes a sábado ${G('ya no cabe')} en 2027</div>
${bb(40, 470, 'w l', '6 días × 8 h = 48 h')}
${bb(40, 620, 'm l', 'Tope 2027: 46 h')}
${bb(40, 770, 'n l', '¿Y las 2 h que sobran? 🤔')}
${ast(930, 400, .7)}
<div class="sw" style="bottom:56px">3 opciones legales →</div>
${logo}`);
const opcion = (n, k, t, hs, hi, tot, nota) => add(n, `${BG}${K(k, 200)}${H(t, 250, 84)}
<div style="position:absolute;left:72px;right:72px;top:580px">${dias(hs, hi)}${total(tot)}</div>
<div style="position:absolute;left:72px;right:72px;top:930px">${nota}</div>${logo}`);
opcion('t46_02', 'Opción 1', `Sábado corto.<br>${GD('El favorito.')}`, ['8', '8', '8', '8', '8', '6'], [5], '46 h ✓',
  card(`<div style="font-size:36px;font-weight:600;line-height:1.35">Lunes a viernes igual. El sábado se sale <b>2 h antes</b>.<br><span style="opacity:.65;font-size:30px">Ideal para oficinas y comercios con sábado medio día.</span></div>`));
opcion('t46_03', 'Opción 2', `20 minutos<br>${GD('menos al día.')}`, ['7:40', '7:40', '7:40', '7:40', '7:40', '7:40'], [0, 1, 2, 3, 4, 5], '46 h ✓',
  card(`<div style="font-size:36px;font-weight:600;line-height:1.35">Misma semana de 6 días, salida <b>20 min antes</b> diario.<br><span style="opacity:.65;font-size:30px">Útil en producción con turnos continuos.</span></div>`));
add('t46_04', `${BG}${K('Opción 3 · la más cara', 170, C.r)}${H(`Seguir con 48 h<br>y pagar ${GD('2 h extra.')}`, 220, 84)}
<div style="position:absolute;left:72px;right:72px;top:540px;display:flex;flex-direction:column;gap:20px">
${card(`<div style="font-size:36px;font-weight:600;line-height:1.35">Esas 2 h se pagan <b>dobles</b> y se comen <b>2 de tus 9 h</b> extra permitidas a la semana.</div>`)}
${card(`<div style="font-size:34px;font-weight:600;line-height:1.35">⚠️ Si además hay extras por demanda, llegas al tope más rápido y lo que pase se paga <b style="color:${C.lime}">triple</b>.</div>`, 'n')}
${card(`<div style="font-size:30px;font-weight:600;line-height:1.35">En las 3 opciones: el sueldo no baja y el nuevo horario se acuerda <b>por escrito</b> con tu equipo (art. 58 LFT).</div>`, 'm')}
</div>${logo}`);
add('t46_05', `${ph('mx_tel', -120)}
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,28,59,0) 35%,rgba(17,28,59,.55) 60%)"></div>
${ast(900, 90, .7)}
<div class="box n" style="bottom:140px;font-size:50px;text-align:left">CheckONOFF ya calcula tu jornada con las ${G('reglas 2026–2030.')}
<div style="font-size:32px;font-weight:600;margin-top:22px;line-height:1.5;opacity:.92">✅ Horas ordinarias por semana<br>✅ Dobles y triples con sus topes<br>✅ Alertas de incumplimiento</div>
<div style="display:inline-block;margin-top:26px;background:${C.g};font-size:34px;padding:18px 32px;border-radius:99px">Prueba 14 días gratis · checkonoff.mx</div></div>
${logo}`);

render(S, 'out_46');
