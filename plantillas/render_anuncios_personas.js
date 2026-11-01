// Anuncios por "persona" (lección Andrómeda, 01/11/2026): cada anuncio le habla a un cliente distinto,
// con su situación en las primeras palabras, otro color y otro escenario. Estilo de producto tipo Humand
// (fondo de color, titular grande, celular con la app) + la pregunta "¿Cuántos colaboradores…?" en el anuncio.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const R = path.join(__dirname);
const b64 = (f, m) => `data:${m};base64,` + fs.readFileSync(path.join(R, f)).toString('base64');
const FONTS = [500, 700, 800].map(w => `@font-face{font-family:IT;font-weight:${w};src:url(${b64(`fonts_it_${w}.ttf`, 'font/ttf')})}`).join('');
const LOGO = b64('logo.png', 'image/png');
const P = [
  { k: 'restaurante', bg: 'linear-gradient(160deg,#1b0f0a 0%,#4a1d0e 55%,#c2410c 130%)', ac: '#FDBA74', em: '🍽️', who: 'DUEÑOS DE RESTAURANTE',
    h: '¿Tu mesero llegó tarde<br>y <span>nadie lo anotó</span>?', s: 'Turnos rotativos, descansos y propinas: cada checada con foto y ubicación.',
    fila: [['Mesero · Juan', 'Entrada 8:17 · retardo 17 min', '#f97316'], ['Cocina · Ana', 'Entrada 7:58 · a tiempo', '#22c55e'], ['Barra · Luis', 'Descanso 15:00–15:30', '#38bdf8']] },
  { k: 'planta', bg: 'linear-gradient(160deg,#0b1220 0%,#12305a 60%,#1d4ed8 130%)', ac: '#93C5FD', em: '🏭', who: 'RRHH DE PLANTA Y MAQUILA',
    h: '14 horas extra<br>que <span>nadie autorizó</span>.', s: 'Míralas en tiempo real y apruébalas antes de pagarlas. Dobles y triples, calculadas solas.',
    fila: [['Línea 2 · 6 personas', '+9 h dobles esta semana', '#f59e0b'], ['Línea 4 · 3 personas', '+2 h triples ⚠️', '#ef4444'], ['Aprobadas por RRHH', '6 de 14 horas', '#22c55e']] },
  { k: 'sucursales', bg: 'linear-gradient(160deg,#052e16 0%,#14532d 55%,#34B614 135%)', ac: '#BEF264', em: '🏪', who: 'NEGOCIOS CON SUCURSALES',
    h: '3 sucursales,<br>3 libretas,<br><span>0 control</span>.', s: 'Tu equipo checa por app, WhatsApp o checador. Todo llega al mismo panel.',
    fila: [['Sucursal Centro', '8 de 8 presentes', '#22c55e'], ['Sucursal Norte', '5 de 6 · 1 falta', '#f59e0b'], ['Sucursal Sur', 'Checaron por WhatsApp', '#38bdf8']] },
  { k: 'familiar', bg: 'linear-gradient(160deg,#2a1033 0%,#6b2153 60%,#db2777 135%)', ac: '#F9A8D4', em: '👨‍👩‍👧', who: 'NEGOCIOS FAMILIARES',
    h: '¿Todavía haces<br>la lista de asistencia<br><span>a mano</span> cada sábado?', s: 'El cierre de semana sale en un clic: horas, retardos y prenómina.',
    fila: [['Cierre de semana', 'Listo en 1 clic', '#22c55e'], ['Retardos', '3 esta semana', '#f59e0b'], ['Prenómina', 'Descargar Excel', '#38bdf8']] },
  { k: 'despachos', bg: 'linear-gradient(160deg,#0f172a 0%,#1e293b 60%,#475569 140%)', ac: '#FDE68A', em: '📊', who: 'CONTADORES Y DESPACHOS',
    h: 'Tu cliente te manda<br>la asistencia en <span>fotos<br>de WhatsApp</span>.', s: 'Recibe horas, faltas e incidencias listas para calcular la nómina.',
    fila: [['Cliente · Taller Pérez', 'Prenómina lista', '#22c55e'], ['Cliente · Abarrotes', '12 colaboradores', '#38bdf8'], ['Cliente · Clínica', '2 incidencias por revisar', '#f59e0b']] },
  { k: 'obra', bg: 'linear-gradient(160deg,#1c1400 0%,#4d3a00 55%,#eab308 140%)', ac: '#FDE047', em: '🏗️', who: 'CONSTRUCTORAS Y CUADRILLAS',
    h: '¿Tu cuadrilla<br>de verdad <span>llegó a la obra</span>?', s: 'Checan con foto dentro de la geocerca, aunque en la obra no haya señal.',
    fila: [['Obra · Lomas', '12 dentro de la geocerca', '#22c55e'], ['Obra · Industrial', '1 fuera de zona', '#ef4444'], ['Sin señal', 'Se sube al reconectar', '#38bdf8']] },
];
const css = `${FONTS}*{margin:0;padding:0;box-sizing:border-box}body{width:1080px;height:1350px;font-family:IT,sans-serif;color:#fff;overflow:hidden}
.f{position:absolute;inset:0}.who{position:absolute;left:72px;top:78px;font-size:26px;font-weight:800;letter-spacing:.16em}
h1{position:absolute;left:72px;right:60px;top:140px;font-size:78px;font-weight:800;line-height:1.02;letter-spacing:-.035em}
.sub{position:absolute;left:72px;width:520px;font-size:30px;font-weight:500;line-height:1.32;opacity:.92}
.ph{position:absolute;right:-30px;width:460px;height:640px;border-radius:64px;background:#0b0f19;border:10px solid #2a2f3a;box-shadow:0 40px 90px rgba(0,0,0,.55);padding:56px 22px 0;overflow:hidden}
.ph .t{font-size:18px;font-weight:800;letter-spacing:.14em;color:#7DD818;text-align:center;margin-bottom:18px}
.row{display:flex;gap:14px;align-items:center;background:#161c29;border-radius:22px;padding:18px;margin-bottom:14px}
.dot{width:46px;height:46px;border-radius:14px;flex:none}.row b{display:block;font-size:22px}.row i{font-style:normal;font-size:18px;color:#a8b3c7}
.q{position:absolute;left:56px;right:56px;bottom:150px;background:rgba(10,14,24,.78);border:2px solid rgba(255,255,255,.12);border-radius:28px;padding:24px 28px}
.q p{font-size:28px;font-weight:700;margin-bottom:16px}.chips{display:flex;gap:12px}.chips span{flex:1;text-align:center;padding:14px 0;border-radius:99px;background:rgba(255,255,255,.12);font-size:24px;font-weight:700}
.cta{position:absolute;left:56px;right:56px;bottom:48px;height:84px;border-radius:22px;display:flex;align-items:center;justify-content:space-between;padding:0 28px;font-size:30px;font-weight:800}
.cta img{width:56px;height:56px;border-radius:14px;background:#fff;padding:4px}`;
const html = p => `<div class="f" style="background:${p.bg}"></div>
<div class="who" style="color:${p.ac}">${p.em}&nbsp; ${p.who}</div>
<h1>${p.h.replace(/<span>/g, `<span style="color:${p.ac}">`)}</h1>
<div class="sub" style="top:${140 + p.h.split('<br>').length * 80 + 40}px">${p.s}</div>
<div class="ph" style="top:${p.h.split('<br>').length > 2 ? 520 : 470}px"><div class="t">CHECKONOFF · HOY</div>${p.fila.map(r => `<div class="row"><div class="dot" style="background:${r[2]}"></div><div><b>${r[0]}</b><i>${r[1]}</i></div></div>`).join('')}</div>
<div class="q"><p>¿Cuántos colaboradores tiene tu empresa?</p><div class="chips"><span>1–10</span><span>11–50</span><span>51–200</span><span>200+</span></div></div>
<div class="cta" style="background:${p.ac};color:#111C3B"><span>Guía gratis: registro 2027 →</span><img src="${LOGO}"></div>`;
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const p of P) {
    if (process.argv[2] && p.k !== process.argv[2]) continue;
    await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html(p)}</body></html>`);
    await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(200);
    await pg.screenshot({ path: path.join(R, '..', 'campana', 'personas', `${p.k}.jpg`), type: 'jpeg', quality: 90 }); console.log('ok', p.k);
  }
  await b.close();
})();
