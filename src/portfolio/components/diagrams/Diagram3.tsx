/**
 * 다이어그램 3 — 타입 수렴: 52(v2.0) → 15(v3.0)
 * D1과 반대 방향. 왼쪽 크고 복잡, 오른쪽 작고 정돈.
 * Primitive System v1
 */
import {
  DiagramScene,
  type NodeDef, type EdgeDef, type LabelDef, type LegendItemDef,
} from "./diagramPrimitives";
import { COLORS, TYPO, CONN } from "./diagramTokens";

const LC = 130;
const RC = 420;
const MID = (LC + RC) / 2;

/* ── Tier 색상 ── */
const T1 = COLORS.primary;
const T2 = COLORS.tertiary;
const T3 = COLORS.neutral;

/* ── 왼쪽: 산만한 노드 클러스터 ── */
const leftNodes: NodeDef[] = Array.from({ length: 14 }, (_, i) => ({
  id: `S${i}`,
  type: "circle" as const,
  x: LC + Math.cos(i * 1.7 + 0.5) * 50,
  y: 180 + Math.sin(i * 1.3 + 0.2) * 45,
  r: 4,
  variant: "neutral" as const,
}));

const leftEdges: EdgeDef[] = [
  { from: "S0", to: "S1" }, { from: "S1", to: "S3" }, { from: "S2", to: "S4" },
  { from: "S3", to: "S5" }, { from: "S4", to: "S6" }, { from: "S5", to: "S7" },
  { from: "S6", to: "S8" }, { from: "S8", to: "S9" }, { from: "S9", to: "S10" },
  { from: "S10", to: "S11" }, { from: "S11", to: "S12" }, { from: "S12", to: "S13" },
  { from: "S0", to: "S4" }, { from: "S2", to: "S7" }, { from: "S7", to: "S13" },
].map((e) => ({ ...e, color: "#D1D5DB", strokeWidth: 0.5 }));

/* ── 오른쪽: 3 Tier 타입 카드 ── */
const itemW = 72;
const itemH = 18;
const rowGap = 4;
const tierGap = 8;
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

/* ── Tier 카드 렌더 ── */
function TierCards({ names, startY, fill, stroke, prefix }: {
  names: string[]; startY: number; fill: string; stroke: string; prefix: string;
}) {
  return (
    <g>
      {names.map((name, i) => {
        const cx = i % 2 === 0 ? col1 : col2;
        const cy = startY + Math.floor(i / 2) * (itemH + rowGap);
        return (
          <g key={`${prefix}${i}`}>
            <rect x={cx - itemW / 2} y={cy - itemH / 2} width={itemW} height={itemH}
              rx={3} fill={fill} stroke={stroke} strokeWidth={0.8} />
            <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
              fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.label.color}>
              {name}
            </text>
          </g>
        );
      })}
    </g>
  );
}

/* ── Tier 라벨 (오른쪽 끝) ── */
function TierLabels() {
  const lx = col2 + itemW / 2 + 10;
  return (
    <g>
      <text x={lx} y={t1Y} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={T1.stroke} dominantBaseline="middle">핵심 7</text>
      <text x={lx} y={t2Y} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={T2.stroke} dominantBaseline="middle">맥락 5</text>
      <text x={lx} y={t3Y} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.caption.color} dominantBaseline="middle">전환 3</text>
    </g>
  );
}

/* ── Labels ── */
const labels: LabelDef[] = [
  { x: LC, y: 65, text: "52", level: "hero", color: TYPO.caption.color, size: 26, weight: 700 },
  { x: LC, y: 82, text: "types · v2.0", level: "desc", size: 12, weight: 500 },
  { x: RC, y: 65, text: "15", level: "hero", size: 26, weight: 700 },
  { x: RC, y: 82, text: "types · v3.0", level: "desc", size: 12, weight: 500 },
  { x: MID, y: bottomY + 30, text: "온톨로지 타입이 수렴하는 궤적", level: "caption" },
];

/* ── 중앙 화살표 ── */
function Arrow() {
  const y = 180;
  return (
    <g>
      <line x1={LC + 60} y1={y} x2={RC - itemW - colGap / 2 - 15} y2={y}
        stroke={CONN.stroke} strokeWidth={CONN.strokeWidth}
        markerEnd="url(#arrow-default)" />
      <text x={MID - 10} y={y - 10} textAnchor="middle"
        fontFamily={TYPO.family} fontSize={9} fontWeight={500} fill={TYPO.desc.color}>
        타입은 성숙도, 태그가 의미
      </text>
    </g>
  );
}

export function Diagram3() {
  return (
    <DiagramScene
      nodes={leftNodes}
      edges={leftEdges}
      labels={labels}
      viewBoxOverride={`20 40 530 ${bottomY + 10}`}
      maxWidth={600}
      marginTop={40}
    >
      <TierCards names={tier1} startY={t1Y} fill={T1.fill} stroke={T1.stroke} prefix="T1_" />
      <TierCards names={tier2} startY={t2Y} fill={T2.fill} stroke={T2.stroke} prefix="T2_" />
      <TierCards names={tier3} startY={t3Y} fill={T3.fill} stroke={T3.stroke} prefix="T3_" />
      <TierLabels />
      <Arrow />
    </DiagramScene>
  );
}
