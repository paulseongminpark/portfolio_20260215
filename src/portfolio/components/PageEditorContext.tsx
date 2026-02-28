import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

export type HighlightColor = 'blue' | 'orange' | null;

export interface BlockOverrides {
  marginTop?: number;
  marginBottom?: number;
  maxWidth?: number;
  fontSize?: number;
  hidden?: boolean;
  order?: number;
  customCss?: string;
  highlight?: HighlightColor;
}

interface SelectedBlock {
  id: string;    // "3" or "3-1" for nested
  type: string;
  el: HTMLElement;
}

export type HighlightTool = 'blue' | 'orange' | null;

interface PageEditorState {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  selected: SelectedBlock | null;
  select: (id: string, type: string, el: HTMLElement) => void;
  deselect: () => void;
  overrides: Record<string, BlockOverrides>;
  setOverride: (id: string, patch: Partial<BlockOverrides>) => void;
  moveBlock: (id: string, direction: 'up' | 'down') => void;
  resetBlock: (id: string) => void;
  resetAll: () => void;
  undo: () => void;
  canUndo: boolean;
  highlightTool: HighlightTool;
  setHighlightTool: (t: HighlightTool) => void;
  textMarks: HTMLElement[];
  addTextMark: (mark: HTMLElement) => void;
  workKey: string;
  exportCss: () => string;
}

const Ctx = createContext<PageEditorState | null>(null);

export function usePageEditor() {
  return useContext(Ctx);
}

const STORAGE_PREFIX = 'page-editor-';
const MAX_UNDO = 30;

function loadOverrides(workKey: string): Record<string, BlockOverrides> {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + workKey);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function save(workKey: string, o: Record<string, BlockOverrides>) {
  localStorage.setItem(STORAGE_PREFIX + workKey, JSON.stringify(o));
}

export function PageEditorProvider({ workKey, children }: { workKey: string; children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [selected, setSelected] = useState<SelectedBlock | null>(null);
  const [overrides, setOverrides] = useState<Record<string, BlockOverrides>>(() => loadOverrides(workKey));
  const [highlightTool, setHighlightTool] = useState<HighlightTool>(null);
  const history = useRef<Record<string, BlockOverrides>[]>([]);

  const select = useCallback((id: string, type: string, el: HTMLElement) => {
    setSelected({ id, type, el });
  }, []);

  const deselect = useCallback(() => setSelected(null), []);

  const setOverride = useCallback((id: string, patch: Partial<BlockOverrides>) => {
    setOverrides(prev => {
      // push previous state to undo stack
      history.current.push(structuredClone(prev));
      if (history.current.length > MAX_UNDO) history.current.shift();
      const next = { ...prev, [id]: { ...prev[id], ...patch } };
      save(workKey, next);
      return next;
    });
  }, [workKey]);

  const resetBlock = useCallback((id: string) => {
    setOverrides(prev => {
      history.current.push(structuredClone(prev));
      const next = { ...prev };
      delete next[id];
      save(workKey, next);
      return next;
    });
  }, [workKey]);

  const resetAll = useCallback(() => {
    history.current.push(structuredClone(overrides));
    setOverrides({});
    localStorage.removeItem(STORAGE_PREFIX + workKey);
    setSelected(null);
  }, [workKey, overrides]);

  const undo = useCallback(() => {
    const prev = history.current.pop();
    if (prev) {
      setOverrides(prev);
      save(workKey, prev);
    }
  }, [workKey]);

  const canUndo = history.current.length > 0;

  const exportCss = useCallback(() => {
    const lines: string[] = [];
    for (const [id, o] of Object.entries(overrides)) {
      const props: string[] = [];
      if (o.marginTop != null) props.push(`  margin-top: ${o.marginTop}px;`);
      if (o.marginBottom != null) props.push(`  margin-bottom: ${o.marginBottom}px;`);
      if (o.maxWidth != null) props.push(`  max-width: ${o.maxWidth}px;`);
      if (o.fontSize != null) props.push(`  font-size: ${o.fontSize}px;`);
      if (o.hidden) props.push(`  display: none;`);
      if (o.highlight === 'blue') props.push(`  background: rgba(96,165,250,0.15);`);
      if (o.highlight === 'orange') props.push(`  background: rgba(251,191,36,0.15);`);
      if (o.customCss) props.push(o.customCss);
      if (props.length) lines.push(`/* block ${id} */\n[data-pe-id="${id}"] {\n${props.join('\n')}\n}`);
    }
    return lines.join('\n\n');
  }, [overrides]);

  return (
    <Ctx.Provider value={{
      enabled, setEnabled, selected, select, deselect,
      overrides, setOverride, resetBlock, resetAll,
      moveBlock: () => {},
      undo, canUndo,
      highlightTool, setHighlightTool,
      textMarks: [],
      addTextMark: () => {},
      workKey, exportCss,
    }}>
      {children}
    </Ctx.Provider>
  );
}
