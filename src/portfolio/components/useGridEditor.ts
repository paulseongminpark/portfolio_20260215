import { useState, useRef, useCallback } from 'react';

/* ── Types ── */
export interface GridArea {
  rowStart: number;
  colStart: number;
  rowEnd?: number;   // undefined = single cell
  colEnd?: number;
}

export interface GalleryItem {
  id: string;
  src: string;
  type: 'video' | 'image';
  area: GridArea;
}

interface GridCell { row: number; col: number }

interface DragState {
  mode: 'drag' | 'resize';
  itemId: string;
  startX: number;
  startY: number;
  originalArea?: GridArea;
}

const STORAGE_KEY = 'ag-editor-layout';

/* ── Initial layout (matches current CSS) ── */
const P = `${import.meta.env.BASE_URL}work/pmcc`;
export const GALLERY_ITEMS: Omit<GalleryItem, 'area'>[] = [
  { id: 'jujitsu',   src: `${P}/pmcc_jujitsu_web.mp4`,  type: 'video' },
  { id: 'hyrox',     src: `${P}/pmcc_hyrox_web.mp4`,     type: 'video' },
  { id: 'yoga',      src: `${P}/pmcc_yoga_web.mp4`,      type: 'video' },
  { id: 'crossfit',  src: `${P}/pmcc_crossfit_web.mp4`,  type: 'video' },
  { id: 'volunteer', src: `${P}/pmcc volunteer.webp`,      type: 'image' },
];

const INITIAL_AREAS: Record<string, GridArea> = {
  jujitsu:   { rowStart: 1, colStart: 1 },
  hyrox:     { rowStart: 1, colStart: 2, rowEnd: 3, colEnd: 3 },
  yoga:      { rowStart: 1, colStart: 3 },
  crossfit:  { rowStart: 2, colStart: 1 },
  volunteer: { rowStart: 2, colStart: 3 },
};

export const GRID_COLS = 3;
export const GRID_ROWS = 2;

/* ── Helpers ── */
function cellInArea(cell: GridCell, area: GridArea): boolean {
  const rEnd = area.rowEnd ?? area.rowStart + 1;
  const cEnd = area.colEnd ?? area.colStart + 1;
  return cell.row >= area.rowStart && cell.row < rEnd
      && cell.col >= area.colStart && cell.col < cEnd;
}

function areaToStyle(a: GridArea): string {
  if (a.rowEnd || a.colEnd)
    return `${a.rowStart} / ${a.colStart} / ${a.rowEnd ?? 'auto'} / ${a.colEnd ?? 'auto'}`;
  return `${a.rowStart} / ${a.colStart}`;
}

export function generateCss(items: GalleryItem[]): string {
  return items.map(i => `.ag-${i.id} { grid-area: ${areaToStyle(i.area)}; }`).join('\n');
}

function loadSaved(): Record<string, GridArea> | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

/* ── Hook ── */
export function useGridEditor() {
  const [areas, setAreas] = useState<Record<string, GridArea>>(() => loadSaved() ?? { ...INITIAL_AREAS });
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [hoveredCell, setHoveredCell] = useState<GridCell | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const cellRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const layout: GalleryItem[] = GALLERY_ITEMS.map(g => ({ ...g, area: areas[g.id] }));

  const registerCell = useCallback((key: string, el: HTMLDivElement | null) => {
    if (el) cellRefs.current.set(key, el);
    else cellRefs.current.delete(key);
  }, []);

  const getCellFromPointer = useCallback((e: { clientX: number; clientY: number }): GridCell | null => {
    for (const [key, el] of cellRefs.current) {
      const rect = el.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const [r, c] = key.split('-').map(Number);
        return { row: r, col: c };
      }
    }
    return null;
  }, []);

  const onItemPointerDown = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragState({ mode: 'drag', itemId: id, startX: e.clientX, startY: e.clientY });
  }, []);

  const onResizeStart = useCallback((id: string, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragState({ mode: 'resize', itemId: id, startX: e.clientX, startY: e.clientY, originalArea: { ...areas[id] } });
  }, [areas]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragState) return;
    const cell = getCellFromPointer(e);
    setHoveredCell(cell);
  }, [dragState, getCellFromPointer]);

  const onPointerUp = useCallback(() => {
    if (!dragState || !hoveredCell) { setDragState(null); setHoveredCell(null); return; }

    if (dragState.mode === 'drag') {
      // Swap: find item at hoveredCell
      const targetId = Object.entries(areas).find(([, a]) => cellInArea(hoveredCell, a))?.[0];
      if (targetId && targetId !== dragState.itemId) {
        setAreas(prev => ({
          ...prev,
          [dragState.itemId]: prev[targetId],
          [targetId]: prev[dragState.itemId],
        }));
      }
    } else if (dragState.mode === 'resize') {
      // Resize: extend area to hovered cell
      const orig = dragState.originalArea!;
      const newRowEnd = Math.min(hoveredCell.row + 1, GRID_ROWS + 1);
      const newColEnd = Math.min(hoveredCell.col + 1, GRID_COLS + 1);
      setAreas(prev => ({
        ...prev,
        [dragState.itemId]: {
          ...orig,
          rowEnd: newRowEnd > orig.rowStart + 1 ? newRowEnd : undefined,
          colEnd: newColEnd > orig.colStart + 1 ? newColEnd : undefined,
        },
      }));
    }

    setDragState(null);
    setHoveredCell(null);
  }, [dragState, hoveredCell, areas]);

  const getItemStyle = useCallback((id: string): React.CSSProperties => {
    const a = areas[id];
    if (!a) return {};
    return { gridArea: areaToStyle(a) };
  }, [areas]);

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(areas));
  }, [areas]);

  const reset = useCallback(() => {
    setAreas({ ...INITIAL_AREAS });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const cssOutput = generateCss(layout);

  return {
    layout,
    dragItemId: dragState?.itemId ?? null,
    isDragging: !!dragState,
    hoveredCell,
    exportOpen,
    setExportOpen,
    registerCell,
    onItemPointerDown,
    onResizeStart,
    onPointerMove,
    onPointerUp,
    getItemStyle,
    save,
    reset,
    cssOutput,
  };
}
