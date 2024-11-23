/** @see https://stackoverflow.com/questions/6972331/how-can-i-generate-a-set-of-points-evenly-distributed-along-the-perimeter-of-an */
export const grimEllipsePoints = (count: number, rx: number, ry: number, offset = Math.PI / 2) => {
  const points: Array<{ x: number, y: number }> = [];

  // dp(t) calculates the distance from the center of the ellipse
  // to the point on the ellipse at the given theta plus π/2
  const computeDpt = (theta: number) =>
    Math.sqrt(
      Math.pow(rx * Math.sin(theta + offset), 2) +
      Math.pow(ry * Math.cos(theta + offset), 2),
    );

  // Integrate over the ellipse to calculate the circumference.
  const deltaTheta = 0.001;
  const numIntegrals = Math.round(2 * Math.PI / deltaTheta);
  let currentTheta = 0;
  let circumference = 0;
  for (let i = 0; i < numIntegrals; i++) {
    currentTheta = i * deltaTheta;
    circumference += computeDpt(currentTheta);
  }

  // Iterate over the ellipse again to add points along that circumference.
  currentTheta = 0;
  let nextPoint = 0;
  let run = 0;
  for (let i = 0; i < numIntegrals; i++) {
    currentTheta += deltaTheta;
    // Add 1 to count to leave a gap for the storyteller!
    let subIntegral = (count + 1) * run / circumference;
    if (Math.trunc(subIntegral) > nextPoint) {
      const x = rx * Math.cos(currentTheta + offset);
      const y = ry * Math.sin(currentTheta + offset);
      points.push({ x, y });
      nextPoint++;
    }
    run += computeDpt(currentTheta);
  }

  return points;
};
