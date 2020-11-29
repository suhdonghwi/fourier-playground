import React from "react";
import Canvas from "./components/Canvas";
import * as math from "mathjs";

import UnitCircle from "./types/UnitCircle";
import fourierCoefficient from "./fourier/coefficient";

function App() {
  function f(x: number) {
    if (x <= 0.25) {
      return math.complex(300 * x, 0);
    } else if (x <= 0.5) {
      return math.complex(75, 300 * (x - 0.25));
    } else if (x <= 0.75) {
      return math.complex(75 - 300 * (x - 0.5), 75);
    } else {
      return math.complex(0, 75 - 300 * (x - 0.75));
    }
    /*if (x <= 0.5) return math.complex(100 * x, 0);
    else return math.complex(100 * x, 100);*/
  }

  const coeffs = fourierCoefficient(f, 5);
  const circles: UnitCircle[] = [];

  let n = -5;
  for (const coeff of coeffs) {
    const polar = coeff.toPolar();

    circles.push({
      radius: polar.r,
      coefficient: n * Math.PI * 2,
      phi: polar.phi,
    });
    n++;
  }

  return (
    <div className="App">
      <Canvas unitCircles={circles} isGraphMode={false} />
    </div>
  );
}

export default App;
