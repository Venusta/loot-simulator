import { DropTable } from "../DropTable";
import { megaRareDropTable } from "./MegaRareDropTable";

export const gemDropTable = new DropTable()
  .nothing(63) // Never when weraing ring of wealth but fuck that shit for now
  .add("Uncut sapphire", 32)
  .add("Uncut emerald", 16)
  .add("Uncut ruby", 8)
  .add("Chaos talisman", 3)
  .add("Nature talisman", 3)
  .add("Uncut diamond", 2)
  .add("Rune javelin", 2)
  .add("Loop half of key", 2)
  .add("Tooth half of key", 2)
  .add(megaRareDropTable, 1);
