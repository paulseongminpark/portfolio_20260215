import { useRef, useEffect, useCallback, type ReactNode } from 'react';
import { usePageEditor, type BlockOverrides } from './PageEditorContext';

interface Props {
  id: string;
  type: string;
  children: ReactNode;
}

const HIGHLIGHT_STYLES: Record<string, React.CSSProperties> = {
  blue:   { background: 'rgba(96,165,250,0.15)', borderRadius: 4 },
  orange: { background: 'rgba(251,191,36,0.15)', borderRadius: 4 },
};

const HL_CLASS: Record<string, string> = {
  blue: 'wd-hl-blue',
  orange: 'wd-hl-orange',
};

export function EditableBlock({ id, type, children }: Props) {
  const editor = usePageEditor();
  const ref = useRef<HTMLDivElement>(null);

  /* ── 텍스트 하이라이트 적용 (저장된 것 복원) ── */
  const applyStoredHighlights = useCallback(() => {
    if (!editor || !ref.current) return;
    const marks = editor.textHighlights.filter(h => h.blockId === id);
    if (marks.length === 0) return;

    // Walk text nodes and wrap matches
    const walker = document.createTreeWalker(ref.current, NodeFilter.SHOW_TEXT);
    const textNodes: Text[] = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

    for (const mark of marks) {
      for (const node of textNodes) {
        const idx = node.textContent?.indexOf(mark.text) ?? -1;
        if (idx === -1) continue;
        // Check if already wrapped
        if (node.parentElement?.classList.contains(HL_CLASS[mark.color])) continue;

        const range = document.createRange();
        range.setStart(node, idx);
        range.setEnd(node, idx + mark.text.length);
        const span = document.createElement('span');
        span.className = HL_CLASS[mark.color];
        range.surroundContents(span);
        break; // one match per mark per render
      }
    }
  }, [editor, id]);

  useEffect(() => {
    if (editor?.enabled) {
      // Small delay to let React render first
      const t = setTimeout(applyStoredHighlights, 50);
      return () => clearTimeout(t);
    }
  }, [editor?.enabled, editor?.textHighlights, applyStoredHighlights]);

  /* ── 텍스트 선택 → 하이라이트 ── */
  const handleMouseUp = useCallback(() => {
    if (!editor?.highlightTool) return;

    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount) return;

    const text = sel.toString().trim();
    if (!text || text.length < 2) return;

    // Check selection is within this block
    const range = sel.getRangeAt(0);
    if (!ref.current?.contains(range.commonAncestorContainer)) return;

    const color = editor.highlightTool;

    // Wrap selection with highlight span
    const span = document.createElement('span');
    span.className = HL_CLASS[color];
    try {
      range.surroundContents(span);
    } catch {
      // surroundContents fails if selection crosses element boundaries
      // fallback: just store the mark, it'll be applied on next render
    }

    // Store
    editor.addTextHighlight({ blockId: id, text, color });
    sel.removeAllRanges();
  }, [editor, id]);

  if (!editor?.enabled) return <>{children}</>;

  const o: BlockOverrides = editor.overrides[id] ?? {};

  if (o.hidden) return (
    <div
      ref={ref}
      data-pe-id={id}
      className="pe-block pe-hidden"
      onClick={(e) => { e.stopPropagation(); ref.current && editor.select(id, type, ref.current); }}
    >
      <span className="pe-hidden-label">{type} (hidden)</span>
    </div>
  );

  const isSelected = editor.selected?.id === id;
  const style: React.CSSProperties = {};
  if (o.marginTop != null) style.marginTop = o.marginTop;
  if (o.marginBottom != null) style.marginBottom = o.marginBottom;
  if (o.maxWidth != null) style.maxWidth = o.maxWidth;
  if (o.fontSize != null) style.fontSize = o.fontSize;
  if (o.highlight) Object.assign(style, HIGHLIGHT_STYLES[o.highlight]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!ref.current) return;

    // If highlight tool is active, don't select block (mouseup handles text)
    if (editor.highlightTool) return;

    editor.select(id, type, ref.current);
  };

  return (
    <div
      ref={ref}
      data-pe-id={id}
      className={`pe-block${isSelected ? ' pe-selected' : ''}${editor.highlightTool ? ' pe-highlight-mode' : ''}`}
      style={style}
      onClick={handleClick}
      onMouseUp={handleMouseUp}
    >
      <div className="pe-block-badge">{type}</div>
      {children}
    </div>
  );
}
