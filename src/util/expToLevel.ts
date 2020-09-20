/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import { levelToExpLookupTable } from "./levelToExp";

/**
 * Returns a level from given exp amount
 * @param exp
 * @param index current Level
 */
export const expToLevel = (exp: number, index = 1): number => {
  for (let lvl = index; lvl <= 99; lvl += 1) {
    if (levelToExpLookupTable(lvl) > exp) { return lvl - 1; }
  }
  return 99;
};
