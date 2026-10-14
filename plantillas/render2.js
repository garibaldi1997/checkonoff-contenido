const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'out3');
fs.mkdirSync(OUT, { recursive: true });
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'logo.png')).toString('base64');

const CSS = `
.tile,.brand .t,.brand .tile{background:transparent!important;box-shadow:none!important;border-radius:0!important;overflow:visible!important}.tile img,.brand .t img,.brand img{object-fit:contain}

*{box-sizing:border-box;margin:0;padding:0}
:root{--g:#34B614;--g2:#239616;--gd:#111C3B;--ink:#111C3B;--cream:#F2F6FB;--cream2:#E7E6DC;--mut:#6B6A62}
body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
.f{position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;padding:70px 80px}
.dark{background:radial-gradient(ellipse 90% 60% at 85% 105%,rgba(52,182,20,.55),transparent 60%),radial-gradient(ellipse 60% 40% at 0% 0%,rgba(52,182,20,.18),transparent 60%),#111C3B;color:#fff}
.green{background:radial-gradient(ellipse 75% 60% at 50% 48%,#34B614 0%,#45C21F 45%,#9BDC86 80%,#DDF3D6 100%);color:var(--ink)}
.cream{background:radial-gradient(ellipse 70% 50% at 100% 0%,rgba(52,182,20,.14),transparent 70%),var(--cream);color:var(--ink)}
.brand{display:flex;align-items:center;gap:16px;font-size:34px;font-weight:600;letter-spacing:-1px;z-index:3}
.brand .tile{width:64px;height:64px;border-radius:16px;background:#111C3B;display:grid;place-items:center;overflow:hidden}
.brand .tile img{width:58px}
.dark .brand .tile{box-shadow:0 0 0 2px rgba(255,255,255,.12)}
.count{position:absolute;top:70px;right:80px;background:var(--ink);color:#fff;font-size:28px;font-weight:600;padding:12px 22px;border-radius:999px;z-index:3}
.dark .count{background:rgba(255,255,255,.12)}
.h{font-weight:700;letter-spacing:-.045em;line-height:1.02}
.h1{font-size:112px}.h2{font-size:92px}.h3{font-size:72px}.h4{font-size:56px}
.c{text-align:center}
.sub{font-size:40px;line-height:1.3;font-weight:500;letter-spacing:-.02em}
.dark .sub{color:#C5CCDA}.cream .sub{color:var(--mut)}
.gr{color:var(--g)} .dark .gr{color:#7DD818}
.pill{display:inline-flex;align-items:center;gap:14px;border-radius:999px;font-weight:600;letter-spacing:-.02em;padding:24px 44px;font-size:38px;white-space:nowrap}
.pill.blk{background:var(--ink);color:#fff}
.pill.grn{background:var(--g);color:var(--gd)}
.pill.out{border:3px solid currentColor}
.pill.wht{background:#fff;color:var(--ink)}
.icon{width:170px;height:170px;border-radius:44px;background:#fff;display:grid;place-items:center;font-size:96px;box-shadow:0 20px 50px rgba(0,0,0,.18)}
.chip{display:inline-flex;align-items:center;gap:12px;background:#fff;color:var(--ink);border-radius:22px;padding:20px 28px;font-size:30px;font-weight:600;box-shadow:0 18px 40px rgba(0,0,0,.14);white-space:nowrap}
.dark .chip.d{background:#1E1C17;color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.08)}
.big{font-size:400px;font-weight:800;letter-spacing:-.06em;line-height:.85;color:rgba(255,255,255,.92);text-shadow:0 0 60px rgba(255,255,255,.55)}
/* phone */
.phone{width:500px;height:1010px;background:#0A0A0A;border-radius:76px;padding:16px;box-shadow:0 60px 120px rgba(0,0,0,.35),0 0 0 3px #3A3A3A;position:relative;flex-shrink:0}
.scr{width:100%;height:100%;border-radius:62px;overflow:hidden;background:#fff;display:flex;flex-direction:column;position:relative}
.isl{position:absolute;top:22px;left:50%;transform:translateX(-50%);width:140px;height:40px;background:#000;border-radius:24px;z-index:5}
.sb{flex-shrink:0;height:80px;display:flex;justify-content:space-between;align-items:flex-end;padding:0 40px 10px;font-size:20px;font-weight:700}
/* app (web style) */
.app{flex:1;background:#F4F6FA;display:flex;flex-direction:column}
.apph{background:#fff;padding:22px 26px 26px;border-radius:0 0 34px 34px;box-shadow:0 8px 24px rgba(0,0,0,.06)}
.apph small{color:#8A8F99;font-size:19px}.apph b{display:block;font-size:30px;margin:2px 0 12px;letter-spacing:-.5px}
.mini{display:inline-flex;gap:8px;align-items:center;font-family:ui-monospace,monospace;font-size:16px;background:#F1F3F6;border-radius:999px;padding:7px 14px;color:#444;margin-right:6px}
.mini.g{background:#E7F7E3;color:#1E7A12;font-family:Inter;font-weight:700}
.tiles{display:grid;grid-template-columns:1fr 1fr;gap:18px;padding:26px}
.t{border-radius:26px;height:190px;padding:24px;color:#fff;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden}
.t b{font-size:28px}.t span{font-size:17px;opacity:.85}
.t i{position:absolute;top:22px;left:24px;font-style:normal;font-size:40px}
.t:after{content:'';position:absolute;right:-40px;top:-10px;width:170px;height:170px;border-radius:50%;border:16px solid rgba(255,255,255,.12)}
/* whatsapp */
.wah{flex-shrink:0;display:flex;align-items:center;gap:14px;padding:12px 20px;background:#fff;border-bottom:1px solid #eee;color:#111}
.wah .av{width:48px;height:48px;border-radius:50%;background:#111C3B;display:grid;place-items:center;overflow:hidden}.wah .av img{width:44px}
.wah b{font-size:21px;font-weight:600}
.wab{flex:1;background:#EEF3F9;padding:16px;display:flex;flex-direction:column;gap:10px;font-size:18px;color:#111}
.bb{max-width:84%;padding:11px 15px;border-radius:14px;line-height:1.35;box-shadow:0 1px 1px rgba(0,0,0,.1)}
.bb small{display:block;text-align:right;font-size:12px;color:#777;margin-top:3px}
.bb.i{background:#fff;align-self:flex-start;border-top-left-radius:3px}
.bb.o{background:#D9FDD3;align-self:flex-end;border-top-right-radius:3px}
.opts{background:#fff;align-self:flex-start;width:84%;border-radius:14px;margin-top:-8px;overflow:hidden}
.opts div{padding:13px;text-align:center;color:#0A7C66;font-weight:600;border-top:1px solid #eee;font-size:18px}
.waf{flex-shrink:0;display:flex;gap:10px;align-items:center;padding:12px 16px;background:#EEF3F9}
.waf div{flex:1;background:#fff;border-radius:999px;padding:14px 20px;color:#888;font-size:18px}
.waf span{width:52px;height:52px;border-radius:50%;background:#25A35A;display:grid;place-items:center;color:#fff;font-size:24px}
/* cards */
.card{background:#fff;color:var(--ink);border-radius:36px;box-shadow:0 30px 70px rgba(0,0,0,.12)}
.row{display:flex;align-items:center;gap:22px;padding:26px 34px;border-bottom:1px solid #EEF3F9}
.row:last-child{border-bottom:0}
.av2{width:70px;height:70px;border-radius:50%;background:var(--cream);display:grid;place-items:center;font-weight:600;font-size:26px;flex-shrink:0}
.row b{font-size:32px;font-weight:600;letter-spacing:-.5px;display:block}.row span{font-size:26px;color:var(--mut)}
.st{margin-left:auto;border-radius:999px;padding:12px 22px;font-size:22px;font-weight:700;letter-spacing:1.5px}
.st.ok{background:var(--g);color:var(--gd)}.st.p{background:#FCD9A8;color:#7A3E00}.st.r{background:#FDD5D2;color:#9B1C12}
`;

