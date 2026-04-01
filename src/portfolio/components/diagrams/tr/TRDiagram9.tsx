/**
 * TRDiagram9 — Lens Swap: Figure-Ground Reversal
 * J.11 Figure-Ground Reversal Board
 * 동일 구조, 반전된 렌즈 → 다른 출력
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  white:     "#FFFFFF",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const VW = 680;

/* ── panel layout ── */
const PW = 280;          // panel width
const PH = 220;          // panel height
const GAP = 40;          // gap between panels
const PL_X = (VW - PW * 2 - GAP) / 2;   // left panel x
const PR_X = PL_X + PW + GAP;             // right panel x
const PY = 70;            // panels top y

/* ── dot pattern specs for left panel (light bg, dark dots) ── */
const DOT_L_SP = 4;
const DOT_L_R = 0.7;
const DOT_L_COLOR = "#333333";

/* ── dot pattern specs for right panel (dark bg, light dots) ── */
const DOT_R_SP = 4;
const DOT_R_R = 0.7;
const DOT_R_COLOR = "#AAAAAA";

/* ── internal row layout within each panel ── */
const ROW_H = 32;
const ROW_GAP = 6;
const ROW_PAD = 16;       // top padding inside panel
const ROW_X_PAD = 14;     // horizontal padding

function rowY(i: number) { return PY + ROW_PAD + i * (ROW_H + ROW_GAP); }

/* ── shared section y ── */
const SHARED_Y = PY + PH + 36;
const OUT_Y = SHARED_Y + 36;

