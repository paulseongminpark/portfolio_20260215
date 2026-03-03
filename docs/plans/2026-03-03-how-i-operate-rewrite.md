# How I Operate — Full Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** "How I Operate" 섹션 전면 재작성 — 추상 프레임워크(Time/Sensation/Relation) → 외부 메모리 시스템 설계 기반 4개 원칙 카드.

**Architecture:**
- `index.tsx`의 `SYSTEM_ITEMS` 배열을 4개 하드코딩 카드로 교체
- `parseSystemContent` 함수 및 호출 제거 (더 이상 MD 파싱 불필요)
- `P12_TOC` system 서브아이템 4개로 교체
- `HOME_INTRO_TO_RELATION_KO.md`의 HOW I OPERATE 섹션 제거 (About 섹션 내용 유지)

**Tech Stack:** React + TypeScript, 기존 CSS 클래스 그대로 유지

---

## 변경 파일 목록

- Modify: `src/portfolio/index.tsx`
- Modify: `src/portfolio/content/HOME_INTRO_TO_RELATION_KO.md`

---

### Task 1: P12_TOC system 서브아이템 교체

**File:** `src/portfolio/index.tsx:108-135`

현재 system 그룹 items:
```ts
{ id: "system",  label: "System", mini: "SY", items: [
  { id: "product-1",        label: "Principles" },
  { id: "product-2",        label: "Flow" },
  { id: "system-time",      label: "Time" },
  { id: "system-sensation", label: "Sensation" },
  { id: "system-relation",  label: "Relation" },
  { id: "ai",               label: "AI System" },
]},
```

교체 후:
```ts
{ id: "system",  label: "System", mini: "SY", items: [
  { id: "system-connection", label: "Connection" },
  { id: "system-currency",   label: "Context as Currency" },
  { id: "system-structure",  label: "Structure" },
  { id: "system-governance", label: "Governance" },
  { id: "ai",                label: "AI System" },
]},
```

**Step 1:** index.tsx에서 P12_TOC system items 교체
**Step 2:** 브라우저 TOC 확인 (localhost:5173)
**Step 3:** 커밋 안 함 (Task 2와 묶어서)

---

### Task 2: parseSystemContent 제거 + SYSTEM_ITEMS 재정의

**File:** `src/portfolio/index.tsx`

**Step 1: `parseSystemContent` 함수 전체 삭제 (line 25-60)**

아래 함수 전체를 삭제:
```ts
function parseSystemContent(raw: string) { ... }
```

**Step 2: `const sys = parseSystemContent(homeRaw)` 호출 삭제 (line 138)**

```ts
// 삭제:
const sys = parseSystemContent(homeRaw);
```

**Step 3: `SYSTEM_ITEMS` 배열 전체 교체 (line 181-187)**

현재:
```ts
const SYSTEM_ITEMS = [
  { id: "product-1", label: "Operating Principles", title: "", body: "...", type: "text" as const },
  { id: "product-2", label: "Flow", title: "", body: "", flowItems: sys.flowItems, type: "list" as const },
  { id: "system-time", label: "Framework / Time", title: "", body: sys.timeBody, type: "text" as const },
  { id: "system-sensation", label: "Framework / Sensation", title: "", body: sys.sensationBody, type: "text" as const },
  { id: "system-relation", label: "Framework / Relation", title: "", body: sys.relationBody, type: "text" as const },
];
```

교체 후:
```ts
const SYSTEM_ITEMS = [
  {
    id: "system-connection",
    label: "Connection",
    body: "리스트가 아닌 그래프로 생각한다. 26개 노드 타입, 30개 관계 타입으로 이루어진 온톨로지를 직접 설계했다. Decision, Failure, Insight, Metaphor, Connection — 이건 기억 시스템이 아니라 내 사고 구조의 외부화다. 뉴런이 연결로 기억하듯, 이 시스템은 연결로 안다.",
    type: "text" as const,
  },
  {
    id: "system-currency",
    label: "Context as Currency",
    body: "반복 설명은 낭비다. 세션마다 같은 맥락을 처음부터 설명해야 한다면, 생각이 아니라 기억에 에너지를 쓰게 된다. 원칙: 필요한 순간에 정확히 필요한 것만 꺼낸다. 이 구조가 세션 시작 비용을 88% 줄였다.",
    type: "text" as const,
  },
  {
    id: "system-structure",
    label: "Structure over Willpower",
    body: "세션이 끊겨도 기억이 단절되지 않도록 4중 안전망을 설계했다. Hook(자동) → 명시적 지시 → 수동 체크포인트 → 세션 마무리. 기억력에 기대지 않는다. 구조가 기억한다.",
    type: "text" as const,
  },
  {
    id: "system-governance",
    label: "Governance",
    body: "시스템은 고정되지 않는다. 타입이 진화하고, 새 도구가 붙고, 관계가 재정의된다. 중요한 건 무엇을 쓰느냐가 아니라 어떻게 통제할 것인가다. 도구보다 통제 구조가 먼저다.",
    type: "text" as const,
  },
];
```

**Step 4: 빌드 에러 확인**
```bash
# 포트폴리오 디렉토리에서
npx tsc --noEmit
```
Expected: 에러 없음. `sys.flowItems`, `sys.timeBody` 등 참조가 남아있으면 제거.

**Step 5: 브라우저 확인 (localhost:5173)**
- 02 · System 섹션에 4개 카드 표시 확인
- 각 카드 텍스트 정상 출력 확인

---

### Task 3: section subtitle 교체

**File:** `src/portfolio/index.tsx:625`

현재:
```tsx
<p style={{ ... }}>
  생각하고 실행하는 방식의 원칙. 시간·감각·관계를 어떻게 다루는지의 구조.
</p>
```

교체 후:
```tsx
<p style={{ ... }}>
  사고 구조를 외부화하는 방식.
</p>
```

---

### Task 4: HOME_INTRO_TO_RELATION_KO.md 정리

**File:** `src/portfolio/content/HOME_INTRO_TO_RELATION_KO.md`

`# 3) HOW I OPERATE (사고와 실행의 구조)` 섹션 전체 삭제.

About 섹션(`# 1) Intro`, `# 2) ABOUT`)은 건드리지 않음.

---

### Task 5: 최종 확인 + 커밋

**Step 1: 브라우저 전체 흐름 확인**
- About 섹션 정상 출력 확인 (Home_INTRO_TO_RELATION_KO.md About 부분 영향 없는지)
- How I Operate 4개 카드 확인
- TOC 서브아이템 4개 확인
- HOW I AI 섹션 정상 출력 확인 (영향 없어야 함)
- Work 섹션 정상 출력 확인 (영향 없어야 함)

**Step 2: 커밋**
```bash
git add src/portfolio/index.tsx src/portfolio/content/HOME_INTRO_TO_RELATION_KO.md
git commit -m "[portfolio] How I Operate 전면 재작성 — 외부 메모리 시스템 4원칙 카드"
```

---

## 주의사항

- `homeRaw` import와 `extractBold` 함수는 About 섹션에서 여전히 사용 — 삭제 금지
- `trRaw` import와 `parseSections` 함수도 TR 섹션에서 사용 — 건드리지 않음
- Work 섹션, HOW I AI 섹션 코드 일체 수정 금지
- 기존 CSS 클래스(`p12-h2`, `p12-section` 등) 그대로 유지
