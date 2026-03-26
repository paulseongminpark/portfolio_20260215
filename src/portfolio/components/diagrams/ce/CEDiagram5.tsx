/** CEDiagram5: "무거워지면" 
 * 3번 다이어그램의 'Gate Card' 미학 적용 (Blueprint DNA)
 */
import { DiagramContainer, COLORS, TYPO, CONN } from "../diagramTokens";

export function CEDiagram5() {
  const W = 620;
  const H = 320;
  const steps = [
    { id: "01", label: "SAVE", size: "500K", x: 40, w: 160, h: 140, color: COLORS.primary.stroke, status: "OPTIONAL", desc: "중간 상태 저장" },
    { id: "02", label: "COMPACT", size: "700K", x: 230, w: 180, h: 180, color: COLORS.tertiary.stroke, status: "MANDATORY", checks: ["Index Update", "Memory Store", "Session Log"] },
    { id: "03", label: "HANDOVER", size: "900K", x: 440, w: 160, h: 140, color: COLORS.danger.fill, status: "CRITICAL", desc: "새 세션 전환" },
  ];

  return (
    <DiagramContainer viewBox={`0 0 ${W} ${H}`} maxWidth={700} marginTop={40}>
      {/* --- Centered Spec Header --- */}
      <g transform={`translate(${W / 2}, 30)`}>
        <text textAnchor="middle" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color} style={{ letterSpacing: '0.1em' }}>
          DECISION LOGIC: CONTEXT LOAD MANAGEMENT
        </text>
        <line x1={-100} y1={8} x2={100} y2={8} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
      </g>

      {/* --- Decision Line with Markers --- */}
      <line x1={120} y1={60} x2={520} y2={60} stroke={COLORS.surface.stroke} strokeWidth={0.5} strokeDasharray="4 4" />

      {steps.map((s, i) => (
        <g key={s.id}>
          {/* Connecting Connector */}
          <line x1={s.x + s.w / 2} y1={60} x2={s.x + s.w / 2} y2={80} stroke={COLORS.surface.stroke} strokeWidth={0.5} />
          <circle cx={s.x + s.w / 2} cy={60} r={1.5} fill={COLORS.surface.stroke} />

          {/* Gate-style Card */}
          <rect x={s.x} y={80} width={s.w} height={s.h} rx={1} fill={COLORS.surface.fill} stroke={s.color} strokeWidth={i === 1 ? 1 : 0.5} />
          
          {/* Header Bar */}
          <rect x={s.x} y={80} width={s.w} height={24} rx={1} fill={s.color} opacity={0.1} />
          <text x={s.x + 10} y={96} fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.label.color}>STEP {s.id}</text>
          <text x={s.x + s.w - 10} y={96} textAnchor="end" fontFamily={TYPO.family} fontSize={8} fontWeight={800} fill={TYPO.caption.color}>{s.size}</text>
          
          {/* Label & Status */}
          <text x={s.x + 10} y={125} fontFamily={TYPO.family} fontSize={11} fontWeight={800} fill={TYPO.label.color} style={{ letterSpacing: '0.05em' }}>{s.label}</text>
          <text x={s.x + 10} y={138} fontFamily={TYPO.family} fontSize={7} fontWeight={700} fill={COLORS.accent.fill}>{s.status}</text>

          {/* Content Items */}
          <g transform={`translate(${s.x + 10}, 155)`}>
            {s.desc && <text fontFamily={TYPO.family} fontSize={8} fill={TYPO.caption.color}>{s.desc.toUpperCase()}</text>}
            {s.checks && s.checks.map((c, idx) => (
              <g key={idx} transform={`translate(0, ${idx * 14})`}>
                <circle cx={2} cy={-3} r={1} fill={s.color} />
                <text x={10} fontFamily={TYPO.family} fontSize={8} fontWeight={600} fill={TYPO.label.color}>{c}</text>
              </g>
            ))}
          </g>
        </g>
      ))}
    </DiagramContainer>
  );
}
