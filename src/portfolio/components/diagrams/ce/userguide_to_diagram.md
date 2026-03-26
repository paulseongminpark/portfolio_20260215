# User Guide — 시스템 운영자 행동 가이드

> v1.0 | 2026-03-13
> "내가 언제, 어떻게, 무엇을 해야 하는가"

---

## 0. 한 줄 원칙

**시스템이 기억한다. Paul은 판단하고 따른다.**

---

## 1. 세션 라이프사이클

### 시작할 때 (항상)
```
1. /pipeline        ← 규모 무관, 항상 첫 번째
2. 00_index.md Current 확인  ← 어디까지 왔는지
3. mcp-memory recall(키워드)  ← Pre-flight
4. 관련 template 읽기         ← Pre-flight (건너뛰면 규칙 위반)
```

### 작업 중
```
~500K 토큰     → /checkpoint 권장
~700K 토큰     → /compact 필수
~900K 토큰     → 세션 교체 (/session-end)
판단이 막힐 때  → orch가 직접 grep/Read 먼저 (worker 파견 전)
CE 자동        → Claude가 Gate 판단 + Progressive Reading + Compact 자율
```

### 끝낼 때
```
1. /session-end     ← compressor 5단계 자동 실행
2. 다음 세션 프롬프트 요청 (이어갈 작업 있으면)
3. /compact
```

### compact 후 돌아올 때
```
1. /restore         ← 항상 첫 번째
2. 작업 재개
```

---

## 2. Pane 운영

### 기본 구조
```
Paul (진짜 meta-orchestrator)
├── Orch pane   — 지금 주 작업. 전체 인식. 판단.
├── Pane B      — 다른 프로젝트 or worker
├── Pane C      — 다른 프로젝트 or worker
└── ...
```

### 언제 새 pane을 여는가

| 상황 | 행동 |
|---|---|
| 다른 프로젝트 시작 | 새 pane. 기존 pane 그대로 유지. |
| 디테일 수정 (orch 오염 방지) | worker pane |
| 현재 맥락과 scope이 다른 작업 | worker pane |
| 단순 사실 확인 (2줄 이하) | orch에서 직접 grep/Read |
| 길게 물어볼 것 | orch에서 직접 (worker 불필요) |

### Worker pane 여는 방법
```
Orch Claude에게:
"이 작업을 새 pane에서 진행한다.
현재 맥락 + 관련 파일 경로 포함한 프롬프트를 줘라."
→ 생성된 프롬프트 → 새 pane 붙여넣기
→ 결과 확인 후 orch에 보고
```

### Orch pane 교체 타이밍

| 신호 | 행동 |
|---|---|
| 120K+ | /session-end → 다음 세션 프롬프트 → 새 pane |
| Claude가 반복 실수 | 새 pane + context 재설정 |
| Phase 전환 (선택) | 새 pane 고려 |

---

## 3. Pane 패턴 (상황별)

Phase별 고정 구성 없음. 상황에 따라 배치한다.

| 상황 | 구성 | Paul의 역할 |
|---|---|---|
| 일반 작업 | Orch 1개 | 직접 작업 |
| 외부 AI 리서치 | Chrome(외부) + cascade pane + orch | cascade 결과를 orch에 전달 |
| 판단 어려울 때 | Opus × 2 (독립) | 두 답변 직접 복붙으로 교차 |
| 병렬 탐색 | Orch + worker 여러 개 | 각 worker 결과를 orch로 취합 |
| 디테일 수정 | Orch + worker 1개 | worker 프롬프트 생성 후 파견 |

---

## 4. Pane 프로토콜 — 판단 에너지 절약

매번 "pane을 나눌까?"를 고민하는 데 에너지가 쓰인다.
아래 프로토콜을 기본값으로 두면 판단 비용이 줄어든다.

### 기본값: Orch 1개로 시작
새 작업 = 무조건 orch 1개로 시작. 분기는 필요가 생길 때.

