/* eslint-disable no-param-reassign */
import { ItemData, ItemMap } from "../types/types";

export const addToItemBank = (bank: ItemData[], itemToBeAdded: ItemData): ItemData[] => {
  const tempBank = [...bank];

  const index = tempBank.findIndex((itemInBank) => itemInBank.item === itemToBeAdded.item);

  if (index !== -1 && tempBank[index].amount + itemToBeAdded.amount < 0) {
    console.error("NEGATIVE ITEMS IN BANK ALERT!!!");
    console.trace();
  }

  if (index !== -1) {
    tempBank[index] = {
      ...tempBank[index],
      amount: tempBank[index].amount + itemToBeAdded.amount,
    };
  } else {
    tempBank.push(itemToBeAdded);
  }

  return tempBank;
};
/**
 * merges two sets of banks (ItemData[])
 * @param bank - the bank of which you want to preserve the order
 * @param bankToAdd - the bank you want to add to the first bank
 */
export const addBankToBank2 = (bank: ItemData[], bankToAdd: ItemData[]): ItemData[] => {
  let tempBank = [...bank];

  bankToAdd.forEach((itemToBeAdded) => {
    tempBank = addToItemBank(tempBank, itemToBeAdded);
  });

  return tempBank;
};

// interface Entry {
//   item: number
// }

// interface Hmm {
//   [id: string]: number
// }

// const addItemAtIndex = (bank, item, index) => {

// };

// eslint-disable-next-line arrow-body-style
export const addItemRewardToBank = (bank: ItemData[], itemReward: ItemMap): ItemData[] => {
  let tempBank = [...bank];

  itemReward.forEach((value, key) => {
    tempBank = addToItemBank(tempBank, { item: key, amount: value }); // todo temp hack
  });

  return tempBank;
};

export const addBankToBank = (bank: ItemData[], bankToAdd: ItemData[]): ItemData[] => {
  let tempBank = [...bank];
  // todo store index and access the item directly

  // const bankCache = tempBank.reduce((accum: Hmm, item, index) => {
  //   accum[item.item] = index;
  //   return accum;
  // }, {});
  // console.log("here!!!!!!!!!!!!!!@@@@@@@@@@");

  // console.log(bankCache);

  bankToAdd.forEach((itemToBeAdded) => {
    tempBank = addToItemBank(tempBank, itemToBeAdded);
  });

  return tempBank;
};

export const removeFromItemBank = (bank: ItemData[], itemToBeRemoved: ItemData): ItemData[] => {
  const tempBank = [...bank];

  const index = tempBank.findIndex((itemInBank) => itemInBank.item === itemToBeRemoved.item);

  if (index !== -1) {
    if (bank[index].amount > itemToBeRemoved.amount) {
      tempBank[index] = {
        ...tempBank[index],
        amount: tempBank[index].amount - itemToBeRemoved.amount,
      };
    } else {
      tempBank.splice(index, 1);
    }
  } else {
    console.error(`Item not found in character bank: ${itemToBeRemoved.item}`);
  }

  return tempBank;
};

export const removeBankFromBank = (bank: ItemData[], bankToRemove: ItemData[]): ItemData[] => {
  let tempBank = [...bank];

  bankToRemove.forEach((itemToBeRemoved) => {
    tempBank = removeFromItemBank(tempBank, itemToBeRemoved);
  });

  return tempBank;
};
