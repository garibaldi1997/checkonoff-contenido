// Semana 21–25 de octubre de 2026 (estándar premium aprobado)
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { b64, LOGO, FOTO, C, CSS, ast, bb, logo, ph, G, GD } = require('./premium_base');
const QRREG = b64('qr_registro.png', 'image/png');
const S = [];
const add = (n, html, h = 1350) => S.push([n, html, h]);
const H = (t, top, size = 80) => `<div style="position:absolute;left:72px;right:72px;top:${top}px;font-size:${size}px;font-weight:800;letter-spacing:-.025em;line-height:1.05">${t}</div>`;
const K = (t, top, col = C.g) => `<div style="position:absolute;left:72px;top:${top}px;font-size:26px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:${col}">${t}</div>`;
const card = (inner, cls = 'w', extra = '') => `<div class="${cls}" style="border-radius:30px;padding:30px 34px;box-shadow:0 12px 30px rgba(17,28,59,.12);${extra}">${inner}</div>`;
const BG = `<div style="position:absolute;inset:0;background:linear-gradient(170deg,#F7F9FB 0%,#E9EEF3 100%)"></div>`;
const CNT = (i, n, dark) => `<div style="position:absolute;right:64px;top:56px;font-size:26px;font-weight:700;color:${dark ? '#fff' : C.navy};opacity:.55">${String(i).padStart(2, '0')}/${String(n).padStart(2, '0')}</div>`;
const LEY = (t, dark) => `<div style="position:absolute;left:72px;bottom:62px;font-size:22px;font-weight:600;opacity:.6;color:${dark ? '#fff' : C.navy}">${t}</div>`;
const Z = 1.2; // las tarjetas internas se escalan para llenar la lámina
const lista = (items, top) => `<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${top / Z}px;display:flex;flex-direction:column;gap:22px">${items.join('')}</div>`;
const fila = (num, t, sub) => card(`<div style="display:flex;gap:28px;align-items:flex-start"><div style="min-width:72px;height:72px;border-radius:22px;background:${C.navy};color:${C.lime};font-size:40px;font-weight:800;display:grid;place-items:center">${num}</div><div><div style="font-size:38px;font-weight:700;line-height:1.2">${t}</div>${sub ? `<div style="font-size:28px;font-weight:500;opacity:.7;margin-top:8px;line-height:1.3">${sub}</div>` : ''}</div></div>`);
const cierre = (titulo, sub) => `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#F4FBF0 0%,#DDF4D2 100%)"></div>
${ast(880, 120, 1.3)}
${H(titulo, 250, 92)}
<div style="position:absolute;left:72px;top:620px;font-size:38px;font-weight:500;line-height:1.35;width:880px;opacity:.85">${sub}</div>
<div style="position:absolute;left:72px;top:860px;display:flex;gap:36px;align-items:center">
  <div style="background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 34px rgba(17,28,59,.12)"><img src="${QRREG}" style="width:190px;height:190px;image-rendering:pixelated;display:block"></div>
  <div><div style="background:${C.navy};color:#fff;font-size:34px;font-weight:700;padding:22px 36px;border-radius:99px">Prueba 14 días gratis →</div><div style="font-size:28px;font-weight:700;margin-top:18px;color:${C.g}">checkonoff.mx · sin tarjeta</div></div>
</div>
<div style="position:absolute;left:72px;bottom:66px;font-size:26px;font-weight:700;opacity:.75">📌 Guárdalo y compártelo con tu equipo de RRHH</div>
${logo}`;
// Historia 1080x1920: foto arriba, caja abajo
const historia = (foto, top, tag, titulo, pie) => `${ph(foto, top)}
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(17,28,59,0) 40%,rgba(17,28,59,.6) 62%,${C.navy} 80%)"></div>
<div style="position:absolute;left:72px;right:72px;top:1100px;color:#fff">
 <div style="display:inline-block;background:${C.lime};color:${C.navy};font-size:30px;font-weight:800;letter-spacing:.06em;padding:12px 24px;border-radius:14px">${tag}</div>
 <div style="font-size:92px;font-weight:800;letter-spacing:-.03em;line-height:1.04;margin-top:28px">${titulo}</div>
 <div style="display:inline-block;margin-top:40px;background:#fff;color:${C.navy};font-size:38px;font-weight:700;padding:24px 36px;border-radius:99px">${pie}</div>
</div>
<div class="logo" style="bottom:170px;left:72px;right:auto"><img src="${LOGO}">CheckONOFF</div>`;

