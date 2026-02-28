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

// ─── Flow Arrow ───
function FlowArrow({ direction }: { direction: 'right' | 'left' }) {
  return (
    <div style={{
      width: 28, display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexShrink: 0,
    }}>
      <svg width="20" height="10" viewBox="0 0 20 10">
        <path
          d={direction === 'right'
            ? 'M 2 5 L 15 5 M 11 2 L 15 5 L 11 8'
            : 'M 18 5 L 5 5 M 9 2 L 5 5 L 9 8'}
          stroke={A.line} fill="none" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── Phase Card ───
function PhaseCard({ phase, isSelected, onClick }: {
  phase: Phase; isSelected: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = TEAM_ACCENT[phase.team] || A.textMuted;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: A.surface,
        borderRadius: 14,
        border: `1px solid ${isSelected ? accent : A.border}`,
        borderTop: `3px solid ${accent}`,
        padding: '20px 18px 16px',
        cursor: 'pointer',
        transition: `all 0.35s ${EASE}`,
        boxShadow: isSelected
          ? `0 4px 16px ${accent}18`
          : hovered
            ? '0 4px 12px rgba(20,20,19,0.06)'
            : '0 1px 3px rgba(20,20,19,0.03)',
        transform: hovered && !isSelected ? 'translateY(-2px)' : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column' as const,
      }}
    >
      <div style={{
        fontSize: 12, fontWeight: 500, color: A.textMuted,
        letterSpacing: '0.04em', marginBottom: 6,
      }}>
        {phase.num}
      </div>

      <div style={{
        fontSize: 15, fontWeight: 700, color: A.text,
        marginBottom: 8, lineHeight: 1.2,
      }}>
        {phase.label}
      </div>

      <div style={{
        fontSize: 12, color: A.textSec, lineHeight: 1.5,
        marginBottom: 12, flex: 1,
      }}>
        {phase.desc}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        flexWrap: 'wrap' as const,
      }}>
        {phase.chain && (
          <span style={{
            fontSize: 10, fontWeight: 600, color: A.accent,
            background: `${A.accent}12`, padding: '2px 8px',
            borderRadius: 6, letterSpacing: '0.02em',
          }}>
            {phase.chain} chain
          </span>
        )}
        <span style={{ fontSize: 10, color: A.textMuted }}>
          {phase.actors.length} actors
        </span>
      </div>
    </div>
  );
}

