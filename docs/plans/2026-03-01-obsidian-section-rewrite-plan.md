# Obsidian Section Rewrite Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** ObsidianSystemSection.tsx를 v4.0 기준으로 전체 재작성 — 5섹션 역순 공개 구조

**Architecture:** 기존 1628줄 단일 컴포넌트를 동일 파일 내에서 재구성. 데이터 상수(EVOLUTION, SIDEBAR, FILE_CONTENT 등)를 v4.0 기준으로 업데이트하고, 메인 JSX의 섹션 순서와 내용을 설계서 기반으로 변경. UI 스타일 변경 최소화 — 콘텐츠와 논리 흐름에 집중.

**Tech Stack:** React, TypeScript, inline styles (기존 패턴 유지)

**Design Doc:** `docs/plans/2026-03-01-obsidian-section-rewrite-design.md`

---

## 현재 → 목표 매핑

| 현재 섹션 | 현재 순서 | 목표 섹션 | 목표 순서 | 변경 내용 |
|-----------|----------|----------|----------|----------|
| Impact | ⑥ | Hook | ① | 숫자 v4.0 업데이트, 철학 한 줄 추가 |
| Vault Structure + Living Docs + How It Works | ②③④ | Current Architecture | ② | 병합, Jeff Su→Flat Hierarchy, Cross-CLI 추가 |
| Why Obsidian | ① | 문제의 시작 | ③ | PIVOT 유지, 나머지 재작성 |
| Evolution | ⑤ | 진화 | ④ | v3.2~v4.0 추가, desc 업데이트 |
| (없음) | - | 교훈 | ⑤ | 신규 작성 |

---

### Task 1: 데이터 상수 업데이트 — EVOLUTION

**Files:**
- Modify: `src/portfolio/components/ObsidianSystemSection.tsx:122-174`

**Step 1: EVOLUTION 배열 v4.0까지 확장**

기존 5개 항목(v0~v3.1)에 3개 추가:

```typescript
const EVOLUTION = [
  {
    version: "v0",
    date: "2026-02 초",
    title: "context-repo Bridge",
    desc: "PowerShell → SNAPSHOT.txt 변환, AutoHotKey로 ChatGPT에 주입. Obsidian과 Git이 분리된 이중 SoT.",
    color: C.dim,
    bg: C.bg,
    border: C.border,
    deprecated: true,
  },
  {
    version: "v1.0",
    date: "Feb 15–17",
    title: "Git SoT + Orchestration",
    desc: "마크다운을 Git으로 관리하는 첫 구조. 스킬 11개, 스크립트 5개, 문서 3분화(STATE/PLANNING/KNOWLEDGE).",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
    deprecated: false,
  },
  {
    version: "v2.0",
    date: "Feb 19–21",
    title: "dev-vault + Obsidian Git",
    desc: "C:\\dev 전체를 단일 Git repo(dev-vault)로 초기화. HOME.md 중앙 MOC 신설. Obsidian Git 플러그인으로 자동 동기화.",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
    deprecated: false,
  },
  {
    version: "v3.0",
    date: "Feb 22–23",
    title: "Living Docs 규칙화",
    desc: "문서 자동 갱신 원칙 공식화. 에이전트/스킬/hook 변경 시 Living Docs 필수 업데이트 — CLAUDE.md 체인 규칙으로 강제.",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
    deprecated: false,
  },
  {
    version: "v3.1",
    date: "Feb 23",
    title: "Agent Teams + live-context",
    desc: "에이전트 23개, 팀 3개. live-context.md로 세션 간 실시간 맥락 공유. 프로젝트 간 변경 감지 시작.",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
    deprecated: false,
  },
  {
    version: "v3.3",
    date: "Feb 25–26",
    title: "복잡도 정점",
    desc: "에이전트 24개, 스킬 14개, hooks 8개. 구현 후 Living Docs 갱신 누락 2회 — 체크리스트가 사람을 따라가지 못했다.",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
    deprecated: false,
  },
  {
    version: "v4.0",
    date: "Feb 27",
    title: "Context as Currency",
    desc: "에이전트 24→15, 스킬 14→9로 정리. rulesync로 규칙 자동 동기화. Cross-CLI(.ctx/) 공유 메모리 도입. Claude/Gemini/Codex가 같은 진실을 읽는다.",
    color: C.rose,
    bg: C.roseBg,
    border: C.roseBorder,
    deprecated: false,
  },
];
```