// ═════ MIÉ 21 · carrusel festivo 16 de noviembre ═════
add('fes_01', `${ph('mx_taller', -150)}
${bb(40, 120, 'w l', '¿Es día de descanso?')}
${bb(560, 250, 'm r', '¿Se paga doble<br>o triple? 🤔', 'r')}
${ast(930, 480, .7)}
<div class="box n" style="bottom:140px;font-size:56px">Lunes 16 de noviembre: si tu equipo trabaja, ${G('¿cuánto le pagas?')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">Deslizá →</div></div>
${logo}`);
add('fes_02', `${BG}${CNT(2, 5)}${K('Primero lo primero', 170)}${H(`Es descanso<br>${GD('obligatorio.')}`, 220, 92)}
${lista([
  card(`<div style="font-size:40px;font-weight:700;line-height:1.25">El <span style="color:${C.b}">tercer lunes de noviembre</span> es día de descanso obligatorio por el 20 de noviembre.</div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 74 fr. VI LFT</div>`),
  card(`<div style="font-size:40px;font-weight:700;line-height:1.25">En 2026 cae el <span style="color:${C.lime}">lunes 16 de noviembre.</span></div><div style="font-size:28px;opacity:.75;margin-top:12px">Y se paga completo aunque nadie trabaje.</div>`, 'n')], 560)}
${logo}`);
add('fes_03', `${BG}${CNT(3, 5)}${K('Si sí trabaja', 170)}${H(`Le pagas su día<br>${GD('+ salario doble.')}`, 220, 88)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${540 / Z}px">
${card(`<div style="font-size:30px;font-weight:700;opacity:.6;letter-spacing:.08em">EJEMPLO · SALARIO DIARIO $400</div>
<div style="display:flex;justify-content:space-between;font-size:40px;font-weight:600;margin-top:24px"><span>Su día de descanso</span><b>$400</b></div>
<div style="display:flex;justify-content:space-between;font-size:40px;font-weight:600;margin-top:18px"><span>Salario doble por trabajarlo</span><b>$800</b></div>
<div style="height:2px;background:#E3E8EE;margin:26px 0"></div>
<div style="display:flex;justify-content:space-between;align-items:center;font-size:44px;font-weight:800"><span>Total del día</span><span style="background:${C.mint};color:#1F7A0E;padding:12px 26px;border-radius:99px">$1,200</span></div>`)}
<div style="margin-top:26px">${card(`<div style="font-size:34px;font-weight:700;line-height:1.3">En la práctica: <span style="color:${C.lime}">el triple</span> de un día normal.</div>`, 'n')}</div>
</div>${LEY('Art. 75 LFT')}${logo}`);
add('fes_04', `${BG}${CNT(4, 5)}${K('Para no fallar', 170, C.b)}${H('3 cosas que RRHH<br>hace antes del 16.', 220, 84)}
${lista([fila(1, 'Acordar quién trabaja ese día', 'La ley pide definirlo con el equipo (art. 75).'), fila(2, 'Registrar entrada y salida de quien sí vino', 'Sin registro no puedes probar quién trabajó.'), fila(3, 'Pagarlo en la misma quincena', 'Cierra el 15 y el festivo cae al día siguiente: ojo con el corte.')], 520)}
${logo}`);
add('fes_05', cierre(`Que el festivo no<br>se te ${GD('escape')} en<br>la quincena.`, 'CheckONOFF registra quién trabajó y te entrega la pre-nómina con días, horas y extras listas para revisar.'));

