/* eslint-disable max-len */
import { expToLevel } from "../util";
import { CharacterSkill } from "../types/types";

export const skill = (exp = 0, boost = 0): CharacterSkill => ({
  exp,
  level: expToLevel(exp),
  boost,
});

const didWeLevel = (lvl: number, newLvl: number): boolean => newLvl > lvl;

export const gainExp = (skillData: CharacterSkill, amount: number): CharacterSkill => {
  const { exp, level } = skillData;
  const newExp = exp + amount;
  if (didWeLevel(level, expToLevel(newExp))) {
    console.log("level up!");
  }
  return { ...skillData, exp: newExp, level: expToLevel(newExp) };
};

export const decide = (payload: { characterId: number; duration: number; skill: string; expReward: number }): void => {
  console.log(payload);
  console.log("yeeeeeeeeet");
};
