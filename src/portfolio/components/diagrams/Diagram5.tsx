/** 다이어그램 5 — 3중 검색 아키텍처: Vector + FTS5 + Graph → RRF 합류 → Hebbian feedback */
export function Diagram5() {
  const W = 780;
  const H = 420;

  // 색상 토큰
  const bgCard = "#f8f6f3";
  const blue = "#dbeafe";
  const blueBorder = "#93c5fd";
  const yellow = "#fef3c7";
  const yellowBorder = "#fcd34d";
  const gray = "#f3f4f6";
  const grayBorder = "#d1d5db";
  const accent = "#D4632D";
  const textDark = "#333";
  const textMid = "#777";
  const arrowColor = "#999";

  // 박스 렌더 헬퍼
  function Box({ x, y, w, h, fill, stroke, label, sub }: {
    x: number; y: number; w: number; h: number;
    fill: string; stroke: string; label: string; sub?: string;
  }) {
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={6} fill={fill} stroke={stroke} strokeWidth={1.5} />
        <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 1)} textAnchor="middle" dominantBaseline="middle"
          fontFamily="Inter, sans-serif" fontSize={12} fontWeight={600} fill={textDark}>
          {label}
        </text>
        {sub && (
          <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" dominantBaseline="middle"
            fontFamily="Inter, sans-serif" fontSize={9} fill={textMid}>
            {sub}
          </text>
        )}
      </g>
    );
  }

  // 작은 라벨 박스
  function SmallBox({ x, y, w, h, label }: {
    x: number; y: number; w: number; h: number; label: string;
  }) {
    return (
      <g>
        <rect x={x} y={y} width={w} height={h} rx={4} fill={gray} stroke={grayBorder} strokeWidth={1} />
        <text x={x + w / 2} y={y + h / 2 + 1} textAnchor="middle" dominantBaseline="middle"
          fontFamily="Inter, sans-serif" fontSize={9} fill={textMid}>
          {label}
        </text>
      </g>
    );
  }

  // 화살표 (수직)
  function ArrowV({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
    return (
      <g>
        <line x1={x} y1={y1} x2={x} y2={y2 - 4} stroke={arrowColor} strokeWidth={1.2} />
        <polygon points={`${x - 3.5},${y2 - 6} ${x + 3.5},${y2 - 6} ${x},${y2}`} fill={arrowColor} />
      </g>
    );
  }

  // 화살표 (수평)
  function ArrowH({ y, x1, x2 }: { y: number; x1: number; x2: number }) {
    const dir = x2 > x1 ? 1 : -1;
    return (
      <g>
        <line x1={x1} y1={y} x2={x2 - dir * 4} y2={y} stroke={arrowColor} strokeWidth={1.2} />
        <polygon points={`${x2 - dir * 6},${y - 3.5} ${x2 - dir * 6},${y + 3.5} ${x2},${y}`} fill={arrowColor} />
      </g>
    );
  }

  // 레이아웃 좌표
  const queryX = 330, queryY = 20, queryW = 100, queryH = 36;

  const vecX = 120, searchY = 110, searchW = 140, searchH = 44;
  const ftsX = 310;
  const graphX = 500;

  const rrfY = 220, rrfX = 290, rrfW = 180, rrfH = 44;
  const hebbY = 320, hebbX = 270, hebbW = 220, hebbH = 44;

  return (
    <div style={{ background: bgCard, borderRadius: 12, padding: "32px 24px 24px", margin: "24px 0" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* 쿼리 입력 */}
        <Box x={queryX} y={queryY} w={queryW} h={queryH}
          fill={yellow} stroke={yellowBorder} label="recall()" sub="query" />

        {/* 쿼리 → 3개 채널 분기 화살표 */}
        <ArrowV x={queryX + queryW / 2} y1={queryY + queryH} y2={searchY} />
        <line x1={queryX + queryW / 2} y1={queryY + queryH + 20} x2={vecX + searchW / 2} y2={queryY + queryH + 20}
          stroke={arrowColor} strokeWidth={1.2} />
        <ArrowV x={vecX + searchW / 2} y1={queryY + queryH + 20} y2={searchY} />
        <line x1={queryX + queryW / 2} y1={queryY + queryH + 20} x2={graphX + searchW / 2} y2={queryY + queryH + 20}
          stroke={arrowColor} strokeWidth={1.2} />
        <ArrowV x={graphX + searchW / 2} y1={queryY + queryH + 20} y2={searchY} />

        {/* 3중 검색 채널 */}
        <Box x={vecX} y={searchY} w={searchW} h={searchH}
          fill={blue} stroke={blueBorder} label="Vector" sub="ChromaDB 3072d" />
        <Box x={ftsX} y={searchY} w={searchW} h={searchH}
          fill={blue} stroke={blueBorder} label="FTS5" sub="한글 trigram" />
        <Box x={graphX} y={searchY} w={searchW} h={searchH}
          fill={blue} stroke={blueBorder} label="Graph" sub="NetworkX UCB" />

        {/* 3채널 → RRF 합류 */}
        <ArrowV x={vecX + searchW / 2} y1={searchY + searchH} y2={rrfY} />
        <line x1={vecX + searchW / 2} y1={searchY + searchH + 22} x2={rrfX + rrfW / 2} y2={searchY + searchH + 22}
          stroke={arrowColor} strokeWidth={1.2} />
        <ArrowV x={ftsX + searchW / 2} y1={searchY + searchH} y2={rrfY} />
        <ArrowV x={graphX + searchW / 2} y1={searchY + searchH} y2={rrfY} />
        <line x1={graphX + searchW / 2} y1={searchY + searchH + 22} x2={rrfX + rrfW / 2} y2={searchY + searchH + 22}
          stroke={arrowColor} strokeWidth={1.2} />

        {/* RRF 합류 */}
        <Box x={rrfX} y={rrfY} w={rrfW} h={rrfH}
          fill={yellow} stroke={yellowBorder} label="RRF Fusion" sub="K=18" />

        {/* RRF → Hebbian */}
        <ArrowV x={rrfX + rrfW / 2} y1={rrfY + rrfH} y2={hebbY} />

        {/* Hebbian feedback */}
        <Box x={hebbX} y={hebbY} w={hebbW} h={hebbH}
          fill={blue} stroke={blueBorder} label="Hebbian Feedback" sub="edge frequency +1" />

        {/* 피드백 루프 화살표 (오른쪽으로 올라감) */}
        <line x1={hebbX + hebbW} y1={hebbY + hebbH / 2} x2={700} y2={hebbY + hebbH / 2}
          stroke={accent} strokeWidth={1.2} strokeDasharray="4 3" />
        <line x1={700} y1={hebbY + hebbH / 2} x2={700} y2={searchY + searchH / 2}
          stroke={accent} strokeWidth={1.2} strokeDasharray="4 3" />
        <ArrowH y={searchY + searchH / 2} x1={700} x2={graphX + searchW} />
        <text x={710} y={230} fontFamily="Inter, sans-serif" fontSize={9} fill={accent}
          transform="rotate(90, 710, 230)" textAnchor="middle">
          feedback loop
        </text>

        {/* 10% 탐험 경로 */}
        <SmallBox x={10} y={searchY + searchH + 16} w={80} h={26} label="10% 탐험" />
        <line x1={50} y1={searchY + searchH + 16} x2={50} y2={searchY + searchH}
          stroke={accent} strokeWidth={1} strokeDasharray="3 2" />
        <ArrowH y={searchY + searchH - 5} x1={90} x2={vecX} />
        <text x={50} y={searchY + searchH + 56} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontSize={8} fill={accent}>
          UCB 계수
        </text>

        {/* NDCG 결과 */}
        <text x={rrfX + rrfW + 20} y={rrfY + 16} fontFamily="Inter, sans-serif" fontSize={10} fill={textMid}>
          NDCG
        </text>
        <text x={rrfX + rrfW + 20} y={rrfY + 34} fontFamily="Inter, sans-serif" fontSize={18} fontWeight={700} fill={accent}>
          0.624
        </text>

      </svg>
    </div>
  );
}