### 분기 트리거 (이 신호가 오면 pane 추가)
```
□ "이 작업이 현재 orch 맥락을 오염시킨다" → worker 분리
□ "이 판단이 맞는지 확신이 없다" → Opus × 2 패턴
□ "외부 소스가 크다 (300K+)" → Claude가 Gate B/C 자동 판단
□ "orch context 100K 넘었고 작업이 남았다" → worker로 분리
□ "다른 프로젝트 작업이 생겼다" → 새 pane (현재 orch 유지)
```

### 잘못 나누는 경우 (이럴 때는 orch에서 직접)
```
✗ 단순 사실 확인 (grep 2줄이면 되는 것)
✗ 짧은 질문/답변
✗ 현재 맥락이 꼭 필요한 판단
✗ 작업 범위가 애매한 상태에서 분기
```

### 모범 시퀀스 (impl 작업 예시)
```
1. Orch pane 시작: 전체 상황 파악
2. 작업 A 확인 → orch에서 직접 (2줄 grep)
3. 작업 B 확인 → 범위 넓음 → worker 파견
   └─ Orch: "이 맥락으로 worker 프롬프트 줘"
   └─ 새 pane 열고 붙여넣기
   └─ Worker 완료 → orch에서 결과 grep 확인
4. 작업 C → 판단 어려움 → Opus × 2
   └─ Pane 2에 질문 → 답 복사
   └─ Pane 3에 같은 질문 + "Pane 2는 이렇게 판단했다"
   └─ 두 답 비교 → Paul이 최종 선택
```

---

## 5. 멀티 프로젝트 전환

### Pane 전환할 때
```
나가기 전:  현재 pane 00_index.md Current 업데이트됐는지 확인
들어갈 때:  해당 pane 00_index.md Current 읽기
            필요시 recall(프로젝트 키워드)
```

### 프로젝트 간 연결이 필요할 때
```
→ linker 에이전트 (cross-project 영향 감지)
→ mcp-memory (전 프로젝트 공유 DB)
```

---

## 6. Claude가 잘못했을 때 (Deviation 처리)

```
❌ orch에서 "왜 그랬어?" 묻지 않는다  ← orch 오염
✅ 아래 순서로:

1. orch가 직접 verify (grep 또는 Read — 2줄 이내)
2. 수정 범위 확정
3. worker pane 파견 (scope 명확 + 파일 경로)
4. worker 결과 orch가 직접 확인 (grep/Read)
5. 완료 후 다음 작업
```

---

## 7. Gap 발견 → 즉시 처리 패턴

작업 중 시스템 gap(문서 없음, 규칙 누락 등)을 발견하면:
```
1. orch에서 gap 메모 (1줄)
2. 즉시 worker pane 열기
3. worker pane 지시서: "이 파일 추가. 이 내용. git commit 금지."
4. orch는 원래 작업 계속
5. worker 완료 보고 받으면 확인 후 종결
```
**핵심**: gap을 발견한 orch 세션에서 처리하지 않는다. worker로 분리해서 orch 맥락 보호.

---

## 8. Verification 루틴

### 작업 착수 전 (Pre-flight) — 건너뛰면 규칙 위반

```
□ mcp-memory recall(작업 키워드)
□ 관련 template 파일 읽기
□ 00_index.md Current 확인
```

### 작업 완료 후 (Post-check)

```
□ 생성/수정 파일이 규칙대로인가 (형식, 네이밍)
□ hook이 통과하는가
□ 다음 단계 입력 조건 충족하는가
```

---

## 9. 시스템 자산 — 언제 무엇을 쓰는가

| 상황 | 쓸 것 |
|---|---|
| 모든 작업 시작 | `/pipeline` |
| 100K 토큰 | `/checkpoint` |
| 세션 종료 | `/session-end` |
| compact 후 | `/restore` |
| 구현 완료 | `code-reviewer` → `commit-writer` |
| 크로스 프로젝트 영향 | `linker` |
| 대용량 소스 읽기 | `/cascade` (Gate B/C 자동 판단. 수동 호출도 가능) |
| 기억 저장/조회 | `mcp-memory remember / recall` |
| 병렬 독립 작업 | `delegate-to-codex / delegate-to-gemini` |

### 08/09/10/06 사용 시점

