# Multi-CLI Workflow Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** worktree 기반 멀티 CLI 구조를 단일 디렉토리 Live 모드로 전환하고, AGENTS.md 가드레일을 설정한다.

**Architecture:** 기존 codex/gemini worktree와 브랜치를 삭제하고, AGENTS.md를 Live 모드 + A/B 비교 모드 규칙으로 업데이트한다. 설계 문서는 `docs/plans/2026-02-28-multi-cli-workflow-design.md`.

**Tech Stack:** Git worktree, AGENTS.md (Codex/Gemini CLI 규칙 파일)

---

### Task 1: 기존 worktree 삭제

**Files:**
- Remove: `C:/dev/01_projects/02_portfolio-codex/` (worktree directory)
- Remove: `C:/dev/01_projects/02_portfolio-gemini/` (worktree directory)

**Step 1: worktree 상태 확인**

Run: `cd /c/dev/01_projects/02_portfolio && git worktree list`
Expected: 3개 worktree (master, codex, gemini)

**Step 2: codex worktree 삭제**

Run: `cd /c/dev/01_projects/02_portfolio && git worktree remove ../02_portfolio-codex --force`
Expected: worktree 삭제 완료

**Step 3: gemini worktree 삭제**

Run: `cd /c/dev/01_projects/02_portfolio && git worktree remove ../02_portfolio-gemini --force`
Expected: worktree 삭제 완료

**Step 4: 삭제 확인**

Run: `cd /c/dev/01_projects/02_portfolio && git worktree list`
Expected: master worktree만 남음

---

### Task 2: 불필요 브랜치 정리

**Files:** Git branches (codex, gemini — local + remote)

**Step 1: 로컬 codex/gemini 브랜치 삭제**

Run:
```bash
cd /c/dev/01_projects/02_portfolio
git branch -D codex
git branch -D gemini
```
Expected: 두 브랜치 삭제 완료

**Step 2: 리모트 codex/gemini 브랜치 삭제**

Run:
```bash
cd /c/dev/01_projects/02_portfolio
git push origin --delete codex
git push origin --delete gemini
```
Expected: 리모트 브랜치 삭제 완료

**Step 3: 확인**

Run: `cd /c/dev/01_projects/02_portfolio && git branch -a`
Expected: master와 remotes/origin/master, remotes/origin/gh-pages만 남음

---

### Task 3: AGENTS.md 업데이트

**Files:**
- Modify: `AGENTS.md` (전체 재작성)

**Step 1: AGENTS.md를 새 규칙으로 교체**

```markdown
# Portfolio AGENTS 규칙

## 작업 모드
- **기본**: 모든 CLI가 `02_portfolio/` 단일 디렉토리에서 작업 (Live 모드)
- 워크트리 생성/삭제는 Claude만 수행

## 금지 파일 (인프라 — Claude 전용)
아래 파일은 Codex/Gemini 수정 절대 금지:
- vite.config.ts
- package.json / package-lock.json
- tsconfig*.json
- index.html
- src/main.tsx
- src/App.tsx

## 행동 규칙
- 지시받은 파일/범위만 수정
- 새 파일 생성 금지 (명시적 지시 없으면)
- 새 라이브러리 설치 금지 (npm install 금지)
- push 금지 (Claude만 push 권한)
- 기존 import 구조 변경 금지

## 커밋 규칙
- 포맷: `[portfolio] 한줄 설명`
- 범위 밖 변경 금지
- node_modules/, dist/, build/ 커밋 금지

## 프로젝트 정보
- 스택: React 19 + Vite 7, Vanilla CSS, hash routing
- 진입점: src/main.tsx -> App.tsx -> portfolio/index.tsx
- 콘텐츠: src/portfolio/content/*.md (?raw import)
- 브랜치: master
```

**Step 2: 변경 확인**

Run: `cat AGENTS.md`
Expected: 새 규칙이 금지 파일 목록과 행동 규칙을 포함

---

### Task 4: 커밋

**Step 1: 변경 사항 확인**

Run: `cd /c/dev/01_projects/02_portfolio && git status`
Expected: AGENTS.md (modified), docs/plans/ 파일 2개 (untracked)

**Step 2: 커밋**

Run:
```bash
cd /c/dev/01_projects/02_portfolio
git add AGENTS.md docs/plans/2026-02-28-multi-cli-workflow-design.md docs/plans/2026-02-28-multi-cli-workflow-plan.md
git commit -m "[portfolio] multi-CLI workflow: Live 모드 전환, worktree 정리, AGENTS.md 가드레일"
```

**Step 3: push**

Run: `cd /c/dev/01_projects/02_portfolio && git push origin master`
Expected: push 성공
