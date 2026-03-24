# 교훈: CSS 한 줄이면 되는 걸 구조를 뒤집었다 (2026-03-24)

## 상황
- "시작" 섹션 안에 두 개의 동등한 제목("Claude의 세계", "더 큰 컨텍스트 윈도우가 답은 아니었다")을 넣고 싶었다
- 타이포그래피 통일 + 사이 구분선 제거 + 간격 통일이 필요했다

## 삽질 경로
1. 섹션 2개로 분리 → eyebrow 중복, 구분선 문제
2. continuation 로직 추가 (sameGroupAsNext, continuationOfPrev) → padding 계산 틀림
3. CSS에 .wd-continuation 클래스 추가 → margin-top: 0이 의미 없음
4. 다시 1개 섹션으로 합침 → ### heading으로 → 타이포 안 맞음
5. **bold**로 → 위계 안 맞음
6. 다시 ### SectionTitle 2개 → 파서는 동작했으나 간격 문제 남음
7. 또 섹션 분리 시도 → 다시 합침 → 반복

## 정답
```css
.wd-section-header ~ .wd-section-header { margin-top: 36px; }
```
CSS 1줄.

## 교훈
- **문제를 정확히 진단하기 전에 구조를 건드리지 마라**
- 렌더링 문제는 렌더링 레이어(CSS)에서 해결한다. 마크다운 구조, 파서, 컴포넌트 로직을 건드리는 건 마지막 수단
- "안 맞아" → 바로 구조 변경이 아니라, 먼저 DOM 확인 → CSS 확인 → 최소 수정
- Playwright로 실제 렌더링 확인을 처음부터 했으면 5분 안에 끝났다
