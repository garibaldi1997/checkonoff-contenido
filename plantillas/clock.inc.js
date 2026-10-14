const clock = (size, h = 10, m = 10) => {
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = i * 6 * Math.PI / 180, r1 = 172, r2 = i % 5 ? 164 : 150;
    return `<line x1="${200 + r1 * Math.sin(a)}" y1="${200 - r1 * Math.cos(a)}" x2="${200 + r2 * Math.sin(a)}" y2="${200 - r2 * Math.cos(a)}" stroke="#111C3B" stroke-width="${i % 5 ? 2 : 5}" stroke-linecap="round"/>`;
  }).join('');
  const nums = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1, a = n * 30 * Math.PI / 180;
    return `<text x="${200 + 126 * Math.sin(a)}" y="${200 - 126 * Math.cos(a) + 15}" text-anchor="middle" font-family="Inter" font-weight="600" font-size="44" fill="#111C3B">${n}</text>`;
  }).join('');
  const ha = (h % 12 + m / 60) * 30, ma = m * 6;
  return `<svg width="${size}" height="${size * 1.08}" viewBox="0 -30 400 432" style="filter:drop-shadow(0 40px 50px rgba(0,25,0,.45))">
  <defs>
    <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b6f73"/><stop offset=".35" stop-color="#2a2d30"/><stop offset=".7" stop-color="#121314"/><stop offset="1" stop-color="#4a4d50"/></linearGradient>
    <radialGradient id="face" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#eef3f2"/><stop offset="1" stop-color="#cfd8d6"/></radialGradient>
    <linearGradient id="crown" x1="0" x2="1"><stop offset="0" stop-color="#777"/><stop offset=".5" stop-color="#ddd"/><stop offset="1" stop-color="#666"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <rect x="182" y="-26" width="36" height="34" rx="6" fill="url(#crown)"/><rect x="176" y="-6" width="48" height="12" rx="5" fill="#444"/>
  ${Array.from({ length: 8 }, (_, i) => `<line x1="${186 + i * 4}" y1="-24" x2="${186 + i * 4}" y2="6" stroke="#555" stroke-width="1"/>`).join('')}
  <circle cx="200" cy="200" r="198" fill="url(#rim)"/>
  <circle cx="200" cy="200" r="182" fill="#0d0e0f"/>
  <circle cx="200" cy="200" r="178" fill="url(#face)"/>
  ${ticks}${nums}
  <g transform="rotate(${ha} 200 200)"><rect x="193" y="98" width="14" height="118" rx="7" fill="#111C3B"/></g>
  <g transform="rotate(${ma} 200 200)"><rect x="195" y="52" width="10" height="164" rx="5" fill="#111C3B"/></g>
  <g transform="rotate(${ma + 150} 200 200)"><line x1="200" y1="235" x2="200" y2="58" stroke="#D93025" stroke-width="3"/></g>
  <circle cx="200" cy="200" r="13" fill="#111C3B"/><circle cx="200" cy="200" r="6" fill="#c9a227"/>
  <path d="M60 120 A 160 160 0 0 1 250 40 A 200 200 0 0 0 60 120Z" fill="url(#glass)"/>
  </svg>`;
};
