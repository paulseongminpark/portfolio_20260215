/**
 * TRDiagram2 — 3-Source Architecture (Cross Section)
 * 3개 파이프라인을 건축 단면도로. 높이=처리 깊이, 폭=소스 복잡도.
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
  lineHeavy: 1.5,
} as const;

/* ── Layout ── */
const GY = 310;
const FH = 32;
const FG = 2;
const STEP = FH + FG;

/* ── Buildings ── */
interface Floor { step: string; model: string; accent?: boolean }
interface Bldg { label: string; sub: string; x: number; w: number; floors: Floor[]; sources: string[] }

const B: Bldg[] = [
  {
    label: "DAILY POST", sub: "속도",
    x: 30, w: 250,
    floors: [
      { step: "수집",  model: "HN · RSS · Reddit · arXiv" },
      { step: "선별",  model: "교차출현 · 도메인매치 · 중복감점" },
      { step: "추출",  model: "curl 4,000자" },
      { step: "가공",  model: "Claude Sonnet", accent: true },
    ],
    sources: ["HN API", "TechCrunch", "Lobsters", "+요일별 2–9"],
  },
  {
    label: "YOUTUBE", sub: "깊이",
    x: 310, w: 190,
    floors: [
      { step: "추출",  model: "yt-dlp → Groq Whisper" },
      { step: "구조화", model: "Gemini 2.5 Flash" },
      { step: "판단",  model: "Claude Sonnet + recall()", accent: true },
      { step: "번역",  model: "gpt-4.1-mini" },
      { step: "검증",  model: "인용문 ↔ 원문 대조" },
    ],
    sources: ["claude", "build", "design", "insight", "ontology"],
  },
  {
    label: "TWITTER", sub: "시야",
    x: 530, w: 140,
    floors: [
      { step: "수집",  model: "Chrome CDP" },
      { step: "분석",  model: "gpt-4.1-mini" },
    ],
    sources: ["X 북마크"],
  },
];

/* ── Weekly Schedule ── */
const WEEK = [
  { d: "월", t: "AI/ML",  n: 12 },
  { d: "화", t: "빅테크",  n: 6 },
  { d: "수", t: "스타트업", n: 5 },
  { d: "목", t: "오픈소스", n: 9 },
  { d: "금", t: "HW",     n: 6 },
  { d: "토", t: "사례",    n: 7 },
  { d: "일", t: "종합",    n: -1 },
];

function fy(i: number) { return GY - (i + 1) * STEP; }

/* ── Building ── */
function Section({ b }: { b: Bldg }) {
  const nf = b.floors.length;
  const roofY = fy(nf - 1);
  const cx = b.x + b.w / 2;

  return (
    <g>
      {/* roof */}
      <line x1={b.x} y1={roofY} x2={b.x + b.w} y2={roofY}
        stroke={EC.black} strokeWidth={EC.lineReg} />
      {/* walls */}
      <line x1={b.x} y1={roofY} x2={b.x} y2={GY}
        stroke={EC.black} strokeWidth={EC.lineReg} />
      <line x1={b.x + b.w} y1={roofY} x2={b.x + b.w} y2={GY}
        stroke={EC.black} strokeWidth={EC.lineReg} />

      {/* floors */}
      {b.floors.map((f, i) => {
        const y = fy(i);
        const ac = !!f.accent;
        return (
          <g key={i}>
            <line x1={b.x} y1={y} x2={b.x + b.w} y2={y}
              stroke={ac ? EC.accent : EC.gray85}
              strokeWidth={ac ? EC.lineBold : EC.lineLight} />
            {ac && (
              <rect x={b.x + 1} y={y - FH + 1} width={b.w - 2} height={FH - 2}
                fill="rgba(204, 0, 0, 0.03)" />
            )}
            <text x={b.x + 10} y={y - FH / 2 + 1}
              dominantBaseline="middle"
              fontFamily={EC.font} fontSize={9} fontWeight={300}
              fill={ac ? EC.accent : EC.black}>
              {f.step}
            </text>
            <text x={b.x + b.w - 10} y={y - FH / 2 + 1}
              textAnchor="end" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={200}
              fill={ac ? EC.accent : EC.gray60}>
              {f.model}
            </text>
          </g>
        );
      })}

      {/* label above */}
      <text x={cx} y={roofY - 52}
        textAnchor="middle"
        fontFamily={EC.font} fontSize={9} fontWeight={300}
        fill={EC.black} letterSpacing="1.5px">
        {b.label}
      </text>
      <text x={cx} y={roofY - 40}
        textAnchor="middle"
        fontFamily={EC.font} fontSize={8} fontWeight={200}
        fill={EC.gray60} letterSpacing="0.5px">
        {b.sub}
      </text>

      {/* sources below ground */}
      {b.sources.map((src, i) => (
        <g key={`s${i}`}>
          <circle cx={b.x + 14} cy={GY + 18 + i * 14} r={2}
            fill="none" stroke={EC.gray60} strokeWidth={EC.lineReg} />
          <text x={b.x + 22} y={GY + 19 + i * 14}
            dominantBaseline="middle"
            fontFamily={EC.font} fontSize={8} fontWeight={200}
            fill={EC.gray60}>
            {src}
          </text>
        </g>
      ))}

    </g>
  );
}

