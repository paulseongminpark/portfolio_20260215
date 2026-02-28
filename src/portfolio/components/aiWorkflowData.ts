// ─── HOW I AI — v4.0 Context as Currency ───
// 모든 데이터는 orchestration STATE.md + 설계문서 기준

// ─── 타입 정의 ───

export interface StatBadge {
  label: string;
  value: string;
  sub?: string;
}

export interface Principle {
  title: string;
  desc: string;
  icon: string;
}

export interface TeamInfo {
  name: string;
  label: string;
  lead: string;
  members: string[];
  color: string;
}

export interface AgentRow {
  name: string;
  team: string;
  model: string;
  role: string;
  note?: string;
}

export interface KeyDecision {
  id: string;
  title: string;
  before: string;
  after: string;
  why: string;
}

export interface AiRole {
  name: string;
  model: string;
  role: string;
  strength: string;
  limit: string;
  color: string;
}

export interface ChainStep {
  name: string;
  steps: string[];
  desc: string;
}

export interface Hook {
  name: string;
  trigger: string;
  role: string;
}

export interface TimelineItem {
  version: string;
  date: string;
  title: string;
  highlight: string;
  detail: string;
}

export interface Lesson {
  num: string;
  title: string;
  body: string;
}

// ─── 데이터 ───

export const STAT_BADGES: StatBadge[] = [
  { label: 'Agents', value: '15', sub: '24에서 축소' },
  { label: 'Skills', value: '9', sub: '14에서 축소' },
  { label: 'AI Tools', value: '4', sub: 'Claude · Codex · Gemini · Perplexity' },
  { label: 'Hooks', value: '8', sub: '자동화 파이프라인' },
];

export const PRINCIPLES: Principle[] = [
  {
    title: '1 토큰 = 1 화폐',
    desc: '200K 컨텍스트 윈도우가 세션 예산. 모든 읽기·쓰기·에이전트 호출이 비용. 남은 토큰이 곧 남은 가능성.',
    icon: '💰',
  },
  {
    title: 'Baseline 최소화',
    desc: '세션 시작 시 고정 소비를 42K 이하로. CLAUDE.md 74→38줄, 에이전트 24→15, 스킬 14→9. 쓸 수 있는 예산을 최대로.',
    icon: '📐',
  },
  {
    title: '체인으로 예산 통제',
    desc: '에이전트가 자유롭게 뛰면 토큰이 폭발. 체인이 경로를 고정하고, .chain-temp가 중간 결과를 오프로딩. 메인 컨텍스트엔 1줄 요약만.',
    icon: '⛓️',
  },
];

export const TEAMS: TeamInfo[] = [
  {
    name: 'build',
    label: '구현/배포',
    lead: 'code-reviewer',
    members: ['commit-writer', 'pf-ops', 'security-auditor'],
    color: '#3B82F6',
  },
  {
    name: 'verify',
    label: '분석/검증',
    lead: 'ai-synthesizer',
    members: ['gemini-analyzer', 'codex-reviewer'],
    color: '#8B5CF6',
  },
  {
    name: 'maintain',
    label: '문서/시스템',
    lead: 'compressor',
    members: ['doc-ops', 'linker', 'daily-ops', 'tr-ops'],
    color: '#10B981',
  },
  {
    name: 'hub',
    label: '디스패치 허브',
    lead: 'meta-orchestrator',
    members: [],
    color: '#F59E0B',
  },
];

