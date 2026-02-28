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
