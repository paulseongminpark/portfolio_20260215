# Phase Guide v2 — 라이프사이클 방법론
> 생성: 2026-03-11 | v2 재작성: 2026-03-17 (03_ce-perspective Phase v3 반영)

**규칙 SoT**: `08_documentation-system/phase-rules.json` — 기계 실행 가능 정의.
이 문서는 사람+Claude 공용 해설서. 충돌 시 phase-rules.json이 우선.

---

## 0. 철학 — 왜 이 파이프라인인가

개발 파이프라인의 유일한 목적은 **불확실성 제거**다.

```
변경 비용 곡선:

  비용 │                              ██ 배포 후 수정
       │                         ██ 코드 수정
       │                    ██ 설계 수정
       │               ██ 계획 수정
       │          ██ 정의 수정
       │     ██ 진단 수정
       │ ██ 말 한마디
       └─────────────────────────────→ 시간
```

**가장 싼 단계에서 가장 많은 불확실성을 제거한다.** Phase 순서의 유일한 이유.

불확실성 4종류 = Phase 4개:
| 종류 | Phase | 틀리면 드는 비용 |
|---|---|---|
| 문제 불확실성 | DIAGNOSE | ★★★★★ (전부 다시) |
| 해법 불확실성 | ARCHITECT | ★★★★ (코드 재작성) |
| 구현 불확실성 | BUILD | ★★★ (버그 수정) |
| 배포 불확실성 | HARDEN | ★★ (핫픽스) |

---

## 1. Pre-flight (의식, Phase 아님)

모든 파이프라인 시작 전 5분 체크리스트:

```
□ recall(작업 키워드) — 과거 결정/실패 조회
□ recall(Phase명, tags="ce-lesson") — Phase별 교훈 자동 주입
□ recall(Phase명, tags="fewshot") — Phase별 좋은 예시 주입
□ 프로젝트 index/STATE.md 읽기 — 현재 상태 확인
□ 환경 확인 — 기술 스택, 의존성, 제약
□ Cascade Gate — 토큰 추정 → A(직접) / B(Codex 정찰) / C(분산)
□ 킬 질문 — "이거 정말 해야 하나? 안 하면 6개월 후 뭐가 달라지나?"
```

---

## 2. Phase 1: DIAGNOSE (10-19)

**목적:** 문제 불확실성을 0에 가깝게. "뭘 풀어야 하는지" 완전히 확정.

**리듬:** Diverge → Converge → Verify

### 원자 태스크

```
┌─ DIVERGE (문제 공간 넓히기)
│
│  □ 1.1 지형 탐색
│     - 코드베이스/시스템 구조 매핑
│     - 기존 관련 코드, 문서, 결정 사항 수집
│     - 산출물: 지형도 (파일 목록 + 관계 + 현재 상태)
│
│  □ 1.2 다각 리서치
│     - 외부 소스 멀티AI 병렬 수집 (필요한 경우)
│     - Codex: 코드베이스 전수 스캔
│     - Gemini/Perplexity: 외부 사례, 논문, 문서
│     - 산출물: 리서치 노트 (소스별 핵심 발견)
│
│  □ 1.3 문제 발굴 — 6가지 질문 무기 사용
│     - 선택지 제시: "이 문제의 핵심이 뭘까: (a)... (b)... (c)...?"
│     - 소크라테스 드릴: 답변에서 3단 이상 깊이 파기
│     - 반전: "이걸 확실히 망치려면 뭘 해야 하나?"
│     - 단계 제거: "이 제약이 없다면 문제가 달라지나?"
│     - 모순 포착: 발언 간 충돌 즉시 제시
│     - 암묵 가정 표면화: 당연시하는 전제에 질문
│     - 산출물: dialogue.md (실제 대화 원문)
│
│  □ 1.4 유사 사례 조사
│     - 같은 문제를 다른 도메인/프로젝트에서 어떻게 풀었나
│     - mcp-memory에서 패턴/실패 사례 검색
│     - 산출물: 유사 사례 목록 + 적용 가능성 판단
│
├─ CONVERGE (문제 정의 좁히기)
│
│  □ 1.5 Problem Statement
│     - 문제를 한 문장으로 — "누가, 뭘 할 때, 뭐 때문에, 어떻게 막히는가"
│     - Paul이 동의할 때까지 수정
│     - 산출물: Problem Statement 1문장
│
│  □ 1.6 Pain Points 핀포인트
│     - 최대 3개로 좁힘
│     - 각각에 "마지막으로 이게 터진 구체적 상황" 기록
│     - 산출물: Pain Point 3개 + 실제 사례
│
│  □ 1.7 Success Criteria
│     - "끝"의 정의 — 측정 가능하게
│     - "어떤 파일이 달라져 있나 / 워크플로우에서 뭐가 바뀌나 / 6개월 후에도 살아있으려면?"
│     - 산출물: Success Criteria 목록 (검증 가능한 문장)
│
│  □ 1.8 Constraints Map
│     - 할 수 있는 것 / 없는 것 / 모르는 것 3칸으로 분류
│     - "모르는 것"은 Phase 2에서 답해야 할 질문이 됨
│     - 산출물: 3칸 Constraints Map
│
└─ VERIFY (진단 검증)

   □ 1.9 Pre-mortem
      - "6개월 후 이 프로젝트가 실패했다. 상위 5가지 이유를 대라."
      - Paul이 직접 답함
      - 산출물: 리스크 5개 + 각각의 대응 방향

   □ 1.10 Problem Statement 스트레스 테스트
      - "이 문제가 사실 문제가 아닐 가능성은?"
      - "이 문제를 풀지 않고 우회하는 방법은?"
      - 산출물: 문제 확정 or 재정의

   □ 1.11 Phase 1 산출물 확정
      - Problem Statement + Pain Points + Success Criteria + Constraints Map
      - dialogue.md에 전체 기록
      - merged 준비
```

