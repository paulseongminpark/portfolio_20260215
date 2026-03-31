/**
 * ORCHDiagram6 — The Kernel Temple
 * 그리스 이오니아 신전 정면도 — El Croquis 스타일
 * 페디먼트 = orchestration, 엔타블러처 = CLAUDE.md · rules/ · 14 Hooks,
 * 열주 가운데 = 서브시스템(기억/주입/측정/연결/방법론), 기단 = foundation/
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray20:    "#333333",
  gray30:    "#4D4D4D",
  gray50:    "#808080",
  gray65:    "#A6A6A6",
  gray80:    "#CCCCCC",
  gray92:    "#EBEBEB",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.25,
  lineReg:   0.5,
  lineBold:  0.75,
  lineHeavy: 1,
} as const;

const CX = 360;

const TW = 500;
const TX = CX - TW / 2;
const TR = TX + TW;

const PEDIMENT_TOP = 40;
const PEDIMENT_BASE = 100;
const ENTAB_TOP = PEDIMENT_BASE;
const ENTAB_BOT = 130;
const COL_TOP = 135;
const COL_BOT = 340;
const COL_MID = (COL_TOP + COL_BOT) / 2;
const STYLO_TOP = 345;
const STYLO_BOT = 391;

const columns = [
  { label: "mcp-memory",      role: "기억",   x: TX + 50 },
  { label: "context-cascade", role: "주입",   x: TX + 150 },
  { label: "auto-iterate",    role: "측정",   x: TX + 250 },
  { label: "index-system",    role: "연결",   x: TX + 350 },
  { label: "documentation",   role: "방법론", x: TX + 450 },
];

const volute = (cx: number, cy: number, dir: 1 | -1) => {
  const d = dir;
  return `M ${cx} ${cy}
    C ${cx + d * 8} ${cy - 3}, ${cx + d * 10} ${cy - 8}, ${cx + d * 7} ${cy - 10}
    C ${cx + d * 4} ${cy - 12}, ${cx + d * 1} ${cy - 9}, ${cx + d * 3} ${cy - 7}`;
};

export function ORCHDiagram6() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 780,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 720 440" width="100%" style={{ display: "block" }}>

        {/* ══════ PEDIMENT ══════ */}
        <path
          d={`M ${TX - 5} ${PEDIMENT_BASE}
              L ${CX} ${PEDIMENT_TOP}
              L ${TR + 5} ${PEDIMENT_BASE} Z`}
          fill="none" stroke={EC.black} strokeWidth={EC.lineBold} />
        <line x1={TX - 8} y1={PEDIMENT_BASE} x2={TR + 8} y2={PEDIMENT_BASE}
          stroke={EC.black} strokeWidth={EC.lineHeavy} />
        <text x={CX} y={PEDIMENT_BASE - 22}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={14} fontWeight={300}
          fill={EC.accent}>
          orchestration
        </text>
        <text x={CX} y={PEDIMENT_BASE - 8}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray50}>
          kernel
        </text>

        {/* ══════ ENTABLATURE ══════ */}
        <line x1={TX - 8} y1={ENTAB_TOP + 2} x2={TR + 8} y2={ENTAB_TOP + 2}
          stroke={EC.black} strokeWidth={EC.lineReg} />
        {/* 5개 — 각 기둥 위에 하나씩 */}
        {[
          { label: "CLAUDE.md", x: TX + 50 },
          { label: "rules/",    x: TX + 150 },
          { label: "14 Hooks",  x: TX + 250 },
          { label: "13 Skills", x: TX + 350 },
          { label: "MEMORY.md", x: TX + 450 },
        ].map((item, i) => (
          <text key={`entab-${i}`} x={item.x} y={ENTAB_TOP + 19}
            textAnchor="middle"
            fontFamily={EC.font} fontSize={9} fontWeight={200}
            fill={EC.gray50}>
            {item.label}
          </text>
        ))}
        <line x1={TX} y1={ENTAB_BOT} x2={TR} y2={ENTAB_BOT}
          stroke={EC.black} strokeWidth={EC.lineBold} />

        {/* ══════ COLUMNS + 가운데 라벨 ══════ */}
        {columns.map((col, i) => {
          const cw = 11;
          const bw = 13;
          return (
            <g key={`col-${i}`}>
              {/* Ionic capital — volutes */}
              <path d={volute(col.x - 2, COL_TOP + 4, -1)}
                fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
              <path d={volute(col.x + 2, COL_TOP + 4, 1)}
                fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
              <line x1={col.x - cw} y1={COL_TOP} x2={col.x + cw} y2={COL_TOP}
                stroke={EC.black} strokeWidth={EC.lineReg} />

              {/* shaft */}
              <line x1={col.x - cw / 2} y1={COL_TOP + 14}
                    x2={col.x - bw / 2} y2={COL_BOT}
                stroke={EC.black} strokeWidth={EC.lineReg} />
              <line x1={col.x + cw / 2} y1={COL_TOP + 14}
                    x2={col.x + bw / 2} y2={COL_BOT}
                stroke={EC.black} strokeWidth={EC.lineReg} />

              {/* fluting */}
              {[-2, 0, 2].map((offset, fi) => (
                <line key={`flute-${i}-${fi}`}
                  x1={col.x + offset} y1={COL_TOP + 16}
                  x2={col.x + offset} y2={COL_BOT - 2}
                  stroke={EC.gray92} strokeWidth={EC.lineHair} />
              ))}

              {/* base */}
              <line x1={col.x - bw} y1={COL_BOT} x2={col.x + bw} y2={COL_BOT}
                stroke={EC.black} strokeWidth={EC.lineReg} />

            </g>
          );
        })}

        {/* ══════ INTERCOLUMNAR LABELS (기둥 사이 + 양 바깥에 6개 시스템) ══════ */}
        {[
          { label: "mcp-memory",      role: "기억",   x: TX - 10 },
          { label: "context-cascade", role: "주입",   x: TX + 100 },
          { label: "auto-iterate",    role: "측정",   x: TX + 200 },
          { label: "index-system",    role: "연결",   x: TX + 300 },
          { label: "documentation",   role: "방법론", x: TX + 400 },
          { label: "context-export",  role: "배포",   x: TX + 510 },
        ].map((sys, i) => (
          <g key={`sys-${i}`}>
            <text x={sys.x} y={COL_MID - 4}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={300}
              fill={EC.gray20}>
              {sys.label}
            </text>
            <text x={sys.x} y={COL_MID + 10}
              textAnchor="middle"
              fontFamily={EC.font} fontSize={9} fontWeight={300}
              fill={EC.accent}>
              {sys.role}
            </text>
          </g>
        ))}

        {/* ══════ STYLOBATE (foundation 텍스트를 줄 사이에) ══════ */}
        {[0, 1, 2].map((step) => {
          const inset = step * 6;
          const y = STYLO_TOP + step * 16;
          return (
            <line key={`step-${step}`}
              x1={TX - 12 + inset} y1={y}
              x2={TR + 12 - inset} y2={y}
              stroke={EC.black}
              strokeWidth={step === 0 ? EC.lineBold : EC.lineReg} />
          );
        })}
        {/* 1번째 줄과 2번째 줄 사이 */}
        <text x={CX} y={STYLO_TOP + 12}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.gray30}>
          foundation/
        </text>
        {/* 2번째 줄과 3번째 줄 사이 */}
        <text x={CX} y={STYLO_TOP + 28}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray65}>
          philosophy · principles · workflow
        </text>

        {/* ══════ CAPTION ══════ */}
        <text x={CX} y={432}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray50} letterSpacing="0.5px">
          하나의 지붕, 다섯 개의 기둥
        </text>
      </svg>
    </div>
  );
}
