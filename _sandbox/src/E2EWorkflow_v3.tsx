import { useState, useCallback, useEffect } from 'react'
import {
  ReactFlow, useNodesState, useEdgesState,
  Background, BackgroundVariant,
  MarkerType, Handle, Position,
  type NodeProps, type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

/* ─── Tokens ─── */
const C = {
  bg: '#faf9f5', text: '#141413', muted: '#57534e',
  accent: '#d97757', blue: '#6a9bcc', green: '#788c5d',
  purple: '#8b7ea0', gold: '#c4a87c', line: '#d4d0c8', card: '#fff',
}
const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'

/* ─── Types ─── */
type Phase = {
  id: number; name: string; cat: string; desc: string
  actors: string[]; inputs: string[]; outputs: string[]
}

/* ─── Data ─── */
const PHASES: Phase[] = [
  { id: 1, name: '세션 시작', cat: 'system',
    desc: 'SessionStart hook이 자동으로 프로젝트 상태를 수집합니다',
    actors: ['SessionStart hook', 'context-linker'],
    inputs: ['이전 세션 요약', 'git status'],
    outputs: ['live-context.md', '크로스세션 맥락'] },
  { id: 2, name: '디스패치', cat: 'hub',
    desc: '사용자 요청을 분석하고 적절한 팀과 에이전트를 활성화합니다',
    actors: ['사용자', '/dispatch', 'meta-orchestrator', 'context-linker'],
    inputs: ['사용자 요청', 'STATE.md', 'TODO.md'],
    outputs: ['팀 추천', '세션 목표', '액션 플랜'] },
  { id: 3, name: '플래닝', cat: 'user',
    desc: '아이디어를 구체적인 설계와 실행 계획으로 전환합니다',
    actors: ['brainstorming', 'writing-plans', 'Claude'],
    inputs: ['요구사항', '기존 코드베이스'],
    outputs: ['설계 문서', '구현 계획', '태스크 리스트'] },
  { id: 4, name: '구현', cat: 'build',
    desc: '계획에 따라 코드를 작성하고 리뷰하고 커밋합니다',
    actors: ['Claude', 'code-reviewer', 'commit-writer', 'context-linker'],
    inputs: ['구현 계획', '태스크 리스트'],
    outputs: ['코드 변경', '커밋 히스토리', '리뷰 결과'] },
  { id: 5, name: '검증', cat: 'verify',
    desc: '외부 AI로 추출하고 ai-synthesizer가 검증 장벽을 수행합니다',
    actors: ['Gemini/Codex', 'ai-synthesizer'],
    inputs: ['추출 요청', '코드/문서'],
    outputs: ['검증된 결과', '정합성 리포트'] },
  { id: 6, name: '배포', cat: 'build',
    desc: '보안 점검 후 프로덕션에 배포합니다',
    actors: ['pf-ops', 'security-auditor', '사용자'],
    inputs: ['빌드 결과', '보안 체크리스트'],
    outputs: ['배포 완료', 'GO/NO-GO 판정'] },
  { id: 7, name: '문서화', cat: 'maintain',
    desc: 'Living Docs와 상태 문서를 갱신합니다',
    actors: ['doc-ops', 'context-linker'],
    inputs: ['변경 내역', '커밋 로그'],
    outputs: ['STATE.md', 'CHANGELOG.md', 'KNOWLEDGE.md'] },
  { id: 8, name: '세션 마무리', cat: 'maintain',
    desc: '세션을 압축하고 다음 세션을 위한 맥락을 저장합니다',
    actors: ['/compact', 'compressor', 'doc-ops', 'SessionEnd'],
    inputs: ['세션 전체 맥락', '달성률'],
    outputs: ['세션 요약', 'pending.md', '다음 세션 준비'] },
]

const CAT: Record<string, { color: string; label: string }> = {
  system:   { color: C.blue,   label: 'System'   },
  hub:      { color: C.accent, label: 'Hub'       },
  user:     { color: C.green,  label: 'User'      },
  build:    { color: C.purple, label: 'Build'     },
  verify:   { color: C.gold,   label: 'Verify'    },
  maintain: { color: C.blue,   label: 'Maintain'  },
}

/* ─── Zigzag positions ─── */
const POS = [
  { x: 40,  y: 0   },
  { x: 320, y: 110 },
  { x: 40,  y: 220 },
  { x: 320, y: 330 },
  { x: 40,  y: 440 },
  { x: 320, y: 550 },
  { x: 40,  y: 660 },
  { x: 320, y: 770 },
]

/* ─── Custom Node ─── */
type PhaseNodeData = { phase: Phase; isSelected: boolean }
type PhaseNodeType  = Node<PhaseNodeData, 'phaseNode'>

function PhaseNode({ data }: NodeProps<PhaseNodeType>) {
  const { phase, isSelected } = data
  const { color, label } = CAT[phase.cat]

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 20px', borderRadius: 100,
      background: isSelected
        ? `linear-gradient(135deg, ${color}18, ${color}06)`
        : C.card,
      border: `1.5px solid ${isSelected ? color : C.line}`,
      boxShadow: isSelected
        ? `0 4px 24px ${color}25, 0 0 0 4px ${color}08`
        : '0 2px 8px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: `all 0.35s ${EASE}`,
      whiteSpace: 'nowrap',
      fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
      minWidth: 168,
      userSelect: 'none',
    }}>
      <Handle type="target" position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none', width: 0, height: 0, minWidth: 0, minHeight: 0 }} />

      {/* Number badge */}
      <span style={{
        width: 28, height: 28, borderRadius: '50%',
        background: isSelected ? color : `${color}18`,
        color: isSelected ? '#fff' : color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, flexShrink: 0,
        transition: `all 0.35s ${EASE}`,
      }}>{phase.id}</span>

      {/* Label */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: '-0.01em' }}>
          {phase.name}
        </div>
        <div style={{
          fontSize: 10, fontWeight: 600, color,
          letterSpacing: '0.07em', textTransform: 'uppercase',
          opacity: 0.7, marginTop: 2,
        }}>{label}</div>
      </div>

      <Handle type="source" position={Position.Bottom}
        style={{ opacity: 0, pointerEvents: 'none', width: 0, height: 0, minWidth: 0, minHeight: 0 }} />
    </div>
  )
}

