import "./portfolio.css";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type WorkKey } from "./content/work";
import { useWorkDetail } from "./hooks/useWorkDetail";
import { FadeIn } from "./components/FadeIn";
import { SectionLabel } from "./components/SectionLabel";
import { FeaturedCard, GridCard } from "./components/WorkCard";
import { WorkDetail } from "./components/WorkDetail";

// ── TOC ──────────────────────────────────────────────────────────
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

const ANTHROPIC = "#D4632D";

const P12_TOC: Array<{ id: string; label: string; mini: string; items: Array<{ id: string; label: string }> }> = [
  { id: "about",   label: "About",          mini: "AB", items: [] },
  { id: "why",     label: "Why I Build AI",  mini: "WH", items: [] },
  { id: "journey", label: "Journey",         mini: "JN", items: [] },
  { id: "work",    label: "Work",            mini: "WK", items: [
    { id: "work-mcp-memory",  label: "mcp-memory" },
    { id: "work-ce",          label: "Context Engineering" },
    { id: "work-tech-review", label: "Tech Review" },
    { id: "work-empty-house", label: "Empty House" },
    { id: "work-skin-diary",  label: "Skin Diary" },
    { id: "work-pmcc",        label: "PMCC" },
  ]},
  { id: "now",     label: "Now",     mini: "NW", items: [
    { id: "now-memory", label: "Memory" },
    { id: "now-flow",   label: "Flow" },
    { id: "now-loop",   label: "Loop" },
  ]},
  { id: "forward", label: "Forward", mini: "FW", items: [] },
  { id: "contact", label: "Contact", mini: "CT", items: [] },
];

// ── 데이터 ──────────────────────────────────────────────────────
const workItems = [
  { id: "work-empty-house", workKey: "empty-house" as WorkKey, label: "Empty House CPS", eyebrow: "June 2025", tag: "Data \u00b7 Policy", description: "\ube48\uc9d1 \ubb38\uc81c\ub97c \ub3c4\uc2dc \uc2dc\uc2a4\ud15c \ub2e8\uc704\ub85c \ubd84\uc11d. \uc778\uad6c\u00b7\uc0c1\uad8c\u00b7\uad50\ud1b5\u00b7\ub178\ud6c4 \ub370\uc774\ud130\ub97c \uc628\ud1a8\ub85c\uc9c0\ub85c \uc5f0\uacb0\ud574 4\uac1c \ud1b5\ud569\uc9c0\ud45c\ub85c \uac1c\uc785 \uc6b0\uc120\uc21c\uc704\ub97c \ud310\ub2e8\ud55c\ub2e4." },
  { id: "work-skin-diary", workKey: "skin-diary" as WorkKey, label: "Skin Diary AI", eyebrow: "August 2025", tag: "Data \u00b7 AI \u00b7 Mobile", description: "\ud53c\ubd80 \uc774\ubbf8\uc9c0\ub97c \ubd80\uc704\ubcc4\ub85c \ubd84\uc11d\ud558\uace0, \ub0a0\uc528\u00b7\ud658\uacbd \ub9e5\ub77d\uc744 \uacb0\ud569\ud574 \ud589\ub3d9\uc744 \uc81c\uc548\ud558\ub294 \uc571. \uc810\uc218\uac00 \uc544\ub2c8\ub77c '\uc9c0\uae08 \ubb34\uc5c7\uc744 \ud574\uc57c \ud558\ub294\uc9c0'\ub97c \uc54c\ub824\uc900\ub2e4." },
  { id: "work-pmcc", workKey: "pmcc" as WorkKey, label: "PMCC", eyebrow: "2023\u20132026", tag: "Community \u00b7 Design", description: "\ucc98\uc74c \ub9cc\ub09c \uc0ac\ub78c\ub4e4\uc774 \uc9c4\uc815\ud55c \ub300\ud654\ub97c \ub098\ub20c \uc218 \uc788\ub3c4\ub85d \ud658\uacbd\uc744 \uc124\uacc4\ud55c \ub7ec\ub2dd \ucee4\ubba4\ub2c8\ud2f0. \uacbd\uacc4\u00b7\ud750\ub984\u00b7\uc758\ub840\ub97c \uc9c1\uc811 \ub9cc\ub4e4\uace0 3\ub144\uac04 168\uba85\uacfc \uc6b4\uc601." },
];

function getWorkTitle(key: WorkKey) {
  if (key === "mcp-memory") return "mcp-memory";
  if (key === "empty-house") return "Empty House CPS";
  if (key === "skin-diary") return "Skin Diary AI";
  return "PMCC";
}

