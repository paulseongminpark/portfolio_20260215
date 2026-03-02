import "./portfolio.css";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type WorkKey } from "./content/work";
import { useWorkDetail } from "./hooks/useWorkDetail";
import { FadeIn } from "./components/FadeIn";
import { SectionLabel } from "./components/SectionLabel";
import { StatsBar } from "./components/StatsBar";
import { FeaturedCard, GridCard } from "./components/WorkCard";
import { WorkDetail } from "./components/WorkDetail";
import { TechReviewCards } from "./components/TechReviewCards";
import { AiWorkflowSection } from "./components/AiWorkflowSection";
import { TechReviewSystemSection } from "./components/TechReviewSystemSection";
import { ObsidianSystemSection } from "./components/ObsidianSystemSection";
import homeRaw from "./content/HOME_INTRO_TO_RELATION_KO.md?raw";
import aiRaw from "./content/AI_WORKFLOW_KO.md?raw";
import trRaw from "./content/TR_SYSTEM_KO.md?raw";

// ── 파싱 유틸 ───────────────────────────────────────────────────
function extractBold(raw: string, marker: string): string {
  const m = raw.match(new RegExp(`${marker}[\\s\\S]*?\\*\\*([\\s\\S]*?)\\*\\*`, "i"));
  return m ? m[1].trim() : "";
}

function parseSystemContent(raw: string) {
  const lines = raw.split("\n");
  const secIdx = lines.findIndex((l) => l.startsWith("# 3) HOW I OPERATE"));
  const sec = secIdx >= 0 ? lines.slice(secIdx + 1) : [];
  const strip = (l: string) => l.replace(/^\*\*(.+)\*\*$/, "$1");
  const nextBody = (arr: string[], from: number) => {
    let i = from;
    while (i < arr.length && arr[i].trim() === "") i++;
    return arr[i] ?? "";
  };
  const pIdx = sec.findIndex((l) => l.startsWith("**Operating Principles"));
  const fIdx = sec.findIndex((l) => l.startsWith("**Flow"));
  const tIdx = sec.findIndex((l) => l.startsWith("**Time"));
  const sIdx = sec.findIndex((l) => l.startsWith("**Sensation"));
  const rIdx = sec.findIndex((l) => l.startsWith("**Relation"));
  const flowItems: string[] = [];
  if (fIdx >= 0) {
    for (let i = fIdx + 1; i < sec.length; i++) {
      const m = sec[i].match(/^\d+\.\s+(.+)/);
      if (m) flowItems.push(m[1]);
      else if (flowItems.length > 0 && sec[i].trim() !== "") break;
    }
  }
  return {
    principlesTitle: pIdx >= 0 ? strip(sec[pIdx]) : "",
    principlesBody: pIdx >= 0 ? nextBody(sec, pIdx + 1) : "",
    flowTitle: fIdx >= 0 ? strip(sec[fIdx]) : "",
    flowItems,
    timeTitle: tIdx >= 0 ? strip(sec[tIdx]) : "",
    timeBody: tIdx >= 0 ? nextBody(sec, tIdx + 1) : "",
    sensationTitle: sIdx >= 0 ? strip(sec[sIdx]) : "",
    sensationBody: sIdx >= 0 ? nextBody(sec, sIdx + 1) : "",
    relationTitle: rIdx >= 0 ? strip(sec[rIdx]) : "",
    relationBody: rIdx >= 0 ? nextBody(sec, rIdx + 1) : "",
  };
}

/** ## 헤딩 → { heading, items[] } 파싱 (공통) */
function parseSections(raw: string): { heading: string; items: string[] }[] {
  const result: { heading: string; items: string[] }[] = [];
  const lines = raw.split("\n");
  let cur: { heading: string; items: string[] } | null = null;
  for (const line of lines) {
    const h2 = line.match(/^## (.+)/);
    if (h2) {
      if (cur) result.push(cur);
      cur = { heading: h2[1].trim(), items: [] };
      continue;
    }
    if (cur && line.trim().startsWith("-")) {
      cur.items.push(line.trim().replace(/^-\s*/, ""));
    }
  }
  if (cur) result.push(cur);
  return result;
}

function renderBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <mark key={i} style={{ background: "rgba(249, 115, 22, 0.18)", color: "inherit", borderRadius: 2, padding: "0 3px", fontWeight: 600 }}>{p.slice(2, -2)}</mark>
      : <span key={i}>{p}</span>
  );
}

