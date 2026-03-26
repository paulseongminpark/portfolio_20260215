/**
 * 다이어그램 4 — 6레이어 성숙 지도
 * L0(아래)→L5(위). 방화벽 경계선. 뇌과학 2구간 매핑.
 * Primitive System v1
 */
import { DiagramScene, type LabelDef } from "./diagramPrimitives";
import { COLORS, TYPO } from "./diagramTokens";

/* ── Layout ── */
const CX = 260;
const layerW = 360;
const layerH = 30;
const layerGap = 5;
const layerX = CX - layerW / 2;
const tagW = 64;
const tagH = 18;
const tagGap = 6;
const firewallGap = 18;

/* ── 레이어 정의 (위→아래 순서) ── */
const layers = [
  { id: "L5", types: ["Identity"],                                      zone: "neo" },
  { id: "L4", types: ["Principle", "Framework"],                        zone: "neo" },
  { id: "L3", types: ["Pattern", "Insight"],                            zone: "neo" },
  { id: "L2", types: ["Signal"],                                        zone: "neo" },
  // ── firewall gap ──
  { id: "L1", types: ["Observation", "Experiment", "Decision", "Goal"], zone: "hippo" },
  { id: "L0", types: ["Correction", "Narrative", "Project", "Tool", "Failure"], zone: "hippo" },
];

const firewallIdx = 4; // L1 앞에 방화벽
const startY = 55;

function getLayerY(i: number) {
  const extra = i >= firewallIdx ? firewallGap : 0;
  return startY + i * (layerH + layerGap) + extra;
}

const totalH = getLayerY(layers.length - 1) + layerH + 40;

/* ── Labels ── */
const labels: LabelDef[] = [
  { x: CX, y: 30, text: "6-Layer Maturity Map", level: "label", size: 13, weight: 700 },
];