export const AGENTS: AgentRow[] = [
  { name: 'code-reviewer', team: 'build', model: 'Opus', role: '코드 리뷰 + 품질 게이트', note: 'memory:user' },
  { name: 'commit-writer', team: 'build', model: 'Haiku', role: '커밋 메시지 생성' },
  { name: 'pf-ops', team: 'build', model: 'Sonnet', role: 'portfolio 리뷰+배포 통합' },
  { name: 'security-auditor', team: 'build', model: 'Sonnet', role: '배포 전 보안 점검' },
  { name: 'ai-synthesizer', team: 'verify', model: 'Opus', role: 'Verify Barrier — adversarial 검증', note: '3단계 검증' },
  { name: 'gemini-analyzer', team: 'verify', model: 'Sonnet', role: '벌크 추출 (Gemini CLI)' },
  { name: 'codex-reviewer', team: 'verify', model: 'Sonnet', role: '정밀 검증 (Codex CLI)' },
  { name: 'compressor', team: 'maintain', model: 'Opus', role: '9단계 세션 압축', note: 'memory:user' },
  { name: 'doc-ops', team: 'maintain', model: 'Sonnet', role: 'Living Docs 검증+작성' },
  { name: 'linker', team: 'maintain', model: 'Haiku', role: '크로스 프로젝트·세션·CLI 연결' },
  { name: 'daily-ops', team: 'maintain', model: 'Haiku', role: '모닝 브리핑+인박스 처리' },
  { name: 'tr-ops', team: 'maintain', model: 'Sonnet', role: 'tech-review 모니터+업데이트' },
  { name: 'orch-state', team: 'maintain', model: 'Sonnet', role: '방향 파악 + 다음 3액션 제안' },
  { name: 'project-context', team: 'maintain', model: 'Sonnet', role: '프로젝트별 깊은 컨텍스트 수집' },
  { name: 'meta-orchestrator', team: 'hub', model: 'Opus', role: '전체 팀 디스패치', note: 'memory:user' },
];

export const KEY_DECISIONS: KeyDecision[] = [
  {
    id: 'D-019',
    title: '빼기의 미학 — 에이전트 24→15',
    before: '24개 에이전트, 각자 독립. 기능 중복, baseline 토큰 폭발.',
    after: '유사 기능 병합 (5쌍→5개), 순수 삭제 4개. 15개로 축소.',
    why: '에이전트 하나당 ~1.5K baseline 토큰. 9개 축소로 ~13.5K 절감 → 실제 작업 2~3턴 확보. 기능보다 예산을 먼저 설계해야 한다는 걸 배웠다.',
  },
  {
    id: 'D-020',
    title: 'Verify Barrier — 외부 AI 해석 금지',
    before: 'Gemini/Codex 출력을 그대로 신뢰. 할루시네이션 전파 위험.',
    after: 'ai-synthesizer가 3단계 검증 (구조→스팟체크→반박). GO/NO-GO 판정.',
    why: 'Gemini 출력을 그대로 반영했다가 틀린 정보가 코드베이스에 들어간 적이 있다. 구조 검증 → 스팟체크 → 반박, 이 3단계 없이는 외부 AI 결과를 쓰지 않는다.',
  },
  {
    id: 'D-021',
    title: '.chain-temp 오프로딩',
    before: '체인 에이전트 결과가 메인 컨텍스트에 전부 올라옴. 토큰 폭발.',
    after: '결과를 .chain-temp/ 파일로 저장, 메인엔 1줄 요약만.',
    why: '코드 리뷰 결과 하나가 ~5K 토큰. 체인이 쌓이면 세션 후반에 작업 공간이 사라진다. 파일 오프로딩 + 1줄 요약으로 100배 절감하니 세션이 눈에 띄게 길어졌다.',
  },
  {
    id: 'D-022',
    title: 'rulesync — 규칙 단일 소스',
    before: 'CLAUDE.md, GEMINI.md, AGENTS.md를 각각 수동 관리. 불일치.',
    after: '.rulesync/rules/ SoT에서 모든 CLI 규칙 파일을 자동 생성.',
    why: 'CLAUDE.md를 수정하고 GEMINI.md 반영을 빠뜨린 적이 여러 번. CLI마다 행동이 달라지면 팀 전체가 흔들린다. 단일 소스에서 세 CLI 파일을 자동 생성하는 것이 유일한 해법.',
  },
  {
    id: 'D-023',
    title: '.ctx/ Cross-CLI 공유 메모리',
    before: 'Claude/Gemini/Codex가 서로의 작업을 모름. 중복·충돌.',
    after: '.ctx/shared-context.md 공유 상태 + provenance.log 출처 추적.',
    why: 'Claude에서 Gemini로 분석을 위임할 때마다 이전 맥락을 처음부터 설명해야 했다. 공유 상태 파일 하나가 CLI 전환 비용을 제로에 가깝게 만든다.',
  },
  {
    id: 'D-024',
    title: 'Context as Currency 예산 체계',
    before: '토큰 소비를 직관에 의존. compact 시점 판단 어려움.',
    after: '200K = Baseline 42K + 작업 58K + compact 후 50K + 체인 25K + 방어선 25K.',
    why: '"세션이 왜 이렇게 빨리 끝나지?"를 직관으로 판단했다. 200K를 5개 구간으로 분해하니 실제 작업 예산이 ~108K임을 알았고, 그때부터 /compact 시점이 즉답 가능해졌다.',
  },
];