**Step 2: 검증** — 브라우저에서 Evolution 타임라인에 8개 항목 표시 확인

**Step 3: 커밋**
```bash
git add src/portfolio/components/ObsidianSystemSection.tsx
git commit -m "[portfolio] EVOLUTION 데이터 v4.0까지 확장 (5→8항목)"
```

---

### Task 2: 데이터 상수 업데이트 — VAULT_TREE, LIVING_DOCS, SIDEBAR, FILE_CONTENT

**Files:**
- Modify: `src/portfolio/components/ObsidianSystemSection.tsx:42-455`

**Step 1: VAULT_TREE를 v4.0 실제 구조로 업데이트**

```typescript
const VAULT_TREE = [
  { path: "HOME.md", indent: 0, desc: "볼트 허브 — 프로젝트 대시보드" },
  { path: "CLAUDE.md", indent: 0, desc: "Claude Code 전역 규칙" },
  { path: "GEMINI.md", indent: 0, desc: "Gemini CLI 설정 (rulesync 생성)" },
  { path: ".ctx/", indent: 0, desc: "Cross-CLI 공유 메모리" },
  { path: "01_projects/", indent: 0, desc: "" },
  { path: "orchestration/", indent: 1, desc: "시스템 운영 + Living Docs" },
  { path: "portfolio/", indent: 1, desc: "포트폴리오 (React + Vite)" },
  { path: "tech-review/", indent: 1, desc: "AI 뉴스 자동 큐레이션" },
  { path: "monet-lab/", indent: 1, desc: "UI 실험 (archived)" },
  { path: "daily-memo/", indent: 1, desc: "모바일 INBOX" },
  { path: "scripts/", indent: 0, desc: "worktree, 자동화 셸" },
  { path: "99_archive/", indent: 0, desc: "아카이브" },
];
```

**Step 2: LIVING_DOCS 카드 업데이트 (역할 명확화)**

```typescript
const LIVING_DOCS = [
  {
    label: "STATE.md",
    desc: "시스템 인벤토리. 에이전트, 스킬, 팀, 플러그인의 단일 진실.",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    label: "KNOWLEDGE.md",
    desc: "패턴과 규칙 누적. 같은 실수를 반복하지 않기 위한 참조.",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
  {
    label: "PLANNING.md",
    desc: "아키텍처 결정 기록(ADR). 왜 그 결정을 했는지 추적.",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
  {
    label: "CHANGELOG.md",
    desc: "버전 히스토리. v0부터 v4.0까지 모든 변경의 이력.",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
];
```

**Step 3: Vault Structure 태그 업데이트 (Jeff Su 제거)**

기존:
```typescript
{ label: "Jeff Su 5레벨 MAX", ... },
{ label: "2자리 넘버링", ... },
{ label: "99=Archive", ... },
```

변경:
```typescript
{ label: "Flat Hierarchy", color: C.blue, bg: C.blueBg, border: C.blueBorder },
{ label: "Numeric Taxonomy", color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
{ label: "5-Level MAX", color: C.teal, bg: C.tealBg, border: C.tealBorder },
{ label: "99=Archive", color: C.amber, bg: C.amberBg, border: C.amberBorder },
```

Vault Structure 설명 텍스트도 변경:
```
기존: "Jeff Su 5레벨 폴더 방법론 기반. 2자리 넘버링으로 자동 정렬, 99는 Archive."
변경: "Flat Hierarchy 원칙. 5레벨 이하 폴더 깊이, 2자리 넘버링(Numeric Taxonomy)으로 자동 정렬. 99=Archive."
```

**Step 4: SIDEBAR에 .ctx/ 관련 항목 추가**

