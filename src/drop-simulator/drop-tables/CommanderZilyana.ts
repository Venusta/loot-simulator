import { DropTable } from "../DropTable";

const brewRest = new DropTable()
  .always("Saradomin brew(3)", 3)
  .always("Super restore(4)", 3);

const magicDef = new DropTable()
  .always("Super defence(3)", 3)
  .always("Magic potion(3)", 3);

const gsShard = new DropTable()
  .add("Godsword shard 1", 1)
  .add("Godsword shard 2", 1)
  .add("Godsword shard 3", 1);

const uniques = new DropTable()
  .add(gsShard, 2)
  .add("Saradomin sword", 4)
  .add("Saradomin's light", 2)
  .add("Armadyl crossbow")
  .add("Saradomin hilt")
  .add("Coins", 2, [19500, 20000]);

export const dropTable = new DropTable()
  .always("Bones")
  .add(uniques, 3)
  .add(brewRest, 6)
  .add(magicDef, 8)
  .add("Prayer potion(4)", 8)
  .add("Diamond", 8, 6)
  .add("Law rune", 8, [95, 100])
  .add("Grimy ranarr weed", 8, 5)
  .add("Ranarr seed", 8, 2)
  .add("Magic seed")
  .add("Coins", 27, [19500, 20000])
  .add("Adamant platebody", 8)
  .add("Rune dart", 8, [35, 40])
  .add("Rune kiteshield", 8)
  .add("Rune plateskirt", 8)
  .nothing(10) // remove after adding rdt
  // https://oldschool.runescape.wiki/w/God_Wars_Dungeon-variant_rare_drop_table
  // .add(God Wars Dungeon-variant Rare Drop Table, 8)
  // .add(God Wars Dungeon-variant Gem Drop Table, 2)

  .tertiary("Clue scroll (elite)", 250)
  .tertiary("Pet zilyana", 5000);
