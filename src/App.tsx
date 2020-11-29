import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import * as math from "mathjs";

import UnitCircle from "./types/UnitCircle";
import Point from "./types/Point";
import fourierCoefficient from "./fourier/coefficient";

function App() {
  const [circleNum, setCircleNum] = useState(30);
  const [circles, setCircles] = useState<UnitCircle[]>([]);
  const [path, setPath] = useState<Point[]>([{ x: 0, y: 0 }]);

  useEffect(() => {
    const coeffs = fourierCoefficient(path, circleNum);
    const cs: UnitCircle[] = [];

    let n = -circleNum;
    for (const coeff of coeffs) {
      const polar = coeff.toPolar();

      cs.push({
        radius: polar.r,
        coefficient: n * Math.PI * 2,
        phi: polar.phi,
      });
      n++;
    }

    setCircles(cs);
  }, [circleNum, path]);

  function onDrawFinish(drawing: Point[]) {
    setPath(drawing);
  }

  return (
    <div className="App">
      <Canvas
        unitCircles={circles}
        isGraphMode={false}
        onDrawFinish={onDrawFinish}
      />
    </div>
  );
}

export default App;
