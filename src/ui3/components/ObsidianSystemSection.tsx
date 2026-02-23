import React from "react";

// ── 색상 팔레트 (TechReviewSystemSection과 동일) ────────────────────
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

// ── AI 연동 파이프라인 ──────────────────────────────────────────────
const AI_PIPELINE = [
  {
    icon: "C",
    title: "Claude Code",
    sub: "파일 편집",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    icon: "G",
    title: "Git Commit",
    sub: "변경 기록",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    icon: "H",
    title: "GitHub",
    sub: "원격 저장소",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
  },
  {
    icon: "P",
    title: "Obsidian Git",
    sub: "자동 Pull",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
  {
    icon: "O",
    title: "Obsidian",
    sub: "뷰어",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
  },
];

// ── Git 동기화 카드 ─────────────────────────────────────────────────
const GIT_SYNC = [
  {
    tech: "Obsidian Git",
    reason: "10분 자동 커밋",
    detail:
      "Obsidian Community Plugin. 10분 간격으로 변경 감지 → 자동 커밋 + 풀. 수동 조작 없이 양방향 동기화.",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
  },
  {
    tech: "dev-vault",
    reason: "C:\\dev 전체를 단일 Git repo",
    detail:
      "프로젝트 폴더, 설정, 문서를 하나의 저장소로 관리. .gitignore로 node_modules, .git 하위 등 제외.",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
  },
  {
    tech: "GitHub Pages",
    reason: "AI가 URL로 STATE.md 읽기",
    detail:
      "GitHub Pages로 STATE.md를 퍼블릭 URL로 노출. ChatGPT 등 외부 AI도 프로젝트 상태를 실시간으로 읽을 수 있다.",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
  },
];

// ── 진화 타임라인 ───────────────────────────────────────────────────
const EVOLUTION = [
  {
    version: "v0",
    date: "2026-02 초",
    title: "context-repo 시대",
    desc: "Obsidian 볼트와 Git repo가 분리. PowerShell 스크립트로 STATE.md를 SNAPSHOT.txt로 변환, AutoHotKey로 ChatGPT에 주입하는 bridge 방식.",
    color: C.dim,
    bg: C.bg,
    border: C.border,
    deprecated: true,
  },
  {
    version: "v0.5",
    date: "Feb 15",
    title: "Jeff Su + SoT 전환",
    desc: "Jeff Su PARA 변형 폴더 구조 도입. Git을 단일 Source of Truth로 결정. context-repo bridge 방식 폐기. Claude Code = 유일한 쓰기 권한.",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
    deprecated: false,
  },
  {
    version: "v1.0",
    date: "Feb 17",
    title: "Orchestration System",
    desc: "Skills 11개, Scripts 5개, Auto-memory 3-phase 구축. Obsidian Junction 연결, Multi-AI 오케스트레이션, 문서 3분화(STATE/PLANNING/KNOWLEDGE).",
    color: C.purple,
    bg: C.purpleBg,
    border: C.purpleBorder,
    deprecated: false,
  },
  {
    version: "v1.5",
    date: "Feb 19",
    title: "HOME.md 중앙 MOC",
    desc: "C:\\dev 전체를 Obsidian 볼트로 확장. HOME.md 신설 — 모든 프로젝트의 진입점. ai-config를 orchestration/config/로 통합.",
    color: C.teal,
    bg: C.tealBg,
    border: C.tealBorder,
    deprecated: false,
  },
  {
    version: "v2.0",
    date: "Feb 21",
    title: "dev-vault Git + Obsidian Git",
    desc: "C:\\dev 전체를 단일 Git repo로 초기화. Obsidian Git 플러그인으로 10분 자동 커밋·풀. GitHub Pages로 STATE.md 퍼블릭 노출.",
    color: C.green,
    bg: C.greenBg,
    border: C.greenBorder,
    deprecated: false,
  },
  {
    version: "v2.2",
    date: "Feb 22",
    title: "오버홀 + Living Docs 개념",
    desc: "죽은 자동화 수리, stale 문서 정리. Living Docs 개념이 처음 등장 — 문서가 시스템에 의해 자동 갱신되어야 한다는 원칙.",
    color: C.amber,
    bg: C.amberBg,
    border: C.amberBorder,
    deprecated: false,
  },
  {
    version: "v3.0",
    date: "Feb 23",
    title: "에이전틱 워크플로우",
    desc: "Living Docs 업데이트 규칙이 CLAUDE.md 체인 규칙으로 공식화. 에이전트/스킬/hook 변경 시 6개 문서 필수 업데이트.",
    color: C.rose,
    bg: C.roseBg,
    border: C.roseBorder,
    deprecated: false,
  },
  {
    version: "v3.1",
    date: "Feb 23",
    title: "Agent Teams + live-context",
    desc: "에이전트 23개, 팀 3개. live-context.md로 세션 간 실시간 맥락 공유. context-linker + project-linker로 프로젝트 간 변경 감지.",
    color: C.blue,
    bg: C.blueBg,
    border: C.blueBorder,
    deprecated: false,
  },
];

// ── 설계 결정 ADR ───────────────────────────────────────────────────
const ADRS = [
  {
    id: "D-001",
    title: "SoT를 Git으로 전환",
    problem: "Obsidian만으로는 다른 AI가 접근 불가",
    solution: "Git STATE.md + GitHub Pages URL로 모든 AI 공유",
    impact: "AI 간 정보 동기화 해결",
  },
  {
    id: "D-003",
    title: "Jeff Su 폴더 방법론 채택",
    problem: "파일이 늘수록 구조가 무너짐",
    solution: "5레벨 MAX, 2자리 넘버링, 99=Archive 규칙",
    impact: "자동 정렬 + 명확성",
  },
  {
    id: "D-019",
    title: "Obsidian = 뷰어 전용",
    problem: "Obsidian 편집과 AI 편집이 충돌",
    solution: "Obsidian은 읽기 전용, 모든 쓰기는 Claude Code + Git",
    impact: "충돌 제거, 단일 쓰기 권한",
  },
];

// ── 메인 컴포넌트 ───────────────────────────────────────────────────
export function ObsidianSystemSection() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 56, marginTop: 8 }}
    >
      {/* ① Why Obsidian */}
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
            Living Docs: 문서는 작성 시점에 완성되는 게 아니라, 시스템이
            매일 갱신해야 살아 있다. AI가 쓰고, Git이 기록하고, Obsidian이
            보여준다.
          </p>
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
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
          {[
            { label: "Jeff Su 5레벨 MAX", color: C.blue, bg: C.blueBg, border: C.blueBorder },
            { label: "2자리 넘버링", color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
            { label: "99=Archive", color: C.amber, bg: C.amberBg, border: C.amberBorder },
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

      {/* ③ Living Documents */}
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
      </div>

      {/* ④ AI Integration */}
      <div>
        <p style={labelStyle}>AI Integration</p>
        <p
          style={{
            fontSize: 13,
            color: C.muted,
            lineHeight: 1.65,
            margin: "0 0 16px",
          }}
        >
          쓰기 권한은 Claude Code에만 있다. Obsidian은 읽기 전용 뷰어로
          사용하고, Git이 유일한 동기화 채널이다.
        </p>
        <div
          style={{
            display: "flex",
            gap: 0,
            alignItems: "stretch",
            flexWrap: "wrap",
            rowGap: 8,
          }}
        >
          {AI_PIPELINE.map((step, i) => (
            <React.Fragment key={step.title}>
              <div
                style={{
                  flex: "1 1 0",
                  minWidth: 86,
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
              {i < AI_PIPELINE.length - 1 && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 3px",
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
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
          {[
            { label: "Obsidian = 뷰어", color: C.green, bg: C.greenBg, border: C.greenBorder },
            { label: "Claude = Writer", color: C.purple, bg: C.purpleBg, border: C.purpleBorder },
            { label: "Git = SoT", color: C.teal, bg: C.tealBg, border: C.tealBorder },
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

      {/* ⑤ Git Synchronization */}
      <div>
        <p style={labelStyle}>Git Synchronization</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {GIT_SYNC.map((d) => (
            <div
              key={d.tech}
              style={{
                display: "flex",
                gap: 0,
                border: `1px solid ${d.border}`,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: d.bg,
                  padding: "12px 14px",
                  minWidth: 130,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: d.color,
                    marginBottom: 3,
                  }}
                >
                  {d.tech}
                </div>
                <div style={{ fontSize: 10, color: C.dim, lineHeight: 1.4 }}>
                  {d.reason}
                </div>
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  background: C.white,
                  display: "flex",
                  alignItems: "center",
                  borderLeft: `1px solid ${d.border}`,
                }}
              >
                <p
                  style={{
                    fontSize: 12,
                    color: C.muted,
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {d.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ⑥ Evolution */}
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
          2주 동안 8번의 구조 변경. context-repo bridge에서 시작해 Living
          Docs 자동 갱신 시스템까지.
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
                    textDecoration: ev.deprecated ? "line-through" : undefined,
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
                  textDecoration: ev.deprecated ? "line-through" : undefined,
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

      {/* ⑦ Design Decisions */}
      <div>
        <p style={labelStyle}>Design Decisions</p>
        <div
          style={{
            position: "relative",
            paddingLeft: 20,
            borderLeft: `2px solid ${C.border}`,
          }}
        >
          {ADRS.map((adr, i) => (
            <div
              key={adr.id}
              style={{
                position: "relative",
                marginBottom: i < ADRS.length - 1 ? 20 : 0,
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
                  background: C.blue,
                  border: `2px solid ${C.white}`,
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.blue,
                  textTransform: "uppercase",
                  letterSpacing: "0.4px",
                  marginBottom: 4,
                }}
              >
                {adr.id}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 4,
                }}
              >
                {adr.title}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: C.dim }}>
                  문제:
                </span>{" "}
                {adr.problem}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: C.dim }}>
                  해결:
                </span>{" "}
                {adr.solution}
              </div>
              <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 600, color: C.dim }}>
                  효과:
                </span>{" "}
                {adr.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
