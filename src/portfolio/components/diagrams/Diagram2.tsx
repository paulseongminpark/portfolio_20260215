/**
 * 다이어그램 2 — 0.057
 * "텅 비어있다. 여백이 많고 숫자 하나만 덩그러니. 비어있음 자체가 좌절."
 * El Croquis Design System 적용
 */

/* ── El Croquis Local Tokens ── */
const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.35,
  lineReg:   0.5,
} as const;

/* ── Layout ── */
const CX = 300;
const CY = 105;

const barY = 190;
const barLeft = 120;
const barRight = 480;
const barW = barRight - barLeft;
const markerX = barLeft + (0.057 / 1.0) * barW;

export function Diagram2() {
  return (
    <div style={{
      margin: 0,
    }}>
      <svg viewBox="60 40 480 220" width="100%" style={{ display: "block" }}>
        {/* ── Hero Number ── */}
        <text x={CX} y={CY} textAnchor="middle"
          fontFamily={EC.font} fontSize={52} fontWeight={200}
          fill={EC.black}
          style={{ fontVariantNumeric: "tabular-nums" }}>
          0.057
        </text>

        {/* ── Metric Label ── */}
        <text x={CX} y={CY + 26} textAnchor="middle"
          fontFamily={EC.font} fontSize={11} fontWeight={300}
          fill={EC.gray60} letterSpacing="2px">
          NDCG
        </text>

        {/* ── Scale Bar ── */}
        {/* 바: 극도로 얇은 선 */}
        <line x1={barLeft} y1={barY} x2={barRight} y2={barY}
          stroke={EC.gray85} strokeWidth={EC.lineReg} />

        {/* 0.057 위치 마커 — accent, 작은 원 */}
        <circle cx={markerX} cy={barY} r={3}
          fill={EC.accent} stroke="none" />

        {/* 마커에서 위로 가는 바운스 화살표 */}
        <style>{`
          @keyframes ec-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}</style>
        <g style={{ animation: "ec-bounce 1.2s ease-in-out infinite" }}>
          <line x1={markerX} y1={barY - 22} x2={markerX} y2={barY - 10}
            stroke={EC.accent} strokeWidth={EC.lineLight} />
          <polygon
            points={`${markerX - 3},${barY - 10} ${markerX + 3},${barY - 10} ${markerX},${barY - 4}`}
            fill={EC.accent} />
        </g>

        {/* 0.5 기준선 — 점선 */}
        <line x1={barLeft + barW * 0.5} y1={barY - 6}
              x2={barLeft + barW * 0.5} y2={barY + 6}
          stroke={EC.gray85} strokeWidth={EC.lineLight}
          strokeDasharray="2 2" />

        {/* 눈금 tick marks */}
        <line x1={barLeft} y1={barY - 3} x2={barLeft} y2={barY + 3}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />
        <line x1={barRight} y1={barY - 3} x2={barRight} y2={barY + 3}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ── Scale Labels ── */}
        <text x={barLeft} y={barY + 20} textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200}
          fill={EC.gray60} style={{ fontVariantNumeric: "tabular-nums" }}>
          0
        </text>
        <text x={barLeft + barW * 0.5} y={barY + 20} textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200}
          fill={EC.gray60} style={{ fontVariantNumeric: "tabular-nums" }}>
          0.5
        </text>
        <text x={barRight} y={barY + 20} textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200}
          fill={EC.gray60} style={{ fontVariantNumeric: "tabular-nums" }}>
          1.0
        </text>

        {/* ── Threshold Annotation ── */}
        <text x={barLeft + barW * 0.5} y={barY + 36} textAnchor="middle"
          fontFamily={EC.font} fontSize={13} fontWeight={200}
          fill={EC.gray60}>
          쓸 만한 수준
        </text>
      </svg>
    </div>
  );
}
