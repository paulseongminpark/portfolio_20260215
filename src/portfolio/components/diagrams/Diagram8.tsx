/**
 * 다이어그램 8 — 삼자 순환: Paul ↔ Claude ↔ 온톨로지
 * 새 구조: 수평 3노드 + 자기순환 + 아래 귀환 아크
 * 건축 평면도의 동선(circulation) 다이어그램 참조.
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
  lineHair:  0.15,
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
  lineHeavy: 1.0,
} as const;

/* ── 3 Actors ── */
const Y = 100;
const R = 32;
const actors = [
  { cx: 120, label: "Paul",    sub: "판단 · 결정 · 질문",      desc: "행동하고, 결과를 기록하고, 방향을 잡는다" },
  { cx: 340, label: "Claude",  sub: "꺼내고 · 연결하고 · 경고", desc: "관련 기억, 맥락, 반복 방지" },
  { cx: 560, label: "온톨로지", sub: "자기 정제 · 강화 · 승격",  desc: "4,962 노드 · 고아 0 · 테스트 169" },
];

/* ── Edge labels (between actors) ── */
const edges = [
  { label: "노드가 생성된다", y: Y - 18 },
  { label: "recall() → Hebbian", y: Y - 18 },
];

export function Diagram8() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 740,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 680 280" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a8" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.black} />
          </marker>
          <marker id="ec-a8r" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.accent} />
          </marker>
        </defs>

        {/* ── Forward arrows: Paul → Claude → 온톨로지 ── */}
        <line x1={actors[0].cx + R + 4} y1={Y} x2={actors[1].cx - R - 8} y2={Y}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a8)" />
        <line x1={actors[1].cx + R + 4} y1={Y} x2={actors[2].cx - R - 8} y2={Y}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a8)" />

        {/* Forward edge labels */}
        <text x={(actors[0].cx + actors[1].cx) / 2} y={edges[0].y} textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
          {edges[0].label}
        </text>
        <text x={(actors[1].cx + actors[2].cx) / 2} y={edges[1].y} textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
          {edges[1].label}
        </text>

        {/* ── Return arc: 온톨로지 → Paul (below, accent) ── */}
        <path d={`M ${actors[2].cx},${Y + R + 4} Q ${(actors[0].cx + actors[2].cx) / 2},${Y + R + 80} ${actors[0].cx},${Y + R + 4}`}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineBold}
          markerEnd="url(#ec-a8r)" />
        <text x={(actors[0].cx + actors[2].cx) / 2} y={Y + R + 62} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.accent}>
          정제된 기억 → 더 나은 판단
        </text>

        {/* ── Actor circles ── */}
        {actors.map((a, i) => (
          <g key={i}>
            {/* Main circle — stroke only */}
            <circle cx={a.cx} cy={Y} r={R}
              fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />

            {/* Self-loop (small arc above) */}
            <path d={`M ${a.cx - 10},${Y - R - 2} Q ${a.cx},${Y - R - 18} ${a.cx + 10},${Y - R - 2}`}
              fill="none" stroke={EC.black} strokeWidth={EC.lineLight} />
            <polygon
              points={`${a.cx + 8},${Y - R - 6} ${a.cx + 12},${Y - R - 2} ${a.cx + 10},${Y - R + 1}`}
              fill={EC.black} />

            {/* Label inside circle */}
            <text x={a.cx} y={Y + 2} textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={11} fontWeight={300} fill={EC.black}>
              {a.label}
            </text>

            {/* Sub — below circle */}
            <text x={a.cx} y={Y + R + 20} textAnchor="middle"
              fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.black}>
              {a.sub}
            </text>

            {/* Desc — further below */}
            <text x={a.cx} y={Y + R + 32} textAnchor="middle"
              fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
              {a.desc}
            </text>
          </g>
        ))}

        {/* ── Bottom: emergence annotation ── */}
        <line x1={120} y1={240} x2={560} y2={240}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        <text x={340} y={258} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.black} letterSpacing="1.5px">
          셋 모두 서로를 강화한다
        </text>

        <text x={340} y={272} textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
          과거가 미래를 만든다 — 함께, 재귀적으로
        </text>
      </svg>
    </div>
  );
}
