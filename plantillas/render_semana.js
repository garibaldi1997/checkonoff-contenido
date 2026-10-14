const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const src = fs.readFileSync(path.join(__dirname, 'render2.js'), 'utf8');
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');
const CSS = src.slice(src.indexOf('const CSS = `') + 13, src.indexOf('`;', src.indexOf('const CSS = `')));
const OUT = path.join(__dirname, 'out_semana'); fs.mkdirSync(OUT, { recursive: true });
const brand = `<div class="brand"><div class="tile"><img src="${LOGO}"></div><span>CheckONOFF</span></div>`;
const count = (n, t) => `<div class="count">${n}/${t}</div>`;
const H = 1350, SH = 1920;
const S = [];
const add = (name, h, cls, body) => S.push([name, h, `<div class="f ${cls}">${body}</div>`]);

/* ===== C1 · 5 errores al cerrar la quincena ===== */
add('c1_01', H, 'dark', `${brand}${count(1,7)}
<div style="margin-top:auto;align-self:flex-start">
  <div class="icon">⚠️</div>
  <div class="h h1" style="margin-top:56px">5 errores que cometes al <span style="color:#FF4B3E">cerrar la quincena</span></div>
  <div class="sub" style="margin-top:30px;font-size:44px;color:#fff">(y cómo evitarlos)</div>
  <div class="pill grn" style="margin-top:56px">Desliza →</div>
</div>`);
const err = [
  ['Capturar la asistencia a mano', 'Tarjetas, reportes y mensajes de cada sucursal… y horas de captura en Excel.', 'Centraliza las checadas de todas las sucursales en un solo registro.'],
  ['Calcular el tiempo extra “a ojo”', 'Un error aquí sale directo en el recibo y en una posible demanda.', 'Separa las horas dobles (primeras 9 de la semana) de las triples.'],
  ['No documentar retardos y faltas', 'Lo que no está registrado no lo puedes probar.', 'Cada incidencia con fecha, hora y evidencia.'],
  ['Mezclar permisos con faltas', 'Un permiso con goce descontado como falta es un riesgo legal.', 'Registra los permisos aprobados por separado, con firma.'],
  ['Cerrar todo el último día', 'El jueves en la noche no es momento de descubrir errores.', 'Revisa las incidencias cada mañana, no el día del corte.'],
];
err.forEach(([t, d, fix], i) => add(`c1_0${i + 2}`, H, i % 2 ? 'dark' : 'cream', `${brand}${count(i + 2, 7)}
  <div style="margin-top:auto;align-self:flex-start;width:100%">
    <div class="h" style="font-size:300px;line-height:.85;color:#E21B20">${i + 1}</div>
    <div class="h h2" style="margin-top:30px">${t}</div>
    <div class="sub" style="margin-top:26px;font-size:38px">${d}</div>
    <div class="card" style="margin-top:44px;padding:30px 36px;display:flex;gap:20px;align-items:flex-start">
      <span style="font-size:44px">✅</span><div><b style="font-size:26px;letter-spacing:3px;color:#34B614">CÓMO EVITARLO</b><div style="font-size:36px;font-weight:600;margin-top:8px;line-height:1.3">${fix}</div></div>
    </div>
  </div><div style="height:30px"></div>`));
add('c1_07', H, 'green', `${brand}${count(7,7)}
<div style="margin:auto 0;text-align:center">
  <div class="h h2">¿Cuántos de estos cometes en tu empresa? 👇</div>
  <div class="sub" style="margin-top:30px;color:#111C3B">Cuéntanos en comentarios. Con CheckONOFF la pre-nómina sale en un clic, sin capturas a mano.</div>
  <div class="pill blk" style="margin-top:56px;font-size:42px;padding:28px 52px">Prueba 14 días gratis →</div>
  <div style="margin-top:28px;font-size:36px;font-weight:700">checkonoff.mx</div>
</div>`);

