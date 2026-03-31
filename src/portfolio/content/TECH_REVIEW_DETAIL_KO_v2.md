## 1) Hero

매일 새벽 5시, 시스템이 깨어난다. 기사를 읽고, 영상을 보고, 트윗을 수집하고, 왜 중요한지를 쓰고, 발행하고, 다시 잠든다. 편집장이 없는 뉴스룸. 기자 대신 파이프라인. 내가 설계한 것은 렌즈뿐이다.

---

## 2) Table of Contents

### SectionTitle

- eyebrow: CONTENTS
- title: 시작 · 설계 · 실체 · 강화
- desc: 매일 아침, 기술 세계의 맥락을 잡는 시스템.

**카드 1 — 시작**

왜 만들었는가. 정보는 넘치는데 연결이 안 된다. 매일 아침의 질문.

**카드 2 — 설계**

3개 소스와 3층 해석 체계. 뉴스를 수집하는 것이 아니라, 해석의 구조를 설계한 것이다.

**카드 3 — 실체**

새벽 5시에 시작되는 파이프라인. 100일이 쌓이면 무엇이 보이는가.

**카드 4 — 강화**

렌즈를 바꾸면 독자가 바뀐다. 나의 뉴스룸에서 조직의 뉴스룸으로.

---

## 3) 시작 — 매일 아침의 질문

### SectionTitle

- eyebrow: 시작
- title: 매일 아침의 질문
- desc: 지난 24시간, 기술 업계에는 무슨 일이 있었는가.

논문은 arXiv에 뜬다. 신호는 X에서 돈다. 해설은 YouTube에 쌓인다. 기업은 발표하고, 경쟁사는 응수한다. 오픈소스는 그와 별개로 다음 방향을 먼저 실험한다.

각각은 읽을 수 있다. 그런데 arXiv 논문과 X의 한 줄이 같은 흐름을 가리키고 있는 걸 나는 따로 읽고 있었고, YouTube 40분짜리 분석이 어제 읽은 기사의 맥락을 바꾸는 건 다음날에야 깨달았다.

정보가 부족한 적은 없었다. 부족한 건 연결이었고, 그 연결을 만들 시간이었다.

---

## 4) 시작 — 정보의 양과 질 사이

### SectionTitle

- eyebrow: 시작
- title: 정보의 양과 질 사이
- desc: 많이 읽는 것과 잘 읽는 것은 다르다.

뉴스레터 세 개, RSS, X 리스트. 한 달을 돌렸다. 그래도 "어제 기술 세계에서 뭐가 중요했어?"에 30초 안에 답하지 못했다. 많이 읽었는데 뭘 읽었는지 모르는 상태 — 소비는 했지만 판단에는 닿지 못하는 상태였다.

수집은 되는데 해석이 안 되는 문제. 해석의 각도를 설계하기로 했다.

**[다이어그램 1 — 끊어진 정보 흐름]**
<!-- 왼쪽에 5개 소스(arXiv, X, YouTube, 뉴스레터, RSS)가 흩어져 있다. 각각에서 화살표가 나오지만, 가운데에서 합쳐지지 않고 독자(나)에게 따로따로 도착한다. 화살표 사이에 연결선이 없다. 오른쪽에 "판단" 상자가 있지만 점선으로 비어 있다 — 수집은 되지만 해석에 닿지 못하는 상태를 보여준다. -->

---

## 5) 설계 — 3개 소스

### SectionTitle

- eyebrow: 설계
- title: 3개 소스
- desc: HN · arXiv · RSS, YouTube, Twitter.

어떤 소스를 넣을지보다 어떤 소스를 뺄지가 더 어려웠다. 남긴 기준은 겹치지 않는 것 — 속도, 깊이, 시야.

Daily Post가 속도다. 제목만 긁어오는 게 아니라 curl로 원문 본문 4,000자를 직접 추출해서, Claude Sonnet이 그 위에 판단을 얹는다. 처음에는 제목만으로 돌렸다. "LiteLLM이 공격받았다"는 헤드라인을 읽은 AI가 공격 방식을 지어냈다. 본문을 넣자 정확해졌다. AI가 추론하게 두지 않고, 읽게 만든 것이다.

