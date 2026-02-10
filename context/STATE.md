# STATE — 포트폴리오

## Objective
- 포트폴리오 v2 실콘텐츠 완성 → 배포 가능 v1 확보

## Active Goal
- Goal: Work 상세 MD 주입(W5) + Writing/Resume/Contact placeholder 교체
- Why now: Work 슬롯 재구성(W1) + TOC(W2) + All탭 카드(W3) + 상세 라우팅(W4) 완료. 실콘텐츠 주입 단계
- Success metric: 모든 섹션에서 "placeholder content" 문자열 0개 + 배포 URL 확보
- Constraints: UI3 레이아웃(탭+TOC+섹션) 유지, vanilla CSS, 해시 기반 라우팅, 한국어 기준
- DoD:
  - Work 상세 MD(Overview~) 실제 주입
  - Writing/Resume/Contact description에 실텍스트 반영
  - Page.tsx [Image: 16:9] placeholder를 실제 이미지 또는 의미있는 비주얼로 교체
  - vite build → 배포 완료
- Next action:
  - W5: Work 상세 MD(Overview~) 실제 주입

## Decisions
- Work 항목 3개로 확정: S1=Empty House CPS, S2=Skin Diary AI, S3=PMCC (S4/S5 삭제) (2026-02-10)
- All 탭에서 Work는 OpenAI 스타일 가로 카드 3개 섹션으로 대표 노출 (2026-02-10)
- Work 상세 진입은 URL 해시 기반(#work=<key>) + 브라우저 back/forward(popstate) 동기화 (2026-02-10)
- 상세 화면에서 TOC는 현재 프로젝트 항목만 active(파란색) 표시 (2026-02-10)
- 상세 모드에서 다른 글로벌 탭 클릭 시 상세 종료(해시 제거) 후 정상 탭 전환 (2026-02-10)
- TOC 하단 사라짐 현상: 레이아웃/overflow/sticky 안정화로 해결 (body flex 제거 포함) (2026-02-10)
- scrollRestoration=manual + forceScrollTop으로 복귀 스크롤 안정화 (2026-02-10)

## Current Truth
- 코드베이스: C:\dev\portfolio_ui_test_v2 @ master
- 렌더링 체인: index.html → src/main.tsx → src/App.tsx → src/ui3/Page.tsx
- 데이터: src/shared/seed.ts (Section[], Work 3개 + About 3 + System 5 + Writing 1 + Resume 1 + Contact 1 = 14개)
- 콘텐츠 소스: src/content/HOME_INTRO_TO_RELATION_KO.md (?raw import)
- 스크롤스파이: src/shared/useActiveSection.ts (IntersectionObserver + pendingScrollId)
- 스타일: src/styles.css (vanilla CSS, Noto Sans KR, 4-column grid) + index.css (body flex 제거됨)
- [완료] About 3개: md → Intro/Background/Direction 추출
- [완료] System 5개: md 파싱 → 개별 렌더링
- [완료] 탭 필터(All/About/System/Work/Writing) + TOC 접기/펼치기 + 스크롤스파이
- [완료] W1: Work 슬롯 재구성 (safety-1~5 → S1=Empty House/S2=Skin Diary/S3=PMCC, S4/S5 삭제)
- [완료] W2: TOC 라벨 프로젝트명 기준 변경
- [완료] W3: All 탭 Work 가로 카드 + 스크롤스파이 안정화
- [완료] W4: Work 상세 해시 라우팅 + popstate 동기화 + TOC active 규칙 + 탭 전환 정리
- [미완] W5: Work 상세 MD(Overview~) 실제 주입
- [미완] Writing 1개 (writing-1): placeholder
- [미완] Resume 1개 (resume-1): placeholder
- [미완] Contact 1개 (contact-1): placeholder
- [미완] 이미지 placeholder 교체
- [미완] dist/ 미생성 (빌드 미실행)

## Pending
- All 탭에서 스크롤 중 All 탭 클릭 시 간헐적으로 Writing/Resume 근처로 이동하는 간헐 이슈 (W4 후속)
- Work 탭 스크롤 중 TOC가 간헐적으로 사라지는 현상 (sticky/레이아웃 경계 조건, 재현 후 고정 필요)
- Resume/Contact 탭 노출 여부 결정 (현재 TOC에서만 접근)
- 이미지 에셋 준비
- 모바일 반응형 (현재 고정 grid)
- OG 메타/SEO

## Next
- W5: Work 상세 MD(Overview~) 실제 주입
- Writing/Resume/Contact placeholder 교체
- 이미지 placeholder 교체 방안 결정
- vite build 실행 → 배포 테스트