const brand = `<div class="brand"><div class="tile"><img src="${LOGO}"></div><span>CheckONOFF</span></div>`;
const count = (n, t) => `<div class="count">${n}/${t}</div>`;

const appScreen = (name = 'Laura Mendoza') => `<div class="isl"></div>
<div class="sb" style="background:#fff"><span>9:01</span><span>📶 🔋</span></div>
<div class="app"><div class="apph"><small>Bienvenido, <span class="mini" style="font-family:Inter;font-weight:700;color:#3557C6;background:#E8EEFC">v2.8.9</span></small><b>${name}</b>
<span class="mini">🕘 13/10/2026 09:01:59 a.m.</span><br><span class="mini g" style="margin-top:10px">📍 GPS ±16m</span></div>
<div class="tiles">
<div class="t" style="background:linear-gradient(135deg,#3B7BF0,#2152D6)"><i>✓</i><b>Entrada</b><span>Iniciar turno</span></div>
<div class="t" style="background:linear-gradient(135deg,#2B3245,#161A24)"><i>⇥</i><b>Salida</b><span>Terminar turno</span></div>
<div class="t" style="background:linear-gradient(135deg,#F68A2A,#E8620F)"><i>☕</i><b>Comida</b><span>Tomar break</span></div>
<div class="t" style="background:linear-gradient(135deg,#17B29C,#0F8C7A)"><i>◷</i><b>Regreso</b><span>Volver del break</span></div>
</div></div>`;

