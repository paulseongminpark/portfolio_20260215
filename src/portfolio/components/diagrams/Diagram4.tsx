/**
 * 다이어그램 4 — 6레이어 성숙 지도
 * L0(아래)→L5(위). 방화벽 경계선. 뇌과학 2구간 매핑.
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  offWhite:  "#F7F7F7",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
  lineHeavy: 1.5,
} as const;

/* ── Layout ── */
const CX = 260;
const layerW = 360;
const layerH = 30;
const layerGap = 5;
const layerX = CX - layerW / 2;
const tagW = 64;
const tagH = 18;
const tagGap = 6;
const firewallGap = 20;

const layers = [
  { id: "L5", types: ["Identity"],                                      zone: "neo" },
  { id: "L4", types: ["Principle", "Framework"],                        zone: "neo" },
  { id: "L3", types: ["Pattern", "Insight"],                            zone: "neo" },
  { id: "L2", types: ["Signal"],                                        zone: "neo" },
  { id: "L1", types: ["Observation", "Experiment", "Decision", "Goal"], zone: "hippo" },
  { id: "L0", types: ["Correction", "Narrative", "Project", "Tool", "Failure"], zone: "hippo" },
];

const firewallIdx = 4;
const startY = 55;

function getLayerY(i: number) {
  return startY + i * (layerH + layerGap) + (i >= firewallIdx ? firewallGap : 0);
}

const totalH = getLayerY(layers.length - 1) + layerH + 40;

