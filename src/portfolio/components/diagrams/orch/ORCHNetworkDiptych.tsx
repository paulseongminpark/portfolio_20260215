/**
 * ORCHNetworkDiptych — As-Is (v3) | To-Be (v6)
 * 좌: 24-agent 복잡 네트워크 (크게) × 우: 8-node 커널 구조 (진하게)
 * 같은 원+선 언어, 극적인 밀도 대비
 * annotation은 SVG 밖 HTML로 정렬
 */
import { ORCHDiagram1 } from './ORCHDiagram1';
import { ORCHDiagram1B } from './ORCHDiagram1B';

const EC = {
  gray50: "#808080",
  font:   "'Inter', -apple-system, 'Noto Sans KR', sans-serif",
} as const;

const labelStyle: React.CSSProperties = {
  textAlign: "center",
  fontFamily: EC.font,
  fontSize: 9,
  fontWeight: 200,
  color: EC.gray50,
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  margin: 0,
};

export function ORCHNetworkDiptych() {
  return (
    <div style={{ margin: "48px 0 40px" }}>
      {/* top labels with arrow */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        <p style={{ ...labelStyle, flex: "0 0 60%" }}>v3.3 <span style={{ fontWeight: 200, letterSpacing: "0.5px", fontSize: 8 }}>(as-is)</span></p>
        <svg width="20" height="12" viewBox="0 0 20 12" style={{ flexShrink: 0 }}>
          <line x1="0" y1="6" x2="15" y2="6" stroke="#CC0000" strokeWidth={0.75} />
          <polygon points="14,3 20,6 14,9" fill="#CC0000" />
        </svg>
        <p style={{ ...labelStyle, flex: "0 0 38%" }}>v6 <span style={{ fontWeight: 200, letterSpacing: "0.5px", fontSize: 8 }}>(to-be)</span></p>
      </div>

      {/* diagrams */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <div style={{ flex: "0 0 60%" }}>
          <ORCHDiagram1 diptych />
        </div>
        <div style={{ flex: "0 0 38%" }}>
          <ORCHDiagram1B />
        </div>
      </div>

      {/* bottom annotations — HTML level, perfectly aligned */}
      <div style={{ display: "flex", marginTop: 8, gap: 16 }}>
        <p style={{ ...labelStyle, flex: "0 0 60%", letterSpacing: "0.5px", textTransform: "none" }}>
          에이전트 24개 · 팀 4개 · 외부 CLI 3개
        </p>
        <p style={{ ...labelStyle, flex: "0 0 38%", letterSpacing: "0.5px", textTransform: "none" }}>
          Workers 3 · Skills 13 · Hooks 14
        </p>
      </div>
    </div>
  );
}
