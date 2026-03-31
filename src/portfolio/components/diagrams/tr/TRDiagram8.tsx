/**
 * TRDiagram8 — Evolution Timeline: Fault Line Stratigraphy
 * B.05 Long Section + geological fault section hybrid
 * Horizontal line hatching (density = verification strength)
 * El Croquis Design System
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

const VW = 700;

/* ── time axis x positions ── */
const T0 = 28;
const TV2 = 175;
const F1 = 195;
const F2 = 295;
const F3 = 370;
const F4 = 440;
const F5 = 520;
const TE = 670;

/* ── stratum layout ── */
const GROUND = 160;
const LH = 14;          // rect height
const LABEL_GAP = 4;    // gap rect→label
const LABEL_H = 10;     // label text space
const LAYER_GAP = 6;    // gap label→next rect
const STEP = LH + LABEL_GAP + LABEL_H + LAYER_GAP; // 34

function lY(n: number) { return GROUND + n * STEP; }

const BOTTOM = lY(6); // after 5 layers + base

/* ── dot pattern specs: [spacing, radius, color] per layer ── */
const DOT_SPECS: [number, number, string][] = [
  [0,    0,    ""],         // base (no dots)
  [3.5,  0.55, "#CCCCCC"],  // L1: sparse, light
  [3.0,  0.55, "#AAAAAA"],  // L2
  [2.4,  0.6,  "#888888"],  // L3
  [1.8,  0.65, "#666666"],  // L4: dense, dark
  [1.4,  0.7,  "#444444"],  // L5: very dense, near black
];

/* ── fault data ── */
const faults = [
  { x: F1, num: "①", event: "prompt injection",       date: "02.23",    response: "AI 출력 신뢰하지 않기" },
  { x: F2, num: "②", event: "Google Titan 가짜뉴스",   date: "03.17",    response: "hard fail (미발행)" },
  { x: F3, num: "③", event: "Codex 인용문 12/12 날조", date: "",         response: "원문 대조 함수" },
  { x: F4, num: "④", event: "Twitter 자동수집 폐기",    date: "",         response: "기계가 못 하는 큐레이션" },
  { x: F5, num: "⑤", event: "Perplexity 40–50%",      date: "03.24–27", response: "Playwright 발견 → Perplexity 폐기" },
] as const;

/* ── dot pattern defs (rendered in <defs>) ── */
function DotPatterns() {
  return (
    <>
      {DOT_SPECS.map(([sp, r, color], i) => {
        if (i === 0) return null;
        return (
          <pattern key={i} id={`dp${i}`}
            width={sp} height={sp} patternUnits="userSpaceOnUse">
            <circle cx={sp / 2} cy={sp / 2} r={r} fill={color} />
          </pattern>
        );
      })}
    </>
  );
}

/* ── annotation ── */
const ANN_Y = BOTTOM + 18;
const AL = 14;

