/* eslint-disable max-len */
/**
 * Calculates weight from a range based on level
 * @param level level (1-99)
 * @param low Weight at level 1
 * @param high Weight at level 99
 */
export const calculateWeight = (level: number, low: number, high: number): number => low + ((level - 1) / 98) * (high - low);
