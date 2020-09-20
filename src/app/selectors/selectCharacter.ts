import { createSelector } from "@reduxjs/toolkit";
import { selectName } from "./selectName";
import { selectSkills } from "./selectSkills";
import { selectEquipment } from "./selectEquipment";
import { selectBank } from "./selectBank";

/**
 * Selects a character from the state based on id
 */
export const selectCharacter = createSelector(
  selectName,
  selectSkills,
  selectEquipment,
  selectBank,
  (name, skills, equipment, bank) => ({
    name,
    skills,
    equipment,
    bank,
  }),
);
