// Innova-Tec México v2: estilo anuncio de producto (titulares fuertes, tarjetas de app) e infografía útil.
// Uso: node innovatec/render2.js
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const R = path.resolve(__dirname, '..'), U = p => 'file://' + path.join(R, p);
const AZ = '#0057D9', AZO = '#003C99', AM = '#FFC21A', GR = '#F1F1EC', TX = '#111';
const head = (w, h, bg) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:NU;font-weight:900;src:url(${U('marca_personal/nunito_900.woff2')}) format('woff2')}
${[400,500,600,700,800].map(w=>`@font-face{font-family:IT;font-weight:${w};src:url(${U('plantillas/fonts_it_'+w+'.ttf')})}`).join('')}
*{margin:0;padding:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;overflow:hidden;font-family:IT,sans-serif;background:${bg};color:${TX};position:relative}
.h{font-family:NU;font-weight:900;letter-spacing:-.015em;line-height:1.02}
.flecha{position:absolute;right:70px;top:70px;width:76px;height:76px;border-radius:50%;background:${AZ};display:grid;place-items:center}
.marca{position:absolute;left:80px;bottom:70px;font-family:NU;font-weight:900;font-size:40px;color:${AZO};letter-spacing:.01em}
.marca span{color:${AM};}
.marca small{display:block;font-family:IT;font-weight:500;font-size:18px;color:#555;letter-spacing:0;margin-top:4px}
.card{background:#fff;border-radius:22px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:22px}
.btn{background:${AM};border-radius:10px;text-align:center;font-weight:700;font-size:17px;padding:10px;margin-top:14px}
.tel{width:430px;height:860px;border-radius:58px;background:#111;padding:16px;box-shadow:0 30px 60px rgba(0,0,0,.25)}
.pant{width:100%;height:100%;border-radius:44px;background:#fff;overflow:hidden;position:relative}
.bar{height:96px;padding:46px 26px 0;font-weight:700;font-size:22px;color:#fff}
</style></head><body>`;
const flecha = `<div class="flecha"><svg width="38" height="38" viewBox="0 0 38 38"><path d="M8 19h20M20 10l9 9-9 9" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
const marca = `<div class="marca">INNOVA-TEC <span>MÉXICO</span><small>Innova-Tec Industrial y Comercial de México, S.A. de C.V.</small></div>`;
const checadas = [['Ana R.','08:01','Entrada','#1E9A0B'],['Luis M.','08:04','Entrada','#1E9A0B'],['Karla P.','08:17','Retardo','#E08A00'],['Jorge S.','14:00','Comida','#0057D9'],['Ana R.','17:02','Salida','#555']];
const ui_check = (n=5, f=20) => checadas.slice(0,n).map(([a,h,t,c])=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid #eee;font-size:${f}px"><div style="display:flex;align-items:center;gap:12px"><div style="width:${f*1.8}px;height:${f*1.8}px;border-radius:50%;background:#E6EEF9;display:grid;place-items:center;font-weight:700;color:${AZ};font-size:${f*.8}px">${a[0]}</div><div><b>${a}</b><div style="font-size:${f*.75}px;color:#888">📍 Sucursal Centro</div></div></div><div style="text-align:right"><b>${h}</b><div style="font-size:${f*.75}px;color:${c};font-weight:700">${t}</div></div></div>`).join('');
const chat = [['in','Hola, ¿tienen servicio a domicilio?'],['out','¡Hola! Sí, de 9:00 a 21:00. ¿A qué colonia sería?'],['in','Lomas, ¿cuánto tarda?'],['out','Entre 30 y 40 min. Te paso con Mariana para confirmar tu pedido. 🙌']];
const ui_chat = (f=20) => chat.map(([d,t])=>`<div style="display:flex;justify-content:${d=='in'?'flex-start':'flex-end'};margin:10px 0"><div style="max-width:78%;background:${d=='in'?'#fff':'#D9FDD3'};border-radius:14px;padding:10px 14px;font-size:${f}px;line-height:1.35;box-shadow:0 1px 1px rgba(0,0,0,.08)">${t}</div></div>`).join('');

const S = {};
S['c1'] = () => head(1080,1350,GR) + flecha + `
<div style="position:absolute;left:80px;top:150px;right:80px">
<div class="h" style="font-size:96px;color:${AZ}">¿Un sistema para la asistencia y otro para WhatsApp?</div>
<div class="h" style="font-size:50px;margin-top:28px">Conoce las soluciones de Innova-Tec México</div></div>
<div style="position:absolute;left:80px;right:80px;top:700px;background:${AZ};border-radius:32px;padding:36px;display:grid;grid-template-columns:1fr 1fr;gap:28px">
<div class="card"><div style="font-weight:800;font-size:26px">CheckONOFF</div><div style="font-size:16px;color:#666;margin-bottom:6px">Asistencia y prenómina</div>${ui_check(3,17)}<div class="btn">Ver cómo funciona</div></div>
<div class="card" style="background:#EFEAE2"><div style="font-weight:800;font-size:26px">Dieloxia</div><div style="font-size:16px;color:#666;margin-bottom:6px">WhatsApp con IA</div>${ui_chat(16).split('</div></div>').slice(0,3).join('</div></div>')}</div></div><div class="btn" style="margin-top:6px">Ver cómo funciona</div></div>
</div>` + marca + `</body></html>`;
S['c2'] = () => head(1080,1350,GR) + flecha + `
<div style="position:absolute;left:80px;top:150px;width:470px">
<div class="h" style="font-size:84px;color:${AZ}">Asistencia y prenómina en una sola app.</div>
<div class="h" style="font-size:40px;margin-top:30px;line-height:1.15">Checadas con foto y ubicación. Retardos y horas extra calculados solos.</div>
<div style="margin-top:36px;display:inline-block;background:${AM};font-weight:800;font-size:28px;padding:14px 26px;border-radius:14px">CheckONOFF</div></div>
<div style="position:absolute;right:70px;top:240px"><div class="tel"><div class="pant"><div class="bar" style="background:#1E9A0B">Checadas de hoy</div><div style="padding:6px 22px">${ui_check(5,20)}
<div style="margin-top:22px;background:#F4F7F4;border-radius:16px;padding:16px;font-size:19px"><b>Resumen</b><div style="display:flex;justify-content:space-between;margin-top:8px"><span>Presentes</span><b>42</b></div><div style="display:flex;justify-content:space-between"><span>Retardos</span><b style="color:#E08A00">3</b></div><div style="display:flex;justify-content:space-between"><span>Horas extra</span><b>6.5 h</b></div></div></div></div></div></div>` + marca + `</body></html>`;
S['c3'] = () => head(1080,1350,GR) + flecha + `
<div style="position:absolute;left:80px;top:150px;width:470px">
<div class="h" style="font-size:84px;color:${AZ}">Tu WhatsApp responde las 24 horas.</div>
<div class="h" style="font-size:40px;margin-top:30px;line-height:1.15">La IA contesta lo frecuente y pasa a tu equipo lo que necesita una persona.</div>
<div style="margin-top:36px;display:inline-block;background:${AM};font-weight:800;font-size:28px;padding:14px 26px;border-radius:14px">Dieloxia</div></div>
<div style="position:absolute;right:70px;top:240px"><div class="tel"><div class="pant" style="background:#EFEAE2"><div class="bar" style="background:#075E54">Cliente nuevo</div><div style="padding:10px 18px">${ui_chat(20)}
<div style="text-align:center;margin-top:16px"><span style="background:#fff;border-radius:10px;padding:8px 14px;font-size:16px;color:#555">Mariana tomó la conversación</span></div></div></div></div></div>` + marca + `</body></html>`;
S['c4'] = () => head(1080,1350,AZ) + `
<div style="position:absolute;left:80px;right:80px;top:180px;color:#fff">
<div class="h" style="font-size:100px">Software hecho en México, para empresas mexicanas.</div>
<div style="font-size:36px;font-weight:500;margin-top:40px;line-height:1.4;opacity:.92">Innova-Tec México desarrolla y comercializa CheckONOFF y Dieloxia.</div>
<div style="margin-top:70px;display:grid;gap:22px;font-size:34px;font-weight:700">
<div style="background:rgba(255,255,255,.12);border-radius:18px;padding:24px 30px">checkonoff.mx</div>
<div style="background:rgba(255,255,255,.12);border-radius:18px;padding:24px 30px">dieloxia.com</div>
<div style="background:${AM};color:${TX};border-radius:18px;padding:24px 30px">WhatsApp +52 440 180 2213</div></div></div>
<div class="marca" style="color:#fff">INNOVA-TEC <span>MÉXICO</span><small style="color:rgba(255,255,255,.75)">Innova-Tec Industrial y Comercial de México, S.A. de C.V.</small></div></body></html>`;

// Infografía vertical (estilo guía práctica)
const fila = (a,s,d,t,hl) => `<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;padding:14px 22px;font-size:28px;${hl?'background:'+AM+';font-weight:800;border-radius:10px':'border-bottom:1px solid rgba(255,255,255,.2)'}"><span>${a}</span><span>$${s}</span><span>$${d}</span><span>$${t}</span></div>`;
const punto = (n,t,d) => `<div style="display:flex;gap:24px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.35);border-radius:22px;padding:26px 28px;margin-bottom:20px"><div style="flex:none;width:62px;height:62px;border-radius:50%;background:${AM};color:${TX};font-family:NU;font-weight:900;font-size:34px;display:grid;place-items:center">${n}</div><div><div style="font-weight:800;font-size:31px">${t}</div><div style="font-size:23px;line-height:1.4;opacity:.9;margin-top:6px">${d}</div></div></div>`;
S['info'] = () => head(1080,1920,'#1170E8') + `
<div style="position:absolute;inset:0;padding:70px 70px;color:#fff">
<div style="display:inline-block;background:${AM};color:${TX};font-weight:800;font-size:24px;letter-spacing:.08em;padding:10px 22px;border-radius:30px">REFORMA 40 HORAS · GUÍA PRÁCTICA</div>
<div class="h" style="font-size:86px;margin-top:30px">¿Cuánto te costará la <span style="color:${AM}">hora extra</span>?</div>
<div style="font-size:28px;line-height:1.4;margin-top:22px;opacity:.95">La jornada baja de 48 a 40 horas entre 2026 y 2030. Con el mismo salario, cada hora vale más.</div>
<div style="font-weight:800;font-size:34px;margin:40px 0 20px;text-align:center">Revisa estos 4 puntos:</div>
${punto(1,'Tope de horas dobles','Hasta 4 h al día y máx. 4 días. Tope semanal: 9 h (2026-2027) que sube a 12 h en 2030.')}
${punto(2,'Horas triples','Las que pasan del tope se pagan al triple, y ahora hay un máximo de 4 por semana.')}
${punto(3,'Máximo 12 h al día','Jornada ordinaria + tiempo extra no pueden pasar de 12 h diarias.')}
${punto(4,'Registro electrónico','Desde el 01/01/2027 aplican sus reglas (art. 132 fr. XXXIV LFT).')}
<div class="h" style="font-size:46px;margin:34px 0 16px;color:${AM}">Veámoslo con un ejemplo</div>
<div style="font-size:24px;opacity:.95;margin-bottom:12px">Salario diario de $400. Hora simple = salario ÷ (horas de la semana ÷ 6):</div>
<div style="background:rgba(0,0,0,.18);border-radius:18px;padding:10px 0;color:#fff">
<div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;padding:12px 22px;font-size:22px;font-weight:700;opacity:.8"><span>Año</span><span>Simple</span><span>Doble</span><span>Triple</span></div>
${fila(2026,'50.00','100.00','150.00')}${fila(2027,'52.22','104.44','156.66')}${fila(2028,'54.57','109.14','163.71')}${fila(2029,'57.14','114.29','171.43')}<div style="color:${TX}">${fila(2030,'59.97','119.94','179.91',1)}</div></div>
<div style="font-size:19px;opacity:.8;margin-top:14px;line-height:1.35">Ejemplo con un método de cálculo que reparte la semana en 6 días. Define el criterio de tu empresa con tu contador o abogado.</div>
<div style="position:absolute;left:70px;right:70px;bottom:60px;border-top:2px solid rgba(255,255,255,.35);padding-top:24px;display:flex;justify-content:space-between;align-items:flex-end">
<div class="h" style="font-size:38px">INNOVA-TEC <span style="color:${AM}">MÉXICO</span><div style="font-family:IT;font-weight:500;font-size:17px;opacity:.8;margin-top:4px;letter-spacing:0">Innova-Tec Industrial y Comercial de México, S.A. de C.V.</div></div>
<div style="font-size:20px;font-weight:600;opacity:.9;text-align:right">Fuente: DOF 01/05/2026<br>arts. 66, 68 y 132 LFT</div></div></div></body></html>`;

(async () => {
  const b = await chromium.launch(); const dir = path.join(R,'innovatec','out2'); fs.mkdirSync(dir,{recursive:true});
  for (const k of Object.keys(S)) {
    const h = k==='info'?1920:1350; const pg = await b.newPage({viewport:{width:1080,height:h}});
    const f=path.join(dir,k+'.html'); fs.writeFileSync(f,S[k]()); await pg.goto('file://'+f,{waitUntil:'load'}); await pg.evaluate(()=>document.fonts.ready); await pg.waitForTimeout(400);
    await pg.screenshot({path:path.join(dir,k+'.jpg'),type:'jpeg',quality:92}); await pg.close(); console.log('ok',k);
  }
  await b.close();
})();