export const AI_ROLES: AiRole[] = [
  {
    name: 'Claude Code',
    model: 'Opus 4.6',
    role: '설계자 · 결정권자 · 코드 작성자',
    strength: '유일한 쓰기 권한. 에이전트 체인, 최종 판단, verify barrier.',
    limit: '200K 컨텍스트. 토큰 = 예산.',
    color: '#D4632D',
  },
  {
    name: 'Codex CLI',
    model: 'GPT-5.3',
    role: '정밀 검증기',
    strength: 'diff 리뷰, 포맷 QA, git 히스토리 추출. 세션당 3~5회.',
    limit: '5시간 롤링 제한. Plus $20.',
    color: '#10A37F',
  },
  {
    name: 'Gemini CLI',
    model: '3.1 Pro',
    role: '벌크 추출기',
    strength: '1M 컨텍스트로 대량 파일 구조화 추출. 웹 검색.',
    limit: 'AI Pro $20. 절대 경로 필수.',
    color: '#4285F4',
  },
  {
    name: 'Perplexity',
    model: 'sonar-deep-research',
    role: '리서치 엔진',
    strength: 'tech-review 소스. deep research + sonar-pro 폴백.',
    limit: 'Pro $20. API 기반.',
    color: '#7C3AED',
  },
];

export const CHAINS: ChainStep[] = [
  {
    name: '구현',
    steps: ['implement', 'code-reviewer', 'commit-writer', 'linker'],
    desc: '코드 → 리뷰 → 커밋 → 크로스 연결. 건너뛰기 금지.',
  },
  {
    name: '배포',
    steps: ['pf-ops', 'security-auditor', '사용자 확인', 'push'],
    desc: '보안 점검 + 사용자 승인. 자동 배포 없음.',
  },
  {
    name: '검증',
    steps: ['Gemini/Codex 추출', 'ai-synthesizer verify', '사용'],
    desc: '외부 AI 출력은 반드시 verify barrier 통과.',
  },
  {
    name: '디스패치',
    steps: ['/dispatch', 'linker', 'meta-orchestrator', '팀 활성화'],
    desc: '세션 목표 → 연결 → 팀 활성화.',
  },
  {
    name: '압축',
    steps: ['/compact', 'compressor 9단계', 'doc-ops', 'verify'],
    desc: '압축 시 Living Docs 자동 갱신 + 검증.',
  },
];

export const HOOKS: Hook[] = [
  { name: 'SessionStart', trigger: '세션 시작', role: '미커밋 + 미반영 결정 + live-context + .ctx/ 공유 상태' },
  { name: 'SessionEnd', trigger: '세션 종료', role: '미커밋 경고 + MEMORY.md 줄 수 체크' },
  { name: 'PreToolUse', trigger: 'Bash 실행 전', role: '위험 명령 차단 (rm -rf, force push)' },
  { name: 'PostToolUse', trigger: 'Write/Edit 후', role: 'live-context.md auto-append + auto-trim' },
  { name: 'PreCompact', trigger: 'compact 전', role: '스냅샷 생성 + 미커밋 경고' },
  { name: 'TaskCompleted', trigger: '태스크 완료', role: '.ctx/shared-context.md 갱신 + provenance.log' },
  { name: 'TeammateIdle', trigger: '팀원 유휴', role: '유휴 알림' },
  { name: 'Notification', trigger: '시스템 알림', role: '범용 알림' },
];

