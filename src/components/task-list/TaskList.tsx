/* eslint-disable max-len */
import { useSelector, shallowEqual } from "react-redux";
import React from "react";
import { v1 as uuid } from "uuid";
import { RootState } from "../../app/store";

import "./TaskList.css";
import { NameState } from "../../builders/CharacterBuilder";
import { QueuedTask, TaskState } from "../../app/slices/task";

interface TaskData extends QueuedTask {
  characterName: string;
  classes: string;
}

export const TaskList = (): JSX.Element => {
  const tasks: TaskState = useSelector((state: RootState) => state.tasks, shallowEqual);
  const names: NameState = useSelector((state: RootState) => state.characters.names, shallowEqual);

  const MakeList = (): JSX.Element => {
    console.log("Task list re-render");
    // console.log(tasks);

    const characterData = Object.entries(tasks);
    // const taskListData: Array<JSX.Element> = [];
    const taskData: Array<JSX.Element> = [];

    characterData.forEach((character) => { // todo save actives in an array and display it first so all character active tasks are at the top
      const [id, data] = character;
      // console.log(data.activeTask);
      if (data.activeTask) {
        const { when, type, info: { name, amount = 0 } } = data.activeTask;
        taskData.push(
          <div className="task-list-item item-bubble task-list-active" key={uuid()}>{`${names[id]}: ${type} ${amount}x ${name} ${when}`}</div>,
        );
      }
      data.queue.forEach((item) => {
        // console.log(item);
        const { taskType, taskName, amount } = item;
        taskData.push(
          <div className="task-list-item item-bubble" key={uuid()}>{`${names[id]}: ${taskType} ${amount}x ${taskName}`}</div>,
        );
      });
      // data.queue.forEach((queueItem, index) => {
      //   let classes = "task-list-item";
      //   if (index === 0) {
      //     classes = "task-list-item task-list-active";
      //   }
      //   // const { when, type, info: { name, amount = 0 } } = queueItem;
      //   taskData.push({
      //     playerName: names[id], classes, ...queueItem,
      //   });
      //   // taskListData.push(<div className={classes} key={uuid()}>{`${names[id]}: ${type} ${amount}x ${name} ${when}`}</div>);
      // });
    });

    // const sortedTaskData = taskData.sort((a, b) => a.when - b.when).map((item) => {
    //   const {
    //     playerName, type, info: { name, amount = 0 }, when, classes,
    //   } = item;
    //   return <div className={classes} key={uuid()}>{`${playerName}: ${type} ${amount}x ${name} ${when}`}</div>;
    // });

    return (
      <div className="task-list-window panel-window">
        <div className="task-list-title panel-title">
          <div>Task Queue</div>
        </div>
        <div className="task-list-inner">
          {/* {sortedTaskData} */}
          {taskData}
        </div>
      </div>
    );
  };

  return (
    <MakeList />
  );
};
