/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
import { createSlice } from "@reduxjs/toolkit";
import { charactersInitialState } from "../../builders/CharacterBuilder";
import { addBankToBank } from "../../util";
import { ItemData } from "../../types/types";

interface RewardPayload {
  payload: {
    characterId: string;
    reward: {
      items: ItemData[];
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
      const bank = state.banks[characterId];
      const { items } = reward;

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
