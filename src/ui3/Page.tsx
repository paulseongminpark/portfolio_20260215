import { useState, useMemo, useRef, useEffect, Fragment } from 'react';
import { sections, type Category } from '../shared/seed';
import { useActiveSection } from '../shared/useActiveSection';
import homeRaw from '../content/HOME_INTRO_TO_RELATION_KO.md?raw';
import { type WorkKey } from '../content/work';
import { useWorkDetail } from './hooks/useWorkDetail';
import { useWorkRouting } from './hooks/useWorkRouting';
import { renderBold } from './components/WorkDetailBlocks';
import { WorkDetailView } from './components/WorkDetailView';
import { TocPane } from './components/TocPane';

type TabOption = 'All' | Category;

const DEFAULT_EXPANDED: Category[] = ['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'];

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

export default function UI3Page() {
  const [activeTab, setActiveTab] = useState<TabOption>('All');
  const [expandedGroups, setExpandedGroups] = useState<Set<Category>>(new Set(DEFAULT_EXPANDED));

  const tocRef = useRef<HTMLDivElement>(null);

  // ✅ 탭 전환/TOC 클릭 시: 렌더 이후에만 스크롤 실행
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  // ✅ W4: Work 상세 모드(연결만)
  const [activeWork, setActiveWork] = useState<WorkKey | null>(null);
  const [returnState, setReturnState] = useState<{
    tab: TabOption;
    expanded: Category[];
    scrollY: number;
  } | null>(null);

  // ✅ popstate에서 최신 값을 참조하기 위한 ref
  const activeWorkRef = useRef<WorkKey | null>(null);

  useEffect(() => {
    activeWorkRef.current = activeWork;
  }, [activeWork]);

  const categories: Category[] = DEFAULT_EXPANDED;

  const groupedSections = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = sections.filter((s) => s.category === cat);
      return acc;
    }, {} as Record<Category, typeof sections>);
  }, [categories]);

  const activeSection = useActiveSection();
  const sys = parseSystemContent(homeRaw);

  const { parsedWork, heroSubtitle } = useWorkDetail(activeWork);

  const activeWorkSectionId = useMemo(() => {
    if (!activeWork) return null;
    const found = (groupedSections.Work ?? []).find((s) => getWorkKeyFromSection(s) === activeWork);
    return found?.id ?? null;
  }, [activeWork, groupedSections.Work]);

  // ✅ 상세 모드에서는 스파이를 “현재 프로젝트 id”로 고정
  const effectiveActiveSection = activeWork ? (activeWorkSectionId ?? 'work') : activeSection;

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

  // ✅ 전역 smooth 영향 제거 + 강제 위치 고정
  const forceScrollTo = (y: number) => {
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';

    window.scrollTo({ top: y, left: 0, behavior: 'auto' });
    root.scrollTop = y;
    document.body.scrollTop = y;

    requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: 'auto' });
      root.scrollTop = y;
      document.body.scrollTop = y;

      requestAnimationFrame(() => {
        root.style.scrollBehavior = prev;
      });
    });
  };

  const { openWorkDetail, requestCloseWorkDetail } = useWorkRouting({
    activeWork, setActiveWork, activeWorkRef,
    activeTab, setActiveTab,
    expandedGroups, setExpandedGroups,
    returnState, setReturnState,
    setPendingScrollId, forceScrollTo,
    defaultExpanded: DEFAULT_EXPANDED,
  });

  const handleTabClick = (tab: TabOption) => {
    // ✅ Work 상세 모드에서도 탭 전환 가능: 상세 종료 + 해시 제거
    if (activeWorkRef.current) {
      setActiveWork(null);
      setReturnState(null);
      setPendingScrollId(null);
      window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    setActiveTab(tab);

    if (tab === 'All') {
      setExpandedGroups(new Set(DEFAULT_EXPANDED));
      setPendingScrollId(null);

      // ✅ 간헐 리디렉 위치 튐 방지
      forceScrollTo(0);

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

  const handleTocItemClick = (sectionId: string) => {
    let section: (typeof sections)[number] | undefined;
    for (const cat of categories) {
      section = groupedSections[cat].find((s) => s.id === sectionId);
      if (section) break;
    }
    if (!section) return;

    // ✅ 상세 모드에서는 "Work 항목만" 상세 전환 허용
    if (activeWorkRef.current) {
      if (section.category === 'Work') {
        openWorkDetail(getWorkKeyFromSection(section));
      }
      return;
    }

    setActiveTab(section.category);
    setExpandedGroups(new Set([section.category]));
    setPendingScrollId(section.id);
  };

  // ✅ 렌더가 끝난 다음 프레임에 스크롤 실행
  useEffect(() => {
    if (!pendingScrollId) return;
    requestAnimationFrame(() => {
      scrollToSection(pendingScrollId);
      setPendingScrollId(null);
    });
  }, [pendingScrollId]);

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
        <TocPane
          tocRef={tocRef}
          categories={categories}
          expandedGroups={expandedGroups}
          groupedSections={groupedSections}
          activeTab={activeTab}
          activeSectionId={effectiveActiveSection}
          activeWork={activeWork}
          onToggleGroup={toggleGroup}
          onItemClick={handleTocItemClick}
        />

        <main className="main-content">
          {/* ✅ W4: 상세 모드(연결만). 기존 섹션들은 언마운트하지 않고, 아래에서 전부 접어서 유지합니다. */}
          {activeWork && (
            <WorkDetailView
              activeWork={activeWork}
              title={getWorkTitle(activeWork)}
              heroSubtitle={heroSubtitle}
              parsedWork={parsedWork}
              onBack={requestCloseWorkDetail}
            />
          )}

          {sections.map((section) => {
            const firstWorkId = groupedSections.Work?.[0]?.id;

            // ✅ activeWork 상태에서도 Work 카드 섹션은 DOM에 남겨둠(스파이 안정화), 대신 접어 숨김
            const mountWorkCardsHere =
              !!firstWorkId && section.id === firstWorkId && (activeTab === 'All' || !!activeWork);

            const showWorkCards = !activeWork && activeTab === 'All' && section.id === firstWorkId;

            const visibleBase = activeTab === 'All' ? section.category !== 'Work' : section.category === activeTab;

            // ✅ 상세 모드에서는 모든 기존 섹션을 접어서 숨김(언마운트 금지)
            const visible = activeWork ? false : visibleBase;

            const sectionClassName = `section${activeTab === 'All' && section.category === 'Work' ? ' section-hidden' : ''}`;

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
                            <li key={i} style={i < sys.flowItems.length - 1 ? { marginBottom: '8px' } : undefined}>
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
