# Context Engineering — 문제 · 설계 · 해결 전체 정리

> 조사한 모든 파일(01/08/09/10/11 + mcp-memory 45노드 + foundation 3축) 기준.
> 문제가 뭐였고, 왜 그랬고, 어떻게 풀었는지.

---

## 1. 배경 — 어떤 상황이었나

### 1.1 물리적 제약
- Paul은 솔로 개발자. Claude Code(Opus)가 메인 AI.
- 전체 프로젝트 규모: **~38.7M 토큰** (index-system 측정, 25개 프로젝트, 1,169개 엣지)
- Claude context window: 처음 **200K**, 이후 **1M**
- 200K 기준 전체의 **0.5%**, 1M 기준 **2.6%**만 한 번에 볼 수 있음

### 1.2 작업 환경
- 프로젝트가 계속 늘어남 (portfolio, tech-review, mcp-memory, orchestration, documentation-system, index-system, user-guide, auto-iterate, context-cascade, daily-memo, essay, monet-lab)
- 프로젝트 간 의존성이 복잡 (index-system이 1,169개 엣지로 추적)
- 매일 여러 세션, 세션마다 다른 프로젝트, 세션 간 맥락 유실
- Claude가 세션 시작 시 "어제 뭘 했는지" 모름 → 같은 설명 반복

### 1.3 시스템 진화 타임라인
| 시기 | 상태 | 핵심 사건 |
|------|------|----------|
| 2026-02-02 | v1.0 | 시작. 에이전트 7개 |
| 2026-02-09 | v2.0 | 확장 |
| 2026-02-21 | v3.0 | 에이전트 **24개** (최대치). 도구 정의가 context 절반 차지 |
| 2026-02-27 | v3.3.1→v4.0 | 24→15개 정리. **Context as Currency** 확립 |
| 2026-03-05 | — | 멀티세션 사고 (범용 프롬프트 → 코드 수정+커밋) |
| 2026-03-10~17 | v5.0 | CE 3개 파이프라인. 1M 전환. Workers 3+Skills 13 |

---

## 2. 문제 — 구체적으로 뭐가 안 됐나

### 문제 1: 도구 팽창 → 사고 공간 압축
**현상**: 에이전트 7→24개, 7일 만에. 빠뜨리는 게 두려워서 보이는 족족 만듦.
**근본 원인**: 도구 하나의 정의(시스템 프롬프트 내)가 수백~수천 토큰. 24개면 정의만으로 200K의 절반.
**결과**: 만들수록 Claude가 실제 작업에 쓸 수 있는 공간이 줄어듦. "만드는 동안에는 그걸 보지 못함."
**증거**: CHANGELOG.md v3.0→v3.3.1 기록, PLANNING.md D-024

### 문제 2: 세션 간 맥락 유실
**현상**: 세션 시작 시 Claude가 "어제 뭘 결정했는지, 뭐가 미해결인지, 어디까지 했는지" 모름.
**근본 원인**: context window는 세션과 함께 리셋. 외부 저장소 없이는 매번 처음부터.
**결과**: 같은 설명 반복, 같은 실수 반복, "아직 안 틀린 결정"이 유실되면 같은 결정을 다시 내림.
**증거**: mcp-memory #3812 "가장 비싼 토큰 = 아직 안 틀린 결정", KNOWLEDGE.md 세션 관리 섹션

### 문제 3: 1M "다 넣기"의 역설
**현상**: 1M이 되자 "전부 넣어보자" → 관련 정보 5-10%, 나머지 90% 노이즈.
**근본 원인**: 어텐션 희석. context가 길어질수록 정보 회수 정확도 하락 (Lost in the Middle 현상).
**결과**: Claude가 노이즈 속에서 "그럴듯하지만 내 상황에 안 맞는" 답을 생성. 설득력 있게 틀림.
**증거**: 09 foundation/philosophy.md "큐레이션 > 압축", mcp-memory #5130