const waScreen = (step = 1) => `<div class="isl"></div>
<div class="sb" style="background:#fff;color:#111"><span>7:58</span><span>📶 🔋</span></div>
<div class="wah"><span style="font-size:26px">←</span><div class="av"><img src="${LOGO}"></div><b>Check ON-OFF</b></div>
<div class="wab">${step === 1 ? `
  <div class="bb o">Hola<small>7:57 ✓✓</small></div>
  <div class="bb i">¡Hola Carlos! 👋✨ ¿Qué te gustaría registrar hoy?<small>7:57</small></div>
  <div class="opts"><div>🟢 Entrada</div><div>🔴 Salida</div><div>❓ Ayuda</div></div>
  <div class="bb o">🟢 Entrada<small>7:57 ✓✓</small></div>
  <div class="bb i">📍 ¡Perfecto! Para registrar tu <b>entrada</b>, comparte tu ubicación actual.<br><br>Toca el clip 📎 → <b>Ubicación</b> → <b>Enviar tu ubicación actual</b>.<small>7:57</small></div>` : `
  <div class="bb i">✅ ¡Ubicación recibida!<br>📷 Ahora tómate una <b>selfie</b> para terminar tu registro de <b>Entrada</b>.<small>7:58</small></div>
  <div class="bb o" style="padding:6px"><div style="width:250px;height:250px;border-radius:10px;background:linear-gradient(160deg,#BFD9F2,#6E9FD8);display:grid;place-items:end center;overflow:hidden">
  <svg viewBox="0 0 120 140" width="200"><circle cx="60" cy="52" r="28" fill="#E8B996"/><path d="M32 46c0-20 14-30 28-30s28 10 28 30c-6-8-16-12-28-12s-22 4-28 12z" fill="#2B1B12"/><path d="M10 140c4-34 26-50 50-50s46 16 50 50z" fill="#2F4A6B"/></svg></div><small>7:58 ✓✓</small></div>
  <div class="bb i">✅ <b>¡Registro exitoso!</b> 🎉<br><br>👤 Carlos Ruiz<br>🕗 07:58 AM<br>📍 Ubicación guardada<br>📷 Foto guardada<br><br>¡Que tengas un excelente día! ☀️<small>7:58</small></div>`}
</div>
<div class="waf"><div>Mensaje</div><span>🎤</span></div>`;

const phone = (inner, style = '') => `<div class="phone" style="${style}"><div class="scr">${inner}</div></div>`;

const W = 1080, H = 1350, SH = 1920;
const S = [];
const add = (name, h, cls, body) => S.push([name, h, `<div class="f ${cls}">${body}</div>`]);

/* ============ POST 1 · La quincena ============ */
add('p1_01', H, 'dark', `${brand}${count(1,6)}
<div style="margin-top:auto;align-self:flex-start">
  <div class="icon">⏰</div>
  <div class="h h1" style="margin-top:56px">La quincena se paga <span class="gr">mañana.</span></div>
  <div class="sub" style="margin-top:34px;font-size:46px;color:#fff">¿Y la asistencia todavía no cuadra?</div>
  <div class="pill grn" style="margin-top:60px">Desliza →</div>
</div>`);