const WORK_KEY_SET = new Set<WorkKey>(["mcp-memory", "empty-house", "skin-diary", "pmcc"]);

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
        style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 13,
          fontWeight: isActive ? 600 : 400, color: isActive ? ANTHROPIC : "#4f4f4f",
          textDecoration: "none", padding: "6px 0", letterSpacing: "0.02em", transition: "color 0.15s", cursor: "pointer" }}>
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
                style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 11,
                  fontWeight: active ? 600 : 400, color: active ? ANTHROPIC : "#6f6f6f",
                  textDecoration: "none", padding: "4px 0 4px 12px", transition: "color 0.15s",
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
      className="p12-toc-sidebar"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
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
const NAV_LINKS = [
  { label: "About",          id: "about" },
  { label: "Why I Build AI", id: "why" },
  { label: "Journey",        id: "journey" },
  { label: "Work",           id: "work" },
  { label: "Now",            id: "now" },
  { label: "Forward",        id: "forward" },
  { label: "Contact",        id: "contact" },
];

function Nav({ onLogoClick, onNavClick, showLogo = true }: { onLogoClick?: () => void; onNavClick?: (id: string) => void; showLogo?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLinkClick = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onNavClick?.(id);
  };

  return (
    <nav className={`p12-nav${scrolled ? " scrolled" : ""}`} style={{ background: scrolled ? undefined : "#ffffff" }}>
      {showLogo && (
        <a href="#contact" className="p12-nav-logo"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            if (onLogoClick) { onLogoClick(); return; }
            scrollToId("contact");
            onNavClick?.("contact");
          }}>
          PSM
        </a>
      )}
      {/* 데스크톱 링크 */}
      <div className="p12-nav-links">
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} className="p12-nav-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick(l.id); }}>
            {l.label}
          </a>
        ))}
        <a href="mailto:paulseongminpark@gmail.com" className="p12-nav-cta">Contact &rarr;</a>
      </div>
      {/* 모바일 햄버거 버튼 */}
      <button
        className="p12-nav-hamburger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="메뉴"
      >
        <span className="p12-hamburger-bar" />
        <span className="p12-hamburger-bar" />
        <span className="p12-hamburger-bar" />
      </button>
      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="p12-nav-mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="p12-nav-mobile-link"
              onClick={(e) => { e.preventDefault(); handleLinkClick(l.id); }}>
              {l.label}
            </a>
          ))}
          <a href="mailto:paulseongminpark@gmail.com" className="p12-nav-mobile-cta">
            Contact &rarr;
          </a>
        </div>
      )}
    </nav>
  );
}

