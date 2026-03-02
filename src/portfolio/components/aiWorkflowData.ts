// ─── HOW I AI — 전면 재구성 ───
// 내러티브 중심. 기술 스펙 나열 → 이야기 + 다이어그램.

// ─── 타입 정의 ───

export interface CycleStep {
  step: string;
  sub: string;
}

export interface TimelineItem {
  phase: string;
  period: string;
  title: string;
  insight: string;
  detail: string;
}

export interface HowConcept {
  title: string;
  desc: string;
}

export interface SystemTeam {
  name: string;
  label: string;
  members: string[];
  color: string;
}

export interface SystemSkill {
  name: string;
  desc: string;
}

export interface SystemHook {
  name: string;
  desc: string;
}

// ─── 색상 토큰 ───

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

// ─── 내러티브 ───

export const NARRATIVE = {
  hero: {
    title: '내 사고가 작동하는 조건을 설계했다',
    lede: 'AI를 쓴다는 것은 새로운 방식으로 생각하는 것이 아니다. 원래 생각하는 방식 그대로 — 빠르고, 여러 차원을 동시에 — 작업으로 이어지도록 만드는 것이다.',
  },
  before: [
    '미학을 공부하면서 하나의 현상 안에 얽힌 여러 차원의 요소들을 풀어 읽고 다시 연결하는 감각이 자리 잡았다. 건축과 음악, 철학과 경제학을 하나의 프레임으로 읽어내는 습관. 어떤 시스템을 설계하든, 어떤 이야기를 하든 — 이 다차원적 연결이 늘 나의 방식이었다.',
    '그런데 그 복잡함을 제때 정리하고 기록하며 필요한 순간에 다시 꺼내 쓰는 일에는 늘 과도한 에너지가 들었다. 사고의 속도는 빨랐지만 정돈되지 않은 채 흘러갔고, AI에게 매번 맥락을 처음부터 설명해야 할 때는 의지력과 사고의 흐름이 동시에 닳았다.',
  ],
  after: [
    '이제는 사고의 흐름이 끊기지 않는다. 말하면 기록되고, 기록은 누적되며, 누적된 맥락 위에서 다음 생각이 시작된다. 어제의 결정이 오늘 세션에 이미 올라와 있고, 여러 Claude Code 인스턴스가 동시에 돌아가며 머릿속의 병렬 사고를 병렬 실행으로 바꿔준다.',
    '빠르고 정교해졌다. 전에는 속도는 있었지만 정돈되지 않았고, 그 카오스가 할 수 있는 것에 제약을 줬다. Claude가 길을 잡아주고 실행 계획을 세우며 직접 실행까지 이어가면서, 흐름 자체가 달라졌다.',
  ],
  how: 'AI를 "쓴" 것이 아니라 내 사고가 작동하는 조건을 설계한 것이다.',
  cycle: '이 순환을 반복할수록 시스템은 나를 더 정확히 알게 되고, 나는 더 높은 곳에서 생각할 수 있게 된다. 디테일은 시스템이 잡아주니까, 나는 방향에만 집중하면 된다.',
  cycleToSystem: '복리 효과는 이 구조 위에서 작동한다. 사이클이 한 바퀴 돌 때마다 시스템은 나를 더 잘 알게 되고, 나는 더 높은 곳에서 생각할 수 있게 된다. 아래가 그 구조 전체다.',
  systemIntro: '이 순환이 실제로 돌아가려면 구조가 받쳐줘야 한다. 말이 자동으로 기록되고, 기록이 다음 세션의 시작점이 되며, 여러 인스턴스가 동시에 돌아가는 것. 이 흐름을 지탱하는 시스템이다.',
  systemDetail: 'Claude Code가 중앙에 있다. Build 팀이 만들고, Verify 팀이 검증하며, Maintain 팀이 맥락을 보존한다. 스킬은 반복 흐름을 자동화하고, 훅은 세션을 이어준다. 나는 방향을 정하고 말한다. 나머지는 시스템이 처리한다.',
  closing: '이제 도구를 갖췄다. 내 사고를 현실화할 시스템과 인프라를 직접 설계했고, 이 기반 위에서 더 큰 것들을 만들 준비가 됐다.',
};

