/**
 * ORCHDiagram1B — v6 To-Be: 정리된 커널 구조
 * viewBox와 y분포를 Diagram1과 동일하게 맞춰 annotation 정렬
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray20:    "#333333",
  gray30:    "#4D4D4D",
  gray50:    "#808080",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineReg:   0.75,
  lineBold:  1,
  lineHeavy: 1.5,
} as const;

// Center matched to Diagram1's visual center
const CX = 380, CY = 270;

const pillars = [
  { label: "Guards",  num: "14", x: CX - 120, y: 150 },
  { label: "Skills",  num: "13", x: CX + 120, y: 150 },
  { label: "Workers", num: "3",  x: CX,       y: 400 },
];

const systems = [
  { label: "mcp-memory",      x: CX - 210, y: CY + 10,  role: "기억" },
  { label: "context-cascade", x: CX + 210, y: CY + 10,  role: "주입" },
  { label: "auto-iterate",    x: CX - 140, y: 440,       role: "측정" },
  { label: "index-system",    x: CX + 140, y: 440,       role: "연결" },
];

export function ORCHDiagram1B() {
  return (
    <div>
      <svg viewBox="0 0 760 520" width="100%" style={{ display: "block" }}>

        {/* ── "kernel" label above orch circle (accent) ── */}
        <text x={CX} y={CY - 40}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={14} fontWeight={300}
          fill={EC.accent} letterSpacing="1px">
          kernel
        </text>

        {/* ── Connections: kernel → pillars ── */}
        {pillars.map((p, i) => (
          <line key={`kp-${i}`}
            x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke={EC.gray30} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Connections: kernel → systems ── */}
        {systems.map((s, i) => (
          <line key={`ks-${i}`}
            x1={CX} y1={CY} x2={s.x} y2={s.y}
            stroke={EC.gray50} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Outer system nodes ── */}
        {systems.map((s, i) => (
          <g key={`sys-${i}`}>
            <circle cx={s.x} cy={s.y} r={7}
              fill="rgba(0,0,0,0.04)" stroke={EC.gray30} strokeWidth={EC.lineReg} />
            <text x={s.x} y={s.y + 22}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={15} fontWeight={300}
              fill={EC.gray20}>
              {s.label}
            </text>
            <text x={s.x} y={s.y + 39}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={13} fontWeight={200}
              fill={EC.gray50}>
              {s.role}
            </text>
          </g>
        ))}

        {/* ── Pillar nodes ── */}
        {pillars.map((p, i) => (
          <g key={`pil-${i}`}>
            <circle cx={p.x} cy={p.y} r={12}
              fill="rgba(0,0,0,0.04)" stroke={EC.black} strokeWidth={EC.lineBold} />
            <text x={p.x} y={p.y - 22}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={16} fontWeight={300}
              fill={EC.black}>
              {p.label}
            </text>
            <text x={p.x} y={p.y + 30}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={18} fontWeight={300}
              fill={EC.accent}>
              {p.num}
            </text>
          </g>
        ))}

        {/* ── Center: orchestration ── */}
        <circle cx={CX} cy={CY} r={22}
          fill="rgba(0,0,0,0.05)" stroke={EC.black} strokeWidth={EC.lineHeavy} />
        <text x={CX} y={CY + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={15} fontWeight={300}
          fill={EC.black}>
          orch
        </text>

        {/* annotation moved to diptych wrapper */}
      </svg>
    </div>
  );
}
