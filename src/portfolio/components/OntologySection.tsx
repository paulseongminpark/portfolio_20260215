import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { FadeIn } from "./FadeIn";

/* ── Graph ──────────────────────────────────────────────────────── */

const NODES = [
  { label: "문제",            x: 120,  y: 155 },
  { label: "기존에 있는 것들",  x: 265,  y: 250 },
  { label: "내가 원한 것",     x: 395,  y: 130 },
  { label: "어디서 출발했나",   x: 535,  y: 265 },
  { label: "어떻게 설계했나",   x: 665,  y: 145 },
  { label: "틀렸던 것들",      x: 800,  y: 250 },
  { label: "채택 / 비채택",    x: 915,  y: 140 },
  { label: "지금, 그리고 다음", x: 1040, y: 240 },
];

const EDGES: { from: number; to: number; label: string; dash: boolean }[] = [
  { from: 0, to: 1, label: "contextualizes", dash: false },
  { from: 0, to: 2, label: "motivates",      dash: true  },
  { from: 1, to: 2, label: "differentiates", dash: false },
  { from: 2, to: 3, label: "inspired_by",    dash: false },
  { from: 3, to: 4, label: "led_to",         dash: false },
  { from: 4, to: 5, label: "revealed",       dash: false },
  { from: 5, to: 6, label: "resulted_in",    dash: false },
  { from: 6, to: 7, label: "converges_to",   dash: false },
];

const COLORS = ["#D4632D","#6b9fd4","#8888cc","#7aaa8a","#b05c38","#5880b4","#9b8ec4","#888888"];
const RI = 20, RO = 28;

