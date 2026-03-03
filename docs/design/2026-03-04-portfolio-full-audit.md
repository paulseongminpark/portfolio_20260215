# 포트폴리오 전체 감사 + 설계 방향
> 2026-03-04 | 세션 재개용 — 이 문서 하나로 전체 맥락 복원 가능

---

## 1. 확정된 섹션 구조 (설계 완료, 미구현)

```
01 · About
02 · How I Think     ← Why (원칙, 4카드만, 짧고 강하게)
03 · How I Build     ← How (HOW I AI 전체 + 온톨로지(자리) + Context Flow + Evolution + Obsidian 한 단락)
04 · Work            ← 결과물 (Empty House / Skin Diary / PMCC)
05 · Writing         ← 미학적 배경 + Tech Review (현재진행형)
06 · Contact
```

**흐름 논리:**
> 누구인가 → 왜 이렇게 생각하는가 → 어떻게 만들었나 → 뭘 만들었나 → 지금 뭘 하나 → 연락

**이전 구조 대비 변경 사항:**
- 02·System (Why+How 혼재) → 02 Why / 03 How 분리
- TR 독립 04 섹션 → 05·Writing에 통합
- Obsidian 큰 섹션 → 03 How I Build 마지막 한 단락으로 축소
- 총 섹션 수: 5개 (01~05) + Contact = 유지

---

## 2. 현재 코드 상태 (실제 구현)

### 2-1. 파일 구조
```
src/portfolio/
├── index.tsx                     ← 메인 레이아웃 + TOC + 모든 섹션 렌더링
├── portfolio.css
├── content/
│   ├── HOME_INTRO_TO_RELATION_KO.md  ← About 섹션 파싱 소스
│   ├── AI_WORKFLOW_KO.md             ← (현재 미사용, 더미)
│   ├── TR_SYSTEM_KO.md               ← TR 섹션 카드 그리드 파싱 소스
│   ├── work.ts                       ← Work 3개 프로젝트 .md 임포트
│   ├── EMPTY_HOUSE_CPS_DETAIL_KO.md  ← Empty House 상세 페이지
│   ├── SKIN_DIARY_DETAIL_KO.md       ← Skin Diary 상세 페이지
│   └── PMCC_DETAIL_KO.md             ← PMCC 상세 페이지
└── components/
    ├── AiWorkflowSection.tsx         ← HOW I AI 전체 (현재 02·System 하위)
    ├── aiWorkflowData.ts             ← HOW I AI 내러티브 + 타임라인 데이터
    ├── E2EWorkflowSection.tsx        ← Context Flow 9단계 인터랙티브
    ├── ObsidianSystemSection.tsx     ← Obsidian 전체 섹션 (현재 04·TR 하위)
    ├── TechReviewSystemSection.tsx   ← TR 파이프라인 상세 (현재 04·TR 하위)
    ├── TechReviewCards.tsx           ← feed.json 연동 최신 포스트 3개
    ├── WorkCard.tsx                  ← Work FeaturedCard / GridCard
    ├── WorkDetail.tsx                ← Work 상세 페이지
    ├── WorkDetailBlocks.tsx
    ├── StatsBar.tsx
    ├── SectionLabel.tsx
    ├── FadeIn.tsx
    └── (기타: ActivityGallery, VisualCuesGallery, GridScrubSlider 등 미사용)
```

### 2-2. 현재 실제 섹션 순서 (index.tsx 기준)
```
Hero
01 · About         (id="about")
02 · System        (id="system")  ← How I Work 타이틀 + 4카드 + HOW I AI 전체
03 · Work          (id="work")
04 · Technical Writing System (id="tr") ← Tech Review + Obsidian
05 · Writing       (id="writing")
06 · Contact       (id="contact")
```

**현재 vs 확정 구조 갭:**

| 확정 | 현재 코드 | 작업 |
|------|-----------|------|
| 02 How I Think (4카드만) | 02 System (4카드 + HOW I AI 전체) | 분리 필요 |
| 03 How I Build (HOW I AI+) | 02 System 하위 AiWorkflowSection | 독립 섹션으로 이동 |
| 04 Work | 03 Work | 번호 변경 |
| 05 Writing (+TR) | 04 TR 독립 + 05 Writing 분리 | TR → Writing 이동, Obsidian 한 단락으로 축소 |
| 06 Contact | 06 Contact | 완료 |

---