// ── Hero ─────────────────────────────────────────────────────────
function Hero() {
  const _b = import.meta.env.BASE_URL;
  return (
    <section id="hero" className="p12-hero" style={{ background: "#ffffff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 48 }}>
        <div style={{ flex: 1 }}>
          <motion.h1
            className="p12-h1"
            style={{ color: "#111111", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 700, marginBottom: 16 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Paul Seongmin Park
          </motion.h1>
          <motion.p
            className="p12-hero-sub"
            style={{ color: "#444444", fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 400 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            I design knowledge structures that make AI reason better.
          </motion.p>
        </div>
        <motion.div
          className="p12-hero-photo"
          style={{ marginRight: 186, marginTop: 38 }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={`${_b}profile.jpg`}
            alt="Paul Seongmin Park"
            style={{ width: 252, height: 252, objectFit: "cover", objectPosition: "center 10%", borderRadius: "50%", filter: "grayscale(0%)" }}
          />
        </motion.div>
      </div>
      <div className="p12-hero-scroll">
        <span>&darr;</span>
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ── Prose block helper ──────────────────────────────────────────
function ProseBlock({ paragraphs, firstBold = true }: { paragraphs: string[]; firstBold?: boolean }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{
          fontFamily: "'Inter','Noto Sans KR',sans-serif",
          fontSize: 15,
          fontWeight: i === 0 && firstBold ? 600 : 400,
          color: "#333",
          lineHeight: 1.85,
          marginBottom: i < paragraphs.length - 1 ? (i === 0 && firstBold ? 16 : 6) : 0,
        }}>
          {i === 0 && firstBold
            ? <span style={{ background: "rgba(249,115,22,0.18)", padding: "2px 6px", borderRadius: 3, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{p}</span>
            : p}
        </p>
      ))}
    </div>
  );
}

// ── Now subsection helper ───────────────────────────────────────
function NowSubsection({ id, label, text }: { id: string; label: string; text: string }) {
  return (
    <div id={id} style={{ marginBottom: 48 }}>
      <p style={{
        fontFamily: "'Inter',sans-serif", fontSize: 15, fontWeight: 600,
        color: "#333",
        marginBottom: 16,
      }}>
        <span style={{ background: "rgba(249,115,22,0.18)", padding: "2px 6px", borderRadius: 3 }}>{label}</span>
      </p>
      <p style={{
        fontFamily: "'Inter','Noto Sans KR',sans-serif",
        fontSize: 15, color: "#333", lineHeight: 1.85,
      }}>
        {text}
      </p>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export default function Page12() {
  const [activeWork, setActiveWork] = useState<WorkKey | null>(() => getWorkFromLocation());
  const { parsedWork, heroSubtitle } = useWorkDetail(activeWork);

  const [tocExpanded, setTocExpanded] = useState<Set<string>>(new Set(["work"]));
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
    "work-mcp-memory":  "mcp-memory",
    "work-empty-house": "empty-house",
    "work-skin-diary":  "skin-diary",
    "work-pmcc":        "pmcc",
  };

  const syncWorkHistory = useCallback(
    (work: WorkKey | null, mode: "push" | "replace", state: Record<string, unknown>) => {
      if (typeof window === "undefined") return;
      const nextUrl = getUrlWithWork(work);
      if (mode === "push") window.history.pushState(state, "", nextUrl);
      else window.history.replaceState(state, "", nextUrl);
    },
    [],
  );

  const openWorkDetail = useCallback((workKey: WorkKey) => {
    if (typeof window === "undefined") { setActiveWork(workKey); return; }
    if (activeWork === workKey) return;
    if (!activeWork) {
      syncWorkHistory(null, "replace", { ...(window.history.state ?? {}), view: "list", scrollY: window.scrollY });
    }
    syncWorkHistory(workKey, "push", { view: "detail", work: workKey });
    setActiveWork(workKey);
  }, [activeWork, syncWorkHistory]);

  const closeWorkDetail = useCallback((targetId?: string) => {
    if (typeof window !== "undefined") {
      syncWorkHistory(null, "replace", { ...(window.history.state ?? {}), view: "list", scrollY: window.scrollY });
    }
    setActiveWork(null);
    if (targetId) setTimeout(() => scrollToId(targetId), 100);
  }, [syncWorkHistory]);

  const handleWorkBack = useCallback(() => {
    if (typeof window === "undefined") { closeWorkDetail("work"); return; }
    if (window.history.length > 1) { window.history.back(); return; }
    closeWorkDetail("work");
  }, [closeWorkDetail]);

  const handleTocItemClick = useCallback((id: string) => {
    if (WORK_KEY_MAP[id]) openWorkDetail(WORK_KEY_MAP[id]);
    else scrollToId(id);
  }, [openWorkDetail]);

  const handleNavClick = useCallback((id: string) => {
    const group = P12_TOC.find((g) => g.id === id || g.items.some((item) => item.id === id));
    if (group) {
      setActiveGroup(group.id);
      setActiveItem(id);
      setTocExpanded((prev) => new Set([...prev, group.id]));
    }
  }, []);

  // scroll-based active section tracking
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
      if (P12_TOC.find(g => g.id === current.groupId)?.items.length) {
        setTocExpanded(prev => prev.has(current.groupId) ? prev : new Set([...prev, current.groupId]));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeWork]);

  // scroll to top on work detail open
  useEffect(() => {
    if (!activeWork) return;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeWork]);

  // popstate for browser back/forward
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

  // font loading
  useEffect(() => {
    const id = "portfolio-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id; link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@400;500;700&display=swap";
      document.head.appendChild(link);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  // ── Work Detail view ──
  if (activeWork) {
    return (
      <div className="p12-root" style={{ background: "#ffffff", minHeight: "100vh" }}>
        <Nav onLogoClick={() => closeWorkDetail("contact")} />
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

  // ── Main page ──
  return (
    <div className="p12-root" style={{ background: "#ffffff" }}>
      <P12TocSidebar
        expandedGroups={tocExpanded}
        onToggleGroup={toggleTocGroup}
        activeGroup={activeGroup}
        activeItem={activeItem}
        onItemClick={handleTocItemClick}
      />
      <div className="p12-main-content">
      <Nav onNavClick={handleNavClick} />

      {/* ── Hero ── */}
      <Hero />

      {/* ── 01 · About ── */}
      <section id="about" className="p12-section" style={{ background: "#ffffff" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>01 · About</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <ProseBlock paragraphs={[
              "\ubbf8\ud559\uacfc \uac74\ucd95\uc744 \uacf5\ubd80\ud55c \uc0ac\ub78c\uc774 AI \uc2dc\uc2a4\ud15c\uc744 \uc124\uacc4\ud558\uac8c \ub410\ub2e4. \uc0dd\uac01\ubcf4\ub2e4 \ub9ce\uc740 \uac83\uc774 \uc774\uc5b4\uc838 \uc788\uc5c8\ub2e4.",
              "\uac70\uae30\uc11c \uc775\ud78c \uac74 \uae30\uc220\uc774 \uc544\ub2c8\ub77c \uac10\uac01\uc774\uc5c8\ub2e4 \u2014 \ud558\ub098\uc758 \uacb0\uacfc\ub97c \ud558\ub098\uc758 \uc6d0\uc778\uc73c\ub85c \uc124\uba85\ud558\ub294 \ubc29\uc2dd\ubcf4\ub2e4, \uc11c\ub85c \ub2e4\ub978 \uce35\uc704\uac00 \ub9cc\ub098\uba74\uc11c \ubb34\uc5c7\uc774 \ub9cc\ub4e4\uc5b4\uc9c0\ub294\uc9c0\ub97c \ub354 \uc624\ub798 \ubc14\ub77c\ubcf4\ub294 \uac10\uac01. \uc77c\uc5d0\uc11c\ub3c4, \uad00\uacc4\uc5d0\uc11c\ub3c4, \uc0b6 \uc790\uccb4\uc5d0\uc11c\ub3c4, \uadf8\ub807\uac8c \uc0ac\uace0\ud55c\ub2e4.",
              "\uc0b4\uc544\uc624\uba74\uc11c \uc54c\uac8c \ub41c \uc0ac\uc2e4\uc740, \uc0ac\ub78c\uc740 \uc758\uc9c0\uac00 \uc544\ub2c8\ub77c \uc870\uac74\uc5d0 \uc758\ud574 \uc6c0\uc9c1\uc778\ub2e4\ub294 \uac83\uc774\uc5c8\ub2e4. \uc88b\uc740 \uc758\ub3c4\ub9cc\uc73c\ub85c \uc88b\uc740 \uacb0\uacfc\uac00 \ub098\uc624\uc9c0 \uc54a\uc558\ub2e4. \uc758\ub3c4\ubcf4\ub2e4 \ud658\uacbd\uc744, \ub178\ub825\ubcf4\ub2e4 \uad6c\uc870\ub97c \ubc14\uafb8\ub294 \ucabd\uc774 \uc77c\uad00\ub418\uac8c \ud6a8\uacfc\uac00 \uc788\uc5c8\ub2e4. \ub0b4\uac00 \uc0ac\uace0\ud558\ub294 \ubc29\uc2dd\uc5d0\ub3c4 \uac19\uc740 \ubb38\uc81c\uac00 \uc788\uc5c8\ub2e4 \u2014 \uc5f0\uacb0\uc740 \ub9ce\uc774 \ubcf4\uc774\ub294\ub370, \uadf8\uac78 \uc720\uc9c0\ud560 \uc218 \uc788\ub294 \ud658\uacbd\uc774 \uc5c6\uc5c8\ub2e4.",
              "\uc9c0\uae08\uc740 AI \uc6b4\uc601 \uc2dc\uc2a4\ud15c\uc73c\ub85c \uadf8 \ud658\uacbd\uc744 \ub9cc\ub4e4\uace0 \uc788\ub2e4.",
            ]} />
          </FadeIn>
        </div>
      </section>

      {/* ── 02 · Why I Build AI ── */}
      <section id="why" className="p12-section" style={{ background: "#ffffff" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>02 · Why I Build AI</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <ProseBlock paragraphs={[
              "\uc0dd\uac01\ud558\ub294 \ub370 \uc5d0\ub108\uc9c0\ub97c \uc4f0\ub294 \uac8c \uc544\ub2c8\ub77c, \uc774\ubbf8 \uc0dd\uac01\ud588\ub358 \uac83\uc744 \ubcf5\uc6d0\ud558\ub294 \ub370 \uc5d0\ub108\uc9c0\ub97c \uc4f0\uace0 \uc788\uc5c8\ub2e4.",
              "\uc798 \uc0dd\uac01\ud558\uace0, \uae4a\uac8c \ub4e4\uc5b4\uac00\uace0, \uc88b\uc740 \uacb0\uc815\uc744 \ub0b4\ub9b0\ub2e4. \uadf8\ub7f0\ub370 \uba70\uce60 \ub4a4 \uac19\uc740 \ubb38\uc81c \uc55e\uc5d0 \uc11c\uba74 \ub9e5\ub77d\uc740 \uc0ac\ub77c\uc9c0\uace0 \uacb0\uacfc\ub9cc \ud76c\ubbf8\ud558\uac8c \ub0a8\uc544 \uc788\uc5c8\ub2e4. \uc65c \uadf8\ub7f0 \uacb0\uc815\uc744 \ud588\ub294\uc9c0, \ubb34\uc5c7\uc744 \ubcf4\ub958\ud588\ub294\uc9c0, \uc5b4\ub514\uc5d0\uc11c \ub9c9\ud600\ub294\uc9c0 \u2014 \uc804\ubd80 \ub2e4\uc2dc \ubcf5\uad6c\ud574\uc57c \ud588\ub2e4.",
              "\ub098\ub294 \uc758\uc9c0\uac00 \uc57d\ud574\uc11c \ubc18\ubcf5\uc744 \uc2eb\uc5b4\ud55c \uac8c \uc544\ub2c8\ub2e4. \ubc18\ubcf5\uc744 \ubc84\ud2f0\ub294 \ubc29\uc2dd\uc774 \ub108\ubb34 \ube44\ud6a8\uc728\uc801\uc774\ub77c\ub294 \uac78 \uacac\ub514\uae30 \uc5b4\ub824\uc6e0\ub2e4.",
              "\ud310\ub2e8\uc740 \ub0b4\uac00 \ub0b4\ub9ac\ub418, \ub9e5\ub77d\uc740 \ub0a8\uac8c \ud558\uace0 \uc2f6\uc5c8\ub2e4.",
            ]} />
          </FadeIn>
        </div>
      </section>

      {/* ── 03 · Journey ── */}
      <section id="journey" className="p12-section" style={{ background: "#ffffff" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>03 · Journey</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <ProseBlock paragraphs={[
              "\ud558\ub098\uc758 CLI\uc5d0\uc11c \uc2dc\uc791\ub410\ub2e4.",
              "Claude Code\ub97c \ucc98\uc74c \ub9cc\ub0ac\uc744 \ub54c, \uba38\ub9bf\uc18d\uc5d0\uc11c \ub5a0\uc624\ub974\ub294 \uc544\uc774\ub514\uc5b4\ub4e4\uc744 \uc989\uac01 \uad6c\ud604\ud560 \uc218 \uc788\uaca0\ub2e4\ub294 \uc0dd\uac01\uc774 \ub4e4\uc5c8\ub2e4. \ud074\ub85c\ub4dc\ub294 \ub098\uc5d0\uac8c \ub2e4\uc591\ud55c \ud504\ub808\uc784\uc6cc\ud06c\ub4e4\uc744 \uc81c\uc2dc\ud588\uace0, \ub098\ub294 \uc2e0\uc774 \ub098\uc11c \ud3c9\uc18c\uc5d0 \uad00\uc2ec \uc788\ub358 \uc544\uc774\ub514\uc5b4\ub4e4\uc744 \ub9c8\uad6c \uc2e4\ud5d8\ud574\ubcf4\uc558\ub2e4. \uba38\ub9bf\uc18d\uc5d0\uc11c\ub9cc \ubc18\ubcf5\uc801\uc73c\ub85c \ud30c\uace0\ub4e4\ub358 \uc0ac\uace0\ub97c \ud558\ub098\uc529 \ud074\ub85c\ub4dc\ud55c\ud14c \uc8fc\uc785\ud558\uae30 \uc2dc\uc791\ud588\ub2e4. \uadf8\ub7ec\uba74\uc11c \ud074\ub85c\ub4dc\ub97c \ub354 \uc798 \uc4f0\uace0 \uc2f6\ub2e4\ub294 \uc0dd\uac01\uc774 \ub4e4\uc5c8\uace0, \ud074\ub85c\ub4dc \uc790\uccb4\ub97c \uc798 \uc4f0\uae30 \uc704\ud55c \ubc29\ubc95\uc744 \uc5f0\uad6c\ud588\ub2e4. \uc5ec\ub7ec \ub3c4\uad6c\ub97c \uc9c1\uc811 \ucee4\uc2a4\ud130\ub9c8\uc774\uc9d5\ud588\ub2e4. orchestrator, synthesizer, compressor \u2014 \uc870\uc728\ud558\uace0, \ud310\ub2e8\ud558\uace0, \uae30\uc5b5\uc744 \uc815\ub9ac\ud558\ub294 \uc77c\uc744 \ub118\uacbc\ub2e4. \ube60\ub728\ub9ac\ub294 \uac8c \ub450\ub824\uc6cc\uc11c \ubcf4\uc774\ub294 \uc871\uc871 \ub9cc\ub4e4\uc5c8\ub2e4. 7\uc77c \ub9cc\uc5d0 3\uac1c\uac00 24\uac1c\uac00 \ub410\ub2e4.",
              "AI\uac00 \ud55c \ubc88\uc5d0 \ubcfc \uc218 \uc788\ub294 \uacf5\uac04\uc740 \ud55c\uc815\ub3fc \uc788\uc5c8\ub2e4. \ub9cc\ub4e0 \uac83\ub4e4\uc758 \uc815\uc758\ub9cc\uc73c\ub85c \uadf8 \uacf5\uac04\uc758 \uc808\ubc18\uc774 \ucc3c\ub2e4. \ub9cc\ub4e4\uc218\ub85d \uc0dd\uac01\ud560 \uacf5\uac04\uc774 \uc904\uace0 \uc788\uc5c8\ub294\ub370, \ub9cc\ub4dc\ub294 \ub3d9\uc548\uc5d0\ub294 \uadf8\uac78 \ubcf4\uc9c0 \ubabb\ud588\ub2e4. \uba48\ucd94\uace0 \uc77d\uae30 \uc2dc\uc791\ud588\ub2e4. \uacb9\uce58\ub294 \uac83\uc774 \ubcf4\uc600\ub2e4. 24\uac1c\ub294 15\uac1c\ub85c, 15\uac1c\ub294 3\uac1c\ub85c \uc904\uc5c8\ub2e4. \uc4f0\uc774\uc9c0 \uc54a\ub294 \uac83\uc740 \ubc84\ub838\ub2e4. \uae30\uc900\uc740 \ub2e8\uc21c\ud588\ub2e4 \u2014 \ud3ec\uc2a4\ud2b8\uc787 \ud55c \uc7a5\uc5d0 \uc804\uccb4\uac00 \uc548 \ub4e4\uc5b4\uac00\uba74 \uc544\uc9c1 \uc774\ud574\ud55c \uac8c \uc544\ub2c8\ub2e4. \uadf8 \uacfc\uc815\uc5d0\uc11c \uc0ac\uace0\ub3c4 \uacaa\uc5c8\ub2e4. \uc774\uac74 \ub3c4\uad6c \ubaa8\uc74c\uc774 \uc544\ub2c8\ub77c, \ud558\ub098\uc758 \uad6c\uc870\ub85c \uc774\ud574\ud560 \uc218 \uc788\uc5b4\uc57c \ud55c\ub2e4\ub294 \uac78 \uc54c\uc558\ub2e4.",
              "\uc798 \ub3cc\uc544\uac00\ub294 \uac83\uacfc, \uc790\uae30 \uc0c1\ud0dc\ub97c \uc544\ub294 \uac83\uc740 \ub2e4\ub978 \ubb38\uc81c\uc600\ub2e4. \uc2dc\uc2a4\ud15c\uc774 \uc2a4\uc2a4\ub85c \uc0c1\ud0dc\ub97c \uce21\uc815\ud558\uae30 \uc2dc\uc791\ud588\uace0, \ubb38\uc81c\ub97c \ubc1c\uacac\ud558\uace0, \uc81c\uc548\ud558\uace0, \uc2b9\uc778\ub41c \uac83\ub9cc \ubc14\ub00c\uc5c8\ub2e4. \uc78a\uc5b4\ub3c4 \ub2e4\uc2dc \uc7a1\ud614\ub2e4. \uadf8\ub54c \ucc98\uc74c \uc774\uac78 \uc0b4\uc544 \uc788\ub2e4\uace0 \ub290\uaf08\ub2e4. \uacb0\uc815\uc744 \ub300\uc2e0\ud574\uc11c\uac00 \uc544\ub2c8\ub2e4. \ub0b4\uac00 \ub193\uce60 \uac83\uc744 \uba3c\uc800 \ub4dc\ub7ec\ub0b4\uae30 \uc2dc\uc791\ud588\uae30 \ub54c\ubb38\uc774\ub2e4.",
            ]} />
          </FadeIn>
        </div>
      </section>

      {/* ── 04 · Work ── */}
      <section id="work" className="p12-section" style={{ background: "#ffffff", paddingTop: 56 }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>04 · Work</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginBottom: 48, marginTop: 8 }}>Selected Work</h2>
          </FadeIn>

          {/* 시스템 프로젝트 — 카드 */}
          <FadeIn delay={0.08}>
            <div className="p12-work-grid" style={{ marginBottom: 48 }}>
              {[
                { id: "work-mcp-memory", label: "mcp-memory", tag: "AI · Memory", description: "AI가 맥락을 추론하도록 지식의 구조를 설계한 실험. 25개 타입, 4,685개 노드의 온톨로지 기반 외부 기억 시스템.", clickable: true },
                { id: "work-ce", label: "Context Engineering", tag: "AI \u00b7 System", description: "AI\uc758 \ucd94\ub860 \ud488\uc9c8\uc744 \uadf9\ub300\ud654\ud558\uae30 \uc704\ud55c \ub9e5\ub77d \ud050\ub808\uc774\uc158 \uccb4\uacc4. \ubb34\uc5c7\uc744 \ub123\uace0, \uc5b4\ub5a4 \uc21c\uc11c\ub85c \ubcf4\uc5ec\uc8fc\uace0, \uc5b8\uc81c \ub35c\uc5b4\ub0bc\uc9c0\ub97c 4\uac1c \ub808\uc774\uc5b4\ub85c \uc124\uacc4\ud55c\ub2e4. \uc2dc\uc2a4\ud15c\uc774 \uc544\ub2c8\ub77c \uc6d0\uce59\uc774\ub2e4.", clickable: false },
                { id: "work-tech-review", label: "Tech Review", tag: "AI \u00b7 Automation", description: "\uae30\uc220 \uae30\uc0ac\u00b7\ud2b8\uc717\u00b7\uc601\uc0c1\uc5d0\uc11c \uc778\uc0ac\uc774\ud2b8\ub97c \uc790\ub3d9 \uc218\uc9d1\ud558\uace0 \uc7ac\uc791\uc131\ud574 \ub9e4\uc77c \ubc1c\ud589\ud558\ub294 \ud30c\uc774\ud504\ub77c\uc778. 3\uac1c \uc18c\uc2a4, 100\uac74 \uc774\uc0c1 \ubc1c\ud589.", clickable: false },
              ].map((item) => {
                const isCe = item.id === "work-ce";
                const isMcp = item.id === "work-mcp-memory";
                const isTr = item.id === "work-tech-review";
                const hasGradient = isCe || isMcp || isTr;
                const mcpGradient = "radial-gradient(ellipse at 25% 30%, rgba(59,130,246,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(96,165,250,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(37,99,195,0.5) 0%, transparent 55%), linear-gradient(150deg, #1e3a6f 0%, #2d5a9a 40%, #4a8ad4 100%)";
                const trGradient = "radial-gradient(ellipse at 25% 30%, rgba(107,92,231,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(232,164,184,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(139,122,207,0.5) 0%, transparent 55%), linear-gradient(150deg, #3b2e6e 0%, #7a65a5 40%, #d4a4ba 100%)";
                const ceGradient = "radial-gradient(ellipse at 25% 30%, rgba(232,140,60,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(212,99,45,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(196,120,60,0.5) 0%, transparent 55%), linear-gradient(150deg, #8b3a0f 0%, #c4703a 40%, #e8a050 100%)";
                return (
                <div key={item.id} id={item.id}
                  onClick={item.clickable ? () => openWorkDetail(WORK_KEY_MAP[item.id]) : undefined}
                  style={{
                    background: isMcp ? mcpGradient : isCe ? ceGradient : isTr ? trGradient : "#fafaf9",
                    border: hasGradient ? "none" : "1px solid #e8e8e8", borderRadius: 8,
                    padding: "28px 24px", cursor: item.clickable ? "pointer" : "default",
                    transition: item.clickable ? "border-color 0.2s, box-shadow 0.2s" : "none",
                  }}
                  onMouseEnter={item.clickable ? (e) => { e.currentTarget.style.borderColor = "#ccc"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; } : undefined}
                  onMouseLeave={item.clickable ? (e) => { e.currentTarget.style.borderColor = "#e8e8e8"; e.currentTarget.style.boxShadow = "none"; } : undefined}
                >
                  <h3 style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 18, fontWeight: 700, color: hasGradient ? "#fff" : "#111", marginBottom: 4 }}>
                    {item.label}
                  </h3>
                  <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: hasGradient ? "rgba(255,255,255,0.7)" : ANTHROPIC, marginBottom: 12 }}>
                    {item.tag}
                  </p>
                  <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: hasGradient ? "rgba(255,255,255,0.8)" : "#555", lineHeight: 1.7 }}>
                    {item.description}
                  </p>
                  {item.clickable && (
                    <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#999", marginTop: 12, transition: "color 0.15s" }}>
                      자세히 보기 →
                    </p>
                  )}
                </div>
                );
              })}
            </div>
          </FadeIn>

          {/* 기존 프로젝트 — 클릭 가능, detail page */}
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

      {/* ── 05 · Now ── */}
      <section id="now" className="p12-section" style={{ background: "#ffffff", paddingTop: 56 }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>05 · Now</SectionLabel>
            {/* h2 removed — section label is enough */}
          </FadeIn>
          <FadeIn delay={0.05}>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <NowSubsection
                id="now-memory"
                label="Memory"
                text={"세션에서 나온 판단, 실패, 질문이 노드로 저장된다. 다음 세션에서 관련 키워드를 검색하면, 4개 채널이 동시에 뒤져서 가장 관련 높은 기억을 점수순으로 꺼내온다. 자주 쓰이는 기억은 점수가 올라가고, 안 쓰이는 기억은 서서히 흐려진다. 관찰은 빠르게 흐려지고, 원칙은 오래 남는다 — 뇌가 하는 일을 모사한 것이다. 지금 4,685개의 노드가 하나도 끊기지 않고 연결돼 있다."}
              />
              <NowSubsection
                id="now-flow"
                label="Flow"
                text={"\uc138\uc158\uc774 \uc2dc\uc791\ub418\uba74 \uc5b4\uc81c\uc758 \uacb0\uc815, \ubbf8\ud574\uacb0 \uc9c8\ubb38, \ubbf8\ucee4\ubc0b \ubcc0\uacbd\uc0ac\ud56d\uc774 \uc790\ub3d9\uc73c\ub85c \uc62c\ub77c\uc628\ub2e4. \uc791\uc5c5\uc774 \uc2dc\uc791\ub418\uba74 \uad00\ub828 \ud30c\uc77c\ub9cc \ub2e8\uacc4\uc801\uc73c\ub85c \uc77d\ub294\ub2e4 \u2014 \uc804\uccb4\ub97c \ud55c \ubc88\uc5d0 \uc77d\uc9c0 \uc54a\ub294\ub2e4. \ud30c\uc77c\uc774 \ubc14\ub00c\uba74 \ubb38\uc11c\uac00 \ud568\uaed8 \uac31\uc2e0\ub3fc\uc57c \ud55c\ub2e4 \u2014 \ube60\ub728\ub9ac\uba74 hook\uc774 \ucee4\ubc0b\uc744 \ub9c9\ub294\ub2e4. \ub05d\ub098\uba74 \uadf8\ub0a0\uc758 \ud310\ub2e8\uacfc \uc9c8\ubb38\uc774 \uae30\uc5b5\uc5d0 \uc800\uc7a5\ub41c\ub2e4. \uadf8\uac8c \ub2e4\uc74c \ub0a0\uc758 \uc2dc\uc791\uc810\uc774 \ub41c\ub2e4 \u2014 \ub05d\uc774 \uc2dc\uc791\uc744 \ub9cc\ub4dc\ub294 \uad6c\uc870\ub2e4."}
              />
              <NowSubsection
                id="now-loop"
                label="Loop"
                text={"\uc2dc\uc2a4\ud15c\uc740 \uc790\uae30 \uc0c1\ud0dc\ub97c \uc22b\uc790\ub85c \uc548\ub2e4. 14\uac1c \ud56d\ubaa9\uc744 \uac80\uc0ac\ud55c\ub2e4 \u2014 \ub04a\uae34 \uc5f0\uacb0, \uc624\ub798\ub41c \ubb38\uc11c, \ubbf8\ubc18\uc601 \uacb0\uc815, \uace0\uc544 \ub178\ub4dc, \ud14c\uc2a4\ud2b8 \ud1b5\uacfc\uc728. \uacb0\uacfc\ub294 \uc810\uc218\ub85c \ub098\uc628\ub2e4. \ubb38\uc81c\uac00 \ubc1c\uacac\ub418\uba74 \ub2e4\uc74c \uc138\uc158 \uc2dc\uc791 \uc2dc \ubcf4\uc778\ub2e4. \uace0\uce58\uba74 \uc810\uc218\uac00 \uc624\ub978\ub2e4. \uc78a\uc5b4\ub3c4 \ub2e4\uc74c \uce21\uc815\uc5d0\uc11c \ub2e4\uc2dc \uc7a1\ud78c\ub2e4."}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 06 · Forward ── */}
      <section id="forward" className="p12-section" style={{ background: "#ffffff", paddingTop: 56 }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>06 · Forward</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.05}>
            <ProseBlock paragraphs={[
              "도구는 바뀌기 마련이다.",
              "\uadf8\ub798\uc11c \ub0b4\uac00 \uc9c0\uc18d\uc801\uc73c\ub85c \uc124\uacc4\ud558\ub294 \uac83\uc740 \ub3c4\uad6c\uac00 \uc544\ub2c8\ub77c \uc6b4\uc601 \uc2dc\uc2a4\ud15c\uc774\ub2e4. \uacb0\uc815, \uc2e4\ud328, \uc9c8\ubb38\uc774 \uc0ac\ub77c\uc9c0\uc9c0 \uc54a\uace0 \uc313\uc778\ub2e4. \uc313\uc778 \uac83\uc744 \uae30\ubc18\uc73c\ub85c, \uc2dc\uc2a4\ud15c\uc740 \uc790\uae30 \uc0c1\ud0dc\ub97c \uce21\uc815\ud558\uace0, \ubb38\uc81c\ub97c \ucc3e\uace0, \ub354 \ub098\uc740 \ubc29\ud5a5\uc744 \uc81c\uc548\ud55c\ub2e4.",
              "내 관심은 Living System에 있다. 사람이 잊어도 시스템이 기억하고, 놓친 것을 먼저 드러내고, 스스로 나아진다. 같은 구조가 조직의 의사결정 기억이 될 수 있다고 생각한다. 시스템이 복원을 맡으면, 나는 사고에 에너지를 쓸 수 있다.",
            ]} />
          </FadeIn>
        </div>
      </section>

      {/* ── 07 · Contact ── */}
      <section id="contact" className="p12-section" style={{ background: "#ffffff" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>07 · Contact</SectionLabel>
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
              &copy; 2026 박성민 &middot; Paul Seongmin Park
            </p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
