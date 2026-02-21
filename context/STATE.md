# portfolio STATE
_Updated: 2026-02-22_

## 목적
개인 포트폴리오 웹사이트 개발 (React + Vite)

## 현재 상태
- 완료: W1~W5 (Work 슬롯, TOC, All탭, 상세 라우팅, MD 주입, 실콘텐츠 주입, 탭 필터, 스크롤스파이)
- 완료: monet-lab (04_monet-lab) UI 실험 환경 구축
  - Page 01~06 6개 레이아웃
  - 02 계열 (2-a~2-e), 03 계열 (3-a~3-e) 각각 변형 + 스타일별 WorkDetail
  - TOC 토글 사이드바, Playwright 자동 스크린샷
  - 포트폴리오 UI Lab 섹션 (lab.md + LabRenderer)
  - **Page 07~10 구현 완료** (팔레트 퓨전 2종 + 제3의 미학 2종)
- 완료: Jekyll Liquid 빌드 에러 수정 (_config.yml exclude docs/)
- 진행중: W6 준비 (07~10 스크린샷 캡처 후 최종 레이아웃 후보 선정)
- 다음: 07~10 스크린샷 → portfolio/public/lab/ 저장 → lab.md 이미지 링크 추가

## 최근 결정
- 2026-02-22: UI Lab 07~10 구현 완료 (Subagent-Driven Development)
  - page-07 Warm Index: OpenAI 좌고정 인덱스 + Anthropic 크림 팔레트
  - page-08 Warm Card Grid: OpenAI 카드 그리드 + Anthropic 크림 카드
  - page-09 Quiet Precision: 제3의 미학, 텍스트+여백만 (Playfair Display + Inter)
  - page-10 Deep Warm: 제3의 미학, 웜 다크 (Cormorant Garamond + DM Sans)
- 2026-02-22: Jekyll _config.yml에 `exclude: [docs/]` 추가 (Liquid 파싱 에러 해결)
- 2026-02-22: monet-lab 실험 환경 구축 완료 (Tailwind CSS 4 + shadcn + Framer Motion)
- 2026-02-22: 02(OpenAI Minimal) / 03(Anthropic Warm) 계열 각 5개 변형 생성
- 2026-02-22: 각 변형별 스타일 맞춤 WorkDetail 상세 페이지 구현

## 막힌 것
- 07~10 스크린샷 미캡처 (사용자 직접 localhost:5174 접속 후 캡처 필요)
- W6 레이아웃 방향 미결정 (07~10 검토 후 결정)
- All탭 스크롤 중 간헐적 Writing/Resume 점프
- TOC 간헐적 사라짐
- 이미지 에셋 미준비
- Resume/Contact 탭 노출 여부 미결정
