# Obsidian Section Rewrite Design

**Date**: 2026-03-01
**Status**: Approved
**Target**: ObsidianSystemSection.tsx 전체 재작성

## Context

현재 옵시디언 섹션(1628줄)은 v3.1 기준으로 작성됨. v4.0 "Context as Currency" 반영 필요.
UI는 이번 스코프 밖 — 논리적 흐름, 정확성, 스토리텔링에 집중.

## Design Decisions

- **Audience**: 계층적 (리크루터 → 엔지니어 → AI 사용자, 스크롤 깊이별)
- **Structure**: 하이브리드 + 역순 공개 (현재 시스템 먼저 → 과정 역추적)
- **Episodes**: PIVOT(Ctrl+Alt+V), 충돌 사례 유지. 나머지 새로 작성.
- **Climax**: 2주간 v0→v4.0 진화 여정 자체
- **Jeff Su 언급 제거** → "Flat Hierarchy + Numeric Taxonomy" 전문 용어 사용
- **인터랙티브 목업**: v4.0 기준으로 콘텐츠 업데이트

## Section Structure (5 sections)

### Section 1: Hook — "지금 이 시스템"
- 한 줄 철학: "마크다운 파일이 AI 에이전트들의 공유 통화가 됐다"
- Impact 숫자:
  - 3 CLI (Claude, Gemini, Codex) 같은 STATE.md 공유
  - 15 에이전트 + 9 스킬 자동 디스패치
  - 8 Hooks 실시간 자동화
  - 0 수동 동기화
- **리크루터 판단 지점**: 시스템 설계 능력

### Section 2: 현재 아키텍처 — "이렇게 생겼다"
- **볼트 구조**: Flat Hierarchy 원칙 + 인터랙티브 목업으로 직접 탐색
  - 5레벨 MAX 폴더 깊이, 2자리 프리픽스, 99=Archive
  - dev-vault 전체 맵 (HOME.md 허브 + 6 프로젝트 위성)
- **Living Docs 체계**: STATE.md(인벤토리) → KNOWLEDGE.md(패턴) → PLANNING.md(ADR) → CHANGELOG.md(이력)
  - 목업에서 파일 클릭 시 실제 내용 프리뷰
- **작동 원리**: Writer(Claude Code) / SoT(Git) / Viewer(Obsidian)
  - **충돌 에피소드**: Obsidian에서 편집 시 충돌 사례
- **Cross-CLI**: .ctx/ 공유 메모리 + rulesync
  - Claude/Gemini/Codex 같은 규칙 파일 공유
  - provenance.log 출처 추적
  - Graph View에서 CLI 간 연결 시각화
- **엔지니어 판단 지점**: 아키텍처 결정의 합리성

### Section 3: 왜 이렇게 됐나 — "문제의 시작"
- **핵심 문제**: AI 도구가 세션마다 기억 상실. 컨텍스트 비용 기하급수적 증가.
- **PIVOT 에피소드 (유지)**: Ctrl+Alt+V 시대
  - PowerShell + AutoHotKey → context-repo 수동 복붙
  - 이중 SoT 문제: 자동화가 새로운 문제 생성
- **전환점**: 도구 교체가 아닌, 공유 SoT 필요성 깨달음
- **AI 사용자 공감 지점**: "나도 이 문제 있어"

### Section 4: 진화 — "2주간 8번의 반복" (Climax)
- **v0**: context-repo Bridge — PowerShell+AHK. 이중 SoT → 폐기.
- **v1.0**: Git SoT + Orchestration — 마크다운 Git 관리. 수동 갱신 문제.
- **v2.0**: dev-vault + Obsidian Git — 뷰어 도입. "편집하면 충돌" 교훈.
- **v3.0**: Living Docs 규칙화 — STATE.md 단일 진실. /sync.
- **v3.1~3.3**: Agent Teams + live-context — 에이전트 24개. 복잡도 폭발.
- **v4.0**: Context as Currency — 24→15 정리, rulesync, Cross-CLI, worktree. "덜어내는 설계".
- **Story Arc**: 더하기(v0→v3.3) → 빼기(v4.0). 복잡도를 쌓다가 정리하는 것이 성숙.
- 기존 Evolution 타임라인 UI를 v4.0까지 확장.

### Section 5: 교훈 — "이 여정에서 배운 것"
- **SoT는 하나만**: 같은 정보 두 곳 = 반드시 어긋남. 하나만 진실, 나머지 읽기 전용.
- **도구는 역할 분리**: Writer / SoT / Viewer. 하나가 모든 역할 → 충돌.
- **복잡도는 빼야 완성**: 24개→15개가 더 강력. "더하기는 쉽고, 빼기가 설계."
- **자동화의 경계**: 수동 0 목표 + 자동화가 복잡도 만들면 멈춤.
- **모든 독자 판단 지점**: "만들기만 하는 게 아니라 생각하는 사람"

## Visual Elements (유지 + 업데이트)

- Obsidian 목업 (인터랙티브 파일 브라우저) → v4.0 콘텐츠
- Graph View (노드-엣지) → Cross-CLI 연결선 추가
- Evolution 타임라인 → v4.0까지 확장
- Impact 카드 → v4.0 숫자로 업데이트

## Out of Scope

- UI/디자인 변경 (이번은 콘텐츠만)
- 새로운 인터랙티브 요소 추가
- 다른 섹션 변경
