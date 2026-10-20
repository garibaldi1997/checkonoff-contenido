// Marca personal de Garibaldi en LinkedIn: carruseles (PDF) y tarjetas de encuesta. Estilo propio: azul profundo + turquesa.
const { chromium } = require('/opt/node-tools/node_modules/playwright');
const fs = require('fs'), path = require('path');
const { CSS } = require('../plantillas/premium_base');
const AV = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, 'avatar.png')).toString('base64');
const K = { bg: '#0F1E36', bg2: '#16294A', t: '#2EC4B6', o: '#F5B841', r: '#FF6B6B', w: '#FFFFFF', s: '#B8C4D6' };
const MCSS = `${CSS}
.f{background:${K.bg};color:#fff}
.firma{position:absolute;left:72px;right:72px;bottom:56px;display:flex;align-items:center;gap:20px;font-size:26px;color:${K.s}}
.firma img{width:76px;height:76px;border-radius:50%;border:3px solid ${K.t}}
.firma b{color:#fff;font-size:28px;display:block}
.num{margin-left:auto;font-weight:700;font-size:26px;color:${K.s}}
.t{position:absolute;left:72px;right:72px;font-weight:800;letter-spacing:-.025em;line-height:1.05}
.kick{display:inline-block;font-weight:800;font-size:26px;letter-spacing:.12em;padding:10px 20px;border-radius:12px}
.card{background:${K.bg2};border:2px solid rgba(255,255,255,.08);border-radius:30px;padding:34px 38px}
.ac{color:${K.t}}.or{color:${K.o}}`;
const firma = (i, n) => `<div class="firma"><img src="${AV}"><div><b>Dr. Garibaldi Corona</b>Médico laboral · Fundador de CheckONOFF y Dieloxia</div>${n ? `<div class="num">${i}/${n}</div>` : ''}</div>`;
const kick = (t, bg = K.t, c = K.bg) => `<span class="kick" style="background:${bg};color:${c}">${t}</span>`;
const P = {};  // pieza -> lista de láminas (html)

// ── Quiz: verdadero o falso ──
const mitos = [
  ['La NOM-035 solo aplica a empresas grandes.', 'FALSO', 'Aplica a todos los centros de trabajo. Lo que cambia según el número de trabajadores (hasta 15, de 16 a 50 y más de 50) son las obligaciones.'],
  ['La NOM-035 sirve para diagnosticar el estrés de cada trabajador.', 'FALSO', 'Identifica y previene factores de riesgo psicosocial de la organización: cargas, jornadas, liderazgo y violencia laboral. No es un diagnóstico clínico individual.'],
  ['La NOM-030 pide que alguien sea responsable de la seguridad y salud en el trabajo.', 'VERDADERO', 'La empresa debe designar a un responsable de los servicios preventivos (interno o externo) y contar con un diagnóstico y un programa.'],
  ['Con la Ley Silla basta con comprar sillas.', 'FALSO', 'Además de asientos con respaldo, quien trabaja de pie debe poder usarlos durante la jornada, con pausas periódicas.'],
];
P.quiz = [`${kick('QUIZ PARA RRHH')}
<div class="t" style="top:300px;font-size:120px">¿Verdadero<br>o <span class="ac">falso?</span></div>
<div class="t" style="top:600px;font-size:48px;font-weight:600;color:${K.s};line-height:1.3">4 frases sobre salud laboral que escucho cada semana en empresas.</div>
<div style="position:absolute;left:72px;top:900px">${kick('Responde antes de deslizar →', K.o)}</div>${firma(1, 10)}`];
mitos.forEach(([frase, v, exp], i) => {
  P.quiz.push(`${kick(`FRASE ${i + 1} DE 4`, K.bg2, K.s)}
<div class="t" style="top:260px;font-size:76px">“${frase}”</div>
<div style="position:absolute;left:72px;right:72px;top:820px;display:flex;gap:24px">
 <div class="card" style="flex:1;text-align:center;font-size:54px;font-weight:800;color:${K.t}">V</div>
 <div class="card" style="flex:1;text-align:center;font-size:54px;font-weight:800;color:${K.r}">F</div></div>
<div class="t" style="top:1010px;font-size:30px;font-weight:600;color:${K.s}">Piensa tu respuesta y desliza →</div>${firma(2 + i * 2, 10)}`);
  P.quiz.push(`${kick(v, v === 'FALSO' ? K.r : K.t, v === 'FALSO' ? '#fff' : K.bg)}
<div class="t" style="top:200px;font-size:44px;font-weight:600;color:${K.s};line-height:1.25">“${frase}”</div>
<div class="card" style="position:absolute;left:72px;right:72px;top:520px;font-size:46px;font-weight:700;line-height:1.3">${exp}</div>${firma(3 + i * 2, 10)}`);
});
P.quiz.push(`<div class="t" style="top:260px;font-size:100px">¿Cuántas<br><span class="ac">acertaste?</span></div>
<div class="t" style="top:560px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">Escribe en comentarios tu puntaje del 0 al 4. Leo todos.</div>
<div style="position:absolute;left:72px;top:820px;display:flex;gap:18px">${[0, 1, 2, 3, 4].map(n => `<div class="card" style="width:150px;text-align:center;font-size:64px;font-weight:800;color:${n === 4 ? K.o : '#fff'}">${n}</div>`).join('')}</div>${firma(10, 10)}`);

