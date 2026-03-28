/**
 * StructureDiptych — D14(관계 8군) 왼쪽 | D4(6레이어 성숙 지도) 오른쪽
 * 관계 구조와 레이어 구조를 나란히.
 */
import { Diagram14 } from './Diagram14';
import { Diagram4 } from './Diagram4';

export function StructureDiptych() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 0,
      margin: '48px auto 40px',
      maxWidth: 1100,
      alignItems: 'start',
    }}>
      <Diagram14 />
      <Diagram4 />
    </div>
  );
}
