// Carruseles estilo competencia (Humand: frase sobre cielo; Sesame: "escalones" con pantalla de producto).
// Uso: node plantillas/competencia/render_comp.js  → salida en plantillas/competencia/out/
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const R = path.resolve(__dirname, '..', '..'), U = p => 'file://' + path.join(R, p);
const V = '#1E9A0B', V2 = '#2DB014', NV = '#111C3B';
const head = (bg) => `<!doctype html><html><head><meta charset="utf-8"><style>
${[400,500,600,700,800].map(w=>`@font-face{font-family:Kalam;src:url(${U('marca_personal/kalam_700.ttf')})}
@font-face{font-family:IT;font-weight:${w};src:url(${U('plantillas/fonts_it_'+w+'.ttf')})}`).join('')}
*{margin:0;padding:0;box-sizing:border-box} body{width:1080px;height:1350px;overflow:hidden;font-family:IT,sans-serif;position:relative;background:${bg}}
.cielo{position:absolute;inset:0;background:linear-gradient(180deg,#1E9A0B 0%,#3FBF22 55%,#8EDB6E 100%)}
.nube{position:absolute;border-radius:50%;background:rgba(255,255,255,.28);filter:blur(34px)}
.kick{position:absolute;left:0;right:0;top:150px;text-align:center;color:#fff;font-weight:700;font-size:28px;letter-spacing:.22em}
.q{position:absolute;left:70px;right:70px;top:210px;text-align:center;color:#fff;font-weight:800;font-size:76px;line-height:1.06;letter-spacing:-.02em;text-shadow:0 4px 24px rgba(10,60,5,.30)}
.q small{display:block;font-size:44px;font-weight:700;margin-top:14px;opacity:.95}
.obj{position:absolute;left:50%;transform:translateX(-50%);mix-blend-mode:multiply}
.card{background:#fff;border-radius:28px;box-shadow:0 30px 70px rgba(17,28,59,.18);padding:34px}
.pill{display:inline-block;background:#1F2330;color:#fff;font-weight:600;font-size:30px;padding:12px 26px;border-radius:40px}
.h{font-weight:800;font-size:84px;letter-spacing:-.03em;color:#1F2330;line-height:1.02}
.fila{display:flex;justify-content:space-between;align-items:center;padding:16px 0;border-bottom:1px solid #EEF0F3;font-size:26px}
.av{width:52px;height:52px;border-radius:50%;background:#E8F5E3;color:${V};font-weight:800;display:grid;place-items:center;font-size:22px}
.firma{position:absolute;left:0;right:0;bottom:56px;text-align:center}
.firma img{height:110px}
.quien{display:flex;align-items:center;gap:12px;font-size:26px;color:#6B7280;margin-top:22px}
.quien b{width:40px;height:40px;border-radius:50%;background:${V};color:#fff;display:grid;place-items:center;font-size:20px}
</style></head><body>`;
const fin = `</body></html>`;
const cielo = `<div class="cielo"></div><div class="nube" style="left:-80px;top:80px;width:520px;height:200px"></div><div class="nube" style="right:-120px;top:640px;width:600px;height:240px"></div>`;
const KICK = `<div class="kick"><span style="background:#111C3B;padding:10px 22px;border-radius:30px">👻 HISTORIAS DE TERROR DE LA QUINCENA 👻</span></div>`;
const S = {};
// ---------- Carrusel A: estilo Humand ----------
S.a1 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“¿Alguien sabe a qué hora llegó Pedro el martes?”<small>(nadie sabe)</small></div>
<img class="obj" src="${U('plantillas/competencia/fotos/reloj.jpg')}" style="top:560px;width:1150px">` + fin;
S.a2 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“Te mando foto de la lista por WhatsApp.”<small>(foto borrosa, 11:48 p. m.)</small></div>
<div style="position:absolute;left:150px;right:150px;top:640px;background:#EFE7DD;border-radius:34px;padding:34px;box-shadow:0 30px 70px rgba(17,28,59,.25)">
<div style="display:flex;justify-content:flex-start"><div style="background:#fff;border-radius:18px;padding:12px;width:520px">
<div style="height:330px;border-radius:12px;background:repeating-linear-gradient(0deg,#f6f1e4 0 34px,#c9c0ad 34px 36px);filter:blur(4px);position:relative"><div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,.15),transparent 60%)"></div></div>
<div style="font-size:28px;margin-top:12px">Ahí está la lista de hoy 🙏</div><div style="text-align:right;font-size:20px;color:#888">11:48 p. m.</div></div></div>
<div style="display:flex;justify-content:flex-end;margin-top:18px"><div style="background:#D9FDD3;border-radius:18px;padding:16px 22px;font-size:28px">¿Eso es un 7 o un 1? 🤔</div></div></div>` + fin;
S.a3 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“Los registros de asistencia de 2024 están… por ahí.”</div>
<img class="obj" src="${U('plantillas/competencia/fotos/carpetas.jpg')}" style="top:560px;width:1500px;transform:translateX(-66%);-webkit-mask-image:radial-gradient(ellipse 48% 44% at 55% 52%,#000 60%,transparent 100%)">` + fin;
S.a4 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“Juan checó a las 7:59.”<small>Juan estaba de vacaciones.</small></div>
<div style="position:absolute;left:300px;top:660px;width:480px;background:#fff;padding:40px 40px 60px;font-family:monospace;font-size:30px;line-height:1.6;color:#333;box-shadow:0 30px 70px rgba(17,28,59,.25);transform:rotate(-4deg);clip-path:polygon(0 0,100% 0,100% 94%,92% 100%,84% 94%,76% 100%,68% 94%,60% 100%,52% 94%,44% 100%,36% 94%,28% 100%,20% 94%,12% 100%,4% 94%,0 100%)">
<div style="text-align:center;font-weight:700">RELOJ CHECADOR</div><div>EMPLEADO: 0147 JUAN</div><div>FECHA: 12/11</div><div style="font-size:44px;font-weight:700;text-align:center;margin-top:16px">ENT 07:59</div><div style="text-align:center;color:#c00;font-weight:700;margin-top:10px">✔ REGISTRADO</div></div>` + fin;
S.a5 = () => head('#F4F7F2') + `<div style="position:absolute;left:0;right:0;top:120px;text-align:center"><div style="font-weight:800;font-size:70px;color:${NV};letter-spacing:-.02em;line-height:1.08;padding:0 80px">Con CheckONOFF, estas historias se acaban.</div>
<div style="font-size:32px;color:#4B5563;margin-top:24px">Cada checada lleva foto, hora y ubicación.</div></div>
<div class="card" style="position:absolute;left:170px;right:170px;top:430px">
<div style="display:flex;justify-content:space-between;align-items:center"><div style="font-weight:800;font-size:30px">Checadas de hoy</div><div style="background:#E8F5E3;color:${V};font-weight:700;font-size:20px;padding:6px 14px;border-radius:20px">En vivo</div></div>
${[['P','Pedro R.','07:58','Entrada · Sucursal Centro','📸 📍'],['J','Juan M.','—','Vacaciones aprobadas',''],['A','Ana L.','08:12','Retardo · Sucursal Norte','📸 📍']].map(([i,n,h,t,e])=>`<div class="fila"><div style="display:flex;gap:16px;align-items:center"><div class="av">${i}</div><div><b>${n}</b><div style="font-size:20px;color:#888">${t}</div></div></div><div style="text-align:right"><b>${h}</b><div style="font-size:20px">${e}</div></div></div>`).join('')}
</div>
<div style="position:absolute;left:0;right:0;top:1010px;text-align:center"><div style="display:inline-block;background:${V};color:#fff;font-weight:800;font-size:32px;padding:20px 40px;border-radius:50px">Escríbenos GUÍA al WhatsApp</div><div style="font-size:26px;color:#4B5563;margin-top:14px">+52 440 180 2213 · checkonoff.mx</div></div>
<div class="firma"><img src="${U('plantillas/logo_full.png')}"></div>` + fin;
// ---------- Carrusel B: estilo Sesame (escalones) ----------
const esc = (n, t, card, quien) => head('#fff') + `<div style="position:absolute;left:80px;top:110px"><div class="pill">Paso ${n}</div><div class="h" style="margin-top:28px">${t}</div></div>
<div style="position:absolute;left:115px;right:115px;top:430px;zoom:1.28">${card}<div class="quien"><b>${quien[0]}</b>${quien}</div></div>` + fin;
const app = (titulo, cuerpo) => `<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><div style="font-size:24px;color:#9CA3AF">☰</div><div style="font-weight:800;font-size:28px;color:${V}">CheckONOFF</div><div style="font-size:24px;color:#9CA3AF">✕</div></div><div style="font-weight:700;font-size:28px;margin:6px 0 10px">${titulo}</div>${cuerpo}</div>`;
S.b1 = () => head('#fff') + `<div style="position:absolute;left:80px;top:140px;right:80px"><div class="pill" style="background:${V}">CheckONOFF en 4 pasos</div><div class="h" style="margin-top:30px;font-size:96px">De la libreta a la prenómina.</div><div style="font-size:36px;color:#4B5563;margin-top:26px;line-height:1.35">Lo que hoy te toma toda la quincena, en cuatro pasos.</div></div>
<div style="position:absolute;left:80px;right:80px;top:720px;display:grid;grid-template-columns:1fr 1fr;gap:24px">${['📱 Checan','👀 Lo ves en vivo','⏱️ Horas extra solas','📊 Prenómina lista'].map((x,i)=>`<div style="background:#F4F7F2;border-radius:24px;padding:34px;font-weight:700;font-size:34px;color:${NV}"><div style="color:${V};font-size:22px;margin-bottom:8px">PASO ${i+1}</div>${x}</div>`).join('')}</div>` + fin;
S.b2 = () => esc(1, 'Tu equipo checa desde su celular.', app('Registrar entrada', `<div style="display:flex;gap:20px;align-items:center;background:#F4F7F2;border-radius:20px;padding:20px"><div style="width:120px;height:120px;border-radius:16px;background:linear-gradient(135deg,#cfd8cf,#9fb19f);display:grid;place-items:center;font-size:52px">🤳</div><div style="font-size:26px;line-height:1.5"><b>07:58</b> · Entrada<br>📍 Obra Lomas · dentro de la zona<br>📸 Foto verificada</div></div><div style="margin-top:18px;background:${V};color:#fff;text-align:center;font-weight:800;font-size:28px;padding:18px;border-radius:16px">✓ Checada registrada</div>`), 'Luis · Supervisor de obra');
S.b3 = () => esc(2, 'Ves quién falta, en vivo.', app('Asistencia de la semana', `<div style="display:grid;grid-template-columns:150px repeat(5,1fr);gap:10px;font-size:22px;align-items:center"><div></div>${'LMMJV'.split('').map(d=>`<div style="text-align:center;color:#9CA3AF">${d}</div>`).join('')}${[['Ana',['ok','ok','r','ok','']],['Pedro',['ok','f','ok','ok','']],['Karla',['ok','ok','ok','ok','']]].map(([n,a])=>`<div><b>${n}</b></div>${a.map(x=>`<div style="height:46px;border-radius:10px;background:${x=='ok'?'#CDEBC6':x=='r'?'#FFE3A3':x=='f'?'#FFC9C9':'#F1F3F5'};display:grid;place-items:center;font-weight:800;color:#555">${x=='r'?'R':x=='f'?'F':''}</div>`).join('')}`).join('')}</div><div style="margin-top:20px;background:#FFF4DB;color:#9A6200;font-weight:700;font-size:24px;padding:14px 18px;border-radius:12px;display:inline-block">Pedro faltó el martes · Ana llegó tarde el miércoles</div>`), 'Mariana · RRHH');
S.b4 = () => esc(3, 'Las horas extra se calculan solas.', app('Horas extra · semana 47', `<div class="fila"><span>Luis M.</span><b>9 h dobles</b></div><div class="fila"><span>Luis M.</span><b style="color:#C2410C">1 h triple</b></div><div class="fila" style="border:0"><span>Karla P.</span><b>3 h dobles</b></div><div style="margin-top:14px;background:#FFE9E0;color:#C2410C;font-weight:700;font-size:24px;padding:14px 18px;border-radius:12px">⚠️ Luis pasó el tope de 9 h dobles de la semana</div>`), 'Jorge · Gerente de planta');
S.b5 = () => esc(4, 'La prenómina sale lista para Excel.', app('Prenómina · quincena 2 nov', `${[['Ana L.','15 días','0 h','1 retardo'],['Pedro R.','14 días','2 h','1 falta'],['Luis M.','15 días','10 h','—']].map(r=>`<div class="fila">${r.map((c,i)=>`<span style="${i==0?'font-weight:700;width:180px':'color:#4B5563'}">${c}</span>`).join('')}</div>`).join('')}<div style="margin-top:18px;background:${NV};color:#fff;text-align:center;font-weight:800;font-size:28px;padding:18px;border-radius:16px">⬇ Descargar Excel</div>`), 'Sofía · Nómina');
S.b6 = () => head(NV) + `<div style="position:absolute;left:80px;right:80px;top:230px;color:#fff;text-align:center"><div style="font-weight:800;font-size:92px;letter-spacing:-.03em;line-height:1.04">¿Cuánto tiempo te ahorrarías cada quincena?</div><div style="font-size:36px;opacity:.85;margin-top:34px">Te lo mostramos con los datos de tu empresa.</div>
<div style="display:inline-block;margin-top:60px;background:${V2};color:#fff;font-weight:800;font-size:36px;padding:24px 44px;border-radius:50px">Escríbenos GUÍA al WhatsApp</div><div style="font-size:30px;opacity:.85;margin-top:18px">+52 440 180 2213 · checkonoff.mx</div></div>
<div class="firma"><span style="display:inline-block;background:#fff;border-radius:18px;padding:10px 18px"><img src="${U('plantillas/logo_full.png')}" style="height:96px;display:block"></span></div>` + fin;

