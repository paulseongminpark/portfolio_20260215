import { useState, useRef, useEffect } from 'react';
import { type Block } from '../parseWorkDetail';
import { SurveyViz } from './SurveyViz';
import { SurveyTable } from './SurveyTable';
import { VisualCuesGallery } from './VisualCuesGallery';
import { ActivityGallery } from './ActivityGallery';
import { EditableBlock } from './EditableBlock';
import { GridScrubSlider } from './GridScrubSlider';

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
    activeWork === 'empty-house' ? 'empty-house-cps'
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

const isOntology = (s: string) =>
  /ontology_/i.test(s) ||
  /pmcc_hyrox_web/i.test(s) ||
  /pmcc_jujitsu_web/i.test(s) ||
  /pmcc_yoga_web/i.test(s) ||
  /pmcc_crossfit_web/i.test(s) ||
  /pmcc volunteer/i.test(s) ||
  /pmcc_insta/i.test(s);
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
    if (b.type === 'image' && isOntology(b.src)) {
      const imgs: ImageRef[] = [];
      while (
        i < blocks.length &&
        blocks[i].type === 'image' &&
        isOntology((blocks[i] as Block & { type: 'image' }).src)
      ) {
        const img = blocks[i] as Block & { type: 'image' };
        imgs.push({ src: img.src, caption: img.caption });
        i++;
      }
      out.push({ kind: 'carousel', images: imgs });
      continue;
    }
    if (b.type === 'image' && isAsIsToBe(b.src)) {
      const img = b as Block & { type: 'image' };
      out.push({ kind: 'asistobe', src: img.src, caption: img.caption });
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

function E({ id, type, children }: { id: string; type: string; children: React.ReactNode }) {
  return <EditableBlock id={id} type={type}>{children}</EditableBlock>;
}

function renderSingleBlock(block: Block, idx: number, activeWork: string, parentId: string, reverse?: boolean) {
  const bid = (sub?: number) => sub != null ? `${parentId}-${sub}` : parentId;
  switch (block.type) {
    case 'section-title':
      return (
        <div key={idx} className="wd-section-header">
          <E id={`${bid()}-ey`} type="eyebrow">{block.eyebrow && <div className="wd-eyebrow">{block.eyebrow}</div>}</E>
          <E id={`${bid()}-ti`} type="title"><h3 className="wd-title">{block.title}</h3></E>
          {block.desc && <E id={`${bid()}-de`} type="lede"><p className="wd-lede">{renderBold(block.desc)}</p></E>}
        </div>
      );
    case 'paragraph':
      return <p key={idx} className="wd-paragraph">{renderBold(block.text)}</p>;
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
        <div key={idx} className="wd-placeholder-grid">
          {Array.from({ length: block.count }, (_, pi) => (
            <div key={pi} className="wd-placeholder-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span>Image {pi + 1}</span>
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
        const isSectionTitle = item.kind === 'block' && item.block.type === 'section-title';
        const eyebrow = isSectionTitle ? (item.block as { eyebrow: string }).eyebrow : '';
        const DIVIDER_BEFORE = ['GALLERY', 'GROWTH & METRICS'];
        const needsDivider = isSectionTitle && DIVIDER_BEFORE.includes(eyebrow);

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
