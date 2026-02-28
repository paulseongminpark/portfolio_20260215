import { useEffect, useRef, useState } from 'react';

const F = "'Inter', 'Noto Sans KR', sans-serif";

const DIST = [
  { score: 5, count: 26, pct: 68, label: '다시 오고 싶다' },
  { score: 4, count: 10, pct: 26, label: '좋았다' },
  { score: 3, count: 2,  pct: 5,  label: '보통' },
  { score: 2, count: 0,  pct: 0,  label: '' },
  { score: 1, count: 0,  pct: 0,  label: '' },
];

const QUOTES = [
  {
    text: "커피를 마시는 시간에 다양한 사람들의 각자의 삶과 그에 대한 태도를 듣는 시간이 넘 유익했습니다. 지루한 삶에 활기를 넣어주는 시간이었습니다. / 일요일 아침에 뛰는 상쾌함을 함께하는 사람들과 공유할 수 있음에 대한 행복, {{o:다양한 분야의 사람들과 대화하며 오가는 간접경험}}이 좋았습니다.",
    signal: "대화의 밀도 · 연결감",
  },
];

function renderHighlight(text: string) {
  const parts = text.split(/(\{\{o:.+?\}\}|\{\{b:.+?\}\})/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith('{{o:') && part.endsWith('}}')) {
      return <mark key={i} className="wd-hl-orange">{part.slice(4, -2)}</mark>;
    }
    if (part.startsWith('{{b:') && part.endsWith('}}')) {
      return <mark key={i} className="wd-hl-blue">{part.slice(4, -2)}</mark>;
    }
    return part;
  });
}

function useCountUp(target: number, visible: boolean, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return val;
}

export function SurveyViz() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c94 = useCountUp(94, visible, 1000);
  const c43 = useCountUp(43, visible, 800);

  return (
    <div ref={ref} style={{ fontFamily: F, marginTop: 10, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>

      {/* 분포 */}
      <div style={{ marginBottom: 28 }}>

        {/* 요약 수치 — 분포 위 */}
        <div style={{
          display: 'flex', gap: 32, marginBottom: 20, paddingBottom: 16,
          borderBottom: '1px solid #eee',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.6s ease 100ms',
        }}>
          {[
            { num: `${c94}%`, label: '4-5점 응답' },
            { num: `N=${c43}`, label: '총 응답' },
            { num: '0명', label: '1-2점 이탈 의향' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#111', letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums' }}>
                {num}
              </div>
              <div style={{ fontSize: 11, color: '#999', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* 분포 바 */}
        <p style={{ fontSize: 11, fontWeight: 600, color: '#999', marginBottom: 14,
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          재참여 의향 분포 — Likert 1–5
        </p>
        {DIST.map(({ score, count, pct, label }, i) => (
          <div key={score} style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10,
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(6px)',
            transition: `opacity 0.4s ease ${i * 80 + 200}ms, transform 0.4s ease ${i * 80 + 200}ms`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#555', width: 14, textAlign: 'right' }}>{score}</span>
            <div style={{ flex: 1, background: '#eee', borderRadius: 3, height: 8, overflow: 'hidden' }}>
              <div style={{
                width: visible ? `${pct}%` : '0%', height: '100%', borderRadius: 3,
                background: score === 5 ? '#111' : score === 4 ? '#444' : score === 3 ? '#bbb' : '#eee',
                transition: `width 0.8s cubic-bezier(0.4,0,0.2,1) ${i * 80 + 300}ms`,
              }} />
            </div>
            <span style={{ fontSize: 12, color: '#888', width: 60, whiteSpace: 'nowrap' }}>
              {count > 0 ? `${count}명 · ${pct}%` : '—'}
            </span>
            {label && count > 0 && <span style={{ fontSize: 11, color: '#bbb' }}>{label}</span>}
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div style={{
        padding: '16px 18px', background: '#f9f7f5', borderRadius: 8,
        borderLeft: '3px solid #D4632D', marginBottom: 14,
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(8px)',
        transition: 'opacity 0.5s ease 700ms, transform 0.5s ease 700ms',
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#D4632D', marginBottom: 8,
          textTransform: 'uppercase', letterSpacing: '0.1em' }}>Key Insight</p>
        <p style={{ fontSize: 17, color: '#333', lineHeight: 1.85, margin: 0 }}>
          재참여 의향이 높은 응답에서 <mark className="wd-hl-blue">"편안함·연결감·대화의 밀도"</mark> 키워드가
          함께 강화되는 패턴이 반복됐습니다. 핵심 성과는 운동 만족도가 아니라{' '}
          <mark className="wd-hl-orange">안전감의 형성 → 리텐션</mark>이었습니다.
        </p>
      </div>

      {/* Quotes */}
      {QUOTES.map((q, i) => (
        <div key={i} style={{
          padding: '14px 18px', background: '#fff', borderRadius: 8,
          border: '1px solid #eee', marginBottom: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(8px)',
          transition: `opacity 0.5s ease ${820 + i * 120}ms, transform 0.5s ease ${820 + i * 120}ms`,
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#999', marginBottom: 6,
            textTransform: 'uppercase', letterSpacing: '0.08em' }}>{q.signal}</p>
          <p style={{ fontSize: 17, color: '#555', lineHeight: 1.85, fontStyle: 'italic', margin: 0 }}>
            "{renderHighlight(q.text)}"
          </p>
        </div>
      ))}

    </div>
  );
}
