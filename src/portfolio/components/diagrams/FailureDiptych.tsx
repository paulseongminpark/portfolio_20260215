/**
 * FailureDiptych — D2(0.057) 왼쪽 | D13(실패 해부도) 오른쪽
 * 같은 높이로 가로 배치. 숫자가 먼저, 원인이 옆에.
 * El Croquis Design System 적용
 */
import { Diagram2 } from './Diagram2';
import { Diagram13 } from './Diagram13';

export function FailureDiptych() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2.2fr',
      gap: 0,
      margin: '48px auto 40px',
      maxWidth: 1100,
      alignItems: 'center',
    }}>
      <Diagram2 />
      <Diagram13 />
    </div>
  );
}
