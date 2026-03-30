# portfolio STATE
_Updated: 2026-03-29_
_Last Session: 2026-03-29 — El Croquis 디자인 시스템 전면 적용 (D1~D16 재설계 + 신규 4개) + Findings 섹션 신규 (SVG 커버 + PDF 12종) + TS 빌드 에러 수정._

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
- **완료: GitHub Actions + Vercel 빌드 실패 수정** (2026-03-04)
  - TS6133 데드코드 제거 (미사용 import/변수)
  - Vercel 빌드 성공, GitHub Pages 배포 정상
  - commit b0c3555
- **완료: .worktrees 구조 재편** (2026-03-04)
  - 03_claude (claude/portfolio) 브랜치 추가
  - codex/gemini 마스터 동기화 (worktree 동일 유지)
  - _sandbox 정리 (node_modules 잠금 폴더만 남음)
- **완료: P1~P3 섹션 구조 변경** (2026-03-04)
  - 6섹션 구조 구현 (About/How I Think/How I Build/Work/Writing/Contact)
  - 이전 구조 비교 문서: docs/design/2026-03-04-portfolio-full-audit.md (416줄)
  - claude/portfolio 브랜치에서 진행, 풀 리퀘스트 5174 검토 중
- **완료: v1.0-clean 구조 정리** (2026-02-28)
  - experiments/page-12 → portfolio 구조 리네이밍
  - TS6133 빌드 에러 수정 (미사용 import/변수 제거)
  - 미사용 파일 76건 삭제 (lab/, _archive/, App.css 등, CSS 32→25KB)
  - deploy.yml: vercel.json을 gh-pages에 포함하여 Vercel 빌드 차단 해결
  - 태그 `v1.0-clean` (3eac345) — 롤백 고정점
- **완료: AI System v4.0 이식** (2026-02-28)
  - monet-lab v4.0 → portfolio 전면 이식 (4개 파일)
  - 16섹션 대시보드 → 8섹션 내러티브 ("Context as Currency")
  - 에이전트 16→15, 스킬 17→9, 훅 9→8, MCP→4 AI Tools
- **완료: Obsidian 섹션 v4.0 재작성** (2026-03-01)
  - 5섹션 역순 공개 구조: Hook → Architecture → Problem → Evolution → Lessons
  - EVOLUTION v4.0까지 확장, Cross-CLI 그래프 노드/엣지 추가
  - Impact을 Hook으로 이동, /catchup Before/After 제거
- **완료: Multi-AI Orchestration 섹션 테이블 리팩토링** (2026-03-02)
  - 2x2 카드 레이아웃 → 4컬럼 테이블 레이아웃으로 전환
  - PNG "Model Capability Benchmarks" 이미지를 코드(테이블)로 변환
  - aiWorkflowData.ts: AiRole 인터페이스에 strengthSub, limitSub 필드 추가
  - .gitignore: _sandbox/ 추가, git 추적 파일 정리 (git rm --cached)
  - Perplexity role: '' → '리서치 엔진' 명시
- **완료: PMCC_DETAIL_KO.md 콘텐츠 개정** (2026-03-02)
  - 논리 흐름 전면 재검토 — 13개 수정 지시 반영
  - flowchart Overview → Approach 뒤로 이동, Design Principle 헤딩 제거
  - Gallery Dataset 뒤로 재배치
  - 전체 표현 평이화 (물리적/심리적→몸/마음, 수평적→편한, 분해→들여다봤습니다 등)
- **완료: 포트폴리오 섹션 전면 리라이트** (2026-03-02)
  - Obsidian: 10→5 섹션 구조 재편, Bedford 스타일 파일 구조 다이어그램, 텍스트 품질 재작성
  - E2E Workflow: 8→10 Phase 확장, React Flow→vanilla 전환, 자연어 리라이트
  - index.tsx: 타이포그래피 위계 정리, sticky 헤더, TOC 업데이트
