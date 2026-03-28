/**
 * 다이어그램 1 — 타입 팽창 그래프: 26(v0.1) → 52(v2.0)
 * El Croquis Design System 적용 (실험)
 */

/* ── El Croquis Local Tokens ── */
const EC = {
  accent:     "#CC0000",
  black:      "#000000",
  gray40:     "#666666",
  gray60:     "#999999",
  gray85:     "#D8D8D8",
  gray90:     "#E8E8E8",
  font:       "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight:  0.35,
  lineReg:    0.5,
  lineBold:   0.75,
} as const;

/* ── Layout ── */
const LC = 150;           // left cluster center
const RC = 490;           // right cluster center
const MID = (LC + RC) / 2;

/* ── Node Data ── */
interface N { id: string; x: number; y: number; r: number }

const leftNodes: N[] = [
  { id: "L0", x: LC,      y: 160, r: 7 },
  { id: "L1", x: LC + 38, y: 128, r: 7 },
  { id: "L2", x: LC - 32, y: 188, r: 7 },
  { id: "L3", x: LC + 16, y: 212, r: 7 },
  { id: "L4", x: LC + 52, y: 180, r: 7 },
  { id: "L5", x: LC - 54, y: 162, r: 7 },
  { id: "L6", x: LC + 44, y: 150, r: 7 },
  { id: "L7", x: LC - 10, y: 196, r: 7 },
  { id: "L8", x: LC - 24, y: 134, r: 7 },
];

const rightExisting: N[] = [
  { id: "R0", x: RC - 64, y: 118, r: 6 },
  { id: "R1", x: RC - 38, y: 136, r: 6 },
  { id: "R2", x: RC - 12, y: 120, r: 6 },
  { id: "R3", x: RC + 14, y: 138, r: 6 },
  { id: "R4", x: RC + 40, y: 122, r: 6 },
  { id: "R5", x: RC + 64, y: 140, r: 6 },
  { id: "R6", x: RC - 72, y: 158, r: 6 },
  { id: "R7", x: RC - 46, y: 174, r: 6 },
  { id: "R8", x: RC - 14, y: 160, r: 6 },
];

const rightNew: N[] = [
  { id: "R9",  x: RC + 12, y: 176, r: 6 },
  { id: "R10", x: RC + 40, y: 162, r: 6 },
  { id: "R11", x: RC + 64, y: 178, r: 6 },
  { id: "R12", x: RC - 56, y: 198, r: 6 },
  { id: "R13", x: RC - 28, y: 212, r: 6 },
  { id: "R14", x: RC,      y: 198, r: 6 },
  { id: "R15", x: RC + 26, y: 214, r: 6 },
  { id: "R16", x: RC + 50, y: 200, r: 6 },
  { id: "R17", x: RC + 68, y: 164, r: 6 },
];

const allRight = [...rightExisting, ...rightNew];
const allNodes = [...leftNodes, ...allRight];
const nodeMap = new Map(allNodes.map(n => [n.id, n]));

/* ── Edge Data ── */
type E = [string, string];

const leftEdges: E[] = [
  ["L0","L1"], ["L0","L2"], ["L1","L4"], ["L2","L3"],
  ["L3","L4"], ["L5","L0"], ["L6","L1"], ["L7","L3"], ["L8","L5"],
];

const rightEdges: E[] = [
  ["R0","R1"],  ["R1","R2"],  ["R2","R3"],  ["R3","R4"],  ["R4","R5"],
  ["R6","R7"],  ["R7","R8"],  ["R8","R9"],  ["R9","R10"], ["R10","R11"],
  ["R12","R13"],["R13","R14"],["R14","R15"],["R15","R16"],["R16","R17"],
  ["R6","R0"],  ["R12","R6"], ["R7","R1"],  ["R13","R7"],
  ["R8","R2"],  ["R14","R8"], ["R9","R3"],  ["R15","R9"],
  ["R10","R4"], ["R16","R10"],["R11","R5"], ["R17","R11"],
];

/* ── Render Helpers ── */
const newIds = new Set(rightNew.map(n => n.id));

