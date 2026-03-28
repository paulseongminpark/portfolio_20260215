/**
 * 다이어그램 11 — Organizational Decision Memory
 * 새 구조: 건축 평면도 — 3개 방(room) + 출입 동선.
 * 점선 시스템 경계 안에 3개 공간, 위아래로 출입구.
 * El Croquis Design System 적용
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const CX = 220;

/* System boundary */
const sysX = 50;
const sysY = 80;
const sysW = 340;
const sysH = 110;

/* 3 rooms inside */
const rooms = [
  { label: "판단 그래프",  accent: true },
  { label: "맥락 저장소",  accent: false },
  { label: "자동 측정",    accent: false },
];
const roomW = 92;
const roomH = 52;
const roomGap = 14;
const roomY = sysY + 36;
const totalRoomW = rooms.length * roomW + (rooms.length - 1) * roomGap;
const roomStartX = CX - totalRoomW / 2;

export function Diagram11() {
  return (
    <div style={{ margin: 0 }}>
      <svg viewBox="0 0 440 260" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-a11" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.black} />
          </marker>
        </defs>

        {/* Title */}
        <text x={CX} y={18} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          ORGANIZATIONAL DECISION MEMORY
        </text>

        {/* ── 의사결정자 (상단) ── */}
        <circle cx={CX} cy={44} r={20}
          fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
        <text x={CX} y={45} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.black}>
          의사결정자
        </text>

        {/* Arrow: 의사결정자 → system */}
        <line x1={CX} y1={64} x2={CX} y2={sysY - 2}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a11)" />
        <text x={CX + 8} y={74} fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
          질의·기록
        </text>

        {/* ── System boundary (dashed, rx=0, section-cut 스타일) ── */}
        <rect x={sysX} y={sysY} width={sysW} height={sysH} rx={0}
          fill="none" stroke={EC.black} strokeWidth={EC.lineBold}
          strokeDasharray="6 3" />
        <text x={sysX + 6} y={sysY + 12}
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}
          letterSpacing="0.5px">
          Decision Memory System
        </text>

        {/* ── 3 rooms ── */}
        {rooms.map((r, i) => {
          const rx = roomStartX + i * (roomW + roomGap);
          return (
            <g key={i}>
              <rect x={rx} y={roomY} width={roomW} height={roomH} rx={0}
                fill={r.accent ? "rgba(204,0,0,0.04)" : "none"}
                stroke={r.accent ? EC.accent : EC.black}
                strokeWidth={r.accent ? EC.lineBold : EC.lineReg} />
              <text x={rx + roomW / 2} y={roomY + roomH / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={8} fontWeight={300}
                fill={r.accent ? EC.accent : EC.black}>
                {r.label}
              </text>
            </g>
          );
        })}

        {/* ── 내부 room 연결 (rooms 사이 얇은 수평선) ── */}
        {[0, 1].map(i => {
          const x1 = roomStartX + (i + 1) * roomW + i * roomGap;
          const x2 = x1 + roomGap;
          return (
            <line key={i} x1={x1} y1={roomY + roomH / 2} x2={x2} y2={roomY + roomH / 2}
              stroke={EC.gray85} strokeWidth={EC.lineLight} strokeDasharray="2 2" />
          );
        })}

        {/* Arrow: system → 외부 시스템 */}
        <line x1={CX} y1={sysY + sysH + 2} x2={CX} y2={sysY + sysH + 26}
          stroke={EC.black} strokeWidth={EC.lineReg} markerEnd="url(#ec-a11)" />
        <text x={CX + 8} y={sysY + sysH + 16} fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.gray60}>
          수집·동기화
        </text>

        {/* ── 외부 시스템 (하단) ── */}
        <rect x={CX - 70} y={sysY + sysH + 30} width={140} height={26} rx={0}
          fill="none" stroke={EC.gray85} strokeWidth={EC.lineReg} />
        <text x={CX} y={sysY + sysH + 44} textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
          Jira · Slack · Docs
        </text>
      </svg>
    </div>
  );
}
