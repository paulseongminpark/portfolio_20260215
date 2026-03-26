/**
 * 다이어그램 1 — 타입 팽창 그래프: 26(v0.1) → 52(v2.0)
 * Primitive System v1 적용
 */
import {
  DiagramScene,
  type NodeDef, type EdgeDef, type LabelDef, type LegendItemDef,
} from "./diagramPrimitives";
import { COLORS, TYPO, CONN } from "./diagramTokens";

/* ── Layout Axes ── */
const LC = 140;
const RC = 460;
const MID = (LC + RC) / 2;   // 300

/* ── Edge style — 네트워크 그래프용 얇은 선 ── */
const EDGE_COLOR = "#D1D5DB";
const EDGE_WIDTH = 0.7;

/* ── Nodes ── */
const nodes: NodeDef[] = [
  // 왼쪽 (v0.1, 26 types) — neutral, 더 퍼뜨림
  { id: "L0", type: "circle", x: LC,      y: 145, r: 8, variant: "neutral" },
  { id: "L1", type: "circle", x: LC + 35, y: 115, r: 8, variant: "neutral" },
  { id: "L2", type: "circle", x: LC - 30, y: 170, r: 8, variant: "neutral" },
  { id: "L3", type: "circle", x: LC + 15, y: 195, r: 8, variant: "neutral" },
  { id: "L4", type: "circle", x: LC + 50, y: 165, r: 8, variant: "neutral" },
  { id: "L5", type: "circle", x: LC - 50, y: 148, r: 8, variant: "neutral" },
  { id: "L6", type: "circle", x: LC + 42, y: 135, r: 8, variant: "neutral" },
  { id: "L7", type: "circle", x: LC - 8,  y: 180, r: 8, variant: "neutral" },
  { id: "L8", type: "circle", x: LC - 22, y: 120, r: 8, variant: "neutral" },

  // 오른쪽 — 기존 (primary), 간격 약간 줄임
  { id: "R0", type: "circle", x: RC - 60, y: 105, r: 7, variant: "primary" },
  { id: "R1", type: "circle", x: RC - 35, y: 122, r: 7, variant: "primary" },
  { id: "R2", type: "circle", x: RC - 10, y: 108, r: 7, variant: "primary" },
  { id: "R3", type: "circle", x: RC + 15, y: 125, r: 7, variant: "primary" },
  { id: "R4", type: "circle", x: RC + 38, y: 110, r: 7, variant: "primary" },
  { id: "R5", type: "circle", x: RC + 60, y: 128, r: 7, variant: "primary" },
  { id: "R6", type: "circle", x: RC - 68, y: 145, r: 7, variant: "primary" },
  { id: "R7", type: "circle", x: RC - 42, y: 160, r: 7, variant: "primary" },
  { id: "R8", type: "circle", x: RC - 12, y: 148, r: 7, variant: "primary" },

  // 오른쪽 — 신규 (accent)
  { id: "R9",  type: "circle", x: RC + 12, y: 162, r: 7, variant: "solid-accent" },
  { id: "R10", type: "circle", x: RC + 38, y: 150, r: 7, variant: "solid-accent" },
  { id: "R11", type: "circle", x: RC + 60, y: 165, r: 7, variant: "solid-accent" },
  { id: "R12", type: "circle", x: RC - 52, y: 185, r: 7, variant: "solid-accent" },
  { id: "R13", type: "circle", x: RC - 25, y: 198, r: 7, variant: "solid-accent" },
  { id: "R14", type: "circle", x: RC,      y: 185, r: 7, variant: "solid-accent" },
  { id: "R15", type: "circle", x: RC + 25, y: 200, r: 7, variant: "solid-accent" },
  { id: "R16", type: "circle", x: RC + 48, y: 188, r: 7, variant: "solid-accent" },
  { id: "R17", type: "circle", x: RC + 65, y: 150, r: 7, variant: "solid-accent" },
];

/* ── Edges ── */
const e = (from: string, to: string): EdgeDef => ({
  from, to, color: EDGE_COLOR, strokeWidth: EDGE_WIDTH,
});

const edges: EdgeDef[] = [
  // 왼쪽
  e("L0","L1"), e("L0","L2"), e("L1","L4"), e("L2","L3"),
  e("L3","L4"), e("L5","L0"), e("L6","L1"), e("L7","L3"), e("L8","L5"),
  // 오른쪽 — 행
  e("R0","R1"),  e("R1","R2"),  e("R2","R3"),  e("R3","R4"),  e("R4","R5"),
  e("R6","R7"),  e("R7","R8"),  e("R8","R9"),  e("R9","R10"), e("R10","R11"),
  e("R12","R13"), e("R13","R14"), e("R14","R15"), e("R15","R16"), e("R16","R17"),
  // 오른쪽 — 열
  e("R6","R0"),  e("R12","R6"),  e("R7","R1"),  e("R13","R7"),
  e("R8","R2"),  e("R14","R8"),  e("R9","R3"),  e("R15","R9"),
  e("R10","R4"), e("R16","R10"), e("R11","R5"), e("R17","R11"),
];

/* ── Labels ── */
const labels: LabelDef[] = [
  { x: LC, y: 60,  text: "26", level: "hero", color: TYPO.label.color, size: 28, weight: 700 },
  { x: LC, y: 80,  text: "types · v0.1", level: "desc", size: 13, weight: 500 },
  { x: RC, y: 60,  text: "52", level: "hero", size: 28, weight: 700 },
  { x: RC, y: 80,  text: "types · v2.0", level: "desc", size: 13, weight: 500 },
  { x: MID, y: 340, text: "온톨로지 타입이 설계 과정에서 팽창하는 궤적", level: "caption" },
];

/* ── Legends — 타임라인 아래 충분한 간격 ── */
const legends: LegendItemDef[] = [
  { x: MID - 100, y: 310, color: COLORS.neutral.stroke, text: "v0.1 기존" },
  { x: MID - 15,  y: 310, color: COLORS.primary.fill,   text: "유지" },
  { x: MID + 45,  y: 310, color: COLORS.accent.fill,    text: "v2.0 신규" },
];

/* ── Timeline ── */
function Timeline() {
  const y = 250;
  const evts = [
    { x: MID - 80, label: "들뢰즈 도입" },
    { x: MID,      label: "헤비안 학습" },
    { x: MID + 80, label: "9개 AI 리서치" },
  ];
  return (
    <g>
      <line x1={MID - 128} y1={y} x2={MID + 128} y2={y}
        stroke={CONN.stroke} strokeWidth={CONN.strokeWidth}
        markerEnd="url(#arrow-default)" />
      {evts.map((ev, i) => (
        <g key={i}>
          <circle cx={ev.x} cy={y} r={3} fill={COLORS.accent.fill} />
          <line x1={ev.x} y1={y + 3} x2={ev.x} y2={y + 20}
            stroke={COLORS.neutral.stroke} strokeWidth={1} />
          <text x={ev.x} y={y + 34} textAnchor="middle"
            fontFamily={TYPO.family} fontSize={11} fontWeight={500} fill={TYPO.desc.color}>
            {ev.label}
          </text>
        </g>
      ))}
    </g>
  );
}

export function Diagram1() {
  return (
    <DiagramScene
      nodes={nodes}
      edges={edges}
      labels={labels}
      legends={legends}
      viewBoxOverride="40 30 540 325"
      maxWidth={600}
      marginTop={40}
    >
      <Timeline />
    </DiagramScene>
  );
}
