/**
 * TRDiagram4 — 7-Lens Sectional Perspective (Tunnel)
 * 안쪽으로 갈수록 어둡게. 소실점 = 5W1H.
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray20:    "#333333",
  gray40:    "#666666",
  gray60:    "#999999",
  gray75:    "#BBBBBB",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* ── 7 Lenses — outer to inner ── */
const LENSES = [
  { name: "시스템 임팩트",  q: "내 프로젝트에 뭘 바꾸는가",         stroke: EC.gray90, sw: 0.25, fill: 0 },
  { name: "이색적 접합",   q: "다른 도메인과 새 연결",              stroke: EC.gray85, sw: 0.25, fill: 0.015 },
  { name: "외부화 진전",   q: "뇌→시스템 이전 진전도",              stroke: EC.gray75, sw: 0.35, fill: 0.025 },
  { name: "조건 설계",    q: "움직이는 조건을 바꿈",               stroke: EC.gray60, sw: 0.35, fill: 0.035 },
  { name: "빼기의 관점",   q: "뭘 제거할 수 있는가",               stroke: EC.gray40, sw: 0.5,  fill: 0.045 },
  { name: "수렴/분기",    q: "가야 할 vs 가고 싶은",              stroke: EC.gray20, sw: 0.5,  fill: 0.055 },
  { name: "메타인지",     q: "사고를 날카롭게",                    stroke: EC.black,  sw: 0.5,  fill: 0.07 },
];

/* ── Tunnel geometry ── */
const CX = 200;
const CY = 220;
const OUTER_W = 340;
const OUTER_H = 340;
const SHRINK_W = 40;
const SHRINK_H = 40;

/* ── Text column ── */
const TX = 400;

function frameRect(i: number) {
  const w = OUTER_W - i * SHRINK_W;
  const h = OUTER_H - i * SHRINK_H;
  return { x: CX - w / 2, y: CY - h / 2, w, h };
}

export function TRDiagram4() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <svg viewBox="0 0 620 460" width="100%" style={{ display: "block" }} overflow="visible">

        {/* title */}
        <text x="310" y="27" textAnchor="middle"
          fontFamily={EC.font} fontSize={13} fontWeight={300}
          fill={EC.black} letterSpacing="2px">
          7-LENS SECTIONAL PERSPECTIVE
        </text>

        {/* ── Tunnel frames (outer to inner) ── */}
        {LENSES.map((lens, i) => {
          const r = frameRect(i);

          return (
            <g key={i}>
              {/* frame fill — cumulative darkening */}
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={0}
                fill={`rgba(0,0,0,${lens.fill})`} />

              {/* frame stroke */}
              <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={0}
                fill="none" stroke={lens.stroke} strokeWidth={lens.sw} />

              {/* leader line — frame right edge to text column */}
              <line x1={r.x + r.w} y1={CY - OUTER_H / 2 + 28 + i * 44}
                x2={TX - 4} y2={CY - OUTER_H / 2 + 28 + i * 44}
                stroke={EC.gray90} strokeWidth={EC.lineLight} />

              {/* lens name */}
              <text x={TX} y={CY - OUTER_H / 2 + 25 + i * 44}
                fontFamily={EC.font} fontSize={12} fontWeight={300}
                fill={EC.gray20}>
                {lens.name}
              </text>

              {/* core question */}
              <text x={TX} y={CY - OUTER_H / 2 + 38 + i * 44}
                fontFamily={EC.font} fontSize={10} fontWeight={200}
                fill={EC.gray60}>
                {lens.q}
              </text>
            </g>
          );
        })}

        {/* ── Focal point (소실점) ── */}
        <circle cx={CX} cy={CY} r={5}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <text x={CX} y={CY + 20}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={12} fontWeight={300}
          fill={EC.accent}>
          5W1H
        </text>

        {/* ── Principle annotation ── */}
        <text x={CX} y={CY + OUTER_H / 2 + 28}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={12} fontWeight={200}
          fill={EC.gray60} letterSpacing="1px">
          관점이 문장에 녹는다
        </text>
      </svg>
    </div>
  );
}
