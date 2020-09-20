import { DropTable } from "../DropTable";
import { gemDropTable } from "./GemDropTable";
import { megaRareDropTable } from "./MegaRareDropTable";

export const rareDropTable = new DropTable()
  .add("Nature rune", 3, 67)
  .add("Adamant javelin", 2, 20)
  .add("Death rune", 2, 45)
  .add("Law rune", 2, 45)
  .add("Rune arrow", 2, 42)
  .add("Steel arrow", 2, 150)

  .add("Rune 2h sword", 3)
  .add("Rune battleaxe", 3)
  .add("Rune sq shield", 2)
  .add("Dragon med helm", 1)
  .add("Rune kiteshield", 1)

  .add("Coins", 21, 3000)
  .add("Loop half of key", 20)
  .add("Tooth half of key", 20)
  .add("Runite bar", 5)
  .add("Dragonstone", 2)
  .add("Silver ore", 2, 100)
  .add(gemDropTable, 20)
  .add(megaRareDropTable, 15);