### 문제 4: 정보 수명 혼재
**현상**: 모든 정보를 같은 층에 넣음. 규칙(불변)과 어제 상태(휘발)와 현재 파일(일시)이 뒤섞임.
**근본 원인**: 정보의 수명 개념 없음. "넣으면 다 보겠지"라는 가정.
**결과**: 불변 규칙이 매 세션 다시 로드되는 낭비, 휘발 정보가 불변 정보를 밀어내는 충돌.
**증거**: 09 foundation/principles.md Layer 설계 근거

### 문제 5: Context Rot (컨텍스트 부패)
**현상**: 시간이 지나면서 context에 있는 정보가 썩음. 4가지 유형:
- **Poisoning**: 코드는 바뀌었는데 규칙은 옛날 그대로 → 옛 규칙을 바뀐 코드에 적용
- **Distraction**: 지금 작업과 무관한 프로젝트 규칙이 context에 있음 → 어텐션 분산
- **Confusion**: 두 규칙이 반대 행동 지시 → Claude가 무작위 선택
- **Clash**: 글로벌 규칙과 프로젝트 규칙이 충돌 → 우선순위 불명확
**근본 원인**: 정보 유효성 검증 없이 누적, 계층 구분 없음.
**증거**: 09 03_ce-perspective 90_output/01_ce-guide.md

### 문제 6: Compact 시 정보 소실
**현상**: context가 커지면 압축해야 하는데, 압축 과정에서 중요 결정/맥락이 날아감.
**근본 원인**: compact = 요약. 요약 = 판단 개입 = 선택적 소실.
**결과**: compact 후 "왜 그 결정을 했는지" 모름 → 같은 논의 반복.
**증거**: mcp-memory #4143 (Warp 재시작 → 빈 snapshot → 복구 불가), #4218 (auto-compact 후 재실행 불가), common-mistakes.md compact 규칙

### 문제 7: 대규모 소스 읽기 불가
**현상**: mcp-memory 소스 ~27.8M 토큰. 1M window에 2.6M도 못 넣음. 전체 코드베이스 파악 불가.
**근본 원인**: 물리적 한계. 아무리 window가 커도 전체는 못 넣음.
**결과**: "이 코드베이스에서"라고 말하지만 실제로는 "내가 넣어준 파일들 안에서". 누락 불가피.
**증거**: index-system stats (38.7M 전체), 10 scanner.py 토큰 추정 기능

### 문제 8: Hook 과잉 (메타 문제)
**현상**: 문제를 발견할 때마다 hook으로 강제. context-budget.py(매 Read마다 예산 계산), read-guide.py(읽기 이유 강제), Gate 선언 강제.
**근본 원인**: "Claude가 규칙을 안 지키면?" → 코드로 강제. 자율성 불신.
**결과**: hook 자체가 오버헤드 (200ms/회), 마찰 증가, 일상 작업 방해. hook이 문제를 만드는 메타 문제.
**증거**: 09 02_cascade-v2 E2E 테스트에서 과잉 발견, MEMORY.md "과잉 hook 제거" 항목

### 문제 9: Instruction Fade-out
**현상**: 긴 세션에서 초기에 넣은 규칙의 영향력이 점점 감소.
**근본 원인**: transformer attention이 최근 토큰에 가중. 초기 규칙이 수만 토큰 뒤로 밀려남.
**결과**: 세션 후반에 초기 규칙을 위반하는 행동 증가. "처음엔 잘 지키다가 나중에 안 지킴."
**증거**: 09 foundation/principles.md Fade-out 방지 원칙, compressor Attention Manipulation

### 문제 10: 멀티세션 안전 (2026-03-05 사고)
**현상**: 여러 pane에서 동시 작업 시, 범용 프롬프트("인덱스 읽고 이어서")를 보냈더니 B가 소스코드 수정+커밋, C가 config 수정+커밋.
**근본 원인**: 오케스트레이터 통합 전에 하위 세션에 직접 프롬프트 전송. "이어서 해라"가 "구현해라"로 해석됨.
**결과**: git revert로 복구. 이후 안전 규칙 5가지 확립.
**증거**: common-mistakes.md "아이디에이션 세션 안전 규칙"

