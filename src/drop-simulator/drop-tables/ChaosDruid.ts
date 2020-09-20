import { DropTable } from "../DropTable";
import { herbDropTable } from "./HerbDropTable";
import { gemDropTable } from "./GemDropTable";

export const dropTable = new DropTable()
  .always("Bones")
  .add("Law rune", 7, 2)
  .add("Mithril bolts", 5, [2, 12])
  .add("Air rune", 3, 36)
  .add("Body rune", 2, 9)
  .add("Earth rune", 2, 9)
  .add("Mind rune", 2, 12)
  .add("Nature rune", 1, 3)
  .add(herbDropTable, 35)
  .add(herbDropTable, 11, 2)
  .add("Coins", 5, 3)
  .add("Coins", 5, 8)
  .add("Coins", 3, 29)
  .add("Coins", 1, 35)
  .nothing(33)
  .add("Vial of water", 10)
  .add("Bronze longsword", 1)
  .add("Snape grass", 1)
  .add(gemDropTable, 1)

  .tertiary("Ensouled chaos druid head", 35);
