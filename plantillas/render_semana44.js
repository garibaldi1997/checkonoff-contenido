// Semana 26 oct – 1 nov 2026. Prueba A/B de portadas: "Para RRHH" y 4 carruseles con portada tipográfica
// (pregunta-mito sobre azul marino, el formato de los 2 posts con más alcance) contra 3 carruseles con foto premium.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { b64, LOGO, C, CSS, ast, bb, logo, ph, G, GD } = require('./premium_base');
const QRREG = b64('qr_registro.png', 'image/png');
const S = [];
const add = (n, html, h = 1350) => S.push([n, html, h]);
const H = (t, top, size = 80) => `<div style="position:absolute;left:72px;right:72px;top:${top}px;font-size:${size}px;font-weight:800;letter-spacing:-.025em;line-height:1.05">${t}</div>`;
const K = (t, top, col = C.g) => `<div style="position:absolute;left:72px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${col}">${t}</div>`;
const card = (inner, cls = 'w', extra = '') => `<div class="${cls}" style="border-radius:30px;padding:30px 34px;box-shadow:0 12px 30px rgba(17,28,59,.12);${extra}">${inner}</div>`;
const BG = `<div style="position:absolute;inset:0;background:linear-gradient(170deg,#F7F9FB 0%,#E9EEF3 100%)"></div>`;
const CNT = (i, n, dark) => `<div style="position:absolute;right:64px;top:56px;font-size:26px;font-weight:700;color:${dark ? '#fff' : C.navy};opacity:.55">${String(i).padStart(2, '0')}/${String(n).padStart(2, '0')}</div>`;
const LEY = (t, dark) => `<div style="position:absolute;left:72px;bottom:62px;font-size:22px;font-weight:600;opacity:.6;color:${dark ? '#fff' : C.navy}">${t}</div>`;
const Z = 1.2;
const lista = (items, top) => `<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${top / Z}px;display:flex;flex-direction:column;gap:22px">${items.join('')}</div>`;
const fila = (num, t, sub) => card(`<div style="display:flex;gap:28px;align-items:flex-start"><div style="min-width:72px;height:72px;border-radius:22px;background:${C.navy};color:${C.lime};font-size:40px;font-weight:800;display:grid;place-items:center">${num}</div><div><div style="font-size:38px;font-weight:700;line-height:1.2">${t}</div>${sub ? `<div style="font-size:28px;font-weight:500;opacity:.7;margin-top:6px;line-height:1.3">${sub}</div>` : ''}</div></div>`);
const txt = (t, sub, size = 38) => `<div style="font-size:${size}px;font-weight:700;line-height:1.25">${t}</div>${sub ? `<div style="font-size:28px;opacity:.65;margin-top:12px">${sub}</div>` : ''}`;
const renglon = (a, b, fuerte) => `<div style="display:flex;justify-content:space-between;gap:20px;font-size:${fuerte ? 44 : 38}px;font-weight:${fuerte ? 800 : 600};margin-top:16px"><span>${a}</span><b style="white-space:nowrap">${b}</b></div>`;
const raya = `<div style="height:2px;background:#E3E8EE;margin:22px 0"></div>`;
const pastilla = t => `<span style="background:${C.mint};color:#1F7A0E;padding:10px 24px;border-radius:99px">${t}</span>`;
const pie = t => `<div style="position:absolute;left:72px;bottom:66px;font-size:26px;font-weight:700;opacity:.75">${t}</div>`;
const R = s => `<span style="color:#FF5A4F">${s}</span>`;
const cierre = (titulo, sub) => `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#F4FBF0 0%,#DDF4D2 100%)"></div>
${ast(880, 120, 1.3)}
${H(titulo, 250, 92)}
<div style="position:absolute;left:72px;top:620px;font-size:38px;font-weight:500;line-height:1.35;width:880px;opacity:.85">${sub}</div>
<div style="position:absolute;left:72px;top:860px;display:flex;gap:36px;align-items:center">
  <div style="background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 34px rgba(17,28,59,.12)"><img src="${QRREG}" style="width:190px;height:190px;image-rendering:pixelated;display:block"></div>
  <div><div style="background:${C.navy};color:#fff;font-size:34px;font-weight:700;padding:22px 36px;border-radius:99px">Prueba 14 días gratis →</div><div style="font-size:28px;font-weight:700;margin-top:18px;color:${C.g}">checkonoff.mx · sin tarjeta</div></div>
</div>
${pie('📌 Guárdalo y compártelo con tu equipo de RRHH')}
${logo}`;
// Portada tipográfica (formato ganador del 14/10): pregunta-mito, respuesta corta en verde, botón "Desliza". Logo abajo, nunca arriba.
const portadaT = (emoji, pregunta, respuesta, texto, n, tag = '') => `<div style="position:absolute;inset:0;background:${C.navy}"></div>
<div style="position:absolute;inset:0;background:radial-gradient(circle 520px at 880px 1180px,rgba(52,182,20,.38),transparent 70%),radial-gradient(circle 420px at 120px 160px,rgba(10,78,148,.45),transparent 70%)"></div>
${CNT(1, n, true)}
${tag ? `<div style="position:absolute;left:72px;top:60px;font-size:24px;font-weight:800;letter-spacing:.16em;color:${C.lime}">${tag}</div>` : ''}
<div style="position:absolute;left:72px;top:200px;width:130px;height:130px;border-radius:32px;background:#fff;display:grid;place-items:center;font-size:76px">${emoji}</div>
<div style="position:absolute;left:72px;right:72px;top:380px;color:#fff">
 <div style="font-size:84px;font-weight:800;letter-spacing:-.03em;line-height:1.04">${pregunta}</div>
 <div style="font-size:84px;font-weight:800;letter-spacing:-.03em;line-height:1.04;margin-top:18px;color:${C.lime}">${respuesta}</div>
 <div style="font-size:36px;font-weight:500;line-height:1.35;margin-top:30px;opacity:.9;width:900px">${texto}</div>
</div>
<div style="position:absolute;left:72px;bottom:64px;background:${C.g};color:#fff;font-size:34px;font-weight:700;padding:20px 36px;border-radius:99px">Desliza →</div>
${logo}`;

