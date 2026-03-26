<!-- pipeline: v6-portfolio-update | type: custom | mode: standard | status: ACTIVE -->
<!-- phase: build | updated: 2026-03-26T16:30 -->
<!-- current_task: PMCC 상세 페이지 UI 개선 완료 | next: CE 다이어그램 7개, Tech Review 상세 페이지, Hero 텍스트 -->

# v6.0 Portfolio Update
> 시작: 2026-03-17 | 타입: custom | 모드: 정식

## 목표
포트폴리오 전면 재설계 — "이 사람이 뭘 하고 있는지, 무슨 사람인지" 전달

## Phase 상태
| Phase | 폴더 | 상태 |
|---|---|---|
| Ideation R1 | 20_ideation-r1/ | ✅ 방향+톤+콘텐츠 확정 |
| Ideation R2 | 21_ideation-r2/ | ✅ 섹션 구조 재설계 + 텍스트 교체 코드 반영 완료 |
| Ideation R3 | 22_ideation-r3/ | ✅ 전면 재설계 — 서사 구조 + 전체 텍스트 초안 완성 |
| Build | 코드 반영 | ✅ 서사 구조 + 텍스트 + 상세 페이지(mcp-memory, CE) 구현 완료 |
| Build | PMCC UI | ✅ VCG 순환 라이트박스, 갤러리 와이드 스트립, grouped TOC, 구분선 제거 |
| Build | 다이어그램 | 🔄 다이어그램 1,5 초안 완료. CE 7개 + ontology-cosmos 임베드 진행중 |

## 확정 구조 (R3 — R2를 전면 대체)
```
(Hero)         — 이름 + 한 줄 (전체 글 완성 후 마지막에 결정)
01 · About     — 이 사람이 세상을 어떻게 보는가
02 · Why I Build — 왜 만들게 됐는가 (문제의 경험)
03 · Journey   — 어떻게 여기까지 왔는가 (가장 긴 섹션)
04 · Work      — 뭘 만들었는가 (6개 카드)
05 · Now       — 지금 어떻게 돌아가는가 (시스템 구조)
06 · Forward   — 어디로 가는가
07 · Contact
```
순서 원칙: 사람 → 문제 → 여정 → 결과 → 현재 → 방향

## R3 핵심 결정

### 구조 전환
- R2의 6섹션(About/Work/System/Inside/Thinking/Contact) **전면 폐기**
- 조직 원리: 주제별 카탈로그 → **서사 순서** (연속 스크롤)
- 각 섹션이 Paul에 대해 **서로 다른 질문**에 답한다 (같은 질문 반복 금지)

### 반복 근절
- "맥락이 사라진다" → Why I Build에서만 1회
- mcp-memory → Work에서만 1회
- 4-Layer → Work에서만 1회
- 세 축(기억/운영/경계) → Now에서만 1회
- 24→15→3 → Journey에서만 1회

### 섹션별 스펙
- **About**: 배경, 감각, AI 포지셔닝 1문장. 프로젝트명/기술명 없음.
- **Why I Build**: 문제만. 해결책 없음. GPT 초안 "Before" 활용. 사이트 유일의 문제 진술.
- **Journey**: 가장 긴 섹션. GPT 초안 Evolution 4막 확장. 원칙은 이야기 안에서 도출. 시스템 아키텍처 상세 없음.
- **Work**: 6카드 통일 톤. Journey가 맥락을 깔아놨으므로 동기 설명 불필요. 카드 = 핵심+방식+결과 각 1줄.
- **Now**: 시스템 구조 유일 등장. 세 축 + 루프 + 다이어그램 2개.
- **Forward**: 1-2문단. "생각이 죽지 않게 만드는 조건"은 여기서만.
- **Hero**: 전체 글 완성 후 마지막에 결정.

### Journey before Work (순서 결정 근거)
- Journey가 Paul의 가장 강한 재료 — 일찍 투입
- Journey를 읽은 후 Work 카드가 "결과물"로 읽힌다
- Work 카드가 스스로 여정을 설명할 필요 없어짐 → 반복 구조적 불가

### AI capability 표현
- Origin에서 렌즈 세팅: "AI를 쓰는 게 아니라 AI가 작동하는 조건을 만든다"
- Work에서 증명: 프로젝트 자체가 AI depth를 보여줌
- 별도 "AI Skills" 섹션 없음 — 읽다 보면 알게 되는 구조

### 시각화 방법론 (글 완성 후 적용)
- 후보: 밀도 변화, 삭제 시각화, 타이포 스케일, 주석 레이어, 숫자 기념비, 병치
- **1-2개만 선택** (과잉 적용 금지)
- 글을 먼저 쓰고, 텍스트 위에 시각 기법을 얹는 순서

### 이전 결정 유지
- 톤: GPT 초안 톤 계승 (1인칭 연속 서사)
- 목적: "이 사람이 어떤 사람인지 보여주는 글"
- 다이어그램 2개 (STRUCTURE + CYCLE) — Now 섹션용

### 이전 결정 폐기
- ~~순서: What→How→Why~~ → 사람→문제→여정→결과→현재→방향
- ~~섹션 이름: 한 단어 영어~~ → 구/절 허용 (Why I Build)
- ~~System/Inside/Thinking 분리~~ → Journey + Now로 흡수
- ~~About에서 시스템 3개 소개~~ → About에 프로젝트명 없음

## Pending
- [x] 섹션별 텍스트 작성 (About → Why I Build AI → Journey → Work → Now → Forward)
- [x] Work 카드 detail 페이지 — mcp-memory, CE 상세 완료
- [x] 코드 반영 — 서사 구조, Hero, TOC, 상세 라우팅 등 다수 커밋
- [x] 다이어그램 1, 5 초안
- [ ] Hero 텍스트 최종 결정
- [ ] CE 다이어그램 7개
- [ ] ontology-cosmos → mcp-memory 실체 섹션 임베드 (ideation 중)
- [ ] Tech Review 상세 페이지

## 체크포인트
- git tag: `pre-v6-update` (commit 12372df) — 롤백 포인트
- 최근 커밋: b0543d4 (2026-03-26) — PMCC 상세 UI 전면 개선
