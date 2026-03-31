/**
 * TRDiagram6 — Pipeline Floor Plan (Facade Grid)
 * A: 타이포 + 선 위계 교정 (weight/letterSpacing/선 스타일)
 * B: 셀 폭 차등화 (collect=70 / process=90 / judge=120)
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray20:    "#333333",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* ── Fill densities ── */
const F = {
  light:  "rgba(0,0,0,0.04)",
  mid:    "rgba(0,0,0,0.10)",
  heavy:  "rgba(0,0,0,0.20)",
  accent: EC.accent,
} as const;

/* ── Cell widths by role (B: 차등화) ── */
const W = {
  collect:  70,   // 수집/출력 — 단순 I/O
  process:  90,   // 추출/변환/분석 — 중간 처리
  judge:   120,   // Claude/핵심 판단 — 최대 폭
  verify:   70,   // 검증
} as const;

const CH  = 64;   // cell height (고정)
const GAP =  8;   // 셀 간 간격 (6 → 8, 여백 강화)
const PAD = 10;   // inner rect padding

/* ── Row Y positions ── */
const R1_Y = 60;
const R2_Y = R1_Y + CH + 44;
const R3_Y = R2_Y + CH + 44;

/* ── Cell type ── */
interface Cell { label: string; sub: string; fill: string; w: number }

/* ── Cell data ── */
const DAILY: Cell[] = [
  { label: "수집",   sub: "HN · RSS · arXiv",  fill: F.light,  w: W.collect  },
  { label: "선별",   sub: "교차 출현",           fill: F.light,  w: W.collect  },
  { label: "추출",   sub: "curl  4,000자",       fill: F.mid,    w: W.process  },
  { label: "가공",   sub: "Claude Sonnet",       fill: F.accent, w: W.judge    },
];

const YOUTUBE: Cell[] = [
  { label: "추출",   sub: "yt-dlp · Groq",      fill: F.mid,    w: W.process  },
  { label: "구조화", sub: "Gemini Flash",         fill: F.heavy,  w: W.process  },
  { label: "판단",   sub: "Claude + recall",      fill: F.accent, w: W.judge    },
  { label: "번역",   sub: "gpt-4.1-mini",         fill: F.mid,    w: W.collect  },
  { label: "검증",   sub: "원문 대조",             fill: F.light,  w: W.verify   },
];

const TWITTER: Cell[] = [
  { label: "수집",   sub: "Chrome CDP",           fill: F.light,  w: W.collect  },
  { label: "분석",   sub: "gpt-4.1-mini",         fill: F.heavy,  w: W.process  },
];

/* ── 가변 폭 x 좌표 계산 ── */
function cxOf(col: number, cells: Cell[], offset: number): number {
  let x = offset;
  for (let i = 0; i < col; i++) x += cells[i].w + GAP;
  return x;
}

/* ── Row offsets (BIG-style stagger 유지) ── */
const D_X = 28;
const Y_X = 60;

/* TWITTER: YOUTUBE의 3번째 셀(judge=120)이 끝나는 지점에 정렬 */
const T_X = Y_X
  + YOUTUBE[0].w + GAP   // 추출
  + YOUTUBE[1].w + GAP   // 구조화
  + YOUTUBE[2].w + GAP;  // 판단 — 여기서부터 시작

/* ── Cell renderer ── */
function CellRect({ x, y, cell }: { x: number; y: number; cell: Cell }) {
  const isAccent = cell.fill === F.accent;
  const iw = cell.w - PAD * 2;
  const ih = CH - PAD * 2;
  return (
    <g>
      {/* outer border */}
      <rect x={x} y={y} width={cell.w} height={CH} rx={0}
        fill="none" stroke={EC.black} strokeWidth={EC.lineReg} />

      {/* inner fill */}
      <rect x={x + PAD} y={y + PAD} width={iw} height={ih} rx={0}
        fill={cell.fill} stroke="none" />

      {/* label — A: letterSpacing 추가 */}
      <text x={x + cell.w / 2} y={y + CH / 2 - 7}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily={EC.font} fontSize={9} fontWeight={300}
        letterSpacing="0.5"
        fill={isAccent ? "#FFFFFF" : EC.black}>
        {cell.label}
      </text>

      {/* sub — A: letterSpacing 추가 */}
      <text x={x + cell.w / 2} y={y + CH / 2 + 8}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily={EC.font} fontSize={7} fontWeight={200}
        letterSpacing="0.5"
        fill={isAccent ? "rgba(255,255,255,0.75)" : EC.gray60}>
        {cell.sub}
      </text>
    </g>
  );
}