### 6가지 질문 무기 (상세)

| # | 무기 | 작동 방식 | 예시 |
|---|---|---|---|
| 1 | **선택지 제시** | 3+ 구체적 방향 제시 → 반응 수집 | "핵심이 (a) 속도 (b) 품질 (c) 학습 — 아니면?" |
| 2 | **소크라테스 드릴** | 답변에서 다음 질문, 3단 이상 | "왜? → 언제 터졌나? → 그때 어떻게?" |
| 3 | **반전** | 실패에서 역추적 | "확실히 망치려면 뭘 해야 하나?" |
| 4 | **단계 제거** | "이거 없으면?" | "이 규칙 없으면 실제로 뭐가 깨지나?" |
| 5 | **모순 포착** | 발언 간 충돌 제시 | "아까 X인데 지금 Y — 어느 쪽이 진짜?" |
| 6 | **암묵 가정 표면화** | 전제에 질문 | "이게 꼭 파일이어야 하나? DB는?" |

**규칙:** 한 번에 하나만 물어보되, 그 하나를 3개 각도로 펼친다.

```
나쁜 예: "목표가 뭔가?"
좋은 예: "이 작업이 끝났을 때 —
  (a) 어떤 파일이 달라져 있나?
  (b) 워크플로우에서 뭐가 바뀌나?
  (c) 6개월 후에도 살아 있으려면 뭐가 필요한가?"
```

---

## 3. Phase 2: ARCHITECT (20-29)

**목적:** 해법 불확실성을 0에 가깝게. "어떻게 풀지" 완전히 확정.

**리듬:** Generate → Evaluate → Decide

### 원자 태스크

```
┌─ GENERATE (옵션 만들기)
│
│  □ 2.1 Option Generation
│     - 최소 3개 접근법 (A/B/C)
│     - 각 옵션에 1-2문장 설명 + 핵심 가정 명시
│     - "A로 끝까지 밀면 어떻게 되나?" 각각에 적용
│     - 산출물: 3+ 옵션 목록
│
│  □ 2.2 도메인 크로스
│     - "전혀 다른 분야에서 비슷한 문제를 어떻게 풀었나?"
│     - 기존 시스템 내 패턴 재사용 가능성 탐색
│     - 산출물: 크로스 인사이트 (있으면)
│
├─ EVALUATE (비교 판단)
│
│  □ 2.3 Trade-off Matrix
│     - 기준: 복잡도 / 유지보수 / 시간 / 확장성 / 위험
│     - 기준은 프로젝트마다 다름 — Paul과 합의
│     - 산출물: 옵션 × 기준 매트릭스
│
│  □ 2.4 Musk 테스트 (각 옵션 내부)
│     - 각 옵션의 하위 태스크마다 "이거 없으면 뭐가 깨지나?"
│     - "안 깨진다" → 그 태스크 제거
│     - 산출물: 태스크 목록 (불필요한 것 제거됨)
│
├─ DECIDE (결정)
│
│  □ 2.5 Decision + 선택 근거
│     - "왜 B가 아니라 A인가" 명시
│     - Paul이 최종 결정
│     - 산출물: 선택된 옵션 + 이유
│
│  □ 2.6 Blueprint 작성
│     - spec.md: 뭘 만드나 (인터페이스, 데이터, 동작)
│     - tasks.md: 어떤 순서로 (의존성 고려한 원자 태스크 목록)
│     - 산출물: spec.md + tasks.md
│
└─ VERIFY

   □ 2.7 Plan Stress-Test
      - Edge cases 나열
      - "이 설계로 처리 불가능한 입력/상황은?"
      - 산출물: edge case 목록 + 처리 방안

   □ 2.8 V-Check ← Phase 1
      - spec을 Problem Statement 옆에 놓고 대조
      - "이 설계가 진짜 저 문제를 푸나?"
      - Success Criteria 하나씩 체크
      - 산출물: V-Check 결과 (Pass/Fail + 이유)

   □ 2.9 Pre-mortem (설계 관점)
      - "이 설계대로 만들었는데 실패했다. 왜?"
      - 산출물: 설계 리스크 목록
```

