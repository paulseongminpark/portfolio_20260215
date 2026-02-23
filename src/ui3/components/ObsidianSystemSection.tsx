import React from "react";

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

        {/* HOME.md 미니 프리뷰 */}
        <div
          style={{
            marginTop: 14,
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: "16px 18px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              fontSize: 9,
              fontWeight: 700,
              color: C.dimmer,
              textTransform: "uppercase",
              letterSpacing: "0.4px",
            }}
          >
            Preview
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.blue,
              textTransform: "uppercase",
              letterSpacing: "0.4px",
              marginBottom: 10,
            }}
          >
            HOME.md
          </div>
          <div
            style={{
              fontFamily:
                "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
              fontSize: 11,
              lineHeight: 1.7,
              color: C.muted,
            }}
          >
            <div style={{ color: C.text, fontWeight: 600 }}>
              # HOME — Dev Workspace Hub
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{ color: C.blue, fontWeight: 600 }}>
                ## Projects
              </span>
            </div>
            <div style={{ paddingLeft: 12 }}>
              | Project | Status | Branch | Next |
            </div>
            <div style={{ paddingLeft: 12 }}>
              | orchestration | v3.1 active | main | ... |
            </div>
            <div style={{ paddingLeft: 12 }}>
              | portfolio | building | master | ... |
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{ color: C.blue, fontWeight: 600 }}>
                ## Today's Session
              </span>
            </div>
            <div style={{ paddingLeft: 12 }}>
              - 23:00 Obsidian 섹션 추가 (portfolio)
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{ color: C.blue, fontWeight: 600 }}>
                ## Open Decisions
              </span>
            </div>
            <div style={{ paddingLeft: 12, color: C.dim }}>
              - Phase E 파일럿 테스트 (Agent Teams)
            </div>
          </div>
        </div>
      </div>

      {/* ④ How It Works (AI Integration + Git Sync 통합) */}
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
