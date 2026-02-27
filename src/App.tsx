import { Suspense } from "react";
import { experiments } from "./experiments";

const MAIN_EXPERIMENT_ID = "page-12";

function App() {
  const current = experiments.find((e) => e.id === MAIN_EXPERIMENT_ID);
  const Component = current?.component;

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {Component ? (
        <Suspense
          fallback={<div style={{ padding: 40, color: "#888" }}>로딩 중...</div>}
        >
          <Component />
        </Suspense>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "#aaa",
            fontSize: 13,
          }}
        >
          page-12를 찾을 수 없습니다.
        </div>
      )}
    </div>
  );
}

export default App;