// ═════ JUE 22 · carrusel hora de comida ═════
add('com_01', `${ph('mx_pensando', -120)}
${bb(40, 140, 'w l', 'Salgo a comer 1 h 🌮')}
${bb(520, 290, 'm r', '¿Y si como en<br>mi lugar?', 'r')}
${ast(70, 470, .6)}
<div class="box n" style="bottom:140px;font-size:58px">¿La hora de comida cuenta como jornada? ${G('Depende.')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">Te explicamos en 4 láminas →</div></div>
${logo}`);
add('com_02', `${BG}${CNT(2, 5)}${K('Lo que dice la ley', 170)}${H(`Media hora de<br>descanso, ${GD('mínimo.')}`, 220, 92)}
${lista([card(`<div style="font-size:40px;font-weight:700;line-height:1.25">En jornada continua, el trabajador tiene derecho a un descanso de <span style="color:${C.b}">al menos 30 minutos.</span></div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 63 LFT</div>`),
  card(`<div style="font-size:38px;font-weight:700;line-height:1.25">La pregunta clave es: <span style="color:${C.lime}">¿puede salir del centro de trabajo</span> en ese tiempo?</div>`, 'n')], 560)}
${logo}`);
add('com_03', `${BG}${CNT(3, 5)}${K('Caso 1 · Sí cuenta', 170, C.r)}${H(`Si no puede salir,<br>${GD('es jornada.')}`, 220, 92)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Cuando el trabajador no puede salir del lugar en su descanso o comida, ese tiempo <span style="color:${C.r}">se cuenta como trabajado.</span></div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 64 LFT</div>`),
  card(`<div style="font-size:30px;font-weight:700;opacity:.6;letter-spacing:.08em">EJEMPLO · 9:00 A 18:00</div><div style="font-size:38px;font-weight:600;margin-top:14px;line-height:1.3">Come en su puesto para cubrir el teléfono = <b>9 h de jornada</b>. Con un máximo diario de 8 h, esa hora es <b style="color:${C.b}">tiempo extra.</b></div>`)], 540)}
${logo}`);
add('com_04', `${BG}${CNT(4, 5)}${K('Caso 2 · No cuenta', 170)}${H(`Si sale libremente,<br>${GD('no es jornada.')}`, 220, 88)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Si puede irse a comer donde quiera, esa hora no se suma: <b>9:00 a 18:00 con 1 h de comida = 8 h.</b></div>`),
  card(`<div style="font-size:36px;font-weight:700;line-height:1.3">💡 Tip: registra la <span style="color:${C.lime}">salida y el regreso</span> de la comida. Es tu prueba si un día te reclaman horas extra.</div>`, 'n')], 540)}
${logo}`);
add('com_05', cierre(`Cada pausa,<br>${GD('registrada.')}`, 'Con CheckONOFF tu equipo checa entradas, salidas y comida desde el celular, WhatsApp o tu checador, y tú ves las horas reales.'));

// ═════ JUE 22 · Para RRHH: listas de asistencia ═════
add('lis_01', `${ph('mx_enserio', -60)}
${bb(40, 150, 'w l', 'Listas de 2024… ¿se tiran? 🗑️', 'l')}
${ast(930, 360, .7)}
<div class="box n" style="bottom:140px;font-size:56px">¿Cuánto tiempo debes ${G('guardar')} las listas de asistencia?<div style="font-size:32px;font-weight:600;margin-top:16px;opacity:.85">Para RRHH · Desliza →</div></div>
${logo}`);
add('lis_02', `${BG}${CNT(2, 3)}${K('La respuesta', 170)}${H(`El último año<br>${GD('+ 1 año más.')}`, 220, 92)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Los controles de asistencia se conservan durante <span style="color:${C.b}">el último año de la relación laboral</span> y <span style="color:${C.b}">un año después</span> de que termina.</div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 804 fr. III LFT</div>`),
  card(`<div style="font-size:36px;font-weight:700;line-height:1.3">Si el trabajador sigue activo, guarda <span style="color:${C.lime}">siempre</span> al menos los últimos 12 meses.</div>`, 'n')], 560)}