## 3. 섹션별 전체 내용

### 3-1. Hero
- **배경:** #ffffff, 풀스크린
- **배지:** "PORTFOLIO" (작은 caps)
- **H1 (애니메이션):** "Building systems that think."
- **서브:** "데이터·AI·커뮤니티 시스템을 설계합니다. / Claude Code를 운영체제처럼 씁니다."
- **스크롤 힌트:** ↓ Scroll

---

### 3-2. 01 · About
**소스:** `HOME_INTRO_TO_RELATION_KO.md` (bold 텍스트 파싱)

**레이아웃:** 좌측 이름 h2 + 우측 3개 아이템 그리드

**Intro:**
> 저는 문제 해결력을 키우는 걸 삶 전체의 프로젝트처럼 다룹니다. 흩어진 생각을 연결하고 그 흐름을 글로 풀어내며 새로운 해결 방식을 만듭니다. 이 과정은 AI로 더 넓게 확장해, 막막한 순간에 "그럼 이렇게 하면 되는구나"를 바로 해볼 수 있는 다음 행동으로 정리합니다.

**Background:**
> 미학, 공간, 음악을 오가며 서로 다른 원리를 연결해 하나의 질서를 잡는 감각을 익혔습니다. 일을 하면서 "사람은 조건에 의해 움직인다"는 걸 여러 번 확인했고, 그 조건을 다루기 위해 AI를 선택했습니다.

**Direction:**
> 결국 하고 싶은 일은 사람을 돕는 일입니다. 자기 삶을 바꾸는 데 필요한 도구와 환경을 만들고, 그 변화가 AI 서비스로 꾸준히 이어지게 하고 싶습니다.

**⚠️ 이슈:** Background의 "미학, 공간, 음악 배경"이 HOW I AI Before 단락에서 중복 언급됨. 추후 정리 필요.

---

### 3-3. 02 · System → (설계: 02 How I Think)

**현재 타이틀:** "How I Work" (이전: "How I Operate" → 변경 완료)
**서브타이틀:** "그리고 왜 이 방식인가."
**레이아웃:** 2×2 카드 그리드

**카드 1 — Connection (확정):**
> 무언가를 배울 때, 항목으로 기억하는 것보다 어디서 왜 나왔는지가 더 오래 남았다. 하나의 사건에도 여러 각도가 보인다 — 배경, 결정, 실패, 통찰. 이것들이 따로 저장되면 흩어진다. 아이디어 하나가 생기면, 어디서 왔는지, 무엇과 연결되는지를 먼저 본다. 이 습관을 시스템으로 옮겼다. 26개 노드 타입, 33개 관계 타입 — 무슨 일이 있었고, 어떤 판단을 했으며, 어디서 틀렸는지를 연결로 쌓는다. 기억이 아니라 사고 구조의 외부화다.

**카드 2 — Context as Currency (확정):**
> 대화를 시작할 때마다 같은 맥락을 처음부터 설명해야 한다면, 생각이 아니라 기억에 에너지를 쓰게 된다. 그 낭비를 없애기 위해 맥락 자체를 구조화했다. 필요한 순간에 정확히 필요한 것만 꺼낸다 — 세션 시작 비용을 88% 줄였다.

**카드 3 — Structure over Willpower (확정):**
> 세션이 끊기면 기억도 끊길 수 있다는 걸 안다. 그래서 기억력에 기대지 않기로 했다. 자동 Hook부터 수동 체크포인트까지 4단계 안전망을 만들었다. 의지가 아니라 구조가 기억한다.

**카드 4 — Governance (확정):**
> 시스템을 만들었다고 끝이 아니다. 새 도구가 나오고, 더 나은 방식이 생기고, 기존 구조가 낡아진다. 중요한 건 무엇을 쓰느냐보다 어떻게 통제할 것인가 — 그래서 거버넌스가 먼저다. 시스템은 만드는 것, 거버넌스는 운영하는 것이다.

**구현 파일:** `index.tsx` → `SYSTEM_ITEMS` 배열 (line 143~168)

---

### 3-4. HOW I AI (AiWorkflowSection) — 현재 02·System 하위, 설계: 03·How I Build로 이동

**컴포넌트:** `AiWorkflowSection.tsx` + `aiWorkflowData.ts`

#### 내부 구조 (순서대로):

