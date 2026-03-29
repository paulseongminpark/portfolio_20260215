/**
 * ContextDiptych — 왼쪽(다들 멈춘다, 수평 막대) → 화살표 → 오른쪽(이 시스템은 깊이 간다, 수직 깊이)
 * 형식 대비: 수평(한계) vs 수직(깊이).
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const others = [
  { name: "claude-mem",  what: "세션 압축" },
  { name: "Mem0",        what: "사실 추출" },
  { name: "supermemory", what: "시그널 추출" },
  { name: "MemGPT",      what: "가상 메모리" },
  { name: "Hindsight",   what: "대화 인덱싱" },
];

/* ── Left: 수평 막대 — 모두 멈춘다 ── */
function LeftPanel() {
  const barX = 80, rowH = 20, startY = 28, limitX = barX + 90;
  return (
    <svg viewBox="0 0 240 160" width="100%" style={{ display: "block" }}>
      <text x={120} y={14} textAnchor="middle"
        fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black} letterSpacing="1px">
        저장한다
      </text>
      {others.map((t, i) => {
        const y = startY + i * rowH;
        return (
          <g key={i}>
            <text x={barX - 5} y={y + 8} textAnchor="end"
              fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.black}>
              {t.name}
            </text>
            <line x1={barX} y1={y + 6} x2={limitX} y2={y + 6}
              stroke={EC.gray85} strokeWidth={2.5} />
          </g>
        );
      })}
      {/* Limit */}
      <line x1={limitX + 4} y1={startY} x2={limitX + 4} y2={startY + others.length * rowH - 6}
        stroke={EC.accent} strokeWidth={EC.lineBold} strokeDasharray="4 3" />
      <text x={limitX + 10} y={startY + others.length * rowH / 2}
        fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.accent}>
        여기서 멈춘다
      </text>
      <text x={120} y={startY + others.length * rowH + 12} textAnchor="middle"
        fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
        "뭘 했는지"는 안다. "왜"는 모른다.
      </text>
    </svg>
  );
}

/* ── Right: 수직 깊이 — 이 시스템만 도달한다 ── */
function RightPanel() {
  const cx = 100;
  const depths = [
    { y: 34,  label: "뭘 했는지",              gray: true },
    { y: 60,  label: "왜 그렇게 했는지",        gray: false },
    { y: 86,  label: "뭘 배웠는지",             gray: false },
    { y: 112, label: "뭐가 아직 열려있는지",     gray: false },
  ];
  const surfaceY = 28;
  const deepY = depths[depths.length - 1].y + 8;

  return (
    <svg viewBox="0 0 240 160" width="100%" style={{ display: "block" }}>
      <text x={120} y={14} textAnchor="middle"
        fontFamily={EC.font} fontSize={8} fontWeight={300} fill={EC.black} letterSpacing="1px">
        추론한다
      </text>

      {/* Vertical depth line */}
      <line x1={cx} y1={surfaceY} x2={cx} y2={deepY}
        stroke={EC.accent} strokeWidth={EC.lineBold} />

      {/* Surface line (다른 도구들은 여기까지) */}
      <line x1={cx - 30} y1={depths[0].y} x2={cx + 30} y2={depths[0].y}
        stroke={EC.gray85} strokeWidth={EC.lineReg} />
      <text x={cx + 34} y={depths[0].y + 2} dominantBaseline="middle"
        fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
        {depths[0].label}
      </text>
      {/* Gray dots for others stopping here */}
      {[-18, -10, -2, 6, 14].map((dx, i) => (
        <circle key={i} cx={cx + dx} cy={depths[0].y} r={1.5}
          fill={EC.gray85} />
      ))}

      {/* Deeper levels — only this system */}
      {depths.slice(1).map((d, i) => (
        <g key={i}>
          <line x1={cx - 6} y1={d.y} x2={cx + 6} y2={d.y}
            stroke={EC.accent} strokeWidth={EC.lineReg} />
          <circle cx={cx} cy={d.y} r={2.5}
            fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
          <text x={cx + 34} y={d.y + 2} dominantBaseline="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={300} fill={EC.accent}>
            {d.label}
          </text>
        </g>
      ))}

      {/* Depth arrow tip */}
      <polygon points={`${cx - 3},${deepY} ${cx + 3},${deepY} ${cx},${deepY + 6}`}
        fill={EC.accent} />

      {/* Labels */}
      <text x={cx - 36} y={depths[0].y + 2} textAnchor="end" dominantBaseline="middle"
        fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.gray85}>
        표면
      </text>
      <text x={cx - 36} y={deepY - 4} textAnchor="end"
        fontFamily={EC.font} fontSize={6} fontWeight={200} fill={EC.accent}>
        깊이
      </text>

      <text x={120} y={146} textAnchor="middle"
        fontFamily={EC.font} fontSize={7} fontWeight={200} fill={EC.gray60}>
        타입 · 관계 · 승격이 깊이를 만든다
      </text>
    </svg>
  );
}

export function ContextDiptych() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 32px 1fr",
      gap: 0,
      margin: "48px auto 40px",
      maxWidth: 700,
      alignItems: "center",
    }}>
      <LeftPanel />
      {/* Center arrow — accent, vertically centered */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <line x1={2} y1={12} x2={17} y2={12} stroke={EC.accent} strokeWidth={1} />
          <polygon points="17,9 17,15 22,12" fill={EC.accent} />
        </svg>
      </div>
      <RightPanel />
    </div>
  );
}
