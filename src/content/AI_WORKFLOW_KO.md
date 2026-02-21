# AI Native Orchestration System

**Claude Code를 운영체제처럼 쓴다. What만 정의하면 14개 에이전트가 How를 결정하고 실행한다.**

## 시스템 진화

- v1.0 (2026-02-21): Skills 11개, Scripts 5개, Auto-Memory 3단계
- v2.0 (2026-02-21): 에이전트 14개, 훅 5종, MCP 3개, Gemini CLI 연동
- v2.1 (2026-02-22): SOT METRICS 추가, pf-orchestrator, 컨텍스트 라이브러리

## 에이전트 아키텍처 (14개)

- **PROACTIVELY**: code-reviewer, commit-writer, orch-state, compressor
- **Portfolio**: pf-context, pf-reviewer, pf-deployer, pf-orchestrator
- **Orchestration**: orch-doc-writer, orch-skill-builder
- **Analysis**: gemini-analyzer (1M 토큰), security-auditor
- **Monet-lab**: ml-experimenter, ml-porter
- **Morning**: morning-briefer

## 자동화 워크플로우

brainstorm → plan → implement → review → deploy

각 단계가 전문 에이전트로 분리, 자동 연결

## CLAUDE.md & 컨텍스트 엔지니어링

- **계층 구조**: ~/.claude/ → C:/dev/ → 프로젝트
- **rules/ 폴더**: 경로별 조건부 규칙 (TypeScript, 보안, 워크플로우)
- **@import로 모듈화**: 필요할 때만 온디맨드 로드
- **common-mistakes.md**: 반복 실수 패턴 누적 → 자동 방지

## 훅 시스템 (5종)

- **Stop Hook**: 미커밋 파일 감지 → 완료 선언 차단
- **SessionStart**: 세션 시작 시 작업 로그 + git status 자동 출력
- **PreToolUse**: rm -rf, git push --force 자동 차단
- **TeammateIdle**: Agent Teams 팀원 유휴 알림
- **TaskCompleted**: 작업 완료 감지 알림

## 스킬 시스템 (17개)

- **운영**: /morning, /todo, /sync-all, /catchup, /session-insights
- **문서**: /docs-review, /research, /handoff, /gpt-review
- **배포**: /commit-push-pr, /verify, /verify-project-rules
- **생성**: /skill-creator, /subagent-creator, /hook-creator

## 멀티 AI 오케스트레이션

- **Claude Code**: 실행 (유일한 Write 권한)
- **Gemini CLI**: 1M 토큰 코드베이스 전체 분석
- **GPT-4o**: 설계 비판적 검토 (/gpt-review)
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

14 Agents · 17 Skills · 5 Hooks · 3 MCP Servers · 2 AI Tools · 1 Automation Hub
