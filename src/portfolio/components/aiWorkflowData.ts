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
  strengthSub?: string;
  limit: string;
  limitSub?: string;
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
    desc: 'AI와 대화할 수 있는 공간은 정해져 있다. 파일을 열거나 에이전트를 부를 때마다 그 공간이 줄어들고, 한번 쓴 공간은 돌아오지 않는다. 얼마나 남아있느냐가 이번 세션에서 얼마나 깊이 갈 수 있느냐를 결정한다.',
    icon: '💰',
  },
  {
    title: 'Baseline 최소화',
    desc: '아무것도 하지 않아도 세션이 시작되는 순간 공간의 일부는 이미 나간다. 시스템 설명, 에이전트 목록, 규칙 파일이 자리를 차지하기 때문이다. 이 고정 비용을 줄일수록 실제 일할 수 있는 공간이 넓어진다.',
    icon: '📐',
  },
  {
    title: '체인으로 예산 통제',
    desc: '에이전트에게 방향을 주지 않으면, 같은 목적지에 가는데도 돌아가는 길을 택하거나 중간에 불필요한 것들을 불러오곤 한다. 미리 검증된 경로를 고정해두면 공간을 낭비하지 않고 매번 일관된 결과를 얻을 수 있다.',
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
    why: '에이전트를 하나 추가할 때마다, 아무것도 하지 않아도 그 에이전트의 설명이 자리를 차지한다. 9개를 줄이고 나서야 실제 작업에 쓸 수 있는 공간이 눈에 띄게 늘었다. 기능을 먼저 설계하는 게 아니라, 예산부터 설계해야 한다는 걸 그때 배웠다.',
  },
  {
    id: 'D-020',
    title: 'Verify Barrier — 외부 AI 해석 금지',
    before: 'Gemini/Codex 출력을 그대로 신뢰. 할루시네이션 전파 위험.',
    after: 'ai-synthesizer가 3단계 검증 (구조→스팟체크→반박). GO/NO-GO 판정.',
    why: 'Gemini가 분석한 결과를 그대로 반영했다가 틀린 정보가 코드 안으로 들어온 적이 있다. 외부 AI는 자신이 틀렸다는 걸 스스로 알려주지 않는다. 그래서 결과를 받으면 반드시 다른 눈으로 한 번 더 확인하는 단계를 고정했다.',
  },
  {
    id: 'D-021',
    title: '중간 결과 파일 저장',
    before: '에이전트가 리뷰 결과를 내놓을 때마다 대화 공간 안에 그대로 쌓임.',
    after: '결과를 파일에 저장하고, 대화 안에는 한 줄 요약만 남김.',
    why: '에이전트가 리뷰를 마칠 때마다 그 결과가 대화 공간 안에 쌓였다. 몇 번만 돌면 공간이 금방 차버렸고, 세션 후반에는 더 이상 복잡한 작업을 이어갈 수가 없었다. 파일에 저장하고 대화엔 한 줄만 남기는 방식으로 바꾸니 세션이 눈에 띄게 길어졌다.',
  },
  {
    id: 'D-022',
    title: 'rulesync — 규칙 단일 소스',
    before: 'CLAUDE.md, GEMINI.md, AGENTS.md를 각각 수동 관리. 불일치.',
    after: '하나의 소스에서 모든 AI 규칙 파일을 자동으로 생성.',
    why: 'Claude용 규칙 파일을 고치고 Gemini용은 깜빡한 적이 여러 번 있었다. 같은 일을 하는 AI들이 서로 다른 규칙으로 움직이면 팀 전체가 삐걱거린다. 한 곳에서만 수정하면 나머지는 자동으로 따라오게 만드는 것이 유일한 해법이었다.',
  },
  {
    id: 'D-023',
    title: 'Cross-CLI 공유 메모리',
    before: 'Claude/Gemini/Codex가 서로의 작업을 모름. 매번 배경 설명부터.',
    after: '공유 상태 파일 하나로 세 AI가 같은 맥락을 바라봄.',
    why: 'Claude에서 Gemini로 작업을 넘길 때마다, 지금 어디까지 왔는지를 처음부터 다시 설명해야 했다. 이 배경 설명에 드는 공간이 적지 않았다. 두 AI가 같은 파일을 보고 있으면 이 설명이 사라진다.',
  },
  {
    id: 'D-024',
    title: 'Context as Currency 예산 체계',
    before: '세션이 빨리 끝나는 느낌은 있었지만, 공간이 어디서 사라지는지 몰랐음.',
    after: '전체 공간을 용도별로 쪼개 수치로 파악. 언제 압축할지 즉답 가능.',
    why: '"세션이 왜 이렇게 빨리 끝나지?"라는 느낌은 있었는데 어디서 사라지는지는 몰랐다. 전체 공간을 용도별로 쪼개서 봤더니 실제 일을 할 수 있는 공간이 절반을 조금 넘는 수준이라는 게 보였다. 수치를 알고 나서야 언제 압축할지를 즉각적으로 판단할 수 있게 됐다.',
  },
];

