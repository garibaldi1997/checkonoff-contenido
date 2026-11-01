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

// Semana 45 (02–07 nov 2026): menos y mejor. Solo el formato que ganó (autodiagnóstico/checklist práctico, portada tipográfica).
const si = (n, t, sub) => fila(n, t, sub);
// LUN 2 · ¿Lista para 46 h?
add('lis_01', portadaT('🗓️', `¿Tu empresa está lista para las ${R('46 horas')} de 2027?`, 'Revísalo en 1 minuto.', 'Autodiagnóstico de 6 preguntas. Si respondes "no" a 2 o más, empieza antes de enero.', 5));
add('lis_02', `${BG}${CNT(2, 5)}${K('Autodiagnóstico 1/2', 170, C.b)}${H('Responde sí o no.', 220, 88)}
${lista([si(1, '¿Sabes cuántas horas trabaja hoy cada persona?', 'Por semana, no por quincena.'), si(2, '¿Tus turnos de 48 h ya tienen versión de 46 h?', 'Desde el 1 de enero de 2027.'), si(3, '¿Registras entrada y salida de forma electrónica?', 'Obligatorio desde 2027 (art. 132 fr. XXXIV LFT).')], 440)}
${logo}`);
add('lis_03', `${BG}${CNT(3, 5)}${K('Autodiagnóstico 2/2', 170, C.b)}${H('Y estas tres.', 220, 88)}
${lista([si(4, '¿Distingues horas dobles y triples?', 'Dobles hasta 9 a la semana en 2026–2027.'), si(5, '¿Cada quien tiene 1 día de descanso por cada 6?', 'Art. 69 LFT.'), si(6, '¿Mantienes los sueldos al bajar las horas?', 'La reforma prohíbe reducirlos.')], 440)}
${logo}`);
add('lis_04', `${BG}${CNT(4, 5)}${K('Tu resultado', 170, C.r)}${H(`2 o más "no":<br>${GD('empieza ya.')}`, 220, 92)}
${lista([card(`${renglon('2026', '48 h')}${renglon('2027', '46 h', 1)}${renglon('2028', '44 h')}${renglon('2029', '42 h')}${renglon('2030', '40 h')}`), card(txt('Cada 1 de enero baja el tope. Sin registro, no sabes cuánto te falta.'), 'n')], 560)}
${LEY('Reforma a la LFT · DOF 1/05/2026')}${logo}`);
add('lis_05', cierre(`Llega a 2027<br>${GD('con todo en orden.')}`, 'CheckONOFF registra cada jornada y te avisa quién se acerca al tope de horas.'));
// MAR 3 · Cierre de quincena en 10 minutos
add('qna_01', portadaT('⏱️', `¿Cuánto tardas en ${R('cerrar la quincena')}?`, 'Debería ser 10 min.', 'El checklist que usan los equipos de RRHH que ya no se desvelan.', 5));
add('qna_02', `${BG}${CNT(2, 5)}${K('Checklist 1/2', 170, C.b)}${H('Antes de calcular.', 220, 88)}
${lista([si('✓', 'Faltas y retardos del periodo', 'Con hora real, no "más o menos".'), si('✓', 'Permisos e incapacidades', 'Que no se cuenten como falta.'), si('✓', 'Descansos trabajados', 'Llevan pago extra; el domingo, prima dominical (art. 71).')], 440)}
${logo}`);
add('qna_03', `${BG}${CNT(3, 5)}${K('Checklist 2/2', 170, C.b)}${H('Antes de pagar.', 220, 88)}
${lista([si('✓', 'Horas extra dobles y triples', 'Dobles hasta 9 a la semana; lo demás, triple.'), si('✓', 'Autorización de cada hora extra', 'Por escrito, antes de pagarla.'), si('✓', 'Que el registro cuadre con el CFDI', 'Días, incidencias y extras.')], 440)}
${logo}`);
add('qna_04', `${BG}${CNT(4, 5)}${K('El problema', 170, C.r)}${H(`El checklist tarda<br>${GD('lo que tarda tu lista.')}`, 220, 84)}
${lista([card(txt('Con papel o Excel, cada punto es buscar, preguntar y capturar.'), 'w'), card(txt('Con registro electrónico, los 6 puntos salen solos en la prenómina.'), 'n')], 560)}${logo}`);
add('qna_05', cierre(`Cierra la quincena<br>${GD('en minutos.')}`, 'CheckONOFF junta faltas, retardos, descansos y horas extra en una prenómina lista para revisar.'));
// MIÉ 4 · Horas extra 2026 en 3 pasos
add('hex_01', portadaT('🧮', `¿Sabes calcular las horas extra con las ${R('reglas 2026')}?`, 'En 3 pasos.', 'Con un ejemplo real de $500 diarios. Guárdalo para tu próxima nómina.', 5));
add('hex_02', `${BG}${CNT(2, 5)}${K('Paso 1', 170, C.b)}${H(`Saca el<br>${GD('valor por hora.')}`, 220, 92)}
${lista([card(`${renglon('Salario diario', '$500')}${renglon('Jornada diurna', '8 h')}${raya}${renglon('Valor por hora', '$62.50', 1)}`)], 560)}${logo}`);
add('hex_03', `${BG}${CNT(3, 5)}${K('Paso 2', 170, C.b)}${H(`Las primeras 9<br>${GD('van al doble.')}`, 220, 92)}
${lista([card(`${renglon('Hora doble', '$125')}${renglon('9 h × $125', '$1,125', 1)}`), card(txt('Máximo 4 h al día y 4 días a la semana.'), 'n')], 560)}${LEY('Arts. 66 y 68 LFT · reforma DOF 1/05/2026')}${logo}`);
add('hex_04', `${BG}${CNT(4, 5)}${K('Paso 3', 170, C.r)}${H(`Lo que pase de 9<br>${GD('va al triple.')}`, 220, 92)}
${lista([card(`${renglon('Hora triple', '$187.50')}${renglon('2 h × $187.50', '$375')}${raya}${renglon('Total de la semana', '$1,500', 1)}`), card(txt('Y nunca más de 12 h de trabajo en un día.'), 'n')], 560)}${logo}`);
add('hex_05', cierre(`Que las cuentas<br>${GD('salgan solas.')}`, 'CheckONOFF separa horas dobles y triples por persona y por semana, listas para la prenómina.'));
// JUE 5 · 5 señales de "checa por mí"
add('cpm_01', portadaT('🕵️', `¿Alguien en tu equipo ${R('checa por otro')}?`, '5 señales.', 'Si ves 2 o más, tu nómina está pagando horas que nadie trabajó.', 5));
add('cpm_02', `${BG}${CNT(2, 5)}${K('Señales 1–3', 170, C.r)}${H('Revisa tu lista.', 220, 88)}
${lista([si(1, 'Todos llegan exactamente a la misma hora', '7:00, 7:00, 7:00… todos los días.'), si(2, 'Nadie tiene un solo retardo en meses', 'Ni en día de lluvia.'), si(3, 'La misma letra en varias firmas', 'En listas de papel.')], 440)}${logo}`);
add('cpm_03', `${BG}${CNT(3, 5)}${K('Señales 4–5', 170, C.r)}${H('Y estas dos.', 220, 88)}
${lista([si(4, 'Horas extra en días sin trabajo extra', 'Producción normal, nómina inflada.'), si(5, 'Tarjetas o gafetes guardados juntos', 'Junto al reloj checador.')], 440)}${logo}`);
add('cpm_04', `${BG}${CNT(4, 5)}${K('La solución', 170, C.b)}${H(`Que cada checada<br>${GD('diga quién y dónde.')}`, 220, 84)}
${lista([fila('📸', 'Foto al checar', 'Se ve quién registró.'), fila('📍', 'Ubicación', 'Solo vale dentro del centro de trabajo.'), fila('🕒', 'Hora exacta', 'Sin redondeos ni "más o menos".')], 520)}${logo}`);
add('cpm_05', cierre(`Paga solo<br>${GD('lo que se trabajó.')}`, 'Con CheckONOFF cada checada lleva foto, ubicación y hora: nadie checa por otro.'));
// VIE 6 · ¿Tu registro serviría en una demanda?
add('prb_01', portadaT('⚖️', `¿Tu registro de asistencia ${R('te defendería')} en una demanda?`, 'Revisa 3 cosas.', 'En un juicio por horas extra, a la empresa le toca probar la jornada.', 5));
add('prb_02', `${BG}${CNT(2, 5)}${K('Quién prueba', 170, C.r)}${H(`La carga es<br>${GD('de la empresa.')}`, 220, 92)}
${lista([card(txt('Si un trabajador reclama horas extra, la empresa debe demostrar cuánto trabajó.', 'Art. 784 LFT')), card(txt('Sin registro, cuenta lo que diga la demanda.'), 'n')], 560)}${logo}`);
add('prb_03', `${BG}${CNT(3, 5)}${K('Las 3 capas', 170, C.b)}${H('Para que sí sirva.', 220, 88)}
${lista([si(1, 'Registro electrónico de inicio y fin', 'Obligatorio desde 2027 (art. 132 fr. XXXIV).'), si(2, 'Acordado con cada trabajador', 'Así puede valer como prueba plena.'), si(3, 'Conservado y fácil de consultar', 'Los controles de asistencia se guardan (art. 804).')], 440)}${logo}`);
add('prb_04', `${BG}${CNT(4, 5)}${K('Autodiagnóstico', 170, C.b)}${H('¿Cuántas cumples?', 220, 88)}
${lista([card(`${renglon('3 de 3', 'Bien protegido', 1)}${renglon('2 de 3', 'Riesgo medio')}${renglon('0–1 de 3', 'Riesgo alto')}`), card(txt('La lista en papel normalmente cumple 0.'), 'n')], 560)}${logo}`);
add('prb_05', cierre(`Un registro que<br>${GD('sí te respalda.')}`, 'CheckONOFF guarda cada checada con hora, foto y ubicación, y la descargas cuando la necesites.'));
// SÁB 7 · 3 sucursales sin libretas (el tema del reel con más alcance: 124)
add('suc_01', portadaT('🏪', `¿Cómo controlas la asistencia de ${R('3 sucursales')} sin estar ahí?`, 'Así.', 'Sin fotos de libretas por WhatsApp y sin capturar todo el lunes.', 5));
add('suc_02', `${BG}${CNT(2, 5)}${K('Hoy', 170, C.r)}${H(`3 sucursales,<br>${GD('3 versiones.')}`, 220, 92)}
${lista([fila('📒', 'Libreta en cada sucursal', 'Letra que nadie entiende.'), fila('📸', 'Fotos por WhatsApp', 'Borrosas, tarde o nunca.'), fila('⌨️', 'Captura el lunes', 'Horas de trabajo que nadie ve.')], 520)}${logo}`);
add('suc_03', `${BG}${CNT(3, 5)}${K('Mañana', 170, C.b)}${H(`Cada quien checa<br>${GD('como le acomode.')}`, 220, 88)}
${lista([fila('📱', 'App con foto y geocerca', 'Funciona sin internet.'), fila('💬', 'Por WhatsApp', 'Sin instalar nada.'), fila('🖐️', 'Con el checador que ya tienes', 'Conectado a la nube.')], 520)}${logo}`);
add('suc_04', `${BG}${CNT(4, 5)}${K('Y tú', 170, C.b)}${H(`Todo en<br>${GD('un solo panel.')}`, 220, 92)}
${lista([card(`${renglon('Centro', '8 de 8 ✓')}${renglon('Norte', '5 de 6 · 1 falta')}${renglon('Sur', '7 de 7 ✓')}`), card(txt('En tiempo real, desde tu celular.'), 'n')], 560)}${logo}`);
add('suc_05', cierre(`Controla todas<br>${GD('desde un lugar.')}`, 'CheckONOFF junta las checadas de todas tus sucursales en un panel, con prenómina en un clic.'));
(async () => {
  const OUT = path.join(__dirname, 'out_semana45'); fs.mkdirSync(OUT, { recursive: true });
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
