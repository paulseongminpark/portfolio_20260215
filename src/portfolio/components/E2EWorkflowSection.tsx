import React, { useState } from 'react'

/* ─── Tokens ─── */
const SECTION_BG = '#6A9BCC'
const NODE_BG    = '#141413'
const EASE       = 'cubic-bezier(0.16, 1, 0.3, 1)'

/* ─── Types ─── */
type Phase = {
  id: number; name: string; cat: string; desc: string
  actors: string[]; inputs: string[]; outputs: string[]
}

/* ─── Data ─── */
const PHASES: Phase[] = [
  {
    id: 1, name: 'Start', cat: 'system',
    desc: '새 세션을 열면 시스템이 이미 준비된 상태다. 어제 어떤 결정을 했는지, 어디서 멈췄는지, 아직 처리 못 한 게 뭔지 — 다시 꺼내서 설명할 필요 없이 자동으로 올라온다. 여러 도구에 흩어진 맥락도 하나로 모인다. 시작하자마자 다음 일로 들어갈 수 있다. 세션 내내 파일이 바뀔 때마다 맥락도 자동으로 갱신된다. 어떤 도구에서 작업하든 같은 프로젝트 상태를 보고 있다.',
    actors: ['SessionStart hook', 'context-linker', 'PostToolUse hook'],
    inputs: ['이전 세션 스냅샷', 'git status', 'decisions.md', '.ctx/shared-context.md'],
    outputs: ['live-context.md', '크로스세션 맥락', '작업 준비 완료'],
  },
  {
    id: 2, name: 'Dispatch', cat: 'hub',
    desc: '/dispatch 하나로 오늘 세션의 방향이 잡힌다. 현재 상태, 미완료 항목, 결정을 기다리는 것들을 분석해서 지금 가장 중요한 일 세 가지를 이유와 함께 제안한다. 스스로 할 일을 정하는 게 아니라, 판단할 근거를 받고 내가 결정하는 구조다. 세션 목표가 확정되면 달성률이 마무리 시점에 자동으로 남는다. 우선순위가 어긋난 채로 하루를 시작하는 일이 없어진다. 방향을 확인하고 들어가는 것과 그냥 들어가는 것은 나중에 차이가 크다.',
    actors: ['linker', 'meta-orchestrator', '사용자'],
    inputs: ['사용자 의도', 'STATE.md', 'TODO.md', '미반영 결정'],
    outputs: ['팀 활성화', '세션 목표', '다음 3개 액션'],
  },
  {
    id: 3, name: 'Plan', cat: 'user',
    desc: '코드를 쓰기 전에 설계를 완성한다. 요구사항이 뭔지, 어떤 방식으로 접근할지, 트레이드오프가 뭔지 함께 정리하고, 승인이 나면 작업이 순서 있는 단위로 쪼개진다. 설계가 잡히면 한 번 더 돌아본다 — 방향이 맞는지, 빠진 게 없는지. 이 단계를 꼼꼼하게 할수록 구현 중에 되돌아오는 일이 줄어든다. 설계 단계에서 발견한 문제는 구현 단계보다 고치는 비용이 훨씬 싸다. 처음에 느리게 가는 게 결국 더 빠른 이유다.',
    actors: ['brainstorming', 'writing-plans', 'Claude'],
    inputs: ['요구사항', '기존 코드베이스', '설계 제약'],
    outputs: ['설계 문서', '태스크별 구현 계획', '검증 완료'],
  },
  {
    id: 4, name: 'Prep', cat: 'maintain',
    desc: '구현 들어가기 전에 지금까지 결정된 것들을 기록으로 남긴다. 작업이 길어질수록 맥락이 흐려지고, 흐릿한 상태에서 구현하면 방향을 잃는다. 정리해두고 시작하면 구현 중에도 흔들리지 않는다. 의도적으로 만든 습관이다. STATE.md와 CHANGELOG.md를 갱신하고, 필요하면 컨텍스트를 압축한다. 깔끔하게 정리된 상태에서 시작해야 구현 중 판단이 흔들리지 않는다.',
    actors: ['doc-ops', 'compressor', '사용자'],
    inputs: ['결정 사항', '현재 상태', '미반영 기록'],
    outputs: ['STATE.md 갱신', 'CHANGELOG.md 갱신', '정리된 컨텍스트'],
  },
  {
    id: 5, name: 'Build', cat: 'build',
    desc: '설계대로 만든다. "만들었어"라고 하면 리뷰가 자동으로 시작된다. 버그, 보안, 성능이 점검되고 수정 방향이 제시된다. 리뷰가 통과되면 커밋이 만들어지고, 다른 프로젝트에 영향이 가는지까지 확인된다. 결과를 보고 승인하는 것만 남는다. 같은 작업을 같은 팀이 반복하면서 패턴이 쌓인다. 리뷰 기준이 높아지는 건 코드가 아니라 시스템이 축적한 경험 덕분이다.',
    actors: ['Claude', 'code-reviewer', 'commit-writer', 'linker'],
    inputs: ['구현 계획', '태스크 리스트'],
    outputs: ['코드 변경', '커밋 히스토리', '크로스프로젝트 알림'],
  },
  {
    id: 6, name: 'Verify', cat: 'verify',
    desc: '구현이 끝나도 바로 배포하지 않는다. 코드베이스 전체를 직접 다 확인하는 건 불가능하니, 분석은 외부 AI에게 맡기고 판단은 직접 내린다. 빠진 케이스, 맞지 않는 결론, 놓친 리스크가 교차 검증된다. 외부 도구는 분석까지고, 판단은 항상 이쪽에서 한다. 외부 AI가 놓친 것을 Claude가 잡아내고, Claude가 놓친 걸 다시 교차 확인한다. 결과를 믿으려면 과정을 믿을 수 있어야 한다.',
    actors: ['gemini-analyzer', 'codex-reviewer', 'ai-synthesizer', 'Claude'],
    inputs: ['분석 요청', '코드/문서', '외부 CLI 결과'],
    outputs: ['검증된 결과', '정합성 리포트', '반박 포인트'],
  },
  {
    id: 7, name: 'Deploy', cat: 'build',
    desc: '배포 전 확인은 시스템이 한다. 빌드 상태, 환경 설정, 보안 취약점이 순서대로 점검되고, 모두 통과하면 그제야 최종 확인을 요청한다. 승인이 나면 push까지 이어진다. 체크리스트를 직접 돌리다 하나 빠트리는 일을 구조적으로 없앤다. 사람이 직접 하면 반드시 빠트리는 단계가 생긴다. 그걸 구조로 막는다.',
    actors: ['pf-ops', 'security-auditor', '사용자'],
    inputs: ['빌드 결과', '환경 설정', '보안 체크리스트'],
    outputs: ['GO/NO-GO 판정', '배포 완료', 'push'],
  },
  {
    id: 8, name: 'Archive', cat: 'maintain',
    desc: '코드가 바뀌면 문서도 따라 바뀐다. 뭐가 바뀌었는지, 왜 바뀌었는지, 그 과정에서 발견한 게 뭔지 자동으로 기록된다. 이 기록이 다음 세션이 시작될 때 컨텍스트가 된다. 문서화가 별도 작업이 아니라 개발 흐름의 일부로 이어진다. 발견한 패턴, 실패한 시도, 결정의 이유까지 남긴다. 나중에 왜 이렇게 했는지 기억하지 못하는 일이 없어진다.',
    actors: ['doc-ops', 'doc-ops verify', 'linker'],
    inputs: ['변경 내역', '커밋 로그', '결정 사항'],
    outputs: ['STATE.md', 'CHANGELOG.md', 'KNOWLEDGE.md', 'shared-context.md'],
  },
  {
    id: 9, name: 'Close', cat: 'maintain',
    desc: '세션이 끝나도 맥락은 남는다. 모든 프로젝트 상태가 갱신되고, 세션 전체가 핵심만 남겨 압축된다 — 완료한 것, 결정한 것, 다음에 할 것, 실패한 것까지. 이 스냅샷이 다음 세션의 시작점이 된다. 다음에 열면 오늘부터 이어진다. 200K 컨텍스트가 핵심만 남겨 압축된다. 이 루프가 끊기지 않는 한, 세션이 바뀌어도 흐름은 이어진다.',
    actors: ['/sync', 'compressor', 'doc-ops verify', 'linker', 'SessionEnd hook'],
    inputs: ['세션 전체 맥락', '달성률', '미완료 항목'],
    outputs: ['압축 스냅샷', 'STATE.md 갱신', '다음 세션 준비'],
  },
]

