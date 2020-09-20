export interface CharacterState {
  name: string;
  bank: ItemData[];
}

export type ItemData = {
  item: number;
  amount: number;
  placeholder?: boolean;
};

export type ItemMap = Map<number, number>;

export interface TaskRewardMap {
  items: ItemMap;
}
export interface TaskReward {
  items: ItemData[];
}
