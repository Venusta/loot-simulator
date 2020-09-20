import { ItemData } from "../types/types";

export class Bank {
  private bank: ItemData[];
  constructor() {
    this.bank = [];
  }

  addItem = (data: ItemData) => {
    const { item: newItem, amount: amt } = data;
    this.bank.forEach(({ item, amount }, index) => {
      if (newItem === item) {
        this.bank[index].amount += amt;
      } else {
        this.bank.push(data);
      }
    });
    return this;
  };

  addItems = (newDrops: ItemData[]) => {
    newDrops.forEach((item) => {
      this.addItem(item);
    });
    return this;
  };

  get = () => this.bank;
}
