/**
 * Returns a random integer between the specified values.
 * The maximum is inclusive and the minimum is inclusive
 * The value is no lower than min (or the next integer greater than min if min isn't an integer),
 * and can be equal to max.
 * @param min
 * @param max
 */

export function getRandomIntInclusive(min: number, max: number): number {
  const tmin = Math.ceil(min);
  const tmax = Math.floor(max);
  return Math.floor(Math.random() * (tmax - tmin + 1) + tmin);
}
