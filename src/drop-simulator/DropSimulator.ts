import { ItemData, ItemMap } from "../types/types";
import { getRandomIntInclusive, rollForOneIn } from "../util";
import { DropData, Amount, DropTable } from "./DropTable";

export const itemMapToItemData = (map: ItemMap): ItemData[] => {
  // todo util?
  const itemData: ItemData[] = [];
  map.forEach((amount, item) => {
    itemData.push({ item, amount });
  });
  return itemData;
};

const getAmount = (amount: Amount): number => {
  // todo util
  if (Array.isArray(amount)) {
    const [min, max] = amount;
    return getRandomIntInclusive(min, max);
  }
  return amount;
};

export const getDrop = ({
  alwaysItems,
  secondaryItems,
  tertiaryItems,
  oneInXItems,
  totalWeight,
}: DropTable): ItemMap => {
  const dropMap: ItemMap = new Map([]);

  const processDrop = (dropData: DropData): void => {
    const { item, amount: a } = dropData;
    const amount = getAmount(a);

    if (item instanceof DropTable) {
      for (let index = 0; index < amount; index += 1) {
        getDrop(item).forEach((value, key) => {
          processDrop({ item: key, amount: value });
        });
      }
      return;
    }
    dropMap.set(item, (dropMap.get(item) || 0) + amount);
  };

  alwaysItems.forEach((dropData) => {
    processDrop(dropData);
  });

  tertiaryItems.forEach((dropData) => {
    if (rollForOneIn(dropData.chance)) {
      processDrop(dropData);
    }
  });

  for (let index = 0; index < oneInXItems.length; index += 1) {
    /**
     * sorted so it rolls the rarest item first
     */
    const sorted = oneInXItems.sort((a, b) => b.chance - a.chance); // todo do this in the actual oneinX method
    const dropData = sorted[index];

    if (rollForOneIn(dropData.chance)) {
      processDrop(dropData); // return because it should be the only drop
      return dropMap;
    }
  }

  const roll = getRandomIntInclusive(1, totalWeight);
  let weightTally = 0;

  for (let index = 0; index < secondaryItems.length; index += 1) {
    const item = secondaryItems[index];

    weightTally += item.weight;

    if (roll <= weightTally) {
      processDrop(item);
      break;
    }
  }
  return dropMap;
};
