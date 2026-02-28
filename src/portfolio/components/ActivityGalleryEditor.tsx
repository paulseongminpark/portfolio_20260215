import { useState } from 'react';
import { useGridEditor, GRID_COLS, GRID_ROWS } from './useGridEditor';
import './ActivityGalleryEditor.css';

/* ── Grid cell overlay ── */
function GridOverlay({
  hoveredCell,
  registerCell,
}: {
  hoveredCell: { row: number; col: number } | null;
  registerCell: (key: string, el: HTMLDivElement | null) => void;
}) {
  const cells = [];
  for (let r = 1; r <= GRID_ROWS; r++) {
    for (let c = 1; c <= GRID_COLS; c++) {
      const key = `${r}-${c}`;
      const isHovered = hoveredCell?.row === r && hoveredCell?.col === c;
      cells.push(
        <div
          key={key}
          ref={(el) => registerCell(key, el)}
          className={`age-cell${isHovered ? ' age-cell-hovered' : ''}`}
        >
          {r},{c}
        </div>,
      );
    }
  }
  return <div className="age-grid-overlay">{cells}</div>;
}

/* ── Export panel ── */
function ExportPanel({ css, onClose }: { css: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="age-export-panel">
      <div className="age-export-header">
        <span>Export CSS</span>
        <button className="age-btn" onClick={onClose}>✕</button>
      </div>
      <pre className="age-export-code">{css}</pre>
      <button className="age-btn age-btn-primary" onClick={handleCopy} style={{ width: '100%' }}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
}

/* ── Main editor ── */
export function ActivityGalleryEditor({ onClose }: { onClose: () => void }) {
  const editor = useGridEditor();

  return (
    <div>
      {/* Toolbar */}
      <div className="age-toolbar">
        <span className="age-toolbar-title">Gallery Editor</span>
        <button className="age-btn" onClick={() => { editor.save(); }}>Save</button>
        <button className="age-btn" onClick={() => editor.setExportOpen(true)}>Export</button>
        <button className="age-btn age-btn-danger" onClick={editor.reset}>Reset</button>
        <button className="age-btn" onClick={onClose}>Close</button>
      </div>

      {/* Grid container */}
      <div
        className="ag age-container"
        onPointerMove={editor.onPointerMove}
        onPointerUp={editor.onPointerUp}
      >
        <GridOverlay hoveredCell={editor.hoveredCell} registerCell={editor.registerCell} />

        {editor.layout.map((item) => {
          const isDragging = editor.dragItemId === item.id;
          return (
            <div
              key={item.id}
              className={`ag-item age-item${isDragging ? ' age-dragging' : ''}`}
              style={editor.getItemStyle(item.id)}
              onPointerDown={(e) => editor.onItemPointerDown(item.id, e)}
            >
              {item.type === 'video' ? (
                <video src={item.src} autoPlay muted loop playsInline draggable={false} />
              ) : (
                <img src={item.src} alt="" loading="lazy" draggable={false} />
              )}
              <div className="age-item-overlay">
                <span className="age-drag-icon">⠿</span>
                <span className="age-item-label">{item.id}</span>
              </div>
              <div
                className="age-resize-se"
                onPointerDown={(e) => editor.onResizeStart(item.id, e)}
              />
            </div>
          );
        })}
      </div>

      {/* Export panel */}
      {editor.exportOpen && (
        <ExportPanel css={editor.cssOutput} onClose={() => editor.setExportOpen(false)} />
      )}
    </div>
  );
}

export default ActivityGalleryEditor;
