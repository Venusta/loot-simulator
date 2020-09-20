/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from "@reduxjs/toolkit";
import { charactersInitialState } from "../../builders/CharacterBuilder";
import { addBankToBank, expToLevel } from "../../util";
import { ItemData, ExpReward } from "../../types/types";

interface RewardPayload {
  payload: {
    characterId: string;
    reward: {
      items: ItemData[];
      exp: ExpReward[];
    };
  };
}

interface UpdateBankPayload {
  payload: {
    characterId: string;
    bank: ItemData[];
  };
}

export const characterSlice = createSlice({
  name: "characters",
  initialState: charactersInitialState({}),
  reducers: {
    addReward: (state, { payload: { characterId, reward } }: RewardPayload) => {
      const skills = state.skills[characterId];
      const bank = state.banks[characterId];
      const { exp, items } = reward;
      if (exp.length > 0) {
        exp.forEach((expReward) => {
          const { skill, amount } = expReward;
          skills[skill].exp += amount;
          skills[skill].level = expToLevel(skills[skill].exp);
        });
      }

      if (items.length > 0) {
        state.banks[characterId] = addBankToBank(bank, items);
      }
    },
    updateBank: (state, { payload: { characterId, bank } }: UpdateBankPayload) => {
      state.banks[characterId] = bank;
    },
  },
});

export const {
  addReward,
  updateBank,
} = characterSlice.actions;