// ─── HOW 다이어그램 개념 ───

export const HOW_CONCEPTS: HowConcept[] = [
  { title: '맥락이 유지된다', desc: '결정과 방향이 자동으로 기록되고, 세션이 바뀌어도 이어진다' },
  { title: '확인하고 배운다', desc: 'Obsidian에서 모든 기록을 확인하며 직접 검증한다' },
  { title: '사고가 실행이 된다', desc: '병렬 사고가 병렬 실행으로 이어진다' },
];

// ─── 선순환 사이클 (5단계) ───

export const CYCLE: CycleStep[] = [
  { step: '내가 말한다', sub: '사고의 흐름 그대로' },
  { step: 'Claude가 실행한다', sub: '길을 잡고, 계획하고, 실행' },
  { step: '기록된다', sub: 'Living Docs에 자동으로' },
  { step: '확인한다', sub: 'Obsidian에서 전체를 조망' },
  { step: '더 잘 말하게 된다', sub: '사고가 정교해진다' },
];

// ─── 시스템 아키텍처 (다이어그램 3용) ───

export const SYSTEM_ARCH = {
  orchestrator: 'Claude Code',
  teams: [
    {
      name: 'Build',
      label: '구현/배포',
      members: ['code-reviewer', 'commit-writer', 'pf-ops', 'security-auditor'],
      color: '#3B82F6',
    },
    {
      name: 'Verify',
      label: '분석/검증',
      members: ['ai-synthesizer', 'gemini-analyzer', 'codex-reviewer'],
      color: '#8B5CF6',
    },
    {
      name: 'Maintain',
      label: '문서/시스템',
      members: ['compressor', 'doc-ops', 'linker', 'daily-ops', 'tr-ops'],
      color: '#10B981',
    },
  ] as SystemTeam[],
  skills: [
    { name: '/dispatch', desc: '팀 활성화' },
    { name: '/sync', desc: '상태 동기화' },
    { name: '/compact', desc: '세션 압축' },
    { name: '/morning', desc: '모닝 브리핑' },
    { name: '/handoff', desc: 'CLI 간 위임' },
  ] as SystemSkill[],
  hooks: [
    { name: 'SessionStart', desc: '컨텍스트 로드' },
    { name: 'PostToolUse', desc: '실시간 기록' },
    { name: 'PreCompact', desc: '스냅샷 생성' },
    { name: 'SessionEnd', desc: '세션 보존' },
  ] as SystemHook[],
};

// ─── 타임라인 (3단계, 깨달음 중심) ───

export const TIMELINE: TimelineItem[] = [
  {
    phase: '1주차',
    period: '더하기',
    title: '될 수 있는 건 다 넣어봤다',
    insight: '"많을수록 좋다"는 착각',
    detail: '에이전트 24개, 스킬 14개를 하루 만에 구축했다. 각각은 이유가 있었지만 세션이 금방 끝나기 시작했다. 기능이 늘어날수록 실제 작업할 수 있는 공간은 줄었다.',
  },
  {
    phase: '2주차',
    period: '구조화',
    title: '같은 정보가 네 곳에 있었다',
    insight: '"정리가 곧 설계다"라는 발견',
    detail: '팀 구조를 만들고, 단일 진실 원천을 확립했다. 체인으로 경로를 고정하니 결과가 예측 가능해졌다. 외부 AI 출력을 그대로 반영했다가 오류가 퍼진 후 검증 체계를 도입했다.',
  },
  {
    phase: '3주차',
    period: '빼기',
    title: '줄일수록 시스템이 좋아졌다',
    insight: '"빼기가 더하기보다 어렵고, 더 가치 있다"',
    detail: '에이전트 24→15, 스킬 14→9. 하나를 줄이면 그 자리에 더 깊은 사고를 위한 공간이 생겼다. 더하기를 멈추고 빼기 시작한 순간이 전환점이었다.',
  },
];
