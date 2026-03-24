# Context Engineering — 완전 컨텍스트 핸드오프

> 이 문서는 아무것도 모르는 Opus에게 Paul의 Context Engineering 체계 전체를 넘기기 위한 것이다.
> 모든 정보, 모든 결정, 모든 파일 경로, 모든 숫자가 여기에 있다.
> 2026-03-23 기준.

---

## 0. 한 줄 정의

**Context Engineering은 Claude가 가장 뛰어나게 생각할 수 있는 환경을 설계하는 관점이다.** 시스템이 아니라 원칙이고, 절차가 아니라 관점이다. 무엇을 넣고, 어떤 순서로 보여주고, 언제 덜어낼지를 의식적으로 설계하는 것.

---

## 1. 왜 존재하는가

### 1.1 근본 문제

Paul은 솔로 개발자다. Claude Code(Opus)를 메인 AI로 사용한다. 프로젝트 전체 규모는 ~38.7M 토큰(index-system 측정). Claude의 context window는 1M 토큰. **전체의 2.6%만 한 번에 볼 수 있다.**

1M에 모든 걸 넣으면? 관련 정보 5-10%, 나머지 90% 노이즈. 어텐션이 희석된다. "넣을 수 있다"와 "넣어야 한다"는 다른 문제다.

### 1.2 진화 과정

**200K 시대 (v3.3.1, ~2026-02-27)**
- 모든 토큰이 비쌌다
- 시스템 프롬프트 42K가 baseline
- 100K compact 권장, 120K 필수, 150K auto
- "Context as Currency" — 토큰을 화폐로 관리
- 도구 24개 만들었다가 15개로, 15개를 3개로 줄임
- 도구 정의만으로 context의 절반이 참

**1M 시대 (v5.0, 2026-03-16~)**
- 5배 확장. "다 넣을 수 있다" → 다 넣어보니 더 나빠짐
- "읽을 수 없으니 압축" → "읽을 수 있지만 골라야"로 전환
- 큐레이션 > 압축 (핵심 패러다임 시프트)
- Hook 과잉 → 원칙 기반 자율 판단으로 전환

### 1.3 핵심 통찰

