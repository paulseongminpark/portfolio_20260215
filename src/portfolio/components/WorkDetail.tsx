import { useRef } from "react";
import { type WorkKey } from "../content/work";
import { type WorkSection } from "../parseWorkDetail";
import { WorkDetailBlocks } from "./WorkDetailBlocks";
import { PageEditorProvider, usePageEditor } from "./PageEditorContext";
import { PageEditorPanel } from "./PageEditorPanel";
import "./PageEditor.css";

const GRADIENTS: Record<string, string> = {
  "mcp-memory":  "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #a5b4fc 100%)",
  "empty-house": "linear-gradient(135deg, #dbeafe 0%, #ede9fe 50%, #fce7f3 100%)",
  "skin-diary":  "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)",
  "pmcc":        "linear-gradient(135deg, #fed7aa 0%, #fbbf24 50%, #f59e0b 100%)",
};

const WORK_META: Record<string, {
  period: string;
  role: string;
  tools: string[];
  stats: Array<{ value: string; label: string }>;
  overview: string;
}> = {
  "mcp-memory": {
    period: "2025–현재",
    role: "시스템 설계 · 개발",
    tools: ["Python", "SQLite", "FTS5", "OpenAI Embeddings", "MCP Protocol"],
    stats: [
      { value: "3,700+", label: "노드" },
      { value: "3중", label: "검색 채널" },
      { value: "49개", label: "관계 규칙" },
    ],
    overview: "세션이 끝나도 판단의 맥락이 남는 구조를 만들기 위해 설계한 온톨로지 기반 외부 기억 시스템입니다.\nVector + Full-Text + Graph 3중 검색으로 관련 기억을 찾고, BCM 감쇠로 기억 강도를 자동 조절합니다.",
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

  const content = (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>

      {/* ── 헤더 ── */}
      <div style={{ background: "#f9f9f7", padding: "120px 0 72px" }}>
        <div style={{ maxWidth: 1540, margin: "0 auto", padding: "0 48px" }}>

          {/* 뒤로가기 */}
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <button onClick={onBack}
              style={{ display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: F, fontSize: 13, color: "#999", background: "none",
                border: "none", cursor: "pointer", padding: 0, marginBottom: 40, transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#999")}>
              ← 돌아가기
            </button>
          </div>

          {/* 섹션 레이블 */}
          <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600,
            letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4632D", marginBottom: 16, textAlign: "center" }}>
            Case Study
          </p>

          {/* 프로젝트 제목 */}
          <h1 style={{ fontFamily: F, fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 700, color: "#111", lineHeight: 1.08,
            letterSpacing: "-0.02em", margin: "0 0 32px", textAlign: "center" }}>
            {activeWork === 'pmcc' ? 'Peer Mile Coffee Club' : title}
          </h1>

          {/* 오버뷰 — 제목 바로 아래 */}
          <p style={{ fontFamily: F, fontWeight: 400,
            color: "#444", lineHeight: 1.85, margin: "0 auto 48px", maxWidth: 860, fontSize: 18, textAlign: "center", whiteSpace: "pre-line" }}>
            {meta.overview}
          </p>

          {/* 메타 정보 */}
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center",
            paddingTop: 24, borderTop: "1px solid #e8e8e8", maxWidth: 860, margin: "0 auto" }}>
            {[
              { label: "기간", value: meta.period },
              { label: "역할", value: meta.role },
              { label: "도구", value: meta.tools.join(" · ") },
            ].map(({ label, value }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontFamily: F, fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>
                  {label}
                </p>
                <p style={{ fontFamily: F, fontSize: 14, color: "#333", margin: 0 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 히어로 이미지 블록 ── */}
      {activeWork === 'pmcc' ? (
        <HeroSlider />
      ) : (
        <div style={{ width: "100%", height: "36vh", background: GRADIENTS[activeWork] }} />
      )}

      {/* ── Stats ── */}
      <div style={{ borderBottom: "1px solid #e8e8e8" }}>
        <div style={{ maxWidth: 1540, margin: "0 auto", padding: "0 48px",
          display: "grid", gridTemplateColumns: `repeat(${meta.stats.length}, 1fr)` }}>
          {meta.stats.map((s, i) => (
            <div key={i} style={{ padding: "36px 24px", textAlign: "center",
              borderRight: i < meta.stats.length - 1 ? "1px solid #e8e8e8" : "none" }}>
              <div style={{ fontFamily: F, fontSize: 40, fontWeight: 700,
                letterSpacing: "-0.02em", color: "#111", lineHeight: 1, marginBottom: 6 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: F, fontSize: 12, color: "#999", letterSpacing: "0.04em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 본문 ── */}
      <div className="wd-body">
        {filteredSections.length > 0 ? (
          filteredSections.map((section, idx) => {
            const hasEyebrow = section.blocks[0]?.type === 'section-title' && section.blocks[0]?.eyebrow;
            return (
              <div key={section.name} style={{
                padding: "64px 0",
                borderBottom: idx < filteredSections.length - 1 ? "1px solid #e4e0da" : "none",
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
  );

  if (!IS_DEV) return content;

  return (
    <PageEditorProvider workKey={activeWork}>
      {content}
      <EditorToggle />
    </PageEditorProvider>
  );
}