// ═════ LUN 26 · carrusel con FOTO: el turno nocturno no cambia en 2027 ═════
add('noc_01', `${ph('u_zPM8KP25du4', -190)}
${bb(40, 130, 'w l', 'Turno de noche 🌙')}
${bb(560, 260, 'm r', '¿Nos cambia<br>en 2027?', 'r')}
${ast(930, 470, .7)}
<div class="box n" style="bottom:140px;font-size:56px">¿La reforma cambia tu turno nocturno en 2027? ${G('No.')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">Te explicamos por qué →</div></div>
${logo}`);
add('noc_02', `${BG}${CNT(2, 5)}${K('El tope semanal', 170)}${H(`Baja cada<br>${GD('1 de enero.')}`, 220, 92)}
${lista([card(`<div style="display:flex;justify-content:space-between;text-align:center">${[['2026', 48], ['2027', 46], ['2028', 44], ['2029', 42], ['2030', 40]].map(([a, h]) => `<div><div style="font-size:30px;font-weight:700;opacity:.6">${a}</div><div style="font-size:52px;font-weight:800;color:${a === '2027' ? C.b : C.navy}">${h} h</div></div>`).join('')}</div>`),
  card(txt(`Pero cada tipo de jornada ya tiene su <span style="color:${C.lime}">máximo diario.</span>`, 'Art. 61 LFT: diurna 8 h · nocturna 7 h · mixta 7.5 h'), 'n')], 560)}
${logo}`);
add('noc_03', `${BG}${CNT(3, 5)}${K('Haz la cuenta', 170)}${H(`6 días ×<br>${GD('máximo diario.')}`, 220, 92)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${560 / Z}px">
${card(`${renglon('Diurna · 8 h × 6', '48 h')}${renglon('Mixta · 7.5 h × 6', '45 h')}${renglon('Nocturna · 7 h × 6', '42 h')}${raya}<div style="font-size:34px;font-weight:700;line-height:1.3">El tope semanal solo "muerde" cuando baja de esa cuenta.</div>`)}
</div>${LEY('Arts. 59 y 61 LFT · DOF 1/05/2026')}${logo}`);
add('noc_04', `${BG}${CNT(4, 5)}${K('¿Cuándo te toca?', 170, C.b)}${H('Cada turno cambia<br>en un año distinto.', 220, 84)}
${lista([fila('☀️', 'Diurna: desde 2027', 'Tope de 46 h: ya no caben 6 días de 8 h.'), fila('🌗', 'Mixta: desde 2028', 'Tope de 44 h, menos que sus 45 h.'), fila('🌙', 'Nocturna: hasta 2030', 'Sus 42 h caben hasta que el tope baja a 40 h.')], 520)}
${logo}`);
add('noc_05', cierre(`Planea tus turnos<br>${GD('año por año.')}`, 'CheckONOFF registra cada entrada y salida y calcula las horas ordinarias y extra de cada turno.'));