${logo}`);
add('lis_03', `${BG}${CNT(3, 3)}${K('Por qué importa', 170, C.r)}${H(`Si no los tienes,<br>${GD('pierdes la prueba.')}`, 220, 88)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Si en un juicio no los presentas, se presume cierto lo que diga el trabajador sobre su jornada.</div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 805 LFT</div>`),
  card(`<div style="font-size:34px;font-weight:700;line-height:1.3">📂 En la nube no se mojan, no se pierden y los encuentras en segundos.</div>`, 'm')], 560)}
<div style="position:absolute;left:72px;bottom:66px;font-size:26px;font-weight:700;opacity:.75">📌 Guárdalo para tu próxima auditoría</div>${logo}`);

// ═════ VIE 23 · carrusel producto: checar sin internet ═════
add('sin_01', `${ph('mx_tel', -160)}
${bb(40, 130, 'w l', 'Sin señal en la obra 📵')}
${bb(600, 260, 'm r', '¿Y cómo checa?', 'r')}
${ast(70, 420, .6)}
<div class="box n" style="bottom:140px;font-size:58px">Tu equipo puede checar ${G('aunque no haya internet.')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">Así funciona →</div></div>
${logo}`);
add('sin_02', `${BG}${CNT(2, 5)}${K('1 · App en el celular', 170)}${H(`Ubicación<br>${GD('+ foto.')}`, 220, 96)}
${lista([fila('📍', 'Geocercas', 'Solo puede checar dentro de la ubicación que definas: sucursal, obra o cliente.'), fila('📸', 'Foto al checar', 'Adiós a "checa por mí".'), fila('📱', 'Android y iPhone', 'El equipo usa su propio celular.')], 520)}
${logo}`);
add('sin_03', `${BG}${CNT(3, 5)}${K('2 · Sin internet', 170)}${H(`Se guarda y se<br>${GD('sube solo.')}`, 220, 96)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${560 / Z}px;display:flex;flex-direction:column;gap:26px">
${card(`<div style="display:flex;align-items:center;gap:26px;font-size:38px;font-weight:700"><span style="font-size:60px">📵</span>Checa sin señal: el registro queda guardado en el teléfono con su hora real.</div>`)}
${card(`<div style="display:flex;align-items:center;gap:26px;font-size:38px;font-weight:700"><span style="font-size:60px">📶</span>Al volver la señal, se sincroniza solo con la nube.</div>`, 'n')}
</div>${logo}`);
add('sin_04', `${BG}${CNT(4, 5)}${K('3 · Tú eliges cómo', 170)}${H(`Celular, WhatsApp<br>o ${GD('tu checador.')}`, 220, 88)}
${lista([fila('💬', 'Por WhatsApp', 'Para quien no quiere instalar nada.'), fila('🖐️', 'Tu checador biométrico', 'El que ya tienes, conectado a la nube.'), fila('📊', 'Todo en un solo panel', 'Y la pre-nómina sale de ahí, sin capturar a mano.')], 520)}
${logo}`);
add('sin_05', cierre(`Pruébalo con<br>tu equipo ${GD('gratis.')}`, '14 días sin costo y sin tarjeta. Funciona en todos los planes: app, WhatsApp y checador.'));

// ═════ VIE 23 · Para RRHH: lactancia ═════
add('lac_01', `${ph('u_YlgfoL_5iRs', -260)}
${bb(560, 150, 'm r', 'Regreso de mi<br>incapacidad 👶', 'r')}
${ast(70, 360, .6)}
<div class="box n" style="bottom:140px;font-size:56px">Lactancia en el trabajo: ${G('lo que tu empresa debe dar.')}<div style="font-size:32px;font-weight:600;margin-top:16px;opacity:.85">Para RRHH · Desliza →</div></div>
${logo}`);
add('lac_02', `${BG}${CNT(2, 3)}${K('Lo que dice la ley', 170)}${H(`2 descansos de<br>${GD('30 minutos.')}`, 220, 92)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Hasta por <span style="color:${C.b}">6 meses</span>, la trabajadora tiene dos reposos extra al día de media hora cada uno para alimentar a su bebé.</div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 170 fr. IV LFT</div>`),
  card(`<div style="font-size:36px;font-weight:700;line-height:1.3">En un lugar <span style="color:${C.lime}">adecuado e higiénico</span> que designe la empresa.</div>`, 'n')], 560)}
