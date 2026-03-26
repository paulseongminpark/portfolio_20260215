/** CEDiagram7: "저장과 제시의 순환" 
 * Revision: High-Density Loop (Compact Width)
 */
import { DiagramContainer, COLORS, TYPO, CONN } from "../diagramTokens";

export function CEDiagram7() {
  const W = 520; // Narrowed to match ideal width
  const H = 260;
  const midX = W / 2;
  const midY = 140;

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={520} marginTop={32}>
      {/* --- Header --- */}
      <g transform={`translate(${midX}, 25)`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
          REASONING LOOP: TIGHT FEEDBACK
        </text>
        <line x1={-70} y1={6} x2={70} y2={6} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      </g>

      {/* --- STORAGE Card (Pulled In) --- */}
      <g transform={`translate(${midX - 210}, 95)`}>
        <rect width={130} height={80} rx={1} fill={COLORS.surface.fill} stroke={COLORS.secondary.stroke} strokeWidth={0.5} strokeDasharray="4 2" />
        <rect width={130} height={14} rx={1} fill={COLORS.secondary.fill} opacity={0.15} />
        <text x={65} y={10} textAnchor="middle" fontFamily={TYPO.family} fontSize={6} fontWeight={900} fill={COLORS.secondary.stroke}>STORAGE</text>
        <text x={65} y={42} textAnchor="middle" fontFamily={TYPO.family} fontSize={9} fontWeight={800} fill={TYPO.label.color}>mcp-memory</text>
        <text x={65} y={56} textAnchor="middle" fontFamily={TYPO.family} fontSize={7} fill={TYPO.caption.color}>기억의 구조 설계</text>
      </g>

      {/* --- PRESENTATION Card (Pulled In) --- */}
      <g transform={`translate(${midX + 80}, 95)`}>
        <rect width={130} height={80} rx={1} fill={COLORS.surface.fill} stroke={COLORS.accent.fill} strokeWidth={0.5} strokeDasharray="4 2" />
        <rect width={130} height={14} rx={1} fill={COLORS.accent.fill} opacity={0.1} />
        <text x={65} y={10} textAnchor="middle" fontFamily={TYPO.family} fontSize={6} fontWeight={900} fill={COLORS.accent.fill}>PRESENTATION</text>
        <text x={65} y={42} textAnchor="middle" fontFamily={TYPO.family} fontSize={9} fontWeight={800} fill={TYPO.label.color}>Context Eng.</text>
        <text x={65} y={56} textAnchor="middle" fontFamily={TYPO.family} fontSize={7} fill={TYPO.caption.color}>사고의 환경 설계</text>
      </g>

      {/* --- Inference Center --- */}
      <g transform={`translate(${midX}, ${midY})`}>
        <circle r={30} fill={COLORS.surface.fill} stroke={CONN.stroke} strokeWidth={0.5} />
        <text textAnchor="middle" dominantBaseline="middle" fontFamily={TYPO.family} fontSize={10} fontWeight={800} fill={TYPO.label.color}>추론</text>
      </g>

      {/* --- Tighter Flow Arrows --- */}
      <defs>
        <marker id="arr-small" viewBox="0 0 10 7" refX="10" refY="3.5" markerWidth="4" markerHeight="3" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill={CONN.stroke} />
        </marker>
      </defs>
      
      <path d={`M ${midX - 80},115 Q ${midX},85 ${midX + 80},115`} fill="none" stroke={CONN.stroke} strokeWidth={0.8} markerEnd="url(#arr-small)" />
      <text x={midX} y={100} textAnchor="middle" fontFamily={TYPO.family} fontSize={7} fontWeight={800} fill={TYPO.label.color}>RECALL</text>

      <path d={`M ${midX + 80},165 Q ${midX},195 ${midX - 80},165`} fill="none" stroke={CONN.stroke} strokeWidth={0.8} markerEnd="url(#arr-small)" />
      <text x={midX} y={188} textAnchor="middle" fontFamily={TYPO.family} fontSize={7} fontWeight={800} fill={TYPO.label.color}>STORE</text>

      {/* --- One-line Footer Query --- */}
      <g transform={`translate(${midX}, ${H - 20})`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={TYPO.caption.color}>
          HOW? <tspan fontWeight={800} fill={TYPO.label.color}>PROMPT</tspan> · 
          WHAT? <tspan fontWeight={800} fill={COLORS.accent.fill}>CONTEXT</tspan> · 
          WHERE? <tspan fontWeight={800} fill={COLORS.secondary.stroke}>MEMORY</tspan>
        </text>
      </g>
    </DiagramContainer>
  );
}
