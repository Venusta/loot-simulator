/**
 * Returns a random integer between the specified values.
 * The value is no lower than min (or the next integer greater than min if min isn't an integer),
 * and is less than (but not equal to) max.
 * @param min
 * @param max
 */

export function getRandomInt(min: number, max: number): number {
  const tmin = Math.ceil(min);
  const tmax = Math.floor(max);
  return Math.floor(Math.random() * (tmax - tmin) + tmin);
}
