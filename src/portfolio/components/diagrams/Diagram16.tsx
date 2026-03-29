/**
 * 다이어그램 16 — 메모리 접근법 비교
 * 5개 도구가 각각 무엇을 저장하는지 한 줄 요약. 공통 한계 표시.
 * 수평 막대 + 한계선 스타일.
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

const tools = [
  { name: "claude-mem",   what: "세션 압축 → 주입" },
  { name: "Mem0",         what: "사실 추출 → 저장" },
  { name: "supermemory",  what: "시그널 추출" },
  { name: "MemGPT",       what: "컨텍스트 가상 메모리" },
  { name: "Hindsight",    what: "대화 인덱싱" },
];

const barX = 100;
const barMaxW = 160;
const rowH = 24;
const startY = 30;

export function Diagram16() {
  return (
    <div style={{ margin: 0 }}>
      <svg viewBox="0 0 320 220" width="100%" style={{ display: "block" }}>

        {/* Title */}
        <text x={160} y={16} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1px">
          무엇을 저장하는가
        </text>

        {/* ── Tool rows ── */}
        {tools.map((t, i) => {
          const y = startY + i * rowH;
          const barW = barMaxW * 0.7; // 모두 비슷한 수준까지만 도달
          return (
            <g key={i}>
              {/* Name */}
              <text x={barX - 8} y={y + 10} textAnchor="end"
                fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black}>
                {t.name}
              </text>
              {/* Bar — stroke only, thin */}
              <line x1={barX} y1={y + 8} x2={barX + barW} y2={y + 8}
                stroke={EC.gray85} strokeWidth={3} />
              {/* What label */}
              <text x={barX + 4} y={y + 5}
                fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
                {t.what}
              </text>
            </g>
          );
        })}

        {/* ── Limit line — "여기서 멈춘다" ── */}
        {(() => {
          const topY = startY + 2;
          const botY = startY + tools.length * rowH - 4;
          const lx = barX + barMaxW * 0.7 + 4;
          return (
            <g>
              <line x1={lx} y1={topY} x2={lx} y2={botY}
                stroke={EC.accent} strokeWidth={EC.lineBold}
                strokeDasharray="4 3" />
              <text x={lx + 6} y={(topY + botY) / 2 - 6}
                fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.accent}>
                여기서
              </text>
              <text x={lx + 6} y={(topY + botY) / 2 + 6}
                fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.accent}>
                멈춘다
              </text>
            </g>
          );
        })()}

        {/* ── "왜" 영역 — 한계선 너머 ── */}
        <text x={barX + barMaxW * 0.7 + 40} y={startY + tools.length * rowH + 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
          "어제 뭘 했는지"는 안다
        </text>
        <text x={barX + barMaxW * 0.7 + 40} y={startY + tools.length * rowH + 28}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.accent}>
          "왜 그렇게 했는지"는 모른다
        </text>
      </svg>
    </div>
  );
}
