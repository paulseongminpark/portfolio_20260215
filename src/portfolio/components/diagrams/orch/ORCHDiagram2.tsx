/**
 * ORCHDiagram2 — The Token Tax
 * 200K 토큰 예산 중 42K가 baseline으로 소비되는 분해도
 * "일하기 전에 사라진 예산"
 * 형식: 수평 비례 바 — Diagram 1(네트워크)과 완전히 다른 정량 형식
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray30:    "#4D4D4D",
  gray50:    "#808080",
  gray65:    "#A6A6A6",
  gray80:    "#CCCCCC",
  gray92:    "#EBEBEB",
  gray96:    "#F5F5F5",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const TOTAL = 200;
const BAR_X = 60, BAR_Y = 100, BAR_W = 600, BAR_H = 44;
const scale = (k: number) => (k / TOTAL) * BAR_W;

const segments = [
  { label: "CLAUDE.md",  k: 12, desc: "규칙" },
  { label: "rules/",     k: 8,  desc: "모듈" },
  { label: "agents",     k: 15, desc: "24개 정의" },
  { label: "MEMORY.md",  k: 5,  desc: "인덱스" },
  { label: "skills",     k: 2,  desc: "정의" },
];

const COMPACT_K = 100;

export function ORCHDiagram2() {
  let cx = BAR_X;

  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 740,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 720 260" width="100%" style={{ display: "block" }}>

        {/* ── Total bar outline ── */}
        <rect x={BAR_X} y={BAR_Y} width={BAR_W} height={BAR_H}
          fill={EC.gray96} stroke={EC.gray80} strokeWidth={EC.lineReg} rx={1} />

        {/* ── Consumed segments ── */}
        {segments.map((seg, i) => {
          const w = scale(seg.k);
          const x = cx;
          cx += w;
          const fills = [
            "rgba(0,0,0,0.12)",
            "rgba(0,0,0,0.09)",
            "rgba(0,0,0,0.15)",
            "rgba(0,0,0,0.07)",
            "rgba(0,0,0,0.05)",
          ];
          return (
            <g key={i}>
              <rect x={x} y={BAR_Y} width={w} height={BAR_H}
                fill={fills[i]} />
              {/* separator */}
              {i > 0 && (
                <line x1={x} y1={BAR_Y} x2={x} y2={BAR_Y + BAR_H}
                  stroke="white" strokeWidth={1} />
              )}
              {/* label above */}
              <text x={x + w / 2} y={BAR_Y - 8}
                textAnchor="middle"
                fontFamily={EC.font} fontSize={7} fontWeight={300}
                fill={EC.gray30}>
                {seg.label}
              </text>
              {/* k value inside */}
              <text x={x + w / 2} y={BAR_Y + BAR_H / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={w > 30 ? 9 : 7} fontWeight={300}
                fill={EC.gray50}>
                {seg.k}K
              </text>
            </g>
          );
        })}

        {/* ── 42K total bracket ── */}
        <line x1={BAR_X} y1={BAR_Y + BAR_H + 8}
              x2={BAR_X + scale(42)} y2={BAR_Y + BAR_H + 8}
          stroke={EC.accent} strokeWidth={EC.lineReg} />
        <line x1={BAR_X} y1={BAR_Y + BAR_H + 4}
              x2={BAR_X} y2={BAR_Y + BAR_H + 12}
          stroke={EC.accent} strokeWidth={EC.lineReg} />
        <line x1={BAR_X + scale(42)} y1={BAR_Y + BAR_H + 4}
              x2={BAR_X + scale(42)} y2={BAR_Y + BAR_H + 12}
          stroke={EC.accent} strokeWidth={EC.lineReg} />
        <text x={BAR_X + scale(42) / 2} y={BAR_Y + BAR_H + 24}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.accent}>
          42K — 20%
        </text>

        {/* ── Compact threshold at 100K ── */}
        <line x1={BAR_X + scale(COMPACT_K)} y1={BAR_Y - 20}
              x2={BAR_X + scale(COMPACT_K)} y2={BAR_Y + BAR_H + 4}
          stroke={EC.accent} strokeWidth={EC.lineHair}
          strokeDasharray="3 3" />
        <text x={BAR_X + scale(COMPACT_K)} y={BAR_Y - 24}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.accent}>
          100K compact
        </text>

        {/* ── Remaining label ── */}
        <text x={BAR_X + scale(42) + (BAR_W - scale(42)) / 2} y={BAR_Y + BAR_H / 2 + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200}
          fill={EC.gray65}>
          158K
        </text>

        {/* ── 200K total ── */}
        <text x={BAR_X + BAR_W} y={BAR_Y - 8}
          textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray65}>
          200K
        </text>

        {/* ── Usable range annotation ── */}
        <line x1={BAR_X + scale(42)} y1={BAR_Y + BAR_H + 40}
              x2={BAR_X + scale(COMPACT_K)} y2={BAR_Y + BAR_H + 40}
          stroke={EC.gray65} strokeWidth={EC.lineReg} />
        <text x={BAR_X + scale(42) + (scale(COMPACT_K) - scale(42)) / 2}
              y={BAR_Y + BAR_H + 56}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray50}>
          실질 작업 공간 58K
        </text>

        {/* ── Caption ── */}
        <text x={360} y={230}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.5px">
          일하기 전에 사라진 예산
        </text>
      </svg>
    </div>
  );
}
