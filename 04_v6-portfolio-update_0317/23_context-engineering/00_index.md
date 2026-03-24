<!-- pipeline: context-engineering-detail | type: build-only | mode: standard | status: ACTIVE -->
<!-- phase: build | updated: 2026-03-23T22:30 -->
<!-- current_task: 초안 작성 완료, 글감 수집 완료 | next: 글감 기반 본문 보강 -->

# Context Engineering 상세 페이지

> 시작: 2026-03-23 | 포트폴리오 04_v6 내 병렬 작업

## 현재 상태
- [x] 코드 변경 완료 (work.ts, WorkDetail.tsx, index.tsx)
- [x] 마크다운 초안 작성 (CONTEXT_ENGINEERING_DETAIL_KO.md)
- [x] TOC 구조 확정 (시작/설계/실체/강화, mcp-memory 패턴)
- [x] 5개 시스템 전체 파일 읽기 (01, 08, 09, 10, 11)
- [x] mcp-memory recall 완료 (45개 노드)
- [ ] 본문 보강 (글감 기반)
- [ ] 다이어그램 스펙 확정
- [ ] 빌드 확인

## 소스 파일
- `src/portfolio/content/CONTEXT_ENGINEERING_DETAIL_KO.md` — 본문
- `src/portfolio/content/work.ts` — WorkKey 추가
- `src/portfolio/components/WorkDetail.tsx` — 메타 + TOC + 그래디언트
- `src/portfolio/index.tsx` — 라우팅 + 카드 활성화

## 글감 출처
- 01_orchestration: STATE.md, KNOWLEDGE.md, pre-flight-recall.md, 체인 규칙
- 08_documentation-system: phase-rules.json, foundation/ 3축, phase-guide.md
- 09_context-cascade-system: foundation/ 3축, 3개 파이프라인 92개 파일
- 10_index-system: cli.py, scanner.py, graph.py, INDEX.md
- 11_user-guide: 00_final-output.md, 포스트잇 v2.0
- mcp-memory: CE 관련 45개 노드 (4-Layer, Gate, Compact, Lens)
