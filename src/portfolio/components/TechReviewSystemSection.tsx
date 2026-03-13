import React from "react";

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: "#aaa",
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: 28,
};

const DECISIONS: { num: string; tech: string; result: string; body: string }[] = [
  {
    num: "01",
    tech: "Actions",
    result: "수작업 없이 매일 돌아간다",
    body: "기록이 남고, 단순하고, 예측된다. 내가 없어도 시스템은 오늘도 실행된다.",
  },
  {
    num: "02",
    tech: "Pipeline",
    result: "모든 소스가 하나로 수렴한다",
    body: "세 채널이 sources.json 하나로 모인다. 소스가 늘어도 구조는 바뀌지 않는다.",
  },
  {
    num: "03",
    tech: "Codex",
    result: "수집·추출·설계는 각각 다른 도구",
    body: "Perplexity가 수집하고, Codex가 추출하고, Claude가 설계한다.",
  },
  {
    num: "04",
    tech: "mcp-memory",
    result: "요약이 아닌 적용",
    body: "새로운 정보가 내 작업의 어디에 어떻게 쓰일지까지 추출된다.",
  },
];

export function TechReviewSystemSection() {
  return (
    <div>
      <p style={labelStyle}>Design Decisions</p>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 28px 1fr 28px 1fr 28px 1fr",
        gridTemplateRows: "auto auto auto",
      }}>
        {DECISIONS.map((item, i) => {
          const col = i * 2 + 1;
          return (
            <React.Fragment key={i}>
              {/* 번호 + 기술명 */}
              <div style={{
                gridColumn: col,
                gridRow: 1,
                display: "flex",
                alignItems: "baseline",
                gap: 8,
                marginBottom: 10,
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#ddd",
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: "0.05em",
                }}>
                  {item.num}
                </span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {item.tech}
                </span>
              </div>
              {/* 결과 */}
              <p style={{
                gridColumn: col,
                gridRow: 2,
                fontSize: 14,
                fontWeight: 600,
                color: "#111",
                marginBottom: 8,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}>
                {item.result}
              </p>
              {/* 설명 */}
              <p style={{
                gridColumn: col,
                gridRow: 3,
                fontSize: 13,
                color: "#888",
                lineHeight: 1.7,
                margin: 0,
                fontFamily: "'Inter','Noto Sans KR',sans-serif",
              }}>
                {item.body}
              </p>
              {/* 화살표 */}
              {i < DECISIONS.length - 1 && (
                <div
                  style={{
                    gridColumn: col + 1,
                    gridRow: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 14,
                    color: "#f90",
                    transform: `translate(${i === 2 ? -30 : -50}px, -7px)`,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
