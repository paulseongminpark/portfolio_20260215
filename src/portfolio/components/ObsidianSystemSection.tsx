import React, { useState } from "react";

// ── 색상 팔레트 ─────────────────────────────────────────────────────
const C = {
  blue: "#2563eb",
  blueBg: "#eff4ff",
  blueBorder: "#c7d7fd",
  text: "#1a1a1a",
  muted: "#555",
  dim: "#888",
  dimmer: "#999",
  border: "#e5e5e5",
  bg: "#fafafa",
  white: "#fff",
  purple: "#7c3aed",
  purpleBg: "#f5f3ff",
  purpleBorder: "#ddd6fe",
  green: "#059669",
  greenBg: "#ecfdf5",
  greenBorder: "#a7f3d0",
  amber: "#d97706",
  amberBg: "#fffbeb",
  amberBorder: "#fde68a",
  rose: "#e11d48",
  roseBg: "#fff1f2",
  roseBorder: "#fecdd3",
  teal: "#0d9488",
  tealBg: "#f0fdfa",
  tealBorder: "#99f6e4",
};

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: C.dimmer,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  marginBottom: 14,
};

// ── 볼트 구조 트리 (Bedford-style dark) ──────────────────────────────
const VAULT_TREE = [
  { name: "HOME.md", indent: 0, folder: false, desc: "볼트 허브" },
  { name: "CLAUDE.md", indent: 0, folder: false, desc: "전역 규칙" },
  { name: "GEMINI.md", indent: 0, folder: false, desc: "rulesync" },
  { name: ".ctx", indent: 0, folder: true, desc: "Cross-CLI 공유" },
  { name: "shared-context.md", indent: 1, folder: false },
  { name: "01_projects", indent: 0, folder: true },
  { name: "orchestration", indent: 1, folder: true, desc: "시스템 운영" },
  { name: "STATE.md", indent: 2, folder: false },
  { name: "KNOWLEDGE.md", indent: 2, folder: false },
  { name: "PLANNING.md", indent: 2, folder: false },
  { name: "CHANGELOG.md", indent: 2, folder: false },
  { name: "portfolio", indent: 1, folder: true, desc: "React + Vite" },
  { name: "tech-review", indent: 1, folder: true, desc: "AI 큐레이션" },
  { name: "monet-lab", indent: 1, folder: true, desc: "archived" },
  { name: "daily-memo", indent: 1, folder: true, desc: "모바일 INBOX" },
  { name: "scripts", indent: 0, folder: true, desc: "자동화" },
  { name: "99_archive", indent: 0, folder: true },
];

// ── Living Docs 카드 ────────────────────────────────────────────────
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

