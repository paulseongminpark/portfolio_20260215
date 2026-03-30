/** CEFolderPath — "폴더 번호가 읽기 순서를 결정한다"
 * Format: 4-Column Specification — Reading Path | Index | Rules | Pipeline
 * El Croquis Design System §12
 */

const EC = {
  accent:    "#CC0000",
  black:     "#000000",
  gray40:    "#666666",
  gray60:    "#999999",
  gray85:    "#D8D8D8",
  gray90:    "#E8E8E8",
  font:      "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  lineLight: 0.25,
  lineReg:   0.5,
  lineBold:  0.75,
} as const;

const fs = 9;
const lh = 15;

/* ── Shared: section header ── */
function SecHead({ y, label, w }: { y: number; label: string; w: number }) {
  return (
    <g>
      <text x={0} y={y} fontFamily={EC.font} fontSize={6} fontWeight={300}
        fill={EC.gray85} style={{ letterSpacing: "2px" }}>
        {label}
      </text>
      <line x1={0} y1={y + 4} x2={w * 0.4} y2={y + 4}
        stroke={EC.gray90} strokeWidth={EC.lineLight} />
    </g>
  );
}

/* ── Shared: hero number ── */
function Hero({ x, y, n, sub }: { x: number; y: number; n: string; sub: string }) {
  return (
    <g>
      <text x={x} y={y} fontFamily={EC.font} fontSize={28} fontWeight={200}
        fill={EC.black} style={{ fontVariantNumeric: "tabular-nums" }}>
        {n}
      </text>
      <text x={x} y={y + 14} fontFamily={EC.font} fontSize={8} fontWeight={200}
        fill={EC.gray85} style={{ letterSpacing: "1px" }}>
        {sub}
      </text>
    </g>
  );
}

/* ── Column 0: Claude Reading Path ── */
function Col0({ x, w }: { x: number; w: number }) {
  const steps = [
    { id: "①", file: "00_index.md", note: "상태 파악" },
    { id: "②", file: "phase/00_index", note: "현재 Phase" },
    { id: "③", file: "02_context.md", note: "경계 조건" },
    { id: "④", file: "01_, 02_ ...", note: "번호순 실행" },
  ];
  const oy = 86, stepH = 50;

  return (
    <g transform={`translate(${x}, 0)`}>
      <text x={0} y={14} fontFamily={EC.font} fontSize={7} fontWeight={300}
        fill={EC.gray60} style={{ letterSpacing: "1.5px" }}>
        READING PATH
      </text>
      <line x1={0} y1={20} x2={w} y2={20}
        stroke={EC.gray90} strokeWidth={EC.lineLight} />

      {/* Hero */}
      <Hero x={0} y={50} n="4" sub="STEPS" />

      {steps.map((s, i) => {
        const y = oy + i * stepH;
        const isLast = i === steps.length - 1;
        return (
          <g key={i}>
            {/* Step number */}
            <text x={0} y={y} fontFamily={EC.font} fontSize={9} fontWeight={200}
              fill={EC.accent}>{s.id}</text>

            {/* File name */}
            <text x={0} y={y + 13} fontFamily={EC.font} fontSize={fs} fontWeight={300}
              fill={EC.black}>{s.file}</text>

            {/* Annotation callout */}
            <line x1={0} y1={y + 18} x2={16} y2={y + 18}
              stroke={EC.gray90} strokeWidth={EC.lineLight} />
            <text x={18} y={y + 22} fontFamily={EC.font} fontSize={6} fontWeight={200}
              fill={EC.gray60} style={{ fontStyle: "italic" }}>{s.note}</text>

            {/* Connector to next step */}
            {!isLast && (
              <line x1={4} y1={y + 28} x2={4} y2={y + stepH - 6}
                stroke={EC.gray90} strokeWidth={EC.lineLight} />
            )}
          </g>
        );
      })}

      {/* Extra note at bottom */}
      <g transform={`translate(0, ${oy + 4 * stepH + 8})`}>
        <line x1={0} y1={0} x2={w * 0.6} y2={0}
          stroke={EC.gray90} strokeWidth={EC.lineLight} />
        <text x={0} y={14} fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>같은 번호</text>
        <text x={0} y={26} fontFamily={EC.font} fontSize={7} fontWeight={200}
          fill={EC.gray60}>= 병렬 실행</text>
      </g>
    </g>
  );
}

