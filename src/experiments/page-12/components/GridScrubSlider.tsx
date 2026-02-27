import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageRef { src: string; caption?: string }

function isVideo(src: string) { return src.endsWith('.mp4') || src.endsWith('.webm'); }

function resolveAssetSrc(raw: string, activeWork: string) {
  let s = (raw ?? '').trim();
  if (!s) return '';
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  if (s.startsWith('public/')) s = s.slice('public/'.length);
  if (s.startsWith('/work/')) return s;
  if (s.startsWith('work/')) return `/${s}`;
  if (s.startsWith('/')) return s;
  const base = s.split(/[/\\]/).pop() ?? s;
  const folder =
    activeWork === 'empty-house' ? 'empty-house-cps'
    : activeWork === 'skin-diary' ? 'skin-diary-ai'
    : 'pmcc';
  return `/work/${folder}/${base}`;
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

  const itemsPerPage = 4;
  const pagesCount = Math.ceil(images.length / itemsPerPage);
  const DURATION = 45;

  const bandRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const lastPct = useRef(0);
  const dragging = useRef(false);

  const renderPages = () => {
    const pages = [];
    for (let i = 0; i < pagesCount; i++) {
      pages.push(images.slice(i * itemsPerPage, (i + 1) * itemsPerPage));
    }
    return pages.map((pageItems, pIdx) => (
      <div key={pIdx} style={{ width: 'clamp(320px, 90vw, 860px)', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16, aspectRatio: '1', flexShrink: 0, paddingRight: 16, boxSizing: 'border-box' }}>
        {pageItems.map((img: any, i: number) => {
          const globalIdx = pIdx * itemsPerPage + i;
          return (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden', background: '#f5f5f5' }}>
              <Media src={img.src} activeWork={activeWork} onClick={() => setLightboxIdx(globalIdx)} />
            </div>
          );
        })}
        {pageItems.length < 4 && Array.from({ length: 4 - pageItems.length }).map((_, i) => (
          <div key={`empty-${i}`} style={{ borderRadius: 12, background: '#fafafa' }} />
        ))}
      </div>
    ));
  };

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

  // Lightbox Navigation
  const nextMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % images.length);
  };
  const prevMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightboxIdx(prev => prev !== null ? (prev + 1) % images.length : null);
      if (e.key === 'ArrowLeft') setLightboxIdx(prev => prev !== null ? (prev - 1 + images.length) % images.length : null);
      if (e.key === 'Escape') setLightboxIdx(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, images.length]);

  const activeMedia = lightboxIdx !== null ? resolveAssetSrc(images[lightboxIdx].src, activeWork) : null;

  return (
    <div style={{ position: 'relative', width: '100%', userSelect: 'none', maxWidth: 860, margin: '40px auto' }}>
      {/* ── Viewport ── */}
      <div style={{ overflow: 'hidden', borderRadius: 12, cursor: 'default' }}>
        <div 
          ref={bandRef} 
          style={{ display: 'flex', width: 'max-content', willChange: 'transform' }}
        >
          {renderPages()}
          {renderPages()}
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

      {/* ── Lightbox with Navigation ── */}
      <AnimatePresence>
        {lightboxIdx !== null && activeMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIdx(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 2000,
              background: 'rgba(0,0,0,0.95)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', padding: 40, cursor: 'zoom-out'
            }}
          >
            {/* Prev Button */}
            <button 
              onClick={prevMedia}
              style={{ position: 'absolute', left: 24, zIndex: 2001, background: 'none', border: 'none', color: '#fff', fontSize: 40, cursor: 'pointer', opacity: 0.5 }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              ‹
            </button>

            <motion.div
              key={activeMedia}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ maxWidth: '100%', maxHeight: '100%', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo(activeMedia) ? (
                <video src={activeMedia} controls autoPlay style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: 8 }} />
              ) : (
                <img src={activeMedia} style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: 8, objectFit: 'contain' }} alt="" />
              )}
            </motion.div>

            {/* Next Button */}
            <button 
              onClick={nextMedia}
              style={{ position: 'absolute', right: 24, zIndex: 2001, background: 'none', border: 'none', color: '#fff', fontSize: 40, cursor: 'pointer', opacity: 0.5 }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
            >
              ›
            </button>

            {/* Close Button */}
            <button 
              onClick={() => setLightboxIdx(null)}
              style={{ position: 'absolute', top: 24, right: 24, background: 'none', border: 'none', color: '#fff', fontSize: 32, cursor: 'pointer' }}
            >
              ×
            </button>

            {/* Image Counter */}
            <div style={{ position: 'absolute', bottom: 24, color: '#fff', fontSize: 13, fontFamily: "'Inter', sans-serif", opacity: 0.6 }}>
              {lightboxIdx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
