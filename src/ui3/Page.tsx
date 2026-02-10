import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import { sections, type Category } from '../shared/seed';
import { useActiveSection } from '../shared/useActiveSection';
import homeRaw from '../content/HOME_INTRO_TO_RELATION_KO.md?raw';

type TabOption = 'All' | Category;
type WorkKey = 'empty-house' | 'skin-diary' | 'pmcc';

const WORK_HASH_PREFIX = '#work=';

function parseSystemContent(raw: string) {
  const lines = raw.split('\n');
  const secIdx = lines.findIndex((l) => l.startsWith('# 3) HOW I OPERATE'));
  const sec = secIdx >= 0 ? lines.slice(secIdx + 1) : [];
  const strip = (l: string) => l.replace(/^\*\*(.+)\*\*$/, '$1');
  const nextBody = (arr: string[], from: number) => {
    let i = from;
    while (i < arr.length && arr[i].trim() === '') i++;
    return arr[i] ?? '';
  };
  const pIdx = sec.findIndex((l) => l.startsWith('**Operating Principles'));
  const fIdx = sec.findIndex((l) => l.startsWith('**Flow'));
  const tIdx = sec.findIndex((l) => l.startsWith('**Time'));
  const sIdx = sec.findIndex((l) => l.startsWith('**Sensation'));
  const rIdx = sec.findIndex((l) => l.startsWith('**Relation'));
  const flowItems: string[] = [];

  if (fIdx >= 0) {
    for (let i = fIdx + 1; i < sec.length; i++) {
      const m = sec[i].match(/^\d+\.\s+(.+)/);
      if (m) flowItems.push(m[1]);
      else if (flowItems.length > 0 && sec[i].trim() !== '') break;
    }
  }

  return {
    principlesTitle: pIdx >= 0 ? strip(sec[pIdx]) : '',
    principlesBody: pIdx >= 0 ? nextBody(sec, pIdx + 1) : '',
    flowTitle: fIdx >= 0 ? strip(sec[fIdx]) : '',
    flowItems,
    timeTitle: tIdx >= 0 ? strip(sec[tIdx]) : '',
    timeBody: tIdx >= 0 ? nextBody(sec, tIdx + 1) : '',
    sensationTitle: sIdx >= 0 ? strip(sec[sIdx]) : '',
    sensationBody: sIdx >= 0 ? nextBody(sec, sIdx + 1) : '',
    relationTitle: rIdx >= 0 ? strip(sec[rIdx]) : '',
    relationBody: rIdx >= 0 ? nextBody(sec, rIdx + 1) : '',
  };
}

function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function getWorkKeyFromSection(section: { id: string; title: string; shortTitle: string }): WorkKey {
  const id = (section.id ?? '').toLowerCase();
  const title = (section.title ?? '').toLowerCase();
  const shortTitle = (section.shortTitle ?? '').toLowerCase();
  const hay = `${id} ${title} ${shortTitle}`;

  if (hay.includes('empty')) return 'empty-house';
  if (hay.includes('skin')) return 'skin-diary';
  if (hay.includes('pmcc')) return 'pmcc';

  // fallback: s1/s2/s3 또는 -1/-2/-3 형태를 대비
  if (shortTitle === 's1' || id.endsWith('1')) return 'empty-house';
  if (shortTitle === 's2' || id.endsWith('2')) return 'skin-diary';
  return 'pmcc';
}

function getWorkTitle(key: WorkKey) {
  if (key === 'empty-house') return 'Empty House CPS';
  if (key === 'skin-diary') return 'Skin Diary AI';
  return 'PMCC';
}

function getWorkKeyFromHash(): WorkKey | null {
  const h = window.location.hash || '';
  if (!h.startsWith(WORK_HASH_PREFIX)) return null;
  const v = decodeURIComponent(h.slice(WORK_HASH_PREFIX.length));
  if (v === 'empty-house' || v === 'skin-diary' || v === 'pmcc') return v;
  return null;
}

