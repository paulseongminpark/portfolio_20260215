# STATE — 포트폴리오

## 지금 상태 (2026-02-12 기준)

**완료**
- W1~W4: Work 슬롯 재구성 + TOC + All탭 카드 + 상세 라우팅
- About 3개 + System 5개 실콘텐츠 주입
- 탭 필터 + TOC 접기/펼치기 + 스크롤스파이

**다음 할 일**
- W5: Work 상세 MD(Overview~) 실제 주입
- Writing/Resume/Contact placeholder 교체
- [Image: 16:9] placeholder → 실제 이미지
- vite build → 배포 URL 확보

**막힌 것**
- All 탭 스크롤 중 간헐적 Writing/Resume 점프
- Work 탭에서 TOC 간헐적 사라짐 (sticky 경계 조건)
- 이미지 에셋 미준비
- Resume/Contact 탭 노출 여부 미결정

---

## 시스템 작동 방식

**렌더링 흐름**
index.html  
↓  
src/main.tsx  
↓  
src/App.tsx  
↓  
src/ui3/Page.tsx  
↓  
src/shared/seed.ts (14개 섹션)


**데이터 구조**
- Work 3개: Empty House CPS / Skin Diary AI / PMCC
- About 3개 + System 5개 + Writing/Resume/Contact 각 1개
- 콘텐츠: src/content/HOME_INTRO_TO_RELATION_KO.md (?raw)
- 스크롤스파이: IntersectionObserver + pendingScrollId

**핵심 원칙**
- 목표: 실콘텐츠 완성 → 배포 가능 v1
- 성공지표: "placeholder content" 문자열 0개
- 제약: UI3 레이아웃 유지, vanilla CSS, 해시 라우팅, 한국어
- 스타일: Noto Sans KR, 4-column grid

---

## 과거 결정

**2026-02-10**
- Work 항목 3개 확정 (S4/S5 삭제)
- All 탭: Work는 OpenAI 스타일 가로 카드 3개
- 상세 진입: URL 해시(#work=<key>) + popstate 동기화
- TOC active: 상세 모드에서 현재 프로젝트만 파란색
- 탭 전환: 상세 모드에서 다른 탭 클릭 시 해시 제거 후 전환
- TOC 하단 사라짐: body flex 제거 + overflow/sticky 안정화
- 스크롤 복귀: scrollRestoration=manual + forceScrollTop
