/* eslint-disable max-len */
import {
  TaskReward, ItemMap, TaskRewardMap, ItemData,
} from "../types/types";

export class RewardStore {
  private items: ItemMap;

  constructor() {
    this.items = new Map([]);
  }

  /**
   * Adds a TaskReward to the RewardStore
   * @param rewardToAdd
   */
  addReward = (rewardToAdd: TaskRewardMap, multiplier = 1): this => {
    this.addItem(rewardToAdd.items, multiplier);
    return this;
  };

  addItem = (items: ItemMap, multiplier = 1): this => {
    items.forEach((amount, key) => {
      this.items.set(key, (this.items.get(key) ?? 0) + (amount * multiplier));
    });
    return this;
  };

  removeItem = (items: ItemMap, multiplier = 1): this => {
    items.forEach((amount, key) => {
      this.items.set(key, (this.items.get(key) ?? 0) - (amount * multiplier));
    });
    return this;
  };

  /**
   * Returns all the items in the RewardStore as a Map Object
   */
  getItems = (): ItemMap => this.items;

  /**
   * Returns the full RewardStore as an Object of Map Objects
   */
  getStore = (): TaskRewardMap => {
    const { items } = this;
    return {
      items,
    };
  };

  getItemsObject = (): ItemData[] => Array.from(this.items.entries()).map(([item, amount]) => ({ item, amount }));

  /**
   * Converts the Maps to a pure Object of Arrays for the reducer
   */

  toObject = (): TaskReward => {
    const items = this.getItemsObject();
    return ({
      items,
    });
  };
}
