import * as math from "mathjs";

import Point from "../types/Point";

export default function fourierCoefficient(
  path: Point[],
  range: number
): math.Complex[] {
  const delta = 0.005;
  const result = [];

  for (let n = -range; n <= range; n++) {
    let sum: math.Complex = math.complex(0, 0);

    for (let t = 0; t <= 1.0; t += delta) {
      const point = path[Math.floor(path.length * t)];
      if (!point) {
        continue;
      }
      sum = math.add(
        sum,
        math.multiply(
          math.multiply(
            math.complex(point.x, point.y),
            math.evaluate(`e^((-${n}) * 2 * pi * i * ${t})`)
          ),
          delta
        )
      ) as math.Complex;
    }

    result.push(sum);
  }

  return result;
}
