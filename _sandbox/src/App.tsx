import { useState } from 'react'
import E2EWorkflowV1 from './E2EWorkflow_v1'
import E2EWorkflowV2 from './E2EWorkflow_v2'
import E2EWorkflowV3 from './E2EWorkflow_v3'

function App() {
  const [version, setVersion] = useState<'v1' | 'v2' | 'v3'>('v3')
  return (
    <div>
      <div style={{
        position: 'fixed', top: 16, right: 16, zIndex: 100,
        display: 'flex', gap: 4,
        background: '#fff', borderRadius: 100, padding: 4,
        border: '1px solid #e8e6dc',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}>
        {(['v1', 'v2', 'v3'] as const).map(v => (
          <button key={v} onClick={() => setVersion(v)} style={{
            padding: '6px 18px', borderRadius: 100, border: 'none',
            fontSize: 13, fontWeight: version === v ? 700 : 500,
            background: version === v ? '#141413' : 'transparent',
            color: version === v ? '#fff' : '#57534e',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: "'Inter', system-ui, sans-serif",
          }}>
            {v.toUpperCase()}
          </button>
        ))}
      </div>
      {version === 'v1' ? <E2EWorkflowV1 /> : version === 'v2' ? <E2EWorkflowV2 /> : <E2EWorkflowV3 />}
    </div>
  )
}

export default App