// ═════ MAR 27 · carrusel TIPOGRÁFICO: la regla "3 y 3" ya no existe ═════
add('ext_01', portadaT('⏰', `¿Sigues pagando horas extra con la regla del ${R('"3 y 3"')}?`, 'Ya cambió.', 'Desde el 1 de mayo de 2026 las horas extra tienen reglas nuevas (arts. 66 y 68 LFT).', 5));
add('ext_02', `${BG}${CNT(2, 5)}${K('Antes vs. ahora', 170)}${H(`Las dobles<br>${GD('se reordenan.')}`, 220, 92)}
${lista([card(txt(`<span style="opacity:.55">ANTES</span><br>Máximo 3 h al día, 3 veces por semana (9 h).`)),
  card(txt(`<span style="color:${C.lime}">AHORA</span><br>Hasta 4 h al día, máximo 4 días. Tope semanal de dobles: 9 h en 2026 y 2027, luego 10, 11 y 12 h en 2030.`, '', 36), 'n')], 540)}
${LEY('Art. 66 LFT · transitorio cuarto')}${logo}`);
add('ext_03', `${BG}${CNT(3, 5)}${K('Las triples', 170, C.r)}${H(`Máximo 4 h triples<br>${GD('a la semana.')}`, 220, 84)}
${lista([card(txt('Lo que pase del tope de dobles se paga con 200 % adicional, hasta 4 h por semana.', 'Art. 68 LFT')),
  card(txt(`Y nunca más de <span style="color:${C.lime}">12 h en un día</span>, sumando jornada y extra.`), 'n')], 540)}
${logo}`);
add('ext_04', `${BG}${CNT(4, 5)}${K('Ejemplo', 170, C.b)}${H(`Salario de $500,<br>${GD('jornada de 8 h.')}`, 220, 88)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${540 / Z}px">
${card(`<div style="font-size:28px;font-weight:700;opacity:.6;letter-spacing:.08em">HORA NORMAL: $62.50</div>${renglon('9 h dobles × $125', '$1,125')}${renglon('2 h triples × $187.50', '$375')}${raya}<div style="display:flex;justify-content:space-between;align-items:center;font-size:44px;font-weight:800"><span>Total extra</span>${pastilla('$1,500')}</div>`)}
</div>${pie('📌 Guárdalo para tu próximo cierre')}${logo}`);
add('ext_05', cierre(`Cada hora extra,<br>${GD('bien pagada.')}`, 'CheckONOFF separa horas dobles y triples por persona y las manda a la pre-nómina.'));

