# AI Native Orchestration System v4.0

**Context as Currency — 토큰이 화폐다. 200K 컨텍스트 안에서 가장 비싼 토큰은 '아직 안 틀린 결정'이다.**

What만 정의하면 15개 에이전트가 How를 결정하고 실행한다.

## 설계 철학

v4.0의 핵심은 빼기. 24개였던 에이전트를 15개로, 14개였던 스킬을 9개로 줄였다. 남은 것들은 각자 명확한 이유가 있다. baseline CLAUDE.md를 300줄 이하로 유지하고, 나머지는 @import와 rules/로 온디맨드 로드한다.

세 가지 원칙:
- **Baseline Minimalism** — CLAUDE.md 300줄 이하, 나머지는 온디맨드
- **Verify Before Trust** — 외부 AI 출력은 반드시 ai-synthesizer barrier 통과
- **Single Writer** — Claude Code만 설계·결정·쓰기. 나머지 AI는 추출·검증만

## 리좀형 토폴로지 (3팀 + 허브)

- **build**: code-reviewer, commit-writer, pf-ops, security-auditor (구현→리뷰→배포)
- **verify**: ai-synthesizer, gemini-analyzer, codex-reviewer (검증·추출·정밀검증)
- **maintain**: compressor, doc-ops, linker, daily-ops, tr-ops, orch-state, project-context (압축·문서·연결·운영)
- **허브**: meta-orchestrator — /dispatch 한 줄로 팀 활성화

## 멀티 AI 오케스트레이션

- **Claude Code**: 유일한 설계·결정·실행권자
- **Codex CLI**: 5시간 롤링 제한 내 정밀 검증 (diff 리뷰, 포맷 QA)
- **Gemini CLI**: 1M 토큰 벌크 추출 (코드베이스 전체 분석)
- **Perplexity**: 실시간 웹 리서치
- **Cross-CLI**: .ctx/shared-context.md로 모든 CLI가 같은 맥락 공유

## 체인 시스템

implement → code-reviewer → commit-writer → project-linker
배포: pf-deployer → security-auditor → 사용자 확인 → push
추출: Gemini/Codex → ai-synthesizer verify barrier → 사용
압축: /compact → compressor 9단계 → doc-syncer verify

## 진화 타임라인

- v1.0 (02-21): Skills 11개, Scripts 5개
- v2.0 (02-21): 에이전트 14개, 훅 5종, Gemini 연동
- v2.1 (02-22): SOT Metrics, pf-orchestrator
- v3.0 (02-23): 24개 에이전트, 체인 시스템
- v3.3.1 (02-25): Living Docs, 마무리 체크리스트
- v3.5 (02-26): Codex CLI, ai-synthesizer
- v4.0 (02-27): Context as Currency — 에이전트 15개, 스킬 9개, rulesync, .ctx/, worktree

## 핵심 숫자

15 Agents · 9 Skills · 8 Hooks · 3 Teams + 1 Hub · 4 AI Tools
