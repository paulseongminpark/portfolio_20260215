import React, { useRef } from "react";
import {
  NARRATIVE,
  HOW_CONCEPTS,
  TIMELINE,
  C,
} from "./aiWorkflowData";
import { E2EWorkflowSection } from "./E2EWorkflowSection";

const font = "'Inter','Noto Sans KR',sans-serif";
const orange = '#D4632D';

// ─── 다이어그램 1: 복리 성장 곡선 ───

function GrowthDiagram() {
  const W = 460, H = 240;
  const pad = { l: 48, r: 80, t: 16, b: 40 };
  const cW = W - pad.l - pad.r;
  const cH = H - pad.t - pad.b;
  const N = 100;
  const subC = '#777';

  const makePts = (fn: (t: number) => number) =>
    Array.from({ length: N }, (_, i) => {
      const t = i / (N - 1);
      return { x: pad.l + t * cW, y: pad.t + cH * (1 - fn(t)) };
    });

  // Before: 거의 평평한 직선 (선형, 아주 완만)
  const beforePts = makePts(t => 0.08 + 0.10 * t);

  // After: 지수 곡선 — 후반부에 폭발적 상승
  const maxE = Math.exp(5.0);
  const afterPts = makePts(t => {
    const v = 0.08 + 0.88 * (Math.exp(t * 5.0) - 1) / (maxE - 1);
    return Math.min(v, 0.97);
  });

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('');

  const bEnd = beforePts[N - 1];
  const aEnd = afterPts[N - 1];
  const axisC = '#e0ddd8';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {/* x축만 — 그리드 없음 */}
      <line x1={pad.l} y1={pad.t + cH} x2={pad.l + cW} y2={pad.t + cH}
        stroke={axisC} strokeWidth={1.5} />

      {/* Before 영역 fill */}
      <path
        d={`${toPath(beforePts)} L${pad.l + cW},${pad.t + cH} L${pad.l},${pad.t + cH} Z`}
        fill="#e8e4de" fillOpacity={0.35}
      />

      {/* After 영역 fill */}
      <path
        d={`${toPath(afterPts)} L${pad.l + cW},${pad.t + cH} L${pad.l},${pad.t + cH} Z`}
        fill={orange} fillOpacity={0.09}
      />

      {/* Before 선 */}
      <path d={toPath(beforePts)} stroke="#b8b3aa" strokeWidth={2} fill="none" strokeLinejoin="round" />

      {/* After 선 */}
      <path d={toPath(afterPts)} stroke={orange} strokeWidth={2.8} fill="none" strokeLinejoin="round" />

      {/* 끝점 dots */}
      <circle cx={bEnd.x} cy={bEnd.y} r={4} fill="#b8b3aa" />
      <circle cx={aEnd.x} cy={aEnd.y} r={5.5} fill={orange} />

      {/* 레이블 */}
      <text x={bEnd.x + 12} y={bEnd.y}
        fontSize={11} fill={subC} fontFamily={font} dominantBaseline="middle">
        without
      </text>
      <text x={aEnd.x + 12} y={aEnd.y}
        fontSize={12} fill={orange} fontFamily={font} fontWeight="600" dominantBaseline="middle">
        with AI
      </text>

      {/* x축 레이블 */}
      {Array.from({ length: 5 }, (_, i) => {
        const x = pad.l + ((i + 1) / 5) * cW;
        return (
          <text key={i} x={x} y={pad.t + cH + 18}
            textAnchor="middle" fontSize={10} fill={subC}
            fontFamily={font}>
            {`Cycle ${i + 1}`}
          </text>
        );
      })}

      {/* y축 레이블 */}
      <text
        x={14} y={pad.t + cH / 2}
        fontSize={10} fill={subC} fontFamily={font}
        textAnchor="middle"
        transform={`rotate(-90, 14, ${pad.t + cH / 2})`}
        letterSpacing="0.06em"
      >
        레버리지
      </text>

      {/* 우상단 설명 텍스트 */}
      <text x={pad.l + cW * 0.55} y={pad.t + 14}
        fontSize={10} fill={subC} fontFamily={font} letterSpacing="0.02em">
        반복할수록 격차가 벌어진다
      </text>
    </svg>
  );
}

