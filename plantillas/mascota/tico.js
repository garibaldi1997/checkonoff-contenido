// TICO, la mascota de CheckONOFF: un reloj checador con cara. Brazo verde = ON (✓), brazo rojo = OFF (➜).
// TICO.svg({ cara, pose, t, habla, tam }) devuelve un <svg>. cara: feliz|habla|sorpresa|serio|enojado|guino|pensando|risa
// pose: normal|saluda|senala|pulgar|brazos|hombros|panico|jarra. habla: 0..1 apertura de boca (lip-sync). t: segundos (parpadeo, respiración).
(function () {
  const INK = '#151B2E', VERDE = '#34B614', ROJO = '#E21B20', AZUL = '#0A4E94';
  const rad = d => d * Math.PI / 180;
  // ángulos de [hombro, codo] en grados (0 = abajo, positivo = hacia afuera/arriba) por brazo [izq ON, der OFF]
  const POSES = {
    normal: [[25, 10], [25, 10]],
    saluda: [[25, 10], [140, 40]],
    senala: [[25, 10], [95, 0]],
    pulgar: [[120, 70], [25, 10]],
    brazos: { e: [70, 95], h: [170, 75] },
    hombros: [[100, 80], [100, 80]],
    panico: [[160, 70], [160, 70]],
    jarra: { e: [-55, 40], h: [-5, 85] },
  };
  function brazo(lado, ang, color, t, pose) {
    const s = lado === 'i' ? -1 : 1, sx = 200 + s * 150, sy = 275;
    let ex, ey, hx, hy;
    if (!Array.isArray(ang)) { ex = sx + s * -ang.e[0]; ey = sy + ang.e[1]; hx = sx + s * -ang.h[0]; hy = sy + ang.h[1]; }
    else {
      let [a1, a2] = ang;
      if (pose === 'saluda' && lado === 'd') a2 += Math.sin(t * 9) * 22;
      if (pose === 'panico') a1 += Math.sin(t * 14 + (s > 0 ? 1 : 0)) * 6;
      const L1 = 70, L2 = 62;
      ex = sx + s * Math.sin(rad(a1)) * L1; ey = sy + Math.cos(rad(a1)) * L1;
      hx = ex + s * Math.sin(rad(a1 + a2)) * L2; hy = ey + Math.cos(rad(a1 + a2)) * L2;
    }
    const path = `M${sx},${sy} Q${ex},${ey} ${hx},${hy}`;
    const icono = lado === 'i'
      ? `<path d="M-12,0 L-4,9 L13,-10" fill="none" stroke="${VERDE}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<path d="M-12,0 L12,0 M4,-8 L12,0 L4,8" fill="none" stroke="${ROJO}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    const mano = `<g transform="translate(${hx},${hy})"><circle r="27" fill="#fff" stroke="${INK}" stroke-width="7"/>${icono}</g>`;
    return `<path d="${path}" fill="none" stroke="${INK}" stroke-width="30" stroke-linecap="round"/><path d="${path}" fill="none" stroke="${color}" stroke-width="17" stroke-linecap="round"/>${mano}`;
  }
  function ojos(cara, t) {
    const parp = (t % 3.7) > 3.55 && !['risa', 'guino'].includes(cara);
    const ojo = (x, cerrado, mira = 0) => cerrado
      ? `<path d="M${x - 17},200 Q${x},210 ${x + 17},200" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`
      : `<ellipse cx="${x + mira}" cy="196" rx="${cara === 'sorpresa' ? 21 : 17}" ry="${cara === 'sorpresa' ? 28 : 24}" fill="${INK}"/><circle cx="${x + mira + 5}" cy="188" r="6" fill="#fff"/>`;
    if (cara === 'risa') return `<path d="M143,200 Q160,182 177,200 M223,200 Q240,182 257,200" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    if (cara === 'guino') return ojo(160, false) + `<path d="M223,198 Q240,186 257,198" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    const m = cara === 'pensando' ? 6 : 0;
    let o = ojo(160, parp, m) + ojo(240, parp, m);
    if (cara === 'serio') o += `<rect x="138" y="168" width="124" height="16" fill="#fff"/><path d="M140,180 L180,180 M220,180 L260,180" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    return o;
  }
  function cejas(cara) {
    const c = { feliz: [-6, 6], habla: [-4, 4], sorpresa: [-14, 14], serio: [0, 0], enojado: [16, -16], guino: [-6, 10], pensando: [-12, 4], risa: [-8, 8] }[cara] || [0, 0];
    return `<path d="M140,${160 + c[0] * .4} L178,${160 - c[0] * .6}" stroke="${INK}" stroke-width="8" stroke-linecap="round" transform="translate(0,${c[0] < -10 ? -10 : 0})"/>
      <path d="M222,${160 - c[1] * .6} L260,${160 + c[1] * .4}" stroke="${INK}" stroke-width="8" stroke-linecap="round" transform="translate(0,${c[1] > 10 ? -10 : 0})"/>`;
  }
  function boca(cara, habla) {
    if (habla > .05 || cara === 'habla') {
      const h = 6 + 30 * Math.max(habla, cara === 'habla' ? .5 : 0);
      return `<path d="M176,252 Q200,${252 + h * .2} 224,252 Q224,${252 + h} 200,${252 + h} Q176,${252 + h} 176,252 Z" fill="${INK}"/><ellipse cx="200" cy="${250 + h * .85}" rx="13" ry="${Math.min(7, h * .25)}" fill="#F0717B"/>`;
    }
    switch (cara) {
      case 'sorpresa': return `<ellipse cx="200" cy="262" rx="16" ry="20" fill="${INK}"/>`;
      case 'serio': return `<path d="M180,262 L220,262" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
      case 'enojado': return `<path d="M178,270 Q200,252 222,270" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
      case 'pensando': return `<path d="M185,264 Q200,258 218,268" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
      case 'risa': return `<path d="M168,248 Q200,300 232,248 Z" fill="${INK}"/><path d="M182,272 Q200,286 218,272 Q200,262 182,272Z" fill="#F0717B"/>`;
      default: return `<path d="M174,252 Q200,282 226,252" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`;
    }
  }
  function svg(o = {}) {
    const cara = o.cara || 'feliz', pose = o.pose || 'normal', t = o.t || 0, habla = o.habla || 0, tam = o.tam || 400;
    const resp = Math.sin(t * 2.2) * 4, ang = POSES[pose] || POSES.normal;
    const marcas = Array.from({ length: 12 }, (_, k) => {
      const a = rad(k * 30), r1 = k % 3 ? 122 : 114, r2 = 132;
      return `<line x1="${200 + Math.sin(a) * r1}" y1="${215 - Math.cos(a) * r1}" x2="${200 + Math.sin(a) * r2}" y2="${215 - Math.cos(a) * r2}" stroke="${k % 3 ? '#9aa4b5' : INK}" stroke-width="${k % 3 ? 4 : 7}" stroke-linecap="round"/>`;
    }).join('');
    const pies = `<g transform="translate(0,${-resp * .2})"><path d="M172,370 L166,430 M228,370 L234,430" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <path d="M138,434 Q138,412 166,412 Q190,412 190,434 Z" fill="${AZUL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M210,434 Q210,412 234,412 Q262,412 262,434 Z" fill="${AZUL}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M134,436 L192,436 M208,436 L266,436" stroke="${INK}" stroke-width="7" stroke-linecap="round"/></g>`;
    const cuerpo = `<g transform="translate(0,${resp}) rotate(${pose === 'pensando' ? 4 : 0} 200 215)">
      <rect x="16" y="180" width="44" height="70" rx="14" fill="${VERDE}" stroke="${INK}" stroke-width="6"/>
      <rect x="340" y="180" width="44" height="70" rx="14" fill="${ROJO}" stroke="${INK}" stroke-width="6"/>
      <path d="M26,215 L44,203 L44,227 Z" fill="#fff"/><path d="M374,215 L356,203 L356,227 Z" fill="#fff"/>
      <circle cx="200" cy="215" r="160" fill="url(#ticoAro)" stroke="${INK}" stroke-width="7"/>
      <circle cx="200" cy="215" r="138" fill="url(#ticoCara)" stroke="${INK}" stroke-width="6"/>
      ${marcas}
      <ellipse cx="128" cy="240" rx="18" ry="10" fill="#F7A9B0" opacity=".7"/><ellipse cx="272" cy="240" rx="18" ry="10" fill="#F7A9B0" opacity=".7"/>
      ${cejas(cara)}${ojos(cara, t)}${boca(cara, habla)}
      <path d="M118,92 Q150,66 196,62" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".55"/>
    </g>`;
    const brazos = `<g transform="translate(0,${resp})">${brazo('i', Array.isArray(ang) ? ang[0] : ang, VERDE, t, pose)}${brazo('d', Array.isArray(ang) ? ang[1] : ang, ROJO, t, pose)}</g>`;
    const atras = false;
    return `<svg width="${tam}" height="${tam * 1.1}" viewBox="0 0 400 450" style="overflow:visible"><defs>
      <linearGradient id="ticoAro" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1E5FB8"/><stop offset=".55" stop-color="#1B7A6E"/><stop offset="1" stop-color="#2E9B2A"/></linearGradient>
      <radialGradient id="ticoCara" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#E4E9F1"/></radialGradient></defs>
      ${pies}${atras ? brazos + cuerpo : cuerpo + brazos}</svg>`;
  }
  // lip-sync a partir de los tiempos por palabra de Edge TTS: abre la boca mientras suena una palabra
  function habla(v, W) {
    const w = W.find((x, i) => v >= x.t && v < (x.t + (x.d || ((W[i + 1] || {}).t - x.t) || .3)));
    return w ? .35 + .65 * Math.abs(Math.sin((v - w.t) * 16)) : 0;
  }
  window.TICO = { svg, habla, POSES: Object.keys(POSES) };
})();
