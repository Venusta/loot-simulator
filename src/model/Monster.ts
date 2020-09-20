import { DropTable } from "../drop-simulator/DropTable";
import { itemMapToItemData, getDrop } from "../drop-simulator/DropSimulator";
import { ItemData, ItemMap } from "../types/types";
import { DropCollection } from "./DropCollection";
// import monsterData blahblah .json

interface MonsterOptions {
  id: number;
  name: string;
  dropTable: DropTable;
}

export class Monster {
  id: number;
  name: string;
  dropTable: DropTable;

  constructor({ id, name, dropTable }: MonsterOptions) {
    this.dropTable = dropTable;
    this.name = name;
    this.id = id;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  kill = (amount = 1): ItemData[] => {
    const y = getDrop(this.dropTable);
    console.log(y);
    return itemMapToItemData(y);
  };

  getLoot = (amount = 1): ItemMap => {
    const dropList = new DropCollection();
    for (let index = 0; index < amount; index += 1) {
      dropList.addItems(getDrop(this.dropTable));
    }
    return dropList.get();
  };
}
