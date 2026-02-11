import { type Block } from '../../shared/parseWorkDetail';

export function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

function renderBlock(block: Block, idx: number) {
  switch (block.type) {
    case 'section-title':
      return (
        <div key={idx} className="work-detail-section-title">
          {block.eyebrow && <div className="section-eyebrow">{block.eyebrow}</div>}
          <h3 className="work-detail-subtitle">{block.title}</h3>
          {block.desc && <p className="section-description">{renderBold(block.desc)}</p>}
        </div>
      );
    case 'paragraph':
      return <p key={idx} className="section-description">{renderBold(block.text)}</p>;
    case 'heading':
      return <h3 key={idx} className="work-detail-subtitle">{block.text}</h3>;
    case 'cards':
      return (
        <div key={idx} className={`work-detail-cards ${block.items.length >= 3 ? 'cols-3' : 'cols-2'}`}>
          {block.items.map((card, ci) => (
            <div key={ci} className="work-detail-card">
              <div className="work-detail-card-title">{card.title}</div>
              <p className="work-detail-card-body">{renderBold(card.body)}</p>
            </div>
          ))}
        </div>
      );
    case 'image':
      return (
        <div key={idx} className="work-detail-image-wrap">
          <div className="image-placeholder" style={{ aspectRatio: '16 / 9' }}>
            [Image: {block.src}]
          </div>
          {block.caption && <p className="work-detail-caption">{block.caption}</p>}
        </div>
      );
    case 'table':
      return (
        <div key={idx} className="work-detail-table-wrap">
          <table className="work-detail-table">
            <thead>
              <tr>
                {block.headers.map((h, hi) => (
                  <th key={hi}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{renderBold(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function WorkDetailBlocks({ blocks }: { blocks: Block[] }) {
  return <>{blocks.map((block, i) => renderBlock(block, i))}</>;
}
