# UI Polish Plan — R3 코드 반영 후
> 2026-03-19 | 7개 순차 수정, 하나씩 확인

## 진행 상태

| # | 수정 | 상태 | 변경 내용 |
|---|---|---|---|
| 1 | 여백 축소 | ✅ 완료 | section padding 120→56px, hero 90→70vh, 모바일 60→40px |
| 2 | 타이포 위계 | 🔄 진행중 | 섹션 라벨 11→13px 완료. ProseBlock 첫 문단 17→20px, 본문 간격 16→20px 아직 미적용 |
| 3 | Hero 강화 | ⬜ | subtitle 크기 키우기 |
| 4 | 섹션 구분 | ⬜ | 여백 리듬 또는 배경색 교차 |
| 5 | Now 구조감 | ⬜ | Memory/Flow/Loop 시각 차별화 |
| 6 | TOC 위치 | ⬜ | 수직 중앙 또는 top:30% |
| 7 | TOC 밀도 | ⬜ | Work/Now 하위항목 기본 접힘 |

## 수정 중 파일
- `src/portfolio/portfolio.css` — 여백, 타이포, TOC
- `src/portfolio/index.tsx` — ProseBlock, NowSubsection, Hero 컴포넌트

## ProseBlock 수정 계획 (2번 나머지)
- 첫 문단: fontSize 17→20, fontWeight 500→600
- 본문 간격: marginBottom 16→20
- 위치: index.tsx line 256-273

## NowSubsection 라벨 (5번)
- 현재: fontSize 11, ANTHROPIC 색
- 계획: 크기 키우거나 좌측 보더 추가
- 위치: index.tsx line 276-292

## 참고
- 화살표(→) CSS에서 제거 완료 (.p12-label::before content: none)
- How It Works h2 제거 완료
- SectionLabel 전 섹션 번호+이름 복원 완료 (01~07)
- 코드 전체 재작성은 subagent가 수행 (빌드 성공 확인)