add('p1_02', H, 'cream', `${brand}${count(2,6)}
<div style="position:relative;width:100%;flex:1;margin-top:30px">
  <div class="chip" style="font-size:40px;padding:26px 36px;position:absolute;left:0;top:30px;transform:rotate(-6deg)">🗂️ Tarjetas de papel</div>
  <div class="chip" style="font-size:40px;padding:26px 36px;position:absolute;right:0;top:150px;transform:rotate(5deg)">🖐️ Reporte del checador</div>
  <div class="chip" style="font-size:40px;padding:26px 36px;position:absolute;left:30px;top:290px;transform:rotate(3deg)">💬 47 mensajes sin leer</div>
  <div class="chip" style="font-size:40px;padding:26px 36px;position:absolute;right:30px;top:420px;transform:rotate(-4deg)">📊 Asistencia_FINAL_v7.xlsx</div>
  <div class="chip" style="font-size:40px;padding:26px 36px;position:absolute;left:60px;top:560px;transform:rotate(-2deg)">📞 “¿Quién faltó en Norte?”</div>
  <div class="h h2 c" style="position:absolute;bottom:40px;left:0;right:0">Cinco fuentes.<br><span class="gr">Ninguna coincide.</span></div>
</div>`);

add('p1_03', H, 'green', `${brand}${count(3,6)}
<div style="margin:auto 0;text-align:center">
  <div class="h h3" style="color:#fff">Si son</div>
  <div class="big">150</div>
  <div class="h h2" style="color:#fff;margin-top:6px">colaboradores</div>
  <div class="pill blk" style="margin-top:56px">¿Quién cruza todo eso a mano? 🤔</div>
</div>`);

add('p1_04', H, 'dark', `${brand}${count(4,6)}
<div style="display:flex;gap:40px;align-items:center;margin-top:auto;width:100%">
  <div style="flex:1">
    <div class="h h4">Con CheckONOFF, tu equipo checa <span class="gr">como le acomode.</span></div>
    <div class="sub" style="margin-top:30px;font-size:32px">App, WhatsApp, checador o web. Cuatro formas de registrar y un solo registro.</div>
  </div>
  ${phone(appScreen(), 'transform:rotate(4deg) translateY(120px)')}
</div>`);

add('p1_05', H, 'cream', `${brand}${count(5,6)}
<div class="h h2 c" style="margin-top:60px">La nómina <span class="gr">cuadra sola.</span></div>
<div class="sub c" style="margin-top:24px;font-size:34px">Horas, tiempo extra, retardos y faltas en un clic.</div>
<div class="card" style="width:100%;margin-top:50px;overflow:hidden">
  <div style="display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;padding:22px 34px;background:#F7F7F2;font-size:22px;font-weight:700;color:var(--mut);letter-spacing:1px">
    <span>COLABORADOR</span><span>HORAS</span><span>T. EXTRA</span><span>RETARDOS</span></div>
  ${[['Miguel Ortega','96.0','4.5','0'],['Mariana Flores','92.5','6.0','2'],['Lucía Hernández','88.0','0.0','0'],['Óscar Ibarra','96.0','9.0','1']].map(r=>`
  <div style="display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;padding:24px 34px;border-top:1px solid #EEF3F9;font-size:30px;font-weight:500"><b style="font-weight:600">${r[0]}</b><span>${r[1]}</span><span>${r[2]}</span><span>${r[3]}</span></div>`).join('')}
</div>
<div class="pill blk" style="margin-top:44px">📥 Exportar a Excel</div>`);

add('p1_06', H, 'green', `${brand}${count(6,6)}
<div style="margin:auto 0;text-align:center">
  <div class="h h2">Recupera tus noches<br>de quincena.</div>
  <div class="sub" style="margin-top:30px;color:#111C3B">Prueba CheckONOFF gratis 14 días.<br>Sin tarjeta.</div>
  <div class="pill blk" style="margin-top:60px;font-size:44px;padding:30px 56px">checkonoff.mx →</div>
</div>`);

/* ============ POST 2 · WhatsApp ============ */
add('p2_01', H, 'green', `${brand}${count(1,5)}
<div style="margin:auto 0;align-self:flex-start">
  <div class="icon">💬</div>
  <div class="h h1" style="margin-top:56px">Tu equipo ya usa <span style="color:#fff">WhatsApp</span> todo el día.</div>
  <div class="sub" style="margin-top:30px;color:#111C3B;font-size:46px">¿Por qué no usarlo para checar?</div>
  <div class="pill blk" style="margin-top:56px">Desliza →</div>
</div>`);