// ── Autoevaluación 2027 ──
const preguntas = ['¿Registran la jornada de forma electrónica (entrada y salida)?', '¿Saben cuántas horas extra paga cada persona por semana?', '¿Sus turnos ya caben en 46 horas para 2027?', '¿Aplicaron la NOM-035 según su número de trabajadores?',
  '¿Tienen un responsable de seguridad y salud (NOM-030)?', '¿Quien trabaja de pie tiene silla y pausas (Ley Silla)?', '¿Conservan las listas de asistencia del último año?', '¿Los horarios están por escrito y acordados con el equipo?'];
const lista = (qs, base) => qs.map((q, i) => `<div class="card" style="display:flex;gap:26px;align-items:center;margin-bottom:22px"><div style="width:62px;height:62px;border-radius:16px;border:4px solid ${K.t};flex-shrink:0"></div><div style="font-size:36px;font-weight:600;line-height:1.25"><span class="ac" style="font-weight:800">${base + i}.</span> ${q}</div></div>`).join('');
P.autoeval = [
  `${kick('AUTOEVALUACIÓN · 2 MINUTOS')}
<div class="t" style="top:280px;font-size:98px">¿Tu empresa está lista para <span class="ac">2027?</span></div>
<div class="t" style="top:700px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">8 preguntas. Suma 1 punto por cada <b style="color:#fff">SÍ</b> y al final ve tu resultado.</div>${firma(1, 5)}`,
  `${kick('PREGUNTAS 1 A 4')}<div style="position:absolute;left:72px;right:72px;top:180px">${lista(preguntas.slice(0, 4), 1)}</div>${firma(2, 5)}`,
  `${kick('PREGUNTAS 5 A 8')}<div style="position:absolute;left:72px;right:72px;top:180px">${lista(preguntas.slice(4), 5)}</div>${firma(3, 5)}`,
  `${kick('TU RESULTADO')}<div style="position:absolute;left:72px;right:72px;top:190px;display:flex;flex-direction:column;gap:26px">
${[['7 – 8', 'Vas muy bien. Revisa los detalles antes de enero.', K.t], ['4 – 6', 'Hay pendientes importantes. Empieza por el registro de jornada.', K.o], ['0 – 3', 'Es momento de actuar: 2027 está a la vuelta.', K.r]].map(([a, b, c]) => `<div class="card" style="display:flex;gap:30px;align-items:center"><div style="font-size:72px;font-weight:800;color:${c};min-width:230px">${a}</div><div style="font-size:38px;font-weight:600;line-height:1.3">${b}</div></div>`).join('')}</div>${firma(4, 5)}`,
  `<div class="t" style="top:280px;font-size:96px">¿Cuántos puntos <span class="ac">sacaste?</span></div>
<div class="t" style="top:600px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">Déjalo en comentarios (solo el número). Con los resultados preparo una guía con los pendientes más comunes.</div>${firma(5, 5)}`];

// ── Pausa activa ──
const ejercicios = [['🙆', 'Cuello', 'Inclina la oreja hacia el hombro y sostén 15 segundos de cada lado. Sin rebotes.'], ['🔄', 'Hombros', 'Haz 10 círculos lentos hacia atrás. Suelta la tensión al exhalar.'], ['✋', 'Muñecas', 'Brazo al frente, palma hacia afuera; jala suave los dedos 15 segundos por mano.'], ['🚶', 'Levántate', 'Camina 1 minuto o sube y baja un piso. Tu espalda te lo va a agradecer.']];
P.pausa = [`${kick('RETO DE HOY · 2 MINUTOS')}
<div class="t" style="top:280px;font-size:110px">Pausa activa <span class="ac">conmigo</span></div>
<div class="t" style="top:560px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">4 movimientos que recomiendo en consulta a quien pasa horas frente a la computadora.</div>${firma(1, 6)}`];
ejercicios.forEach(([e, t, d], i) => P.pausa.push(`${kick(`${i + 1} DE 4`)}
<div style="position:absolute;left:72px;top:230px;font-size:200px">${e}</div>
<div class="t" style="top:520px;font-size:110px">${t}</div>
<div class="card" style="position:absolute;left:72px;right:72px;top:720px;font-size:44px;font-weight:600;line-height:1.3">${d}</div>${firma(2 + i, 6)}`));
P.pausa.push(`<div class="t" style="top:260px;font-size:96px">¿Lo <span class="ac">hiciste?</span></div>
<div class="t" style="top:500px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">Etiqueta a quien lleva 3 horas sin levantarse 👀</div>
<div class="card" style="position:absolute;left:72px;right:72px;top:760px;font-size:30px;color:${K.s};line-height:1.35">Si sientes dolor, detente. Esta rutina no sustituye una valoración médica.</div>${firma(6, 6)}`);