export function TRDiagram6() {
  /* Claude 셀 중심 x (수직 annotation 좌표) */
  const dailyClaudeX   = cxOf(3, DAILY,   D_X) + DAILY[3].w   / 2;
  const youtubeClaudeX = cxOf(2, YOUTUBE, Y_X) + YOUTUBE[2].w / 2;

  /* gpt-4.1 셀 중심 x */
  const youtubeGptX = cxOf(3, YOUTUBE, Y_X) + YOUTUBE[3].w / 2;
  const twitterGptX = cxOf(1, TWITTER, T_X) + TWITTER[1].w / 2;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 720, padding: "0 16px" }}>
      <svg viewBox="0 0 660 390" width="100%" style={{ display: "block" }} overflow="visible">

        {/* ── title ── */}
        <text x="330" y="18" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="2">
          PIPELINE FLOOR PLAN
        </text>

        {/* ══════ DAILY ══════ */}
        {/* A: weight 300→200, letterSpacing 1px→2px */}
        <text x={D_X} y={R1_Y - 10}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="2">
          01  DAILY  05:03
        </text>
        {DAILY.map((cell, i) => (
          <CellRect key={`d${i}`} x={cxOf(i, DAILY, D_X)} y={R1_Y} cell={cell} />
        ))}
        {/* flow connectors */}
        {DAILY.slice(0, -1).map((cell, i) => {
          const x1 = cxOf(i, DAILY, D_X) + cell.w;
          const x2 = cxOf(i + 1, DAILY, D_X);
          const cy = R1_Y + CH / 2;
          return (
            <line key={`da${i}`}
              x1={x1} y1={cy} x2={x2} y2={cy}
              stroke={EC.gray85} strokeWidth={EC.lineLight} />
          );
        })}

        {/* ══════ YOUTUBE ══════ */}
        <text x={Y_X} y={R2_Y - 10}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="2">
          02  YOUTUBE  05:23
        </text>
        {YOUTUBE.map((cell, i) => (
          <CellRect key={`y${i}`} x={cxOf(i, YOUTUBE, Y_X)} y={R2_Y} cell={cell} />
        ))}
        {YOUTUBE.slice(0, -1).map((cell, i) => {
          const x1 = cxOf(i, YOUTUBE, Y_X) + cell.w;
          const x2 = cxOf(i + 1, YOUTUBE, Y_X);
          const cy = R2_Y + CH / 2;
          return (
            <line key={`ya${i}`}
              x1={x1} y1={cy} x2={x2} y2={cy}
              stroke={EC.gray85} strokeWidth={EC.lineLight} />
          );
        })}

        {/* ══════ TWITTER ══════ */}
        <text x={T_X} y={R3_Y - 10}
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="2">
          03  TWITTER  05:43
        </text>
        {TWITTER.map((cell, i) => (
          <CellRect key={`t${i}`} x={cxOf(i, TWITTER, T_X)} y={R3_Y} cell={cell} />
        ))}
        <line
          x1={cxOf(0, TWITTER, T_X) + TWITTER[0].w} y1={R3_Y + CH / 2}
          x2={cxOf(1, TWITTER, T_X)}                 y2={R3_Y + CH / 2}
          stroke={EC.gray85} strokeWidth={EC.lineLight} />

        {/* ══════ Claude 공유 경로 — A: 1.5px solid → 0.5px dashed annotation ══════ */}
        <line
          x1={dailyClaudeX}   y1={R1_Y + CH + 2}
          x2={youtubeClaudeX} y2={R2_Y - 2}
          stroke={EC.accent} strokeWidth={EC.lineReg}
          strokeDasharray="3 4" />

        {/* Claude annotation label */}
        <text
          x={(dailyClaudeX + youtubeClaudeX) / 2 - 6}
          y={(R1_Y + CH + R2_Y) / 2}
          textAnchor="end" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.accent} letterSpacing="0.5">
          Claude  공유
        </text>

        {/* ══════ gpt-4.1-mini 공유 경로 ══════ */}
        <line
          x1={youtubeGptX} y1={R2_Y + CH + 2}
          x2={twitterGptX} y2={R3_Y - 2}
          stroke={EC.gray40} strokeWidth={EC.lineLight}
          strokeDasharray="3 4" />

        <text
          x={youtubeGptX + 8}
          y={(R2_Y + CH + R3_Y) / 2}
          dominantBaseline="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          4.1-mini  공유
        </text>

        {/* ══════ legend ══════ */}
        {([
          { fill: F.light,  label: "입출력"   },
          { fill: F.mid,    label: "추출/변환" },
          { fill: F.heavy,  label: "LLM 가공"  },
          { fill: F.accent, label: "핵심 판단" },
        ] as const).map((it, i) => (
          <g key={i}>
            <rect x={28 + i * 110} y={360} width={12} height={8} rx={0}
              fill="none" stroke={EC.black} strokeWidth={EC.lineLight} />
            <rect x={31 + i * 110} y={362} width={6} height={4} rx={0}
              fill={it.fill} stroke="none" />
            {/* A: letterSpacing 추가 */}
            <text x={46 + i * 110} y={366}
              dominantBaseline="middle"
              fontFamily={EC.font} fontSize={7} fontWeight={200}
              letterSpacing="0.5"
              fill={EC.gray60}>
              {it.label}
            </text>
          </g>
        ))}

        {/* ── caption ── */}
        <text x="330" y="383" textAnchor="middle"
          fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          셀 폭 = 처리 비중.  빨간 점선 = Claude Sonnet 공유 경로.
        </text>

      </svg>
    </div>
  );
}