add('p2_02', H, 'cream', `${brand}${count(2,5)}
<div style="display:flex;gap:40px;align-items:center;margin-top:auto;width:100%">
  <div style="flex:1">
    <div class="h h4">Escribe <span class="gr">“Hola”</span> y elige Entrada.</div>
    <div class="sub" style="margin-top:28px;font-size:32px">Sin descargar nada. Sin contraseñas. Desde el WhatsApp que ya tiene.</div>
  </div>
  ${phone(waScreen(1), 'transform:rotate(-3deg) translateY(130px)')}
</div>`);

add('p2_03', H, 'dark', `${brand}${count(3,5)}
<div style="display:flex;gap:40px;align-items:center;margin-top:auto;width:100%">
  ${phone(waScreen(2), 'transform:rotate(3deg) translateY(130px)')}
  <div style="flex:1">
    <div class="h h4">Ubicación + selfie = <span class="gr">registro en segundos.</span></div>
    <div class="sub" style="margin-top:28px;font-size:32px">Sin pasar lista y sin el “yo checo por él”.</div>
  </div>
</div>`);

add('p2_04', H, 'green', `${brand}${count(4,5)}
<div style="margin:auto 0;text-align:center;width:100%">
  <div class="h h2" style="color:#fff">¿Sin señal?</div>
  <div class="h h3" style="margin-top:10px">No pasa nada.</div>
  <div style="display:flex;flex-direction:column;gap:26px;align-items:center;margin-top:60px">
    <div class="chip" style="font-size:34px;transform:rotate(-3deg)">📶❌ Registro guardado en el celular</div>
    <div style="font-size:50px;color:#fff">↓</div>
    <div class="chip" style="font-size:34px;transform:rotate(2deg)">☁️✅ Sincronizado al volver la señal</div>
  </div>
  <div class="pill blk" style="margin-top:60px">Con la hora real del marcaje</div>
</div>`);

add('p2_05', H, 'dark', `${brand}${count(5,5)}
<div style="margin:auto 0;text-align:center">
  <div class="h h2">Pruébalo tú mismo <span class="gr">hoy.</span></div>
  <div class="sub" style="margin-top:30px">14 días gratis · sin tarjeta</div>
  <div class="pill grn" style="margin-top:60px;font-size:44px;padding:30px 56px">Probar el bot →</div>
  <div style="margin-top:34px;font-size:36px;font-weight:600">checkonoff.mx</div>
</div>`);

/* ============ POST 3 · Vacaciones LFT ============ */
add('p3_01', H, 'dark', `${brand}${count(1,5)}
<div style="margin-top:auto;align-self:flex-start">
  <div class="icon">🏖️</div>
  <div class="h h1" style="margin-top:56px">Diciembre <span class="gr">se acerca.</span></div>
  <div class="sub" style="margin-top:34px;font-size:46px;color:#fff">¿Sabes cuántos días de vacaciones le tocan a cada quien?</div>
  <div class="pill grn" style="margin-top:56px">Desliza →</div>
</div>`);

add('p3_02', H, 'green', `${brand}${count(2,5)}
<div style="margin:auto 0;text-align:center">
  <div class="h h3" style="color:#fff">Desde el primer año</div>
  <div class="big" style="font-size:360px">12</div>
  <div class="h h2" style="color:#fff">días de vacaciones</div>
  <div class="pill blk" style="margin-top:56px">Así lo marca la LFT desde 2023 ⚖️</div>
</div>`);

const vac = [['1 año',12],['2 años',14],['3 años',16],['4 años',18],['5 años',20],['6 a 10',22],['11 a 15',24],['16 a 20',26]];
add('p3_03', H, 'cream', `${brand}${count(3,5)}
<div class="h h3 c" style="margin-top:50px">Días por <span class="gr">antigüedad</span></div>
<div class="card" style="width:100%;margin-top:44px;padding:30px 40px;display:flex;flex-direction:column;gap:16px">
  ${vac.map(([a,d])=>`<div style="display:grid;grid-template-columns:170px 1fr 70px;gap:22px;align-items:center">
    <span style="font-size:30px;font-weight:600">${a}</span>
    <div style="height:42px;background:#F0EFE7;border-radius:999px;overflow:hidden"><div style="height:100%;width:${d/26*100}%;background:var(--g);border-radius:999px"></div></div>
    <b style="font-size:38px;text-align:right">${d}</b></div>`).join('')}
</div>
<div class="sub c" style="margin-top:30px;font-size:28px">+2 días por cada 5 años adicionales · Prima vacacional mínima del 25 %</div>`);