// ═════ MIÉ 28 · carrusel con FOTO: descanso en domingo vs. lunes ═════
add('dom_01', `${ph('u_rXltUgXPm00', -120)}
${bb(40, 130, 'w l', '¿Quién cubre el domingo?')}
${bb(500, 270, 'm r', 'Yo, y descanso<br>el lunes 🙋', 'r')}
${ast(70, 480, .6)}
<div class="box n" style="bottom:140px;font-size:54px">¿Que tu equipo descanse en domingo o en lunes ${G('cuesta lo mismo?')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">No. Te mostramos cuánto →</div></div>
${logo}`);
add('dom_02', `${BG}${CNT(2, 5)}${K('Lo que dice la ley', 170)}${H(`1 día de descanso<br>${GD('por cada 6.')}`, 220, 92)}
${lista([card(txt('Al menos un día de descanso por cada seis de trabajo, con salario íntegro.', 'Art. 69 LFT')),
  card(txt(`Se procura que sea domingo. Quien trabaja en domingo recibe una <span style="color:${C.lime}">prima de al menos 25 %.</span>`, 'Art. 71 LFT'), 'n')], 560)}
${logo}`);
add('dom_03', `${BG}${CNT(3, 5)}${K('Ejemplo · $500 diarios', 170, C.b)}${H(`La diferencia<br>${GD('por semana.')}`, 220, 92)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${540 / Z}px;display:flex;flex-direction:column;gap:22px">
${card(`<div style="font-size:28px;font-weight:700;opacity:.6;letter-spacing:.08em">DESCANSA EN DOMINGO</div>${renglon('6 días + descanso pagado', '$3,500')}`)}
${card(`<div style="font-size:28px;font-weight:700;opacity:.6;letter-spacing:.08em">TRABAJA DOMINGO, DESCANSA LUNES</div>${renglon('6 días + descanso pagado', '$3,500')}${renglon('Prima dominical 25 %', '+ $125')}${raya}<div style="display:flex;justify-content:space-between;align-items:center;font-size:44px;font-weight:800"><span>Total</span>${pastilla('$3,625')}</div>`)}
</div>${logo}`);
add('dom_04', `${BG}${CNT(4, 5)}${K('Multiplícalo', 170, C.r)}${H('$125 × 20 personas<br>× 52 semanas', 220, 84)}
${lista([card(`<div style="text-align:center;font-size:30px;font-weight:700;opacity:.6">PRIMA DOMINICAL AL AÑO</div><div style="text-align:center;font-size:110px;font-weight:800;color:${C.b};letter-spacing:-.03em">$130,000</div>`),
  card(txt(`No es un error pagarla: el error es <span style="color:${C.lime}">no saber quién trabajó</span> cada domingo.`), 'n')], 520)}
${logo}`);
add('dom_05', cierre(`Cada domingo,<br>${GD('registrado.')}`, 'CheckONOFF registra quién trabajó en domingo para que la prima vaya completa en la nómina.'));

// ═════ JUE 29 · carrusel TIPOGRÁFICO: las 3 capas del registro electrónico ═════
add('cap_01', portadaT('🔐', `¿Basta con instalar un ${R('checador')} para cumplir en 2027?`, 'No.', 'Para que tu registro sirva como prueba se necesitan 3 capas. El aparato es solo una.', 4));
add('cap_02', `${BG}${CNT(2, 4)}${K('Las 3 capas', 170)}${H(`Cumplir no es<br>${GD('solo checar.')}`, 220, 92)}
${lista([fila(1, 'Aviso de privacidad', 'Informa qué datos recabas (huella, rostro, ubicación) y para qué.'), fila(2, 'Acuerdo del registro', 'Empresa y trabajador conocen y aceptan el mecanismo.'), fila(3, 'Registro electrónico diario', 'Entrada, salida, jornada y tiempo extra de cada persona.')], 520)}
${logo}`);
add('cap_03', `${BG}${CNT(3, 4)}${K('Por qué importa', 170, C.r)}${H(`El checador ya es<br>${GD('una base de datos.')}`, 220, 84)}
${lista([card(txt('Si se acredita que el mecanismo fue acordado, el registro hace prueba plena.', 'Art. 132 fr. XXXIV LFT · reglas de la STPS desde el 1/01/2027')),
  card(txt(`Huella, rostro o ubicación son <span style="color:${C.lime}">datos personales:</span> se protegen con aviso de privacidad.`, 'Art. 16 constitucional · LFPDPPP art. 15'), 'n')], 540)}
${logo}`);
add('cap_04', cierre(`Cumple las<br>${GD('3 capas.')}`, 'CheckONOFF guarda cada checada con hora, ubicación y foto, lista para mostrarla cuando te la pidan.'));