---

## 3. 설계 — 어떤 접근으로 풀었나

### 설계 원칙 A: 큐레이션 > 압축
- v1 (200K): "읽을 수 없으니 압축해서 전달하자"
- v2 (1M): "읽을 수 있지만 뭘 읽을지 골라야 한다"
- **핵심 전환**: 문제는 용량이 아니라 선별. 1M이어도 전부 넣으면 더 나빠짐.

### 설계 원칙 B: 읽지 않는 것도 엔지니어링
- 시그니처만 보면 될 때 전문 읽기 = 낭비
- 이미 읽은 파일 다시 읽기 = 낭비
- 이 Phase에서 불필요한 것 = 나중으로
- **의식적 생략 = CE의 핵심 활동**

### 설계 원칙 C: 구조가 컨텍스트를 만든다
- 파일시스템 구조 자체가 "뭘 먼저/나중 읽을지" 결정
- 08의 00_index.md → Phase 폴더 → 파일 순서 = Progressive Reading 경로
- 02_context.md의 CARRY/DO NOT CARRY = Phase 간 명시적 핸드오프
- **좋은 구조 = 좋은 읽기 전략**

### 설계 원칙 D: 원칙 > 시스템
- 시스템으로 만들면 유지비
- 원칙으로 남기면 자율 적용
- cascade v1(독립 시스템) → v2(전략) → v3(관점)으로 진화
- "CLAUDE.md 3줄이면 충분"

### 설계 원칙 E: 측정 없이 변경 금지
- 5개 가설 중 3개 틀림
- "불필요해 보인다" → 실측 먼저
- E2E 테스트(T1-T7)로 검증 후 제거

---

## 4. 해결 — 구체적으로 뭘 만들었고 뭘 버렸나

### 해결 1: 4-Layer 아키텍처 → 문제 4(수명 혼재) 해결

| Layer | 수명 | 내용 | 토큰 |
|-------|------|------|------|
| **Static** | 영구 | CLAUDE.md, rules/, MEMORY.md | ~15K |
| **Session** | 세션당 1회 | get_context(), recall() | ~200 |
| **Task** | 작업 시작 시 | Gate 판단 + Progressive Reading | 가변 |
| **Live** | 작업 내내 | auto_remember, Compact, 재주입 | 연속 |

**핵심**: 수명이 다른 정보를 분리. Static에 Task 정보 안 넣고, Task에 Static 안 넣음.
**부수 효과**: Prompt Caching 활성화 (Static이 안정적 → 캐시 동작)

### 해결 2: Gate 시스템 → 문제 7(대규모 읽기 불가) 해결

| Gate | 조건 | 전략 | 담당 |
|------|------|------|------|
| **A** | ≤300K | 직접 읽기 (Serena symbolic tools) | Opus |
| **B** | 300K-800K | Codex 정찰 → high/medium만 읽기 | Codex→Opus |
| **C** | 800K+ | 분산 추출 (Codex+Gemini 병렬) | 다수→Opus |

**핵심**: 규모에 따라 전략 분기. 모든 것을 읽지 않고도 모든 것을 고려.
**진화**: 처음엔 Gate 선언 강제 → 실전에서 과잉 → 원칙 기반 자율 판단으로 전환.

### 해결 3: Progressive Reading → 문제 3(다 넣기 역설), 7(대규모) 해결

| 단계 | 읽는 것 | 토큰 |
|------|---------|------|
| 1 | 00_index.md (전체 구조) | ~100 |
| 2 | Phase index (해당 영역) | ~200 |
| 3 | Serena get_symbols_overview (심볼 목록) | ~500 |
| 4 | find_symbol include_body=False (시그니처) | ~200 |
| 5 | 필요한 본문만 Read | 가변 |

