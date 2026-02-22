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
- **완료: AI System 섹션 전면 정비** (2026-02-22)
  - 수치 업데이트: 16 Agents · 17 Skills · 9 Hooks
  - AiWorkflowSection.tsx 리팩토링 (데이터 분리 + 섹션 개선)
- 진행중: W6 준비 (07~10 스크린샷 캡처 후 최종 레이아웃 후보 선정)
- 다음: 07~10 스크린샷 → portfolio/public/lab/ 저장 → lab.md 이미지 링크 추가

## 최근 결정
- 2026-02-22: AI System 섹션 stale 수정 + 리팩토링 완료
  - AI_WORKFLOW_KO.md 수치 동기화 (16 에이전트, 9 훅, content-writer 추가)
  - `aiWorkflowData.ts` 신규 생성 — 모든 하드코딩 데이터 분리
  - 스킬 5그룹 재분류: 세션관리/문서리서치/배포검증/시스템구축/유지관리 (17개 완전 매핑)
  - 훅 섹션 + 스킬 섹션 독립 분리 (2열 grid 해소)
  - 에이전트 모델 전략: 3열 카드 → 테이블 변환
- 2026-02-22: UI Lab 07~10 구현 완료 (Subagent-Driven Development)
  - page-07 Warm Index: OpenAI 좌고정 인덱스 + Anthropic 크림 팔레트
  - page-08 Warm Card Grid: OpenAI 카드 그리드 + Anthropic 크림 카드
  - page-09 Quiet Precision: 제3의 미학, 텍스트+여백만 (Playfair Display + Inter)
  - page-10 Deep Warm: 제3의 미학, 웜 다크 (Cormorant Garamond + DM Sans)
- 2026-02-22: Jekyll _config.yml에 `exclude: [docs/]` 추가 (Liquid 파싱 에러 해결)

## 막힌 것
- 07~10 스크린샷 미캡처 (사용자 직접 localhost:5174 접속 후 캡처 필요)
- W6 레이아웃 방향 미결정 (07~10 검토 후 결정)
- All탭 스크롤 중 간헐적 Writing/Resume 점프
- TOC 간헐적 사라짐
- 이미지 에셋 미준비
- Resume/Contact 탭 노출 여부 미결정

## AI System 섹션 아키텍처 (참고)
- 콘텐츠 소스: `src/content/AI_WORKFLOW_KO.md` (실제 렌더링에 사용 안 됨, 요약본)
- 실제 데이터: `src/ui3/components/aiWorkflowData.ts` ← **수치 수정 시 여기만 건드릴 것**
- 렌더러: `src/ui3/components/AiWorkflowSection.tsx` (UI 로직만 담당)