// ---------- Semana 48 · C: terror (vacaciones y horas extra) ----------
S.c1 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“¿Cuántos días de vacaciones le quedan a Karla?”<small>(nadie sabe, otra vez)</small></div>
<div style="position:absolute;left:140px;right:140px;top:620px;background:#fff;border-radius:18px;box-shadow:0 30px 70px rgba(10,60,5,.3);overflow:hidden;font-family:monospace;font-size:26px">
<div style="background:#1D6F42;color:#fff;padding:14px 22px;font-family:IT;font-weight:700">vacaciones_FINAL_v3 (2).xlsx</div>
${[['A','Nombre','Días','Tomados'],['1','Karla P.','12','¿8?'],['2','Luis M.','#REF!','4'],['3','Ana L.','14','—'],['4','Pedro R.','??','6']].map((r,i)=>`<div style="display:grid;grid-template-columns:60px 1fr 140px 160px;border-top:1px solid #ddd;${i==0?'background:#F1F3F5;font-weight:700':''}">${r.map(c=>`<div style="padding:14px 16px;border-left:1px solid #eee;${String(c).match(/[#?¿]/)?'color:#C00;font-weight:700':''}">${c}</div>`).join('')}</div>`).join('')}</div>` + fin;
S.c2 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“Jefe, se me olvidó checar la salida.”<small>(tercera vez esta semana)</small></div>
<div style="position:absolute;left:150px;right:150px;top:640px;background:#EFE7DD;border-radius:34px;padding:34px;box-shadow:0 30px 70px rgba(10,60,5,.3);font-size:30px">
<div style="display:flex"><div style="background:#fff;border-radius:18px;padding:16px 22px">Jefe, se me olvidó checar la salida 🙏<div style="text-align:right;font-size:20px;color:#888">9:14 p. m.</div></div></div>
<div style="display:flex;justify-content:flex-end;margin-top:16px"><div style="background:#D9FDD3;border-radius:18px;padding:16px 22px">¿A qué hora saliste?</div></div>
<div style="display:flex;margin-top:16px"><div style="background:#fff;border-radius:18px;padding:16px 22px">Como a las 7, creo 🤷</div></div></div>` + fin;
S.c3 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“¿Quién autorizó estas horas extra?”<small>(nadie)</small></div>
<div style="position:absolute;left:250px;top:640px;width:580px;background:#FFFDF4;padding:40px;border-radius:6px;box-shadow:0 30px 70px rgba(10,60,5,.3);transform:rotate(2deg);font-family:monospace;font-size:30px;line-height:1.7">
<div style="font-weight:700;text-align:center;margin-bottom:10px">NÓMINA · QUINCENA</div><div>Sueldos ........ $84,000</div><div style="color:#C00;font-weight:700">Horas extra ..... $8,000</div><div>Bonos ............ $3,500</div><div style="border-top:2px dashed #999;margin-top:10px;padding-top:10px;font-weight:700">TOTAL ........... $95,500</div></div>` + fin;
S.c4 = () => head('#3FBF22') + cielo + KICK + `<div class="q">“La lista dice que todos llegaron a las 8:00.”<small>Todos. Todos los días.</small></div>
<div style="position:absolute;left:230px;top:640px;width:620px;background:repeating-linear-gradient(0deg,#fff 0 58px,#B9D3F0 58px 60px);padding:30px 40px;box-shadow:0 30px 70px rgba(10,60,5,.3);transform:rotate(-3deg);font-family:Kalam,cursive;font-size:36px;line-height:60px;color:#1F3A93">
${['Ana ........ 8:00','Luis ....... 8:00','Pedro ..... 8:00','Karla ...... 8:00','Jorge ...... 8:00'].map(x=>`<div>${x}</div>`).join('')}</div>` + fin;
S.c5 = () => head('#F4F7F2') + `<div style="position:absolute;left:0;right:0;top:120px;text-align:center"><div style="font-weight:800;font-size:66px;color:${NV};letter-spacing:-.02em;line-height:1.08;padding:0 80px">Con CheckONOFF, estas historias también se acaban.</div>
<div style="font-size:32px;color:#4B5563;margin-top:24px">Vacaciones, salidas y horas extra, en un solo lugar.</div></div>
<div class="card" style="position:absolute;left:170px;right:170px;top:430px">
${[['🏖️','Vacaciones de Karla','8 de 12 días usados'],['⏱️','Salida de Luis','19:02 · con foto y ubicación'],['⚠️','Horas extra de la semana','Te avisa antes de pagarlas']].map(([i,a,b])=>`<div class="fila"><div style="display:flex;gap:18px;align-items:center"><div style="font-size:40px">${i}</div><div><b>${a}</b><div style="font-size:21px;color:#888">${b}</div></div></div><div style="color:${V};font-weight:800">✓</div></div>`).join('')}
</div>
<div style="position:absolute;left:0;right:0;top:1010px;text-align:center"><div style="display:inline-block;background:${V};color:#fff;font-weight:800;font-size:32px;padding:20px 40px;border-radius:50px">Escríbenos GUÍA al WhatsApp</div><div style="font-size:26px;color:#4B5563;margin-top:14px">+52 440 180 2213 · checkonoff.mx</div></div>
<div class="firma"><img src="${U('plantillas/logo_full.png')}"></div>` + fin;
// ---------- Semana 48 · D: pasos (varias sucursales) ----------
S.d1 = () => head('#fff') + `<div style="position:absolute;left:80px;top:140px;right:80px"><div class="pill" style="background:${V}">CheckONOFF en 4 pasos</div><div class="h" style="margin-top:30px;font-size:96px">5 sucursales, sin ir a ninguna.</div><div style="font-size:36px;color:#4B5563;margin-top:26px;line-height:1.35">Así controlas la asistencia de todas desde tu celular.</div></div>
<div style="position:absolute;left:80px;right:80px;top:720px;display:grid;grid-template-columns:1fr 1fr;gap:24px">${['📍 Checan en su sucursal','📊 Todas en un tablero','🔔 Alertas al momento','📁 Reporte por sucursal'].map((x,i)=>`<div style="background:#F4F7F2;border-radius:24px;padding:34px;font-weight:700;font-size:32px;color:${NV}"><div style="color:${V};font-size:22px;margin-bottom:8px">PASO ${i+1}</div>${x}</div>`).join('')}</div>` + fin;
S.d2 = () => esc(1, 'Cada quien checa en su sucursal.', app('Registrar entrada', `<div style="display:flex;gap:20px;align-items:center;background:#F4F7F2;border-radius:20px;padding:20px"><div style="width:120px;height:120px;border-radius:16px;background:linear-gradient(135deg,#cfd8cf,#9fb19f);display:grid;place-items:center;font-size:52px">📍</div><div style="font-size:26px;line-height:1.5"><b>08:02</b> · Entrada<br>Sucursal Norte · dentro de la zona<br>📸 Foto verificada</div></div><div style="margin-top:14px;background:#FFF4DB;color:#9A6200;font-weight:700;font-size:22px;padding:12px 16px;border-radius:12px">Fuera de la zona no se puede checar</div>`), 'Andrea · Encargada de sucursal');
S.d3 = () => esc(2, 'Ves todas en un solo tablero.', app('Hoy · 5 sucursales', `${[['Centro','18/18','#CDEBC6'],['Norte','11/12','#FFE3A3'],['Sur','9/9','#CDEBC6'],['Plaza','7/8','#FFE3A3'],['Aeropuerto','14/14','#CDEBC6']].map(([n,v,c])=>`<div class="fila"><span><b>${n}</b></span><span style="background:${c};border-radius:10px;padding:6px 14px;font-weight:800">${v}</span></div>`).join('')}`), 'Ricardo · Director de operaciones');
S.d4 = () => esc(3, 'Te avisa al momento.', app('Alertas', `${[['🔴','Norte: Luis no ha checado','08:20'],['🟡','Plaza: Karla llegó tarde','08:14'],['🟢','Sur: turno completo','08:00']].map(([i,a,b])=>`<div class="fila"><span>${i} ${a}</span><span style="color:#9CA3AF">${b}</span></div>`).join('')}`), 'Ricardo · Director de operaciones');
S.d5 = () => esc(4, 'Reporte por sucursal, listo para Excel.', app('Quincena · por sucursal', `${[['Centro','2 retardos','6 h extra'],['Norte','1 falta','3 h extra'],['Plaza','4 retardos','0 h extra']].map(r=>`<div class="fila">${r.map((c,i)=>`<span style="${i==0?'font-weight:700;width:160px':'color:#4B5563'}">${c}</span>`).join('')}</div>`).join('')}<div style="margin-top:18px;background:${NV};color:#fff;text-align:center;font-weight:800;font-size:28px;padding:18px;border-radius:16px">⬇ Descargar Excel</div>`), 'Sofía · Nómina');
S.d6 = () => head(NV) + `<div style="position:absolute;left:80px;right:80px;top:230px;color:#fff;text-align:center"><div style="font-weight:800;font-size:92px;letter-spacing:-.03em;line-height:1.04">¿Cuántas sucursales tienes?</div><div style="font-size:36px;opacity:.85;margin-top:34px">Te mostramos cómo se vería tu tablero.</div>
<div style="display:inline-block;margin-top:60px;background:${V2};color:#fff;font-weight:800;font-size:36px;padding:24px 44px;border-radius:50px">Escríbenos GUÍA al WhatsApp</div><div style="font-size:30px;opacity:.85;margin-top:18px">+52 440 180 2213 · checkonoff.mx</div></div>
<div class="firma"><span style="display:inline-block;background:#fff;border-radius:18px;padding:10px 18px"><img src="${U('plantillas/logo_full.png')}" style="height:96px;display:block"></span></div>` + fin;

(async () => {
  const b = await chromium.launch(); const dir = path.join(__dirname, 'out'); fs.mkdirSync(dir, { recursive: true });
  const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const k of (process.argv[2] ? process.argv.slice(2) : Object.keys(S))) {
    const f = path.join(dir, k + '.html'); fs.writeFileSync(f, S[k]()); await pg.goto('file://' + f, { waitUntil: 'load' });
    await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(300);
    await pg.screenshot({ path: path.join(dir, k + '.jpg'), type: 'jpeg', quality: 92 }); fs.unlinkSync(f); console.log('ok', k);
  }
  await b.close();
})();
