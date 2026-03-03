// ─── HOW I AI — 전면 재구성 ───
// 내러티브 중심. 기술 스펙 나열 → 이야기 + 다이어그램.

// ─── 타입 정의 ───

export interface CycleStep {
  step: string;
  sub: string;
}

export interface TimelineItem {
  phase: string;
  question: string;
  body: string[];
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
    lede: 'AI를 쓴다는 것은 새로운 방식으로 생각하는 것이 아니다.\n원래 생각하는 방식 그대로 — 빠르고, 여러 차원을 동시에 — 작업으로 이어지도록 만드는 것이다.',
  },
  before: [
    '미학을 공부하면서 하나의 현상 안에 얽힌 여러 차원의 요소들을 풀어 읽고 다시 연결하는 감각이 자리 잡았다. 분야를 가로질러 구조를 읽고, 겉으로 연결되지 않아 보이는 것들 사이의 관계를 찾는 것 — 어떤 시스템을 설계하든, 어떤 이야기를 하든 이것이 늘 나의 방식이었다.',
    '그런데 그 복잡함을 제때 정리하고 기록하며 필요한 순간에 다시 꺼내 쓰는 일에는 늘 과도한 에너지가 들었다. 사고의 속도는 빨랐지만 정돈되지 않은 채 흘러갔고, AI에게 매번 맥락을 처음부터 설명해야 할 때는 의지력과 사고의 흐름이 동시에 닳았다.',
  ],
  after: [
    '이제는 사고의 흐름이 끊기지 않는다. 말하면 기록되고, 기록은 누적되며, 누적된 맥락 위에서 다음 생각이 시작된다. 어제의 결정이 오늘 세션에 이미 올라와 있고, 여러 Claude Code 인스턴스가 동시에 돌아가며 머릿속의 병렬 사고를 병렬 실행으로 바꿔준다.',
    '빠르고 정교해졌다. 전에는 속도는 있었지만 정돈되지 않았고, 그 카오스가 할 수 있는 것에 제약을 줬다. Claude가 길을 잡아주고 실행 계획을 세우며 직접 실행까지 이어가면서, 흐름 자체가 달라졌다.',
  ],
  how: 'AI를 "쓴" 것이 아니라 내 사고가 작동하는 조건을 설계한 것이다.',
  cycle: '이 순환을 반복할수록 효과는 복리로 쌓인다. 세션이 거듭될수록 시스템은 내 결정 방식, 우선순위, 작업 패턴을 더 정확히 읽고 — 나는 더 적은 설명으로 더 정확한 실행을 얻는다. 처음엔 맥락을 설명하는 데 에너지를 썼다면, 지금은 방향을 정하는 데만 집중한다. 디테일은 시스템이 잡아준다.',
  cycleToSystem: '그런데 이 순환이 저절로 돌아가지는 않는다. 맥락을 이어주고, 기록을 자동화하며, 병렬 실행을 가능하게 하는 구조가 있다. 아래가 그 구조 전체다.',
  systemIntro: '이 순환이 실제로 돌아가려면 구조가 받쳐줘야 한다. 말이 자동으로 기록되고, 기록이 다음 세션의 시작점이 되며, 여러 인스턴스가 동시에 돌아가는 것. 이 흐름을 지탱하는 시스템이다.',
  systemDetail: 'Claude Code가 중앙에 있다. Build 팀이 만들고, Verify 팀이 검증하며, Maintain 팀이 맥락을 보존한다. 스킬은 반복 흐름을 자동화하고, 훅은 세션을 이어준다. 나는 방향을 정하고 말한다. 나머지는 시스템이 처리한다.',
  evolutionIntro: '내 사고의 흐름을 끊기지 않게 하기 위해서였다. 뇌에서 자동으로 일어나는 연결들 — 여러 차원을 동시에 엮고, 과거와 현재와 미래를 한꺼번에 보는 그 방식 — 을 시스템으로 만들고 싶었다. Claude Code가 그걸 가능하게 해줄 것 같았다. 그렇게 시작됐다.',
  systemAbout: [
    '한 가지 깨달은 게 있다. 이 시스템은 고정되어서는 안 된다. 여러 하네스 도구들이 계속 나오고, agent engineering을 위한 OS들이 만들어지고 있고, LLM들이 바뀌고, Claude Code도 계속 업데이트된다. 매번 따라가며 오케스트레이션을 고치는 건 불가능하고, 그럴 필요도 없다. 중요한 건 강력하고 추상적인 기반을 만들어놓고, 필요할 때 적절한 도구를 붙이고 변형하고 기록하는 것이다. 어떻게 통제할 것인가, 어떻게 시스템을 엔지니어링할 것인가 — 거버넌스가 더 중요하다.',
    '그리고 그 변화 속에서 나는 계속 일관적으로 같은 연구를 하고 있다. 어떻게 하면 더 많은 것을 더 빠르게 연결하고, 내 뇌에서 일어나는 이색적인 접합 — 여러 차원을 동시에 보고 연결하는 그 방식 — 을 어떻게 시스템으로 만들 것인가.',
  ],
  closing: '지금 이 시스템은 완성이 아니다. 기초공사다. 시스템을 계속 만들어가면서, 동시에 그 위에서 다른 것들을 쌓아올린다. 여러 방향이 동시에 확장될 수 있는 틀 — 그걸 만들고 있다. 그래서 이제 시작이다.',
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
    question: '뭘 더 만들어야 하지?',
    body: [
      '리뷰어를 만들었다. 커밋터를 만들었다. 검증자를 만들었다. 분석기, 기록자, 동기화기, 압축기. 필요가 보이면 만들었고, 이유는 항상 납득됐다. 하루 만에 24개. 시스템이 빠르게 갖춰지는 것이 흥미로웠고, 그 속도가 더 만들게 했다. 그런데 세션이 점점 짧아졌다. 맥락의 대부분이 에이전트 목록으로 채워지고 있었다. 만들수록 생각할 공간이 사라진다는 것을, 만드는 동안에는 알 수 없었다.',
    ],
  },
  {
    phase: '2주차',
    question: '이게 뭘 하는 거지?',
    body: [
      '만드는 걸 멈추고 읽기 시작했다. AI가 왜 이 구조를 선택했는지, 왜 이 순서로 배치했는지, 왜 이 둘을 연결했는지. 이해되지 않으면 멈췄다. Claude가 먼저 감지하기도 했고, 본질적인 질문을 던져서 잠깐 서게 만들기도 했다. 한 항목씩 검증하며 넘어갔다. 빠르게 만드는 것보다 느리게 이해하는 것이 더 빠른 길이었다. 멈추는 동안 구조가 보이기 시작했다 — 같은 정보가 여러 곳에 있었고, 있을 필요가 없는 연결들이 있었다.',
    ],
  },
  {
    phase: '3주차',
    question: '이건 결국 이게 아닌가?',
    body: [
      '에이전트 하나를 들여다보면 옆 에이전트와 겹쳤다. 이건 어차피 여기에 흡수되고, 저건 이걸로 쓰면 됐다. 지우면 그 기능이 다른 곳에 이미 있었다. 본질에 가까워질수록 부차적인 것들이 저절로 보였다. 잃는 기분이 들었다. 그래도 하나씩 확인했고, 고민했고, 연구했다. 결국 논리로 납득이 됐고 — 그냥 명확해졌다. 머리가 선명해지면서 connecting the dots. 24개가 15개가 됐다.',
      '진짜 변화는 숫자가 아니었다. 빼고 남은 것들 사이에 유기적인 연결이 생겼다. 고정된 시스템이 아니라, 도구가 바뀌어도 기반은 유지되는 구조. 중요한 건 무엇을 쓰느냐가 아니라 어떻게 통제하느냐였다. 그리고 그 위에서 Claude가 나의 사고를 정리하고, 기록하고, 이어주고, 본질적인 질문으로 방향을 잡아주는 루프가 돌기 시작했다. 시스템이 나를 알게 됐고, 나는 더 큰 그림을 다룰 수 있게 됐다.',
    ],
  },
];
