import { combineReducers } from "@reduxjs/toolkit";
import { characterSlice } from "./character";

export const reducer = combineReducers({
  characters: characterSlice.reducer,
});
