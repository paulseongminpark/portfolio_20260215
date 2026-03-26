/** CEDiagram4: "읽기의 순서" 
 * PSS Sequential Engine Applied
 */
import { DiagramContainer, COLORS, TYPO, } from "../diagramTokens";

export function CEDiagram4() {
  const W = 480;
  const H = 420;
  const steps = [
    { label: "INDEX", sub: "00_index.md", tokens: "100t", w1: 320, w2: 260, fill: COLORS.surface.fill },
    { label: "SYMBOLS", sub: "get_symbols_overview", tokens: "500t", w1: 260, w2: 180, fill: COLORS.primary.fill },
    { label: "SIGNATURE", sub: "find_symbol(body=F)", tokens: "200t", w1: 180, w2: 100, fill: COLORS["solid-primary"].fill, dark: true },
    { label: "BODY", sub: "Full Context Read", tokens: "Varies", w1: 100, w2: 40, fill: COLORS["solid-neutral"].fill, dark: true },
  ];

  let currentY = 60;
  const stepH = 72;
  const midX = 220;

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={500} marginTop={40}>
      {/* --- Centered Header --- */}
      <g transform={`translate(${W / 2}, 30)`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
          READING PIPELINE: TOKEN EFFICIENCY FLOW
        </text>
        <line x1={-90} y1={8} x2={90} y2={8} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      </g>

      {steps.map((s, i) => {
        const y = currentY;
        currentY += stepH + 4;
        const txtColor = s.dark ? TYPO.onDark : TYPO.label.color;
        const subColor = s.dark ? "rgba(255,255,255,0.6)" : TYPO.caption.color;

        return (
          <g key={i}>
            {/* Funnel Segment */}
            <path d={`M ${midX - s.w1/2},${y} L ${midX + s.w1/2},${y} L ${midX + s.w2/2},${y + stepH} L ${midX - s.w2/2},${y + stepH} Z`} 
              fill={s.fill} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
            
            {/* Labels */}
            <text x={midX} y={y + 28} textAnchor="middle" fontFamily={TYPO.family} fontSize={10} fontWeight={800} fill={txtColor} style={{ letterSpacing: '0.1em' }}>{s.label}</text>
            <text x={midX} y={y + 44} textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fill={subColor}>{s.sub}</text>
            
            {/* Cost Metric (Right) */}
            <g transform={`translate(${midX + s.w1/2 + 25}, ${y + stepH/2})`}>
               <text fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={TYPO.caption.color}>COST</text>
               <text y={12} fontFamily={TYPO.family} fontSize={9} fontWeight={800} fill={TYPO.label.color}>{s.tokens}</text>
            </g>
          </g>
        );
      })}

      {/* --- High-Impact Annotation --- */}
      <g transform="translate(40, 120)">
        <path d="M 0,0 C -15,0 -15,140 0,140" fill="none" stroke={COLORS.accent.fill} strokeWidth={1} strokeDasharray="3 2" />
        <circle cx={0} cy={0} r={1.5} fill={COLORS.accent.fill} />
        <circle cx={0} cy={140} r={1.5} fill={COLORS.accent.fill} />
        <text x={-10} y={70} textAnchor="middle" fontFamily={TYPO.family} fontSize={9} fontWeight={800} fill={COLORS.accent.fill} transform="rotate(-90, -10, 70)">EFFICIENCY ZONE</text>
        <text x={10} y={70} fontFamily={TYPO.family} fontSize={8} fill={TYPO.caption.color}>대부분 여기서 끝남</text>
      </g>
    </DiagramContainer>
  );
}
