/** CEDiagram3: "규모에 따라 전략이 갈린다" (Scale-driven Strategy)
 * PSS Graph/Logic Engine Applied
 */
import { DiagramContainer, COLORS, TYPO, } from "../diagramTokens";

export function CEDiagram3() {
  const W = 640;
  const H = 420;

  const entry = { x: 260, y: 40, w: 120, h: 40 };
  const branchY = 120;
  
  const gates = [
    { id: "A", label: "DIRECT", size: "≤ 300K", x: 40, w: 160, h: 200, color: COLORS.primary.stroke },
    { id: "B", label: "SCOUT", size: "300~800K", x: 230, w: 180, h: 240, color: COLORS.tertiary.stroke },
    { id: "C", label: "DISTRIBUTED", size: "800K+", x: 440, w: 160, h: 260, color: COLORS.accent.fill },
  ];

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={700} marginTop={40}>
      {/* --- Top Metadata --- */}
      <text x={40} y={30} fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
        DECISION LOGIC: SOURCE CODE SCALE ANALYSIS
      </text>

      {/* --- Entry Node --- */}
      <rect x={entry.x} y={entry.y} width={entry.w} height={entry.h} rx={1} fill={COLORS.surface.fill} stroke={COLORS.surface.stroke} strokeWidth={1} />
      <text x={entry.x + entry.w / 2} y={entry.y + 22} textAnchor="middle" fontFamily={TYPO.family} fontSize={11} fontWeight={800} fill={TYPO.label.color}>SCALE SCAN</text>
      
      {/* --- Decision Branches --- */}
      <line x1={entry.x + entry.w / 2} y1={entry.y + entry.h} x2={entry.x + entry.w / 2} y2={branchY} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      <line x1={gates[0].x + gates[0].w / 2} y1={branchY} x2={gates[2].x + gates[2].w / 2} y2={branchY} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      
      {gates.map((g, i) => (
        <g key={g.id}>
          <line x1={g.x + g.w / 2} y1={branchY} x2={g.x + g.w / 2} y2={140} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
          <circle cx={g.x + g.w / 2} cy={branchY} r={1.5} fill={COLORS.surface.stroke} />

          {/* Gate Card */}
          <rect x={g.x} y={140} width={g.w} height={g.h} rx={2} fill={COLORS.surface.fill} stroke={g.color} strokeWidth={i === 2 ? 1.5 : 0.5} />
          
          {/* Gate ID & Size */}
          <rect x={g.x} y={140} width={g.w} height={24} rx={1} fill={g.color} opacity={0.1} />
          <text x={g.x + 10} y={156} fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.label.color}>GATE {g.id}</text>
          <text x={g.x + g.w - 10} y={156} textAnchor="end" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color}>{g.size}</text>

          {/* Strategy Name */}
          <text x={g.x + 10} y={185} fontFamily={TYPO.family} fontSize={12} fontWeight={800} fill={TYPO.label.color} style={{ letterSpacing: '0.05em' }}>{g.label}</text>

          {/* Density-based Logic Visualization */}
          <g transform={`translate(${g.x + 15}, 205)`}>
            {i === 0 && (
              <g>
                <text fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={TYPO.caption.color}>SINGLE PASS READ</text>
                <rect y={15} width={g.w - 30} height={100} rx={1} fill="none" stroke={COLORS.surface.stroke} strokeWidth={0.5} strokeDasharray="2 2" />
                <line x1={10} y1={35} x2={g.w - 40} y2={35} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
                <line x1={10} y1={50} x2={g.w - 40} y2={50} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
                <line x1={10} y1={65} x2={g.w - 40} y2={65} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
              </g>
            )}
            {i === 1 && (
              <g>
                <text fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={TYPO.caption.color}>TWO-PHASE STRATEGY</text>
                <rect y={15} width={g.w - 30} height={32} rx={1} fill={COLORS.neutral.fill} stroke={COLORS.neutral.stroke} strokeWidth={0.5} />
                <text x={(g.w - 30) / 2} y={35} textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.label.color}>1. RECON (CODEX)</text>
                
                <line x1={(g.w - 30) / 2} y1={47} x2={(g.w - 30) / 2} y2={65} stroke={COLORS.surface.stroke} strokeWidth={0.5} />

                <rect y={65} width={g.w - 30} height={32} rx={1} fill={COLORS.surface.fill} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
                <text x={(g.w - 30) / 2} y={85} textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.label.color}>2. JUDGE (OPUS)</text>
              </g>
            )}
            {i === 2 && (
              <g>
                <text fontFamily={TYPO.family} fontSize={8} fontWeight={400} fill={TYPO.caption.color}>PARALLEL PIPELINE</text>
                <g transform="translate(0, 15)">
                  {[0, 1, 2].map(idx => (
                    <rect key={idx} x={idx * 45} width={40} height={60} rx={1} fill={COLORS.primary.fill} opacity={0.3} stroke={COLORS.primary.stroke} strokeWidth={0.5} />
                  ))}
                  <text x={(g.w - 30) / 2} y={35} textAnchor="middle" fontFamily={TYPO.family} fontSize={7} fontWeight={800} fill={TYPO.label.color}>MULTI-AGENT</text>
                </g>
                <line x1={(g.w - 30) / 2} y1={75} x2={(g.w - 30) / 2} y2={95} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
                <rect y={95} width={g.w - 30} height={32} rx={1} fill={COLORS.surface.fill} stroke={COLORS.accent.fill} strokeWidth={1} />
                <text x={(g.w - 30) / 2} y={115} textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.label.color}>FUSION & REASON</text>
              </g>
            )}
          </g>
        </g>
      ))}

      {/* --- Legend for Logic --- */}
      <g transform="translate(440, 30)">
        <text fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.caption.color}>STRATEGY ENGINE</text>
        <line x1={0} y1={8} x2={100} y2={8} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
        <text y={22} fontFamily={TYPO.family} fontSize={8} fill={TYPO.label.color}>• OPUS: PRIMARY REASONER</text>
        <text y={34} fontFamily={TYPO.family} fontSize={8} fill={TYPO.label.color}>• CODEX: SCOUT & INDEXER</text>
      </g>
    </DiagramContainer>
  );
}