FileKey 타입에 추가:
```typescript
type FileKey =
  | "HOME.md"
  | "CLAUDE.md"
  | "orch/STATE.md"
  | "orch/PLANNING.md"
  | "orch/KNOWLEDGE.md"
  | "orch/CHANGELOG.md"
  | "pf/STATE.md"
  | "tr/README.md"
  | "monet/README.md"
  | "daily/Inbox.md"
  | "evidence/README.md"
  | "ctx/shared-context.md";
```

SIDEBAR 배열에 추가 (CLAUDE.md 다음):
```typescript
{ name: ".ctx", indent: 0, folderId: "ctx" },
{ name: "shared-context.md", indent: 1, fileKey: "ctx/shared-context.md", parent: "ctx" },
```

DEFAULT_OPEN에 "ctx" 추가.

**Step 5: FILE_CONTENT 업데이트**

(a) HOME.md — v4.0 반영:
```typescript
"HOME.md": (
  <>
    {Title("HOME — Dev Workspace Hub")}
    {H("Projects")}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr 0.6fr", gap: "2px 12px", fontSize: 10, paddingLeft: 4, marginBottom: 10 }}>
      <span style={{ fontWeight: 600, color: C.dim }}>Project</span>
      <span style={{ fontWeight: 600, color: C.dim }}>Status</span>
      <span style={{ fontWeight: 600, color: C.dim }}>Branch</span>
      <span>orchestration</span><span style={{ color: C.green, fontWeight: 600 }}>v4.0 active</span><span>main</span>
      <span>portfolio</span><span style={{ color: C.amber, fontWeight: 600 }}>building</span><span>master</span>
      <span>tech-review</span><span style={{ color: C.purple, fontWeight: 600 }}>tracking</span><span>main</span>
    </div>
    {H("Today's Session")}
    {B("Obsidian 섹션 재작성 (portfolio)", "01:00")}
    {B("v4.0 Phase 8 완료 (orchestration)", "23:00")}
    {H("System")}
    <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
      <div>에이전트 15개 · 스킬 9개 · 팀 3+Hub</div>
      <div>rulesync v7.9.0 · hooks 8개 · Cross-CLI</div>
    </div>
  </>
),
```

(b) orch/STATE.md — v4.0 반영:
```typescript
"orch/STATE.md": (
  <>
    {Title("STATE.md — Orchestration")}
    {H("Current")}
    <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
      <div><span style={{ color: C.green, fontWeight: 600 }}>v4.0</span> Context as Currency</div>
      <div>에이전트 15개, 스킬 9개, 팀 3+Hub, hooks 8개</div>
    </div>
    {H("Core Infra")}
    {B("rulesync v7.9.0 — .rulesync/rules/ → CLAUDE.md/GEMINI.md")}
    {B("Cross-CLI — .ctx/shared-context.md, provenance.log")}
    {B("Worktree — scripts/worktree-create.sh")}
    {H("Completed (recent)")}
    {Dim("v4.0 Phase 1-8 구현 완료")}
    {Dim("v3.3 복잡도 정점 → 정리")}
  </>
),
```

(c) orch/PLANNING.md — Jeff Su 제거, v4.0 ADR 추가:
```typescript
"orch/PLANNING.md": (
  <>
    {Title("PLANNING.md — Architecture Decisions")}
    {H("D-001: SoT를 Git으로 전환")}
    {Label("문제", "Obsidian만으로는 다른 AI가 접근 불가")}
    {Label("해결", "Git STATE.md + GitHub Pages URL")}
    {H("D-003: Flat Hierarchy")}
    {Label("문제", "파일이 늘수록 구조가 무너짐")}
    {Label("해결", "5레벨 MAX, 2자리 넘버링, 99=Archive")}
    {H("D-019: Obsidian = 뷰어 전용")}
    {Label("문제", "Obsidian 편집과 AI 편집이 충돌")}
    {Label("해결", "읽기 전용 + Claude Code 단일 쓰기")}
    {H("D-031: Context as Currency")}
    {Label("문제", "24개 에이전트, 14개 스킬 — 복잡도 폭발")}
    {Label("해결", "24→15 에이전트, rulesync, Cross-CLI 통합")}
  </>
),
```

