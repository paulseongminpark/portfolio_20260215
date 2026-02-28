import { useState, Fragment } from 'react';

// ─── Anthropic Design Tokens ───
const A = {
  bg: '#faf9f5',
  surface: '#ffffff',
  text: '#141413',
  textSec: '#57534e',
  textMuted: '#a8a29e',
  border: '#e8e6dc',
  accent: '#d97757',
  blue: '#6a9bcc',
  green: '#788c5d',
  purple: '#8b7ea0',
  gold: '#c4a87c',
  line: '#d4d0c8',
};

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

// ─── Types ───
interface Actor {
  name: string;
  type: 'agent' | 'skill' | 'hook' | 'user' | 'chain' | 'external';
  model?: string;
  action: string;
}

interface Phase {
  id: string;
  num: string;
  label: string;
  desc: string;
  team: string;
  actors: Actor[];
  chain?: string;
  hooks?: string[];
}

// ─── Mappings ───
const TEAM_ACCENT: Record<string, string> = {
  system: A.gold, hub: A.accent, user: A.textSec,
  build: A.green, verify: A.blue, maintain: A.purple,
};

const ACTOR_COLOR: Record<string, string> = {
  agent: A.blue, skill: A.green, hook: A.gold,
  user: A.textSec, chain: A.accent, external: A.purple,
};

const ACTOR_LABEL: Record<string, string> = {
  agent: 'Agent', skill: 'Skill', hook: 'Hook',
  user: 'User', chain: 'Chain', external: 'AI',
};

const MODEL_COLOR: Record<string, string> = {
  Opus: A.accent, Sonnet: A.blue, Haiku: A.green,
};

// ─── Phase Data ───
const PHASES: Phase[] = [
  {
    id: 'trigger', num: '01', label: '세션 시작', team: 'system',
    desc: '자동 초기화 — 미커밋 경고, 결정 로드, live-context',
    actors: [
      { name: 'SessionStart', type: 'hook', action: '미커밋·결정·.ctx/ 로드' },
      { name: 'context-linker', type: 'agent', model: 'Haiku', action: 'live-context.md 정리' },
    ],
  },
  {
    id: 'dispatch', num: '02', label: '디스패치', team: 'hub',
    desc: '사용자 목표를 받아 팀·체인 결정',
    chain: '디스패치',
    actors: [
      { name: '사용자', type: 'user', action: '세션 목표 입력' },
      { name: '/dispatch', type: 'skill', action: '방향 파악 + 팀 추천' },
      { name: 'meta-orch', type: 'agent', model: 'Opus', action: 'STATE 분석 → 팀 활성화' },
      { name: 'context-linker', type: 'agent', model: 'Haiku', action: '크로스 프로젝트 연결' },
    ],
  },
  {
    id: 'planning', num: '03', label: '플래닝', team: 'user',
    desc: '설계 문서 작성, 구현 계획 수립',
    actors: [
      { name: 'brainstorming', type: 'skill', action: '아이디어 → 설계 탐색' },
      { name: 'writing-plans', type: 'skill', action: '구현 계획 문서화' },
      { name: 'Claude', type: 'external', model: 'Opus', action: '설계 결정 + 판단' },
    ],
  },
  {
    id: 'implement', num: '04', label: '구현', team: 'build',
    desc: '코드 작성 → 리뷰 → 커밋 완주',
    chain: '구현',
    hooks: ['PostToolUse', 'TaskCompleted'],
    actors: [
      { name: 'Claude', type: 'external', model: 'Opus', action: '코드 작성' },
      { name: 'code-reviewer', type: 'agent', model: 'Opus', action: '품질 게이트' },
      { name: 'commit-writer', type: 'agent', model: 'Haiku', action: '커밋 메시지 생성' },
      { name: 'context-linker', type: 'agent', model: 'Haiku', action: '크로스 프로젝트 연결' },
    ],
  },
  {
    id: 'verify', num: '05', label: '검증', team: 'verify',
    desc: '외부 AI 출력을 3단계로 검증',
    chain: '검증',
    actors: [
      { name: 'Gemini/Codex', type: 'external', action: '벌크 추출 / 정밀 리뷰' },
      { name: 'ai-synthesizer', type: 'agent', model: 'Opus', action: '구조 → 스팟체크 → 반박' },
    ],
  },
  {
    id: 'deploy', num: '06', label: '배포', team: 'build',
    desc: '보안 점검 → 사용자 승인 → push',
    chain: '배포',
    actors: [
      { name: 'pf-ops', type: 'agent', model: 'Sonnet', action: '빌드+리뷰+배포' },
      { name: 'security-auditor', type: 'agent', model: 'Sonnet', action: 'XSS·env·CORS 점검' },
      { name: '사용자', type: 'user', action: '최종 승인' },
    ],
  },
  {
    id: 'docs', num: '07', label: '문서화', team: 'maintain',
    desc: 'Living Docs + 옵시디언 갱신',
    actors: [
      { name: 'doc-ops', type: 'agent', model: 'Sonnet', action: 'STATE + CHANGELOG 갱신' },
      { name: 'context-linker', type: 'agent', model: 'Haiku', action: '옵시디언 + cross-project' },
    ],
  },
  {
    id: 'compress', num: '08', label: '세션 마무리', team: 'maintain',
    desc: '세션 압축 + 다음 세션 연속성 보장',
    chain: '압축',
    actors: [
      { name: '/compact', type: 'skill', action: '압축 시작' },
      { name: 'compressor', type: 'agent', model: 'Opus', action: '9단계 압축' },
      { name: 'doc-ops', type: 'agent', model: 'Sonnet', action: 'Living Docs verify' },
      { name: 'SessionEnd', type: 'hook', action: '미커밋 경고 + MEMORY' },
    ],
  },
];

