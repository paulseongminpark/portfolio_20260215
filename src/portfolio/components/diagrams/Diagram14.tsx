/**
 * 다이어그램 14 — 관계 8군 (Wind Rose / 바람장미)
 * 중심에서 8방향으로 뻗는 관계 유형. 건축 배치도 방위 표시 참조.
 * 3막 "50개 관계 규칙" 단락 뒤에 배치.
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

const CX = 300;
const CY = 150;
const R_INNER = 20;
const R_OUTER = 105;

const groups = [
  { name: "인과",   examples: "caused_by · resolved_by",     angle: -90 },
  { name: "구조",   examples: "part_of · governed_by",       angle: -45 },
  { name: "승격",   examples: "crystallized_into · abstracted", angle: 0 },
  { name: "변화",   examples: "evolved_from · succeeded_by", angle: 45 },
  { name: "의미",   examples: "contradicts · reinforces",    angle: 90 },
  { name: "관점",   examples: "viewed_through · questions",  angle: 135 },
  { name: "시간",   examples: "preceded_by · born_from",     angle: 180 },
  { name: "교차",   examples: "transfers_to · mirrors",      angle: -135 },
];

function toRad(deg: number) { return deg * Math.PI / 180; }

export function Diagram14() {
  return (
    <div style={{ margin: 0 }}>
      <svg viewBox="0 0 600 340" width="100%" style={{ display: "block" }}>

        {/* ── 동심원 가이드 (faint) ── */}
        <circle cx={CX} cy={CY} r={R_INNER} fill="none" stroke={EC.gray85} strokeWidth={EC.lineLight} />
        <circle cx={CX} cy={CY} r={R_OUTER * 0.5} fill="none" stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="2 4" />
        <circle cx={CX} cy={CY} r={R_OUTER} fill="none" stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ── 8개 방사선 + 라벨 ── */}
        {groups.map((g, i) => {
          const rad = toRad(g.angle);
          const x1 = CX + Math.cos(rad) * R_INNER;
          const y1 = CY + Math.sin(rad) * R_INNER;
          const x2 = CX + Math.cos(rad) * R_OUTER;
          const y2 = CY + Math.sin(rad) * R_OUTER;
          const labelX = CX + Math.cos(rad) * (R_OUTER + 18);
          const labelY = CY + Math.sin(rad) * (R_OUTER + 18);
          const descX = CX + Math.cos(rad) * (R_OUTER + 18);
          const descY = CY + Math.sin(rad) * (R_OUTER + 18) + 14;

          /* 텍스트 정렬: 왼쪽 반구 = end, 오른쪽 = start, 위아래 = middle */
          const absAngle = Math.abs(g.angle);
          const anchor = absAngle > 90 ? "end" as const
            : absAngle < 90 ? "start" as const
            : "middle" as const;

          const isAccent = g.name === "승격";

          return (
            <g key={i}>
              {/* 방사선 */}
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isAccent ? EC.accent : EC.black}
                strokeWidth={isAccent ? EC.lineBold : EC.lineReg} />

              {/* 끝점 */}
              <circle cx={x2} cy={y2} r={2}
                fill={isAccent ? EC.accent : EC.black} />

              {/* 군 이름 */}
              <text x={labelX} y={labelY} textAnchor={anchor} dominantBaseline="middle"
                fontFamily={EC.font} fontSize={11} fontWeight={300}
                fill={isAccent ? EC.accent : EC.black}>
                {g.name}
              </text>

              {/* 대표 관계 */}
              <text x={descX} y={descY} textAnchor={anchor}
                fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60}>
                {g.examples}
              </text>
            </g>
          );
        })}

        {/* ── 중심 라벨 ── */}
        <text x={CX} y={CY - 4} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200} fill={EC.gray60} letterSpacing="1px">
          추론
        </text>
        <text x={CX} y={CY + 8} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200} fill={EC.gray60} letterSpacing="1px">
          그래프
        </text>

        {/* ── Caption ── */}
        <text x={CX} y={326} textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200} fill={EC.gray60}>
          50개 관계 규칙, 8개 군 — 판단과 판단을 잇는 도로
        </text>
      </svg>
    </div>
  );
}