export const AI_ROLES: AiRole[] = [
  {
    name: 'Claude Code',
    model: 'Opus 4.6',
    role: '설계자',
    strength: '유일한 쓰기 권한',
    strengthSub: '에이전트 체인 · 최종 판단 · verify barrier',
    limit: '200K 컨텍스트',
    limitSub: '토큰 = 예산',
    color: '#D4632D',
  },
  {
    name: 'Codex CLI',
    model: 'GPT-5.3',
    role: '검증기',
    strength: 'diff 리뷰',
    strengthSub: '포맷 QA · git 히스토리 추출 · 세션당 3~5회',
    limit: '5시간 롤링 제한',
    limitSub: 'codex --bypass-approvals',
    color: '#10A37F',
  },
  {
    name: 'Gemini CLI',
    model: '3.1 Pro',
    role: '추출기',
    strength: '1M 컨텍스트로 대량 파일 구조화 추출',
    strengthSub: '웹 검색',
    limit: '절대 경로 필수',
    limitSub: 'gemini --yolo --sandbox',
    color: '#4285F4',
  },
  {
    name: 'Perplexity',
    model: 'sonar-deep-research',
    role: '리서치 엔진',
    strength: 'tech-review 소스',
    strengthSub: 'deep research · sonar-pro 폴백',
    limit: 'API 기반',
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
    highlight: '하나의 파일로 출발',
    detail: '에이전트 5개, 모든 게 수동이었다. 단순했지만 그래서 빨랐다.',
  },
  {
    version: 'v2.0',
    date: '2026-02-20',
    title: '확장',
    highlight: '가능한 걸 다 넣어봤다',
    detail: '기능이 늘어날수록 세션이 빨리 끝났다. 뭔가 잘못됐다는 느낌.',
  },
  {
    version: 'v2.1',
    date: '2026-02-22',
    title: '자동화',
    highlight: '처음으로 자동으로 돌아갔다',
    detail: '세션 시작이 달라졌다. AI가 여럿이 되었다.',
  },
  {
    version: 'v3.2',
    date: '2026-02-24',
    title: '구조화',
    highlight: '처음으로 한눈에 보였다',
    detail: '어디에 무엇이 있는지, 어떤 팀이 무엇을 하는지.',
  },
  {
    version: 'v3.3',
    date: '2026-02-25',
    title: '검증',
    highlight: '믿을 수 있는 기반을 쌓았다',
    detail: '외부 AI 결과를 그대로 쓰지 않기로 했다.',
  },
  {
    version: 'v3.3.1',
    date: '2026-02-26',
    title: '경량화',
    highlight: '무겁다는 느낌의 원인을 찾았다',
    detail: '고정 비용을 수치로 보니 어디서 공간이 사라지는지 보였다.',
  },
  {
    version: 'v4.0',
    date: '2026-02-27',
    title: 'Context as Currency',
    highlight: '더하기를 멈추고, 빼기 시작했다',
    detail: '에이전트 9개, 스킬 5개를 지웠다. 줄일수록 시스템이 좋아졌다.',
  },
];

