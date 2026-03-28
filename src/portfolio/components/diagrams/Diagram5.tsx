/**
 * 다이어그램 5 — 3중 검색 아키텍처 (Triptych compact)
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const CX = 100;
const nW = 56;
const nH = 22;

const channels = [
  { label: "Vector", cx: 34 },
  { label: "FTS5",   cx: 100 },
  { label: "Graph",  cx: 166 },
];

export function Diagram5() {
  return (
    <div style={{ margin: "0 auto", maxWidth: 360 }}>
      <svg viewBox="-10 0 220 252" width="100%" preserveAspectRatio="xMidYMin meet" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a5" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray85} />
          </marker>
        </defs>

        {/* Title */}
        <text x={CX} y={16} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1px">
          3중 검색
        </text>

        {/* recall() */}
        <rect x={CX - nW / 2} y={38} width={nW} height={nH} rx={0}
          fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
        <text x={CX} y={50} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black}>
          recall()
        </text>

        {/* recall → 3 branches */}
        {channels.map((ch) => (
          <line key={`r-${ch.label}`} x1={CX} y1={60} x2={ch.cx} y2={88}
            stroke={EC.gray85} strokeWidth={EC.lineLight} markerEnd="url(#ec-a5)" />
        ))}

        {/* 3 channel nodes */}
        {channels.map((ch) => (
          <g key={ch.label}>
            <rect x={ch.cx - nW / 2} y={90} width={nW} height={nH} rx={0}
              fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
            <text x={ch.cx} y={102} textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black}>
              {ch.label}
            </text>
          </g>
        ))}

        {/* 3 → RRF convergence */}
        {channels.map((ch) => (
          <line key={`j-${ch.label}`} x1={ch.cx} y1={112} x2={CX} y2={140}
            stroke={EC.gray85} strokeWidth={EC.lineLight} markerEnd="url(#ec-a5)" />
        ))}

        {/* RRF */}
        <rect x={CX - nW / 2} y={142} width={nW} height={nH} rx={0}
          fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
        <text x={CX} y={150} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black}>
          RRF
        </text>
        <text x={CX} y={159} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          K=18
        </text>

        {/* RRF → NDCG */}
        <line x1={CX} y1={164} x2={CX} y2={184}
          stroke={EC.gray85} strokeWidth={EC.lineLight} markerEnd="url(#ec-a5)" />

        {/* NDCG label */}
        <text x={CX} y={194} textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="1.5px">
          NDCG
        </text>

        {/* 0.624 hero */}
        <text x={CX} y={218} textAnchor="middle"
          fontFamily={EC.font} fontSize={22} fontWeight={200} fill={EC.accent}
          style={{ fontVariantNumeric: "tabular-nums" }}>
          0.624
        </text>

        {/* Hebbian caption */}
        <text x={CX} y={240} textAnchor="middle"
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          Hebbian Feedback · UCB 10%
        </text>
      </svg>
    </div>
  );
}
