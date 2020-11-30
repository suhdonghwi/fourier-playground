import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";

import UnitCircle from "./types/UnitCircle";
import Point from "./types/Point";
import fourierCoefficient from "./fourier/coefficient";

import CircleList from "./components/CircleList";
import ConfigGrid, { Config } from "./components/ConfigGrid";

function cleanPath(path: Point[]) {
  let lastPoint = path[0];
  const result = [lastPoint];

  for (let i = 1; i < path.length; i++) {
    if (Math.abs(path[i].x - lastPoint.x + (path[i].y - lastPoint.y)) > 0.5) {
      result.push(path[i]);
      lastPoint = path[i];
    }
  }

  // closing curves
  if (Math.abs(lastPoint.x - result[0].x + (lastPoint.y - result[0].y)) > 50) {
    const deltaX = result[0].x - lastPoint.x,
      deltaY = result[0].y - lastPoint.y;

    for (let i = 1; i < 10; i++) {
      result.push({
        x: lastPoint.x + (deltaX / 10) * i,
        y: lastPoint.y + (deltaY / 10) * i,
      });
    }
  }

  return result;
}

function App() {
  const [isFirst, setIsFirst] = useState(true);
  const [circles, setCircles] = useState<UnitCircle[]>([
    { radius: 80, coefficient: 50, phi: 0 },
  ]);
  const [path, setPath] = useState<Point[]>([{ x: 0, y: 0 }]);

  const [config, setConfig] = useState<Config>({
    isGraphMode: false,
    thetaDelta: 0.001,
    circleNum: 30,
    drawTrail: true,
  });

  useEffect(() => {
    if (isFirst || path.length <= 1) {
      setIsFirst(false);
    } else {
      const coeffs = fourierCoefficient(path, config.circleNum);
      const cs: UnitCircle[] = [];

      let n = -config.circleNum;
      for (const coeff of coeffs) {
        const polar = coeff.toPolar();

        cs.push({
          radius: polar.r,
          coefficient: n,
          phi: polar.phi,
        });
        n++;
      }
      console.log(cs);

      setCircles(cs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.circleNum, path]);

  function onDrawFinish(drawing: Point[]) {
    setPath(cleanPath(drawing));
  }

  return (
    <div className="App">
      <Canvas
        unitCircles={circles}
        config={config}
        onDrawFinish={onDrawFinish}
      />
      <div className="right">
        <CircleList value={circles} onChange={(c) => setCircles(c)} />
        <ConfigGrid config={config} changeConfig={(c) => setConfig(c)} />
      </div>
    </div>
  );
}

export default App;
