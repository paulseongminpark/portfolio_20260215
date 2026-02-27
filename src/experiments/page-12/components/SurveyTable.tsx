import { useState, useEffect } from 'react';

const F = "'Inter', 'Noto Sans KR', sans-serif";
const PAGE_SIZE = 8;

function parseCSV(text: string): string[][] {
  const clean = text.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuote = false;

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (inQuote) {
      if (ch === '"' && clean[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuote = false; }
      else { field += ch; }
    } else {
      if (ch === '"') { inQuote = true; }
      else if (ch === ',') { row.push(field.trim()); field = ''; }
      else if (ch === '\n') { row.push(field.trim()); rows.push(row); row = []; field = ''; }
      else if (ch === '\r') { /* skip */ }
      else { field += ch; }
    }
  }
  if (row.length > 0) { row.push(field.trim()); if (row.some(f => f)) rows.push(row); }
  return rows;
}

interface SurveyRow {
  id: number;
  rating: number;
  q1: string;
  q1sub: string;
  q21: string;
  q3: string;
  source?: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ fontSize: 10, color: i < rating ? '#111' : '#ddd' }}>★</span>
      ))}
    </div>
  );
}

export function SurveyTable() {
  const [data, setData] = useState<SurveyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/work/pmcc/pmcc_survey.csv').then(r => r.text()),
      fetch('/work/pmcc/pmcc_survey2.csv').then(r => r.text()),
    ]).then(([text1, text2]) => {
      // Survey 1: rating=col5, q1=col3, q1sub=col4, q21=col6, q3=col9
      const rows1 = parseCSV(text1).slice(1).filter(r => r.length >= 4 && r.some(f => f));
      const parsed1 = rows1.map(r => ({
        rating: parseInt(r[5]) || 0,
        q1: r[3] || '',
        q1sub: r[4] || '',
        q21: r[6] || '',
        q3: r[9] || '',
        source: '1차 설문',
      }));

      // Survey 2: rating=col6, q1=col3, q1sub=col4+col5 합산, q21=col7
      const rows2 = parseCSV(text2).slice(1).filter(r => r.length >= 4 && r.some(f => f));
      const parsed2 = rows2.map(r => ({
        rating: parseInt(r[6]) || 0,
        q1: r[3] || '',
        q1sub: [r[4], r[5]].filter(Boolean).join(' / '),
        q21: r[7] || '',
        q3: r[8] || '',
        source: '2차 설문',
      }));

      const merged: SurveyRow[] = [...parsed1, ...parsed2]
        .map((r, i) => ({ ...r, id: i + 1 }))
        .sort((a, b) => b.rating - a.rating);

      setData(merged);
      setLoading(false);
    }).catch(() => { setError('CSV 로딩 실패'); setLoading(false); });
  }, []);

  useEffect(() => { setPage(0); setExpanded(null); }, [filter]);

  const filtered = filter ? data.filter(r => r.rating === filter) : data;
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const ratingCounts = [5, 4, 3].map(s => ({ score: s, count: data.filter(r => r.rating === s).length }));

  if (loading) return <p style={{ fontFamily: F, fontSize: 13, color: '#999', padding: '12px 0' }}>데이터 로딩 중...</p>;
  if (error)   return <p style={{ fontFamily: F, fontSize: 13, color: '#e44' }}>{error}</p>;

  return (
    <div style={{ fontFamily: F, marginTop: 24, maxWidth: 1100, marginLeft: 'auto', marginRight: 'auto' }}>

      {/* 필터 바 */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
          응답 전체 · N={data.length}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          {[{ score: null, label: '전체' }, ...ratingCounts.map(r => ({ score: r.score, label: `${r.score}점 ${r.count}` }))].map(({ score, label }) => (
            <button key={label} onClick={() => setFilter(score as number | null)}
              style={{
                padding: '4px 12px', borderRadius: 20, border: '1px solid',
                borderColor: filter === score ? '#111' : '#e0e0e0',
                background: filter === score ? '#111' : '#fff',
                color: filter === score ? '#fff' : '#666',
                fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: F,
                transition: 'all 0.15s',
              }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 테이블 */}
      <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden' }}>
        {pageData.map((row, i) => (
          <div key={row.id} style={{ borderBottom: i < pageData.length - 1 ? '1px solid #f0f0f0' : 'none' }}>

            {/* 행 */}
            <div
              onClick={() => setExpanded(expanded === row.id ? null : row.id)}
              style={{
                display: 'grid', gridTemplateColumns: '28px 52px 1fr 20px',
                alignItems: 'center', gap: 12, padding: '13px 16px',
                cursor: 'pointer',
                background: expanded === row.id ? '#f9f7f5' : '#fff',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (expanded !== row.id) (e.currentTarget as HTMLDivElement).style.background = '#fafafa'; }}
              onMouseLeave={e => { if (expanded !== row.id) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
            >
              <span style={{ fontSize: 11, color: '#ccc', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                {String(row.id).padStart(2, '0')}
              </span>
              <Stars rating={row.rating} />
              <p style={{ fontSize: 13, color: '#444', margin: 0, lineHeight: 1.5,
                overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                {row.q1 || '(응답 없음)'}
              </p>
              <span style={{
                fontSize: 11, color: '#ccc',
                transform: expanded === row.id ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s', display: 'block', textAlign: 'center',
              }}>▾</span>
            </div>

            {/* 펼침 */}
            {expanded === row.id && (
              <div style={{ padding: '4px 16px 18px 92px', background: '#f9f7f5' }}>
                {[
                  { label: '즐거웠던 순간', text: row.q1 },
                  { label: '인사이트', text: row.q1sub },
                  { label: '철학 공감', text: row.q21 },
                  { label: '개선 제안', text: row.q3 },
                ].filter(({ text }) => text).map(({ label, text }) => (
                  <div key={label} style={{ marginTop: 12 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase',
                      letterSpacing: '0.1em', margin: '0 0 4px' }}>{label}</p>
                    <p style={{ fontSize: 13, color: '#555', lineHeight: 1.8, margin: 0 }}>{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 16 }}>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #ddd', background: '#fff',
              color: page === 0 ? '#ccc' : '#444', fontSize: 12, cursor: page === 0 ? 'default' : 'pointer', fontFamily: F }}>
            ←
          </button>
          <span style={{ fontSize: 12, color: '#999' }}>{page + 1} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
            style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #ddd', background: '#fff',
              color: page >= totalPages - 1 ? '#ccc' : '#444', fontSize: 12,
              cursor: page >= totalPages - 1 ? 'default' : 'pointer', fontFamily: F }}>
            →
          </button>
        </div>
      )}
    </div>
  );
}
