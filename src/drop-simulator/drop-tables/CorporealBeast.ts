import { DropTable } from "../DropTable";
import { rareDropTable } from "./RareDropTable";

const uniques = new DropTable()
  .add("Spectral sigil", 3)
  .add("Arcane sigil", 3)
  .add("Elysian sigil");

export const dropTable = new DropTable()
  .oneInX(uniques, 585)
  .add("Mystic robe top", 18)
  .add("Mystic robe bottom", 18)
  .add("Mystic air staff", 12)
  .add("Mystic water staff", 12)
  .add("Mystic earth staff", 12)
  .add("Mystic fire staff", 12)

  .add("Soul rune", 32, 250)
  .add("Runite bolts", 24, 250)
  .add("Death rune", 22, 300)
  .add("Onyx bolts (e)", 20, 175)
  .add("Cannonball", 17, 2000)
  .add("Adamant arrow", 17, 750)
  .add("Law rune", 17, 500)
  .add("Cosmic rune", 17, 250)

  .add("Raw shark", 21, 70)
  .add("Pure essence", 21, 2500)
  .add("Adamantite bar", 18, 35)
  .add("Green dragonhide", 18, 100)
  .add("Adamantite ore", 17, 125)
  .add("Runite ore", 12, 20)
  .add("Teak plank", 12, 100)
  .add("Mahogany logs", 12, 150)
  .add("Magic logs", 12, 75)

  .add("Tuna potato", 20, 30)
  .add("White berries", 17, 120)
  .add("Desert goat horn", 17, 120)
  .add("Watermelon seed", 15, 24)
  .add("Coins", 12, [20000, 50000])
  .add("Antidote++(4)", 10, 40)
  .add("Spirit shield", 8)
  .add("Ranarr seed", 5, 10)
  .add("Holy elixir", 3)

  .add(rareDropTable, 12, 10)

  .tertiary("Clue scroll (elite)", 200)
  .tertiary("Pet dark core", 5000);
