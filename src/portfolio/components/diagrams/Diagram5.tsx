/**
 * 다이어그램 5 — 3중 검색 아키텍처
 * 좌: query → 중: 3레인 병렬 → 우: 합류 → 결과
 * Primitive System v1
 */
import { DiagramScene, type NodeDef, type EdgeDef, type LabelDef, type BandDef } from "./diagramPrimitives";
import { COLORS, TYPO, CONN } from "./diagramTokens";

/* ── 레이아웃 상수 ── */
const laneX = 105;
const laneW = 180;
const laneH = 38;
const laneGap = 6;
const laneStartY = 58;

const boxCX = laneX + 48;
const boxW = 76;
const boxH = 26;

const rrfX = laneX + laneW + 55;
const ndcgX = rrfX + 70;

function laneY(i: number) { return laneStartY + i * (laneH + laneGap); }
function laneCY(i: number) { return laneY(i) + laneH / 2; }

const midLaneCY = laneCY(1);
const hebbY = laneY(2) + laneH + 38;

/* ── Bands ── */
const bands: BandDef[] = [
  { x: laneX, y: laneY(0), w: laneW, h: laneH, fill: "rgba(219,234,254,0.3)" },
  { x: laneX, y: laneY(1), w: laneW, h: laneH, fill: "rgba(209,250,229,0.3)" },
  { x: laneX, y: laneY(2), w: laneW, h: laneH, fill: "rgba(254,243,199,0.3)" },
];

/* ── Nodes ── */
const nodes: NodeDef[] = [
  { id: "query", type: "rect", x: 50, y: midLaneCY, w: 60, h: 24, variant: "tertiary", label: "recall()", cornerRadius: 4 },
  { id: "vec",   type: "rect", x: boxCX, y: laneCY(0), w: boxW, h: boxH, variant: "surface", label: "Vector", sub: "ChromaDB", cornerRadius: 3 },
  { id: "fts",   type: "rect", x: boxCX, y: laneCY(1), w: boxW, h: boxH, variant: "surface", label: "FTS5", sub: "trigram", cornerRadius: 3 },
  { id: "graph", type: "rect", x: boxCX, y: laneCY(2), w: boxW, h: boxH, variant: "surface", label: "Graph", sub: "NetworkX", cornerRadius: 3 },
  { id: "rrf",   type: "rect", x: rrfX, y: midLaneCY - 2, w: 64, h: 30, variant: "tertiary", label: "RRF", sub: "K=18", cornerRadius: 4 },
  { id: "hebb",  type: "rect", x: 240, y: hebbY, w: 120, h: 22, variant: "primary", label: "Hebbian Feedback", cornerRadius: 4 },
];

/* ── Edges ── */
const edges: EdgeDef[] = [
  { from: "query", to: "vec",   fromAnchor: "right", toAnchor: "left", routing: "orthogonal-h", cornerRadius: 6 },
  { from: "query", to: "fts",   fromAnchor: "right", toAnchor: "left" },
  { from: "query", to: "graph", fromAnchor: "right", toAnchor: "left", routing: "orthogonal-h", cornerRadius: 6 },
  { from: "vec",   to: "rrf",   fromAnchor: "right", toAnchor: "left", routing: "orthogonal-h", cornerRadius: 6 },
  { from: "fts",   to: "rrf",   fromAnchor: "right", toAnchor: "left" },
  { from: "graph", to: "rrf",   fromAnchor: "right", toAnchor: "left", routing: "orthogonal-h", cornerRadius: 6 },
  { from: "hebb",  to: "graph", fromAnchor: "left", toAnchor: "bottom", routing: "orthogonal-v", cornerRadius: 6, style: "dashed", color: COLORS.accent.fill },
];

/* ── Labels ── */
const labels: LabelDef[] = [
  { x: 240, y: 26, text: "3중 검색 아키텍처", level: "label", size: 12, weight: 700 },
  { x: boxCX + boxW / 2 + 8, y: laneCY(0) - 6, text: "의미로 찾는다", level: "caption", size: 7, anchor: "start" },
  { x: boxCX + boxW / 2 + 8, y: laneCY(1) - 6, text: "이름을 짚는다", level: "caption", size: 7, anchor: "start" },
  { x: boxCX + boxW / 2 + 8, y: laneCY(2) - 6, text: "관계를 따라간다", level: "caption", size: 7, anchor: "start" },
  { x: 240, y: hebbY + 28, text: "어느 하나가 놓치는 것을 나머지가 잡는다.", level: "caption", size: 9 },
];

/* ── 커스텀: NDCG + 피드백 라벨 ── */
function CustomElements() {
  return (
    <g>
      {/* NDCG — RRF 오른쪽, 분리 */}
      <line x1={rrfX + 32} y1={midLaneCY} x2={ndcgX - 14} y2={midLaneCY}
        stroke={CONN.stroke} strokeWidth={0.8} markerEnd="url(#arrow-default)" />
      <text x={ndcgX + 16} y={midLaneCY - 10} textAnchor="middle"
        fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.caption.color}>
        NDCG
      </text>
      <text x={ndcgX + 16} y={midLaneCY + 7} textAnchor="middle"
        fontFamily={TYPO.family} fontSize={16} fontWeight={700} fill={COLORS.accent.fill}>
        0.624
      </text>

      {/* RRF → Hebbian 연결 */}
      <line x1={rrfX} y1={midLaneCY + 15} x2={rrfX} y2={hebbY - 14}
        stroke={CONN.stroke} strokeWidth={0.5} />
      <line x1={rrfX} y1={hebbY - 14} x2={240 + 70} y2={hebbY - 14}
        stroke={CONN.stroke} strokeWidth={0.5} markerEnd="url(#arrow-default)" />

      {/* feedback loop 라벨 */}
      <text x={240 - 78} y={hebbY + 1} textAnchor="end" dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={9} fontWeight={500} fill={COLORS.accent.fill}>
        feedback
      </text>

      {/* 10% 탐험 — Graph 레인 아래, 작게 */}
      <text x={boxCX} y={laneY(2) + laneH + 12} textAnchor="middle"
        fontFamily={TYPO.family} fontSize={7} fontWeight={500} fill={COLORS.accent.fill}>
        UCB 10% 탐험
      </text>
    </g>
  );
}

export function Diagram5() {
  return (
    <DiagramScene
      nodes={nodes}
      edges={edges}
      bands={bands}
      labels={labels}
      viewBoxOverride="0 8 460 250"
      maxWidth={620}
      marginTop={40}
    >
      <CustomElements />
    </DiagramScene>
  );
}