// ─── Circle Node ───
function CircleNode({ phase, isSelected, onClick }: {
  phase: Phase; isSelected: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = TEAM_ACCENT[phase.team] || A.textMuted;
  const active = isSelected || hovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        cursor: 'pointer', gap: 14, padding: '4px 0',
        flex: 1, minWidth: 0,
      }}
    >
      {/* Circle with glow */}
      <div style={{ position: 'relative', width: 72, height: 72 }}>
        {/* Outer glow */}
        <div style={{
          position: 'absolute', inset: -8,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent}${active ? '22' : '00'} 0%, transparent 70%)`,
          transition: `all 0.5s ${EASE}`,
        }} />
        {/* Main circle */}
        <div style={{
          position: 'relative',
          width: 72, height: 72, borderRadius: '50%',
          background: isSelected
            ? `linear-gradient(145deg, ${accent}, ${accent}cc)`
            : A.surface,
          border: `2px solid ${active ? accent : `${accent}30`}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: `all 0.4s ${EASE}`,
          transform: hovered ? 'scale(1.08)' : 'scale(1)',
          boxShadow: isSelected
            ? `0 8px 24px ${accent}28`
            : `0 2px 8px rgba(20,20,19,0.04)`,
        }}>
          <span style={{
            fontSize: 18, fontWeight: 700,
            color: isSelected ? '#fff' : accent,
            letterSpacing: '-0.02em',
            transition: `color 0.3s ${EASE}`,
          }}>
            {phase.num}
          </span>
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: 'center', maxWidth: 140 }}>
        <div style={{
          fontSize: 14, fontWeight: 700, color: A.text,
          marginBottom: 5, lineHeight: 1.2,
        }}>
          {phase.label}
        </div>
        <div style={{
          fontSize: 11, color: A.textMuted, lineHeight: 1.5,
          opacity: active ? 1 : 0.65,
          transition: `opacity 0.3s ${EASE}`,
        }}>
          {phase.desc}
        </div>
      </div>

      {/* Chain pill */}
      {phase.chain && (
        <span style={{
          fontSize: 10, fontWeight: 600, color: accent,
          background: `${accent}0a`, padding: '3px 12px',
          borderRadius: 100, border: `1px solid ${accent}18`,
        }}>
          {phase.chain}
        </span>
      )}
    </div>
  );
}

