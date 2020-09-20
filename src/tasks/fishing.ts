/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

import { store } from "../app/store";
import {
  TaskInputOptions, SkillName, CharacterState,
} from "../types/types";
import { SkillNames } from "../model/Skills";
import { fishing, FishingTasks } from "./data/fishing";
import {
  expToLevel, randomRoll, calculateWeight, levelsGained,
} from "../util";
import {
  hasItems, hasSkills, getItemFromBank,
} from "../util/Requirements";
import { addMsg } from "../app/slices/log";
import { RewardStore } from "../builders/RewardStore";
import { TaskDerpThing } from "../app/slices/task";
import { selectCharacter } from "../app/selectors";

interface FishingTaskData {
  tasks: Array<FishingTasks>;
  id: SkillNames;
}

// const selectFishingTask = (taskData: FishingTaskData, taskName: string) => taskData.tasks.find((task) => task.names.find((name) => name === taskName));
const selectFishingTask = (taskData: FishingTaskData, taskName: string) => {
  return taskData.tasks.find((task) => {
    return task.fishingSpot.find((fish) => fish.name === taskName);
  });
};

const selectFish = (selectedTask: FishingTasks, taskName: string) => {
  return selectedTask.fishingSpot.find((fish) => fish.name === taskName);
};

export const fishingTask = ({ characterId, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = selectCharacter(store.getState(), characterId);

  const { name: characterName, skills, bank } = character;

  /**
   * * select the fishing spot
   */
  const selectedFishTask = selectFishingTask(fishing, taskName);

  /**
   * * check the fishing spot is valid
   */
  if (!selectedFishTask) {
    console.error(`Fishing task not found: ${taskName}`);
    return false;
  }
  const selectedFish = selectFish(selectedFishTask, taskName);

  const {
    tool, fishingSpot, maxWeight,
  } = selectedFishTask;

  /**
   * * check if the character has reqs for the chosen fish from the fishing spot
   */
  // @ts-ignore
  if (!hasSkills(skills, selectedFish.requirements.skills)) {
    console.log(`${characterName}'s fishing level is too low for ${taskName}`);
    // store.dispatch(addMsg({ characterId, msg: `${characterName}'s fishing level is too low for ${taskName}` }));
    return false;
  }

  /**
   * * check if the character has the right tool
   */

  // todo remove this and make hasItems work with a single id
  // temp fix
  const toolMap = new Map([[tool, 1]]);

  if (!hasItems(bank, toolMap)) { // todo maybe check "hasOneOf" for a range of tools
    console.log("Fishing tool doesn't exist");
    return false;
  }
  /**
   * * if fishing spot requires bait, check how much we have
   */
  let baitAmount = 0;
  if (selectedFishTask.bait) {
    baitAmount = getItemFromBank(bank, selectedFishTask.bait)?.amount ?? 0;
    if (baitAmount === 0) { // id to name for msg
      // store.dispatch(addMsg({ characterId, msg: `${characterName} doesn't have any ${selectedFishSpot.bait} for ${taskName}` }));
      return false;
    }
  }

  /**
   * * gets the skill level or returns 0 if it's undefined
   * @param map Map of skills
   * @param skill skillname to return the level for
   */
  const getSkillReqLevel = (map: Map<SkillName, number>, skill: SkillName): number => map.get(skill) || 0;

  /**
   * * Converts the fishingSpot Object to an Array and then sorts them from high to low based on the fishing level
   */
  const fishPool = [...fishingSpot]
    .sort(
      (a, b) => getSkillReqLevel(b.requirements.skills, "fishing")
        - getSkillReqLevel(a.requirements.skills, "fishing"),
    );

  /**
   * * Target amount of the chosen fish to catch
   */
  const fishToCatch = amount;
  /**
   * * How many of the target fish we caught, total fish can be higher than this
   */
  let fishCaught = 0;

  /**
   * * no more than 6000 ticks (one hour)
   */
  const tickLimit = 6000;
  let tick = 0;

  /**
   * Get initial fishing level
   */
  let fishingLvl = skills.fishing.level;

  const rewardStore = new RewardStore();

  /**
   * * rolls a random number 0 - maxWeight-1 and checks if it's less than the calculated fish weight
   * * does this for all fish, +5 ticks for every attempt
   */
  console.time("Fishing Task Simulation");
  while (fishCaught < fishToCatch && tick < tickLimit) {
    if (selectedFishTask.bait && baitAmount === 0) {
      console.error("Ran out of bait");
      break;
    }

    for (let index = 0; index < fishPool.length; index += 1) {
      const fish = fishPool[index];

      if (hasSkills(skills, fish.requirements.skills, rewardStore.getExp())) {
        const weight = calculateWeight(fishingLvl, fish.weight1, fish.weight99);
        if (randomRoll(maxWeight) < weight) {
          // Add xp and fish to the reward store
          rewardStore.addReward(fish.rewards);

          // Recalculate fishing level for a potential level-up after a successful catch
          fishingLvl = expToLevel(skills.fishing.exp + rewardStore.get("fishing"), fishingLvl);

          if (fish.name === taskName) {
            fishCaught += 1;
          }
          if (selectedFishTask.bait) {
            baitAmount -= 1; // I think only 1 bait needed
          }
          // Break the for loop early when a fish is caught
          break;
        }
      }
    }
    // Increment tick counter by 5 for each catch attempt
    tick += 5;
  }
  console.timeEnd("Fishing Task Simulation");

  // todo remove bait

  const type = "fishing";
  const info = {
    name: taskName,
    amount,
  };

  store.dispatch(addMsg(
    {
      action: "task-complete",
      payload: {
        type,
        info,
        characterId,
        characterName,
        reward: rewardStore.toObject(),
        gained: levelsGained(skills, rewardStore.getExpObject()),
      },
    },
  ));

  const duration = (tick * 600) * 0.001;
  console.log(`Task should take ${(duration) / 1000} seconds`);

  const taskObj = {
    characterId,
    duration,
    type,
    info,
    reward: rewardStore.toObject(),
  };

  return taskObj;
};