"CE는 절차가 아니라 관점이다" (mcp-memory #5130, 2026-03-16 결정)

처음에는 시스템으로 만들려 했다. cascade v1 — 독립 프로젝트, 자체 폴더, 자체 STATE.md. 실전에서 쓰이는 건 원칙이었지 시스템이 아니었다. "Gate B"를 선언할 때 코드를 호출하는 게 아니다. Claude가 "이건 크다, 정찰부터"라고 판단하는 것이다. 판단 기준은 CLAUDE.md에 3줄로 적혀 있다.

---

## 2. 핵심 아키텍처: 4-Layer

정보에는 수명이 있다. 수명이 다른 정보를 같은 층에 넣으면 낭비가 생긴다.

### Layer 0: Static Context (~15K 토큰, 항상 존재)

| 구성 요소 | 경로 | 역할 |
|-----------|------|------|
| 시스템 프롬프트 | (Claude Code 내장) | 도구 정의, 기본 행동 |
| CLAUDE.md (글로벌) | `~/.claude/CLAUDE.md` | 전역 규칙: 간결 출력, 위임 규칙, CE 규칙 |
| CLAUDE.md (프로젝트) | `/c/dev/CLAUDE.md` | 프로젝트 구조, Git 규칙, 파일 규칙 |
| rules/ | `~/.claude/rules/*.md` | common-mistakes, phase-v3-behavior, workflow, claude.md, pipeline-rules, ui-cli-tools |
| MEMORY.md | `~/.claude/projects/C--dev/memory/MEMORY.md` | auto-memory 인덱스 |

**특징**: 모든 세션에서 동일. Prompt Caching의 핵심 — 여기가 안정적이어야 캐시 동작.

**Prompt Caching 순서** (mcp-memory #4306, @trq212):
```
Static prompt → Tools → CLAUDE.md → Session → Messages
```
도구/모델 mid-session 변경 절대 금지 (캐시 무효화).

### Layer 1: Session Context (세션당 1회)

| 도구 | 역할 | 토큰 |
|------|------|------|
| mcp-memory `get_context()` | 어제의 결정, 미해결 질문, 미커밋 변경 | ~200 |
| mcp-memory `recall(키워드)` | 관련 과거 지식 조회 | 가변 |
| SessionStart hook | 시스템 상태 요약 (파이프라인, 미커밋, health) | ~500 |
| index-system stats | 에코시스템 토폴로지 | (hook 내장) |

**효과**: get_context() 200토큰으로 전체 맥락 복구 → 88% 토큰 절약 (기존 ~1,700 토큰 대비).

### Layer 2: Task Context (작업 시작 시 자동)

작업이 시작되면:
1. **토큰 추정** — 관련 소스가 대략 얼마인지 (1줄)
2. **Gate 판단** — A/B/C 중 하나 (1줄)
3. **Progressive Reading** — 개요 → 상세 순서로 읽기

### Layer 3: Live Curation (작업 중 연속)

| 메커니즘 | 동작 |
|----------|------|
| auto_remember hook | PostToolUse에서 파일/배시 시그널 자동 분류 → mcp-memory 저장 |
| Compact 점진화 | 500K checkpoint / 700K compact / 900K 세션교체 |
| Instruction 재주입 | 긴 세션에서 초기 규칙 fade-out 방지 (compressor Attention Manipulation) |
| Lens 축적 | 세션 종료 시 읽기 패턴 기록 → 다음 세션 recall로 재활용 |

---

## 3. Gate 시스템 (읽기 전략 판단)

### 판단 기준

| 관련 소스 | → Gate | 전략 |
|-----------|--------|------|
| ≤300K | **A** (직접) | Opus가 전부 직접 읽음. Serena symbolic tools로 효율적 탐색 |
| 300K-800K | **B** (큐레이션) | "Gate B" 선언. Codex에 정찰 위임 → high+medium만 읽기 |
| 800K+ | **C** (분산) | "Gate C" 선언. 분산 추출 계획 → 병렬 실행 |

### Gate A 상세
- 대부분의 일상 작업
- Serena `get_symbols_overview` → `find_symbol` → 필요한 본문만 `Read`
- 별도 선언 불필요 (자율 판단)

### Gate B 상세
```
[작업 목표 인식]
  → Codex에 정찰 위임:
    "이 목표에 관련된 파일을 중요도 순으로 나열하라"
    입력: file tree + 작업 목표
    출력: {file, relevance: high/medium/low}
  → 선택적: Gemini Pro 교차 검증
  → Opus: high+medium만 직접 읽기
  → 부족 발견 시: low에서 targeted 추가
```

### Gate C 상세
```
[추출 계획]
  1. 예산 확인 (Codex/Gemini 잔여)
  2. lens 결정 (recall("lens {작업유형}"))
  3. 소스 분할
  4. 프롬프트 생성

[병렬 추출]
  - Codex 5.4: 판단 + 추출
  - Gemini Pro 1M: 대용량 추출
  - Gemini Flash / Local: 기계적 추출

[Opus 갭 판단]
  - 구조 커버리지 체크 → 자기 질문 체크
  - 미통과 → 재추출 (최대 2회)
```

### 판단 계층 분리 (추출 시)

| 작업 | 담당 | 이유 |
|------|------|------|
| 파일 선별 | Codex 5.4 또는 Opus | 최고 판단 품질 |
| 교차검증 | Gemini Pro 1M | 대용량 + 높은 품질 |
| 기계적 추출 | Gemini Flash / Local | 비용 0 |
| 최종 합성 + 작업 | Opus | 설계/결정권자 |

### 실전 교훈
- Gate 선언을 매번 강제하는 건 과잉 형식 (E2E 실전에서 발견)
- Claude는 규모를 보고 자율적으로 적절한 전략 선택
- 강제 제거 → 원칙만 남김
- Gate B 실전: Claude가 자율적으로 Gate A 하향 판단 → 올바른 판단

---

## 4. Progressive Reading (읽기의 기술)

### 원칙: 전문을 바로 읽지 않는다

| 단계 | 도구 | 읽는 것 | 토큰 |
|------|------|---------|------|
| 1 | Read | 00_index.md | ~100 |
| 2 | Read | Phase index | ~200 |
| 3 | Serena `get_symbols_overview` | 심볼 목록 (본문 없음) | ~500 |
| 4 | Serena `find_symbol(include_body=False)` | 시그니처만 | ~200 |
| 5 | Read | 필요한 본문만 | 가변 |

### "읽지 않는 것도 엔지니어링"
- 시그니처만 보면 될 때 전문 읽기 = 낭비
- 이전 작업에서 이미 읽었는데 다시 읽기 = 낭비 (파일 재읽기 금지 규칙)
- 관련 있지만 이 Phase에서 불필요 = 나중으로
- 의식적 생략 = CE의 일부

### 구조가 경로를 결정한다
- 08_documentation-system의 폴더 구조 자체가 Progressive Reading 경로
- 00_index.md → Phase 폴더 → 파일 (구조 = 읽기 순서)
- 02_context.md의 CARRY/DO NOT CARRY가 Phase 간 핸드오프를 명시
- 좋은 파일시스템 구조 = 좋은 읽기 전략

---

## 5. Compact 점진화

### 현재 기준 (1M 시대)

| 토큰 | 행동 | 강제? |
|------|------|-------|
| ~300K | 경량 compact (완료 출력 정리) | Claude 자율 |
| ~500K | /checkpoint 권장 → mcp-memory 중간 상태 저장 | Claude 자율 |
| ~700K | compact 필수 → compressor 호출, 00_index.md 복구점 확보 | 필수 |
| ~900K | 세션 교체 → /session-end 실행 후 새 세션 | 강력 권장 |

### compact 전 필수 4단계 (정보 소실 0 기준)
1. index 갱신 — 파이프라인 "현재 상태" 섹션 업데이트
2. mcp-memory `save_session()` — 세션 요약 + 결정 + 미결 저장
3. work-log 작성 — 해당 날짜 폴더에 작업 기록
4. 사용자에게 "compact 준비 완료" 보고

### compact 후 복구
```
index → mcp-memory get_context() → work-log (필요시)
```

### 과거 기준 (200K 시대, 참고)

| 토큰 | 행동 |
|------|------|
| ~42K | baseline (고정) |
| 100K | compact 권장 |
| 120K | compact 필수 |
| 150K | auto-compact (최후 방어선) |

### Instruction Fade-out 방지
- 긴 세션에서 초기 규칙의 영향력 감소 현상
- 대응: compressor 마지막에 목표+규칙 재작성 (Attention Manipulation)
- Event-driven: 핵심 규칙을 의사결정 시점에 재주입

---

## 6. Context Rot — 컨텍스트가 썩는 4가지

| 유형 | 설명 | 예시 | 대응 |
|------|------|------|------|
| **Poisoning** | 틀린 정보 잔류 | 옛 규칙이 아직 로드됨 | 정기 검토 |
| **Distraction** | 무관 정보 소음 | 모든 프로젝트 설명 항상 로드 | Layer 분리 |
| **Confusion** | 모순 정보 충돌 | 두 규칙이 반대 지시 | 우선순위 명확화 |
| **Clash** | 우선순위 충돌 | 글로벌 vs 프로젝트 규칙 | 계층 설계 |

**자연 방어**: Layer 분리. Static은 드물게 변경 → 검토 주기 길다. Session은 매번 새로 로드 → 항상 최신. Task는 작업별 → 다른 작업에 누출 안 됨.

---

## 7. 에코시스템 — 6개 시스템 관통

CE는 독립 시스템이 아니다. 이미 존재하는 6개 시스템을 관통하는 전략이다.

```
     ┌─────────────────────────────────────┐
     │          01 orchestration            │
     │   (조율: 규칙, 스킬, 상태 관리)      │
     └──────────┬──────────────────────────┘
                │
   ┌────────────┼────────────┐
   ▼            ▼            ▼
┌──────┐  ┌──────────┐  ┌──────────┐
│  08  │  │    09    │  │    10    │
│ doc  │  │ cascade  │  │  index   │
│system│  │ system   │  │  system  │
│(구조)│  │ (선별)   │  │  (지도)  │
└──┬───┘  └────┬─────┘  └────┬─────┘
   │           │             │
   └───────────┼─────────────┘
               │
   ┌───────────┼───────────┐
   ▼           ▼           ▼
┌──────┐  ┌──────────┐
│  06  │  │    11    │
│memory│  │   user   │
│(지속)│  │  guide   │
│      │  │  (운영)  │
└──────┘  └──────────┘
```

### 08_documentation-system (구조 제공자)
- **경로**: `/c/dev/01_projects/08_documentation-system/`
- **핵심**: phase-rules.json — 36개 규칙의 기계 실행 정의 (SoT)
- **구조 규칙**: M1-M3(골격), F1(foundation), I1(dialogue), P1-P3(진입조건), R1-R2(리뷰), T1(merged)
- **커밋 게이트**: C1(STATE.md) + C2(CHANGELOG.md) + C3(HOME.md) staged 필수
- **네이밍**: N1-N17 (NN_{purpose}_{MMDD}, 라운드, merged, x8/x9 예약)
- **DONE 게이트**: G1-G6 (harden-merged, 90_output, pending 0, PDR)
- **Phase v3 대역**: meta(0-9), diagnose(10-19), architect(20-29), build(30-39), harden(40-49), output(90-99)
- **foundation/ 3축**: philosophy.md(왜), principles.md(결정), workflow.md(실행)
- **phase-guide.md**: 불확실성 4종류 = Phase 4개
  - DIAGNOSE: 문제 불확실성 제거. 6가지 질문 무기.
  - ARCHITECT: 해법 불확실성 제거. 최소 3 옵션. Musk 테스트.
  - BUILD: 구현 불확실성 제거. TDD. V-Check(spec↔코드).
  - HARDEN: 배포 불확실성 제거. 외부 리뷰. GO/NO-GO.
- **파이프라인 3개**: 01_lifecycle(✅), 02_ecosystem(✅), 03_meta-loop-fix(✅, D1-D19)
- **D1-D19 핵심 결정**:
  - D1: Hard block (exit 2)
  - D2: phase-rules.json = SoT
  - D12: /pipeline 1개 통합 (상태 기반 4모드)
  - D13: superpowers 호출 금지 → Phase R1 대체
  - D17: DONE gate 정의
  - D18: 02_context.md 포맷 (FROM/CONFIRMED/CARRY/DO NOT CARRY/OPEN/REQUIRED/ENTRY)

### 09_context-cascade-system (선별 원칙)
- **경로**: `/c/dev/01_projects/09_context-cascade-system/`
- **상태**: v3.0, 3개 파이프라인 모두 DONE
- **foundation/**: philosophy(큐레이션>압축, 안읽기=엔지니어링, 구조=컨텍스트) + principles(7원칙) + workflow(Gate별 상세)
- **파이프라인 3개** (총 92파일):
  - 01_reading-pipeline_0310 (8파일): 읽기 전략 첫 설계
  - 02_cascade-v2-1m_0315 (50+파일): 4-Layer + Gate + Compact E2E 검증. T1-T7: 5 PASS + 2 PARTIAL
  - 03_ce-perspective_0316 (34+파일): "CE=관점" 재정의. CE Guide + PE Guide + PE Playbook + Phase Guide v2 산출
- **산출물 위치**: 각 파이프라인의 `90_output/`
  - `03.../90_output/01_ce-guide.md` — CE 개요 (102줄)
  - `03.../90_output/02_pe-guide.md` — PE 기법 (175줄)
  - `03.../90_output/03_pe-playbook.md` — 포스트잇 참조 카드 (211줄)

### 10_index-system (에코시스템 지도)
- **경로**: `/c/dev/01_projects/10_index-system/`
- **상태**: v1.1, 03_infra-integration review 대기
- **현황**: 25 프로젝트, 1169 엣지, ~38.7M tokens
- **src/**: cli.py(327줄, 11 subcommand), graph.py(214줄, Node/Edge 모델), scanner.py(400+줄, 7가지 참조 패턴), views.py(110줄), config.py(122줄)
- **CLI**: `python -m src.cli scan|view|refs|deps|rdeps|impact|move-check|stats|topology`
- **Gate 판단 입력**: 프로젝트 규모(tokens_est) 정보 제공
- **hook 통합**: PostToolUse → 증분 graph 업데이트 (0.18s async), SessionStart → 전체 스캔 (6s async)

### 06_mcp-memory (지속성)
- **경로**: `/c/dev/01_projects/06_mcp-memory/`
- **상태**: v3.1.0-dev
- **CE 관련 지식**: 45개 노드
- **핵심 도구**: remember(), recall(), get_context(), save_session(), checkpoint
- **Lens 축적**: 세션 종료 시 읽기 패턴 기록 → 다음 세션 recall로 재활용
- **auto_remember hook**: FILE_TYPE_MAP(11) + BASH_SIGNAL_MAP(9) → 자동 온톨로지 타입 매핑
- **Session-end**: compressor 4단계 + Step 4.5 Lens → save_session() 그래프 노드 생성

### 11_user-guide (운영 프로토콜)
- **경로**: `/c/dev/01_projects/11_user-guide/`
- **상태**: v1.0 완료
- **핵심 명제**: "시스템이 Paul을 위해 존재한다"
- **7가지 원칙**: P1(한pane=한맥락), P2(orch먼저verify), P3(degradation→교체), P4(deviation→오염없이), P5(pre-flight필수), P6(상태=파일), P7(자산의식적사용)
- **세션 라이프사이클**: 시작(recall+template) → 중(checkpoint) → 끝(session-end) → compact후(restore)
- **포스트잇 v2.0**: 물리적 참고 카드 (SESSION START / MID / END / PANE / DEVIATION / POST-CHECK)
- **Pane 패턴**: 기본(Orch 1개), 외부리서치(Chrome+cascade), 교차판단(Opus×2), 병렬탐색(Orch+worker여럿)

### 01_orchestration (조율 허브)
- **경로**: `/c/dev/01_projects/01_orchestration/`
- **상태**: v5.0 The Machine
- **Living Docs 12개**: STATE(인벤토리SoT), CHANGELOG(버전이력), KNOWLEDGE(규칙패턴), PLANNING(ADR), REFERENCE(종합가이드), ROADMAP(개발계획), METRICS(성과지표), README, TODO, decisions, lessons, pending
- **Workers 3개**: code-reviewer(Opus), compressor(Sonnet), commit-writer(Haiku)
- **Skills 13개**: pipeline, cascade, delegate, checkpoint, restore, session-end, pdr 등
- **Hooks 8종**: SessionStart/End, PreToolUse(Bash/Write/Edit), PostToolUse, PreCompact, Notification
- **Hook Framework**: config.py(단일SoT, 경로20개) + framework.py(공통유틸)
- **체인 규칙**:
  - 구현: implement → code-reviewer(Opus) → commit-writer(Haiku)
  - 세션: /session-end → compressor(Sonnet 4단계) → save_session
  - 위임: /delegate codex|gemini → /delegate verify → 사용
- **마무리 5단계**: Living Docs → 옵시디언 → 커밋 → push → 보고 (하나라도 빠지면 미완료)
- **외부 AI**: Codex CLI(GPT-5.3, 정밀검증), Gemini CLI(3.1 Pro, 벌크추출), Perplexity(리서치)
- **Verify Barrier**: 구조검증 → 스팟체크(2-3개 원본대조) → 반박검증

---

## 8. 구현 상세 — 실제 파일과 설정

### 8.1 CLAUDE.md CE 섹션 (현재 적용 중)

`/c/dev/CLAUDE.md`의 Context Engineering 섹션:
```
## Context Engineering (필수 — 위반 시 규칙 위반)

모든 작업 시작 전 아래 3단계 필수. 건너뛰고 파일 읽기 시작 = 규칙 위반.

### 1. 토큰 추정 (1줄)
관련 소스가 대략 얼마인지 추정. "이 프로젝트 src/ ~150K" 수준.

### 2. Gate 판단 (1줄)
- ≤300K → Gate A: 직접 읽기
- 300-800K → Gate B: "Gate B" 선언 → Codex 정찰 위임
- 800K+ → Gate C: "Gate C" 선언 → 분산 추출 계획

### 3. Progressive Reading (실행)
전문 바로 읽지 않는다. index/STATE → Serena 시그니처 → 필요한 본문만.

### Compact
- ~500K: /checkpoint 권장
- ~700K: compact 필수
- ~900K: 세션 교체
```

### 8.2 rules/ CE 관련 파일

**`~/.claude/rules/claude.md`** — 1M 토큰 관리:
- 1세션=1목표 (1M이면 멀티태스크 허용)
- Compact 점진화: 500K/700K/900K
- /session-end 4단계 + Step 4.5 Lens
- Workers 3개 체인 규칙

**`~/.claude/rules/phase-v3-behavior.md`** — Phase별 Claude 행동:
- Diagnose: 6가지 질문 무기, 한 번에 하나, Claude diverge → Paul converge
- Architect: 최소 3 옵션, Musk 테스트, Trade-off 매트릭스
- Build: TDD, V-Check(spec↔코드)
- Harden: 외부 리뷰, V-Check(Success Criteria)
- 공통: Phase 진입 시 recall(Phase명, tags="ce-lesson") 자동

**`~/.claude/rules/common-mistakes.md`** — CE 관련:
- 파일 재읽기 금지
- Context Engineering 3단계 필수 (토큰추정→Gate→Progressive)
- Pre-flight Recall: 구현 전 recall() 필수
- Compact: 정보 소실 0 기준, 3곳에 기록

**`~/.claude/rules/workflow.md`** — 세션 흐름:
- 모든 작업 착수 전 /pipeline 강제
- /cascade 발동 조건: 200K+ 토큰 추정 시

### 8.3 Hook 시스템

**config.py** (`/c/dev/01_projects/01_orchestration/.claude/hooks/config.py`):
- 경로 20개, 프로젝트 15개 정의
- FILE_TYPE_MAP(11): `.md`→Narrative, `.py`→Tool, `.json`→Framework 등
- BASH_SIGNAL_MAP(9): `git commit`→Decision, `npm test`→Experiment 등

**auto_remember.py** (PostToolUse hook):
- Read/Write/Edit/Bash 도구 사용 감지
- FILE_TYPE_MAP/BASH_SIGNAL_MAP으로 온톨로지 타입 자동 매핑
- mcp-memory에 직접 저장

**SessionStart hook** (`session_start_index.py`):
- 전체 index-system 스캔 + 토폴로지
- 시스템 health 점수 + 미커밋 + 파이프라인 요약

### 8.4 Session-end 워크플로우 (v2)

```
Step 1: LOG (session-summary + work-log)
Step 2: Living Docs (STATE.md + CHANGELOG.md)
Step 3: Commit (git add → commit → push)
Step 4: save_session (mcp-memory 그래프 노드: Narrative + Decision + Question + 명시적 edge)
Step 4.5: Lens 축적 ("이번 세션 읽은 파일 패턴", "효과적 읽기 전략" → mcp-memory 저장)
```

Learn은 /pdr Part B로 이동 (2026-03-17).

---

## 9. 추출 원칙

### 요약 금지, 추출만
- "요약해라" 금지 → "나열해라", "뽑아라" 사용
- 요약 = 판단 개입 = 소실 위험

### 원문 참조 보존
- 모든 추출물에 `파일명:라인번호` 포함

### 사후 보정 루프
- Opus가 추출 결과 검증
- 구조 커버리지 체크 + 자기 질문 체크
- 미통과 → 재추출 (최대 2회)

---

## 10. 만들고 버린 것들 (과잉 엔지니어링 교훈)

| 만든 것 | 왜 만들었나 | 왜 버렸나 |
|---------|-----------|----------|
| context-budget.py | 매 Read마다 토큰 예산 계산 | Python spawn 200ms/회. 원칙으로 충분 |
| read-guide.py | "왜 읽는지" 강제 작성 | 일상 작업에서 매번 = 마찰 |
| .ctx/ 유령 폴더 | 런타임 상태 파일저장 | 백업/복구 불필요. 런타임으로 재정의 |
| Gate 선언 강제 | "Gate A입니다" 없으면 작업 불가 | 형식. Claude 자율 판단으로 충분 |
| Compact Stage 1-2 경고 | 300K/500K에서 경고 | 1M에서 도달 빈도 낮음 |
| cascade v1 (독립 시스템) | 자체 폴더+STATE.md | 실전에서 쓰이는 건 원칙, 시스템 아님 |

**패턴**: "필요할 것 같다" → 만듦 → 실전 미사용 → 유지비 → 제거

**교훈**:
- 5개 가설 중 3개 틀림. 항상 실측 먼저.
- mcp-memory 51→15 타입과 같은 패턴. "best part is no part."
- 시스템으로 만들면 유지비. 원칙으로 남기면 자율 적용.

---

## 11. 진화 타임라인

| 날짜 | 버전/이벤트 | 핵심 변화 |
|------|-----------|----------|
| 2026-02-02 | v1.0 | 시작. 에이전트 7개 |
| 2026-02-09 | v2.0 | 에이전트 확장 |
| 2026-02-21 | v3.0 | 에이전트 **24개** (최대). 도구 정의가 공간 절반 |
| 2026-02-27 | v3.3.1 | 에이전트 15개로 정리 |
| 2026-02-27 | v4.0 | **Context as Currency** 확립. 200K 예산 관리 |
| 2026-03-05 | 멀티세션 사고 | 범용 프롬프트 → B가 소스 수정+커밋. git revert |
| 2026-03-10 | 01_reading-pipeline | CE 읽기 전략 첫 설계 (8파일) |
| 2026-03-11 | 08 ecosystem-setup | Hook + 자동화 시스템 |
| 2026-03-12 | 08 meta-loop-fix | D1-D19, phase-rules.json |
| 2026-03-12 | 11 user-guide v1.0 | 운영 프로토콜 완성 |
| 2026-03-13 | 10 edge-4-impl | syncs-to, delegates-to, git-remote, skill-of |
| 2026-03-15 | 02_cascade-v2 | 4-Layer + Gate + Compact E2E 검증 |
| 2026-03-16 | 03_ce-perspective | **CE = 관점** 재정의. Phase v3. CE/PE Guide |
| 2026-03-16 | v5.0 The Machine | Workers 3 + Skills 13 + Hook Framework. **1M** |
| 2026-03-16 | mcp-memory v3.1 | 온톨로지 강화 완료. Gate 2 재설계 |
| 2026-03-17 | phase-rules.json v3 | Phase 네이밍 반영 (diagnose/architect/build/harden) |

---

## 12. mcp-memory CE 지식 (핵심 노드)

| ID | 유형 | 내용 |
|----|------|------|
| #5130 | Decision | **CE 분기점**: "절차가 아니라 관점". Gate 선언 강제 = 형식 |
| #5129 | Decision | **CE v1.0 확정**: cascade = 독립 시스템 아님, 전략. 08+09+10+06+11+01 관통 |
| #5241 | Decision | CE는 관점이다 (절차 아닌) |
| #3812 | Principle | **Context as Currency**: 토큰이 화폐. 가장 비싼 = "아직 안 틀린 결정" |
| #3944 | Insight | context window = 작업대(작을수록 좋음), DB = 창고(클수록 좋음), MCP = 열쇠 |
| #4306 | Insight | **Prompt Caching 순서**: Static→Tools→CLAUDE.md→Session→Messages. mid-session 변경 금지 |
| #4330 | Decision | **compact 정보소실 0**: 4단계 필수 (index, save_session, work-log, 보고) |
| #4143 | Failure | Warp 재시작 → 세션 소실. snapshot 빈 템플릿 → 복구 불가 |
| #4218 | Failure | auto-compact 후 자동 재실행 불가 (사용자 메시지 없이 재개 안됨) |
| #4250 | Decision | 3중 추적(Phase문서 + state.md + git커밋) → 손실 0 보장 |
| #1363 | Insight | 외부 추출(Codex/Gemini) → 인벤토리 파악 50K→5K (90% 절약) |
| #377 | Framework | 200K 예산 분배: Baseline ~42K → 작업 42-100K → Compact 50-100K |
| #378 | Principle | 3원칙: Baseline 최소화 + 오프로딩(.chain-temp) + 계층적 위임 |
| #1585 | Framework | CE 12대 규칙 중: "읽지 않은 파일은 존재하지 않는다" |
| #5369-71 | Lesson | ce-lesson 3개: Diagnose/Architect/Build 교훈 |
| #5372-73 | FewShot | Diagnose 질문 패턴 / Architect 매트릭스 패턴 |

---

## 13. 핵심 숫자

| 숫자 | 의미 |
|------|------|
| 1,048,576 | 현재 context window (1M) |
| 200,000 | 이전 context window (200K) |
| 4 | Layer (Static/Session/Task/Live) |
| 3 | Gate (A/B/C) |
| 92 | CE 관련 파이프라인 파일 총합 |
| 36 | phase-rules.json 규칙 수 |
| 6 | 관통하는 시스템 수 |
| 25 | index-system 프로젝트 수 |
| 1,169 | index-system 엣지 수 |
| 38.7M | 전체 에코시스템 토큰 |
| 42K | 200K 시대 baseline |
| ~15K | 1M 시대 Static Layer |
| 200 | get_context() 토큰 (88% 절약) |
| 45 | mcp-memory CE 관련 노드 수 |
| 24→15→3 | 도구(에이전트) 수 변화 |
| 5+2 | E2E 테스트 결과 (PASS+PARTIAL) |
| 48 | 03_ce-perspective 확정 결정 수 |
| 19 | 03_meta-loop-fix 확정 결정 수 |

---

## 14. 관련 파일 전체 맵

### Static Layer 파일
```
~/.claude/CLAUDE.md                              글로벌 규칙
~/.claude/rules/claude.md                         1M 토큰 관리
~/.claude/rules/common-mistakes.md                반복 실수 + CE 3단계
~/.claude/rules/phase-v3-behavior.md              Phase별 행동
~/.claude/rules/workflow.md                       세션 흐름 + /cascade
~/.claude/rules/pipeline-rules.md                 36개 규칙 (자동 생성)
~/.claude/rules/ui-cli-tools.md                   UI 도구
~/.claude/projects/C--dev/memory/MEMORY.md        auto-memory 인덱스
/c/dev/CLAUDE.md                                  프로젝트 CE 규칙
```

### 08_documentation-system
```
/c/dev/01_projects/08_documentation-system/
├── STATE.md                                      v2.1
├── CHANGELOG.md
├── index.md
├── phase-rules.json                              ★ 36개 규칙 SoT
├── foundation/
│   ├── philosophy.md                             ★ 정보손실0, 구조=워크플로우
│   ├── principles.md                             ★ index=커널, 행동감지>언어
│   ├── workflow.md                               ★ 실행 방식, Pane 운영
│   └── phase-guide.md                            ★ 4Phase, 6가지 질문 무기
├── templates/                                    5종 템플릿
├── 01_lifecycle-methodology_0311/                 ✅ DONE
├── 02_ecosystem-setup_0311/                       ✅ DONE
└── 03_meta-loop-fix_0312/                         ✅ DONE (D1-D19)
```

### 09_context-cascade-system
```
/c/dev/01_projects/09_context-cascade-system/
├── STATE.md                                      v3.0
├── CHANGELOG.md
├── foundation/
│   ├── philosophy.md                             ★ 큐레이션>압축, 안읽기=엔지니어링
│   ├── principles.md                             ★ 7원칙 (4-Layer, Gate, Compact...)
│   └── workflow.md                               ★ Gate별 상세, Compact Stage
├── 01_reading-pipeline_0310/                      ✅ DONE (8파일)
│   └── 90_output/design-summary.md
├── 02_cascade-v2-1m_0315/                         ✅ DONE (50+파일)
│   └── 90_output/{final-output,handoff}.md
└── 03_ce-perspective_0316/                        ✅ DONE (34+파일)
    └── 90_output/
        ├── 00_final-output.md
        ├── 01_ce-guide.md                        ★ CE 개요
        ├── 02_pe-guide.md                        ★ PE 기법
        ├── 03_pe-playbook.md                     ★ 포스트잇 참조 카드
        └── 02_pdr-report.md
```

### 10_index-system
```
/c/dev/01_projects/10_index-system/
├── STATE.md                                      v1.1
├── CHANGELOG.md
├── src/
│   ├── cli.py                                    ★ 11 subcommand (327줄)
│   ├── graph.py                                  ★ Node/Edge 모델 (214줄)
│   ├── scanner.py                                ★ 7가지 참조 패턴 (400+줄)
│   ├── views.py
│   └── config.py
├── views/INDEX.md                                ★ 에코시스템 현황 (자동 생성)
├── data/graph.json                               25노드+1169엣지
├── 01_initial-build_0311/                         ✅ DONE
├── 02_edge-4-impl_0312/                           ✅ DONE
└── 03_infra-integration_0313/                     구현완료, review 대기
```

### 11_user-guide
```
/c/dev/01_projects/11_user-guide/
├── STATE.md                                      v1.0 완료
├── CHANGELOG.md
└── 01_user-guide_0312/                            ✅ DONE
    ├── foundation/{philosophy,principles,workflow}.md
    ├── 90_output/
    │   ├── 00_final-output.md                    ★ User Guide 최종본
    │   └── 01_handoff.md
    └── ...
```

### 01_orchestration
```
/c/dev/01_projects/01_orchestration/
├── STATE.md                                      ★ v5.0 인벤토리 SoT
├── CHANGELOG.md                                  ★ 버전 이력
├── KNOWLEDGE.md                                  ★ 규칙, 패턴, 교훈
├── PLANNING.md                                   ★ ADR (D-024 Context as Currency)
├── REFERENCE.md                                  종합 가이드
├── ROADMAP.md                                    개발 계획
├── METRICS.md                                    성과 지표
├── pre-flight-recall.md                          ★ 구현 전 recall 규칙
├── decisions.md                                  결정 80개
├── lessons.md                                    자동 교훈 20개
├── _auto/
│   ├── live-context.md                           세션 간 공유
│   ├── .chain-temp/                              에이전트 체인 결과
│   └── .ctx/                                     런타임 마커
├── .claude/hooks/
│   ├── config.py                                 ★ 경로/프로젝트/매핑 SoT
│   ├── framework.py                              ★ 공통 유틸
│   └── auto_remember.py                          PostToolUse 자동 저장
└── 13_ontology-self-reinforcement_0320/           현재 활성 파이프라인
```

---

## 15. CE와 mcp-memory의 관계

CE는 mcp-memory의 **"사고 환경"** 이다.

- **mcp-memory** = "기억의 구조" 설계 (저장). 25개 타입, 49개 관계 규칙, 6레이어 성숙 지도.
- **Context Engineering** = "사고의 환경" 설계 (제시). 4-Layer, Gate, Progressive Reading.

둘을 합치면:
```
AI가 지식을 구조화해서 저장하고 (mcp-memory)
적절한 시점에 적절한 양만큼 꺼내서 (Context Engineering)
그 위에서 추론하는 것
```

저장(mcp-memory)과 제시(CE)가 하나의 순환을 이룬다.

이것이 Paul이 말하는 **Living System**:
- 기억하고(remember), 잊고(감쇠), 다시 떠올리고(recall), 그 위에서 생각하는 시스템
- 사람이 잊어도 시스템이 기억하고, 놓친 것을 먼저 드러내고, 스스로 나아진다

---

## 16. 포트폴리오 페이지 — 현재 스코프

### TOC 구조 (mcp-memory와 동일 패턴)

**시작** (3개 섹션)
- Claude의 세계 — AI는 context window만 본다
- 1M 토큰의 역설 — 더 넣으면 더 나빠진다
- 환경 설계 — "어떻게 물어볼까?"에서 "무엇을 보여줄까?"로

**설계** (4개 섹션, 4막 구조)
- 1막 · 200K에서 1M으로 — Context as Currency, 도구 24→3
- 2막 · 4개의 레이어 — Static/Session/Task/Live
- 3막 · Gate — A/B/C 판단, 자율성의 중요성
- 4막 · 읽기의 기술 — Progressive Reading, Compact, Lens

**실체** (2개 섹션)
- 작동하는 시스템 — 3 파이프라인 92 파일, 6 시스템 관통
- 과잉의 교훈 — context-budget.py, read-guide.py 제거, "best part is no part"

**강화** (4개 섹션)
- Context Rot — Poisoning/Distraction/Confusion/Clash
- 에코시스템 — 08+09+10+06+11+01 관통 원칙
- 절차에서 관점으로 — cascade v1(시스템) → v2(전략) → v3(관점)
- 가리키는 곳 — PE → CE → LLM UX(mcp-memory). 둘의 순환

### 핵심 서사 흐름

```
[문제] Claude는 세계를 모른다. 보여준 것만 본다.
  ↓
[역설] 1M이니까 다 넣자 → 더 나빠짐
  ↓
[발상] 환경이 행동을 결정한다 (사람도, AI도)
  ↓
[200K] 토큰이 화폐. 아끼고 관리. 24→3.
  ↓
[1M] "압축"이 아니라 "큐레이션". 4-Layer.
  ↓
[Gate] 규모 보고 전략 결정. A/B/C.
  ↓
[읽기] 안 읽는 것도 설계. Progressive. Compact.
  ↓
[실체] 3주, 92파일, 6시스템.
  ↓
[과잉] 만든 것보다 버린 게 많다.
  ↓
[Rot] 컨텍스트는 썩는다. Layer 분리가 방어.
  ↓
[관점] 시스템 아님. 원칙. CLAUDE.md 3줄.
  ↓
[순환] 저장(mcp-memory) + 제시(CE) = Living System
```
