import React from "react";
import Canvas from "./components/Canvas";

import UnitCircle from "./types/UnitCircle";

function App() {
  const circles: UnitCircle[] = [{ radius: 100, coefficient: 1 }, { radius: 50, coefficient: 100 }];

  return (
    <div className="App">
      <Canvas unitCircles={circles} />
    </div>
  );
}

export default App;