function Graph({ cur, readSet, onNodeClick }: {
  cur: number; readSet: Set<number>; onNodeClick: (i: number) => void;
}) {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <svg viewBox="0 100 1160 240"
      style={{ width: "100%", maxWidth: 1160, display: "block", margin: "0 auto 16px" }}>
      <defs>
        <filter id="gv" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="gc" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {EDGES.map((e, i) => {
        const f = NODES[e.from], t = NODES[e.to];
        const active = e.from===cur||e.to===cur||e.from===hov||e.to===hov;
        const dim = hov !== null && !active;
        const mx=(f.x+t.x)/2, my=(f.y+t.y)/2;
        const dx=t.x-f.x, dy=t.y-f.y, len=Math.sqrt(dx*dx+dy*dy)||1;
        const off = e.dash ? 35 : 12;
        const cx=mx-(dy/len)*off, cy=my+(dx/len)*off;
        const lx=mx-(dy/len)*(off*.5), ly=my+(dx/len)*(off*.5)-5;
        const sel = e.from===cur||e.to===cur;
        return (
          <g key={i}>
            <path d={`M${f.x},${f.y} Q${cx},${cy} ${t.x},${t.y}`} fill="none"
              stroke={active?"rgba(0,0,0,0.35)":"rgba(0,0,0,0.12)"}
              strokeWidth={e.dash?.5:.8} strokeDasharray={e.dash?"4,4":undefined}
              opacity={dim?.06:1} style={{transition:"opacity 0.2s"}}/>
            <text x={lx} y={ly} textAnchor="middle" fontSize={7.5}
              fontFamily="Inter, sans-serif" fontWeight={sel?500:300}
              fill={sel?"#D4632D":active?"rgba(0,0,0,0.45)":"rgba(0,0,0,0.18)"}
              opacity={dim?.06:1}
              style={{transition:"fill 0.25s,opacity 0.2s",userSelect:"none"}}>
              {e.label}
            </text>
          </g>
        );
      })}

      {NODES.map((n, i) => {
        const isCur=i===cur, color=COLORS[i];
        const conn = hov===null||hov===i||
          EDGES.some(e=>(e.from===hov&&e.to===i)||(e.to===hov&&e.from===i));
        return (
          <g key={i} style={{cursor:"pointer",transition:"opacity 0.2s"}}
            opacity={hov!==null&&!conn?.08:1}
            onClick={()=>onNodeClick(i)}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}>
            <circle cx={n.x} cy={n.y} r={RO} fill="none"
              stroke={color} strokeWidth={.8} strokeOpacity={isCur?.55:.25} filter="url(#gv)"/>
            <circle cx={n.x} cy={n.y} r={RI} fill={color}
              fillOpacity={isCur?.38:readSet.has(i)?.25:.18}
              stroke={color} strokeWidth={isCur?1.5:1} strokeOpacity={isCur?.95:.65} filter="url(#gc)"/>
            <text x={n.x} y={n.y+4} textAnchor="middle" fontSize={11} fontWeight={600}
              fontFamily="Inter, sans-serif"
              fill="rgba(0,0,0,0.7)" style={{userSelect:"none",pointerEvents:"none"}}>
              {i+1}
            </text>
            <text x={n.x} y={n.y+RO+14} textAnchor="middle"
              fontSize={9.5} fontWeight={isCur?600:400}
              fontFamily="'Noto Sans KR', sans-serif"
              fill={color} fillOpacity={isCur?.9:.7}
              style={{userSelect:"none",pointerEvents:"none"}}>
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Spread Data ─────────────────────────────────────────────────── */

interface Spread { phase: number; title: string; isFirst: boolean; left: string; right: string; }

// Phase → first spread index
const PHASE_START = [0, 1, 2, 4, 8, 10, 12, 13];

const SPREADS: Spread[] = [
  /* ── Phase 1 ── */
  {
    phase: 1, title: "문제", isFirst: true,
    left:
`### 매번 백지에서 시작한다
AI와 대화를 시작할 때마다 어제 무슨 결정을 했는지, 어디서 멈췄는지, 왜 그 방향을 골랐는지 — 아무것도 남아있지 않다. 세션이 끊기면 맥락이 사라진다. 매번 처음부터 설명해야 한다. "나는 이런 프로젝트를 하고 있고, 어제 여기까지 했고, 이 결정을 이런 이유로 내렸고..." 세션당 8,000토큰이 일을 시작하기도 전에 소모됐다. 맥락을 전달하는 비용이 실제 작업보다 클 때도 있었다.

### 기록은 쌓이는데 연결이 안 된다
Obsidian에 수백 개의 노트가 있다. 하지만 AI는 그걸 연결해서 이해할 수가 없다. 이 결정이 저 결정과 왜 연결되는지, 이 실패가 저 성공과 어떤 관계인지 — 사람 머릿속에서는 자동으로 연결되지만, 시스템에서는 아니다.`,
    right:
`### 이건 도구의 문제가 아니라 설계의 문제였다
단순히 더 좋은 검색 엔진이 필요한 게 아니었다. 기억이 쌓이기만 하고 성숙하지 않는 것이 문제였다. 어떤 기억이 중요하고 어떤 기억이 노이즈인지 구분하는 메커니즘 자체가 없었다. 뇌는 이걸 자동으로 한다 — 자주 떠올리는 것은 강해지고, 안 쓰는 것은 흐려진다. 시스템에는 그런 게 없었다.`,
  },

  /* ── Phase 2 ── */
  {
    phase: 2, title: "기존에 있는 것들", isFirst: true,
    left:
`2024년을 전후로 AI 에이전트에 메모리를 붙이려는 시도가 폭발적으로 늘었다. 대부분은 같은 문제 — "세션이 끊기면 맥락이 사라진다" — 를 풀고 있었다. 14개 리서치에서 5개 AI가 독립적으로 발견한 112개 프로젝트/논문/이론을 전수 조사한 결과, 풍경은 이렇게 나뉜다.

**Mem0** — 가장 널리 쓰이는 에이전트 메모리 오픈소스다. 벡터 검색과 구조화된 메타데이터로 기억을 저장하고 유사한 것을 찾아준다. 하지만 기억 사이의 관계를 학습하거나 성숙하는 메커니즘이 없다. 한 번 저장된 정보는 시간이 지나도 같은 자리에 머문다. 낱장 카드를 잘 정리하는 서랍장이지, 뉴런이 아니다.

**Letta (MemGPT)** — OS의 가상 메모리 기법을 LLM에 적용한 것(Packer et al., 2023). 핵심 기억과 아카이브를 분리하고, 모델이 직접 메모리를 관리하게 한다. 컨텍스트 윈도우를 효율적으로 쓰는 영리한 접근이지만, 지식의 성숙이나 연결 학습은 다루지 않는다.

**Graphiti/Zep** — 시간 인식(temporal) 지식 그래프 프레임워크. 기억에 시간 축을 붙인다는 점에서 가장 가까웠다. 하지만 시간은 메타데이터 차원이지 학습 메커니즘이 아니다. bi-temporal validity — 사실의 유효 기간과 시스템 기록 시점을 분리하는 것 — 까지는 가지 않았다.

**LangMem** — LangChain의 에이전트 메모리 라이브러리. 범용적이고 접근성이 좋지만, 온톨로지 구조나 학습 메커니즘 없이 단순 저장/검색에 머문다.

**Cognee** — 온톨로지 그라운딩을 시도한 점에서 흥미롭다. 데이터를 지식 엔진으로 변환하려는 접근. 하지만 개인의 사고 외부화보다 데이터 파이프라인에 초점이 있다.`,
    right:
`### 학술 연구

**Kairos** — 가장 유사한 연구. OpenReview에 게재된 "Validation-Gated Hebbian Learning" — 심볼릭 지식 그래프에 시냅스 가소성을 적용했다. 검증 게이트를 통과해야만 연결이 강화되는 메커니즘. 우리 시스템의 승격 파이프라인과 가장 가깝다. 하지만 연구 프로토타입이다. production-ready 오픈소스로 돌아가지는 않는다.

**A-MEM** — 에이전트 메모리의 자율적 통합을 시도. 기억 항목이 스스로 연결되고 재구성되는 메커니즘. 흥미로운 방향이지만 개인 지식 그래프와는 스코프가 다르다.

**CoALA** (Sumers et al., 2023) — LLM 에이전트를 모듈형 메모리와 액션으로 정의한 프레임워크. 우리 시스템의 recall/remember/learn이 이 프레임과 구조적으로 정합된다. 우리가 독립적으로 도달한 설계가 학술적으로 검증된 프레임워크와 일치한다는 것 — 이건 방향이 맞다는 신호다.

**GraphRAG** (Microsoft, 2024+) — 지식 그래프를 활용한 RAG 성능 강화. 검색 품질 개선의 참고가 되지만, 학습/성숙 메커니즘이 없다.`,
  },

  /* ── Phase 3 · Spread 1 ── */
  {
    phase: 3, title: "내가 원한 건", isFirst: true,
    left:
`### 뇌의 다차원적 연결을 외부화하는 것

뇌에서는 자동으로 일어나는 일이 있다. 과거-현재-미래를 동시에 보고, 분야를 가로질러 구조를 읽고, 겉으로 연결되지 않아 보이는 것들 사이의 관계를 찾는다. "모든 현상을 다차원으로 해석하는 것이 사고의 본질이다." 그것을 외부화하고 싶었다.

미학을 공부하면서 하나의 현상 안에 얽힌 여러 차원의 요소들을 풀어 읽고 다시 연결하는 감각이 자리 잡았다. 학창시절 예술, 철학, 건축, 음악을 미학이라는 관점으로 연결했다면, 이제는 AI가 하나의 판 위에 있다. 여러 도메인 사이에서 패턴을 보고 연결을 만드는 것 — 이색적인 접합 — 이 내 사고의 본질이다. 그런데 이 연결은 머릿속에서만 일어나고, 기록되지 않고, 공유되지 않는다.`,
    right:
`### AI가 나를 "아는" 것

"Claude가 Paul을 총체적으로 알게 하기. 단순 정보 저장이 아니라 — Paul을 강화시키는 루프."

AI가 규칙을 따르는 것과, 사고방식을 이해하는 것은 다르다. 전자는 "이 파일은 이 형식으로 저장해라." 후자는 "이 사람은 여러 도메인을 동시에 보고, 빼기를 더하기보다 어렵게 여기며, 본질 축소를 반복적으로 추구한다." 후자를 위해서는 관찰이 체계적으로 수집되어야 한다. 처음 본 패턴은 관찰로, 반복되면 신호로, 충분히 검증되면 원칙으로. 이 성숙 과정이 설계되어야 한다.`,
  },

  /* ── Phase 3 · Spread 2 ── */
  {
    phase: 3, title: "내가 원한 건", isFirst: false,
    left:
`이걸 시스템으로 만들고 싶었다. "기억이 아니라 뉴런. 연결이 곧 지식이고, 연결이 강화되고 약화되는 것이 곧 학습이다." 단순 검색이 아니라 — 이 개념과 저 개념 사이에 경로가 있는 것. 그 경로가 자주 쓰이면 강해지고, 안 쓰이면 약해지는 것. 뇌가 하는 것과 같은 것.`,
    right:
`### 이색적 접합을 가능하게 하는 구조

"이색적인 접합은 타입 개수로 만들어지는 게 아니다. edge 설계와 recall() 검색이 핵심이다."

서로 다른 도메인의 개념이 만나는 경로를 설계하는 것. 미학에서 나온 통찰과 시스템 설계 원칙 사이에, AI 논문의 발견과 커뮤니티 운영 경험 사이에 — 연결이 존재할 수 있다는 것을 시스템이 아는 것. 네트워크 과학에서 이것을 "구조적 공백(structural holes)"이라 부른다(Burt, 1992) — 단절된 커뮤니티 사이의 빈 공간을 잇는 노드가 가장 높은 정보 가치를 가진다. 이색적 접합은 바로 이 구조적 공백을 의도적으로 탐색하는 것이다.`,
  },

  /* ── Phase 4 · Spread 1 ── */
  {
    phase: 4, title: "어디서 출발했나", isFirst: true,
    left:
`### 1세대 기반: 철학과 고전 신경과학

**들뢰즈의 잠재성 → 현실화.** 온톨로지 설계의 철학적 출발점은 들뢰즈다. 잠재적인 것(virtual)이 현실화(actual)되는 과정 — 이것을 지식 그래프의 성숙 과정으로 치환했다. 가벼운 관찰(Signal)이 반복되면 패턴(Pattern)이 되고, 패턴이 충분히 검증되면 원칙(Principle)이 된다.

**Hebbian Learning과 BCM.** "함께 발화하면, 함께 연결된다" — Hebb(1949). 하지만 순수 Hebbian은 과잉 연결로 간다. BCM(Bienenstock-Cooper-Munro, 1982)의 적응형 임계값이 이 문제를 해결한다 — 활동이 높으면 기준도 올라서 강한 자극만 연결을 강화한다.

**UCB와 DMN.** 탐색과 활용의 균형. UCB(Upper Confidence Bound)로 약한 연결도 확률적으로 탐색한다. 뇌의 DMN(Default Mode Network)이 깨어있는 시간의 20~30%를 "멍때리기"에 쓰며 약한 연결을 탐색하는 것에서 영감을 받았다.

**확장된 마음.** Clark & Chalmers(1998). 외부 기록이 내부 기억과 기능적으로 동등하려면: 항시 접근 가능, 직접 신뢰, 자동 활용. 여기에 Gemini가 제4 조건을 추가했다 — 유지보수성.`,
    right:
`### 2세대 기반: 2010+ 뇌과학의 정밀 메커니즘

**시냅스 태깅과 기억 고착화 (STC).** Redondo(2011). 경험 직후의 기억은 "태그"만 달린 불안정한 상태다. 이 태그가 전역 가소성 자원과 만나야만 장기 기억으로 고착된다. 우리 시스템의 승격 파이프라인 — Signal이 바로 Principle이 되지 않고, 검증 게이트를 통과해야 하는 것 — 이 정확히 이 메커니즘이다.

**상보적 학습 시스템 (CLS).** McClelland(1995), Go-CLS(Kumaran et al., 2016). 뇌는 두 개의 학습 시스템을 가지고 있다. 해마(빠른 학습)와 신피질(느린 학습). 해마에서 빠르게 저장한 후, 수면 중 선택적으로 신피질에 통합된다. 이것이 Observation(빠른 저장)과 Principle(느린 고착화)의 이원 구조를 뒷받침한다.

**Successor Representation.** Haga(2025). 공간 탐색과 개념 탐색을 동일한 행렬로 통합하는 모델. "다음에 어디로 갈 수 있는가"를 표현하는 보상 예측 행렬.

**항상성 가소성.** Turrigiano(2012). 전체 네트워크의 활성도를 안정화시키는 전역 스케일링. BCM의 적응형 임계값과 상보적으로 작동하는 메커니즘.`,
  },

  /* ── Phase 4 · Spread 2 ── */
  {
    phase: 4, title: "어디서 출발했나", isFirst: false,
    left:
`### 3세대 기반: 온톨로지 학술과 지식 성숙

**DOLCE와 형식 온톨로지.** DOLCE(Borgo et al., 2023)는 언어와 인지 공학을 위한 기술적 온톨로지다. 우리가 차용한 것은 전체 DOLCE가 아니라 DOLCE-lite — 이벤트/프로세스와 지속체(continuant)를 구분하는 상위 구조. 기억(지속체)과 기억의 성숙 과정(프로세스)은 다른 종류의 존재다.

**OBO/GO 거버넌스.** 생물학 온톨로지 커뮤니티(Open Biomedical Ontologies)가 수십 년간 실행해온 온톨로지 운영 규칙. 용어 변경 시 버전 관리, 폐기(deprecated) 처리, 상호 참조 유지. 온톨로지는 설계물이 아니라 운영 프로세스라는 교훈. 이것이 "타입을 바꿔도 기존 데이터가 깨지지 않는 구조"의 학술적 근거가 된다.

**OntoClean.** Guarino & Welty. 메타속성(rigidity, identity, unity)을 이용해 타입 계층의 일관성을 검증하는 방법론. 50개 타입을 15개로 줄일 때, 어떤 타입이 진짜 타입이고 어떤 것이 속성(facet)인지 판단하는 데 이 프레임이 참고가 됐다.`,
    right:
`### 4세대 기반: 인식론과 지식의 성숙

**근거이론과 이론적 포화.** Glaser & Strauss. 핵심 개념: 이론적 포화(theoretical saturation) — 새로운 데이터가 더 이상 기존 패턴을 바꾸지 않는 시점. 우리 시스템에서 Signal이 Pattern으로 승격되는 조건이 정확히 포화 개념이다.

**SECI 모델.** Nonaka(1994). 암묵지와 형식지의 상호작용: 사회화→외부화→결합→내면화. 사용자의 암묵적 패턴이 Claude의 관찰을 통해 외부화(Observation→Signal)되고, 검증을 거쳐 형식지(Pattern→Principle)가 되는 과정이 이 모델과 구조적으로 정합된다.

**이중고리 학습.** Argyris(1978). 단일고리 학습은 규칙 안에서 조정하는 것. 이중고리 학습은 규칙 자체를 바꾸는 것. Signal→Pattern은 단일고리, Pattern→Principle은 이중고리에 해당한다.

**Gettier 문제와 지식의 정당화.** Gettier(1963). "정당화된 참인 믿음"만으로는 지식이 아니다. 검증 게이트가 빈도(양)가 아니라 정당화(질)를 봐야 하는 이유.

**서사 정체성 이론.** McAdams. 자아를 과거-현재-미래를 엮는 유기적 이야기로 해석한다. 우리 시스템의 인지적 방화벽은 이 서사의 핵심(Value, Principle)을 보호하는 장치다.`,
  },

  /* ── Phase 4 · Spread 3 ── */
  {
    phase: 4, title: "어디서 출발했나", isFirst: false,
    left:
`### 엔터프라이즈

**Palantir Foundry** — 기업용 온톨로지 시스템. 메타데이터와 인스턴스를 분리하는 구조 — Semantic(명사)과 Kinetic(동사)의 이원론 — 이건 배울 점이 있었고, 차용했다. 특히 Kinetic Elements — 온톨로지가 정적 분류표가 아니라 액션과 트랜잭션을 실행하는 층이 된다는 개념 — 가 중요했다. 하지만 Palantir는 기업의 데이터를 구조화하는 시스템이지, 개인의 사고를 외부화하는 시스템이 아니다.

### 인지 아키텍처

**ACT-R** (Anderson et al., 2004) — 인간 인지를 모사한 아키텍처. 특히 activation-based retrieval이 핵심이다. 기억의 인출 점수를 기저 수준(base-level, 빈도+최근성)과 맥락 활성화(spreading activation)로 분해한다. 우리 검색 엔진의 composite scoring 설계에 직접적 참고가 됐다.

**Soar** (Laird et al., 2022), **CLARION** (Ron Sun, 2002) — 범용 인지 아키텍처들. 명시적/암묵적 지식의 이중 구조(CLARION)와 문제 공간 탐색(Soar)은 온톨로지 레이어 설계에 참고했다.`,
    right:
`### 왜 직접 만들었는가

기억 시스템이 아니라 사고 시스템을 원했기 때문이다. 저장하고 찾는 것이 아니라, 연결하고 성숙하고 보호하는 것. 기존 도구들은 메모리의 양(volume)을 다뤘고, 우리는 메모리의 질(maturity)을 다루려 했다. 112개 프로젝트를 전수 조사하고도 "시냅스 가소성 + 성숙도 파이프라인 + 인지적 방화벽"을 모두 갖춘 production 시스템은 발견하지 못했다.`,
  },

  /* ── Phase 4 · Spread 4 ── */
  {
    phase: 4, title: "어디서 출발했나", isFirst: false,
    left:
`### 크로스도메인: 이색적 접합의 학술적 근거

**구조적 공백.** Burt(1992). 단절된 커뮤니티 사이의 공백을 잇는 노드가 가장 높은 정보 가치를 가진다. 이것이 이색적 접합의 네트워크 과학적 근거다. 우리 시스템의 bridge exploration은 이 구조적 공백을 의도적으로 탐색하는 것.

**이연 연상.** Koestler(1964). 서로 다른 사고 매트릭스가 교차할 때 창의적 도약이 일어난다. UCB 탐색이 약한 연결을 따라갈 때, 이 교차가 시스템에서 일어난다.

**개념 혼합.** Fauconnier(2002). 두 정신 공간의 구조를 투영해 새로운 의미를 만드는 메커니즘. 장기적으로, recall()이 단순 검색을 넘어 두 개념 사이의 "혼합 공간"을 제안하는 방향으로 진화할 때 이 이론이 참고가 된다.`,
    right: ``,
  },

  /* ── Phase 5 · Spread 1 ── */
  {
    phase: 5, title: "어떻게 설계했나", isFirst: true,
    left:
`### 문제를 쪼갰다

온톨로지를 설계한다는 건 하나의 작업이 아니다. "기억을 어떤 구조로 저장할 것인가" 안에는 수십 개의 하위 질문이 있다 — 노드 타입을 어떻게 나눌 것인가, 관계는 어떤 종류가 필요한가, 학습 메커니즘은 어떻게 작동해야 하는가, 승격은 어떤 조건에서 일어나야 하는가. 먼저 이 질문들을 분리했다. 전체 아키텍처, 학습 메커니즘, 승격 파이프라인, 관계 설계 — 각각이 독립적으로 탐구할 수 있는 문제 공간이었다.

### 같은 질문, 다른 렌즈

혼자 설계하지 않았다. Claude, GPT, Gemini, Perplexity, Codex에게 같은 문제를 독립적으로 탐구하게 했다. 핵심은 "같은 질문, 다른 렌즈" — 각 AI가 서로의 답을 보지 못한 상태에서 독립적으로 발견하게 한 것이다. 14개 Deep Research가 이렇게 만들어졌고, 거기서 112개 프로젝트/논문/이론이 발견됐다.`,
    right:
`### 계획을 세우고, 계획을 리뷰했다

설계가 끝나도 바로 구현하지 않았다. 구현 계획 자체를 라운드에 걸쳐 정제했다. 전체를 Phase로 나누고, 각 Phase를 원자 단위 태스크로 분해했다 — 하나의 태스크가 하나의 커밋이 될 수 있는 크기까지.

그리고 이 계획 자체를 다시 리뷰했다. Codex와 Gemini가 독립적으로 논리적 일관성, 누락된 의존성, 실행 순서의 타당성을 검증했다. 계획이 통과해야 구현이 시작된다.

### 맥락이 섞이지 않게 했다

AI 세션은 끊긴다. 200K 토큰이 차면 새 세션을 열어야 하고, 이전 맥락이 사라지면 같은 일을 반복한다. 이걸 해결하기 위해 문서화 시스템을 만들었다 — 모든 설계 결정, 모든 라운드 통합, 모든 태스크 상태가 파일로 기록된다. 새 세션이 시작되면 인덱스 하나만 읽으면 현재 위치를 안다.

pane을 물리적으로 분리했다. 아이디에이션과 구현의 맥락이 서로 오염되지 않게. 각 pane이 하나의 컨텍스트만 가진다.`,
  },

  /* ── Phase 5 · Spread 2 ── */
  {
    phase: 5, title: "어떻게 설계했나", isFirst: false,
    left:
`### 3라운드로 수렴시켰다

Round 1에서 각자 탐구한다 — 넓게 훑고, 가능한 많은 방향을 연다. Round 2에서 교차 비판한다 — 다른 세션의 결과를 읽고 충돌을 식별한다. Round 3에서 통합한다 — 충돌을 판정하고, 수렴시킨다. 64개 문서가 29개 설계 결정과 10개 충돌 판정으로 수렴됐다. 양이 줄면서 밀도가 올라갔다.`,
    right:
`### 리뷰, 그리고 새로운 과제

Phase가 끝날 때마다 독립 리뷰를 받았다. 서로의 리뷰를 보지 못한 상태에서 3개 AI가 9개 영역을 각각 평가했고, 81개 리뷰 문서가 만들어졌다. 같은 시스템을 보고 한쪽은 9.5/10을 주고, 다른 한쪽은 CRITICAL 3개를 줬다 — 보는 렌즈가 달랐기 때문이다. 이 불일치 자체가 가장 유용한 정보였다.

리뷰에서 새로운 과제가 생긴다. 그것도 기록하고, 추적하고, 다음 라운드의 입력이 된다. 완성은 없고, 계속 밀도가 올라간다.`,
  },

  /* ── Phase 6 · Spread 1 ── */
  {
    phase: 6, title: "틀렸던 것들", isFirst: true,
    left:
`### 모든 연결이 강해지기만 했다

처음에는 단순한 Hebbian 학습을 썼다. 함께 검색되면 연결을 강화한다. 논리적으로 맞다. 하지만 실제로 돌리니까 모든 연결이 계속 강해지기만 했다. 약해지는 메커니즘이 없으니, 결국 모든 것이 모든 것과 "강하게 연결"된다. 의미가 사라진다. 뇌로 치면 간질(epilepsy) — 모든 뉴런이 동시에 발화하는 상태.

이걸 해결하기 위해 BCM으로 전환했다. 적응형 임계값 — 많이 활성화될수록 기준이 높아져서, 정말로 의미 있는 연결만 살아남는다. 이론에서 나온 해결책이 아니라, 실제로 부딪힌 문제에서 찾은 답이었다.`,
    right:
`### 측정 없이 구현했다

Perplexity가 정확히 짚었다: "구현 순서가 역순이다. 먼저 현재 시스템의 recall 품질을 측정하고, 어떤 것이 병목인지 찾아야 한다." 측정 없이 개선을 시작했고, 개선 후에야 baseline이 없다는 걸 깨달았다.

이 비판을 수용했다. goldset — 75개 검증된 쿼리-정답 쌍 — 을 만들고, NDCG(검색 품질 지표)로 before/after를 측정하기 시작했다. 그제서야 "지금 어디에 있는지"가 보였다. 이건 기술적 교훈이 아니라 접근법의 교훈이다: 만들기 전에 재라.`,
  },

  /* ── Phase 6 · Spread 2 ── */
  {
    phase: 6, title: "틀렸던 것들", isFirst: false,
    left:
`### 50개 타입, 48개 관계 — 과잉

온톨로지를 설계하면서 가능한 모든 것을 포함하려 했다. 50개 노드 타입, 48개 관계 타입. 6개 레이어. 아이디에이션 과정에서 나온 모든 좋은 아이디어를 다 넣었다. 그리고 3개 AI가 독립적으로 같은 것을 지적했다: 이건 너무 많다.

"50개 타입으로 3,230개를 나누면 타입당 평균 65개. 타입을 세분화할수록 각 타입의 검색 결과가 빈약해진다." 실제로 엣지의 95%가 가장 일반적인 관계(connects_with)를 쓰고 있었다. 48개 관계 타입을 만들어놓고 2개만 쓰는 셈.

"빼기가 더하기보다 어렵다." 이건 내가 직접 한 말이다. 좋은 아이디어를 빼는 것은 나쁜 아이디어를 빼는 것보다 훨씬 어렵다. 15개 코어 타입으로 축소했고, 나머지는 facet(메타데이터)으로 내렸다.`,
    right:
`### 메타포가 설계를 앞서 달렸다

14개 리서치의 교차 분석에서 드러난 한 가지 더: 뇌과학 메타포를 직접 알고리즘으로 번역하려는 유혹이 있었다. DMN의 "멍때리기"를 직접 시뮬레이션하거나, 신경 진동(oscillation)을 검색 파라미터로 쓰거나. 하지만 3라운드의 독립 감사를 거치면서 판단이 명확해졌다: 뇌과학은 영감의 원천이지, 구현 사양서가 아니다. BCM처럼 측정 가능한 알고리즘으로 변환된 것만 채택하고, 나머지는 설명용 비유로만 남긴다.`,
  },

  /* ── Phase 7 ── */
  {
    phase: 7, title: "무엇을 채택했고 무엇을 버렸는가", isFirst: true,
    left:
`112개 항목을 전수 조사한 후, Gemini와 Codex가 독립적으로 평가했다. 교차 대조 후 채택과 비채택을 확정했다.

채택의 원칙은 하나였다. 영감의 원천과 구현 사양을 구분한다. 뇌과학과 철학에서 통찰을 가져오되, 측정 가능한 알고리즘으로 변환할 수 있을 때만 채택한다.

ACT-R의 composite scoring은 recall() 검색 엔진에 직접 구현됐다. 인출 점수를 빈도, 최근성, 맥락 활성화로 분해하는 것 — 이것은 코드로 돌아간다. BCM의 적응형 임계값도 마찬가지다. UCB 탐색도 구현됐다 — focus, auto, dmn 세 가지 모드로 탐색과 활용의 균형을 조절한다.

CLS의 이중 구조와 STC의 검증 게이트에서 승격 파이프라인의 영감을 가져왔다. 빠르게 저장하고 천천히 성숙시키는 것, 태그만 달린 불안정한 기억이 검증을 거쳐야 고착되는 것 — 이 통찰이 3-gate 승격 시스템으로 구현됐다.

구조적 공백 탐색은 UCB의 dmn 모드를 통해 간접적으로 구현돼 있다. 명시적인 bridge discovery 알고리즘은 아직 없다 — 향후 과제다.

버린 것도 있다. 전체 인지 아키텍처(ACT-R, Soar 전체 구현)는 범위 밖이었다. Free-energy totalism은 이론으로는 아름답지만 측정 가능한 알고리즘으로 변환할 수 없었다. Digital twin — 사용자의 복제본을 만드는 것 — 은 방향 자체가 달랐다. 복제가 아니라 이해가 목표였다.`,
    right: ``,
  },

  /* ── Phase 8 ── */
  {
    phase: 8, title: "지금, 그리고 다음", isFirst: true,
    left:
`기초공사를 마쳤다.

NDCG@5 0.460. 테스트 169개 통과. 연결되지 않은 고아 노드를 270개에서 9개로 줄였다. 세션 시작 비용은 8,000토큰에서 950토큰으로 — 88% 절감. $20 예산 안에서 전체를 실행했다. enrichment 이전에는 관계의 95%가 connects_with 하나였지만, 지금은 46개 관계 타입이 실제로 활용되고 connects_with는 0.3%다.

설계가 구현보다 앞서 있다. 아직 갈 길이 남았다.

이것은 완성이 아니다. "시스템은 고정되어서는 안 된다." 온톨로지도 마찬가지다. 타입이 바뀔 수 있고, 관계가 추가될 수 있고, 학습 규칙이 개선될 수 있다. 중요한 것은 그 변화를 담을 수 있는 구조를 만들어놓은 것이다.

"완성이 아닌 확장." 구체적으로 이것이 어떻게 돌아가는지 — 레이어 구조, 승격 메커니즘, 방화벽, 실제 검색 흐름, Claude가 이것을 어떻게 인식하는지 — 그 이야기는 Work에서 계속된다.

"이제 시작이다"`,
    right: ``,
  },
];

/* ── Book ────────────────────────────────────────────────────────── */

const PAGE_W = 640;
const GAP = 120;
const VIEW_W = PAGE_W * 2 + GAP; // 1400

const mdComponents = {
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h4 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: 15, fontWeight: 600, color: "#1a1a2e",
      marginTop: 22, marginBottom: 10, lineHeight: 1.4,
    }}>{children}</h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p style={{ marginBottom: 10 }}>{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong style={{ fontWeight: 600, color: "#1a1a2e" }}>{children}</strong>
  ),
};

function Page({ content }: { content: string }) {
  return (
    <div style={{
      width: PAGE_W,
      padding: "32px 28px", boxSizing: "border-box",
      flexShrink: 0,
      fontFamily: "'Noto Sans KR', sans-serif",
      fontSize: 13, color: "#444", lineHeight: 1.8,
    }}>
      {content ? (
        <ReactMarkdown components={mdComponents}>{content}</ReactMarkdown>
      ) : null}
    </div>
  );
}

function Book({ spreadIdx, onPrev, onNext }: {
  spreadIdx: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const s = SPREADS[spreadIdx];
  const isFirst = spreadIdx === 0;
  const isLast = spreadIdx === SPREADS.length - 1;

  // Count spreads in this phase for indicator
  const phaseStart = PHASE_START[s.phase - 1];
  const nextPhaseStart = PHASE_START[s.phase] ?? SPREADS.length;
  const phaseTotal = nextPhaseStart - phaseStart;
  const phaseLocal = spreadIdx - phaseStart + 1;

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    background: "none", border: "1px solid rgba(0,0,0,0.1)", borderRadius: 6,
    padding: "7px 20px", cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0.2 : 1,
    fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: "#666",
    transition: "opacity 0.2s",
  });

  return (
    <div style={{ maxWidth: VIEW_W, margin: "0 auto" }}>
      {/* Phase label */}
      <div style={{
        fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: "rgba(0,0,0,0.18)", marginBottom: 10,
        paddingLeft: 4,
      }}>
        Phase {s.phase}{phaseTotal > 1 ? ` · ${phaseLocal}/${phaseTotal}` : ""}
        {s.isFirst && (
          <span style={{ marginLeft: 12, color: "#1a1a2e", fontSize: 13,
            fontFamily: "'Playfair Display', serif", fontWeight: 600,
            textTransform: "none", letterSpacing: 0 }}>
            {s.title}
          </span>
        )}
      </div>

      {/* Book viewport */}
      <div style={{
        width: VIEW_W,
        display: "flex",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 6,
        boxShadow: "0 4px 32px rgba(0,0,0,0.06)",
        background: "#fff",
        minHeight: 200,
      }}>
        <Page content={s.left} />
        <div style={{
          width: GAP, flexShrink: 0,
          display: "flex", justifyContent: "center",
        }}>
          <div style={{ width: 1, background: "rgba(0,0,0,0.06)", alignSelf: "stretch" }} />
        </div>
        <Page content={s.right} />
      </div>

      {/* Navigation */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginTop: 20,
      }}>
        <button onClick={onPrev} disabled={isFirst} style={btnStyle(isFirst)}>← 이전</button>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: 11,
          color: "rgba(0,0,0,0.2)",
        }}>
          {spreadIdx + 1} / {SPREADS.length}
        </span>
        <button onClick={onNext} disabled={isLast} style={btnStyle(isLast)}>다음 →</button>
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────────── */

