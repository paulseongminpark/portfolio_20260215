/**
 * TRDiagram3 — 3-Layer Parametric Field
 * Layer 1: 12 Axiom × 3 Source activation
 * Layer 2: 7 WIM Lenses (connected circles)
 * Layer 3: 5W1H Depth (L1/L2/L3)
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

/* ── Axiom Data ── */
const AX = [
  { label: "Why it matters",      req: true,  d: 4, y: 4, t: 4 },
  { label: "Driving the news",    req: false, d: 3, y: 0, t: 0 },
  { label: "The big picture",     req: false, d: 3, y: 0, t: 3 },
  { label: "Be smart",            req: false, d: 0, y: 4, t: 3 },
  { label: "Zoom in",             req: false, d: 0, y: 4, t: 0 },
  { label: "The bottom line",     req: false, d: 0, y: 3, t: 0 },
  { label: "What's next",         req: false, d: 3, y: 0, t: 0 },
  { label: "By the numbers",      req: false, d: 2, y: 1, t: 0 },
  { label: "Between the lines",   req: false, d: 0, y: 1, t: 1 },
  { label: "Yes, but",            req: false, d: 1, y: 1, t: 0 },
  { label: "What we're watching", req: false, d: 1, y: 0, t: 0 },
  { label: "Go deeper",           req: false, d: 0, y: 0, t: 0 },
];

/* ── 7 Lenses ── */
const LENSES = ["시스템", "접합", "외부화", "조건", "빼기", "수렴", "메타"];

/* ── Layout ── */
const L1_Y = 70;         // Layer 1 start
const ROW_H = 22;        // axiom row height
const LBL_X = 10;        // axiom label x
const BAR_START = 170;   // bars start x
const BAR_COL_W = 58;    // width per source column
const BAR_UNIT = 13;     // px per intensity unit
const SRC_X = [BAR_START, BAR_START + BAR_COL_W, BAR_START + BAR_COL_W * 2];

const L2_Y = L1_Y + AX.length * ROW_H + 48; // Layer 2 start
const LENS_Y = L2_Y + 34;
const LENS_X0 = 16;
const LENS_GAP = 62;

const L3_Y = LENS_Y + 56; // Layer 3 start

