import { useRef, useState, useEffect } from "react";
import { type WorkKey } from "../content/work";
import { type WorkSection } from "../parseWorkDetail";
import { WorkDetailBlocks } from "./WorkDetailBlocks";
import { PageEditorProvider, usePageEditor } from "./PageEditorContext";
import { PageEditorPanel } from "./PageEditorPanel";
import "./PageEditor.css";

const GRADIENTS: Record<string, string> = {
  "mcp-memory":   "radial-gradient(ellipse at 25% 30%, rgba(59,130,246,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(96,165,250,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(37,99,195,0.5) 0%, transparent 55%), linear-gradient(150deg, #1e3a6f 0%, #2d5a9a 40%, #4a8ad4 100%)",
  "context-engineering": "radial-gradient(ellipse at 25% 30%, rgba(232,140,60,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(212,99,45,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(196,120,60,0.5) 0%, transparent 55%), linear-gradient(150deg, #8b3a0f 0%, #c4703a 40%, #e8a050 100%)",
  "tech-review":  "radial-gradient(ellipse at 25% 30%, rgba(107,92,231,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(232,164,184,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(139,122,207,0.5) 0%, transparent 55%), linear-gradient(150deg, #3b2e6e 0%, #7a65a5 40%, #d4a4ba 100%)",
  "empty-house":  "linear-gradient(135deg, #c0d0e5 0%, #9ab3d0 100%)",
  "skin-diary":   "linear-gradient(135deg, #b0d8c4 0%, #88c4a8 100%)",
  "pmcc":         "linear-gradient(135deg, #fed7aa 0%, #fbbf24 50%, #f59e0b 100%)",
  orchestration:  "radial-gradient(ellipse at 25% 30%, rgba(120,80,200,0.7) 0%, transparent 50%), radial-gradient(ellipse at 75% 70%, rgba(90,60,170,0.6) 0%, transparent 45%), radial-gradient(ellipse at 50% 45%, rgba(70,40,150,0.5) 0%, transparent 55%), linear-gradient(150deg, #1a0f3a 0%, #3b2565 40%, #6b4daa 100%)",
};

