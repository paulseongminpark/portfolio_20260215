export type Block =
  | { type: 'section-title'; eyebrow: string; title: string; desc: string }
  | { type: 'paragraph'; text: string }
  | { type: 'cards'; items: { title: string; body: string }[] }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'heading'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export interface WorkSection {
  name: string;
  blocks: Block[];
}

export function parseWorkDetail(raw: string): WorkSection[] {
  const lines = raw.split('\n');
  const sections: WorkSection[] = [];
  let currentSection: WorkSection | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // ## N) SectionName — top-level section split
    const sectionMatch = line.match(/^## \d+\)\s*(.+)/);
    // Also match sub-sections that act as top-level (e.g. "## 4-2) ...")
    const subSectionTopMatch = !sectionMatch ? line.match(/^## \d+-\d+\)\s*(.+)/) : null;

    if (sectionMatch || subSectionTopMatch) {
      if (currentSection) sections.push(currentSection);
      const name = (sectionMatch?.[1] ?? subSectionTopMatch?.[1] ?? '').trim();
      currentSection = { name, blocks: [] };
      continue;
    }

    if (!currentSection) continue;

    const trimmed = line.trim();

    // --- → skip
    if (trimmed === '---') continue;

    // Empty line → skip
    if (trimmed === '') continue;

    // SectionTitle block: collect eyebrow/title/desc
    if (trimmed === '### SectionTitle' || trimmed === '**SectionTitle**') {
      let eyebrow = '';
      let title = '';
      let desc = '';
      let j = i + 1;
      while (j < lines.length) {
        const cl = lines[j].trim();
        if (cl === '') { j++; continue; }
        const em = cl.match(/^- eyebrow:\s*(.+)/);
        if (em) { eyebrow = em[1].trim(); j++; continue; }
        const tm = cl.match(/^- title:\s*(.+)/);
        if (tm) { title = tm[1].trim(); j++; continue; }
        const dm = cl.match(/^- desc:\s*(.+)/);
        if (dm) { desc = dm[1].trim(); j++; continue; }
        break;
      }
      i = j - 1;
      if (eyebrow || title || desc) {
        currentSection.blocks.push({ type: 'section-title', eyebrow, title, desc });
      }
      continue;
    }

    // Image placeholder: **[배치: file]** or **배치 : file**  (various patterns)
    const imgMatch = trimmed.match(/^\*\*\[?배치\s*[:：]\s*(.+?)\]?\*\*/);
    if (imgMatch) {
      let src = imgMatch[1].trim();
      // strip trailing ** or ()
      src = src.replace(/\*\*$/, '').replace(/\)$/, '').trim();
      // Check next non-empty line for caption
      let caption: string | undefined;
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === '') j++;
      if (j < lines.length) {
        const capMatch = lines[j].trim().match(/^\*\((.+)\)\*$/);
        if (capMatch) {
          caption = capMatch[1].trim();
          i = j;
        }
      }
      currentSection.blocks.push({ type: 'image', src, caption });
      continue;
    }

    // Caption for images: *(...)*  — if not already consumed
    const capStandalone = trimmed.match(/^\*\((.+)\)\*$/);
    if (capStandalone) {
      // Attach to last image block if exists
      const lastBlock = currentSection.blocks[currentSection.blocks.length - 1];
      if (lastBlock && lastBlock.type === 'image' && !lastBlock.caption) {
        lastBlock.caption = capStandalone[1].trim();
      }
      continue;
    }

    // **캡션:** text
    const captionLabel = trimmed.match(/^\*\*캡션:\*\*\s*(.+)/);
    if (captionLabel) {
      const lastBlock = currentSection.blocks[currentSection.blocks.length - 1];
      if (lastBlock && lastBlock.type === 'image') {
        lastBlock.caption = captionLabel[1].trim();
      }
      continue;
    }

    // Card start: **카드 N — Title**
    const cardMatch = trimmed.match(/^\*\*카드\s*\d+\s*[—\-]\s*(.+?)\*\*$/);
    if (cardMatch) {
      const cardTitle = cardMatch[1].trim();
      // Collect body lines until next card, section, or ---
      const bodyLines: string[] = [];
      let j = i + 1;
      while (j < lines.length) {
        const cl = lines[j].trim();
        if (cl === '---') break;
        if (cl.match(/^\*\*카드\s*\d+\s*[—\-]/)) break;
        if (cl.match(/^## \d/)) break;
        if (cl.match(/^### /)) break;
        // Image inside card → treat as card body text
        if (cl.match(/^\*\*\[?배치\s*[:：]/)) {
          // skip image placeholders inside cards
          j++;
          // skip caption too
          if (j < lines.length && lines[j].trim().match(/^\*\(.+\)\*$/)) j++;
          continue;
        }
        if (cl !== '') bodyLines.push(cl);
        j++;
      }
      i = j - 1;

      // Check if last block is already a cards block (merge)
      const lastBlock = currentSection.blocks[currentSection.blocks.length - 1];
      if (lastBlock && lastBlock.type === 'cards') {
        lastBlock.items.push({ title: cardTitle, body: bodyLines.join(' ') });
      } else {
        currentSection.blocks.push({
          type: 'cards',
          items: [{ title: cardTitle, body: bodyLines.join(' ') }],
        });
      }
      continue;
    }

    // Table: **열:** headers / **행:** rows / followed by - item: val1 / val2
    if (trimmed.startsWith('**열:**')) {
      // Parse PMCC-style table
      const headers = trimmed.replace('**열:**', '').trim().split('/').map((h) => h.trim());
      const rows: string[][] = [];
      let j = i + 1;
      // skip **행:** line
      while (j < lines.length) {
        const cl = lines[j].trim();
        if (cl === '' || cl.startsWith('**행:**')) { j++; continue; }
        if (cl === '---') break;
        if (cl.match(/^## \d/)) break;
        if (cl.match(/^### /)) break;
        // Skip labels like **테이블 내용...**
        if (cl.startsWith('**테이블')) { j++; continue; }
        const rowMatch = cl.match(/^- (.+?):\s*(.+)/);
        if (rowMatch) {
          const cells = rowMatch[2].split('/').map((c) => c.trim());
          rows.push([rowMatch[1].trim(), ...cells]);
        } else {
          break;
        }
        j++;
      }
      i = j - 1;
      if (rows.length > 0) {
        currentSection.blocks.push({ type: 'table', headers: ['', ...headers], rows });
      }
      continue;
    }

    // Heading: ### N-N) SubName or ### Title (not SectionTitle)
    const headingMatch = trimmed.match(/^###\s+(.+)/);
    if (headingMatch) {
      const headingText = headingMatch[1].trim();
      // Skip certain meta-headings
      if (
        headingText.startsWith('한 줄 설명') ||
        headingText.startsWith('SectionTitle') ||
        headingText.startsWith('Hero 바로 아래')
      ) {
        continue;
      }
      currentSection.blocks.push({ type: 'heading', text: headingText });
      continue;
    }

    // Paragraph: remaining non-empty lines
    // Skip lines that are purely metadata-like
    if (trimmed.startsWith('(') && trimmed.endsWith(')') && trimmed.length < 60) {
      // Transition text like "(Problem과 Approach 사이 1줄)" — render as paragraph
      currentSection.blocks.push({ type: 'paragraph', text: trimmed });
      continue;
    }

    currentSection.blocks.push({ type: 'paragraph', text: trimmed });
  }

  if (currentSection) sections.push(currentSection);
  return sections;
}
