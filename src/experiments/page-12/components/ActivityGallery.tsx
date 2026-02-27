import { lazy, Suspense, useState } from 'react';

const P = '/work/pmcc';
const IS_DEV = import.meta.env.DEV;

const EditorLazy = IS_DEV
  ? lazy(() => import('./ActivityGalleryEditor'))
  : null;

export function ActivityGallery() {
  const [editorOpen, setEditorOpen] = useState(false);

  if (IS_DEV && editorOpen && EditorLazy) {
    return (
      <Suspense fallback={<div style={{ padding: 40, color: '#999' }}>Loading editor...</div>}>
        <EditorLazy onClose={() => setEditorOpen(false)} />
      </Suspense>
    );
  }

  return (
    <>
      <div className="ag">
        <div className="ag-item ag-jujitsu">
          <video src={`${P}/pmcc_jujitsu_web.mp4`} autoPlay muted loop playsInline />
        </div>
        <div className="ag-item ag-hyrox">
          <video src={`${P}/pmcc_hyrox_web.mp4`} autoPlay muted loop playsInline />
        </div>
        <div className="ag-item ag-yoga">
          <video src={`${P}/pmcc_yoga_web.mp4`} autoPlay muted loop playsInline />
        </div>
        <div className="ag-item ag-crossfit">
          <video src={`${P}/pmcc_crossfit_web.mp4`} autoPlay muted loop playsInline />
        </div>
        <div className="ag-item ag-volunteer">
          <img src={`${P}/pmcc volunteer.JPG`} alt="" loading="lazy" />
        </div>
      </div>
      {IS_DEV && (
        <button className="age-toggle-btn" onClick={() => setEditorOpen(true)}>
          Edit Layout
        </button>
      )}
    </>
  );
}