// ═════ VIE 30 · carrusel con FOTO: cuánto cuesta no registrar ═════
add('mul_01', `${ph('u_JaoVGh5aJ3E', 0, 'width:2030px;left:-520px')}
${bb(40, 120, 'w l', 'Revisión de la STPS 📋')}
${bb(560, 250, 'm r', '¿Tenemos los<br>registros?', 'r')}
${ast(930, 470, .7)}
<div class="box n" style="bottom:140px;font-size:56px">¿Cuánto le puede costar a tu empresa ${G('no registrar la jornada?')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">Más un autodiagnóstico →</div></div>
${logo}`);
add('mul_02', `${BG}${CNT(2, 5)}${K('La multa', 170, C.r)}${H(`De 250 a<br>${GD('5,000 UMA.')}`, 220, 96)}
${lista([card(`${renglon('Mínima · 250 UMA', '$29,327.50')}${raya}${renglon('Máxima · 5,000 UMA', '$586,550', 1)}`),
  card(txt('Más demandas laborales sin evidencia para defenderte.'), 'n')], 560)}
${LEY('Art. 994 fr. IV Bis LFT · valor UMA 2026')}${logo}`);
add('mul_03', `${BG}${CNT(3, 5)}${K('Autodiagnóstico 1/2', 170, C.b)}${H('Responde sí o no.', 220, 88)}
${lista([fila(1, '¿Registras entrada, salida y descansos?', 'En orden cronológico, por persona.'), fila(2, '¿Vigilas los nuevos límites de horas extra?', 'Vigentes desde el 1 de mayo de 2026.'), fila(3, '¿Sabes cuántas extra fueron dobles o triples?', 'En lo que va del año.')], 440)}
${logo}`);
add('mul_04', `${BG}${CNT(4, 5)}${K('Autodiagnóstico 2/2', 170, C.b)}${H('Y las de nómina.', 220, 88)}
${lista([fila(4, '¿Usas el registro para planear turnos?', 'Antes de autorizar horas extra.'), fila(5, '¿Tu registro cuadra con el CFDI de nómina?', 'Días, incidencias, extras y pagos.'),
  card(txt(`¿Dos "no" o más? <span style="color:${C.lime}">Empieza antes de enero.</span>`), 'n')], 440)}
${logo}`);
add('mul_05', cierre(`Cumplir hoy evita<br>${GD('problemas mañana.')}`, 'Con CheckONOFF tienes desde hoy el registro electrónico de cada jornada, con hora, ubicación y foto.'));

// ═════ SÁB 31 · carrusel TIPOGRÁFICO: CFDI vs. registro ═════
add('cfd_01', portadaT('🧾', `¿Tu nómina y tu registro de asistencia dicen ${R('lo mismo')}?`, 'Deberían.', 'El CFDI de nómina y el registro de jornada se cruzan dato por dato.', 4));
add('cfd_02', `${BG}${CNT(2, 4)}${K('Cómo se cruzan', 170)}${H(`Dato por<br>${GD('dato.')}`, 220, 92)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${520 / Z}px">
${card(`${[['Fecha del registro', 'Periodo de pago'], ['Hora de entrada', 'Horas ordinarias'], ['Hora de salida', 'Horas extra'], ['ID del empleado', 'Datos del trabajador'], ['Ubicación', 'Centro de trabajo']].map(([a, b], i) => `${i ? raya : ''}<div style="display:flex;justify-content:space-between;gap:18px;font-size:34px;font-weight:700"><span>${a}</span><span style="color:${C.b}">→ ${b}</span></div>`).join('')}`)}
</div>${logo}`);
add('cfd_03', `${BG}${CNT(3, 4)}${K('Lo que casi nadie sabe', 170, C.r)}${H(`El CFDI no trae<br>${GD('tus horas diarias.')}`, 220, 84)}
${lista([card(txt('Las horas extra solo aparecen en el CFDI si se pagan (nodo HorasExtra). Las horas trabajadas por día no vienen.')),
  card(txt(`Por eso el registro de jornada es <span style="color:${C.lime}">la evidencia</span> que respalda lo que pagaste.`), 'n')], 540)}
${logo}`);
add('cfd_04', cierre(`Que tu nómina y tu<br>registro ${GD('cuadren.')}`, 'CheckONOFF genera la pre-nómina desde las checadas reales: lo que pagas sale de lo que se registró.'));

