## 1) Hero

매일 새벽 5시, 시스템이 돌아간다. 기사와 영상, 트윗을 수집하고, 왜 중요한지 정리한 뒤 발행한다. 편집자를 두지 않은 뉴스 파이프라인이다. 설계한 것은 그 해석 기준이다.

---

## 2) Table of Contents

### SectionTitle

- eyebrow: CONTENTS
- title: 시작 · 설계 · 실체 · 강화
- desc: 매일 아침, 기술 세계의 맥락을 잡는 시스템.

**카드 1 — 시작**

왜 만들었는가. 정보는 넘치는데 연결되지 않았다. 매일 아침 같은 질문이 반복됐다.

**카드 2 — 설계**

3개 소스와 3층 해석 체계. 뉴스를 수집하는 것이 아니라, 해석의 구조를 설계하다.

**카드 3 — 실체**

새벽 5시에 시작되는 파이프라인. 하루의 흐름과 100일의 기록이 어떻게 쌓였는지 보여준다.

**카드 4 — 강화**

같은 구조도 기준이 달라지면 다른 결과를 만든다. 개인용 시스템에서 조직용 시스템으로 확장하는 이야기다.

---

## 3) 시작 — 매일 아침의 질문

### SectionTitle

- eyebrow: 시작
- title: 매일 아침의 질문
- desc: 지난 24시간, 기술 업계에는 무슨 일이 있었는가.

논문은 arXiv에 올라오고, 유저들의 분위기는 X에서, 해설은 YouTube에 쌓인다. 기업은 발표하고 경쟁사는 응수한다. 오픈소스는 그와 별개로 다음 방향을 먼저 실험한다.

각각은 읽을 수 있다. 그문제는 따로 읽는다는 점이었다. arXiv 논문과 X의 한 줄이 같은 흐름을 가리켜도 연결되지 않았고, YouTube 분석이 전날 읽은 기사의 맥락을 바꾼다는 사실도 뒤늦게 알아차렸다.

정보가 부족한 적은 없었다. 부족한 건 연결이었고, 그 연결을 만들 시간이었다.

---

## 4) 시작 — 정보의 양과 질 사이

### SectionTitle

- eyebrow: 시작
- title: 정보의 양과 질 사이
- desc: 많이 읽는 것과 잘 읽는 것은 다르다.

뉴스레터 세 개, RSS, X 리스트. 한 달을 돌렸다. 그래도 "어제 기술 세계에서 뭐가 중요했어?"라는 질문에 30초 안에 답하지 못했다. 많이 읽었지만, 무엇이 중요했는지는 남지 않았다.

수집은 되는데 해석이 안 되는 문제였다. 그래서 해석의 각도를 먼저 설계하기로 했다.

**[다이어그램 1 — 끊어진 정보 흐름]**
<!-- 왼쪽에 5개 소스(arXiv, X, YouTube, 뉴스레터, RSS)가 흩어져 있다. 각각에서 화살표가 나오지만, 가운데에서 합쳐지지 않고 독자(나)에게 따로따로 도착한다. 화살표 사이에 연결선이 없다. 오른쪽에 "판단" 상자가 있지만 점선으로 비어 있다 — 수집은 되지만 해석에 닿지 못하는 상태를 보여준다. -->

---

## 5) 설계 — 3개 소스

### SectionTitle

- eyebrow: 설계
- title: 3개 소스
- desc: HN · arXiv · RSS, YouTube, Twitter.

어떤 소스를 넣을지보다 어떤 소스를 뺄지가 더 어려웠다. 남긴 기준은 하나였다. 서로 같은 역할을 하지 않을 것. 속도, 깊이, 시야가 각각 분명해야 했다.

DDaily Post는 속도를 맡는다. 제목만 긁어오는 것이 아니라 curl로 원문 본문 4,000자를 직접 추출하고, Claude Sonnet이 그 위에서 판단을 얹는다. 처음에는 제목만으로 돌렸다. "LiteLLM이 공격받았다"는 헤드라인만 읽은 AI가 공격 방식을 지어낸 적도 있었다. 본문을 넣자 정확도가 올라갔다. AI가 추론하게 두는 대신 실제로 읽게 만든 것이다.

