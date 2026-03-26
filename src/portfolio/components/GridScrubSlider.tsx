import { useState, useRef, useEffect, useCallback } from 'react';

interface ImageRef { src: string; caption?: string }

function isVideo(src: string) { return src.endsWith('.mp4') || src.endsWith('.webm'); }

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

function Media({ src, onClick, activeWork }: { src: string, onClick?: () => void, activeWork: string }) {
  const resolved = resolveAssetSrc(src, activeWork);
  const commonStyle: React.CSSProperties = { 
    width: '100%', height: '100%', objectFit: 'cover', 
    cursor: 'zoom-in',
    display: 'block'
  };
  if (isVideo(resolved)) {
    return <video src={resolved} autoPlay muted loop playsInline style={commonStyle} onClick={onClick} />;
  }
  return <img src={resolved} style={commonStyle} onClick={onClick} alt="" />;
}

export function GridScrubSlider({ images, activeWork }: { images: ImageRef[], activeWork: string }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const ITEM_H = 420;
  const DURATION = 45;

  const bandRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const lastPct = useRef(0);
  const dragging = useRef(false);

  const renderStrip = () => images.map((img, i) => (
    <div key={i} style={{ height: ITEM_H, aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: '#f5f5f5', flexShrink: 0 }}>
      <Media src={img.src} activeWork={activeWork} onClick={() => setLightboxIdx(i)} />
    </div>
  ));

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

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    scrubTo(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => { if (dragging.current) scrubTo(e.clientX); };
  const onPointerUp = () => { dragging.current = false; resumeFromPct(lastPct.current); };

  useEffect(() => {
    resumeFromPct(0);
  }, []);

  const [lbVisible, setLbVisible] = useState(false);
  const lbOpen = lightboxIdx !== null;

  useEffect(() => {
    if (lbOpen) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${sw}px`;
      requestAnimationFrame(() => setLbVisible(true));
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [lbOpen]);

  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') setLightboxIdx(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
      if (e.key === 'ArrowRight') setLightboxIdx(prev => prev !== null ? (prev + 1) % images.length : null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const closeLightbox = useCallback(() => {
    setLbVisible(false);
    setTimeout(() => setLightboxIdx(null), 250);
  }, []);

  const navLightbox = useCallback((dir: -1 | 1) => {
    setLightboxIdx(prev => prev !== null ? (prev + dir + images.length) % images.length : null);
  }, [images.length]);

  const lbSrc = lightboxIdx !== null ? resolveAssetSrc(images[lightboxIdx].src, activeWork) : '';

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none', maxWidth: 1200, margin: '40px auto' }}>
      {/* ── Viewport ── */}
      <div style={{ overflow: 'hidden', borderRadius: 12, cursor: 'default' }}>
        <div
          ref={bandRef}
          style={{ display: 'flex', gap: 16, width: 'max-content', willChange: 'transform' }}
        >
          {renderStrip()}
          {renderStrip()}
        </div>
      </div>

      {/* ── Scrub Bar ── */}
      <div 
        ref={scrubRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ marginTop: 24, padding: '16px 0', cursor: 'pointer', touchAction: 'none' }}
      >
        <div style={{ height: 2, background: '#e8e4de', borderRadius: 1, overflow: 'hidden', pointerEvents: 'none' }}>
          <div 
            ref={barFillRef}
            style={{ height: '100%', background: '#aaa', borderRadius: 1 }}
          />
        </div>
      </div>

      {/* ── Lightbox (VCG-style) ── */}
      {lbOpen && (
        <div
          className={`vcg-lightbox${lbVisible ? ' vcg-lightbox--visible' : ''}`}
          onClick={closeLightbox}
        >
          {images.length > 1 && (
            <button
              className="vcg-lb-nav vcg-lb-nav--prev"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); navLightbox(-1); }}
            >
              &#8249;
            </button>
          )}
          {isVideo(lbSrc)
            ? <video src={lbSrc} controls autoPlay muted loop playsInline className="vcg-lightbox-img" onClick={(e) => e.stopPropagation()} />
            : <img src={lbSrc} alt="" className="vcg-lightbox-img" onClick={(e) => e.stopPropagation()} />
          }
          {images.length > 1 && (
            <button
              className="vcg-lb-nav vcg-lb-nav--next"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); navLightbox(1); }}
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </div>
  );
}
