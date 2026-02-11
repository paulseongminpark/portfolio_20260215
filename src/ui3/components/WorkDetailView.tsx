import { type WorkSection } from '../../shared/parseWorkDetail';
import { WorkDetailBlocks, renderBold } from './WorkDetailBlocks';
import { type WorkKey } from '../../content/work';

interface Props {
  activeWork: WorkKey;
  title: string;
  heroSubtitle: string;
  parsedWork: WorkSection[] | null;
  onBack: () => void;
}

export function WorkDetailView({ title, heroSubtitle, parsedWork, onBack }: Props) {
  return (
    <section id="work-detail" className="section">
      <div className="section-eyebrow">WORK</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
        <button type="button" onClick={onBack} className="work-detail-back">
          ← Back
        </button>
        <div style={{ fontSize: '12px', color: '#999' }}>All / Work</div>
      </div>

      <h2 className="section-title">{title}</h2>

      {heroSubtitle && (
        <p className="section-description" style={{ marginBottom: '28px' }}>
          {renderBold(heroSubtitle)}
        </p>
      )}

      {parsedWork &&
        parsedWork
          .filter((s) => s.name !== 'Hero')
          .map((section) => (
            <div key={section.name} className="work-detail-section">
              <WorkDetailBlocks blocks={section.blocks} />
            </div>
          ))}
    </section>
  );
}
