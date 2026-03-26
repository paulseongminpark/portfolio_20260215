# Portfolio CHANGELOG

## 2026-03-26

### 다이어그램 도식 시스템 구축 + D1~D5 + CE 7개
- .impeccable.md: 디자인 컨텍스트 (브랜드 깊이·절제·친근, 토큰, draw.io 레퍼런스 기반)
- diagramTokens.tsx: 공유 토큰 (색상, 타이포, 간격) + DiagramContainer
- diagramPrimitives.tsx: Primitive System v1 — Shape(4) + CardNode + Edge + FanOut + Band + GroupBox + Label + Legend
- Diagram1: 타입 팽창 그래프 (네트워크 노드 27개, 엣지 36개, 타임라인)
- Diagram2: 0.057 (타이포그래피 + 스케일 바 + 바운스 화살표)
- Diagram3: 타입 수렴 52→15 (산만 클러스터 → 3 Tier 정돈)
- Diagram4: 6레이어 성숙 지도 (수직 스택, 방화벽 경계, 뇌과학 2구간)
- Diagram5: 3중 검색 아키텍처 (수평 3레인 병렬 → RRF 합류 → Hebbian 피드백)
- CE 다이어그램 1~7: Gemini 작성분 통합 (WorkDetailBlocks 라우팅 연결)
- WorkDetailBlocks: D2~D4 import + 라우팅 추가, placeholder 블록 타입 추가

### PMCC 상세 페이지 UI 전면 개선
- VisualCuesGallery: FadeSlot 다중 이미지 순환, 팔레트 합성 이미지, 캡션 페이드 애니메이션
- 라이트박스: 순환 네비게이션, body overflow 보정, 배경 불투명도 0.95, pointer-events 수정
- GridScrubSlider: 2x2 그리드 → 1행 와이드 스트립(1200px), VCG 스타일 라이트박스 통일
- 로고 이미지 8,9 크기 1400x1049로 크롭 (슬롯 비율 통일)
- PMCC grouped TOC 추가 (문제/해결/변화/정리 4그룹), section-title eyebrow 앵커 id 자동 부여
- 섹션 구분선 제거, 마크다운 이스케이프 따옴표 수정, TOC 하단 스크롤 추적 보정

## 2026-03-25

### MCP-Memory 상세 텍스트 확장 + 갤러리 로직 개선
- MCP_MEMORY_DETAIL_KO.md: TOC 섹션(카드 4장) 신규 추가, 노드 수 4685→4962 갱신
- SectionTitle desc 제거→본문 통합, 저장 구조 상세 설명(36필드, 의미 라우터) 추가
- WorkDetailBlocks.tsx: PMCC_GALLERY_FILES 명시 배열로 전환, tech-review 폴더 매핑, 빈 src 방어
- PMCC_DETAIL_KO.md: pmcc_add1.webp, pmcc_add2.webp 갤러리 이미지 추가
- 파이프라인 문서 정리: paul-rewrite, CE final MD에 통합 후 삭제

### 메인 카드 섹션 호버 슬라이드 디자인 전면 개편
- 6개 카드 3열 그리드 통합 (2열→3열, aspect-ratio 20/17)
- 호버 슬라이드 디자인: 기본(제목 가운데+태그), 호버(패널 슬라이드업+설명)
- CE/MCP/TR 카드 이미지 교체 (오버레이 제거, 이미지 직접 노출)
- MCP-Memory 대소문자 통일 (TOC·카드·상세 페이지)
- CE/MCP 상세 hero 오버레이 정리
- Selected Work h2 제거

## 2026-03-24

### Context Engineering 상세 페이지 추가
- CONTEXT_ENGINEERING_DETAIL_KO.md: 시작(2) + 설계(3) + 실체(1) + 강화(2) = 8섹션
- WorkKey, 그래디언트(오렌지), 메타데이터, ceToc, 카드 clickable
- 파이프라인 23_context-engineering: 글감수집, handoff, drafts v1-v2, diagram-specs, final, lesson
- CSS: 같은 섹션 내 연속 section-header 간격 통일 (.wd-section-header ~ .wd-section-header)

## 2026-03-23

### Paul 리라이트 + 다이어그램 12개 스펙
- 14_paul-rewrite-0323.md: 온톨로지 페이지 최종 텍스트 (시작+설계+강화)
- 13_diagram-specs.md: 다이어그램 12개 상세 스펙 (내용/시각톤/크기)
- 강화 재구성: 업계 맥락 → LLM UX → 조직 적용 → 닫기
- 닫는 문장: "내가 구조를 만들고, 구조가 나를 만든다. 여기서부터가 시작이다."

### 다이어그램 초안 + 자동교체 구조
- Diagram1(타입 팽창), Diagram5(3중 검색) React SVG 컴포넌트 생성
- WorkDetailBlocks: `[다이어그램 N` 패턴 감지 → 컴포넌트 자동 교체 구조
- 디자인 토큰 확정: 크림 카드 #f8f6f3, 연파랑+연노랑 박스, 테라코타 악센트
- 레퍼런스 매핑: 5,6,7,8=플로우차트 / 9=2×2 / 2=임팩트 숫자

