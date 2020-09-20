import { ItemMap } from "../types/types";

export class DropCollection {
  private dropCollection: ItemMap;
  constructor() {
    this.dropCollection = new Map([]);
  }

  addItems = (newDrops: ItemMap): this => {
    newDrops.forEach((amount, item) => {
      this.dropCollection.set(item, (this.dropCollection.get(item) || 0) + amount);
    });
    return this;
  };

  get = (): ItemMap => this.dropCollection;
}