export function TRDiagram9() {
  const leftCx = PL_X + PW / 2;
  const rightCx = PR_X + PW / 2;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 720, padding: "0 16px" }}>
      <svg viewBox={`0 0 ${VW} 460`} width="100%" style={{ display: "block" }} overflow="visible">

        <defs>
          {/* left panel: sparse dots on white */}
          <pattern id="dl" width={DOT_L_SP} height={DOT_L_SP} patternUnits="userSpaceOnUse">
            <circle cx={DOT_L_SP / 2} cy={DOT_L_SP / 2} r={DOT_L_R} fill={DOT_L_COLOR} />
          </pattern>
          {/* right panel: dark fill */}
          <pattern id="dr" width={DOT_R_SP} height={DOT_R_SP} patternUnits="userSpaceOnUse">
            <rect width={DOT_R_SP} height={DOT_R_SP} fill="#222222" />
            <circle cx={DOT_R_SP / 2} cy={DOT_R_SP / 2} r={DOT_R_R} fill={DOT_R_COLOR} />
          </pattern>
        </defs>

        {/* ── title ── */}
        <text x={VW / 2} y="16" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={300}
          fill={EC.black} letterSpacing="2">
          FIGURE-GROUND REVERSAL
        </text>
        <text x={VW / 2} y="32" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="1">
          {"렌즈를 바꾸면 독자가 바뀐다"}
        </text>

        {/* ── panel labels ── */}
        <text x={leftCx} y={PY - 8} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="1.5">
          나의 뉴스룸
        </text>
        <text x={rightCx} y={PY - 8} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="1.5">
          조직의 뉴스룸
        </text>

        {/* ══════ LEFT PANEL: light ground, dark figure ══════ */}
        <rect x={PL_X} y={PY} width={PW} height={PH}
          fill="url(#dl)" stroke="none" />

        {/* internal rows (white cutouts) */}
        {([
          { label: "mcp-memory", sub: "4,686 nodes" },
          { label: "WIM 7렌즈", sub: "개인 프로젝트 · 결정 · 실패" },
          { label: "5W1H apply_point", sub: "" },
        ] as const).map((row, i) => {
          const ry = rowY(i);
          const rx = PL_X + ROW_X_PAD;
          const rw = PW - ROW_X_PAD * 2;
          return (
            <g key={`l${i}`}>
              <rect x={rx} y={ry} width={rw} height={ROW_H}
                fill={EC.white} stroke="none" />
              <text x={rx + 8} y={ry + ROW_H / 2 - 3}
                dominantBaseline="middle"
                fontFamily={EC.font} fontSize={9} fontWeight={200}
                fill={EC.black} letterSpacing="0.5">
                {row.label}
              </text>
              {row.sub && (
                <text x={rx + 8} y={ry + ROW_H / 2 + 9}
                  dominantBaseline="middle"
                  fontFamily={EC.font} fontSize={9} fontWeight={200}
                  fill={EC.gray60} letterSpacing="0.5">
                  {row.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* left output — below panel */}
        <text x={leftCx} y={PY + PH + 14} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"→ context_buffer 상태 3개 제거"}
        </text>

        {/* ══════ RIGHT PANEL: dark ground, light figure ══════ */}
        <rect x={PR_X} y={PY} width={PW} height={PH}
          fill="url(#dr)" stroke="none" />

        {/* internal rows (dark cutouts with light text) */}
        {([
          { label: "조직 knowledge base", sub: "기술 스택 · 진행 프로젝트 · 의사결정" },
          { label: "조직 렌즈", sub: "같은 7렌즈, 내용만 다름" },
          { label: "5W1H apply_point", sub: "" },
        ] as const).map((row, i) => {
          const ry = rowY(i);
          const rx = PR_X + ROW_X_PAD;
          const rw = PW - ROW_X_PAD * 2;
          return (
            <g key={`r${i}`}>
              <rect x={rx} y={ry} width={rw} height={ROW_H}
                fill="#111111" stroke="none" />
              <text x={rx + 8} y={ry + ROW_H / 2 - 3}
                dominantBaseline="middle"
                fontFamily={EC.font} fontSize={9} fontWeight={200}
                fill={EC.white} letterSpacing="0.5">
                {row.label}
              </text>
              {row.sub && (
                <text x={rx + 8} y={ry + ROW_H / 2 + 9}
                  dominantBaseline="middle"
                  fontFamily={EC.font} fontSize={9} fontWeight={200}
                  fill="#888888" letterSpacing="0.5">
                  {row.sub}
                </text>
              )}
            </g>
          );
        })}

        {/* right output — below panel */}
        <text x={rightCx} y={PY + PH + 14} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"→ 인증 서비스 MCP 연동 재검토"}
        </text>

        {/* ── center swap indicator ── */}
        <text x={VW / 2} y={PY + PH / 2 - 4} textAnchor="middle"
          fontFamily={EC.font} fontSize={10} fontWeight={200}
          fill={EC.accent} letterSpacing="0">
          {"↔"}
        </text>
        <text x={VW / 2} y={PY + PH / 2 + 10} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="0.5">
          swap
        </text>

        {/* ── shared section ── */}
        <line x1={PL_X} y1={SHARED_Y - 4} x2={PL_X + PW * 2 + GAP} y2={SHARED_Y - 4}
          stroke={EC.gray85} strokeWidth={EC.lineLight}
          strokeDasharray="2 4" />

        <text x={VW / 2} y={SHARED_Y + 10} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="1">
          공유
        </text>
        <text x={VW / 2} y={SHARED_Y + 24} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"3개 소스 · 3층 해석 체계 · 파이프라인"}
        </text>

        {/* ── output comparison ── */}
        <text x={VW / 2} y={OUT_Y + 10} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="1">
          바뀌는 것
        </text>
        <text x={VW / 2} y={OUT_Y + 24} textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray40} letterSpacing="0.5">
          {"렌즈 정의 · knowledge base · 출력"}
        </text>

        {/* ── footer ── */}
        <text x={VW / 2} y="448" textAnchor="middle"
          fontFamily={EC.font} fontSize={9} fontWeight={200}
          fill={EC.gray60} letterSpacing="1">
          {"코드를 복사하는 게 아니라 렌즈를 바꾸는 것이다"}
        </text>

      </svg>
    </div>
  );
}
