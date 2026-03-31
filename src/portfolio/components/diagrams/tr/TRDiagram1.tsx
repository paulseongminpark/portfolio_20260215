/**
 * TRDiagram1 — 끊어진 정보 흐름
 * 5개 소스 → (따로따로) → 나 → (닿지 못함) → 판단
 * El Croquis Design System
 */

/* ── El Croquis Local Tokens ── */
const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* ── Source Data ── */
const sources = [
  { label: "arXiv",    x: 68,  y: 72 },
  { label: "X",        x: 92,  y: 132 },
  { label: "YouTube",  x: 56,  y: 192 },
  { label: "뉴스레터",  x: 84,  y: 248 },
  { label: "RSS",      x: 62,  y: 304 },
];

/* ── Key Positions ── */
const ARROW_X = 148;   // all arrows start at same x
const READER = { x: 400, y: 190 };
const JUDGE  = { x: 560, y: 190 };

export function TRDiagram1() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 660,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 640 380" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="tr1-arrow" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray60} />
          </marker>
          <marker id="tr1-arrow-faint" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray85} />
          </marker>
          <marker id="tr1-arrow-accent" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.accent} />
          </marker>
        </defs>

        {/* ── 5 separate arrows: source → reader ── */}
        {sources.map((s, i) => (
          <line key={`arrow-${i}`}
            x1={ARROW_X} y1={s.y}
            x2={READER.x - 14} y2={READER.y}
            stroke={EC.gray60} strokeWidth={EC.lineReg}
            markerEnd="url(#tr1-arrow)" />
        ))}

        {/* ── Source nodes (scattered left) ── */}
        {sources.map((s, i) => (
          <g key={`src-${i}`}>
            <circle cx={s.x} cy={s.y} r={5}
              fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
            <text x={s.x + 12} y={s.y + 1}
              dominantBaseline="middle"
              fontFamily={EC.font} fontSize={9} fontWeight={200}
              fill={EC.gray40}>
              {s.label}
            </text>
          </g>
        ))}

        {/* ── Reader node: "나" ── */}
        <circle cx={READER.x} cy={READER.y} r={10}
          fill="none" stroke={EC.black} strokeWidth={EC.lineBold} />
        <text x={READER.x} y={READER.y + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black}>
          나
        </text>
        <text x={READER.x} y={READER.y + 26}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="1px">
          수집
        </text>

        {/* ── Dashed arrow: reader → judgment (unreachable) ── */}
        <line
          x1={READER.x + 14} y1={READER.y}
          x2={JUDGE.x - 40} y2={JUDGE.y}
          stroke={EC.accent} strokeWidth={EC.lineReg}
          strokeDasharray="4 4"
          markerEnd="url(#tr1-arrow-accent)" />

        {/* ── Question mark on dashed line ── */}
        <text x={467} y={READER.y - 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={12} fontWeight={300}
          fill={EC.accent}>
          ?
        </text>

        {/* ── Judgment box: dashed, accent ── */}
        <rect
          x={JUDGE.x - 34} y={JUDGE.y - 22}
          width={68} height={44}
          rx={1}
          fill="none" stroke={EC.accent} strokeWidth={EC.lineBold}
          strokeDasharray="4 3" />
        <text x={JUDGE.x} y={JUDGE.y + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.accent}>
          판단
        </text>

        {/* ── Annotation: no connection ── */}
        <text x={320} y={110}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          연결 없이 도착
        </text>
        <line x1={320} y1={116} x2={320} y2={140}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* ── Caption ── */}
        <text x={320} y={356}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          수집은 되지만 해석에 닿지 못하는 상태
        </text>
      </svg>
    </div>
  );
}