/* ── Layer + Tag Renderer ── */
function LayerStack() {
  return (
    <g>
      {layers.map((layer, i) => {
        const y = getLayerY(i);
        const isNeo = layer.zone === "neo";
        const totalTagW = layer.types.length * tagW + (layer.types.length - 1) * tagGap;
        const tagStartX = CX - totalTagW / 2;

        return (
          <g key={layer.id}>
            {/* 레이어 배경 — 극도로 연한 선 */}
            <rect x={layerX} y={y} width={layerW} height={layerH} rx={0}
              fill={isNeo ? "rgba(0,0,0,0.012)" : "none"}
              stroke={EC.gray90} strokeWidth={EC.lineLight} />

            {/* L번호 */}
            <text x={layerX - 12} y={y + layerH / 2 + 1} textAnchor="end" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={10} fontWeight={200}
              fill={isNeo ? EC.black : EC.gray60}
              style={{ fontVariantNumeric: "tabular-nums" }}>
              {layer.id}
            </text>

            {/* 타입 태그 — stroke only, rx=0 */}
            {layer.types.map((t, j) => {
              const tx = tagStartX + j * (tagW + tagGap) + tagW / 2;
              const isTop = isNeo && i <= 1; // L5, L4 = accent
              return (
                <g key={t}>
                  <rect x={tx - tagW / 2} y={y + (layerH - tagH) / 2}
                    width={tagW} height={tagH} rx={0}
                    fill="none"
                    stroke={isTop ? EC.accent : EC.black}
                    strokeWidth={isTop ? EC.lineBold : EC.lineReg} />
                  <text x={tx} y={y + layerH / 2 + 1} textAnchor="middle" dominantBaseline="middle"
                    fontFamily={EC.font} fontSize={7} fontWeight={300}
                    fill={isTop ? EC.accent : EC.black}>
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

/* ── Firewall ── */
function Firewall() {
  const y = getLayerY(firewallIdx) - firewallGap / 2 - 1;
  return (
    <g>
      {/* 단면 절단선 — El Croquis의 가장 굵은 선 */}
      <line x1={layerX - 20} y1={y} x2={layerX + layerW + 20} y2={y}
        stroke={EC.accent} strokeWidth={EC.lineHeavy} strokeDasharray="6 3" />
      <text x={CX} y={y - 6} textAnchor="middle"
        fontFamily={EC.font} fontSize={7} fontWeight={300}
        fill={EC.accent} letterSpacing="1px">
        AI 자동 수정 불가
      </text>
    </g>
  );
}

/* ── Brain Labels (right brackets) ── */
function BrainLabels() {
  const rx = layerX + layerW + 28;
  const neoTop = getLayerY(0) + 4;
  const neoBot = getLayerY(firewallIdx - 1) + layerH - 4;
  const neoMid = (neoTop + neoBot) / 2;
  const hipTop = getLayerY(firewallIdx) + 4;
  const hipBot = getLayerY(layers.length - 1) + layerH - 4;
  const hipMid = (hipTop + hipBot) / 2;

  return (
    <g>
      {/* 신피질 bracket */}
      <line x1={rx - 8} y1={neoTop} x2={rx - 8} y2={neoBot}
        stroke={EC.black} strokeWidth={EC.lineReg} />
      <line x1={rx - 12} y1={neoTop} x2={rx - 8} y2={neoTop}
        stroke={EC.black} strokeWidth={EC.lineReg} />
      <line x1={rx - 12} y1={neoBot} x2={rx - 8} y2={neoBot}
        stroke={EC.black} strokeWidth={EC.lineReg} />
      <text x={rx} y={neoMid - 5} fontFamily={EC.font} fontSize={9} fontWeight={300} fill={EC.black}>
        신피질
      </text>
      <text x={rx} y={neoMid + 8} fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
        느리게 추출, 영구적
      </text>

      {/* 해마 bracket */}
      <line x1={rx - 8} y1={hipTop} x2={rx - 8} y2={hipBot}
        stroke={EC.gray60} strokeWidth={EC.lineReg} />
      <line x1={rx - 12} y1={hipTop} x2={rx - 8} y2={hipTop}
        stroke={EC.gray60} strokeWidth={EC.lineReg} />
      <line x1={rx - 12} y1={hipBot} x2={rx - 8} y2={hipBot}
        stroke={EC.gray60} strokeWidth={EC.lineReg} />
      <text x={rx} y={hipMid - 5} fontFamily={EC.font} fontSize={9} fontWeight={300} fill={EC.gray60}>
        해마
      </text>
      <text x={rx} y={hipMid + 8} fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
        빠르게 저장, 일시적
      </text>
    </g>
  );
}

/* ── Vertical Arrows (left) ── */
function VerticalArrows() {
  const ax = layerX - 38;
  const topY = getLayerY(0) + layerH / 2;
  const botY = getLayerY(layers.length - 1) + layerH / 2;
  const midY = (topY + botY) / 2;

  return (
    <g>
      <defs>
        <marker id="ec-arrow-4u" viewBox="0 0 8 6" refX="0" refY="3"
          markerWidth="5" markerHeight="4" orient="auto">
          <polygon points="8 0, 0 3, 8 6" fill={EC.black} />
        </marker>
        <marker id="ec-arrow-4d" viewBox="0 0 8 6" refX="8" refY="3"
          markerWidth="5" markerHeight="4" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={EC.gray60} />
        </marker>
      </defs>

      {/* 승격 ↑ */}
      <line x1={ax} y1={midY + 2} x2={ax} y2={topY + 4}
        stroke={EC.black} strokeWidth={EC.lineReg}
        markerEnd="url(#ec-arrow-4u)" />
      <text x={ax - 8} y={(topY + midY) / 2} textAnchor="end" dominantBaseline="middle"
        fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.black}>
        승격
      </text>

      {/* 감쇠 ↓ */}
      <line x1={ax} y1={midY + 20} x2={ax} y2={botY - 4}
        stroke={EC.gray60} strokeWidth={EC.lineReg}
        markerEnd="url(#ec-arrow-4d)" />
      <text x={ax - 8} y={(midY + 20 + botY) / 2} textAnchor="end" dominantBaseline="middle"
        fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
        감쇠
      </text>
    </g>
  );
}

/* ── Title ── */
export function Diagram4() {
  return (
    <div style={{
      margin: 0,
    }}>
      <svg viewBox={`-10 14 530 ${Math.round(totalH * 0.92)}`} width="100%" style={{ display: "block" }}>
        {/* Title */}
        <text x={CX} y={32} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          {"6-LAYER MATURITY MAP"}
        </text>

        <LayerStack />
        <Firewall />
        <BrainLabels />
        <VerticalArrows />
      </svg>
    </div>
  );
}
