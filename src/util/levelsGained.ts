import { CharacterSkills, SkillName, ExpReward } from "../types/types";
import { expToLevel } from "./expToLevel";

export type LevelsGained = [SkillName, number, number][]; // todo move this

export const levelsGained = (skills: CharacterSkills, expReward: ExpReward[]): LevelsGained => {
  const levelGains: LevelsGained = [];
  expReward.forEach(({ skill, amount }) => {
    const { level, exp: oldExp } = skills[skill];
    const newExp = amount + oldExp;
    const newLevel = expToLevel(newExp);
    if (newLevel > level) {
      levelGains.push([skill, newLevel - level, newLevel]);
    }
  });
  return levelGains;
};