/* ── Column 1: Project Index ── */
function Col1({ x, w }: { x: number; w: number }) {
  const projects = [
    "orchestration", "portfolio", "tech-review", "monet-lab",
    "daily-memo", "mcp-memory", "essay", "documentation",
    "context-cascade", "index-system", "user-guide",
    "auto-iterate", "ui-lab",
  ];
  const oy = 86;

  return (
    <g transform={`translate(${x}, 0)`}>
      <text x={0} y={14} fontFamily={EC.font} fontSize={7} fontWeight={300}
        fill={EC.gray60} style={{ letterSpacing: "1.5px" }}>
        PROJECT INDEX
      </text>
      <line x1={0} y1={20} x2={w} y2={20}
        stroke={EC.gray90} strokeWidth={EC.lineLight} />

      {/* Hero */}
      <Hero x={0} y={50} n="15" sub="PROJECTS" />

      {projects.map((p, i) => (
        <g key={i}>
          <text x={0} y={oy + i * lh} fontFamily={EC.font} fontSize={fs} fontWeight={300}
            fill={EC.black} style={{ fontVariantNumeric: "tabular-nums" }}>
            {String(i + 1).padStart(2, "0")}
          </text>
          {/* thin connector */}
          <line x1={18} y1={oy + i * lh - 3} x2={26} y2={oy + i * lh - 3}
            stroke={EC.gray90} strokeWidth={EC.lineLight} />
          <text x={28} y={oy + i * lh} fontFamily={EC.font} fontSize={fs} fontWeight={200}
            fill={EC.gray40}>{p}</text>
        </g>
      ))}

      {/* ... + 90 */}
      <text x={0} y={oy + 13 * lh + 6} fontFamily={EC.font} fontSize={7}
        fontWeight={200} fill={EC.gray85}>···</text>
      <text x={0} y={oy + 14 * lh + 6} fontFamily={EC.font} fontSize={fs} fontWeight={300}
        fill={EC.black} style={{ fontVariantNumeric: "tabular-nums" }}>90</text>
      <line x1={18} y1={oy + 14 * lh + 3} x2={26} y2={oy + 14 * lh + 3}
        stroke={EC.gray90} strokeWidth={EC.lineLight} />
      <text x={28} y={oy + 14 * lh + 6} fontFamily={EC.font} fontSize={fs} fontWeight={200}
        fill={EC.gray40}>pending</text>
    </g>
  );
}

