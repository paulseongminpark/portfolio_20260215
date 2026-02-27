const P = `${import.meta.env.BASE_URL}work/pmcc`;
const F = "'Inter', 'Noto Sans KR', sans-serif";

export function VisualCuesGallery() {
  return (
    <div className="vcg">

      {/* Image 1 — centered, biggest */}
      <div className="vcg-main">
        <img src={`${P}/visual cues 1.webp`} alt="" loading="lazy" />
      </div>

      {/* Caption 1,2 — centered between images */}
      <p className="vcg-caption-center" style={{ fontFamily: F }}>
        비주얼 언어를 정의하는 과정 — 사진 원칙과 레퍼런스를 직접 정리했습니다.
      </p>

      {/* Image 2 — centered, 80% of image 1 */}
      <div className="vcg-sub">
        <img src={`${P}/visual cues 2.webp`} alt="" loading="lazy" />
      </div>

      {/* Mockups 3,4 — 3 left, 4+caption right */}
      <div className="vcg-mockup">
        <div className="vcg-mockup-left">
          <img src={`${P}/visual cues 3 logo mock up.webp`} alt="" loading="lazy" />
        </div>
        <div className="vcg-mockup-right">
          <img src={`${P}/visual cues 4 logo mock up 2.webp`} alt="" loading="lazy" />
          <p className="vcg-note" style={{ fontFamily: F }}>
            좀 더 자연적인 요소가 들어가고, 역동성과 비대칭성이 로고에 담기면 좋겠다고
            Live하고, 자연스럽고, 부드러우면서도 역동성을 갖고 있는 것—그것이 이 모임의 성격이라고 생각했습니다.
          </p>
        </div>
      </div>

      {/* Palettes — centered stack */}
      <div className="vcg-center">
        <div className="vcg-palette-stack">
          <img src={`${P}/visual cues 5 color palette 1.webp`} alt="" loading="lazy" />
          <img src={`${P}/visual cues 6 color palette 2.webp`} alt="" loading="lazy" />
          <img src={`${P}/visual cues 7 color palette 3.webp`} alt="" loading="lazy" />
        </div>
        <p className="vcg-caption-center" style={{ fontFamily: F }}>
          같은 철학을 색으로 풀어냈습니다. 자연의 따뜻함에서 출발해, 역동성과 에너지를 더하고, 최종 팔레트로 수렴했습니다.
        </p>
      </div>

      {/* Final Logos — 8 left (square) + gap + 9 right */}
      <div className="vcg-center">
        <div className="vcg-final">
          <figure className="vcg-fig vcg-square">
            <img src={`${P}/visual cues 8 logo.webp`} alt="" loading="lazy" />
            <figcaption className="vcg-caption-left" style={{ fontFamily: F }}>
              최종 로고 및 포스터 작업
            </figcaption>
          </figure>
          <figure className="vcg-fig">
            <img src={`${P}/visual cues 9 logo.webp`} alt="" loading="lazy" />
          </figure>
        </div>
      </div>

    </div>
  );
}
