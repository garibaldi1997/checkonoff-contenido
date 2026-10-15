// Carrusel premium: cierre de quincena (aprobado). Base en premium_base.js
const { FOTO, C, ast, bb, logo, ph, G, GD, render } = require('./premium_base');
const QR = require('./premium_base').b64('qr_registro.png', 'image/png');
const S = [];
const add = (n, html) => S.push([n, html]);

// 1 · Portada (Mandü): foto clara, caja de titular, burbujas del dolor
add('q_01', `${ph('mx_estres', -60)}
${bb(40, 440, 'w l', '47 mensajes<br>sin leer.')}
${bb(560, 90, 'm r', 'Asistencia_FINAL_v7.xlsx', 'r')}
${bb(40, 760, 'n l', 'Cuadrando checadas<br>a las 22:40 hrs.')}
${ast(920, 330, .8)}
<div class="box n" style="bottom:140px;font-size:62px">Si tu cierre de ${G('quincena')} se ve así, es momento de un cambio</div>
${logo}`);

// 2 · El problema
add('q_02', `${ph('mx_pensando', 170)}
<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(238,241,244,1) 0%,rgba(238,241,244,.95) 22%,rgba(238,241,244,0) 40%)"></div>
<div style="position:absolute;left:72px;right:72px;top:90px;font-size:78px;font-weight:800;letter-spacing:-.025em;line-height:1.04">Cinco fuentes de asistencia.<br>${GD('Ninguna coincide.')}</div>
${bb(56, 900, 'n l', '🕒 Checador')}
${bb(70, 1050, 'm l', '💬 WhatsApp')}
${bb(720, 880, 'n r', '📄 Papel', 'r')}
${bb(700, 1030, 'm r', '📊 Excel', 'r')}
${bb(380, 1170, 'm l', '📞 “¿Quién faltó en Norte?”')}
${logo.replace('class="logo"', 'class="logo" style="bottom:auto;top:-200px"')}`);

// 3 · La ley cambió
add('q_03', `<div style="position:absolute;left:0;top:0;width:1080px;height:780px;overflow:hidden"><img src="${FOTO('mx_enserio')}" style="width:1080px;position:absolute;top:-290px"></div>
<div style="position:absolute;left:0;right:0;top:700px;bottom:0;background:#fff;border-radius:48px 48px 0 0"></div>
<div style="position:absolute;left:72px;right:72px;top:770px;font-size:64px;font-weight:800;letter-spacing:-.025em;line-height:1.05">¿Ya viste lo que cambió<br>en ${GD('el tiempo extra?')}</div>
<div style="position:absolute;left:72px;right:72px;top:955px;display:flex;gap:18px">
${[['4 h', 'máx. de dobles<br>por día', 'n'], ['4 h', 'máx. de triples<br>a la semana', 'm'], ['12 h', 'tope total<br>en un día', 'n']].map(([a, t, c]) => `<div class="${c}" style="flex:1;border-radius:28px;padding:26px 24px;box-shadow:0 12px 28px rgba(17,28,59,.15)"><div style="font-size:64px;font-weight:800;letter-spacing:-.03em;color:${c === 'n' ? C.lime : C.g}">${a}</div><div style="font-size:28px;font-weight:600;line-height:1.2;margin-top:4px">${t}</div></div>`).join('')}
</div>
<div style="position:absolute;left:72px;bottom:66px;font-size:24px;opacity:.55">Arts. 66 y 68 LFT · DOF 01/05/2026</div>
${ast(930, 640, .7)}
${logo}`);

// 4 · La solución
add('q_04', `${ph('mx_feliz', -80, 'width:1300px;left:-40px')}
<div class="box" style="top:60px;font-size:60px;background:${C.g};color:#fff">Con CheckONOFF,<br>tu cierre se ve así</div>
${ast(900, 330, .7)}
${bb(48, 420, 'w l', '✅ 3 sucursales listas')}
${bb(48, 560, 'n l', '✅ Extras calculadas<br>con la LFT 2026')}
${bb(48, 740, 'm l', '✅ Pre-nómina en Excel')}
<div class="bb n r" style="right:48px;bottom:150px;font-size:34px">Viernes 17:05. A casa. 🏡</div>
${logo}`);

// 5 · Cómo checan
add('q_05', `${ph('mx_laptop', -40)}<div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(244,245,246,.97) 0%,rgba(244,245,246,.9) 22%,rgba(244,245,246,0) 38%)"></div>
<div style="position:absolute;left:72px;right:72px;top:110px;font-size:80px;font-weight:800;letter-spacing:-.025em;line-height:1.04">Tu equipo checa<br>${GD('como le acomode.')}</div>
${bb(56, 340, 'n l', '📱 App con foto')}
${bb(400, 340, 'm l', '💬 WhatsApp')}
${bb(730, 340, 'n r', '🖐️ Biométrico', 'r')}
<div class="box n" style="bottom:150px;font-size:52px">Y todo cae en ${G('un solo registro.')}<div style="font-size:30px;font-weight:500;margin-top:14px;opacity:.8">Horas, retardos, faltas y extras en automático</div></div>
${logo}`);

// 6 · CTA
add('q_06', `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#F4FBF0 0%,#DDF4D2 100%)"></div>
${ast(880, 120, 1.3)}${ast(930, 640, .6)}
<div style="position:absolute;left:72px;right:72px;top:300px;font-size:104px;font-weight:800;letter-spacing:-.03em;line-height:1.0">Recupera tus<br>noches de<br>${GD('quincena.')}</div>
<div style="position:absolute;left:72px;top:770px;font-size:38px;font-weight:500;line-height:1.35;width:820px;opacity:.85">Prueba CheckONOFF 14 días gratis.<br>Sin tarjeta. Te ayudamos a configurarlo.</div>
<div style="position:absolute;left:72px;top:960px;display:flex;gap:36px;align-items:center">
  <div style="background:#fff;border-radius:28px;padding:16px;box-shadow:0 14px 34px rgba(17,28,59,.12)"><img src="${QR}" style="width:200px;height:200px;image-rendering:pixelated;display:block"></div>
  <div><div style="background:${C.navy};color:#fff;font-size:38px;font-weight:700;padding:24px 40px;border-radius:99px">Empieza gratis →</div><div style="font-size:30px;font-weight:700;margin-top:18px;color:${C.g}">checkonoff.mx</div></div>
</div>
${logo}`);

render(S, 'out_premium');
