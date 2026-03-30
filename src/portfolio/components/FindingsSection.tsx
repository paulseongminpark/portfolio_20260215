import { FadeIn } from "./FadeIn";
import { SectionLabel } from "./SectionLabel";

const _B = import.meta.env.BASE_URL;

// ── Essay ─────────────────────────────────────────────────────────
const ESSAY = {
  eyebrow: "ESSAY · 2026",
  title: "Linguistic — LLM — Ontology",
  pdf: `${_B}findings/linguistic-llm-ontology/linguistic-llm-ontology.pdf`,
};

// ── Series ────────────────────────────────────────────────────────
interface DocData {
  n: string;
  title: string;
  pdf: string;
  label: string;
  lines: string[];
  redWord?: string;
  redLine?: number;
  tags: string;
  tags2?: string;
  numInfo: string;
}

const SERIES_DOCS: DocData[] = [
  {
    n: "00", title: "Index",
    pdf: `${_B}findings/memory-ontology/00_Index.pdf`,
    label: "INDEX · MCP-MEMORY",
    lines: ["9개 렌즈로 분해한", "하나의 시스템"],
    redWord: "시스템", redLine: 1,
    tags: "4,786 nodes · 6,765 edges", tags2: "25 types · 99 SECTIONS",
    numInfo: "00 / 09",
  },
  {
    n: "01", title: "Alpha",
    pdf: `${_B}findings/memory-ontology/01_Alpha.pdf`,
    label: "TRILOGY I OF III",
    lines: ["LLM 시대에 인간의", "사고는 어떤 외부", "구조를 필요로 하는가"],
    redWord: "구조", redLine: 2,
    tags: "연역 · 온톨로지", tags2: "인지 외부화 · 11 THESES",
    numInfo: "01 / 09",
  },
  {
    n: "02", title: "Beta",
    pdf: `${_B}findings/memory-ontology/02_Beta.pdf`,
    label: "TRILOGY II OF III",
    lines: ["4,786개 노드가 말하는", "인간-AI 인지 협업의", "실증적 발견"],
    redWord: "발견", redLine: 2,
    tags: "귀납 · 실증 · 4,786 노드", tags2: "인지 협업 · 17 SECTIONS",
    numInfo: "02 / 09",
  },
  {
    n: "03", title: "Omega",
    pdf: `${_B}findings/memory-ontology/03_Omega.pdf`,
    label: "TRILOGY III OF III",
    lines: ["자기개선 인지 엔진이", "요구하는 새로운 이론"],
    redWord: "이론", redLine: 1,
    tags: "귀추 · 자기개선", tags2: "인지 엔진 · 11 PROPOSALS",
    numInfo: "03 / 09",
  },
  {
    n: "04", title: "Praxis",
    pdf: `${_B}findings/memory-ontology/04_Praxis.pdf`,
    label: "METHODOLOGY · 04 OF 09",
    lines: ["자기개선 인지 엔진의", "구축 방법론"],
    redWord: "구축", redLine: 1,
    tags: "방법론 · 프레임워크", tags2: "실천 · 13 SECTIONS",
    numInfo: "04 / 09",
  },
  {
    n: "05", title: "Lens A",
    pdf: `${_B}findings/memory-ontology/05_Lens_A.pdf`,
    label: "LENS A · COGNITIVE SCIENCE",
    lines: ["mcp-memory는", "인간 인지의 어떤", "메커니즘을 구현하는가"],
    redWord: "메커니즘", redLine: 2,
    tags: "인지과학 · 외부 기억", tags2: "메타인지 · 11 FACETS",
    numInfo: "05 / 09",
  },
  {
    n: "06", title: "Lens B",
    pdf: `${_B}findings/memory-ontology/06_Lens_B.pdf`,
    label: "LENS B · PHILOSOPHY",
    lines: ["설계 선택은 어떤", "철학적 입장을", "전제하는가"],
    redWord: "철학적", redLine: 1,
    tags: "존재론 · 과정 형이상학", tags2: "리좀 · 11 FACETS",
    numInfo: "06 / 09",
  },
  {
    n: "07", title: "Lens C",
    pdf: `${_B}findings/memory-ontology/07_Lens_C.pdf`,
    label: "LENS C · ARCHITECTURE",
    lines: ["설계 결정과", "트레이드오프"],
    redWord: "설계", redLine: 0,
    tags: "하이브리드 검색 · 스키마", tags2: "확장성 · 11 FACETS",
    numInfo: "07 / 09",
  },
  {
    n: "08", title: "Lens D",
    pdf: `${_B}findings/memory-ontology/08_Lens_D.pdf`,
    label: "LENS D · COMPETITIVE",
    lines: ["AI 메모리 시스템 대비", "mcp-memory의 위치"],
    redWord: "위치", redLine: 1,
    tags: "경쟁 지형 · 비교 분석", tags2: "AI 메모리 · 11 FACETS",
    numInfo: "08 / 09",
  },
  {
    n: "09", title: "Lens E",
    pdf: `${_B}findings/memory-ontology/09_Lens_E.pdf`,
    label: "LENS E · LINGUISTICS",
    lines: ["LLM의 언어적 한계를", "mcp-memory는 어떻게", "보완하는가"],
    redWord: "보완", redLine: 2,
    tags: "언어학 · 의미론 · 프레임", tags2: "상보 관계 · 11 FACETS",
    numInfo: "09 / 09",
  },
];

// ── SVG helpers ───────────────────────────────────────────────────
const MARGIN = 22;
const LINE_H = 22;
const TITLE_START_Y = 90;

