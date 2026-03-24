# Context Engineering 글감 수집 (2026-03-23)

## 1. 핵심 철학 (09 foundation/philosophy.md)
- **큐레이션 > 압축**: v1(200K) "압축해서 전달" → v2(1M) "뭘 읽을지 골라야"
- **읽지 않는 것도 엔지니어링**: 시그니처만 보면 될 때 전문 읽기 = 낭비
- **구조가 컨텍스트를 만든다**: 파일시스템 구조 = 읽기 순서 결정

## 2. 4-Layer 아키텍처 (09 foundation/principles.md)
- **Layer 0 Static (~15K)**: CLAUDE.md, rules/, AGENTS.md. 모든 세션 baseline
- **Layer 1 Session (1회)**: get_context(), recall(). 방향 설정
- **Layer 2 Task (자동)**: Gate 판단 + Progressive Reading
- **Layer 3 Live (연속)**: auto_remember, 토큰 모니터링, Compact

## 3. Gate 체계 (09 foundation/workflow.md)
- **Gate A (≤300K)**: Opus 직접, Serena symbolic tools
- **Gate B (300-800K)**: Codex 정찰 → high+medium만 읽기
- **Gate C (800K+)**: 분산 추출 (Codex+Gemini 병렬)
- **실전 교훈**: Gate 선언 강제 → 과잉 → 원칙 기반 자율 판단으로 전환

## 4. Progressive Reading (공통 규칙)
1. 00_index.md 먼저 → 전체 구조
2. Phase index → 해당 영역 상세
3. Serena get_symbols_overview → 심볼 목록
4. find_symbol include_body=False → 시그니처만
5. 필요한 본문만 Read

## 5. Compact 점진화 (09 workflow.md + 01 KNOWLEDGE.md)
### v3.3.1 시대 (200K)
- 42K baseline, 100K compact 권장, 120K 필수, 150K auto

### v5.0 시대 (1M)
- 500K checkpoint 권장, 700K compact 필수, 900K 세션교체
- Hook 아닌 자율 판단

## 6. Token as Currency (01 PLANNING.md D-024)
- "아직 안 틀린 결정"이 가장 비싼 토큰
- 200K 예산: Baseline 42K → 작업 42-100K → Compact 50-100K
- context window = 작업대(작을수록 좋음), 외부 DB = 창고(클수록 좋음)

## 7. 도구 수 변화 (01 CHANGELOG.md)
- v1.0 (2026-02-02): 처음
- v2.0 (2026-02-09): 에이전트 7개
- v3.0 (2026-02-21): 에이전트 24개 ← 최대
- v3.3.1 (2026-02-27): 15개로 정리
- v4.0 (2026-02-27): Context as Currency 확립
- v5.0 (2026-03-16): 에이전트 → Workers 3개 + Skills 13개

## 8. 시스템 연결 (에코시스템)
### 08_documentation-system (구조 제공자)
- phase-rules.json: 36개 규칙 SoT, Hook이 파싱
- 00_index.md HTML 코멘트 3줄: 기계 인터페이스
- foundation/ 3축: philosophy, principles, workflow
- 폴더 번호 = 실행 순서 (구조가 워크플로우를 말함)
- Phase v3: Diagnose(10-19) → Architect(20-29) → Build(30-39) → Harden(40-49)

### 09_context-cascade-system (선별 원칙)
- 3개 파이프라인, 92개 파일, 3주 완성
- CE = 시스템 아닌 전략 (6개 시스템 관통)
- 48개 확정 결정 (D1-D48)
- 실전: E2E T1-T7 (5 PASS, 2 PARTIAL)

### 10_index-system (에코시스템 지도)
- 25 nodes, 1169 edges, ~38.7M tokens
- CLI: scan/refs/deps/impact/topology
- scanner.py: 7가지 path reference 패턴
- 증분 업데이트: PostToolUse hook → graph.json
- Gate 판단의 입력: 프로젝트 규모 파악