${logo}`);
add('lac_03', `${BG}${CNT(3, 3)}${K('Si no hay lugar', 170, C.b)}${H(`1 hora menos<br>${GD('de jornada.')}`, 220, 92)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Si no es posible darle el espacio, se acuerda con ella reducir su jornada <b>una hora al día</b> durante ese periodo.</div>`),
  card(`<div style="font-size:34px;font-weight:700;line-height:1.3">💡 Ajusta su horario en tu sistema para que <b>no le cuente como retardo ni salida anticipada.</b></div>`, 'm')], 560)}
<div style="position:absolute;left:72px;bottom:66px;font-size:26px;font-weight:700;opacity:.75">📌 Compártelo con quien lleva la nómina</div>${logo}`);

// ═════ SÁB 24 · carrusel aguinaldo ═════
add('agu_01', `${ph('u_N_l8ldK_Vmc', -40)}
${bb(40, 130, 'w l', 'Entró en junio… 🤔')}
${bb(600, 260, 'm r', '¿Le toca<br>aguinaldo?', 'r')}
${ast(930, 470, .7)}
<div class="box n" style="bottom:140px;font-size:58px">Aguinaldo 2026: el cálculo ${G('en 3 pasos.')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">Con ejemplo →</div></div>
${logo}`);
add('agu_02', `${BG}${CNT(2, 5)}${K('Paso 1', 170)}${H(`Mínimo<br>${GD('15 días de salario.')}`, 220, 88)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Es el piso de la ley. Si tu contrato o política da más (20, 30 días), <span style="color:${C.b}">manda lo que sea mayor.</span></div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 87 LFT</div>`),
  card(`<div style="font-size:36px;font-weight:700;line-height:1.3">Se paga <span style="color:${C.lime}">antes del 20 de diciembre.</span></div>`, 'n')], 560)}
${logo}`);
add('agu_03', `${BG}${CNT(3, 5)}${K('Paso 2', 170)}${H(`¿No trabajó<br>${GD('todo el año?')}`, 220, 92)}
${lista([card(`<div style="font-size:38px;font-weight:700;line-height:1.25">Le toca la parte <b>proporcional</b> al tiempo trabajado, aunque ya no esté en la empresa en diciembre.</div><div style="font-size:28px;opacity:.65;margin-top:12px">Art. 87 LFT</div>`),
  card(`<div style="font-size:40px;font-weight:800;text-align:center">15 × días trabajados ÷ 365</div>`, 'm')], 560)}