// ─── 다이어그램 2: 병렬 실행 (Aggregator 패턴) ───

function ParallelDiagram() {
  const W = 660, H = 280;
  const inOut = { fill: '#fce8e6', stroke: '#e09090', text: '#c04040' };
  const green  = { fill: '#f0f7f0', stroke: '#6aad6a', title: '#2d6a2d', sub: '#5a9d5a' };
  const blue   = { fill: '#eaf4fb', stroke: '#5a9bd6', text: '#1a5296' };
  const arrow  = '#c0c0c0';

  const inCx = 55, inCy = 107, inRx = 34, inRy = 22;
  const boxX = 135, boxW = 130, boxH = 36;
  const boxYs = [32, 82, 132, 182];
  const aggX = 315, aggW = 130, aggH = 44, aggCy = 107;
  const outCx = 510, outCy = 107, outRx = 34, outRy = 22;
  const entryYs = [aggCy - 15, aggCy - 5, aggCy + 5, aggCy + 15];

  const nodes = [
    { title: 'Claude A',   sub: 'Review'    },
    { title: 'Claude B',   sub: 'Build'     },
    { title: 'Claude C',   sub: 'Verify'    },
    { title: 'Other LLMs', sub: null        },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <defs>
        <marker id="paArr" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <path d="M0,0.5 L7,3.5 L0,6.5" fill="none" stroke={arrow}
            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="paArrLoop" markerWidth="8" markerHeight="7" refX="7" refY="3.5" orient="auto">
          <path d="M0,0.5 L7,3.5 L0,6.5" fill="none" stroke="#ccc8c2"
            strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Output → Better Input 피드백 루프 (하단 점선 호) */}
      <path
        d={`M${outCx + outRx},${outCy} C${outCx + 50},${outCy} ${outCx + 50},${H - 28} ${W / 2},${H - 28} C${inCx + 60},${H - 28} ${inCx},${inCy + 60} ${inCx},${inCy + inRy}`}
        stroke="#ccc8c2" strokeWidth="1.2" fill="none"
        strokeDasharray="4 3" markerEnd="url(#paArrLoop)" />
      <text x={W / 2} y={H - 10} textAnchor="middle"
        fill="#bbb" fontSize={9} fontFamily={font} letterSpacing="0.04em">Better Input</text>

      {/* In → boxes (화살표 마커는 중앙 i=1만) */}
      {boxYs.map((by, i) => (
        <path key={`in${i}`}
          d={by === inCy
            ? `M${inCx + inRx},${inCy} L${boxX},${by}`
            : `M${inCx + inRx},${inCy} Q${inCx + inRx + 30},${by} ${boxX},${by}`}
          stroke={arrow} strokeWidth="1.2" fill="none"
          markerEnd={i === 1 ? 'url(#paArr)' : undefined} />
      ))}

      {/* boxes → aggregator (개별 진입점, 화살표는 중앙 i=2만) */}
      {boxYs.map((by, i) => {
        const ey = entryYs[i];
        const d = Math.abs(by - ey) < 2
          ? `M${boxX + boxW},${by} L${aggX},${ey}`
          : `M${boxX + boxW},${by} Q${aggX - 30},${by} ${aggX},${ey}`;
        return (
          <path key={`agg${i}`} d={d}
            stroke={arrow} strokeWidth="1.2" fill="none"
            markerEnd={i === 2 ? 'url(#paArr)' : undefined} />
        );
      })}

      {/* aggregator → Out */}
      <path d={`M${aggX + aggW},${aggCy} L${outCx - outRx},${outCy}`}
        stroke={arrow} strokeWidth="1.2" fill="none" markerEnd="url(#paArr)" />

      {/* In oval */}
      <ellipse cx={inCx} cy={inCy} rx={inRx} ry={inRy}
        fill={inOut.fill} stroke={inOut.stroke} strokeWidth="1.5" />
      <text x={inCx} y={inCy} textAnchor="middle" dominantBaseline="middle"
        fill={inOut.text} fontSize={10} fontWeight={700} fontFamily={font}>User Input</text>

      {/* 4 parallel boxes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <rect x={boxX} y={boxYs[i] - boxH / 2} width={boxW} height={boxH}
            rx={6} fill={green.fill} stroke={green.stroke} strokeWidth="1.5" />
          <text x={boxX + boxW / 2} y={n.sub ? boxYs[i] - 7 : boxYs[i]}
            textAnchor="middle" dominantBaseline="middle"
            fill={green.title} fontSize={11} fontWeight={700} fontFamily={font}>
            {n.title}
          </text>
          {n.sub && (
            <text x={boxX + boxW / 2} y={boxYs[i] + 9}
              textAnchor="middle" dominantBaseline="middle"
              fill={green.sub} fontSize={10} fontFamily={font}>
              {n.sub}
            </text>
          )}
        </g>
      ))}

      {/* Aggregator */}
      <rect x={aggX} y={aggCy - aggH / 2} width={aggW} height={aggH}
        rx={7} fill={blue.fill} stroke={blue.stroke} strokeWidth="1.5" />
      <text x={aggX + aggW / 2} y={aggCy}
        textAnchor="middle" dominantBaseline="middle"
        fill={blue.text} fontSize={11} fontWeight={700} fontFamily={font}>
        Synthesizer
      </text>
      <text x={aggX + aggW / 2} y={aggCy + aggH / 2 + 13}
        textAnchor="middle" dominantBaseline="middle"
        fill="#aaa" fontSize={9} fontFamily={font}>Claude</text>

      {/* Out oval */}
      <ellipse cx={outCx} cy={outCy} rx={outRx} ry={outRy}
        fill={inOut.fill} stroke={inOut.stroke} strokeWidth="1.5" />
      <text x={outCx} y={outCy} textAnchor="middle" dominantBaseline="middle"
        fill={inOut.text} fontSize={11} fontWeight={700} fontFamily={font}>Output</text>
    </svg>
  );
}

