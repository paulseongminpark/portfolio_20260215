import React from "react";
import {
  NARRATIVE,
  CYCLE,
  HOW_CONCEPTS,
  SYSTEM_ARCH,
  TIMELINE,
  C,
} from "./aiWorkflowData";
import { E2EWorkflowSection } from "./E2EWorkflowSection";

// ─── SVG Helpers ───

const NODE_BG = 'rgba(255,255,255,0.06)';
const NODE_BORDER = 'rgba(255,255,255,0.12)';
const CONNECTOR = 'rgba(255,255,255,0.2)';
const TXT = '#fff';
const TXT_SUB = 'rgba(255,255,255,0.5)';

const font = "'Inter','Noto Sans KR',sans-serif";

// ─── 다이어그램 1: 5노드 선형 흐름 ───

function HowDiagram() {
  const nodes = ['나', 'Claude Code', 'Living Docs', 'Obsidian', '나'];
  const w = 720;
  const h = 120;
  const nodeW = 110;
  const nodeH = 40;
  const gap = (w - nodeW * nodes.length) / (nodes.length - 1);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
      {nodes.map((label, i) => {
        const x = i * (nodeW + gap);
        const y = 20;
        const isMe = i === 0 || i === nodes.length - 1;
        return (
          <React.Fragment key={i}>
            {/* connector arrow */}
            {i > 0 && (
              <path
                d={`M${x - gap + 4},${y + nodeH / 2} C${x - gap / 2},${y + nodeH / 2 - 8} ${x - gap / 2},${y + nodeH / 2 + 8} ${x - 4},${y + nodeH / 2}`}
                stroke={CONNECTOR}
                strokeWidth={1.5}
                fill="none"
                markerEnd="url(#arrowW)"
              />
            )}
            {/* node */}
            <rect
              x={x} y={y} width={nodeW} height={nodeH} rx={8}
              fill={isMe ? 'rgba(212,99,45,0.15)' : NODE_BG}
              stroke={isMe ? 'rgba(212,99,45,0.35)' : NODE_BORDER}
              strokeWidth={1}
            />
            <text
              x={x + nodeW / 2} y={y + nodeH / 2 + 1}
              textAnchor="middle" dominantBaseline="central"
              fill={isMe ? '#D4632D' : TXT}
              fontSize={11} fontWeight={600} fontFamily={font}
            >
              {label}
            </text>
          </React.Fragment>
        );
      })}
      {/* arrow marker */}
      <defs>
        <marker id="arrowW" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke={CONNECTOR} strokeWidth={1} />
        </marker>
      </defs>
    </svg>
  );
}

// ─── 다이어그램 2: 순환 루프 (pentagon) ───

