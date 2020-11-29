import * as math from "mathjs";

export default function fourierCoefficient(
  f: (arg0: number) => math.Complex,
  range: number
): math.Complex[] {
  const delta = 0.01;
  const result = [];

  for (let n = -range; n <= range; n++) {
    let sum: math.Complex = math.complex(0, 0);

    for (let t = 0; t <= 1.0; t += delta) {
      sum = math.add(
        sum,
        math.multiply(
          math.multiply(f(t), math.evaluate(`e^((-${n}) * 2 * pi * i * ${t})`)),
          delta
        )
      ) as math.Complex;
    }

    result.push(sum);
  }

  return result;
}