/* ─── nodeTypes — MUST be outside component ─── */
const nodeTypes = { phaseNode: PhaseNode }

/* ─── Factories ─── */
const makeNodes = (): PhaseNodeType[] =>
  PHASES.map((phase, i) => ({
    id: String(phase.id),
    type: 'phaseNode' as const,
    position: POS[i],
    data: { phase, isSelected: false },
  }))

const makeEdges = () =>
  PHASES.slice(0, -1).map((phase) => ({
    id: `e${phase.id}-${phase.id + 1}`,
    source: String(phase.id),
    target: String(phase.id + 1),
    type: 'smoothstep',
    animated: true,
    style: { stroke: C.accent, strokeWidth: 1.5, opacity: 0.45 },
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: C.accent },
  }))

/* ─── Detail Panel ─── */
function DetailPanel({ phase }: { phase: Phase }) {
  const { color } = CAT[phase.cat]
  return (
    <div style={{
      padding: 28,
      background: C.card, borderRadius: 20,
      border: `1px solid ${C.line}`,
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      animation: `v3FadeIn 0.35s ${EASE}`,
    }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{
          width: 32, height: 32, borderRadius: '50%',
          background: color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 700, flexShrink: 0,
        }}>{phase.id}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{phase.name}</span>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: C.text, margin: '0 0 20px' }}>
        {phase.desc}
      </p>

      {/* Actors */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: C.muted,
          letterSpacing: '0.08em', marginBottom: 8,
        }}>ACTORS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {phase.actors.map((a, ai) => (
            <span key={a} style={{
              padding: '4px 12px', borderRadius: 100, fontSize: 12,
              fontWeight: ai === 0 ? 600 : 500,
              background: ai === 0 ? `${color}18` : `${color}08`,
              color,
              border: `1px solid ${color}${ai === 0 ? '30' : '15'}`,
            }}>{a}</span>
          ))}
        </div>
      </div>

      {/* I/O */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {[{ l: 'INPUT', d: phase.inputs }, { l: 'OUTPUT', d: phase.outputs }].map(g => (
          <div key={g.l}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: C.muted,
              letterSpacing: '0.08em', marginBottom: 8,
            }}>{g.l}</div>
            {g.d.map(item => (
              <div key={item} style={{
                fontSize: 12, color: C.text, lineHeight: 1.8,
                paddingLeft: 12, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', left: 0, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 4, height: 4, borderRadius: '50%',
                  background: color, opacity: 0.5,
                }} />
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Empty State ─── */
function EmptyState() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '80px 24px',
      color: C.muted, textAlign: 'center',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        border: `1.5px dashed ${C.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, marginBottom: 14, color: C.line,
      }}>→</div>
      <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 180, margin: 0 }}>
        노드를 클릭하면<br />상세 정보가 표시됩니다
      </p>
    </div>
  )
}

/* ─── Main Component ─── */
export default function E2EWorkflowV3() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [nodes, setNodes, onNodesChange] = useNodesState<PhaseNodeType>(makeNodes())
  const [edges, , onEdgesChange] = useEdgesState(makeEdges())

  /* Sync isSelected into node data */
  useEffect(() => {
    setNodes(ns =>
      ns.map(n => ({
        ...n,
        data: { ...n.data, isSelected: Number(n.id) === selectedId },
      }))
    )
  }, [selectedId, setNodes])

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const id = Number(node.id)
    setSelectedId(prev => (prev === id ? null : id))
  }, [])

  const onPaneClick = useCallback(() => setSelectedId(null), [])

  const selected = selectedId !== null
    ? (PHASES.find(p => p.id === selectedId) ?? null)
    : null

  return (
    <div style={{
      background: C.bg, minHeight: '100vh',
      fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
      padding: '64px 0 80px',
    }}>
      <style>{`
        @keyframes v3FadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .react-flow__attribution { display: none !important; }
        .react-flow__node { padding: 0 !important; border: none !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; }
        .react-flow__node.selected { box-shadow: none !important; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 48, padding: '0 24px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 100,
          background: `${C.accent}10`, color: C.accent,
          fontSize: 12, fontWeight: 600, letterSpacing: '0.05em',
          marginBottom: 16,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent }} />
          CONTEXT FLOW
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: C.text, lineHeight: 1.3, margin: 0 }}>
          End-to-End Workflow
        </h2>
        <p style={{
          fontSize: 15, color: C.muted, marginTop: 8,
          maxWidth: 480, marginInline: 'auto', lineHeight: 1.6,
        }}>
          하나의 세션 안에서 context가 흘러가는 여정
        </p>
      </div>

      {/* ── Flow + Sidebar ── */}
      <div style={{
        display: 'flex', gap: 40, alignItems: 'flex-start',
        maxWidth: 1080, margin: '0 auto', padding: '0 32px',
      }}>
        {/* ReactFlow canvas */}
        <div style={{
          width: 560, height: 900, flexShrink: 0,
          borderRadius: 20, overflow: 'hidden',
          border: `1px solid ${C.line}`,
        }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.12 }}
            nodesDraggable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            preventScrolling={false}
            elementsSelectable={false}
            style={{ background: C.bg }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24} size={1}
              color={C.line}
            />
          </ReactFlow>
        </div>

        {/* Detail sidebar */}
        <div style={{ flex: 1, minWidth: 0, paddingTop: 16 }}>
          {selected ? <DetailPanel phase={selected} /> : <EmptyState />}
        </div>
      </div>
    </div>
  )
}
