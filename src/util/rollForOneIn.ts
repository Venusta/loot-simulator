import { getRandomInt } from "./getRandomInt";

/**
 * Rolls a 1 in X chance, returning a boolean on successfull rolls.
 * @param upperLimit The upper limit of the roll.
 */
export function rollForOneIn(upperLimit: number): boolean {
  return getRandomInt(1, upperLimit + 1) === 1;
}