---

## 4. Phase 3: BUILD (30-39)

**목적:** 구현 불확실성을 0에 가깝게. "제대로 만들었는가" 확정.

**리듬:** Execute → Test → Iterate

### 원자 태스크

```
┌─ EXECUTE (만들기)
│
│  □ 3.1 Scaffold
│     - 디렉토리 구조, 인터페이스 정의, 계약
│     - tasks.md 첫 번째 항목부터 순서대로
│     - 산출물: 프로젝트 뼈대
│
│  □ 3.2 Core Logic
│     - Happy path 먼저 구현
│     - 각 함수/모듈마다 테스트 동시 작성 (TDD)
│     - 산출물: 핵심 로직 + 테스트
│
│  □ 3.3 Subcomponents + Error 처리
│     - 보조 기능, 예외 처리, 경계 조건
│     - 산출물: 완성된 컴포넌트
│
├─ TEST (검증)
│
│  □ 3.4 Unit + Integration Test
│     - 3.2에서 작성한 테스트 실행 + 추가
│     - 커버리지 확인
│     - 산출물: 테스트 통과 결과
│
│  □ 3.5 Edge Case 커버
│     - 2.7에서 나온 edge case 목록 하나씩 구현
│     - 산출물: edge case 테스트 통과
│
└─ ITERATE (자기 검증)

   □ 3.6 Self-Review (Claude)
      - 기준: **정확성** (spec 일치 + 코드 품질 + 테스트 완성도)
      - Phase 4(Harden)와 다른 기준 — 여기서는 "맞게 만들었나"
      - 산출물: self-review 결과 + 수정 사항

   □ 3.7 V-Check ← Phase 2
      - spec.md의 각 항목과 실제 코드 1:1 대조
      - tasks.md 체크리스트 전부 ✅
      - 산출물: V-Check 결과
```

---

## 5. Phase 4: HARDEN (40-49)

**목적:** 배포 불확실성을 0에 가깝게. "세상에서 작동하는가" 확정.

**리듬:** Challenge → Break → Fix

### 원자 태스크

```
┌─ CHALLENGE (공격)
│
│  □ 4.1 외부 리뷰
│     - 멀티AI: Codex(버그 탐지), Gemini(영향 범위 분석)
│     - 기준: Phase 3 Self-Review와 **다름**
│       Self-Review: "맞게 만들었나" (정확성)
│       외부 리뷰: "놓친 게 뭔가" (완전성)
│     - 산출물: 외부 리뷰 리포트
│
│  □ 4.2 Security / Performance Audit
│     - OWASP Top 10 체크
│     - 성능 병목 탐지
│     - 산출물: 보안/성능 리포트
│
├─ BREAK (깨뜨리기)
│
│  □ 4.3 E2E 검증
│     - 실제 시나리오 전체 관통 테스트
│     - "사용자가 이걸 어떻게 오용할 수 있나?"
│     - 산출물: E2E 결과
│
│  □ 4.4 V-Check ← Phase 1 (최종)
│     - Success Criteria 하나씩 체크
│     - "원래 문제를 풀었나?"
│     - 산출물: 최종 V-Check
│
├─ FIX (수정)
│
│  □ 4.5 발견된 이슈 수정
│     - 4.1~4.4에서 나온 이슈 전부 해결
│     - 해결 불가 → 문서화 + Phase 1에 제약 추가
│
└─ APPROVE

   □ 4.6 Human Review
      - Paul 최종 확인
      - 산출물: GO / NO-GO
```

---

## 6. Post-flight (의식, Phase 아님)

