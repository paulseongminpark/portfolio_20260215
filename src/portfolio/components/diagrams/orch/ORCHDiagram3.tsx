/**
 * ORCHDiagram3 — The Kernel Architecture
 * 나 → Claude → Guards/Skills/Workers 계층 그래프
 * "커널은 What만 가진다. How는 실행 레이어에 넘긴다."
 * 형식: 원+선 hierarchy — diptych 좌측용
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

export function ORCHDiagram3({ diptych }: { diptych?: boolean }) {
  const W = diptych ? 300 : 460;
  const H = diptych ? 340 : 400;
  const mx = W / 2;
  const fs = diptych ? 7 : 8;

  // node positions
  const me =    { x: mx, y: 50 };
  const claude = { x: mx, y: 140 };
  const pillars = [
    { x: mx - 90, y: 260, label: "Guards",  num: "14", role: "인터럽트 핸들러" },
    { x: mx,      y: 260, label: "Skills",  num: "13", role: "유저 프로그램" },
    { x: mx + 90, y: 260, label: "Workers", num: "3",  role: "격리 프로세스" },
  ];

  const nodeR = diptych ? 18 : 22;
  const pillarR = diptych ? 16 : 20;

  return (
    <div style={diptych ? {} : {
      margin: "48px auto 40px",
      maxWidth: 500,
      padding: "0 16px",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* ── What/How divider ── */}
        <line x1={30} y1={195} x2={W - 30} y2={195}
          stroke={EC.gray80} strokeWidth={EC.lineHair}
          strokeDasharray="3 3" />
        <text x={24} y={175}
          textAnchor="end"
          fontFamily={EC.font} fontSize={6} fontWeight={200}
          fill={EC.accent} letterSpacing="1px">
          WHAT
        </text>
        <text x={24} y={220}
          textAnchor="end"
          fontFamily={EC.font} fontSize={6} fontWeight={200}
          fill={EC.gray65} letterSpacing="1px">
          HOW
        </text>

        {/* ── Edges: me → claude ── */}
        <line x1={me.x} y1={me.y + nodeR} x2={claude.x} y2={claude.y - nodeR}
          stroke={EC.gray80} strokeWidth={EC.lineReg} />

        {/* ── Edges: claude → pillars ── */}
        {pillars.map((p, i) => (
          <line key={`e-${i}`}
            x1={claude.x} y1={claude.y + nodeR}
            x2={p.x} y2={p.y - pillarR}
            stroke={EC.gray80} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Node: 나 ── */}
        <circle cx={me.x} cy={me.y} r={nodeR}
          fill="rgba(204,0,0,0.04)" stroke={EC.accent} strokeWidth={EC.lineBold} />
        <text x={me.x} y={me.y + 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={fs + 2} fontWeight={300}
          fill={EC.black}>
          나
        </text>
        <text x={me.x} y={me.y + nodeR + 14}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={fs - 1} fontWeight={200}
          fill={EC.gray50}>
          방향 · 판단 · 승인
        </text>

        {/* ── Node: Claude ── */}
        <circle cx={claude.x} cy={claude.y} r={nodeR}
          fill="rgba(0,0,0,0.02)" stroke={EC.black} strokeWidth={EC.lineReg} />
        <text x={claude.x} y={claude.y - 2}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={fs} fontWeight={300}
          fill={EC.black}>
          Claude
        </text>
        <text x={claude.x} y={claude.y + 10}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={fs - 2} fontWeight={200}
          fill={EC.gray50}>
          Opus 1M
        </text>
        <text x={claude.x} y={claude.y + nodeR + 14}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={fs - 1} fontWeight={200}
          fill={EC.gray50}>
          설계 · 실행 · 조율
        </text>

        {/* ── Pillar nodes ── */}
        {pillars.map((p, i) => (
          <g key={`p-${i}`}>
            <circle cx={p.x} cy={p.y} r={pillarR}
              fill="rgba(0,0,0,0.015)" stroke={EC.gray80}
              strokeWidth={EC.lineReg} />
            <text x={p.x} y={p.y - 2}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={fs} fontWeight={300}
              fill={EC.black}>
              {p.label}
            </text>
            <text x={p.x} y={p.y + 10}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={fs + 3} fontWeight={300}
              fill={EC.accent}>
              {p.num}
            </text>
            <text x={p.x} y={p.y + pillarR + 14}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={fs - 2} fontWeight={200}
              fill={EC.gray65}>
              {p.role}
            </text>
          </g>
        ))}

        {/* ── Caption ── */}
        <text x={mx} y={H - 14}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={fs - 1} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.5px">
          커널은 What만. How는 실행 레이어에.
        </text>
      </svg>
    </div>
  );
}