| 시스템 | 쓸 때 |
|---|---|
| 08 documentation-system | 파이프라인 생성, 규칙 확인, template 참조 |
| 09 context-cascade | CE 전략 참조. Gate B(300K+)/C(800K+) 자동 판단 |
| 10 index-system | 생태계 구조 파악, 영향 범위 분석 |
| 06 mcp-memory | 세션 간 기억, 패턴 저장, 온톨로지 |

---

## 10. 포스트잇 v2.0 (옆에 붙여두는 버전)

```
┌────────────────────────────────────┐
│  세션 시작    /pipeline → recall → template 읽기
│  ~500K       /checkpoint 권장
│  ~700K       /compact 필수
│  ~900K       세션 교체 (/session-end)
│  compact 후  /restore
├────────────────────────────────────┤
│  새 pane     orch에게 프롬프트 요청
│  Claude 실수 orch grep → worker 파견 → orch 확인
│  Gap 발견    즉시 worker pane으로 분리
│  pane 전환   나갈 때 Current 확인 / 들어올 때 Current 읽기
├────────────────────────────────────┤
│  분기 트리거  오염 / 확신없음 / 500K+ / 다른 프로젝트
│  분기 금지   2줄 확인 / 짧은 Q&A / 맥락 필수 판단 / 범위 모호
├────────────────────────────────────┤
│  CE 자동     Claude가 Gate 판단 + Progressive Reading + Compact 자율
│  PRE-FLIGHT  recall + template + Current  (건너뛰기 금지)
│  POST-CHECK  형식 확인 + hook 통과 + 다음 조건 충족
└────────────────────────────────────┘
```

---

## 11. 실증 사례 (이 가이드 작성 세션에서 발생)

| 사례 | 무엇이 잘못됐나 | 올바른 행동 |
|---|---|---|
| dialogue.md 포맷 오류 | template 읽지 않고 즉시 작성 | Pre-flight: template 먼저 |
| hook 버그 진단 → verify 없이 worker 파견 | 추정으로 파견 | orch grep → 확인 후 파견 |
| worker "이상 없음" → orch에서 처리 | orch 오염 | orch 직접 grep으로 종결 |
| impl-merged에 잘못된 파일 패턴 | template 미확인 + T1 과도일반화 | Pre-flight + Opus에 시스템 수정 위임 |
| "08 문서에 프로젝트 생성 가이드 없음" 발견 | — | 즉시 worker pane으로 gap 처리 |

---

## Appendix A. 핵심 개념

### 프로젝트 vs 파이프라인 vs Phase vs 라운드

```
프로젝트 (01_projects/NN_*)
  └─ 파이프라인 (NN_purpose_MMDD/)  ← 목적 하나, 시작과 끝 있음
        └─ Phase (20_ideation-r1/)   ← 작업 단계
              └─ 라운드 (R1→R2→merged) ← 반복 정제
```

- **프로젝트**: 장기 도메인. 계속된다. STATE.md + CHANGELOG.md 보유.
- **파이프라인**: 단기 작업 단위. 완료된다. DONE gate(G1~G5) 충족 시 종료.
- **Phase**: 작업 성격이 다른 구간. ideation(탐색) → impl(구현) → review(검증).
- **라운드**: 같은 Phase를 반복 정제. R1(발산) → R2(교차) → merged(수렴).

### "파이프라인"이란

업계에서는 CI/CD, 데이터 처리에서 "자동으로 흐르는 단계들의 연결"을 뜻한다.
이 시스템에서는 그 개념을 지식 작업에 적용한 것.
자동이 아니라 **Paul의 판단으로 단계를 넘기는** 구조화된 작업 흐름이다.

> "파이프라인 = 이번에 해결할 일 하나의 전체 과정"
> 프로젝트가 땅이라면, 파이프라인은 그 땅 위에 짓는 건물 하나.

### Orch vs Worker

- **Orch pane**: 맥락 보유, 판단, 분기 결정, 프롬프트 생성. "무엇을 할지" 안다.
- **Worker pane**: 단일 scope, 가벼운 시작, 실행만. "어떻게 할지"만 한다.
- Orch가 verify 후 worker 파견. worker 결과도 orch가 확인.
- Orch context가 무거워지면 교체. 파이프라인이 맥락을 보존.
