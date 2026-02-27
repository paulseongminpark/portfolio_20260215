# portfolio STATE
_Updated: 2026-02-27_

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
- **완료: 이중 배포 체계** (2026-02-27)
  - GitHub Pages CI 빌드 에러 수정 (TS strict, import 정리)
  - Vercel Production Branch → master 설정
  - gh-pages Preview 배포 에러 → vercel.json에서 비활성화
  - WebP 에셋 경량화 (87MB → 26MB)
- 진행중: W6 준비 (레이아웃 후보 선정)

## 최근 결정
- 2026-02-27: 이중 배포 체계 확립
  - GitHub Pages + Vercel 병행, VERCEL 환경변수로 base path 자동 분기
  - WebP 변환 (JPEG/PNG → WebP), 이미지 lazy loading
  - vercel.json: `git.deploymentEnabled.gh-pages: false`
- 2026-02-23: Obsidian Vault System 섹션 — CSS 목업 + SVG Graph View
- 2026-02-22: Tech Review System 섹션 — 8개 서브섹션, 아키텍처 피벗 스토리
- 2026-02-22: AI System 섹션 stale 수정 + 리팩토링

## 막힌 것
- All탭 스크롤 중 간헐적 Writing/Resume 점프
- TOC 간헐적 사라짐
- Resume/Contact 탭 노출 여부 미결정
- Obsidian 섹션 모바일 반응형 미확인 (375px)

## 주요 파일
- Entry: `src/main.tsx` → `App.tsx` → `src/experiments/page-12/index.tsx`
- Content: `src/experiments/page-12/content/*.md` (?raw import)
- Work data: `src/experiments/page-12/content/work.ts`
- AI data: `src/ui3/components/aiWorkflowData.ts`
- Config: `vite.config.ts`, `vercel.json`, `tsconfig.json`
