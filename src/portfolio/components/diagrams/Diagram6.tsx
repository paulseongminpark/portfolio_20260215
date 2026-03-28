/**
 * 다이어그램 6 — 승격 경로
 * Signal(산란) → Pattern(군집) → Principle(밀집).
 * 왼쪽=라벨, 오른쪽=노드 군집. viewBox 220x252 (D5/D7 통일).
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.15,
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* 왼쪽=텍스트(0-80), 오른쪽=노드(90-200) */
const NX = 150; // node cluster center-x

export function Diagram6() {
  return (
    <div style={{ margin: "0 auto", maxWidth: 360 }}>
      <svg viewBox="-10 0 220 252" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a6" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.black} />
          </marker>
        </defs>

        {/* Title */}
        <text x={100} y={14} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1px">
          승격 경로
        </text>

        {/* ── Tier guidelines ── */}
        <line x1={0} y1={58} x2={200} y2={58} stroke={EC.gray90} strokeWidth={EC.lineLight} />
        <line x1={0} y1={112} x2={200} y2={112} stroke={EC.gray90} strokeWidth={EC.lineLight} />
        <line x1={0} y1={168} x2={200} y2={168} stroke={EC.gray90} strokeWidth={EC.lineLight} />

        {/* ── Tier 1: Observation — tiny scattered ── */}
        <circle cx={NX - 15} cy={38} r={2}   fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />
        <circle cx={NX + 10} cy={32} r={1.5} fill="none" stroke={EC.accent} strokeWidth={EC.lineLight} />
        <circle cx={NX + 25} cy={44} r={2}   fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />
        <circle cx={NX}      cy={48} r={1}   fill={EC.accent} opacity={0.3} />
        <circle cx={NX + 35} cy={34} r={1}   fill={EC.accent} opacity={0.2} />

        <text x={0} y={38} fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.black} letterSpacing="2px">
          {"OBS."}
        </text>
        <text x={0} y={49} fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          산란 — 낮은 확신
        </text>

        {/* ── Gate 1 ── */}
        <line x1={NX} y1={56} x2={NX} y2={72}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a6)" />
        <text x={NX + 8} y={66} fontFamily={EC.font} fontSize={5.5} fontWeight={300} fill={EC.black}>
          G1
        </text>
        <text x={NX + 20} y={66} fontFamily={EC.font} fontSize={5} fontWeight={200} fill={EC.gray60}>
          SPRT
        </text>

        {/* ── Tier 2: Signal — small circles, sparse edges ── */}
        <circle cx={NX - 10} cy={84}  r={3}   fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />
        <circle cx={NX + 15} cy={92}  r={3.5} fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />
        <circle cx={NX + 3}  cy={78}  r={2.5} fill="none" stroke={EC.accent} strokeWidth={EC.lineLight} />
        <circle cx={NX + 30} cy={86}  r={2}   fill="none" stroke={EC.accent} strokeWidth={EC.lineLight} />
        <line x1={NX - 10} y1={84} x2={NX + 15} y2={92} stroke={EC.accent} strokeWidth={EC.lineLight} opacity={0.4} />
        <line x1={NX + 3} y1={78} x2={NX + 15} y2={92} stroke={EC.accent} strokeWidth={EC.lineLight} opacity={0.3} />

        <text x={0} y={88} fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.black} letterSpacing="2px">
          {"SIGNAL"}
        </text>
        <text x={0} y={99} fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          반복 — 중간 확신
        </text>

        {/* ── Gate 2 ── */}
        <line x1={NX} y1={112} x2={NX} y2={128}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a6)" />
        <text x={NX + 8} y={122} fontFamily={EC.font} fontSize={5.5} fontWeight={300} fill={EC.black}>
          G2
        </text>
        <text x={NX + 20} y={122} fontFamily={EC.font} fontSize={5} fontWeight={200} fill={EC.gray60}>
          검색 10+
        </text>

        {/* ── Tier 3: Pattern — medium, connected triangle ── */}
        <circle cx={NX - 5}  cy={142} r={5}   fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <circle cx={NX + 20} cy={148} r={4.5} fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <circle cx={NX + 8}  cy={132} r={3.5} fill="none" stroke={EC.accent} strokeWidth={EC.lineReg} />
        <line x1={NX - 5} y1={142} x2={NX + 20} y2={148} stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.5} />
        <line x1={NX - 5} y1={142} x2={NX + 8} y2={132} stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.5} />
        <line x1={NX + 20} y1={148} x2={NX + 8} y2={132} stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.5} />

        <text x={0} y={142} fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.black} letterSpacing="2px">
          {"PATTERN"}
        </text>
        <text x={0} y={153} fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          구조 출현 — 검증
        </text>

        {/* ── Gate 3 ── */}
        <line x1={NX} y1={168} x2={NX} y2={184}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a6)" />
        <text x={NX + 8} y={178} fontFamily={EC.font} fontSize={5.5} fontWeight={300} fill={EC.black}>
          G3
        </text>
        <text x={NX + 20} y={178} fontFamily={EC.font} fontSize={5} fontWeight={200} fill={EC.gray60}>
          유사도 .75
        </text>

        {/* ── Tier 4: Principle — large dense + influence rays ── */}
        <circle cx={NX}      cy={206} r={7}   fill="none" stroke={EC.accent} strokeWidth={1} />
        <circle cx={NX + 22} cy={212} r={5.5} fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <circle cx={NX + 12} cy={196} r={4}   fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <line x1={NX} y1={206} x2={NX + 22} y2={212} stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.6} />
        <line x1={NX} y1={206} x2={NX + 12} y2={196} stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.6} />
        <line x1={NX + 22} y1={212} x2={NX + 12} y2={196} stroke={EC.accent} strokeWidth={EC.lineReg} opacity={0.6} />
        {/* Influence rays */}
        <line x1={NX} y1={206} x2={NX - 30} y2={218} stroke={EC.black} strokeWidth={EC.lineHair} opacity={0.2} />
        <line x1={NX} y1={206} x2={NX + 45} y2={200} stroke={EC.black} strokeWidth={EC.lineHair} opacity={0.2} />

        <text x={0} y={206} fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.black} letterSpacing="2px">
          {"PRINCIPLE"}
        </text>
        <text x={0} y={217} fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          안정 — 높은 확신
        </text>

        {/* ── BCM curve (faint backdrop) ── */}
        <path d={`M ${NX - 10},34 Q ${NX},90 ${NX + 5},140 Q ${NX + 10},180 ${NX + 15},214`}
          fill="none" stroke={EC.gray90} strokeWidth={EC.lineReg} strokeDasharray="4 4" />

        {/* ── Caption ── */}
        <text x={100} y={242} textAnchor="middle"
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}
          letterSpacing="0.5px">
          산란 → 군집 → 밀집
        </text>
      </svg>
    </div>
  );
}
