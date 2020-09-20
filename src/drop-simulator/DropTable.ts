import { itemSearchData } from "../model/Items";

export type Drop = number | DropTable;
export type Amount = number | [number, number];

export interface DropData {
  item: Drop;
  amount: Amount;
}

export interface SecondaryDropData extends DropData {
  weight: number;
}

export interface ChanceDropData extends DropData {
  chance: number;
}

const resolveId = (drop: Drop | string) => (typeof drop === "string" ? itemSearchData.getId(drop) : drop);

export class DropTable {
  public alwaysItems: DropData[] = [];
  public secondaryItems: SecondaryDropData[] = [];
  public tertiaryItems: ChanceDropData[] = [];
  public oneInXItems: ChanceDropData[] = [];

  public totalWeight = 0;

  /**
   * Items with 100% drop rate (bones, ashes)
   * @param drop drop table or item id
   * @param amount number or range eg 5 or [5,10]
   */

  always = (drop: Drop | string, amount: Amount = 1): this => {
    this.alwaysItems.push({ item: resolveId(drop), amount });
    return this;
  };

  /**
   * Secondary items, chance to get one of these (coins etc)
   * @param drop drop table or item id
   * @param weight how many times the drop appears in the drop table
   * @param amount number or range eg 5 or [5,10]
   */

  add = (drop: Drop | string, weight = 1, amount: Amount = 1): this => {
    if (weight === 0) throw new Error("WTF WEIGHT 0, LEARN TO TYPE, YOU CUNT");
    this.secondaryItems.push({ item: resolveId(drop), amount, weight });
    this.totalWeight += weight;
    return this;
  };

  /**
   * @param weight how many times the drop appears in the drop table
   */
  nothing = (weight: number): this => {
    this.totalWeight += weight;
    return this;
  };

  /**
   * Tertiary items, you can get one of each of these, possibly all
   * @param drop item id
   * @param chance one in X chance
   * @param amount number or range eg 5 or [5,10]
   */

  tertiary = (drop: number | string, chance: number, amount: Amount = 1): this => {
    this.tertiaryItems.push({ item: resolveId(drop), amount, chance });
    return this;
  };

  /**
   * Rare drop, if you land on this you won't get additonal loot.
   * @param drop item id
   * @param chance one in X chance
   * @param amount number or range eg 5 or [5,10]
   */

  oneInX = (drop: Drop | string, chance: number, amount: Amount = 1): this => {
    this.oneInXItems.push({ item: resolveId(drop), amount, chance });
    return this;
  };
}