add('p3_04', H, 'dark', `${brand}${count(4,5)}
<div class="h h3 c" style="margin-top:60px">Solicitudes y aprobaciones <span class="gr">sin papeles.</span></div>
<div class="card" style="width:100%;margin-top:56px;overflow:hidden">
  <div class="row"><div class="av2">AT</div><div><b>Ana Torres</b><span>Vacaciones · 3 días</span></div><div class="st ok">APROBADA</div></div>
  <div class="row"><div class="av2">LG</div><div><b>Luis Gómez</b><span>Permiso con goce</span></div><div class="st p">POR APROBAR</div></div>
  <div class="row"><div class="av2">MR</div><div><b>María Ruiz</b><span>Incapacidad IMSS</span></div><div class="st ok">APROBADA</div></div>
</div>
<div style="display:flex;gap:18px;margin-top:44px;flex-wrap:wrap;justify-content:center">
  <div class="chip d">⚖️ Días según la LFT</div><div class="chip d">🎂 Se actualiza en cada aniversario</div><div class="chip d">✍️ Firma digital</div>
</div>`);

add('p3_05', H, 'green', `${brand}${count(5,5)}
<div style="margin:auto 0;text-align:center">
  <div class="h h2">Cumplir con la ley no debería depender de un Excel.</div>
  <div class="sub" style="margin-top:30px;color:#111C3B">Prueba CheckONOFF 14 días gratis.</div>
  <div class="pill blk" style="margin-top:60px;font-size:44px;padding:30px 56px">checkonoff.mx →</div>
</div>`);

/* ============ STORIES ============ */
add('story_1_encuesta', SH, 'green', `${brand}
<div style="margin-top:200px;text-align:center">
  <div class="icon" style="margin:0 auto">⏱️</div>
  <div class="h h2" style="margin-top:60px">¿Cuánto te toma cerrar la pre-nómina?</div>
  <div class="pill blk" style="margin-top:50px">Vota 👇</div>
</div>
<div style="height:520px"></div>`);

add('story_2_demo', SH, 'dark', `${brand}
<div class="h h3 c" style="margin-top:90px">Así checa tu equipo<br>en <span class="gr">CheckONOFF</span> 👇</div>
<div style="margin-top:70px">${phone(appScreen('Carlos Ruiz'), 'transform:scale(1.05)')}</div>
<div class="pill grn" style="margin-top:80px">Entrada · Salida · Comida · Regreso</div>
<div style="height:200px"></div>`);

add('story_3_cta', SH, 'green', `${brand}
<div style="margin-top:150px;text-align:center">
  <div class="h h2">Deja de armar la nómina a mano.</div>
  <div class="big" style="font-size:300px;margin-top:70px">14</div>
  <div class="h h2" style="color:#fff">días gratis</div>
  <div class="sub" style="margin-top:30px;color:#111C3B">Sin tarjeta · Desde $39 MXN por colaborador</div>
</div>
<div style="height:380px"></div>`);


/* ============ ESTILO FOTO + STICKERS (tipo Callbell) ============ */
const img = f => 'data:image/jpeg;base64,' + fs.readFileSync(path.join(__dirname, 'photos', f)).toString('base64');
const stk = (html, pos, rot = 0, extra = '') => `<div style="position:absolute;${pos};transform:rotate(${rot}deg);z-index:3;${extra}">${html}</div>`;
const card = (top, body) => `<div style="background:#fff;border-radius:30px;padding:22px 30px;box-shadow:0 20px 50px rgba(0,0,0,.28);color:#111C3B;min-width:280px">
  <div style="font-size:24px;letter-spacing:4px;color:#F5B400">${top}</div><div style="font-size:32px;font-weight:600;letter-spacing:-.5px;margin-top:6px;white-space:nowrap">${body}</div></div>`;
