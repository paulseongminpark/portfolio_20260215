import { useState, useEffect } from "react";

const FEED_URL    = "https://paulseongminpark.github.io/tech-review/feed.json";
const SOURCES_URL = "https://paulseongminpark.github.io/tech-review/sources.json";
const BLOG_URL    = "https://paulseongminpark.github.io/tech-review";

// ── Types ────────────────────────────────────────────────────────
interface BlogPost {
  date: string;
  pair: string;
  title: { ko: string; en: string };
  tags: string[];
  url: { ko: string; en: string };
}
interface TwitterItem {
  author: string;
  date: string;
  url: string;
  why: string;
  apply_point: string;
}
interface YoutubeItem {
  title: string;
  channel: string;
  video_id: string;
  url: string;
  why: string;
  section_count: number;
  published_at: string;
}

// ── Shared styles ────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e8e8e8",
  borderRadius: 8,
  padding: "18px 20px",
  textDecoration: "none",
  color: "inherit",
  display: "block",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const rowLabel: React.CSSProperties = {
  fontFamily: "'Inter',sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#aaa",
  marginBottom: 14,
};

const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: 12,
};

// ── Row 1: Blog ──────────────────────────────────────────────────
function BlogRow({ posts, lang }: { posts: BlogPost[]; lang: "ko" | "en" }) {
  return (
    <div>
      <p style={rowLabel}>Daily Post</p>
      <div style={grid3}>
        {posts.slice(0, 3).map((post) => (
          <a
            key={post.pair}
            href={`${BLOG_URL}${post.url[lang]}`}
            target="_blank"
            rel="noopener noreferrer"
            style={card}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#bbb";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "#aaa", marginBottom: 8, letterSpacing: "0.05em" }}>
              {post.date}
            </p>
            <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 12, lineHeight: 1.45 }}>
              {post.title[lang]}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{ fontSize: 10, background: "#f5f5f3", color: "#666", padding: "2px 8px", borderRadius: 4, fontFamily: "'Inter',sans-serif" }}>
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
        style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: "#111", textDecoration: "none", borderBottom: "1px solid #111", paddingBottom: 1, display: "inline-block", marginTop: 16 }}
      >
        {lang === "ko" ? "전체보기 →" : "View all →"}
      </a>
    </div>
  );
}

// ── Row 2: Twitter ───────────────────────────────────────────────
function TwitterRow({ items }: { items: TwitterItem[] }) {
  return (
    <div>
      <p style={rowLabel}>Twitter Bookmarks</p>
      <div style={grid3}>
        {items.map((t, i) => (
          <a
            key={i}
            href={t.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            style={card}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#bbb";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#e8e8e8";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#1d9bf0", background: "#e7f3fe", border: "1px solid #c5e1fb", borderRadius: 3, padding: "2px 6px", fontFamily: "'Inter',sans-serif" }}>
                @{t.author}
              </span>
              <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'Inter',sans-serif" }}>{t.date}</span>
            </div>
            <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 13, color: "#111", lineHeight: 1.55, marginBottom: 12 }}>
              {t.why}
            </p>
            {t.apply_point && (
              <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 11, color: "#666", lineHeight: 1.5, borderLeft: "2px solid #e8e8e8", paddingLeft: 8, margin: 0 }}>
                {t.apply_point}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Row 3: YouTube ───────────────────────────────────────────────
function YoutubeRow({ items }: { items: YoutubeItem[] }) {
  if (!items.length) return null;
  const v = items[0];
  return (
    <div>
      <p style={rowLabel}>YouTube Analysis</p>
      <a
        href={`${BLOG_URL}/ko/youtube.html`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...card, display: "flex", gap: 20, alignItems: "flex-start" }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = "#bbb";
          e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = "#e8e8e8";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Thumbnail */}
        <div style={{ flexShrink: 0, width: 140, height: 79, borderRadius: 4, overflow: "hidden", background: "#f0f0f0" }}>
          {v.video_id && (
            <img
              src={`https://img.youtube.com/vi/${v.video_id}/mqdefault.jpg`}
              alt={v.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>
        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'Inter',sans-serif" }}>{v.channel}</span>
            <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'Inter',sans-serif" }}>·</span>
            <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'Inter',sans-serif" }}>{v.published_at}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: "#059669", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 3, padding: "2px 6px", fontFamily: "'Inter',sans-serif" }}>
              {v.section_count} sections
            </span>
          </div>
          <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 15, fontWeight: 600, color: "#111", marginBottom: 10, lineHeight: 1.4 }}>
            {v.title}
          </p>
          <p style={{ fontFamily: "'Inter','Noto Sans KR',sans-serif", fontSize: 13, color: "#555", lineHeight: 1.6, margin: 0 }}>
            {v.why}
          </p>
        </div>
      </a>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────────
export function TechReviewMultiSource() {
  const [lang, setLang] = useState<"ko" | "en">("ko");
  const [posts, setPosts]     = useState<BlogPost[]>([]);
  const [twitter, setTwitter] = useState<TwitterItem[]>([]);
  const [youtube, setYoutube] = useState<YoutubeItem[]>([]);

  useEffect(() => {
    setLang(navigator.language.startsWith("ko") ? "ko" : "en");
    fetch(FEED_URL)
      .then((r) => r.json())
      .then((d) => setPosts(d.posts || []))
      .catch(() => {});
    fetch(SOURCES_URL)
      .then((r) => r.json())
      .then((d) => {
        setTwitter(d.twitter || []);
        setYoutube(d.youtube || []);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, paddingTop: 32 }}>
      {posts.length > 0    && <BlogRow    posts={posts}   lang={lang} />}
      {twitter.length > 0  && <TwitterRow items={twitter} />}
      {youtube.length > 0  && <YoutubeRow items={youtube} />}
    </div>
  );
}
