import "./portfolio.css";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type WorkKey } from "./content/work";
import { useWorkDetail } from "./hooks/useWorkDetail";
import { FadeIn } from "./components/FadeIn";
import { SectionLabel } from "./components/SectionLabel";
import { FeaturedCard, GridCard } from "./components/WorkCard";
import { WorkDetail } from "./components/WorkDetail";
import { TechReviewMultiSource } from "./components/TechReviewMultiSource";
import { AiWorkflowSection } from "./components/AiWorkflowSection";
import { TechReviewSystemSection } from "./components/TechReviewSystemSection";
import { OntologySection } from "./components/OntologySection_claude";
import homeRaw from "./content/HOME_INTRO_TO_RELATION_KO.md?raw";
import aiRaw from "./content/AI_WORKFLOW_KO.md?raw";
import trRaw from "./content/TR_SYSTEM_KO.md?raw";

// ── 파싱 유틸 ───────────────────────────────────────────────────
function extractBold(raw: string, marker: string): string {
  const m = raw.match(new RegExp(`${marker}[\\s\\S]*?\\*\\*([\\s\\S]*?)\\*\\*`, "i"));
  return m ? m[1].trim() : "";
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

const P12_TOC: Array<{ id: string; label: string; mini: string; items: Array<{ id: string; label: string }> }> = [
  { id: "about",       label: "About",        mini: "AB", items: [
    { id: "about-intro",      label: "Intro" },
    { id: "about-background", label: "Background" },
    { id: "about-direction",  label: "Direction" },
  ]},
  { id: "how-i-think", label: "How I Think",  mini: "HT", items: [
    { id: "system-connection", label: "Connection" },
    { id: "system-currency",   label: "Context as Currency" },
    { id: "system-structure",  label: "Memory by Design" },
    { id: "system-governance", label: "Governance" },
  ]},
  { id: "how-i-build", label: "How I Build",  mini: "HB", items: [
    { id: "ai",             label: "How I AI" },
    { id: "build-ontology", label: "Ontology" },
    { id: "build-obsidian", label: "Obsidian" },
  ]},
  { id: "work",        label: "Work",          mini: "WK", items: [
    { id: "work-empty-house", label: "Empty House" },
    { id: "work-skin-diary",  label: "Skin Diary" },
    { id: "work-pmcc",        label: "PMCC" },
  ]},
  { id: "writing",     label: "Writing",       mini: "WR", items: [
    { id: "tr-tech-review",   label: "Tech Review" },
    { id: "writing-1",        label: "Essay" },
  ]},
  { id: "contact",     label: "Contact",       mini: "CT", items: [] },
];

// ── 데이터 ──────────────────────────────────────────────────────
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
  {
    id: "system-connection",
    label: "Connection",
    body: "무언가를 배울 때, 항목으로 기억하는 것보다 어디서 왜 나왔는지가 더 오래 남았다. 하나의 사건에도 여러 각도가 보인다 — 배경, 결정, 실패, 통찰. 이것들이 따로 저장되면 흩어진다. 아이디어 하나가 생기면, 어디서 왔는지, 무엇과 연결되는지를 먼저 본다. 이 습관을 시스템으로 옮겼다. 26개 노드 타입, 33개 관계 타입 — 무슨 일이 있었고, 어떤 판단을 했으며, 어디서 틀렸는지를 연결로 쌓는다. 기억이 아니라 사고 구조의 외부화다.",
  },
  {
    id: "system-currency",
    label: "Context as Currency",
    body: "대화를 시작할 때마다 같은 맥락을 처음부터 설명해야 한다면, 생각이 아니라 기억에 에너지를 쓰게 된다. 그 낭비를 없애기 위해 맥락 자체를 구조화했다. 필요한 순간에 정확히 필요한 것만 꺼낸다 — 세션 시작 비용을 88% 줄였다.",
  },
  {
    id: "system-structure",
    label: "Memory by Design",
    body: "세션이 끊기면 기억도 끊길 수 있다는 걸 안다. 그래서 기억력에 기대지 않기로 했다. 자동 Hook부터 수동 체크포인트까지 4단계 안전망을 만들었다. 의지가 아니라 구조가 기억한다.",
  },
  {
    id: "system-governance",
    label: "Governance",
    body: "시스템을 만들었다고 끝이 아니다. 새 도구가 나오고, 더 나은 방식이 생기고, 기존 구조가 낡아진다. 중요한 건 무엇을 쓰느냐보다 어떻게 통제할 것인가 — 그래서 거버넌스가 먼저다. 시스템은 만드는 것, 거버넌스는 운영하는 것이다.",
  },
];