const bubble = (e, bg) => `<div style="width:120px;height:120px;border-radius:50%;background:${bg};display:grid;place-items:center;font-size:62px;box-shadow:0 18px 40px rgba(0,0,0,.3)">${e}</div>`;
const tag = t => `<div style="background:#fff;border-radius:18px;padding:16px 24px;font-size:30px;font-weight:600;color:#111C3B;box-shadow:0 16px 36px rgba(0,0,0,.28);white-space:nowrap">${t}</div>`;
const photoSlide = (photo, stickers, title) => `<div class="f" style="padding:0;background:#000 url('${img(photo)}') center/cover">
  ${stickers}
  <div style="position:absolute;left:0;right:0;bottom:0;height:520px;background:linear-gradient(to top,rgba(0,0,0,.85),rgba(0,0,0,0));z-index:2"></div>
  <div style="position:absolute;left:60px;right:60px;bottom:70px;z-index:4;text-align:center;color:#fff">
    <div class="h" style="font-size:66px;text-shadow:0 4px 20px rgba(0,0,0,.4)">${title}</div>
    <div style="display:inline-flex;align-items:center;gap:14px;margin-top:26px;font-size:34px;font-weight:600"><span class="brand" style="gap:0"><span class="tile" style="width:52px;height:52px;border-radius:13px"><img src="${LOGO}" style="width:48px"></span></span>checkonoff.mx</div>
  </div>
  <div class="count" style="background:rgba(17,28,59,.75)">__N__</div></div>`;

/* ============ ESTILO DIAGRAMA ILUSTRADO (tipo Callbell) ============ */
const diagram = (title, nodes) => {
  const cx = 540, cy = 1000;
  const lines = nodes.map(n => `<line x1="${n.x}" y1="${n.y}" x2="${cx}" y2="${cy - 60}" stroke="#34B614" stroke-width="5" stroke-dasharray="14 12"/>`).join('');
  const circles = nodes.map(n => `<div style="position:absolute;left:${n.x - 115}px;top:${n.y - 115}px;width:230px;height:230px;border-radius:50%;background:#fff;border:8px solid #34B614;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;z-index:3;box-shadow:0 14px 30px rgba(0,0,0,.08)">
    <div style="font-size:78px;line-height:1">${n.e}</div><div style="font-size:24px;font-weight:700;margin-top:8px;line-height:1.1;padding:0 18px;color:#111C3B">${n.t}</div></div>`).join('');
  return `<div class="f" style="background:#FBF9F1;color:#111C3B;padding:0">
  <div class="h c" style="position:absolute;top:150px;left:110px;right:110px;font-size:64px;font-weight:800;letter-spacing:-.04em;color:#34B614;text-transform:uppercase;line-height:1.02">${title}</div>
  <svg width="1080" height="1350" style="position:absolute;inset:0;z-index:1">
    <path d="M110 1350 C 90 1150, 230 1060, 330 1090 C 360 930, 560 880, 650 980 C 760 900, 950 980, 930 1130 C 1020 1170, 1010 1300, 990 1350 Z" fill="#CFEFC6"/>
    ${lines}
  </svg>
  <div style="position:absolute;left:290px;top:${cy - 60}px;width:500px;z-index:2">
    <div style="height:300px;border:16px solid #34B614;border-radius:24px 24px 0 0;background:#FFF;display:flex;align-items:center;justify-content:center;gap:18px">
      <span style="width:84px;height:84px;border-radius:20px;background:#111C3B;display:grid;place-items:center"><img src="${LOGO}" style="width:78px"></span>
      <span style="font-size:46px;font-weight:700;letter-spacing:-1.5px;color:#111C3B">CheckONOFF</span></div>
    <div style="height:34px;background:#34B614;margin:0 -50px;border-radius:0 0 22px 22px"></div>
  </div>
  ${circles}
  <div class="count" style="z-index:5">__N__</div></div>`;
};