/* ── Column 2: Naming Convention ── */
function Col2({ x, w }: { x: number; w: number }) {
  const items: { y: number; text: string; color: string; weight: number; isSec?: boolean; isFmt?: boolean }[] = [];
  let y = 86;

  function sec(label: string) {
    items.push({ y, text: label, color: EC.gray40, weight: 300, isSec: true });
    y += 13;
  }
  function fmt(text: string) {
    items.push({ y, text, color: EC.black, weight: 300, isFmt: true });
    y += lh + 1;
  }
  function rule(text: string, color = EC.gray60) {
    items.push({ y, text, color, weight: 200 });
    y += lh;
  }
  function hr() {
    y += 16;
  }

  sec("PIPELINE ROOT");
  fmt("{NN}_{purpose}_{MMDD}");
  rule("NN  순차, 중복 금지");
  rule("purpose  kebab-case, max 30자");
  rule("MMDD  시작일 4자리");
  hr();

  sec("ROUND FOLDER");
  fmt("{NN}_{phase}-r{N}");
  rule("ex) 20_architect-r1");
  hr();

  sec("MERGED FOLDER");
  fmt("{NN}_{phase}-merged");
  rule("ex) 28_architect-merged");
  hr();

  sec("PHASE BANDS");
  rule(" 0–9   meta");
  rule("10–19  diagnose");
  rule("20–29  architect");
  rule("30–39  build");
  rule("40–49  harden");
  rule("90–99  output", EC.accent);
  hr();

  sec("RESERVED");
  rule("x8  {phase}-state");
  rule("x9  {phase}-hold");
  hr();

  sec("REQUIRED FILES");
  rule("00_index.md  모든 폴더", EC.accent);
  rule("02_context.md  Phase 전환", EC.accent);

  return (
    <g transform={`translate(${x}, 0)`}>
      <text x={0} y={14} fontFamily={EC.font} fontSize={7} fontWeight={300}
        fill={EC.gray60} style={{ letterSpacing: "1.5px" }}>
        NAMING CONVENTION
      </text>
      <line x1={0} y1={20} x2={w} y2={20}
        stroke={EC.gray90} strokeWidth={EC.lineLight} />

      {/* Hero */}
      <Hero x={0} y={50} n="17" sub="RULES" />

      {items.map((it, i) => {
        if (it.text === "__HR__") {
          return <line key={i} x1={0} y1={it.y} x2={w * 0.5} y2={it.y}
            stroke={EC.gray90} strokeWidth={EC.lineLight} />;
        }
        return (
          <text key={i} x={0} y={it.y}
            fontFamily={EC.font}
            fontSize={it.isSec ? 7 : it.isFmt ? fs : fs - 1}
            fontWeight={it.weight}
            fill={it.color}
            style={it.isSec
              ? { letterSpacing: "2px" }
              : { fontVariantNumeric: "tabular-nums" }}>
            {it.text}
          </text>
        );
      })}
    </g>
  );
}