**핵심**: 전문을 바로 안 읽음. 항상 개요→상세 순서.

### 해결 4: Compact 점진화 → 문제 6(compact 시 소실) 해결

| 토큰 | 행동 | 강제? |
|------|------|-------|
| ~500K | checkpoint → mcp-memory에 중간 상태 저장 | 자율 |
| ~700K | compact → compressor 호출, index에 복구점 | 필수 |
| ~900K | 세션 교체 → /session-end | 강력 권장 |

**compact 전 필수 4단계** (정보 소실 0):
1. index "현재 상태" 갱신
2. mcp-memory save_session()
3. work-log 작성
4. 사용자에게 "준비 완료" 보고

**핵심**: 한 번에 전부 압축 아님. 단계별. 그리고 압축 전에 3곳에 영구 저장.

### 해결 5: mcp-memory 통합 → 문제 2(세션 간 유실) 해결

- **get_context()**: 200토큰으로 전체 맥락 복구 (기존 1,700 대비 88% 절약)
- **recall()**: 키워드로 과거 결정/교훈 조회
- **save_session()**: 세션 종료 시 Narrative+Decision+Question 노드 + 명시적 edge 생성
- **Lens 축적** (Step 4.5): "이번 세션 읽기 패턴" → 다음 세션 recall로 재활용
- **auto_remember hook**: 파일 읽기/배시 실행 자동 감지 → 온톨로지 타입 매핑 → 저장

### 해결 6: Instruction 재주입 → 문제 9(Fade-out) 해결

- compressor 마지막에 목표+규칙 재작성 (Attention Manipulation)
- Phase 진입 시 ce-lesson/few-shot 자동 recall
- 의사결정 시점에 핵심 규칙 재주입

### 해결 7: Layer 분리 → 문제 5(Context Rot) 해결

| Rot 유형 | Layer 방어 |
|----------|-----------|
| Poisoning (옛 규칙) | Static은 드물게 변경 → 정기 검토로 관리 |
| Distraction (무관 정보) | Task Layer로 격리 → 다른 작업에 누출 안 됨 |
| Confusion (모순) | rules/ 계층화 (글로벌 < 프로젝트 < 직접 지시) |
| Clash (우선순위) | CLAUDE.md 우선순위 명시 (사용자 > 스킬 > 기본) |

### 해결 8: 08 파이프라인 구조 → 문제 3, 7 해결 (구조적)

- 00_index.md HTML 코멘트 3줄 = 기계 파싱 가능한 상태
- 폴더 번호 = 실행 순서 (구조가 읽기 경로를 결정)
- 02_context.md = CARRY/DO NOT CARRY (Phase 간 명시적 핸드오프)
- phase-rules.json = 36개 규칙 SoT (Hook이 자동 강제)

### 해결 9: 멀티세션 안전 규칙 → 문제 10(사고) 해결

1. 단계를 절대 건너뛰지 않는다 (오케스트레이터 통합 완료 전 프롬프트 금지)
2. 범용 프롬프트 금지 ("이어서 해라" 절대 금지)
3. 아이디에이션 세션은 plan 모드 (코드 수정 구조적 차단)
4. 모든 프롬프트에 안전장치 ("소스코드 수정 금지. git commit 금지.")
5. 잘못된 작업 발생 시 /clear 사용 (/compact 아님 — 잘못된 컨텍스트가 요약에 남음)

---

## 5. 만들고 버린 것들 (과잉 → 정제)

