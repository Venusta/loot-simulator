/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  TaskEquipmentData, ItemData, TaskRequirements, EquipmentSlots, SkillMap, ExpMap, ItemMap, CharacterSkills,
} from "../types/types";
import { expToLevel } from ".";

interface CharacterState {
  name: string;
  skills: CharacterSkills;
  equipment: EquipmentSlots;
  bank: ItemData[];
}

export const hasSkillsOld = (characterSkills: CharacterSkills, skills: SkillMap, gainedExp: ExpMap = new Map([])): boolean => { // good for req msg
  return Array
    .from(skills)
    .map(([skill, level]) => expToLevel(characterSkills[skill].exp + (gainedExp.get(skill) ?? 0), characterSkills[skill].level) >= level)
    .every((b) => b);
};

export const hasSkills = (characterSkills: CharacterSkills, skills: SkillMap, gainedExp: ExpMap = new Map([])): boolean => {
  let reqs = true;
  skills.forEach((reqLevel, skill) => {
    if (expToLevel(characterSkills[skill].exp + (gainedExp.get(skill) ?? 0), characterSkills[skill].level) < reqLevel) { // <=?
      reqs = false;
    }
  });
  return reqs;
};

export const hasEquipment = (characterEquipment: EquipmentSlots, equipment: TaskEquipmentData[]): boolean => {
  return equipment.map(({ item, slot }) => characterEquipment[slot] === item).every((b) => b);
};

export const hasItems = (characterItems: ItemData[], items: ItemMap, multiplier = 1): boolean => {
  return Array.from(items).map(([item, amount]) => {
    const index = characterItems.find((element) => (item === element.item && element.amount >= amount * multiplier));
    if (!index) {
      return false;
    }
    return true;
  }).every((b) => b);
};

export const hasItems2 = (characterItems: ItemData[], items: ItemMap, multiplier = 1): boolean => {
  let reqs = true;
  items.forEach((amount, item) => {
    const index = characterItems.find((element) => (item === element.item && element.amount >= multiplier * amount));
    if (!index) {
      reqs = false;
    }
  });
  return reqs;
};

export const getItemFromBank = (characterItems: ItemData[], item: number): ItemData | undefined => {
  const index = characterItems.find((element) => (item === element.item && element.amount));
  return index;
};

export const hasReqs = (character: CharacterState, requirements: TaskRequirements, amount: number): boolean => {
  const { skills, equipment, bank } = character;
  const haveSkills = hasSkills(skills, requirements.skills);
  const haveEquipment = hasEquipment(equipment, requirements.equipment);
  const haveItems = hasItems(bank, requirements.items, amount);
  return haveSkills && haveEquipment && haveItems;
};
