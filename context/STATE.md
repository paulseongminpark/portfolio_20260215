# portfolio STATE
_Updated: 2026-02-28_

## 목적
개인 포트폴리오 웹사이트 (React + Vite, vanilla CSS, hash routing)

## 배포
- **GitHub Pages**: `https://paulseongminpark.github.io/portfolio/` (gh-pages 브랜치, base: `/portfolio/`)
- **Vercel**: `https://portfolio-seongmin-parks-projects.vercel.app/` (master 자동배포, base: `/`)
- base path 분기: `vite.config.ts` — `process.env.VERCEL === '1' ? '/' : '/portfolio/'`
- vercel.json: gh-pages 브랜치 배포 비활성화, SPA rewrites 설정

## 현재 상태
- 완료: W1~W5 (Work 슬롯, TOC, All탭, 상세 라우팅, MD 주입, 탭 필터, 스크롤스파이)
- 완료: AI System / Tech Review System / Obsidian Vault System 섹션
- 완료: monet-lab UI 실험 (page-01~12), Lab 섹션
- 완료: 이중 배포 체계 (2026-02-27)
- **완료: v1.0-clean 구조 정리** (2026-02-28)
  - experiments/page-12 → portfolio 구조 리네이밍
  - TS6133 빌드 에러 수정 (미사용 import/변수 제거)
  - 미사용 파일 76건 삭제 (lab/, _archive/, App.css 등, CSS 32→25KB)
  - deploy.yml: vercel.json을 gh-pages에 포함하여 Vercel 빌드 차단 해결
  - 태그 `v1.0-clean` (3eac345) — 롤백 고정점
- 진행중: W6 준비 (레이아웃 후보 선정)

## 최근 결정
- 2026-02-28: v1.0-clean 구조 정리
  - page-12 → portfolio 리네이밍, 미사용 파일 전면 삭제
  - deploy.yml에서 vercel.json → dist/ 복사 (gh-pages Vercel 빌드 차단)
  - reference/ 폴더 유지, codex/gemini 브랜치 유지 (master와 동일 고정)
- 2026-02-27: 이중 배포 체계 확립
- 2026-02-23: Obsidian Vault System 섹션 — CSS 목업 + SVG Graph View
- 2026-02-22: Tech Review System 섹션 — 8개 서브섹션, 아키텍처 피벗 스토리
- 2026-02-22: AI System 섹션 stale 수정 + 리팩토링

## 막힌 것
- All탭 스크롤 중 간헐적 Writing/Resume 점프
- TOC 간헐적 사라짐
- Resume/Contact 탭 노출 여부 미결정
- Obsidian 섹션 모바일 반응형 미확인 (375px)

## 주요 파일
- Entry: `src/main.tsx` → `App.tsx` → `src/portfolio/index.tsx`
- Content: `src/portfolio/content/*.md` (?raw import)
- Work data: `src/portfolio/content/work.ts`
- Config: `vite.config.ts`, `vercel.json`, `tsconfig.json`
