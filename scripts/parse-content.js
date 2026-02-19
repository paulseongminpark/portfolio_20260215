#!/usr/bin/env node
/**
 * parse-content.js
 * Gist에서 Perplexity 원문 fetch → TOPIC_START/END 파싱 → Jekyll 포스트 생성
 *
 * 환경변수:
 *   GIST_ID       - 파싱할 Gist ID
 *   GITHUB_TOKEN  - Gist 접근 및 삭제 토큰
 *   LANG          - "ko" 또는 "en"
 *   POST_DATE     - YYYY-MM-DD (기본: 오늘)
 *   DELETE_GIST   - "true"이면 파싱 후 Gist 삭제 (기본: false)
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// ─── 설정 ────────────────────────────────────────────────────────────────────
const GIST_ID = process.env.GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const LANG = process.env.LANG || "ko";
const DELETE_GIST = process.env.DELETE_GIST === "true";
const POST_DATE =
  process.env.POST_DATE ||
  new Date().toISOString().slice(0, 10); // YYYY-MM-DD

if (!GIST_ID) {
  console.error("❌ GIST_ID 환경변수가 필요합니다.");
  process.exit(1);
}

// ─── 유틸 ─────────────────────────────────────────────────────────────────────
function httpsRequest(options, body = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

// ─── Gist fetch ───────────────────────────────────────────────────────────────
async function fetchGist(gistId) {
  const res = await httpsRequest({
    hostname: "api.github.com",
    path: `/gists/${gistId}`,
    method: "GET",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "User-Agent": "tech-review-bot",
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (res.status !== 200) {
    throw new Error(`Gist fetch 실패: ${res.status} ${JSON.stringify(res.body)}`);
  }

  // Gist의 첫 번째 파일 내용 반환
  const files = res.body.files;
  const firstFile = Object.values(files)[0];
  return firstFile.content;
}

// ─── Gist 삭제 ───────────────────────────────────────────────────────────────
async function deleteGist(gistId) {
  const res = await httpsRequest({
    hostname: "api.github.com",
    path: `/gists/${gistId}`,
    method: "DELETE",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "User-Agent": "tech-review-bot",
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (res.status === 204) {
    console.log(`✅ Gist ${gistId} 삭제 완료`);
  } else {
    console.warn(`⚠️ Gist 삭제 실패: ${res.status}`);
  }
}

// ─── 파싱: TOPIC_START/END 추출 ───────────────────────────────────────────────
function parseTopics(rawContent) {
  const topics = [];
  const topicRegex = /TOPIC_START\s*([\s\S]*?)\s*TOPIC_END/g;
  let match;

  while ((match = topicRegex.exec(rawContent)) !== null) {
    topics.push(match[1].trim());
  }

  return topics;
}

// ─── Spotlight 추출 ──────────────────────────────────────────────────────────
function parseSpotlight(rawContent) {
  const spotlightRegex = /SPOTLIGHT_START\s*([\s\S]*?)\s*SPOTLIGHT_END/;
  const match = spotlightRegex.exec(rawContent);
  return match ? match[1].trim() : null;
}

// ─── "오늘의 핵심" 생성 (각 토픽 첫 문장 추출) ───────────────────────────────
function buildSummary(topics) {
  return topics.map((topic, i) => {
    // ## 제목 줄 제거 후 첫 번째 비어있지 않은 단락의 첫 문장 추출
    const lines = topic.split("\n").filter((l) => l.trim());
    let titleLine = "";
    let firstSentence = "";

    for (const line of lines) {
      if (line.startsWith("## ")) {
        titleLine = line.replace("## ", "").trim();
      } else if (!firstSentence && !line.startsWith("**Source**")) {
        // 첫 문장 = 첫 번째 마침표/느낌표까지
        const sentenceMatch = line.match(/^(.+?[.!?。])/);
        firstSentence = sentenceMatch ? sentenceMatch[1] : line.slice(0, 80) + "…";
      }
      if (titleLine && firstSentence) break;
    }

    return `${i + 1}. **${titleLine || `Topic ${i + 1}`}** — ${firstSentence}`;
  });
}

// ─── Jekyll 포스트 front matter ──────────────────────────────────────────────
function buildFrontMatter(date, lang) {
  const title =
    lang === "ko"
      ? `${date} Daily Tech Review`
      : `${date} Daily Tech Review`;

  const pairDate = date; // en/ko 포스트 쌍 연결용

  return `---
layout: post
title: "${title}"
date: ${date}
lang: ${lang}
pair: ${pairDate}-daily
tags: [daily, tech-review]
---`;
}

// ─── 포스트 본문 조립 ─────────────────────────────────────────────────────────
function buildPostBody(topics, spotlight, summaryLines) {
  const topicSeparator = "\n\n---\n\n";

  const topicsSection = topics.join(topicSeparator);

  const summarySection =
    summaryLines.length > 0
      ? `## 오늘의 핵심\n${summaryLines.join("\n")}`
      : "";

  const spotlightSection = spotlight
    ? `## 🤖 AI Agent & Dev Spotlight\n${spotlight}`
    : "";

  const commentsSection = `## Comments\n- **산업 연관성**: \n- **직무 연관성**: \n- **자소서/면접**: `;

  const parts = [];
  if (summarySection) parts.push(summarySection);
  parts.push(topicsSection);
  if (spotlightSection) parts.push(spotlightSection);
  parts.push(commentsSection);

  return parts.join("\n\n---\n\n");
}

// ─── 영문 포스트 본문 조립 ──────────────────────────────────────────────────
function buildPostBodyEn(topics, spotlight, summaryLines) {
  const topicSeparator = "\n\n---\n\n";

  const topicsSection = topics.join(topicSeparator);

  const summarySection =
    summaryLines.length > 0
      ? `## Today's Highlights\n${summaryLines.join("\n")}`
      : "";

  const spotlightSection = spotlight
    ? `## 🤖 AI Agent & Dev Spotlight\n${spotlight}`
    : "";

  const commentsSection = `## Comments\n- **Industry Insight**: \n- **Career Relevance**: \n- **Interview Prep**: `;

  const parts = [];
  if (summarySection) parts.push(summarySection);
  parts.push(topicsSection);
  if (spotlightSection) parts.push(spotlightSection);
  parts.push(commentsSection);

  return parts.join("\n\n---\n\n");
}

// ─── 파일 저장 ───────────────────────────────────────────────────────────────
function savePost(date, lang, content) {
  const dir = path.join("_posts", lang);
  fs.mkdirSync(dir, { recursive: true });

  const filename = `${date}-daily.md`;
  const filepath = path.join(dir, filename);
  fs.writeFileSync(filepath, content, "utf8");

  console.log(`✅ 포스트 저장: ${filepath}`);
  return filepath;
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`📥 Gist ${GIST_ID} 로드 중...`);
  const rawContent = await fetchGist(GIST_ID);

  console.log("🔍 토픽 파싱 중...");
  const topics = parseTopics(rawContent);
  const spotlight = parseSpotlight(rawContent);

  if (topics.length === 0) {
    console.error("❌ TOPIC_START/TOPIC_END 마커를 찾지 못했습니다.");
    console.error("원문 앞 500자:");
    console.error(rawContent.slice(0, 500));
    process.exit(1);
  }

  console.log(`✅ 토픽 ${topics.length}건 파싱 완료`);
  if (spotlight) console.log("✅ Spotlight 파싱 완료");

  const summaryLines = buildSummary(topics);
  const frontMatter = buildFrontMatter(POST_DATE, LANG);

  let postBody;
  if (LANG === "en") {
    postBody = buildPostBodyEn(topics, spotlight, summaryLines);
  } else {
    postBody = buildPostBody(topics, spotlight, summaryLines);
  }

  const fullPost = `${frontMatter}\n\n${postBody}\n`;
  const savedPath = savePost(POST_DATE, LANG, fullPost);

  // 저장된 경로를 GitHub Actions output으로 출력
  const outputFile = process.env.GITHUB_OUTPUT;
  if (outputFile) {
    fs.appendFileSync(outputFile, `post_path=${savedPath}\n`);
    fs.appendFileSync(outputFile, `post_date=${POST_DATE}\n`);
    fs.appendFileSync(outputFile, `post_lang=${LANG}\n`);
  }

  if (DELETE_GIST && GITHUB_TOKEN) {
    console.log("🗑️ Gist 삭제 중...");
    await deleteGist(GIST_ID);
  }

  console.log("🎉 완료!");
}

main().catch((err) => {
  console.error("❌ 오류:", err.message);
  process.exit(1);
});
