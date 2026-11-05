// Anuncio estilo "registro listo" (referencia: anuncio de la competencia, 05/11/2026). Logo abajo, nunca arriba.
const { chromium } = require('playwright'); const path = require('path');
const R = path.resolve(__dirname, '..'), U = p => 'file://' + path.join(R, p);
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:NU;font-weight:900;src:url(${U('marca_personal/nunito_900.woff2')})}
@font-face{font-family:IT;font-weight:600;src:url(${U('plantillas/fonts_it_600.ttf')})}
@font-face{font-family:IT;font-weight:800;src:url(${U('plantillas/fonts_it_800.ttf')})}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;font-family:IT,sans-serif;color:#fff;background:#1E9A0B;position:relative}
.bg{position:absolute;inset:0;background:radial-gradient(circle at 15% 10%,#46CF22 0,#2BA80F 45%,#17800A 100%)}
.foto{position:absolute;right:-40px;top:250px;width:640px;height:900px;background:url(${U('plantillas/photos/u_2AP_-QWxE2A.jpg')}) 58% 30%/cover;border-radius:60px 0 0 60px}
.fade{position:absolute;right:0;top:250px;width:720px;height:900px;background:linear-gradient(90deg,#29A30E 0,rgba(41,163,14,.85) 18%,rgba(41,163,14,0) 45%)}
.tag{position:absolute;left:70px;top:90px;font-weight:800;font-size:26px;letter-spacing:.14em;background:#111C3B;padding:12px 24px;border-radius:40px}
h1{position:absolute;left:70px;top:170px;font-family:NU;font-weight:900;font-size:112px;line-height:1.02;letter-spacing:-.02em;text-shadow:0 4px 30px rgba(0,0,0,.12)}
.pills{display:flex;gap:16px;margin:10px 0 6px}
.p1{font-family:IT;font-weight:600;font-size:64px;border:4px solid #fff;border-radius:60px;padding:0 34px;line-height:96px}
.p2{font-size:72px;background:#fff;color:#17800A;border-radius:60px;padding:0 38px;line-height:100px}
.sub{position:relative;display:inline-block}
.sub svg{position:absolute;left:-10px;bottom:-34px}
ul{position:absolute;left:70px;top:650px;list-style:none;font-weight:600;font-size:40px;line-height:1.2}
li{display:flex;align-items:center;gap:22px;margin-bottom:30px;text-shadow:0 2px 12px rgba(0,0,0,.25)}
.ck{flex:none;width:64px;height:64px;border-radius:50%;border:5px solid #FFD84D;display:grid;place-items:center}
.ley{position:absolute;left:70px;top:1075px;font-size:26px;font-weight:600;opacity:.92;max-width:520px}
.ley b{color:#FFD84D}
.cta{position:absolute;left:0;right:0;bottom:0;height:150px;background:#111C3B;display:flex;align-items:center;justify-content:space-between;padding:0 60px}
.cta .t{font-weight:800;font-size:38px}.cta .t span{color:#FFD84D}.cta .n{font-size:26px;font-weight:600;opacity:.85;margin-top:6px}
.logo{background:#fff;border-radius:22px;padding:10px 18px;display:flex;align-items:center}
.logo img{height:64px}
</style></head><body>
<div class="bg"></div><div class="foto"></div><div class="fade"></div>
<div class="tag">REFORMA 40 HORAS</div>
<h1>Registro de<div class="pills"><span class="p1">jornada,</span><span class="p2">LISTO</span></div><span class="sub">para la STPS<svg width="560" height="40" viewBox="0 0 560 40"><path d="M10 28 Q 280 2 550 22" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round"/></svg></span></h1>
<ul>
<li><span class="ck"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M5 16 L12 23 L25 8" fill="none" stroke="#FFD84D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Entradas y salidas<br>con foto y ubicación</li>
<li><span class="ck"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M5 16 L12 23 L25 8" fill="none" stroke="#FFD84D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Horas extra<br>calculadas solas</li>
<li><span class="ck"><svg width="30" height="30" viewBox="0 0 30 30"><path d="M5 16 L12 23 L25 8" fill="none" stroke="#FFD84D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>Reportes listos<br>para una inspección</li>
</ul>
<div class="ley">El registro electrónico de la jornada es obligación del patrón <b>(art. 132 fr. XXXIV LFT)</b>. Sus reglas aplican desde 2027.</div>
<div class="cta"><div><div class="t">Escríbenos <span>GUÍA</span> al WhatsApp</div><div class="n">+52 440 180 2213 · checkonoff.mx</div></div><div class="logo"><img src="${U('plantillas/logo_full.png')}"></div></div>
</body></html>`;
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  const f = path.join(R, 'plantillas/_anuncio_tmp.html'); require('fs').writeFileSync(f, html); await p.goto('file://' + f, { waitUntil: 'load' }); await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(R, 'contenido/checkonoff/2026-11-05-anuncio-registro-listo/01.jpg'), type: 'jpeg', quality: 92 }); await b.close(); require('fs').unlinkSync(f); })();
