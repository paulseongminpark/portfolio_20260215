/**
 * TRDiagram7 — YouTube 5-Stage Pipeline: Barcode Time Compression
 * C.05 Barcode Facade → time axis
 * 42 vertical lines (42min raw) → 3 lines (apply_point L1/L2/L3)
 * El Croquis Design System
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

/* ── barcode area ── */
const BY = 86;
const BH = 110;
const BB = BY + BH;

/* ── stage x origins ── */
const X1 = 28;
const X2 = 138;
const X3 = 320;
const X4 = 462;
const X5 = 574;

/* ── stage 1: 42 uniform ── */
const N1 = 42;
const SP1 = 2;

/* ── stage 2 & 3: 5 groups ── */
const GRPS = [9, 8, 10, 8, 7];
const GI = 1.8;
const GO = 6;

/* ── stage 4: doubled pairs ── */
const PI = 3;
const PO = 10;

/* ── stage 5 ── */
const SP5 = 10;

/* ── annotation ── */
const AY = BB + 44;
const AL = 13;

function grouped(ox: number) {
  const lines: number[] = [];
  const mids: number[] = [];
  let x = ox;
  for (let g = 0; g < GRPS.length; g++) {
    const n = GRPS[g];
    for (let j = 0; j < n; j++) lines.push(x + j * GI);
    mids.push(x + Math.floor(n / 2) * GI);
    x += n * GI + (g < GRPS.length - 1 ? GO : 0);
  }
  return { lines, mids };
}

