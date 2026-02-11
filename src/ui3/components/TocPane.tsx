import { type RefObject } from 'react';
import { type Category, type Section } from '../../shared/seed';
import { type WorkKey } from '../../content/work';

interface Props {
  tocRef: RefObject<HTMLDivElement | null>;
  categories: Category[];
  expandedGroups: Set<Category>;
  groupedSections: Record<Category, Section[]>;
  activeTab: 'All' | Category;
  activeSectionId: string | null;
  activeWork: WorkKey | null;
  onToggleGroup: (cat: Category) => void;
  onItemClick: (id: string) => void;
}

export function TocPane({
  tocRef,
  categories,
  expandedGroups,
  groupedSections,
  activeTab,
  activeSectionId,
  activeWork,
  onToggleGroup,
  onItemClick,
}: Props) {
  const workHeaderActive =
    (activeTab === 'All' && activeSectionId === 'work') || activeTab === 'Work' || !!activeWork;
  const showWorkItemActive = !!activeWork || activeTab === 'Work';

  return (
    <aside className="toc-container" style={{ position: 'sticky', top: '77px', alignSelf: 'flex-start' }}>
      <div className="toc" ref={tocRef}>
        {categories.map((category) => (
          <div key={category} className="toc-group" style={{ marginBottom: '8px' }}>
            <button
              className={`toc-group-header ${expandedGroups.has(category) ? 'expanded' : ''} ${
                category === 'Work' && workHeaderActive ? 'active' : ''
              }`}
              onClick={() => onToggleGroup(category)}
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
                        ? showWorkItemActive && activeSectionId === section.id
                          ? 'active'
                          : ''
                        : activeWork
                          ? ''
                          : activeSectionId === section.id
                            ? 'active'
                            : ''
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      onItemClick(section.id);
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
  );
}