const CAT: Record<string, { color: string; label: string }> = {
  system:   { color: '#6BA3CF', label: 'System'   },
  hub:      { color: '#D97757', label: 'Hub'       },
  user:     { color: '#7CC870', label: 'User'      },
  build:    { color: '#A07ACF', label: 'Build'     },
  verify:   { color: '#C4A87C', label: 'Verify'    },
  maintain: { color: '#5BBFCC', label: 'Maintain'  },
}

/* ─── Left Nav ─── */
function PhaseNav({
  phases, activeId, onSelect,
}: { phases: Phase[]; activeId: number; onSelect: (id: number) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 1 }}>
      {phases.map(phase => {
        const active = phase.id === activeId
        return (
          <button
            key={phase.id}
            onClick={() => onSelect(phase.id)}
            style={{
              background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              padding: '9px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textAlign: 'left' as const,
              transition: `background 0.2s ${EASE}`,
              fontFamily: "'Inter','Noto Sans KR',sans-serif",
              width: '100%',
            }}
          >
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              color: active ? '#fff' : 'rgba(255,255,255,0.3)',
              letterSpacing: '0.08em',
              minWidth: 20,
              transition: `color 0.2s ${EASE}`,
            }}>
              {String(phase.id).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: 13,
              fontWeight: active ? 600 : 400,
              color: active ? '#fff' : 'rgba(255,255,255,0.48)',
              transition: `color 0.2s ${EASE}, font-weight 0.2s ${EASE}`,
            }}>
              {phase.name}
            </span>
          </button>
        )
      })}
    </div>
  )
}

