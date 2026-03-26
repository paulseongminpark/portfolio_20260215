# Portfolio Schematic System (PSS) Spec v1.0
> **Core Aesthetic**: Engineering Editorial (Anthropic 정교함 + Notion 친근함)
> **Source of Truth**: draw.io Standard Templates & .impeccable.md

## 1. 조형 엔진 (Layout Engines)

### A. Sequential Engine (흐름과 시간)
- **대상**: Gitflow, Activity, Roadmap, Project Steps
- **원칙**:
  - 선(Line)은 0.8px 헤어라인.
  - 브랜치 분기 시 8px 반경의 베지어 곡선 사용.
  - 노드는 4px 또는 6px의 정교한 Circle/Capsule.
  - **Annotation**: 흐름 상단에 9px 폰트로 '메타 주석' 배치.

### B. Hierarchical Engine (구조와 위계)
- **대상**: C4 Model, Org Chart, Layer Infographics
- **원칙**:
  - **Slab Design**: 박스는 Radius 2의 날카롭고 정갈한 사각형.
  - **Depth**: Opacity 중첩(0.05, 0.1, 0.2)을 통해 층간 위계 표현.
  - **Boundary**: 8px 간격의 정교한 Dashed line + 옅은 배경색(#fafafa).
  - **Header**: Semi-bold Label + Uppercase + Letter-spacing (0.05em).

### C. Graph/Logic Engine (연결과 판단)
- **대상**: Dependency Graph, Decision Tree, Mindmap, Fishbone
- **원칙**:
  - **Blueprint Lines**: 90도 꺾임(Orthogonal) 대신 45도 또는 부드러운 곡선 연결.
  - **Density Encoding**: 복잡한 로직일수록 내부 선의 밀도를 높여 시각적 무게감 차별화.
  - **Focus & Mute**: 핵심 경로만 Accent 컬러, 나머지는 Neutral-Stroke로 흐릿하게 처리.

## 2. 시각 요소 가이드 (Visual Primitives)

| 요소 | 사양 | 용도 |
| :--- | :--- | :--- |
| **Line (Solid)** | 1px / #999 | 확정된 실행 흐름, 강한 결합 |
| **Line (Dashed)** | 0.8px / 4 3 dash / #C0C0C0 | 의존성, 가상 영역, 미래 계획 |
| **Arrow** | Open V-shape (60 deg) | 현대적인 흐름 지시 |
| **Marker (Dot)** | 3px Solid Dot | 연결점, 마일스톤, 데이터 포인트 |
| **Annotation** | 9px Regular / #777 / Italic | 엔지니어의 코멘트, 기술적 통찰 |

## 3. 에디토리얼 원칙 (The Editorial Edge)

1. **8pt Grid**: 모든 요소의 간격, 정렬, 크기는 8의 배수로 강제 정렬.
2. **Negative Space**: 캔버스의 최소 20%는 항상 비워둠 (Breathe room).
3. **Typography Rhythm**: Label(12px Bold) → Sub(10px Regular) → Desc(9px Regular) 3단 위계 고수.
4. **No AI Slop**: 뻔한 그라데이션, 과도한 라운딩, 장식적 아이콘 사용 엄격 금지.