// ═════ DOM 1 · carrusel TIPOGRÁFICO: turnos de 40 h en 2030 ═════
add('t40_01', portadaT('🗓️', `¿Cómo se verá un turno de ${R('40 horas')} en 2030?`, 'Así.', 'Tres ejemplos legales, uno por cada tipo de jornada.', 4));
add('t40_02', `${BG}${CNT(2, 4)}${K('3 ejemplos', 170)}${H(`40 horas,<br>${GD('3 formas.')}`, 220, 92)}
${lista([fila('☀️', 'Diurna', 'Lunes a viernes 8 h · fin de semana libre.'), fila('🌙', 'Nocturna', 'Lunes a viernes 7 h + sábado 5 h.'), fila('🌗', 'Mixta', 'Lunes a viernes 7.5 h + sábado 2.5 h.')], 520)}
${logo}`);
add('t40_03', `${BG}${CNT(3, 4)}${K('La regla', 170, C.b)}${H(`Repartir sí,<br>${GD('rebasar no.')}`, 220, 92)}
${lista([card(txt('La jornada se puede distribuir de común acuerdo, sin pasar de 40 h a la semana ni del máximo diario.', 'Arts. 58, 59 y 61 LFT')),
  card(txt(`Y siempre <span style="color:${C.lime}">1 día de descanso</span> por cada 6 de trabajo.`, 'Art. 69 LFT'), 'n')], 560)}
${logo}`);
add('t40_04', cierre(`Empieza a planear<br>${GD('desde hoy.')}`, 'CheckONOFF te muestra cuántas horas trabaja de verdad cada turno, para ajustar sin sorpresas.'));

// ═════ PARA RRHH 15:00 · mini carruseles tipográficos de 3 láminas ═════
const rrhh = (k, emoji, preg, resp, texto, l2, l3) => {
  add(`${k}_01`, portadaT(emoji, preg, resp, texto, 3, 'PARA RRHH'));
  add(`${k}_02`, `${BG}${CNT(2, 3)}${K(l2.k, 170)}${H(l2.h, 220, 88)}${lista(l2.c, 560)}${l2.ley ? LEY(l2.ley) : ''}${logo}`);
  add(`${k}_03`, `${BG}${CNT(3, 3)}${K(l3.k, 170, C.b)}${H(l3.h, 220, 88)}${lista(l3.c, 560)}${pie(l3.pie || '📌 Guárdalo y compártelo con quien lleva la nómina')}${logo}`);
};
rrhh('men', '🚫', `¿Un menor de 18 años puede hacer ${R('horas extra')}?`, 'No.', 'La reforma subió la edad: antes la prohibición era para menores de 16.',
  { k: 'Lo que cambió', h: `De 16 a<br>${GD('18 años.')}`, c: [card(txt('<span style="opacity:.55">ANTES</span><br>Prohibido el tiempo extra a menores de 16 años.')), card(txt(`<span style="color:${C.lime}">AHORA</span><br>Prohibido a menores de 18 años.`), 'n')], ley: 'Art. 123 constitucional · DOF 1/05/2026' },
  { k: 'Para RRHH', h: `Revisa tu<br>${GD('plantilla.')}`, c: [card(txt('💡 Identifica a quien tenga menos de 18 años y no le programes horas extra.')), card(txt('Ojo en temporadas altas: es cuando más se cuelan.'), 'm')] });
rrhh('sue', '💵', `¿Puedes ${R('bajar el sueldo')} al reducir la jornada a 40 horas?`, 'No.', 'El decreto lo prohíbe expresamente.',
  { k: 'Lo que dice el decreto', h: `Menos horas,<br>${GD('mismo salario.')}`, c: [card(txt('La reducción de la jornada no puede bajar sueldos, salarios ni prestaciones.')), card(txt(`Aplica en <span style="color:${C.lime}">cada etapa</span>: 46 h en 2027, 44 en 2028, 42 en 2029 y 40 en 2030.`), 'n')], ley: 'Transitorio séptimo · DOF 1/05/2026' },
  { k: 'Para RRHH', h: `Ajusta turnos,<br>${GD('no recibos.')}`, c: [card(txt('💡 Lo que cambia son los horarios y la distribución de la semana. El salario y las prestaciones se quedan igual.')), card(txt('Documenta el nuevo horario por escrito con cada persona.'), 'm')] });
