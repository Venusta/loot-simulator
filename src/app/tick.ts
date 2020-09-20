import { batch } from "react-redux";
import { combatTask } from "../tasks/combat";
import { cookingTask } from "../tasks/cooking";
import { fishingTask } from "../tasks/fishing";
import { selectTasks } from "./selectors";
import { addReward } from "./slices/character";
import { processQueue, handleActiveTask } from "./slices/task";
import { store } from "./store";

export const tick = (): void => {
  const time = new Date();
  console.log("Ticked");
  const { dispatch, getState } = store;
  const tasks = selectTasks(getState());

  const characterIds = Object.keys(tasks);

  characterIds.forEach((characterId) => {
    const { queue, active } = tasks[characterId];

    if (queue.length > 0 && active === false) {
      const task = queue[0];
      const { taskType } = task;
      console.log(taskType);

      switch (taskType) {
        case "cooking": {
          dispatch(processQueue({ characterId, task: cookingTask(task) }));
          break;
        }
        case "fishing": {
          dispatch(processQueue({ characterId, task: fishingTask(task) }));
          break;
        }
        case "combat": {
          dispatch(processQueue({ characterId, task: combatTask(task) }));
          break;
        }
        default:
          console.log(`No tasktype found: ${taskType}`);
      }
      console.log("This should only happen once per task");
    }

    const task = tasks[characterId].activeTask;
    if (active && task) {
      const { when } = task;

      if (time.valueOf() > when) {
        console.log("TASK COMPLETE!!!!!!!!");
        batch(() => {
          dispatch(handleActiveTask(task));
          dispatch(addReward(task));
        });
      }
    }
  });

  const timer = setTimeout(() => {
    tick();
  }, 1000);
};
