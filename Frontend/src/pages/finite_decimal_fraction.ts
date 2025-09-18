function generateFiniteDecimalFraction(components: number[]) {
  let fraction = 0;
  for (let i = 0; i < components.length; i++) {
    const power = 10 ** i;
    fraction += components[i] / power;
  }
  return fraction;
}

generateFiniteDecimalFraction([3, 6, 9, 3, 1]);
