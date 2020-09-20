import { SkillNames } from "../../model/Skills";
import { CookingTaskBuilder } from "../../builders/CookingTaskBuilder";

const tasks = [
  new CookingTaskBuilder({ name: "chicken" })
    .reqSkill(SkillNames.cooking, 1)
    .rewardExp(SkillNames.cooking, 30)
    // .rewardExp(SkillNames.farming, 15)
    // .rewardExp(SkillNames.attack, 30)
    // .rewardExp(SkillNames.construction, 30)
    // .rewardExp(SkillNames.crafting, 30)
    .reqItem("Raw chicken")
    .rewardItem("Cooked chicken")
    .failItem("Burnt chicken")
    .stopBurn(24)
    .finalise(),

  new CookingTaskBuilder({ name: "trout" })
    .reqSkill(SkillNames.cooking, 15)
    .rewardExp(SkillNames.cooking, 70)
    .reqItem("Raw trout")
    .rewardItem("Trout")
    .failItem("Burnt fish") // todo stupid same name bullshit
    .stopBurn(49)
    .finalise(),

  new CookingTaskBuilder({ name: "salmon" })
    .reqSkill(SkillNames.cooking, 25)
    .rewardExp(SkillNames.cooking, 90)
    .reqItem("Raw salmon")
    .rewardItem("Salmon")
    .failItem("Burnt fish") // todo stupid same name bullshit
    .stopBurn(58)
    .finalise(),

  new CookingTaskBuilder({ name: "lobster" })
    .reqSkill(SkillNames.cooking, 40)
    .rewardExp(SkillNames.cooking, 120)
    .reqItem("Raw lobster")
    .rewardItem("Lobster")
    .failItem("Burnt lobster")
    .stopBurn(74)
    .gauntlets(64)
    .finalise(),
];

export const cooking = {
  tasks,
  id: SkillNames.cooking,
};
