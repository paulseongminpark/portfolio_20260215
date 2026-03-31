/**
 * ORCHDiagram7 — The Discipline Evolution
 * D.07 Comic-Book Narrative Sequence — 3 프레임
 * v4(벽이 좁혀옴/제약) → v5(깔끔한 구조/설계) → v6(순환 곡선/자기인식)
 * 각 패널의 밀도·분위기가 다르다.
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray20:    "#333333",
  gray30:    "#4D4D4D",
  gray50:    "#808080",
  gray65:    "#A6A6A6",
  gray80:    "#CCCCCC",
  gray92:    "#EBEBEB",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.25,
  lineReg:   0.5,
  lineBold:  0.75,
  lineHeavy: 1,
} as const;

const PW = 200;  // panel width
const PH = 260;  // panel height
const GAP = 20;
const PX = [40, 40 + PW + GAP, 40 + (PW + GAP) * 2]; // panel left x
const PY = 60;   // panel top y

export function ORCHDiagram7() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 780,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 720 400" width="100%" style={{ display: "block" }}>

        {/* ── Panel headers ── */}
        {[
          { label: "v4", sub: "Context as Currency", source: "제약" },
          { label: "v5", sub: "The Machine", source: "설계" },
          { label: "v6", sub: "The Living System", source: "자기인식" },
        ].map((h, i) => (
          <g key={`header-${i}`}>
            <text x={PX[i] + PW / 2} y={PY - 28}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={i === 2 ? 13 : 11} fontWeight={300}
              fill={i === 2 ? EC.accent : EC.black}>
              {h.label}
            </text>
            <text x={PX[i] + PW / 2} y={PY - 14}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={200}
              fill={i === 2 ? EC.accent : EC.gray50}>
              {h.sub}
            </text>
          </g>
        ))}

        {/* ── Panel 1: v4 — 제약 (벽이 좁혀옴) ── */}
        <rect x={PX[0]} y={PY} width={PW} height={PH}
          fill="none" stroke={EC.gray80} strokeWidth={EC.lineReg} rx={1} />
        {/* 좌우 벽이 좁혀오는 느낌 — 많은 수직선이 양쪽에서 중앙으로 */}
        {Array.from({ length: 12 }, (_, i) => {
          const spread = 8 + i * 6;
          const opacity = 0.08 + i * 0.04;
          return (
            <g key={`wall-${i}`}>
              <line x1={PX[0] + spread} y1={PY + 30} x2={PX[0] + spread} y2={PY + PH - 30}
                stroke={EC.black} strokeWidth={EC.lineHair} opacity={opacity} />
              <line x1={PX[0] + PW - spread} y1={PY + 30} x2={PX[0] + PW - spread} y2={PY + PH - 30}
                stroke={EC.black} strokeWidth={EC.lineHair} opacity={opacity} />
            </g>
          );
        })}
        {/* 중앙에 갇힌 점 */}
        <circle cx={PX[0] + PW / 2} cy={PY + PH / 2} r={3}
          fill={EC.black} />
        {/* 200K 벽 라벨 */}
        <text x={PX[0] + PW / 2} y={PY + PH / 2 + 20}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray30}>
          200K
        </text>
        {/* 제약 라벨 */}
        <text x={PX[0] + PW / 2} y={PY + PH - 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={300}
          fill={EC.gray30}>
          제약에서 오는 규율
        </text>

        {/* ── Panel 2: v5 — 설계 (깔끔한 구조선) ── */}
        <rect x={PX[1]} y={PY} width={PW} height={PH}
          fill="none" stroke={EC.gray80} strokeWidth={EC.lineReg} rx={1} />
        {/* 정돈된 수평·수직선 — 그리드 구조 */}
        {[0, 1, 2].map((row) => (
          <line key={`hgrid-${row}`}
            x1={PX[1] + 30} y1={PY + 60 + row * 50}
            x2={PX[1] + PW - 30} y2={PY + 60 + row * 50}
            stroke={EC.black} strokeWidth={EC.lineReg} opacity={0.3} />
        ))}
        {[0, 1, 2].map((col) => (
          <line key={`vgrid-${col}`}
            x1={PX[1] + 50 + col * 50} y1={PY + 40}
            x2={PX[1] + 50 + col * 50} y2={PY + PH - 50}
            stroke={EC.black} strokeWidth={EC.lineReg} opacity={0.3} />
        ))}
        {/* 교차점에 노드 3개 */}
        {[
          { label: "G", x: PX[1] + 50,  y: PY + 60 },
          { label: "S", x: PX[1] + 100, y: PY + 110 },
          { label: "W", x: PX[1] + 150, y: PY + 160 },
        ].map((n, i) => (
          <g key={`node-${i}`}>
            <circle cx={n.x} cy={n.y} r={8}
              fill="rgba(0,0,0,0.03)" stroke={EC.black} strokeWidth={EC.lineReg} />
            <text x={n.x} y={n.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={300}
              fill={EC.black}>
              {n.label}
            </text>
          </g>
        ))}
        {/* 설계 라벨 */}
        <text x={PX[1] + PW / 2} y={PY + PH - 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={300}
          fill={EC.gray30}>
          설계에서 오는 규율
        </text>

        {/* ── Panel 3: v6 — 자기인식 (순환 곡선) ── */}
        <rect x={PX[2]} y={PY} width={PW} height={PH}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} rx={1} />
        {/* 순환하는 유기적 곡선 */}
        <ellipse cx={PX[2] + PW / 2} cy={PY + PH / 2 - 10} rx={60} ry={50}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} opacity={0.4} />
        <ellipse cx={PX[2] + PW / 2} cy={PY + PH / 2 - 10} rx={45} ry={37}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.6} />
        <ellipse cx={PX[2] + PW / 2} cy={PY + PH / 2 - 10} rx={28} ry={22}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.8} />
        {/* 중심 — 살아있는 점 */}
        <circle cx={PX[2] + PW / 2} cy={PY + PH / 2 - 10} r={4}
          fill={EC.accent} opacity={0.8} />
        {/* 바깥→안 수렴 화살표 (점선) */}
        <defs>
          <marker id="o7-arr-in" viewBox="0 0 8 6" refX="7" refY="3"
            markerWidth="8" markerHeight="6" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.accent} />
          </marker>
        </defs>
        <line
          x1={PX[2] + PW / 2 + 60} y1={PY + PH / 2 - 10}
          x2={PX[2] + PW / 2 + 8} y2={PY + PH / 2 - 10}
          stroke={EC.accent} strokeWidth={EC.lineReg}
          strokeDasharray="3 3"
          markerEnd="url(#o7-arr-in)" />
        {/* 자기인식 라벨 */}
        <text x={PX[2] + PW / 2} y={PY + PH - 16}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={300}
          fill={EC.accent}>
          자기인식에서 오는 규율
        </text>

        {/* ── Arrows between panels ── */}
        <line x1={PX[0] + PW + 4} y1={PY + PH / 2}
              x2={PX[1] - 4} y2={PY + PH / 2}
          stroke={EC.gray65} strokeWidth={EC.lineReg} />
        <polygon points={`${PX[1] - 4},${PY + PH / 2 - 3} ${PX[1] - 4},${PY + PH / 2 + 3} ${PX[1] + 2},${PY + PH / 2}`}
          fill={EC.gray65} />

        <line x1={PX[1] + PW + 4} y1={PY + PH / 2}
              x2={PX[2] - 4} y2={PY + PH / 2}
          stroke={EC.accent} strokeWidth={EC.lineReg} />
        <polygon points={`${PX[2] - 4},${PY + PH / 2 - 3} ${PX[2] - 4},${PY + PH / 2 + 3} ${PX[2] + 2},${PY + PH / 2}`}
          fill={EC.accent} />

        {/* ── Bottom annotation ── */}
        <text x={PX[0] + PW / 2} y={PY + PH + 28}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray65}>
          외부
        </text>
        <line x1={PX[0] + PW / 2 + 20} y1={PY + PH + 25}
              x2={PX[2] + PW / 2 - 20} y2={PY + PH + 25}
          stroke={EC.gray80} strokeWidth={EC.lineHair} />
        <text x={PX[2] + PW / 2} y={PY + PH + 28}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.accent}>
          내부
        </text>

        {/* ── Caption ── */}
        <text x={360} y={385}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.5px">
          규율의 원천이 이동한다
        </text>
      </svg>
    </div>
  );
}