/* ── 레이어 + 태그 렌더 ── */
function LayerStack() {
  return (
    <g>
      {layers.map((layer, i) => {
        const y = getLayerY(i);
        const isNeo = layer.zone === "neo";
        const tagFill = isNeo ? COLORS.primary.fill : COLORS.tertiary.fill;
        const tagStroke = isNeo ? COLORS.primary.stroke : COLORS.tertiary.stroke;

        const totalTagW = layer.types.length * tagW + (layer.types.length - 1) * tagGap;
        const tagStartX = CX - totalTagW / 2;

        return (
          <g key={layer.id}>
            {/* 레이어 배경 */}
            <rect x={layerX} y={y} width={layerW} height={layerH} rx={4}
              fill="rgba(0,0,0,0.018)" stroke={COLORS.surface.stroke} strokeWidth={0.5} />

            {/* L번호 */}
            <text x={layerX - 12} y={y + layerH / 2 + 1} textAnchor="end" dominantBaseline="middle"
              fontFamily={TYPO.family} fontSize={13} fontWeight={700}
              fill={isNeo ? COLORS.primary.stroke : TYPO.caption.color}>
              {layer.id}
            </text>

            {/* 타입 태그 */}
            {layer.types.map((t, j) => {
              const tx = tagStartX + j * (tagW + tagGap) + tagW / 2;
              return (
                <g key={t}>
                  <rect x={tx - tagW / 2} y={y + (layerH - tagH) / 2}
                    width={tagW} height={tagH} rx={3}
                    fill={tagFill} stroke={tagStroke} strokeWidth={0.8} />
                  <text x={tx} y={y + layerH / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                    fontFamily={TYPO.family} fontSize={7.5} fontWeight={600} fill={TYPO.label.color}>
                    {t}
                  </text>
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

/* ── 방화벽 ── */
function Firewall() {
  const y = getLayerY(firewallIdx) - firewallGap / 2 - 1;
  return (
    <g>
      <line x1={layerX - 20} y1={y} x2={layerX + layerW + 20} y2={y}
        stroke={COLORS.accent.fill} strokeWidth={1.5} strokeDasharray="6 3" />
      <rect x={CX - 52} y={y - 8} width={104} height={16} rx={8}
        fill="#fff" stroke={COLORS.accent.fill} strokeWidth={1} />
      <text x={CX} y={y + 1} textAnchor="middle" dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={7.5} fontWeight={700} fill={COLORS.accent.fill}>
        AI 자동 수정 불가
      </text>
    </g>
  );
}

/* ── 뇌과학 구간 라벨 (오른쪽) ── */
function BrainLabels() {
  const rx = layerX + layerW + 28;
  const neoMidY = (getLayerY(0) + getLayerY(firewallIdx - 1) + layerH) / 2;
  const hippoMidY = (getLayerY(firewallIdx) + getLayerY(layers.length - 1) + layerH) / 2;

  return (
    <g>
      {/* 신피질 구간 브래킷 */}
      <line x1={rx - 8} y1={getLayerY(0) + 4} x2={rx - 8} y2={getLayerY(firewallIdx - 1) + layerH - 4}
        stroke={COLORS.primary.stroke} strokeWidth={1} />
      <line x1={rx - 12} y1={getLayerY(0) + 4} x2={rx - 8} y2={getLayerY(0) + 4}
        stroke={COLORS.primary.stroke} strokeWidth={1} />
      <line x1={rx - 12} y1={getLayerY(firewallIdx - 1) + layerH - 4} x2={rx - 8} y2={getLayerY(firewallIdx - 1) + layerH - 4}
        stroke={COLORS.primary.stroke} strokeWidth={1} />
      <text x={rx} y={neoMidY - 5} fontFamily={TYPO.family} fontSize={11} fontWeight={600} fill={COLORS.primary.stroke}>
        신피질
      </text>
      <text x={rx} y={neoMidY + 9} fontFamily={TYPO.family} fontSize={9} fill={TYPO.caption.color}>
        느리게 추출, 영구적
      </text>

      {/* 해마 구간 브래킷 */}
      <line x1={rx - 8} y1={getLayerY(firewallIdx) + 4} x2={rx - 8} y2={getLayerY(layers.length - 1) + layerH - 4}
        stroke={COLORS.tertiary.stroke} strokeWidth={1} />
      <line x1={rx - 12} y1={getLayerY(firewallIdx) + 4} x2={rx - 8} y2={getLayerY(firewallIdx) + 4}
        stroke={COLORS.tertiary.stroke} strokeWidth={1} />
      <line x1={rx - 12} y1={getLayerY(layers.length - 1) + layerH - 4} x2={rx - 8} y2={getLayerY(layers.length - 1) + layerH - 4}
        stroke={COLORS.tertiary.stroke} strokeWidth={1} />
      <text x={rx} y={hippoMidY - 5} fontFamily={TYPO.family} fontSize={11} fontWeight={600} fill={COLORS.tertiary.stroke}>
        해마
      </text>
      <text x={rx} y={hippoMidY + 9} fontFamily={TYPO.family} fontSize={9} fill={TYPO.caption.color}>
        빠르게 저장, 일시적
      </text>
    </g>
  );
}

/* ── 승격/감쇠 화살표 (왼쪽) ── */
function VerticalArrows() {
  const ax = layerX - 38;
  const topY = getLayerY(0) + layerH / 2;
  const botY = getLayerY(layers.length - 1) + layerH / 2;
  const midY = (topY + botY) / 2;

  return (
    <g>
      {/* 승격 ↑ */}
      <line x1={ax} y1={midY + 5} x2={ax} y2={topY}
        stroke={COLORS.primary.stroke} strokeWidth={0.8} markerEnd="url(#arrow-default)" />
      <text x={ax - 8} y={(topY + midY) / 2} textAnchor="end" dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={10} fontWeight={600} fill={COLORS.primary.stroke}>
        승격
      </text>

      {/* 감쇠 ↓ */}
      <line x1={ax} y1={midY + 22} x2={ax} y2={botY}
        stroke={TYPO.caption.color} strokeWidth={0.8} markerEnd="url(#arrow-default)" />
      <text x={ax - 8} y={(midY + 22 + botY) / 2} textAnchor="end" dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={10} fontWeight={600} fill={TYPO.caption.color}>
        감쇠
      </text>
    </g>
  );
}

export function Diagram4() {
  return (
    <DiagramScene
      labels={labels}
      viewBoxOverride={`-10 18 522 ${Math.round(totalH * 0.9)}`}
      maxWidth={620}
      marginTop={40}
    >
      <LayerStack />
      <Firewall />
      <BrainLabels />
      <VerticalArrows />
    </DiagramScene>
  );
}
