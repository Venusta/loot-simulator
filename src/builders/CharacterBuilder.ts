import { itemSearchData } from "../model/Items";
import { ItemData } from "../types/types";

export type IDsState = string[];

export interface ItemBankState {
  [x: string]: ItemData[];
}

export interface NameState {
  [x: string]: string;
}

export interface StateOptions {
  ids?: IDsState;
}

interface CharactersState {
  ids: IDsState;
  banks: ItemBankState;
  names: NameState;
}

const startingIDs = ["3", "9", "11", "15", "18"];

const startingNames = ["Maximus Decimus Meridius", "Marcus Aurelius", "Character 3", "Character 4", "Character 5"];

const startingItems: ItemData[] = [
  { item: 995, amount: 6000, placeholder: true },
  { item: 377, amount: 6000, placeholder: true },
  { item: itemSearchData.getId("Harpoon"), amount: 5 },
  { item: itemSearchData.getId("Small fishing net"), amount: 5 },
];

const mapDataToId = (ids: string[], data: ItemData[]) => {
  return ids.reduce((accum, id) => ({
    ...accum,
    [id]: data,
  }), {});
};

export const charactersInitialState = ({ ids = startingIDs }: StateOptions): CharactersState => {
  console.log("Character State Remake!");

  const banks: ItemBankState = mapDataToId(ids, startingItems);
  const names: NameState = {
    [ids[0]]: startingNames[0],
    [ids[1]]: startingNames[1],
    [ids[2]]: startingNames[2],
    [ids[3]]: startingNames[3],
    [ids[4]]: startingNames[4],
  };

  return {
    ids,
    banks,
    names,
  };
};
