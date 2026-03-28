/**
 * 다이어그램 12 — Three Layers of AI Interface
 * 새 구조: 동심원 단면 — 안쪽이 가장 기초적, 바깥이 가장 상위.
 * Prompt Engineering(core) → Context Engineering → LLM UX(outer).
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const CX = 220;
const CY = 138;

const rings = [
  { r: 90, label: "LLM UX",               desc: "AI가 소비하는 지식 구조 설계", accent: true },
  { r: 60, label: "Context Engineering",   desc: "무엇을 넣고, 언제 덜어낼지",   accent: false },
  { r: 30, label: "Prompt Engineering",    desc: "AI에게 잘 물어보는 법",         accent: false },
];

export function Diagram12() {
  return (
    <div style={{ margin: 0 }}>
      <svg viewBox="0 0 440 260" width="100%" style={{ display: "block" }}>
        {/* Title */}
        <text x={CX} y={18} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          THREE LAYERS OF AI INTERFACE
        </text>

        {/* ── Concentric rings (outer → inner) ── */}
        {rings.map((ring, i) => (
          <circle key={i} cx={CX} cy={CY} r={ring.r}
            fill="none"
            stroke={ring.accent ? EC.accent : EC.black}
            strokeWidth={ring.accent ? EC.lineBold : EC.lineReg} />
        ))}

        {/* ── Ring labels — radial leader lines ── */}

        {/* Outer: LLM UX — top-right */}
        <line x1={CX + 64} y1={CY - 64} x2={CX + 120} y2={CY - 98}
          stroke={EC.accent} strokeWidth={EC.lineLight} />
        <text x={CX + 124} y={CY - 100}
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.accent}>
          {rings[0].label}
        </text>
        <text x={CX + 124} y={CY - 88}
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          {rings[0].desc}
        </text>

        {/* Middle: Context Engineering — right */}
        <line x1={CX + 42} y1={CY + 42} x2={CX + 120} y2={CY + 70}
          stroke={EC.black} strokeWidth={EC.lineLight} />
        <text x={CX + 124} y={CY + 68}
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black}>
          {rings[1].label}
        </text>
        <text x={CX + 124} y={CY + 80}
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          {rings[1].desc}
        </text>

        {/* Inner: Prompt Engineering — left */}
        <line x1={CX - 22} y1={CY + 22} x2={CX - 100} y2={CY + 70}
          stroke={EC.gray60} strokeWidth={EC.lineLight} />
        <text x={CX - 104} y={CY + 68} textAnchor="end"
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.gray60}>
          {rings[2].label}
        </text>
        <text x={CX - 104} y={CY + 80} textAnchor="end"
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          {rings[2].desc}
        </text>

        {/* ── Center label ── */}
        <text x={CX} y={CY + 2} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="1px">
          AI INTERFACE
        </text>

        {/* ── Radial depth indicator (치수선, 왼쪽 위) ── */}
        <line x1={CX} y1={CY} x2={CX - 90} y2={CY}
          stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="2 2" />
        {/* Ticks at each ring */}
        {rings.map((ring, i) => (
          <line key={`t${i}`}
            x1={CX - ring.r} y1={CY - 3}
            x2={CX - ring.r} y2={CY + 3}
            stroke={EC.gray85} strokeWidth={EC.lineLight} />
        ))}
      </svg>
    </div>
  );
}