// ─── Curved Connector ───
function CurvedConnector({ direction }: { direction: 'right' | 'left' }) {
  return (
    <div style={{
      width: 44, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
      alignSelf: 'flex-start', paddingTop: 32,
    }}>
      <svg width="36" height="18" viewBox="0 0 36 18">
        {direction === 'right' ? (
          <path
            d="M 2 9 C 10 3, 22 3, 30 9 M 26 5.5 L 30 9 L 26 12.5"
            stroke={A.line} fill="none" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
        ) : (
          <path
            d="M 34 9 C 26 3, 14 3, 6 9 M 10 5.5 L 6 9 L 10 12.5"
            stroke={A.line} fill="none" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}

// ─── Organic Detail Panel ───
function OrganicDetail({ phase }: { phase: Phase }) {
  const accent = TEAM_ACCENT[phase.team] || A.textMuted;

  return (
    <div style={{
      margin: '24px auto 12px',
      maxWidth: 740,
      padding: '28px 32px',
      background: `linear-gradient(140deg, ${accent}06, ${accent}02)`,
      borderRadius: 28,
      border: `1px solid ${accent}15`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 22, flexWrap: 'wrap' as const,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: `${accent}12`, border: `1.5px solid ${accent}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: accent,
        }}>
          {phase.num}
        </div>
        <span style={{ fontSize: 16, fontWeight: 700, color: A.text }}>
          {phase.label}
        </span>
        {phase.chain && (
          <span style={{
            fontSize: 11, fontWeight: 600, color: accent,
            background: `${accent}0c`, padding: '4px 14px',
            borderRadius: 100,
          }}>
            {phase.chain} chain
          </span>
        )}
        {phase.hooks?.map(h => (
          <span key={h} style={{
            fontSize: 11, fontWeight: 500, color: A.gold,
            background: `${A.gold}0c`, padding: '4px 14px',
            borderRadius: 100,
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Actor flow as pills */}
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 0, overflowX: 'auto', paddingBottom: 4,
      }}>
        {phase.actors.map((actor, i) => {
          const color = ACTOR_COLOR[actor.type] || A.textMuted;
          return (
            <Fragment key={i}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: A.surface,
                border: `1px solid ${color}1a`,
                borderRadius: 100,
                padding: '10px 18px',
                flexShrink: 0,
                boxShadow: `0 1px 4px ${color}08`,
              }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: color, flexShrink: 0,
                }} />
                <div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span style={{
                      fontSize: 13, fontWeight: 700, color: A.text,
                      whiteSpace: 'nowrap' as const,
                    }}>
                      {actor.name}
                    </span>
                    {actor.model && (
                      <span style={{
                        fontSize: 9, fontWeight: 700,
                        color: MODEL_COLOR[actor.model] || A.textMuted,
                        background: `${MODEL_COLOR[actor.model] || A.textMuted}10`,
                        padding: '1px 7px', borderRadius: 100,
                      }}>
                        {actor.model}
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: 10, color: A.textSec, lineHeight: 1.3,
                    marginTop: 2, whiteSpace: 'nowrap' as const,
                  }}>
                    {actor.action}
                  </div>
                </div>
              </div>

              {i < phase.actors.length - 1 && (
                <div style={{
                  width: 22, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="16" height="10" viewBox="0 0 16 10">
                    <path d="M 0 5 C 5 2, 9 2, 13 5 M 10 2.5 L 13 5 L 10 7.5"
                      stroke={A.line} fill="none" strokeWidth="1"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main ───
export default function E2EWorkflow_v2() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedPhase = PHASES.find(p => p.id === selected);
  const selectedIdx = selectedPhase ? PHASES.indexOf(selectedPhase) : -1;
  const inRow1 = selectedIdx >= 0 && selectedIdx < 4;
  const inRow2 = selectedIdx >= 4;

  const row1 = PHASES.slice(0, 4);
  const row2Display = [...PHASES.slice(4)].reverse();

  const toggle = (id: string) => setSelected(prev => prev === id ? null : id);

  return (
    <div style={{
      maxWidth: 940, margin: '0 auto', padding: '64px 40px',
      fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
      color: A.text, background: A.bg, minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 11, fontWeight: 600, color: A.accent,
          letterSpacing: '0.14em', textTransform: 'uppercase' as const,
          marginBottom: 20,
          background: `${A.accent}08`, padding: '6px 18px',
          borderRadius: 100,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: A.accent,
          }} />
          E2E WORKFLOW
        </div>
        <h2 style={{
          fontSize: 40, fontWeight: 700, color: A.text,
          margin: 0, lineHeight: 1.12, letterSpacing: '-0.025em',
        }}>
          하나의 작업이 완료되기까지
        </h2>
        <p style={{
          fontSize: 16, color: A.textSec, maxWidth: 440,
          margin: '20px auto 0', lineHeight: 1.7,
        }}>
          세션 시작부터 마무리까지, 체인 · 에이전트 · 스킬 · Hook이 어떻게 협력하는지
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 24,
        marginBottom: 56, flexWrap: 'wrap' as const,
      }}>
        {Object.entries(ACTOR_LABEL).map(([key, label]) => (
          <div key={key} style={{
            display: 'flex', alignItems: 'center', gap: 7,
            fontSize: 12, color: A.textSec,
          }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: ACTOR_COLOR[key], opacity: 0.8,
            }} />
            {label}
          </div>
        ))}
      </div>

      {/* Row 1: 01 → 02 → 03 → 04 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        {row1.map((phase, i) => (
          <Fragment key={phase.id}>
            <CircleNode
              phase={phase}
              isSelected={selected === phase.id}
              onClick={() => toggle(phase.id)}
            />
            {i < 3 && <CurvedConnector direction="right" />}
          </Fragment>
        ))}
      </div>

      {/* Detail (Row 1) */}
      {inRow1 && selectedPhase && <OrganicDetail phase={selectedPhase} />}

      {/* Turn Connector */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        paddingRight: '10%',
        height: inRow1 ? 28 : 48,
      }}>
        <svg width="24" height="100%" viewBox="0 0 24 48" preserveAspectRatio="none">
          <path
            d="M 12 2 C 12 16, 12 32, 12 40 M 7 34 L 12 42 L 17 34"
            stroke={A.line} fill="none" strokeWidth="1.4"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Row 2: 08 ← 07 ← 06 ← 05 */}
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        {row2Display.map((phase, i) => (
          <Fragment key={phase.id}>
            <CircleNode
              phase={phase}
              isSelected={selected === phase.id}
              onClick={() => toggle(phase.id)}
            />
            {i < 3 && <CurvedConnector direction="left" />}
          </Fragment>
        ))}
      </div>

      {/* Detail (Row 2) */}
      {inRow2 && selectedPhase && <OrganicDetail phase={selectedPhase} />}

      {/* Stats — organic pills */}
      <div style={{
        marginTop: 72,
        display: 'flex', justifyContent: 'center',
        gap: 16, flexWrap: 'wrap' as const,
      }}>
        {[
          { label: 'Chains', value: '5', color: A.accent },
          { label: 'Agents', value: '15', color: A.blue },
          { label: 'Skills', value: '9', color: A.green },
          { label: 'Hooks', value: '8', color: A.gold },
        ].map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: A.surface,
            border: `1px solid ${A.border}`,
            borderRadius: 100,
            padding: '14px 28px',
          }}>
            <span style={{
              fontSize: 30, fontWeight: 700, color: item.color,
              letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              {item.value}
            </span>
            <span style={{
              fontSize: 12, fontWeight: 500, color: A.textSec,
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
