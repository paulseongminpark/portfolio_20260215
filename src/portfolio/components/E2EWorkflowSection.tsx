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
    desc: 'SessionStart hook이 git status, 이전 세션 요약, 미반영 결정 목록을 자동으로 수집합니다. context-linker가 여러 CLI 세션에 걸친 맥락을 정리해 live-context.md를 생성하고, 재탐색 없이 바로 작업에 착수할 수 있는 상태를 만듭니다.',
    actors: ['SessionStart hook', 'context-linker'],
    inputs: ['이전 세션 요약', 'git status'],
    outputs: ['live-context.md', '크로스세션 맥락'] },
  { id: 2, name: '디스패치', cat: 'hub',
    desc: '/dispatch 명령으로 meta-orchestrator가 STATE.md와 TODO를 분석해 이번 세션에 적합한 팀(ops/build/analyze/maintain)을 추천합니다. 작업 방향이 정해지면 세션 목표를 기록해 status line에 표시하고, 다음 3개 액션을 구체적으로 제시합니다.',
    actors: ['사용자', '/dispatch', 'meta-orchestrator', 'context-linker'],
    inputs: ['사용자 요청', 'STATE.md', 'TODO.md'],
    outputs: ['팀 추천', '세션 목표', '액션 플랜'] },
  { id: 3, name: '플래닝', cat: 'user',
    desc: 'brainstorming 스킬로 요구사항을 탐색하고 2-3가지 접근법을 비교합니다. 설계가 확정되면 writing-plans 스킬이 각 태스크를 2-5분 단위로 쪼개 TDD 순서로 정리합니다. 결과물은 docs/plans/에 저장되어 다음 세션에도 재사용됩니다.',
    actors: ['brainstorming', 'writing-plans', 'Claude'],
    inputs: ['요구사항', '기존 코드베이스'],
    outputs: ['설계 문서', '구현 계획', '태스크 리스트'] },
  { id: 4, name: '구현', cat: 'build',
    desc: 'Claude가 플래닝 결과를 바탕으로 코드를 작성합니다. 구현이 완료되면 code-reviewer가 버그·보안·성능·가독성을 점검하고, commit-writer가 프로젝트 컨벤션에 맞는 커밋 메시지를 생성합니다. context-linker가 변경 내역을 크로스세션 맥락에 즉시 반영합니다.',
    actors: ['Claude', 'code-reviewer', 'commit-writer', 'context-linker'],
    inputs: ['구현 계획', '태스크 리스트'],
    outputs: ['코드 변경', '커밋 히스토리', '리뷰 결과'] },
  { id: 5, name: '검증', cat: 'verify',
    desc: '대규모 추출·분석 작업은 Gemini나 Codex에 오프로딩해 메인 컨텍스트를 보호합니다. ai-synthesizer가 외부 결과를 completeness check + 반박 검증으로 걸러냅니다. Claude는 해석과 결정만, 외부 CLI는 추출만 담당하는 역할 분리가 핵심입니다.',
    actors: ['Gemini/Codex', 'ai-synthesizer'],
    inputs: ['추출 요청', '코드/문서'],
    outputs: ['검증된 결과', '정합성 리포트'] },
  { id: 6, name: '배포', cat: 'build',
    desc: 'pf-deployer가 빌드 상태·환경변수·링크·미커밋 파일을 점검해 GO/NO-GO를 판정합니다. security-auditor가 XSS·env 노출·CORS·인증 취약점을 검토합니다. 사용자의 최종 승인이 있어야만 Vercel 배포가 실행되어 의도치 않은 배포를 방지합니다.',
    actors: ['pf-ops', 'security-auditor', '사용자'],
    inputs: ['빌드 결과', '보안 체크리스트'],
    outputs: ['배포 완료', 'GO/NO-GO 판정'] },
  { id: 7, name: '문서화', cat: 'maintain',
    desc: 'doc-ops가 변경 내역을 STATE.md, CHANGELOG.md, KNOWLEDGE.md에 자동으로 반영합니다. Living Docs는 코드와 동기화된 단일 진실 공급원(Single Source of Truth)으로, 다음 세션에서 어떤 CLI에서든 현재 상태를 즉시 파악할 수 있게 합니다.',
    actors: ['doc-ops', 'context-linker'],
    inputs: ['변경 내역', '커밋 로그'],
    outputs: ['STATE.md', 'CHANGELOG.md', 'KNOWLEDGE.md'] },
  { id: 8, name: '세션 마무리', cat: 'maintain',
    desc: 'compressor가 세션 전체 맥락을 핵심 결정·완료 작업·다음 할 일 중심으로 압축해 session-summary.md에 저장합니다. 미완료 작업은 pending.md로 이월되고, SessionEnd hook이 스냅샷을 생성해 다음 세션 시작 시 자동 복구가 가능하게 합니다.',
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

/* ─── Zigzag positions (compact) ─── */
const POS = [
  { x: 20,  y: 0   },
  { x: 250, y: 80  },
  { x: 20,  y: 160 },
  { x: 250, y: 240 },
  { x: 20,  y: 320 },
  { x: 250, y: 400 },
  { x: 20,  y: 480 },
  { x: 250, y: 560 },
]

/* ─── Custom Node ─── */
type PhaseNodeData = { phase: Phase; isSelected: boolean }
type PhaseNodeType  = Node<PhaseNodeData, 'phaseNode'>

function PhaseNode({ data }: NodeProps<PhaseNodeType>) {
  const { phase, isSelected } = data
  const { color, label } = CAT[phase.cat]

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 16px', borderRadius: 100,
      background: isSelected
        ? `linear-gradient(135deg, ${color}18, ${color}06)`
        : C.card,
      border: `1.5px solid ${isSelected ? color : C.line}`,
      boxShadow: isSelected
        ? `0 4px 20px ${color}22, 0 0 0 3px ${color}08`
        : '0 2px 6px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      transition: `all 0.35s ${EASE}`,
      whiteSpace: 'nowrap',
      fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
      minWidth: 148,
      userSelect: 'none',
    }}>
      <Handle type="target" position={Position.Top}
        style={{ opacity: 0, pointerEvents: 'none', width: 0, height: 0, minWidth: 0, minHeight: 0 }} />

      <span style={{
        width: 24, height: 24, borderRadius: '50%',
        background: isSelected ? color : `${color}18`,
        color: isSelected ? '#fff' : color,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 11, fontWeight: 700, flexShrink: 0,
        transition: `all 0.35s ${EASE}`,
      }}>{phase.id}</span>

      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.text, letterSpacing: '-0.01em' }}>
          {phase.name}
        </div>
        <div style={{
          fontSize: 9, fontWeight: 600, color,
          letterSpacing: '0.07em', textTransform: 'uppercase',
          opacity: 0.7, marginTop: 1,
        }}>{label}</div>
      </div>

      <Handle type="source" position={Position.Bottom}
        style={{ opacity: 0, pointerEvents: 'none', width: 0, height: 0, minWidth: 0, minHeight: 0 }} />
    </div>
  )
}

