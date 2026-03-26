/**
 * Diagram Primitive System v1
 * SoT: .impeccable.md + 도식 시스템 스펙
 *
 * Shape:     Circle, Rect, Ellipse, Diamond
 * Composite: CardNode (header + children slot)
 * Container: GroupBox, Band
 * Edge:      Edge (direct/orthogonal), FanOut (1→N)
 * Text:      FloatingLabel, EdgeLabel (NodeLabel은 Shape 내장)
 * Meta:      LegendItem
 * Layout:    absolute | grid | stack-h | stack-v | lane | radial | tree
 */
import type { ReactNode } from "react";
import { COLORS, TYPO, CONN, NODE, DiagramContainer, type Variant } from "./diagramTokens";

/* ═══════════════════════════════════
   Type Definitions
   ═══════════════════════════════════ */

export type Anchor = "left" | "right" | "top" | "bottom" | "center";
export type Routing = "direct" | "orthogonal-h" | "orthogonal-v" | "auto";

export interface NodeDef {
  id: string;
  type: "circle" | "rect" | "ellipse" | "diamond";
  x: number;              // center
  y: number;              // center
  variant?: Variant;
  label?: string;
  sub?: string;
  r?: number;             // circle
  w?: number;             // rect, ellipse, diamond
  h?: number;
  cornerRadius?: number;  // rect only
}

export interface CardNodeDef {
  id: string;
  type: "card";
  x: number;              // top-left
  y: number;
  w: number;
  h: number;
  header?: string;
  headerH?: number;
  headerColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

export interface EdgeDef {
  from: string;
  to: string;
  fromAnchor?: Anchor;
  toAnchor?: Anchor;
  routing?: Routing;
  style?: "solid" | "dashed";
  marker?: "none" | "arrow-end" | "arrow-both";
  cornerRadius?: number;
  color?: string;
  strokeWidth?: number;
  label?: string;
}

export interface FanOutDef {
  from: string;
  to: string[];
  branchOffset?: number;
  dotRadius?: number;
  color?: string;
  strokeWidth?: number;
}

export interface LabelDef {
  x: number;
  y: number;
  text: string;
  level?: "hero" | "label" | "desc" | "caption";
  anchor?: "start" | "middle" | "end";
  color?: string;
  size?: number;
  weight?: number;
}

export interface LegendItemDef {
  x: number;
  y: number;
  color: string;
  text: string;
  shape?: "circle" | "square";
}

export interface GroupBoxDef {
  x: number; y: number; w: number; h: number;
  border?: "solid" | "dashed";
  label?: string;
  labelPos?: "left" | "top";
}

export interface BandDef {
  x: number; y: number; w: number; h: number;
  fill?: string;
  label?: string;
  labelPos?: "left" | "top";
}

/* ═══════════════════════════════════
   Anchor Calculation
   ═══════════════════════════════════ */

type AnyNode = NodeDef | CardNodeDef;

function getNodeCenter(n: AnyNode): { x: number; y: number } {
  if (n.type === "card") return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
  return { x: n.x, y: n.y };
}

function getNodeBounds(n: AnyNode): { hw: number; hh: number } {
  if (n.type === "circle") return { hw: n.r ?? 8, hh: n.r ?? 8 };
  if (n.type === "card") return { hw: n.w / 2, hh: n.h / 2 };
  return { hw: (n.w ?? 100) / 2, hh: (n.h ?? 40) / 2 };
}

function getAnchorPoint(n: AnyNode, anchor: Anchor): { x: number; y: number } {
  const c = getNodeCenter(n);
  const b = getNodeBounds(n);
  switch (anchor) {
    case "left":   return { x: c.x - b.hw, y: c.y };
    case "right":  return { x: c.x + b.hw, y: c.y };
    case "top":    return { x: c.x, y: c.y - b.hh };
    case "bottom": return { x: c.x, y: c.y + b.hh };
    default:       return c;
  }
}

function autoAnchors(from: AnyNode, to: AnyNode): [Anchor, Anchor] {
  const fc = getNodeCenter(from);
  const tc = getNodeCenter(to);
  const dx = tc.x - fc.x;
  const dy = tc.y - fc.y;
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? ["right", "left"] : ["left", "right"];
  }
  return dy > 0 ? ["bottom", "top"] : ["top", "bottom"];
}

