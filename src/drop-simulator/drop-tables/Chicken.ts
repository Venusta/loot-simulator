import { DropTable } from "../DropTable";

export const dropTable = new DropTable()
  .always("Bones")
  .always("Raw chicken")

  .add("Feather", 2, 5)
  .add("Feather", 1, 15)
  .nothing(1)

  .tertiary("Clue scroll (beginner)", 300);
