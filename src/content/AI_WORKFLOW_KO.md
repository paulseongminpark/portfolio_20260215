# AI Native Orchestration System

**Claude Code를 운영체제처럼 쓴다. What만 정의하면 23개 에이전트가 How를 결정하고 실행한다.**

## 시스템 진화

- v1.0 (2026-02-21): Skills 11개, Scripts 5개, Auto-Memory 3단계
- v2.0 (2026-02-21): 에이전트 14개, 훅 5종, MCP 3개, Gemini CLI 연동
- v2.1 (2026-02-22): SOT METRICS 추가, content-writer, 훅 9종, 에이전트 16개
- v2.2 (2026-02-22): 시스템 오버홀 — 죽은 자동화 수리, 불필요 제거, stale 문서 수정
- v3.0 (2026-02-23): 에이전틱 워크플로우 — 체인 규칙 강제, agent.md 표준화, hooks 품질 게이트
- v3.1 (2026-02-23): Agent Teams & Linker System — 에이전트 23개, 팀 3개, live-context.md 실시간 공유

## 에이전트 아키텍처 (23개)

- **PROACTIVELY** (6): code-reviewer, commit-writer, orch-state, compressor, context-linker, project-linker
- **Portfolio** (3): pf-context, pf-reviewer, pf-deployer
- **Orchestration** (3): orch-doc-writer, orch-skill-builder, meta-orchestrator
- **AI Pipeline** (3): gemini-analyzer (1M), codex-reviewer, ai-synthesizer
- **Monet-lab** (2): ml-experimenter, ml-porter
- **Tech-review** (2): tr-monitor, tr-updater
- **Daily** (2): inbox-processor, morning-briefer
- **Other** (2): content-writer, security-auditor

## 에이전트 팀 (3개)

- **tech-review-ops**: tr-monitor, tr-updater, commit-writer
- **ai-feedback-loop**: gemini-analyzer, codex-reviewer, ai-synthesizer
- **daily-ops**: inbox-processor, orch-state, morning-briefer

## 체인 규칙 (7개)

- **구현**: implement → code-reviewer → commit-writer → living docs
- **분석**: gemini + codex (병렬) → ai-synthesizer → 사용자 확인
- **배포**: pf-deployer → security-auditor → 사용자 확인 → push
- **Tech-review**: tr-monitor → tr-updater → commit-writer
- **일일 운영**: inbox-processor → orch-state → morning-briefer
- **디스패치**: catchup → meta-orchestrator → 팀 활성화
- **프로젝트 연동**: context-linker (hook) → project-linker (커밋) → 맥락 주입

## 자동화 워크플로우

brainstorm → plan → implement → review → deploy

각 단계가 전문 에이전트로 분리, 자동 연결

## CLAUDE.md & 컨텍스트 엔지니어링

- **계층 구조**: ~/.claude/ → C:/dev/ → 프로젝트
- **rules/ 폴더**: 경로별 조건부 규칙 (TypeScript, 보안, 워크플로우)
- **@import로 모듈화**: 필요할 때만 온디맨드 로드
- **common-mistakes.md**: 반복 실수 패턴 누적 → 자동 방지

## 훅 시스템 (9종)

- **Stop Hook**: 미커밋 파일 감지 → 완료 선언 차단
- **SessionStart**: 세션 시작 시 작업 로그 + git status 자동 출력
- **SessionEnd**: 세션 종료 시 /sync 권장 알림
- **PreToolUse**: rm -rf, git push --force 자동 차단
- **PostToolUse**: Write/Edit 후 context 변경 감지 + live-context.md 자동 기록
- **PreCompact**: compact 전 /verify 권장 알림
- **Notification**: 비동기 알림 처리
- **TeammateIdle**: Agent Teams 팀원 유휴 알림
- **TaskCompleted**: 작업 완료 감지 알림

## 스킬 시스템 (17개)

- **세션 관리**: /morning, /catchup, /sync-all, /todo, /session-insights, /compressor
- **문서·리서치**: /research, /gpt-review, /docs-review, /write
- **배포·검증**: /commit-push-pr, /verify, /handoff
- **시스템 구축**: /skill-creator, /hook-creator
- **유지·관리**: /memory-review, /sync

## 멀티 AI 오케스트레이션

- **Claude Code**: 실행 허브 (유일한 Write 권한)
- **Gemini CLI**: 1M 토큰 코드베이스 전체 분석
- **Codex CLI**: codex-reviewer 에이전트 · 분석 체인 병렬 검증
- **Perplexity**: 실시간 웹 검색

## GitHub & 자동화 연동

- **gh CLI**: PR 생성, 이슈 관리 (GitHub MCP 불필요)
- **tech-review blog**: Jekyll + GitHub Pages 자동 빌드
- **dev-vault**: Obsidian Git으로 10분마다 자동 커밋
- **daily-memo**: 모바일 Claude Code → 브랜치 → /todo 동기화

## MCP 서버 (3개)

- **sequential-thinking**: 복잡한 설계 단계별 분해
- **memory**: 세션 간 knowledge graph
- **desktop-commander**: 터미널 + 파일시스템 제어

## 핵심 숫자

23 Agents · 17 Skills · 3 Teams · 7 Chains · 9 Hooks · 3+ AI Tools