${logo}`);
add('agu_04', `${BG}${CNT(4, 5)}${K('Paso 3 · ejemplo', 170)}${H(`Entró el 1 de julio,<br>${GD('gana $400 diarios.')}`, 220, 84)}
<div style="position:absolute;zoom:${Z};left:${72 / Z}px;right:${72 / Z}px;top:${540 / Z}px">
${card(`<div style="display:flex;justify-content:space-between;font-size:40px;font-weight:600"><span>Días trabajados en 2026</span><b>184</b></div>
<div style="display:flex;justify-content:space-between;font-size:40px;font-weight:600;margin-top:18px"><span>15 × 184 ÷ 365</span><b>7.56 días</b></div>
<div style="height:2px;background:#E3E8EE;margin:26px 0"></div>
<div style="display:flex;justify-content:space-between;align-items:center;font-size:44px;font-weight:800"><span>Aguinaldo</span><span style="background:${C.mint};color:#1F7A0E;padding:12px 26px;border-radius:99px">$3,024.66</span></div>`)}
<div style="margin-top:26px">${card(`<div style="font-size:32px;font-weight:700;line-height:1.3">¿Renunció en octubre? También le toca: su parte proporcional va en el finiquito.</div>`, 'n')}</div>
</div>${logo}`);
add('agu_05', cierre(`Llega a diciembre<br>con los ${GD('días reales.')}`, 'CheckONOFF guarda la asistencia de todo el año: ingresos, faltas e incapacidades a la mano para tu cálculo.'));

// ═════ DOM 25 · carrusel 5 señales ═════
add('sen_01', `${ph('mx_estres', -120)}
${bb(40, 130, 'w l', 'Asistencia_FINAL_v7.xlsx')}
${bb(560, 270, 'm r', '¿Quién checó<br>por quién? 😵', 'r')}
${ast(70, 450, .6)}
<div class="box n" style="bottom:140px;font-size:56px">5 señales de que tu control de asistencia ${G('ya no da para más.')}<div style="font-size:34px;font-weight:600;margin-top:16px;opacity:.85">¿Cuántas tienes? →</div></div>
${logo}`);
add('sen_02', `${BG}${CNT(2, 4)}${K('Señales 1 a 3', 170, C.r)}${H('Si te pasa esto,<br>es momento.', 220, 88)}
${lista([fila(1, 'Excel con 7 versiones "FINAL"', 'Y nadie sabe cuál es la buena.'), fila(2, 'Listas en papel que nadie firma', 'O firman todo el viernes de golpe.'), fila(3, 'Sucursales que reportan por WhatsApp', 'Fotos de libretas a las 11 de la noche.')], 520)}
${logo}`);
add('sen_03', `${BG}${CNT(3, 4)}${K('Señales 4 y 5', 170, C.r)}${H('Y las más caras.', 220, 88)}
${lista([fila(4, 'Sospechas de "checa por mí"', 'Pagas horas que nadie trabajó.'), fila(5, 'Cerrar la quincena te toma más de un día', 'Capturar, cuadrar, corregir y volver a capturar.'),
  card(`<div style="font-size:34px;font-weight:700;line-height:1.3">⚠️ Y desde el 1 de enero de 2027 el registro de jornada debe ser <span style="color:${C.lime}">electrónico.</span></div><div style="font-size:24px;opacity:.7;margin-top:8px">Art. 132 fr. XXXIV LFT</div>`, 'n')], 520)}
${logo}`);
add('sen_04', cierre(`Si tuviste 2 o más,<br>${GD('hablemos.')}`, 'CheckONOFF: tu equipo checa por app, WhatsApp o checador, y tú cierras la quincena con la pre-nómina lista.'));

// ═════ HISTORIAS (1080×1920) ═════
add('h21', historia('mx_taller', 0, 'PREGUNTA RÁPIDA', `¿Tu empresa abre el ${'<span style="color:#7DD818">16 de noviembre?</span>'}`, 'Responde: sí o no 💬'), 1920);
add('h22', historia('mx_pensando', -60, 'NUEVO POST', `¿La comida cuenta como ${'<span style="color:#7DD818">jornada?</span>'}`, 'La respuesta en el feed 👆'), 1920);
add('h23', historia('mx_tel', -80, '¿TU EQUIPO ESTÁ EN CAMPO?', `Checa ${'<span style="color:#7DD818">sin internet</span>'} y sin papel.`, 'Responde "campo" y te cuento cómo 💬'), 1920);
add('h24', historia('mx_laptop', -60, 'QUIZ DE RRHH', `El aguinaldo se paga antes del… ${'<span style="color:#7DD818">¿15, 20 o 31 de dic?</span>'}`, 'Responde y te digo si acertaste'), 1920);
add('h25', historia('mx_estres', -60, 'DOMINGO DE CONFESIONES', `¿Cuántas de las ${'<span style="color:#7DD818">5 señales</span>'} tienes?`, 'Responde con el número 👀'), 1920);

(async () => {
  const OUT = path.join(__dirname, 'out_semana43'); fs.mkdirSync(OUT, { recursive: true });
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
