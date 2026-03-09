import React, { useState, useEffect } from "react";

const _BASE       = import.meta.env.DEV
  ? "http://localhost:4000/tech-review"
  : "https://paulseongminpark.github.io/tech-review";
const FEED_URL    = `${_BASE}/feed.json`;
const SOURCES_URL = `${_BASE}/sources.json`;
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
  whats_happening: string;
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
  color: "#1d4ed8",
  marginBottom: 14,
};

const grid3: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 12,
};

// ── Row 1: Blog ──────────────────────────────────────────────────
function BlogRow({ posts, lang }: { posts: BlogPost[]; lang: "ko" | "en" }) {
  return (
    <div>
      <p style={rowLabel}>Daily Post</p>
      <a
        href={`${BLOG_URL}/${lang}/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#111", textDecoration: "none", borderBottom: "1px solid #111", paddingBottom: 1, display: "inline-block", marginBottom: 14 }}
      >
        {lang === "ko" ? "전체보기 →" : "View all →"}
      </a>
      <div style={grid3}>
        {posts.slice(0, 4).map((post) => (
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
    </div>
  );
}

// ── Row 2: Twitter ───────────────────────────────────────────────
function TwitterCard({ t, lang }: { t: TwitterItem; lang: "ko" | "en" }) {
  const [open, setOpen] = useState(false);
  const preview = t.whats_happening
    ? t.whats_happening.slice(0, 80) + (t.whats_happening.length > 80 ? "…" : "")
    : "";

  return (
    <div
      style={{ ...card, cursor: "pointer" }}
      onClick={() => setOpen((v) => !v)}
      onMouseOver={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#bbb";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
      }}
      onMouseOut={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e8e8";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#1d9bf0", background: "#e7f3fe", border: "1px solid #c5e1fb", borderRadius: 3, padding: "2px 6px", fontFamily: "'Inter',sans-serif" }}>
          @{t.author}
        </span>
        <span style={{ fontSize: 11, color: "#aaa", fontFamily: "inherit" }}>{t.date}</span>
        <span style={{ marginLeft: "auto", fontSize: 14, color: "#aaa", lineHeight: 1, transform: open ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>+</span>
      </div>

      {/* Collapsed: 80자 미리보기 */}
      {!open && (
        <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 14, color: "#111", lineHeight: 1.7, margin: 0, letterSpacing: "-0.01em" }}>
          {preview}
        </p>
      )}

      {/* Expanded */}
      {open && (
        <>
          <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 14, color: "#111", lineHeight: 1.7, marginBottom: 14, letterSpacing: "-0.01em" }}>
            {t.whats_happening}
          </p>
          {t.apply_point && (
            <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 12, color: "#666", lineHeight: 1.65, borderLeft: "2px solid #e8e8e8", paddingLeft: 10, marginBottom: 14 }}>
              {t.apply_point}
            </p>
          )}
          <a
            href={`${BLOG_URL}/${lang}/twitter/`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{ fontSize: 11, fontFamily: "'Inter',sans-serif", color: "#111", textDecoration: "none", borderBottom: "1px solid #111", paddingBottom: 1 }}
          >
            {lang === "ko" ? "전체보기 →" : "View all →"}
          </a>
        </>
      )}
    </div>
  );
}

function TwitterRow({ items, lang }: { items: TwitterItem[]; lang: "ko" | "en" }) {
  return (
    <div>
      <p style={rowLabel}>Twitter Bookmarks</p>
      <div style={grid3}>
        {items.map((t, i) => (
          <TwitterCard key={i} t={t} lang={lang} />
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
            <span style={{ fontSize: 10, fontWeight: 700, color: "#D4632D", background: "rgba(212,99,45,0.1)", border: "1px solid rgba(212,99,45,0.3)", borderRadius: 3, padding: "2px 6px", fontFamily: "'Inter',sans-serif" }}>
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
      {twitter.length > 0  && <TwitterRow items={twitter} lang={lang} />}
      {youtube.length > 0  && <YoutubeRow items={youtube} />}
    </div>
  );
}
