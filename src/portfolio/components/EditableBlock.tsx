import { useRef, type ReactNode } from 'react';
import { usePageEditor, type BlockOverrides } from './PageEditorContext';

interface Props {
  id: string;      // "3" or "3-1" for nested
  type: string;
  children: ReactNode;
}

const HIGHLIGHT_STYLES: Record<string, React.CSSProperties> = {
  blue:   { background: 'rgba(96,165,250,0.15)', borderRadius: 4 },
  orange: { background: 'rgba(251,191,36,0.15)', borderRadius: 4 },
};

export function EditableBlock({ id, type, children }: Props) {
  const editor = usePageEditor();
  const ref = useRef<HTMLDivElement>(null);

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

    // If highlight tool is active, apply highlight instead of selecting
    if (editor.highlightTool) {
      const currentHighlight = o.highlight;
      const newHighlight = currentHighlight === editor.highlightTool ? null : editor.highlightTool;
      editor.setOverride(id, { highlight: newHighlight });
      return;
    }

    editor.select(id, type, ref.current);
  };

  return (
    <div
      ref={ref}
      data-pe-id={id}
      className={`pe-block${isSelected ? ' pe-selected' : ''}${editor.highlightTool ? ' pe-highlight-mode' : ''}`}
      style={style}
      onClick={handleClick}
    >
      <div className="pe-block-badge">{type}</div>
      {children}
    </div>
  );
}
