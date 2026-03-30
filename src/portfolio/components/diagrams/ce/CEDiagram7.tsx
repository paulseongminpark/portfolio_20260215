/** CEDiagram7 — "저장과 제시의 순환"
 * Format: Double Helix — three crossings as question evolution
 * El Croquis Design System §12
 */

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

export function CEDiagram7() {
  const W = 640, H = 320;
  const cx = W / 2;
  const waveCy = 108;
  const amp = 42;
  const halfWL = 150;
  const waveW = halfWL * 3.5;
  const waveOx = cx - waveW / 2;

  const crossings = [
    { x: waveOx + halfWL,     q: "어떻게 물어볼까?", era: "PROMPT ENG.",  note: "해결됨",   op: 0.3 },
    { x: waveOx + halfWL * 2, q: "무엇을 보여줄까?", era: "CONTEXT ENG.", note: "이 글",    op: 0.8 },
    { x: waveOx + halfWL * 3, q: "?",                era: "",             note: "열려있다", op: 1.0, isAccent: true },
  ];

  function strand(startUp: boolean): string {
    const segs: string[] = [`M${waveOx},${waveCy}`];
    for (let i = 0; i < 4; i++) {
      const x1 = waveOx + i * halfWL;
      const x2 = waveOx + (i + 1) * halfWL;
      const goesUp = startUp ? i % 2 === 0 : i % 2 === 1;
      const peak = goesUp ? -amp : amp;
      segs.push(
        `C${x1 + halfWL * 0.55},${waveCy + peak} ${x2 - halfWL * 0.55},${waveCy + peak} ${x2},${waveCy}`
      );
    }
    return segs.join(" ");
  }

  const textY = waveCy + amp + 32;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 680 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%"
        style={{ display: "block", overflow: "visible" }}>

        {/* Title — centered */}
        <text x={cx} y={24} textAnchor="middle" fontFamily={EC.font} fontSize={9}
          fontWeight={300} fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
          REASONING CYCLE
        </text>
        <line x1={cx - 55} y1={32} x2={cx + 55} y2={32}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* ── Strands ── */}
        <path d={strand(true)} fill="none"
          stroke={EC.black} strokeWidth={EC.lineBold} />
        <path d={strand(false)} fill="none"
          stroke={EC.gray60} strokeWidth={EC.lineReg} />

        {/* ── Crossing dots + question labels (BELOW wave area) ── */}
        {crossings.map((c, i) => {
          const isAccent = !!c.isAccent;
          const col = isAccent ? EC.accent : EC.black;

          return (
            <g key={i}>
              {/* Dot */}
              <circle cx={c.x} cy={waveCy} r={6}
                fill="white" stroke={col}
                strokeWidth={isAccent ? EC.lineBold : EC.lineReg}
                opacity={c.op < 0.5 ? 0.5 : 1} />

              {/* Thin leader line from dot to text area */}
              <line x1={c.x} y1={waveCy + 6} x2={c.x} y2={textY - 14}
                stroke={col} strokeWidth={EC.lineLight}
                opacity={c.op < 0.5 ? 0.3 : 0.5}
                strokeDasharray="2 2" />

              {/* Question */}
              <text x={c.x} y={textY} textAnchor="middle"
                fontFamily={EC.font}
                fontSize={isAccent ? 13 : 10}
                fontWeight={300}
                fill={col}
                opacity={c.op}>
                {c.q}
              </text>

              {/* Era */}
              {c.era && (
                <text x={c.x} y={textY + 16} textAnchor="middle"
                  fontFamily={EC.font} fontSize={8} fontWeight={200}
                  fill={EC.gray60} opacity={c.op}
                  style={{ letterSpacing: "0.5px" }}>
                  {c.era}
                </text>
              )}

              {/* Status */}
              <text x={c.x} y={textY + (c.era ? 30 : 16)} textAnchor="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={200}
                fill={isAccent ? EC.accent : EC.gray85}
                style={{ letterSpacing: "0.5px" }}>
                {c.note}
              </text>
            </g>
          );
        })}

        {/* ── Legend — centered ── */}
        <g transform={`translate(${cx - 160}, ${H - 34})`}>
          <line x1={0} y1={0} x2={18} y2={0}
            stroke={EC.black} strokeWidth={EC.lineBold} />
          <text x={24} y={3} fontFamily={EC.font} fontSize={8}
            fontWeight={200} fill={EC.gray60}>
            Storage · 기억의 구조 설계
          </text>

          <line x1={190} y1={0} x2={208} y2={0}
            stroke={EC.gray60} strokeWidth={EC.lineReg} />
          <text x={214} y={3} fontFamily={EC.font} fontSize={8}
            fontWeight={200} fill={EC.gray60}>
            Presentation · 사고의 환경 설계
          </text>
        </g>
      </svg>
    </div>
  );
}