YouTube가 깊이다. 40분짜리 영상 하나에 기사 10개 분량의 맥락이 담겨 있는데, 이걸 사람이 매일 보면서 정리하기는 어렵다.

Twitter가 시야다. 기사가 되기 전의 신호 — 누군가의 한 줄이 3일 뒤 뉴스가 되는데, 그때 가서 읽으면 이미 늦다. 직접 북마크한 트윗만 수집한다.

**[다이어그램 2 — 3-Source Architecture]**
<!-- 세 개의 열. 왼쪽부터 Daily Post(속도), YouTube(깊이), Twitter(시야). 각 열 안에: 입력 소스(Daily = HN, arXiv, Reddit, RSS / YouTube = 플레이리스트 / Twitter = 북마크), 추출 방식(Daily = curl 4,000자 / YouTube = yt-dlp 자막 → Groq Whisper fallback / Twitter = Chrome CDP), 가공 모델(Daily = Claude Sonnet / YouTube = Gemini Flash → Claude Sonnet → gpt-4.1-mini / Twitter = gpt-4.1-mini). 아래에 요일별 주제 스케줄 행: 월 AI/ML, 화 빅테크, 수 산업, 목 오픈소스, 금 하드웨어, 토 사례, 일 종합 — Daily Post에만 적용. -->

---

## 6) 설계 — 3층 해석 체계

### SectionTitle

- eyebrow: 설계
- title: 3층 해석 체계
- desc: 형식, 관점, 적용 — 뉴스를 3번 통과시킨다.

"Anthropic이 MCP 서버의 원격 인증 표준을 발표했다." 누구에게나 같은 문장이다.

첫 번째는 형식이다. Smart Brevity — Axios의 뉴스 작성법. 뼈대가 잡히면 최소한 "왜 중요한지"는 반드시 들어간다. 그런데 뼈대만으로는 범용적이었다. "AI 시대에 중요하다" 같은 문장이 나왔다. 누구에게나 맞는 말은 아무에게도 중요하지 않다.

두 번째는 관점이다. 렌즈를 만들었다 — WIM, Why It Matters. 내가 만들고 있는 것에 비춰서 읽고, 서로 다른 도메인이 만나는 지점을 찾고, 이것으로 뭘 제거할 수 있는지를 본다. 전부 쓰지 않고 이름도 붙이지 않는다. 관점이 문장에 녹아야 한다.

세 번째는 적용이다. AI가 "내가 만들고 있는 것에 비춰서" 읽으려면, 내가 뭘 만들고 있는지를 알아야 한다. mcp-memory를 연결했다. Claude가 뉴스를 읽기 전에 recall()로 나의 온톨로지를 먼저 읽는다 — 4,900개 노드. 그 위에서 각 콘텐츠가 내 작업에 닿는 깊이를 판단하고, 억지로 액션을 만들지 않는다.

**[다이어그램 3 — 3-Layer Interpretation System]**
<!-- 수직 3단 구조. 상단 Layer 1 — Axiom(형식): 12개 axiom을 카드로 나열. why_it_matters에 "필수" 마킹, 나머지 11개에 "선택" 마킹. 오른쪽에 소스별 자주 쓰이는 세트 표시(Daily = driving_the_news + the_big_picture + whats_next / YouTube = be_smart + zoom_in + the_bottom_line / Twitter = the_big_picture + be_smart). 중단 Layer 2 — WIM 7렌즈(관점): 7개 렌즈를 원형으로 배치(시스템 임팩트, 이색적 접합, 외부화 진전, 조건 설계, 빼기, 수렴분기, 메타인지). "해당되는 것만, 이름 안 붙임" 주석. 하단 Layer 3 — 5W1H Apply(적용): recall() → mcp-memory(4,900 nodes) → 5W1H 추출. 세 행짜리 테이블: Level 1(즉시 적용) = where + what + why + how + when, Level 2(설계 참고) = where + what + why, Level 3(사고 자극) = what + why. -->

**[다이어그램 4 — 7-Lens Sectional Perspective]**
<!-- 7개 렌즈를 sectional perspective 터널로. 안쪽으로 갈수록 어둡게. 소실점 = 5W1H. 하단에 depth probe (L1/L2/L3). -->

