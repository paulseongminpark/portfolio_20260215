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
    name: "GPT-4o",
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
  { label: "운영", skills: ["/morning", "/todo", "/sync-all", "/catchup", "/session-insights"] },
  { label: "문서", skills: ["/docs-review", "/research", "/handoff", "/gpt-review"] },
  { label: "배포", skills: ["/commit-push-pr", "/verify", "/verify-project-rules"] },
  { label: "생성", skills: ["/skill-creator", "/subagent-creator", "/hook-creator"] },
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
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {grp.skills.map((sk) => (
                    <span
                      key={sk}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: C.purple,
                        background: C.purpleBg,
                        border: `1px solid ${C.purpleBorder}`,
                        borderRadius: 6,
                        padding: "3px 8px",
                        fontFamily: "monospace",
                      }}
                    >
                      {sk}
                    </span>
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

    </div>
  );
}