(d) orch/CHANGELOG.md — v4.0 추가:
```typescript
"orch/CHANGELOG.md": (
  <>
    {Title("CHANGELOG.md — Version History")}
    {H("v4.0 — 2026-02-27")}
    {B("Context as Currency")}
    {B("에이전트 24→15, 스킬 14→9, rulesync v7.9.0")}
    {B("Cross-CLI .ctx/ 공유 메모리, worktree 인프라")}
    {H("v3.3 — 2026-02-25")}
    {B("복잡도 정점 — 에이전트 24개, hooks 8개")}
    {H("v3.1 — 2026-02-23")}
    {B("Agent Teams & Linker System")}
    {B("에이전트 16→23, 팀 3개, live-context.md")}
    {H("v2.0 — 2026-02-21")}
    {B("dev-vault git init, Obsidian Git 연동")}
    {H("v1.0 — 2026-02-17")}
    {B("skills 11개, scripts 5개, auto-memory 3-phase")}
  </>
),
```

(e) ctx/shared-context.md — 신규:
```typescript
"ctx/shared-context.md": (
  <>
    {Title(".ctx/shared-context.md")}
    {H("Cross-CLI Shared Memory")}
    {B("모든 CLI(Claude, Gemini, Codex)가 읽고 쓰는 공유 상태")}
    {H("Current Focus")}
    {B("portfolio Obsidian 섹션 v4.0 재작성")}
    {H("Recent Entries")}
    <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
      <div><span style={{ color: C.dim }}>[claude]</span> v4.0 Phase 1-8 완료</div>
      <div><span style={{ color: C.dim }}>[gemini]</span> 코드베이스 구조 분석</div>
      <div><span style={{ color: C.dim }}>[codex]</span> diff 리뷰 + QA</div>
    </div>
    {H("Provenance")}
    {Dim("각 항목에 출처 CLI 태그. 해석은 Claude만.")}
  </>
),
```

(f) orch/KNOWLEDGE.md — v4.0 교훈 반영:
```typescript
"orch/KNOWLEDGE.md": (
  <>
    {Title("KNOWLEDGE.md — Patterns & Rules")}
    {H("반복 실수 패턴")}
    {B("구현 완료 ≠ DONE — Living Docs + 커밋 + push까지가 완료")}
    {B("파일 재읽기 금지 — 이미 읽은 파일은 다시 읽지 않는다")}
    {H("에이전트 운영 규칙")}
    {B("Haiku: 상태 확인, 브리핑, 요약")}
    {B("Sonnet: 탐색, 검색, 코드 분석")}
    {B("Opus: 설계 결정, 크로스 검증, 복잡한 실행")}
    {H("교훈")}
    {B("Claude = 유일한 설계/결정권자. 외부 CLI는 추출만.")}
    {B("더하기는 쉽고, 빼기가 설계다. (24→15)")}
  </>
),
```

**Step 6: 검증** — 브라우저에서 목업의 모든 파일 클릭하여 v4.0 콘텐츠 확인

**Step 7: 커밋**
```bash
git add src/portfolio/components/ObsidianSystemSection.tsx
git commit -m "[portfolio] 데이터 상수 v4.0 업데이트 (VAULT_TREE, SIDEBAR, FILE_CONTENT 등)"
```

---

### Task 3: Graph View 노드/엣지 업데이트

**Files:**
- Modify: `src/portfolio/components/ObsidianSystemSection.tsx:646-708`

**Step 1: GRAPH_NODES에 .ctx 노드 추가, 좌표 조정**