**① Hero**
- eyebrow: "HOW I AI"
- H1 (32px): "내 사고가 작동하는 조건을 설계했다"
- lede: "AI를 쓴다는 것은 새로운 방식으로 생각하는 것이 아니다. 원래 생각하는 방식 그대로 — 빠르고, 여러 차원을 동시에 — 작업으로 이어지도록 만드는 것이다."

**② Before (2개 단락)**
- 단락 1: 미학 공부 → 여러 차원 연결하는 감각
- 단락 2: 그런데 정리/기록/꺼내쓰기에 과도한 에너지. AI에게 매번 맥락 처음부터 설명 → 의지력과 사고 흐름이 동시에 닳았다.

**③ After (2개 단락)**
- 단락 1: 이제는 사고의 흐름이 끊기지 않는다. 말하면 기록되고, 기록은 누적되며, 누적된 맥락 위에서 다음 생각이 시작된다. 여러 Claude Code 인스턴스 병렬 실행.
- 단락 2: 빠르고 정교해졌다. Claude가 길을 잡아주고 실행 계획을 세우며 직접 실행까지.

**④ How + 복리 성장 다이어그램**
- 문장: "AI를 '쓴' 것이 아니라 내 사고가 작동하는 조건을 설계한 것이다."
- SVG 다이어그램: Before(평평한 선) vs After(지수 곡선) — "without" vs "with AI"
- X축: Cycle 1~5 / Y축: 레버리지
- 우상단 텍스트: "반복할수록 격차가 벌어진다"
- **3개 개념 카드:**
  - 맥락이 유지된다: 결정과 방향이 자동으로 기록되고, 세션이 바뀌어도 이어진다
  - 확인하고 배운다: Obsidian에서 모든 기록을 확인하며 직접 검증한다 ← ⚠️ Obsidian 언급
  - 사고가 실행이 된다: 병렬 사고가 병렬 실행으로 이어진다

**⑤ Cycle + 병렬 실행 다이어그램**
- 문장: "이 순환을 반복할수록 효과는 복리로 쌓인다... 처음엔 맥락을 설명하는 데 에너지를 썼다면, 지금은 방향을 정하는 데만 집중한다."
- SVG 다이어그램: User Input → [Claude A Review, Claude B Build, Claude C Verify, Other LLMs] → Synthesizer → Output → (피드백 루프: Better Input)

**⑥ System + orch-graph iframe**
- 문장 1: "그런데 이 순환이 저절로 돌아가지는 않는다..."
- 문장 2: "이 순환이 실제로 돌아가려면 구조가 받쳐줘야 한다..."
- iframe: `public/orch-graph.html` (인터랙티브 오케스트레이션 그래프, 640px)
- 설명: "Claude Code가 중앙에 있다. Build 팀이 만들고, Verify 팀이 검증하며, Maintain 팀이 맥락을 보존한다..."
- save layout 버튼 (관리자용)

**[온톨로지 — 여기 자리 확보 예정]**
- localhost:7676에서 온톨로지/Graph RAG/벡터DB 빌드 중 (아직 미완성)
- 26 노드타입, 33 관계타입, SQLite+FTS5+ChromaDB+NetworkX
- 완성 후 실제 다이어그램으로 교체 예정
- 별도 brainstorming 세션 필요