export const LESSONS: Lesson[] = [
  {
    num: '01',
    title: '빼는 것이 더 어렵다',
    body: '에이전트를 추가하는 건 30분이면 충분하지만, 9개를 정리하는 데는 이틀이 걸렸다. 추가는 "이것도 되면 좋겠다"는 가벼운 결정이지만, 삭제는 그 에이전트가 왜 필요했고 지금 왜 필요하지 않은지를 완전히 이해해야 가능하다. 처음부터 "빼기가 더 어렵다"는 걸 알고 시작하면, 추가 결정 자체가 훨씬 신중해진다.',
  },
  {
    num: '02',
    title: '토큰은 정말로 화폐다',
    body: '200K context가 무한해 보이지만, 세션 로드 baseline과 체인 실행 예산, 여유분을 제하면 실제 작업 가능한 예산은 약 108K 수준이다. 에이전트 하나를 줄이면 그 자리에 턴 2~3개가 생기고, 더 복잡한 작업을 끝까지 이어갈 수 있게 된다. 토큰을 시간이나 예산처럼 명시적으로 관리하기 시작하면 시스템 설계 전체가 달라진다.',
  },
  {
    num: '03',
    title: 'Claude는 설계자여야 한다',
    body: '외부 AI(Gemini, Codex)에게 해석과 판단을 맡기면, 그쪽에서 발생한 할루시네이션이 파이프라인을 타고 전체로 퍼진다. 외부 CLI는 대용량 데이터 추출과 검색에만 활용하고, 해석과 최종 판단은 반드시 Claude가 직접 담당해야 한다. 이 원칙 하나를 지키는 것만으로 시스템 신뢰도가 눈에 띄게 올라갔다.',
  },
  {
    num: '04',
    title: '체인은 자유를 제한하지 않는다',
    body: '처음에는 "에이전트가 알아서 최적 경로를 찾으면 되지 않나"라고 생각했다. 실제로 자유도를 열어두었더니 같은 작업에 토큰이 3배 이상 소비되고, 결과 일관성도 뚝 떨어졌다. 체인은 가능성을 막는 게 아니라, 이미 검증된 경로를 매번 재탐색하는 낭비를 없애는 것이다.',
  },
  {
    num: '05',
    title: '문서가 곧 코드다',
    body: 'STATE.md가 한 줄이라도 틀리면, 그 문서를 읽고 판단하는 에이전트가 그대로 틀린 결정을 내린다. Living Docs는 "기록해두면 좋다"는 선언 문서가 아니라, 에이전트가 매 턴 참조하는 런타임 설정 파일이다. 문서를 업데이트하는 일이 코드를 커밋하는 것만큼 중요한 작업이라는 인식이 필요하다.',
  },
  {
    num: '06',
    title: '작은 모델의 가치',
    body: 'Haiku로 충분한 요약·연결·상태 관리 작업에 Opus를 투입하면 비용과 응답 시간 모두 낭비가 된다. 작은 모델이 빠르게 제 역할을 처리할수록, 큰 모델은 진짜 설계와 검증에만 집중할 수 있다. 모델 선택은 "더 좋은 것"을 고르는 문제가 아니라 역할을 정확하게 분리하는 문제다.',
  },
  {
    num: '07',
    title: 'Opus의 진짜 가치는 발견',
    body: '지시한 것을 정확히 실행하는 건 어떤 모델도 잘 한다. Opus가 다른 건, 명시적으로 요청하지 않은 숨겨진 문제나 리스크를 자발적으로 찾아내는 능력이다. 이 "발견" 역량 때문에 Opus는 코드 리뷰, 설계 검증처럼 빠뜨리면 나중에 반드시 문제가 생기는 단계에 배치된다.',
  },
  {
    num: '08',
    title: '시스템은 거울이다',
    body: '설계자가 정리를 좋아하면 에이전트 구조도 깔끔하게 정돈되고, 빠르게 진행하는 스타일이면 체인도 짧고 직선적으로 구성된다. AI 오케스트레이션 시스템은 결국 자기 자신의 작업 방식, 판단 기준, 그리고 습관을 코드로 옮긴 것이다. 시스템을 들여다보면 그것을 만든 사람이 어떻게 일하는지 보인다.',
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
