import { dropTable } from "../drop-simulator/drop-tables/ChaosDruid";
import { Monster } from "../model/Monster";

export const chaosDruid = new Monster({
  id: 520,
  name: "Chaos Druid",
  dropTable,
});