const WORK_META: Record<string, {
  period: string;
  role: string;
  tools: string[];
  stats: Array<{ value: string; label: string }>;
  overview: string;
}> = {
  "mcp-memory": {
    period: "2026–현재",
    role: "온톨로지 설계 · 시스템 구축",
    tools: ["Python", "SQLite", "FTS5", "ChromaDB", "NetworkX", "MCP Protocol"],
    stats: [
      { value: "4,685", label: "노드" },
      { value: "25", label: "타입" },
      { value: "4,368", label: "엣지" },
    ],
    overview: "AI가 맥락을 추론하도록 지식의 구조를 설계한 실험.\n25개 타입과 4,368개 엣지로 이루어진 온톨로지 기반 외부 기억 시스템.",
  },
  "context-engineering": {
    period: "2026–현재",
    role: "컨텍스트 설계 · 큐레이션 체계",
    tools: ["Claude Code", "Serena MCP", "Codex CLI", "Gemini CLI", "Python Hooks"],
    stats: [
      { value: "4", label: "레이어" },
      { value: "3", label: "게이트" },
      { value: "92", label: "파일" },
    ],
    overview: "AI의 추론 품질을 극대화하기 위한 맥락 큐레이션 체계.\n무엇을 넣고, 어떤 순서로 보여주고, 언제 덜어낼지를 4개 레이어로 설계한다.",
  },
  "empty-house": {
    period: "2025년 6월",
    role: "데이터 분석 · 시스템 설계",
    tools: ["Python", "Pandas", "공공데이터 API", "Figma"],
    stats: [
      { value: "3종", label: "통합 데이터 소스" },
      { value: "8개", label: "분석 행정구역" },
      { value: "2단계", label: "개입 우선순위" },
    ],
    overview: "전국 빈집 문제를 단순한 수 집계가 아닌, 인구 유출·상권 붕괴·교통 단절의 연쇄 관계로 분석했습니다. 데이터의 관계 구조를 통해 어디에 먼저 개입해야 하는지를 판단할 수 있는 의사결정 시스템을 설계했습니다.",
  },
  "skin-diary": {
    period: "2025년 8월",
    role: "AI 설계 · 모바일 UX",
    tools: ["Claude API", "기상청 API", "React Native", "Figma"],
    stats: [
      { value: "5종", label: "결합 데이터" },
      { value: "AI", label: "행동 제안 엔진" },
      { value: "실시간", label: "환경 연동" },
    ],
    overview: "피부 트러블의 원인을 단순 스킨케어 습관이 아닌 날씨·습도·자외선·수면·스트레스의 복합 영향으로 파악합니다. 사용자가 지금 무엇을 해야 하는지 행동 수준까지 제안하는 AI 에이전트를 설계했습니다.",
  },
  "pmcc": {
    period: "2023–2026",
    role: "커뮤니티 설계 · 운영",
    tools: ["커뮤니티 운영", "이벤트 기획", "관계 설계"],
    stats: [
      { value: "3년+", label: "운영 기간" },
      { value: "관계", label: "커뮤니티 핵심" },
      { value: "직접", label: "규칙 설계" },
    ],
    overview: "달리기를 위한 런클럽이 아니라 서로의 삶의 한 부분을 공유하는 모임을 만들고자 커피클럽을 시작했습니다.\n달리고 이야기를 나누며 관계를 쌓아가는 커뮤니티를 3년 이상 지속적으로 설계·운영했습니다.",
  },
  "tech-review": {
    period: "2026–현재",
    role: "파이프라인 설계 · 자동화",
    tools: ["Python", "Claude", "Gemini", "OpenAI", "Groq Whisper", "Jekyll", "Task Scheduler"],
    stats: [
      { value: "100+", label: "발행" },
      { value: "3", label: "소스" },
      { value: "3", label: "해석 층" },
    ],
    overview: "매일 새벽 5시, 시스템이 깨어난다. 기사를 읽고, 영상을 보고, 트윗을 수집하고, 왜 중요한지를 쓰고, 발행한다.\n편집장이 없는 뉴스룸. 기자 대신 파이프라인. 내가 설계한 것은 렌즈뿐이다.",
  },
  orchestration: {
    period: "2026–현재",
    role: "시스템 설계 · 오케스트레이션",
    tools: ["Claude Code", "Python Hooks", "MCP Protocol", "Bash", "Task Scheduler"],
    stats: [
      { value: "14", label: "Hooks" },
      { value: "13", label: "Skills" },
      { value: "3", label: "Workers" },
    ],
    overview: "AI를 조율하는 운영체제를 만든 과정.\n스크립트 모음이 커널이 되기까지, 여러 번의 재설계가 필요했다.",
  },
};

const _B = import.meta.env.BASE_URL;
const HERO_SLIDES = [
  `${_B}work/pmcc/hero_run2.webp`,
  `${_B}work/pmcc/hero_cafe2.webp`,
  `${_B}work/pmcc/hero_cafe_video_web.mp4`,
  `${_B}work/pmcc/hero_run3.webp`,
  `${_B}work/pmcc/hero_gather2.webp`,
  `${_B}work/pmcc/hero_run5_web.mp4`,
  `${_B}work/pmcc/hero_run4.webp`,
  `${_B}work/pmcc/hero_run6.webp`,
  `${_B}work/pmcc/hero_cafe.webp`,
  `${_B}work/pmcc/hero_gather_web.mp4`,
  `${_B}work/pmcc/hero_gather.webp`,
];

