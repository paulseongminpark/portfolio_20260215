/** CEDiagram1: "만들수록 줄어들었다" 
 * Revision: Blueprint Detail & Centered Alignment
 */
import { DiagramContainer, COLORS, TYPO, CONN } from "../diagramTokens";

export function CEDiagram1() {
  const W = 620;
  const H = 300;

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={700} marginTop={40}>
      {/* --- Top Spec Label: Centered --- */}
      <g transform={`translate(${W / 2}, 30)`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
          ITERATION LOG: CONTEXT WINDOW EVOLUTION
        </text>
        <line x1={-80} y1={8} x2={80} y2={8} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      </g>

      {/* --- Viewports Stage: Balanced --- */}
      <g transform="translate(0, 70)">
        {/* v3.0: The Bottleneck */}
        <g transform="translate(40, 0)">
          <DViewport w={100} h={120} sys={25} tool={65} work={10} label="v3.0 (200K)" />
          <DImpact num="24" sub="tools" x={50} y={160} />
        </g>

        {/* v3.3.1: Optimization */}
        <g transform="translate(180, 0)">
          <DViewport w={100} h={120} sys={25} tool={35} work={40} label="v3.3.1 (200K)" />
          <DImpact num="15" sub="tools" x={50} y={160} />
        </g>

        {/* v5.0: The Horizon */}
        <g transform="translate(320, 0)">
          <DViewport w={260} h={120} sys={20} tool={10} work={230} label="v5.0 (1M)" highlight />
          <DImpact num="3" sub="tools" x={130} y={160} accent />
        </g>
      </g>

      {/* --- Legend: Centered --- */}
      <g transform={`translate(${W / 2 - 105}, 275)`}>
        <rect width={6} height={6} fill={COLORS["solid-primary"].fill} />
        <text x={12} y={6} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.caption.color}>SYSTEM</text>
        
        <rect x={60} width={6} height={6} fill={COLORS.primary.fill} />
        <text x={72} y={6} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.caption.color}>TOOLS</text>
        
        <rect x={120} width={6} height={6} fill="#FFFFFF" stroke={COLORS.surface.stroke} strokeWidth={0.5} strokeDasharray="1 1" />
        <text x={132} y={6} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.caption.color}>FREE SPACE</text>
      </g>
    </DiagramContainer>
  );
}

function DViewport({ w, h, sys, tool, work, label, highlight }: any) {
  return (
    <g>
      {/* Outer Guide Marks (Blueprint style) */}
      <path d={`M 0,10 L 0,0 L 10,0`} fill="none" stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      <path d={`M ${w-10},0 L ${w},0 L ${w},10`} fill="none" stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      
      {/* Background Rail */}
      <rect width={w} height={h} fill="#F8FAFC" stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      
      {/* Segments */}
      <rect width={sys} height={h} fill={COLORS["solid-primary"].fill} opacity={0.9} />
      <rect x={sys} width={tool} height={h} fill={COLORS.primary.fill} stroke={COLORS.primary.stroke} strokeWidth={0.5} />
      
      {/* WORKSPACE: Gray Dashed Border */}
      <rect x={sys + tool} width={work} height={h} fill="#FFFFFF" stroke={COLORS.surface.stroke} strokeWidth={0.5} strokeDasharray="2 2" />
      
      {/* Highlight for v5.0 Horizon */}
      {highlight && (
        <rect x={sys + tool} width={work} height={h} fill="none" stroke={COLORS.accent.fill} strokeWidth={0.5} opacity={0.5} />
      )}

      {/* FREE SPACE: Black text */}
      {work > 60 && (
        <text x={sys + tool + work/2} y={h/2} textAnchor="middle" dominantBaseline="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.label.color} opacity={0.8}>FREE SPACE</text>
      )}

      <text x={0} y={-12} fontFamily={TYPO.family} fontSize={9} fontWeight={800} fill={TYPO.label.color} style={{ letterSpacing: '0.05em' }}>{label}</text>
    </g>
  );
}

function DImpact({ num, sub, x, y, accent }: any) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text textAnchor="middle" fontFamily={TYPO.family} fontSize={28} fontWeight={800} fill={accent ? COLORS.accent.fill : TYPO.label.color}>{num}</text>
      <text y={14} textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>{sub.toUpperCase()}</text>
    </g>
  );
}
