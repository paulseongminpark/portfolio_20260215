import React, { useState } from "react";

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: "#aaa",
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: 14,
};

const DECISIONS: { label: string; body: string; deprecated?: boolean }[] = [
  {
    label: "Perplexity sonar-deep-research",
    body: "일반 LLM은 훈련 데이터 기준. sonar-deep-research는 실시간 인덱싱 + 출처 인용 → 어제 발표된 뉴스도 처리 가능. max_tokens 7500, 비용 월 ~$3.",
  },
  {
    label: "GitHub Actions cron",
    body: "별도 서버·크론 서비스 없이 cron 표현식 하나로 매일 실행. 인프라 유지비 0원, 장애 지점 최소화. 실패 시 sonar-pro 폴백 자동 전환.",
  },
  {
    label: "Codex gpt-5.4 — Twitter & YouTube 분석",
    body: "YouTube 섹션 분석·Twitter 북마크 처리에 Codex 위임. mcp-memory recall로 개인화된 apply_points 추출. Claude는 설계/결정권자, Codex는 추출 담당.",
  },
  {
    label: "Jekyll + GitHub Pages",
    body: "Actions이 생성한 .md 파일을 커밋하면 Pages가 자동 빌드·배포. 별도 CMS 없이 파일 시스템이 곧 CMS. 호스팅 비용 0원.",
  },
  {
    label: "Twitter Playwright 스크래핑 → 폐기",
    body: "로그인/2FA/rate limit 불안정. GitHub Actions 환경에서 실행 불가. Task Scheduler 로컬 처리로 전환, Playwright 완전 제거.",
    deprecated: true,
  },
];

const ONGOING: { label: string; body: string }[] = [
  {
    label: "bookmarks.json 첫 실행",
    body: "inbox/에 Twitter export JSON 투입하면 즉시 가능. add-bookmark.py → Codex 분석 → bookmarks.json 생성.",
  },
  {
    label: "sources.json 자동 갱신",
    body: "현재 수동 실행 (node scripts/build-sources-feed.js). Task Scheduler 또는 GitHub Actions 통합으로 자동화 예정.",
  },
  {
    label: "YouTube 플레이리스트 확대",
    body: "현재 AI Tech Picks 1개 플레이리스트만 운영 중. 추가 채널/플레이리스트 등록으로 확대 예정.",
  },
];

function Accordion({
  items,
}: {
  items: { label: string; body: string; deprecated?: boolean }[];
}) {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };
  return (
    <div style={{ border: "1px solid #e8e8e8" }}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={i}
            style={{
              borderBottom:
                i < items.length - 1 ? "1px solid #e8e8e8" : undefined,
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "20px 28px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: item.deprecated ? "#bbb" : "#666",
                textAlign: "left",
                textDecoration: item.deprecated ? "line-through" : "none",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span>{item.label}</span>
              <span
                style={{
                  fontSize: 18,
                  color: "#aaa",
                  lineHeight: 1,
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p
                style={{
                  fontFamily: "'Inter','Noto Sans KR',sans-serif",
                  fontSize: 14,
                  color: "#555",
                  lineHeight: 1.8,
                  margin: 0,
                  padding: "0 28px 24px",
                }}
              >
                {item.body}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function TechReviewSystemSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <div>
        <p style={labelStyle}>Design Decisions</p>
        <Accordion items={DECISIONS} />
      </div>
      <div>
        <p style={labelStyle}>Ongoing</p>
        <Accordion items={ONGOING} />
      </div>
    </div>
  );
}