**[다이어그램 5 — 3층 관통 예시: Karpathy "상태를 최소화하라"]**
<!-- 왼쪽에 입력: "에이전트 설계에서 상태를 최소화하라." 화살표가 세 층을 수직으로 통과한다. Layer 1 통과 후 = Axiom 선택 표시(Why it matters ✓, Be smart ✓, Zoom in ✓). Layer 2 통과 후 = 렌즈 적용 표시(빼기의 관점이 활성). Layer 3 통과 후 = recall() 결과("orchestration의 context_buffer에 불필요한 상태 3개 존재")와 5W1H 출력(Level 1: where = orchestration, what = context_buffer 상태 3개 제거, why = 불필요한 상태 누적, how = buffer 초기화 로직 수정, when = 이번 주). 오른쪽에 대비: 범용 뉴스레터 출력 = "AI 업계에 중요하다." -->

---

## 7) 설계 — 새벽 5시

### SectionTitle

- eyebrow: 설계
- title: 새벽 5시
- desc: Task Scheduler가 파이프라인을 깨운다.

매일 새벽 5시, Task Scheduler가 파이프라인을 깨운다. 세 파이프라인은 독립적이다.

**[다이어그램 6 — Pipeline Sequence & Multi-LLM Division]**
<!-- 타임라인이 가로로 흐른다. 05:03 — Daily Post: [HN, arXiv, Reddit, RSS] → curl 4,000자 추출 → Claude Sonnet(Axiom + WIM + Apply) → git push. 05:23 — YouTube: [플레이리스트 스캔] → yt-dlp 자막(fallback: Groq Whisper 음성→텍스트, 25MB 초과 시 10분 분할) → Gemini 2.5 Flash(구조화) → Claude Sonnet + recall()(판단 + 5W1H) → gpt-4.1-mini(번역) → 인용문 검증 → git push. 05:43 — Twitter: [Chrome CDP 북마크] → gpt-4.1-mini(분석 + 번역) → git push. 각 모델 노드에 "무료" 태그. 세 파이프라인 사이에 "독립: 개별 실패 허용" 주석. -->

---

## 8) 실체 — 하루의 흐름

### SectionTitle

- eyebrow: 실체
- title: 하루의 흐름
- desc: 수집에서 발행까지.

2026년 3월 25일 화요일, 새벽 5시 23분. YouTube 파이프라인이 깨어난다.

전날 밤 올라온 영상 하나 — 42분짜리 에이전트 설계 인터뷰. 자막을 찾고, 구조를 잡고, 내 프로젝트를 읽고, 적용점을 쓰고, 한글로 옮기고, 검증을 통과하면 배포된다. 42분짜리 영상이 "내 작업에 어떻게 닿는가"까지 연결되는 과정.



**[다이어그램 7 — YouTube 5-Stage Pipeline: 실제 사례]**
<!-- 하나의 영상이 5단계를 통과하는 과정을 수평으로 펼친다. Stage 1 추출: 입력 = "42분 에이전트 설계 인터뷰" → yt-dlp(자막 탐색: 수동 → 자동생성 → 없음) → 없으면 Groq Whisper(오디오 추출 → 25MB 초과 시 10분 분할 → whisper-large-v3) → 출력 = transcript 텍스트. Stage 2 구조화: Gemini 2.5 Flash → 출력 = 섹션별 핵심, 기술 스택, key takeaways. Stage 3 판단: Claude Sonnet → recall()(mcp-memory 4,900 nodes) → 출력 = 5W1H apply_point(Level 1/2/3 판정). Stage 4 번역: gpt-4.1-mini → 영→한(기술 용어 영문 유지, 한국어 비율 30% 이상이면 스킵). Stage 5 검증+배포: 인용문 ↔ 원문 대조(불일치 시 삭제) → JSON 저장 → git push. 상단에 소요시간 바: 전체 약 3분. -->

---

## 9) 실체 — 100일의 기록

### SectionTitle

- eyebrow: 실체
- title: 100일의 기록
- desc: 매일 한 편씩, 100편이 넘었다.

2025년 12월에 Perplexity 하나로 시작했다. 매일 같은 질문을 던졌더니 매일 비슷한 답이 왔다.