YouTube는 깊이를 맡는다. 40분짜리 영상 하나에 기사 여러 편 분량의 맥락이 담기는데, 그것을 매일 사람이 직접 보고 정리하기는 어렵다.

Twitter는 시야를 맡는다. 기사가 되기 전의 신호가 먼저 올라오는 곳이다. 누군가의 짧은 한 줄이 3일 뒤 뉴스가 되는 경우가 많다. 그래서 직접 북마크한 트윗만 수집한다.

**[다이어그램 2 — 3-Source Architecture]**
<!-- 세 개의 열. 왼쪽부터 Daily Post(속도), YouTube(깊이), Twitter(시야). 각 열 안에: 입력 소스(Daily = HN, arXiv, Reddit, RSS / YouTube = 플레이리스트 / Twitter = 북마크), 추출 방식(Daily = curl 4,000자 / YouTube = yt-dlp 자막 → Groq Whisper fallback / Twitter = Chrome CDP), 가공 모델(Daily = Claude Sonnet / YouTube = Gemini Flash → Claude Sonnet → gpt-4.1-mini / Twitter = gpt-4.1-mini). 아래에 요일별 주제 스케줄 행: 월 AI/ML, 화 빅테크, 수 산업, 목 오픈소스, 금 하드웨어, 토 사례, 일 종합 — Daily Post에만 적용. -->

---

## 6) 설계 — 3층 해석 체계

### SectionTitle

- eyebrow: 설계
- title: 3층 해석 체계
- desc: 형식, 관점, 적용 — 뉴스를 3번 통과시킨다.

"Anthropic이 MCP 서버의 원격 인증 표준을 발표했다." 동일한 사실이, 사람마다 적용되는 지점은 재각각이다. 그 지점을 어떻게 구조화할 수 있을까 고민했고, 3개의 스코프로 나눴다.

첫 번째는 형식이다. Smart Brevity, 즉 Axios의 뉴스 작성법을 기준으로 삼았다. 뼈대가 잡히면 최소한 "왜 중요한지"는 빠지지 않는다. 하지만 형식만으로는 충분하지 않았다. "AI 시대에 중요하다" 같은 문장이 반복됐기 때문이다. 누구에게나 맞는 말은 실제로는 아무에게도 중요하지 않다.

두 번째는 관점이다. 같은 뉴스를 다르게 읽기 위한 기준을 만들었다. WIM, Why It Matters다. 뉴스를 지금 만들고 있는 작업에 대입해 읽고, 서로 다른 도메인이 만나는 지점을 찾아 이것으로 뭘 할 수 있는지를 본다. 

세 번째는 적용이다. AI가 현재 작업 기준으로 뉴스를 읽으려면, 먼저 무엇을 만들고 있는지 알아야 했다. 그래서 mcp-memory를 연결했다. Claude는 뉴스를 읽기 전에 recall()로 온톨로지를 먼저 읽고, 그다음 각 콘텐츠가 현재 작업과 얼마나 직접적으로 연결되는지 판단한다. 맞지 않으면 억지로 액션을 만들지 않는다.

**[다이어그램 3 — 3-Layer Interpretation System]**
<!-- 수직 3단 구조. 상단 Layer 1 — Axiom(형식): 12개 axiom을 카드로 나열. why_it_matters에 "필수" 마킹, 나머지 11개에 "선택" 마킹. 오른쪽에 소스별 자주 쓰이는 세트 표시(Daily = driving_the_news + the_big_picture + whats_next / YouTube = be_smart + zoom_in + the_bottom_line / Twitter = the_big_picture + be_smart). 중단 Layer 2 — WIM 7렌즈(관점): 7개 렌즈를 원형으로 배치(시스템 임팩트, 이색적 접합, 외부화 진전, 조건 설계, 빼기, 수렴분기, 메타인지). "해당되는 것만, 이름 안 붙임" 주석. 하단 Layer 3 — 5W1H Apply(적용): recall() → mcp-memory(4,686 nodes) → 5W1H 추출. 세 행짜리 테이블: Level 1(즉시 적용) = where + what + why + how + when, Level 2(설계 참고) = where + what + why, Level 3(사고 자극) = what + why. -->

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

매일 새벽 5시, Task Scheduler가 파이프라인을 실행한다. 세 파이프라인은 독립적이다.

