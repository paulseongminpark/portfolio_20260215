/**
 * ORCHDiagram1 — The Overbuilt Network
 * v3 시절 24-agent 아키텍처: 4팀 + meta-orchestrator + 외부 CLI
 * "그때는 구성이 커질수록 시스템도 강해진다고 믿었다"
 * El Croquis Design System
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray30:    "#4D4D4D",
  gray50:    "#808080",
  gray65:    "#A6A6A6",
  gray80:    "#CCCCCC",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineHair:  0.25,
  lineLight: 0.35,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

/* ── Agent Data: 4 teams × 6 agents ── */
const CX = 380, CY = 250; // center

interface Agent { label: string; x: number; y: number; named?: boolean }

const ops: Agent[] = [
  { label: "commit-writer",    x: 175, y: 105, named: true },
  { label: "compressor",       x: 130, y: 148, named: true },
  { label: "morning-briefer",  x: 210, y: 155, named: true },
  { label: "session-archiver", x: 155, y: 195 },
  { label: "state-syncer",     x: 115, y: 230 },
  { label: "log-manager",      x: 195, y: 238 },
];

const build: Agent[] = [
  { label: "code-reviewer",  x: 545, y: 100, named: true },
  { label: "ui-prototyper",  x: 590, y: 140 },
  { label: "test-runner",    x: 520, y: 155 },
  { label: "deployer",       x: 575, y: 190 },
  { label: "doc-generator",  x: 615, y: 225 },
  { label: "schema-builder", x: 540, y: 230 },
];

const analyze: Agent[] = [
  { label: "context-linker",    x: 155, y: 310 },
  { label: "project-linker",    x: 195, y: 345 },
  { label: "dependency-tracker", x: 130, y: 370 },
  { label: "impact-analyzer",   x: 210, y: 388 },
  { label: "pattern-detector",  x: 150, y: 415 },
  { label: "audit-reporter",    x: 115, y: 448 },
];

const maintain: Agent[] = [
  { label: "health-checker",    x: 545, y: 315 },
  { label: "rule-enforcer",     x: 585, y: 350 },
  { label: "doc-updater",       x: 520, y: 365 },
  { label: "backup-manager",    x: 570, y: 395 },
  { label: "config-validator",  x: 540, y: 425 },
  { label: "cleanup-agent",     x: 600, y: 445 },
];

const allAgents = [...ops, ...build, ...analyze, ...maintain];

/* ── External CLIs ── */
const externals = [
  { label: "Claude",  x: CX,       y: 42 },
  { label: "Codex",   x: 700,      y: CY },
  { label: "Gemini",  x: 60,       y: CY },
];

/* ── Cross-team connections (linkers) ── */
const crossLinks: [Agent, Agent][] = [
  [analyze[0], build[2]],    // context-linker → test-runner
  [analyze[0], ops[3]],      // context-linker → session-archiver
  [analyze[1], maintain[0]], // project-linker → health-checker
  [analyze[1], build[0]],    // project-linker → code-reviewer
];

/* ── Team labels ── */
const teamLabels = [
  { label: "ops",      x: 165, y: 85 },
  { label: "build",    x: 565, y: 82 },
  { label: "analyze",  x: 155, y: 292 },
  { label: "maintain", x: 560, y: 297 },
];