function CycleDiagram() {
  const w = 520;
  const h = 400;
  const cx = w / 2;
  const cy = 190;
  const rx = 200;
  const ry = 150;
  const nodeW = 120;
  const nodeH = 50;

  // pentagon positions (top center start, clockwise)
  const angles = CYCLE.map((_, i) => -Math.PI / 2 + (2 * Math.PI * i) / CYCLE.length);
  const positions = angles.map(a => ({
    x: cx + rx * Math.cos(a),
    y: cy + ry * Math.sin(a),
  }));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <marker id="arrowC" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke={CONNECTOR} strokeWidth={1} />
        </marker>
      </defs>

      {/* curved connectors */}
      {positions.map((from, i) => {
        const to = positions[(i + 1) % positions.length];
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        // pull control point toward center
        const cpX = midX + (cx - midX) * 0.3;
        const cpY = midY + (cy - midY) * 0.3;
        return (
          <path
            key={`c${i}`}
            d={`M${from.x},${from.y} Q${cpX},${cpY} ${to.x},${to.y}`}
            stroke={CONNECTOR}
            strokeWidth={1.5}
            fill="none"
            markerEnd="url(#arrowC)"
          />
        );
      })}

      {/* nodes */}
      {positions.map((pos, i) => {
        const step = CYCLE[i];
        const isFirst = i === 0;
        return (
          <React.Fragment key={i}>
            <rect
              x={pos.x - nodeW / 2} y={pos.y - nodeH / 2}
              width={nodeW} height={nodeH} rx={8}
              fill={isFirst ? 'rgba(212,99,45,0.15)' : NODE_BG}
              stroke={isFirst ? 'rgba(212,99,45,0.35)' : NODE_BORDER}
              strokeWidth={1}
            />
            <text
              x={pos.x} y={pos.y - 4}
              textAnchor="middle" dominantBaseline="central"
              fill={isFirst ? '#D4632D' : TXT}
              fontSize={11} fontWeight={600} fontFamily={font}
            >
              {step.step}
            </text>
            <text
              x={pos.x} y={pos.y + 12}
              textAnchor="middle" dominantBaseline="central"
              fill={TXT_SUB}
              fontSize={9} fontFamily={font}
            >
              {step.sub}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
}

// ─── 다이어그램 3: 시스템 아키텍처 ───

function SystemDiagram() {
  const w = 720;
  const h = 480;
  const arch = SYSTEM_ARCH;

  // Orchestrator position
  const ocX = w / 2;
  const ocY = 60;
  const ocW = 160;
  const ocH = 42;

  // Team positions
  const teamY = 170;
  const teamW = 200;
  const teamXs = [80, w / 2 - teamW / 2, w - 80 - teamW];

  // Skills & Hooks
  const bottomY = 370;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <marker id="arrowS" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke={CONNECTOR} strokeWidth={1} />
        </marker>
      </defs>

      {/* Orchestrator */}
      <rect
        x={ocX - ocW / 2} y={ocY - ocH / 2}
        width={ocW} height={ocH} rx={8}
        fill="rgba(212,99,45,0.18)" stroke="rgba(212,99,45,0.4)" strokeWidth={1.5}
      />
      <text
        x={ocX} y={ocY + 1}
        textAnchor="middle" dominantBaseline="central"
        fill="#D4632D" fontSize={13} fontWeight={700} fontFamily={font}
      >
        {arch.orchestrator}
      </text>

      {/* Connectors: orchestrator → teams */}
      {teamXs.map((tx, i) => {
        const toX = tx + teamW / 2;
        const toY = teamY;
        const cpY = (ocY + ocH / 2 + toY) / 2;
        return (
          <path
            key={`ot${i}`}
            d={`M${ocX},${ocY + ocH / 2} C${ocX},${cpY} ${toX},${cpY} ${toX},${toY}`}
            stroke={CONNECTOR} strokeWidth={1.2} fill="none"
            markerEnd="url(#arrowS)"
          />
        );
      })}

      {/* Teams */}
      {arch.teams.map((team, i) => {
        const tx = teamXs[i];
        const memberH = team.members.length * 18 + 40;
        return (
          <React.Fragment key={team.name}>
            {/* team box */}
            <rect
              x={tx} y={teamY}
              width={teamW} height={memberH} rx={8}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={1}
            />
            {/* team label */}
            <text
              x={tx + teamW / 2} y={teamY + 18}
              textAnchor="middle" dominantBaseline="central"
              fill={team.color} fontSize={10} fontWeight={700} fontFamily={font}
              letterSpacing="0.08em"
            >
              {team.name.toUpperCase()}
            </text>
            <text
              x={tx + teamW / 2} y={teamY + 32}
              textAnchor="middle" dominantBaseline="central"
              fill={TXT_SUB} fontSize={9} fontFamily={font}
            >
              {team.label}
            </text>
            {/* members */}
            {team.members.map((m, mi) => (
              <text
                key={m}
                x={tx + teamW / 2} y={teamY + 50 + mi * 18}
                textAnchor="middle" dominantBaseline="central"
                fill="rgba(255,255,255,0.7)" fontSize={10} fontFamily={font}
              >
                {m}
              </text>
            ))}
          </React.Fragment>
        );
      })}

      {/* Skills row */}
      <text
        x={w / 4} y={bottomY}
        textAnchor="middle" dominantBaseline="central"
        fill={TXT_SUB} fontSize={9} fontWeight={700} fontFamily={font}
        letterSpacing="0.1em"
      >
        SKILLS
      </text>
      {arch.skills.map((s, i) => {
        const sx = 40 + i * 72;
        return (
          <React.Fragment key={s.name}>
            <rect
              x={sx} y={bottomY + 14}
              width={64} height={26} rx={4}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={0.8}
            />
            <text
              x={sx + 32} y={bottomY + 27}
              textAnchor="middle" dominantBaseline="central"
              fill="rgba(255,255,255,0.65)" fontSize={9} fontFamily={font}
            >
              {s.name}
            </text>
          </React.Fragment>
        );
      })}

      {/* Hooks row */}
      <text
        x={w * 3 / 4} y={bottomY}
        textAnchor="middle" dominantBaseline="central"
        fill={TXT_SUB} fontSize={9} fontWeight={700} fontFamily={font}
        letterSpacing="0.1em"
      >
        HOOKS
      </text>
      {arch.hooks.map((h, i) => {
        const hx = w / 2 + 40 + i * 80;
        return (
          <React.Fragment key={h.name}>
            <rect
              x={hx} y={bottomY + 14}
              width={72} height={26} rx={4}
              fill={NODE_BG} stroke={NODE_BORDER} strokeWidth={0.8}
            />
            <text
              x={hx + 36} y={bottomY + 27}
              textAnchor="middle" dominantBaseline="central"
              fill="rgba(255,255,255,0.65)" fontSize={9} fontFamily={font}
            >
              {h.name}
            </text>
          </React.Fragment>
        );
      })}

      {/* Connectors: teams → skills/hooks area */}
      {teamXs.map((tx, i) => {
        const fromX = tx + teamW / 2;
        const teamHeight = arch.teams[i].members.length * 18 + 40;
        const fromY = teamY + teamHeight;
        const toY = bottomY + 14;
        return (
          <line
            key={`tb${i}`}
            x1={fromX} y1={fromY}
            x2={fromX} y2={toY}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="3,4"
          />
        );
      })}
    </svg>
  );
}

// ─── Main Component ───

export function AiWorkflowSection({ raw: _raw }: { raw?: string }) {
  return (
    <div className="wd-body" style={{ background: C.bg }}>

      {/* ━━━ 1. Hero ━━━ */}
      <section style={{ paddingTop: 80, paddingBottom: 32 }}>
        <p className="wd-eyebrow">HOW I AI</p>
        <h1 className="wd-title" style={{ fontSize: 32, lineHeight: 1.3, maxWidth: 680 }}>
          {NARRATIVE.hero.title}
        </h1>
        <p className="wd-lede" style={{ maxWidth: 620 }}>
          {NARRATIVE.hero.lede}
        </p>
      </section>

      {/* ━━━ 2. Before ━━━ */}
      <section style={{ paddingBottom: 32 }}>
        {NARRATIVE.before.map((p, i) => (
          <p key={i} className="wd-paragraph" style={{ fontSize: 15, lineHeight: 1.95, maxWidth: 680 }}>
            {p}
          </p>
        ))}
      </section>

      {/* ━━━ 3. After ━━━ */}
      <section style={{ paddingBottom: 32 }}>
        {NARRATIVE.after.map((p, i) => (
          <p key={i} className="wd-paragraph" style={{ fontSize: 15, lineHeight: 1.95, maxWidth: 680 }}>
            {p}
          </p>
        ))}
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 4. How — 다이어그램 1 ━━━ */}
      <section>
        <p className="wd-paragraph" style={{ maxWidth: 680, fontWeight: 500, color: C.text }}>
          {NARRATIVE.how}
        </p>

        <div className="wd-diagram-bg-1">
          <div className="wd-dark-card">
            <HowDiagram />
          </div>
        </div>

        {/* 3개 개념 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          maxWidth: 680,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 24,
        }}>
          {HOW_CONCEPTS.map((c) => (
            <div key={c.title}>
              <div style={{
                fontFamily: font,
                fontSize: 14,
                fontWeight: 600,
                color: C.text,
                marginBottom: 4,
              }}>
                {c.title}
              </div>
              <div style={{
                fontFamily: font,
                fontSize: 12,
                color: C.textSub,
                lineHeight: 1.6,
              }}>
                {c.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 5. Cycle — 다이어그램 2 ━━━ */}
      <section>
        <p className="wd-paragraph" style={{ maxWidth: 680 }}>
          {NARRATIVE.cycle}
        </p>

        <div className="wd-diagram-bg-2">
          <div className="wd-dark-card">
            <CycleDiagram />
          </div>
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 6. System — 다이어그램 3 ━━━ */}
      <section>
        <p className="wd-paragraph" style={{ maxWidth: 680 }}>
          {NARRATIVE.systemIntro}
        </p>

        <div className="wd-diagram-bg-3">
          {/* subtle wave SVG background */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.15 }}
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 800 600"
          >
            <path d="M-40,100 C120,40 300,180 500,100 C700,20 750,140 840,80" stroke="#999" strokeWidth="1" fill="none" />
            <path d="M-40,300 C100,240 280,360 480,280 C680,200 740,320 840,260" stroke="#999" strokeWidth="0.8" fill="none" />
          </svg>

          <div className="wd-dark-card" style={{ position: 'relative', zIndex: 1 }}>
            <SystemDiagram />
          </div>
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 7. E2E Workflow (기존 유지) ━━━ */}
      <E2EWorkflowSection />

      <hr className="wd-section-divider" />

      {/* ━━━ 8. Evolution + Closing ━━━ */}
      <section style={{ paddingBottom: 80 }}>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Evolution</p>
          <h2 className="wd-title">3주의 기록</h2>
        </div>

        <p className="wd-paragraph">
          더하기로 시작해서, 구조화를 거쳐, 빼기에 이르렀다.
        </p>

        {/* 수평 타임라인 — 3칸 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 32,
          borderTop: `1px solid ${C.border}`,
        }}>
          {TIMELINE.map((t, i) => {
            const isLast = i === TIMELINE.length - 1;
            return (
              <div key={t.phase} style={{
                padding: '28px 24px',
                borderRight: i < TIMELINE.length - 1 ? `1px solid ${C.border}` : 'none',
                borderBottom: `1px solid ${C.border}`,
              }}>
                {/* phase label */}
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  color: isLast ? C.accent : C.textMuted,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase' as const,
                  marginBottom: 8,
                }}>
                  {t.phase} — {t.period}
                </div>

                {/* title */}
                <div style={{
                  fontFamily: font,
                  fontSize: 15,
                  fontWeight: 600,
                  color: isLast ? C.accent : C.text,
                  lineHeight: 1.4,
                  marginBottom: 8,
                }}>
                  {t.title}
                </div>

                {/* insight */}
                <div style={{
                  fontFamily: font,
                  fontSize: 13,
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: C.textSub,
                  lineHeight: 1.5,
                  marginBottom: 10,
                }}>
                  {t.insight}
                </div>

                {/* detail */}
                <div style={{
                  fontFamily: font,
                  fontSize: 13,
                  color: C.textSub,
                  lineHeight: 1.75,
                }}>
                  {t.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing */}
        <div style={{
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 40,
          paddingTop: 28,
          borderTop: `1px solid ${C.border}`,
        }}>
          <p className="wd-paragraph" style={{ marginBottom: 0, fontWeight: 500, color: C.text }}>
            {NARRATIVE.closing}
          </p>
        </div>
      </section>
    </div>
  );
}