```typescript
const GRAPH_NODES: GNode[] = [
  // 허브 (중앙)
  { id: "HOME.md", label: "HOME.md", x: 300, y: 140, color: C.purple, r: 12 },
  { id: "CLAUDE.md", label: "CLAUDE.md", x: 300, y: 30, color: C.purple, r: 9 },
  // Cross-CLI (중앙 우측)
  { id: "ctx/shared-context.md", label: ".ctx", x: 420, y: 30, color: C.rose, r: 8 },
  // orchestration 클러스터 (좌측)
  { id: "orch/STATE.md", label: "STATE", x: 120, y: 120, color: C.blue, r: 9 },
  { id: "orch/PLANNING.md", label: "PLANNING", x: 60, y: 200, color: C.green, r: 7 },
  { id: "orch/KNOWLEDGE.md", label: "KNOWLEDGE", x: 160, y: 240, color: C.amber, r: 7 },
  { id: "orch/CHANGELOG.md", label: "CHANGELOG", x: 40, y: 80, color: C.teal, r: 6 },
  // portfolio (우측 상단)
  { id: "pf/STATE.md", label: "PF STATE", x: 480, y: 100, color: C.blue, r: 7 },
  // tech-review (우측)
  { id: "tr/README.md", label: "TR README", x: 520, y: 190, color: C.rose, r: 7 },
  // monet (우측 하단)
  { id: "monet/README.md", label: "monet", x: 460, y: 260, color: C.teal, r: 6 },
  // daily (좌측 하단)
  { id: "daily/Inbox.md", label: "Inbox", x: 240, y: 270, color: C.amber, r: 6 },
];
```

GNode 타입에 "ctx/shared-context.md" 추가:
```typescript
interface GNode {
  id: FileKey | "orch" | "pf" | "tr" | "monet" | "daily";
  // FileKey에 이미 "ctx/shared-context.md" 포함
}
```

**Step 2: GRAPH_EDGES에 Cross-CLI 연결 추가**

기존 엣지 유지 + 추가:
```typescript
// Cross-CLI 연결
{ from: "ctx/shared-context.md", to: "CLAUDE.md" },
{ from: "ctx/shared-context.md", to: "orch/STATE.md" },
{ from: "ctx/shared-context.md", to: "HOME.md" },
```

**Step 3: 검증** — Graph View에서 .ctx 노드 호버 시 연결선 강조 확인

**Step 4: 커밋**
```bash
git add src/portfolio/components/ObsidianSystemSection.tsx
git commit -m "[portfolio] Graph View에 Cross-CLI .ctx 노드 추가"
```

---

### Task 4: 메인 JSX 재구성 — 섹션 순서 변경 + Hook/교훈 섹션

**Files:**
- Modify: `src/portfolio/components/ObsidianSystemSection.tsx:814-1628` (메인 컴포넌트)

이것이 가장 큰 변경. 기존 6개 섹션을 5개로 재구성.

**Step 1: 섹션 ① Hook (기존 Impact를 최상단으로 이동 + 철학 추가)**

```tsx
{/* ① Hook — 지금 이 시스템 */}
<div>
  <p style={labelStyle}>The System</p>
  <p style={{
    fontSize: 15,
    color: C.text,
    lineHeight: 1.75,
    margin: "0 0 18px",
    fontWeight: 500,
  }}>
    마크다운 파일이 AI 에이전트들의 공유 통화가 됐다. Claude, Gemini, Codex — 서로 다른 AI가 같은 STATE.md를 읽고, 같은 규칙을 따르고, 같은 진실 위에서 작업한다. 수동 동기화는 0이다.
  </p>
  {/* Impact 카드 — v4.0 숫자 */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
    gap: 10,
  }}>
    {[
      { number: "3", unit: "CLI", desc: "Claude · Gemini · Codex가 같은 STATE.md를 공유한다", color: C.blue, bg: C.blueBg, border: C.blueBorder },
      { number: "15", unit: "에이전트", desc: "24개에서 정리한 15개. 9개 스킬이 자동 디스패치", color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
      { number: "8", unit: "Hooks", desc: "SessionStart부터 PostToolUse까지 실시간 자동화", color: C.teal, bg: C.tealBg, border: C.tealBorder },
      { number: "0", unit: "수동 동기화", desc: "Obsidian Git 자동 Pull + Claude 자동 Push", color: C.green, bg: C.greenBg, border: C.greenBorder },
    ].map((m) => (
      // 기존 Impact 카드 렌더링 JSX 재사용 (동일 스타일)
    ))}
  </div>
</div>
```