// ── Lecciones de médico a fundador ──
const lecciones = [['Diagnóstico antes que tratamiento', 'En consulta y en empresas, el problema real casi nunca es el primero que te cuentan.'], ['Sin datos, solo hay opiniones', 'Antes de cambiar algo, mídelo: horas, gastos, faltas, respuestas.'], ['Prevenir sale más barato', 'Igual que en la salud: corregir tarde siempre cuesta más.'], ['La tecnología sirve si alguien la usa', 'Por eso construyo sobre lo que la gente ya usa todos los días, como WhatsApp.'], ['Constancia > inspiración', 'Publicar, medir y mejorar todos los días, aunque nadie esté mirando todavía.']];
P.lecciones = [`${kick('DETRÁS DE CÁMARAS')}
<div class="t" style="top:280px;font-size:92px">De médico laboral a <span class="ac">fundador</span></div>
<div class="t" style="top:600px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">5 lecciones mientras construyo dos empresas desde San Luis Potosí.</div>${firma(1, 7)}`];
lecciones.forEach(([t, d], i) => P.lecciones.push(`<div style="position:absolute;left:72px;top:150px;font-size:220px;font-weight:800;color:${K.t};line-height:1">${i + 1}</div>
<div class="t" style="top:470px;font-size:80px">${t}</div>
<div class="t" style="top:760px;font-size:44px;font-weight:600;color:${K.s};line-height:1.3">${d}</div>${firma(2 + i, 7)}`));
P.lecciones.push(`<div class="t" style="top:280px;font-size:92px">¿Cuál te hace más <span class="ac">sentido?</span></div>
<div class="t" style="top:560px;font-size:46px;font-weight:600;color:${K.s};line-height:1.3">Dime el número en comentarios. Y si estás emprendiendo, cuéntame tu lección #6.</div>${firma(7, 7)}`);

// ── Tarjetas de encuesta (plan B si LinkedIn no acepta la encuesta por API) ──
const enc = { enc_silla: ['¿Cuántas horas al día pasa sentado tu equipo?', ['Menos de 4 h', 'De 4 a 6 h', 'Más de 6 h', 'No lo medimos']],
  enc_ia: ['¿Cómo usas hoy la IA en tu trabajo?', ['Todos los días', 'Algunas veces', 'Quiero empezar', 'No confío en ella']],
  enc_gasto: ['¿Qué gasto de personal se le escapa más a tu empresa?', ['Horas extra', 'Rotación', 'Ausentismo', 'Errores de nómina']],
  enc_reto: ['¿Cuál será el mayor reto de RRHH en 2027?', ['Jornada de 46 horas', 'Registro electrónico', 'Retener talento', 'Salud mental (NOM-035)']] };
for (const [k, [q, ops]] of Object.entries(enc)) P[k] = [`${kick('ENCUESTA · VOTA EN COMENTARIOS')}
<div class="t" style="top:220px;font-size:80px">${q}</div>
<div style="position:absolute;left:72px;right:72px;top:620px;display:flex;flex-direction:column;gap:22px">${ops.map((o, i) => `<div class="card" style="display:flex;gap:26px;align-items:center;font-size:42px;font-weight:700"><span class="ac" style="font-size:48px;font-weight:800">${i + 1}</span>${o}</div>`).join('')}</div>${firma()}`];

(async () => {
  const OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [pieza, laminas] of Object.entries(P)) {
    if (process.argv[2] && pieza !== process.argv[2]) continue;
    for (let i = 0; i < laminas.length; i++) {
      await pg.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${MCSS}</style></head><body><div class="f" style="padding:72px">${laminas[i]}</div></body></html>`);
      await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(100);
      await pg.screenshot({ path: path.join(OUT, `${pieza}_${String(i + 1).padStart(2, '0')}.jpg`), type: 'jpeg', quality: 90 });
    }
    console.log('ok', pieza, laminas.length);
  }
  await b.close();
})();
