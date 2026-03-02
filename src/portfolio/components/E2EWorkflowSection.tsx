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
    id: 1, name: '세션 시작', cat: 'system',
    desc: '새 세션을 열면 Claude는 이미 어제 어디까지 했는지 알고 있다. SessionStart hook이 자동으로 실행되어 git status, 미반영 결정 목록, 이전 세션 스냅샷을 수집하고 live-context.md를 생성한다. Claude/Gemini/Codex 세 CLI에 분산된 맥락은 context-linker가 하나로 병합한다. 세션 내내 PostToolUse hook이 작동하며 *.md 파일이 변경될 때마다 live-context.md를 자동 갱신한다. .ctx/shared-context.md가 현재 목표와 진행 상황을 어떤 CLI에서든 읽을 수 있게 공유한다. "어디까지 했더라?"가 아니라 "다음에 뭐 하면 되지?"가 열자마자 눈앞에 있다.',
    actors: ['SessionStart hook', 'context-linker', 'PostToolUse hook'],
    inputs: ['이전 세션 스냅샷', 'git status', 'decisions.md', '.ctx/shared-context.md'],
    outputs: ['live-context.md', '크로스세션 맥락', '작업 준비 완료'],
  },
  {
    id: 2, name: '디스패치', cat: 'hub',
    desc: '세션을 열고 제일 먼저 치는 명령어가 /dispatch다. linker가 먼저 자동으로 실행되어 크로스세션 맥락을 최신 상태로 업데이트한다. 그 다음 meta-orchestrator가 STATE.md, TODO.md, 미반영 결정을 교차 분석해 지금 이 시점에 가장 적합한 팀을 추천한다. 단순한 할 일 목록이 아니라 다음 3개의 구체적 액션과 그 이유가 함께 나온다. 세션 목표가 확정되면 status line에 🎯가 표시되고, 세션 종료 시 달성률이 자동 기록된다.',
    actors: ['linker', 'meta-orchestrator', '사용자'],
    inputs: ['사용자 의도', 'STATE.md', 'TODO.md', '미반영 결정'],
    outputs: ['팀 활성화', '세션 목표', '다음 3개 액션'],
  },
  {
    id: 3, name: '팀 구조', cat: 'hub',
    desc: '15개 에이전트는 3팀 + 허브로 구성된다. build 팀은 code-reviewer(리드), commit-writer, pf-ops, security-auditor로 구현부터 배포까지 담당한다. verify 팀은 ai-synthesizer(리드), gemini-analyzer, codex-reviewer로 외부 CLI 결과를 검증하고 반박한다. maintain 팀은 compressor(리드), doc-ops, linker, daily-ops, tr-ops로 문서화와 컨텍스트 관리를 맡는다. meta-orchestrator는 어느 팀에도 속하지 않는 허브로, /dispatch를 통해서만 호출된다. 같은 작업을 같은 팀이 반복하면서 역할 경계가 명확해진다.',
    actors: ['meta-orchestrator', 'build 팀', 'verify 팀', 'maintain 팀'],
    inputs: ['디스패치 요청', '현재 상태 분석'],
    outputs: ['팀 활성화', '역할 분배', '병렬 실행'],
  },
  {
    id: 4, name: '플래닝', cat: 'user',
    desc: '코드를 한 줄 쓰기 전에 설계를 완성한다. brainstorming 스킬은 "무엇을 만들지"만 받고 나머지는 스스로 탐색한다. 요구사항을 질문 하나씩 정교하게 다듬고, 2~3가지 접근 방식을 트레이드오프와 함께 제안한다. 설계가 승인되면 writing-plans가 전체 작업을 2~5분짜리 단위로 쪼개 TDD 순서로 배열한다. 실패 테스트를 먼저 쓰고, 최소한의 코드로 통과시키고, 커밋. 이 순서를 지키면 나중에 처음으로 되돌아오는 일이 훨씬 줄어든다.',
    actors: ['brainstorming', 'writing-plans', 'Claude'],
    inputs: ['요구사항', '기존 코드베이스', '설계 제약'],
    outputs: ['설계 문서', '태스크별 구현 계획', '테스트 케이스'],
  },
  {
    id: 5, name: '구현', cat: 'build',
    desc: '"만들었어"라고 말하는 순간 구현 체인이 자동으로 시작된다. code-reviewer가 버그, 보안 취약점, 성능 병목을 점검하고 수정이 필요한 라인과 대안 코드를 직접 제시한다. 리뷰가 통과되면 commit-writer가 컨벤션에 맞는 커밋 메시지를 생성한다. 마지막으로 linker가 이 변경이 다른 프로젝트에 영향을 주는지 감지하고 크로스프로젝트 알림을 보낸다. 구현부터 커밋, 링킹까지—사람이 개입하는 지점은 리뷰 결과를 확인하고 승인하는 것 하나뿐이다.',
    actors: ['Claude', 'code-reviewer', 'commit-writer', 'linker'],
    inputs: ['구현 계획', '태스크 리스트'],
    outputs: ['코드 변경', '커밋 히스토리', '크로스프로젝트 알림'],
  },
  {
    id: 6, name: '체인 자동화', cat: 'system',
    desc: '6개 체인은 "건너뛰기 금지" 원칙으로 작동한다. 구현 체인: code-reviewer → commit-writer → linker. 배포 체인: pf-ops → security-auditor → 사용자 확인 → push. 검증 체인: Gemini/Codex 추출 → ai-synthesizer verify barrier. 디스패치 체인: linker → meta-orchestrator → 팀 활성화. 압축 체인: /compact → compressor 9단계 → doc-ops → doc-ops verify. 세션 전환 체인: /sync all → /compact → linker → 새 세션 준비. 체인은 단순한 자동화가 아니다. 각 단계를 순서대로 강제함으로써 리뷰 없는 커밋, 검증 없는 배포, 문서화 없는 마무리가 구조적으로 불가능해진다.',
    actors: ['build 팀', 'verify 팀', 'maintain 팀', 'meta-orchestrator'],
    inputs: ['트리거 이벤트', '이전 단계 출력'],
    outputs: ['보장된 품질', '자동화된 흐름', '누락 방지'],
  },
  {
    id: 7, name: '검증', cat: 'verify',
    desc: '수백 개의 파일을 한 번에 분석해야 할 때는 외부 CLI에 위임한다. gemini-analyzer가 전체 코드베이스를 구조화된 JSON으로 추출하고, codex-reviewer가 diff 리뷰와 포맷 QA를 담당한다. ai-synthesizer가 이 결과를 받아 completeness check와 반박 검증을 수행한다—빠진 케이스, 데이터와 맞지 않는 결론, 놓친 리스크를 교차 검증한다. 외부 CLI는 추출 도구이고, 판단은 항상 Claude가 직접 내린다는 원칙이 흔들리는 순간 결과를 신뢰할 수 없다.',
    actors: ['gemini-analyzer', 'codex-reviewer', 'ai-synthesizer', 'Claude'],
    inputs: ['분석 요청', '코드/문서', '외부 CLI 결과'],
    outputs: ['검증된 결과', '정합성 리포트', '반박 포인트'],
  },
  {
    id: 8, name: '배포', cat: 'build',
    desc: '배포 버튼을 누르기 전까지 사람이 할 일은 아무것도 없다. pf-ops가 빌드 성공 여부, 환경변수 누락, 깨진 링크, 미커밋 파일을 확인한다. security-auditor가 XSS 취약점, .env 노출 가능성, CORS 설정, 인증 취약점을 검토한다. 두 에이전트가 모두 GO 판정을 내린 후에만 사용자에게 최종 확인을 요청하고, 승인이 떨어지면 push까지 자동으로 이어진다. 체크리스트 없이 배포하다 실수하는 상황을 구조적으로 막는 것이 목적이다.',
    actors: ['pf-ops', 'security-auditor', '사용자'],
    inputs: ['빌드 결과', '환경 설정', '보안 체크리스트'],
    outputs: ['GO/NO-GO 판정', '배포 완료', 'push'],
  },
  {
    id: 9, name: '문서화', cat: 'maintain',
    desc: '코드가 바뀌면 문서도 자동으로 바뀐다. doc-ops가 변경 내역을 STATE.md(현재 인벤토리), CHANGELOG.md(변경 이력), KNOWLEDGE.md(발견된 패턴)에 반영한다. 반영이 끝나면 doc-ops verify가 실제 파일과 STATE.md가 일치하는지 3레이어로 검증한다. linker가 .ctx/shared-context.md를 동기화해 어떤 CLI에서든 같은 프로젝트 상태를 볼 수 있게 한다. 이 세 파일은 단순한 기록이 아니라 다음 세션이 시작될 때 Claude가 가장 먼저 읽는 컨텍스트다.',
    actors: ['doc-ops', 'doc-ops verify', 'linker'],
    inputs: ['변경 내역', '커밋 로그', '결정 사항'],
    outputs: ['STATE.md', 'CHANGELOG.md', 'KNOWLEDGE.md', 'shared-context.md'],
  },
  {
    id: 10, name: '세션 마무리', cat: 'maintain',
    desc: '세션이 끝나도 맥락은 사라지지 않는다. 세션 전환 체인이 순서대로 실행된다. /sync all이 모든 프로젝트의 STATE.md를 갱신하고 push한다. /compact가 실행되면 PreCompact hook이 먼저 스냅샷을 생성한다. compressor가 200K 컨텍스트를 200자 이내로 압축한다—완료 작업, 핵심 결정, 다음 할 일, 실패한 시도까지. doc-ops verify가 문서 정합성을 확인하고, linker가 다음 세션을 위한 크로스세션 맥락을 정리한다. SessionEnd hook이 스냅샷을 저장하면 다음 SessionStart로 전달된다. 이 루프가 끊기지 않는 한, 세션이 바뀌어도 흐름은 이어진다.',
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
      minHeight: 420,
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
          fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
          letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 7,
        }}>Actors</div>
        <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 5 }}>
          {phase.actors.map((a, ai) => (
            <span key={a} style={{
              padding: '3px 10px', borderRadius: 100, fontSize: 11,
              fontWeight: ai === 0 ? 600 : 400,
              background: ai === 0 ? `${color}1E` : 'rgba(255,255,255,0.05)',
              color: ai === 0 ? color : 'rgba(255,255,255,0.62)',
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
              fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 7,
            }}>{g.l}</div>
            {g.d.map(item => (
              <div key={item} style={{
                fontSize: 11, color: 'rgba(255,255,255,0.7)',
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

      {/* 파란 영역 — 01~10 phase only */}
      <div style={{
        background: SECTION_BG,
        borderRadius: 20,
        overflow: 'clip' as React.CSSProperties['overflow'],
        position: 'relative',
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
        <div style={{ padding: '32px 48px 48px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex', gap: 32, alignItems: 'flex-start',
            maxWidth: 956, margin: '0 auto',
          }}>
            {/* left: phase nav list */}
            <div style={{ width: 148, flexShrink: 0, paddingTop: 20 }}>
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
