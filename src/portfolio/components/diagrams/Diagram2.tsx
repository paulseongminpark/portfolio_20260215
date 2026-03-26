/**
 * 다이어그램 2 — 0.057
 * "텅 비어있다. 여백이 많고 숫자 하나만 덩그러니. 비어있음 자체가 좌절."
 * Primitive System v1
 */
import { DiagramScene, type LabelDef } from "./diagramPrimitives";
import { COLORS, TYPO } from "./diagramTokens";

const CX = 300;
const CY = 120;

/* ── Scale bar: 0 → 0.5 → 1.0 ── */
const barY = 195;
const barLeft = 120;
const barRight = 480;
const barW = barRight - barLeft;
const markerX = barLeft + (0.057 / 1.0) * barW; // 0.057 위치

const labels: LabelDef[] = [
  // 숫자 — 크고 무겁게
  { x: CX, y: CY, text: "0.057", size: 56, weight: 300, color: TYPO.label.color, anchor: "middle" },
  // 지표 이름
  { x: CX, y: CY + 30, text: "NDCG", level: "desc", size: 12, weight: 600, color: TYPO.caption.color },
  // 스케일 라벨
  { x: barLeft, y: barY + 22, text: "0", level: "caption", anchor: "middle" },
  { x: barLeft + barW * 0.5, y: barY + 22, text: "0.5", level: "caption", anchor: "middle" },
  { x: barRight, y: barY + 22, text: "1.0", level: "caption", anchor: "middle" },
  // 기준선 설명
  { x: barLeft + barW * 0.5, y: barY + 42, text: "쓸 만한 수준", level: "desc", size: 11, color: TYPO.label.color },
];

function ScaleBar() {
  return (
    <g>
      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
      {/* 바 배경 */}
      <rect x={barLeft} y={barY} width={barW} height={6} rx={3}
        fill={COLORS.neutral.fill} />
      {/* 0.057 위치 마커 */}
      <circle cx={markerX} cy={barY + 3} r={5}
        fill={COLORS.accent.fill} />
      {/* 바운스 화살표 */}
      <g style={{ animation: "bounce-arrow 1.2s ease-in-out infinite" }}>
        <path
          d={`M ${markerX} ${barY - 12} L ${markerX - 5} ${barY - 22} L ${markerX + 5} ${barY - 22} Z`}
          fill={COLORS.accent.fill}
        />
      </g>
      {/* 0.5 기준선 */}
      <line x1={barLeft + barW * 0.5} y1={barY - 4} x2={barLeft + barW * 0.5} y2={barY + 10}
        stroke={COLORS.neutral.stroke} strokeWidth={1} strokeDasharray="3 2" />
    </g>
  );
}

export function Diagram2() {
  return (
    <DiagramScene
      labels={labels}
      viewBoxOverride="60 50 480 210"
      maxWidth={520}
      marginTop={40}
    >
      <ScaleBar />
    </DiagramScene>
  );
}
