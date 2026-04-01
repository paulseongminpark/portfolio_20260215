import { useState, useRef, useEffect } from 'react';
import { type Block } from '../parseWorkDetail';
import { SurveyViz } from './SurveyViz';
import { SurveyTable } from './SurveyTable';
import { VisualCuesGallery } from './VisualCuesGallery';
import { ActivityGallery } from './ActivityGallery';
import { EditableBlock } from './EditableBlock';
import { GridScrubSlider } from './GridScrubSlider';
import { Diagram1 } from './diagrams/Diagram1';
import { Diagram2 } from './diagrams/Diagram2';
import { Diagram3 } from './diagrams/Diagram3';
import { Diagram4 } from './diagrams/Diagram4';
import { Diagram5 } from './diagrams/Diagram5';
import { Diagram6 } from './diagrams/Diagram6';
import { Diagram7 } from './diagrams/Diagram7';
import { Diagram8 } from './diagrams/Diagram8';
import { Diagram9 } from './diagrams/Diagram9';
import { Diagram10 } from './diagrams/Diagram10';
import { Diagram11 } from './diagrams/Diagram11';
import { Diagram12 } from './diagrams/Diagram12';
import { Diagram13 } from './diagrams/Diagram13';
import { Diagram14 } from './diagrams/Diagram14';
import { Diagram15 } from './diagrams/Diagram15';
import { Diagram16 } from './diagrams/Diagram16';
import { CEDiagram1 } from './diagrams/ce/CEDiagram1';
import { CEDiagram2 } from './diagrams/ce/CEDiagram2';
import { CEScaleDiptych } from './diagrams/ce/CEScaleDiptych';
import { CEDiagram5 } from './diagrams/ce/CEDiagram5';
import { CEDiagram6 } from './diagrams/ce/CEDiagram6';
import { CEDiagram7 } from './diagrams/ce/CEDiagram7';
import { CEFolderPath } from './diagrams/ce/CEFolderPath';
import { CosmosShader } from './CosmosShader';
import { Triptych } from './diagrams/Triptych';
import { Diptych } from './diagrams/Diptych';
import { FailureDiptych } from './diagrams/FailureDiptych';
import { StructureDiptych } from './diagrams/StructureDiptych';
import { ContextDiptych } from './diagrams/ContextDiptych';
import { TRDiagram1 } from './diagrams/tr/TRDiagram1';
import { TRDiagram2 } from './diagrams/tr/TRDiagram2';
import { TRDiagram5 } from './diagrams/tr/TRDiagram5';
import { TRDiagram6 } from './diagrams/tr/TRDiagram6';
import { TRDiagram7 } from './diagrams/tr/TRDiagram7';
import { TRDiagram8 } from './diagrams/tr/TRDiagram8';
import { TRDiagram9 } from './diagrams/tr/TRDiagram9';
import { TRInterpretationDiptych } from './diagrams/tr/TRInterpretationDiptych';
import { ORCHNetworkDiptych } from './diagrams/orch/ORCHNetworkDiptych';
import { ORCHDiagram2 } from './diagrams/orch/ORCHDiagram2';
import { ORCHKernelDiptych } from './diagrams/orch/ORCHKernelDiptych';
import { ORCHDiagram5 } from './diagrams/orch/ORCHDiagram5';
import { ORCHDiagram6 } from './diagrams/orch/ORCHDiagram6';
import { ORCHDiagram7 } from './diagrams/orch/ORCHDiagram7';

export function renderBold(text: string) {
  const parts = text.split(/(\*\*.+?\*\*|\{\{o:.+?\}\}|\{\{b:.+?\}\})/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('{{o:') && part.endsWith('}}')) {
      return <mark key={i} className="wd-hl-orange">{part.slice(4, -2)}</mark>;
    }
    if (part.startsWith('{{b:') && part.endsWith('}}')) {
      return <mark key={i} className="wd-hl-blue">{part.slice(4, -2)}</mark>;
    }
    return part;
  });
}

function resolveAssetSrc(raw: string, activeWork: string) {
  const baseUrl = import.meta.env.BASE_URL;
  let s = (raw ?? '').trim();
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('public/')) s = s.slice('public/'.length);
  if (s.startsWith('/work/')) return `${baseUrl}${s.slice(1)}`;
  if (s.startsWith('work/')) return `${baseUrl}${s}`;
  if (s.startsWith('/')) return `${baseUrl}${s.slice(1)}`;
  const base = s.split(/[/\\]/).pop() ?? s;
  const folder =
    activeWork === 'mcp-memory' ? 'mcp-memory'
    : activeWork === 'tech-review' ? 'tech-review'
    : activeWork === 'empty-house' ? 'empty-house-cps'
    : activeWork === 'skin-diary' ? 'skin-diary-ai'
    : 'pmcc';
  return `${baseUrl}work/${folder}/${base}`;
}

function isVideoSrc(src: string) {
  return /\.(mp4|webm)$/i.test(src);
}

interface ImageRef { src: string; caption?: string }

type Processed =
  | { kind: 'block'; block: Block }
  | { kind: 'carousel'; images: ImageRef[] }
  | { kind: 'asistobe'; src: string; caption?: string }
  | { kind: 'image-grid'; images: ImageRef[] };

const PMCC_GALLERY_FILES = [
  'pmcc_hyrox_web.mp4',
  'pmcc_jujitsu_web.mp4',
  'pmcc_yoga_web.mp4',
  'pmcc_crossfit_web.mp4',
  'pmcc volunteer.webp',
  'pmcc_insta1.webp',
  'pmcc_insta2.webp',
  'pmcc_insta3.webp',
  'pmcc_insta4.webp',
  'pmcc_insta5.webp',
  'pmcc_add1.webp',
  'pmcc_add2.webp'
];

const isOntology = (s: string) => {
  if (/ontology_/i.test(s)) return true;
  const base = (s ?? '').split(/[/\\]/).pop() || '';
  return PMCC_GALLERY_FILES.includes(base);
};

const isAsIsToBe = (s: string) => /as_is_to_be/i.test(s);

function normalizeLabel(s: string) {
  return s.replace(/[\s/()_\-]/g, '').toLowerCase();
}

