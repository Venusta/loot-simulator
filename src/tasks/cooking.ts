/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
import { addReward } from "../app/slices/character";
import { store } from "../app/store";
import { addMsg } from "../app/slices/log";
import { cooking } from "./data/cooking";
import { hasReqs } from "../util/Requirements";
import {
  TaskInputOptions, TaskOptions, CharacterState,
} from "../types/types";
import { expToLevel, getRandomInt, levelsGained } from "../util";
import { TaskDerpThing } from "../app/slices/task";
import { RewardStore } from "../builders/RewardStore";
import { selectCharacter } from "../app/selectors";
import { SkillNames } from "../model/Skills";

export interface CookingTask extends TaskOptions {
  stopBurnLevel: number;
  stopBurnGauntlets: number;
}

interface CookingTaskData {
  tasks: Array<CookingTask>;
  id: SkillNames;
}

const findTask = (taskData: CookingTaskData, taskName: string) => {
  return taskData.tasks.find((task) => task.name === taskName);
};

export const cookingTask = ({ characterId, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = selectCharacter(store.getState(), characterId);
  const { name: characterName, skills } = character;
  const selectedTask = findTask(cooking, taskName);

  const startingLevel = expToLevel(skills.cooking.exp);
  let cookingExp = skills.cooking.exp;

  if (!selectedTask) {
    console.error(`Cooking task not found: ${taskName}`);
    return false;
  }

  const {
    requirements, duration, rewards, stopBurnLevel,
  } = selectedTask;

  if (!hasReqs(character, requirements, amount)) { // todo get req msg
    console.log(requirements);

    console.log(`${characterName} sucks and misses reqs for ${taskName}`);

    store.dispatch(addMsg(
      {
        action: "msg",
        payload: `<orange#${characterName}> sucks and misses reqs for ${taskName}`,
      },
    ));

    // store.dispatch(addMsg({ characterId, msg: `${characterName} sucks and misses reqs for ${taskName}` }));

    return false;
  }

  const deleteItems = new RewardStore()
    .removeItem(requirements.items, amount);
  store.dispatch(addReward({ characterId, reward: deleteItems.toObject() }));
  // todo remove the req items from bank and put it on the
  // todo task object so it can be returned if the task is cancelled

  // const findRewardSkill = (skillName: SkillName) => rewards.exp.find(({ skill }) => skill === skillName);
  const cookingXp = rewards.exp.get(SkillNames.cooking);
  if (!cookingXp) {
    console.error(`skillName not found: ${SkillNames.cooking}`);
    return false;
  }

  let cooked = 0;
  let burned = 0;
  for (let index = 0; index < amount; index += 1) {
    if (expToLevel(cookingExp) >= stopBurnLevel) {
      cooked += amount - index;
      cookingExp += cooked * cookingXp;
      break;
    }
    const rng = getRandomInt(1, 100);
    if (rng > stopBurnLevel - expToLevel(cookingExp)) {
      // console.log(`Level: ${expToLevel(cookingExp)}`);
      cookingExp += cookingXp;
      cooked += 1;
      // console.log(`${burned}x Burned food! ${rng} < ${stopBurnLevel - cooking.level}`);
    } else {
      burned += 1;
    }
  }
  console.log(`${burned + cooked === amount} ${burned}x burned ${cooked}x cooked food! level: ${expToLevel(cookingExp)}`);

  const rewardStore = new RewardStore()
    .addReward(selectedTask.rewards, cooked)
    .addItem(selectedTask.fails.items, amount - cooked);

  const totalDuration = amount * duration * 0.001; // TODO should be 1

  // todo return this in the task object
  let taskFinishMsg = `[Test] <orange#${characterName}> finished cooking <green#${amount} ${taskName}s>`;
  taskFinishMsg += ` and gained <cyan#${cookingXp * cooked}> cooking xp.`;
  if (expToLevel(cookingExp) > startingLevel) { // todo make this universal maybe
    taskFinishMsg += ` Their cooking level is now <cyan#${expToLevel(cookingExp)}>.`;
  }
  taskFinishMsg += ".";
  // todo build the final string for the task complete, calc the level up and xp gain internally so we can display it from one place
  console.log(taskFinishMsg);
  // store.dispatch(addMsg({ characterId, msg: taskFinishMsg }));

  // eslint-disable-next-line no-shadow

  // const msg = new LogMsgBuilder()
  //   .finished(characterName, "cooking", amount, taskName)
  //   .gainingExp(rewardStore.getExp())
  //   .andLevels(levelsGained(skills, rewardStore.getExpObject()))
  //   .returnMsg();
  // console.log(msg);

  const type = "cooking";
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

  const taskObj = {
    characterId,
    duration: totalDuration,
    type,
    info,
    reward: rewardStore.toObject(),
    gained: levelsGained(skills, rewardStore.getExpObject()),
  };

  return taskObj;
};
