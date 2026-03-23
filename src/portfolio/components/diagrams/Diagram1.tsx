/** 다이어그램 1 — 타입 팽창 그래프: 26(v0.1) → 52(v2.0) */
export function Diagram1() {
  const W = 760;
  const H = 340;
  const bg = "#f8f6f3";
  const accent = "#D4632D";
  const nodeColor = "#e8e4de";
  const nodeActive = "#d4c4b0";
  const textDark = "#333";
  const textMid = "#888";
  const textLight = "#bbb";

  // 왼쪽 클러스터 (26 types) 노드 위치
  const leftNodes = [
    { x: 100, y: 120 }, { x: 130, y: 95 }, { x: 85, y: 150 },
    { x: 120, y: 170 }, { x: 150, y: 140 }, { x: 70, y: 125 },
    { x: 140, y: 115 }, { x: 110, y: 155 }, { x: 95, y: 100 },
  ];

  // 오른쪽 클러스터 (52 types) 노드 위치 — 더 넓게 퍼짐
  const rightNodes = [
    { x: 530, y: 80 }, { x: 560, y: 105 }, { x: 590, y: 85 },
    { x: 620, y: 110 }, { x: 650, y: 90 }, { x: 680, y: 115 },
    { x: 520, y: 130 }, { x: 555, y: 150 }, { x: 590, y: 135 },
    { x: 625, y: 155 }, { x: 660, y: 140 }, { x: 690, y: 160 },
    { x: 540, y: 180 }, { x: 575, y: 195 }, { x: 610, y: 180 },
    { x: 645, y: 200 }, { x: 680, y: 185 }, { x: 700, y: 135 },
  ];

  // 연결선 (일부 노드 간)
  const leftEdges = [
    [0,1],[0,2],[1,4],[2,3],[3,4],[5,0],[6,1],[7,3],[8,5],
  ];
  const rightEdges = [
    [0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10],[10,11],
    [12,13],[13,14],[14,15],[15,16],[16,17],[6,0],[12,6],[7,1],[13,7],
    [8,2],[14,8],[9,3],[15,9],[10,4],[16,10],[11,5],[17,11],
  ];

  // 타임라인 이벤트
  const events = [
    { x: 260, label: "들뢰즈 도입" },
    { x: 350, label: "헤비안 학습" },
    { x: 440, label: "9개 AI 리서치" },
  ];

  return (
    <div style={{ background: bg, borderRadius: 12, padding: "32px 24px 24px", margin: "24px 0" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        {/* 연결선 — 왼쪽 */}
        {leftEdges.map(([a, b], i) => (
          <line key={`le-${i}`}
            x1={leftNodes[a].x} y1={leftNodes[a].y}
            x2={leftNodes[b].x} y2={leftNodes[b].y}
            stroke={textLight} strokeWidth={1} opacity={0.5}
          />
        ))}

        {/* 연결선 — 오른쪽 */}
        {rightEdges.map(([a, b], i) => (
          <line key={`re-${i}`}
            x1={rightNodes[a].x} y1={rightNodes[a].y}
            x2={rightNodes[b].x} y2={rightNodes[b].y}
            stroke={textLight} strokeWidth={1} opacity={0.4}
          />
        ))}

        {/* 노드 — 왼쪽 */}
        {leftNodes.map((n, i) => (
          <circle key={`ln-${i}`} cx={n.x} cy={n.y} r={8}
            fill={nodeColor} stroke="#ccc" strokeWidth={1}
          />
        ))}

        {/* 노드 — 오른쪽 */}
        {rightNodes.map((n, i) => (
          <circle key={`rn-${i}`} cx={n.x} cy={n.y} r={7}
            fill={i < 9 ? nodeActive : accent} stroke="none" opacity={i < 9 ? 1 : 0.6}
          />
        ))}

        {/* 중앙 화살표 */}
        <defs>
          <marker id="arrow1" viewBox="0 0 10 7" refX="10" refY="3.5"
            markerWidth="8" markerHeight="6" orient="auto-start-reverse">
            <polygon points="0 0, 10 3.5, 0 7" fill={textMid} />
          </marker>
        </defs>
        <line x1={190} y1={240} x2={500} y2={240}
          stroke={textMid} strokeWidth={1.5} markerEnd="url(#arrow1)"
        />

        {/* 타임라인 이벤트 */}
        {events.map((e, i) => (
          <g key={`ev-${i}`}>
            <circle cx={e.x} cy={240} r={3} fill={accent} />
            <line x1={e.x} y1={243} x2={e.x} y2={260} stroke={textLight} strokeWidth={1} />
            <text x={e.x} y={275} textAnchor="middle"
              fontFamily="Inter, sans-serif" fontSize={10} fill={textMid}>
              {e.label}
            </text>
          </g>
        ))}

        {/* 라벨 — 왼쪽 */}
        <text x={110} y={50} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontSize={28} fontWeight={700} fill={textDark}>
          26
        </text>
        <text x={110} y={68} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontSize={11} fill={textMid}>
          types · v0.1
        </text>

        {/* 라벨 — 오른쪽 */}
        <text x={610} y={50} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontSize={28} fontWeight={700} fill={accent}>
          52
        </text>
        <text x={610} y={68} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontSize={11} fill={textMid}>
          types · v2.0
        </text>

        {/* 하단 캡션 */}
        <text x={W / 2} y={H - 10} textAnchor="middle"
          fontFamily="Inter, sans-serif" fontSize={10} fill={textLight}>
          온톨로지 타입이 설계 과정에서 팽창하는 궤적
        </text>
      </svg>
    </div>
  );
}
