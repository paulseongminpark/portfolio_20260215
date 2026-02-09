import { useState, useEffect } from 'react';

export function useActiveSection() {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('.section[id]'));

    const setLastIfAtBottom = () => {
      const sections = getSections();
      if (sections.length === 0) return;

      const doc = document.documentElement;
      const atBottom =
        Math.ceil(window.scrollY + window.innerHeight) >= doc.scrollHeight - 2;

      if (atBottom) {
        setActiveId(sections[sections.length - 1].id);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // 화면 상단 기준(탭 아래 기준점 200px)에 가장 가까운 섹션을 active로
          const topEntry = visible.reduce((closest, entry) => {
            const entryTop = entry.boundingClientRect.top;
            const closestTop = closest.boundingClientRect.top;
            return Math.abs(entryTop - 200) < Math.abs(closestTop - 200) ? entry : closest;
          });
          setActiveId((topEntry.target as HTMLElement).id);
        } else {
          // 교차가 없을 때(특히 바닥 근처) 마지막 섹션 보정
          setLastIfAtBottom();
        }
      },
      {
        // 작은 뷰포트에서도 마지막 섹션이 잡히도록 bottom rootMargin을 덜 공격적으로
        rootMargin: '-120px 0px -40% 0px',
        threshold: [0, 0.15, 0.35, 0.55, 0.75, 1],
      }
    );

    const sections = getSections();
    sections.forEach((s) => observer.observe(s));

    // 스크롤이 바닥에 닿는 순간 마지막 섹션으로 강제 보정
    const onScroll = () => setLastIfAtBottom();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return activeId;
}