**⑦ Context Flow — E2EWorkflowSection**
- eyebrow: "Context Flow"
- 제목: "End-to-End Workflow — 하나의 세션 안에서 context가 흘러가는 여정"
- 파란 배경(#6A9BCC) 컨테이너, 왼쪽 nav + 오른쪽 상세박스
- **9단계:**

| # | 이름 | 설명 요약 |
|---|------|-----------|
| 01 | Start | 세션 열면 이미 준비. 어제 결정, 멈춘 곳, 미처리 항목 자동 로드 |
| 02 | Dispatch | /dispatch 하나로 오늘 세션 방향. 현재상태→3가지 우선순위 제안 |
| 03 | Plan | 코드 전 설계 완성. 요구사항→방식→트레이드오프 정리 |
| 04 | Prep | STATE.md + CHANGELOG.md 갱신. 깔끔하게 정리 후 구현 |
| 05 | Build | 설계대로 구현. 리뷰 자동 시작 → 커밋 → 크로스프로젝트 알림 |
| 06 | Verify | 외부 AI(Gemini/Codex)로 분석, Claude가 판단 |
| 07 | Deploy | pf-ops + security-auditor → GO/NO-GO → push |
| 08 | Archive | 변경→문서 자동 갱신. STATE/CHANGELOG/KNOWLEDGE |
| 09 | Close | 세션 압축 스냅샷. 다음 세션 시작점 |

**⑧ Evolution**
- eyebrow: "Evolution"
- 제목: "3주의 기록"
- 도입: "내 사고의 흐름을 끊기지 않게 하기 위해서였다. 뇌에서 자동으로 일어나는 연결들을 시스템으로 만들고 싶었다."
- **3주 타임라인:**

| 주차 | 질문 | 핵심 |
|------|------|------|
| 1주차 | "뭘 더 만들어야 하지?" | 리뷰어, 커밋터, 검증자... 하루 만에 24개. 세션이 점점 짧아졌다. 만들수록 생각할 공간이 사라진다. |
| 2주차 | "이게 뭘 하는 거지?" | 만드는 걸 멈추고 읽기 시작. AI가 왜 이 구조를 선택했는지 한 항목씩 검증. 느리게 이해하는 게 더 빠른 길. |
| 3주차 | "이건 결국 이게 아닌가?" | 에이전트 하나 들여다보면 옆과 겹쳤다. 본질에 가까워질수록 부차적인 것들이 보였다. 24→15. connecting the dots. |

- **시스템에 대하여 (2개 단락):**
  1. 이 시스템은 고정되어서는 안 된다. 하네스 도구들, LLM들, Claude Code 업데이트가 계속 바뀐다. 강력하고 추상적인 기반 + 필요할 때 도구를 붙이고 변형하고 기록. 거버넌스가 더 중요하다.
  2. 변화 속에서 나는 계속 같은 연구를 한다. 더 많은 것을 더 빠르게 연결하고, 내 뇌에서 일어나는 이색적인 접합을 어떻게 시스템으로 만들 것인가.
- **Closing:** "지금 이 시스템은 완성이 아니다. 기초공사다. 시스템을 계속 만들어가면서, 동시에 그 위에서 다른 것들을 쌓아올린다. 여러 방향이 동시에 확장될 수 있는 틀 — 그걸 만들고 있다. 그래서 이제 시작이다."

**[Obsidian 한 단락 — 여기 배치 예정]**
- 역할: 시각화 레이어 + Living Docs 소통창구
- 내용 미확정, 별도 세션 필요

---

### 3-5. 03 · Work (설계: 04 · Work)

**레이아웃:** Featured Card (Empty House) + 2-column Grid (Skin Diary, PMCC)

**Empty House CPS** (June 2025 / Data · Policy)
> 빈집 문제를 사람이 떠나서 생긴 결과로만 단정 짓는 기존 정책들의 설명이 의문이었습니다. 인구·상권·교통 데이터의 관계를 구조화해, 개입 우선순위를 판단할 수 있는 시스템을 설계했습니다.
- 상세 페이지: `EMPTY_HOUSE_CPS_DETAIL_KO.md`

**Skin Diary AI** (August 2025 / AI · Mobile)
> 피부를 숫자로만 평가하는 방식으로는 지금 무엇을 해야 하는지 알 수 없다는 점이 답답했습니다. 사용자 맥락들을 결합해 행동 제안 시스템을 개발했습니다.
- 상세 페이지: `SKIN_DIARY_DETAIL_KO.md`

**PMCC** (2023–2026 / Community · Design)
> 함께 달려도 사람들 사이가 좀처럼 가까워지지 않는 게 아쉬웠습니다. 관계가 시작되는 순간과 규칙을 직접 설계했습니다.
- 상세 페이지: `PMCC_DETAIL_KO.md`

---

### 3-6. 04 · Technical Writing System → (설계: 05 · Writing으로 TR 통합, Obsidian 축소)

**현재 구성 (04·TR):**
- 섹션 레이블: "04 · Technical Writing System"
- 서브: "기술 트렌드를 추적하는 퍼블리싱 파이프라인과, AI 에이전트의 공유 메모리를 관리하는 문서 시스템."

#### Tech Review 서브섹션 (id="tr-tech-review")
- sticky H3: "Tech Review"
- 설명: "AI·빅테크·신기술 뉴스를 매일 추적하고, 산업·직무 관점 인사이트로 가공하는 퍼블리싱 파이프라인."
- **TechReviewCards:** feed.json 연동 최신 포스트 3개 실시간 표시
- **StatsBar:** 매일/Jekyll/자동/API
- **SectionFlowGrid:** TR_SYSTEM_KO.md 파싱 (운영 구조/콘텐츠 포맷/자동화 파이프라인/기술 스택/현황/다음 방향)
- **TechReviewSystemSection (상세):**
  - Why I built this: "AI 뉴스를 매일 읽었지만 정리하지 않으면 기억에 남지 않았다..."
  - System Overview: "매일 아침 GitHub Actions가 Perplexity API를 깨운다. 주 6회 자동 생성, ko/en 2개 언어, 6개 요일 테마, 연간 ~600개 포스트"
  - Pipeline (6단계): Trigger(09:00 KST) → Fetch(Perplexity API) → Format(Smart Brevity) → Log(keywords-log.md) → Build(Jekyll) → Deploy(GitHub Pages)
  - **PIVOT 박스:** 원래 계획(이메일→GAS) 실패 사례 → API 직접 호출로 전환, 비용 월 $0.03
  - Weekly Schedule: Mon AI R&D / Tue 빅테크 / Wed AI×Industry / Thu 스타트업 / Fri 규제&정책 / Sat 도구&인프라
  - Smart Brevity Format (v1 폐기 → v2 현재): Today in One Line / Why it matters / 3 Key Points / What's next
  - Keywords Log (샘플): OpenAI 18회, 규제 15회, 추론모델 14회... (2025년 2월 기준)
  - Design Decisions: Perplexity API / GitHub Actions / Jekyll+Pages / Smart Brevity / Comments 자동생성(폐기)
  - Ongoing: Perplexity 출력 검증 자동화 (검토 중)

#### Obsidian 서브섹션 (id="tr-obsidian") — 현재 큰 섹션, 설계에서 축소 예정
- sticky H3: "Obsidian"
- 설명: "AI 오케스트레이터가 아는 것을 내가 함께 볼 수 있게 만든 로컬 문서 시스템."
- **ObsidianSystemSection:** 대형 컴포넌트 (볼트 구조 트리, Living Docs 설명, STATE.md 샘플 등)
- **→ 설계 방향:** 03·How I Build 마지막 한 단락으로 대폭 축소 (시각화 레이어 + Living Docs 소통창구)
- **Obsidian 한 단락 내용: 미확정**

---

### 3-7. 05 · Writing
- 섹션 레이블: "05 · Writing"
- 배경: #f7f7f5
- **현재 콘텐츠:** 에세이 1개 ("시스템으로 생각하기", January 2026)
  - 설명: "생각을 구조화하는 방식, 그리고 Claude와 함께 글쓰는 방법에 대한 에세이입니다."
  - **링크 없음, 실제 에세이 없음**
- **설계 방향:** TR (현재진행형 트래킹) + 미학적 배경 글쓰기 포함
  - Paul이 원하는 톤: "만들고 있구나, 트래킹하고 있구나 정도로 읽히면 좋겠음"
  - 현재 Writing 콘텐츠 거의 없어 섹션이 매우 약함

---

### 3-8. 06 · Contact
- "Let's talk."
- paulseongminpark@gmail.com
- github.com/paulseongminpark
- 푸터: "© 2026 박성민 · Paul Seongmin Park"

---

## 4. 네비게이션 현황

### TOC Sidebar (P12TocSidebar)
```
About
  - Intro / Background / Direction
System
  - Connection / Context as Currency / Structure / Governance / AI System
Work
  - Empty House / Skin Diary / PMCC
Technical Writing System
  - Tech Review / Obsidian
Writing
  - W1
Contact
```

### Top Nav
```
About / System / Work / AI / TR / Writing / Contact → PSM (로고, Contact로 이동)
```
**⚠️ 이슈:** Nav에 "AI", "TR"이 별도 링크로 있어 System 하위인지 독립인지 방문자 혼란 가능

---

## 5. 디자인 시스템

### 색상
- 배경: #ffffff (기본), #f7f7f5 (Writing)
- 강조(Anthropic Orange): #D4632D
- 텍스트: #111111 (기본), #555555 (서브), #999999 (muted)
- 테두리: #e8e8e8 / #e4e0da
- 블루(HOW I AI 하이라이트): rgba(37,99,235,0.14)

### 타이포그래피
- p12-h1: 영웅 타이틀 (Hero)
- p12-h2: 36~48px — 섹션 대제목
- wd-eyebrow: 12px, orange, uppercase — HOW I AI 하위 레이블
- wd-title: 20px — HOW I AI 하위 제목
- SectionLabel: "01 · About" 형식 caps
- Inter + Noto Sans KR + Playfair Display

### 레이아웃
- TOC Sidebar: 220px 고정, 좌측
- 메인 컨테이너: marginLeft 220px
- p12-container: maxWidth 1200, 양쪽 padding
- wd-body: HOW I AI 전용 영역 (직접 padding 관리)
- Work: Featured(1) + Grid(2)

---

## 6. 미구현 작업 목록 (트래킹)
> 마지막 업데이트: 2026-03-04

### 구조 변경 — 완료 ✅

**[완료] P1: 02·How I Think + 03·How I Build 분리** — claude/portfolio 브랜치
**[완료] P2: TR → 05·Writing 통합, ObsidianSystemSection 제거** — claude/portfolio 브랜치
**[완료] P3: Nav (6항목) + TOC 업데이트** — claude/portfolio 브랜치

---

### 미결 항목 (설계/콘텐츠)

**[A] 03·How I Build 섹션 헤더 없음**
- 현재: AiWorkflowSection이 섹션 시작과 동시에 바로 나옴
- SectionLabel "03 · How I Build" + h2 + intro 문장 필요
- 상태: ❌ 미작업

**[B] Obsidian 한 단락 텍스트**
- 역할: 시각화 레이어 + Living Docs 소통창구
- 현재: "준비 중" placeholder
- 상태: ❌ 텍스트 미확정 (별도 논의 필요)

**[C] TechReviewSystemSection 전체 텍스트 재작성**
- 현재 Writing 섹션 하위에 있는 TR 시스템 상세 설명 전체
- 방향: 미결 (논의 필요)
- 상태: ❌ 미작업

**[D] Ontology placeholder → 실제 콘텐츠**
- localhost:7676 빌드 중 (SQLite+FTS5+ChromaDB+NetworkX, 26노드/33관계)
- 현재: "준비 중" placeholder
- 상태: ❌ 온톨로지 완성 후 교체 (별도 brainstorming 세션)

**[E] Writing 에세이**
- 현재: "시스템으로 생각하기" 텍스트만, 링크/실제 글 없음
- 상태: ❌ 미작업

**[F] master 머지 (배포 타이밍)**
- claude/portfolio 브랜치 → master 머지 시점 결정
- 상태: ❌ 보류

---

## 7. 핵심 결정 맥락 (잊지 말 것)

1. **4카드는 포트폴리오 전체의 독해 렌즈** — Connection, Context as Currency, Structure over Willpower, Governance가 03·How I Build와 04·Work 전체를 해석하는 원칙
2. **온톨로지 = 핵심 기술** — 03·How I Build의 중심. Datasette/pyvis는 임시 시각화 도구일 뿐
3. **Obsidian = 시각화 레이어** — 큰 섹션이 아니라 한 단락. 역할은 Living Docs 소통창구
4. **TR = 현재진행형** — "만들고 있구나, 트래킹하고 있구나" 톤. Work(결과물)가 아닌 Writing(현재활동)
5. **섹션 수 5개 유지** — 02·System 분리(+1) → TR이 Writing으로 이동(-1) → 순 0

---

## 8. 관련 파일

```
설계 문서:
  docs/design/2026-03-04-section-structure-dialogue.md  ← 섹션 구조 결정 대화
  docs/design/2026-03-03-evolution-interview.md         ← Evolution 섹션 이야기 원본
  docs/design/2026-03-04-portfolio-full-audit.md        ← 이 문서

구현 파일:
  src/portfolio/index.tsx                               ← 메인 (SYSTEM_ITEMS, 섹션 렌더링)
  src/portfolio/components/AiWorkflowSection.tsx        ← HOW I AI 전체
  src/portfolio/components/aiWorkflowData.ts            ← HOW I AI 데이터
  src/portfolio/components/E2EWorkflowSection.tsx       ← Context Flow 9단계
  src/portfolio/components/ObsidianSystemSection.tsx    ← Obsidian 섹션 (축소 예정)
  src/portfolio/components/TechReviewSystemSection.tsx  ← TR 상세

콘텐츠 파일:
  src/portfolio/content/HOME_INTRO_TO_RELATION_KO.md   ← About
  src/portfolio/content/TR_SYSTEM_KO.md                ← TR 카드 그리드
```