export default function UI3Page() {
  const [activeTab, setActiveTab] = useState<TabOption>('All');
  const [expandedGroups, setExpandedGroups] = useState<Set<Category>>(
    new Set(['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'])
  );

  const tocRef = useRef<HTMLDivElement>(null);

  // ✅ 탭 전환/TOC 클릭 시 스크롤 타이밍 문제(렌더 전에 scrollToSection 호출)를 없애기 위해
  // 렌더 이후에만 스크롤 실행하도록 pendingScrollId를 사용합니다.
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  // ✅ W4: Work 상세 모드(연결만)
  const [activeWork, setActiveWork] = useState<WorkKey | null>(null);
  const [returnState, setReturnState] = useState<{
    tab: TabOption;
    expanded: Category[];
    scrollY: number;
  } | null>(null);

  // ✅ popstate에서 최신 값을 참조하기 위한 refs
  const activeWorkRef = useRef<WorkKey | null>(null);
  const returnStateRef = useRef<typeof returnState>(null);

  useEffect(() => {
    activeWorkRef.current = activeWork;
  }, [activeWork]);

  useEffect(() => {
    returnStateRef.current = returnState;
  }, [returnState]);

  const categories: Category[] = ['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'];

  const groupedSections = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = sections.filter((s) => s.category === cat);
      return acc;
    }, {} as Record<Category, typeof sections>);
  }, [categories]);

  const activeSection = useActiveSection();
  const sys = parseSystemContent(homeRaw);

  const activeWorkSectionId = useMemo(() => {
    if (!activeWork) return null;
    const found = (groupedSections.Work ?? []).find((s) => getWorkKeyFromSection(s) === activeWork);
    return found?.id ?? null;
  }, [activeWork, groupedSections.Work]);

  // ✅ 상세 모드에서는 스파이를 “현재 프로젝트 id”로 고정
  const effectiveActiveSection = activeWork
    ? (activeWorkSectionId ?? 'work')
    : activeSection;

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const offset = 57 + 20;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const scrollToCategoryStart = (cat: Category) => {
    const firstId = groupedSections[cat]?.[0]?.id;
    if (firstId) setPendingScrollId(firstId);
  };

  const openWorkDetail = (key: WorkKey, opts?: { skipHistory?: boolean }) => {
    // 처음 “베이스 → 상세” 진입일 때만 복귀 상태 저장
    if (!activeWorkRef.current) {
      setReturnState({
        tab: activeTab,
        expanded: Array.from(expandedGroups),
        scrollY: window.scrollY,
      });
    }

    setActiveWork(key);
    setActiveTab('Work');
    setExpandedGroups(new Set(['Work']));
    setPendingScrollId(null);

    if (!opts?.skipHistory) {
      window.history.pushState(
        { view: 'work-detail', key },
        '',
        `${window.location.pathname}${window.location.search}${WORK_HASH_PREFIX}${encodeURIComponent(key)}`
      );
    }

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const closeWorkDetailInternal = (opts?: { skipHistory?: boolean }) => {
    const rs = returnStateRef.current;

    setActiveWork(null);
    setPendingScrollId(null);

    // history 제어는 외부에서 처리(브라우저 back/forward와 동기화)
    if (opts?.skipHistory) {
      // do nothing
    }

    if (rs) {
      setActiveTab(rs.tab);
      setExpandedGroups(new Set(rs.expanded));
      setReturnState(null);

      requestAnimationFrame(() => {
        window.scrollTo({ top: rs.scrollY, behavior: 'smooth' });
      });
      return;
    }

    // 복귀 상태가 없으면(직접 URL 진입 등) All로 안전 복귀
    setActiveTab('All');
    setExpandedGroups(new Set(['About', 'System', 'Work', 'Writing', 'Resume', 'Contact']));
    setReturnState(null);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  // ✅ Back 버튼 = 브라우저 back과 동일하게 동작
  const requestCloseWorkDetail = () => {
    // “앱 내부 상세 진입”이면 history.back()으로 동기화
    if (window.location.hash.startsWith(WORK_HASH_PREFIX) && returnStateRef.current) {
      window.history.back();
      return;
    }

    // 직접 URL 진입(복귀 상태 없음)일 때는 앱 내부에서만 닫기 + 해시 제거
    if (window.location.hash.startsWith(WORK_HASH_PREFIX)) {
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    closeWorkDetailInternal({ skipHistory: true });
  };

  const handleTabClick = (tab: TabOption) => {
  // ✅ Work 상세 모드에서도 탭 전환 가능하게: 먼저 상세 종료 + 해시 제거
  if (activeWorkRef.current) {
    setActiveWork(null);
    setReturnState(null);
    setPendingScrollId(null);

    // URL 해시(#work=...) 제거해서 브라우저 상태도 동기화
    window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
  }

  setActiveTab(tab);

  if (tab === 'All') {
    setExpandedGroups(new Set(['About', 'System', 'Work', 'Writing', 'Resume', 'Contact']));
    setPendingScrollId(null);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    return;
  }

  setExpandedGroups(new Set([tab]));
  scrollToCategoryStart(tab);
};


  const toggleGroup = (category: Category) => {
    // ✅ 상세 모드에서는 토글 막고 Back으로만 복귀
    if (activeWorkRef.current) return;

    const next = new Set(expandedGroups);
    if (next.has(category)) next.delete(category);
    else next.add(category);
    setExpandedGroups(next);

    setActiveTab(category);
    scrollToCategoryStart(category);
  };

  const handleTocItemClick = (section: { id: string; category: Category; title?: string; shortTitle?: string }) => {
    // ✅ 상세 모드에서는 “Work 항목만” 상세 전환 허용(선택 프로젝트 표시 + 이동)
    if (activeWorkRef.current) {
      if (section.category === 'Work') {
        openWorkDetail(getWorkKeyFromSection(section as any));
      }
      return;
    }

    setActiveTab(section.category);
    setExpandedGroups(new Set([section.category]));
    setPendingScrollId(section.id);
  };

  const getActiveTocItem = (sectionId: string) => {
    return effectiveActiveSection === sectionId;
  };

  // ✅ 렌더가 끝난 다음 프레임에 스크롤 실행
  useEffect(() => {
    if (!pendingScrollId) return;
    requestAnimationFrame(() => {
      scrollToSection(pendingScrollId);
      setPendingScrollId(null);
    });
  }, [pendingScrollId]);

  // ✅ 초기 진입: 해시에 work가 있으면 상세 모드로 시작
  useEffect(() => {
    const key = getWorkKeyFromHash();
    if (!key) return;

    // 복귀 상태가 없으니, “All/top”을 기본 복귀로 설정
    setReturnState({
      tab: 'All',
      expanded: ['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'],
      scrollY: 0,
    });

    openWorkDetail(key, { skipHistory: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ 브라우저 back/forward 동기화
  useEffect(() => {
    const onPopState = () => {
      const key = getWorkKeyFromHash();
      if (key) {
        // work 상세로 이동(또는 다른 프로젝트로 이동)
        openWorkDetail(key, { skipHistory: true });
        return;
      }

      // work 상세에서 나가는 경우
      if (activeWorkRef.current) {
        closeWorkDetailInternal({ skipHistory: true });
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ TOC 자동 따라오기 (필요할 때만 root.scrollTop 조정)
  useEffect(() => {
    if (!effectiveActiveSection) return;
    const root = tocRef.current;
    if (!root) return;

    const activeEl = root.querySelector<HTMLElement>('a.active, button.toc-group-header.active');
    if (!activeEl) return;

    requestAnimationFrame(() => {
      const rootRect = root.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();
      const pad = 10;

      if (activeRect.top < rootRect.top + pad) {
        root.scrollTop += activeRect.top - rootRect.top - pad;
      } else if (activeRect.bottom > rootRect.bottom - pad) {
        root.scrollTop += activeRect.bottom - rootRect.bottom + pad;
      }
    });
  }, [effectiveActiveSection]);

  // ✅ 관찰 대상(.section[id])이 탭 전환으로 사라지지 않도록,
  // 섹션은 항상 렌더하고 탭에 맞지 않는 섹션은 "접어서" 숨깁니다(언마운트 금지).
  const collapsedStyle: React.CSSProperties = {
    height: 0,
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    opacity: 0,
    pointerEvents: 'none',
  };

  // ✅ All 탭에서는 “Work 헤더만” 파란색, 상세에서는 “Work 헤더 + 해당 프로젝트” 파란색
  const workHeaderActive =
    (activeTab === 'All' && effectiveActiveSection === 'work') ||
    activeTab === 'Work' ||
    !!activeWork;

  const showWorkItemActive = !!activeWork || activeTab === 'Work';

  return (
    <div className="app-container">
      <div className="tabs-container">
        <div className="tabs">
          {(['All', 'About', 'System', 'Work', 'Writing'] as TabOption[]).map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="content-wrapper">
        <aside className="toc-container" style={{ position: 'sticky', top: '77px', alignSelf: 'flex-start' }}>
          <div className="toc" ref={tocRef} >
            {categories.map((category) => (
              <div key={category} className="toc-group" style={{ marginBottom: '8px' }}>
                <button
                  className={`toc-group-header ${expandedGroups.has(category) ? 'expanded' : ''} ${
                    category === 'Work' && workHeaderActive ? 'active' : ''
                  }`}
                  onClick={() => toggleGroup(category)}
                  type="button"
                >
                  {category}
                </button>

                <ul className={`toc-group-items ${expandedGroups.has(category) ? '' : 'collapsed'}`}>
                  {groupedSections[category].map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className={
                          category === 'Work'
                            ? (showWorkItemActive && getActiveTocItem(section.id) ? 'active' : '')
                            : (activeWork ? '' : (getActiveTocItem(section.id) ? 'active' : ''))
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleTocItemClick(section);
                        }}
                      >
                        {section.shortTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <main className="main-content">
          {/* ✅ W4: 상세 모드(연결만). 기존 섹션들은 언마운트하지 않고, 아래에서 전부 접어서 유지합니다. */}
          {activeWork && (
            <section id="work-detail" className="section">
              <div className="section-eyebrow">WORK</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <button type="button" onClick={requestCloseWorkDetail} className="work-detail-back">
                  ← Back
                </button>
                <div style={{ fontSize: '12px', color: '#999' }}>All / Work</div>
              </div>

              <h2 className="section-title">{getWorkTitle(activeWork)}</h2>

              <div className="image-placeholder" style={{ aspectRatio: '16 / 9' }}>
                [Detail placeholder — W5에서 콘텐츠 주입]
              </div>
            </section>
          )}

          {sections.map((section) => {
            const firstWorkId = groupedSections.Work?.[0]?.id;

            // ✅ activeWork 상태에서도 Work 카드 섹션은 DOM에 남겨둠(스파이 안정화), 대신 접어 숨김
            const mountWorkCardsHere =
              !!firstWorkId && section.id === firstWorkId && (activeTab === 'All' || !!activeWork);

            const showWorkCards = !activeWork && activeTab === 'All' && section.id === firstWorkId;

            const visibleBase =
              activeTab === 'All'
                ? section.category !== 'Work'
                : section.category === activeTab;

            // ✅ 상세 모드에서는 모든 기존 섹션을 접어서 숨김(언마운트 금지)
            const visible = activeWork ? false : visibleBase;

            const sectionClassName =
              `section${activeTab === 'All' && section.category === 'Work' ? ' section-hidden' : ''}`;
            return (
              <Fragment key={section.id}>
                {mountWorkCardsHere && (
                  <section
                    id="work"
                    className="section work-cards-section"
                    style={showWorkCards ? undefined : collapsedStyle}
                    aria-hidden={!showWorkCards}
                  >
                    <div className="section-eyebrow">WORK</div>
                    <h2 className="section-title">Projects</h2>
                    <p className="section-description">Empty House CPS · Skin Diary AI · PMCC</p>

                    <div className="work-cards-list">
                      {sections
                        .filter((s) => s.category === 'Work')
                        .map((s) => (
                          <button
                            key={s.id}
                            type="button"
                            className="work-card"
                            onClick={() => openWorkDetail(getWorkKeyFromSection(s))}
                          >
                            <div className="work-card-media" aria-hidden="true" />
                            <div className="work-card-content">
                              <div className="work-card-eyebrow">{s.eyebrow}</div>
                              <div className="work-card-title">{s.title}</div>
                              <div className="work-card-desc">{s.description}</div>
                              <div className="work-card-cta">View →</div>
                            </div>
                          </button>
                        ))}
                    </div>
                  </section>
                )}

                <section
                  id={section.id}
                  className={sectionClassName}
                  style={visible ? undefined : collapsedStyle}
                  aria-hidden={!visible}
                >
                  <div className="section-eyebrow">{section.eyebrow}</div>

                  {section.id === 'product-1' ? (
                    <>
                      <h2 className="section-title">{sys.principlesTitle}</h2>
                      <p className="section-description">{renderBold(sys.principlesBody)}</p>
                    </>
                  ) : section.id === 'product-2' ? (
                    <>
                      <h2 className="section-title">{sys.flowTitle}</h2>
                      <div className="section-description">
                        <ol style={{ paddingLeft: '20px', marginTop: '8px' }}>
                          {sys.flowItems.map((item, i) => (
                            <li
                              key={i}
                              style={i < sys.flowItems.length - 1 ? { marginBottom: '8px' } : undefined}
                            >
                              {renderBold(item)}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </>
                  ) : section.id === 'system-time' ? (
                    <>
                      <h2 className="section-title">{sys.timeTitle}</h2>
                      <p className="section-description">{renderBold(sys.timeBody)}</p>
                    </>
                  ) : section.id === 'system-sensation' ? (
                    <>
                      <h2 className="section-title">{sys.sensationTitle}</h2>
                      <p className="section-description">{renderBold(sys.sensationBody)}</p>
                    </>
                  ) : section.id === 'system-relation' ? (
                    <>
                      <h2 className="section-title">{sys.relationTitle}</h2>
                      <p className="section-description">{renderBold(sys.relationBody)}</p>
                    </>
                  ) : (
                    <>
                      <h2 className="section-title">{section.title}</h2>
                      <p className="section-description">{section.description}</p>
                    </>
                  )}

                  <div className="image-placeholder">[Image: {section.heroRatio}]</div>
                </section>
              </Fragment>
            );
          })}
        </main>
      </div>
    </div>
  );
}
