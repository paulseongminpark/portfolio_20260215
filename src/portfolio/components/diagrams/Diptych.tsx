/**
 * Diptych — 2컬럼 다이어그램 가로 배치
 * D11(Organizational Decision Memory) | D12(Three Layers)
 * El Croquis Design System 적용
 */
import { Diagram11 } from './Diagram11';
import { Diagram12 } from './Diagram12';

export function Diptych() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
      margin: '48px auto 40px',
      maxWidth: 900,
      alignItems: 'start',
    }}>
      <Diagram11 />
      <Diagram12 />
    </div>
  );
}
