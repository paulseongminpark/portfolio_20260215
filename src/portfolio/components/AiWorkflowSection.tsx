import React from "react";
import {
  STAT_BADGES,
  PRINCIPLES,
  TEAMS,
  AGENTS,
  KEY_DECISIONS,
  AI_ROLES,
  CHAINS,
  HOOKS,
  TIMELINE,
  LESSONS,
  C,
} from "./aiWorkflowData";
import { E2EWorkflowSection } from "./E2EWorkflowSection";

// ─── AiWorkflowSection — HOW I AI v4.0 ───
// 내러티브 케이스스터디 스타일. wd-* CSS 체계 사용.

export function AiWorkflowSection({ raw: _raw }: { raw?: string }) {
  return (
    <div className="wd-body" style={{ background: C.bg }}>
      {/* ━━━ 1. HERO ━━━ */}
      <section style={{ paddingTop: 80, paddingBottom: 48 }}>
        <p className="wd-eyebrow">HOW I AI</p>
        <h1 className="wd-title" style={{ fontSize: 32, lineHeight: 1.3, maxWidth: 680 }}>
          Context as Currency —<br />
          AI 오케스트레이션 시스템 설계기
        </h1>
        <p className="wd-lede" style={{ maxWidth: 620 }}>
          Claude Code를 운영체제처럼 쓴다. 15개 에이전트, 9개 스킬, 4개 AI 도구가
          하나의 시스템으로 작동한다. 7일간의 설계, 실험, 그리고 빼기의 기록.
        </p>

        {/* stat badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          marginTop: 40,
        }}>
          {STAT_BADGES.map((b, i) => (
            <div key={b.label} style={{
              padding: '28px 24px',
              borderRight: i < STAT_BADGES.length - 1 ? `1px solid ${C.border}` : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 36,
                fontWeight: 600,
                color: C.text,
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                {b.value}
              </div>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 12,
                fontWeight: 600,
                color: C.textMuted,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                marginTop: 8,
              }}>
                {b.label}
              </div>
              {b.sub && (
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  marginTop: 4,
                }}>
                  {b.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 2. 설계 철학 ━━━ */}
      <section>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Philosophy</p>
          <h2 className="wd-title">Context as Currency</h2>
        </div>

        <p className="wd-paragraph">
          <strong>200K 컨텍스트 윈도우가 세션의 전부다.</strong> 한 번 쓴 토큰은 돌아오지 않는다.
          에이전트를 호출하면 예산이 줄고, 파일을 읽으면 잔고가 빠진다.
          이 시스템의 모든 결정은 하나의 질문에서 시작한다 — "이 토큰을 쓸 가치가 있는가?"
        </p>
        <p className="wd-paragraph">
          처음에는 기능을 더했다. 에이전트가 5개에서 24개로, 스킬이 3개에서 14개로 불어났다.
          작동은 했지만, 세션이 빨리 끝났다. baseline만 70K를 먹고 시작하니
          실제 작업할 수 있는 예산이 부족했던 것이다.
        </p>
        <p className="wd-paragraph">
          그래서 뺐다. 에이전트 24→15, 스킬 14→9. 줄일수록 시스템이 좋아졌다.
          남은 예산으로 더 깊이 생각하고, 더 오래 작업할 수 있었다.
          <strong> 빼기가 더하기보다 어려웠고, 더 가치 있었다.</strong>
        </p>

        {/* 3원칙 callout */}
        <div className="wd-callouts" style={{ marginTop: 32 }}>
          {PRINCIPLES.map((p, i) => (
            <div className="wd-callout" key={i}>
              <div>
                <span className="wd-callout-num">{p.icon}</span>
                <span className="wd-callout-label">{p.title}</span>
              </div>
              <p className="wd-callout-body">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 3. 토폴로지 ━━━ */}
      <section>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Topology</p>
          <h2 className="wd-title">15 에이전트, 4팀 + 허브</h2>
        </div>

        <p className="wd-paragraph">
          에이전트가 10개를 넘어가자 어떤 순서로 부를지, 지금 누가 일하고 있는지 직접 추적하는 게 불가능해졌다.
          팀 구조를 만든 건 그 때부터다. 각 팀에는 리드가 있고, meta-orchestrator가 어떤 팀을 깨울지 결정한다.
          <strong> 지금 필요한 팀만 깨어난다. 나머지는 자고 있다.</strong>
        </p>

        {/* 팀 트리 다이어그램 — PNG 디자인 매칭 */}
        <div style={{ maxWidth: 720, margin: '24px auto', padding: '16px 8px' }}>
          {/* Hub — meta-orchestrator */}
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              borderTop: '3px solid #F97316',
              borderRadius: 10,
              padding: '12px 32px',
              background: '#FEF3E7',
              minWidth: 200,
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                color: '#F97316',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
              }}>HUB</div>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                color: C.text,
                marginTop: 4,
              }}>meta-orchestrator</div>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 11,
                color: '#9CA3AF',
                marginTop: 4,
              }}>Opus · 전체 팀 디스패치</div>
            </div>
          </div>

          {/* 연결선 — 허브에서 3팀으로 */}
          <div style={{ position: 'relative', height: 36 }}>
            {/* hub 아래 수직선 */}
            <div style={{ position: 'absolute', left: '50%', top: 0, height: 18, width: 1, background: '#D1D5DB', transform: 'translateX(-50%)' }} />
            {/* 수평선 */}
            <div style={{ position: 'absolute', left: '16.66%', right: '16.66%', top: 18, height: 1, background: '#D1D5DB' }} />
            {/* 각 팀 수직선 */}
            <div style={{ position: 'absolute', left: '16.66%', top: 18, bottom: 0, width: 1, background: '#D1D5DB', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', left: '50%', top: 18, bottom: 0, width: 1, background: '#D1D5DB', transform: 'translateX(-50%)' }} />
            <div style={{ position: 'absolute', left: '83.33%', top: 18, bottom: 0, width: 1, background: '#D1D5DB', transform: 'translateX(-50%)' }} />
          </div>

          {/* 3팀 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {TEAMS.filter((t) => t.name !== 'hub').map((t) => {
              const bgMap: Record<string, string> = {
                build: '#C9D4C3',
                verify: '#DCD6EA',
                maintain: '#95A4BF',
              };
              return (
                <div key={t.name} style={{
                  borderRadius: 8,
                  padding: '12px 16px',
                  background: bgMap[t.name] || '#eee',
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 9,
                    fontWeight: 700,
                    color: '#374151',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase' as const,
                    marginBottom: 8,
                  }}>{t.name}</div>
                  <div style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: 10,
                  }}>{t.label}</div>
                  <div style={{
                    fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                    fontSize: 12,
                    color: '#374151',
                    marginBottom: 8,
                  }}>
                    리드: <strong>{t.lead}</strong>
                  </div>
                  {t.members.length > 0 && (
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 11,
                      color: '#6B7280',
                      lineHeight: 1.6,
                    }}>
                      {t.members.join(' · ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="wd-paragraph" style={{ marginTop: 8 }}>
          크로스팀 유틸리티로 <strong>orch-state</strong>와 <strong>project-context</strong>가
          팀 경계를 넘어 방향 파악과 컨텍스트 수집을 담당한다.
        </p>

        {/* 에이전트 모델 배치 */}
        <h3 className="wd-heading">모델 배치 전략</h3>
        <p className="wd-paragraph">
          처음엔 전부 Opus로 돌렸다. "제일 좋은 걸 쓰자"는 생각이었는데, 요약이나 상태 기록 같은 단순한 일에도
          무거운 모델을 쓰는 건 낭비였다. 모델 선택은 "더 좋은 것"의 문제가 아니라 역할 분리의 문제였다.
          <strong> Haiku가 빠르게 처리할 수 있는 일을 끝내야, Opus가 진짜 복잡한 판단에만 집중할 수 있다.</strong>
        </p>

        {/* 모델 배치 스펙트럼 다이어그램 — ref_diagram_1/3 스타일 */}
        <div style={{ maxWidth: 860, margin: '32px auto', background: C.bgAlt, borderRadius: 8, padding: '32px 40px' }}>
          {/* eyebrow */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            color: C.textMuted,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            textAlign: 'center',
            margin: '0 0 24px',
          }}>Model Placement</p>

          {/* 수평 화살표선 + 레이블 + outline dot */}
          <div style={{ position: 'relative', height: 24, marginBottom: 0 }}>
            {/* 수평선 */}
            <div style={{ position: 'absolute', left: '8%', right: '8%', top: '50%', height: 1, background: C.border, transform: 'translateY(-50%)' }} />
            {/* 양 끝 레이블 */}
            <span style={{
              position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
              fontFamily: "'Inter', sans-serif", fontSize: 10, color: C.textMuted,
            }}>경량 · 빠름</span>
            <span style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              fontFamily: "'Inter', sans-serif", fontSize: 10, color: C.textMuted,
            }}>강력 · 깊이</span>
            {/* 3개 outline dot (중앙 더 크게) */}
            {[
              { left: '20%', color: '#10B981', size: 10 },
              { left: '50%', color: '#3B82F6', size: 14 },
              { left: '80%', color: C.accent, size: 10 },
            ].map((m, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: m.left,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: m.size,
                height: m.size,
                borderRadius: '50%',
                background: C.bgAlt,
                border: `2px solid ${m.color}`,
              }} />
            ))}
          </div>

          {/* 박스들 — 1fr 2fr 1fr */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 12, marginTop: 16 }}>
            {/* Haiku */}
            <div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: '12px 16px', background: C.bg }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#10B981', marginBottom: 8 }}>Haiku</div>
                {AGENTS.filter((a) => a.model === 'Haiku').map((a) => (
                  <div key={a.name} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.text, padding: '3px 0' }}>{a.name}</div>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', 'Noto Sans KR', sans-serif", fontSize: 11, color: C.textMuted, textAlign: 'center', fontStyle: 'italic', margin: '8px 0 0' }}>요약 · 연결 · 빠름</p>
            </div>
            {/* Sonnet — 중앙 강조 */}
            <div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: '12px 16px', background: C.bg }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: '#3B82F6', marginBottom: 8 }}>Sonnet</div>
                {AGENTS.filter((a) => a.model === 'Sonnet').map((a) => (
                  <div key={a.name} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.text, padding: '3px 0' }}>{a.name}</div>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', 'Noto Sans KR', sans-serif", fontSize: 11, color: C.textMuted, textAlign: 'center', fontStyle: 'italic', margin: '8px 0 0' }}>분석 · 실행 · 주력</p>
            </div>
            {/* Opus */}
            <div>
              <div style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: '12px 16px', background: C.bg }}>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 8 }}>Opus</div>
                {AGENTS.filter((a) => a.model === 'Opus').map((a) => (
                  <div key={a.name} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: C.text, padding: '3px 0' }}>{a.name}</div>
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', 'Noto Sans KR', sans-serif", fontSize: 11, color: C.textMuted, textAlign: 'center', fontStyle: 'italic', margin: '8px 0 0' }}>설계 · 검증 · 깊이</p>
            </div>
          </div>
        </div>

        {/* 체인 × 팀 상호작용 다이어그램 */}
        <h3 className="wd-heading">체인 — 팀을 잇는 고정 경로</h3>
        <p className="wd-paragraph">
          에이전트를 자유롭게 두면 매번 다른 경로로 일했다. 같은 작업에 드는 토큰이 3배씩 달랐고, 결과도 일관성이 없었다.
          체인은 이미 검증된 경로를 고정해두는 것이다.
          <strong> 경로를 고정하고 나서야 결과가 예측 가능해졌다.</strong>
        </p>

        <div style={{ maxWidth: 860, margin: '32px auto', background: '#F5F5F5', borderRadius: 12, padding: '32px 24px' }}>
          {CHAINS.map((chain, ci) => {
            const stepTeamMap: Record<string, string> = {
              'code-reviewer': 'build', 'commit-writer': 'build',
              'pf-ops': 'build', 'security-auditor': 'build',
              'ai-synthesizer verify': 'verify', 'verify': 'verify',
              'linker': 'maintain', 'compressor 9단계': 'maintain', 'doc-ops': 'maintain',
              'meta-orchestrator': 'hub', '팀 활성화': 'hub',
              'implement': 'trigger', '/dispatch': 'trigger', '/compact': 'trigger',
              '사용자 확인': 'trigger', 'Gemini/Codex 추출': 'external',
              'push': 'system', '사용': 'system',
            };
            const teamBgMap: Record<string, string> = {
              build: '#C9D4C3', verify: '#DCD6EA', maintain: '#95A4BF',
              hub: '#FCEBD4', trigger: '#DBEAFE', external: '#FECACA', system: '#FEF3C7',
            };
            return (
              <div key={chain.name} style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                borderBottom: ci < CHAINS.length - 1 ? '1px solid #E5E7EB' : 'none',
                padding: '16px 0',
                alignItems: 'center',
              }}>
                <div style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#374151',
                }}>{chain.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  {chain.steps.map((step, si) => {
                    const team = stepTeamMap[step] || 'trigger';
                    const bg = teamBgMap[team] || '#F3F4F6';
                    return (
                      <React.Fragment key={si}>
                        {si > 0 && (
                          <span style={{ color: '#9CA3AF', fontSize: 13, lineHeight: 1 }}>→</span>
                        )}
                        <span style={{
                          display: 'inline-block',
                          padding: '5px 14px',
                          borderRadius: 20,
                          background: bg,
                          fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                          fontSize: 12,
                          color: '#374151',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}>{step}</span>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* 범례 */}
          <div style={{
            display: 'flex', gap: 16, justifyContent: 'center',
            paddingTop: 20, borderTop: '1px solid #E5E7EB', marginTop: 8, flexWrap: 'wrap',
          }}>
            {[
              { label: 'Build', bg: '#C9D4C3' },
              { label: 'Verify', bg: '#DCD6EA' },
              { label: 'Maintain', bg: '#95A4BF' },
              { label: 'Hub', bg: '#FEF3E7' },
              { label: 'Trigger', bg: '#DBEAFE' },
              { label: 'System', bg: '#FEF3C7' },
              { label: 'External', bg: '#FECACA' },
            ].map((l) => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: l.bg, border: '1px solid #D1D5DB' }} />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: '#6B7280' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 8종 Hook */}
        <h3 className="wd-heading">8종 Hook — 체인을 깨우는 트리거</h3>
        <div style={{
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
        }}>
          {HOOKS.map((h) => (
            <div key={h.name} style={{
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: '12px 16px',
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.07em',
                textTransform: 'uppercase' as const,
                color: C.accent,
                marginBottom: 3,
              }}>
                {h.trigger}
              </div>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.text,
                marginBottom: 5,
              }}>
                {h.name}
              </div>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 12,
                color: C.textSub,
                lineHeight: 1.6,
              }}>
                {h.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ E2E Workflow ━━━ */}
      <E2EWorkflowSection />

      <hr className="wd-section-divider" />

      {/* ━━━ 4. 핵심 결정 ━━━ */}
      <section>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Key Decisions</p>
          <h2 className="wd-title">6가지 설계 결정</h2>
        </div>

        <p className="wd-paragraph">
          시스템을 만든 건 코드가 아니라 결정이다. 각 결정에는 "이전"과 "이후"가 있고,
          바꾼 이유가 있다. <strong>가장 중요한 결정 6개.</strong>
        </p>

        {KEY_DECISIONS.map((d) => (
          <div key={d.id} style={{
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: '24px 28px',
            marginBottom: 16,
            maxWidth: 860,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              marginBottom: 12,
            }}>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                color: C.accent,
                letterSpacing: '0.06em',
              }}>
                {d.id}
              </span>
              <span style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: C.text,
              }}>
                {d.title}
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              marginBottom: 12,
            }}>
              <div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: 6,
                }}>
                  Before
                </div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 14,
                  color: C.textSub,
                  lineHeight: 1.7,
                }}>
                  {d.before}
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.accent,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase' as const,
                  marginBottom: 6,
                }}>
                  After
                </div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 14,
                  color: C.text,
                  lineHeight: 1.7,
                }}>
                  {d.after}
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
              fontSize: 14,
              color: C.textSub,
              lineHeight: 1.7,
              borderTop: `1px solid ${C.border}`,
              paddingTop: 12,
            }}>
              <strong style={{ color: C.text }}>Why:</strong> {d.why}
            </div>
          </div>
        ))}
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 5. 멀티 AI ━━━ */}
      <section>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Multi-AI Orchestration</p>
          <h2 className="wd-title">4개의 AI, 하나의 원칙</h2>
        </div>

        <p className="wd-paragraph">
          <strong>Claude가 유일한 설계자이고 결정권자다.</strong>{' '}
          나머지 AI는 각자의 강점에 맞는 역할만 수행한다.
          Codex는 정밀 검증, Gemini는 벌크 추출, Perplexity는 리서치.
          해석과 판단은 오직 Claude만 한다.
        </p>

        {/* Model Capability Benchmarks 테이블 */}
        <div style={{
          background: C.bgAlt,
          borderRadius: 12,
          padding: '48px 40px',
          margin: '32px auto',
          maxWidth: 920,
        }}>
          <h3 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
            color: C.text,
            textAlign: 'center',
            marginBottom: 40,
          }}>
            Model Capability Benchmarks
          </h3>

          {/* 헤더 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '140px 180px 1fr 200px',
            gap: '0 24px',
            paddingBottom: 16,
            borderBottom: `1px solid ${C.border}`,
            marginBottom: 8,
          }}>
            {['Agent Interface', 'Model Engine', 'Core Competency', 'Constraints / Cost'].map((h) => (
              <div key={h} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: C.textMuted,
              }}>
                {h}
              </div>
            ))}
          </div>

          {/* 행 */}
          {AI_ROLES.map((r) => (
            <div key={r.name} style={{
              display: 'grid',
              gridTemplateColumns: '140px 180px 1fr 200px',
              gap: '0 24px',
              padding: '24px 0',
              borderBottom: `1px solid ${C.border}`,
              alignItems: 'start',
            }}>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: C.text,
              }}>
                {r.name}
              </div>
              <div style={{
                fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                fontSize: 14,
                color: C.textSub,
              }}>
                {r.model}{r.role ? ` · ${r.role}` : ''}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.text,
                  marginBottom: r.strengthSub ? 4 : 0,
                }}>
                  {r.strength}
                </div>
                {r.strengthSub && (
                  <div style={{
                    fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                    fontSize: 13,
                    color: C.textMuted,
                  }}>
                    {r.strengthSub}
                  </div>
                )}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: C.text,
                  marginBottom: r.limitSub ? 4 : 0,
                }}>
                  {r.limit}
                </div>
                {r.limitSub && (
                  <div style={{
                    fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                    fontSize: 13,
                    color: C.textMuted,
                  }}>
                    {r.limitSub}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <h3 className="wd-heading">Cross-CLI 공유 메모리</h3>
        <p className="wd-paragraph">
          3개 CLI가 같은 프로젝트를 작업하면 서로의 진행 상황을 알아야 한다.
          <strong> .ctx/shared-context.md</strong>가 공유 상태 파일이고,
          <strong> provenance.log</strong>가 "이 결과를 누가 만들었는지" 추적한다.
          /handoff 스킬로 CLI 간 작업을 위임할 때 컨텍스트가 유실되지 않는다.
        </p>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 6. 진화 ━━━ */}
      <section>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Evolution</p>
          <h2 className="wd-title">7일의 기록</h2>
        </div>

        <p className="wd-paragraph">
          v1.0에서 v4.0까지 7일. 처음 3일은 더했고, 마지막 3일은 뺐다.
          중간의 하루가 전환점이었다 — <strong>"이 시스템이 너무 무거워졌다"</strong>고 느낀 순간.
        </p>

        {/* 수평 타임라인 */}
        <div style={{ overflowX: 'auto', paddingBottom: 8, marginTop: 32 }}>
          <div style={{
            display: 'grid',
            gridTemplateRows: 'auto 28px auto',
            gridTemplateColumns: `repeat(${TIMELINE.length}, 1fr)`,
            minWidth: 680,
            maxWidth: 860,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {/* Row 1: 버전 + 날짜 */}
            {TIMELINE.map((t) => (
              <div key={`top-${t.version}`} style={{
                textAlign: 'center',
                paddingBottom: 10,
                paddingLeft: 4,
                paddingRight: 4,
              }}>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  fontWeight: 700,
                  color: t.version === 'v4.0' ? C.accent : C.text,
                }}>
                  {t.version}
                </div>
                <div style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 10,
                  color: C.textMuted,
                  marginTop: 2,
                }}>
                  {t.date.slice(5)}
                </div>
              </div>
            ))}

            {/* Row 2: 가로선 + 점들 */}
            <div style={{
              gridColumn: `1 / ${TIMELINE.length + 1}`,
              position: 'relative',
              height: 28,
            }}>
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: 1,
                background: C.border,
                transform: 'translateY(-50%)',
              }} />
              {TIMELINE.map((t, i) => (
                <div key={t.version} style={{
                  position: 'absolute',
                  left: `${(i + 0.5) / TIMELINE.length * 100}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: t.version === 'v4.0' ? 12 : 8,
                  height: t.version === 'v4.0' ? 12 : 8,
                  borderRadius: '50%',
                  background: t.version === 'v4.0' ? C.accent : C.bg,
                  border: `2px solid ${t.version === 'v4.0' ? C.accent : C.textSub}`,
                }} />
              ))}
            </div>

            {/* Row 3: 상세 */}
            {TIMELINE.map((t) => (
              <div key={`bottom-${t.version}`} style={{
                textAlign: 'center',
                paddingTop: 10,
                paddingLeft: 4,
                paddingRight: 4,
              }}>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: t.version === 'v4.0' ? C.accent : C.text,
                  marginBottom: 4,
                }}>
                  {t.highlight}
                </div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 11,
                  color: C.textSub,
                  lineHeight: 1.5,
                }}>
                  {t.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="wd-section-divider" />

      {/* ━━━ 8. 교훈 & 다음 ━━━ */}
      <section style={{ paddingBottom: 80 }}>
        <div className="wd-section-header">
          <p className="wd-eyebrow">Lessons & Next</p>
          <h2 className="wd-title">배운 것들</h2>
        </div>

        <p className="wd-paragraph">
          7일 동안 시스템을 만들고 부수고 다시 만들면서 배운 것들.
          기술적 교훈도 있고, 태도에 대한 교훈도 있다.
        </p>

        {/* 교훈 리스트 */}
        <div style={{
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 24,
        }}>
          {LESSONS.map((l) => (
            <div key={l.num} style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: 16,
              paddingBottom: 20,
              marginBottom: 20,
              borderBottom: `1px solid ${C.border}`,
              alignItems: 'start',
            }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                color: C.accent,
                paddingTop: 2,
              }}>
                {l.num}
              </div>
              <div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 6,
                }}>
                  {l.title}
                </div>
                <div style={{
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: 14,
                  color: C.textSub,
                  lineHeight: 1.8,
                }}>
                  {l.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 다음 */}
        <div style={{
          maxWidth: 860,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 40,
          paddingTop: 28,
          borderTop: `1px solid ${C.border}`,
        }}>
          <p className="wd-eyebrow" style={{ marginBottom: 12 }}>What's Next</p>
          <p className="wd-paragraph" style={{ marginBottom: 0 }}>
            v4.0은 끝이 아니라 "빼기를 마스터한 시작점"이다. 시스템이 안정된 지금부터가 진짜 시작이고,
            다음 목표는 이 오케스트레이션 위에서 실제 프로덕트를 더 빠르게, 더 깊이 만드는 것이다.
            portfolio, tech-review, 그리고 아직 이름도 없는 것들까지 — <strong>도구는 이미 충분하다. 이제 쓸 차례다.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
