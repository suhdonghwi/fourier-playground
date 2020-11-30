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

      const theta = 2 * Math.PI * -n * t;
      sum = math.add(
        sum,
        math.multiply(
          math.multiply(
            math.complex(point.x, point.y),
            math.complex(Math.cos(theta), Math.sin(theta))
          ),
          delta
        )
      ) as math.Complex;
    }

    result.push(sum);
  }

  return result;
}
