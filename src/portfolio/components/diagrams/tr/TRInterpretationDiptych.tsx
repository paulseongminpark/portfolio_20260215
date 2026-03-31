/**
 * TRInterpretationDiptych — TRDiagram3 + TRDiagram4 가로 배치
 * El Croquis diptych: 1fr 1fr, gap 0
 */
import { TRDiagram3 } from './TRDiagram3';
import { TRDiagram4 } from './TRDiagram4';

export function TRInterpretationDiptych() {
  return (
    <div style={{
      position: "relative",
      margin: "48px 0 40px",
    }}>
      <TRDiagram3 />
      <div style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "48%",
      }}>
        <TRDiagram4 />
      </div>
    </div>
  );
}
