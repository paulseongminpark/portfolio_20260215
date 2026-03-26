import { useState, useEffect, useCallback } from 'react';

const P = `${import.meta.env.BASE_URL}work/pmcc`;
const F = "'Inter', 'Noto Sans KR', sans-serif";

/* Lightbox image sizing: images 1,2 = full, images 8,9 = half */
const LIGHTBOX_FULL = ['visual cues 1.webp', 'visual cues 2.webp', 'visual cues color palette combined.webp'];

function Lightbox({
  images,
  index,
  onClose,
  onNav,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNav: (dir: -1 | 1) => void;
}) {
  const [visible, setVisible] = useState(false);
  const open = images.length > 0;

  useEffect(() => {
    if (open) {
      const sw = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${sw}px`;
      requestAnimationFrame(() => setVisible(true));
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onNav(-1);
      if (e.key === 'ArrowRight') onNav(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 250);
  }, [onClose]);

  if (!open) return null;

  const hasPrev = images.length > 1;
  const hasNext = images.length > 1;
  const src = images[index];
  const isFull = LIGHTBOX_FULL.some((name) => src.endsWith(name));

  return (
    <div
      className={`vcg-lightbox${visible ? ' vcg-lightbox--visible' : ''}`}
      onClick={handleClose}
    >
      {hasPrev && (
        <button
          className="vcg-lb-nav vcg-lb-nav--prev"
          aria-label="Previous image"
          onClick={(e) => { e.stopPropagation(); onNav(-1); }}
        >
          &#8249;
        </button>
      )}
      <img
        src={src}
        alt=""
        className={`vcg-lightbox-img${isFull ? '' : ' vcg-lightbox-img--half'}`}
        onClick={(e) => e.stopPropagation()}
      />
      {hasNext && (
        <button
          className="vcg-lb-nav vcg-lb-nav--next"
          aria-label="Next image"
          onClick={(e) => { e.stopPropagation(); onNav(1); }}
        >
          &#8250;
        </button>
      )}
    </div>
  );
}

function FadeSlot({
  sources,
  paused,
  onClickImage,
}: {
  sources: string[];
  paused?: boolean;
  onClickImage?: (src: string) => void;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    if (paused || sources.length < 2) return;
    const id = setInterval(() => setActiveIdx((v) => (v + 1) % sources.length), 3000);
    return () => clearInterval(id);
  }, [paused, sources.length]);

  return (
    <div className="vcg-fade-slot">
      {sources.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className={`vcg-fade-img${i === activeIdx ? ' visible' : ''}`}
          onClick={() => { if (i === activeIdx && onClickImage) onClickImage(src); }}
          style={{ cursor: i === activeIdx ? 'zoom-in' : undefined }}
        />
      ))}
    </div>
  );
}

export function VisualCuesGallery() {
  /* All lightbox images in unified order: 1 → 2 → 8 → 9 → palette */
  const allLbImages = [
    `${P}/visual cues 1.webp`,
    `${P}/visual cues 2.webp`,
    `${P}/visual cues 8 logo.webp`,
    `${P}/visual cues 9 logo.webp`,
    `${P}/visual cues color palette combined.webp`,
  ];

  const captions = [
    '비주얼 언어를 정의하는 과정 — 사진 원칙과 레퍼런스를 직접 정리했습니다.',
    '같은 철학을 색으로 풀어냈습니다. 자연의 따뜻함에서 출발해, 역동성과 에너지를 더하고, 최종 팔레트로 수렴했습니다.',
  ];

  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [captionIdx, setCaptionIdx] = useState(0);
  const paused = lbOpen;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setCaptionIdx((v) => (v + 1) % captions.length), 3000);
    return () => clearInterval(id);
  }, [paused]);

  const openLightbox = (src: string) => {
    const idx = allLbImages.indexOf(src);
    setLbIndex(idx >= 0 ? idx : 0);
    setLbOpen(true);
  };

  const closeLightbox = () => {
    setLbOpen(false);
    setLbIndex(0);
  };

  const navLightbox = (dir: -1 | 1) => {
    setLbIndex((i) => (i + dir + allLbImages.length) % allLbImages.length);
  };

  return (
    <div className="vcg">
      <Lightbox
        images={lbOpen ? allLbImages : []}
        index={lbIndex}
        onClose={closeLightbox}
        onNav={navLightbox}
      />

      {/* Slots: slot1 = photos 1↔2, slot2 = logo 8↔9↔palette */}
      <div className="vcg-fade-row">
        <FadeSlot
          sources={[`${P}/visual cues 1.webp`, `${P}/visual cues 2.webp`]}
          paused={paused}
          onClickImage={openLightbox}
        />
        <FadeSlot
          sources={[`${P}/visual cues 8 logo.webp`, `${P}/visual cues 9 logo.webp`, `${P}/visual cues color palette combined.webp`]}
          paused={paused}
          onClickImage={openLightbox}
        />
      </div>

      {/* Caption — fades in sync with slots */}
      <div className="vcg-caption-fade">
        {captions.map((text, i) => (
          <p key={i} className={`vcg-caption-center${i === captionIdx ? ' visible' : ''}`} style={{ fontFamily: F }}>
            {text}
          </p>
        ))}
      </div>

    </div>
  );
}
