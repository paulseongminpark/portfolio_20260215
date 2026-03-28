/**
 * Triptych — 3컬럼 다이어그램+텍스트 레이아웃
 * 4막: D5(3중 검색) | D6(승격 경로) | D7(4-layer 캡처)
 * El Croquis Design System 적용
 */
import { Diagram5 } from './Diagram5';
import { Diagram6 } from './Diagram6';
import { Diagram7 } from './Diagram7';

const textStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.85,
  color: '#333',
  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
  fontWeight: 400,
};

const pStyle: React.CSSProperties = {
  margin: '0 0 10px 0',
};

const slotStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
};

export function Triptych() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 24,
      margin: '48px 0 40px',
      alignItems: 'start',
    }}>
      {/* ── 슬롯 1: D5 — 3중 검색 ── */}
      <div style={slotStyle}>
        <Diagram5 />
        <div style={textStyle}>
          <p style={pStyle}>
            검색은 끝이 아니다. 매 검색 뒤에 학습이 일어난다. 검색 결과에 함께 올라온 노드 사이의 엣지 강도가 자동으로 조정된다 — 자주 함께 불려온 기억은 연결이 강해지고, 불리지 않는 연결은 하루 0.5%씩 흐려진다.
          </p>
          <p style={pStyle}>
            학습률은 레이어마다 다르다. L0은 0.020 — 빠르게 바뀐다. L5는 0.0001 — 거의 안 바뀐다. 아래층은 유연하고, 위층은 안정적이다. 들뢰즈의 강도(intensité)가 코드에 이렇게 살아남았다.
          </p>
        </div>
      </div>

      {/* ── 슬롯 2: D6 — 승격 경로 ── */}
      <div style={slotStyle}>
        <Diagram6 />
        <div style={textStyle}>
          <p style={pStyle}>
            막혀 있던 승격 경로를 다시 열었다. 경로는 하나다. 관찰 → 신호 → 패턴 또는 인사이트 → 원칙 또는 프레임워크. 이 사다리를 오르려면 Bayesian Beta의 206회 대신, 세 겹의 게이트를 통과해야 한다.
          </p>
          <p style={pStyle}>
            첫째, 이 노드가 의미적으로 널리 연결돼 있는가. 둘째, 실제로 10번 이상 검색에 등장했는가. 셋째, 비슷한 노드끼리 뭉쳐 있는가 — 임베딩 유사도 0.75 이상. 세 게이트를 모두 통과해야 승격한다.
          </p>
          <p style={pStyle}>
            Signal 타입에는 별도의 장치를 달았다. 검색될 때마다 log-likelihood ratio가 쌓인다. 임계점을 넘으면 시스템이 스스로 "이건 패턴이다"라고 판단한다. 사람이 승격 버튼을 누르는 게 아니라, 통계가 결정한다.
          </p>
        </div>
      </div>

      {/* ── 슬롯 3: D7 — 4-layer 캡처 ── */}
      <div style={slotStyle}>
        <Diagram7 />
        <div style={textStyle}>
          <p style={pStyle}>
            기억이 들어오는 길을 네 겹으로 만들었다. 그리고 세션이 시작될 때, 어떤 인지 층을 먼저 올릴지 결정하는 정책을 세웠다. L2 이상 — 패턴, 원칙처럼 반복 검증된 구조 — 을 먼저 넣는다.
          </p>
          <p style={pStyle}>
            하지만 Signal과 Observation도 따로 올린다. 추상화에만 매몰되면 현장의 감각을 잃는다. 원칙만 올리면 "왜 이 원칙이 생겼는지"를 모른 채 따르게 된다. 성숙한 기억과 날것의 기억이 함께 있어야 판단이 산다.
          </p>
        </div>
      </div>
    </div>
  );
}
