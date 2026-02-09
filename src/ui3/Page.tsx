import { useState, useMemo, useRef, useEffect } from 'react';
import { sections, type Category } from '../shared/seed';
import { useActiveSection } from '../shared/useActiveSection';
import homeRaw from '../content/HOME_INTRO_TO_RELATION_KO.md?raw';

type TabOption = 'All' | Category;

function parseSystemContent(raw: string) {
  const lines = raw.split('\n');
  const secIdx = lines.findIndex(l => l.startsWith('# 3) HOW I OPERATE'));
  const sec = secIdx >= 0 ? lines.slice(secIdx + 1) : [];
  const strip = (l: string) => l.replace(/^\*\*(.+)\*\*$/, '$1');
  const nextBody = (arr: string[], from: number) => {
    let i = from;
    while (i < arr.length && arr[i].trim() === '') i++;
    return arr[i] ?? '';
  };
  const pIdx = sec.findIndex(l => l.startsWith('**Operating Principles'));
  const fIdx = sec.findIndex(l => l.startsWith('**Flow'));
  const tIdx = sec.findIndex(l => l.startsWith('**Time'));
  const sIdx = sec.findIndex(l => l.startsWith('**Sensation'));
  const rIdx = sec.findIndex(l => l.startsWith('**Relation'));
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

export default function UI3Page() {
  const [activeTab, setActiveTab] = useState<TabOption>('All');
  const [expandedGroups, setExpandedGroups] = useState<Set<Category>>(
    new Set(['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'])
  );

  const tocRef = useRef<HTMLDivElement>(null);

  // ✅ 탭 전환/TOC 클릭 시 스크롤 타이밍 문제(렌더 전에 scrollToSection 호출)를 없애기 위해
  // 렌더 이후에만 스크롤 실행하도록 pendingScrollId를 사용합니다.
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);

  const categories: Category[] = ['About', 'System', 'Work', 'Writing', 'Resume', 'Contact'];

  const groupedSections = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = sections.filter((s) => s.category === cat);
      return acc;
    }, {} as Record<Category, typeof sections>);
  }, [categories]);

  const activeSection = useActiveSection();
  const sys = parseSystemContent(homeRaw);

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

  const handleTabClick = (tab: TabOption) => {
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
    const next = new Set(expandedGroups);
    if (next.has(category)) next.delete(category);
    else next.add(category);
    setExpandedGroups(next);

    setActiveTab(category);
    scrollToCategoryStart(category);
  };

  const handleTocItemClick = (section: { id: string; category: Category }) => {
    setActiveTab(section.category);
    setExpandedGroups(new Set([section.category]));
    setPendingScrollId(section.id);
  };

  const getActiveTocItem = (sectionId: string) => {
    return activeSection === sectionId;
  };

  // ✅ 렌더가 끝난 다음 프레임에 스크롤 실행 (탭 전환/TOC 클릭 후 "새로고침해야만 정상" 문제를 뿌리뽑음)
  useEffect(() => {
    if (!pendingScrollId) return;
    requestAnimationFrame(() => {
      scrollToSection(pendingScrollId);
      setPendingScrollId(null);
    });
  }, [pendingScrollId]);

  // ✅ TOC 자동 따라오기 (필요할 때만 root.scrollTop 조정)
  useEffect(() => {
    if (!activeSection) return;
    const root = tocRef.current;
    if (!root) return;

    const active = root.querySelector<HTMLAnchorElement>('a.active');
    if (!active) return;

    requestAnimationFrame(() => {
      const rootRect = root.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const pad = 10;

      if (activeRect.top < rootRect.top + pad) {
        root.scrollTop += activeRect.top - rootRect.top - pad;
      } else if (activeRect.bottom > rootRect.bottom - pad) {
        root.scrollTop += activeRect.bottom - rootRect.bottom + pad;
      }
    });
  }, [activeSection]);

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
        <aside className="toc-container" style={{ position: 'sticky', top: '77px', alignSelf: 'flex-start' }}>
          <div className="toc" ref={tocRef} style={{ overflow: 'visible', maxHeight: 'none' }}>
            {categories.map((category) => (
              <div key={category} className="toc-group" style={{ marginBottom: '8px' }}>
                <button
                  className={`toc-group-header ${expandedGroups.has(category) ? 'expanded' : ''}`}
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
                        className={getActiveTocItem(section.id) ? 'active' : ''}
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
          {sections.map((section) => {
            const visible = activeTab === 'All' || section.category === activeTab;

            return (
              <section
                key={section.id}
                id={section.id}
                className="section"
                style={visible ? undefined : collapsedStyle}
                aria-hidden={!visible}
              >
                <div className="section-eyebrow">{section.eyebrow}</div>

                {section.id === 'product-1' ? (
                  <>
                    <h2 className="section-title">{sys.principlesTitle}</h2>
                    <p className="section-description">
                      {renderBold(sys.principlesBody)}
                    </p>
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
                    <p className="section-description">
                      {renderBold(sys.timeBody)}
                    </p>
                  </>
                ) : section.id === 'system-sensation' ? (
                  <>
                    <h2 className="section-title">{sys.sensationTitle}</h2>
                    <p className="section-description">
                      {renderBold(sys.sensationBody)}
                    </p>
                  </>
                ) : section.id === 'system-relation' ? (
                  <>
                    <h2 className="section-title">{sys.relationTitle}</h2>
                    <p className="section-description">
                      {renderBold(sys.relationBody)}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="section-title">{section.title}</h2>
                    <p className="section-description">{section.description}</p>
                  </>
                )}

                <div className="image-placeholder">[Image: {section.heroRatio}]</div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}