```
□ Commit + PR (commit-writer)
□ Pre-deploy Validation (있으면)
□ Deploy & Monitor (있으면)
□ PDR (Lessons → mcp-memory)
□ 방법론 Retro 채점표:
  경험 (1-5):
    - Diagnose 질문 유용도: __/5
    - Architect 옵션 품질: __/5
    - Gate 질문 의미: __/5
    - 불필요하게 느낀 단계: (기록)
  품질 (사실):
    - Diagnose 후 "문제가 달랐다": Y/N
    - Build 후 Harden에서 발견된 이슈 수: __
    - Success Criteria 충족율: __/%
  프로세스 (자동):
    - 총 라운드 수: __
    - Gate 복귀 횟수: __
    - 스킵한 원자 태스크: (목록)
□ 방법론 자체 피드백 — "어느 단계가 약했나?"
```

---

## 7. V-Model 대칭

만든 것은 반드시 검증 짝이 있다:

```
Phase 1 (DIAGNOSE)                    Phase 4 (HARDEN)
  Problem Statement ◄──── V-Check ──── Success Criteria 충족?
  Pain Points       ◄──── V-Check ──── 실제로 해결됐나?
  Constraints       ◄──── V-Check ──── 제약 안에서 작동하나?

Phase 2 (ARCHITECT)                   Phase 3 (BUILD)
  spec.md           ◄──── V-Check ──── 코드가 스펙과 일치?
  tasks.md          ◄──── V-Check ──── 모든 태스크 완료?
  Edge cases        ◄──── V-Check ──── 전부 커버?
```

---

## 8. Gate 설계

모든 Phase 끝에 Gate가 있다. 3가지 경로: 킬(중단) / 복귀(이전 단계) / 통과.

| Gate | 킬 질문 | 킬 | 복귀 | 통과 |
|---|---|---|---|---|
| 1 | "처음 보는 사람이 '풀어야 해'라고 동의하겠나?" | 불필요 | 1.5로 | Phase 2 |
| 2 | "비판자가 첫 번째로 뭘 공격? 버틸 수 있나?" | Phase 1로 | 2.1로 | Phase 3 |
| 3 | "1년 무인 운영되면 뭐가 깨지나?" | 3.2로 | Phase 2로 | Phase 4 |
| 4 | "오늘 실전에 쓰면 최악은? 감수 가능?" | Phase 3로 | Phase 2로 | Post-flight |

**Paul이 직접 답하거나, Claude가 답하고 Paul이 승인/거부.**

---

## 9. 라운드 매핑

Phase 내부에서 라운드(R1/R2/R3)는 리듬의 자연스러운 구분:

| Phase | R1 | R2 | R3 | merged |
|---|---|---|---|---|
| Diagnose | Diverge (1.1~1.4) | Converge (1.5~1.8) | Verify (1.9~1.11) | 산출물 확정 |
| Architect | Generate (2.1~2.2) | Evaluate+Decide (2.3~2.6) | Verify (2.7~2.9) | Blueprint 확정 |
| Build | 구현 R1 | 리뷰 반영 | 추가 수정 | 구현 확정 |
| Harden | 외부 리뷰 | 이슈 수정 | 재검증 | GO/NO-GO |

**라운드 수는 유동적.** merged 전에 Verify는 반드시 거친다.

### 라운드 전환 판단

| 상태 | 시그널 | 다음 |
|---|---|---|
| 탐색 안 된 영역 있음 | 파일 3개 미만, 주제 1개만 | Diverge 계속 |
| 발산 재료 충분 | 파일 4개↑, 동일 주제 2회↑ | Converge 전환 |
| 주요 충돌 해결됨 | 합의 가능, 충돌 2개 이하 | Verify 전환 |
| 결정 완료 | 채택/폐기 목록, 미결 0 | merged |

### merged 폴더 필수 파일 (T1 — Phase별로 다르다)

| Phase | 대역 | 필수 파일 |
|---|---|---|
| Diagnose | 10-19 | `00_orchestrator-integration.md` + `01_definitive-inventory.md` |
| Architect | 20-29 | `00_orchestrator-final.md` + `01_confirmed-decisions.md` |
| Build | 30-39 | `01_final-impl-guide.md` |
| Harden | 40-49 | `00_orchestrator-integration.md` + `01_cross-validation.md` |

### Phase 재진입

같은 Phase를 다시 진행할 수 있다. 새 merged가 이전 merged를 supersede.

```
10_diagnose-r1/
11_diagnose-merged/    ← superseded
12_diagnose-r2/
13_diagnose-merged/    ← current
```

