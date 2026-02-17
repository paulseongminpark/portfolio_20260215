# Tech Review 자동화 블로그 + 포트폴리오 통합 디자인

**Date**: 2026-02-17
**Status**: Approved

## 1. 개요

Perplexity 예약 리서치(매일 8AM, EN/KO)를 자동으로 파싱하여 Jekyll 블로그에 게시하고, 포트폴리오 Writing 섹션에 최근 글을 표시하는 하이브리드 시스템.

## 2. 시스템 아키텍처

```
Perplexity (예약 ×2: KO, EN)
       ▼ 이메일
Google Apps Script (Gmail 트리거)
  ├─ 메일 본문 추출
  ├─ KO/EN 분류
  └─ GitHub API → repository_dispatch
       ▼
GitHub Actions
  ├─ 5W1H 파싱 (정규식)
  ├─ Comments 자동 생성 (Claude API + style-guide.yml)
  ├─ Markdown 포스트 생성 (_posts/ko/, _posts/en/)
  ├─ feed.json 갱신
  └─ 자동 커밋 + Pages 빌드
       ▼
┌─────────────────┐  ┌──────────────────────┐
│  Jekyll Blog    │  │  Portfolio (React)   │
│  GitHub Pages   │  │  Tech Review 섹션     │
│  /ko/ + /en/    │  │  feed.json fetch     │
│  언어 토글/감지   │  │  최근 5개 카드 표시    │
└─────────────────┘  └──────────────────────┘
```

## 3. Jekyll 블로그 구조

**레포**: `paulseongminpark/tech-review`
**URL**: `paulseongminpark.github.io/tech-review`

```
tech-review/
├── _config.yml
├── _layouts/
│   └── post.html
├── _includes/
│   ├── lang-toggle.html
│   └── head.html            # 브라우저 언어 감지 JS
├── _posts/
│   ├── ko/
│   └── en/
├── _data/
│   └── feed.json            # 포트폴리오용 최근 5개
├── ko/index.html
├── en/index.html
└── index.html               # 언어 감지 → 리다이렉트
```

### 포스트 형식

```yaml
---
layout: post
title: "토픽 제목"
date: 2026-02-17
lang: ko
pair: 2026-02-17-topic-slug
tags: [ai, agent]
---

## Industry
...
## Who
...
## What
...
## When
...
## Why
...
## How
...
## So?
...
## Source
...
## Comments
- **산업 연관성**: ...
- **직무 연관성**: ...
- **자소서/면접 활용**: ...
```

### 언어 전환
1. `index.html`: `navigator.language` 감지 → `/ko/` or `/en/` 리다이렉트
2. 포스트 내 토글 버튼: `pair` 키로 상대 언어 포스트 링크
3. `localStorage`에 선택 저장

## 4. 자동화 파이프라인

### Google Apps Script
- Gmail 트리거: `from:perplexity` 필터
- 메일 본문 HTML → plain text 변환
- KO/EN 분류 (제목/본문 언어 감지)
- GitHub API `repository_dispatch` 발송 (payload: lang, raw_content, date)

### GitHub Actions
- `repository_dispatch` 수신
- 정규식으로 `## `, `**Industry**:` 등 마커 파싱 → 5W1H 구조화
- Claude API 호출: Comments 섹션 자동 생성
- Markdown 포스트 생성 → `_posts/{lang}/`
- `feed.json` 갱신 (최근 5개)
- 자동 커밋 + GitHub Pages 빌드

### Comments 자동 생성

```yaml
# .github/style-guide.yml
author_style:
  tone: "짧고 직관적, 예측 중심"
  format: "bullet 1-2문장"
  examples:
    - input: "..."
      output: |
        - 산업 연관성: ...
        - 직무 연관성: ...
        - 자소서/면접: ...
```

- 사용자가 초기 예시 3-5개 작성
- Claude API가 스타일 참고하여 생성
- 수정 시 직접 편집 후 push

## 5. 포트폴리오 통합

### seed.ts 추가

```typescript
{
  id: 'tech-review',
  category: 'Writing',
  eyebrow: 'Ongoing',
  title: 'Tech Review',
  shortTitle: 'Tech Review',
  description: 'AI·빅테크·신기술 트렌드를 매일 추적하고, 산업·직무 관점에서 짧은 인사이트를 기록합니다.',
  heroRatio: '16:9'
}
```

### 데이터 흐름
- Jekyll 빌드 시 `feed.json` 생성 → GitHub Pages 정적 배포
- 포트폴리오 React 앱 → 런타임 fetch → 브라우저 언어 필터 → 카드 4개 그리드
- "전체보기" → 블로그 새 탭

### feed.json 스키마

```json
{
  "posts": [
    {
      "date": "2026-02-17",
      "pair": "ai-agent-trends",
      "title": { "ko": "...", "en": "..." },
      "tags": ["ai", "agent"],
      "url": { "ko": "/ko/...", "en": "/en/..." }
    }
  ]
}
```

## 6. Perplexity 지침

### KO 예약 지침

```
오늘의 글로벌 테크 동향을 아래 형식으로 정리해줘.
3개 이하의 토픽만 선별. 노이즈 제거, 핵심만.

선별 기준 (우선순위):
1. 실제 출시/발표된 것 (루머·예측 제외)
2. 기존 판도를 바꾸는 움직임 (점진적 업데이트 제외)
3. 엔지니어/PM이 내일 당장 알아야 할 것

각 토픽마다 아래 형식을 정확히 따라줘:

---
## [토픽 제목]

**Industry**: (해당 산업/분야)
**Who**: (핵심 플레이어)
**What**: (무엇을 했는지 2-3문장)
**When**: (날짜/시점)
**Why**: (왜 이게 중요한지 1-2문장)
**How**: (어떻게 작동/구현되는지 1-2문장)
**So?**: (그래서 앞으로 어떻게 되는지 1문장, 예측)
**Source**: (원문 URL)
---

톤: 분석적, 간결, 업계 내부자 시선.
"~할 전망입니다" 같은 보도자료 톤 금지.
"결국 X가 Y를 먹는 구도" 같은 직관적 해석 선호.
```

### EN 예약 지침

```
Today's global tech developments. 3 topics max. Signal only, no noise.

Selection criteria (priority):
1. Shipped/announced (no rumors or speculation)
2. Game-changing moves (skip incremental updates)
3. What an engineer/PM needs to know tomorrow

For each topic, follow this exact format:

---
## [Topic Title]

**Industry**: (sector)
**Who**: (key players)
**What**: (what happened, 2-3 sentences)
**When**: (date)
**Why**: (why it matters, 1-2 sentences)
**How**: (how it works/is implemented, 1-2 sentences)
**So?**: (what happens next, 1 sentence prediction)
**Source**: (URL)
---

Tone: analytical, concise, insider perspective.
No press-release speak.
Prefer sharp takes like "X is eating Y's lunch" over "X is expected to..."
```
