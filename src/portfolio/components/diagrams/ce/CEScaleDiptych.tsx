/**
 * CEScaleDiptych — CE4 (읽기 순서) | CE3 (규모 전략)
 * 수직 하강 (좌) × 수평 눈금 (우) — §12-2 형식 대비
 */
import { CEDiagram4 } from './CEDiagram4';
import { CEDiagram3 } from './CEDiagram3';

export function CEScaleDiptych() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "2fr 3fr",
      gap: 0,
      margin: "48px auto 40px",
      maxWidth: 1100,
      alignItems: "center",
    }}>
      <div style={{ transform: "translateX(60px)" }}>
        <CEDiagram4 diptych />
      </div>
      <CEDiagram3 diptych />
    </div>
  );
}
