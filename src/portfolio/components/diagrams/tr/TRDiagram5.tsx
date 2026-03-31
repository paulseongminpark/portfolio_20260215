/**
 * TRDiagram5 — Kinetic Transformation Sequence
 * "상태를 최소화하라" → Axiom(3/12) → Lens(1/7) → 5W1H → output
 * OMA programmatic transformation 문법.
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray20:    "#333333",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* ── 4 stages: positions ── */
const STAGE_W = 140;
const STAGE_H = 200;
const GAP = 18;
const SX = [20, 20 + STAGE_W + GAP, 20 + (STAGE_W + GAP) * 2, 20 + (STAGE_W + GAP) * 3];
const TOP = 70;

/* ── Axiom dots (12 total, 3 active) ── */
const axiomActive = new Set([0, 3, 4]); // why_it_matters, be_smart, zoom_in
const axiomLabels = [
  "why", "driving", "big", "smart", "zoom", "bottom",
  "next", "nums", "between", "yes", "watch", "deeper"
];

/* ── Lens dots (7 total, 1 active) ── */
const lensActive = 4; // 빼기
const lensLabels = ["시스템", "접합", "외부화", "조건", "빼기", "수렴", "메타"];

export function TRDiagram5() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 760,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 680 380" width="100%" style={{ display: "block" }} overflow="visible">
        <defs>
          <marker id="tr5-arr" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.accent} />
          </marker>
        </defs>

        {/* title */}
        <text x="340" y="20" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          KINETIC TRAVERSAL
        </text>

        {/* ── Stage labels ── */}
        {["RAW INPUT", "AFTER AXIOM", "AFTER LENS", "AFTER 5W1H"].map((s, i) => (
          <text key={i} x={SX[i] + STAGE_W / 2} y={TOP - 10}
            textAnchor="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={200}
            fill={EC.gray60} letterSpacing="1px">
            {s}
          </text>
        ))}

        {/* ── Stage boxes ── */}
        {[0, 1, 2, 3].map(i => (
          <rect key={i} x={SX[i]} y={TOP} width={STAGE_W} height={STAGE_H} rx={0}
            fill="none" stroke={EC.gray85} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Transition arrows (red) ── */}
        {[0, 1, 2].map(i => {
          const x1 = SX[i] + STAGE_W + 2;
          const x2 = SX[i + 1] - 2;
          return (
            <g key={`arr${i}`}>
              <line x1={x1} y1={TOP + STAGE_H / 2} x2={x2} y2={TOP + STAGE_H / 2}
                stroke={EC.accent} strokeWidth={EC.lineBold}
                markerEnd="url(#tr5-arr)" />
              <text x={(x1 + x2) / 2} y={TOP + STAGE_H / 2 - 6}
                textAnchor="middle"
                fontFamily={EC.font} fontSize={6} fontWeight={200}
                fill={EC.accent}>
                {i === 0 ? "12→3" : i === 1 ? "7→1" : "recall()"}
              </text>
            </g>
          );
        })}

        {/* ══════ STAGE 0: RAW INPUT ══════ */}
        <text x={SX[0] + STAGE_W / 2} y={TOP + 40}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black}>
          "에이전트 설계에서
        </text>
        <text x={SX[0] + STAGE_W / 2} y={TOP + 56}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black}>
          상태를
        </text>
        <text x={SX[0] + STAGE_W / 2} y={TOP + 72}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black}>
          최소화하라"
        </text>
        <text x={SX[0] + STAGE_W / 2} y={TOP + 110}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          Karpathy
        </text>
        <text x={SX[0] + STAGE_W / 2} y={TOP + 124}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          42분 인터뷰
        </text>

        {/* ══════ STAGE 1: AFTER AXIOM — 12 dots, 3 active ══════ */}
        {axiomLabels.map((label, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const dx = SX[1] + 20 + col * 28;
          const dy = TOP + 28 + row * 44;
          const active = axiomActive.has(i);
          return (
            <g key={`ax${i}`}>
              <circle cx={dx} cy={dy} r={4}
                fill={active ? "none" : "none"}
                stroke={active ? EC.accent : EC.gray85}
                strokeWidth={active ? EC.lineBold : EC.lineLight} />
              <text x={dx} y={dy + 14}
                textAnchor="middle"
                fontFamily={EC.font} fontSize={6} fontWeight={200}
                fill={active ? EC.accent : EC.gray85}>
                {label}
              </text>
            </g>
          );
        })}
        <text x={SX[1] + STAGE_W / 2} y={TOP + STAGE_H - 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          3/12 활성
        </text>

        {/* ══════ STAGE 2: AFTER LENS — 7 dots, 1 active ══════ */}
        {lensLabels.map((label, i) => {
          const dy = TOP + 18 + i * 24;
          const dx = SX[2] + 30;
          const active = i === lensActive;
          return (
            <g key={`ln${i}`}>
              <circle cx={dx} cy={dy} r={active ? 5 : 3.5}
                fill={active ? "none" : "none"}
                stroke={active ? EC.accent : EC.gray85}
                strokeWidth={active ? EC.lineBold : EC.lineLight} />
              <text x={dx + 14} y={dy + 1}
                dominantBaseline="middle"
                fontFamily={EC.font} fontSize={active ? 8 : 7} fontWeight={active ? 300 : 200}
                fill={active ? EC.accent : EC.gray85}>
                {label}
              </text>
              {/* kinetic curve — trajectory bends toward active */}
              {active && (
                <path
                  d={`M ${SX[2] + 10},${TOP + STAGE_H / 2} Q ${dx - 10},${dy} ${dx - 6},${dy}`}
                  fill="none" stroke={EC.accent} strokeWidth={EC.lineLight}
                  strokeDasharray="3 2" />
              )}
            </g>
          );
        })}
        <text x={SX[2] + STAGE_W / 2} y={TOP + STAGE_H - 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          1/7 활성 — 빼기
        </text>

        {/* ══════ STAGE 3: AFTER 5W1H — filled fields ══════ */}
        {[
          { f: "where", v: "orchestration" },
          { f: "what",  v: "context_buffer 상태 3개 제거" },
          { f: "why",   v: "불필요한 상태 누적" },
          { f: "how",   v: "buffer 초기화 로직 수정" },
          { f: "when",  v: "이번 주" },
        ].map((item, i) => {
          const dy = TOP + 20 + i * 30;
          return (
            <g key={`wh${i}`}>
              <text x={SX[3] + 10} y={dy}
                fontFamily={EC.font} fontSize={7} fontWeight={300}
                fill={EC.accent} letterSpacing="0.5px">
                {item.f}
              </text>
              <text x={SX[3] + 10} y={dy + 12}
                fontFamily={EC.font} fontSize={7} fontWeight={200}
                fill={EC.gray40}>
                {item.v}
              </text>
            </g>
          );
        })}
        <text x={SX[3] + STAGE_W / 2} y={TOP + STAGE_H - 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          Level 1 — 즉시 적용
        </text>

        {/* ══════ CONTRAST: generic output ══════ */}
        <line x1={SX[3]} y1={TOP + STAGE_H + 16}
          x2={SX[3] + STAGE_W} y2={TOP + STAGE_H + 16}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        <text x={SX[3] + STAGE_W / 2} y={TOP + STAGE_H + 34}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray85}>
          범용 뉴스레터:
        </text>
        <text x={SX[3] + STAGE_W / 2} y={TOP + STAGE_H + 48}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray85}>
          "AI 업계에 중요하다."
        </text>

        {/* caption */}
        <text x="340" y="370"
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          같은 입력, 다른 출력. 3층을 관통하면 구체적 액션이 나온다.
        </text>
      </svg>
    </div>
  );
}
