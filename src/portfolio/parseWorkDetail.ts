export type Block =
  | { type: 'section-title'; eyebrow: string; title: string; desc: string }
  | { type: 'paragraph'; text: string }
  | { type: 'cards'; items: { title: string; body: string }[] }
  | { type: 'image'; src: string; caption?: string }
  | { type: 'heading'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'survey-viz' }
  | { type: 'survey-table' }
  | { type: 'quote-image'; quote: string; image: string; attribution?: string }
  | { type: 'placeholder'; count: number }
  | { type: 'visual-cues-gallery' }
  | { type: 'activity-gallery' }
  | { type: 'pmcc-flowchart' }
  | { type: 'code-block'; label: string; code: string }
  | { type: 'code-pair'; blocks: { label: string; code: string }[] };

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

    // Code fence → code-block
    if (trimmed.startsWith('```')) {
      const meta = trimmed.slice(3).trim(); // e.g. "python recall.py"
      const parts = meta.split(/\s+/);
      const label = parts.length > 1 ? parts.slice(1).join(' ') : parts[0] || 'code';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      // i now points to closing ```, loop will i++ past it
      currentSection.blocks.push({ type: 'code-block', label, code: codeLines.join('\n') });
      continue;
    }

    // HTML comment → skip
    if (trimmed.startsWith('<!--')) {
      // multi-line comment: skip until -->
      if (!trimmed.includes('-->')) {
        while (++i < lines.length && !lines[i].includes('-->')) {}
      }
      continue;
    }

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

    // Image placeholder: **[배치: file]** or **배치 : file (caption)**
    const imgMatch = trimmed.match(/^\*\*\[?배치\s*[:：]\s*(.+?)\]?\*\*$/);
    if (imgMatch) {
      let rawContent = imgMatch[1].trim();
      // strip trailing ] or **
      rawContent = rawContent.replace(/\]$/, '').replace(/\*\*$/, '').trim();

      let src: string;
      let caption: string | undefined;

      // Inline caption: "file.ext (caption text)" — split at extension boundary
      const inlineCap = rawContent.match(/^(.+?\.\w{2,5})\s+\((.+)\)$/);
      if (inlineCap) {
        src = inlineCap[1].trim();
        caption = inlineCap[2].trim();
      } else {
        src = rawContent;
      }

      // If no inline caption, check next non-empty line for *(caption)*
      if (!caption) {
        let j = i + 1;
        while (j < lines.length && lines[j].trim() === '') j++;
        if (j < lines.length) {
          const capMatch = lines[j].trim().match(/^\*\((.+)\)\*$/);
          if (capMatch) {
            caption = capMatch[1].trim();
            i = j;
          }
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
        // Custom block markers → break out of card body
        if (cl.match(/^\*\*\[(?!배치)[^\]]+\]\*\*$/)) break;
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
        headingText.startsWith('Hero 바로 아래') ||
        headingText.startsWith('본문') ||
        headingText.startsWith('2컬럼 카드') ||
        headingText.startsWith('3카드')
      ) {
        continue;
      }
      // Ontology Layer → 4-2) Ontology Layer
      const displayText = headingText === 'Ontology Layer' ? '4-2) Ontology Layer' : headingText;
      currentSection.blocks.push({ type: 'heading', text: displayText });
      continue;
    }

    if (trimmed === '**[quote-image]**') {
      let quote = '';
      let image = '';
      let attribution = '';
      let j = i + 1;
      while (j < lines.length) {
        const cl = lines[j].trim();
        if (cl === '') { j++; continue; }
        const qm = cl.match(/^- quote:\s*(.+)/);
        if (qm) { quote = qm[1].trim().replace(/^"|"$/g, ''); j++; continue; }
        const im = cl.match(/^- image:\s*(.+)/);
        if (im) { image = im[1].trim(); j++; continue; }
        const am = cl.match(/^- attribution:\s*(.+)/);
        if (am) { attribution = am[1].trim(); j++; continue; }
        break;
      }
      i = j - 1;
      if (quote || image) {
        currentSection.blocks.push({ type: 'quote-image', quote, image, attribution: attribution || undefined });
      }
      continue;
    }

    if (trimmed === '**[survey-table]**') {
      currentSection.blocks.push({ type: 'survey-table' });
      continue;
    }

    // Placeholder block: **[placeholder: N]**
    const phMatch = trimmed.match(/^\*\*\[placeholder:\s*(\d+)\]\*\*$/);
    if (phMatch) {
      currentSection.blocks.push({ type: 'placeholder', count: parseInt(phMatch[1], 10) });
      continue;
    }

    // Code pair block
    if (trimmed === '**[code-pair]**') {
      const pairBlocks: { label: string; code: string }[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== '**[/code-pair]**') {
        if (lines[i].trim().startsWith('```')) {
          const meta = lines[i].trim().slice(3).trim();
          const parts = meta.split(/\s+/);
          const label = parts.length > 1 ? parts.slice(1).join(' ') : parts[0] || 'code';
          const codeLines: string[] = [];
          i++;
          while (i < lines.length && !lines[i].trim().startsWith('```')) {
            codeLines.push(lines[i]);
            i++;
          }
          pairBlocks.push({ label, code: codeLines.join('\n') });
        }
        i++;
      }
      if (pairBlocks.length > 0) {
        currentSection.blocks.push({ type: 'code-pair', blocks: pairBlocks });
      }
      continue;
    }

    // Survey viz block
    if (trimmed === '**[survey-viz]**') {
      currentSection.blocks.push({ type: 'survey-viz' });
      continue;
    }

    // Visual cues gallery block
    if (trimmed === '**[visual-cues-gallery]**') {
      currentSection.blocks.push({ type: 'visual-cues-gallery' });
      continue;
    }

    // Activity gallery block
    if (trimmed === '**[activity-gallery]**') {
      currentSection.blocks.push({ type: 'activity-gallery' });
      continue;
    }

    // PMCC flowchart block
    if (trimmed === '**[pmcc-flowchart]**') {
      currentSection.blocks.push({ type: 'pmcc-flowchart' });
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