function EdgeLine({ from, to }: { from: string; to: string }) {
  const a = nodeMap.get(from), b = nodeMap.get(to);
  if (!a || !b) return null;
  const isAccent = newIds.has(from) || newIds.has(to);
  return (
    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
      stroke={isAccent ? EC.accent : EC.gray85}
      strokeWidth={isAccent ? EC.lineReg : EC.lineLight}
      opacity={isAccent ? 0.4 : 1} />
  );
}

/* ── Timeline ── */
const TL_Y = 272;
const events = [
  { x: MID - 84, label: "들뢰즈 도입" },
  { x: MID,      label: "헤비안 학습" },
  { x: MID + 84, label: "9개 AI 리서치" },
];

/* ── Component ── */
export function Diagram1() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 680,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 640 400" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="ec-arrow-1" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="5" markerHeight="4" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray60} />
          </marker>
        </defs>

        {/* ── Edges (behind nodes) ── */}
        {leftEdges.map(([f, t], i) => <EdgeLine key={`le${i}`} from={f} to={t} />)}
        {rightEdges.map(([f, t], i) => <EdgeLine key={`re${i}`} from={f} to={t} />)}

        {/* ── Left Nodes: v0.1 — stroke only, black ── */}
        {leftNodes.map(n => (
          <circle key={n.id} cx={n.x} cy={n.y} r={n.r}
            fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Right Existing Nodes — stroke only, black ── */}
        {rightExisting.map(n => (
          <circle key={n.id} cx={n.x} cy={n.y} r={n.r}
            fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
        ))}

        {/* ── Right New Nodes — accent stroke ── */}
        {rightNew.map(n => (
          <circle key={n.id} cx={n.x} cy={n.y} r={n.r}
            fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
        ))}

        {/* ── Hero Numbers ── */}
        <text x={LC} y={72} textAnchor="middle"
          fontFamily={EC.font} fontSize={36} fontWeight={200}
          fill={EC.black}
          style={{ fontVariantNumeric: "tabular-nums" }}>
          26
        </text>
        <text x={LC} y={90} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          {"TYPES · V0.1"}
        </text>

        <text x={RC} y={72} textAnchor="middle"
          fontFamily={EC.font} fontSize={36} fontWeight={200}
          fill={EC.black}
          style={{ fontVariantNumeric: "tabular-nums" }}>
          52
        </text>
        <text x={RC} y={90} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={300}
          fill={EC.gray60} letterSpacing="1.5px">
          {"TYPES · V2.0"}
        </text>

        {/* ── Timeline ── */}
        <line x1={MID - 136} y1={TL_Y} x2={MID + 136} y2={TL_Y}
          stroke={EC.gray85} strokeWidth={EC.lineLight}
          markerEnd="url(#ec-arrow-1)" />

        {events.map((ev, i) => (
          <g key={i}>
            <circle cx={ev.x} cy={TL_Y} r={1.5}
              fill={EC.accent} stroke="none" />
            <line x1={ev.x} y1={TL_Y + 3} x2={ev.x} y2={TL_Y + 18}
              stroke={EC.gray90} strokeWidth={EC.lineLight} />
            <text x={ev.x} y={TL_Y + 30} textAnchor="middle"
              fontFamily={EC.font} fontSize={9} fontWeight={200}
              fill={EC.gray60}>
              {ev.label}
            </text>
          </g>
        ))}

        {/* ── Legend ── */}
        <g>
          <circle cx={MID - 100} cy={340} r={3.5}
            fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
          <text x={MID - 92} y={341} dominantBaseline="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={200}
            fill={EC.gray60} letterSpacing="0.5px">
            V0.1 기존
          </text>

          <circle cx={MID - 28} cy={340} r={3.5}
            fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />
          <text x={MID - 20} y={341} dominantBaseline="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={200}
            fill={EC.gray60} letterSpacing="0.5px">
            유지
          </text>

          <circle cx={MID + 28} cy={340} r={3.5}
            fill="none" stroke={EC.accent} strokeWidth={EC.lineBold} />
          <text x={MID + 36} y={341} dominantBaseline="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={200}
            fill={EC.gray60} letterSpacing="0.5px">
            V2.0 신규
          </text>
        </g>

        {/* ── Caption ── */}
        <text x={MID} y={372} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          온톨로지 타입이 설계 과정에서 팽창하는 궤적
        </text>
      </svg>
    </div>
  );
}