// ── How It Works 파이프라인 (AI Integration + Git Sync 통합) ────────
const PIPELINE = [
  {
    icon: "C",
    title: "Claude Code",
    sub: "파일 직접 편집",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    icon: "G",
    title: "Git Commit",
    sub: "변경 이력 기록",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    icon: "H",
    title: "GitHub",
    sub: "원격 + Pages URL",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    icon: "O",
    title: "Obsidian",
    sub: "10분 자동 Pull",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
];

// ── 진화 타임라인 (v0→v4.0, 8단계) ──────────────────────────────
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
    title: "Local SoT + Orchestration",
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

// ── Obsidian 인터랙티브 목업 ─────────────────────────────────────────

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

// flat 리스트: folder는 folderId, 파일은 fileKey, parent로 접기 제어
interface SidebarEntry {
  name: string;
  indent: number;
  fileKey?: FileKey;
  folderId?: string;   // 이 항목이 폴더면 ID
  parent?: string;     // 부모 폴더 ID (접힐 때 숨김)
}

const SIDEBAR: SidebarEntry[] = [
  { name: "HOME.md", indent: 0, fileKey: "HOME.md" },
  { name: "CLAUDE.md", indent: 0, fileKey: "CLAUDE.md" },
  { name: ".ctx", indent: 0, folderId: "ctx" },
  { name: "shared-context.md", indent: 1, fileKey: "ctx/shared-context.md", parent: "ctx" },
  { name: "01_projects", indent: 0, folderId: "projects" },
  { name: "orchestration", indent: 1, folderId: "orch", parent: "projects" },
  { name: "STATE.md", indent: 2, fileKey: "orch/STATE.md", parent: "orch" },
  { name: "PLANNING.md", indent: 2, fileKey: "orch/PLANNING.md", parent: "orch" },
  { name: "KNOWLEDGE.md", indent: 2, fileKey: "orch/KNOWLEDGE.md", parent: "orch" },
  { name: "CHANGELOG.md", indent: 2, fileKey: "orch/CHANGELOG.md", parent: "orch" },
  { name: "portfolio", indent: 1, folderId: "pf", parent: "projects" },
  { name: "STATE.md", indent: 2, fileKey: "pf/STATE.md", parent: "pf" },
  { name: "tech-review", indent: 1, folderId: "tr", parent: "projects" },
  { name: "README.md", indent: 2, fileKey: "tr/README.md", parent: "tr" },
  { name: "monet-lab", indent: 1, folderId: "monet", parent: "projects" },
  { name: "README.md", indent: 2, fileKey: "monet/README.md", parent: "monet" },
  { name: "daily-memo", indent: 1, folderId: "daily", parent: "projects" },
  { name: "Inbox.md", indent: 2, fileKey: "daily/Inbox.md", parent: "daily" },
  { name: "03_evidence", indent: 0, folderId: "evidence" },
  { name: "README.md", indent: 1, fileKey: "evidence/README.md", parent: "evidence" },
];

const DEFAULT_OPEN = new Set(["projects", "orch", "pf", "tr", "monet", "daily", "evidence", "ctx"]);

// 공통 렌더 헬퍼
const H = (text: string) => (
  <div style={{ fontSize: 11, fontWeight: 600, color: C.purple, marginBottom: 4, marginTop: 12 }}>{text}</div>
);
const B = (text: string, meta?: string) => (
  <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
    {meta && <span style={{ color: C.dim }}>{meta} </span>}{text}
  </div>
);
const L = (text: string) => (
  <span style={{ color: C.purple }}>{"[["}{text}{"]]"}</span>
);
const Title = (text: string) => (
  <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{text}</div>
);
const Dim = (text: string) => (
  <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7, color: C.dim }}>{text}</div>
);
const Label = (label: string, value: string) => (
  <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
    <span style={{ color: C.dim, fontWeight: 600 }}>{label}:</span> {value}
  </div>
);