export function TRDiagram3() {
  const totalH = L3_Y + 100;

  return (
    <div style={{
      margin: 0,
      maxWidth: 720,
      padding: 0,
    }}>
      <svg viewBox={`0 0 620 ${totalH}`} width="100%" style={{ display: "block" }} overflow="visible">

        {/* title */}
        <text x="235" y="20" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          3-LAYER INTERPRETATION SYSTEM
        </text>

        {/* ══════ LAYER 1: AXIOM MATRIX ══════ */}

        {/* layer label */}
        <text x={LBL_X} y={L1_Y - 20}
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          LAYER 1 · AXIOM
        </text>
        <text x={LBL_X} y={L1_Y - 8}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          형식 — 어떻게 쓸 것인가
        </text>

        {/* source column headers */}
        {["Daily", "YouTube", "Twitter"].map((s, i) => (
          <text key={s} x={SRC_X[i] + BAR_COL_W / 2 - 8} y={L1_Y - 8}
            fontFamily={EC.font} fontSize={7} fontWeight={200}
            fill={EC.gray60} letterSpacing="0.5px">
            {s}
          </text>
        ))}

        {/* header line */}
        <line x1={LBL_X} y1={L1_Y} x2="460" y2={L1_Y}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* axiom rows */}
        {AX.map((ax, i) => {
          const ry = L1_Y + i * ROW_H + ROW_H / 2;
          const vals = [ax.d, ax.y, ax.t];
          return (
            <g key={i}>
              {i % 2 === 0 && (
                <rect x={LBL_X} y={L1_Y + i * ROW_H} width={450} height={ROW_H}
                  fill="rgba(0,0,0,0.012)" />
              )}
              {ax.req && <circle cx={LBL_X + 5} cy={ry} r={2} fill={EC.accent} />}
              <text x={LBL_X + (ax.req ? 14 : 5)} y={ry + 1}
                dominantBaseline="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={ax.req ? 300 : 200}
                fill={ax.req ? EC.accent : EC.black}>
                {ax.label}
              </text>
              {vals.map((v, ci) => (
                v === 0
                  ? <text key={ci} x={SRC_X[ci] + 2} y={ry + 1} dominantBaseline="middle"
                      fontFamily={EC.font} fontSize={8} fill={EC.gray85}>·</text>
                  : <rect key={ci} x={SRC_X[ci]} y={ry - 3} width={v * BAR_UNIT} height={6} rx={0}
                      fill="none" stroke={ax.req ? EC.accent : EC.black}
                      strokeWidth={ax.req ? EC.lineBold : EC.lineReg} />
              ))}
            </g>
          );
        })}

        {/* bottom line */}
        <line x1={LBL_X} y1={L1_Y + AX.length * ROW_H}
          x2="460" y2={L1_Y + AX.length * ROW_H}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ── transition arrow ── */}
        {/* transition line only */}
        <line x1="230" y1={L1_Y + AX.length * ROW_H + 6} x2="230" y2={L2_Y - 4}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ══════ LAYER 2: 7 LENSES ══════ */}

        <text x={LBL_X} y={L2_Y}
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          LAYER 2 · WIM 7렌즈
        </text>
        <text x={LBL_X + 130} y={L2_Y}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          활성화된 axiom이 렌즈를 통과
        </text>
        <text x={LBL_X} y={L2_Y + 12}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          관점 — 무엇을 볼 것인가
        </text>

        {/* lens circles + connections */}
        {LENSES.map((name, i) => {
          const lx = LENS_X0 + i * LENS_GAP;
          return (
            <g key={i}>
              {i > 0 && (
                <line x1={lx - LENS_GAP + 10} y1={LENS_Y}
                  x2={lx - 10} y2={LENS_Y}
                  stroke={EC.gray85} strokeWidth={EC.lineLight} />
              )}
              <circle cx={lx} cy={LENS_Y} r={10}
                fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
              <text x={lx} y={LENS_Y + 1} textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={7} fontWeight={200}
                fill={EC.black}>
                {name}
              </text>
            </g>
          );
        })}

        {/* ── transition arrow ── */}
        <text x="310" y={L3_Y - 18} textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          {"recall() + 깊이 판정"}
        </text>
        <line x1="310" y1={LENS_Y + 16} x2="310" y2={L3_Y - 22}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ══════ LAYER 3: 5W1H DEPTH ══════ */}

        <text x={LBL_X} y={L3_Y}
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          LAYER 3 · 5W1H APPLY
        </text>
        <text x={LBL_X} y={L3_Y + 12}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          적용 — 내 작업에 어떻게 닿는가
        </text>

        {[
          { l: "L1", w: 200, fields: "where  what  why  how  when", desc: "즉시 적용" },
          { l: "L2", w: 130, fields: "where  what  why",            desc: "설계 참고" },
          { l: "L3", w: 80,  fields: "what  why",                   desc: "사고 자극" },
        ].map((lv, i) => {
          const ly = L3_Y + 28 + i * 24;
          return (
            <g key={i}>
              <text x={LBL_X + 10} y={ly + 1} dominantBaseline="middle"
                fontFamily={EC.font} fontSize={10} fontWeight={200}
                fill={EC.black} style={{ fontVariantNumeric: "tabular-nums" }}>
                {lv.l}
              </text>
              <rect x={LBL_X + 36} y={ly - 4} width={lv.w} height={8} rx={0}
                fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
              <text x={LBL_X + 44 + lv.w} y={ly + 1} dominantBaseline="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={200}
                fill={EC.gray40}>
                {lv.fields}
              </text>
              <text x="460" y={ly + 1} textAnchor="end" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={200}
                fill={EC.gray60}>
                {lv.desc}
              </text>
            </g>
          );
        })}

        {/* recall annotation */}
        <text x="460" y={L3_Y} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>
          {"← mcp-memory 4,900 nodes"}
        </text>

        {/* caption */}
        <text x={LBL_X + 36} y={totalH + 2}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          3층 해석 체계 — 형식, 관점, 적용을 순서대로 통과한다
        </text>
      </svg>
    </div>
  );
}