/* ── Weekly Bar ── */
function WeekBar() {
  const bx = B[0].x;
  const bw = B[0].w;
  const cw = bw / 7;
  const by = GY + 88;

  return (
    <g>
      <line x1={bx} y1={by} x2={bx + bw} y2={by}
        stroke={EC.gray85} strokeWidth={EC.lineLight} />
      <line x1={bx + bw / 2} y1={GY + 74} x2={bx + bw / 2} y2={by}
        stroke={EC.gray90} strokeWidth={EC.lineLight} strokeDasharray="2 2" />
      <text x={bx - 4} y={by + 14} textAnchor="end"
        fontFamily={EC.font} fontSize={8} fontWeight={200}
        fill={EC.gray60} letterSpacing="1px">
        요일
      </text>
      {WEEK.map((w, i) => {
        const cx = bx + i * cw + cw / 2;
        const sun = i === 6;
        return (
          <g key={i}>
            {i > 0 && (
              <line x1={bx + i * cw} y1={by + 2} x2={bx + i * cw} y2={by + 42}
                stroke={EC.gray90} strokeWidth={EC.lineLight} />
            )}
            <text x={cx} y={by + 14} textAnchor="middle"
              fontFamily={EC.font} fontSize={9} fontWeight={300}
              fill={sun ? EC.accent : EC.black}>
              {w.d}
            </text>
            <text x={cx} y={by + 27} textAnchor="middle"
              fontFamily={EC.font} fontSize={7} fontWeight={200}
              fill={EC.gray60}>
              {w.t}
            </text>
            <text x={cx} y={by + 39} textAnchor="middle"
              fontFamily={EC.font} fontSize={8} fontWeight={200}
              fill={sun ? EC.accent : EC.gray60}
              style={{ fontVariantNumeric: "tabular-nums" }}>
              {sun ? "합산" : w.n}
            </text>
          </g>
        );
      })}
      <line x1={bx} y1={by + 46} x2={bx + bw} y2={by + 46}
        stroke={EC.gray85} strokeWidth={EC.lineLight} />
    </g>
  );
}

/* ── Main ── */
export function TRDiagram2() {
  return (
    <div style={{
      margin: "48px auto 40px",
      maxWidth: 720,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 710 490" width="100%" style={{ display: "block" }} overflow="visible">

        {/* title */}
        <text x="340" y="40" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="1.5px">
          3-SOURCE ARCHITECTURE
        </text>

        {/* ground line — section cut */}
        <line x1="16" y1={GY} x2="664" y2={GY}
          stroke={EC.black} strokeWidth={EC.lineHeavy} />

        {/* left annotation */}
        <line x1={-20} y1={GY} x2={16} y2={GY}
          stroke={EC.accent} strokeWidth={EC.lineBold} />
        <polygon points={`8,${GY - 3} 8,${GY + 3} 16,${GY}`}
          fill={EC.accent} />
        <text x="-24" y={GY + 1}
          textAnchor="end" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          {"mcp-memory ; recall()"}
        </text>

        {/* right annotation */}
        <polygon points={`662,${GY - 3} 662,${GY + 3} 670,${GY}`}
          fill={EC.accent} />
        <text x="706" y={GY + 1}
          textAnchor="end" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60}>
          git push
        </text>

        {/* ground hatch */}
        {Array.from({ length: 28 }).map((_, i) => (
          <line key={`h${i}`}
            x1={16 + i * 24} y1={GY + 1}
            x2={16 + i * 24 - 8} y2={GY + 9}
            stroke={EC.gray90} strokeWidth={EC.lineLight} />
        ))}

        {/* buildings */}
        {B.map(b => <Section key={b.label} b={b} />)}

        {/* weekly bar */}
        <WeekBar />

        {/* time */}
        <text x="660" y="58" textAnchor="end"
          fontFamily={EC.font} fontSize={8} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          05:03 — 05:23 — 05:43
        </text>

        {/* caption */}
        <text x="340" y="480" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5px">
          높이 = 처리 깊이, 폭 = 소스 복잡도. 세 파이프라인은 독립적으로 실행된다.
        </text>
      </svg>
    </div>
  );
}
