interface AiWorkflowSectionProps {
  raw: string;
}

// ── 색상 팔레트 (기존 포트폴리오 변수 기반) ──────────────────────
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

const label: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: C.dimmer,
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: 14,
};

// ── 헤드라인 배지 ─────────────────────────────────────────────────
interface StatBadge {
  value: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

const BADGES: StatBadge[] = [
  { value: "14", desc: "Agents", color: C.blue, bg: C.blueBg, border: C.blueBorder },
  { value: "17", desc: "Skills", color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
  { value: "5", desc: "Hooks", color: C.green, bg: C.greenBg, border: C.greenBorder },
  { value: "3", desc: "MCP Servers", color: C.teal, bg: C.tealBg, border: C.tealBorder },
  { value: "3+", desc: "AI Tools", color: C.amber, bg: C.amberBg, border: C.amberBorder },
];

// ── 에이전트 계층 ──────────────────────────────────────────────────
interface AgentGroup {
  label: string;
  agents: string[];
  color: string;
  bg: string;
  border: string;
}

const AGENT_GROUPS: AgentGroup[] = [
  {
    label: "PROACTIVELY",
    agents: ["code-reviewer", "commit-writer", "orch-state", "compressor"],
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    label: "Portfolio",
    agents: ["pf-context", "pf-reviewer", "pf-deployer", "pf-orchestrator"],
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    label: "Orchestration",
    agents: ["orch-doc-writer", "orch-skill-builder"],
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
  {
    label: "Analysis",
    agents: ["gemini-analyzer (1M)", "security-auditor"],
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
  {
    label: "Monet-lab",
    agents: ["ml-experimenter", "ml-porter"],
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    label: "Morning",
    agents: ["morning-briefer"],
    color: C.rose,
    bg: C.roseBg,
    border: C.roseBorder,
  },
];

// ── 워크플로우 스텝 ───────────────────────────────────────────────
const FLOW_STEPS = [
  { label: "brainstorm", agent: "gemini-analyzer" },
  { label: "plan", agent: "orch-doc-writer" },
  { label: "implement", agent: "Claude Code" },
  { label: "review", agent: "code-reviewer" },
  { label: "deploy", agent: "pf-deployer" },
];

// ── CLAUDE.md 계층 ────────────────────────────────────────────────
const CONTEXT_LAYERS = [
  { path: "~/.claude/", desc: "글로벌 규칙 · 공통 실수 패턴 · 워크플로우", level: 0 },
  { path: "C:/dev/", desc: "볼트 허브 · 프로젝트 공통 설정", level: 1 },
  { path: "./project/", desc: "프로젝트별 CLAUDE.md · rules/ 폴더", level: 2 },
];

// ── 멀티 AI 역할 분담 ─────────────────────────────────────────────
interface AiRole {
  name: string;
  role: string;
  detail: string;
  color: string;
  bg: string;
  border: string;
}

const AI_ROLES: AiRole[] = [
  {
    name: "Claude Code",
    role: "실행 허브",
    detail: "유일한 Write 권한 · 에이전트 오케스트레이션",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    name: "Gemini CLI",
    role: "대규모 분석",
    detail: "1M 토큰 컨텍스트 · 코드베이스 전체 탐색",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    name: "GPT (Codex xhigh)",
    role: "비판적 검토",
    detail: "/gpt-review 스킬 · 설계 크로스 검증",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
  {
    name: "Perplexity",
    role: "실시간 검색",
    detail: "웹 기반 최신 정보 수집 · 리서치 지원",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
];

// ── 훅 목록 ──────────────────────────────────────────────────────
const HOOKS = [
  { name: "Stop Hook", desc: "미커밋 파일 감지 → 완료 선언 차단" },
  { name: "SessionStart", desc: "작업 로그 + git status 자동 출력" },
  { name: "PreToolUse", desc: "rm -rf, git push --force 자동 차단" },
  { name: "TeammateIdle", desc: "Agent Teams 팀원 유휴 알림" },
  { name: "TaskCompleted", desc: "작업 완료 감지 알림" },
];

// ── 스킬 목록 ─────────────────────────────────────────────────────
const SKILL_GROUPS = [
  {
    label: "운영",
    skills: [
      { name: "/morning", desc: "모든 프로젝트 현황 + TODO 통합 브리핑" },
      { name: "/todo", desc: "daily-memo Inbox 동기화 + 할 일 관리" },
      { name: "/sync-all", desc: "전체 프로젝트 STATE 갱신 + git push" },
      { name: "/catchup", desc: "새 세션 시작 시 5초 만에 이전 작업 복구" },
      { name: "/session-insights", desc: "현재 세션 토큰 소비 + 비용 분석" },
    ],
  },
  {
    label: "문서",
    skills: [
      { name: "/docs-review", desc: "stale 문서 감지 + 업데이트 방향 제안" },
      { name: "/research", desc: "코드베이스 + 웹 딝 리서치 워크플로우" },
      { name: "/handoff", desc: "다른 AI에게 전달할 컨텍스트 문서 생성" },
      { name: "/gpt-review", desc: "설계·플랜을 GPT 비판적 리뷰용 프롬프트로 포맷" },
    ],
  },
  {
    label: "배포",
    skills: [
      { name: "/commit-push-pr", desc: "커밋·푸시·PR 생성을 한 번에" },
      { name: "/verify", desc: "모든 프로젝트 규칙 검증 (커밋 전 실행)" },
      { name: "/verify-project-rules", desc: "브랜치·커밋 메시지·STATE 형식 검증" },
    ],
  },
  {
    label: "생성",
    skills: [
      { name: "/skill-creator", desc: "새 스킬 파일 구조화 + 패키징 가이드" },
      { name: "/subagent-creator", desc: "전문 에이전트 설계 + 시스템 프롬프트 작성" },
      { name: "/hook-creator", desc: "Claude Code 훅 이벤트 설정 + 레퍼런스" },
    ],
  },
];

// ── 자동화 연동 ───────────────────────────────────────────────────
const AUTOMATIONS = [
  { label: "gh CLI", desc: "PR 생성·이슈 관리 (GitHub MCP 불필요)" },
  { label: "Jekyll Blog", desc: "tech-review → GitHub Pages 자동 빌드" },
  { label: "Obsidian Git", desc: "dev-vault 10분마다 자동 커밋 동기화" },
  { label: "daily-memo", desc: "모바일 Claude Code → 브랜치 → /todo 동기화" },
];

// ── 메인 컴포넌트 ─────────────────────────────────────────────────
export function AiWorkflowSection({ raw: _raw }: AiWorkflowSectionProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, marginTop: 8 }}>

      {/* 1. 헤드라인 + 핵심 숫자 배지 */}
      <div>
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
          Claude Code를 운영체제처럼 쓴다. What만 정의하면 14개 에이전트가 How를 결정하고 실행한다.
        </p>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "12px 0 16px" }}>
          명령과 설계는 다르다. 명령은 매번 내가 개입해야 한다. 설계는 한 번 만들어두면 내가 없어도 굴러간다. 이 차이를 처음 체감한 건 에이전트를 처음 붙였을 때였다. 같은 작업인데 에이전트를 붙이자 설명이 사라졌다. 작업 속도가 달라진 게 아니었다. 내가 쓰는 단어 수가 달라졌다.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {BADGES.map((b) => (
            <div
              key={b.desc}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                background: b.bg,
                border: `1px solid ${b.border}`,
                borderRadius: 10,
                padding: "10px 16px",
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, color: b.color, lineHeight: 1 }}>
                {b.value}
              </span>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{b.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 시스템 진화 타임라인 */}
      <div>
        <div style={label}>시스템 진화</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          처음엔 에이전트 2개였다. 가장 반복되는 작업 두 가지를 자동화했다. v2.0에서 14개가 됐다. 에이전트가 늘어나면서 시스템이 강력해졌지만, 동시에 복잡해졌다. AI 도구가 늘어날수록 오히려 시스템 복잡도가 상승하는 역설이 생겼다. 에이전트 하나가 추가될 때마다 다른 에이전트와의 경계를 다시 정의해야 했다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { v: "v1.0", date: "2026-02-21", desc: "Skills 11개, Scripts 5개, Auto-Memory 3단계" },
            { v: "v2.0", date: "2026-02-21", desc: "에이전트 14개, 훅 5종, MCP 3개, Gemini CLI 연동" },
            { v: "v2.1", date: "2026-02-22", desc: "SOT METRICS 추가, pf-orchestrator, 컨텍스트 라이브러리" },
          ].map((item, i, arr) => (
            <div key={item.v} style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: i === arr.length - 1 ? C.blue : C.border,
                    border: `2px solid ${i === arr.length - 1 ? C.blue : C.dim}`,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                {i < arr.length - 1 && (
                  <div style={{ width: 1, flexGrow: 1, background: C.border, margin: "4px 0" }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: i === arr.length - 1 ? C.blue : C.text,
                    }}
                  >
                    {item.v}
                  </span>
                  <span style={{ fontSize: 11, color: C.dimmer }}>{item.date}</span>
                </div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 에이전트 계층 그리드 */}
      <div>
        <div style={label}>에이전트 아키텍처 (14개)</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          각 에이전트는 하나의 역할만 가진다. code-reviewer는 리뷰만, commit-writer는 커밋 메시지만. 역할이 명확해야 에이전트가 딱딱 떨어지게 작동한다. 역할이 겹치는 순간 어느 에이전트가 처리할지 불명확해지고, AI가 판단을 포기하거나 잘못된 판단을 내린다. PROACTIVELY 에이전트 4개는 별도 호출 없이 상황을 감지해 자동으로 개입한다. 초기에는 Claude를 reader/executor/architect 3가지 모드로 구분하는 방식을 검토했으나, 현재는 에이전트별 model: haiku/sonnet/opus 직접 지정 방식으로 전환됐다. <span style={{ color: "#999" }}>(구 설계 컨셉)</span>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
          }}
        >
          {AGENT_GROUPS.map((grp) => (
            <div
              key={grp.label}
              style={{
                border: `1px solid ${grp.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: grp.bg,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: grp.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 10,
                }}
              >
                {grp.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {grp.agents.map((a) => (
                  <span key={a} style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 자동화 워크플로우 */}
      <div>
        <div style={label}>자동화 워크플로우</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          각 단계는 전문 에이전트로 분리돼 있다. brainstorm 단계에서 gemini-analyzer가 코드베이스 전체를 1M 토큰으로 읽고, deploy 단계에서 pf-deployer와 security-auditor가 순차적으로 검증한다. 내가 개입하는 건 What을 정의하는 것뿐이다. How는 각 단계의 에이전트가 결정한다.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", gap: 0 }}>
          {FLOW_STEPS.map((step, i) => (
            <div key={step.label} style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  border: `1px solid ${i === 0 || i === FLOW_STEPS.length - 1 ? C.blueBorder : C.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  background: i === 0 || i === FLOW_STEPS.length - 1 ? C.blueBg : C.bg,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: i === 0 || i === FLOW_STEPS.length - 1 ? C.blue : C.text,
                    marginBottom: 4,
                  }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: 10, color: C.dimmer }}>{step.agent}</div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <span style={{ fontSize: 13, color: C.dim, margin: "0 6px" }}>→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. CLAUDE.md & 컨텍스트 엔지니어링 */}
      <div>
        <div style={label}>CLAUDE.md & 컨텍스트 엔지니어링</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          여러 AI를 쓰는데 맥락이 분산되어 일관성이 깨졌다. 세션이 끊기면 맥락이 날아갔다. 3시간 동안 쌓아온 작업이 사라진 적도 있다. 해결책은 파일이었다. 사고는 휘발되고, 기록은 남는다. CLAUDE.md는 AI가 읽는 운영 매뉴얼이다. 처음엔 하나의 파일에 모든 걸 넣었다. 300줄이 넘자 응답이 느려졌다. rules/ 폴더로 나눠 온디맨드로 로드하도록 바꿨다. common-mistakes.md도 만들었다. AI도 같은 실수를 반복한다는 걸 알게 됐기 때문이다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
          {CONTEXT_LAYERS.map((layer) => (
            <div
              key={layer.path}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                paddingLeft: layer.level * 16,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.blue,
                  fontFamily: "monospace",
                  background: C.blueBg,
                  border: `1px solid ${C.blueBorder}`,
                  borderRadius: 6,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {layer.path}
              </span>
              <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{layer.desc}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            "rules/ 폴더별 조건부 규칙",
            "@import 온디맨드 로드",
            "common-mistakes.md 누적 학습",
            "모듈화 구조",
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: C.muted,
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "4px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 6. 멀티 AI 역할 분담 */}
      <div>
        <div style={label}>멀티 AI 오케스트레이션</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          AI를 여러 개 쓰면서 제일 위험한 순간은 역할이 섞일 때였다. Claude가 분석도 하고 실행도 하면, 자기가 한 분석을 자기가 검증하는 구조가 된다. 편향이 생긴다. 실행 AI와 사고 AI의 경계를 선명하게 유지하는 것이 멀티 AI 운영에서 가장 중요한 설계 원칙이었다. 경계가 흐려지는 순간 통제가 안 됐다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 10,
          }}
        >
          {AI_ROLES.map((ai) => (
            <div
              key={ai.name}
              style={{
                border: `1px solid ${ai.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: ai.bg,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, color: ai.color, marginBottom: 4 }}>
                {ai.name}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginBottom: 6 }}>
                {ai.role}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{ai.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. GitHub & 자동화 연동 */}
      <div>
        <div style={label}>GitHub & 자동화 연동</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          자동화의 기준은 하나였다. 내가 기억해야 하는 것들을 없앤다. 기억해야 한다는 건 잊을 수 있다는 뜻이다. Obsidian에서 노트를 저장하면 자동으로 커밋된다. 모바일 메모가 자동으로 작업 목록이 된다. 이 글을 보는 사람이 GitHub에서 보는 모든 상태는 내가 따로 관리하지 않아도 항상 최신이다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 10,
          }}
        >
          {AUTOMATIONS.map((a) => (
            <div
              key={a.label}
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: C.bg,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.blue,
                  background: C.blueBg,
                  border: `1px solid ${C.blueBorder}`,
                  borderRadius: 6,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {a.label}
              </span>
              <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{a.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. 훅 + 스킬 목록 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        {/* 훅 */}
        <div>
          <div style={label}>훅 시스템 (5종)</div>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 12px" }}>
            훅은 AI가 실수하는 걸 막는 안전장치다. Stop Hook은 AI가 미커밋 상태에서 "완료됐습니다"라고 선언하는 걸 막는다. PreToolUse는 rm -rf나 git push --force 같은 위험 명령을 실행 전에 차단한다. 스킬은 반복 작업을 명령어 하나로 압축한 것이다. /morning 하나로 모든 프로젝트 현황이 나온다.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {HOOKS.map((h) => (
              <div key={h.name} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.green,
                    background: C.greenBg,
                    border: `1px solid ${C.greenBorder}`,
                    borderRadius: 6,
                    padding: "2px 8px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {h.name}
                </span>
                <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{h.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 스킬 */}
        <div>
          <div style={label}>스킬 시스템 (17개)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SKILL_GROUPS.map((grp) => (
              <div key={grp.label}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.dimmer,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    marginBottom: 6,
                  }}
                >
                  {grp.label}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
                  {grp.skills.map((sk) => (
                    <div key={sk.name} style={{ display: "flex", flexDirection: "column", gap: 2, background: "#fff", border: `1px solid ${C.purpleBorder}`, borderRadius: 8, padding: "8px 10px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.purple, fontFamily: "monospace" }}>{sk.name}</span>
                      <span style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{sk.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MCP 서버 */}
      <div>
        <div style={label}>MCP 서버 (3개)</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 12px" }}>
          MCP 5개 설치를 계획했다. 설치 전에 실측했더니 MCP 하나당 컨텍스트 11,000 토큰을 차지했다. 5개면 55,000토큰이 사라진다. 전부 CLI로 대체하고 꼭 필요한 3개만 남겼다.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {[
            { name: "sequential-thinking", desc: "복잡한 설계 단계별 분해" },
            { name: "memory", desc: "세션 간 knowledge graph" },
            { name: "desktop-commander", desc: "터미널 + 파일시스템 제어" },
          ].map((mcp) => (
            <div
              key={mcp.name}
              style={{
                border: `1px solid ${C.tealBorder}`,
                borderRadius: 10,
                padding: "12px 16px",
                background: C.tealBg,
                flex: "1 1 180px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.teal,
                  fontFamily: "monospace",
                  marginBottom: 4,
                }}
              >
                {mcp.name}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>{mcp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* A. 설계 철학 7가지 */}
      <div>
        <div style={label}>설계 철학</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          여러 AI를 쓰면서 정보가 흩어지고 컨텍스트가 날아가는 문제를 해결하려면, 철학이 먼저 있어야 했다. 도구를 먼저 고르면 구조가 도구에 종속된다. 원칙을 먼저 세우면 도구는 교체 가능해진다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
          {[
            { title: "단일 진실 소스", desc: "STATE.md가 유일한 진실. 다른 경로는 읽기만 한다.", icon: "①" },
            { title: "쓰기 권한 분리", desc: "Claude Code만 파일을 쓴다. 나머지 AI는 읽기만 한다.", icon: "②" },
            { title: "사고는 휘발, 기록은 남는다", desc: "GPT 사고 → 파일 기록 → Claude 실행 → Git 영구 보존", icon: "③" },
            { title: "토큰은 자원", desc: "CLAUDE.md 146줄 → 4줄로 압축. 매 턴 38,000토큰 절감. (초기 버전 기준)", icon: "④" },
            { title: "구조가 규율을 강제한다", desc: "규칙이 단순할수록 일관성은 올라간다. 복잡한 규칙은 깨진다.", icon: "⑤" },
            { title: "자동화는 최소한으로", desc: "자동화가 늘수록 통제 밖의 일이 생긴다. 핵심 3가지만.", icon: "⑥" },
            { title: "세션 간 기억", desc: "Auto Memory 3단계: 감지 → 검증 → 정리. 세션이 끊겨도 기억한다.", icon: "⑦" },
          ].map((p) => (
            <div key={p.title} style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: "16px 18px", background: "#fafafa" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#2563eb", flexShrink: 0 }}>{p.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{p.title}</span>
              </div>
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, margin: 0, paddingLeft: 23 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* B. AI 역할 매트릭스 */}
      <div>
        <div style={label}>AI 역할 매트릭스</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          쓰기 권한은 Claude Code 하나에만 있다. 나머지는 GitHub Pages URL을 통해 읽기만 한다. 이 구조 덕분에 충돌이 없다.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                {["AI", "역할", "파일 쓰기", "특화"].map((h) => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#1a1a1a", borderBottom: "1px solid #e5e5e5" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { ai: "Claude Code", role: "실행 + 기록", write: "✅ 유일", spec: "파일 수정 · 커밋 · 에이전트 오케스트레이션" },
                { ai: "GPT (Codex xhigh)", role: "전략 · 비판 검토", write: "❌", spec: "설계 크로스 검증 · Canvas 시각화 · /gpt-review" },
                { ai: "Gemini CLI", role: "대규모 분석", write: "❌", spec: "1M 토큰 컨텍스트 · 코드베이스 전체 탐색" },
                { ai: "Perplexity", role: "실시간 리서치", write: "❌", spec: "최신 정보 · 소스 URL 포함 검색" },
              ].map((row, i) => (
                <tr key={row.ai} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "10px 14px", fontWeight: 600, color: "#2563eb", borderBottom: "1px solid #e5e5e5" }}>{row.ai}</td>
                  <td style={{ padding: "10px 14px", color: "#1a1a1a", borderBottom: "1px solid #e5e5e5" }}>{row.role}</td>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid #e5e5e5" }}>{row.write}</td>
                  <td style={{ padding: "10px 14px", color: "#666", borderBottom: "1px solid #e5e5e5" }}>{row.spec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* C. 4가지 작업 패턴 */}
      <div>
        <div style={label}>일일 작업 패턴</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          모든 작업은 4가지 패턴 중 하나로 귀결된다. 어떤 패턴인지 먼저 판단하면 어떤 AI를 어떤 순서로 쓸지 자동으로 결정된다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
          {[
            { label: "패턴 A", title: "단순 실행", flow: ["Claude Code", "→ /sync"], desc: "명확한 태스크. 직접 실행 후 커밋.", color: "#2563eb", bg: "#eff4ff", border: "#c7d7fd" },
            { label: "패턴 B", title: "설계 + 실행", flow: ["GPT (전략)", "→ 파일 기록", "→ Claude 실행", "→ /sync"], desc: "복잡한 결정이 필요할 때. GPT가 방향을 잡으면 Claude가 실행한다.", color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe" },
            { label: "패턴 C", title: "리서치 + 실행", flow: ["Perplexity (검색)", "→ Claude 실행", "→ /sync"], desc: "최신 정보가 필요할 때. Perplexity가 찾으면 Claude가 적용한다.", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
            { label: "패턴 D", title: "검증 + 수정", flow: ["Gemini (전체 분석)", "→ Claude 수정", "→ /sync"], desc: "코드베이스 전체 검토 필요 시. Gemini 1M 토큰으로 전체를 보고 Claude가 수정한다.", color: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
          ].map((p) => (
            <div key={p.label} style={{ border: `1px solid ${p.border}`, borderRadius: 10, padding: "16px 18px", background: p.bg }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: "0.04em", background: "#fff", border: `1px solid ${p.border}`, borderRadius: 20, padding: "2px 8px" }}>{p.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{p.title}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                {p.flow.map((step) => (
                  <span key={step} style={{ fontSize: 11, color: p.color, fontWeight: 500 }}>{step}</span>
                ))}
              </div>
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* D. 주요 설계 결정 */}
      <div>
        <div style={label}>주요 설계 결정 (ADR)</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          모든 결정은 문서로 남긴다. 왜 그 결정을 했는지, 어떤 대안을 검토했는지, 어떤 영향이 있었는지. 이것이 시스템이 진화하면서도 일관성을 유지하는 방법이다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { id: "D-001", title: "SoT를 Git으로 전환", problem: "Obsidian만으로는 다른 AI가 접근 불가", solution: "Git STATE.md → GitHub Pages URL로 모든 AI 공유", impact: "AI 간 정보 동기화 해결" },
            { id: "D-003", title: "Jeff Su 폴더 방법론 채택", problem: "파일이 늘수록 구조가 무너짐", solution: "5레벨 MAX, 2자리 넘버링, 99=Archive 규칙", impact: "자동 정렬 + 명확성" },
            { id: "D-005", title: "CLAUDE.md 대폭 축소", problem: "146줄 CLAUDE.md로 매 턴 38K 토큰 낭비", solution: "4줄 핵심 + rules/ 온디맨드 로드", impact: "세션당 38,000토큰 절감" },
            { id: "D-014", title: "Orchestrator Agent 삭제", problem: "중간 레이어가 맥락 희석 + 속도 저하 (구 버전에서 존재하던 별도 Orchestrator 에이전트)", solution: "Claude가 직접 라우팅, 에이전트 직접 호출", impact: "응답 속도 향상 + 맥락 보존" },
            { id: "D-018", title: "Auto Memory 3단계 구축", problem: "세션 간 컨텍스트 완전 소실", solution: "SessionEnd→pending.md→검증→MEMORY.md", impact: "세션 재시작 시 5초 내 맥락 복구" },
          ].map((d, i, arr) => (
            <div key={d.id} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 20 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#2563eb", flexShrink: 0, marginTop: 16 }} />
                {i < arr.length - 1 && <div style={{ width: 1, flexGrow: 1, background: "#e5e5e5", margin: "4px 0" }} />}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 20 : 0, flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, marginTop: 12 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#2563eb", background: "#eff4ff", border: "1px solid #c7d7fd", borderRadius: 6, padding: "2px 8px" }}>{d.id}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{d.title}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {[
                    { l: "문제", v: d.problem, c: "#e11d48" },
                    { l: "해결", v: d.solution, c: "#059669" },
                    { l: "영향", v: d.impact, c: "#2563eb" },
                  ].map((item) => (
                    <div key={item.l} style={{ background: "#fafafa", border: "1px solid #e5e5e5", borderRadius: 8, padding: "10px 12px" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: item.c, textTransform: "uppercase", marginBottom: 4 }}>{item.l}</div>
                      <p style={{ fontSize: 11, color: "#555", lineHeight: 1.5, margin: 0 }}>{item.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* E. 설정 계층 구조 */}
      <div>
        <div style={label}>설정 계층 구조</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          Claude는 세션 시작 시 여러 레벨의 설정 파일을 자동으로 로드한다. 상위 레벨일수록 모든 프로젝트에 적용되고, 하위 레벨일수록 해당 프로젝트에만 적용된다. 이 계층 덕분에 공통 규칙은 한 번만 정의하고, 프로젝트별 규칙은 필요한 곳에만 넣을 수 있다.
        </p>
        <div style={{ fontFamily: "monospace", fontSize: 12, background: "#fafafa", border: "1px solid #e5e5e5", borderRadius: 10, padding: "20px 24px", lineHeight: 2 }}>
          {[
            { indent: 0, path: "~/.claude/CLAUDE.md", desc: "전역 원칙 (4줄)", badge: "항상 로드" },
            { indent: 0, path: "~/.claude/rules/", desc: "공통 규칙 모듈", badge: "항상 로드" },
            { indent: 0, path: "~/.claude/agents/", desc: "에이전트 14개 정의", badge: "호출 시 로드" },
            { indent: 0, path: "~/.claude/skills/", desc: "스킬 17개 정의", badge: "호출 시 로드" },
            { indent: 1, path: "C:/dev/CLAUDE.md", desc: "볼트 전역 설정", badge: "프로젝트 진입 시" },
            { indent: 2, path: "./project/.claude/CLAUDE.md", desc: "프로젝트별 규칙", badge: "해당 프로젝트만" },
            { indent: 2, path: "./project/.claude/rules/", desc: "경로별 조건부 규칙", badge: "파일 작업 시" },
            { indent: 2, path: "./project/.claude/context/", desc: "컨텍스트 라이브러리", badge: "필요 시 @import" },
          ].map((item) => (
            <div key={item.path} style={{ display: "flex", alignItems: "center", gap: 12, paddingLeft: item.indent * 24 }}>
              <span style={{ color: "#888", flexShrink: 0 }}>{item.indent === 0 ? "├" : item.indent === 1 ? "└─ ├" : "└─ └─"}</span>
              <span style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}>{item.path}</span>
              <span style={{ color: "#888" }}>—</span>
              <span style={{ color: "#555", flexShrink: 0 }}>{item.desc}</span>
              <span style={{ fontSize: 10, color: "#999", background: "#f0f0f0", borderRadius: 4, padding: "1px 6px", flexShrink: 0, marginLeft: "auto" }}>{item.badge}</span>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: "#888", margin: "12px 0 0", lineHeight: 1.6 }}>
          ENABLE_EXPERIMENTAL_MCP_CLI=true 설정으로 MCP 도구도 온디맨드 로드. 도구 정의 토큰 소모를 최소화.
        </p>
      </div>

      {/* F. Claude 에이전트 모델 선택 */}
      <div>
        <div style={label}>에이전트 모델 선택 전략</div>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: "0 0 16px" }}>
          각 에이전트는 역할에 맞는 모델을 지정한다. 무조건 Opus를 쓰면 비용이 폭증하고, 무조건 Haiku를 쓰면 품질이 떨어진다. 작업 난이도에 따라 모델을 분리하는 것이 핵심이다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {[
            { model: "Haiku", role: "수집·확인·포맷", agents: ["commit-writer", "morning-briefer"], color: "#059669", bg: "#ecfdf5", border: "#a7f3d0", desc: "빠르고 저렴. 반복 작업에 최적." },
            { model: "Sonnet", role: "분석·검색·중간 복잡도", agents: ["orch-state", "compressor", "pf-context", "pf-deployer", "gemini-analyzer"], color: "#2563eb", bg: "#eff4ff", border: "#c7d7fd", desc: "속도와 품질의 균형. 기본값." },
            { model: "Opus", role: "설계·리뷰·복잡한 실행", agents: ["code-reviewer", "pf-reviewer", "orch-doc-writer", "security-auditor"], color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", desc: "품질이 중요할 때. 핵심 결정에만." },
          ].map((m) => (
            <div key={m.model} style={{ border: `1px solid ${m.border}`, borderRadius: 10, padding: "16px 18px", background: m.bg }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.model}</div>
              <div style={{ fontSize: 11, color: "#555", fontWeight: 600, marginBottom: 10 }}>{m.role}</div>
              <p style={{ fontSize: 12, color: "#666", lineHeight: 1.5, margin: "0 0 12px" }}>{m.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {m.agents.map((a) => (
                  <span key={a} style={{ fontSize: 10, color: m.color, background: "#fff", border: `1px solid ${m.border}`, borderRadius: 4, padding: "2px 6px", fontFamily: "monospace" }}>{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 클로징 */}
      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 32 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.7, margin: "0 0 8px", borderLeft: "3px solid #2563eb", paddingLeft: 14 }}>
          이 섹션 자체가 이 시스템으로 만들어졌다.
        </p>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>
          이 포트폴리오를 보는 당신이 지금 읽고 있는 이 글도, content-writer 에이전트가 질문하고 구조를 잡고 작성했다. AI를 아주 딱딱 떨어지게 만들면서도 극한의 사용 효율을 뽑아내고 싶었다. 모든 에이전트, 스킬, CLAUDE.md가 그 하나의 문장을 향해 만들어졌다.
        </p>
      </div>

    </div>
  );
}
