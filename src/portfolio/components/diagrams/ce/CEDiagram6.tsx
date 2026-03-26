/** CEDiagram6: "에코시스템" 
 * Revision: High-Density Blueprint (Narrow Width)
 */
import { DiagramContainer, COLORS, TYPO, } from "../diagramTokens";

export function CEDiagram6() {
  const W = 520; // Narrow & Compact
  const H = 400;
  const midX = W / 2;
  
  const systems = [
    { id: "01", name: "ORCHESTRATION", x: midX - 110, y: 80 },
    { id: "08", name: "DOCUMENTATION", x: midX + 110, y: 80 },
    { id: "09", name: "CONTEXT-CASCADE", x: midX + 110, y: 170 },
    { id: "10", name: "INDEX-SYSTEM", x: midX + 110, y: 260 },
    { id: "06", name: "MCP-MEMORY", x: midX - 110, y: 260 },
    { id: "11", name: "USER-GUIDE", x: midX - 110, y: 170 },
  ];

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={520} marginTop={32}>
      {/* --- Header --- */}
      <g transform={`translate(${midX}, 25)`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
          SYSTEM TOPOLOGY: TIGHT INTEGRATION
        </text>
        <line x1={-80} y1={6} x2={80} y2={6} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      </g>

      {/* --- Central Core Bar (Very Tight) --- */}
      <g transform={`translate(${midX - 15}, 70)`}>
        <rect width={30} height={240} rx={1} fill={COLORS["solid-accent"].fill} stroke={COLORS["solid-accent"].stroke} strokeWidth={1} />
        <text transform="rotate(-90, 15, 120)" x={15} y={120} textAnchor="middle" fontFamily={TYPO.family} fontSize={9} fontWeight={800} fill={TYPO.onDark}>CONTEXT ENGINEERING</text>
      </g>

      {/* Satellite Cards (Closer to Core) */}
      {systems.map((s) => (
        <g key={s.id} transform={`translate(${s.x - 45}, ${s.y - 20})`}>
          <rect width={90} height={40} rx={1} fill={COLORS.surface.fill} stroke={COLORS.primary.stroke} strokeWidth={0.5} />
          <rect width={90} height={12} rx={1} fill={COLORS.primary.fill} opacity={0.1} />
          <text x={6} y={9} fontFamily={TYPO.family} fontSize={6} fontWeight={900} fill={TYPO.label.color}>{s.id}</text>
          <text x={45} y={26} textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.label.color}>{s.name.split('-')[0]}</text>
          
          {/* Tighter Connector */}
          <line x1={s.x > midX ? 0 : 90} y1={20} x2={s.x > midX ? -50 : 50} y2={20} stroke={COLORS.surface.stroke} strokeWidth={0.5} strokeDasharray="2 2" />
        </g>
      ))}

      {/* Footer */}
      <g transform={`translate(${midX}, ${H - 15})`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color}>
          92 FILES <tspan fill={COLORS.surface.stroke}>|</tspan> PSS v1.0
        </text>
      </g>
    </DiagramContainer>
  );
}
