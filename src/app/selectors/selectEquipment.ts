/* eslint-disable max-len */
import { RootState } from "../store";
import { EquipmentSlots } from "../../types/types";
/**
 * Selects the characters equipment from state based on id
 * @param state RootState
 * @param id character id
 */
export const selectEquipment = (state: RootState, id: string): EquipmentSlots => (state.characters.equipment[id]);
