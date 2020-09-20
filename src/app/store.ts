import {
  configureStore, ThunkAction, Action, getDefaultMiddleware, AnyAction, Dispatch,
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useDispatch } from "react-redux";
import { reducer } from "./slices/index";

const middleware = [
  ...getDefaultMiddleware(),
  logger,
];

export const store = configureStore({
  reducer,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = (): Dispatch<AnyAction> => useDispatch<AppDispatch>();
