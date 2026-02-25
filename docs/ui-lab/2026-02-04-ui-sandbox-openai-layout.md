# 2026-02-04 AI 로그 (ChatGPT) — Portfolio UI Sandbox (OpenAI About 레이아웃)

## 오늘의 컨텍스트

- **작업 주제**: Portfolio UI Sandbox 레이아웃 실험
- **사용한 AI**: ChatGPT + Claude Code
- **작업 목적**: OpenAI /about처럼 TOC 고정 + 메인 중앙 반응형 + 80% 줌에서도 균형
- **프로젝트 경로**: `C:\dev\portfolio_ui_sandbox`
- **기술 스택**: Vite + React + TypeScript + TailwindCSS v4

## 주요 질문 / 문제

1. **TOC가 중앙으로 따라오는 문제**
   - 초기 구현: TOC와 메인 모두 중앙 컨테이너(max-w-[1200px]) 안에 그리드로 배치
   - 결과: TOC가 viewport 왼쪽이 아니라 컨테이너 왼쪽에 붙어서 브라우저 폭 변경 시 따라 움직임

2. **80% 줌에서 글/카드가 과하게 커 보이는 문제**
   - H1: 32-52px 범위로 스케일 → 80% 줌에서도 과도하게 큼
   - 섹션 타이틀: 28-36px → 여전히 과하게 느껴짐
   - 카드 패딩(p-8/p-10)과 섹션 간격(64-96px)도 과도

3. **스크롤 끝까지 내려도 TOC active가 Resume/Contact로 안 내려가는 문제**
   - IntersectionObserver 임계값을 넘기기 위한 하단 스크롤 공간 부족
   - 마지막 섹션들이 절대 "active" 상태에 도달할 수 없음

## AI의 핵심 응답 요약

### 1. TOC 고정 구조 변경
```tsx
// Before: 중앙 컨테이너 안에 그리드
<div className="max-w-[1200px] mx-auto">
  <div className="grid lg:grid-cols-[260px_1fr]">
    <aside>TOC</aside>
    <main>Content</main>
  </div>
</div>

// After: TOC는 viewport 기준, 메인만 중앙
<div className="flex">
  <aside className="w-64 sticky top-16 flex-shrink-0">TOC</aside>
  <div className="flex-1">
    <main className="mx-auto max-w-[840px]">Content</main>
  </div>
</div>
```

### 2. 체감 배율 조정 (80% 줌 느낌)
- **강제 줌 불가** → 타이포/패딩/폭으로 체감 조정
- H1: `clamp(28px, 3.2vw, 44px)` + `tracking-[-0.02em]` (15% 축소)
- 섹션 타이틀: `clamp(20px, 2.2vw, 30px)` (17% 축소)
- 본문: `text-[13.5px] sm:text-[14px]` + `text-black/70` (소프트)
- 카드 패딩: `p-7` (28px, 기존 32-40px에서 축소)
- 섹션 간격: `mb-10` / `mb-12` (40-48px, 기존 64-96px에서 축소)
- 읽기 폭: `max-w-[840px]`

### 3. Scrollspy 하단 문제 해결
```tsx
{/* 마지막 섹션 후 */}
<div aria-hidden="true" className="h-[35vh]" />
```
- 35vh 높이의 투명 스페이서 추가
- 하단까지 스크롤 시 Resume/Contact 섹션이 active 영역에 진입 가능

## 내가 내린 판단

1. **"TOC도 중앙 컨테이너에 넣는 구조"는 폐기**
   - OpenAI /about 구조가 정답: 좌측 내비는 viewport 고정, 메인은 읽기 폭 중심

2. **80% 줌 기준으로 시각 균형을 맞추는 방향이 목표**
   - 브라우저 줌이 아니라 CSS로 체감 배율 조정
   - clamp() + 축소된 spacing으로 자연스러운 반응형

3. **2-depth TOC는 단순 구조 유지**
   - 복잡한 collapsible/아이콘 시도 → 폐기
   - 간단한 parent/child 구조 + active 하이라이트만 유지

## 주요 변경 사항

| 항목 | Before | After |
|------|--------|-------|
| 레이아웃 구조 | Grid (centered container) | Flex (TOC left, main centered) |
| TOC 위치 | 컨테이너 내부 | Viewport 왼쪽 고정 |
| 메인 max-width | 1200px (container) → 860px (content) | 840px |
| H1 크기 | clamp(32px-52px) | clamp(28px-44px) |
| 섹션 타이틀 | clamp(28px-36px) | clamp(20px-30px) |
| 본문 텍스트 | 15-16px | 13.5-14px |
| 카드 패딩 | p-8/p-10 (32-40px) | p-7 (28px) |
| 섹션 간격 | 64-96px | 40-48px |
| 하단 스페이서 | 없음 | h-[35vh] |

## 기술적 디테일

- **Tailwind v4**: `@import "tailwindcss"` (v3의 `@tailwind` 디렉티브와 다름)
- **Scrollspy**: IntersectionObserver + rootMargin `-20% 0px -70% 0px`
- **Typography**: CSS clamp() 사용으로 viewport 기반 유동 크기
- **접근성**: `aria-hidden="true"` 스페이서로 스크린리더 영향 없음

## 남은 불확실성 / 리스크

1. **실제 포트폴리오(Next.js)로 이식**
   - 컴포넌트 구조/라우팅에 맞춘 변환 필요
   - App Router vs Pages Router 고려
   - TOC 데이터 구조를 파일 시스템 기반으로 자동 생성할지 여부

2. **모바일에서 TOC 처리 정책**
   - 현재: 토글 버튼으로 show/hide
   - 개선 옵션: 드로어/슬라이드 패널/하단 고정 등

3. **실제 콘텐츠 적용 시 간격/크기 재조정**
   - 플레이스홀더 텍스트 기준이므로 실제 내용 길이에 따라 재검토 필요

## 다음 액션

1. **UI sandbox를 "채택/폐기" 판단** (스크린샷 기준)
   - 현재 URL: http://localhost:5175/
   - 다양한 viewport 크기(1280px, 1024px, 768px)에서 확인

2. **채택 시: Next.js 포트폴리오에 동일 레이아웃 적용 계획 수립**
   - 컴포넌트 분리 전략
   - TOC 데이터 소스 결정 (정적/동적)
   - 라우팅 구조 설계

3. **TOC 모바일 패턴 1안 확정**
   - 드로어/슬라이드/하단 고정 중 선택
   - 애니메이션 및 UX 상세 설계

## 참고 파일

- 프로젝트: `C:\dev\portfolio_ui_sandbox`
- 주요 파일: `src/App.tsx`, `src/index.css`
- 설정: `tailwind.config.js`, `postcss.config.js`
- 포트: http://localhost:5175/

## 배운 점

1. **OpenAI /about 스타일의 핵심**: TOC는 viewport 기준, 콘텐츠는 읽기 폭 중심
2. **체감 배율 조정**: 브라우저 줌이 아닌 CSS로 타이포/spacing 세밀 제어
3. **Scrollspy 함정**: 마지막 섹션은 하단 여백 없이는 절대 active 불가
4. **Tailwind v4 마이그레이션**: `@import "tailwindcss"` 디렉티브 변경 주의
