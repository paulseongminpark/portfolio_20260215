// ── 색상 팔레트 참조 (AiWorkflowSection.tsx의 C 객체와 동기화) ──────
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

// ── 타입 정의 ─────────────────────────────────────────────────────
export interface StatBadge {
  value: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

export interface AgentGroup {
  label: string;
  agents: string[];
  color: string;
  bg: string;
  border: string;
}

export interface AiRole {
  name: string;
  role: string;
  detail: string;
  color: string;
  bg: string;
  border: string;
}

export interface Hook {
  name: string;
  desc: string;
}

export interface Skill {
  name: string;
  desc: string;
}

export interface SkillGroup {
  label: string;
  skills: Skill[];
}

export interface Automation {
  label: string;
  desc: string;
}

export interface ContextLayer {
  path: string;
  desc: string;
  level: number;
}

export interface FlowStep {
  label: string;
  agent: string;
}

export interface ModelGroup {
  model: string;
  role: string;
  agents: string[];
  color: string;
  bg: string;
  border: string;
  desc: string;
}

export interface DesignPrinciple {
  icon: string;
  title: string;
  desc: string;
}

export interface TimelineItem {
  v: string;
  date: string;
  desc: string;
}

export interface DailyPattern {
  label: string;
  title: string;
  flow: string[];
  desc: string;
  color: string;
  bg: string;
  border: string;
}

export interface LivingDoc {
  label: string;
  desc: string;
  color: string;
  bg: string;
  border: string;
}

export interface ConfigLayer {
  indent: number;
  path: string;
  desc: string;
  badge: string;
}

export interface Adr {
  id: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
}

// ── 헤드라인 배지 ─────────────────────────────────────────────────
export const BADGES: StatBadge[] = [
  {
    value: "16",
    desc: "Agents",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    value: "19",
    desc: "Skills",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    value: "9",
    desc: "Hooks",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
  {
    value: "3",
    desc: "MCP Servers",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    value: "3+",
    desc: "AI Tools",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
];

// ── 에이전트 계층 ──────────────────────────────────────────────────
export const AGENT_GROUPS: AgentGroup[] = [
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
    label: "Content",
    agents: ["morning-briefer", "content-writer"],
    color: C.rose,
    bg: C.roseBg,
    border: C.roseBorder,
  },
];

// ── 워크플로우 스텝 ───────────────────────────────────────────────
export const FLOW_STEPS: FlowStep[] = [
  { label: "brainstorm", agent: "gemini-analyzer" },
  { label: "plan", agent: "orch-doc-writer" },
  { label: "implement", agent: "Claude Code" },
  { label: "review", agent: "code-reviewer" },
  { label: "deploy", agent: "pf-deployer" },
];

// ── CLAUDE.md 계층 ────────────────────────────────────────────────
export const CONTEXT_LAYERS: ContextLayer[] = [
  {
    path: "~/.claude/",
    desc: "글로벌 규칙 · 공통 실수 패턴 · 워크플로우",
    level: 0,
  },
  { path: "C:/dev/", desc: "볼트 허브 · 프로젝트 공통 설정", level: 1 },
  { path: "./project/", desc: "프로젝트별 CLAUDE.md · rules/ 폴더", level: 2 },
];

// ── 멀티 AI 역할 분담 ─────────────────────────────────────────────
export const AI_ROLES: AiRole[] = [
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
export const HOOKS: Hook[] = [
  { name: "Stop Hook", desc: "미커밋 파일 감지 → 완료 선언 차단" },
  { name: "SessionStart", desc: "작업 로그 + git status 자동 출력" },
  { name: "SessionEnd", desc: "세션 종료 시 /sync 권장 알림" },
  { name: "PreToolUse", desc: "rm -rf, git push --force 자동 차단" },
  { name: "PostToolUse", desc: "Write/Edit 후 context 파일 변경 감지" },
  { name: "PreCompact", desc: "compact 전 /verify 권장 알림" },
  { name: "Notification", desc: "비동기 알림 처리" },
  { name: "TeammateIdle", desc: "Agent Teams 팀원 유휴 알림" },
  { name: "TaskCompleted", desc: "작업 완료 감지 알림" },
];

// ── 스킬 목록 (5그룹) ─────────────────────────────────────────────
export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "세션 관리",
    skills: [
      { name: "/morning", desc: "모든 프로젝트 현황 + TODO 통합 브리핑" },
      { name: "/catchup", desc: "새 세션 시작 시 5초 만에 이전 작업 복구" },
      { name: "/sync-all", desc: "전체 프로젝트 STATE 갱신 + git push" },
      { name: "/todo", desc: "daily-memo Inbox 동기화 + 할 일 관리" },
      { name: "/session-insights", desc: "현재 세션 토큰 소비 + 비용 분석" },
      { name: "/token-check", desc: "현재 토큰 사용량 확인 + 권장 액션" },
    ],
  },
  {
    label: "문서·리서치",
    skills: [
      { name: "/research", desc: "코드베이스 + 웹 딥 리서치 워크플로우" },
      {
        name: "/gpt-review",
        desc: "설계·플랜을 GPT 비판적 리뷰용 프롬프트로 포맷",
      },
      { name: "/docs-review", desc: "stale 문서 감지 + 업데이트 방향 제안" },
      { name: "/write", desc: "글쓰기 프로세스 — 질문 → 구조화 → 초안 → 퇴고" },
    ],
  },
  {
    label: "배포·검증",
    skills: [
      { name: "/commit-push-pr", desc: "커밋·푸시·PR 생성을 한 번에" },
      { name: "/verify", desc: "모든 프로젝트 규칙 검증 (커밋 전 실행)" },
      {
        name: "/verify-project-rules",
        desc: "브랜치·커밋 메시지·STATE 형식 검증",
      },
      { name: "/verify-log-format", desc: "LOG 파일 형식 및 태그 일관성 검증" },
    ],
  },
  {
    label: "시스템 구축",
    skills: [
      { name: "/skill-creator", desc: "새 스킬 파일 구조화 + 패키징 가이드" },
      {
        name: "/subagent-creator",
        desc: "전문 에이전트 설계 + 시스템 프롬프트 작성",
      },
      { name: "/hook-creator", desc: "Claude Code 훅 이벤트 설정 + 레퍼런스" },
    ],
  },
  {
    label: "유지·관리",
    skills: [
      { name: "/memory-review", desc: "MEMORY.md 주간 정리 및 품질 관리" },
      {
        name: "/token-mode",
        desc: "토큰 효율 모드 활성화 (간결 응답, 서브에이전트 우선)",
      },
    ],
  },
];

// ── 자동화 연동 ───────────────────────────────────────────────────
export const AUTOMATIONS: Automation[] = [
  { label: "gh CLI", desc: "PR 생성·이슈 관리 (GitHub MCP 불필요)" },
  { label: "Jekyll Blog", desc: "tech-review → GitHub Pages 자동 빌드" },
  { label: "Obsidian Git", desc: "dev-vault 10분마다 자동 커밋 동기화" },
  { label: "daily-memo", desc: "모바일 Claude Code → 브랜치 → /todo 동기화" },
];

// ── 에이전트 모델 선택 전략 ──────────────────────────────────────
export const MODEL_GROUPS: ModelGroup[] = [
  {
    model: "Haiku",
    role: "수집·확인·포맷",
    agents: ["commit-writer", "morning-briefer"],
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
    desc: "빠르고 저렴. 반복 작업에 최적.",
  },
  {
    model: "Sonnet",
    role: "분석·검색·중간 복잡도",
    agents: [
      "orch-state",
      "compressor",
      "pf-context",
      "pf-deployer",
      "gemini-analyzer",
      "pf-orchestrator",
      "ml-porter",
    ],
    color: "#2563eb",
    bg: "#eff4ff",
    border: "#c7d7fd",
    desc: "속도와 품질의 균형. 기본값.",
  },
  {
    model: "Opus",
    role: "설계·리뷰·복잡한 실행",
    agents: [
      "code-reviewer",
      "pf-reviewer",
      "orch-doc-writer",
      "security-auditor",
      "content-writer",
      "ml-experimenter",
      "orch-skill-builder",
    ],
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    desc: "품질이 중요할 때. 핵심 결정에만.",
  },
];

// ── 설계 철학 ─────────────────────────────────────────────────────
export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    icon: "①",
    title: "단일 진실 소스",
    desc: "STATE.md가 유일한 진실. 다른 경로는 읽기만 한다.",
  },
  {
    icon: "②",
    title: "쓰기 권한 분리",
    desc: "Claude Code만 파일을 쓴다. 나머지 AI는 읽기만 한다.",
  },
  {
    icon: "③",
    title: "사고는 휘발, 기록은 남는다",
    desc: "GPT 사고 → 파일 기록 → Claude 실행 → Git 영구 보존",
  },
  {
    icon: "④",
    title: "토큰은 자원",
    desc: "CLAUDE.md 146줄 → 4줄로 압축. 매 턴 38,000토큰 절감. (초기 버전 기준)",
  },
  {
    icon: "⑤",
    title: "구조가 규율을 강제한다",
    desc: "규칙이 단순할수록 일관성은 올라간다. 복잡한 규칙은 깨진다.",
  },
  {
    icon: "⑥",
    title: "자동화는 최소한으로",
    desc: "자동화가 늘수록 통제 밖의 일이 생긴다. 핵심만 자동화한다.",
  },
  {
    icon: "⑦",
    title: "세션 간 기억",
    desc: "Auto Memory 3단계: 감지 → 검증 → 정리. 세션이 끊겨도 기억한다.",
  },
];

