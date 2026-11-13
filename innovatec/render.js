// Innova-Tec México: piezas corporativas para LinkedIn (1080x1350). Sobrio, sin emojis, firma abajo.
// Uso: node innovatec/render.js <clave|todas>
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const R = path.resolve(__dirname, '..'), U = p => 'file://' + path.join(R, p);
const C = { navy: '#0B1F3A', ink: '#13263F', steel: '#5B6B80', line: '#D5DBE3', paper: '#F4F6F9', acc: '#1F7FD1', acc2: '#7FB8EA' };
const base = (fondo, color) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:IT;font-weight:400;src:url(${U('plantillas/fonts_it_400.ttf')})}
@font-face{font-family:IT;font-weight:500;src:url(${U('plantillas/fonts_it_500.ttf')})}
@font-face{font-family:IT;font-weight:600;src:url(${U('plantillas/fonts_it_600.ttf')})}
@font-face{font-family:IT;font-weight:700;src:url(${U('plantillas/fonts_it_700.ttf')})}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1350px;overflow:hidden;font-family:IT,sans-serif;background:${fondo};color:${color};position:relative}
.pad{position:absolute;left:96px;right:96px}
.kick{font-weight:600;font-size:24px;letter-spacing:.22em;text-transform:uppercase;color:${C.acc}}
.rule{width:72px;height:4px;background:${C.acc};margin:28px 0 36px}
h1{font-weight:700;font-size:76px;line-height:1.06;letter-spacing:-.02em}
.lead{font-weight:400;font-size:32px;line-height:1.45;opacity:.82;margin-top:34px;max-width:840px}
.firma{position:absolute;left:96px;right:96px;bottom:72px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid currentColor;padding-top:28px;opacity:.9}
.firma .m{font-weight:700;font-size:30px;letter-spacing:.16em}
.firma .r{font-weight:400;font-size:19px;opacity:.75;margin-top:6px;letter-spacing:.02em}
.firma .t{font-weight:500;font-size:20px;opacity:.7;text-align:right}
</style></head><body>`;
const firma = (t) => `<div class="firma"><div><div class="m">INNOVA-TEC MÉXICO</div><div class="r">Innova-Tec Industrial y Comercial de México, S.A. de C.V.</div></div><div class="t">${t}</div></div></body></html>`;

const P = {};
P.presentacion = () => base(C.navy, '#fff') + `
<div style="position:absolute;right:-220px;top:-220px;width:760px;height:760px;border:2px solid rgba(127,184,234,.25);border-radius:50%"></div>
<div style="position:absolute;right:-120px;top:-120px;width:560px;height:560px;border:2px solid rgba(127,184,234,.18);border-radius:50%"></div>
<div class="pad" style="top:150px"><div class="kick" style="color:${C.acc2}">Quiénes somos</div><div class="rule" style="background:${C.acc2}"></div>
<h1>Tecnología mexicana para operar mejor.</h1>
<div class="lead">Desarrollamos y comercializamos soluciones digitales para la operación diaria de las empresas.</div></div>
<div class="pad" style="top:770px;display:grid;grid-template-columns:1fr 1fr;gap:28px">
${[['CheckONOFF','Control de asistencia, jornada y prenómina.'],['Dieloxia','Atención por WhatsApp con inteligencia artificial y control humano.']].map(([n,d])=>`<div style="border:1px solid rgba(255,255,255,.22);border-radius:18px;padding:34px 32px;background:rgba(255,255,255,.04)"><div style="font-weight:700;font-size:38px">${n}</div><div style="font-size:24px;line-height:1.4;opacity:.75;margin-top:14px">${d}</div></div>`).join('')}
</div>` + firma('Portafolio');

P.reforma = () => base(C.paper, C.ink) + `
<div class="pad" style="top:130px"><div class="kick">Entorno regulatorio · México</div><div class="rule"></div>
<h1>Reforma laboral 2026: la jornada baja de 48 a 40 horas.</h1>
<div class="lead" style="font-size:29px">Reducción gradual del límite semanal de la jornada ordinaria, según el decreto publicado en el DOF el 01/05/2026.</div></div>
<div class="pad" style="top:690px">
<div style="display:flex;align-items:flex-end;gap:22px;height:300px;border-bottom:2px solid ${C.line}">
${[[2026,48],[2027,46],[2028,44],[2029,42],[2030,40]].map(([a,h],i)=>`<div style="flex:1;text-align:center"><div style="font-weight:700;font-size:40px;color:${i==4?C.acc:C.ink};margin-bottom:12px">${h} h</div><div style="height:${(h-30)*14}px;background:${i==4?C.acc:'#9AA8B8'};border-radius:10px 10px 0 0"></div></div>`).join('')}
</div>
<div style="display:flex;gap:22px;margin-top:16px">${[2026,2027,2028,2029,2030].map(a=>`<div style="flex:1;text-align:center;font-weight:600;font-size:26px;color:${C.steel}">${a}</div>`).join('')}</div>
<div style="margin-top:44px;font-size:24px;line-height:1.5;color:${C.steel}">Desde el 01/01/2027 aplican las reglas del registro electrónico de la jornada (art. 132, fr. XXXIV, LFT). El salario y las prestaciones no se reducen.</div>
</div>` + firma('Análisis sectorial');

P.dieloxia = () => base('#fff', C.ink) + `
<div style="position:absolute;left:0;top:0;bottom:0;width:22px;background:${C.acc}"></div>
<div class="pad" style="top:140px"><div class="kick">Portafolio · Dieloxia</div><div class="rule"></div>
<h1>Atención por WhatsApp a escala, sin perder el trato humano.</h1>
<div class="lead" style="color:${C.ink}">Asistentes con inteligencia artificial que responden, califican y dan seguimiento. Una persona toma la conversación en un clic cuando hace falta.</div></div>
<div class="pad" style="top:850px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
${[['Responde','Consultas frecuentes, a cualquier hora.'],['Califica','Identifica a los prospectos con interés real.'],['Escala','Pasa a una persona del equipo en un clic.']].map(([n,d],i)=>`<div style="border-top:4px solid ${C.acc};padding-top:22px"><div style="font-weight:700;font-size:20px;color:${C.acc};letter-spacing:.14em">0${i+1}</div><div style="font-weight:700;font-size:32px;margin-top:10px">${n}</div><div style="font-size:22px;line-height:1.4;color:${C.steel};margin-top:10px">${d}</div></div>`).join('')}
</div>` + firma('dieloxia.com');

(async () => {
  const quien = process.argv[2] || 'todas';
  const claves = quien === 'todas' ? Object.keys(P) : [quien];
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const k of claves) {
    const dir = path.join(R, 'innovatec', 'out'); fs.mkdirSync(dir, { recursive: true });
    await pg.setContent(P[k](), { waitUntil: 'load' }); await pg.waitForTimeout(300);
    await pg.screenshot({ path: path.join(dir, k + '.jpg'), type: 'jpeg', quality: 92 });
    console.log('ok', k);
  }
  await b.close();
})();