| 만든 것 | 왜 만들었나 | 왜 버렸나 | 교훈 |
|---------|-----------|----------|------|
| context-budget.py | Read마다 토큰 예산 계산 | 200ms/회 오버헤드. 원칙으로 충분 | 코드 강제 < 원칙 자율 |
| read-guide.py | "왜 읽는지" 강제 | 마찰. 일상 작업 방해 | 마찰 ≠ 엔지니어링 |
| .ctx/ 폴더 | 런타임 상태 파일저장 | 백업/복구 불필요 | 불필요한 영속화 |
| Gate 선언 강제 | "Gate A입니다" 필수 | Claude 자율 판단으로 충분 | 형식 < 원칙 |
| Compact Stage 1-2 경고 | 300K/500K 경고 | 1M에서 도달 빈도 낮음 | 현실에 맞게 조정 |
| cascade v1 (독립 시스템) | 자체 폴더+상태문서 | 쓰이는 건 원칙, 시스템 아님 | 시스템 < 관점 |
| 에이전트 24개 | 빠뜨리기 두려움 | 정의만으로 공간 절반 | best part is no part |

---

## 6. 검증 — 어떻게 확인했나

### E2E 테스트 (02_cascade-v2 파이프라인)

| 테스트 | 검증 대상 | 결과 |
|--------|----------|------|
| T1 | 4-Layer 로드 순서 | ✅ PASS |
| T2 | Gate A 직접 읽기 | ✅ PASS |
| T3 | Gate B Codex 정찰 | ✅ PASS |
| T4 | Gate C 분산 추출 | ✅ PASS (계획 수립+실행) |
| T5 | Compact 점진화 | ✅ PASS |
| T6 | Progressive Reading 순서 | ⚠️ PARTIAL (일부 건너뜀) |
| T7 | Lens 축적+재활용 | ⚠️ PARTIAL (수동 확인) |

### 자율 판단 검증
- Gate B 실전: Claude가 자율적으로 Gate A 하향 판단 → **올바른 판단**
- Gate C 실전: 분산 계획 수립+실행 → **동작 확인**
- Gate 선언 강제 제거 후에도 품질 유지 → **원칙 기반 자율 유효**

### 과잉 제거 검증
- context-budget.py 제거 후: 토큰 관리 품질 동일, 속도 향상
- read-guide.py 제거 후: 읽기 품질 동일, 마찰 감소
- 가설 5개 중 3개 실측으로 기각 → "항상 실측 먼저" 교훈

---

## 7. 현재 상태 — 지금 뭐가 남아있나

### 규칙으로 남은 것 (CLAUDE.md + rules/)
- CE 3단계 필수 (토큰 추정 → Gate → Progressive Reading)
- Compact 임계값 3개 (500K/700K/900K)
- Pre-flight Recall (구현 전 recall() 필수)
- 파일 재읽기 금지

### 시스템으로 남은 것
- mcp-memory (get_context, recall, save_session, auto_remember)
- Hook Framework (config.py + framework.py + auto_remember.py)
- 08 phase-rules.json (36개 규칙, Hook 자동 강제)
- 10 index-system (에코시스템 지도, 규모 추정)
- 11 user-guide 포스트잇 v2.0 (물리적 참고)

### 관점으로 남은 것
- "무엇을 보여줄 것인가?"라는 질문을 의식적으로 던지는 것
- 정보에 수명이 있다는 인식
- 읽지 않는 것도 설계라는 감각

---

## 8. 문제→해결 매핑 요약

```
문제 1 (도구 팽창)     ──→ 24→15→3 정리 + "best part is no part"
문제 2 (세션 유실)     ──→ mcp-memory (get_context 200토큰, save_session)
문제 3 (다 넣기 역설)  ──→ Progressive Reading + Gate 시스템
문제 4 (수명 혼재)     ──→ 4-Layer 아키텍처
문제 5 (Context Rot)   ──→ Layer 분리 + 정기 검토
문제 6 (compact 소실)  ──→ Compact 점진화 + 3곳 영구 저장
문제 7 (대규모 불가)   ──→ Gate B/C (Codex/Gemini 위임)
문제 8 (hook 과잉)     ──→ 원칙 기반 자율 판단으로 전환
문제 9 (Fade-out)      ──→ Instruction 재주입 + Attention Manipulation
문제 10 (멀티세션 사고) ──→ 안전 규칙 5가지 + plan 모드
```
