# Portfolio CHANGELOG

## 2026-03-04

### E2EWorkflow 헤더/배경 분리
- 헤더(Context Flow, End-to-End Workflow 제목) → 흰색 배경 분리
- 01~10 Phase nav + LargeBox 영역만 파란색(#6A9BCC) 유지

### Key Decisions sandbox 3종 제작
- V1: Before/After 투톤 분할 카드 (→ 화살표)
- V2: Accordion (클릭 시 펼침, + 회전 애니메이션)
- V3: Narrative-first (Why가 주인공, Before→After 취소선+보조)

---

## 2026-03-02

### Multi-AI Orchestration 섹션 테이블 리팩토링
- 2x2 카드 레이아웃 → 4컬럼 테이블 레이아웃으로 전환
- PNG "Model Capability Benchmarks" 이미지 → 코드(테이블) 변환
- `aiWorkflowData.ts`: AiRole 인터페이스에 `strengthSub`, `limitSub` 필드 추가
- `.gitignore`: `_sandbox/` 추가, git rm --cached로 기존 추적 파일 정리
- Perplexity role: `''` → `'리서치 엔진'` 명시
- 커밋: 2a82cd9, 87b8119

### 포트폴리오 섹션 전면 리라이트
- Obsidian: 10→5 섹션 구조 재편, Bedford 스타일 파일 구조 다이어그램
- E2E Workflow: 8→10 Phase 확장, React Flow→vanilla 전환
- index.tsx: 타이포그래피 위계 정리, sticky 헤더, TOC 업데이트

### PMCC_DETAIL_KO.md 콘텐츠 개정
- 논리 흐름 전면 재검토 — 13개 수정 지시 반영
- flowchart Overview → Approach 뒤로 이동, Design Principle 헤딩 제거
- Gallery Dataset 뒤로 재배치
- 전체 표현 평이화

---

## 2026-03-01

### Obsidian 섹션 v4.0 재작성
- 5섹션 역순 공개 구조: Hook → Architecture → Problem → Evolution → Lessons
- EVOLUTION v4.0까지 확장, Cross-CLI 그래프 노드/엣지 추가
- Impact을 Hook으로 이동, /catchup Before/After 제거

---

## 2026-02-28

### AI System v4.0 이식
- monet-lab v4.0 → portfolio 전면 이식 (4개 파일)
- 16섹션 대시보드 → 8섹션 내러티브 ("Context as Currency")
- 에이전트 16→15, 스킬 17→9, 훅 9→8, MCP→4 AI Tools

### v1.0-clean 구조 정리
- experiments/page-12 → portfolio 구조 리네이밍
- TS6133 빌드 에러 수정 (미사용 import/변수 제거)
- 미사용 파일 76건 삭제 (CSS 32→25KB)
- deploy.yml: vercel.json → dist/ 복사로 gh-pages Vercel 빌드 차단 해결
- 태그 `v1.0-clean` (3eac345)

---

## 2026-02-27

### 이중 배포 체계 확립
- GitHub Pages: `paulseongminpark.github.io/portfolio/` (gh-pages 브랜치)
- Vercel: `portfolio-seongmin-parks-projects.vercel.app/` (master 자동배포)
- vite.config.ts base path 분기, vercel.json SPA rewrites

---

## 2026-02-23

### Obsidian Vault System 섹션
- CSS 목업 + SVG Graph View 추가

---

## 2026-02-22

### Tech Review System 섹션
- 8개 서브섹션, 아키텍처 피벗 스토리

### AI System 섹션 초기 구축
- stale 수정 + 리팩토링