**Step 2: 섹션 ② Current Architecture (기존 ②③④ 병합)**

순서:
1. Vault Structure (Flat Hierarchy, 태그 업데이트됨)
2. Living Documents (4 카드)
3. 현재 Obsidian 구성 (Mockup + Graph View)
4. How It Works (Pipeline + LESSON + 역할 분리)
5. Cross-CLI 설명 블록 (신규)

Cross-CLI 블록 추가:
```tsx
{/* Cross-CLI */}
<div style={{
  display: "flex",
  gap: 10,
  marginTop: 14,
  alignItems: "flex-start",
  padding: "12px 14px",
  background: C.roseBg,
  border: `1px solid ${C.roseBorder}`,
  borderRadius: 8,
}}>
  <span style={{
    fontSize: 10, fontWeight: 700, color: C.rose,
    background: "#fff", border: `1px solid ${C.roseBorder}`,
    borderRadius: 3, padding: "2px 6px", flexShrink: 0, marginTop: 1,
  }}>
    v4.0
  </span>
  <div>
    <div style={{ fontSize: 12, fontWeight: 600, color: C.text, marginBottom: 4 }}>
      Cross-CLI — .ctx/ 공유 메모리
    </div>
    <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
      Claude Code가 작성한 컨텍스트를 Gemini CLI가 읽고, Codex가 검증한다.
      .ctx/shared-context.md에 모든 CLI의 현재 목표와 진행 상황이 기록되고,
      provenance.log가 각 항목의 출처를 추적한다.
      rulesync가 .rulesync/rules/에서 CLAUDE.md, GEMINI.md를 자동 생성해
      모든 CLI가 같은 규칙을 따르게 한다.
    </div>
  </div>
</div>
```

/catchup Before/After 제거 (v4.0에선 맥락이 약함). PIVOT 에피소드는 섹션 ③으로 이동.

**Step 3: 섹션 ③ 문제의 시작 (기존 ① 재배치)**

기존 Why Obsidian의 내용을 재작성:
```tsx
{/* ③ 문제의 시작 */}
<div>
  <p style={labelStyle}>The Problem</p>
  <p style={{
    fontSize: 14,
    color: C.text,
    lineHeight: 1.75,
    margin: "0 0 14px",
  }}>
    AI 도구들은 세션마다 기억을 잃는다. 어제 3시간 동안 설계한 아키텍처를 오늘은 처음부터 다시 설명해야 한다.
    프로젝트가 커질수록 "현재 상태를 전달하는 비용"이 기하급수적으로 증가한다.
    Notion이나 Google Docs는 API 없이 AI가 직접 읽고 쓸 수 없다.
    로컬 마크다운이면 파일 시스템 접근만으로 편집이 가능하고, Git이면 버전 관리와 동기화가 해결된다.
  </p>

  {/* PIVOT 에피소드 (기존 유지) */}
  {/* ... 기존 PIVOT JSX 그대로 ... */}

  {/* Before → After (기존 유지) */}
  {/* ... 기존 Before/After JSX 그대로 ... */}
</div>
```

**Step 4: 섹션 ④ 진화 (기존 ⑤ 확장)**

기존 Evolution JSX 그대로 사용하되, 설명 텍스트 업데이트:
```tsx
<p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, margin: "0 0 16px" }}>
  2주 동안 8번의 구조 변경. bridge 스크립트에서 시작해 3개 CLI가 공유하는 Context as Currency 시스템까지.
  더하기(v0→v3.3)와 빼기(v4.0) — 복잡도를 쌓다가 정리하는 순간이 진짜 설계였다.
</p>
```

**Step 5: 섹션 ⑤ 교훈 (신규)**

