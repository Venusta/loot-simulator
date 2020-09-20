/* eslint-disable max-len */
import { RootState } from "../store";
import { CharacterSkills } from "../../types/types";

/**
 * Selects the characters skills from state based on id
 * @param state RootState
 * @param id character id
 */
export const selectSkills = (state: RootState, id: string): CharacterSkills => state.characters.skills[id];
