import React from "react";
import Canvas from "./components/Canvas";

import UnitCircle from "./types/UnitCircle";

function App() {
  const circles: UnitCircle[] = [
    { radius: 100, coefficient: 1 },
    { radius: 10, coefficient: 0.1 },
    { radius: 10, coefficient: 20 },
    { radius: 30, coefficient: 30 },
  ];

  return (
    <div className="App">
      <Canvas unitCircles={circles} isGraphMode={true} />
    </div>
  );
}

export default App;