export const TIMELINE: TimelineItem[] = [
  {
    version: 'v1.0',
    date: '2026-02-18',
    title: '시작',
    highlight: 'CLAUDE.md 하나로 출발',
    detail: '에이전트 5개, 수동 운영.',
  },
  {
    version: 'v2.0',
    date: '2026-02-20',
    title: '확장',
    highlight: '16 에이전트 + 19 스킬',
    detail: '가능성을 전부 실험. 기능 추가의 쾌감.',
  },
  {
    version: 'v2.1',
    date: '2026-02-22',
    title: '자동화',
    highlight: 'Hooks + 멀티 AI',
    detail: 'SessionStart 자동화. Gemini/Codex 연동.',
  },
  {
    version: 'v3.2',
    date: '2026-02-24',
    title: '구조화',
    highlight: 'SoT 확립 + 4팀',
    detail: 'STATE.md 유일한 진실 소스. 팀 구조 확립.',
  },
  {
    version: 'v3.3',
    date: '2026-02-25',
    title: '검증',
    highlight: 'Verify Barrier + e2e',
    detail: '외부 AI 3단계 검증. 23/23 테스트 통과.',
  },
  {
    version: 'v3.3.1',
    date: '2026-02-26',
    title: '경량화',
    highlight: '200K 최적화',
    detail: 'Baseline 축소, .chain-temp, compact 전략.',
  },
  {
    version: 'v4.0',
    date: '2026-02-27',
    title: 'Context as Currency',
    highlight: '24→15, 14→9',
    detail: '빼기의 미학. rulesync, .ctx/, worktree. 토큰=화폐.',
  },
];

export const LESSONS: Lesson[] = [
  {
    num: '01',
    title: '빼는 것이 더 어렵다',
    body: '에이전트를 추가하는 건 30분. 9개를 줄이는 데 이틀. 추가는 결정이고, 삭제는 이해.',
  },
  {
    num: '02',
    title: '토큰은 정말로 화폐다',
    body: '200K가 무한해 보이지만, baseline + 체인 + 여유를 빼면 실제 작업 예산은 ~108K. 에이전트 하나 줄이면 턴 2~3개가 생긴다.',
  },
  {
    num: '03',
    title: 'Claude는 설계자여야 한다',
    body: '외부 AI에 판단을 위임하면 할루시네이션이 전파된다. 추출은 외부, 해석은 Claude.',
  },
  {
    num: '04',
    title: '체인은 자유를 제한하지 않는다',
    body: '"에이전트가 알아서 하면 되지"라고 생각했다. 토큰이 3배 소비되고 나서야 경로 고정의 가치를 깨달았다.',
  },
  {
    num: '05',
    title: '문서가 곧 코드다',
    body: 'STATE.md가 틀리면 에이전트가 틀린 판단을 한다. Living Docs는 선언이 아니라 런타임 설정.',
  },
  {
    num: '06',
    title: '작은 모델의 가치',
    body: 'Haiku로 충분한 일에 Opus를 쓰면 예산 낭비. 작은 모델이 제 역할을 하면 큰 모델이 설계에 집중.',
  },
  {
    num: '07',
    title: 'Opus의 진짜 가치는 발견',
    body: '지시한 것을 실행하는 건 어떤 모델이든 한다. Opus가 다른 건 숨겨진 문제를 자발적으로 찾아내는 것.',
  },
  {
    num: '08',
    title: '7일이면 충분하다',
    body: 'v1.0에서 v4.0까지 7일. 매일 운영하면서 개선. 일단 돌리고, 느끼고, 고치기.',
  },
  {
    num: '09',
    title: '시스템은 거울이다',
    body: '설계자가 정리를 좋아하면 시스템도 정리된다. AI 오케스트레이션은 자기 자신의 작업 방식을 코드로 옮기는 일.',
  },
];

export const C = {
  bg: '#ffffff',
  bgAlt: '#f7f7f5',
  bgDark: '#111111',
  text: '#111111',
  textSub: '#555555',
  textMuted: '#999999',
  border: '#e4e0da',
  accent: '#D4632D',
  accentSub: 'rgba(212, 99, 45, 0.12)',
} as const;
