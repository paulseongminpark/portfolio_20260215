import { useState } from "react";
import { type WorkKey } from "../content/work";

// Work별 그래디언트
const GRADIENTS: Record<string, string> = {
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
}

export function FeaturedCard({ work, onSelect }: { work: WorkItem; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="p12-work-featured"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 그래디언트 배경 */}
      <div style={{ position: "absolute", inset: 0, background: GRADIENTS[work.workKey] }} />
      <div className="p12-work-featured-overlay">
        <p className="p12-work-meta">{work.tag} · {work.eyebrow}</p>
        <h3 className="p12-work-title">{work.label}</h3>
        <p className="p12-work-desc">{work.description}</p>
        <p className="p12-work-cta" style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(4px)" }}>
          자세히 보기 →
        </p>
      </div>
    </div>
  );
}

const PMCC_GRADIENT = "linear-gradient(135deg, #fed7aa 0%, #fbbf24 50%, #f59e0b 100%)";

export function GridCard({ work, onSelect }: { work: WorkItem; onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isPmcc = work.workKey === "pmcc";
  return (
    <div
      className="p12-work-card"
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "absolute", inset: 0, background: isPmcc ? PMCC_GRADIENT : GRADIENTS[work.workKey], transition: "transform 0.5s ease", transform: hovered ? "scale(1.03)" : "scale(1)" }} />
      {isPmcc && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(20px, 2.5vw, 32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", textShadow: "0 1px 8px rgba(0,0,0,0.15)" }}>
            Peer Mile Coffee Club
          </span>
        </div>
      )}
      <div className="p12-work-card-overlay">
        <p className="p12-work-meta">{work.tag} · {work.eyebrow}</p>
        <h3 className="p12-work-card-title">{work.label}</h3>
        <p className="p12-work-card-desc">{work.description}</p>
      </div>
    </div>
  );
}