export function ORCHDiagram1({ diptych }: { diptych?: boolean } = {}) {
  return (
    <div style={diptych ? {} : {
      margin: "48px auto 40px",
      maxWidth: 780,
      padding: "0 16px",
    }}>
      <svg viewBox="0 0 760 520" width="100%" style={{ display: "block" }}>
        <defs>
          <marker id="orch1-arr" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.gray65} />
          </marker>
          <marker id="orch1-arr-accent" viewBox="0 0 8 6" refX="8" refY="3"
            markerWidth="4" markerHeight="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={EC.accent} />
          </marker>
        </defs>

        {/* ── Hub lines: every agent → meta-orchestrator ── */}
        {allAgents.map((a, i) => (
          <line key={`hub-${i}`}
            x1={a.x} y1={a.y}
            x2={CX} y2={CY}
            stroke={EC.gray80} strokeWidth={EC.lineLight} />
        ))}

        {/* ── Cross-team connections (light red dashed, inter-team coupling) ── */}
        {crossLinks.map(([from, to], i) => (
          <line key={`cross-${i}`}
            x1={from.x} y1={from.y}
            x2={to.x} y2={to.y}
            stroke="rgba(204,0,0,0.3)" strokeWidth={EC.lineReg}
            strokeDasharray="4 3" />
        ))}

        {/* ── External CLI connections → meta-orchestrator (precise box edges) ── */}
        {/* Claude (top) → meta */}
        <line x1={CX} y1={51} x2={CX} y2={CY - 10}
          stroke={EC.gray50} strokeWidth={EC.lineReg}
          markerEnd="url(#orch1-arr)" />
        {/* Gemini (left) → meta */}
        <line x1={82} y1={CY} x2={CX - 10} y2={CY}
          stroke={EC.gray50} strokeWidth={EC.lineReg}
          markerEnd="url(#orch1-arr)" />
        {/* Codex (right) → meta */}
        <line x1={678} y1={CY} x2={CX + 10} y2={CY}
          stroke={EC.gray50} strokeWidth={EC.lineReg}
          markerEnd="url(#orch1-arr)" />

        {/* ── Team labels ── */}
        {teamLabels.map((t, i) => (
          <text key={`team-${i}`}
            x={t.x} y={t.y}
            textAnchor="middle"
            fontFamily={EC.font} fontSize={10.5} fontWeight={200}
            fill={EC.gray50} letterSpacing="1.5px"
            textDecoration="none"
            style={{ textTransform: "uppercase" } as React.CSSProperties}>
            {t.label}
          </text>
        ))}

        {/* ── Agent nodes ── */}
        {allAgents.map((a, i) => (
          <g key={`agent-${i}`}>
            <circle cx={a.x} cy={a.y} r={4}
              fill={a.named ? "rgba(0,0,0,0.06)" : "none"}
              stroke={EC.black}
              strokeWidth={a.named ? EC.lineReg : EC.lineLight} />
            <text
              x={a.x} y={a.y + 13}
              textAnchor="middle"
              fontFamily={EC.font}
              fontSize={a.named ? 9.5 : 8.5}
              fontWeight={a.named ? 300 : 200}
              fill={a.named ? EC.gray30 : EC.gray65}>
              {a.label}
            </text>
          </g>
        ))}

        {/* ── meta-orchestrator (center hub) ── */}
        <circle cx={CX} cy={CY} r={10}
          fill="rgba(204,0,0,0.04)"
          stroke={EC.accent} strokeWidth={EC.lineBold} />
        <text x={CX} y={CY - 1}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={EC.font} fontSize={9.5} fontWeight={300}
          fill={EC.accent}>
          meta
        </text>
        <text x={CX} y={CY + 24}
          textAnchor="middle"
          fontFamily={EC.font} fontSize={9.5} fontWeight={200}
          fill={EC.accent} letterSpacing="0.5px">
          orchestrator
        </text>

        {/* ── External CLI nodes ── */}
        {externals.map((ext, i) => (
          <g key={`ext-node-${i}`}>
            <rect
              x={ext.x - 22} y={ext.y - 9}
              width={44} height={18} rx={1}
              fill="none" stroke={EC.gray50} strokeWidth={EC.lineReg} />
            <text x={ext.x} y={ext.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fontFamily={EC.font} fontSize={10.5} fontWeight={300}
              fill={EC.gray30}>
              {ext.label}
            </text>
          </g>
        ))}

        {/* annotation moved to diptych wrapper */}
      </svg>
    </div>
  );
}
