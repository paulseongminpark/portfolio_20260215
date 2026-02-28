import React from "react";
import {
  BADGES,
  AGENT_GROUPS,
  FLOW_STEPS,
  CONTEXT_LAYERS,
  AI_ROLES,
  HOOKS,
  SKILL_GROUPS,
  AUTOMATIONS,
  MODEL_GROUPS,
  DESIGN_PRINCIPLES,
  TIMELINE,
  DAILY_PATTERNS,
  LIVING_DOCS,
  CONFIG_LAYERS,
  AI_MATRIX_ROWS,
  ADRS,
  MCP_SERVERS,
} from "./aiWorkflowData";

interface AiWorkflowSectionProps {
  raw: string;
}

// ── 색상 팔레트 (기존 포트폴리오 변수 기반) ──────────────────────
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

const label: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: C.dimmer,
  textTransform: "uppercase",
  letterSpacing: "0.55px",
  marginBottom: 14,
};

// ── 메인 컴포넌트 ─────────────────────────────────────────────────
export function AiWorkflowSection({ raw: _raw }: AiWorkflowSectionProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 48,
        marginTop: 8,
      }}
    >
      {/* 1. 헤드라인 + 핵심 숫자 배지 */}
      <div>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: C.text,
            lineHeight: 1.65,
            margin: "0 0 20px",
            borderLeft: `3px solid ${C.blue}`,
            paddingLeft: 14,
          }}
        >
          Claude Code를 운영체제처럼 쓴다. What만 정의하면 16개 에이전트가 How를
          결정하고 실행한다.
        </p>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "12px 0 16px",
          }}
        >
          명령과 설계는 다르다. 명령은 매번 내가 개입해야 한다. 설계는 한 번
          만들어두면 내가 없어도 굴러간다. 이 차이를 처음 체감한 건 에이전트를
          처음 붙였을 때였다. 같은 작업인데 에이전트를 붙이자 설명이 사라졌다.
          작업 속도가 달라진 게 아니었다. 내가 쓰는 단어 수가 달라졌다.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {BADGES.map((b) => (
            <div
              key={b.desc}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                background: b.bg,
                border: `1px solid ${b.border}`,
                borderRadius: 10,
                padding: "10px 16px",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: b.color,
                  lineHeight: 1,
                }}
              >
                {b.value}
              </span>
              <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>
                {b.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 설계 철학 7가지 */}
      <div>
        <div style={label}>설계 철학</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          여러 AI를 쓰면서 정보가 흩어지고 컨텍스트가 날아가는 문제를
          해결하려면, 철학이 먼저 있어야 했다. 도구를 먼저 고르면 구조가 도구에
          종속된다. 원칙을 먼저 세우면 도구는 교체 가능해진다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 10,
          }}
        >
          {DESIGN_PRINCIPLES.map((p) => (
            <div
              key={p.title}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 10,
                padding: "16px 18px",
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#2563eb",
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}
                >
                  {p.title}
                </span>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#666",
                  lineHeight: 1.6,
                  margin: 0,
                  paddingLeft: 23,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 시스템 진화 타임라인 */}
      <div>
        <div style={label}>시스템 진화</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          처음엔 에이전트 2개였다. 가장 반복되는 작업 두 가지를 자동화했다.
          v2.0에서 14개, 현재 16개가 됐다. 에이전트가 늘어나면서 시스템이
          강력해졌지만, 동시에 복잡해졌다. AI 도구가 늘어날수록 오히려 시스템
          복잡도가 상승하는 역설이 생겼다. 에이전트 하나가 추가될 때마다 다른
          에이전트와의 경계를 다시 정의해야 했다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((item, i, arr) => (
            <div
              key={item.v}
              style={{ display: "flex", gap: 16, alignItems: "stretch" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 20,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: i === arr.length - 1 ? C.blue : C.border,
                    border: `2px solid ${i === arr.length - 1 ? C.blue : C.dim}`,
                    flexShrink: 0,
                    marginTop: 4,
                  }}
                />
                {i < arr.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      flexGrow: 1,
                      background: C.border,
                      margin: "4px 0",
                    }}
                  />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 16 : 0 }}>
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: i === arr.length - 1 ? C.blue : C.text,
                    }}
                  >
                    {item.v}
                  </span>
                  <span style={{ fontSize: 11, color: C.dimmer }}>
                    {item.date}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: C.muted,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 에이전트 계층 그리드 */}
      <div>
        <div style={label}>에이전트 아키텍처 (16개)</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          각 에이전트는 하나의 역할만 가진다. code-reviewer는 리뷰만,
          commit-writer는 커밋 메시지만. 역할이 명확해야 에이전트가 딱딱
          떨어지게 작동한다. 역할이 겹치는 순간 어느 에이전트가 처리할지
          불명확해지고, AI가 판단을 포기하거나 잘못된 판단을 내린다. PROACTIVELY
          에이전트 4개는 별도 호출 없이 상황을 감지해 자동으로 개입한다.
          초기에는 Claude를 reader/executor/architect 3가지 모드로 구분하는
          방식을 검토했으나, 현재는 에이전트별 model: haiku/sonnet/opus 직접
          지정 방식으로 전환됐다.{" "}
          <span style={{ color: "#999" }}>(구 설계 컨셉)</span>
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 10,
          }}
        >
          {AGENT_GROUPS.map((grp) => (
            <div
              key={grp.label}
              style={{
                border: `1px solid ${grp.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: grp.bg,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: grp.color,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 10,
                }}
              >
                {grp.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {grp.agents.map((a) => (
                  <span
                    key={a}
                    style={{ fontSize: 12, color: C.text, fontWeight: 500 }}
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 에이전트 모델 선택 전략 */}
      <div>
        <div style={label}>에이전트 모델 선택 전략</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          각 에이전트는 역할에 맞는 모델을 지정한다. 무조건 Opus를 쓰면 비용이
          폭증하고, 무조건 Haiku를 쓰면 품질이 떨어진다. 작업 난이도에 따라
          모델을 분리하는 것이 핵심이다.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
          >
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                {["모델", "역할", "에이전트 목록", "특징"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODEL_GROUPS.map((m, i) => (
                <tr
                  key={m.model}
                  style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      fontWeight: 700,
                      color: m.color,
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {m.model}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {m.role}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {m.agents.map((a) => (
                        <span
                          key={a}
                          style={{
                            fontSize: 10,
                            color: m.color,
                            background: "#fff",
                            border: `1px solid ${m.border}`,
                            borderRadius: 4,
                            padding: "2px 6px",
                          }}
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#666",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {m.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. 자동화 워크플로우 */}
      <div>
        <div style={label}>자동화 워크플로우</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          각 단계는 전문 에이전트로 분리돼 있다. brainstorm 단계에서
          gemini-analyzer가 코드베이스 전체를 1M 토큰으로 읽고, deploy 단계에서
          pf-deployer와 security-auditor가 순차적으로 검증한다. 내가 개입하는 건
          What을 정의하는 것뿐이다. How는 각 단계의 에이전트가 결정한다.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "stretch",
            gap: 0,
          }}
        >
          {FLOW_STEPS.map((step, i) => (
            <div
              key={step.label}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{
                  border: `1px solid ${i === 0 || i === FLOW_STEPS.length - 1 ? C.blueBorder : C.border}`,
                  borderRadius: 10,
                  padding: "12px 16px",
                  background:
                    i === 0 || i === FLOW_STEPS.length - 1 ? C.blueBg : C.bg,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color:
                      i === 0 || i === FLOW_STEPS.length - 1 ? C.blue : C.text,
                    marginBottom: 4,
                  }}
                >
                  {step.label}
                </div>
                <div style={{ fontSize: 10, color: C.dimmer }}>
                  {step.agent}
                </div>
              </div>
              {i < FLOW_STEPS.length - 1 && (
                <span style={{ fontSize: 13, color: C.dim, margin: "0 6px" }}>
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 7. 일일 작업 패턴 */}
      <div>
        <div style={label}>일일 작업 패턴</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          모든 작업은 4가지 패턴 중 하나로 귀결된다. 어떤 패턴인지 먼저 판단하면
          어떤 AI를 어떤 순서로 쓸지 자동으로 결정된다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 10,
          }}
        >
          {DAILY_PATTERNS.map((p) => (
            <div
              key={p.label}
              style={{
                border: `1px solid ${p.border}`,
                borderRadius: 10,
                padding: "16px 18px",
                background: p.bg,
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: p.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    background: "#fff",
                    border: `1px solid ${p.border}`,
                    borderRadius: 20,
                    padding: "2px 8px",
                  }}
                >
                  {p.label}
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}
                >
                  {p.title}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  marginBottom: 10,
                }}
              >
                {p.flow.map((step) => (
                  <span
                    key={step}
                    style={{ fontSize: 11, color: p.color, fontWeight: 500 }}
                  >
                    {step}
                  </span>
                ))}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#666",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. CLAUDE.md & 컨텍스트 엔지니어링 */}
      <div>
        <div style={label}>CLAUDE.md & 컨텍스트 엔지니어링</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          여러 AI를 쓰는데 맥락이 분산되어 일관성이 깨졌다. 세션이 끊기면 맥락이
          날아갔다. 3시간 동안 쌓아온 작업이 사라진 적도 있다. 해결책은
          파일이었다. 사고는 휘발되고, 기록은 남는다. CLAUDE.md는 AI가 읽는 운영
          매뉴얼이다. 처음엔 하나의 파일에 모든 걸 넣었다. 146줄이 넘자 응답이
          느려졌다. rules/ 폴더로 나눠 온디맨드로 로드하도록 바꿨다.
          common-mistakes.md도 만들었다. AI도 같은 실수를 반복한다는 걸 알게
          됐기 때문이다.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            marginBottom: 16,
          }}
        >
          {CONTEXT_LAYERS.map((layer) => (
            <div
              key={layer.path}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                paddingLeft: layer.level * 16,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.blue,
                  fontFamily: "monospace",
                  background: C.blueBg,
                  border: `1px solid ${C.blueBorder}`,
                  borderRadius: 6,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {layer.path}
              </span>
              <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
                {layer.desc}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            "rules/ 폴더별 조건부 규칙",
            "@import 온디맨드 로드",
            "common-mistakes.md 누적 학습",
            "모듈화 구조",
          ].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                color: C.muted,
                background: C.bg,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "4px 10px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 9. 설정 계층 구조 */}
      <div>
        <div style={label}>설정 계층 구조</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          Claude는 세션 시작 시 여러 레벨의 설정 파일을 자동으로 로드한다. 상위
          레벨일수록 모든 프로젝트에 적용되고, 하위 레벨일수록 해당 프로젝트에만
          적용된다. 이 계층 덕분에 공통 규칙은 한 번만 정의하고, 프로젝트별
          규칙은 필요한 곳에만 넣을 수 있다.
        </p>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            background: "#fafafa",
            border: "1px solid #e5e5e5",
            borderRadius: 10,
            padding: "20px 24px",
            lineHeight: 2,
          }}
        >
          {CONFIG_LAYERS.map((item) => (
            <div
              key={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingLeft: item.indent * 24,
              }}
            >
              <span style={{ color: "#888", flexShrink: 0 }}>
                {item.indent === 0 ? "├" : item.indent === 1 ? "└─ ├" : "└─ └─"}
              </span>
              <span
                style={{ color: "#2563eb", fontWeight: 600, flexShrink: 0 }}
              >
                {item.path}
              </span>
              <span style={{ color: "#888" }}>—</span>
              <span style={{ color: "#555", flexShrink: 0 }}>{item.desc}</span>
              <span
                style={{
                  fontSize: 10,
                  color: "#999",
                  background: "#f0f0f0",
                  borderRadius: 4,
                  padding: "1px 6px",
                  flexShrink: 0,
                  marginLeft: "auto",
                }}
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 12,
            color: "#888",
            margin: "12px 0 0",
            lineHeight: 1.6,
          }}
        >
          ENABLE_EXPERIMENTAL_MCP_CLI=true 설정으로 MCP 도구도 온디맨드 로드.
          도구 정의 토큰 소모를 최소화.
        </p>
      </div>

      {/* 10. Obsidian Living Doc */}
      <div>
        <div style={label}>Obsidian Living Doc</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          문서가 죽어있으면 AI가 오래된 정보로 판단한다. 모든 문서를 "살아있게"
          유지하는 구조가 필요했다. HOME.md가 중앙 허브(MOC)로 작동하고, 모든
          프로젝트의 STATE.md는 매 세션 /sync로 갱신된다. Obsidian은 뷰어로만
          쓴다. 편집은 Claude Code만 한다. 이 구조 덕분에 어떤 AI든 GitHub Pages
          URL 하나로 현재 상태를 읽을 수 있다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
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
                }}
              >
                {doc.label}
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#666",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {doc.desc}
              </p>
            </div>
          ))}
        </div>
        <p
          style={{
            fontSize: 12,
            color: "#888",
            margin: "12px 0 0",
            lineHeight: 1.6,
          }}
        >
          Obsidian = 뷰어 (편집 금지) · Git = SoT · GitHub Pages = AI 읽기
          엔드포인트. 모든 AI가 동일한 URL로 현재 상태를 공유한다.
        </p>
      </div>

      {/* 11. 멀티 AI 오케스트레이션 — AI_ROLES 카드만 */}
      <div>
        <div style={label}>멀티 AI 오케스트레이션</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          AI를 여러 개 쓰면서 제일 위험한 순간은 역할이 섞일 때였다. Claude가
          분석도 하고 실행도 하면, 자기가 한 분석을 자기가 검증하는 구조가 된다.
          편향이 생긴다. 실행 AI와 사고 AI의 경계를 선명하게 유지하는 것이 멀티
          AI 운영에서 가장 중요한 설계 원칙이었다. 경계가 흐려지는 순간 통제가
          안 됐다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 10,
          }}
        >
          {AI_ROLES.map((ai) => (
            <div
              key={ai.name}
              style={{
                border: `1px solid ${ai.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: ai.bg,
              }}
            >
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: ai.color,
                  marginBottom: 4,
                }}
              >
                {ai.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 6,
                }}
              >
                {ai.role}
              </div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                {ai.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI 역할 매트릭스 표 */}
      <div>
        <div style={label}>AI 역할 매트릭스</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          쓰기 권한은 Claude Code 하나에만 있다. 나머지는 읽기만 한다. 이 구조
          덕분에 충돌이 없다.
        </p>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}
          >
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                {["AI", "역할", "파일 쓰기", "특화"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AI_MATRIX_ROWS.map((row, i) => (
                <tr
                  key={row.ai}
                  style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                >
                  <td
                    style={{
                      padding: "10px 14px",
                      fontWeight: 600,
                      color: "#2563eb",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {row.ai}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#1a1a1a",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {row.role}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {row.write}
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      color: "#666",
                      borderBottom: "1px solid #e5e5e5",
                    }}
                  >
                    {row.spec}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 12. GitHub & 자동화 연동 */}
      <div>
        <div style={label}>GitHub & 자동화 연동</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          자동화의 기준은 하나였다. 내가 기억해야 하는 것들을 없앤다. 기억해야
          한다는 건 잊을 수 있다는 뜻이다. Obsidian에서 노트를 저장하면 자동으로
          커밋된다. 모바일 메모가 자동으로 작업 목록이 된다. 이 글을 보는 사람이
          GitHub에서 보는 모든 상태는 내가 따로 관리하지 않아도 항상 최신이다.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 10,
          }}
        >
          {AUTOMATIONS.map((a) => (
            <div
              key={a.label}
              style={{
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                background: C.bg,
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.blue,
                  background: C.blueBg,
                  border: `1px solid ${C.blueBorder}`,
                  borderRadius: 6,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {a.label}
              </span>
              <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                {a.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 13. 훅 시스템 */}
      <div>
        <div style={label}>훅 시스템 (9종)</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 12px",
          }}
        >
          훅은 AI가 실수하는 걸 막는 안전장치다. Stop Hook은 AI가 미커밋
          상태에서 "완료됐습니다"라고 선언하는 걸 막는다. PreToolUse는 rm -rf나
          git push --force 같은 위험 명령을 실행 전에 차단한다. 스킬은 반복
          작업을 명령어 하나로 압축한 것이다. /morning 하나로 모든 프로젝트
          현황이 나온다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {HOOKS.map((h) => (
            <div
              key={h.name}
              style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: C.green,
                  background: C.greenBg,
                  border: `1px solid ${C.greenBorder}`,
                  borderRadius: 6,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {h.name}
              </span>
              <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                {h.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 스킬 시스템 */}
      <div>
        <div style={label}>스킬 시스템 (19개)</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 12px",
          }}
        >
          스킬은 반복 작업을 명령어 하나로 압축한 것이다. /morning 하나로 모든
          프로젝트 현황이 나온다. /catchup 하나로 새 세션을 시작해도 이전 작업
          맥락이 5초 안에 복구된다. 매번 같은 설명을 반복하지 않아도 되는 구조를
          만드는 것이 스킬의 목적이다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SKILL_GROUPS.map((grp) => (
            <div key={grp.label}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: C.dimmer,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  marginBottom: 8,
                }}
              >
                {grp.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {grp.skills.map((sk) => (
                  <div
                    key={sk.name}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: C.purple,
                        background: C.purpleBg,
                        border: `1px solid ${C.purpleBorder}`,
                        borderRadius: 6,
                        padding: "2px 8px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {sk.name}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: C.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      {sk.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 14. MCP 서버 */}
      <div>
        <div style={label}>MCP 서버 (3개)</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 12px",
          }}
        >
          MCP 5개 설치를 계획했다. 설치 전에 실측했더니 MCP 하나당 컨텍스트
          11,000 토큰을 차지했다. 5개면 55,000토큰이 사라진다. 전부 CLI로
          대체하고 꼭 필요한 3개만 남겼다.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {MCP_SERVERS.map((mcp) => (
            <div
              key={mcp.name}
              style={{
                border: `1px solid ${C.tealBorder}`,
                borderRadius: 10,
                padding: "12px 16px",
                background: C.tealBg,
                flex: "1 1 180px",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.teal,
                  marginBottom: 4,
                }}
              >
                {mcp.name}
              </div>
              <div style={{ fontSize: 12, color: C.muted }}>{mcp.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 15. 주요 설계 결정 ADR */}
      <div>
        <div style={label}>주요 설계 결정 (ADR)</div>
        <p
          style={{
            fontSize: 13,
            color: "#666",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          모든 결정은 문서로 남긴다. 왜 그 결정을 했는지, 어떤 대안을
          검토했는지, 어떤 영향이 있었는지. 이것이 시스템이 진화하면서도
          일관성을 유지하는 방법이다.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {ADRS.map((d, i, arr) => (
            <div key={d.id} style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: 20,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#2563eb",
                    flexShrink: 0,
                    marginTop: 16,
                  }}
                />
                {i < arr.length - 1 && (
                  <div
                    style={{
                      width: 1,
                      flexGrow: 1,
                      background: "#e5e5e5",
                      margin: "4px 0",
                    }}
                  />
                )}
              </div>
              <div
                style={{ paddingBottom: i < arr.length - 1 ? 20 : 0, flex: 1 }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 6,
                    marginTop: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#2563eb",
                      background: "#eff4ff",
                      border: "1px solid #c7d7fd",
                      borderRadius: 6,
                      padding: "2px 8px",
                    }}
                  >
                    {d.id}
                  </span>
                  <span
                    style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}
                  >
                    {d.title}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {[
                    { l: "문제", v: d.problem, c: "#e11d48" },
                    { l: "해결", v: d.solution, c: "#059669" },
                    { l: "영향", v: d.impact, c: "#2563eb" },
                  ].map((item) => (
                    <div
                      key={item.l}
                      style={{
                        background: "#fafafa",
                        border: "1px solid #e5e5e5",
                        borderRadius: 8,
                        padding: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: item.c,
                          textTransform: "uppercase",
                          marginBottom: 4,
                        }}
                      >
                        {item.l}
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: "#555",
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {item.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 16. 클로징 */}
      <div style={{ borderTop: "1px solid #e5e5e5", paddingTop: 32 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#1a1a1a",
            lineHeight: 1.7,
            margin: "0 0 8px",
            borderLeft: "3px solid #2563eb",
            paddingLeft: 14,
          }}
        >
          이 섹션 자체가 이 시스템으로 만들어졌다.
        </p>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>
          이 포트폴리오를 보는 당신이 지금 읽고 있는 이 글도, content-writer
          에이전트가 질문하고 구조를 잡고 작성했다. AI를 아주 딱딱 떨어지게
          만들면서도 극한의 사용 효율을 뽑아내고 싶었다. 모든 에이전트, 스킬,
          CLAUDE.md가 그 하나의 문장을 향해 만들어졌다.
        </p>
      </div>
    </div>
  );
}