// ── System Accordion ─────────────────────────────────────────────
function SystemAccordion({ items }: { items: typeof SYSTEM_ITEMS }) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setTimeout(() => window.dispatchEvent(new Event("scroll")), 10);
  };
  return (
    <div style={{ border: "1px solid #e8e8e8" }}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div key={item.id} id={item.id} style={{ borderBottom: "1px solid #e8e8e8" }}>
            <button
              onClick={() => toggle(item.id)}
              style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "24px 32px", background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase", color: isOpen ? ANTHROPIC : "#666",
                transition: "color 0.2s ease",
                textAlign: "left",
              }}
            >
              <span>{item.label}</span>
              <span style={{
                fontSize: 18, color: "#aaa", lineHeight: 1,
                transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p style={{
                    fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14,
                    color: "#555", lineHeight: 1.8, margin: 0,
                    padding: "0 32px 28px",
                  }}>
                    {renderBoldPlain(item.body)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ── 공통 섹션 흐름 카드 그리드 ──
interface SectionGrid {
  sections: { heading: string; items: string[] }[];
  cols?: 2 | 3;
  disableHighlight?: boolean;
  headingColor?: string;
  cardColors?: string[];
}

function SectionFlowGrid({ sections, cols = 3, disableHighlight = false, headingColor, cardColors }: SectionGrid) {
  const colStyle = cols === 2 ? "1fr 1fr" : "1fr 1fr 1fr";
  const stripHeight = 30;

  return (
    <div className="p12-section-flow-grid" style={{ display: "grid", gridTemplateColumns: colStyle, gap: 2, alignItems: "stretch" }}>
      {sections.map((sec, i) => (
        <FadeIn key={i} delay={i * 0.06} style={{ display: "flex" }}>
          <div style={{
            position: "relative",
            padding: "36px 32px",
            background: "#f7f7f5",
            border: "1px solid #e4e0da",
            marginRight: -1, marginBottom: -1,
            flex: 1,
          }}>
            {/* 상단 컬러 배경 (텍스트 뒤) */}
            {cardColors?.[i] && (
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: stripHeight,
                background: cardColors[i],
                zIndex: 0,
              }} />
            )}
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600,
                letterSpacing: "0.14em", textTransform: "uppercase",
                marginBottom: 16,
              }}>
                {disableHighlight ? (
                  <span style={{ color: headingColor ?? "#666" }}>{sec.heading}</span>
                ) : (
                  <mark style={{ background: "rgba(37, 99, 235, 0.14)", color: "#1d4ed8", borderRadius: 2, padding: "2px 6px" }}>
                    {sec.heading}
                  </mark>
                )}
              </p>
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
  { label: "About",       id: "about" },
  { label: "How I Think", id: "how-i-think" },
  { label: "How I Build", id: "how-i-build" },
  { label: "Work",        id: "work" },
  { label: "Writing",     id: "writing" },
  { label: "Contact",     id: "contact" },
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
        <a href="mailto:paulseongminpark@gmail.com" className="p12-nav-cta">Contact →</a>
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
            Contact →
          </a>
        </div>
      )}
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

  const [tocExpanded, setTocExpanded] = useState<Set<string>>(new Set(["about", "how-i-think", "how-i-build", "work", "writing"]));
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

      {/* ── 02 · How I Think ── */}
      <section id="how-i-think" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>02 · How I Think</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 8 }}>
              How I Work
            </h2>
            <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
              그리고 왜 이 방식인가.
            </p>
          </FadeIn>
          <SystemAccordion items={SYSTEM_ITEMS} />
        </div>
      </section>

      {/* ── 03 · How I Build ── */}
      <section id="how-i-build" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>03 · How I Build</SectionLabel>
          </FadeIn>
        </div>
        {/* HOW I AI */}
        <FadeIn delay={0.1}>
          <div id="ai">
            <AiWorkflowSection raw={aiRaw} />
          </div>
        </FadeIn>

        {/* Ontology */}
        <div id="build-ontology" style={{ borderTop: "1px solid #e8e8e8", marginTop: 80 }}>
          <OntologySection />
        </div>

        {/* Obsidian 한 단락 */}
        <div id="build-obsidian" style={{ borderTop: "1px solid #e8e8e8", padding: "80px 0" }}>
          <div className="p12-container">
            <FadeIn>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 16 }}>
                Obsidian
              </p>
              <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: "#aaa", lineHeight: 1.8, maxWidth: 560 }}>
                준비 중 — 시각화 레이어 + Living Docs 소통창구
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 04 · Work ── */}
      <section id="work" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>04 · Work</SectionLabel>
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

      {/* ── 05 · Writing ── */}
      <section id="writing" className="p12-section" style={{ background: "#ffffff", borderTop: "1px solid #e8e8e8" }}>
        <div className="p12-container">
          <FadeIn>
            <SectionLabel>05 · Writing</SectionLabel>
            <h2 className="p12-h2" style={{ color: "#111", marginTop: 8, marginBottom: 48 }}>Writing</h2>
          </FadeIn>

          {/* Tech Review */}
          <div id="tr-tech-review" style={{ marginBottom: 80 }}>

            {/* 헤더 */}
            <FadeIn delay={0.05}>
              <div style={{ paddingBottom: 12, borderBottom: "1px solid #e4e0da", marginBottom: 40 }}>
                <h3 style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 24, fontWeight: 700, color: "#111", margin: "0 0 6px", letterSpacing: "-0.01em" }}>Tech Review</h3>
                <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
                  AI 세계의 인사이트를 기사·트윗·영상에서 수집하고, 구조화·배포하는 자동 파이프라인.
                </p>
              </div>
            </FadeIn>

            {/* [1] The Problem */}
            <FadeIn delay={0.06}>
              <div style={{ borderLeft: "3px solid #D4632D", paddingLeft: 20, marginBottom: 56 }}>
                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.55px", marginBottom: 12 }}>
                  The Problem
                </p>
                <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, color: "#333", lineHeight: 1.8, margin: 0 }}>
                  AI 세계의 인사이트는 기사·트윗·영상 곳곳에 흩어져 있다. 읽어도 남지 않고, 연결되지 않는다. input의 양은 많은데, 어디에 어떻게 적용해야 할지가 문제였다.
                </p>
                <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, color: "#333", lineHeight: 1.8, margin: 0 }}>
                  소스들을 한 곳으로 수렴하고, 정리와 분배는 AI가 하도록. 이미 구축해둔 맥락과 외부 메모리에 새로운 정보가 들어올 때마다 적재적소에 녹아들도록. AI는 내 시스템 전체 스택을 알고 있다. 새로운 정보가 들어올 때, 그게 내 작업의 어떤 scope에 어떤 맥락으로 적용되면 좋을지 — 나보다 더 세밀한 단위로 파악할 수 있다.
                </p>
              </div>
            </FadeIn>

            {/* [2] 3소스 파이프라인 */}
            <FadeIn delay={0.08}>
              <SectionFlowGrid sections={trSections} cols={3} disableHighlight headingColor="#1d4ed8" cardColors={["#6C9D81", "#99CCD6", "#FF846E"]} />
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#111", textAlign: "center", margin: "32px 0 0", letterSpacing: "0.04em" }}>
                <span style={{ color: "#D4632D", fontWeight: 700, fontSize: 16 }}>↓</span> &nbsp; sources.json 으로 수렴 &nbsp;→&nbsp; Portfolio 실시간 피드
              </p>
            </FadeIn>

            {/* [3] 실시간 피드 */}
            <FadeIn delay={0.1}>
              <div style={{ marginTop: 24 }}>
                <TechReviewMultiSource />
              </div>
            </FadeIn>

            {/* [4] 수치 */}

            {/* [5] Design Decisions + Ongoing */}
            <FadeIn delay={0.15}>
              <div style={{ paddingTop: 56, marginTop: 48 }}>
                <TechReviewSystemSection />
              </div>
            </FadeIn>

          </div>

          {/* Essay */}
          <FadeIn>
            <div id="writing-1" className="p12-writing-item" style={{ borderTop: "1px solid #e4e0da", paddingTop: 48 }}>
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

      {/* ── 06 · Contact ── */}
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