function HeroSlider() {
  const bandRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const isVideo = (s: string) => /\.(mp4|webm|mov)$/i.test(s);

  const renderSlides = () => HERO_SLIDES.map((src, i) => (
    <div key={i} className="hero-slider-item">
      {isVideo(src)
        ? <video src={src} autoPlay muted loop playsInline preload="auto" />
        : <img src={src} alt="" decoding="async" />}
    </div>
  ));

  const lastPct = useRef(0);
  const DURATION = 60; // must match CSS

  const scrubTo = (clientX: number) => {
    const el = scrubRef.current;
    const band = bandRef.current;
    if (!el || !band) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    lastPct.current = pct;
    const totalW = band.scrollWidth / 2;
    band.style.animation = 'none';
    band.style.transform = `translateX(-${pct * totalW}px)`;
    if (barFillRef.current) {
      barFillRef.current.style.animation = 'none';
      barFillRef.current.style.width = `${pct * 100}%`;
    }
  };

  const resumeFromPct = (pct: number) => {
    const band = bandRef.current;
    const fill = barFillRef.current;
    const offset = pct * DURATION;
    if (band) {
      band.style.transform = '';
      band.style.animation = `hero-scroll ${DURATION}s linear infinite`;
      band.style.animationDelay = `-${offset}s`;
    }
    if (fill) {
      fill.style.width = '';
      fill.style.animation = `hero-bar ${DURATION}s linear infinite`;
      fill.style.animationDelay = `-${offset}s`;
    }
  };

  const dragging = useRef(false);
  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scrubTo(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => { if (dragging.current) scrubTo(e.clientX); };
  const onPointerUp = () => { dragging.current = false; resumeFromPct(lastPct.current); };

  return (
    <div>
      <div className="hero-slider-wrap">
        <div ref={bandRef} className="hero-slider-band">
          <div className="hero-slider-track">{renderSlides()}</div>
          <div className="hero-slider-track" aria-hidden="true">{renderSlides()}</div>
        </div>
      </div>
      <div
        ref={scrubRef}
        className="hero-slider-bar-wrap"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="hero-slider-bar-bg">
          <div ref={barFillRef} className="hero-slider-bar-fill" />
        </div>
      </div>
    </div>
  );
}

interface Props {
  activeWork: WorkKey;
  title: string;
  heroSubtitle: string;
  parsedWork: WorkSection[] | null;
  onBack: () => void;
}

function isFootnote(name: string) { return /footnote/i.test(name); }

const IS_DEV = import.meta.env.DEV;

function EditorToggle() {
  const editor = usePageEditor();
  if (!editor || !IS_DEV) return null;
  return (
    <>
      {!editor.enabled && (
        <button className="pe-toggle-edit" onClick={() => editor.setEnabled(true)}>
          Edit Page
        </button>
      )}
      {editor.enabled && <PageEditorPanel />}
    </>
  );
}

export function WorkDetail({ activeWork, title, heroSubtitle: _heroSubtitle, parsedWork, onBack }: Props) {
  const filteredSections = parsedWork?.filter((s) => s.name !== "Hero") ?? [];
  const meta = WORK_META[activeWork];

  const F = "'Inter','Noto Sans KR',sans-serif";


  // Build flat TOC from section eyebrows (first occurrence only)
  const tocItems = (() => {
    const items: Array<{ label: string; id: string }> = [];
    const seen = new Set<string>();
    filteredSections.forEach((section, idx) => {
      const sectionId = `s-${idx + 2}`;
      const sectionTitle = section.blocks.find((b) => b.type === 'section-title') as
        | { type: 'section-title'; eyebrow: string; title: string; desc: string }
        | undefined;
      const eyebrow = sectionTitle?.eyebrow || section.name;
      if (!seen.has(eyebrow)) {
        seen.add(eyebrow);
        items.push({ label: eyebrow, id: sectionId });
      }
    });
    return items;
  })();

  // mcp-memory: grouped TOC
  const orchToc = [
    { label: "시작", items: [
      { name: "세션을 열면 아무것도 없다", id: "s-3" },
      { name: "기억 × 거버넌스", id: "s-4" },
    ]},
    { label: "설계", items: [
      { name: "1막 · 만들 수 있으니까", id: "s-5" },
      { name: "2막 · 42K", id: "s-6" },
      { name: "3막 · What만 남기다", id: "s-7" },
      { name: "4막 · AI 없이 측정한다", id: "s-8" },
    ]},
    { label: "실체", items: [
      { name: "커널", id: "s-9" },
    ]},
    { label: "강화", items: [
      { name: "규율의 원천", id: "s-10" },
      { name: "이 원리는 도구를 넘는다", id: "s-11" },
    ]},
  ];
  const mcpToc = [
    { label: "시작", items: [
      { name: "매일 일어나는 일", id: "s-3" },
      { name: "삶에 들어온 AI", id: "s-4" },
      { name: "뉴런이라는 직감", id: "s-5" },
    ]},
    { label: "설계", items: [
      { name: "1막 · 만들 수 있으니까", id: "s-6" },
      { name: "2막 · 0.057", id: "s-7" },
      { name: "3막 · 깎는 일", id: "s-8" },
      { name: "4막 · 자기 상태를 아는 것", id: "s-9" },
    ]},
    { label: "실체", items: [
      { name: "그래프", id: "s-10" },
      { name: "Where This Stands", id: "s-11" },
    ]},
    { label: "강화", items: [
      { name: "사고 리팩토링", id: "s-12" },
      { name: "Claude에게 하는 일", id: "s-13" },
      { name: "다른 세계에서", id: "s-14" },
      { name: "가리키는 곳", id: "s-15" },
    ]},
  ];
  const ceToc = [
    { label: "시작", items: [
      { name: "Claude의 세계", id: "s-3" },
    ]},
    { label: "설계", items: [
      { name: "1막 · 만들수록 줄어들었다", id: "s-4" },
      { name: "2막 · 정보에는 수명이 있다", id: "s-5" },
      { name: "3막 · 읽지 않는 것도 설계다", id: "s-6" },
    ]},
    { label: "실체", items: [
      { name: "만들고 버린 것", id: "s-7" },
    ]},
    { label: "강화", items: [
      { name: "절차에서 관점으로", id: "s-8" },
      { name: "가리키는 곳", id: "s-9" },
    ]},
  ];
  const trToc = [
    { label: "시작", items: [
      { name: "매일 아침의 질문", id: "s-2" },
      { name: "정보의 양과 질 사이", id: "s-3" },
    ]},
    { label: "설계", items: [
      { name: "3개 소스", id: "s-4" },
      { name: "3층 해석 체계", id: "s-5" },
      { name: "새벽 5시", id: "s-6" },
    ]},
    { label: "실체", items: [
      { name: "하루의 흐름", id: "s-7" },
      { name: "100일의 기록", id: "s-8" },
    ]},
    { label: "강화", items: [
      { name: "뭐가 달라졌는가", id: "s-9" },
    ]},
  ];
  const pmccToc = [
    { label: "문제", items: [
      { name: "Overview", id: "s-2" },
      { name: "Problem Definition", id: "s-3" },
    ]},
    { label: "해결", items: [
      { name: "Approach / Solution", id: "s-4" },
      { name: "Visual Cues", id: "s-5" },
    ]},
    { label: "변화", items: [
      { name: "Shift", id: "s-6" },
      { name: "Results & Impact", id: "s-7" },
      { name: "Community Voice", id: "ey-community-voice" },
      { name: "Growth & Metrics", id: "ey-growth-metrics" },
      { name: "Dataset", id: "ey-dataset" },
      { name: "Gallery", id: "ey-gallery" },
    ]},
    { label: "정리", items: [
      { name: "Takeaways", id: "s-8" },
    ]},
  ];
  const isGroupedToc = activeWork === 'mcp-memory' || activeWork === 'context-engineering' || activeWork === 'tech-review' || activeWork === 'pmcc' || activeWork === 'orchestration';
  const groupedTocData = activeWork === 'pmcc' ? pmccToc : activeWork === 'orchestration' ? orchToc : activeWork === 'context-engineering' ? ceToc : activeWork === 'tech-review' ? trToc : mcpToc;

  const [activeGroup, setActiveGroup] = useState(isGroupedToc ? groupedTocData[0]?.label ?? "" : "");
  const [activeItem, setActiveItem] = useState(isGroupedToc ? groupedTocData[0]?.items[0]?.id ?? "" : tocItems[0]?.id ?? "");

  useEffect(() => {
    if (isGroupedToc) {
      const allEntries: Array<{ id: string; groupLabel: string }> = [];
      groupedTocData.forEach((g) => g.items.forEach((item) => allEntries.push({ id: item.id, groupLabel: g.label })));
      const handleScroll = () => {
        const offset = 90;
        const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 100;
        let current = allEntries[0];
        if (atBottom) {
          current = allEntries[allEntries.length - 1];
        } else {
          for (const entry of allEntries) {
            const el = document.getElementById(entry.id);
            if (!el) continue;
            if (el.getBoundingClientRect().top <= offset) current = entry;
          }
        }
        if (current) { setActiveGroup(current.groupLabel); setActiveItem(current.id); }
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      if (tocItems.length === 0) return;
      const handleScroll = () => {
        const offset = 90;
        let current = tocItems[0];
        for (const entry of tocItems) {
          const el = document.getElementById(entry.id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= offset) current = entry;
        }
        if (current) setActiveItem(current.id);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [activeWork, filteredSections.length]);

  const content = (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* ── 헤더 ── */}
      {(() => {
        const hasHeroGradient = !!GRADIENTS[activeWork] && activeWork !== 'pmcc';
        const hg = hasHeroGradient;
        const isTrHero = activeWork === 'tech-review';
        const isCeHero = activeWork === 'context-engineering';
        const isMcpHero = activeWork === 'mcp-memory';
        const isOrchHero = activeWork === 'orchestration';
        const trHeroBg = isTrHero
          ? `url(${_B}work/tech-review/hero.png) center/cover no-repeat, #1a1a1a`
          : undefined;
        const ceHeroBg = isCeHero
          ? `url(${_B}work/context-engineering/card.png) center/cover no-repeat`
          : undefined;
        const mcpHeroBg = isMcpHero
          ? `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url(${_B}work/mcp-memory/card.png) center/cover no-repeat`
          : undefined;
        const orchHeroBg = isOrchHero
          ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${_B}work/orchestration/card.jpg) center/cover no-repeat`
          : undefined;
        return (
        <>
        {/* CASE STUDY ~ 메타 정보 */}
        <div style={{ background: isOrchHero ? orchHeroBg : isMcpHero ? mcpHeroBg : isCeHero ? ceHeroBg : isTrHero ? trHeroBg : hg ? GRADIENTS[activeWork] : "#f9f9f7", padding: "120px 0 48px", ...(tocItems.length > 0 ? { marginLeft: 200 } : {}) }}>
          <div style={{ maxWidth: 1540, margin: "0 auto", padding: "0 48px" }}>
            <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600,
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: hg ? "rgba(255,255,255,0.7)" : "#D4632D", marginBottom: 16, textAlign: "center" }}>
              Case Study
            </p>
            <h1 style={{ fontFamily: F, fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 700, color: hg ? "#fff" : "#111", lineHeight: 1.08,
              letterSpacing: "-0.02em", margin: "0 0 32px", textAlign: "center" }}>
              {activeWork === 'pmcc' ? 'Peer Mile Coffee Club' : title}
            </h1>
            <p style={{ fontFamily: F, fontWeight: 400,
              color: hg ? "rgba(255,255,255,0.85)" : "#444", lineHeight: 1.85, margin: "0 auto 48px", maxWidth: 860, fontSize: 18, textAlign: "center", whiteSpace: "pre-line" }}>
              {meta.overview}
            </p>
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center",
              paddingTop: 24, borderTop: hg ? "1px solid rgba(255,255,255,0.2)" : "1px solid #e8e8e8", maxWidth: 860, margin: "0 auto" }}>
              {[
                { label: "기간", value: meta.period },
                { label: "역할", value: meta.role },
                { label: "도구", value: meta.tools.join(" · ") },
              ].map(({ label, value }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase", color: hg ? "rgba(255,255,255,0.5)" : "#bbb", marginBottom: 6 }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: F, fontSize: 14, color: hg ? "rgba(255,255,255,0.9)" : "#333", margin: 0 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 히어로 이미지 블록 (pmcc만, 나머지는 위에 통합) ── */}
        {activeWork === 'pmcc' && <HeroSlider />}
        </>
        );
      })()}


      {/* ── fixed TOC sidebar (all detail pages) ── */}
      {tocItems.length > 0 && (
        <aside style={{
          position: "fixed", left: 0, top: 0, height: "100vh", overflowY: "auto",
          width: 200, borderRight: "1px solid #e8e8e8", background: "#fafafa",
          zIndex: 10, display: "flex", flexDirection: "column",
          padding: "120px 24px 24px 24px", fontFamily: F,
          scrollbarWidth: "none", msOverflowStyle: "none",
        } as React.CSSProperties}>
          <button onClick={onBack}
            style={{ fontFamily: F, fontSize: 13, color: "#999", background: "none",
              border: "none", cursor: "pointer", padding: 0, textAlign: "left", transition: "color 0.15s", alignSelf: "flex-start",
              position: "absolute", top: 24, left: 24 }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}>
            ← 돌아가기
          </button>
          <nav style={{ flex: 1, paddingTop: 0 }}>
            {isGroupedToc ? groupedTocData.map((group) => {
              const isGrpActive = activeGroup === group.label;
              return (
              <div key={group.label} style={{ marginBottom: 18 }}>
                <p style={{ fontFamily: F, fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                  textTransform: "uppercase", color: isGrpActive ? "#D4632D" : "#999", marginBottom: 4, padding: "4px 0",
                  transition: "color 0.15s" }}>
                  {group.label}
                </p>
                {group.items.map((item) => {
                  const isActive = activeItem === item.id;
                  return (
                  <a key={item.id} href={`#${item.id}`}
                    onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                    style={{ display: "block", fontFamily: F, color: isActive ? "#D4632D" : "#4F4F4F", textDecoration: "none", fontSize: 11,
                      fontWeight: isActive ? 600 : 400,
                      padding: "3px 0 3px 10px", borderLeft: `2px solid ${isActive ? "#D4632D" : "transparent"}`,
                      transition: "color 0.15s, border-color 0.15s", cursor: "pointer", lineHeight: 1.5 }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.color = "#111"; e.currentTarget.style.borderLeftColor = "#D4632D"; }}}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.color = "#4F4F4F"; e.currentTarget.style.borderLeftColor = "transparent"; }}}>
                    {item.name}
                  </a>
                  );
                })}
              </div>
              );
            }) : tocItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <a key={item.id} href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  style={{ display: "block", fontFamily: F, color: isActive ? "#D4632D" : "#4F4F4F", textDecoration: "none", fontSize: 11,
                    fontWeight: isActive ? 600 : 400,
                    padding: "3px 0", transition: "color 0.15s", cursor: "pointer", lineHeight: 1.5 }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#111"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#4F4F4F"; }}>
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>
      )}

      {/* ── 본문 ── */}
      <div style={tocItems.length > 0 ? { marginLeft: 200 } : undefined}>
      <div className="wd-body">
        {/* ── Tech Review LIVE SITE 링크 ── */}
        {activeWork === 'tech-review' && (
          <div style={{ paddingTop: 32, paddingBottom: 32 }}>
            <div>
              <a href="https://paulseongminpark.github.io/tech-review/ko/youtube/"
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
                  letterSpacing: "1.5px", textTransform: "uppercase" as const, textDecoration: "none",
                  color: "#CC0000", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = "0.6"}
                onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
                LIVE SITE — PAULSEONGMINPARK.GITHUB.IO/TECH-REVIEW →
              </a>
            </div>
          </div>
        )}

        {filteredSections.length > 0 ? (
          filteredSections.map((section, idx) => {
            const hasEyebrow = section.blocks[0]?.type === 'section-title';
            return (
              <div key={section.name} id={`s-${idx + 2}`} style={{
                padding: idx === 0 ? (activeWork === 'tech-review' ? "0 0 64px" : "64px 0 64px") : "64px 0",
                borderBottom: "none",
                opacity: isFootnote(section.name) ? 0.55 : 1,
              }}>
                {!isFootnote(section.name) && !hasEyebrow && (
                  <p style={{ fontFamily: F, fontSize: 12, fontWeight: 600,
                    letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb",
                    marginBottom: 20, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
                    → {section.name}
                  </p>
                )}
                <WorkDetailBlocks blocks={section.blocks} activeWork={activeWork} />
              </div>
            );
          })
        ) : (
          <div style={{ padding: "72px 0", color: "#888", fontFamily: F, fontSize: 15, lineHeight: 1.8 }}>
            케이스스터디 내용을 불러오는 중입니다.
          </div>
        )}
      </div>
      </div>

    </div>
  );

  if (!IS_DEV) return content;

  return (
    <PageEditorProvider workKey={activeWork}>
      {content}
      <EditorToggle />
    </PageEditorProvider>
  );
}