function preprocessBlocks(blocks: Block[]): Processed[] {
  // Collect all section-title eyebrows to detect heading duplicates
  const eyebrowSet = new Set(
    blocks
      .filter((b): b is Extract<Block, { type: 'section-title' }> => b.type === 'section-title')
      .map((b) => normalizeLabel(b.eyebrow))
  );

  const out: Processed[] = [];
  let i = 0;
  while (i < blocks.length) {
    const b = blocks[i];

    // 1. Group 2+ consecutive "isOntology" images into a carousel
    if (b.type === 'image' && isOntology(b.src)) {
      const imgs: ImageRef[] = [];
      while (
        i < blocks.length &&
        blocks[i].type === 'image' &&
        isOntology((blocks[i] as Block & { type: 'image' }).src)
      ) {
        const img = blocks[i] as Block & { type: 'image' };
        if (img.src && img.src.trim() !== '') {
          imgs.push({ src: img.src, caption: img.caption });
        }
        i++;
      }
      if (imgs.length > 0) {
        out.push({ kind: 'carousel', images: imgs });
      }
      continue;
    }

    // 2. As-Is/To-Be check
    if (b.type === 'image' && isAsIsToBe(b.src)) {
      const img = b as Block & { type: 'image' };
      if (img.src && img.src.trim() !== '') {
        out.push({ kind: 'asistobe', src: img.src, caption: img.caption });
      }
      i++;
      continue;
    }
    // Skip heading blocks that duplicate a section-title eyebrow
    if (b.type === 'heading' && eyebrowSet.has(normalizeLabel(b.text))) {
      i++;
      continue;
    }
    // Group 2+ consecutive plain images into a grid
    if (b.type === 'image' && !isOntology(b.src) && !isAsIsToBe(b.src)) {
      const imgs: ImageRef[] = [];
      while (
        i < blocks.length &&
        blocks[i].type === 'image' &&
        !isOntology((blocks[i] as Block & { type: 'image' }).src) &&
        !isAsIsToBe((blocks[i] as Block & { type: 'image' }).src)
      ) {
        const img = blocks[i] as Block & { type: 'image' };
        imgs.push({ src: img.src, caption: img.caption });
        i++;
      }
      if (imgs.length >= 2) {
        out.push({ kind: 'image-grid', images: imgs });
      } else {
        out.push({ kind: 'block', block: { type: 'image', src: imgs[0].src, caption: imgs[0].caption } });
      }
      continue;
    }
    out.push({ kind: 'block', block: b });
    i++;
  }
  return out;
}

