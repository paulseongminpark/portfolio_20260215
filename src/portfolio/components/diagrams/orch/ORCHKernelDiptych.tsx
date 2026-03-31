/**
 * ORCHKernelDiptych — Diagram 3 (Kernel Architecture) | Diagram 4 (Before/After)
 * 좌: 3기둥 OS 레이어 × 우: v3.3→v6 정량 비교
 */
import { ORCHDiagram3 } from './ORCHDiagram3';
import { ORCHDiagram4 } from './ORCHDiagram4';

export function ORCHKernelDiptych() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24,
      margin: "48px auto 40px",
      maxWidth: 720,
      alignItems: "start",
    }}>
      <ORCHDiagram3 diptych />
      <ORCHDiagram4 diptych />
    </div>
  );
}
