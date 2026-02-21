# UI Lab — 포트폴리오 레이아웃 실험

_Updated: 2026-02-22 (07~10 추가)_

## 개요

포트폴리오 본 작업(W6) 착수 전, 다양한 UI 방향을 실험하는 플레이그라운드.
`04_monet-lab` (Vite + React + Tailwind CSS 4 + shadcn + Framer Motion) 에서 실행.

실험 환경: `C:\dev\01_projects\04_monet-lab` | 로컬: `http://localhost:5174`

---

## 실험 목록

### 기반 레이아웃 (01~06)

| ID | 컨셉 | 배경 | 타이포 | 상태 |
|----|------|------|--------|------|
| [[ui-lab/01-06-layouts#page-01\|01]] | 에디토리얼 다크 | #0f0f0e | Noto Serif KR + DM Mono | ✅ |
| [[ui-lab/01-06-layouts#page-02\|02]] | OpenAI Minimal | #ffffff | Instrument Sans | ✅ |
| [[ui-lab/01-06-layouts#page-03\|03]] | Anthropic Warm | #f9f6f0 | Libre Baskerville + DM Sans | ✅ |
| [[ui-lab/01-06-layouts#page-04\|04]] | Vercel/Linear Dark | #000000 | IBM Plex Mono + IBM Plex Sans | ✅ |
| [[ui-lab/01-06-layouts#page-05\|05]] | 에디토리얼 Warm | #fdf8f3 | DM Sans + 오렌지 액센트 | ✅ |
| [[ui-lab/01-06-layouts#page-06\|06]] | Warm Minimal Grid | #f5f0eb | DM Sans | ✅ |

### 02 계열 — OpenAI Minimal 변형

| ID | 레이아웃 방식 | 핵심 선택 |
|----|-------------|---------|
| [[ui-lab/02-series#2-a\|2-a]] | 좌측 고정 앵커 인덱스 + 우측 스크롤 | 긴 페이지 방향감 |
| [[ui-lab/02-series#2-b\|2-b]] | 풀스크린 스냅 스크롤 (01/05 카운터) | 섹션 독립성 |
| [[ui-lab/02-series#2-c\|2-c]] | 타이포 크기 대비 전면 | 시각적 임팩트 |
| [[ui-lab/02-series#2-d\|2-d]] | 카드 그리드 + 고정 헤더 | 스캐너빌리티 |
| [[ui-lab/02-series#2-e\|2-e]] | 좌검정 고정 / 우흰 스크롤 스플릿 | 아이덴티티 고정 |

### 03 계열 — Anthropic Warm 변형

| ID | 레이아웃 방식 | 핵심 선택 |
|----|-------------|---------|
| [[ui-lab/03-series#3-a\|3-a]] | 잡지 커버 다크 히어로 + 크림 전환 | 강렬한 첫인상 |
| [[ui-lab/03-series#3-b\|3-b]] | 타임라인 (오렌지 원형 마커) | 경력 흐름 시각화 |
| [[ui-lab/03-series#3-c\|3-c]] | 벤토 그리드 (12컬럼 모자이크) | 현대적 대시보드 |
| [[ui-lab/03-series#3-d\|3-d]] | 좌측 Warm 사이드바 | 문서/앱 레이아웃 |
| [[ui-lab/03-series#3-e\|3-e]] | 블로그 아티클 (max-width 720px) | 가독성 최우선 |

### 퓨전 계열 (07~10) — OpenAI × Anthropic

| ID | 컨셉 | 배경 | 타이포 | 상태 |
|----|------|------|--------|------|
| 07 | Warm Index — 팔레트 퓨전 | #f9f6f0 | Libre Baskerville + Instrument Sans | ✅ |
| 08 | Warm Card Grid — 팔레트 퓨전 | #ffffff + 카드 #f9f6f0 | Libre Baskerville + Instrument Sans | ✅ |
| 09 | Quiet Precision — 제3의 미학 | #fafaf8 | Playfair Display + Inter | ✅ |
| 10 | Deep Warm — 제3의 미학 | #1c1713 | Cormorant Garamond + DM Sans | ✅ |

---

## 다음 스텝

- [ ] 07~10 스크린샷 캡처 → `portfolio/public/lab/`
- [ ] 07~10 중 W6 최종 레이아웃 후보 선정
- [ ] 선정된 레이아웃 → 포트폴리오 본 작업에 적용 (W6)

## 관련

- [[01_projects/02_portfolio/context/STATE|Portfolio STATE]]
- [[01_projects/04_monet-lab/src/experiments|실험 소스]]