function renderBoldPlain(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i} style={{ fontWeight: 600 }}>{p.slice(2, -2)}</strong>
      : <span key={i}>{p}</span>
  );
}

// ── TOC ──────────────────────────────────────────────────────────
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const ANTHROPIC = "#D4632D";
const TOC_SIDEBAR_WIDTH = 220;

const P12_TOC: Array<{ id: string; label: string; mini: string; items: Array<{ id: string; label: string }> }> = [
  { id: "about",   label: "About",                    mini: "AB", items: [
    { id: "about-intro",      label: "Intro" },
    { id: "about-background", label: "Background" },
    { id: "about-direction",  label: "Direction" },
  ]},
  { id: "system",  label: "System",                   mini: "SY", items: [
    { id: "product-1",        label: "Principles" },
    { id: "product-2",        label: "Flow" },
    { id: "system-time",      label: "Time" },
    { id: "system-sensation", label: "Sensation" },
    { id: "system-relation",  label: "Relation" },
    { id: "ai",               label: "AI System" },
  ]},
  { id: "work",    label: "Work",                     mini: "WK", items: [
    { id: "work-empty-house", label: "Empty House" },
    { id: "work-skin-diary",  label: "Skin Diary" },
    { id: "work-pmcc",        label: "PMCC" },
  ]},
  { id: "tr",      label: "Technical Writing System", mini: "TW", items: [
    { id: "tr-tech-review",   label: "Tech Review" },
    { id: "tr-obsidian",      label: "Obsidian" },
  ]},
  { id: "writing", label: "Writing",                  mini: "WR", items: [
    { id: "writing-1",        label: "W1" },
  ]},
  { id: "contact", label: "Contact",                  mini: "CT", items: [] },
];

// ── 데이터 ──────────────────────────────────────────────────────
const sys = parseSystemContent(homeRaw);
const aiSections = parseSections(aiRaw);
const trSections = parseSections(trRaw);

const aboutItems = [
  { id: "about-intro", label: "Intro", text: extractBold(homeRaw, "# 1\\) Intro") },
  { id: "about-background", label: "Background", text: extractBold(homeRaw, "\\*\\*Background\\*\\*") },
  { id: "about-direction", label: "Direction", text: extractBold(homeRaw, "\\*\\*Direction\\*\\*") },
];

const workItems = [
  { id: "work-empty-house", workKey: "empty-house" as WorkKey, label: "Empty House CPS", eyebrow: "June 2025", tag: "Data · Policy", description: "빈집 문제를 사람이 떠나서 생긴 결과로만 단정 짓는 기존 정책들의 설명이 의문이었습니다. 인구·상권·교통 데이터의 관계를 구조화해, 개입 우선순위를 판단할 수 있는 시스템을 설계했습니다." },
  { id: "work-skin-diary", workKey: "skin-diary" as WorkKey, label: "Skin Diary AI", eyebrow: "August 2025", tag: "AI · Mobile", description: "피부를 숫자로만 평가하는 방식으로는 지금 무엇을 해야 하는지 알 수 없다는 점이 답답했습니다. 사용자 맥락들을 결합해 행동 제안 시스템을 개발했습니다." },
  { id: "work-pmcc", workKey: "pmcc" as WorkKey, label: "PMCC", eyebrow: "2023–2026", tag: "Community · Design", description: "함께 달려도 사람들 사이가 좀처럼 가까워지지 않는 게 아쉬웠습니다. 관계가 시작되는 순간과 규칙을 직접 설계했습니다." },
];

function getWorkTitle(key: WorkKey) {
  if (key === "empty-house") return "Empty House CPS";
  if (key === "skin-diary") return "Skin Diary AI";
  return "PMCC";
}

