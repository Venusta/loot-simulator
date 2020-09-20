/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable object-curly-newline */
import { createSlice } from "@reduxjs/toolkit";
import { TaskReward } from "../../types/types";

export type QueuedTask = {
  characterId: string;
  taskType: string;
  taskName: string;
  amount: number;
};

export interface TaskInfo {
  name: string;
  amount: number;
}

type ProcessQueueTaskPayload = {
  payload: {
    characterId: string;
    task: TaskDerpThing | false;
  };
};

type NewTaskPayload = {
  payload: QueuedTask;
};

export interface TaskDerpThing { // todo and this
  characterId: string;
  duration: number;
  type: string;
  info: TaskInfo;
  reward: TaskReward;
}
export interface TaskPayloadData extends TaskDerpThing {
  when: number;
}

export type TaskState = {
  [characterID: string]: {
    queue: Array<QueuedTask>;
    active: boolean;
    activeTask: TaskPayloadData | false;
  };
};

const taskInitialState: TaskState = { // todo auto generate based on character ids / save
  3: {
    queue: [],
    active: false,
    activeTask: false,
  },
  9: {
    queue: [],
    active: false,
    activeTask: false,
  },
};

export const taskSlice = createSlice({
  name: "tasks",
  initialState: taskInitialState,
  reducers: {
    newTask: (state, { payload: { characterId, taskType, taskName, amount } }: NewTaskPayload): void => {
      const { queue } = state[characterId];
      queue.push({ characterId, taskType, taskName, amount });
    },

    processQueue: (state, { payload: { characterId, task } }: ProcessQueueTaskPayload): void => {
      const { queue, active } = state[characterId];

      if (task === false) {
        console.log("Task doesn't exist or reqs not met");
        state[characterId].activeTask = false;
        queue.shift();
        return;
      }

      if (active === true) {
        console.error("This really shouldn't happen ever, what the fuck did you do?!");
        state[characterId].activeTask = false;
        queue.shift();
        return;
      }

      const { duration } = task;
      const now = Date.now();
      const when = now + duration;

      console.log(`Setting character ${characterId}'s queue to active`);
      state[characterId].active = true;
      state[characterId].activeTask = {
        when,
        ...task,
      };
      queue.shift();
    },

    handleActiveTask: (state, { payload: { characterId, type } }: { payload: TaskPayloadData }): void => {
      console.log(`${type} task finished.`);
      state[characterId].active = false;
      const { queue } = state[characterId];
      if (queue.length === 0) state[characterId].activeTask = false; // may cause issues
    },
  },
});

export const {
  handleActiveTask,
  newTask,
  processQueue,
} = taskSlice.actions;