rrhh('tri', '3️⃣', `¿Cuántas horas extra ${R('triples')} puedes pagar a la semana?`, 'Máximo 4.', 'Y hay otro tope que casi nadie revisa: 12 horas al día.',
  { k: 'Las triples', h: `Antes sin tope,<br>${GD('ahora 4 h.')}`, c: [card(txt('Lo que exceda del tope de horas dobles se paga con 200 % adicional, hasta 4 h por semana.', 'Art. 68 LFT')), card(txt(`Antes, las triples <span style="color:${C.lime}">no tenían tope semanal.</span>`), 'n')] },
  { k: 'El tope diario', h: `Nunca más de<br>${GD('12 h al día.')}`, c: [card(txt('Jornada ordinaria + horas extra: máximo 12 h en un día.')), card(txt('💡 Si alguien ya trabajó 8 h, ese día solo puede hacer 4 h extra.'), 'm')] });
rrhh('jno', '🌙', `¿Una jornada ${R('nocturna')} puede durar 8 horas?`, 'No.', 'Su máximo es de 7 horas al día.',
  { k: 'Máximos diarios', h: `Cada jornada,<br>${GD('su tope.')}`, c: [card(`${renglon('Diurna · 6:00 a 20:00', '8 h')}${renglon('Nocturna · 20:00 a 6:00', '7 h')}${renglon('Mixta', '7.5 h')}`)], ley: 'Arts. 60 y 61 LFT' },
  { k: 'El caso tramposo', h: `15:00 a 23:00<br>${GD('no son 8 h legales.')}`, c: [card(txt('Tiene 3 h nocturnas (menos de 3.5), así que es mixta: máximo 7.5 h. La media hora que sobra es tiempo extra.')), card(txt('Si el periodo nocturno es de 3.5 h o más, ya cuenta como nocturna.'), 'm')] });
rrhh('bio', '👆', `¿Si usas huella o reconocimiento facial necesitas ${R('aviso de privacidad')}?`, 'Sí.', 'Los datos biométricos son datos personales.',
  { k: 'Lo que dice la ley', h: `Informa qué<br>${GD('datos recabas.')}`, c: [card(txt('El responsable debe informar qué datos recaba y para qué, mediante un aviso de privacidad.', 'LFPDPPP art. 15 · art. 16 constitucional')), card(txt(`Huella, rostro, ubicación o firma electrónica: <span style="color:${C.lime}">todos cuentan.</span>`), 'n')] },
  { k: 'Y para 2027', h: `Aviso + acuerdo<br>${GD('+ registro.')}`, c: [card(txt('Para que el registro sea prueba plena también necesitas acreditar que el mecanismo fue acordado con el trabajador.', 'Art. 132 fr. XXXIV LFT')), card(txt('💡 Firma ambos documentos al dar de alta a cada persona.'), 'm')] });

// ═════ JUE 29 · meme de humor laboral para Instagram y Facebook (formato ganador de LinkedIn, sin firma personal) ═════
add('meme_01', `<div style="position:absolute;inset:0;background:#fff"></div>
<div style="position:absolute;left:60px;right:60px;top:60px;color:${C.navy};font-size:44px;font-weight:600;line-height:1.38">
— Cierre de quincena: en 1 hora.<br>— Sucursal Norte: "te mando la lista por WhatsApp 📸"<br>— Excel: Asistencia_FINAL_v7.xlsx<br>— RRHH a las 11 de la noche:</div>
<div style="position:absolute;left:60px;right:60px;top:440px;bottom:150px;border-radius:24px;overflow:hidden">
 <img src="${b64('hq/u_2Q4s2xTEznE.jpg', 'image/jpeg')}" style="position:absolute;left:0;top:-110px;width:960px">
 <div style="position:absolute;left:40px;bottom:40px;font-size:66px;font-weight:800;color:#fff;-webkit-text-stroke:8px ${C.navy};paint-order:stroke fill">¿Cuál es la buena? 😩</div></div>
${logo}`);

(async () => {
  const OUT = path.join(__dirname, 'out_semana44'); fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, body, h] of S) {
    if (only.length && !only.some(o => n.startsWith(o))) continue;
    await p.setViewportSize({ width: 1080, height: h });
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body><div class="f" style="height:${h}px">${body}</div></body></html>`);
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(150);
    await p.screenshot({ path: path.join(OUT, n + '.jpg'), type: 'jpeg', quality: 90 }); console.log('ok', n);
  }
  await b.close();
})();
