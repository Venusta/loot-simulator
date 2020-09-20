import { itemSearchData } from "./Items";
import { DropTable } from "../drop-simulator/DropTable";
import { itemMapToItemData, getDrop } from "../drop-simulator/DropSimulator";
import {
  AttackType, ExpReward, ItemData, ItemMap, MonsterData, StyleExperience,
} from "../types/types";
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
  data: MonsterData;

  constructor({ id, name, dropTable }: MonsterOptions) {
    this.dropTable = dropTable;
    this.name = name;
    this.id = id;
    // this.data = monsterData[id];
    this.data = {
      combatLevel: 111,
      hitpoints: 105,
      attackType: [AttackType.Slash],
      attackSpeed: 4,
      attributes: [],
      category: ["gargoyle"],
      attackLevel: 75,
      strengthLevel: 105,
      defenceLevel: 107,
      magicLevel: 1,
      rangedLevel: 1,
      attackStab: 0,
      attackSlash: 0,
      attackCrush: 0,
      attackMagic: 0,
      attackRanged: 0,
      defenceStab: 20,
      defenceSlash: 20,
      defenceCrush: 0,
      defenceMagic: 20,
      defenceRanged: 20,
      attackAccuracy: 0,
      meleeStrength: 0,
      rangedStrength: 0,
      magicDamage: 0,
      slayerLevelRequired: 75,
      slayerXP: 105,
    };
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

  getExperience = (amount = 1, styleExp: StyleExperience): ExpReward[] => {
    const { hitpoints } = this.data;

    switch (styleExp) {
      case "shared":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "attack", amount: hitpoints * 1.33 * amount },
          { skill: "strength", amount: hitpoints * 1.33 * amount },
          { skill: "defence", amount: hitpoints * 1.33 * amount },
        ];
      case "ranged and defence":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "ranged", amount: hitpoints * 2 * amount },
          { skill: "defence", amount: hitpoints * 2 * amount },
        ];
      case "magic and defence":
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: "magic", amount: hitpoints * 2 * amount },
          { skill: "defence", amount: hitpoints * 2 * amount },
        ];
      default:
        return [
          { skill: "hitpoints", amount: hitpoints * 1.33 * amount },
          { skill: styleExp, amount: hitpoints * 4 * amount },
        ];
    }
  };

  // todo remove later, only for debug
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  resultToNames = (amt = 1) => this.kill(amt).map((drop) => {
    const { item, amount } = drop;
    const name = itemSearchData.getName(item);
    return { name, amount };
  }, {});
}
