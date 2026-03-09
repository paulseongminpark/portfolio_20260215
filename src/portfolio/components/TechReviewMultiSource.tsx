import React, { useState, useEffect } from "react";

const _BASE       = "https://paulseongminpark.github.io/tech-review";
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
  why_it_matters: string;
  apply_points: string[];
  text: string;
  tech_stack: string[];
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

// ── Twitter Modal ─────────────────────────────────────────────────
function TwitterModal({ t, lang, onClose }: { t: TwitterItem; lang: "ko" | "en"; onClose: () => void }) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "2rem", backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 14, width: "100%", maxWidth: 860,
          maxHeight: "82vh", display: "flex", overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.20)",
        }}
      >
        {/* Left: 분석 */}
        <div style={{
          flex: "0 0 42%", padding: "2rem 2rem 1.5rem", borderRight: "1px solid #eee",
          display: "flex", flexDirection: "column", gap: "1.2rem", overflowY: "auto",
        }}>
          {/* Meta */}
          <div style={{ fontSize: 13, color: "#aaa", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", paddingBottom: "1rem", borderBottom: "1px solid #f0f0f0" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#1d9bf0", background: "#e7f3fe", border: "1px solid #c5e1fb", borderRadius: 3, padding: "2px 7px", fontFamily: "'Inter',sans-serif" }}>
              @{t.author}
            </span>
            <span>·</span>
            <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12 }}>{t.date}</span>
            {t.url && (
              <>
                <span>·</span>
                <a href={t.url} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 12, color: "#0066cc", textDecoration: "none", fontFamily: "'Inter',sans-serif" }}>
                  {lang === "ko" ? "원문 트윗 →" : "View tweet →"}
                </a>
              </>
            )}
          </div>

          {/* What's happening */}
          {t.whats_happening && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "'Inter',sans-serif" }}>
                What's happening
              </p>
              <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 14, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.65, margin: 0 }}>
                {t.whats_happening}
              </p>
            </div>
          )}

          {/* Why it matters */}
          {t.why_it_matters && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "'Inter',sans-serif" }}>
                Why it matters
              </p>
              <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 13, color: "#444", lineHeight: 1.65, margin: 0 }}>
                {t.why_it_matters}
              </p>
            </div>
          )}

          {/* Apply points */}
          {t.apply_points?.length > 0 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, fontFamily: "'Inter',sans-serif" }}>
                {lang === "ko" ? "적용 포인트" : "Apply Points"}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {t.apply_points.map((p, i) => (
                  <li key={i} style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 12, color: "#444", padding: "0.2rem 0 0.2rem 1rem", position: "relative", lineHeight: 1.5 }}>
                    <span style={{ position: "absolute", left: 0, color: "#0066cc" }}>›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <span
            onClick={onClose}
            style={{ marginTop: "auto", paddingTop: "1rem", fontSize: 12, color: "#bbb", cursor: "pointer", userSelect: "none", fontFamily: "'Inter',sans-serif" }}
          >
            {lang === "ko" ? "닫기 ✕" : "Close ✕"}
          </span>
        </div>

        {/* Right: 원문 */}
        <div style={{
          flex: 1, padding: "2rem 2.2rem", overflowY: "auto",
          background: "#fafaf9", display: "flex", flexDirection: "column",
        }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1.2rem", fontFamily: "'Inter',sans-serif" }}>
            {lang === "ko" ? "원문" : "Original"}
          </p>
          <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 13, color: "#1a1a1a", lineHeight: 1.7, whiteSpace: "pre-line", flex: 1 }}>
            {t.text || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Row 2: Twitter ───────────────────────────────────────────────
function TwitterCard({ t, lang, onOpen }: { t: TwitterItem; lang: "ko" | "en"; onOpen: () => void }) {
  const preview = t.whats_happening
    ? t.whats_happening.slice(0, 90) + (t.whats_happening.length > 90 ? "…" : "")
    : "";

  return (
    <div
      style={{ ...card, cursor: "pointer" }}
      onClick={onOpen}
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
        <span style={{ marginLeft: "auto", fontSize: 13, color: "#bbb", lineHeight: 1, fontFamily: "'Inter',sans-serif" }}>→</span>
      </div>
      <p style={{ fontFamily: "'Noto Sans KR','Inter',sans-serif", fontSize: 14, color: "#111", lineHeight: 1.65, margin: 0, letterSpacing: "-0.01em" }}>
        {preview}
      </p>
    </div>
  );
}

function TwitterRow({ items, lang }: { items: TwitterItem[]; lang: "ko" | "en" }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div>
      <p style={rowLabel}>Twitter Bookmarks</p>
      <div style={grid3}>
        {items.map((t, i) => (
          <TwitterCard key={i} t={t} lang={lang} onOpen={() => setActive(i)} />
        ))}
      </div>
      {active !== null && (
        <TwitterModal t={items[active]} lang={lang} onClose={() => setActive(null)} />
      )}
    </div>
  );
}

// ── Row 3: YouTube ───────────────────────────────────────────────
function YoutubeRow({ items, lang }: { items: YoutubeItem[]; lang: "ko" | "en" }) {
  if (!items.length) return null;
  const v = items[0];
  return (
    <div>
      <p style={rowLabel}>YouTube Analysis</p>
      <a
        href={`${BLOG_URL}/${lang}/youtube/${v.video_id ? `#${v.video_id}` : ""}`}
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
      {youtube.length > 0  && <YoutubeRow items={youtube} lang={lang} />}
    </div>
  );
}
