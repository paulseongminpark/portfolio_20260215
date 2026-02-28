# Multi-CLI Portfolio Workflow Design

**Date**: 2026-02-28
**Status**: Approved
**Pain Point**: worktree 격리 때문에 한 CLI의 변경이 다른 CLI의 dev 서버에 반영되지 않음

## 배경

Portfolio 작업에 Claude Code, Codex, Gemini CLI 3개를 사용.
사용자는 localhost:5173 하나로 결과를 보면서, 각 CLI에 동시에 작업을 지시함.

### 제약 조건

- **즉시 반영 필수**: 파일 저장 → Vite HMR → 브라우저 즉시 반영
- **동시성**: Codex에게 A, Gemini에게 B를 병렬로 시킴
- **CLI 불안정성**: Codex/Gemini가 지시 밖 파일을 건드리는 경우 있음 (vite.config, package.json 등)
- **다중 파일 작업**: 하나의 지시가 여러 파일에 걸침
- **A/B 비교 필요**: 가끔 두 접근법을 나란히 비교해야 함

### 기각된 접근

- **worktree 상시 사용**: 5173에 즉시 반영 불가. 일상 워크플로우에 부적합.
- **파일 단위 분할**: 작업이 다중 파일에 걸쳐 분할 불가능. CLI가 규칙을 안 지킴.
- **Hub-and-Spoke merge**: Claude 중재 오버헤드 큼. 동기화 지연.

## 설계

### 두 가지 모드

#### Mode 1: Live 모드 (기본, 80%+)

모든 CLI가 `02_portfolio/` 단일 디렉토리에서 작업.

```
localhost:5173 <- 02_portfolio/ (master)
                       |
               Claude + Codex + Gemini
```

워크플로우:
1. Claude가 체크포인트 커밋 (작업 전 안전망)
2. Codex/Gemini에 작업 지시 (가능하면 다른 페이지)
3. 파일 저장 -> Vite HMR -> 5173 즉시 반영
4. 작업 완료 -> Claude가 `git diff` 리뷰
5. 이상한 변경 revert -> 확인 후 커밋

동시성 규칙:
- 다른 페이지 -> 동시 OK
- 같은 페이지, 다른 파일 -> 동시 OK (주의)
- 같은 파일 -> 순차 (한쪽 끝나고 다음)

#### Mode 2: A/B 비교 모드 (필요 시)

worktree + 포트 2개로 두 버전 나란히 비교.

```
localhost:5173 <- 02_portfolio/ (master, 버전 A)
localhost:5174 <- 02_portfolio-compare/ (worktree, 버전 B)
```

워크플로우:
1. Claude가 worktree 생성
   - `git worktree add ../02_portfolio-compare -b compare/<topic>`
   - worktree에서 `npm install && npx vite --port 5174`
2. 버전 A: master에서 접근법 A 구현 (5173)
3. 버전 B: worktree에서 접근법 B 구현 (5174)
4. 사용자가 브라우저 탭 2개로 비교
5. 승자 결정:
   - A 승리 -> worktree 삭제
   - B 승리 -> Claude가 diff 읽고 master에 적용 -> worktree 삭제
   - 부분 채용 -> Claude가 양쪽에서 좋은 부분 추출
6. 정리: `git worktree remove ../02_portfolio-compare`

모드 전환 기준:
- Live: CSS 수정, 콘텐츠 편집, 버그 수정, 일상 작업
- A/B: "A vs B 비교", 레이아웃 실험, 애니메이션 대안, 대규모 리팩토링

### AGENTS.md 규칙

금지 파일 (인프라 - Claude 전용):
- vite.config.ts
- package.json / package-lock.json
- tsconfig*.json
- index.html
- src/main.tsx, src/App.tsx

행동 규칙:
- 지시받은 파일/범위만 수정
- 새 파일 생성 금지 (지시 없으면)
- 새 라이브러리 설치 금지
- master에 직접 push 금지

### 기존 worktree 정리

현재 세팅된 codex, gemini worktree 삭제.
- Live 모드에서 불필요
- A/B 모드는 필요할 때 임시 생성/삭제

## 구현 항목

1. 기존 worktree 삭제 (codex, gemini)
2. AGENTS.md 업데이트 (금지 파일 + 행동 규칙)
3. 기존 불필요 브랜치 정리 (codex, gemini remote/local)