---

## 10. Scale 규칙

기존 경량/정식 로직 + Phase 스킵 허용:

| 규모 | 모드 | Phase | foundation/ |
|---|---|---|---|
| 버그 픽스 | 경량 | Diagnose → Build → Harden | index 내 섹션 |
| 설계 문서 | 경량 | Diagnose → Architect | index 내 섹션 |
| 소규모 기능 | 정식 | 4 Phase 전부, 각 짧게 | 3축 파일 |
| 대규모 시스템 | 정식 | 4 Phase, 멀티 라운드 | 3축 파일 |

**"경량/정식?" 질문 필수.** 경량 모드에서는 foundation/ 대신 index 내 섹션.

---

## 11. 구조 규칙 (phase-rules.json에서)

### 번호 대역 + 특수 폴더

| 대역 | Phase | 라운드 | x8 (state) | x9 (hold) | 최대 라운드 |
|---|---|---|---|---|---|
| 00-09 | Meta | — | — | — | — |
| 10-19 | Diagnose | 10-17 | `18_diagnose-state` | `19_diagnose-hold` | 7 |
| 20-29 | Architect | 20-27 | `28_architect-state` | `29_architect-hold` | 7 |
| 30-39 | Build | 30-37 | `38_build-state` | `39_build-hold` | 7 |
| 40-49 | Harden | 40-47 | `48_harden-state` | `49_harden-hold` | 7 |
| 90-99 | Output | 90 | — | — | — |

### 네이밍 패턴

```
파이프라인 루트:  {NN}_{purpose}_{MMDD}/
라운드 폴더:      {NN}_{phase}-r{N}/
merged 폴더:      {NN}_{phase}-merged/
x8 (state):       {NN}_{phase}-state/     ← 스냅샷 전용
x9 (hold):        {NN}_{phase}-hold/      ← Phase 내부 blocker
cross-phase:      00_pending/             ← cross-phase blocker
```

### 00_index.md HTML 코멘트 (M1)

```markdown
<!-- pipeline: {name} | type: {type} | mode: {standard|lightweight} | status: {ACTIVE|DONE} -->
<!-- phase: {phase} | updated: {YYYY-MM-DDTHH:MM} -->
<!-- current_task: {task} | next: {next} -->
```

### 02_context.md 필수 섹션 (Phase 전환 시)

```markdown
# {Phase} — Context
> {날짜} | FROM: {이전 Phase merged}

## FROM
## CONFIRMED DECISIONS
## CARRY FORWARD
## DO NOT CARRY
## OPEN QUESTIONS
## REQUIRED INPUT FILES
## ENTRY CONDITION
```

### Phase 간 연결

```
Phase N의 merged/ (필수 파일 — T1 표 참조)
        ↓
Phase N+1의 02_context.md (브리핑 문서)
```

### DONE Gate (G1~G6)

| # | 조건 |
|---|---|
| G1 | harden-merged 폴더 존재 |
| G2 | 90_output/ 폴더 존재 |
| G3 | 90_output/00_final-output.md 존재 |
| G4 | 90_output/01_handoff.md 존재 |
| G5 | 00_pending/ 미완료 항목 0 |
| G6 | PDR 완료 (90_output/02_pdr-report.md) |

---

## 12. Paul 관여도

```
Phase 1: ████████░░  높음 — Paul의 문제, Paul의 맥락
Phase 2: █████░░░░░  중간 — Paul이 결정, Claude가 분석
Phase 3: ██░░░░░░░░  낮음 — Claude가 구현, Paul은 체크포인트
Phase 4: █████░░░░░  중간 — Paul 최종 검증
```

---

## 13. 안티패턴

| 실수 | 올바른 방법 |
|---|---|
| Diagnose 없이 바로 Build | 가장 비싼 실수. 문제부터. |
| 옵션 1개만 만들기 | 최소 3개. 비교 없이 결정 없다. |
| Self-Review = 외부 리뷰 | 기준이 다르다. 정확성 vs 완전성. |
| 전부 IMPORTANT 표시 | 2-3개에만. 남발하면 효과 사라짐. |
| 추상적 질문 ("목표가 뭔가?") | 3개 각도로 구체화. |
| merged 없이 Phase 전환 | T1 체크 후 전환. |
| Gate 형식적 통과 | 킬 질문에 솔직히 답하기. |
| 측정 없이 단계 제거 | 데이터로 판단. 직감 금지. |
| 파일에 써놨으니 될 거다 | Lost in the Middle. 적시 주입. |