export function TRDiagram8() {
  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 720, padding: "0 16px" }}>
      <svg viewBox={`0 0 ${VW} 520`} width="100%" style={{ display: "block" }} overflow="visible">

        <defs>
          <DotPatterns />
        </defs>

        {/* ── title ── */}
        <text x={VW / 2} y="16" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="2">
          FAULT LINE STRATIGRAPHY
        </text>
        <text x={VW / 2} y="32" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="1">
          {"v1 → v2 → v3 · 실패할 때마다 검증이 쌓인다"}
        </text>

        {/* ── time axis ── */}
        <line x1={T0} y1={GROUND - 2} x2={TE} y2={GROUND - 2}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ── version labels ── */}
        <text x={T0} y={GROUND - 26}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="1.5">
          2025.12
        </text>
        <text x={T0} y={GROUND - 14}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          v1
        </text>
        <text x={T0} y={GROUND - 4}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          Perplexity 단일
        </text>

        {/* v2 transition */}
        <line x1={TV2} y1={GROUND - 30} x2={TV2} y2={GROUND - 2}
          stroke={EC.gray60} strokeWidth={EC.lineLight}
          strokeDasharray="3 3" />
        <text x={TV2 + 5} y={GROUND - 14}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          v2
        </text>
        <text x={TV2 + 5} y={GROUND - 4}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          Smart Brevity 도입
        </text>

        {/* v3 marker */}
        <line x1={F5 + 30} y1={GROUND - 30} x2={F5 + 30} y2={GROUND - 2}
          stroke={EC.black} strokeWidth={EC.lineReg}
          strokeDasharray="4 3" />
        <text x={F5 + 34} y={GROUND - 12}
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.black} letterSpacing="1">
          v3
        </text>

        {/* ══════ BASE LAYER (thin line only) ══════ */}
        <line x1={T0} y1={lY(0) + LH / 2} x2={TE} y2={lY(0) + LH / 2}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />
        <text x={T0} y={lY(0) + LH + LABEL_GAP + 8}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          base
        </text>

        {/* ══════ STRATA: dot pattern fill + label below ══════ */}
        {faults.map((f, i) => {
          const y = lY(i + 1);
          const w = TE - f.x;
          return (
            <g key={`s${i}`}>
              {/* dot pattern rectangle (no stroke) */}
              <rect x={f.x} y={y} width={w} height={LH}
                fill={`url(#dp${i + 1})`} stroke="none" />

              {/* label below rect */}
              <text x={f.x} y={y + LH + LABEL_GAP + 8}
                fontFamily={EC.font} fontSize={9} fontWeight={200}
                fill={EC.gray40} letterSpacing="0.5">
                {f.response}
              </text>
            </g>
          );
        })}

        {/* ══════ FAULT LINES (red, rendered on top) ══════ */}
        {faults.map((f, i) => {
          const topY = GROUND - 2;
          const botY = lY(i + 1) + LH;
          return (
            <g key={`f${i}`}>
              <line x1={f.x} y1={topY} x2={f.x} y2={botY}
                stroke={EC.accent} strokeWidth={EC.lineReg} />

              <text x={f.x} y={GROUND - 14} textAnchor="middle"
                fontFamily={EC.font} fontSize={9} fontWeight={200}
                fill={EC.accent} letterSpacing="0.5">
                {f.num}
              </text>

              {f.date && (
                <text x={f.x} y={GROUND - 26} textAnchor="middle"
                  fontFamily={EC.font} fontSize={8} fontWeight={200}
                  fill={EC.gray60} letterSpacing="0.5">
                  {f.date}
                </text>
              )}
            </g>
          );
        })}

        {/* ── separator ── */}
        <line x1={T0} y1={ANN_Y - 8} x2={TE} y2={ANN_Y - 8}
          stroke={EC.gray85} strokeWidth={EC.lineLight}
          strokeDasharray="2 4" />

        {/* ══════ ANNOTATIONS ══════ */}

        {/* Left: failure events */}
        {faults.map((f, i) => (
          <text key={`a${i}`} x={T0} y={ANN_Y + i * AL * 1.5}
            fontFamily={EC.font} fontSize={9} fontWeight={200}
            fill={EC.accent} letterSpacing="0.5">
            {f.num} {f.event}{f.date ? ` (${f.date})` : ""}
          </text>
        ))}

        {/* Right: v3 final state */}
        <text x={460} y={ANN_Y}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.black} letterSpacing="1">
          V3 최종 상태
        </text>
        <text x={460} y={ANN_Y + AL * 1.2}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          무료 소스 직접 수집
        </text>
        <text x={460} y={ANN_Y + AL * 2.2}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          본문 4,000자
        </text>
        <text x={460} y={ANN_Y + AL * 3.2}
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          멀티LLM 분업
        </text>
        {/* ── footer ── */}
        <text x={VW / 2} y="508" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="1.5">
          {"2025.12 – 2026.03"}
        </text>

      </svg>
    </div>
  );
}
