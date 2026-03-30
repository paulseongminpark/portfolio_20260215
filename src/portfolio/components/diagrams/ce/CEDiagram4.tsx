/** CEDiagram4 — "읽기의 순서"
 * Format: Vertical Descent — shrinking circles with cost tags
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

export function CEDiagram4({ diptych }: { diptych?: boolean } = {}) {
  const W = 420, H = 360;
  const cx = 160;

  const steps = [
    { label: "INDEX",     sub: "00_index.md",          cost: "~100t",  r: 42 },
    { label: "SYMBOLS",   sub: "get_symbols_overview",  cost: "~500t",  r: 33 },
    { label: "SIGNATURE", sub: "find_symbol(body=F)",   cost: "~200t",  r: 24 },
    { label: "BODY",      sub: "Full context read",     cost: "Varies", r: 15 },
  ];

  /* vertical positions: accumulate based on radius + gap */
  const positions: number[] = [];
  let py = 52;
  for (const s of steps) {
    py += s.r;
    positions.push(py);
    py += s.r + 14;
  }

  const tagX = cx + 70;

  return (
    <div style={diptych ? {} : { margin: "48px auto 40px", maxWidth: 460 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* Title */}
        <text x={cx} y={22} textAnchor="middle" fontFamily={EC.font} fontSize={9}
          fontWeight={300} fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
          PROGRESSIVE READING
        </text>
        <line x1={cx - 60} y1={30} x2={cx + 60} y2={30}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* Depth axis label */}
        <g transform={`translate(24, ${positions[0]})`}>
          <line x1={0} y1={0} x2={0} y2={positions[3] - positions[0]}
            stroke={EC.gray85} strokeWidth={EC.lineReg} />
          <text x={0} y={-8} textAnchor="middle" fontFamily={EC.font} fontSize={6}
            fontWeight={200} fill={EC.gray60} style={{ letterSpacing: "1px" }}>
            BROAD
          </text>
          <text x={0} y={positions[3] - positions[0] + 12} textAnchor="middle"
            fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}
            style={{ letterSpacing: "1px" }}>
            DEEP
          </text>
        </g>

        {/* Connector spine */}
        {steps.map((s, i) => {
          if (i === steps.length - 1) return null;
          const y1 = positions[i] + s.r;
          const y2 = positions[i + 1] - steps[i + 1].r;
          return (
            <line key={i} x1={cx} y1={y1} x2={cx} y2={y2}
              stroke={EC.gray85} strokeWidth={EC.lineLight} />
          );
        })}

        {/* Steps */}
        {steps.map((s, i) => {
          const y = positions[i];
          const isLast = i === steps.length - 1;
          const stk = isLast ? EC.gray60 : EC.black;
          const stw = i === 0 ? EC.lineBold : EC.lineReg;

          return (
            <g key={i}>
              {/* Halo */}
              <circle cx={cx} cy={y} r={s.r + 4}
                fill="none" stroke={EC.gray90} strokeWidth={EC.lineLight} />

              {/* Main circle */}
              <circle cx={cx} cy={y} r={s.r}
                fill="white" stroke={stk} strokeWidth={stw} />

              {/* Label inside circle */}
              <text x={cx} y={y + 1} textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={s.r > 20 ? 9 : 7} fontWeight={300}
                fill={stk} style={{ letterSpacing: "0.5px" }}>
                {s.label}
              </text>

              {/* ── Cost tag (rectangle, right side) ── */}
              <line x1={cx + s.r} y1={y} x2={tagX - 2} y2={y}
                stroke={EC.gray85} strokeWidth={EC.lineLight} />

              <rect x={tagX} y={y - 14} width={72} height={28}
                fill="none" stroke={EC.gray85} strokeWidth={EC.lineLight} />
              <text x={tagX + 36} y={y - 2} textAnchor="middle"
                fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                {s.sub}
              </text>
              <text x={tagX + 36} y={y + 10} textAnchor="middle"
                fontFamily={EC.font} fontSize={9} fontWeight={300} fill={EC.black}
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {s.cost}
              </text>
            </g>
          );
        })}

        {/* "대부분 여기서 끝남" annotation at SIGNATURE level */}
        {(() => {
          const ay = positions[2];
          return (
            <g>
              <line x1={cx - steps[2].r - 4} y1={ay} x2={52} y2={ay}
                stroke={EC.accent} strokeWidth={EC.lineLight} />
              <circle cx={52} cy={ay} r={1.5} fill={EC.accent} />
              <text x={50} y={ay - 6} textAnchor="end"
                fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.accent}>
                대부분 여기서
              </text>
              <text x={50} y={ay + 6} textAnchor="end"
                fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.accent}>
                끝남
              </text>
            </g>
          );
        })()}

        {/* Bottom caption */}
        <text x={cx} y={H - 12} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60}>
          인덱스만 읽으면 되는데 전문을 읽는 건 낭비다
        </text>
      </svg>
    </div>
  );
}