```python scripts/run-all-pipelines.py
def _run_main():
    ensure_cdp_chrome()                        # CDP Chrome 보장
    os.system("git pull --rebase origin master")

    # 1. Daily Post — RSS/Reddit/HN → Claude Sonnet
    results["daily"] = run_step("Daily Post",
        [PYTHON, "run-daily-v3.py", TODAY], timeout=1800)

    # 2. YouTube — yt-dlp → Groq Whisper → Codex → Claude → gpt-4.1-mini
    results["youtube"] = run_step("YouTube",
        [PYTHON, "analyze-youtube-v3.py"], timeout=3600)

    # 3. Twitter — Chrome CDP → Codex 병렬 분석
    results["twitter"] = run_step("Twitter",
        [PYTHON, "run-twitter-pipeline.py"], timeout=5400)
```

**[다이어그램 6 — Pipeline Sequence & Multi-LLM Division]**
<!-- 타임라인이 가로로 흐른다. 05:03 — Daily Post: [HN, arXiv, Reddit, RSS] → curl 4,000자 추출 → Claude Sonnet(Axiom + WIM + Apply) → git push. 05:23 — YouTube: [플레이리스트 스캔] → yt-dlp 자막(fallback: Groq Whisper 음성→텍스트, 25MB 초과 시 10분 분할) → Gemini 2.5 Flash(구조화) → Claude Sonnet + recall()(판단 + 5W1H) → gpt-4.1-mini(번역) → 인용문 검증 → git push. 05:43 — Twitter: [Chrome CDP 북마크] → gpt-4.1-mini(분석 + 번역) → git push. 각 모델 노드에 "무료" 태그. 세 파이프라인 사이에 "독립: 개별 실패 허용" 주석. -->

---

## 8) 실체 — 하루의 흐름

### SectionTitle

- eyebrow: 실체
- title: 하루의 흐름
- desc: 수집에서 발행까지.

2026년 3월 25일 화요일, 새벽 5시 23분. YouTube 파이프라인이 실행된다.

전날 밤 올라온 영상 하나, 42분짜리 에이전트 설계 인터뷰가 들어온다. 자막을 찾고, 구조를 잡고, 프로젝트를 읽고, 적용 지점을 쓰고, 한글로 옮기고, 검증을 통과하면 배포된다. 핵심은 42분짜리 영상을 요약하는 데서 끝나지 않고, 그것이 현재 작업에 어떻게 닿는지까지 연결하는 데 있다.



**[다이어그램 7 — YouTube 5-Stage Pipeline: 실제 사례]**
<!-- 하나의 영상이 5단계를 통과하는 과정을 수평으로 펼친다. Stage 1 추출: 입력 = "42분 에이전트 설계 인터뷰" → yt-dlp(자막 탐색: 수동 → 자동생성 → 없음) → 없으면 Groq Whisper(오디오 추출 → 25MB 초과 시 10분 분할 → whisper-large-v3) → 출력 = transcript 텍스트. Stage 2 구조화: Gemini 2.5 Flash → 출력 = 섹션별 핵심, 기술 스택, key takeaways. Stage 3 판단: Claude Sonnet → recall()(mcp-memory 4,686 nodes) → 출력 = 5W1H apply_point(Level 1/2/3 판정). Stage 4 번역: gpt-4.1-mini → 영→한(기술 용어 영문 유지, 한국어 비율 30% 이상이면 스킵). Stage 5 검증+배포: 인용문 ↔ 원문 대조(불일치 시 삭제) → JSON 저장 → git push. 상단에 소요시간 바: 전체 약 3분. -->

---

## 9) 실체 — 100일의 기록

### SectionTitle

- eyebrow: 실체
- title: 100일의 기록
- desc: 매일 한 편씩, 100편이 넘었다.

2025년 12월에 Perplexity 하나로 시작했다. 살을 붙여갔다. 요일별로 소스,주제를 다각화했고, 트위터 유튜브 모두 열심히 들었다.

Smart Brevity를 도입하면서 흐름이 달라졌다. why it matters를 쓰려면, 먼저 왜 중요한지 판단해야 했기 때문이다. 형식이 판단을 밀어붙인 셈이다.

