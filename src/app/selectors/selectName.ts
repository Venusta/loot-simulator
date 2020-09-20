import { RootState } from "../store";

/**
 * Selects the characters name from state based on id
 * @param state RootState
 * @param id character id
 */
export const selectName = (state: RootState, id: string): string => state.characters.names[id];
