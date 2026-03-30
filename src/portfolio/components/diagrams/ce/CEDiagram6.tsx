/** CEDiagram6 — "만들고 버린 것"
 * Format: Foundation Plan — 92 surface blocks, 3 rooted columns
 * El Croquis Design System §12
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* deterministic pseudo-random from seed */
function hash(i: number) {
  let h = i * 2654435761;
  h = ((h >>> 16) ^ h) * 0x45d9f3b;
  return ((h >>> 16) ^ h) >>> 0;
}

export function CEDiagram6() {
  const W = 680, H = 340;
  const gradeY = 148;           // ground line Y
  const ox = 30;                // left margin
  const fieldW = W - ox * 2;    // usable width

  /* ── 92 blocks ── */
  const N = 92;
  const survived = [18, 49, 76]; // indices of the 3 survivors

  /* generate block positions — irregular widths, packed horizontally */
  const blocks: { x: number; w: number; h: number; isSurvivor: boolean; label?: string }[] = [];
  const labels = ["추정하라", "선택하라", "읽어라"];
  const subs   = ["TOKEN ESTIMATE", "GATE SELECT", "PROGRESSIVE READ"];

  let cursor = ox;
  const baseGap = (fieldW - N * 5.8) / N; // approximate gap

  for (let i = 0; i < N; i++) {
    const seed = hash(i);
    const w = 3.5 + (seed % 5) * 0.7;             // 3.5 ~ 6.3
    const h = 10 + (seed % 22);                     // 10 ~ 31
    const gap = baseGap * 0.5 + (seed % 3) * 0.4;   // irregular gap
    const isSurvivor = survived.includes(i);

    blocks.push({
      x: cursor,
      w: isSurvivor ? 7 : w,
      h: isSurvivor ? 38 : h,
      isSurvivor,
      label: isSurvivor ? labels[survived.indexOf(i)] : undefined,
    });
    cursor += (isSurvivor ? 7 : w) + gap;
  }

  /* scale to fit if overflow */
  const totalW = cursor - ox;
  const scale = totalW > fieldW ? fieldW / totalW : 1;

  /* root card positions */
  const rootY = gradeY + 14;
  const cardY = H - 68;
  const cardW = 80, cardH = 36;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 720 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* Title */}
        <text x={ox} y={20} fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
          FILE MANIFEST
        </text>
        <line x1={ox} y1={28} x2={ox + 80} y2={28}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        <text x={W - ox} y={20} textAnchor="end" fontFamily={EC.font} fontSize={7}
          fontWeight={200} fill={EC.gray60} style={{ letterSpacing: "1px" }}>
          92 FILES BUILT · 89 DEMOLISHED
        </text>

        {/* ── Grade line (ground) ── */}
        <line x1={0} y1={gradeY} x2={W} y2={gradeY}
          stroke={EC.black} strokeWidth={EC.lineReg} />

        {/* ── Surface blocks ── */}
        <g transform={`scale(${scale}, 1)`}>
          {blocks.map((b, i) => {
            if (b.isSurvivor) return null;
            return (
              <rect key={i}
                x={b.x} y={gradeY - b.h}
                width={b.w} height={b.h}
                fill="none" stroke={EC.black} strokeWidth={EC.lineReg}
                opacity={0.18} />
            );
          })}
        </g>

        {/* ── 3 Survivors: surface block + root column ── */}
        {blocks.filter(b => b.isSurvivor).map((b, i) => {
          const bx = b.x * scale;
          const bw = b.w * scale;
          const cx = bx + bw / 2;

          return (
            <g key={`s${i}`}>
              {/* Surface block — filled accent */}
              <rect x={bx} y={gradeY - b.h} width={bw} height={b.h}
                fill={EC.accent} opacity={0.85} />

              {/* Root column — penetrates grade line */}
              <line x1={cx} y1={gradeY} x2={cx} y2={cardY}
                stroke={EC.accent} strokeWidth={EC.lineBold} />

              {/* Root terminus dot */}
              <circle cx={cx} cy={cardY} r={2} fill={EC.accent} />

              {/* Label card */}
              <rect x={cx - cardW / 2} y={cardY + 4} width={cardW} height={cardH}
                fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />

              <text x={cx} y={cardY + 20} textAnchor="middle"
                fontFamily={EC.font} fontSize={9} fontWeight={300} fill={EC.accent}>
                {b.label}
              </text>
              <text x={cx} y={cardY + 32} textAnchor="middle"
                fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                {subs[i]}
              </text>
            </g>
          );
        })}

        {/* ── Grade line label ── */}
        <text x={W - ox} y={gradeY - 4} textAnchor="end"
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}
          style={{ letterSpacing: "1px" }}>
          GRADE LINE
        </text>

        {/* ── Hero fraction ── */}
        <text x={W / 2} y={H - 8} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60}>
          <tspan fill={EC.accent} fontWeight={300}>3</tspan>
          <tspan> / 92</tspan>
        </text>
      </svg>
    </div>
  );
}
