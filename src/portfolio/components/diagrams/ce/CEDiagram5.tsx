/** CEDiagram5 — "무거워지면"
 * Format: Arc Gauge — semicircular pressure meter with threshold zones
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

/* point on arc at fraction f (0=left, 1=right) */
function ap(cx: number, cy: number, r: number, f: number) {
  const a = Math.PI * (1 - f);
  return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
}

/* SVG arc path from f1 to f2 along upper semicircle */
function arcD(cx: number, cy: number, r: number, f1: number, f2: number) {
  const p1 = ap(cx, cy, r, f1), p2 = ap(cx, cy, r, f2);
  const lg = (f2 - f1) > 0.5 ? 1 : 0;
  return `M${p1.x.toFixed(1)},${p1.y.toFixed(1)} A${r},${r} 0 ${lg} 1 ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
}

export function CEDiagram5() {
  const W = 500, H = 280;
  const cx = 250, cy = 215, r = 135, sw = 14;

  const zones = [
    { f1: 0,   f2: 0.5, color: EC.gray90 },
    { f1: 0.5, f2: 0.7, color: EC.gray85 },
    { f1: 0.7, f2: 0.9, color: EC.gray40 },
    { f1: 0.9, f2: 1.0, color: EC.accent },
  ];

  const marks = [
    { f: 0.5, val: "500K", action: "SAVE",     note: "Optional" },
    { f: 0.7, val: "700K", action: "COMPACT",   note: "Mandatory" },
    { f: 0.9, val: "900K", action: "HANDOVER",  note: "Critical" },
  ];

  const ri = r - sw / 2 - 3;   // inner tick radius
  const ro = r + sw / 2 + 3;   // outer tick radius
  const rl = r + sw / 2 + 18;  // label radius

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 540 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* Title */}
        <text x={cx} y={20} textAnchor="middle" fontFamily={EC.font} fontSize={9}
          fontWeight={300} fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
          CONTEXT LOAD MANAGEMENT
        </text>
        <line x1={cx - 80} y1={28} x2={cx + 80} y2={28}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* Outer halo arc */}
        <path d={arcD(cx, cy, ro + 2, 0, 1)}
          fill="none" stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* Zone arcs */}
        {zones.map((z, i) => (
          <path key={i} d={arcD(cx, cy, r, z.f1, z.f2)}
            fill="none" stroke={z.color} strokeWidth={sw} strokeLinecap="butt" />
        ))}

        {/* Threshold radial marks + labels */}
        {marks.map((m, i) => {
          const pin = ap(cx, cy, ri, m.f);
          const pout = ap(cx, cy, ro, m.f);
          const pl = ap(cx, cy, rl, m.f);
          const isLast = i === marks.length - 1;
          const col = isLast ? EC.accent : EC.black;

          return (
            <g key={i}>
              {/* Radial tick */}
              <line x1={pin.x} y1={pin.y} x2={pout.x} y2={pout.y}
                stroke={col} strokeWidth={EC.lineReg} />

              {/* Value */}
              <text x={pl.x} y={pl.y - 3} textAnchor="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={300} fill={col}
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {m.val}
              </text>

              {/* Action */}
              <text x={pl.x} y={pl.y + 8} textAnchor="middle"
                fontFamily={EC.font} fontSize={7} fontWeight={200}
                fill={isLast ? EC.accent : EC.gray60}>
                {m.action}
              </text>
            </g>
          );
        })}

        {/* Scale endpoints */}
        <text x={ap(cx, cy, r, 0).x - 14} y={cy + 4}
          textAnchor="middle" fontFamily={EC.font} fontSize={7}
          fontWeight={200} fill={EC.gray60}>0</text>
        <text x={ap(cx, cy, r, 1).x + 14} y={cy + 4}
          textAnchor="middle" fontFamily={EC.font} fontSize={7}
          fontWeight={200} fill={EC.gray60}>1M</text>

        {/* Center label inside arc */}
        <text x={cx} y={cy - 40} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}
          style={{ letterSpacing: "1px" }}>
          CONTEXT LOAD
        </text>

        {/* Bottom caption */}
        <text x={cx} y={H - 10} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60}>
          저장하고, 압축하고, 넘긴다
        </text>
      </svg>
    </div>
  );
}