### 11_user-guide (운영 프로토콜)
- "시스템이 Paul을 위해 존재한다"
- 7가지 원칙 (P1-P7)
- 세션 라이프사이클: 시작 → 중 → 끝 → compact
- Pane 패턴: 기본 1개, 외부 리서치, 독립 2개, 병렬
- 포스트잇 v2.0: 물리적 참고 카드
- Deviation 6단계 처리

### 01_orchestration (조율 허브)
- Living Docs 12개: STATE, CHANGELOG, KNOWLEDGE, PLANNING...
- Workers 3개 + Skills 13개 + Hooks 8종
- 체인: implement → code-reviewer → commit-writer
- 마무리 체크리스트 5단계 (Living Docs→옵시디언→커밋→push→보고)
- 새 작업 배치: Q1(독립산출물?)→Q2(기존scope?)→Q3(독립존재?)

## 9. Context Rot (09 CE Guide)
| 유형 | 설명 | 예시 |
|------|------|------|
| Poisoning | 틀린 정보 잔류 | 옛 규칙이 로드됨 |
| Distraction | 무관 정보 소음 | 다른 프로젝트 규칙 |
| Confusion | 모순 정보 충돌 | 두 규칙 반대 지시 |
| Clash | 우선순위 충돌 | 글로벌 vs 프로젝트 |

## 10. 만들고 버린 것들
- context-budget.py: 매 Read마다 Python spawn → 200ms 추가 → 제거
- read-guide.py: 파일 읽기 이유 강제 → 마찰 → 제거
- .ctx/ 유령 폴더: 런타임 상태 파일저장 → 불필요 → 재정의
- Gate 선언 강제: 형식 → 원칙으로 전환
- Compact Stage 1-2: 1M에서 도달 빈도 낮음 → 단순화
- 초기 가설 5개 중 3개 틀림 → 항상 실측 먼저

## 11. mcp-memory 핵심 노드 (CE 관련)
- #5130: CE 분기점 — "절차가 아니라 관점"
- #5129: cascade = 독립 시스템 아님, 전략
- #3812: Context as Currency — 토큰이 화폐
- #3944: context window = 작업대, DB = 창고, MCP = 열쇠
- #5241: CE는 관점이다
- #4306: Prompt Caching 순서 (Static→Tools→CLAUDE.md→Session→Messages)

## 12. 진화 타임라인
| 시기 | 이벤트 | 핵심 |
|------|--------|------|
| 2026-02 초 | v1.0 시작 | 에이전트 7개 |
| 2026-02 중 | v3.0 도구 폭발 | 24개, 정의만으로 공간 절반 |
| 2026-02-27 | v4.0 Context as Currency | 200K 예산 관리 확립 |
| 2026-03-10 | 01_reading-pipeline | 읽기 전략 첫 설계 |
| 2026-03-15 | 02_cascade-v2 | 4-Layer + Gate + E2E |
| 2026-03-16 | 03_ce-perspective | CE = 관점 재정의, Phase v3 |
| 2026-03-16 | v5.0 The Machine | Workers 3 + Skills 13, 1M |
| 2026-03-17 | phase-rules.json v3 | 네이밍 반영 |

## 13. 숫자 (본문에 사용 가능)
- 1M 토큰 (1,048,576)
- 4 레이어 (Static/Session/Task/Live)
- 3 게이트 (A/B/C)
- 92 파일 (3개 파이프라인 총합)
- 36 규칙 (phase-rules.json)
- 6 시스템 관통 (08+09+10+06+11+01)
- 25 프로젝트 (index-system)
- 1169 엣지 (index-system graph)
- 200K → 1M (5배 확장)
- 24 → 15 → 3 (도구 수 변화)
- 42K baseline (200K 시대)
- 15K baseline (1M 시대)
- 88% 토큰 절약 (get_context 200토큰)
- 45 노드 (mcp-memory CE 지식)
- 5 PASS + 2 PARTIAL (E2E 테스트)
