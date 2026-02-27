import { useState, useEffect } from "react";

interface ReviewPost {
  date: string;
  pair: string;
  title: { ko: string; en: string };
  tags: string[];
  url: { ko: string; en: string };
}

const FEED_URL = "https://paulseongminpark.github.io/tech-review/feed.json";
const BLOG_URL = "https://paulseongminpark.github.io/tech-review";

export function TechReviewCards() {
  const [posts, setPosts] = useState<ReviewPost[]>([]);
  const [lang, setLang] = useState<"ko" | "en">("ko");

  useEffect(() => {
    setLang(navigator.language.startsWith("ko") ? "ko" : "en");
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((data) => setPosts(data.posts || []))
      .catch(() => setPosts([]));
  }, []);

  if (posts.length === 0) return (
    <div style={{ padding: "24px 0", color: "#aaa", fontFamily: "'Inter',sans-serif", fontSize: 14 }}>
      최신 포스트를 불러오는 중...
    </div>
  );

  return (
    <div style={{ paddingTop: 32 }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
        marginBottom: 24,
      }}>
        {posts.slice(0, 3).map((post) => (
          <a
            key={post.pair}
            href={`${BLOG_URL}${post.url[lang]}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "20px",
              border: "1px solid #e8e8e8",
              borderRadius: 8,
              textDecoration: "none",
              color: "inherit",
              transition: "border-color 0.2s, box-shadow 0.2s",
              background: "#fff",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#bbb";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#aaa", marginBottom: 10, letterSpacing: "0.05em" }}>
              {post.date}
            </p>
            <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 14, lineHeight: 1.45 }}>
              {post.title[lang]}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 10,
                  background: "#f5f5f3",
                  color: "#666",
                  padding: "2px 8px",
                  borderRadius: 4,
                  letterSpacing: "0.04em",
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
        style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 13,
          color: "#111",
          textDecoration: "none",
          borderBottom: "1px solid #111",
          paddingBottom: 1,
        }}
      >
        {lang === "ko" ? "전체보기 →" : "View all →"}
      </a>
    </div>
  );
}
