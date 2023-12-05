/**
 * Linear interpolation between two numbers, "a" and "b".
 */
export const lerp = (a: number, b: number, t: number): number => {
  return a + t * (b - a);
};