그 뒤로 실패가 쌓였다. 잘못된 포스트가 게시되기도 했고, 가짜 뉴스와 날조된 인용문도 나왔다. Twitter 자동 수집은 기대보다 효율이 낮았다. 그때마다 검증 단계를 하나씩 추가했다.

그리고 Perplexity Deep Research가 기대한 방식으로 동작하지 않는다는 점도 확인했다. "API"라고 생각했던 것은 Playwright 기반의 브라우저 자동화에 가까웠다. 3월 마지막 주에는 실패율이 40–50%까지 올라가며 세 소스가 모두 멈췄다. 내부를 확인한 뒤, 이 구조를 더는 핵심 파이프라인에 둘 수 없다고 판단했다.

Perplexity는 폐기했다. 대신 무료 소스에서 원문을 직접 가져오고, AI가 추론하는 대신 본문을 읽게 만들고, 각 모델이 자기 역할만 맡는 구조로 다시 설계했다.

**[다이어그램 8 — Evolution Timeline: v1 → v2 → v3]**
<!-- 가로 타임라인. 왼쪽 2025.12 "v1 시작" → 아래에 "Perplexity 단일 소스". 빨간 마커 ① 2026.02.23: prompt injection 게시 사고 → 도입된 검증: "AI 출력 신뢰하지 않기" 원칙. 빨간 마커 ② 2026.03.17: Google Titan 가짜 뉴스 → 도입된 검증: hard fail(통과 못 하면 미발행). 빨간 마커 ③ Codex 인용문 12/12 날조 → 도입된 검증: 원문 대조 함수. 빨간 마커 ④ Twitter 자동 수집 폐기 → 교훈: "기계가 못 하는 큐레이션". 빨간 마커 ⑤ 2026.03.24~27: Perplexity 실패율 40-50% → 발견: Deep Research = Playwright 브라우저 자동화. 전환점 "v3" = 무료 소스 직접 수집 + 본문 4,000자 + 멀티LLM 분업. 각 빨간 마커에서 아래로 화살표가 내려가 "검증 레이어"가 하나씩 쌓이는 구조. -->

---

## 10) 강화 — 뭐가 달라졌는가

### SectionTitle

- eyebrow: 강화
- title: 뭐가 달라졌는가
- desc: 렌즈를 바꾸면 독자가 바뀐다.

만들고 나서 깨달은 것이 있다.

이제 뉴스를 처음부터 끝까지 직접 훑지 않는다. 시스템이 먼저 읽고, 그중 현재 작업과 직접 연결되는 것만 본다. 일반 뉴스레터가 편집자의 기준으로 정리된다면, 이 시스템은 독자의 작업 맥락을 기준으로 정리된다.

이 구조는 개인에게만 쓰이는 것이 아니다.

조직의 기술 리더도 매일 비슷한 질문을 한다. "우리 팀에 영향을 미치는 변화가 무엇인가?" 여기서 바꿔야 하는 것은 구조가 아니라 기준이다. 조직의 기술 스택, 진행 중인 프로젝트, 의사결정 이력을 기준으로 정의하면 같은 시스템이 "우리에게 중요한 것"을 매일 아침 다시 추출할 수 있다.

개인용 시스템을 조직용 시스템으로 바꾸는 데 필요한 것은 코드 복사가 아니라 기준의 교체다.

매일 새벽 5시, 시스템은 같은 기준으로 다시 하루를 정리한다.

**[다이어그램 9 — Lens Swap: 개인 → 조직]**
<!-- 좌우 대칭 구조. 왼쪽 "나의 뉴스룸": mcp-memory(4,686 nodes, 내 프로젝트/결정/실패) → WIM 7렌즈 → 출력 예시 "orchestration의 context_buffer에서 상태 3개를 제거한다." 오른쪽 "조직의 뉴스룸": 조직 knowledge base(기술 스택, 진행 프로젝트, 의사결정 이력) → 조직 렌즈(같은 7렌즈 구조, 내용만 다름) → 출력 예시 "우리 인증 서비스의 MCP 연동 방식을 재검토한다." 가운데에 공유되는 것: 3개 소스, 3층 해석 체계, 파이프라인. 바뀌는 것: 렌즈 정의, knowledge base, 출력. -->
