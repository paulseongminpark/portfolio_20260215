/**
 * 다이어그램 13 — 실패 해부도 (Failure Anatomy)
 * 가로 3칸 figure plate: A(승격 막힘) | B(비대칭) | C(오염 루프)
 * 2막 0.057 아래, "왜?"를 보여준다.
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
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* 3칸 레이아웃: 각 200px 폭, 간격 30px */
const colW = 186;
const colGap = 27;
const col = (i: number) => i * (colW + colGap) + colW / 2;

export function Diagram13() {
  return (
    <div style={{ margin: 0 }}>
      <svg viewBox="0 0 640 200" width="100%" style={{ display: "block" }}>

        {/* ── A: 승격 막힘 — 두 막대, 닿지 않는 갭 ── */}
        <g>
          <text x={col(0)} y={16} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60} letterSpacing="1px">
            A — 승격 불가
          </text>

          {/* 기준선 */}
          <line x1={col(0) - 60} y1={160} x2={col(0) + 60} y2={160}
            stroke={EC.black} strokeWidth={EC.lineReg} />

          {/* 206 (필요) — 높은 막대, 점선 (도달 불가) */}
          <line x1={col(0) - 24} y1={160} x2={col(0) - 24} y2={38}
            stroke={EC.gray85} strokeWidth={EC.lineReg} strokeDasharray="3 3" />
          <circle cx={col(0) - 24} cy={38} r={3}
            fill="none" stroke={EC.gray85} strokeWidth={EC.lineReg} />
          <text x={col(0) - 24} y={30} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60}
            style={{ fontVariantNumeric: "tabular-nums" }}>
            206
          </text>
          <text x={col(0) - 24} y={174} textAnchor="middle"
            fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
            필요
          </text>

          {/* 58 (최대) — 짧은 막대, 실선 */}
          <line x1={col(0) + 24} y1={160} x2={col(0) + 24} y2={90}
            stroke={EC.accent} strokeWidth={EC.lineBold} />
          <circle cx={col(0) + 24} cy={90} r={3}
            fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
          <text x={col(0) + 24} y={82} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.accent}
            style={{ fontVariantNumeric: "tabular-nums" }}>
            58
          </text>
          <text x={col(0) + 24} y={174} textAnchor="middle"
            fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
            최대
          </text>

          {/* 갭 표시 — 양방향 화살표 */}
          <line x1={col(0)} y1={42} x2={col(0)} y2={86}
            stroke={EC.accent} strokeWidth={EC.lineLight} strokeDasharray="2 2" />
          <text x={col(0) + 6} y={64} fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.accent}>
            닿지 않는다
          </text>
        </g>

        {/* ── 구분선 ── */}
        <line x1={colW + colGap / 2} y1={24} x2={colW + colGap / 2} y2={180}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* ── B: 비대칭 — 굵은 화살표 vs 얇은 화살표 ── */}
        <g>
          <text x={col(1)} y={16} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60} letterSpacing="1px">
            B — 저장만, 검색 없음
          </text>

          {/* remember() — 굵은 하향 화살표 */}
          <line x1={col(1) - 30} y1={50} x2={col(1) - 30} y2={140}
            stroke={EC.black} strokeWidth={2} />
          <polygon points={`${col(1) - 34},140 ${col(1) - 26},140 ${col(1) - 30},150`}
            fill={EC.black} />
          <text x={col(1) - 30} y={42} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={300} fill={EC.black}>
            remember()
          </text>
          <text x={col(1) - 30} y={164} textAnchor="middle"
            fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
            매 세션 자동
          </text>

          {/* recall() — 극도로 얇은 상향 화살표 */}
          <line x1={col(1) + 30} y1={140} x2={col(1) + 30} y2={50}
            stroke={EC.gray85} strokeWidth={EC.lineLight} />
          <polygon points={`${col(1) + 27},50 ${col(1) + 33},50 ${col(1) + 30},44`}
            fill={EC.gray85} />
          <text x={col(1) + 30} y={42} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray85}>
            recall()
          </text>
          <text x={col(1) + 30} y={164} textAnchor="middle"
            fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
            거의 미사용
          </text>
        </g>

        {/* ── 구분선 ── */}
        <line x1={colW * 2 + colGap * 1.5} y1={24} x2={colW * 2 + colGap * 1.5} y2={180}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* ── C: 오염 루프 — 나선이 커지는 순환 ── */}
        <g>
          <text x={col(2)} y={16} textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60} letterSpacing="1px">
            C — 오염 피드백 루프
          </text>

          {/* 4단계 순환: store → embed → search → learn */}
          {(() => {
            const cx = col(2), cy = 100;
            const labels = ["정제", "임베딩", "검색", "학습"];
            const r1 = 32, r2 = 48; // 내부/외부 궤도
            return (
              <g>
                {/* 내부 궤도 (의도된 경로) */}
                <circle cx={cx} cy={cy} r={r1}
                  fill="none" stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="3 3" />
                {/* 외부 궤도 (증폭된 경로) */}
                <circle cx={cx} cy={cy} r={r2}
                  fill="none" stroke={EC.accent} strokeWidth={EC.lineLight} opacity={0.4} />

                {/* 4개 노드: 상/우/하/좌 */}
                {labels.map((label, i) => {
                  const angle = -Math.PI / 2 + i * Math.PI / 2;
                  const nx = cx + Math.cos(angle) * r1;
                  const ny = cy + Math.sin(angle) * r1;
                  return (
                    <g key={i}>
                      <circle cx={nx} cy={ny} r={3}
                        fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
                      <text x={nx + Math.cos(angle) * 16} y={ny + Math.sin(angle) * 16 + 1}
                        textAnchor="middle" dominantBaseline="middle"
                        fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray40}>
                        {label}
                      </text>
                    </g>
                  );
                })}

                {/* 나선 화살표 — 매 회전마다 커짐 */}
                <path d={`M ${cx},${cy - r1} A ${r1},${r1} 0 1,1 ${cx - 0.1},${cy - r1}`}
                  fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
                <path d={`M ${cx},${cy - r2} A ${r2},${r2} 0 1,1 ${cx - 0.1},${cy - r2}`}
                  fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.5} />

                {/* 증폭 표시 */}
                <text x={cx} y={cy + r2 + 18} textAnchor="middle"
                  fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.accent}>
                  매 회전마다 오류 증폭
                </text>
              </g>
            );
          })()}
        </g>

        {/* ── 하단 통합 캡션 ── */}
        <text x={320} y={196} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200} fill={EC.gray60}>
          세 곳이 동시에 고장나 있었다
        </text>
      </svg>
    </div>
  );
}