/* ─── Large Box ─── */
function LargeBox({ phase }: { phase: Phase }) {
  const { color } = CAT[phase.cat]
  return (
    <div style={{
      background: NODE_BG,
      borderRadius: 12,
      border: '1px solid rgba(255,255,255,0.07)',
      padding: '26px 30px',
      minHeight: 560,
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      animation: `e2eFadeIn 0.28s ${EASE}`,
    }}>
      <div style={{
        fontSize: 16, fontWeight: 700, color: '#fff',
        marginBottom: 14, letterSpacing: '-0.01em',
      }}>
        {phase.name}
      </div>

      <p style={{
        fontSize: 13, lineHeight: 1.85,
        color: '#fff',
        margin: '0 0 22px',
      }}>
        {phase.desc}
      </p>

      {/* Actors */}
      <div style={{ marginBottom: 18 }}>
        <div style={{
          fontSize: 8, fontWeight: 700, color: '#fff',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 7,
        }}>Actors</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5 }}>
          {phase.actors.map((a, ai) => (
            <span key={a} style={{
              padding: '3px 10px', borderRadius: 100, fontSize: 11,
              fontWeight: ai === 0 ? 600 : 400,
              background: ai === 0 ? `${color}1E` : 'rgba(255,255,255,0.05)',
              color: ai === 0 ? color : 'rgba(255,255,255,0.95)',
              border: `1px solid ${ai === 0 ? color + '35' : 'rgba(255,255,255,0.08)'}`,
            }}>{a}</span>
          ))}
        </div>
      </div>

      {/* Input + Output — stacked vertically */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
        {[{ l: 'Input', d: phase.inputs }, { l: 'Output', d: phase.outputs }].map(g => (
          <div key={g.l}>
            <div style={{
              fontSize: 8, fontWeight: 700, color: '#fff',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 7,
            }}>{g.l}</div>
            {g.d.map(item => (
              <div key={item} style={{
                fontSize: 11, color: '#fff',
                lineHeight: 1.85, paddingLeft: 11,
                position: 'relative' as const,
              }}>
                <span style={{
                  position: 'absolute' as const, left: 0, top: '0.65em',
                  width: 3, height: 3, borderRadius: '50%',
                  background: color, opacity: 0.55,
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

/* ─── Main Export ─── */
export function E2EWorkflowSection() {
  const [activeId, setActiveId] = useState(1)
  const activePhase = PHASES.find(p => p.id === activeId)!

  return (
    <section>
      <style>{`
        @keyframes e2eFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* header — 메인 페이지 배경 */}
      <div style={{ paddingBottom: 24 }}>
        <p className="wd-eyebrow">Context Flow</p>
        <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' as const, gap: '0 14px' }}>
          <h2 className="wd-title" style={{ margin: 0 }}>End-to-End Workflow</h2>
          <span style={{
            fontSize: 15, fontWeight: 400,
            color: 'rgba(0,0,0,0.45)',
            letterSpacing: '-0.01em',
          }}>
            — 하나의 세션 안에서 context가 흘러가는 여정
          </span>
        </div>
      </div>

      {/* 파란 영역 — 01~09 phase only */}
      <div style={{
        background: SECTION_BG,
        borderRadius: 20,
        overflow: 'clip' as React.CSSProperties['overflow'],
        position: 'relative',
        maxWidth: 860,
        margin: '0 auto',
      }}>
        {/* decorative waves */}
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1200 900"
        >
          <path d="M-80,140 C200,40 450,280 720,160 C990,40 1100,200 1320,130"
            stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
          <path d="M-80,380 C160,300 380,500 660,370 C940,240 1080,420 1320,340"
            stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
          <path d="M-80,660 C180,580 420,760 700,650 C980,540 1100,700 1320,620"
            stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" />
        </svg>

        {/* main content */}
        <div style={{ padding: '32px 36px 48px', position: 'relative', zIndex: 1 }}>
          <div className="p12-e2e-inner" style={{
            display: 'flex', gap: 28, alignItems: 'flex-start',
          }}>
            {/* left: phase nav list */}
            <div className="p12-e2e-nav" style={{ width: 148, flexShrink: 0, paddingTop: 20 }}>
              <PhaseNav phases={PHASES} activeId={activeId} onSelect={setActiveId} />
            </div>

            {/* right: large box */}
            <div style={{ flex: 1, minWidth: 0, maxWidth: 690 }}>
              <LargeBox phase={activePhase} key={activePhase.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
