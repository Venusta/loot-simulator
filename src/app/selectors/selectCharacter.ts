import { createSelector } from "@reduxjs/toolkit";
import { selectName } from "./selectName";
import { selectBank } from "./selectBank";

/**
 * Selects a character from the state based on id
 */
export const selectCharacter = createSelector(
  selectName,
  selectBank,
  (name, bank) => ({
    name,
    bank,
  }),
);