```tsx
{/* ⑤ 교훈 */}
<div>
  <p style={labelStyle}>Lessons</p>
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 10,
  }}>
    {[
      {
        title: "SoT는 하나만",
        desc: "같은 정보가 두 곳에 있으면 반드시 어긋난다. 하나만 진실이고 나머지는 읽기 전용. Git이 유일한 Source of Truth.",
        color: C.blue,
        bg: C.blueBg,
        border: C.blueBorder,
      },
      {
        title: "도구는 역할을 분리해야",
        desc: "Writer(Claude Code), Source of Truth(Git), Viewer(Obsidian). 하나의 도구가 모든 역할을 하면 충돌한다.",
        color: C.purple,
        bg: C.purpleBg,
        border: C.purpleBorder,
      },
      {
        title: "빼기가 설계다",
        desc: "24개 에이전트를 15개로 줄인 v4.0이 v3.3보다 강력하다. 더하기는 쉽고, 빼기가 설계다.",
        color: C.teal,
        bg: C.tealBg,
        border: C.tealBorder,
      },
      {
        title: "자동화의 경계",
        desc: "수동 0을 목표로 하되, 자동화 자체가 새로운 복잡도를 만들면 멈춰야 한다. v3.3이 그 경계였다.",
        color: C.amber,
        bg: C.amberBg,
        border: C.amberBorder,
      },
    ].map((lesson) => (
      <div key={lesson.title} style={{
        border: `1px solid ${lesson.border}`,
        borderRadius: 10,
        padding: "16px 18px",
        background: lesson.bg,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 700,
          color: lesson.color,
          marginBottom: 8,
        }}>
          {lesson.title}
        </div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
          {lesson.desc}
        </div>
      </div>
    ))}
  </div>

  {/* Closing quote */}
  <p style={{
    fontSize: 13,
    color: C.muted,
    lineHeight: 1.65,
    margin: "16px 0 0",
    borderLeft: `3px solid ${C.purple}`,
    paddingLeft: 14,
  }}>
    이 시스템의 핵심은 도구가 아니라 원칙이다. 마크다운 파일 하나가 여러 AI의 공유 자원이 되려면,
    누가 쓰고 누가 읽는지가 명확해야 한다. 2주간의 8번의 반복이 그 명확함을 만들었다.
  </p>
</div>
```

**Step 6: 기존 Impact 섹션 (⑥) 삭제** — Hook으로 이동했으므로 중복 제거

**Step 7: 검증** — 브라우저에서 5개 섹션 순서 확인:
1. The System (Hook)
2. Vault Structure → Living Docs → Mockup+Graph → How It Works → Cross-CLI
3. The Problem (PIVOT + Before/After)
4. Evolution (v0→v4.0)
5. Lessons

**Step 8: 커밋**
```bash
git add src/portfolio/components/ObsidianSystemSection.tsx
git commit -m "[portfolio] Obsidian 섹션 5단계 역순 공개 구조로 전체 재구성"
```

---

### Task 5: 최종 검증 + 정리

**Step 1: 전체 흐름 검증**

브라우저에서 스크롤하며 확인:
- Hook의 숫자가 정확한가 (3 CLI, 15 에이전트, 8 Hooks, 0 수동)
- 목업에서 모든 파일 콘텐츠가 v4.0인가
- Graph View에서 .ctx 노드가 보이는가
- Evolution이 v4.0까지 8개 항목인가
- Lessons 4개 카드가 렌더링되는가
- PIVOT, LESSON 에피소드가 올바른 위치에 있는가
- Jeff Su 문자열이 어디에도 없는가

**Step 2: 린트/빌드 확인**
```bash
cd /c/dev/01_projects/02_portfolio && npx tsc --noEmit
```

**Step 3: 필요시 수정 후 최종 커밋**

---

## 실행 순서 요약

| Task | 내용 | 의존성 |
|------|------|--------|
| 1 | EVOLUTION 데이터 v4.0 확장 | 없음 |
| 2 | VAULT_TREE, SIDEBAR, FILE_CONTENT 업데이트 | 없음 |
| 3 | Graph View 노드/엣지 업데이트 | Task 2 (FileKey 타입 의존) |
| 4 | 메인 JSX 재구성 (5섹션) | Task 1, 2, 3 |
| 5 | 최종 검증 | Task 4 |

Task 1, 2는 병렬 실행 가능. Task 3은 Task 2 이후. Task 4는 모든 데이터 업데이트 이후.
