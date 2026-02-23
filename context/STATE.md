# portfolio STATE
_Updated: 2026-02-23_

## 목적
개인 포트폴리오 웹사이트 개발 (React + Vite)

## 현재 상태
- 완료: W1~W5 (Work 슬롯, TOC, All탭, 상세 라우팅, MD 주입, 실콘텐츠 주입, 탭 필터, 스크롤스파이)
- 완료: monet-lab (04_monet-lab) UI 실험 환경 구축
  - Page 01~06 6개 레이아웃 + 07~10 (팔레트 퓨전 2종 + 제3의 미학 2종)
  - TOC 토글 사이드바, Playwright 자동 스크린샷
  - 포트폴리오 UI Lab 섹션 (lab.md + LabRenderer)
- 완료: AI System 섹션 전면 정비 (AiWorkflowSection.tsx + aiWorkflowData.ts)
- 완료: Tech Review System 섹션 신규 구현 (2026-02-22)
  - seed.ts: `tech-review-system` 섹션 추가 (Writing 카테고리, TOC "TR System")
  - TechReviewSystemSection.tsx 신규 생성 (8개 서브섹션)
  - 8개 서브섹션: Why / System Overview / Pipeline / Weekly Schedule /
    Smart Brevity(v1→v2 진화 + 예시) / Keywords Log / Design Decisions / Ongoing
  - Architecture Pivot 이야기 (GAS+Gmail → Perplexity API 직접 호출)
  - Format Evolution 카드 (5W1H 폐기 → Smart Brevity 전환)
- **완료: Obsidian Vault System 섹션 신규 구현** (2026-02-23)
  - seed.ts: `obsidian-system` 섹션 추가 (Writing 카테고리)
  - Page.tsx 라우팅 분기 추가
  - ObsidianSystemSection.tsx 신규 생성 (6블록)
  - 스토리 3개: PIVOT(Ctrl+Alt+V 복붙 에피소드), Before/After(/catchup), LESSON(Git 충돌)
  - 인터랙티브 Obsidian UI 목업: 11개 파일, 폴더 접기/펼치기, 퍼플 포인트 컬러
  - 인터랙티브 Graph View: React + SVG, 노드 10개/엣지 22개, 호버 하이라이트+glow
  - 목업+그래프 양옆 배치(flex row), 높이 동기화, 블록 간격 56px 통일
  - 커밋 12개, master 브랜치 push 완료
- 진행중: W6 준비 (07~10 스크린샷 캡처 후 최종 레이아웃 후보 선정)
- 다음: dev 서버에서 Obsidian 섹션 시각 확인 → 모바일 반응형 확인

## 최근 결정
- 2026-02-23: Obsidian Vault System 섹션 구현
  - CSS 재현 방식 목업 (스크린샷 아님) — 코드 렌더링 일관성
  - Graph View: 수동 배치 (force-directed 아님) — 의도된 클러스터 보장
  - 목업+그래프 양옆 배치 — Living Docs 블록 내 통합
- 2026-02-22: Tech Review System 섹션 구현
  - TechReviewCards (최신 포스트 3개) 아래 별도 섹션으로 분리
  - 시스템 설계 스토리 전달: 동기 → 아키텍처 피벗 → 포맷 진화 → 현재 구조
- 2026-02-22: AI System 섹션 stale 수정 + 리팩토링 완료

## 막힌 것
- 07~10 스크린샷 미캡처 (사용자 직접 localhost:5174 접속 후 캡처 필요)
- W6 레이아웃 방향 미결정 (07~10 검토 후 결정)
- All탭 스크롤 중 간헐적 Writing/Resume 점프
- TOC 간헐적 사라짐
- 이미지 에셋 미준비
- Resume/Contact 탭 노출 여부 미결정
- Obsidian 섹션 모바일 반응형 미확인 (양옆 배치 375px)

## AI System 섹션 아키텍처 (참고)
- 콘텐츠 소스: `src/content/AI_WORKFLOW_KO.md` (실제 렌더링에 사용 안 됨, 요약본)
- 실제 데이터: `src/ui3/components/aiWorkflowData.ts` ← **수치 수정 시 여기만 건드릴 것**
- 렌더러: `src/ui3/components/AiWorkflowSection.tsx` (UI 로직만 담당)
