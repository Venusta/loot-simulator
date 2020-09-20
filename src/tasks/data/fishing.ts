import { itemSearchData } from "../../model/Items";
import { SkillNames } from "../../model/Skills";
import { FishingTask } from "../../types/types";
import { FishingTaskBuilder } from "../../builders/FishingTaskBuilder";

export interface FishingTasks {
  tool: number;
  maxWeight: number;
  bait?: number;
  fishingSpot: FishingTask[];
}

// todo maybe get rid of chaining and use a method for each specific thing
// todo builder for this, ensure highest level fish is first, idk
const tasks: FishingTasks[] = [
  {
    tool: itemSearchData.getId("Small fishing net"),
    bait: itemSearchData.getId("Feather"),
    maxWeight: 255,
    fishingSpot: [
      new FishingTaskBuilder({ name: "Shrimp" })
        .reqSkill(SkillNames.fishing, 1)
        .rewardExp(SkillNames.fishing, 10)
        .rewardItem("Raw shrimps")
        .weight(32, 192)
        .finalise(),

      new FishingTaskBuilder({ name: "Anchovies" })
        .reqSkill(SkillNames.fishing, 15)
        .rewardExp(SkillNames.fishing, 40)
        .rewardItem("Raw anchovies")
        .weight(16, 96)
        .finalise(),

      new FishingTaskBuilder({ name: "Trout" })
        .reqSkill(SkillNames.fishing, 25)
        .rewardExp(SkillNames.fishing, 90)
        .rewardItem("Raw trout")
        .weight(8, 64)
        .finalise(),
    ],
  },
  {
    tool: itemSearchData.getId("Harpoon"),
    maxWeight: 255,
    fishingSpot: [
      new FishingTaskBuilder({ name: "Tuna" })
        .reqSkill(SkillNames.fishing, 35)
        .rewardExp(SkillNames.fishing, 80)
        .rewardItem("Raw tuna")
        .weight(32, 192)
        .finalise(),

      new FishingTaskBuilder({ name: "Swordfish" })
        .reqSkill(SkillNames.fishing, 50)
        .rewardExp(SkillNames.fishing, 100)
        .rewardItem("Raw swordfish")
        .weight(16, 96)
        .finalise(),
    ],
  },
  {
    tool: itemSearchData.getId("Harpoon"),
    maxWeight: 255,
    fishingSpot: [
      new FishingTaskBuilder({ name: "Shark" })
        .reqSkill(SkillNames.fishing, 76)
        .rewardExp(SkillNames.fishing, 110)
        .rewardItem("Raw shark")
        .weight(12, 52)
        .finalise(),
    ],
  },
  {
    tool: itemSearchData.getId("Barbarian rod"),
    // bait: itemSearchData.getId("Feather"),
    maxWeight: 255,
    fishingSpot: [
      new FishingTaskBuilder({ name: "Leaping trout" })
        .reqSkill(SkillNames.fishing, 48)
        .reqSkill(SkillNames.agility, 15)
        .reqSkill(SkillNames.strength, 15)
        .rewardExp(SkillNames.fishing, 50)
        .rewardExp(SkillNames.agility, 5)
        .rewardExp(SkillNames.strength, 5)
        .rewardItem("Leaping trout")
        .weight(32, 192)
        .finalise(),

      new FishingTaskBuilder({ name: "Leaping salmon" })
        .reqSkill(SkillNames.fishing, 58)
        .rewardExp(SkillNames.fishing, 70)
        .rewardExp(SkillNames.agility, 6)
        .rewardExp(SkillNames.strength, 6)
        .rewardItem("Leaping salmon")
        .weight(16, 96)
        .finalise(),

      new FishingTaskBuilder({ name: "Leaping sturgeon" })
        .reqSkill(SkillNames.fishing, 70)
        .rewardExp(SkillNames.fishing, 80)
        .rewardExp(SkillNames.agility, 7)
        .rewardExp(SkillNames.strength, 7)
        .rewardItem("Leaping sturgeon")
        .weight(8, 64)
        .finalise(),
    ],
  },
  {
    tool: itemSearchData.getId("Lobster pot"),
    maxWeight: 255,
    fishingSpot: [
      new FishingTaskBuilder({ name: "Lobster" })
        .reqSkill(SkillNames.fishing, 40)
        .rewardExp(SkillNames.fishing, 90)
        .rewardItem("Raw lobster")
        .weight(32, 192)
        .finalise(),
    ],
  },
];

export const fishing = {
  tasks,
  id: SkillNames.fishing,
};
