// TICO, la mascota de CheckONOFF (v2, estilo línea limpia como la referencia del 04/11/2026).
// Un reloj con cara, contorno negro, un solo acento verde: el ✓ que le sale de la cabeza. Sin orejas ni íconos en las manos.
// TICO.svg({ cara, pose, t, habla, tam }) · cara: feliz|habla|sorpresa|serio|enojado|guino|pensando|risa
// pose: normal|saluda|senala|hombros|panico|jarra
(function () {
  const INK = '#16181D', VERDE = '#2FB36A', ROSA = '#F4A7A3';
  const rad = d => d * Math.PI / 180;
  const POSES = { normal: [[18, 6], [18, 6]], saluda: [[18, 6], [150, 30]], senala: [[18, 6], [92, 0]], hombros: [[95, 85], [95, 85]], panico: [[150, -25], [150, -25]], jarra: [[60, -120], [60, -120]] };
  function brazo(s, [a1, a2], t, pose) {
    if (pose === 'saluda' && s > 0) a2 += Math.sin(t * 8) * 20;
    if (pose === 'panico') a1 += Math.sin(t * 13 + s) * 5;
    const sx = 200 + s * 128, sy = 250, ex = sx + s * Math.sin(rad(a1)) * 62, ey = sy + Math.cos(rad(a1)) * 62;
    const hx = ex + s * Math.sin(rad(a1 + a2)) * 56, hy = ey + Math.cos(rad(a1 + a2)) * 56;
    return `<path d="M${sx},${sy} Q${ex},${ey} ${hx},${hy}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="15" fill="#fff" stroke="${INK}" stroke-width="7"/>`;
  }
  const L = (d, w = 7) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  function cara(c, t, habla) {
    const parp = (t % 3.7) > 3.56;
    const ojo = x => c === 'risa' ? L(`M${x - 14},192 Q${x},178 ${x + 14},192`) : c === 'guino' && x > 200 ? L(`M${x - 14},190 L${x + 14},190`)
      : parp ? L(`M${x - 13},192 L${x + 13},192`) : `<ellipse cx="${x + (c === 'pensando' ? 5 : 0)}" cy="190" rx="${c === 'sorpresa' ? 13 : 10}" ry="${c === 'sorpresa' ? 17 : 14}" fill="${INK}"/>`;
    const ceja = { enojado: L('M140,158 L176,170') + L('M224,170 L260,158'), serio: L('M142,168 L176,168') + L('M224,168 L258,168'), sorpresa: L('M142,152 Q159,142 176,152') + L('M224,152 Q241,142 258,152'), pensando: L('M142,166 L176,160') + L('M224,152 Q241,146 258,156') }[c] || '';
    let boca;
    if (habla > .05) { const h = 6 + 26 * habla; boca = `<path d="M182,236 Q200,236 218,236 Q216,${236 + h} 200,${236 + h} Q184,${236 + h} 182,236Z" fill="${INK}"/>`; }
    else boca = { sorpresa: `<ellipse cx="200" cy="244" rx="11" ry="14" fill="${INK}"/>`, serio: L('M184,242 L216,242'), enojado: L('M182,248 Q200,234 218,248'), pensando: L('M186,244 Q200,240 216,248'), risa: `<path d="M176,232 Q200,272 224,232Z" fill="${INK}"/>` }[c] || L('M180,234 Q200,256 220,234');
    return ceja + ojo(160) + ojo(240) + boca + `<ellipse cx="132" cy="222" rx="14" ry="8" fill="${ROSA}"/><ellipse cx="268" cy="222" rx="14" ry="8" fill="${ROSA}"/>`;
  }
  function svg(o = {}) {
    const c = o.cara || 'feliz', pose = o.pose || 'normal', t = o.t || 0, tam = o.tam || 400, r = Math.sin(t * 2.2) * 3;
    const marcas = [0, 90, 180, 270].map(a => { const x = Math.sin(rad(a)), y = -Math.cos(rad(a)); return L(`M${200 + x * 112},${205 + y * 112} L${200 + x * 126},${205 + y * 126}`, 6); }).join('');
    return `<svg width="${tam}" height="${tam * 1.12}" viewBox="0 0 400 448" style="overflow:visible">
      ${L('M176,340 L172,412 M224,340 L228,412', 9)}${L('M150,414 L180,414 M220,414 L250,414', 11)}
      <g transform="translate(0,${r})">
        ${L('M200,64 L200,40', 8)}${L('M186,30 L198,42 L222,16', 11).replace(INK, VERDE)}
        <circle cx="200" cy="205" r="140" fill="#fff" stroke="${INK}" stroke-width="9"/>
        ${marcas}${cara(c, t, o.habla || 0)}
        ${brazo(-1, (POSES[pose] || POSES.normal)[0], t, pose)}${brazo(1, (POSES[pose] || POSES.normal)[1], t, pose)}
      </g></svg>`;
  }
  function habla(v, W) {
    const w = W.find((x, i) => v >= x.t && v < x.t + (x.d || ((W[i + 1] || {}).t - x.t) || .3));
    return w ? .3 + .7 * Math.abs(Math.sin((v - w.t) * 15)) : 0;
  }
  window.TICO = { svg, habla, POSES: Object.keys(POSES) };
})();
