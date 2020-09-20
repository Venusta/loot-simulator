import { combineReducers } from "@reduxjs/toolkit";
import { characterSlice } from "./character";
import { taskSlice } from "./task";
import { logSlice } from "./log";

export const reducer = combineReducers({
  characters: characterSlice.reducer,
  tasks: taskSlice.reducer,
  log: logSlice.reducer,
});
