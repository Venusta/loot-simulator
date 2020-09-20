/* eslint-disable max-len */

import {
  TaskInputOptions, CharacterState, AttackStyle,
} from "../types/types";
import { TaskDerpThing } from "../app/slices/task";
import { selectCharacter } from "../app/selectors";
import { corporealBeast } from "../monsters/CorporealBeast";
import { CombatSimulator } from "../model/CombatSimulator";
import { store } from "../app/store";
import { levelsGained } from "../util";
import { addMsg } from "../app/slices/log";

const selectMonster = corporealBeast;

export const combatTask = ({ characterId, taskName, amount }: TaskInputOptions): TaskDerpThing | false => {
  const character: CharacterState = selectCharacter(store.getState(), characterId);
  const { name: characterName, skills, bank } = character;

  const simulator = new CombatSimulator(selectMonster, characterId, AttackStyle.accurate, new Map<number, number>());
  const { killcount, rewards, ticks } = simulator.simulate({ kills: amount });

  const type = "combat";
  const info = {
    name: taskName,
    amount: killcount,
  };
  const duration = (ticks * 600) * 0.001;
  console.log(`Task should take ${(duration) / 1000} seconds`);

  store.dispatch(addMsg(
    {
      action: "task-complete",
      payload: {
        type,
        info,
        characterId,
        characterName,
        reward: rewards,
        gained: levelsGained(skills, rewards.exp),
      },
    },
  ));

  const taskObj = {
    characterId,
    duration,
    type,
    info,
    reward: rewards,
  };

  return taskObj;
};