Smart Brevity를 도입하면서 달라졌다. Why it matters를 쓰려면 왜 중요한지 알아야 한다 — 형식이 판단을 강제한 것이다.

그 뒤로 실패가 쌓였다. prompt injection으로 깨진 포스트가 게시됐고, sonar-deep-research가 가짜 뉴스를 만들어냈고, Codex가 인용문 12개를 전부 날조했고, Twitter 자동 수집은 큐레이션 비용이 수동보다 컸다. 실패할 때마다 검증이 하나씩 추가됐다.

그리고 Perplexity Deep Research의 실체를 발견했다. "API"라고 불렀던 것이 Playwright로 웹사이트를 조종하는 브라우저 자동화였다. 3월 마지막 주에 실패율 40–50%, 세 소스 전부 멈췄다. 블랙박스를 열어보니 비어있었다.

Perplexity를 폐기했다. 무료 소스에서 원문을 직접 가져오고, AI가 추론하는 대신 본문을 읽게 만들고, 각 모델이 자기 일만 하는 구조를 새로 짰다.

**[다이어그램 8 — Evolution Timeline: v1 → v2 → v3]**
<!-- 가로 타임라인. 왼쪽 2025.12 "v1 시작" → 아래에 "Perplexity 단일 소스". 빨간 마커 ① 2026.02.23: prompt injection 게시 사고 → 도입된 검증: "AI 출력 신뢰하지 않기" 원칙. 빨간 마커 ② 2026.03.17: Google Titan 가짜 뉴스 → 도입된 검증: hard fail(통과 못 하면 미발행). 빨간 마커 ③ Codex 인용문 12/12 날조 → 도입된 검증: 원문 대조 함수. 빨간 마커 ④ Twitter 자동 수집 폐기 → 교훈: "기계가 못 하는 큐레이션". 빨간 마커 ⑤ 2026.03.24~27: Perplexity 실패율 40-50% → 발견: Deep Research = Playwright 브라우저 자동화. 전환점 "v3" = 무료 소스 직접 수집 + 본문 4,000자 + 멀티LLM 분업. 각 빨간 마커에서 아래로 화살표가 내려가 "검증 레이어"가 하나씩 쌓이는 구조. -->

---

## 10) 강화 — 뭐가 달라졌는가

### SectionTitle

- eyebrow: 강화
- title: 뭐가 달라졌는가
- desc: 렌즈를 바꾸면 독자가 바뀐다.

만들고 나서 깨달은 것이 있다.

나는 뉴스를 읽지 않는다. 시스템이 뉴스를 읽고, 나는 그중에서 내 작업에 닿는 것만 본다. 뉴스레터는 편집자의 판단이다. 이 시스템은 독자의 맥락이다.

그런데 "나"를 다른 사람으로 바꾸면?

조직의 기술 리더도 매일 같은 질문을 한다 — "우리 팀에 영향을 미치는 변화가 뭐지?" 렌즈를 바꾸면 된다. 조직의 기술 스택, 진행 중인 프로젝트, 의사결정 이력을 렌즈로 정의하면 같은 구조가 "우리에게 중요한 것"을 매일 아침 추출한다.

개인의 뉴스룸이 조직의 뉴스룸이 되는 건 코드를 복사하는 게 아니라 렌즈를 바꾸는 것이다.

매일 새벽 5시, 시스템이 깨어난다.

**[다이어그램 9 — Lens Swap: 개인 → 조직]**
<!-- 좌우 대칭 구조. 왼쪽 "나의 뉴스룸": mcp-memory(4,900 nodes, 내 프로젝트/결정/실패) → WIM 7렌즈 → 출력 예시 "orchestration의 context_buffer에서 상태 3개를 제거한다." 오른쪽 "조직의 뉴스룸": 조직 knowledge base(기술 스택, 진행 프로젝트, 의사결정 이력) → 조직 렌즈(같은 7렌즈 구조, 내용만 다름) → 출력 예시 "우리 인증 서비스의 MCP 연동 방식을 재검토한다." 가운데에 공유되는 것: 3개 소스, 3층 해석 체계, 파이프라인. 바뀌는 것: 렌즈 정의, knowledge base, 출력. -->
