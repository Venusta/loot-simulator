import { ItemData } from "../types/types";

export class Drops {
  private drops: ItemData[];
  constructor() {
    this.drops = [];
  }

  add = (newDrops: ItemData[]) => {
    this.drops = this.drops.concat(newDrops);
    return this;
  };

  getIndividualDrops = () => this.drops;

  getGroupedDrops = (): ItemData[] => {
    const drops = this.drops.flat();

    const result: ItemData[] = [];
    drops.forEach((currentDrop) => {
      const { item, amount } = currentDrop;

      const index = result.findIndex((drop) => drop.item === item);

      if (index === -1) {
        result.push({ item, amount });
      } else {
        result[index].amount += amount;
      }
    });
    return result;
  };
}
