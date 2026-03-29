/** CEDiagram1 — "만들수록 줄어들었다"
 * Format: Erosion Section Strip — proportional allocation with dimension lines
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

export function CEDiagram1() {
  const W = 620, H = 260;

  const rows = [
    { ver: "v3.0",   cap: "200K", n: 24, sys: 0.20, tool: 0.60, bw: 360 },
    { ver: "v3.3.1", cap: "200K", n: 15, sys: 0.20, tool: 0.35, bw: 360 },
    { ver: "v5.0",   cap: "1M",   n: 3,  sys: 0.04, tool: 0.02, bw: 480 },
  ];

  const sH = 38, gap = 28, ox = 80, oy = 54;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 660 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        <defs>
          <pattern id="ce1-hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="4" stroke={EC.gray60} strokeWidth={0.4} />
          </pattern>
        </defs>

        {/* Title */}
        <text x={ox} y={22} fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
          CONTEXT WINDOW ALLOCATION
        </text>
        <line x1={ox} y1={30} x2={ox + 155} y2={30}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {rows.map((r, i) => {
          const y = oy + i * (sH + gap);
          const sw = r.bw * r.sys;
          const tw = r.bw * r.tool;
          const last = i === 2;

          return (
            <g key={i}>
              {/* Left annotation */}
              <text x={ox - 10} y={y + 14} textAnchor="end"
                fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black}>
                {r.ver}
              </text>
              <text x={ox - 10} y={y + 26} textAnchor="end"
                fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                {r.cap}
              </text>

              {/* Strip frame */}
              <rect x={ox} y={y} width={r.bw} height={sH}
                fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />

              {/* System zone — hatched */}
              <rect x={ox} y={y} width={sw} height={sH} fill="url(#ce1-hatch)" />

              {/* Tools zone — faint fill */}
              {tw > 1 && (
                <rect x={ox + sw} y={y} width={tw} height={sH}
                  fill={EC.black} opacity={0.06} />
              )}

              {/* Internal dividers */}
              {sw > 2 && (
                <line x1={ox + sw} y1={y} x2={ox + sw} y2={y + sH}
                  stroke={EC.gray85} strokeWidth={EC.lineLight} />
              )}
              {tw > 3 && (
                <line x1={ox + sw + tw} y1={y} x2={ox + sw + tw} y2={y + sH}
                  stroke={EC.gray85} strokeWidth={EC.lineLight} />
              )}

              {/* Dimension line — tool span */}
              {tw > 18 && (
                <g>
                  <line x1={ox + sw} y1={y - 7} x2={ox + sw + tw} y2={y - 7}
                    stroke={EC.gray60} strokeWidth={EC.lineLight} />
                  <line x1={ox + sw} y1={y - 11} x2={ox + sw} y2={y - 3}
                    stroke={EC.gray60} strokeWidth={EC.lineLight} />
                  <line x1={ox + sw + tw} y1={y - 11} x2={ox + sw + tw} y2={y - 3}
                    stroke={EC.gray60} strokeWidth={EC.lineLight} />
                  <text x={ox + sw + tw / 2} y={y - 13} textAnchor="middle"
                    fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                    {r.n} TOOLS
                  </text>
                </g>
              )}

              {/* Accent highlight on v5.0 workspace */}
              {last && (
                <rect x={ox + sw + tw} y={y} width={r.bw - sw - tw} height={sH}
                  fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} opacity={0.3} />
              )}

              {/* Hero number */}
              <text
                x={ox + r.bw + 28} y={y + sH / 2 + 10}
                fontFamily={EC.font} fontSize={last ? 32 : 26} fontWeight={200}
                fill={last ? EC.accent : EC.black}
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {r.n}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <g transform={`translate(${ox}, ${H - 14})`}>
          <rect width={8} height={8} fill="url(#ce1-hatch)"
            stroke={EC.gray85} strokeWidth={EC.lineLight} />
          <text x={14} y={7} fontFamily={EC.font} fontSize={7}
            fontWeight={200} fill={EC.gray60}>SYSTEM</text>

          <rect x={62} width={8} height={8} fill={EC.black} opacity={0.06}
            stroke={EC.gray85} strokeWidth={EC.lineLight} />
          <text x={76} y={7} fontFamily={EC.font} fontSize={7}
            fontWeight={200} fill={EC.gray60}>TOOLS</text>

          <rect x={118} width={8} height={8} fill="none"
            stroke={EC.black} strokeWidth={EC.lineReg} />
          <text x={132} y={7} fontFamily={EC.font} fontSize={7}
            fontWeight={200} fill={EC.gray60}>WORKSPACE</text>
        </g>
      </svg>
    </div>
  );
}