export function OntologySection() {
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [readSet, setReadSet] = useState<Set<number>>(new Set([0]));

  const curPhase = SPREADS[spreadIdx].phase - 1; // 0-indexed

  function goToPhase(i: number) {
    const idx = PHASE_START[i];
    setSpreadIdx(idx);
    setReadSet(prev => new Set([...prev, i]));
  }

  function goPrev() {
    if (spreadIdx > 0) {
      const ni = spreadIdx - 1;
      setSpreadIdx(ni);
      setReadSet(prev => new Set([...prev, SPREADS[ni].phase - 1]));
    }
  }

  function goNext() {
    if (spreadIdx < SPREADS.length - 1) {
      const ni = spreadIdx + 1;
      setSpreadIdx(ni);
      setReadSet(prev => new Set([...prev, SPREADS[ni].phase - 1]));
    }
  }

  return (
    <div style={{ padding: "80px 0" }}>
      <div className="p12-container">
        <FadeIn>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#bbb", marginBottom: 16,
          }}>Ontology</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: 32,
            fontWeight: 700, color: "#1a1a2e", marginBottom: 16, lineHeight: 1.3,
          }}>
            기억이 사고를 닮는 구조를 설계했다
          </h2>
        </FadeIn>

        <Graph cur={curPhase} readSet={readSet} onNodeClick={goToPhase} />

        <Book spreadIdx={spreadIdx} onPrev={goPrev} onNext={goNext} />
      </div>
    </div>
  );
}
