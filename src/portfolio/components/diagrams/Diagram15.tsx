/**
 * 다이어그램 15 — 맥락 체인 vs 사실 나열
 * 두 줄 대비: 위=사실(끊김), 아래=맥락(연결).
 * 강화 섹션 "맥락은 사실의 나열이 아니다" 문장 뒤에 배치.
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

const items = [
  "1인 개발자다",
  "15개를 만들었다",
  "무게로 무너졌다",
  "복잡성에 민감해졌다",
];

const boxW = 120;
const boxH = 28;
const boxGap = 24;
const startX = 40;
const totalW = items.length * boxW + (items.length - 1) * boxGap;

export function Diagram15() {
  return (
    <div style={{ margin: 0 }}>
      <svg viewBox="0 0 640 190" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a15" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.accent} />
          </marker>
        </defs>

        {/* ── Row 1: 사실 — 끊긴 사각형들 ── */}
        <text x={16} y={46} textAnchor="start"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60} letterSpacing="1px">
          사실
        </text>

        {items.map((item, i) => {
          const x = startX + i * (boxW + boxGap);
          return (
            <g key={`f${i}`}>
              <rect x={x} y={30} width={boxW} height={boxH} rx={0}
                fill="none" stroke={EC.gray85} strokeWidth={EC.lineReg} />
              <text x={x + boxW / 2} y={45} textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
                {item}
              </text>
            </g>
          );
        })}

        {/* 끊긴 표시 — 점 3개 (연결 없음) */}
        {[0, 1, 2].map(i => {
          const x1 = startX + (i + 1) * boxW + i * boxGap + boxGap / 2;
          return (
            <g key={`d${i}`}>
              <circle cx={x1 - 3} cy={44} r={0.8} fill={EC.gray85} />
              <circle cx={x1} cy={44} r={0.8} fill={EC.gray85} />
              <circle cx={x1 + 3} cy={44} r={0.8} fill={EC.gray85} />
            </g>
          );
        })}

        {/* ── 구분선 ── */}
        <line x1={startX} y1={80} x2={startX + totalW} y2={80}
          stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="4 4" />

        {/* ── Row 2: 맥락 — 연결된 사각형들 ── */}
        <text x={16} y={114} textAnchor="start"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.accent} letterSpacing="1px">
          맥락
        </text>

        {items.map((item, i) => {
          const x = startX + i * (boxW + boxGap);
          return (
            <g key={`c${i}`}>
              <rect x={x} y={98} width={boxW} height={boxH} rx={0}
                fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
              <text x={x + boxW / 2} y={113} textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.accent}>
                {item}
              </text>
            </g>
          );
        })}

        {/* 화살표 연결 — 인과 */}
        {[0, 1, 2].map(i => {
          const x1 = startX + (i + 1) * boxW + i * boxGap;
          const x2 = x1 + boxGap;
          return (
            <line key={`a${i}`}
              x1={x1} y1={112} x2={x2 - 4} y2={112}
              stroke={EC.accent} strokeWidth={EC.lineReg}
              markerEnd="url(#ec-a15)" />
          );
        })}

        {/* 화살표 위 관계 라벨 */}
        {["그래서", "그 결과", "따라서"].map((label, i) => {
          const x = startX + (i + 1) * boxW + i * boxGap + boxGap / 2;
          return (
            <text key={`l${i}`} x={x} y={102} textAnchor="middle"
              fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.accent}>
              {label}
            </text>
          );
        })}

        {/* ── 하단 대비 요약 ── */}
        <text x={startX + totalW / 2} y={154} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
          같은 정보, 다른 구조 — 연결이 추론을 만든다
        </text>

        {/* 미니 아이콘: 점 4개 vs 선 4개 */}
        <g transform={`translate(${startX + totalW / 2 - 50}, 168)`}>
          {/* 사실: 고립된 점 */}
          {[0,1,2,3].map(i => (
            <circle key={i} cx={i * 10} cy={0} r={1.5}
              fill="none" stroke={EC.gray85} strokeWidth={EC.lineReg} />
          ))}
          <text x={50} y={2} fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
            vs
          </text>
          {/* 맥락: 연결된 점 */}
          {[0,1,2,3].map(i => (
            <g key={i}>
              <circle cx={64 + i * 10} cy={0} r={1.5}
                fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />
              {i < 3 && <line x1={66 + i * 10} y1={0} x2={72 + i * 10} y2={0}
                stroke={EC.accent} strokeWidth={EC.lineLight} />}
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