// ─── Detail Panel ───
function DetailPanel({ phase }: { phase: Phase }) {
  return (
    <div style={{
      margin: '12px 0',
      padding: '24px 28px',
      background: A.surface,
      borderRadius: 16,
      border: `1px solid ${A.border}`,
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        marginBottom: 20, flexWrap: 'wrap' as const,
      }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: A.text }}>
          {phase.num} {phase.label}
        </span>
        {phase.chain && (
          <span style={{
            fontSize: 11, fontWeight: 600, color: A.accent,
            background: `${A.accent}10`, padding: '3px 10px', borderRadius: 6,
          }}>
            {phase.chain} chain
          </span>
        )}
        {phase.hooks?.map(h => (
          <span key={h} style={{
            fontSize: 11, fontWeight: 500, color: A.gold,
            background: `${A.gold}15`, padding: '3px 10px', borderRadius: 6,
          }}>
            {h}
          </span>
        ))}
      </div>

      {/* Actor flow */}
      <div style={{
        display: 'flex', alignItems: 'center',
        overflowX: 'auto', paddingBottom: 4, gap: 0,
      }}>
        {phase.actors.map((actor, i) => {
          const color = ACTOR_COLOR[actor.type] || A.textMuted;
          return (
            <Fragment key={i}>
              <div style={{
                background: `${color}08`,
                border: `1px solid ${color}30`,
                borderLeft: `3px solid ${color}`,
                borderRadius: '0 10px 10px 0',
                padding: '12px 16px',
                minWidth: 140, flexShrink: 0,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: A.text }}>
                    {actor.name}
                  </span>
                  {actor.model && (
                    <span style={{
                      fontSize: 9, fontWeight: 700,
                      color: MODEL_COLOR[actor.model] || A.textMuted,
                      background: `${MODEL_COLOR[actor.model] || A.textMuted}15`,
                      padding: '1px 6px', borderRadius: 4,
                    }}>
                      {actor.model}
                    </span>
                  )}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, color,
                  letterSpacing: '0.03em', marginBottom: 4,
                }}>
                  {ACTOR_LABEL[actor.type]}
                </div>
                <div style={{ fontSize: 11, color: A.textSec, lineHeight: 1.4 }}>
                  {actor.action}
                </div>
              </div>

              {i < phase.actors.length - 1 && (
                <div style={{
                  width: 24, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="18" height="8" viewBox="0 0 18 8">
                    <path d="M 1 4 L 14 4 M 11 1.5 L 14 4 L 11 6.5"
                      stroke={A.line} fill="none" strokeWidth="1.2" strokeLinecap="round" />
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
export default function E2EWorkflow() {
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
      maxWidth: 960, margin: '0 auto', padding: '56px 32px',
      fontFamily: "'Inter', 'Noto Sans KR', system-ui, sans-serif",
      color: A.text, background: A.bg, minHeight: '100vh',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: A.accent,
          letterSpacing: '0.14em', textTransform: 'uppercase' as const,
          marginBottom: 16,
        }}>
          E2E WORKFLOW
        </div>
        <h2 style={{
          fontSize: 36, fontWeight: 700, color: A.text,
          margin: 0, lineHeight: 1.15, letterSpacing: '-0.02em',
        }}>
          하나의 작업이 완료되기까지
        </h2>
        <p style={{
          fontSize: 16, color: A.textSec, maxWidth: 500,
          margin: '16px auto 0', lineHeight: 1.7,
        }}>
          세션 시작부터 마무리까지, 체인 · 에이전트 · 스킬 · Hook이 어떻게 협력하는지
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 20,
        marginBottom: 40, flexWrap: 'wrap' as const,
      }}>
        {Object.entries(ACTOR_LABEL).map(([key, label]) => (
          <div key={key} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: A.textSec,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: ACTOR_COLOR[key], opacity: 0.7,
            }} />
            {label}
          </div>
        ))}
      </div>

      {/* Row 1: 01 → 02 → 03 → 04 */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {row1.map((phase, i) => (
          <Fragment key={phase.id}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <PhaseCard
                phase={phase}
                isSelected={selected === phase.id}
                onClick={() => toggle(phase.id)}
              />
            </div>
            {i < 3 && <FlowArrow direction="right" />}
          </Fragment>
        ))}
      </div>

      {/* Detail (Row 1) */}
      {inRow1 && selectedPhase && <DetailPanel phase={selectedPhase} />}

      {/* Turn Connector */}
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        paddingRight: '11%', height: inRow1 ? 20 : 36,
      }}>
        <svg width="14" height="100%" viewBox="0 0 14 36" preserveAspectRatio="none">
          <path
            d="M 7 0 L 7 28 M 3.5 22 L 7 28 L 10.5 22"
            stroke={A.line} fill="none" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Row 2: 08 ← 07 ← 06 ← 05 */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {row2Display.map((phase, i) => (
          <Fragment key={phase.id}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <PhaseCard
                phase={phase}
                isSelected={selected === phase.id}
                onClick={() => toggle(phase.id)}
              />
            </div>
            {i < 3 && <FlowArrow direction="left" />}
          </Fragment>
        ))}
      </div>

      {/* Detail (Row 2) */}
      {inRow2 && selectedPhase && <DetailPanel phase={selectedPhase} />}

      {/* Stats */}
      <div style={{
        marginTop: 56, padding: 32,
        background: A.surface, borderRadius: 16,
        border: `1px solid ${A.border}`,
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24, textAlign: 'center',
        }}>
          {[
            { label: 'Chains', value: '5', color: A.accent },
            { label: 'Agents', value: '15', color: A.blue },
            { label: 'Skills', value: '9', color: A.green },
            { label: 'Hooks', value: '8', color: A.gold },
          ].map(item => (
            <div key={item.label}>
              <div style={{
                fontSize: 36, fontWeight: 700, color: item.color,
                lineHeight: 1, letterSpacing: '-0.03em',
              }}>
                {item.value}
              </div>
              <div style={{
                fontSize: 12, fontWeight: 500, color: A.textSec,
                marginTop: 8, letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
