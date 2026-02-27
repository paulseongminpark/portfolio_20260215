# Portfolio AGENTS 규칙

## Git 브랜치 전략
- **main 브랜치**: master
- **Codex 브랜치**: `codex` (단일 브랜치)
- **Gemini 브랜치**: `gemini` (단일 브랜치)
- master 직접 커밋 금지. 반드시 독립 브랜치에 커밋.
- push 금지 (Claude만 push/merge 권한).
- merge는 Claude가 `--no-ff`로 수행.

## 커밋 규칙
- 포맷: `[portfolio] 한줄 설명`
- 범위 밖 변경 금지
- node_modules/, dist/, build/ 커밋 금지

## 프로젝트 정보
- 스택: React 19 + Vite 7, Vanilla CSS, hash routing
- 진입점: src/experiments/page-12/index.tsx
- 콘텐츠: src/experiments/page-12/content/*.md (?raw import)