const WORK_KEY_SET = new Set<WorkKey>(["empty-house", "skin-diary", "pmcc"]);

function parseWorkFromSearch(search: string): WorkKey | null {
  const params = new URLSearchParams(search);
  const work = params.get("work");
  if (!work) return null;
  return WORK_KEY_SET.has(work as WorkKey) ? (work as WorkKey) : null;
}

function getWorkFromLocation(): WorkKey | null {
  if (typeof window === "undefined") return null;
  return parseWorkFromSearch(window.location.search);
}

function getUrlWithWork(work: WorkKey | null): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  if (work) url.searchParams.set("work", work);
  else url.searchParams.delete("work");
  return `${url.pathname}${url.search}${url.hash}`;
}

const SYSTEM_ITEMS = [
  { id: "product-1", label: "Operating Principles", title: "", body: "사람의 의지에 기대지 않고, 행동이 나오게 만드는 '조건'을 설계합니다.", type: "text" as const },
  { id: "product-2", label: "Flow", title: "", body: "", flowItems: sys.flowItems, type: "list" as const },
  { id: "system-time", label: "Framework / Time", title: "", body: sys.timeBody, type: "text" as const },
  { id: "system-sensation", label: "Framework / Sensation", title: "", body: sys.sensationBody, type: "text" as const },
  { id: "system-relation", label: "Framework / Relation", title: "", body: sys.relationBody, type: "text" as const },
];

// ── 공통 섹션 흐름 카드 그리드 (portfolio_ui_test_v2 구조 기반) ──
interface SectionGrid {
  sections: { heading: string; items: string[] }[];
  cols?: 2 | 3;
  disableHighlight?: boolean;
}

