/**
 * ORCHDiagram5 — The Living Loop
 * Auto-iterate 6단계 순환 + 실행 주체 + 체크항목 + Health Score + 반복 궤적
 * "측정은 AI 없이. 승인은 사람이."
 * 형식: 수평 레이스트랙
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray30:    "#4D4D4D",
  gray50:    "#808080",
  gray65:    "#A6A6A6",
  gray80:    "#CCCCCC",
  gray92:    "#EBEBEB",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

// Track geometry (shifted down for check items above)
const TL = 80;
const TR = 620;
const TT = 160;
const TB = 280;
const R = (TB - TT) / 2;
const TMY = (TT + TB) / 2;

const trackPath = (offset: number) => {
  const t = TT - offset, b = TB + offset;
  const l = TL - offset, r = TR + offset;
  const rv = (b - t) / 2;
  return `M ${l + rv} ${t}
          L ${r - rv} ${t}
          A ${rv} ${rv} 0 0 1 ${r - rv} ${b}
          L ${l + rv} ${b}
          A ${rv} ${rv} 0 0 1 ${l + rv} ${t}`;
};

// measure check items (curve upward from measure node)
const MX = 160; // measure x
const checks = [
  { label: "Hook 작동?",           endX: 90,  endY: 56 },
  { label: "CLAUDE.md ↔ 현실 일치?", endX: 175, endY: 36 },
  { label: "파이프라인 정체?",       endX: 265, endY: 56 },
];

export function ORCHDiagram5() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 740,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 700 400" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="o5-arr" viewBox="0 0 8 6" refX="7" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray65} />
          </marker>
        </defs>

        {/* ── 4. Repeated track outlines (반복 궤적) ── */}
        <path d={trackPath(14)} fill="none" stroke={EC.gray80} strokeWidth={0.6} opacity={0.5} />
        <path d={trackPath(8)}  fill="none" stroke={EC.gray80} strokeWidth={0.8} opacity={0.7} />

        {/* ── Main track ── */}
        <path d={trackPath(0)}
          fill="rgba(0,0,0,0.018)" stroke={EC.gray80} strokeWidth={1.5} />

        {/* ── Direction arrows ── */}
        {/* Top: left → right */}
        <line x1={210} y1={TT} x2={248} y2={TT}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />
        <line x1={330} y1={TT} x2={368} y2={TT}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />
        <line x1={450} y1={TT} x2={495} y2={TT}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />
        {/* Right curve */}
        <line x1={TR - R} y1={TT + 28} x2={TR - R} y2={TT + 48}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />
        {/* Bottom: right → left */}
        <line x1={450} y1={TB} x2={432} y2={TB}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />
        <line x1={285} y1={TB} x2={252} y2={TB}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />
        {/* Left curve */}
        <line x1={TL + R} y1={TB - 28} x2={TL + R} y2={TB - 48}
          stroke={EC.gray65} strokeWidth={EC.lineReg} markerEnd="url(#o5-arr)" />

        {/* ── 2. Measure check items (curved branches) ── */}
        {checks.map((c, i) => (
          <g key={`chk-${i}`}>
            <path
              d={`M ${MX} ${TT - 16} C ${MX} ${TT - 50}, ${c.endX} ${c.endY + 30}, ${c.endX} ${c.endY + 10}`}
              fill="none" stroke={EC.gray65} strokeWidth={EC.lineBold} />
            <circle cx={c.endX} cy={c.endY + 6} r={2}
              fill={EC.gray65} />
            <text x={c.endX} y={c.endY - 4}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={7.5} fontWeight={200}
              fill={EC.gray50}>
              {c.label}
            </text>
          </g>
        ))}

        {/* ── Top row nodes ── */}
        {[
          { label: "measure",  x: 160, r: 16, accent: false, human: false, agent: "Python" },
          { label: "diagnose", x: 280, r: 16, accent: false, human: false, agent: "Claude" },
          { label: "propose",  x: 400, r: 16, accent: false, human: false, agent: "Claude" },
          { label: "승인",      x: 530, r: 20, accent: true,  human: true,  agent: "나" },
        ].map((n, i) => (
          <g key={`top-${i}`}>
            <circle cx={n.x} cy={TT} r={n.r}
              fill={n.human ? "rgba(204,0,0,0.05)" : "rgba(255,255,255,0.9)"}
              stroke={n.human ? EC.accent : EC.gray80}
              strokeWidth={n.human ? EC.lineBold : EC.lineReg} />
            <text x={n.x} y={TT + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font}
              fontSize={n.human ? 10 : 9}
              fontWeight={n.human ? 300 : 200}
              fill={n.human ? EC.accent : EC.black}>
              {n.label}
            </text>
            {/* 1. 실행 주체 (inside track, below node) */}
            <text x={n.x} y={TT + (n.human ? 30 : 26)}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={7} fontWeight={200}
              fill={n.human ? EC.accent : EC.gray65}>
              {n.agent}
            </text>
          </g>
        ))}

        {/* ── Bottom row nodes ── */}
        {[
          { label: "apply",  x: 400, agent: "Claude" },
          { label: "verify", x: 220, agent: "Script" },
        ].map((n, i) => (
          <g key={`bot-${i}`}>
            <circle cx={n.x} cy={TB} r={16}
              fill="rgba(255,255,255,0.9)"
              stroke={EC.gray80} strokeWidth={EC.lineReg} />
            <text x={n.x} y={TB + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={9} fontWeight={200}
              fill={EC.black}>
              {n.label}
            </text>
            {/* 1. 실행 주체 (below node, outside track) */}
            <text x={n.x} y={TB + 26}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={7} fontWeight={200}
              fill={EC.gray65}>
              {n.agent}
            </text>
          </g>
        ))}

        {/* ── Center ── */}
        <text x={350} y={TMY - 4}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="0.5px">
          Health Score
        </text>
        <text x={350} y={TMY + 14}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={7.5} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.3px">
          잊혀도 시스템이 다시 발견한다
        </text>

        {/* ── Caption ── */}
        <text x={350} y={378}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.5px">
          측정은 AI 없이. 승인은 사람이.
        </text>
      </svg>
    </div>
  );
}
