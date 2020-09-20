import { getRandomInt } from "./getRandomInt";

/**
 * Rolls a number from 0 to max-1
 * @param max
 */

export const randomRoll = (max: number): number => getRandomInt(0, max - 1);
