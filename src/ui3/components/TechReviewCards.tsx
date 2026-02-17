import { useState, useEffect } from 'react';

interface ReviewPost {
  date: string;
  pair: string;
  title: { ko: string; en: string };
  tags: string[];
  url: { ko: string; en: string };
}

const FEED_URL = 'https://paulseongminpark.github.io/tech-review/feed.json';
const BLOG_URL = 'https://paulseongminpark.github.io';

export function TechReviewCards() {
  const [posts, setPosts] = useState<ReviewPost[]>([]);
  const [lang, setLang] = useState<'ko' | 'en'>('en');

  useEffect(() => {
    const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en';
    setLang(browserLang);

    fetch(FEED_URL)
      .then(r => r.json())
      .then(data => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return null;

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        {posts.slice(0, 4).map(post => (
          <a
            key={post.pair}
            href={`${BLOG_URL}${post.url[lang]}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '1.25rem',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.borderColor = '#888')}
            onMouseOut={e => (e.currentTarget.style.borderColor = '#e0e0e0')}
          >
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.5rem' }}>
              {post.date}
            </p>
            <p style={{ fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {post.title[lang]}
            </p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: '0.7rem',
                  background: '#f0f0f0',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '3px'
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
      <a
        href={`${BLOG_URL}/${lang}/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '0.9rem', color: '#0066cc' }}
      >
        {lang === 'ko' ? '전체보기 →' : 'View all →'}
      </a>
    </div>
  );
}