### Hero 프로필 사진 + Work 카드 그라데이션 + TOC/레이아웃 통일
- Hero: 프로필 사진 추가 (원형 252px), 100vh 풀스크린, padding-top 196px
- Work 카드: mcp-memory 블루, CE 주황, Tech Review 퍼플-피치 메쉬 그라데이션
- TOC: 메인/상세 200px 통일, Work 기본 펼침, 스크롤바 숨김
- 상세 페이지: 동적 TOC + 스크롤 하이라이트, 전 페이지 통일
- CSS: eyebrow 13px, paragraph #333, 본문 maxWidth 800px 가운데 정렬
- mcp-memory 상세 헤더: 블루 메쉬 그라데이션 배경 + 흰색 텍스트

## 2026-03-22

### 온톨로지 상세 페이지 전면 재작성 + 메인페이지 업데이트
- Hero 태그라인: "I design knowledge structures that make AI reason better."
- Work mcp-memory 설명 교체 + 숫자 4,685 반영
- Now Memory 숫자 4,685 업데이트
- Forward "같은 구조가 조직의 의사결정 기억이 될 수 있다고 생각한다" 추가
- MCP_MEMORY_DETAIL_KO.md: 6섹션 케이스스터디 → 15섹션 4페이지(시작·설계·실체·강화)
- WorkDetail.tsx: mcp-memory 전용 fixed left sidebar TOC 추가
- WORK_META: period 2026, stats 4685/25/4368, tools 업데이트
- 파이프라인 문서: Opus 매핑, 전체 스펙, 최종 결정, Opus 초안 v1

## 2026-03-20

### mcp-memory 상세 페이지 + Work clickable + Journey 리라이트
- mcp-memory Work 카드 clickable 전환 (hover 효과 + "자세히 보기 →")
- MCP_MEMORY_DETAIL_KO.md 콘텐츠 작성 + work.ts/WorkDetail.tsx/index.tsx 연결
- Journey 텍스트 리라이트 (Claude Code 첫 만남 → 아이디어 실험 → 도구 커스터마이징 서사)
- AiWorkflowSection/E2EWorkflowSection 구조 정리 + 텍스트 축소
- aiWorkflowData.ts 데이터 업데이트
- 파이프라인 index + Ideation R3 문서 갱신

## 2026-03-19

### UI 폴리싱 + 텍스트 서사 강화
- 타이포 위계: 훅 15px/600 + PMCC 주황 하이라이트, 본문 15px/400
- 섹션 구분: borderTop 제거, 비대칭 패딩 (48/16), 본문 간격 6px
- TOC: 폰트 확대, 하위항목 기본 접힘+스크롤 자동 펼침
- Now 서브라벨: 주황 하이라이트 통일
- 텍스트: Why 마지막 문장, Journey/Forward 훅 분리, Work 서사 전환
- About/Now/Forward 문장 강화

## 2026-03-17

### How I AI v6.0 콘텐츠 갱신 (미커밋)
- Evolution 3막 전체 재작성: "만들수록 좁아졌다" / "포스트잇 한 장" / "잊혀도 괜찮다"
- Before+After 4→3문단 재구성 (전환을 한 호흡에)
- HOW_CONCEPTS v6: 맥락이 이어진다 / 시스템이 자기를 안다 / 사고가 실행이 된다
- ParallelDiagram v6: Direction → Guards/Skills/Workers → Claude(orchestrator) → Output → Measure
- Cycle 텍스트 v6: 시스템이 자기 상태를 측정하고 먼저 말한다
- System 텍스트 v6: Guards + Skills + Workers 3 + 자기 측정 + 세션 간 감지
- E2E Workflow 9개 Phase v6 갱신 (삭제된 에이전트 → Claude/Skills/Workers)
- 시스템에 대하여 v6: 규칙 생명주기 + "Claude의 세계를 설계하는 것"
- Closing: "다음 장이 있다"
- How I Think 4카드: 원칙 수준으로 정리 (구현 디테일 제거)
- GrowthDiagram: Cycle → Week 레이블
- 파이프라인: 04_v6-portfolio-update_0317 (Ideation R1)
- 체크포인트: git tag `pre-v6-update`

### 발견된 구조 문제
- How I Think / How I Work / How I Build / How I AI 이름 겹침 → 재설계 필요
- Option A(합치기) 방향 선호, 별도 아이디에이션(R2)

---

## 2026-03-04 (세션2)

### GitHub Actions + Vercel 빌드 수정
- SYSTEM_ITEMS list 데드코드 TS6133 에러 3개 제거
- Vercel 빌드 성공 확인, GitHub Pages 배포 정상화
- commit b0c3555

### .worktrees 구조 재편
- 03_claude (claude/portfolio 브랜치) 추가 — P1~P3 구조 실험 전용
- 01_codex / 02_gemini: master 동기화 유지
- _sandbox: node_modules 잠금 폴더만 남음 (정리 미완료, Windows cmd.exe 필요)

### P1~P3 섹션 구조 변경 (claude/portfolio 브랜치)
- 02·How I Think: 4카드만 (Governance 제거)
- 03·How I Build: HOW I AI + Ontology placeholder + Obsidian placeholder
- 04·Work / 05·Writing (TR 통합) / 06·Contact
- Nav 6항목으로 정리, TOC 업데이트
- PR 5174 검토 중

### 미결 A~F 트래킹
- docs/design/2026-03-04-portfolio-full-audit.md 섹션 6에 A~F 항목 명시

---

## 2026-03-03

### How I Operate 전면 재작성
- 기존 추상 프레임워크(Time/Sensation/Relation) → 외부 메모리 시스템 기반 4원칙 카드
- Connection / Context as Currency / Structure over Willpower / Governance
- parseSystemContent 제거, SYSTEM_ITEMS 하드코딩, TOC 5→4개
- 커밋: 6fab97d

---

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