/* ── Column 3: Pipeline When Full ── */
function Col3({ x, w }: { x: number; w: number }) {
  type Entry = { name: string; depth: number; accent?: boolean; note?: string };
  type Section = { label: string; band: string; items: Entry[] };

  const sections: Section[] = [
    { label: "META", band: "0–9", items: [
      { name: "00_index.md", depth: 0, accent: true, note: "진입점" },
      { name: "01_plan.md", depth: 0 },
      { name: "foundation/", depth: 0 },
      { name: "philosophy.md", depth: 1 },
      { name: "principles.md", depth: 1 },
      { name: "workflow.md", depth: 1 },
    ]},
    { label: "DIAGNOSE", band: "10–19", items: [
      { name: "10_diagnose-r1/", depth: 0 },
      { name: "00_index.md", depth: 1 },
      { name: "01_dialogue.md", depth: 1 },
      { name: "18_diagnose-merged/", depth: 0 },
    ]},
    { label: "ARCHITECT", band: "20–29", items: [
      { name: "20_architect-r1/", depth: 0 },
      { name: "00_index.md", depth: 1 },
      { name: "01_dialogue.md", depth: 1 },
      { name: "02_context.md", depth: 1, accent: true, note: "경계" },
      { name: "28_architect-merged/", depth: 0 },
    ]},
    { label: "BUILD", band: "30–39", items: [
      { name: "30_build-r1/", depth: 0 },
      { name: "00_index.md", depth: 1 },
      { name: "02_context.md", depth: 1, accent: true },
      { name: "38_build-merged/", depth: 0 },
    ]},
    { label: "HARDEN", band: "40–49", items: [
      { name: "40_harden-r1/", depth: 0 },
      { name: "48_harden-merged/", depth: 0 },
    ]},
    { label: "OUTPUT", band: "90", items: [
      { name: "90_output/", depth: 0, accent: true, note: "산출물" },
      { name: "00_final-output.md", depth: 1 },
      { name: "01_handoff.md", depth: 1 },
      { name: "02_pdr-report.md", depth: 1 },
    ]},
  ];

  const c3lh = 14;

  return (
    <g transform={`translate(${x}, 0)`}>
      <text x={0} y={14} fontFamily={EC.font} fontSize={7} fontWeight={300}
        fill={EC.gray60} style={{ letterSpacing: "1.5px" }}>
        PIPELINE WHEN FULL
      </text>
      <line x1={0} y1={20} x2={w} y2={20}
        stroke={EC.gray90} strokeWidth={EC.lineLight} />

      {/* Hero */}
      <Hero x={0} y={50} n="11" sub="FOLDERS" />

      {(() => {
        let cy = 98;
        return sections.map((sec, si) => {
          const sectionY = cy;

          /* Section label — floating above first item */
          const labelEl = sec.label ? (
            <text key={`sl${si}`} x={0} y={cy - 12}
              fontFamily={EC.font} fontSize={7} fontWeight={300}
              fill={EC.gray40} style={{ letterSpacing: "1.5px" }}>
              {sec.label} <tspan fill={EC.gray60}>{sec.band}</tspan>
            </text>
          ) : null;

          const ruleEl = null;

          const itemEls = sec.items.map((e, ei) => {
            const y = cy + ei * c3lh;
            const indent = e.depth * 12;
            const col = e.accent ? EC.accent : e.depth ? EC.gray60 : EC.black;

            return (
              <g key={`${si}-${ei}`}>
                {e.depth === 1 && (
                  <>
                    <line x1={indent - 3} y1={y - 10} x2={indent - 3} y2={y - 3}
                      stroke={EC.gray90} strokeWidth={EC.lineLight} />
                    <line x1={indent - 3} y1={y - 3} x2={indent + 3} y2={y - 3}
                      stroke={EC.gray90} strokeWidth={EC.lineLight} />
                  </>
                )}
                <text x={indent + (e.depth ? 6 : 0)} y={y}
                  fontFamily={EC.font} fontSize={fs}
                  fontWeight={e.depth ? 200 : 300} fill={col}>
                  {e.name}
                </text>
                {e.note && (
                  <text x={142} y={y}
                    fontFamily={EC.font} fontSize={8} fontWeight={200} fill={EC.accent}
                    style={{ fontStyle: "italic" }}>
                    {e.note}
                  </text>
                )}
              </g>
            );
          });

          cy += sec.items.length * c3lh + 22;
          return <g key={`sec${si}`}>{ruleEl}{labelEl}{itemEls}</g>;
        });
      })()}
    </g>
  );
}

/* ── Main: 4 columns with progressive expansion ── */
export function CEFolderPath() {
  const c0w = 90, c1w = 130, c2w = 190, c3w = 280;
  const gap = 44;
  const shift = 60;  // 2cm additional spacing per column
  const pad = 16;
  const W = pad + c0w + gap + c1w + gap + c2w + gap + c3w + pad + shift * 3;
  const H = 580;

  const c0x = pad;
  const c1x = c0x + c0w + gap + shift;
  const c2x = c1x + c1w + gap + shift;
  const c3x = c2x + c2w + gap + shift;

  return (
    <div style={{ margin: "48px auto 40px", maxWidth: 1100 }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>

        {/* Column dividers */}
        {[c1x, c2x, c3x].map((cx, i) => (
          <line key={i} x1={cx - gap / 2} y1={20} x2={cx - gap / 2} y2={H - 40}
            stroke={EC.gray90} strokeWidth={EC.lineLight} />
        ))}

        <Col0 x={c0x} w={c0w} />
        <Col1 x={c1x} w={c1w} />
        <Col2 x={c2x} w={c2w} />
        <Col3 x={c3x} w={c3w} />
      </svg>
    </div>
  );
}
