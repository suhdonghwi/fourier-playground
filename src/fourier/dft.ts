import Complex from "../types/Complex";

export default function dft(data: Complex[]) {
  const n = data.length;
  const output: Complex[] = [];
  for (let k = 0; k < n; k++) {
    const sum = { real: 0, imag: 0 };
    for (let t = 0; t < n; t++) {
      const angle = 2 * Math.PI * t * k / n;
      sum.real += data[t].real * Math.cos(angle) + data[t].imag * Math.sin(angle);
      sum.imag += -data[t].real * Math.sin(angle) + data[t].imag * Math.cos(angle);
    }
    
    output.push(sum);
  }

  return output;
}