const FILE_CONTENT: Record<FileKey, React.ReactNode> = {
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

  "CLAUDE.md": (
    <>
      {Title("CLAUDE.md — 전역 규칙")}
      {H("언어 & 출력")}
      {B("한국어. 간결: DONE / FILES / NEXT")}
      {B("불확실 → 보류+이유. 범위 밖 금지.")}
      {H("Git")}
      {B('커밋: "[project] 한줄 설명"')}
      {B("force push 금지")}
      {H("에이전트 체인")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div>구현 → {L("code-reviewer")} → {L("commit-writer")} → living docs</div>
        <div>배포 → {L("pf-deployer")} → {L("security-auditor")} → push</div>
        <div>분석 → gemini + codex → {L("ai-synthesizer")} → 반영</div>
      </div>
      {H("토큰 관리")}
      {B("1세션 = 1목표. 150K+ → /compact")}
      {B("node_modules, .git, dist 읽기 금지")}
    </>
  ),

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

  "orch/PLANNING.md": (
    <>
      {Title("PLANNING.md — Architecture Decisions")}
      {H("D-001: SoT를 로컬 마크다운으로 전환")}
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

  "pf/STATE.md": (
    <>
      {Title("STATE.md — Portfolio")}
      {H("Current")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div>React + Vite, vanilla CSS, hash routing</div>
        <div>Branch: <span style={{ fontWeight: 600 }}>master</span></div>
      </div>
      {H("Sections")}
      {B("About (3) · System (6) · Work (3) · Writing (4) · Lab (1)")}
      {H("In Progress")}
      {B("Obsidian Vault System 섹션 구현")}
      {B("AI Workflow 섹션 데이터 업데이트")}
      {H("Next")}
      {B("Writing 카테고리 나머지 콘텐츠 채우기")}
      {B("Vercel 배포 + 커스텀 도메인")}
    </>
  ),

  "tr/README.md": (
    <>
      {Title("Tech Review — AI 뉴스 큐레이션")}
      {H("개요")}
      {B("매일 아침 GitHub Actions가 Perplexity API를 호출해")}
      {B("AI·빅테크·신기술 뉴스를 Smart Brevity 형식으로 자동 생성")}
      {H("스택")}
      {B("GitHub Actions (cron) → Perplexity API → Jekyll → GitHub Pages")}
      {H("요일별 테마")}
      {B("Mon: AI R&D · Tue: 빅테크 · Wed: AI×Industry")}
      {B("Thu: 스타트업 · Fri: 규제 · Sat: 도구&인프라")}
      {H("현황")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div><span style={{ color: C.purple, fontWeight: 600 }}>22개</span> 미커밋 포스트</div>
        <div>ko / en 2개 언어, 연간 ~600개 포스트</div>
      </div>
    </>
  ),

  "monet/README.md": (
    <>
      {Title("monet-lab — UI 실험실")}
      {H("목적")}
      {B("shadcn/ui + Tailwind CSS 기반 컴포넌트 실험")}
      {B("포트폴리오에 이식하기 전 프로토타이핑 공간")}
      {H("실험 목록")}
      {B("카드 레이아웃 변형 (3종)")}
      {B("타임라인 컴포넌트 (수직/수평)")}
      {B("인터랙티브 코드 블록")}
      {H("워크플로우")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div>{L("ml-experimenter")} 실험 리뷰 → {L("ml-porter")} 이식 판단</div>
      </div>
    </>
  ),

  "evidence/README.md": (
    <>
      {Title("03_evidence — 근거 자료")}
      {H("목적")}
      {B("설계 결정의 근거가 되는 원본 자료를 보관")}
      {B("스크린샷, 로그, 벤치마크 결과, 에러 기록")}
      {H("구조")}
      {B("screenshots/ — UI 캡처, 에러 화면")}
      {B("logs/ — 세션 로그, 빌드 로그")}
      {B("benchmarks/ — 토큰 사용량, 응답 시간 측정")}
      {H("규칙")}
      {B("날짜 프리픽스: 2026-02-23_screenshot.png")}
      {B(".gitignore에서 제외 — dev-vault에는 포함 안 됨")}
      {B("로컬 전용, 필요 시 수동으로 공유")}
    </>
  ),

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

  "daily/Inbox.md": (
    <>
      {Title("Inbox.md — 모바일 메모")}
      {H("개요")}
      {B("핸드폰 Claude Code에서 빠르게 메모를 남기는 INBOX")}
      {B("브랜치에 누적 → 컴퓨터에서 /todo로 merge + TODO 반영")}
      {H("최근 항목")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div><span style={{ color: C.dim }}>02-23 21:30</span> portfolio Obsidian 섹션 아이디어</div>
        <div><span style={{ color: C.dim }}>02-23 18:00</span> tr 프롬프트 개선안 — 산업별 키워드 강화</div>
        <div><span style={{ color: C.dim }}>02-22 23:15</span> n8n webhook → daily-memo 자동화 검토</div>
      </div>
      {H("흐름")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div>핸드폰 메모 → 브랜치 Inbox.md 누적 → /todo merge → {L("TODO.md")} 반영</div>
      </div>
    </>
  ),
};

function ObsidianMockup() {
  const [activeFile, setActiveFile] = useState<FileKey>("HOME.md");
  const [openFolders, setOpenFolders] = useState<Set<string>>(() => new Set(DEFAULT_OPEN));

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // 부모가 닫혀 있으면 숨김
  const isVisible = (entry: SidebarEntry): boolean => {
    if (!entry.parent) return true;
    // 직계 부모가 열려 있고, 부모의 부모도 열려 있어야 함
    const parentEntry = SIDEBAR.find((e) => e.folderId === entry.parent);
    if (!parentEntry) return openFolders.has(entry.parent);
    return openFolders.has(entry.parent) && isVisible(parentEntry);
  };

  return (
    <div
      style={{
        border: `1px solid ${C.purpleBorder}`,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* 타이틀바 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 10px",
          background: C.purpleBg,
          borderBottom: `1px solid ${C.purpleBorder}`,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 3,
            background: C.purple,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 8,
            color: C.white,
            fontWeight: 800,
          }}
        >
          O
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.purple }}>
          dev-vault
        </span>
        <span
          style={{
            fontSize: 9,
            color: C.dimmer,
            marginLeft: "auto",
            fontStyle: "italic",
          }}
        >
          클릭해서 탐색
        </span>
      </div>

      {/* 본문: 사이드바 + 에디터 */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* 사이드바 */}
        <div
          style={{
            width: 130,
            flexShrink: 0,
            padding: "6px 0",
            background: "#faf8ff",
            borderRight: `1px solid ${C.purpleBorder}`,
            fontFamily:
              "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
            fontSize: 9,
            lineHeight: 1.7,
            color: C.muted,
            overflow: "auto",
          }}
        >
          {SIDEBAR.map((entry) => {
            if (!isVisible(entry)) return null;
            const isFolder = !!entry.folderId;
            const isFile = !!entry.fileKey;
            const isActive = isFile && entry.fileKey === activeFile;
            const isOpen = isFolder && openFolders.has(entry.folderId!);

            const handleClick = () => {
              if (isFolder) toggleFolder(entry.folderId!);
              else if (isFile) {
                setActiveFile(entry.fileKey!);
                // 파일 클릭 시 부모 폴더 자동 열기
                if (entry.parent && !openFolders.has(entry.parent)) {
                  setOpenFolders((prev) => new Set([...prev, entry.parent!]));
                }
              }
            };

            return (
              <div
                key={`${entry.folderId ?? entry.fileKey ?? entry.name}-${entry.indent}`}
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                  }
                }}
                style={{
                  paddingLeft: 12 + entry.indent * 12,
                  paddingRight: 8,
                  background: isActive ? C.purpleBg : undefined,
                  borderLeft: isActive
                    ? `2px solid ${C.purple}`
                    : "2px solid transparent",
                  color: isActive
                    ? C.purple
                    : isFile
                      ? C.text
                      : C.muted,
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {isFolder ? (
                  <span
                    style={{
                      color: C.dimmer,
                      marginRight: 3,
                      display: "inline-block",
                      transition: "transform 0.15s",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                  >
                    {"\u25B8"}
                  </span>
                ) : (
                  <span style={{ marginRight: 3, opacity: 0.4 }}>
                    {"\u25A0"}
                  </span>
                )}
                {entry.name}
              </div>
            );
          })}
        </div>

        {/* 에디터 영역 */}
        <div
          style={{
            flex: 1,
            padding: "12px 14px",
            background: C.white,
            fontFamily:
              "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
            fontSize: 10,
            lineHeight: 1.7,
            color: C.muted,
            overflow: "auto",
          }}
        >
          {FILE_CONTENT[activeFile]}
        </div>
      </div>
    </div>
  );
}

// ── Graph View ──────────────────────────────────────────────────────

interface GNode {
  id: FileKey | "orch" | "pf" | "tr" | "monet" | "daily";
  label: string;
  x: number;
  y: number;
  color: string;
  r?: number; // 노드 반지름
}

interface GEdge {
  from: GNode["id"];
  to: GNode["id"];
}

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

const GRAPH_EDGES: GEdge[] = [
  // HOME → 프로젝트 STATE/README (MOC 허브)
  { from: "HOME.md", to: "orch/STATE.md" },
  { from: "HOME.md", to: "pf/STATE.md" },
  { from: "HOME.md", to: "tr/README.md" },
  { from: "HOME.md", to: "monet/README.md" },
  { from: "HOME.md", to: "daily/Inbox.md" },
  { from: "HOME.md", to: "CLAUDE.md" },
  // CLAUDE → 규칙이 참조하는 문서들
  { from: "CLAUDE.md", to: "orch/KNOWLEDGE.md" },
  { from: "CLAUDE.md", to: "orch/CHANGELOG.md" },
  { from: "CLAUDE.md", to: "orch/PLANNING.md" },
  { from: "CLAUDE.md", to: "orch/STATE.md" },
  // orch 내부 순환
  { from: "orch/STATE.md", to: "orch/PLANNING.md" },
  { from: "orch/STATE.md", to: "orch/CHANGELOG.md" },
  { from: "orch/PLANNING.md", to: "orch/KNOWLEDGE.md" },
  { from: "orch/KNOWLEDGE.md", to: "orch/CHANGELOG.md" },
  // 크로스 프로젝트 (orch가 다른 프로젝트를 추적)
  { from: "orch/STATE.md", to: "pf/STATE.md" },
  { from: "orch/STATE.md", to: "tr/README.md" },
  { from: "orch/STATE.md", to: "monet/README.md" },
  { from: "orch/STATE.md", to: "daily/Inbox.md" },
  // 프로젝트 간 횡단
  { from: "orch/KNOWLEDGE.md", to: "pf/STATE.md" },
  { from: "tr/README.md", to: "orch/KNOWLEDGE.md" },
  { from: "pf/STATE.md", to: "tr/README.md" },
  // daily → HOME (/todo merge)
  { from: "daily/Inbox.md", to: "HOME.md" },
  // Cross-CLI 연결
  { from: "ctx/shared-context.md", to: "CLAUDE.md" },
  { from: "ctx/shared-context.md", to: "orch/STATE.md" },
  { from: "ctx/shared-context.md", to: "HOME.md" },
];

function VaultGraph() {
  const [hovered, setHovered] = useState<GNode["id"] | null>(null);

  const connectedTo = (nodeId: GNode["id"]) => {
    if (!hovered) return true;
    if (nodeId === hovered) return true;
    return GRAPH_EDGES.some(
      (e) =>
        (e.from === hovered && e.to === nodeId) ||
        (e.to === hovered && e.from === nodeId),
    );
  };

  const edgeConnected = (edge: GEdge) => {
    if (!hovered) return true;
    return edge.from === hovered || edge.to === hovered;
  };

  const getNode = (id: GNode["id"]) => GRAPH_NODES.find((n) => n.id === id)!;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <svg
        viewBox="0 0 580 310"
        style={{
          width: "100%",
          flex: 1,
          background: "#faf8ff",
          borderRadius: 10,
          border: `1px solid ${C.purpleBorder}`,
        }}
      >
        {/* 엣지 */}
        {GRAPH_EDGES.map((edge) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const active = edgeConnected(edge);
          return (
            <line
              key={`${edge.from}-${edge.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={active ? C.purple : C.border}
              strokeWidth={active && hovered ? 1.5 : 0.8}
              strokeOpacity={active ? (hovered ? 0.7 : 0.3) : 0.1}
              style={{ transition: "all 0.2s" }}
            />
          );
        })}

        {/* 노드 */}
        {GRAPH_NODES.map((node) => {
          const active = connectedTo(node.id);
          const isHovered = node.id === hovered;
          const r = node.r ?? 12;
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* 호버 시 glow */}
              {isHovered && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r + 6}
                  fill={node.color}
                  opacity={0.12}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={active ? node.color : C.border}
                opacity={active ? (isHovered ? 1 : 0.85) : 0.3}
                style={{ transition: "all 0.2s" }}
              />
              <text
                x={node.x}
                y={node.y + r + 12}
                textAnchor="middle"
                fontSize={9}
                fontWeight={isHovered ? 700 : 500}
                fontFamily="'SF Mono', 'Cascadia Code', 'Consolas', monospace"
                fill={active ? C.text : C.dimmer}
                opacity={active ? 1 : 0.3}
                style={{ transition: "all 0.2s" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}



// ── 메인 컴포넌트 ───────────────────────────────────────────────────
export function ObsidianSystemSection() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 8 }}
    >
      {/* ① The Problem — 왜 필요한가 */}
      <div>
        <p style={labelStyle}>The Problem</p>
        <p
          style={{
            fontSize: 14,
            color: C.text,
            lineHeight: 1.75,
            margin: "0 0 14px",
          }}
        >
          Claude Code는 메인 오케스트레이터로서 프로젝트의 모든 맥락을
          알고 있다. 문제는 그 지식이 AI 안에만 있으면 내가 조율할 수
          없다는 것이었다. 프로젝트 5개, CLI 3개, 에이전트 팀이
          동시에 도는 상황에서 "지금 전체적으로 뭐가 어떻게 돌아가고
          있지?"를 내가 볼 수 없었다.
        </p>

        {/* PIVOT: Ctrl+Alt+V 시대 에피소드 */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 14,
            alignItems: "flex-start",
            padding: "12px 14px",
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#c2410c",
              background: "#ffedd5",
              border: "1px solid #fed7aa",
              borderRadius: 3,
              padding: "2px 6px",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            PIVOT
          </span>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Ctrl+Alt+V — 매 세션마다 복붙하던 시절
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              초기 해결책은 무식했다. PowerShell로 STATE.md를
              SNAPSHOT.txt로 변환하고, AutoHotKey 단축키(Ctrl+Alt+V)로
              ChatGPT 창에 붙여넣었다. 어느 날 STATE.md를 업데이트하고
              SNAPSHOT 변환을 빠뜨렸다. AI가 이미 끝난 작업을 처음부터
              다시 설계하는 걸 보고서야 알았다. Obsidian에도 같은 파일이
              있었는데, 어느 쪽이 최신인지 확인할 방법이 없었다.
            </div>
          </div>
        </div>

        {/* Before → After */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: 10,
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <div style={{ flex: 1, padding: "12px 14px", background: "#fafafa" }}>
            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.rose,
                  background: C.roseBg,
                  border: `1px solid ${C.roseBorder}`,
                  borderRadius: 3,
                  padding: "2px 6px",
                }}
              >
                BEFORE
              </span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              PowerShell 변환 → AutoHotKey 복붙 → 수동 확인.
              같은 정보가 두 곳에 있었고, 항상 어긋났다.
            </div>
          </div>
          <div style={{ width: 1, background: C.border, flexShrink: 0 }} />
          <div style={{ flex: 1, padding: "12px 14px", background: C.white }}>
            <div
              style={{
                display: "flex",
                gap: 6,
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.blue,
                  background: C.blueBg,
                  border: `1px solid ${C.blueBorder}`,
                  borderRadius: 3,
                  padding: "2px 6px",
                }}
              >
                AFTER
              </span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              Claude Code가 직접 편집 → Git 커밋 → Obsidian 자동 반영.
              손대는 단계가 없다. 진실은 로컬 파일 하나.
            </div>
          </div>
        </div>

      </div>

      {/* ② File Structure */}
      <div>
        <p style={labelStyle}>File Structure</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          AI가 쓰는 문서를 내가 볼 수 있어야 했다. Notion이나 Google
          Docs는 AI가 직접 읽고 쓸 수 없다. 로컬 마크다운이면 AI가
          파일을 직접 고치고, Obsidian으로 바로 본다. 구조는 단순하게
          — 폴더 깊이 5레벨 이하, 넘버링 정렬, 99번은 Archive.
        </p>
        <div
          style={{
            background: "#1a1a1a",
            borderRadius: 16,
            padding: "40px 28px 36px",
          }}
        >
          {/* Top node */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 20px",
                border: "1px solid #333",
                borderRadius: 8,
                background: "#252525",
              }}
            >
              <span style={{ fontSize: 12, color: "#888" }}>📁</span>
              <span
                style={{
                  fontSize: 13,
                  color: "#fff",
                  fontWeight: 600,
                  fontFamily: "'SF Mono','Cascadia Code','Consolas',monospace",
                  letterSpacing: "0.04em",
                }}
              >
                DEV-VAULT
              </span>
            </div>
          </div>

          {/* SVG connector curves */}
          <svg
            viewBox="0 0 400 50"
            style={{ width: "100%", height: 50, display: "block" }}
            preserveAspectRatio="none"
          >
            <path d="M200,0 C200,28 56,22 56,50" stroke="#333" strokeWidth="1.2" fill="none" />
            <path d="M200,0 C200,28 163,22 163,50" stroke="#333" strokeWidth="1.2" fill="none" />
            <path d="M200,0 C200,28 270,22 270,50" stroke="#333" strokeWidth="1.2" fill="none" />
            <path d="M200,0 C200,28 344,22 344,50" stroke="#333" strokeWidth="1.2" fill="none" />
          </svg>

          {/* Child nodes — 4 columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 14,
              alignItems: "start",
              fontFamily: "'SF Mono','Cascadia Code','Consolas',monospace",
            }}
          >
            {/* 01_projects */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  border: "1px solid #333",
                  borderRadius: 6,
                  background: "#252525",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 11, color: "#888" }}>📁</span>
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>
                  01_projects
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 2.1, paddingLeft: 6 }}>
                <div>· orchestration</div>
                <div>· portfolio</div>
                <div>· tech-review</div>
                <div>· daily-memo</div>
              </div>
            </div>

            {/* .ctx */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  border: "1px solid #333",
                  borderRadius: 6,
                  background: "#252525",
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: 11, color: "#888" }}>📁</span>
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>
                  .ctx
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#888", lineHeight: 2.1, paddingLeft: 6 }}>
                <div>· shared-context.md</div>
              </div>
            </div>

            {/* HOME.md */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  border: "1px solid #333",
                  borderRadius: 6,
                  background: "#252525",
                }}
              >
                <span style={{ fontSize: 11, color: "#888" }}>📄</span>
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>
                  HOME.md
                </span>
              </div>
            </div>

            {/* CLAUDE.md */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  border: "1px solid #333",
                  borderRadius: 6,
                  background: "#252525",
                }}
              >
                <span style={{ fontSize: 11, color: "#888" }}>📄</span>
                <span style={{ fontSize: 12, color: "#fff", fontWeight: 500 }}>
                  CLAUDE.md
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ③ How It Works */}
      <div>
        <p style={labelStyle}>How It Works</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          누가 쓰고, 누가 읽고, 누가 기록하는지 — 이걸 나누는 데
          2주가 걸렸다. 나는 HOME.md에서 전체 현황을 보고, 각 AI는
          자기 프로젝트의 STATE.md만 읽는다. 같은 볼트 안에 있지만
          관심사가 다르다.
        </p>

        {/* 파이프라인 */}
        <div
          style={{
            display: "flex",
            gap: 0,
            alignItems: "stretch",
            flexWrap: "wrap",
            rowGap: 8,
            marginBottom: 16,
          }}
        >
          {PIPELINE.map((step, i) => (
            <React.Fragment key={step.title}>
              <div
                style={{
                  flex: "1 1 0",
                  minWidth: 100,
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  borderRadius: 8,
                  padding: "14px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: step.color,
                    marginBottom: 6,
                    fontFamily:
                      "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
                  }}
                >
                  {step.icon}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: step.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                    marginBottom: 4,
                  }}
                >
                  {step.title}
                </div>
                <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.3 }}>
                  {step.sub}
                </div>
              </div>
              {i < PIPELINE.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 4px",
                    color: C.dim,
                    fontSize: 13,
                    flexShrink: 0,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* 충돌 에피소드 */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
            alignItems: "flex-start",
            padding: "12px 14px",
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            borderRadius: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#c2410c",
              background: "#ffedd5",
              border: "1px solid #fed7aa",
              borderRadius: 3,
              padding: "2px 6px",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            LESSON
          </span>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Obsidian에서 편집하면 안 된다
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              PLANNING.md를 Obsidian에서 직접 고쳤다. 같은 시간에
              Claude Code도 같은 파일을 수정하고 커밋해버렸다. Git 충돌.
              어느 쪽이 맞는 건지 판단하는 데 30분을 썼다. 그날 규칙을
              만들었다 — 쓰기는 Claude Code만, 보기는 Obsidian만,
              기록은 Git만. 나눈 뒤로 충돌이 0이 됐다.
            </div>
          </div>
        </div>

        {/* 역할 분리 규칙 — 3컬럼 카드 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 10,
          }}
        >
          {[
            {
              role: "Writer",
              who: "Claude Code",
              detail: "마크다운 직접 편집 → git commit + push",
              color: C.purple,
              bg: C.purpleBg,
              border: C.purpleBorder,
            },
            {
              role: "Persistence",
              who: "Git + GitHub",
              detail:
                "dev-vault 단일 repo. 모든 변경을 기록하고, GitHub Pages로 STATE.md를 퍼블릭 URL로 노출한다",
              color: C.teal,
              bg: C.tealBg,
              border: C.tealBorder,
            },
            {
              role: "Viewer",
              who: "Obsidian",
              detail:
                "Obsidian Git 플러그인 — 10분 간격 자동 Pull. 편집 금지, 읽기 전용",
              color: C.green,
              bg: C.greenBg,
              border: C.greenBorder,
            },
          ].map((r) => (
            <div
              key={r.role}
              style={{
                border: `1px solid ${r.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: r.bg,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: r.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  marginBottom: 4,
                }}
              >
                {r.role}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                {r.who}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>
                {r.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Cross-CLI */}
        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 14,
            alignItems: "flex-start",
            padding: "12px 14px",
            background: C.roseBg,
            border: `1px solid ${C.roseBorder}`,
            borderRadius: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.rose,
              background: "#fff",
              border: `1px solid ${C.roseBorder}`,
              borderRadius: 3,
              padding: "2px 6px",
              flexShrink: 0,
              marginTop: 1,
            }}
          >
            v4.0
          </span>
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: C.text,
                marginBottom: 4,
              }}
            >
              Cross-CLI — .ctx/ 공유 메모리
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              v4.0에서 CLI가 3개로 늘었다. Claude Code가 쓴 컨텍스트를
              Gemini가 읽고, Codex가 검증한다. 문제는 각 CLI가 다른 설정
              파일을 쓴다는 것이었다. .ctx/shared-context.md에 공유 상태를
              두고, rulesync로 CLAUDE.md와 GEMINI.md를 자동 생성하게
              만들었다. 같은 규칙, 같은 상태, 다른 역할.
            </div>
          </div>
        </div>
      </div>

      {/* ④ Evolution */}
      <div>
        <p style={labelStyle}>Evolution</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          이 구조는 처음부터 있던 게 아니다. 2주 동안 8번 뒤집었다.
          처음에는 기능을 계속 더했다 — 에이전트 24개, 스크립트 수십 개.
          v3.3에서 더 이상 관리가 안 됐다. 그때 깨달았다.
          진짜 설계는 빼는 순간에 일어난다.
        </p>
        <div
          style={{
            position: "relative",
            paddingLeft: 20,
            borderLeft: `2px solid ${C.border}`,
          }}
        >
          {EVOLUTION.map((ev, i) => (
            <div
              key={ev.version}
              style={{
                position: "relative",
                marginBottom: i < EVOLUTION.length - 1 ? 18 : 0,
                opacity: ev.deprecated ? 0.55 : 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: -27,
                  top: 2,
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: ev.deprecated ? C.dim : ev.color,
                  border: `2px solid ${C.white}`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: ev.deprecated ? C.dim : ev.color,
                    background: ev.bg,
                    border: `1px solid ${ev.border}`,
                    borderRadius: 3,
                    padding: "2px 6px",
                    textDecoration: ev.deprecated
                      ? "line-through"
                      : undefined,
                  }}
                >
                  {ev.version}
                </span>
                <span style={{ fontSize: 10, color: C.dimmer }}>
                  {ev.date}
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 3,
                  textDecoration: ev.deprecated
                    ? "line-through"
                    : undefined,
                }}
              >
                {ev.title}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                {ev.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⑤ What I Learned */}
      <div>
        <p style={labelStyle}>What I Learned</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 14px",
          }}
        >
          2주간의 시행착오를 숫자 네 개로 요약한다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 10,
            marginBottom: 32,
          }}
        >
          {[
            {
              number: "3",
              unit: "CLI",
              desc: "Claude, Gemini, Codex가 같은 STATE.md를 읽는다. 컨텍스트 전달 비용이 0이 됐다",
              color: C.blue,
              bg: C.blueBg,
              border: C.blueBorder,
            },
            {
              number: "15",
              unit: "에이전트",
              desc: "24개에서 15개로 줄였다. 줄이고 나서 오히려 더 강력해졌다",
              color: C.purple,
              bg: C.purpleBg,
              border: C.purpleBorder,
            },
            {
              number: "8",
              unit: "Hooks",
              desc: "세션 시작부터 도구 실행 후까지. 수동으로 기억할 단계가 없다",
              color: C.teal,
              bg: C.tealBg,
              border: C.tealBorder,
            },
            {
              number: "0",
              unit: "수동 동기화",
              desc: "Claude가 쓰면 Git이 기록하고, Obsidian이 가져온다. 동기화 버튼을 누른 적이 없다",
              color: C.green,
              bg: C.greenBg,
              border: C.greenBorder,
            },
          ].map((m) => (
            <div
              key={m.unit}
              style={{
                border: `1px solid ${m.border}`,
                borderRadius: 10,
                padding: "16px",
                background: m.bg,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: m.color,
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {m.number}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: m.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  marginBottom: 6,
                }}
              >
                {m.unit}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
                {m.desc}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
