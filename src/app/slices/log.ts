/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  characterId: string;
  reward: string;
}

const initialState: {
  items: any[];
} = {
  items: [
    // "17:52:13 Marcus finished killing 50 Chickens and received 1245 attack and 348 hitpoints experience! More Details",
    // "17:55:34 Maximus finished woodcutting Magic Trees and received 24480 woodcutting experience!",
    // "17:55:35 Queued Cooking task (50 raw chickens) for Maximus",
    // "17:55:40 Queued Fishing task (1 hour of barbarian fishing) for Marcus",
  ],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addMsg: ({ items }, { payload }: { payload: any }) => {
      if (items.length > 100) items.shift(); // 100 entires should be enough

      items.push(payload);
    },
  },
});

export const {
  addMsg,
} = logSlice.actions;
