/** CEDiagram3 — "규모에 따라 전략이 갈린다"
 * Format: Scale Routing — gate circles on threshold ruler + strategy cards
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

export function CEDiagram3({ diptych }: { diptych?: boolean } = {}) {
  const W = 620;
  const H = diptych ? 360 : 240;
  const dy = diptych ? 60 : 0;
  const sy = 68;
  const sx1 = 50, sx2 = 570, sw = sx2 - sx1;

  const t300 = sx1 + sw * 0.25;
  const t800 = sx1 + sw * 0.65;

  const gates = [
    { id: "A", x: (sx1 + t300) / 2,  r: 18, label: "DIRECT",      range: "≤ 300K",
      lines: ["Single pass read"] },
    { id: "B", x: (t300 + t800) / 2,  r: 23, label: "SCOUT",       range: "300–800K",
      lines: ["Codex recon → Opus judge"] },
    { id: "C", x: (t800 + sx2) / 2,   r: 30, label: "DISTRIBUTED", range: "800K+",
      lines: ["Multi-agent parallel", "→ fuse & reason"], isAccent: true },
  ];

  const cardY = 112, cardW = 126;

  return (
    <div style={diptych ? {} : { margin: "48px auto 40px", maxWidth: 660 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* Main content — shifted down in diptych mode */}
        <g transform={dy > 0 ? `translate(0, ${dy})` : undefined}>

          {/* Title */}
          <text x={sx1 + 10} y={22} fontFamily={EC.font} fontSize={9} fontWeight={300}
            fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
            CONTEXT SCALE ROUTING
          </text>
          <line x1={sx1 + 10} y1={30} x2={sx1 + 140} y2={30}
            stroke={EC.gray90} strokeWidth={EC.lineLight} />

          {/* ── Scale line ── */}
          <line x1={sx1} y1={sy} x2={sx2} y2={sy}
            stroke={EC.black} strokeWidth={EC.lineReg} />

          {/* End labels */}
          <text x={sx1} y={sy - 10} fontFamily={EC.font} fontSize={7}
            fontWeight={200} fill={EC.gray60}>0</text>
          <text x={sx2} y={sy - 10} textAnchor="end" fontFamily={EC.font}
            fontSize={7} fontWeight={200} fill={EC.gray60}>1M+</text>

          {/* Minor ticks */}
          {Array.from({ length: 11 }, (_, i) => i * 0.1).map((t, i) => (
            <line key={i} x1={sx1 + t * sw} y1={sy - 3} x2={sx1 + t * sw} y2={sy + 3}
              stroke={EC.gray85} strokeWidth={EC.lineLight} />
          ))}

          {/* ── Threshold markers (accent red) ── */}
          {[{ x: t300, label: "300K" }, { x: t800, label: "800K" }].map((t, i) => (
            <g key={i}>
              <line x1={t.x} y1={sy - 8} x2={t.x} y2={sy + 8}
                stroke={EC.accent} strokeWidth={EC.lineBold} />
              <text x={t.x} y={sy - 12} textAnchor="middle"
                fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.accent}>
                {t.label}
              </text>
            </g>
          ))}

          {/* ── Gate circles + Strategy cards ── */}
          {gates.map((g) => {
            const stk = g.isAccent ? EC.accent : EC.black;
            const stw = g.isAccent ? EC.lineBold : EC.lineReg;
            const cardH = 50 + g.lines.length * 13;

            return (
              <g key={g.id}>
                {/* Halo ring */}
                <circle cx={g.x} cy={sy} r={g.r + 5}
                  fill="none" stroke={EC.gray90} strokeWidth={EC.lineLight} />

                {/* Gate circle */}
                <circle cx={g.x} cy={sy} r={g.r}
                  fill="white" stroke={stk} strokeWidth={stw} />
                <text x={g.x} y={sy + 5} textAnchor="middle" dominantBaseline="middle"
                  fontFamily={EC.font} fontSize={14} fontWeight={200} fill={stk}>
                  {g.id}
                </text>

                {/* Connector line + dot */}
                <line x1={g.x} y1={sy + g.r} x2={g.x} y2={cardY}
                  stroke={EC.gray85} strokeWidth={EC.lineLight} />
                <circle cx={g.x} cy={cardY} r={1.5} fill={EC.gray85} />

                {/* Strategy card */}
                <rect x={g.x - cardW / 2} y={cardY} width={cardW} height={cardH}
                  fill="none" stroke={stk} strokeWidth={stw} />

                {/* Card: label */}
                <text x={g.x} y={cardY + 16} textAnchor="middle"
                  fontFamily={EC.font} fontSize={9} fontWeight={300}
                  fill={EC.black} style={{ letterSpacing: "0.5px" }}>
                  {g.label}
                </text>

                {/* Card: range */}
                <text x={g.x} y={cardY + 29} textAnchor="middle"
                  fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
                  {g.range}
                </text>

                {/* Divider */}
                <line x1={g.x - 25} y1={cardY + 35} x2={g.x + 25} y2={cardY + 35}
                  stroke={EC.gray90} strokeWidth={EC.lineLight} />

                {/* Description */}
                {g.lines.map((ln, j) => (
                  <text key={j} x={g.x} y={cardY + 48 + j * 13} textAnchor="middle"
                    fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray40}>
                    {ln}
                  </text>
                ))}
              </g>
            );
          })}

        </g>

        {/* Bottom caption — outside translated group */}
        <text x={W / 2} y={H - 14} textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200} fill={EC.gray60}>
          하나의 숫자가 전략을 결정한다
        </text>
      </svg>
    </div>
  );
}