// ─── Main Component ───

export function AiWorkflowSection({ raw: _raw }: { raw?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleSaveLayout = () => {
    const cw = iframeRef.current?.contentWindow as any;
    if (!cw?.getLayoutData) return;
    const data = cw.getLayoutData();
    if (!data) return;
    fetch('/save-layout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()).then(res => {
      if (res.ok) {
        iframeRef.current?.contentWindow?.location.reload();
      }
    }).catch(() => {});
  };

  return (
    <div className="wd-body" style={{ background: C.bg }}>

      {/* ━━━ 1. Hero ━━━ */}
      <section style={{ paddingTop: 80, paddingBottom: 32 }}>
        <p className="wd-eyebrow">HOW I AI</p>
        <h1 className="wd-title" style={{ fontSize: 32, lineHeight: 1.3 }}>
          {NARRATIVE.hero.title}
        </h1>
        <p className="wd-lede" style={{ maxWidth: 800, whiteSpace: 'pre-line' }}>
          {NARRATIVE.hero.lede}
        </p>
      </section>

      {/* ━━━ 2. Before ━━━ */}
      <section style={{ paddingBottom: 32 }}>
        {NARRATIVE.before.map((p, i) => (
          <p key={i} className="wd-paragraph" style={{ fontSize: 15, lineHeight: 1.95, maxWidth: 800 }}>
            {p}
          </p>
        ))}
      </section>

      {/* ━━━ 3. After ━━━ */}
      <section style={{ paddingBottom: 32 }}>
        {NARRATIVE.after.map((p, i) => (
          <p key={i} className="wd-paragraph" style={{ fontSize: 15, lineHeight: 1.95, maxWidth: 800 }}>
            {p}
          </p>
        ))}
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 4. How — 다이어그램 1: 복리 성장 곡선 ━━━ */}
      <section>
        <p className="wd-paragraph" style={{ maxWidth: 800, fontWeight: 500, color: C.text }}>
          {NARRATIVE.how}
        </p>

        <div className="wd-diagram-bg-1">
          <GrowthDiagram />
        </div>

        {/* 3개 개념 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          maxWidth: 800,
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
        <p className="wd-paragraph" style={{ maxWidth: 800 }}>
          {NARRATIVE.cycle}
        </p>
        <div style={{ maxWidth: 660, margin: '28px auto 0' }}>
          <ParallelDiagram />
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 6. System — 다이어그램 3 ━━━ */}
      <section>
        <p className="wd-paragraph" style={{ maxWidth: 800 }}>
          {NARRATIVE.cycleToSystem}
        </p>
        <p className="wd-paragraph" style={{ maxWidth: 800 }}>
          {NARRATIVE.systemIntro}
        </p>

        <div style={{
          width: 'calc(100% + 96px)',
          marginLeft: -48,
          overflow: 'hidden',
          marginTop: 24,
        }}>
          <iframe
            ref={iframeRef}
            src={`${import.meta.env.BASE_URL}orch-graph.html`}
            width="100%"
            height="640"
            style={{ border: 'none', display: 'block' }}
            title="Orchestration Graph"
          />
        </div>
        <div style={{ marginTop: 10, textAlign: 'right', paddingRight: 4 }}>
          <button
            onClick={handleSaveLayout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.15)',
              color: 'rgba(0,0,0,0.35)',
              padding: '5px 13px',
              borderRadius: 18,
              cursor: 'pointer',
              fontSize: 11,
              fontFamily: font,
            }}
          >
            ⊙ save layout
          </button>
        </div>

        <p className="wd-paragraph" style={{ maxWidth: 800, marginTop: 24 }}>
          {NARRATIVE.systemDetail}
        </p>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 7. E2E Workflow (기존 유지) ━━━ */}
      <E2EWorkflowSection />

      <hr className="wd-section-divider" />

      {/* ━━━ 8. Evolution + Closing ━━━ */}
      <section style={{ paddingBottom: 80 }}>
        <p className="wd-eyebrow">Evolution</p>
        <h2 className="wd-title">3주의 기록</h2>

        {/* 도입 */}
        <p className="wd-paragraph" style={{ maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}>
          {NARRATIVE.evolutionIntro}
        </p>

        {/* 세로 타임라인 */}
        <div style={{
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 40,
        }}>
          {TIMELINE.map((t, i) => (
            <div key={t.phase} style={{
              marginBottom: i < TIMELINE.length - 1 ? 48 : 0,
            }}>
              {/* 주차 레이블 */}
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: C.textMuted,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                marginBottom: 10,
              }}>
                {t.phase}
              </div>

              {/* 질문 */}
              <div style={{
                fontFamily: font,
                fontSize: 21,
                fontWeight: 600,
                color: C.text,
                lineHeight: 1.4,
                marginBottom: 16,
              }}>
                "{t.question}"
              </div>

              {/* 본문 */}
              {t.body.map((p, j) => (
                <p key={j} style={{
                  fontFamily: font,
                  fontSize: 15,
                  color: C.textSub,
                  lineHeight: 1.95,
                  marginTop: j > 0 ? 16 : 0,
                  marginBottom: 0,
                }}>
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* 시스템에 대하여 */}
        <div style={{
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 56,
          paddingTop: 32,
          borderTop: `1px solid ${C.border}`,
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            color: C.textMuted,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            marginBottom: 16,
          }}>
            시스템에 대하여
          </div>
          {NARRATIVE.systemAbout.map((p, i) => (
            <p key={i} style={{
              fontFamily: font,
              fontSize: 15,
              color: C.textSub,
              lineHeight: 1.95,
              marginTop: i > 0 ? 16 : 0,
              marginBottom: 0,
            }}>
              {p}
            </p>
          ))}
        </div>

        {/* Closing */}
        <div style={{
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 56,
          paddingTop: 32,
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