/* ===== C2 · Checklist RRHH para 46 h en 2027 ===== */
add('c2_01', H, 'green', `${brand}${count(1,6)}
<div style="margin:auto 0;text-align:center">
  <div class="h h3" style="color:#fff">Desde el 1 de enero de 2027</div>
  <div class="big" style="font-size:340px">46 h</div>
  <div class="h h3" style="color:#fff">máximo por semana</div>
  <div class="pill blk" style="margin-top:56px">Checklist para RRHH →</div>
</div>`);
const chk = [
  ['Mide la jornada real de hoy', '¿Cuántas horas trabaja de verdad cada puesto? Sin datos, no hay plan.'],
  ['Rediseña turnos y roles', 'Reparte las horas sin dejar áreas ni sucursales sin cobertura.'],
  ['Actualiza contratos y reglamento', 'Horarios, descansos y reglas de tiempo extra alineados a la nueva jornada.'],
  ['Controla el tiempo extra', 'Con menos horas ordinarias, el tiempo extra se dispara si no lo vigilas.'],
];
chk.forEach(([t, d], i) => add(`c2_0${i + 2}`, H, i % 2 ? 'dark' : 'cream', `${brand}${count(i + 2, 6)}
  <div style="margin:auto 0;align-self:flex-start;width:100%">
    <div style="display:flex;align-items:center;gap:26px"><div style="width:120px;height:120px;border-radius:30px;background:#34B614;display:grid;place-items:center;font-size:70px;color:#fff;font-weight:900">✓</div>
      <div style="font-size:34px;font-weight:700;letter-spacing:4px;color:#34B614">PASO ${i + 1} DE 4</div></div>
    <div class="h h2" style="margin-top:46px">${t}</div>
    <div class="sub" style="margin-top:30px;font-size:42px">${d}</div>
  </div>`));
add('c2_06', H, 'dark', `${brand}${count(6,6)}
<div style="margin:auto 0;text-align:center">
  <div class="icon" style="margin:0 auto">📌</div>
  <div class="h h2" style="margin-top:50px">Guarda este checklist y compártelo con tu equipo de RRHH.</div>
  <div class="sub" style="margin-top:30px">CheckONOFF te muestra las horas trabajadas y el tiempo extra de cada colaborador, por sucursal.</div>
  <div class="pill grn" style="margin-top:56px;font-size:42px;padding:28px 52px">Prueba 14 días gratis →</div>
  <div style="margin-top:28px;font-size:36px;font-weight:700">checkonoff.mx</div>
</div>`);

/* ===== Historias ===== */
add('st_pregunta', SH, 'green', `${brand}
<div style="margin:auto 0;text-align:center">
  <div class="icon" style="margin:0 auto">💬</div>
  <div class="pill blk" style="margin-top:50px">Pregunta para RRHH</div>
  <div class="h h2" style="margin-top:50px">¿Cuántas horas te toma cerrar la pre-nómina?</div>
  <div class="sub" style="margin-top:40px;color:#111C3B">Respóndenos por mensaje directo 👇</div>
</div>`);
add('st_tip', SH, 'dark', `${brand}
<div style="margin:auto 0;text-align:center">
  <div class="icon" style="margin:0 auto">💡</div>
  <div class="pill grn" style="margin-top:50px">Tip de RRHH para el lunes</div>
  <div class="h h2" style="margin-top:50px">Revisa las incidencias <span class="gr">cada mañana</span>, no el día del corte.</div>
  <div class="sub" style="margin-top:40px">10 minutos diarios te ahorran el jueves en la noche.</div>
</div>`);
add('st_nuevo_c1', SH, 'cream', `${brand}
<div style="margin:auto 0;text-align:center">
  <div class="pill blk">🆕 Nuevo en el feed</div>
  <div class="h h2" style="margin-top:50px">5 errores que cometes al <span class="gr">cerrar la quincena</span></div>
  <div class="card" style="margin:60px auto 0;width:640px;padding:40px;text-align:left">
    ${['Captura a mano','Tiempo extra “a ojo”','Faltas sin documentar','Permisos como faltas','Todo el último día'].map((t,i)=>`<div style="font-size:36px;font-weight:600;margin:14px 0"><span style="color:#34B614;font-weight:900">${i+1}.</span> ${t}</div>`).join('')}
  </div>
  <div class="sub" style="margin-top:40px">Ve a nuestro perfil para verlo completo 👆</div>
</div>`);
add('st_nuevo_c2', SH, 'green', `${brand}
<div style="margin:auto 0;text-align:center">
  <div class="pill blk">🆕 Nuevo en el feed</div>
  <div class="big" style="font-size:300px;margin-top:40px">46 h</div>
  <div class="h h2" style="margin-top:20px">Checklist de RRHH para la jornada de 2027</div>
  <div class="sub" style="margin-top:40px;color:#111C3B">4 pasos para preparar a tu empresa. Velo en nuestro perfil 👆</div>
</div>`);

(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  for (const [n, h, body] of S) {
    await p.setViewportSize({ width: 1080, height: h });
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}.f{width:1080px;height:${h}px}</style></head><body>${body}</body></html>`);
    await p.waitForTimeout(100); await p.screenshot({ path: path.join(OUT, n + '.png') }); console.log('ok', n);
  }
  await b.close();
})();
