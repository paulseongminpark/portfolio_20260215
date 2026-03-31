/**
 * ORCHDiagram4 — Before / After
 * v3.3 → v6 정량 비교. "빼는 것이 강화다"의 증거.
 * 형식: 좌우 대비 + 감소율 — diptych 우측용
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

const metrics = [
  { label: "에이전트",  before: "24",  after: "3",   afterLabel: "Workers", delta: "-87.5%" },
  { label: "CLAUDE.md", before: "74줄", after: "38줄", afterLabel: "",       delta: "-48.6%" },
  { label: "baseline",  before: "42K",  after: "15K",  afterLabel: "",       delta: "-64.3%" },
];

export function ORCHDiagram4({ diptych }: { diptych?: boolean }) {
  const W = diptych ? 300 : 480;
  const H = diptych ? 360 : 420;
  const mx = W / 2;
  const fs = diptych ? 7 : 8;
  const rowH = 80;
  const startY = 80;

  return (
    <div style={diptych ? {} : {
      margin: "48px auto 40px",
      maxWidth: 520,
      padding: "0 16px",
    }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* ── Column headers ── */}
        <text x={mx - 80} y={45}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={fs} fontWeight={200}
          fill={EC.gray50} letterSpacing="1px">
          v3.3
        </text>
        <text x={mx + 80} y={45}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={fs} fontWeight={200}
          fill={EC.gray50} letterSpacing="1px">
          v6
        </text>

        {/* ── Header line ── */}
        <line x1={30} y1={55} x2={W - 30} y2={55}
          stroke={EC.gray92} strokeWidth={EC.lineReg} />

        {/* ── Metric rows ── */}
        {metrics.map((m, i) => {
          const y = startY + i * rowH;
          const barMaxW = 60;

          // proportional bars (before is always full, after is proportional)
          const beforeVal = parseFloat(m.before);
          const afterVal = parseFloat(m.after);
          const ratio = afterVal / beforeVal;

          return (
            <g key={i}>
              {/* row label */}
              <text x={mx} y={y}
                textAnchor="middle"
                fontFamily={EC.font} fontSize={fs - 1} fontWeight={200}
                fill={EC.gray65} letterSpacing="0.5px">
                {m.label}
              </text>

              {/* before: bar + number */}
              <rect x={mx - 80 - barMaxW / 2} y={y + 10}
                width={barMaxW} height={18}
                fill="rgba(0,0,0,0.08)" rx={1} />
              <text x={mx - 80} y={y + 22}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={fs + 4} fontWeight={300}
                fill={EC.black}>
                {m.before}
              </text>

              {/* arrow */}
              <line x1={mx - 80 + barMaxW / 2 + 6} y1={y + 19}
                    x2={mx + 80 - barMaxW * ratio / 2 - 6} y2={y + 19}
                stroke={EC.gray80} strokeWidth={EC.lineHair} />

              {/* delta */}
              <text x={mx} y={y + 22}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={fs + 1} fontWeight={300}
                fill={EC.accent}>
                {m.delta}
              </text>

              {/* after: bar + number */}
              <rect x={mx + 80 - barMaxW * ratio / 2} y={y + 10}
                width={barMaxW * ratio} height={18}
                fill="rgba(0,0,0,0.04)" stroke={EC.gray80}
                strokeWidth={EC.lineHair} rx={1} />
              <text x={mx + 80} y={y + 22}
                textAnchor="middle" dominantBaseline="middle"
                fontFamily={EC.font} fontSize={fs + 4} fontWeight={300}
                fill={EC.black}>
                {m.after}
              </text>

              {/* after sub-label */}
              {m.afterLabel && (
                <text x={mx + 80} y={y + 40}
                  textAnchor="middle"
                  fontFamily={EC.font} fontSize={fs - 2} fontWeight={200}
                  fill={EC.gray65}>
                  {m.afterLabel}
                </text>
              )}

              {/* row separator */}
              {i < metrics.length - 1 && (
                <line x1={40} y1={y + rowH - 14}
                      x2={W - 40} y2={y + rowH - 14}
                  stroke={EC.gray92} strokeWidth={EC.lineHair} />
              )}
            </g>
          );
        })}

        {/* ── Caption ── */}
        <text x={mx} y={H - 30}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={fs} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.5px">
          기능은 줄지 않았다
        </text>
      </svg>
    </div>
  );
}