function titleLines(lines: string[], redWord?: string, redLine?: number) {
  return lines.map((line, i) => {
    const y = TITLE_START_Y + i * LINE_H;
    if (redWord && i === redLine && line.includes(redWord)) {
      const idx = line.indexOf(redWord);
      const before = line.slice(0, idx);
      const after  = line.slice(idx + redWord.length);
      return (
        <text key={i} x={MARGIN} y={y} fontFamily="'Noto Sans KR', sans-serif" fontSize="16" fontWeight="700" fill="#222">
          {before}<tspan fill="#CC0000">{redWord}</tspan>{after}
        </text>
      );
    }
    return (
      <text key={i} x={MARGIN} y={y} fontFamily="'Noto Sans KR', sans-serif" fontSize="16" fontWeight="700" fill="#222">
        {line}
      </text>
    );
  });
}

function DocCoverSVG({ doc }: { doc: DocData }) {
  const tagsY = TITLE_START_Y + doc.lines.length * LINE_H + 26;
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="300" height="400" fill="#ffffff"/>
      <rect x="0" y="0" width="300" height="2" fill="#111"/>

      {/* decorative large number */}
      <text x="278" y="70" fontFamily="Inter, sans-serif" fontSize="44" fontWeight="800" letterSpacing="-2" fill="#f0f0f0" textAnchor="end">{doc.n}</text>

      {/* eyebrow */}
      <text x={MARGIN} y="26" fontFamily="Inter, sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="2" fill="#aaa">{doc.label}</text>
      <line x1={MARGIN} y1="34" x2="278" y2="34" stroke="#e0e0e0" strokeWidth="0.5"/>

      {/* title */}
      {titleLines(doc.lines, doc.redWord, doc.redLine)}

      {/* tags */}
      <text x={MARGIN} y={tagsY} fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1" fill="#ccc">{doc.tags}</text>
      {doc.tags2 && (
        <text x={MARGIN} y={tagsY + 13} fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1" fill="#ccc">{doc.tags2}</text>
      )}

      <line x1={MARGIN} y1="356" x2="278" y2="356" stroke="#e8e8e8" strokeWidth="0.5"/>
      <text x={MARGIN} y="374" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1.5" fill="#bbb">MCP-MEMORY</text>
      <text x="278" y="374" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1" fill="#bbb" textAnchor="end">{doc.numInfo}</text>
      <text x="278" y="389" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#CC0000" textAnchor="end">READ →</text>
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────
export function FindingsSection() {
  return (
    <section id="findings" className="p12-section" style={{ background: "#ffffff", paddingTop: 56 }}>
      <div className="p12-container">
        <FadeIn>
          <SectionLabel>07 · Findings</SectionLabel>
        </FadeIn>

        {/* ── Essay ── */}
        <FadeIn delay={0.05}>
          <div className="p12-finding-group-label">ESSAY</div>
          <a href={ESSAY.pdf} target="_blank" rel="noopener noreferrer" className="p12-finding-essay-card">
            <div className="p12-finding-essay-cover">
              <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
                <rect width="300" height="400" fill="#ffffff"/>
                <rect x="0" y="0" width="300" height="2" fill="#111"/>

                <text x="22" y="26" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="600" letterSpacing="2.5" fill="#aaa">ESSAY · 2026</text>
                <line x1="22" y1="34" x2="278" y2="34" stroke="#e0e0e0" strokeWidth="0.5"/>

                <text fontFamily="'Noto Sans KR', sans-serif" fontSize="18" fontWeight="700" fill="#222">
                  <tspan x="22" y="84">언어를 다루는</tspan>
                  <tspan x="22" dy="26">모델은 왜 결국</tspan>
                  <tspan x="22" dy="26">
                    <tspan fill="#CC0000">구조</tspan>
                    <tspan fill="#222">를 요구하는가</tspan>
                  </tspan>
                </text>

                <text x="22" y="170" fontFamily="Inter, sans-serif" fontSize="9" fontWeight="700" letterSpacing="1.5" fill="#999">LINGUISTIC — LLM — ONTOLOGY</text>
                <text x="22" y="188" fontFamily="'Noto Sans KR', sans-serif" fontSize="9" fill="#aaa">언어와 구조의 계보</text>

                <text x="22" y="240" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1" fill="#ccc">언어학 · 토큰화 · 임베딩</text>
                <text x="22" y="253" fontFamily="Inter, sans-serif" fontSize="7.5" letterSpacing="1" fill="#ccc">Attention · 온톨로지</text>

                <line x1="22" y1="356" x2="278" y2="356" stroke="#e8e8e8" strokeWidth="0.5"/>
                <text x="22" y="374" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="1.5" fill="#bbb">2026</text>
                <text x="278" y="374" fontFamily="Inter, sans-serif" fontSize="8" letterSpacing="1" fill="#bbb" textAnchor="end">22 PAGES</text>
                <text x="278" y="389" fontFamily="Inter, sans-serif" fontSize="8" fontWeight="700" letterSpacing="1.5" fill="#CC0000" textAnchor="end">READ →</text>
              </svg>
            </div>
          </a>
        </FadeIn>

        {/* ── Series ── */}
        <FadeIn delay={0.08}>
          <div className="p12-finding-group-label">MCP-MEMORY · ANALYSIS SERIES</div>
          <div className="p12-finding-series-grid">
            {SERIES_DOCS.map((doc) => (
              <a key={doc.n} href={doc.pdf} target="_blank" rel="noopener noreferrer" className="p12-finding-doc-card">
                <div className="p12-finding-doc-cover">
                  <DocCoverSVG doc={doc} />
                </div>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
