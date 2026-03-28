/**
 * 다이어그램 3 — 타입 수렴: 52(v2.0) → 15(v3.0)
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
  lineLight: 0.35,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* ── Layout ── */
const LC = 130;
const RC = 420;
const MID = (LC + RC) / 2;

/* ── Left: scattered cluster (52 types) ── */
const leftNodes = Array.from({ length: 14 }, (_, i) => ({
  x: LC + Math.cos(i * 1.7 + 0.5) * 52,
  y: 185 + Math.sin(i * 1.3 + 0.2) * 48,
}));

const leftEdgeIdx: [number, number][] = [
  [0,1],[1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[8,9],[9,10],
  [10,11],[11,12],[12,13],[0,4],[2,7],[7,13],
];

/* ── Right: 3 Tier type cards (15 types) ── */
const itemW = 72;
const itemH = 18;
const rowGap = 4;
const tierGap = 10;
const colGap = 8;
const col1 = RC - colGap / 2 - itemW / 2;
const col2 = RC + colGap / 2 + itemW / 2;

const tier1 = ["Observation", "Signal", "Pattern", "Insight", "Principle", "Framework", "Identity"];
const tier2 = ["Decision", "Failure", "Experiment", "Goal", "Tool"];
const tier3 = ["Correction", "Narrative", "Project"];

const t1Y = 100;
const t1Rows = Math.ceil(tier1.length / 2);
const t2Y = t1Y + t1Rows * (itemH + rowGap) + tierGap;
const t2Rows = Math.ceil(tier2.length / 2);
const t3Y = t2Y + t2Rows * (itemH + rowGap) + tierGap;
const t3Rows = Math.ceil(tier3.length / 2);
const bottomY = t3Y + t3Rows * (itemH + rowGap);

/* ── Tier Card Renderer ── */
function TierCards({ names, startY, isAccent }: {
  names: string[]; startY: number; isAccent?: boolean;
}) {
  return (
    <g>
      {names.map((name, i) => {
        const cx = i % 2 === 0 ? col1 : col2;
        const cy = startY + Math.floor(i / 2) * (itemH + rowGap);
        return (
          <g key={`${name}`}>
            <rect x={cx - itemW / 2} y={cy - itemH / 2} width={itemW} height={itemH}
              rx={0} fill="none"
              stroke={isAccent ? EC.accent : EC.black}
              strokeWidth={isAccent ? EC.lineBold : EC.lineReg} />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={300}
              fill={isAccent ? EC.accent : EC.black}>
              {name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function Diagram3() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 640,
      padding: "0 16px",
    }}>
      <svg viewBox={`20 40 530 ${bottomY + 10}`} width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-arrow-3" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray60} />
          </marker>
        </defs>

        {/* ── Left edges ── */}
        {leftEdgeIdx.map(([a, b], i) => (
          <line key={`le${i}`}
            x1={leftNodes[a].x} y1={leftNodes[a].y}
            x2={leftNodes[b].x} y2={leftNodes[b].y}
            stroke={EC.gray85} strokeWidth={EC.lineLight} />
        ))}

        {/* ── Left nodes: stroke only ── */}
        {leftNodes.map((n, i) => (
          <circle key={`ln${i}`} cx={n.x} cy={n.y} r={4}
            fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Hero Numbers ── */}
        <text x={LC} y={68} textAnchor="middle"
          fontFamily={EC.font} fontSize={28} fontWeight={200}
          fill={EC.gray60} style={{ fontVariantNumeric: "tabular-nums" }}>
          52
        </text>
        <text x={LC} y={84} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          {"TYPES · V2.0"}
        </text>

        <text x={RC} y={68} textAnchor="middle"
          fontFamily={EC.font} fontSize={28} fontWeight={200}
          fill={EC.black} style={{ fontVariantNumeric: "tabular-nums" }}>
          15
        </text>
        <text x={RC} y={84} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          {"TYPES · V3.0"}
        </text>

        {/* ── Right: Tier cards ── */}
        <TierCards names={tier1} startY={t1Y} isAccent />
        <TierCards names={tier2} startY={t2Y} />
        <TierCards names={tier3} startY={t3Y} />

        {/* ── Tier labels ── */}
        {(() => {
          const lx = col2 + itemW / 2 + 12;
          return (
            <g>
              <text x={lx} y={t1Y} fontFamily={EC.font} fontSize={7} fontWeight={200}
                fill={EC.accent} dominantBaseline="middle" letterSpacing="0.5px">
                핵심 7
              </text>
              <text x={lx} y={t2Y} fontFamily={EC.font} fontSize={7} fontWeight={200}
                fill={EC.gray40} dominantBaseline="middle" letterSpacing="0.5px">
                맥락 5
              </text>
              <text x={lx} y={t3Y} fontFamily={EC.font} fontSize={7} fontWeight={200}
                fill={EC.gray60} dominantBaseline="middle" letterSpacing="0.5px">
                전환 3
              </text>
            </g>
          );
        })()}

        {/* ── Center arrow ── */}
        <line x1={LC + 62} y1={185} x2={RC - itemW - colGap / 2 - 15} y2={185}
          stroke={EC.gray85} strokeWidth={EC.lineLight}
          markerEnd="url(#ec-arrow-3)" />
        <text x={MID - 10} y={175} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          타입은 성숙도, 태그가 의미
        </text>

        {/* ── Caption ── */}
        <text x={MID} y={bottomY + 28} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          온톨로지 타입이 수렴하는 궤적
        </text>
      </svg>
    </div>
  );
}
