/**
 * 다이어그램 9 — Competitive Landscape
 * 새 구조: 건축 배치도(site plan) 스타일.
 * 2x2 그리드 → 치수선 축 + stroke-only 셀 + 중앙 accent 교차점.
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.15,
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const CX = 260;
const CY = 148;
const halfW = 170;
const halfH = 95;
const left = CX - halfW;
const top = CY - halfH;

/* 셀 데이터: [quadrant] → names */
const cells: { x: number; y: number; names: string[] }[] = [
  { x: left + halfW * 0.5,  y: top + halfH * 0.5,  names: ["Zep Graphiti"] },
  { x: left + halfW * 1.5,  y: top + halfH * 0.5,  names: ["Palantir Foundry"] },
  { x: left + halfW * 0.5,  y: top + halfH * 1.5,  names: ["Mem0", "claude-mem"] },
  { x: left + halfW * 1.5,  y: top + halfH * 1.5,  names: ["Jira", "Confluence"] },
];

export function Diagram9() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 620,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 520 280" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a9" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray60} />
          </marker>
        </defs>

        {/* Title */}
        <text x={CX} y={22} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          COMPETITIVE LANDSCAPE
        </text>

        {/* ── Grid border ── */}
        <rect x={left} y={top} width={halfW * 2} height={halfH * 2} rx={0}
          fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />

        {/* ── Cross dividers (thin) ── */}
        <line x1={CX} y1={top} x2={CX} y2={top + halfH * 2}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />
        <line x1={left} y1={CY} x2={left + halfW * 2} y2={CY}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ── Cell items — stroke-only boxes, rx=0 ── */}
        {cells.map((c, i) => (
          <g key={i}>
            {c.names.map((name, j) => {
              const bw = 80;
              const bh = 18;
              const by = c.y + j * (bh + 4) - (c.names.length > 1 ? (bh + 2) : 0);
              return (
                <g key={j}>
                  <rect x={c.x - bw / 2} y={by - bh / 2} width={bw} height={bh} rx={0}
                    fill="none" stroke={EC.gray85} strokeWidth={EC.lineReg} />
                  <text x={c.x} y={by + 1} textAnchor="middle" dominantBaseline="middle"
                    fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.gray40}>
                    {name}
                  </text>
                </g>
              );
            })}
          </g>
        ))}

        {/* ── Center: "이 시스템" — accent circle at intersection ── */}
        <circle cx={CX} cy={CY} r={22}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.accent}>
          이 시스템
        </text>

        {/* ── Axis labels — 치수선 스타일 ── */}
        {/* Horizontal: Personal → Organizational */}
        <line x1={left} y1={top + halfH * 2 + 16} x2={left + halfW * 2} y2={top + halfH * 2 + 16}
          stroke={EC.gray85} strokeWidth={EC.lineLight} markerEnd="url(#ec-a9)" />
        <text x={left + 2} y={top + halfH * 2 + 28} textAnchor="start"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="1px">
          PERSONAL
        </text>
        <text x={left + halfW * 2 - 2} y={top + halfH * 2 + 28} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="1px">
          ORGANIZATIONAL
        </text>

        {/* Vertical: Document → Graph */}
        <line x1={left - 14} y1={top + halfH * 2} x2={left - 14} y2={top}
          stroke={EC.gray85} strokeWidth={EC.lineLight} markerEnd="url(#ec-a9)" />
        {/* Dimension ticks */}
        <line x1={left - 18} y1={top} x2={left - 10} y2={top}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />
        <line x1={left - 18} y1={top + halfH * 2} x2={left - 10} y2={top + halfH * 2}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        <text x={left - 20} y={top + halfH * 2 - 4} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="1px">
          DOCUMENT
        </text>
        <text x={left - 20} y={top + 8} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="1px">
          GRAPH
        </text>
      </svg>
    </div>
  );
}