function SectionFlowGrid({ sections, cols = 3, disableHighlight = false }: SectionGrid) {
  const colStyle = cols === 2 ? "1fr 1fr" : "1fr 1fr 1fr";
  return (
    <div style={{ display: "grid", gridTemplateColumns: colStyle, gap: 2, alignItems: "stretch" }}>
      {sections.map((sec, i) => (
        <FadeIn key={i} delay={i * 0.06} style={{ display: "flex" }}>
          <div style={{
            padding: "36px 32px",
            background: "#ffffff",
            border: "1px solid #e8e8e8",
            marginRight: -1, marginBottom: -1,
            flex: 1,
          }}>
            {/* eyebrow label — blue highlight */}
            <p style={{
              fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: "0.14em", textTransform: "uppercase",
              marginBottom: 16,
            }}>
              {disableHighlight ? (
                <span style={{ color: "#666" }}>{sec.heading}</span>
              ) : (
                <mark style={{ background: "rgba(37, 99, 235, 0.14)", color: "#1d4ed8", borderRadius: 2, padding: "2px 6px" }}>
                  {sec.heading}
                </mark>
              )}
            </p>
            {/* flowing items — no dash markers */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {sec.items.map((item, j) => (
                <p key={j} style={{
                  fontFamily: "'Inter','Noto Sans KR',sans-serif",
                  fontSize: 13, color: "#444", lineHeight: 1.75, margin: 0,
                }}>
                  {disableHighlight ? renderBoldPlain(item) : renderBold(item)}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

// ── TOC 컴포넌트 ─────────────────────────────────────────────────
function P12TocGroupItem({ group, expanded, activeGroup, activeItem, onToggle, onItemClick }: {
  group: { id: string; label: string; mini: string; items: Array<{ id: string; label: string }> };
  expanded: boolean; activeGroup: string; activeItem: string; onToggle: () => void;
  onItemClick?: (id: string) => void;
}) {
  const isActive = activeGroup === group.id;
  return (
    <div style={{ marginBottom: 2 }}>
      <a href={`#${group.id}`}
        onClick={(e) => { e.preventDefault(); scrollToId(group.id); if (group.items.length > 0) onToggle(); }}
        onMouseEnter={(e) => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.color = ANTHROPIC; el.style.fontWeight = "700"; } }}
        onMouseLeave={(e) => { if (!isActive) { const el = e.currentTarget as HTMLElement; el.style.color = "#4f4f4f"; el.style.fontWeight = "400"; } }}
        style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 11,
          fontWeight: isActive ? 600 : 400, color: isActive ? ANTHROPIC : "#4f4f4f",
          textDecoration: "none", padding: "5px 0", letterSpacing: "0.02em", transition: "color 0.15s", cursor: "pointer" }}>
        {group.label}
      </a>
      {expanded && group.items.length > 0 && (
        <div style={{ borderLeft: `2px solid ${ANTHROPIC}33`, marginLeft: 4, marginBottom: 4 }}>
          {group.items.map((item) => {
            const active = activeItem === item.id;
            return (
              <a key={item.id} href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); onItemClick ? onItemClick(item.id) : scrollToId(item.id); }}
                onMouseEnter={(e) => { if (!active) { const el = e.currentTarget as HTMLElement; el.style.color = ANTHROPIC; el.style.fontWeight = "600"; } }}
                onMouseLeave={(e) => { if (!active) { const el = e.currentTarget as HTMLElement; el.style.color = "#6f6f6f"; el.style.fontWeight = "400"; } }}
                style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 10,
                  fontWeight: active ? 600 : 400, color: active ? ANTHROPIC : "#6f6f6f",
                  textDecoration: "none", padding: "3px 0 3px 10px", transition: "color 0.15s",
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  borderLeft: active ? `2px solid ${ANTHROPIC}` : "2px solid transparent",
                  marginLeft: -2 }}>
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function P12TocSidebar({ expandedGroups, onToggleGroup, activeGroup, activeItem, onItemClick }: {
  expandedGroups: Set<string>; onToggleGroup: (id: string) => void;
  activeGroup: string; activeItem: string; onItemClick?: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", left: 0, top: 0, height: "100vh", overflowY: "auto",
        width: TOC_SIDEBAR_WIDTH,
        borderRight: "1px solid #e8e8e8", background: "#fafafa",
        zIndex: 10, display: "flex", flexDirection: "column",
        padding: "72px 18px 24px", boxSizing: "border-box",
        opacity: hovered ? 1 : 0.96,
        transform: hovered ? "translateX(0)" : "translateX(-3px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}>
      <nav style={{ flex: 1 }}>
        {P12_TOC.map((group) => (
          <P12TocGroupItem key={group.id} group={group}
            expanded={expandedGroups.has(group.id)}
            activeGroup={activeGroup} activeItem={activeItem}
            onToggle={() => onToggleGroup(group.id)}
            onItemClick={onItemClick} />
        ))}
      </nav>
    </aside>
  );
}

// ── Nav ──────────────────────────────────────────────────────────
function Nav({ onLogoClick, onNavClick, showLogo = true }: { onLogoClick?: () => void; onNavClick?: (id: string) => void; showLogo?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = ["About", "System", "Work", "AI", "TR", "Writing", "Contact"];
  return (
    <nav className={`p12-nav${scrolled ? " scrolled" : ""}`} style={{ background: scrolled ? undefined : "#ffffff" }}>
      {showLogo && (
        <a
          href="#contact"
          className="p12-nav-logo"
          onClick={(e) => {
            e.preventDefault();
            if (onLogoClick) {
              onLogoClick();
              return;
            }
            scrollToId("contact");
            onNavClick?.("contact");
          }}
        >
          PSM
        </a>
      )}
      <div className="p12-nav-links">
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="p12-nav-link"
            onClick={(e) => {
              e.preventDefault();
              const id = l.toLowerCase();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
              onNavClick?.(id);
            }}>
            {l}
          </a>
        ))}
        <a href="mailto:paulseongminpark@gmail.com" className="p12-nav-cta">Contact →</a>
      </div>
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
const heroWords = ["Building", "systems", "that", "think."];

function Hero() {
  return (
    <section id="hero" className="p12-hero" style={{ background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <motion.p className="p12-hero-badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          PORTFOLIO
        </motion.p>
        <h1 className="p12-h1" style={{ color: "#111111" }}>
          {heroWords.map((word, i) => (
            <motion.span key={i} style={{ display: "inline-block", marginRight: "0.25em" }}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p className="p12-hero-sub" style={{ color: "#555555" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.0 }}>
          데이터·AI·커뮤니티 시스템을 설계합니다.<br />
          Claude Code를 운영체제처럼 씁니다.
        </motion.p>
      </div>
      <div className="p12-hero-scroll">
        <span>↓</span>
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function Page12() {
  const [activeWork, setActiveWork] = useState<WorkKey | null>(() => getWorkFromLocation());
  const { parsedWork, heroSubtitle } = useWorkDetail(activeWork);

  const [tocExpanded, setTocExpanded] = useState<Set<string>>(new Set(["about", "system", "work", "tr", "writing"]));
  const [activeGroup, setActiveGroup] = useState("about");
  const [activeItem, setActiveItem] = useState("about");

  const toggleTocGroup = useCallback((id: string) => {
    setTocExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const WORK_KEY_MAP: Record<string, WorkKey> = {
    "work-empty-house": "empty-house",
    "work-skin-diary":  "skin-diary",
    "work-pmcc":        "pmcc",
  };

  const syncWorkHistory = useCallback(
    (work: WorkKey | null, mode: "push" | "replace", state: Record<string, unknown>) => {
      if (typeof window === "undefined") return;
      const nextUrl = getUrlWithWork(work);
      if (mode === "push") {
        window.history.pushState(state, "", nextUrl);
      } else {
        window.history.replaceState(state, "", nextUrl);
      }
    },
    [],
  );

  const openWorkDetail = useCallback((workKey: WorkKey) => {
    if (typeof window === "undefined") {
      setActiveWork(workKey);
      return;
    }

    if (activeWork === workKey) return;

    if (!activeWork) {
      syncWorkHistory(null, "replace", {
        ...(window.history.state ?? {}),
        view: "list",
        scrollY: window.scrollY,
      });
    }

    syncWorkHistory(workKey, "push", { view: "detail", work: workKey });
    setActiveWork(workKey);
  }, [activeWork, syncWorkHistory]);

  const closeWorkDetail = useCallback((targetId?: string) => {
    if (typeof window !== "undefined") {
      syncWorkHistory(null, "replace", {
        ...(window.history.state ?? {}),
        view: "list",
        scrollY: window.scrollY,
      });
    }
    setActiveWork(null);
    if (targetId) {
      setTimeout(() => scrollToId(targetId), 100);
    }
  }, [syncWorkHistory]);

  const handleWorkBack = useCallback(() => {
    if (typeof window === "undefined") {
      closeWorkDetail("work");
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    closeWorkDetail("work");
  }, [closeWorkDetail]);

  const handleTocItemClick = useCallback((id: string) => {
    if (WORK_KEY_MAP[id]) {
      openWorkDetail(WORK_KEY_MAP[id]);
    } else {
      scrollToId(id);
    }
  }, [openWorkDetail]);

  const handleNavClick = useCallback((id: string) => {
    const group = P12_TOC.find((g) => g.id === id || g.items.some((item) => item.id === id));
    if (group) {
      setActiveGroup(group.id);
      setActiveItem(id);
      setTocExpanded((prev) => new Set([...prev, group.id]));
    }
  }, []);

  useEffect(() => {
    if (activeWork) return;
    const allEntries: Array<{ id: string; groupId: string }> = [];
    P12_TOC.forEach((g) => {
      allEntries.push({ id: g.id, groupId: g.id });
      g.items.forEach((item) => allEntries.push({ id: item.id, groupId: g.id }));
    });
    const handleScroll = () => {
      const offset = 90;
      let current = allEntries[0];
      for (const entry of allEntries) {
        const el = document.getElementById(entry.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= offset) current = entry;
      }
      setActiveGroup(current.groupId);
      setActiveItem(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeWork]);

  useEffect(() => {
    if (!activeWork) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeWork]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const nextWork = getWorkFromLocation();
      setActiveWork(nextWork);

      if (!nextWork && typeof event.state?.scrollY === "number") {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: event.state.scrollY as number, behavior: "instant" });
        });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const id = "portfolio-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400;500;600&family=Noto+Sans+KR:wght@400;500;700&display=swap";
      document.head.appendChild(link);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  if (activeWork) {
    return (
      <div className="p12-root" style={{ background: "#ffffff", minHeight: "100vh" }}>
        <Nav
          onLogoClick={() => {
            closeWorkDetail("contact");
          }}
        />
        <AnimatePresence mode="wait">
          <motion.div key={activeWork}
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
            <WorkDetail
              activeWork={activeWork}
              title={getWorkTitle(activeWork)}
              heroSubtitle={heroSubtitle}
              parsedWork={parsedWork}
              onBack={handleWorkBack}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="p12-root" style={{ background: "#ffffff" }}>
      <P12TocSidebar
        expandedGroups={tocExpanded}
        onToggleGroup={toggleTocGroup}
        activeGroup={activeGroup}
        activeItem={activeItem}
        onItemClick={handleTocItemClick}
      />
      <div style={{ marginLeft: TOC_SIDEBAR_WIDTH }}>
      <Nav onNavClick={handleNavClick} />

      {/* ── Hero ── */}
      <Hero />

      {/* ── 01 · About ── */}
      <section id="about" className="p12-section" style={{ background: "#ffffff" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>01 · About</SectionLabel>
            <div className="p12-about-grid" style={{ marginTop: 24 }}>
              <div>
                <h2 className="p12-h2" style={{ color: "#111" }}>
                  박성민<br />
                  Paul Seongmin Park
                </h2>
              </div>
              <div className="p12-about-items">
                {aboutItems.map((item) => (
                  <FadeIn key={item.id}>
                    <div id={item.id}>
                      <p className="p12-about-item-label">{item.label}</p>
                      <p className="p12-about-item-text">{item.text}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 02 · System (How I Operate) ── */}
      <section id="system" className="p12-section" style={{ background: "#f7f7f5", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>02 · System</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 8 }}>
              How I Operate
            </h2>
            <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
              생각하고 실행하는 방식의 원칙. 시간·감각·관계를 어떻게 다루는지의 구조.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, alignItems: "stretch" }}>
            {SYSTEM_ITEMS.map((item, i) => (
              <FadeIn key={item.id} delay={i * 0.08} style={{ display: "flex" }}>
                <div id={item.id} style={{
                  padding: "40px 36px",
                  background: "#ffffff",
                  border: "1px solid #e8e8e8",
                  marginRight: -1, marginBottom: -1,
                  flex: 1,
                }}>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
                    <span style={{ color: "#666" }}>{item.label}</span>
                  </p>
                  {item.type === "list" ? (
                    <ol style={{ paddingLeft: 0, margin: 0, listStylePosition: "inside", fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: "#555", lineHeight: 1.75 }}>
                      {item.flowItems?.map((fi, j) => (
                        <li key={j} style={{ marginBottom: j < (item.flowItems?.length ?? 0) - 1 ? 8 : 0 }}>
                          {renderBoldPlain(fi)}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: "#555", lineHeight: 1.75, margin: 0 }}>
                      {renderBoldPlain(item.body)}
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
          {/* ── AI System (System 섹션 마지막) ── */}
          <FadeIn delay={0.2}>
            <div id="ai" style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid #e8e8e8" }}>
              <SectionLabel>AI System</SectionLabel>
              <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 8 }}>
                HOW I AI
              </h2>
              <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
                Claude Code를 운영체제처럼 쓴다.<br />
                What만 정의하면 15개 에이전트가 How를 결정하고 실행한다.
              </p>
              <StatsBar stats={[
                { value: "15", label: "Specialized Agents" },
                { value: "9", label: "Skills" },
                { value: "8", label: "Hooks" },
                { value: "4", label: "AI Tools" },
              ]} />
              <div style={{ marginTop: 32 }}>
                <SectionFlowGrid sections={aiSections} cols={3} disableHighlight />
              </div>
              <div style={{ paddingTop: 48, borderTop: "1px solid #e8e8e8", marginTop: 2 }}>
                <AiWorkflowSection raw={aiRaw} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 03 · Work ── */}
      <section id="work" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>03 · Work</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginBottom: 48, marginTop: 8 }}>Selected Work</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FeaturedCard work={workItems[0]} onSelect={() => openWorkDetail(workItems[0].workKey)} />
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="p12-work-grid">
              {workItems.slice(1).map((work) => (
                <GridCard key={work.id} work={work} onSelect={() => openWorkDetail(work.workKey)} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 04 · Technical Writing System ── */}
      <section id="tr" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>04 · Technical Writing System</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 8 }}>
              Technical Writing System
            </h2>
            <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 16 }}>
              기술 트렌드를 추적하는 퍼블리싱 파이프라인과, AI 에이전트의 공유 메모리를 관리하는 문서 시스템.
            </p>
          </FadeIn>
          {/* Tech Review sub-section — sticky h3 */}
          <div id="tr-tech-review" style={{ marginTop: 48 }}>
            <FadeIn delay={0.05}>
              <div style={{ position: "sticky", top: 0, zIndex: 5, background: "#ffffff", paddingTop: 16, paddingBottom: 12, borderBottom: "1px solid #e8e8e8", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Tech Review</h3>
                <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                  AI·빅테크·신기술 뉴스를 매일 추적하고, 산업·직무 관점 인사이트로 가공하는 퍼블리싱 파이프라인.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.05}>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#aaa", marginBottom: 20 }}>
                Latest Posts
              </p>
              <TechReviewCards />
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid #e8e8e8" }}>
                <StatsBar stats={[
                  { value: "매일", label: "포스팅 주기" },
                  { value: "Jekyll", label: "정적 사이트" },
                  { value: "자동", label: "GitHub Actions 빌드" },
                  { value: "API", label: "feed.json 연동" },
                ]} />
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <SectionFlowGrid sections={trSections} cols={3} />
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ paddingTop: 48, borderTop: "1px solid #e8e8e8", marginTop: 2 }}>
                <TechReviewSystemSection />
              </div>
            </FadeIn>
          </div>
          {/* Obsidian sub-section — sticky h3 */}
          <div id="tr-obsidian" style={{ marginTop: 64, paddingTop: 48, borderTop: "1px solid #e8e8e8" }}>
            <FadeIn delay={0.18}>
              <div style={{ position: "sticky", top: 0, zIndex: 5, background: "#ffffff", paddingTop: 16, paddingBottom: 12, borderBottom: "1px solid #e8e8e8", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 28, fontWeight: 700, color: "#111", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Obsidian</h3>
                <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                  AI 오케스트레이터가 아는 것을 내가 함께 볼 수 있게 만든 로컬 문서 시스템.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.18}>
              <ObsidianSystemSection />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 06 · Writing ── */}
      <section id="writing" className="p12-section" style={{ background: "#f7f7f5", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>05 · Writing</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 48 }}>Writing</h2>
          </FadeIn>
          <FadeIn>
            <div id="writing-1" className="p12-writing-item">
              <div className="p12-writing-header">
                <h3 className="p12-writing-title">시스템으로 생각하기</h3>
                <span className="p12-writing-meta">Essay · January 2026</span>
              </div>
              <p className="p12-writing-desc">
                생각을 구조화하는 방식, 그리고 Claude와 함께 글쓰는 방법에 대한 에세이입니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 07 · Contact ── */}
      <section id="contact" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>06 · Contact</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 48 }}>Let's talk.</h2>
            <a href="mailto:paulseongminpark@gmail.com" className="p12-contact-link" style={{ color: "#111111" }}>
              paulseongminpark@gmail.com
            </a>
            <a href="https://github.com/paulseongminpark" target="_blank" rel="noopener noreferrer" className="p12-contact-link" style={{ color: "#111111" }}>
              github.com/paulseongminpark
            </a>
          </FadeIn>
          <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid #e8e8e8" }}>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#aaa" }}>
              © 2026 박성민 · Paul Seongmin Park
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
