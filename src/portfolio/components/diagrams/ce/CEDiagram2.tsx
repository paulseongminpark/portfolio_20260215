/** CEDiagram2 — "정보에는 수명이 있다"
 * Format: Persistence Waveform — four pulse-density tracks on a time axis
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

function pulses(count: number, spacing: number, width: number): number[][] {
  return Array.from({ length: count }, (_, i) => [i * spacing + 0.005, width]);
}

export function CEDiagram2() {
  const W = 620, H = 280;
  const ox = 120, tw = 400;
  const th = 30, gap = 18;
  const oy = 56;

  /* top = volatile (L3), bottom = stable (L0) */
  const tracks = [
    { id: "L3", name: "LIVE",    freq: "Real-time",   bars: pulses(25, 0.038, 0.01),  op: 0.22 },
    { id: "L2", name: "TASK",    freq: "Per Task",    bars: [
        [0.02,.08],[0.12,.06],[0.21,.07],
        [0.37,.10],[0.49,.07],[0.58,.06],
        [0.72,.08],[0.82,.07],[0.92,.06],
      ], op: 0.32 },
    { id: "L1", name: "SESSION", freq: "Per Session",  bars: [[0,.30],[.35,.30],[.70,.30]], op: 0.55 },
    { id: "L0", name: "STATIC",  freq: "Permanent",    bars: [[0,1.0]], op: 1.0 },
  ];

  const boundaryY = oy + 2 * (th + gap) - gap / 2;
  const dimY = oy + 4 * (th + gap) + 6;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 660 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* Title */}
        <text x={ox} y={22} fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
          INFORMATION LIFECYCLE
        </text>
        <line x1={ox} y1={30} x2={ox + 120} y2={30}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        <text x={ox + tw} y={38} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          style={{ letterSpacing: "1px" }}>
          TIME →
        </text>

        {/* Stability arrow */}
        <g transform={`translate(28, ${oy})`}>
          <line x1={0} y1={4} x2={0} y2={4 * (th + gap) - gap - 4}
            stroke={EC.gray85} strokeWidth={EC.lineReg} />
          <text x={0} y={-4} textAnchor="middle"
            fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}
            style={{ letterSpacing: "1px" }}>VOLATILE</text>
          <text x={0} y={4 * (th + gap) - gap + 12} textAnchor="middle"
            fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}
            style={{ letterSpacing: "1px" }}>STABLE</text>
        </g>

        {/* Tracks */}
        {tracks.map((t, i) => {
          const y = oy + i * (th + gap);
          return (
            <g key={t.id}>
              {/* Label left */}
              <text x={ox - 8} y={y + th / 2 - 3} textAnchor="end"
                fontFamily={EC.font} fontSize={9} fontWeight={300} fill={EC.black}>
                {t.name}
              </text>
              <text x={ox - 8} y={y + th / 2 + 8} textAnchor="end"
                fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                {t.id}
              </text>

              {/* Baseline */}
              <line x1={ox} y1={y + th} x2={ox + tw} y2={y + th}
                stroke={EC.gray90} strokeWidth={EC.lineLight} />

              {/* Bars */}
              {t.bars.map(([px, pw], j) => (
                <rect key={j} x={ox + px * tw} y={y}
                  width={Math.max(pw * tw, 1.5)} height={th}
                  fill={EC.black} opacity={t.op} />
              ))}

              {/* Frequency right */}
              <text x={ox + tw + 12} y={y + th / 2 + 3}
                fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                {t.freq}
              </text>
            </g>
          );
        })}

        {/* Persistence boundary between L1 (cached) and L2 (volatile) */}
        <line x1={ox - 4} y1={boundaryY} x2={ox + tw + 4} y2={boundaryY}
          stroke={EC.accent} strokeWidth={EC.lineBold}
          strokeDasharray="4 2" opacity={0.45} />
        <text x={ox + tw + 12} y={boundaryY + 3}
          fontFamily={EC.font} fontSize={6} fontWeight={300} fill={EC.accent}
          style={{ letterSpacing: "0.5px" }}>
          CACHE
        </text>

        {/* Session boundaries */}
        {[0.33, 0.67].map((x, i) => (
          <line key={i}
            x1={ox + x * tw} y1={oy - 4}
            x2={ox + x * tw} y2={oy + 4 * (th + gap) - gap}
            stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="3 3" />
        ))}

        {/* Session dimension line */}
        <g>
          <line x1={ox} y1={dimY} x2={ox + 0.30 * tw} y2={dimY}
            stroke={EC.gray60} strokeWidth={EC.lineLight} />
          <line x1={ox} y1={dimY - 3} x2={ox} y2={dimY + 3}
            stroke={EC.gray60} strokeWidth={EC.lineLight} />
          <line x1={ox + 0.30 * tw} y1={dimY - 3} x2={ox + 0.30 * tw} y2={dimY + 3}
            stroke={EC.gray60} strokeWidth={EC.lineLight} />
          <text x={ox + 0.15 * tw} y={dimY + 12} textAnchor="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
            ONE SESSION
          </text>
        </g>
      </svg>
    </div>
  );
}
