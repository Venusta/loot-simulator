import { dropTable } from "../drop-simulator/drop-tables/CommanderZilyana";
import { Monster } from "../model/Monster";

export const commanderZilyana = new Monster({
  id: 2205,
  name: "Commander Zilyana",
  dropTable,
});
