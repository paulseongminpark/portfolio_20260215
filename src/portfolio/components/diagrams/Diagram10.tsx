/**
 * 다이어그램 10 — Reasoning Upgrade (4단계)
 * 새 구조: 롤리팝 차트 (El Croquis spec: 막대 대신 lollipop 선호).
 * 수평 기준선 위로 4개 줄기가 점점 높아진다. 끝에 원.
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

const baseY = 190;   // 기준선 Y
const startX = 80;
const stepGap = 120;

const steps = [
  { num: "1", title: "Base Claude",       desc: "200K 컨텍스트, 제로샷",       h: 40,  r: 6 },
  { num: "2", title: "+ RAG",             desc: "벡터 검색으로 관련 문서 주입", h: 72,  r: 8 },
  { num: "3", title: "+ Knowledge Graph", desc: "타입·관계·승격으로 추론",      h: 110, r: 11 },
  { num: "4", title: "+ LLM UX",          desc: "AI가 소비하는 형태로 구조화",  h: 148, r: 14 },
];

export function Diagram10() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 620,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 560 260" width="100%" style={{ display: "block" }}>
        {/* Title */}
        <text x={280} y={20} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          REASONING UPGRADE
        </text>

        {/* ── Baseline ── */}
        <line x1={startX - 30} y1={baseY} x2={startX + (steps.length - 1) * stepGap + 30} y2={baseY}
          stroke={EC.black} strokeWidth={EC.lineReg} />

        {/* ── Lollipops ── */}
        {steps.map((s, i) => {
          const cx = startX + i * stepGap;
          const topY = baseY - s.h;
          const isAccent = i === steps.length - 1;

          return (
            <g key={s.num}>
              {/* Stem */}
              <line x1={cx} y1={baseY} x2={cx} y2={topY + s.r}
                stroke={isAccent ? EC.accent : EC.black}
                strokeWidth={isAccent ? EC.lineBold : EC.lineReg} />

              {/* Circle head — stroke only */}
              <circle cx={cx} cy={topY} r={s.r}
                fill="none"
                stroke={isAccent ? EC.accent : EC.black}
                strokeWidth={isAccent ? EC.lineBold : EC.lineReg} />

              {/* Number inside circle */}
              <text x={cx} y={topY + 1} textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={s.r > 10 ? 10 : 8} fontWeight={200}
                fill={isAccent ? EC.accent : EC.black}
                style={{ fontVariantNumeric: "tabular-nums" }}>
                {s.num}
              </text>

              {/* Baseline tick */}
              <line x1={cx} y1={baseY - 3} x2={cx} y2={baseY + 3}
                stroke={EC.black} strokeWidth={EC.lineReg} />

              {/* Title (below baseline) */}
              <text x={cx} y={baseY + 18} textAnchor="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={300}
                fill={isAccent ? EC.accent : EC.black}>
                {s.title}
              </text>

              {/* Description */}
              <text x={cx} y={baseY + 30} textAnchor="middle"
                fontFamily={EC.font} fontSize={6} fontWeight={200}
                fill={EC.gray60}>
                {s.desc}
              </text>
            </g>
          );
        })}

        {/* ── Dashed growth envelope (연결 곡선) ── */}
        <path d={`M ${startX},${baseY - steps[0].h} Q ${startX + stepGap},${baseY - steps[1].h - 10} ${startX + stepGap},${baseY - steps[1].h} Q ${startX + 2 * stepGap},${baseY - steps[2].h - 10} ${startX + 2 * stepGap},${baseY - steps[2].h} Q ${startX + 3 * stepGap},${baseY - steps[3].h - 10} ${startX + 3 * stepGap},${baseY - steps[3].h}`}
          fill="none" stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="4 4" />

        {/* ── Caption ── */}
        <text x={280} y={248} textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
          각 단계가 이전 위에 쌓인다 — 기반 없이 상위는 작동하지 않는다
        </text>
      </svg>
    </div>
  );
}
