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
  fontSize: 10,
  fontWeight: 700,
  color: C.dimmer,
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: 14,
};

// ── 볼트 구조 트리 ──────────────────────────────────────────────────
const VAULT_TREE = [
  { path: "HOME.md", indent: 0, desc: "MOC — 중앙 허브" },
  { path: "CLAUDE.md", indent: 0, desc: "전역 AI 규칙" },
  { path: "01_projects/", indent: 0, desc: "" },
  { path: "orchestration/", indent: 1, desc: "시스템 운영" },
  { path: "portfolio/", indent: 1, desc: "포트폴리오" },
  { path: "tech-review/", indent: 1, desc: "AI 뉴스 큐레이션" },
  { path: "monet-lab/", indent: 1, desc: "UI 실험" },
  { path: "daily-memo/", indent: 1, desc: "모바일 INBOX" },
  { path: "03_evidence/", indent: 0, desc: "스크린샷, 로그" },
];

// ── Living Docs 카드 ────────────────────────────────────────────────
const LIVING_DOCS = [
  {
    label: "HOME.md",
    desc: "중앙 허브(MOC). 모든 프로젝트 링크 + 오늘의 세션 + 미결 사항.",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    label: "STATE.md",
    desc: "프로젝트별 단일 진실. 현재 진행 중 / 완료 / 다음 단계.",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    label: "PLANNING.md",
    desc: "아키텍처 결정 기록(ADR). 왜 그 결정을 했는지 추적.",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
  {
    label: "KNOWLEDGE.md",
    desc: "모범 사례 + 패턴 누적. 같은 판단을 반복하지 않기 위한 참조.",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
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

// ── 진화 타임라인 (핵심 5단계로 압축) ──────────────────────────────
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
    desc: "Jeff Su 폴더 방법론 도입, Git을 단일 SoT로 결정. Skills 11개, Scripts 5개, 문서 3분화(STATE/PLANNING/KNOWLEDGE) 구축.",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
    deprecated: false,
  },
  {
    version: "v2.0",
    date: "Feb 19–21",
    title: "dev-vault + Obsidian Git",
    desc: "C:\\dev 전체를 단일 Git repo로 초기화. HOME.md 중앙 MOC 신설. Obsidian Git 플러그인으로 10분 자동 동기화.",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
    deprecated: false,
  },
  {
    version: "v3.0",
    date: "Feb 22–23",
    title: "Living Docs 규칙화",
    desc: "문서 자동 갱신 원칙 공식화. 에이전트/스킬/hook 변경 시 6개 문서 필수 업데이트 — CLAUDE.md 체인 규칙으로 강제.",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
    deprecated: false,
  },
  {
    version: "v3.1",
    date: "Feb 23",
    title: "Agent Teams + live-context",
    desc: "에이전트 23개, 팀 3개. live-context.md로 세션 간 실시간 맥락 공유. project-linker로 프로젝트 간 변경 감지.",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
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
  | "evidence/README.md";

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

const DEFAULT_OPEN = new Set(["projects", "orch", "pf", "tr", "monet", "daily", "evidence"]);

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
        <span>orchestration</span><span style={{ color: C.green, fontWeight: 600 }}>v3.1 active</span><span>main</span>
        <span>portfolio</span><span style={{ color: C.amber, fontWeight: 600 }}>building</span><span>master</span>
        <span>tech-review</span><span style={{ color: C.purple, fontWeight: 600 }}>22 uncommitted</span><span>main</span>
      </div>
      {H("Today's Session")}
      {B("Obsidian 섹션 추가 (portfolio)", "23:00")}
      {B("Agent Teams 설계 완료 (orchestration)", "22:00")}
      {H("Open Decisions")}
      <div style={{ paddingLeft: 4, fontSize: 10, lineHeight: 1.7 }}>
        <div>{L("D-023")} Phase E 파일럿 테스트</div>
        <div>{L("D-024")} TR 프롬프트 Smart Brevity 전환</div>
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
        <div><span style={{ color: C.green, fontWeight: 600 }}>v3.1</span> Agent Teams & Linker System</div>
        <div>에이전트 23개, 팀 3개, hooks 7개</div>
      </div>
      {H("In Progress")}
      {B("tech-review 미커밋 22개 정리")}
      {B("inbox-processor 실전: 8건 새 항목")}
      {H("Completed (recent)")}
      {Dim("v3.0 에이전틱 워크플로우")}
      {Dim("v2.2 시스템 오버홀")}
      {Dim("v2.0 dev-vault Git 초기화")}
      {H("Next")}
      {B("Phase E 파일럿 (Agent Teams + worktree 병렬)")}
      {B("ai-synthesizer 실전 테스트")}
    </>
  ),

  "orch/PLANNING.md": (
    <>
      {Title("PLANNING.md — Architecture Decisions")}
      {H("D-001: SoT를 Git으로 전환")}
      {Label("문제", "Obsidian만으로는 다른 AI가 접근 불가")}
      {Label("해결", "Git STATE.md + GitHub Pages URL")}
      {Label("효과", "AI 4종 동기화 해결")}
      {H("D-003: Jeff Su 폴더 방법론")}
      {Label("문제", "파일이 늘수록 구조가 무너짐")}
      {Label("해결", "5레벨 MAX, 2자리 넘버링, 99=Archive")}
      {H("D-019: Obsidian = 뷰어 전용")}
      {Label("문제", "Obsidian 편집과 AI 편집이 충돌")}
      {Label("해결", "읽기 전용 + Claude Code 단일 쓰기")}
    </>
  ),

  "orch/KNOWLEDGE.md": (
    <>
      {Title("KNOWLEDGE.md — Patterns & Rules")}
      {H("반복 실수 패턴")}
      {B("파일 재읽기 금지 — 이미 읽은 파일은 다시 읽지 않는다")}
      {B("Write 전 Read 필수 — 기존 파일 수정 전 반드시 Read 먼저")}
      {B("병렬 Write 금지 — 같은 파일을 동시에 수정하지 않는다")}
      {H("에이전트 운영 규칙")}
      {B("Haiku: 상태 확인, 브리핑, 요약")}
      {B("Sonnet: 탐색, 검색, 코드 분석")}
      {B("Opus: 설계 결정, 크로스 검증, 복잡한 실행")}
      {H("교훈")}
      {B("gemini-analyzer 분석 결과는 크로스 검증 필수")}
      {B("100만 토큰 광역 분석은 개별 항목의 실제 사용 이력을 놓칠 수 있음")}
    </>
  ),

  "orch/CHANGELOG.md": (
    <>
      {Title("CHANGELOG.md — Version History")}
      {H("v3.1 — 2026-02-23")}
      {B("Agent Teams & Linker System")}
      {B("에이전트 7개 추가 (16→23), 팀 3개, live-context.md")}
      {B("context-linker + project-linker 프로젝트 간 연동")}
      {H("v3.0 — 2026-02-23")}
      {B("에이전틱 워크플로우 강화")}
      {B("체인 규칙, agent.md 표준화, hooks 품질 게이트")}
      {H("v2.2 — 2026-02-22")}
      {B("시스템 오버홀 — 죽은 자동화 수리, stale 문서 정리")}
      {H("v2.0 — 2026-02-21")}
      {B("dev-vault git init, Obsidian Git 연동, agents 14개")}
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
        marginTop: 14,
        border: `1px solid ${C.purpleBorder}`,
        borderRadius: 10,
        overflow: "hidden",
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
      <div style={{ display: "flex", minHeight: 280 }}>
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
  // orchestration 클러스터 (좌측)
  { id: "orch/STATE.md", label: "STATE", x: 120, y: 120, color: C.blue, r: 9 },
  { id: "orch/PLANNING.md", label: "PLANNING", x: 60, y: 200, color: C.green, r: 7 },
  { id: "orch/KNOWLEDGE.md", label: "KNOWLEDGE", x: 160, y: 240, color: C.amber, r: 7 },
  { id: "orch/CHANGELOG.md", label: "CHANGELOG", x: 40, y: 80, color: C.teal, r: 6 },
  // portfolio (우측 상단)
  { id: "pf/STATE.md", label: "PF STATE", x: 480, y: 80, color: C.blue, r: 7 },
  // tech-review (우측)
  { id: "tr/README.md", label: "TR README", x: 520, y: 180, color: C.rose, r: 7 },
  // monet (우측 하단)
  { id: "monet/README.md", label: "monet", x: 460, y: 250, color: C.teal, r: 6 },
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
    <div>
      <svg
        viewBox="0 0 580 310"
        style={{
          width: "100%",
          height: 310,
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
      {/* ① Why + Before/After */}
      <div>
        <p style={labelStyle}>Why Obsidian</p>
        <div
          style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "20px 22px",
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: C.text,
              lineHeight: 1.75,
              margin: "0 0 14px",
            }}
          >
            문서가 죽으면 AI가 구정보로 판단한다. Notion이나 Google Docs는
            API 없이 AI가 직접 읽고 쓸 수 없다. 로컬 마크다운이면 파일
            시스템 접근만으로 편집이 가능하고, Git이면 버전 관리와 동기화가
            해결된다. Obsidian은 그 마크다운을 보여주는 가장 좋은 뷰어다.
          </p>
          <p
            style={{
              fontSize: 14,
              color: C.muted,
              lineHeight: 1.75,
              margin: 0,
              borderLeft: `3px solid ${C.blue}`,
              paddingLeft: 14,
            }}
          >
            Living Docs — 문서는 작성 시점에 완성되는 게 아니라, 시스템이
            매일 갱신해야 살아 있다. AI가 쓰고, Git이 기록하고, Obsidian이
            보여준다.
          </p>
        </div>

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
              초기에는 PowerShell로 STATE.md를 SNAPSHOT.txt로 변환하고,
              AutoHotKey 단축키(Ctrl+Alt+V)로 ChatGPT에 붙여넣었다.
              어느 날 STATE.md를 업데이트했는데 SNAPSHOT 변환을 빠뜨렸고,
              AI가 이미 끝난 작업을 처음부터 다시 설계했다.
              Obsidian에도 같은 파일이 있었지만 어느 쪽이 최신인지 알 수
              없었다. bridge 스크립트 3개, 수동 단계 2개 — 유지할 수 없었다.
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
              이중 SoT, 동기화 누락 상시 발생.
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
              Claude Code가 직접 편집 → Git 커밋 → Obsidian 자동 Pull.
              수동 단계 0개, SoT는 Git 하나.
            </div>
          </div>
        </div>
      </div>

      {/* ② Vault Structure */}
      <div>
        <p style={labelStyle}>Vault Structure</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          Jeff Su 5레벨 폴더 방법론 기반. 2자리 넘버링으로 자동 정렬, 99는
          Archive.
        </p>
        <div
          style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "16px 18px",
            fontFamily: "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
            fontSize: 12,
            lineHeight: 1.8,
            color: C.text,
          }}
        >
          {VAULT_TREE.map((item) => (
            <div
              key={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingLeft: item.indent * 24,
              }}
            >
              <span
                style={{
                  color: item.path.endsWith("/") ? C.blue : C.purple,
                  fontWeight: 600,
                }}
              >
                {item.path}
              </span>
              {item.desc && (
                <span style={{ fontSize: 10, color: C.dim }}>
                  {item.desc}
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginTop: 12,
          }}
        >
          {[
            {
              label: "Jeff Su 5레벨 MAX",
              color: C.blue,
              bg: C.blueBg,
              border: C.blueBorder,
            },
            {
              label: "2자리 넘버링",
              color: C.purple,
              bg: C.purpleBg,
              border: C.purpleBorder,
            },
            {
              label: "99=Archive",
              color: C.amber,
              bg: C.amberBg,
              border: C.amberBorder,
            },
          ].map((b) => (
            <span
              key={b.label}
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: b.color,
                background: b.bg,
                border: `1px solid ${b.border}`,
                borderRadius: 4,
                padding: "3px 8px",
              }}
            >
              {b.label}
            </span>
          ))}
        </div>
      </div>

      {/* ③ Living Documents + HOME.md 미리보기 */}
      <div>
        <p style={labelStyle}>Living Documents</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          STATE.md가 단일 진실(Source of Truth). /sync 명령으로 갱신하고,
          모든 AI가 같은 상태를 읽는다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 10,
          }}
        >
          {LIVING_DOCS.map((doc) => (
            <div
              key={doc.label}
              style={{
                border: `1px solid ${doc.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: doc.bg,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: doc.color,
                  marginBottom: 6,
                  fontFamily:
                    "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
                }}
              >
                {doc.label}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.55 }}>
                {doc.desc}
              </div>
            </div>
          ))}
        </div>

        {/* /catchup 체감 스토리 */}
        <div
          style={{
            display: "flex",
            gap: 0,
            marginTop: 14,
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
              <span style={{ fontSize: 10, color: C.dimmer }}>
                매 세션 시작
              </span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              "어제 orchestration에서 에이전트 3개 만들었고, portfolio는
              빌드 깨져 있고, tech-review는 프롬프트 수정 중이야..."
              — 매번 5분간 컨텍스트를 직접 설명해야 했다.
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
              <span style={{ fontSize: 10, color: C.dimmer }}>
                /catchup 한 줄
              </span>
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
              AI가 STATE.md를 읽고 이미 알고 있다.
              "orchestration v3.1, 다음은 tech-review 미커밋 22개 정리."
              — 문서가 살아 있으면 설명할 필요가 없다.
            </div>
          </div>
        </div>

        {/* Vault 목업 + Graph View 양옆 배치 */}
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 14,
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <ObsidianMockup />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <VaultGraph />
          </div>
        </div>
      </div>

      {/* ⑤ How It Works (AI Integration + Git Sync 통합) */}
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
          쓰기 권한은 Claude Code에만 있다. Obsidian은 읽기 전용 뷰어.
          Git이 유일한 동기화 채널이자 Source of Truth.
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
              Obsidian에서 PLANNING.md를 직접 고쳤는데, 같은 시간에
              Claude Code도 같은 파일을 수정하고 커밋했다. Git 충돌이
              발생했고, 어느 쪽 변경이 맞는지 판단하는 데 시간을 낭비했다.
              이후 규칙을 만들었다 — 쓰기 권한은 하나에만.
              Obsidian은 보는 도구, Claude는 쓰는 도구, Git은 기록.
              역할을 나누니 충돌이 사라졌다.
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
              role: "Source of Truth",
              who: "Git + GitHub",
              detail:
                "dev-vault 단일 repo. GitHub Pages로 STATE.md 퍼블릭 URL 노출",
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
      </div>

      {/* ⑤ Evolution */}
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
          2주 동안 5번의 구조 변경. bridge 스크립트에서 시작해 23개
          에이전트가 자동 갱신하는 Living Docs 시스템까지.
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

      {/* ⑥ Impact */}
      <div>
        <p style={labelStyle}>Impact</p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {[
            {
              number: "4",
              unit: "AI",
              desc: "Claude · GPT · Gemini · Perplexity가 같은 STATE.md를 읽는다",
              color: C.blue,
              bg: C.blueBg,
              border: C.blueBorder,
            },
            {
              number: "38K",
              unit: "토큰/세션",
              desc: "CLAUDE.md 4줄 축소로 매 턴 절감",
              color: C.purple,
              bg: C.purpleBg,
              border: C.purpleBorder,
            },
            {
              number: "6",
              unit: "Living Docs",
              desc: "에이전트가 변경 시 자동 업데이트하는 문서 수",
              color: C.teal,
              bg: C.tealBg,
              border: C.tealBorder,
            },
            {
              number: "0",
              unit: "수동 동기화",
              desc: "Obsidian Git 자동 Pull + Claude 자동 Push",
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
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: 0,
            borderLeft: `3px solid ${C.blue}`,
            paddingLeft: 14,
          }}
        >
          bridge 스크립트를 폐기하고 역할을 셋으로 분리한 것이 가장 큰
          전환점이었다. Writer, Source of Truth, Viewer — 각각 하나의
          도구만 담당하면 충돌이 사라진다.
        </p>
      </div>
    </div>
  );
}
