/**
 * 다이어그램 7 — 4-layer 캡처
 * 수평 밴드 스택. 깊은→표면. viewBox 220x252 (D5/D6 통일).
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const bandW = 164;
const bandH = 42;
const bandGap = 4;
const bandX = 26;
const startY = 32;

const layers = [
  { label: "PDR Scan",       desc: "세션 종료 시 8차원 스캔", accent: true },
  { label: "Manual Review",  desc: "사용자 직접 교정·승격",   accent: false },
  { label: "Session Hooks",  desc: "커밋·Phase 전환 시 자동", accent: false },
  { label: "auto_remember",  desc: "파일·bash 자동 감지",     accent: false },
];

export function Diagram7() {
  return (
    <div style={{ margin: "0 auto", maxWidth: 360 }}>
      <svg viewBox="-10 0 220 252" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a7u" viewBox="0 0 8 6" refX="0" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="8 0, 0 3, 8 6" fill={EC.black} />
          </marker>
        </defs>

        {/* Title */}
        <text x={bandX + bandW / 2} y={18} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1px">
          4-Layer 캡처
        </text>

        {/* ── Band stack ── */}
        {layers.map((l, i) => {
          const y = startY + i * (bandH + bandGap);
          const isDeep = i <= 1;
          return (
            <g key={i}>
              <rect x={bandX} y={y} width={bandW} height={bandH} rx={0}
                fill={l.accent ? "rgba(204,0,0,0.04)" : isDeep ? "rgba(0,0,0,0.012)" : "none"}
                stroke={l.accent ? EC.accent : EC.black}
                strokeWidth={l.accent ? EC.lineBold : EC.lineReg} />

              {/* L number */}
              <text x={bandX + 5} y={y + 11}
                fontFamily={EC.font} fontSize={6} fontWeight={200}
                fill={l.accent ? EC.accent : EC.gray60} letterSpacing="1px">
                {`L${3 - i}`}
              </text>

              {/* Label */}
              <text x={bandX + 5} y={y + 23}
                fontFamily={EC.font} fontSize={7.5} fontWeight={300}
                fill={l.accent ? EC.accent : EC.black}>
                {l.label}
              </text>

              {/* Description */}
              <text x={bandX + 5} y={y + 35}
                fontFamily={EC.font} fontSize={5.5} fontWeight={200}
                fill={EC.gray60}>
                {l.desc}
              </text>
            </g>
          );
        })}

        {/* ── Deep/Surface divider ── */}
        {(() => {
          const divY = startY + 2 * (bandH + bandGap) - bandGap / 2;
          return (
            <line x1={bandX} y1={divY} x2={bandX + bandW} y2={divY}
              stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="2 2" />
          );
        })()}

        {/* ── Depth arrow (left) ── */}
        {(() => {
          const ax = bandX - 6;
          const topY = startY + 8;
          const botY = startY + layers.length * (bandH + bandGap) - bandGap - 8;
          return (
            <g>
              <line x1={ax} y1={botY} x2={ax} y2={topY + 4}
                stroke={EC.black} strokeWidth={EC.lineReg}
                markerEnd="url(#ec-a7u)" />
              <text x={ax - 2} y={topY + 14} textAnchor="end"
                fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.black}>
                깊은
              </text>
              <text x={ax - 2} y={botY - 6} textAnchor="end"
                fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
                표면
              </text>
            </g>
          );
        })()}

        {/* ── Bottom caption ── */}
        <text x={bandX + bandW / 2} y={startY + layers.length * (bandH + bandGap) + 14}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray60}>
          네 겹이 서로 다른 깊이에서 잡는다
        </text>
      </svg>
    </div>
  );
}
