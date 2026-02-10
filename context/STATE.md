# STATE — 포트폴리오

## Objective
- 포트폴리오 v2 실콘텐츠 완성 → 배포 가능 v1 확보

## Active Goal
- Goal: seed.ts placeholder 8개(Work 5 + Writing 1 + Resume 1 + Contact 1)를 실콘텐츠로 교체
- Why now: About 3개 + System 5개는 md 동적 로드/파싱 완료. placeholder만 남음
- Success metric: 모든 섹션에서 "placeholder content" 문자열 0개 + 배포 URL 확보
- Constraints: UI3 레이아웃(탭+TOC+섹션) 유지, vanilla CSS, 라우팅 없음, 한국어 기준
- DoD:
  - seed.ts Work/Writing/Resume/Contact description에 실텍스트 반영
  - Page.tsx [Image: 16:9] placeholder를 실제 이미지 또는 의미있는 비주얼로 교체
  - vite build → 배포 완료
- Next action:
  - seed.ts Work 5개(safety-1~5) id/title/description을 실제 프로젝트로 교체

## Current Truth
- 코드베이스: C:\dev\portfolio_ui_test_v2 @ d29e44e (master) — "chore: cornerstone v1"
- 렌더링 체인: index.html → src/main.tsx → src/App.tsx → src/ui3/Page.tsx
- 데이터: src/shared/seed.ts (Section[] 16개 항목, Category 6종)
- 콘텐츠 소스: src/content/HOME_INTRO_TO_RELATION_KO.md (?raw import)
- 스크롤스파이: src/shared/useActiveSection.ts (IntersectionObserver + pendingScrollId)
- 스타일: src/styles.css (vanilla CSS, Noto Sans KR, 4-column grid)
- [완료] About 3개 (research-1~3): seed.ts에서 extractBoldText로 md → Intro/Background/Direction 추출
- [완료] System 5개 (product-1, product-2, system-time, system-sensation, system-relation): Page.tsx parseSystemContent로 md 파싱 → 개별 렌더링
- [완료] 탭 필터(All/About/System/Work/Writing) + TOC 접기/펼치기 + 스크롤스파이
- [미완] Work 5개 (safety-1~5): seed.ts description = "Safety placeholder content"
- [미완] Writing 1개 (writing-1): "Writing placeholder content"
- [미완] Resume 1개 (resume-1): "Resume placeholder content"
- [미완] Contact 1개 (contact-1): "Contact placeholder content"
- [미완] 모든 16개 섹션에 [Image: 16:9] placeholder (Page.tsx :283)
- [미완] 탭바에 Resume/Contact 미노출 (Page.tsx :174, 배열에 없음)
- [미완] dist/ 미생성 (빌드 미실행)

## Pending
- Work id 체계: safety-1~5 → 실제 프로젝트명(pmcc/empty-house/skin-diary 등)
- Resume/Contact 탭 노출 여부 결정 (현재 TOC에서만 접근)
- 이미지 에셋 준비
- 모바일 반응형 (현재 고정 grid)
- OG 메타/SEO

## Next
- seed.ts: safety-1~5의 id/title/shortTitle/description을 실제 프로젝트(PMCC/빈집CPS/SkinDiary 등)로 교체
- seed.ts: writing-1/resume-1/contact-1 description에 실텍스트 채우기
- Page.tsx :174 탭 배열에 Resume/Contact 추가 여부 결정
- 이미지 placeholder 교체 방안 결정 (실제 이미지 vs CSS 일러스트)
- vite build 실행 → 배포 테스트