// ── 시스템 진화 타임라인 ──────────────────────────────────────────
export const TIMELINE: TimelineItem[] = [
  {
    v: "v1.0",
    date: "2026-02-21",
    desc: "Skills 11개, Scripts 5개, Auto-Memory 3단계",
  },
  {
    v: "v2.0",
    date: "2026-02-21",
    desc: "에이전트 14개, 훅 5종, MCP 3개, Gemini CLI 연동 (초기)",
  },
  {
    v: "v2.1",
    date: "2026-02-22",
    desc: "SOT METRICS 추가, pf-orchestrator, content-writer, 훅 9종, 에이전트 16개",
  },
];

// ── 일일 작업 패턴 ────────────────────────────────────────────────
export const DAILY_PATTERNS: DailyPattern[] = [
  {
    label: "패턴 A",
    title: "단순 실행",
    flow: ["Claude Code", "→ /sync"],
    desc: "명확한 태스크. 직접 실행 후 커밋.",
    color: "#2563eb",
    bg: "#eff4ff",
    border: "#c7d7fd",
  },
  {
    label: "패턴 B",
    title: "설계 + 실행",
    flow: ["GPT (전략)", "→ 파일 기록", "→ Claude 실행", "→ /sync"],
    desc: "복잡한 결정이 필요할 때. GPT가 방향을 잡으면 Claude가 실행한다.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
  {
    label: "패턴 C",
    title: "리서치 + 실행",
    flow: ["Perplexity (검색)", "→ Claude 실행", "→ /sync"],
    desc: "최신 정보가 필요할 때. Perplexity가 찾으면 Claude가 적용한다.",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  {
    label: "패턴 D",
    title: "검증 + 수정",
    flow: ["Gemini (전체 분석)", "→ Claude 수정", "→ /sync"],
    desc: "코드베이스 전체 검토 필요 시. Gemini 1M 토큰으로 전체를 보고 Claude가 수정한다.",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
];

// ── Obsidian Living Doc ───────────────────────────────────────────
export const LIVING_DOCS: LivingDoc[] = [
  {
    label: "HOME.md",
    desc: "중앙 허브 (MOC). 모든 프로젝트 현황 + 미결 사항 + 오늘 세션 링크.",
    color: "#2563eb",
    bg: "#eff4ff",
    border: "#c7d7fd",
  },
  {
    label: "STATE.md",
    desc: "프로젝트별 단일 상태 파일. 현재 진행 중인 것 · 완료 · 다음 단계.",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
  },
  {
    label: "PLANNING.md",
    desc: "아키텍처 결정 기록 (ADR). 왜 그 결정을 했는가.",
    color: "#059669",
    bg: "#ecfdf5",
    border: "#a7f3d0",
  },
  {
    label: "KNOWLEDGE.md",
    desc: "모범 사례 + 패턴 누적. 같은 판단을 반복하지 않기 위한 참조.",
    color: "#d97706",
    bg: "#fffbeb",
    border: "#fde68a",
  },
];

// ── 설정 계층 구조 ────────────────────────────────────────────────
export const CONFIG_LAYERS: ConfigLayer[] = [
  {
    indent: 0,
    path: "~/.claude/CLAUDE.md",
    desc: "전역 원칙 (4줄)",
    badge: "항상 로드",
  },
  {
    indent: 0,
    path: "~/.claude/rules/",
    desc: "공통 규칙 모듈",
    badge: "항상 로드",
  },
  {
    indent: 0,
    path: "~/.claude/agents/",
    desc: "에이전트 16개 정의",
    badge: "호출 시 로드",
  },
  {
    indent: 0,
    path: "~/.claude/skills/",
    desc: "스킬 19개 정의",
    badge: "호출 시 로드",
  },
  {
    indent: 1,
    path: "C:/dev/CLAUDE.md",
    desc: "볼트 전역 설정",
    badge: "프로젝트 진입 시",
  },
  {
    indent: 2,
    path: "./project/.claude/CLAUDE.md",
    desc: "프로젝트별 규칙",
    badge: "해당 프로젝트만",
  },
  {
    indent: 2,
    path: "./project/.claude/rules/",
    desc: "경로별 조건부 규칙",
    badge: "파일 작업 시",
  },
  {
    indent: 2,
    path: "./project/.claude/context/",
    desc: "컨텍스트 라이브러리",
    badge: "필요 시 로드",
  },
];

// ── AI 역할 매트릭스 ──────────────────────────────────────────────
export const AI_MATRIX_ROWS = [
  {
    ai: "Claude Code",
    role: "실행 + 기록",
    write: "✅ 유일",
    spec: "파일 수정 · 커밋 · 에이전트 오케스트레이션",
  },
  {
    ai: "GPT (Codex xhigh)",
    role: "전략 · 비판 검토",
    write: "❌",
    spec: "설계 크로스 검증 · Canvas 시각화 · /gpt-review",
  },
  {
    ai: "Gemini CLI",
    role: "대규모 분석",
    write: "❌",
    spec: "1M 토큰 컨텍스트 · 코드베이스 전체 탐색",
  },
  {
    ai: "Perplexity",
    role: "실시간 리서치",
    write: "❌",
    spec: "최신 정보 · 소스 URL 포함 검색",
  },
];

// ── MCP 서버 ─────────────────────────────────────────────────────
export interface McpServer {
  name: string;
  desc: string;
}

export const MCP_SERVERS: McpServer[] = [
  { name: "sequential-thinking", desc: "복잡한 설계 단계별 분해" },
  { name: "memory", desc: "세션 간 knowledge graph" },
  { name: "desktop-commander", desc: "터미널 + 파일시스템 제어" },
];

// ── ADR ───────────────────────────────────────────────────────────
export const ADRS: Adr[] = [
  {
    id: "D-001",
    title: "SoT를 Git으로 전환",
    problem: "Obsidian만으로는 다른 AI가 접근 불가",
    solution: "Git STATE.md → GitHub Pages URL로 모든 AI 공유",
    impact: "AI 간 정보 동기화 해결",
  },
  {
    id: "D-003",
    title: "Jeff Su 폴더 방법론 채택",
    problem: "파일이 늘수록 구조가 무너짐",
    solution: "5레벨 MAX, 2자리 넘버링, 99=Archive 규칙",
    impact: "자동 정렬 + 명확성",
  },
  {
    id: "D-005",
    title: "CLAUDE.md 대폭 축소",
    problem: "146줄 CLAUDE.md로 매 턴 38K 토큰 낭비",
    solution: "4줄 핵심 + rules/ 온디맨드 로드",
    impact: "세션당 38,000토큰 절감",
  },
  {
    id: "D-014",
    title: "Orchestrator Agent 삭제",
    problem:
      "중간 레이어가 맥락 희석 + 속도 저하 (구 버전에서 존재하던 별도 Orchestrator 에이전트)",
    solution: "Claude가 직접 라우팅, 에이전트 직접 호출",
    impact: "응답 속도 향상 + 맥락 보존",
  },
  {
    id: "D-018",
    title: "Auto Memory 3단계 구축",
    problem: "세션 간 컨텍스트 완전 소실",
    solution: "SessionEnd→pending.md→검증→MEMORY.md",
    impact: "세션 재시작 시 5초 내 맥락 복구",
  },
];
