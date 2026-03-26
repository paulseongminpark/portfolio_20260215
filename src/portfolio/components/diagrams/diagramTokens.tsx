/**
 * Diagram Design Tokens & Shared SVG Helpers
 * SoT: .impeccable.md
 */
import type { ReactNode } from "react";

/* ── Container ── */
export const CONTAINER = {
  bg: "#fafafa",
  border: "1px solid #e8e8e8",
  borderRadius: 12,
  padding: "24px 20px 20px",
  maxWidth: 560,
} as const;

/* ── Semantic Colors ── */
export const COLORS = {
  primary:        { fill: "#DBEAFE", stroke: "#93C5FD" },
  secondary:      { fill: "#D1FAE5", stroke: "#6EE7B7" },
  tertiary:       { fill: "#FEF3C7", stroke: "#FCD34D" },
  accent:         { fill: "#D4632D", stroke: "#D4632D" },
  neutral:        { fill: "#F3F4F6", stroke: "#D1D5DB" },
  danger:         { fill: "#FEE2E2", stroke: "#FCA5A5" },
  surface:        { fill: "#FFFFFF", stroke: "#E5E7EB" },
  "solid-primary": { fill: "#3B82F6", stroke: "#3B82F6" },
  "solid-accent":  { fill: "#D4632D", stroke: "#D4632D" },
  "solid-neutral": { fill: "#6B7280", stroke: "#6B7280" },
} as const;

export type Variant = keyof typeof COLORS;

/* ── Typography ── */
export const TYPO = {
  family: "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
  label:   { size: 13, weight: 600, color: "#333333" },
  desc:    { size: 10, weight: 400, color: "#777777" },
  caption: { size: 10, weight: 400, color: "#999999" },
  hero:    { size: 28, weight: 700, color: "#D4632D" },
  onDark:  "#FFFFFF",
} as const;

/* ── Connections ── */
export const CONN = {
  stroke: "#999999",
  strokeWidth: 1.2,
  dashDepend: "4 3",
  dashOption: "3 2",
  arrowSize: 6,
} as const;

/* ── Node defaults ── */
export const NODE = {
  rx: 6,
  strokeWidth: 1.5,
} as const;

/* ═══════════════════════════════════
   Shared SVG Helper Components
   ═══════════════════════════════════ */

/** Diagram wrapper — container + SVG viewBox */
export function DiagramContainer({
  children, viewBox, wide, maxWidth, marginTop,
}: {
  children: ReactNode;
  viewBox: string;
  wide?: boolean;
  maxWidth?: number;
  marginTop?: number;
}) {
  return (
    <div style={{
      background: CONTAINER.bg,
      borderRadius: CONTAINER.borderRadius,
      padding: CONTAINER.padding,
      margin: `${marginTop ?? 24}px auto 24px`,
      maxWidth: wide ? "100%" : (maxWidth ?? CONTAINER.maxWidth),
      border: CONTAINER.border,
    }}>
      <svg viewBox={viewBox} width="100%" style={{ display: "block" }}>
        {children}
      </svg>
    </div>
  );
}

/** Rounded rect box with label + optional sub */
export function DBox({
  x, y, w, h, variant = "primary", label, sub,
}: {
  x: number; y: number; w: number; h: number;
  variant?: Variant; label: string; sub?: string;
}) {
  const c = COLORS[variant];
  const isSolid = variant.startsWith("solid-");
  const txtColor = isSolid ? TYPO.onDark : TYPO.label.color;
  const subColor = isSolid ? "rgba(255,255,255,0.7)" : TYPO.desc.color;

  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={NODE.rx}
        fill={c.fill} stroke={c.stroke} strokeWidth={NODE.strokeWidth} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 1)}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={TYPO.label.size}
        fontWeight={TYPO.label.weight} fill={txtColor}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 12}
          textAnchor="middle" dominantBaseline="middle"
          fontFamily={TYPO.family} fontSize={TYPO.desc.size}
          fontWeight={TYPO.desc.weight} fill={subColor}>
          {sub}
        </text>
      )}
    </g>
  );
}

/** Small neutral label box */
export function DSmallBox({
  x, y, w, h, label,
}: {
  x: number; y: number; w: number; h: number; label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={4}
        fill={COLORS.neutral.fill} stroke={COLORS.neutral.stroke} strokeWidth={1} />
      <text x={x + w / 2} y={y + h / 2 + 1}
        textAnchor="middle" dominantBaseline="middle"
        fontFamily={TYPO.family} fontSize={9} fill={TYPO.desc.color}>
        {label}
      </text>
    </g>
  );
}

/** Vertical arrow ↓ */
export function ArrowV({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const s = CONN.arrowSize;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 4}
        stroke={CONN.stroke} strokeWidth={CONN.strokeWidth} />
      <polygon
        points={`${x - s / 2},${y2 - s} ${x + s / 2},${y2 - s} ${x},${y2}`}
        fill={CONN.stroke}
      />
    </g>
  );
}

/** Horizontal arrow → or ← */
export function ArrowH({ y, x1, x2 }: { y: number; x1: number; x2: number }) {
  const dir = x2 > x1 ? 1 : -1;
  const s = CONN.arrowSize;
  return (
    <g>
      <line x1={x1} y1={y} x2={x2 - dir * 4} y2={y}
        stroke={CONN.stroke} strokeWidth={CONN.strokeWidth} />
      <polygon
        points={`${x2 - dir * s},${y - s / 2} ${x2 - dir * s},${y + s / 2} ${x2},${y}`}
        fill={CONN.stroke}
      />
    </g>
  );
}

/** Text label at specific position */
export function DLabel({
  x, y, text, level = "desc", anchor = "middle",
}: {
  x: number; y: number; text: string;
  level?: "label" | "desc" | "caption" | "hero";
  anchor?: "start" | "middle" | "end";
}) {
  const t = TYPO[level];
  return (
    <text x={x} y={y} textAnchor={anchor}
      fontFamily={TYPO.family} fontSize={t.size}
      fontWeight={t.weight} fill={t.color}>
      {text}
    </text>
  );
}

/** Circle node */
export function DCircle({
  cx, cy, r, variant = "primary",
}: {
  cx: number; cy: number; r: number; variant?: Variant;
}) {
  const c = COLORS[variant];
  return (
    <circle cx={cx} cy={cy} r={r}
      fill={c.fill} stroke={c.stroke} strokeWidth={NODE.strokeWidth} />
  );
}

/** Connection line (no arrow) */
export function DLine({
  x1, y1, x2, y2, dashed, color,
}: {
  x1: number; y1: number; x2: number; y2: number;
  dashed?: "depend" | "option";
  color?: string;
}) {
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color ?? CONN.stroke}
      strokeWidth={CONN.strokeWidth}
      strokeDasharray={dashed === "depend" ? CONN.dashDepend : dashed === "option" ? CONN.dashOption : undefined}
    />
  );
}

/** Dashed group boundary */
export function DGroupBox({
  x, y, w, h, label,
}: {
  x: number; y: number; w: number; h: number; label?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={8}
        fill="none" stroke={COLORS.surface.stroke} strokeWidth={1}
        strokeDasharray="6 4" />
      {label && (
        <text x={x + 8} y={y + 14}
          fontFamily={TYPO.family} fontSize={9}
          fontWeight={TYPO.desc.weight} fill={TYPO.caption.color}>
          {label}
        </text>
      )}
    </g>
  );
}
