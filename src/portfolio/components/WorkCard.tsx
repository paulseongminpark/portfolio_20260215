import { type WorkKey } from "../content/work";

const GRADIENTS: Record<string, string> = {
  orchestration: "radial-gradient(ellipse at 40% 50%, #2d1b4e 0%, #0f0a1a 100%)",
  "empty-house": "radial-gradient(ellipse at 40% 50%, #1e3a5f 0%, #0f172a 100%)",
  "skin-diary":  "radial-gradient(ellipse at 40% 50%, #0d4f3c 0%, #052e16 100%)",
  "pmcc":        "radial-gradient(ellipse at 40% 50%, #451a03 0%, #1c0a00 100%)",
};

interface WorkItem {
  id: string;
  workKey: WorkKey;
  label: string;
  eyebrow: string;
  tag: string;
  description: string;
  bgImage?: string;
  bgPosition?: string;
  bg?: string;
}

export function GridCard({ work, onSelect }: { work: WorkItem; onSelect: () => void }) {
  const isMcp = work.workKey === "mcp-memory";

  const bgStyle = work.bgImage
    ? { backgroundImage: `url(${work.bgImage})`, backgroundPosition: work.bgPosition ?? "center" }
    : { background: work.bg ?? GRADIENTS[work.workKey] ?? "#1a1a1a" };

  return (
    <div className="p12-work-card" onClick={onSelect}>
      <div className="p12-card-bg" style={bgStyle} />

      <p
        className="p12-card-center-title"
        style={isMcp ? { textShadow: "0 0 24px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.9), 0 0 48px rgba(0,0,0,0.7)" } : undefined}
      >
        {work.label}
      </p>

      <p className="p12-card-tag">{work.tag}</p>

      <div className="p12-card-panel">
        <p className="p12-card-panel-tag">{work.tag}</p>
        <p className="p12-card-panel-desc">{work.description}</p>
        <p className="p12-card-panel-cta">자세히 보기 →</p>
      </div>
    </div>
  );
}

export function FeaturedCard({ work, onSelect }: { work: WorkItem; onSelect: () => void }) {
  return <GridCard work={work} onSelect={onSelect} />;
}