/* ═══════════════════════════════════
   Edge Path Generation
   ═══════════════════════════════════ */

function buildEdgePath(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  routing: Routing,
  cr: number,
): string {
  if (routing === "direct") {
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`;
  }

  const isH = routing === "orthogonal-h";
  const midX = isH ? p2.x : p1.x;
  const midY = isH ? p1.y : p2.y;

  if (cr <= 0) {
    return `M ${p1.x} ${p1.y} L ${midX} ${midY} L ${p2.x} ${p2.y}`;
  }

  const dx1 = midX - p1.x;
  const dy1 = midY - p1.y;
  const dx2 = p2.x - midX;
  const dy2 = p2.y - midY;
  const maxR = Math.min(cr, Math.abs(dx1 || Infinity) / 2, Math.abs(dy1 || Infinity) / 2, Math.abs(dx2 || Infinity) / 2, Math.abs(dy2 || Infinity) / 2);

  const s1x = Math.sign(dx1) || 0;
  const s1y = Math.sign(dy1) || 0;
  const s2x = Math.sign(dx2) || 0;
  const s2y = Math.sign(dy2) || 0;

  const bx = midX - s1x * maxR;
  const by = midY - s1y * maxR;
  const ax = midX + s2x * maxR;
  const ay = midY + s2y * maxR;

  return `M ${p1.x} ${p1.y} L ${bx} ${by} Q ${midX} ${midY} ${ax} ${ay} L ${p2.x} ${p2.y}`;
}

/* ═══════════════════════════════════
   Shape Renderers
   ═══════════════════════════════════ */

function RenderCircle({ n }: { n: NodeDef }) {
  const r = n.r ?? 8;
  const c = COLORS[n.variant ?? "neutral"];
  const solid = (n.variant ?? "").startsWith("solid-");
  return <circle cx={n.x} cy={n.y} r={r} fill={c.fill} stroke={solid ? "none" : c.stroke} strokeWidth={NODE.strokeWidth} />;
}

function RenderRect({ n }: { n: NodeDef }) {
  const w = n.w ?? 100, h = n.h ?? 40;
  const c = COLORS[n.variant ?? "primary"];
  const solid = (n.variant ?? "").startsWith("solid-");
  const txt = solid ? TYPO.onDark : TYPO.label.color;
  const sub = solid ? "rgba(255,255,255,0.7)" : TYPO.desc.color;
  return (
    <g>
      <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h}
        rx={n.cornerRadius ?? NODE.rx} fill={c.fill} stroke={c.stroke} strokeWidth={NODE.strokeWidth} />
      {n.label && (
        <text x={n.x} y={n.y + (n.sub ? -4 : 1)} textAnchor="middle" dominantBaseline="middle"
          fontFamily={TYPO.family} fontSize={TYPO.label.size} fontWeight={TYPO.label.weight} fill={txt}>
          {n.label}
        </text>
      )}
      {n.sub && (
        <text x={n.x} y={n.y + 12} textAnchor="middle" dominantBaseline="middle"
          fontFamily={TYPO.family} fontSize={TYPO.desc.size} fontWeight={TYPO.desc.weight} fill={sub}>
          {n.sub}
        </text>
      )}
    </g>
  );
}

function RenderEllipse({ n }: { n: NodeDef }) {
  const w = n.w ?? 100, h = n.h ?? 40;
  const c = COLORS[n.variant ?? "primary"];
  return (
    <g>
      <ellipse cx={n.x} cy={n.y} rx={w / 2} ry={h / 2}
        fill={c.fill} stroke={c.stroke} strokeWidth={NODE.strokeWidth} />
      {n.label && (
        <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
          fontFamily={TYPO.family} fontSize={TYPO.label.size} fontWeight={TYPO.label.weight} fill={TYPO.label.color}>
          {n.label}
        </text>
      )}
    </g>
  );
}

function RenderDiamond({ n }: { n: NodeDef }) {
  const w = n.w ?? 60, h = n.h ?? 60;
  const c = COLORS[n.variant ?? "tertiary"];
  const pts = `${n.x},${n.y - h / 2} ${n.x + w / 2},${n.y} ${n.x},${n.y + h / 2} ${n.x - w / 2},${n.y}`;
  return (
    <g>
      <polygon points={pts} fill={c.fill} stroke={c.stroke} strokeWidth={NODE.strokeWidth} />
      {n.label && (
        <text x={n.x} y={n.y + 1} textAnchor="middle" dominantBaseline="middle"
          fontFamily={TYPO.family} fontSize={TYPO.desc.size} fontWeight={TYPO.label.weight} fill={TYPO.label.color}>
          {n.label}
        </text>
      )}
    </g>
  );
}

function RenderNode({ n }: { n: NodeDef }) {
  switch (n.type) {
    case "circle":  return <RenderCircle n={n} />;
    case "rect":    return <RenderRect n={n} />;
    case "ellipse": return <RenderEllipse n={n} />;
    case "diamond": return <RenderDiamond n={n} />;
  }
}

/* ── CardNode ── */

function RenderCardNode({ n }: { n: CardNodeDef }) {
  const hh = n.headerH ?? 24;
  const sc = n.strokeColor ?? COLORS.surface.stroke;
  const sw = n.strokeWidth ?? 0.5;
  return (
    <g>
      <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={2}
        fill={COLORS.surface.fill} stroke={sc} strokeWidth={sw} />
      {n.header && (
        <>
          <rect x={n.x} y={n.y} width={n.w} height={hh} rx={1}
            fill={n.headerColor ?? COLORS.primary.stroke} opacity={0.1} />
          <text x={n.x + 10} y={n.y + hh / 2 + 1} dominantBaseline="middle"
            fontFamily={TYPO.family} fontSize={8} fontWeight={700} fill={TYPO.label.color}>
            {n.header}
          </text>
        </>
      )}
      {n.children}
    </g>
  );
}

/* ═══════════════════════════════════
   Edge Renderer
   ═══════════════════════════════════ */

function RenderEdge({ e, nodeMap }: { e: EdgeDef; nodeMap: Map<string, AnyNode> }) {
  const fromN = nodeMap.get(e.from);
  const toN = nodeMap.get(e.to);
  if (!fromN || !toN) return null;

  let routing = e.routing ?? "direct";
  let fA = e.fromAnchor;
  let tA = e.toAnchor;

  if (routing === "auto" || (!fA && !tA)) {
    const [af, at] = autoAnchors(fromN, toN);
    fA = fA ?? af;
    tA = tA ?? at;
    if (routing === "auto") {
      const fc = getNodeCenter(fromN);
      const tc = getNodeCenter(toN);
      routing = Math.abs(tc.x - fc.x) > Math.abs(tc.y - fc.y) ? "orthogonal-h" : "orthogonal-v";
    }
  }
  fA = fA ?? "center";
  tA = tA ?? "center";

  const p1 = getAnchorPoint(fromN, fA);
  const p2 = getAnchorPoint(toN, tA);
  const d = buildEdgePath(p1, p2, routing, e.cornerRadius ?? 0);
  const color = e.color ?? CONN.stroke;
  const sw = e.strokeWidth ?? CONN.strokeWidth;
  const markerId = e.marker === "arrow-end" ? "arrow-default" : undefined;

  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={sw}
        strokeDasharray={e.style === "dashed" ? CONN.dashDepend : undefined}
        markerEnd={markerId ? `url(#${markerId})` : undefined} />
      {e.label && (
        <text x={(p1.x + p2.x) / 2} y={(p1.y + p2.y) / 2 - 6}
          textAnchor="middle" fontFamily={TYPO.family} fontSize={9} fill={TYPO.desc.color}>
          {e.label}
        </text>
      )}
    </g>
  );
}

/* ── FanOut ── */

function RenderFanOut({ f, nodeMap }: { f: FanOutDef; nodeMap: Map<string, AnyNode> }) {
  const fromN = nodeMap.get(f.from);
  if (!fromN) return null;

  const targets = f.to.map((id) => nodeMap.get(id)).filter(Boolean) as AnyNode[];
  if (targets.length === 0) return null;

  const fc = getNodeCenter(fromN);
  const fb = getNodeBounds(fromN);
  const offset = f.branchOffset ?? 30;
  const branchY = fc.y + fb.hh + offset;
  const color = f.color ?? COLORS.surface.stroke;
  const sw = f.strokeWidth ?? 0.5;
  const dr = f.dotRadius ?? 1.5;

  const targetCenters = targets.map(getNodeCenter);
  const minX = Math.min(...targetCenters.map((t) => t.x));
  const maxX = Math.max(...targetCenters.map((t) => t.x));

  return (
    <g>
      {/* 세로: from → branchY */}
      <line x1={fc.x} y1={fc.y + fb.hh} x2={fc.x} y2={branchY} stroke={color} strokeWidth={sw} />
      {/* 가로: 분배선 */}
      <line x1={minX} y1={branchY} x2={maxX} y2={branchY} stroke={color} strokeWidth={sw} />
      {/* 세로: branchY → 각 target */}
      {targets.map((t, i) => {
        const tc = getNodeCenter(t);
        const tb = getNodeBounds(t);
        return (
          <g key={i}>
            <line x1={tc.x} y1={branchY} x2={tc.x} y2={tc.y - tb.hh} stroke={color} strokeWidth={sw} />
            <circle cx={tc.x} cy={branchY} r={dr} fill={color} />
          </g>
        );
      })}
    </g>
  );
}

/* ═══════════════════════════════════
   Text / Meta Renderers
   ═══════════════════════════════════ */

function RenderLabel({ l }: { l: LabelDef }) {
  const t = TYPO[l.level ?? "desc"];
  return (
    <text x={l.x} y={l.y} textAnchor={l.anchor ?? "middle"}
      fontFamily={TYPO.family} fontSize={l.size ?? t.size}
      fontWeight={l.weight ?? t.weight} fill={l.color ?? t.color}>
      {l.text}
    </text>
  );
}

function RenderLegendItem({ l }: { l: LegendItemDef }) {
  return (
    <g>
      {l.shape === "square"
        ? <rect x={l.x} y={l.y - 4} width={8} height={8} rx={2} fill={l.color} />
        : <circle cx={l.x + 4} cy={l.y} r={4} fill={l.color} />
      }
      <text x={l.x + 14} y={l.y + 1} dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={10} fill={TYPO.desc.color}>
        {l.text}
      </text>
    </g>
  );
}

function RenderGroupBox({ g }: { g: GroupBoxDef }) {
  return (
    <g>
      <rect x={g.x} y={g.y} width={g.w} height={g.h} rx={4}
        fill="none" stroke={COLORS.surface.stroke} strokeWidth={1}
        strokeDasharray={g.border === "dashed" ? "6 4" : undefined} />
      {g.label && (
        <text
          x={g.labelPos === "left" ? g.x - 8 : g.x + g.w / 2}
          y={g.labelPos === "left" ? g.y + g.h / 2 : g.y - 6}
          textAnchor={g.labelPos === "left" ? "end" : "middle"}
          dominantBaseline={g.labelPos === "left" ? "middle" : "auto"}
          fontFamily={TYPO.family} fontSize={9} fontWeight={600} fill={TYPO.caption.color}>
          {g.label}
        </text>
      )}
    </g>
  );
}

function RenderBand({ b }: { b: BandDef }) {
  return (
    <g>
      <rect x={b.x} y={b.y} width={b.w} height={b.h} rx={2}
        fill={b.fill ?? "rgba(0,0,0,0.02)"} />
      {b.label && (
        <text
          x={b.labelPos === "left" ? b.x - 8 : b.x + b.w / 2}
          y={b.labelPos === "left" ? b.y + b.h / 2 : b.y - 4}
          textAnchor={b.labelPos === "left" ? "end" : "middle"}
          fontFamily={TYPO.family} fontSize={9} fontWeight={600} fill={TYPO.caption.color}>
          {b.label}
        </text>
      )}
    </g>
  );
}

/* ═══════════════════════════════════
   DiagramScene — Main Renderer
   ═══════════════════════════════════ */

export interface DiagramSceneProps {
  nodes?: NodeDef[];
  cards?: CardNodeDef[];
  edges?: EdgeDef[];
  fanOuts?: FanOutDef[];
  labels?: LabelDef[];
  legends?: LegendItemDef[];
  groupBoxes?: GroupBoxDef[];
  bands?: BandDef[];
  width?: number;
  height?: number;
  viewBoxOverride?: string;
  maxWidth?: number;
  marginTop?: number;
  wide?: boolean;
  children?: ReactNode;
}

export function DiagramScene({
  nodes, cards, edges, fanOuts, labels, legends, groupBoxes, bands,
  width, height, viewBoxOverride, maxWidth, marginTop, wide, children,
}: DiagramSceneProps) {
  // Build node map for edge lookups
  const nodeMap = new Map<string, AnyNode>();
  nodes?.forEach((n) => nodeMap.set(n.id, n));
  cards?.forEach((n) => nodeMap.set(n.id, n));

  return (
    <DiagramContainer viewBox={viewBoxOverride ?? `0 0 ${width ?? 600} ${height ?? 400}`}
      maxWidth={maxWidth} marginTop={marginTop} wide={wide}>
      <defs>
        <marker id="arrow-default" viewBox="0 0 10 7" refX="10" refY="3.5"
          markerWidth="8" markerHeight="6" orient="auto-start-reverse">
          <polygon points="0 0, 10 3.5, 0 7" fill={CONN.stroke} />
        </marker>
        <marker id="arrow-accent" viewBox="0 0 10 7" refX="10" refY="3.5"
          markerWidth="8" markerHeight="6" orient="auto-start-reverse">
          <polygon points="0 0, 10 3.5, 0 7" fill={COLORS.accent.fill} />
        </marker>
      </defs>

      {/* L1: Bands */}
      {bands?.map((b, i) => <RenderBand key={`band-${i}`} b={b} />)}

      {/* L2: GroupBoxes */}
      {groupBoxes?.map((g, i) => <RenderGroupBox key={`gb-${i}`} g={g} />)}

      {/* L3: FanOuts (behind edges) */}
      {fanOuts?.map((f, i) => <RenderFanOut key={`fo-${i}`} f={f} nodeMap={nodeMap} />)}

      {/* L4: Edges */}
      {edges?.map((e, i) => <RenderEdge key={`edge-${i}`} e={e} nodeMap={nodeMap} />)}

      {/* L5: Nodes */}
      {nodes?.map((n) => <RenderNode key={n.id} n={n} />)}

      {/* L6: CardNodes */}
      {cards?.map((n) => <RenderCardNode key={n.id} n={n} />)}

      {/* L7: Labels */}
      {labels?.map((l, i) => <RenderLabel key={`lbl-${i}`} l={l} />)}

      {/* L8: Legends */}
      {legends?.map((l, i) => <RenderLegendItem key={`leg-${i}`} l={l} />)}

      {/* L9: Custom */}
      {children}
    </DiagramContainer>
  );
}
