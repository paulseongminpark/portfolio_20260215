/** CEDiagram2: "4개의 층" 
 * Revision: Balanced Layout & Sharp Hierarchy
 */
import { DiagramContainer, COLORS, TYPO, } from "../diagramTokens";

export function CEDiagram2() {
  const W = 560;
  const H = 440;
  const layers = [
    { id: "L3", title: "LIVE", sub: "Momentary Context", tags: "auto_remember, Compact", variant: "surface", h: 60 },
    { id: "L2", title: "TASK", sub: "Action Strategy", tags: "Gate 판단, Reading Plan", variant: "neutral", h: 68 },
    { id: "L1", title: "SESSION", sub: "Fresh Decisions", tags: "get_context(), recall()", variant: "primary", h: 76 },
    { id: "L0", title: "STATIC", sub: "Core Definition", tags: "rules/, MEMORY.md", variant: "solid-primary", h: 84 },
  ];

  let currentY = 60;

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={600} marginTop={40}>
      {/* --- Centered Header --- */}
      <g transform={`translate(${W / 2}, 30)`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
          ARCHITECTURAL STACK: INFORMATION LIFECYCLE
        </text>
        <line x1={-100} y1={8} x2={100} y2={8} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      </g>

      {layers.map((l, i) => {
        const y = currentY;
        currentY += l.h + 16;
        const x = 90;
        const width = 320;
        const c = COLORS[l.variant as keyof typeof COLORS];
        const isSolid = l.variant.startsWith("solid-");
        const txtColor = isSolid ? TYPO.onDark : TYPO.label.color;
        const subColor = isSolid ? "rgba(255,255,255,0.6)" : TYPO.caption.color;

        return (
          <g key={l.id}>
            {/* ID Node (Left) */}
            <g transform={`translate(${x - 45}, ${y + 20})`}>
              <text textAnchor="middle" fontFamily={TYPO.family} fontSize={10} fontWeight={900} fill={TYPO.caption.color}>{l.id}</text>
              <circle cx={25} cy={-4} r={1.5} fill={COLORS.surface.stroke} />
              <line x1={25} y1={-4} x2={40} y2={-4} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
            </g>

            {/* Slab */}
            <rect x={x} y={y} width={width} height={l.h} rx={1} fill={c.fill} stroke={c.stroke} strokeWidth={0.5} />
            <text x={x + 16} y={y + 24} fontFamily={TYPO.family} fontSize={11} fontWeight={800} fill={txtColor} style={{ letterSpacing: '0.05em' }}>{l.title}</text>
            <text x={x + 16} y={y + 38} fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={subColor}>{l.sub.toUpperCase()}</text>
            <text x={x + 16} y={y + 54} fontFamily={TYPO.family} fontSize={9} fontWeight={600} fill={txtColor} opacity={0.7}>{l.tags}</text>

            {/* Right Meta Info */}
            <text x={x + width + 15} y={y + 24} fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.caption.color}>UPDATE</text>
            <text x={x + width + 15} y={y + 38} fontFamily={TYPO.family} fontSize={9} fontWeight={700} fill={TYPO.label.color}>
              {i === 0 ? "Real-time" : i === 1 ? "Per Task" : i === 2 ? "Per Session" : "Static"}
            </text>

            {/* Cache Boundary */}
            {l.id === "L1" && (
              <g transform={`translate(${x}, ${y + l.h + 8})`}>
                <line x1={-30} y1={0} x2={width + 100} y2={0} stroke={COLORS.accent.fill} strokeWidth={0.8} strokeDasharray="4 2" />
                <rect x={width / 2 - 50} y={-8} width={100} height={16} rx={8} fill={COLORS.surface.fill} stroke={COLORS.accent.fill} strokeWidth={0.5} />
                <text x={width / 2} y={3} textAnchor="middle" fontFamily={TYPO.family} fontSize={7} fontWeight={800} fill={COLORS.accent.fill}>PROMPT CACHE ZONE</text>
              </g>
            )}
          </g>
        );
      })}
    </DiagramContainer>
  );
}