function CarouselArrowPrev() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CarouselArrowNext() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OntologyCarousel({ images, activeWork }: { images: ImageRef[]; activeWork: string }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchX = useRef(0);
  const isInstagramCarousel = images.some((img) => /pmcc_insta/i.test(img.src));
  const cur = images[idx];
  const src = resolveAssetSrc(cur.src, activeWork);
  const curIsVideo = isVideoSrc(src);
  const prev = () => setIdx((v) => (v - 1 + images.length) % images.length);
  const next = () => setIdx((v) => (v + 1) % images.length);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, idx]);

  return (
    <>
      <div className={`wd-carousel${isInstagramCarousel ? ' wd-carousel-instagram' : ''}`}>
        <div className="wd-carousel-row">
          <button type="button" className="wd-carousel-arrow prev" onClick={prev} aria-label="Previous">
            <CarouselArrowPrev />
          </button>
          <div
            className="wd-carousel-stage"
            style={{ cursor: 'zoom-in' }}
            onClick={() => setLightbox(true)}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const d = touchX.current - e.changedTouches[0].clientX;
              if (Math.abs(d) > 50) { d > 0 ? next() : prev(); }
            }}
          >
            {curIsVideo
              ? <video src={src} autoPlay muted loop playsInline className="wd-carousel-img" />
              : <img src={src} alt={cur.caption ?? ''} loading="lazy" className="wd-carousel-img" />}
          </div>
          <button type="button" className="wd-carousel-arrow next" onClick={next} aria-label="Next">
            <CarouselArrowNext />
          </button>
        </div>
        {cur.caption && <p className="wd-carousel-caption">{cur.caption}</p>}
        <div className="wd-carousel-dots">
          {images.map((_, di) => (
            <button
              key={di}
              type="button"
              className={`wd-dot${di === idx ? ' active' : ''}`}
              onClick={() => setIdx(di)}
              aria-label={`Slide ${di + 1}`}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="wd-lightbox" onClick={() => setLightbox(false)}>
          <button type="button" className="wd-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close">✕</button>
          <button type="button" className="wd-lightbox-arrow prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <CarouselArrowPrev />
          </button>
          {curIsVideo
            ? (
              <video
                src={src}
                className="wd-lightbox-img"
                controls
                autoPlay
                muted
                loop
                playsInline
                onClick={(e) => e.stopPropagation()}
              />
            )
            : (
              <img
                src={src}
                alt={cur.caption ?? ''}
                className="wd-lightbox-img"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          <button type="button" className="wd-lightbox-arrow next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
            <CarouselArrowNext />
          </button>
          <div className="wd-lightbox-dots">
            {images.map((_, di) => (
              <button
                key={di}
                type="button"
                className={`wd-lightbox-dot${di === idx ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIdx(di); }}
                aria-label={`Slide ${di + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function AsIsToBeTab({ src, caption, activeWork }: { src: string; caption?: string; activeWork: string }) {
  const [tab, setTab] = useState<'as-is' | 'to-be'>('as-is');
  const resolved = resolveAssetSrc(src, activeWork);

  return (
    <div className="wd-asistobe">
      <div className="wd-asistobe-bar">
        <button type="button" className={`wd-asistobe-btn${tab === 'as-is' ? ' active' : ''}`} onClick={() => setTab('as-is')}>AS-IS</button>
        <button type="button" className={`wd-asistobe-btn${tab === 'to-be' ? ' active' : ''}`} onClick={() => setTab('to-be')}>TO-BE</button>
      </div>
      <div className="wd-asistobe-frame">
        <img src={resolved} alt={caption ?? ''} loading="lazy" className={`wd-asistobe-img ${tab}`} />
      </div>
      {caption && <p className="wd-caption">{caption}</p>}
    </div>
  );
}

function PmccFlowchart() {
  // Fixed column widths: [step1, arr1, step2, arr2, diamond, yes+arr, retention]
  const W = [120, 48, 138, 48, 92, 52, 120] as const;
  const captionStyle: React.CSSProperties = { fontSize: 10, fontStyle: 'italic', color: '#888', textAlign: 'center', lineHeight: 1.4, padding: '0 4px' };

  return (
    <div style={{ background: '#ffffff', borderRadius: 8, padding: '28px 20px', margin: '56px 0 0', overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Row 1: alignItems stretch → Retention matches STEP1/STEP2 height */}
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            {/* STEP 1 */}
            <div style={{ width: W[0], flexShrink: 0, border: '1px solid #d0d0d0', borderRadius: 10, background: '#ffffff', padding: '14px 10px', textAlign: 'center', boxSizing: 'border-box' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#999', marginBottom: 6, textTransform: 'uppercase' }}>STEP 1</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.4 }}>Running<br />Physical Load</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>Heart rate ↑</div>
            </div>
            {/* Arrow 1 */}
            <div style={{ width: W[1], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#c0c0c0', fontSize: 18 }}>→</span>
            </div>
            {/* STEP 2 */}
            <div style={{ width: W[2], flexShrink: 0, border: '2px solid #6aad6a', borderRadius: 10, background: '#f0f7f0', padding: '14px 10px', textAlign: 'center', boxSizing: 'border-box' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: '#5a9d5a', marginBottom: 6, textTransform: 'uppercase' }}>STEP 2</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#111', lineHeight: 1.4 }}>De-escalation<br />Defense Shield ↓</div>
              <div style={{ fontSize: 11, color: '#4a9a4a', marginTop: 4 }}>Ego removal</div>
            </div>
            {/* Arrow 2 */}
            <div style={{ width: W[3], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#c0c0c0', fontSize: 18 }}>→</span>
            </div>
            {/* Diamond */}
            <div style={{ width: W[4], flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'relative', width: 82, height: 82, flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: 8, left: 8, right: 8, bottom: 8, border: '1px solid #d0d0d0', background: '#ffffff', transform: 'rotate(45deg)', borderRadius: 3 }} />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#333', textAlign: 'center', lineHeight: 1.3 }}>Safe State<br />Formed?</div>
                </div>
              </div>
            </div>
            {/* YES + Arrow: arrow at center, YES label floats above via absolute */}
            <div style={{ width: W[5], flexShrink: 0, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', bottom: '50%', marginBottom: 4, fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', color: '#888', whiteSpace: 'nowrap' }}>YES</div>
              <span style={{ color: '#c0c0c0', fontSize: 18 }}>→</span>
            </div>
            {/* Retention: stretches to match STEP1/STEP2 height */}
            <div style={{ width: W[6], flexShrink: 0, border: '2px solid #3B82F6', borderRadius: 10, background: '#eaf4fb', padding: '14px 10px', textAlign: 'center', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>Retention</div>
            </div>
          </div>

          {/* Row 2: Dashed lines under box columns only */}
          <div style={{ display: 'flex' }}>
            <div style={{ width: W[0], flexShrink: 0, display: 'flex', justifyContent: 'center' }}><div style={{ width: 1, height: 14, borderLeft: '1px dashed #ccc' }} /></div>
            <div style={{ width: W[1], flexShrink: 0 }} />
            <div style={{ width: W[2], flexShrink: 0, display: 'flex', justifyContent: 'center' }}><div style={{ width: 1, height: 14, borderLeft: '1px dashed #ccc' }} /></div>
            <div style={{ width: W[3], flexShrink: 0 }} />
            <div style={{ width: W[4], flexShrink: 0, display: 'flex', justifyContent: 'center' }}><div style={{ width: 1, height: 14, borderLeft: '1px dashed #ccc' }} /></div>
            <div style={{ width: W[5], flexShrink: 0 }} />
            <div style={{ width: W[6], flexShrink: 0, display: 'flex', justifyContent: 'center' }}><div style={{ width: 1, height: 14, borderLeft: '1px dashed #ccc' }} /></div>
          </div>

          {/* Row 3: Captions */}
          <div style={{ display: 'flex' }}>
            <div style={{ width: W[0], flexShrink: 0, ...captionStyle }}>Input: Controlled Stress</div>
            <div style={{ width: W[1], flexShrink: 0 }} />
            <div style={{ width: W[2], flexShrink: 0, ...captionStyle }}>Process: Psychological Safety</div>
            <div style={{ width: W[3], flexShrink: 0 }} />
            <div style={{ width: W[4], flexShrink: 0, ...captionStyle }}>Condition: Openness</div>
            <div style={{ width: W[5], flexShrink: 0 }} />
            <div style={{ width: W[6], flexShrink: 0, ...captionStyle, color: '#3B82F6' }}>Output: Behavior Change</div>
          </div>

        </div>
      </div>
    </div>
  );
}

const PY_KW = /\b(def|class|if|elif|else|for|while|return|import|from|as|not|and|or|in|is|with|try|except|finally|raise|yield|pass|break|continue|lambda|True|False|None|self)\b/g;
const PY_FUNC = /\b([a-zA-Z_]\w*)\s*(?=\()/g;

function highlightPython(code: string) {
  return code.split('\n').map((line, li) => {
    const commentIdx = line.indexOf('#');
    const before = commentIdx >= 0 ? line.slice(0, commentIdx) : line;
    const comment = commentIdx >= 0 ? line.slice(commentIdx) : '';

    // collect all token positions
    const tokens: { start: number; end: number; cls: string }[] = [];
    let m: RegExpExecArray | null;
    const kwRe = new RegExp(PY_KW.source, 'g');
    while ((m = kwRe.exec(before)) !== null) tokens.push({ start: m.index, end: m.index + m[0].length, cls: 'wd-code-kw' });
    const fnRe = new RegExp(PY_FUNC.source, 'g');
    while ((m = fnRe.exec(before)) !== null) {
      const overlap = tokens.some(t => m!.index >= t.start && m!.index < t.end);
      if (!overlap) tokens.push({ start: m.index, end: m.index + m[1].length, cls: 'wd-code-fn' });
    }
    tokens.sort((a, b) => a.start - b.start);

    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    for (const t of tokens) {
      if (t.start > lastIdx) parts.push(before.slice(lastIdx, t.start));
      parts.push(<span key={`${li}-${t.start}`} className={t.cls}>{before.slice(t.start, t.end)}</span>);
      lastIdx = t.end;
    }
    if (lastIdx < before.length) parts.push(before.slice(lastIdx));
    if (comment) parts.push(<span key={`${li}-c`} className="wd-code-comment">{comment}</span>);

    return <span key={li}>{parts}{'\n'}</span>;
  });
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="wd-code-copy"
      aria-label="Copy code"
      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1200); }}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M3 11V3.5A.5.5 0 013.5 3H11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
      )}
    </button>
  );
}

function CodeBlockWithLightbox({ label, code }: { label: string; code: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="wd-code-block" onClick={() => setOpen(true)}>
        <div className="wd-code-header">
          <span className="wd-code-label">{label}</span>
          <CopyButton text={code} />
        </div>
        <pre className="wd-code-pre"><code>{highlightPython(code)}</code></pre>
        <span className="wd-code-expand">click</span>
      </div>
      {open && <CodeLightbox label={label} code={code} onClose={() => setOpen(false)} />}
    </>
  );
}

const CODE_EXPLANATIONS: Record<string, React.ReactNode> = {
  "storage/hybrid.py — BCM Learning": (
    <>
      <p>이 함수는 이번 검색에서 <strong>실제로 함께 활성화된 연결만</strong> 골라 strength를 업데이트합니다.</p>
      <ol>
        <li>활성화된 edge 선택</li>
        <li>source / target 활성도 정규화</li>
        <li>source 기준치(<code>θ_m</code>) 계산</li>
        <li>BCM 식으로 변화량 산출</li>
        <li>기존 strength에 반영</li>
        <li><code>0.01 ~ 1.0</code> 범위로 제한</li>
      </ol>
      <p>즉, <strong>검색 자체가 그래프를 다시 학습하는 구조</strong>입니다.</p>
      <h4>Core Calculation</h4>
      <pre><code>{`edge.strength = clamp(
    edge.strength + eta * v_i * (v_i - theta) * v_j,
    0.01, 1.0
)`}</code></pre>
      <table className="wd-lb-table">
        <tbody>
          <tr><td><code>edge.strength</code></td><td>기존 연결 강도</td></tr>
          <tr><td><code>eta</code></td><td>업데이트 민감도</td></tr>
          <tr><td><code>v_i</code></td><td>소스 기억의 현재 활성도</td></tr>
          <tr><td><code>(v_i - theta)</code></td><td>평소 기준 대비 현재 활성도 차이</td></tr>
          <tr><td><code>v_j</code></td><td>타깃 기억의 현재 활성도</td></tr>
          <tr><td><code>clamp()</code></td><td>연결 강도 폭주 방지</td></tr>
        </tbody>
      </table>
      <p>핵심은 단순한 공동 등장 여부가 아니라, 이번 호출이 평소보다 충분히 강했는가를 함께 본다는 점입니다.</p>
      <h4>Why BCM</h4>
      <p>단순 Hebbian 방식은 "같이 뜨면 계속 강화"되기 때문에 자주 불리는 노드로 쏠릴 수 있습니다. BCM은 기준선 θ_m을 넣어 의미 있게 강한 활성화일 때만 강화되도록 만들고, 그렇지 않으면 강화 억제 또는 약화가 일어나게 합니다.</p>
      <p>즉, 적응성은 유지하면서도 과잉 강화와 허브 편향을 막는 안정화 규칙입니다.</p>
      <h4>Intended System Behavior</h4>
      <ol>
        <li><strong>Frequently co-retrieved memories become stronger</strong> — 함께 자주 호출되는 기억 쌍은 점점 더 강하게 연결됩니다.</li>
        <li><strong>Isolated memories are not over-reinforced</strong> — 혼자 뜨는 기억은 결속이 과도하게 커지지 않습니다.</li>
        <li><strong>Higher layers remain stable</strong> — 원칙·규범 같은 상위 레이어는 낮은 학습률로 쉽게 흔들리지 않게 합니다.</li>
        <li><strong>Lower layers adapt quickly</strong> — 관찰·사례·실패 기록 같은 하위 레이어는 더 빠르게 재편되어 현재 맥락을 반영합니다.</li>
      </ol>
    </>
  ),
  "tools/recall.py": (
    <>
      <p>이 함수는 단순 검색 함수가 아니라, <strong>검색 → 다양성 보정 → 검색 후 학습 → 사용자 교정 우선 적용</strong>까지 한 번에 처리하는 recall 파이프라인입니다.</p>
      <p>기본 검색은 세 가지 신호를 함께 사용합니다.</p>
      <ul>
        <li><strong>FTS5</strong> : 키워드 기반 검색</li>
        <li><strong>ChromaDB</strong> : 의미 기반 검색</li>
        <li><strong>Graph</strong> : 관계 기반 검색</li>
      </ul>
      <p>즉, 이 구조는 하나의 검색 방식에 의존하지 않고, <strong>문자 일치 / 의미 유사성 / 그래프 관계</strong>를 함께 묶어 recall 품질을 높이도록 설계되어 있습니다.</p>

      <h4>What the Code Does</h4>
      <ol>
        <li><code>hybrid_search()</code>로 초기 검색 실행</li>
        <li>결과가 한 프로젝트에 과도하게 몰렸는지 확인</li>
        <li>몰림이 심하면 다른 프로젝트 결과를 섞어 다양성 보정</li>
        <li>검색 결과를 바탕으로 <code>post_search_learn()</code> 실행</li>
        <li><code>Correction</code> 타입이 있으면 최우선으로 앞에 배치</li>
        <li>최종 결과 반환</li>
      </ol>
      <p>즉, 이 함수는 <strong>잘 찾는 것</strong>, <strong>한쪽으로 쏠리지 않는 것</strong>, <strong>검색할수록 학습하는 것</strong>, <strong>사용자 교정을 우선 반영하는 것</strong>을 동시에 처리합니다.</p>

      <h4>Core Logic</h4>
      <pre><code>{`results = hybrid_search(query, top_k, mode)`}</code></pre>
      <p>초기 검색 단계입니다. 키워드, 의미, 관계 신호를 결합해 기본 후보를 가져옵니다.</p>
      <pre><code>{`if _is_patch_saturated(results):
    alt = hybrid_search(query, excluded_project=_dominant(results))
    results = results[:top_k//2] + alt[:top_k//2]`}</code></pre>
      <p>결과가 같은 프로젝트에 과도하게 몰리면, 지배적인 프로젝트를 제외한 대체 검색을 다시 수행해 결과를 절반씩 섞습니다. 핵심은 정확도만이 아니라 <strong>탐색 다양성</strong>도 유지한다는 점입니다.</p>
      <pre><code>{`post_search_learn(results, query)`}</code></pre>
      <p>검색 후 학습 단계입니다. 이번에 함께 호출된 기억들을 바탕으로 그래프 연결을 갱신합니다. 즉, recall은 검색으로 끝나지 않고 <strong>검색 결과가 다시 메모리 구조를 학습</strong>하게 만듭니다.</p>
      <pre><code>{`if not type_filter:
    corrections = hybrid_search(query, type_filter="Correction")
    results = (corrections + results)[:top_k]`}</code></pre>
      <p>사용자 교정 기록이 있으면 일반 검색 결과보다 앞에 둡니다. 이 구조는 모델의 일반 추론보다 <strong>사용자의 명시적 수정 이력을 더 높은 우선순위</strong>로 두기 위한 설계입니다.</p>

      <h4>Why This Design</h4>
      <p>단순 검색만으로는 두 가지 문제가 생깁니다.</p>
      <ul>
        <li>같은 프로젝트/같은 패턴으로 결과가 반복되는 <strong>patch saturation</strong></li>
        <li>사용자가 이미 수정한 사실보다 일반 검색 결과가 앞서는 <strong>교정 무시</strong></li>
      </ul>
      <p>이 함수는 그 두 문제를 직접 다룹니다. 결과가 한 패치에 몰리면 다른 프로젝트 결과를 강제로 섞어 탐색 범위를 넓히고, Correction 타입을 최상위에 두어 사용자의 수정 이력을 항상 우선 반영합니다.</p>

      <h4>Intended System Behavior</h4>
      <ol>
        <li><strong>Hybrid retrieval improves recall quality</strong> — 키워드, 의미, 관계를 함께 사용해 단일 검색 방식보다 더 안정적으로 관련 기억을 찾습니다.</li>
        <li><strong>Patch saturation is actively corrected</strong> — 같은 프로젝트 결과만 반복되면 다른 프로젝트 결과를 섞어 검색 편향을 줄입니다.</li>
        <li><strong>Retrieval also updates memory structure</strong> — 검색 결과는 <code>post_search_learn()</code>으로 다시 그래프 학습에 반영됩니다.</li>
        <li><strong>User corrections override generic recall</strong> — 사용자 교정 기록은 일반 검색 결과보다 먼저 배치되어, 모델보다 사용자의 수정 이력이 우선합니다.</li>
      </ol>
    </>
  ),
  "storage/hybrid.py — UCB Traverse": (
    <>
      <p>이 함수는 seed 노드에서 시작해, 그래프 안에서 <strong>강한 연결은 우선 활용하고 아직 덜 본 노드는 탐색하는 방식</strong>으로 주변 노드를 확장합니다.</p>
      <p>핵심 점수식은 다음과 같습니다.</p>
      <pre><code>{`Score = w_ij + c · √(ln(N_i + 1) / (N_j + 1))`}</code></pre>
      <table>
        <tbody>
          <tr><td><code>w_ij</code></td><td>현재 노드와 이웃 노드 사이의 연결 강도</td></tr>
          <tr><td><code>N_i</code></td><td>현재 노드의 방문 횟수</td></tr>
          <tr><td><code>N_j</code></td><td>이웃 노드의 방문 횟수</td></tr>
          <tr><td><code>c</code></td><td>탐색 성향 계수 — <code>focus=0.3</code> (강한 경로 중심) / <code>dmn=2.5</code> (넓게 탐색)</td></tr>
        </tbody>
      </table>
      <p>즉, 이 규칙은 <strong>이미 강한 관계를 따라가되, 너무 익숙한 경로에만 갇히지 않도록 새로운 후보도 함께 열어두는 탐색 방식</strong>입니다.</p>

      <h4>What the Code Does</h4>
      <ol>
        <li>seed 노드들을 시작점으로 설정</li>
        <li>현재 frontier의 이웃 노드들을 후보로 수집</li>
        <li>연결 강도와 방문 횟수를 조합해 UCB 점수 계산</li>
        <li>상위 20개 후보만 다음 frontier로 선택</li>
        <li>이 과정을 <code>depth</code>만큼 반복</li>
        <li>seed를 제외한 새로 확장된 노드 집합 반환</li>
      </ol>
      <p>즉, 이 함수는 단순 BFS가 아니라 <strong>관계 강도와 탐색 다양성을 함께 고려하는 제한적 그래프 확장</strong>입니다.</p>

      <h4>Core Logic</h4>
      <pre><code>{`candidates.append((w + c * sqrt(log(n_i+1)/(n_j+1)), nbr))`}</code></pre>
      <p>각 이웃 노드의 <strong>확장 우선순위 점수</strong>를 계산합니다.</p>
      <ul>
        <li><code>w</code> — 연결 강도. 값이 클수록 이미 의미 있는 관계</li>
        <li><code>c</code> — 탐색 계수. 작으면 강한 경로 신뢰, 크면 덜 본 노드 적극 탐색</li>
        <li><code>log(n_i+1)</code> — 현재 노드가 많이 참조된 중심점일수록 주변 탐색 이유가 커짐</li>
        <li><code>(n_j+1)</code> — 아직 덜 방문한 노드일수록 점수가 높아짐</li>
        <li><code>sqrt(...)</code> — UCB 탐색 보너스. 덜 본 노드일수록 높아지고, 자주 본 노드는 줄어듦</li>
      </ul>
      <pre><code>{`frontier = {n for _, n in sorted(candidates, reverse=True)[:20]}`}</code></pre>
      <p>매 단계에서 점수가 높은 후보 20개만 남겨 다음 frontier로 넘깁니다. 확장을 무한정 늘리지 않고 <strong>상위 후보만 제한적으로 유지</strong>합니다.</p>
      <pre><code>{`return visited - set(seeds)`}</code></pre>
      <p>처음 seed를 제외하고, 탐색 과정에서 새롭게 확장된 노드들만 반환합니다.</p>

      <h4>Why This Design</h4>
      <p>단순한 그래프 확장은 보통 두 가지 문제를 가집니다.</p>
      <ul>
        <li>연결 강한 허브만 계속 따라가며 <strong>익숙한 경로에 갇히는 문제</strong></li>
        <li>반대로 너무 무작위로 퍼져 <strong>관련성이 약해지는 문제</strong></li>
      </ul>
      <p>UCB 방식은 이 둘 사이 균형을 잡습니다. <code>w_ij</code>가 exploitation 역할을 맡아 이미 의미 있는 관계를 우선 활용하고, UCB 보너스가 exploration 역할을 맡아 아직 덜 방문한 후보를 일정 부분 밀어줍니다.</p>

      <h4>Intended System Behavior</h4>
      <ol>
        <li><strong>Strong paths are reused first</strong> — 이미 연결 강도가 높은 경로는 우선적으로 다시 확장됩니다.</li>
        <li><strong>Underexplored nodes are still discoverable</strong> — 방문 횟수가 적은 노드는 UCB 보너스를 받아 새로운 연결 후보로 올라올 수 있습니다.</li>
        <li><strong>Traversal style can be tuned by mode</strong> — <code>c</code> 값을 조절해 집중 탐색과 확산 탐색 사이를 전환할 수 있습니다.</li>
        <li><strong>Expansion remains bounded and efficient</strong> — 매 단계 상위 20개 후보만 유지하고 depth를 제한해, 탐색이 과도하게 퍼지지 않도록 설계했습니다.</li>
      </ol>
    </>
  ),
  "scripts/run-all-pipelines.py": (
    <>
      <p>이 함수는 전체 콘텐츠 생산 파이프라인의 <strong>실행 진입점</strong>입니다. 실행 환경을 먼저 정비한 뒤, Daily Post, YouTube, Twitter 세 개의 워크플로우를 순차적으로 돌리고 각 결과를 <code>results</code>에 기록합니다.</p>
      <p>핵심 역할은 단순 실행이 아니라, <strong>여러 소스와 여러 모델이 섞인 파이프라인을 하나의 메인 루프로 안정적으로 운영하는 것</strong>입니다.</p>

      <h4>What the Code Does</h4>
      <ol>
        <li>Chrome CDP 실행 환경 보장</li>
        <li>Git 최신 상태 동기화</li>
        <li>Daily Post 파이프라인 실행</li>
        <li>YouTube 분석 파이프라인 실행</li>
        <li>Twitter 분석 파이프라인 실행</li>
        <li>각 단계 결과를 <code>results</code>에 저장</li>
      </ol>
      <p>즉, 이 함수는 개별 분석 로직을 직접 처리하기보다, <strong>전체 자동화 워크플로우를 순서대로 호출하고 관리하는 오케스트레이션 레이어</strong>입니다.</p>

      <h4>Core Logic</h4>
      <pre><code>{`ensure_cdp_chrome()`}</code></pre>
      <p>Chrome CDP 환경을 먼저 보장합니다. Twitter 파이프라인처럼 브라우저 제어가 필요한 작업이 안정적으로 실행되도록 사전 조건을 맞추는 단계입니다.</p>
      <pre><code>{`os.system("git pull --rebase origin master")`}</code></pre>
      <p>실행 전 최신 코드와 상태를 먼저 동기화합니다. 즉, 로컬 기준이 아니라 <strong>원격 저장소 기준의 최신 파이프라인 상태</strong>에서 작업을 시작하게 만듭니다.</p>
      <pre><code>{`results["daily"] = run_step(...)
results["youtube"] = run_step(...)
results["twitter"] = run_step(...)`}</code></pre>
      <p>각 작업은 <code>run_step()</code>으로 감싸 실행됩니다. 이 구조는 파이프라인 단위를 명확히 분리하고, 단계별 결과와 실패 여부를 독립적으로 관리하기 위한 설계입니다.</p>

      <h4>Why This Design</h4>
      <p>여러 데이터 소스와 여러 모델이 섞인 자동화 시스템에서는 개별 스크립트보다 <strong>실행 순서, 환경 보장, 단계 분리, 결과 기록</strong>이 더 중요해집니다.</p>
      <ul>
        <li>실행 전 환경을 먼저 맞추고</li>
        <li>단계별 작업을 독립적으로 호출하고</li>
        <li>긴 작업마다 다른 timeout을 주고</li>
        <li>결과를 한곳에 모아 관리</li>
      </ul>
      <p>즉, 이 함수는 분석 자체보다 <strong>파이프라인 운영의 안정성과 재실행 가능성</strong>을 확보하기 위한 메인 컨트롤러 역할을 합니다.</p>

      <h4>Pipeline Structure</h4>
      <ol>
        <li><strong>Daily Post</strong> — RSS / Reddit / HN 수집 후 Claude Sonnet으로 요약 및 정리</li>
        <li><strong>YouTube</strong> — <code>yt-dlp</code> → Groq Whisper → Codex → Claude → <code>gpt-4.1-mini</code>. 긴 영상을 추출, 전사, 구조화, 정제하는 다단계 파이프라인</li>
        <li><strong>Twitter</strong> — Chrome CDP 기반 수집 후 Codex 병렬 분석. 실시간성 높은 소셜 입력을 빠르게 구조화</li>
      </ol>

      <h4>Intended System Behavior</h4>
      <ol>
        <li><strong>Environment is prepared before execution</strong> — 브라우저와 코드 상태를 먼저 정비한 뒤 파이프라인을 시작합니다.</li>
        <li><strong>Each workflow is isolated as a step</strong> — Daily, YouTube, Twitter를 각각 독립된 실행 단위로 분리해 관리합니다.</li>
        <li><strong>Different pipelines can use different model chains</strong> — 각 워크플로우는 소스 특성에 맞는 모델 조합과 처리 체인을 가질 수 있습니다.</li>
        <li><strong>Results are collected into a single orchestration state</strong> — 모든 단계 결과를 <code>results</code>에 모아 이후 처리와 모니터링의 기준점으로 사용합니다.</li>
      </ol>
    </>
  ),
  ".claude/settings.json — Hook Gates": (
    <>
      <p>이 설정은 Claude Code의 훅을 이용해 <strong>중요 파일 변경과 세션 종료를 자동 감시하는 운영 규칙</strong>입니다. 핵심은 사용자의 기억에 의존하지 않고, 파일 변경과 세션 종료 시점에 필요한 행동을 시스템이 먼저 개입하도록 만드는 데 있습니다.</p>

      <h4>What the Config Does</h4>
      <ol>
        <li><code>Edit | Write</code> 이후 실행되는 <code>PostToolUse</code> 훅 감시</li>
        <li><code>STATE.md</code>, <code>CLAUDE.md</code>, <code>CHANGELOG.md</code> 변경 시 <code>/sync</code> 필요 알림</li>
        <li>세션 종료 시 로그 복사</li>
        <li>세션 종료 시 세션 상태 저장</li>
        <li><code>STATE.md</code>가 커밋되지 않았으면 종료 실패 처리</li>
      </ol>
      <p>즉, 이 구조는 <strong>작업 중 경고</strong>, <strong>종료 시 기록 보존</strong>, <strong>상태 파일 미커밋 방지</strong>를 자동화합니다.</p>

      <h4>Core Logic</h4>
      <pre><code>{`"PostToolUse": [{ "matcher": "Edit|Write" }]`}</code></pre>
      <p>파일 편집이나 쓰기 작업이 일어날 때마다 훅이 실행됩니다. 시스템은 사용자의 명시적 명령을 기다리지 않고 <strong>변경 이벤트 자체를 감시 기준</strong>으로 사용합니다.</p>
      <pre><code>{`"command": "if STATE.md|CLAUDE.md|CHANGELOG.md → '⚠️ 중요 파일 변경. /sync 권장'"`}</code></pre>
      <p>핵심 상태 파일이 바뀌면 즉시 <code>/sync</code> 필요성을 알립니다. 중요한 파일이 수정됐는데도 동기화를 놓치는 실수를 줄이기 위한 장치입니다.</p>
      <pre><code>{`"Stop": [
  { "command": "copy-session-log.py" },
  { "command": "save_session()" },
  { "command": "if STATE.md uncommitted → exit 1" }
]`}</code></pre>
      <p>세션이 끝날 때는 세 가지가 순서대로 실행됩니다.</p>
      <ul>
        <li><code>copy-session-log.py</code> — 세션 로그 보존</li>
        <li><code>save_session()</code> — 세션 상태 저장</li>
        <li><code>if STATE.md uncommitted → exit 1</code> — 상태 파일이 커밋되지 않았으면 종료 차단</li>
      </ul>

      <h4>Why This Design</h4>
      <p>세션 운영에서 가장 자주 생기는 문제는 두 가지입니다.</p>
      <ul>
        <li>중요한 파일을 수정했지만 동기화를 잊는 문제</li>
        <li>세션은 끝났는데 상태 파일이 저장·커밋되지 않은 문제</li>
      </ul>
      <p>이 설정은 그 문제를 사람의 기억이 아니라 <strong>이벤트 기반 훅</strong>으로 해결합니다. 규칙을 문서에 적어두는 데서 끝나지 않고, 실제 작업 흐름 안에서 자동으로 개입하도록 만든 구조입니다.</p>

      <h4>Intended System Behavior</h4>
      <ol>
        <li><strong>Important file changes are immediately surfaced</strong> — 상태 파일이나 규칙 파일이 바뀌면 바로 동기화 필요성을 드러냅니다.</li>
        <li><strong>Session-end always triggers record preservation</strong> — 세션 종료 시 로그 복사와 상태 저장이 자동으로 실행됩니다.</li>
        <li><strong>Uncommitted state is treated as a failure condition</strong> — <code>STATE.md</code>가 미커밋 상태면 정상 종료되지 않도록 막습니다.</li>
        <li><strong>Operational discipline is moved into the environment</strong> — 사용자가 기억해서 지키는 대신, 시스템이 작업 흐름 안에서 규율을 강제합니다.</li>
      </ol>
    </>
  ),
  "auto-iterate/src/measure.py": (
    <>
      <p>이 구조는 시스템 상태를 한 번에 보지 않고, <strong>인프라 → 설정 → 지식 → 파이프라인 → 성장</strong>의 다섯 레이어로 나눠 점검하는 health check 체계입니다.</p>
      <p>핵심은 단순히 "문제가 있는가"를 보는 것이 아니라, <strong>어느 레이어에서 운영 품질이 무너지는지 구분 가능하게 만드는 것</strong>입니다.</p>

      <h4>Layer Structure</h4>
      <p><strong>L1 — Infrastructure</strong></p>
      <ul>
        <li><code>check_claude_md_agents()</code> — 에이전트 파일 존재 여부</li>
        <li><code>check_security()</code> — <code>.env</code>, 키 파일 노출 스캔</li>
        <li><code>check_external()</code> — GitHub API, 포트폴리오 사이트 상태</li>
      </ul>
      <p><strong>L2 — Config Integrity</strong></p>
      <ul>
        <li><code>check_claude_md_projects()</code> — <code>CLAUDE.md</code>와 실제 폴더 구조 정합성</li>
        <li><code>check_rules_sync()</code> — 규칙 문서와 JSON 설정 동기화 여부</li>
      </ul>
      <p><strong>L3 — Knowledge</strong></p>
      <ul>
        <li><code>check_orphan_nodes()</code> — 연결 없는 노드 비율</li>
        <li><code>check_broken_edges()</code> — 삭제된 노드를 가리키는 엣지</li>
        <li><code>check_session_freshness()</code> — 마지막 세션 저장 경과일</li>
      </ul>
      <p><strong>L4 — Pipeline</strong></p>
      <ul>
        <li><code>check_living_docs()</code> — <code>STATE.md</code>, <code>CHANGELOG.md</code> 존재 및 최신성</li>
        <li><code>check_pipeline_freshness()</code> — ACTIVE 파이프라인 정체 여부</li>
      </ul>
      <p><strong>L5 — Growth</strong></p>
      <ul>
        <li><code>check_test_suites()</code> — <code>pytest</code>, <code>validate_pipeline.py</code> 통과 여부</li>
        <li><code>check_weekly_delta()</code> — 최근 7일 기준 점수 변화</li>
      </ul>

      <h4>Why This Design</h4>
      <p>운영 시스템의 문제는 한 군데에서만 생기지 않습니다. 파일은 멀쩡하지만 설정이 어긋날 수 있고, 설정은 맞아도 지식 그래프가 손상될 수 있으며, 모든 것이 정상처럼 보여도 파이프라인이 실제로 멈춰 있을 수 있습니다.</p>
      <p>이 구조는 그런 문제를 하나의 체크리스트로 뭉개지 않고, <strong>문제가 발생한 층위를 분리해서 진단할 수 있게 만드는 설계</strong>입니다.</p>

      <h4>Intended System Behavior</h4>
      <ol>
        <li><strong>Failures are localized by layer</strong> — 문제가 생겨도 어느 층에서 발생했는지 바로 구분할 수 있습니다.</li>
        <li><strong>Static config and live operation are checked separately</strong> — 설정 정합성과 실제 운영 상태를 분리해 점검합니다.</li>
        <li><strong>Knowledge quality is treated as a measurable system asset</strong> — 그래프 구조와 세션 신선도도 운영 건강도의 일부로 측정합니다.</li>
        <li><strong>Growth is monitored, not assumed</strong> — 현재 정상 여부뿐 아니라 최근 7일 변화까지 포함해 개선 추세를 확인합니다.</li>
      </ol>
    </>
  ),
};

function CodeLightbox({ label, code, onClose }: { label: string; code: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
  const explanation = CODE_EXPLANATIONS[label];
  return (
    <div className="wd-code-lightbox-overlay" onClick={onClose}>
      <div className="wd-code-lightbox" onClick={(e) => e.stopPropagation()}>
        <button className="wd-code-lightbox-close" onClick={onClose}>✕</button>
        <div className="wd-code-lightbox-label">{label}</div>
        <pre><code>{highlightPython(code)}</code></pre>
        {explanation && <div className="wd-code-lightbox-body">{explanation}</div>}
      </div>
    </div>
  );
}

function E({ id, type, children }: { id: string; type: string; children: React.ReactNode }) {
  return <EditableBlock id={id} type={type}>{children}</EditableBlock>;
}

function renderSingleBlock(block: Block, idx: number, activeWork: string, parentId: string, reverse?: boolean) {
  const bid = (sub?: number) => sub != null ? `${parentId}-${sub}` : parentId;
  switch (block.type) {
    case 'section-title': {
      const anchorId = block.eyebrow ? `ey-${block.eyebrow.toLowerCase().replace(/[\s/&]+/g, '-').replace(/-+/g, '-')}` : undefined;
      return (
        <div key={idx} className="wd-section-header" id={anchorId}>
          <E id={`${bid()}-ey`} type="eyebrow">{block.eyebrow && <div className="wd-eyebrow">{block.eyebrow}</div>}</E>
          <E id={`${bid()}-ti`} type="title"><h3 className="wd-title">{block.title}</h3></E>
          {block.desc && <E id={`${bid()}-de`} type="lede"><p className="wd-lede">{renderBold(block.desc)}</p></E>}
        </div>
      );
    }
    case 'paragraph': {
      if (block.text.includes('[Cosmograph')) {
        return <CosmosShader key={idx} />;
      }
      if (block.text.includes('[triptych-5-6-7]')) {
        return <Triptych key={idx} />;
      }
      if (block.text.includes('[diptych-11-12]')) {
        return <Diptych key={idx} />;
      }
      if (block.text.includes('[failure-diptych]')) {
        return <FailureDiptych key={idx} />;
      }
      if (block.text.includes('[structure-diptych]')) {
        return <StructureDiptych key={idx} />;
      }
      if (block.text.includes('[context-diptych]')) {
        return <ContextDiptych key={idx} />;
      }
      const diagramMatch = block.text.match(/\[다이어그램\s*(\d+)/);
      if (diagramMatch) {
        const num = parseInt(diagramMatch[1], 10);
        if (activeWork === 'context-engineering') {
          if (num === 1) return <CEDiagram1 key={idx} />;
          if (num === 2) return <CEDiagram2 key={idx} />;
          if (num === 3) return <CEScaleDiptych key={idx} />;
          if (num === 4) return null;
          if (num === 5) return <CEDiagram5 key={idx} />;
          if (num === 55) return <CEFolderPath key={idx} />;
          if (num === 6) return <CEDiagram6 key={idx} />;
          if (num === 7) return <CEDiagram7 key={idx} />;
        } else if (activeWork === 'orchestration') {
          if (num === 1) return <ORCHNetworkDiptych key={idx} />;
          if (num === 2) return <ORCHDiagram2 key={idx} />;
          if (num === 3) return <ORCHKernelDiptych key={idx} />;
          if (num === 4) return null;
          if (num === 5) return <ORCHDiagram5 key={idx} />;
          if (num === 6) return <ORCHDiagram6 key={idx} />;
          if (num === 7) return <ORCHDiagram7 key={idx} />;
        } else if (activeWork === 'tech-review') {
          if (num === 1) return <TRDiagram1 key={idx} />;
          if (num === 2) return <TRDiagram2 key={idx} />;
          if (num === 3) return <TRInterpretationDiptych key={idx} />;
          if (num === 4) return null;
          if (num === 5) return <TRDiagram5 key={idx} />;
          if (num === 6) return <TRDiagram6 key={idx} />;
          if (num === 7) return <TRDiagram7 key={idx} />;
          if (num === 8) return <TRDiagram8 key={idx} />;
          if (num === 9) return <TRDiagram9 key={idx} />;
        } else {
          if (num === 1) return <Diagram1 key={idx} />;
          if (num === 2) return <Diagram2 key={idx} />;
          if (num === 3) return <Diagram3 key={idx} />;
          if (num === 4) return <Diagram4 key={idx} />;
          if (num === 5) return <Diagram5 key={idx} />;
          if (num === 6) return <Diagram6 key={idx} />;
          if (num === 7) return <Diagram7 key={idx} />;
          if (num === 8) return <Diagram8 key={idx} />;
          if (num === 9) return <Diagram9 key={idx} />;
          if (num === 10) return <Diagram10 key={idx} />;
          if (num === 11) return <Diagram11 key={idx} />;
          if (num === 12) return <Diagram12 key={idx} />;
          if (num === 13) return <Diagram13 key={idx} />;
          if (num === 14) return <Diagram14 key={idx} />;
          if (num === 15) return <Diagram15 key={idx} />;
          if (num === 16) return <Diagram16 key={idx} />;
        }
      }
      return <p key={idx} className="wd-paragraph">{renderBold(block.text)}</p>;
    }
    case 'heading':
      return <h3 key={idx} className="wd-heading">{block.text.replace(/^\d+[-\d]*\)\s*/, '')}</h3>;
    case 'cards':
      return (
        <div key={idx} className="wd-callouts">
          {block.items.map((card, ci) => (
            <E key={ci} id={`${bid()}-c${ci}`} type={`card-${ci + 1}`}>
              <div className="wd-callout">
                <div className="wd-callout-left">
                  <span className="wd-callout-num">{String(ci + 1).padStart(2, '0')}</span>
                  <span className="wd-callout-label">{card.title}</span>
                </div>
                <p className="wd-callout-body">{renderBold(card.body)}</p>
              </div>
            </E>
          ))}
        </div>
      );
    case 'image': {
      const s = resolveAssetSrc(block.src, activeWork);
      return (
        <figure key={idx} className="wd-figure">
          {isVideoSrc(s)
            ? <video src={s} controls playsInline className="wd-media" />
            : <img src={s} alt={block.caption ?? ''} loading="lazy" className="wd-media" />}
          {block.caption && <figcaption className="wd-caption">{block.caption}</figcaption>}
        </figure>
      );
    }
    case 'table':
      return (
        <div key={idx} className="wd-table-wrap">
          <table className="wd-table">
            <thead><tr>{block.headers.map((h, hi) => <th key={hi}>{h}</th>)}</tr></thead>
            <tbody>{block.rows.map((row, ri) => (
              <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{renderBold(cell)}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      );
    case 'quote-image': {
      const qiSrc = block.image ? resolveAssetSrc(block.image, activeWork) : '';
      return (
        <div key={idx} className={`wd-quote-image${reverse ? ' reverse' : ''}`}>
          <E id={`${bid()}-qt`} type="quote">
            <blockquote className="wd-qi-text">
              <p>"{renderBold(block.quote)}"</p>
              {block.attribution && <cite className="wd-qi-attr">— {block.attribution}</cite>}
            </blockquote>
          </E>
          {qiSrc && (
            <E id={`${bid()}-qi`} type="quote-img">
              <div className="wd-qi-img">
                {isVideoSrc(qiSrc)
                  ? <video src={qiSrc} autoPlay muted loop playsInline />
                  : <img src={qiSrc} alt="" loading="lazy" />}
              </div>
            </E>
          )}
        </div>
      );
    }
    case 'placeholder':
      return (
        <div key={idx} className="wd-placeholder-grid" style={{ marginTop: '24px', marginBottom: '24px' }}>
          {Array.from({ length: block.count }, (_, pi) => (
            <div key={pi} style={{ 
              border: '0.5px solid #e2e8f0', 
              background: '#f8fafc', 
              aspectRatio: '1.5', // Exactly matching 640/420
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              borderRadius: '1px',
              overflow: 'hidden',
              maxWidth: '640px',
              margin: '0 auto 16px'
            }}>
              {/* Blueprint Reference: Grid Dot Pattern */}
              <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.05 }}>
                <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="#475569" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dotPattern)" />
              </svg>

              {/* Precise Blueprint Guide Marks */}
              <div style={{ position: 'absolute', top: 12, left: 12, width: 12, height: 12, borderTop: '0.5px solid #94a3b8', borderLeft: '0.5px solid #94a3b8' }} />
              <div style={{ position: 'absolute', top: 12, right: 12, width: 12, height: 12, borderTop: '0.5px solid #94a3b8', borderRight: '0.5px solid #94a3b8' }} />
              <div style={{ position: 'absolute', bottom: 12, left: 12, width: 12, height: 12, borderBottom: '0.5px solid #94a3b8', borderLeft: '0.5px solid #94a3b8' }} />
              <div style={{ position: 'absolute', bottom: 12, right: 12, width: 12, height: 12, borderBottom: '0.5px solid #94a3b8', borderRight: '0.5px solid #94a3b8' }} />
              
              <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '8px', fontWeight: 800, color: '#94a3b8', letterSpacing: '0.2em', marginBottom: '6px' }}>TECHNICAL DRAFT</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#334155', letterSpacing: '-0.02em' }}>ASSET SPECIFICATION {pi + 1}</div>
                <div style={{ fontSize: '8px', color: '#94a3b8', marginTop: '6px', fontWeight: 600 }}>PENDING VISUAL INTEGRATION</div>
              </div>

              {/* Dimension Label (Blueprint style) */}
              <div style={{ position: 'absolute', bottom: 12, right: 30, fontSize: '7px', fontWeight: 700, color: '#cbd5e1' }}>REF: PSS_V1.0_640x420</div>
            </div>
          ))}
        </div>
      );
    case 'survey-viz':
      return <SurveyViz key={idx} />;
    case 'survey-table':
      return <SurveyTable key={idx} />;
    case 'visual-cues-gallery':
      return <VisualCuesGallery key={idx} />;
    case 'activity-gallery':
      return <ActivityGallery key={idx} />;
    case 'pmcc-flowchart':
      return <PmccFlowchart key={idx} />;
    case 'code-block':
      return <CodeBlockWithLightbox key={idx} label={block.label} code={block.code} />;
    case 'code-pair':
      return (
        <div key={idx} className="wd-code-pair">
          {block.blocks.map((cb, ci) => (
            <CodeBlockWithLightbox key={ci} label={cb.label} code={cb.code} />
          ))}
        </div>
      );
    default:
      return null;
  }
}

function getBlockType(item: Processed): string {
  if (item.kind !== 'block') return item.kind;
  return item.block.type;
}

export function WorkDetailBlocks({ blocks, activeWork }: { blocks: Block[]; activeWork: string }) {
  const processed = preprocessBlocks(blocks);
  let qiCount = 0;
  return (
    <>
      {processed.map((item, i) => {
        const id = String(i);

        // Divider before specific subsection headers
        const needsDivider = false;

        const wrap = (node: React.ReactNode) => (
          <EditableBlock key={`eb-${i}`} id={id} type={getBlockType(item)}>{node}</EditableBlock>
        );

        const divider = needsDivider ? <hr key={`hr-${i}`} className="wd-section-divider" /> : null;

        let content: React.ReactNode;
        switch (item.kind) {
          case 'carousel':
            if (activeWork === 'pmcc') {
              content = wrap(<GridScrubSlider key={`gs-${i}`} images={item.images} activeWork={activeWork} />);
            } else {
              content = wrap(<OntologyCarousel key={`car-${i}`} images={item.images} activeWork={activeWork} />);
            }
            break;
          case 'asistobe':
            content = wrap(<AsIsToBeTab key={`tab-${i}`} src={item.src} caption={item.caption} activeWork={activeWork} />);
            break;
          case 'image-grid':
            content = wrap(
              <div key={`grid-${i}`} className={`wd-image-grid cols-${Math.min(item.images.length, 3)}`}>
                {item.images.map((img, gi) => {
                  const s = resolveAssetSrc(img.src, activeWork);
                  return (
                    <E key={gi} id={`${id}-g${gi}`} type="grid-img">
                      <figure className="wd-grid-item">
                        {isVideoSrc(s)
                          ? <video src={s} autoPlay muted loop playsInline />
                          : <img src={s} alt={img.caption ?? ''} loading="lazy" />}
                        {img.caption && <figcaption>{img.caption}</figcaption>}
                      </figure>
                    </E>
                  );
                })}
              </div>
            );
            break;
          default: {
            const isQI = item.block.type === 'quote-image';
            const reverse = isQI && qiCount % 2 === 1;
            if (isQI) qiCount++;
            content = wrap(renderSingleBlock(item.block, i, activeWork, id, reverse));
          }
        }

        return divider ? <>{divider}{content}</> : content;
      })}
    </>
  );
}
