import { useState } from 'react';
import { usePageEditor, type HighlightTool } from './PageEditorContext';

function NumInput({ label, value, onChange, min, max, step }: {
  label: string; value: number | undefined; onChange: (v: number | undefined) => void;
  min?: number; max?: number; step?: number;
}) {
  return (
    <div className="pe-field">
      <label className="pe-label">{label}</label>
      <div className="pe-field-row">
        <input
          type="range"
          min={min ?? 0} max={max ?? 200} step={step ?? 1}
          value={value ?? (min ? min : 0)}
          onChange={e => onChange(Number(e.target.value))}
          className="pe-slider"
        />
        <input
          type="number"
          value={value ?? ''}
          placeholder="auto"
          onChange={e => onChange(e.target.value ? Number(e.target.value) : undefined)}
          className="pe-num"
        />
      </div>
    </div>
  );
}

export function PageEditorPanel() {
  const editor = usePageEditor();
  const [exportOpen, setExportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!editor?.enabled) return null;

  const sel = editor.selected;
  const o = sel ? editor.overrides[sel.id] ?? {} : null;

  const set = (patch: Record<string, unknown>) => {
    if (sel) editor.setOverride(sel.id, patch);
  };

  return (
    <div className="pe-panel">
      <div className="pe-panel-header">
        <span className="pe-panel-title">Page Editor</span>
        <div className="pe-panel-actions">
          <button
            className="pe-btn"
            onClick={editor.undo}
            disabled={!editor.canUndo}
            title="Undo (Ctrl+Z)"
            style={{ opacity: editor.canUndo ? 1 : 0.4 }}
          >↩</button>
          <button className="pe-btn" onClick={() => setExportOpen(!exportOpen)}>Export</button>
          <button className="pe-btn pe-btn-danger" onClick={editor.resetAll}>Reset</button>
          <button className="pe-btn" onClick={() => editor.setEnabled(false)}>✕</button>
        </div>
      </div>

      {/* Highlight tools */}
      <div className="pe-highlight-bar">
        <span className="pe-label" style={{ marginBottom: 0 }}>Highlight</span>
        <div className="pe-highlight-btns">
          <button
            className={`pe-hl-btn pe-hl-blue${editor.highlightTool === 'blue' ? ' pe-hl-active' : ''}`}
            onClick={() => editor.setHighlightTool(editor.highlightTool === 'blue' ? null : 'blue')}
            title="Blue highlight"
          />
          <button
            className={`pe-hl-btn pe-hl-orange${editor.highlightTool === 'orange' ? ' pe-hl-active' : ''}`}
            onClick={() => editor.setHighlightTool(editor.highlightTool === 'orange' ? null : 'orange')}
            title="Orange highlight"
          />
          {editor.highlightTool && (
            <button className="pe-btn pe-btn-sm" onClick={() => editor.setHighlightTool(null)}>Off</button>
          )}
        </div>
      </div>

      {sel && o ? (
        <div className="pe-props">
          <div className="pe-block-info">
            <span className="pe-block-type">{sel.type}</span>
            <span className="pe-block-idx">#{sel.id}</span>
          </div>

          <NumInput label="Margin Top" value={o.marginTop} onChange={v => set({ marginTop: v })} min={0} max={120} />
          <NumInput label="Margin Bottom" value={o.marginBottom} onChange={v => set({ marginBottom: v })} min={0} max={120} />
          <NumInput label="Max Width" value={o.maxWidth} onChange={v => set({ maxWidth: v })} min={200} max={1540} step={10} />
          <NumInput label="Font Size" value={o.fontSize} onChange={v => set({ fontSize: v })} min={10} max={48} />

          <div className="pe-field">
            <label className="pe-label">Visibility</label>
            <button
              className={`pe-toggle ${o.hidden ? 'pe-toggle-off' : 'pe-toggle-on'}`}
              onClick={() => set({ hidden: !o.hidden })}
            >
              {o.hidden ? 'Hidden' : 'Visible'}
            </button>
          </div>

          <div className="pe-field">
            <label className="pe-label">Custom CSS</label>
            <textarea
              className="pe-css-editor"
              value={o.customCss ?? ''}
              onChange={e => set({ customCss: e.target.value })}
              placeholder={"  color: red;\n  opacity: 0.5;"}
              rows={4}
            />
          </div>

          <button className="pe-btn pe-btn-sm pe-btn-danger" onClick={() => { editor.resetBlock(sel.id); editor.deselect(); }}>
            Reset This Block
          </button>
        </div>
      ) : (
        <div className="pe-empty">
          {editor.highlightTool
            ? `🖍 Click blocks to apply ${editor.highlightTool} highlight`
            : 'Click any block to edit'}
        </div>
      )}

      {exportOpen && (
        <div className="pe-export">
          <pre className="pe-export-code">{editor.exportCss() || '/* No overrides */'}</pre>
          <button className="pe-btn pe-btn-primary" onClick={() => {
            navigator.clipboard.writeText(editor.exportCss());
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}>
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      )}
    </div>
  );
}