export function TRDiagram7() {
  const s2 = grouped(X2);
  const s3 = grouped(X3);
  const bm = BY + BH / 2;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 720, padding: "0 16px" }}>
      <svg viewBox="0 0 680 420" width="100%" style={{ display: "block" }} overflow="visible">

        <defs>
          <marker id="tr7a" viewBox="0 0 6 6" refX="5" refY="3"
            markerWidth="4" markerHeight="4" orient="auto">
            <path d="M0,1 L5,3 L0,5" fill="none" stroke={EC.accent} strokeWidth="1" />
          </marker>
        </defs>

        {/* ── title ── */}
        <text x="340" y="16" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="2">
          BARCODE TIME COMPRESSION
        </text>
        <text x="340" y="32" textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="1">
          {"YouTube Pipeline · 42min → apply_point in ~3min"}
        </text>

        {/* ── stage headers ── */}
        {([
          { x: X1, n: "01", nm: "EXTRACT",   llm: "yt-dlp" },
          { x: X2, n: "02", nm: "STRUCTURE",  llm: "Gemini 2.5 Flash" },
          { x: X3, n: "03", nm: "JUDGE",      llm: "Claude Sonnet" },
          { x: X4, n: "04", nm: "TRANSLATE",  llm: "gpt-4.1-mini" },
          { x: X5, n: "05", nm: "VERIFY",     llm: "" },
        ] as const).map(s => (
          <g key={s.n}>
            <text x={s.x} y={56}
              fontFamily={EC.font} fontSize={8} fontWeight={200}
              fill={EC.gray40} letterSpacing="2">
              {s.n}  {s.nm}
            </text>
            {s.llm && (
              <text x={s.x} y={68}
                fontFamily={EC.font} fontSize={8} fontWeight={200}
                fill={EC.gray60} letterSpacing="0.5">
                {s.llm}
              </text>
            )}
          </g>
        ))}

        {/* ── baseline ── */}
        <line x1={X1} y1={BB} x2={X5 + 22} y2={BB}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ═══ STAGE 1: 42 uniform thin lines ═══ */}
        {Array.from({ length: N1 }, (_, i) => (
          <line key={`a${i}`}
            x1={X1 + i * SP1} y1={BY}
            x2={X1 + i * SP1} y2={BB}
            stroke={EC.black} strokeWidth={EC.lineLight} />
        ))}
        <text x={X1 + (N1 * SP1) / 2} y={BB + 16} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          42min
        </text>

        {/* ═══ STAGE 2: 42 grouped lines ═══ */}
        {s2.lines.map((x, i) => (
          <line key={`b${i}`}
            x1={x} y1={BY} x2={x} y2={BB}
            stroke={EC.black} strokeWidth={EC.lineLight} />
        ))}
        <text
          x={(s2.lines[0] + s2.lines[s2.lines.length - 1]) / 2}
          y={BB + 16} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          5 groups
        </text>

        {/* ═══ STAGE 3: ghost + 5 bold ═══ */}
        {s3.lines.map((x, i) => (
          <line key={`c${i}`}
            x1={x} y1={BY} x2={x} y2={BB}
            stroke={EC.gray90} strokeWidth={EC.lineLight} />
        ))}
        {s3.mids.map((x, i) => (
          <line key={`d${i}`}
            x1={x} y1={BY} x2={x} y2={BB}
            stroke={EC.accent} strokeWidth={EC.lineBold} />
        ))}
        <text
          x={(s3.lines[0] + s3.lines[s3.lines.length - 1]) / 2}
          y={BB + 16} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.accent} letterSpacing="0.5">
          5 key
        </text>

        {/* ── recall() side annotation ── */}
        <line
          x1={X3 - 22} y1={bm}
          x2={X3 - 4}  y2={bm}
          stroke={EC.accent} strokeWidth={EC.lineReg}
          strokeDasharray="3 3"
          markerEnd="url(#tr7a)" />
        <text x={X3 - 26} y={bm - 8} textAnchor="end"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.accent} letterSpacing="0.5">
          recall()
        </text>
        <text x={X3 - 26} y={bm + 4} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          mcp-memory
        </text>
        <text x={X3 - 26} y={bm + 14} textAnchor="end"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          4,900 nodes
        </text>

        {/* ═══ STAGE 4: 5 doubled lines ═══ */}
        {Array.from({ length: 5 }, (_, i) => {
          const bx = X4 + i * (PI + PO);
          return (
            <g key={`e${i}`}>
              <line x1={bx} y1={BY} x2={bx} y2={BB}
                stroke={EC.accent} strokeWidth={EC.lineBold} />
              <line x1={bx + PI} y1={BY} x2={bx + PI} y2={BB}
                stroke={EC.accent} strokeWidth={EC.lineReg} />
            </g>
          );
        })}
        <text x={X4 + 2 * (PI + PO)} y={BB + 16} textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          ×2
        </text>

        {/* ═══ STAGE 5: 3 final lines ═══ */}
        {[0, 1, 2].map(i => (
          <line key={`f${i}`}
            x1={X5 + i * SP5} y1={BY}
            x2={X5 + i * SP5} y2={BB}
            stroke={EC.accent} strokeWidth={EC.lineBold} />
        ))}
        {(["L1", "L2", "L3"] as const).map((l, i) => (
          <text key={l} x={X5 + i * SP5} y={BB + 14} textAnchor="middle"
            fontFamily={EC.font} fontSize={7} fontWeight={200}
            fill={EC.accent} letterSpacing="0.5">
            {l}
          </text>
        ))}

        {/* ── separator ── */}
        <line x1={X1} y1={BB + 28} x2={X5 + 22} y2={BB + 28}
          stroke={EC.gray85} strokeWidth={EC.lineLight}
          strokeDasharray="2 4" />

        {/* ═══ ANNOTATIONS ═══ */}

        {/* Stage 1 */}
        <text x={X1} y={AY}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"자막: 수동 → 자동 → 없음"}
        </text>
        <text x={X1} y={AY + AL * 1.3}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          [fallback]
        </text>
        <text x={X1} y={AY + AL * 2.3}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          Groq Whisper
        </text>
        <text x={X1} y={AY + AL * 3.3}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          {"오디오 추출 · 25MB → 10min 분할"}
        </text>
        <text x={X1} y={AY + AL * 4.3}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          whisper-large-v3
        </text>

        {/* Stage 2 */}
        <text x={X2} y={AY}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          섹션별 핵심
        </text>
        <text x={X2} y={AY + AL}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          기술 스택
        </text>
        <text x={X2} y={AY + AL * 2}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          key takeaways
        </text>

        {/* Stage 3 */}
        <text x={X3} y={AY}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.accent} letterSpacing="0.5">
          5W1H apply_point
        </text>
        <text x={X3} y={AY + AL}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          L1 즉시적용
        </text>
        <text x={X3} y={AY + AL * 2}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          L2 설계참고
        </text>
        <text x={X3} y={AY + AL * 3}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          L3 사고자극
        </text>

        {/* Stage 4 */}
        <text x={X4} y={AY}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"영 → 한"}
        </text>
        <text x={X4} y={AY + AL}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          기술 용어 유지
        </text>
        <text x={X4} y={AY + AL * 2}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          {"KR > 30% → skip"}
        </text>

        {/* Stage 5 */}
        <text x={X5} y={AY}
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"인용문 ↔ 원문"}
        </text>
        <text x={X5} y={AY + AL}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          {"불일치 → 삭제"}
        </text>
        <text x={X5} y={AY + AL * 2}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          {"JSON → git push"}
        </text>

        {/* ── footer ── */}
        <text x="340" y="408" textAnchor="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="1.5">
          {"ALL MODELS FREE  ·  TOTAL ~3MIN"}
        </text>

      </svg>
    </div>
  );
}