const nodeTypes = { phaseNode: PhaseNode }

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
    style: { stroke: C.accent, strokeWidth: 1.5, opacity: 0.4 },
    markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14, color: C.accent },
  }))

/* ─── Detail Panel ─── */
function DetailPanel({ phase }: { phase: Phase }) {
  const { color } = CAT[phase.cat]
  return (
    <div style={{
      padding: 20,
      background: C.card, borderRadius: 16,
      border: `1px solid ${C.line}`,
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      animation: `e2eFadeIn 0.3s ${EASE}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>{phase.id}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{phase.name}</span>
      </div>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: C.muted, margin: '0 0 16px' }}>
        {phase.desc}
      </p>

      <div style={{ marginBottom: 14 }}>
        <div style={{
          fontSize: 9, fontWeight: 700, color: C.muted,
          letterSpacing: '0.08em', marginBottom: 6, textTransform: 'uppercase' as const,
        }}>Actors</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {phase.actors.map((a, ai) => (
            <span key={a} style={{
              padding: '3px 10px', borderRadius: 100, fontSize: 11,
              fontWeight: ai === 0 ? 600 : 500,
              background: ai === 0 ? `${color}18` : `${color}08`,
              color,
              border: `1px solid ${color}${ai === 0 ? '28' : '12'}`,
            }}>{a}</span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[{ l: 'INPUT', d: phase.inputs }, { l: 'OUTPUT', d: phase.outputs }].map(g => (
          <div key={g.l}>
            <div style={{
              fontSize: 9, fontWeight: 700, color: C.muted,
              letterSpacing: '0.08em', marginBottom: 6, textTransform: 'uppercase' as const,
            }}>{g.l}</div>
            {g.d.map(item => (
              <div key={item} style={{
                fontSize: 11, color: C.text, lineHeight: 1.8,
                paddingLeft: 10, position: 'relative',
              }}>
                <span style={{
                  position: 'absolute', left: 0, top: '50%',
                  transform: 'translateY(-50%)',
                  width: 3, height: 3, borderRadius: '50%',
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

function EmptyState() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '60px 20px',
      color: C.muted, textAlign: 'center',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        border: `1.5px dashed ${C.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, marginBottom: 12, color: C.line,
      }}>→</div>
      <p style={{ fontSize: 12, lineHeight: 1.7, maxWidth: 160, margin: 0, color: C.muted }}>
        노드를 클릭하면<br />상세 정보가 표시됩니다
      </p>
    </div>
  )
}

/* ─── Main Export ─── */
export function E2EWorkflowSection() {
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [nodes, setNodes, onNodesChange] = useNodesState<PhaseNodeType>(makeNodes())
  const [edges, , onEdgesChange] = useEdgesState(makeEdges())

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
    <section>
      <style>{`
        @keyframes e2eFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .e2e-flow .react-flow__attribution { display: none !important; }
        .e2e-flow .react-flow__node { padding: 0 !important; border: none !important; background: transparent !important; box-shadow: none !important; border-radius: 0 !important; }
        .e2e-flow .react-flow__node.selected { box-shadow: none !important; }
      `}</style>

      <div className="wd-section-header">
        <p className="wd-eyebrow">Context Flow</p>
        <h2 className="wd-title">End-to-End Workflow</h2>
      </div>
      <p className="wd-paragraph">
        하나의 세션 안에서 context가 흘러가는 여정. 각 Phase를 클릭하면 관여하는 에이전트와 I/O를 확인할 수 있다.
      </p>

      <div style={{
        display: 'flex', gap: 28, alignItems: 'flex-start',
        maxWidth: 860, margin: '0 auto',
      }}>
        {/* ReactFlow canvas */}
        <div className="e2e-flow" style={{
          width: 400, height: 680, flexShrink: 0,
          borderRadius: 16, overflow: 'hidden',
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
            fitViewOptions={{ padding: 0.1 }}
            nodesDraggable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            preventScrolling={false}
            elementsSelectable={false}
            style={{ background: C.bg }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20} size={1}
              color={C.line}
            />
          </ReactFlow>
        </div>

        {/* Detail sidebar */}
        <div style={{
          flex: 1, minWidth: 0, paddingTop: 48,
          position: 'sticky', top: 24, alignSelf: 'flex-start',
        }}>
          {selected ? <DetailPanel phase={selected} /> : <EmptyState />}
          <p style={{
            fontSize: 11, color: C.muted, textAlign: 'center',
            marginTop: 10, opacity: 0.5, letterSpacing: '0.01em',
          }}>
            노드를 클릭하면 상세 정보가 표시됩니다
          </p>
        </div>
      </div>
    </section>
  )
}
