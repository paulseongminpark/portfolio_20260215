import React from "react";

// ── 색상 팔레트 (AiWorkflowSection과 동일) ─────────────────────────
const C = {
  blue: "#2563eb",
  blueBg: "#eff4ff",
  blueBorder: "#c7d7fd",
  text: "#1a1a1a",
  muted: "#555",
  dim: "#888",
  dimmer: "#999",
  border: "#e5e5e5",
  bg: "#fafafa",
  white: "#fff",
  purple: "#7c3aed",
  purpleBg: "#f5f3ff",
  purpleBorder: "#ddd6fe",
  green: "#059669",
  greenBg: "#ecfdf5",
  greenBorder: "#a7f3d0",
  amber: "#d97706",
  amberBg: "#fffbeb",
  amberBorder: "#fde68a",
  rose: "#e11d48",
  roseBg: "#fff1f2",
  roseBorder: "#fecdd3",
  teal: "#0d9488",
  tealBg: "#f0fdfa",
  tealBorder: "#99f6e4",
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: C.dimmer,
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: 14,
};

// ── 파이프라인 단계 ────────────────────────────────────────────────
const PIPELINE = [
  {
    icon: "⏰",
    title: "Trigger",
    detail: "09:00 KST",
    sub: "GitHub Actions cron",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    icon: "🔍",
    title: "Fetch",
    detail: "Perplexity API",
    sub: "실시간 뉴스 검색",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    icon: "✂️",
    title: "Format",
    detail: "Smart Brevity",
    sub: "4구조 자동 변환",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    icon: "🗂️",
    title: "Log",
    detail: "keywords-log.md",
    sub: "키워드 누적 기록",
    color: C.rose,
    bg: C.roseBg,
    border: C.roseBorder,
  },
  {
    icon: "🏗️",
    title: "Build",
    detail: "Jekyll",
    sub: "정적 사이트 빌드",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
  {
    icon: "🚀",
    title: "Deploy",
    detail: "GitHub Pages",
    sub: "자동 배포",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
];

// ── 요일별 테마 ────────────────────────────────────────────────────
const WEEKLY = [
  {
    day: "Mon",
    label: "AI R&D",
    desc: "논문·모델·연구 돌파구",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    day: "Tue",
    label: "빅테크",
    desc: "Google·OpenAI·Meta 전략 동향",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    day: "Wed",
    label: "AI × Industry",
    desc: "헬스케어·금융·법률·제조 순환",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    day: "Thu",
    label: "스타트업",
    desc: "투자·제품·팀 빌딩",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
  {
    day: "Fri",
    label: "규제 & 정책",
    desc: "각국 AI 규제 동향",
    color: C.rose,
    bg: C.roseBg,
    border: C.roseBorder,
  },
  {
    day: "Sat",
    label: "도구 & 인프라",
    desc: "API·플랫폼·개발환경",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
];

// ── Smart Brevity 구조 ─────────────────────────────────────────────
const BREVITY = [
  {
    n: "01",
    title: "Today in One Line",
    desc: "하나의 문장으로 핵심 이슈를 압축한다. 제목이 아니라 결론부터.",
    color: C.blue,
  },
  {
    n: "02",
    title: "Why it matters",
    desc: "왜 지금 이게 중요한지. 산업 구조, 직무 변화, 기회·위험 관점에서 해석.",
    color: C.purple,
  },
  {
    n: "03",
    title: "3 Key Points",
    desc: "세 개의 불릿. 수치·사실·맥락이 있는 정보만. 막연한 전망 금지.",
    color: C.teal,
  },
  {
    n: "04",
    title: "What's next",
    desc: "다음에 무슨 일이 일어날지. 단기 전망 또는 관찰 포인트로 마무리.",
    color: C.amber,
  },
];

// ── 기술 선택 이유 ─────────────────────────────────────────────────
const DECISIONS = [
  {
    tech: "Perplexity API",
    reason: "실시간 웹 검색 기반 답변",
    detail:
      "일반 LLM은 훈련 데이터 기준. Perplexity는 실시간 인덱싱 + 출처 인용 → 어제 발표된 뉴스도 처리 가능. 단, 생성 결과의 사실 검증은 여전히 필요 — 출처 URL 확인을 병행한다.",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    tech: "GitHub Actions",
    reason: "서버 없는 완전 자동화",
    detail:
      "별도 서버·크론 서비스 없이 cron 표현식 하나로 매일 실행. 인프라 유지비 0원, 장애 지점 최소화.",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    tech: "Jekyll + GitHub Pages",
    reason: "Markdown 네이티브, 무료 호스팅",
    detail:
      "Actions이 생성한 .md 파일을 커밋하면 Pages가 자동 빌드·배포. 별도 CMS 없이 파일 시스템이 곧 CMS.",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
  {
    tech: "Smart Brevity",
    reason: "읽는 사람 기준으로 설계된 포맷",
    detail:
      "Axios 뉴스레터에서 영감. 긴 글을 요약하는 게 아니라 '결론 → 이유 → 근거 → 전망' 순서로 처음부터 다시 쓴다.",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
];

// ── 누적 키워드 샘플 ───────────────────────────────────────────────
const KEYWORDS = [
  { word: "OpenAI", count: 18, color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
  { word: "규제", count: 15, color: C.rose, bg: C.roseBg, border: C.roseBorder },
  { word: "추론 모델", count: 14, color: C.blue, bg: C.blueBg, border: C.blueBorder },
  { word: "AGI", count: 12, color: C.teal, bg: C.tealBg, border: C.tealBorder },
  { word: "멀티모달", count: 11, color: C.amber, bg: C.amberBg, border: C.amberBorder },
  { word: "에이전트", count: 10, color: C.green, bg: C.greenBg, border: C.greenBorder },
  { word: "헬스케어 AI", count: 9, color: C.teal, bg: C.tealBg, border: C.tealBorder },
  { word: "EU AI Act", count: 8, color: C.rose, bg: C.roseBg, border: C.roseBorder },
  { word: "오픈소스", count: 7, color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
  { word: "GPU 부족", count: 6, color: C.amber, bg: C.amberBg, border: C.amberBorder },
];

// ── 메인 컴포넌트 ─────────────────────────────────────────────────
export function TechReviewSystemSection() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 8 }}
    >
      {/* ① Why — 동기 */}
      <div>
        <p style={labelStyle}>Why I built this</p>
        <div
          style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: C.text,
              lineHeight: 1.75,
              margin: "0 0 14px",
            }}
          >
            AI 뉴스를 매일 읽었지만 정리하지 않으면 기억에 남지 않았다. 읽은 게
            많아도 구조화되지 않으면 쓸 수 없다. 수작업 큐레이션을 시작했지만
            지속할 수 없었다. 결국 "사람이 할 일과 시스템이 할 일을 나눠야
            한다"는 결론에 도달했다.
          </p>
          <p
            style={{
              fontSize: 14,
              color: C.muted,
              lineHeight: 1.75,
              margin: 0,
              borderLeft: `3px solid ${C.blue}`,
              paddingLeft: 14,
            }}
          >
            시스템이 수집·포맷·배포를 담당하고, 나는 구조 설계와 방향 결정에
            집중한다. Tech Review는 단순한 블로그가 아니라 지식을 자산으로 만드는
            자동화 파이프라인이다.
          </p>
        </div>
      </div>

      {/* ② 헤드라인 + 배지 */}
      <div>
        <p style={labelStyle}>System Overview</p>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.65,
            margin: "0 0 20px",
            borderLeft: `3px solid ${C.blue}`,
            paddingLeft: 14,
          }}
        >
          매일 아침 GitHub Actions가 Perplexity API를 깨운다. 6개 주제, 2개 언어,
          자동 배포 — 수작업 없이 돌아가는 AI 뉴스 큐레이션 파이프라인.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {[
            { label: "주 6회 자동 생성", color: C.blue, bg: C.blueBg, border: C.blueBorder },
            { label: "ko / en 2개 언어", color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
            { label: "6개 요일 테마", color: C.teal, bg: C.tealBg, border: C.tealBorder },
            { label: "연간 ~600개 포스트", color: C.green, bg: C.greenBg, border: C.greenBorder },
            { label: "GitHub Actions", color: C.amber, bg: C.amberBg, border: C.amberBorder },
            { label: "Jekyll + Pages", color: C.rose, bg: C.roseBg, border: C.roseBorder },
          ].map((b) => (
            <span
              key={b.label}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: b.color,
                background: b.bg,
                border: `1px solid ${b.border}`,
                borderRadius: 4,
                padding: "3px 8px",
              }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ③ 파이프라인 */}
      <div>
        <p style={labelStyle}>Pipeline</p>
        {/* Architecture Pivot 이야기 */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 14,
            alignItems: "flex-start",
            padding: "12px 14px",
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#c2410c",
              background: "#ffedd5",
              border: "1px solid #fed7aa",
              borderRadius: 3,
              padding: "2px 6px",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            PIVOT
          </span>
          <div>
            <div
              style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}
            >
              원래 계획: Perplexity 예약 이메일 → Google Apps Script → GitHub Actions
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              구현 중 Perplexity가 이메일에 전문을 보내지 않는다는 걸 발견했다.
              "View full response" 링크만 있고 앱으로 이동 — GAS로 본문 추출
              불가. 방식 전체 폐기, Perplexity API 직접 호출로 전환. 비용: 월
              약 $0.03.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 0,
            alignItems: "stretch",
            flexWrap: "wrap",
            rowGap: 8,
          }}
        >
          {PIPELINE.map((step, i) => (
            <React.Fragment key={step.title}>
              <div
                style={{
                  flex: "1 1 0",
                  minWidth: 86,
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  borderRadius: 8,
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 18, marginBottom: 6 }}>{step.icon}</div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: step.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: 4,
                  }}
                >
                  {step.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: 2,
                  }}
                >
                  {step.detail}
                </div>
                <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.3 }}>
                  {step.sub}
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 3px",
                    color: C.dim,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ④ 요일별 테마 */}
      <div>
        <p style={labelStyle}>Weekly Schedule</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(128px, 1fr))",
            gap: 10,
          }}
        >
          {WEEKLY.map((w) => (
            <div
              key={w.day}
              style={{
                background: w.bg,
                border: `1px solid ${w.border}`,
                borderRadius: 8,
                padding: "12px 14px",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: w.color,
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                }}
              >
                {w.day}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                {w.label}
              </div>
              <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.4 }}>
                {w.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⑤ Smart Brevity 형식 + 예시 */}
      <div>
        <p style={labelStyle}>Smart Brevity Format</p>
        {/* Format Evolution v1 → v2 */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginBottom: 14,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, padding: "12px 14px", background: "#fafafa" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.rose,
                  background: C.roseBg,
                  border: `1px solid ${C.roseBorder}`,
                  borderRadius: 3,
                  padding: "2px 6px",
                }}
              >
                v1 — 폐기
              </span>
              <span style={{ fontSize: 10, color: C.dimmer }}>
                Industry / Who / What / When / Why / How / So?
              </span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              2주 운영 후 문제 발견. 핵심을 찾으려면 전체를 읽어야 했고, 말투
              혼재·주제 중복이 반복됐다. 기존 포스트 16개 전량 재변환.
            </div>
          </div>
          <div style={{ width: 1, background: C.border, flexShrink: 0 }} />
          <div style={{ flex: 1, padding: "12px 14px", background: C.white }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.blue,
                  background: C.blueBg,
                  border: `1px solid ${C.blueBorder}`,
                  borderRadius: 3,
                  padding: "2px 6px",
                }}
              >
                v2 — 현재
              </span>
              <span style={{ fontSize: 10, color: C.dimmer }}>Smart Brevity</span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              결론부터, 이유, 근거, 전망 순. 읽는 사람이 30초 안에 핵심을
              파악할 수 있게. Axios 뉴스레터에서 영감.
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* 구조 설명 */}
          <div
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {BREVITY.map((b, i) => (
              <div
                key={b.n}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "13px 16px",
                  borderBottom:
                    i < BREVITY.length - 1
                      ? `1px solid ${C.border}`
                      : undefined,
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: b.color,
                    minWidth: 20,
                    paddingTop: 1,
                    flexShrink: 0,
                  }}
                >
                  {b.n}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: C.text,
                      marginBottom: 3,
                    }}
                  >
                    {b.title}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
                    {b.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 실제 예시 */}
          <div
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "16px 18px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                fontSize: 9,
                fontWeight: 700,
                color: C.dimmer,
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Sample
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.blue,
                textTransform: "uppercase",
                letterSpacing: "0.4px",
                marginBottom: 8,
              }}
            >
              Today in One Line
            </div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.text,
                lineHeight: 1.5,
                margin: "0 0 12px",
              }}
            >
              OpenAI, o3 API 공개 — 추론 비용 50% 절감, 기업 도입 장벽 낮아진다
            </p>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.purple,
                textTransform: "uppercase",
                letterSpacing: "0.4px",
                marginBottom: 6,
              }}
            >
              Why it matters
            </div>
            <p
              style={{
                fontSize: 11,
                color: C.muted,
                lineHeight: 1.55,
                margin: "0 0 12px",
              }}
            >
              복잡한 추론이 필요한 법률·금융 AI 도입 가속. 기업 구축 비용 장벽
              낮아짐.
            </p>
            <div
              style={{
                fontSize: 11,
                color: C.dim,
                lineHeight: 1.7,
                margin: "0 0 12px",
                paddingLeft: 4,
              }}
            >
              <div>• API 가격 GPT-4o 대비 40% 낮아짐, 응답 속도 2배 향상</div>
              <div>• Microsoft Azure 우선 배포, 기업 고객 전환율 상승 예상</div>
              <div>• Anthropic Claude 4 출시 일정 앞당겨질 가능성</div>
            </div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: C.amber,
                textTransform: "uppercase",
                letterSpacing: "0.4px",
                marginBottom: 6,
              }}
            >
              What's next
            </div>
            <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.55, margin: 0 }}>
              Q2 기업 도입 지표 주목. 규제 당국의 추론 모델 투명성 요구 가능성.
            </p>
          </div>
        </div>
      </div>

      {/* ⑥ Keywords Log */}
      <div>
        <p style={labelStyle}>Keywords Log</p>
        <div
          style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "18px 20px",
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: C.muted,
              lineHeight: 1.65,
              margin: "0 0 16px",
            }}
          >
            매일 생성된 포스트에서 핵심 키워드를 추출해{" "}
            <code
              style={{
                fontSize: 11,
                background: "#f0f0f0",
                padding: "1px 5px",
                borderRadius: 3,
                color: C.text,
              }}
            >
              keywords-log.md
            </code>
            에 날짜와 함께 누적 기록한다. 시간이 쌓이면 어떤 주제가 반복되는지,
            어떤 키워드가 갑자기 급부상하는지 패턴을 읽을 수 있다.
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {KEYWORDS.map((k) => (
              <div
                key={k.word}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: k.bg,
                  border: `1px solid ${k.border}`,
                  borderRadius: 20,
                  padding: "4px 10px",
                }}
              >
                <span style={{ fontSize: 12, color: k.color, fontWeight: 600 }}>
                  {k.word}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    color: C.dimmer,
                    background: "#fff",
                    border: `1px solid ${C.border}`,
                    borderRadius: 10,
                    padding: "1px 5px",
                    fontWeight: 700,
                  }}
                >
                  {k.count}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 11,
              color: C.dimmer,
              margin: "12px 0 0",
              fontStyle: "italic",
            }}
          >
            * 2025년 2월 기준 누적 샘플 (숫자 = 등장 횟수)
          </p>
        </div>
      </div>

      {/* ⑦ 기술 선택 이유 */}
      <div>
        <p style={labelStyle}>Design Decisions</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DECISIONS.map((d) => (
            <div
              key={d.tech}
              style={{
                display: "flex",
                gap: 0,
                border: `1px solid ${d.border}`,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: d.bg,
                  padding: "12px 14px",
                  minWidth: 130,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: d.color,
                    marginBottom: 3,
                  }}
                >
                  {d.tech}
                </div>
                <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.4 }}>
                  {d.reason}
                </div>
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  background: C.white,
                  display: "flex",
                  alignItems: "center",
                  borderLeft: `1px solid ${d.border}`,
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: C.muted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {d.detail}
                </p>
              </div>
            </div>
          ))}
          {/* Comments 폐기 항목 */}
          <div
            style={{
              display: "flex",
              gap: 0,
              border: `1px dashed ${C.border}`,
              borderRadius: 8,
              overflow: "hidden",
              opacity: 0.7,
            }}
          >
            <div
              style={{
                background: "#f5f5f5",
                padding: "12px 14px",
                minWidth: 130,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{ fontSize: 12, fontWeight: 700, color: C.dim, marginBottom: 3, textDecoration: "line-through" }}
              >
                Comments 자동 생성
              </div>
              <div style={{ fontSize: 10, color: C.dimmer }}>Claude API → 폐기</div>
            </div>
            <div
              style={{
                padding: "12px 16px",
                background: C.white,
                display: "flex",
                alignItems: "center",
                borderLeft: `1px dashed ${C.border}`,
              }}
            >
              <p style={{ fontSize: 12, color: C.dim, lineHeight: 1.6, margin: 0 }}>
                Claude API로 Comments를 자동 생성하는 방식을 초기에 설계했다.
                품질 일관성과 맥락 유지가 어려워 폐기 — 직접 작성 방식으로
                전환했다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ⑧ Ongoing — 열린 과제 */}
      <div>
        <p style={labelStyle}>Ongoing</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            {
              status: "검토 중",
              title: "Perplexity 출력 검증 자동화",
              detail:
                "생성된 포스트의 핵심 수치·사실 관계를 자동으로 교차 검증하는 레이어 추가 검토. 현재는 발행 후 수동 확인.",
              color: C.rose,
              bg: C.roseBg,
              border: C.roseBorder,
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                display: "flex",
                gap: 0,
                border: `1px solid ${item.border}`,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: item.bg,
                  padding: "10px 14px",
                  minWidth: 72,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: item.color,
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {item.status}
                </span>
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  background: C.white,
                  borderLeft: `1px solid ${item.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.text,
                    marginBottom: 4,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