const extraSlides = {
  p1_foto: photoSlide('rrhh_big.jpg',
    stk(card('✅ LISTO', 'Pre-nómina generada'), 'left:50px;top:170px', -4) +
    stk(tag('⏱️ 312 h extra calculadas'), 'right:40px;top:420px', 5) +
    stk(tag('📥 Excel exportado'), 'left:60px;top:560px', -3) +
    stk(bubble('😄', '#FFD43B'), 'right:120px;top:150px', 0) +
    stk(bubble('👍', '#34B614'), 'right:70px;top:700px', 8) +
    stk('<div style="font-size:90px">🇲🇽</div>', 'left:70px;top:80px', -8),
    'Cierra la quincena en minutos, no en días'),
  p2_foto: photoSlide('obra_big.jpg',
    stk(card('🟢 WHATSAPP', 'Entrada · 07:58 ✅'), 'right:40px;top:150px', 4) +
    stk(tag('📍 Dentro de geocerca'), 'left:40px;top:380px', -5) +
    stk(tag('🤳 Selfie validada'), 'right:50px;top:520px', 3) +
    stk(tag('📶 Funciona sin internet'), 'left:50px;top:660px', -2) +
    stk(bubble('💬', '#25D366'), 'left:70px;top:140px', -6) +
    stk('<div style="font-size:90px">🇲🇽</div>', 'right:90px;top:740px', 8),
    'Tu equipo checa desde donde esté'),
  p3_foto: photoSlide('playa_big.jpg',
    stk(card('🏖️ SOLICITUD', 'Vacaciones aprobadas ✅'), 'left:40px;top:170px', -4) +
    stk(tag('📅 Saldo disponible: 10 días'), 'right:40px;top:420px', 4) +
    stk(tag('⚖️ Calculado según la LFT'), 'left:50px;top:600px', -3) +
    stk(bubble('☀️', '#FFD43B'), 'right:110px;top:150px', 0) +
    stk(bubble('🙌', '#34B614'), 'left:90px;top:760px', -6),
    'Vacaciones aprobadas desde el celular'),
  p1_diag: diagram('¿Sabías que CheckONOFF se conecta con lo que ya usas?', [
    { x: 170, y: 620, e: '📊', t: 'Excel' }, { x: 540, y: 520, e: '🖐️', t: 'Checador biométrico' },
    { x: 910, y: 620, e: '💬', t: 'WhatsApp' }, { x: 150, y: 900, e: '🧾', t: 'Tu sistema de nómina' }, { x: 930, y: 900, e: '🔌', t: 'API REST' }]),
  p2_diag: diagram('4 formas de checar, un solo registro', [
    { x: 180, y: 520, e: '💬', t: 'WhatsApp' }, { x: 900, y: 520, e: '📱', t: 'App con geocerca' },
    { x: 150, y: 830, e: '🖐️', t: 'Checador de huella' }, { x: 930, y: 830, e: '🖥️', t: 'Panel web' }]),
  p3_diag: diagram('Así viaja una solicitud de vacaciones', [
    { x: 180, y: 520, e: '📱', t: '1. Colaborador solicita' }, { x: 900, y: 520, e: '👤', t: '2. Supervisor aprueba' },
    { x: 150, y: 830, e: '⚖️', t: '3. Saldo LFT se actualiza' }, { x: 930, y: 830, e: '🧾', t: '4. Pre-nómina lista' }]),
};

const byName = Object.fromEntries(S.map(([n, h, b]) => [n, [h, b]]));
for (const [k, b] of Object.entries(extraSlides)) byName[k] = [H, b];
const ORDER = {
  post1: ['p1_01', 'p1_02', 'p1_03', 'p1_foto', 'p1_05', 'p1_diag', 'p1_06'],
  post2: ['p2_foto', 'p2_02', 'p2_03', 'p2_04', 'p2_diag', 'p2_05'],
  post3: ['p3_01', 'p3_02', 'p3_03', 'p3_foto', 'p3_04', 'p3_diag', 'p3_05'],
};
S.length = 0;
for (const [post, list] of Object.entries(ORDER)) list.forEach((n, i) => {
  const [h, b] = byName[n];
  const body = b.replace(/<div class="count"([^>]*)>[^<]*<\/div>/, `<div class="count"$1>${i + 1}/${list.length}</div>`);
  S.push([`${post}_${String(i + 1).padStart(2, '0')}`, h, body]);
});
['story_1_encuesta', 'story_2_demo', 'story_3_cta'].forEach(n => S.push([n, ...byName[n]]));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const only = process.argv[2];
  for (const [name, h, body] of S) {
    if (only && !name.startsWith(only)) continue;
    await page.setViewportSize({ width: W, height: h });
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${CSS}.f{width:${W}px;height:${h}px}</style></head><body>${body}</body></html>`);
    await page.waitForTimeout(120);
    await page.screenshot({ path: path.join(OUT, name + '.png') });
    console.log('ok', name);
  }
  await browser.close();
})();
