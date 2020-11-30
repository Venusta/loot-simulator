import { dropTable } from "../drop-simulator/drop-tables/Chicken";
import { Monster } from "../model/Monster";

export const chicken = new Monster({
  id: 420, // wrong
  name: "Chicken",
  dropTable,
});
