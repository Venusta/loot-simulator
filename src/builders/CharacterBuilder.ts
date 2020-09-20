import { itemSearchData } from "../model/Items";
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import * as startingSkills from "../model/Skills";
import { EquipmentSlots, ItemData, CharacterSkills } from "../types/types";

export type IDsState = string[];

export interface ItemBankState {
  [x: string]: ItemData[];
}

export interface NameState {
  [x: string]: string;
}

export interface SkillsState {
  [x: string]: CharacterSkills;
}

export interface StateOptions {
  ids?: IDsState;
}

export interface EquipmentState {
  [x: string]: EquipmentSlots;
}

interface CharactersState {
  ids: IDsState;
  banks: ItemBankState;
  skills: SkillsState;
  names: NameState;
  equipment: EquipmentState;
}

const startingIDs = ["3", "9", "11", "15", "18"];

const startingNames = ["Maximus Decimus Meridius", "Marcus Aurelius", "Character 3", "Character 4", "Character 5"];

const startingItems: ItemData[] = [
  { item: 995, amount: 6000, placeholder: true },
  { item: 377, amount: 6000, placeholder: true },
  { item: itemSearchData.getId("Harpoon"), amount: 5 },
  { item: itemSearchData.getId("Small fishing net"), amount: 5 },
  // { item: 2138, amount: 20000 },
  // { item: 314, amount: 5 },
  // { item: 331, amount: 8045 },
  // { item: 11323, amount: 5 },
  // { item: 2140, amount: 0 },
  // { item: 2144, amount: 0 },
  // { item: 1511, amount: 10000000 },
  // { item: 50, amount: 100000000 },
  // { item: 101, amount: 1000000000 },
  // { item: 201, amount: 400000 },
  // { item: 301, amount: 5000000 },
  // { item: 401, amount: 201 },
  // { item: 4151, amount: 200 },
  // { item: 1031, amount: 10000000000 },
  // { item: 1033, amount: 100000000000 },
  // { item: 1035, amount: 1000000000000 },
  // { item: 1037, amount: 10000000000000 },
  // { item: 1038, amount: 100000000000000 },
  // { item: 1040, amount: 1000000000000000 },
  // { item: 1042, amount: 10000000000000000 },
  // { item: 1044, amount: 100000000000000000 },
  // { item: 1046, amount: 1000000000000000000 },
  // { item: 1048, amount: 3 },
  // { item: 1050, amount: 3 },
  // { item: 11328, amount: 0 },
  // { item: 11330, amount: 0 },
  // { item: 11332, amount: 0 },
  // { item: 1052, amount: 3 },
  // { item: 1053, amount: 3 },
  // { item: 1055, amount: 3 },
  // { item: 1057, amount: 3 },
  // { item: 1059, amount: 3 },
  // { item: 1061, amount: 3 },
  // { item: 2619, amount: 0 },
  // { item: 2615, amount: 0 },
  // { item: 2617, amount: 0 },
  // { item: 8845, amount: 0 },
  // { item: 8846, amount: 0 },
  // { item: 8847, amount: 0 },
  // { item: 8848, amount: 0 },
  // { item: 8849, amount: 0 },
  // { item: 8850, amount: 0 },
  // { item: 8851, amount: 0 },
  // { item: 8852, amount: 0 },
  // { item: 8853, amount: 0 },
  // { item: 8855, amount: 0 },
  // { item: 8856, amount: 0 },
  // { item: 8857, amount: 0 },
  // { item: 885, amount: 0 },
  // { item: 8859, amount: 0 },
  // { item: 8860, amount: 0 },
  // { item: 8861, amount: 0 },
  // { item: 8862, amount: 1 },
  // { item: 8863, amount: 1 },
  // { item: 8865, amount: 1 },
  // { item: 8867, amount: 1 },
  // { item: 8869, amount: 1 },
  // { item: 8269, amount: 1 },
  // { item: 8369, amount: 1 },
  // { item: 8469, amount: 1 },
  // { item: 8569, amount: 1 },
  // { item: 2569, amount: 1 },
  // { item: 2570, amount: 1 },
  // { item: 2571, amount: 1 },
  // { item: 2572, amount: 1 },
  // { item: 2573, amount: 1 },
  // { item: 24537, amount: 1 },
];

const startingEquipment: EquipmentSlots = {
  head: 2619,
  body: 2615,
  legs: 2617,
  feet: -2,
  hands: -2,
  cape: -2,
  weapon: 4151,
  shield: 8845,
  ammo: -2,
  ring: -2,
  neck: -2,
};

const mapDataToId = (ids: string[], data: ItemData[] | CharacterSkills | EquipmentSlots) => {
  return ids.reduce((accum, id) => ({
    ...accum,
    [id]: data,
  }), {});
};

export const charactersInitialState = ({ ids = startingIDs }: StateOptions): CharactersState => {
  console.log("Character State Remake!");

  const banks: ItemBankState = mapDataToId(ids, startingItems);
  const skills: SkillsState = mapDataToId(ids, startingSkills.skills);
  const names: NameState = {
    [ids[0]]: startingNames[0],
    [ids[1]]: startingNames[1],
    [ids[2]]: startingNames[2],
    [ids[3]]: startingNames[3],
    [ids[4]]: startingNames[4],
  };
  const equipment: EquipmentState = mapDataToId(ids, startingEquipment);

  return {
    ids,
    banks,
    skills,
    names,
    equipment,
  };
};