- **완료: E2EWorkflowSection 헤더/배경 분리** (2026-03-04)
  - 헤더(Context Flow, End-to-End Workflow 제목) → 흰색 배경
  - 01~10 Phase nav + LargeBox 영역만 파란색(#6A9BCC) 유지
- **완료: Key Decisions 3가지 레이아웃 sandbox 제작** (2026-03-04)
  - V1: Before/After 투톤 분할 카드 (→ 화살표)
  - V2: Accordion (클릭 시 펼침, + 회전 애니메이션)
  - V3: Narrative-first — Why가 주인공, Before→After 취소선+보조
- **완료: 전체 섹션 구조 재편 설계** (2026-03-04)
  - 6섹션 구조 확정: 01 About / 02 How I Think / 03 How I Build / 04 Work / 05 Writing / 06 Contact
  - 4카드 타이틀 변경 (commit 392e724)
  - audit 문서: docs/design/2026-03-04-portfolio-full-audit.md (416줄)
  - mcp-memory checkpoint: node #4057~#4059
- **완료: mcp-memory Work 상세 페이지 연결** (2026-03-20)
  - MCP_MEMORY_DETAIL_KO.md 콘텐츠 작성
  - work.ts WorkKey에 mcp-memory 추가, WorkDetail/index.tsx 라우팅 연결
  - Work 카드 clickable 속성 추가 (hover + "자세히 보기 →")
- **완료: Journey 텍스트 리라이트** (2026-03-20)
  - Claude Code 첫 만남 → 아이디어 실험 → 도구 커스터마이징 서사 강화
- **완료: AI Workflow/E2E 구조 정리** (2026-03-20)
  - AiWorkflowSection 텍스트 축소, E2EWorkflowSection 정리, aiWorkflowData 업데이트
- 진행중: PR 5174 검토 및 병합 (6섹션 구조 마지막 단계)
- 진행중: 미결 A~F 목록 추적 (docs/design/2026-03-04-portfolio-full-audit.md 섹션 6)
- **완료: HOW I AI 섹션 Evolution 전면 재작성** (2026-03-04)
  - 인터뷰 기반 3주 타임라인 재구성 (질문 중심: "뭘 더?"/​"이게 뭘?"/​"이건 결국?")
  - TimelineItem 타입 변경: phase/question/body[] 구조
  - UI: 3칸 수평 그리드 → 세로 스택 + 질문 강조(21px bold)
  - 시스템에 대하여: opencode 제거, 하네스 도구/agent engineering OS 맥락으로
  - 인터뷰 원본 저장: docs/evolution-interview-2026-03-03.md
- **완료: How I Operate 섹션 전면 재작성** (2026-03-03)
  - 기존 추상 프레임워크(Time/Sensation/Relation) 5카드 → 외부 메모리 시스템 기반 4원칙 카드
  - 4원칙: Connection / Context as Currency / Structure over Willpower / Governance
  - parseSystemContent 함수 제거, SYSTEM_ITEMS 하드코딩
  - TOC 5→4, subtitle 교체
  - "이색적인 접합" 4번 카드 제거 — show vs tell 원칙

## 최근 결정
- 2026-03-29: CE 다이어그램 1~7 + CEFolderPath El Croquis §12 전면 재설계 — DiagramContainer 제거, 8개 고유 형식, CE6=Foundation Plan, CE7=Double Helix
- 2026-03-29: El Croquis 디자인 시스템 전면 적용 — D1~D16 재설계 + ContextDiptych/CEScaleDiptych/Diagram16/CEFolderPath 신규
- 2026-03-29: Findings 섹션 신규 추가 — El Croquis 인라인 SVG 커버 + memory-ontology PDF 11종 + linguistic-llm-ontology PDF 1종
- 2026-03-25: MCP-Memory 상세 TOC 카드 4장 추가, 노드 수 4962 갱신, 저장 구조 상세 설명 추가
- 2026-03-25: WorkDetailBlocks 갤러리 로직 — PMCC_GALLERY_FILES 배열 전환 + tech-review 폴더 매핑 + 빈 src 방어
- 2026-03-25: PMCC 갤러리 이미지 2장 추가 (pmcc_add1.webp, pmcc_add2.webp)
- 2026-03-20: mcp-memory Work 카드만 clickable (CE/Tech Review는 상세 미작성 → clickable: false)
- 2026-03-20: Journey 텍스트 리라이트 — 추상적 묘사 → 구체적 행동 서사 전환
- 2026-03-09: Writing > Tech Review 전면 재설계 — B(스토리텔링) 구조 채택
  - TR_SYSTEM_KO.md 재작성 — 3소스(Perplexity/Twitter/YouTube) 중심으로
  - TechReviewSystemSection.tsx 전면 재작성 — 화려한 색상 카드 제거, SystemAccordion 패턴만
  - index.tsx 순서 재배치: Problem → 3소스 SectionFlowGrid → 피드 → StatsBar(수치) → Decisions/Ongoing
  - StatsBar 값 교체: 매일/Jekyll/자동/API → 100+Posts/3Sources/KO·EN/~$3
  - TechReviewMultiSource @author 배지 fontFamily: "inherit" (포트폴리오 시스템 폰트 통일)
- 2026-03-04: GitHub Actions/Vercel 빌드 수정 — TS6133 데드코드 제거, b0c3555 커밋
- 2026-03-04: .worktrees 구조 재편 — 03_claude 추가, codex/gemini 동기화, _sandbox 정리
- 2026-03-04: P1~P3 섹션 구조 변경 완료 — 6섹션 구조 구현, PR 5174 검토 중, audit doc 기록
- 2026-03-04: 6섹션 구조 확정 — About/How I Think/How I Build/Work/Writing/Contact. TR→Writing 이동, Obsidian 축소, 온톨로지 자리 확보
- 2026-03-03: How I Operate 전면 재작성 — 추상→원칙, 5→4카드, Direction B(원칙→구현 하나의 이야기)
- 2026-03-04: HOW I AI Evolution 전면 재작성 — 인터뷰 기반 3주 타임라인, 질문 중심 UI, 인터뷰 원본 저장
- 2026-03-04: E2EWorkflow 헤더/파란배경 분리, Key Decisions sandbox 3종 (V1투톤/V2아코디언/V3내러티브)
- 2026-03-02: Multi-AI Orchestration 테이블 리팩토링 — 2x2 카드→4컬럼 테이블, PNG→코드 변환, AiRole 인터페이스 확장, _sandbox/ gitignore
- 2026-03-02: 포트폴리오 섹션 전면 리라이트 — Obsidian 10→5, E2E 8→10 Phase, 타이포그래피 위계
- 2026-03-02: PMCC_DETAIL_KO.md 개정 — 논리 흐름 재구성, 13개 지시 반영, 표현 평이화
- 2026-03-01: Obsidian 섹션 v4.0 재작성 — 5섹션 역순 공개, Cross-CLI 블록 신규, Jeff Su 용어 제거
- 2026-02-28: AI System v4.0 이식 — monet-lab 코드 기반, 내러티브 케이스스터디 구조
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
