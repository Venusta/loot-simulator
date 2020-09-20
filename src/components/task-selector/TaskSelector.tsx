/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */
import React, { useState } from "react";
import "./TaskSelector.css";
import { useDispatch } from "react-redux";
import { v1 as uuid } from "uuid";
import { getIcon } from "../../model/Icon";
import { QueuedTask, newTask } from "../../app/slices/task";
import { skillData } from "../../tasks/data";
import { itemSearchData } from "../../model/Items";

interface TaskMenuItemProps {
  name: string;
  icon: number;
  task?: QueuedTask;
  level?: number;
}

interface TaskMenuProps {
  title: string;
  children?: React.ReactElement<TaskMenuProps>[] | React.ReactElement<TaskMenuProps>;
}

const TaskMenuItemForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    console.log(e.target.amount.value);

    console.log("yeet2");
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input className="form" name="amount" type="text" />
    </form>
  );
};

const TaskMenuItem = ({
  name, icon, task, level,
}: TaskMenuItemProps) => {
  const dispatch = useDispatch();
  // todo don't actually dispatch the task, just select it.
  // todo amount box at top auto fills with max.
  // todo search box
  // todo way to confirm dispatch, a button?
  const ahhh = task || {
    characterId: "3", taskName: "leaping trout", taskType: "fishing", amount: 20,
  };

  return (
    <div className="task-menu-item">
      <div className="align-center" onClick={() => dispatch(newTask(ahhh))}>
        {level ? <span className="task-menu-item-level">{level}</span> : null}
        <img
          className="itemImage2"
          width="18"
          height="16"
          src={`data:image/png;base64, ${getIcon(icon)}`}
        />
        <span className="task-menu-item-name">{name}</span>
      </div>
      <TaskMenuItemForm />
    </div>
  );
};

const TaskMenu = ({ title, children }: TaskMenuProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const taskMenuItemClassName = collapsed
    ? "task-menu-children collapsed"
    : "task-menu-children";

  return (
    <div>
      <div className="task-menu-name" onClick={() => setCollapsed(!collapsed)}>
        {title}
      </div>
      <div className={taskMenuItemClassName}>
        {children}
      </div>
    </div>
  );
};

const FishingMenu = () => {
  const characterId = "3"; // todo get from route page thing
  const taskType = skillData.fishing.id;
  const amount = 30; // form state thingy

  const idk: {[tool: number]: JSX.Element[]} = {};
  skillData.fishing.tasks.forEach((fishingTask) => {
    const { tool, fishingSpot } = fishingTask;
    // console.log(fishingSpot);

    fishingSpot.forEach((fish, index) => {
      if (!idk[tool]) {
        idk[tool] = [
          <TaskMenuItem
            key={uuid()}
            icon={fishingSpot[index].icon} // todo fix not hardcode
            level={fishingSpot[index].requirements.skills.get("fishing")} // todo fix not hardcode
            name={fish.name}
            task={{
              characterId, taskName: fish.name, taskType, amount,
            }}
          />,
        ];
      } else {
        idk[tool].push(<TaskMenuItem
          key={uuid()}
          icon={fishingSpot[index].icon} // todo fix not hardcode
          level={fishingSpot[index].requirements.skills.get("fishing")} // todo fix not hardcode
          name={fish.name}
          task={{
            characterId, taskName: fish.name, taskType, amount,
          }}
        />);
      }
    });
  });

  const idk2: JSX.Element[] = [];
  Object.entries(idk).forEach(([tool, fishComponents]) => {
    idk2.push(
      <TaskMenu
        key={uuid()}
        title={itemSearchData.getName(parseInt(tool, 10))}
      >
        {fishComponents}
      </TaskMenu>,
    );
  });

  return (
    <TaskMenu title="Fishing">
      {idk2}
    </TaskMenu>
  );
};

export const TaskSelector = (): JSX.Element => {
  // todo auto-populate from task data

  return (
    <div className="task-selector panel-window">
      {/* <div className="title-container panel-title">
        <div className="task-selector-title">Task Selector</div>
        <input type="checkbox" className="checkbox-ahh" />
      </div> */}
      <form action="" className="task-selector-search-box">
        <input type="text" className="search-box-form" placeholder="Search..." />
      </form>
      <div className="task-selector-inner">
        <FishingMenu />
        <TaskMenu title="Agility">
          <TaskMenuItem icon={2138} name="Gnome" />
          <TaskMenuItem icon={2138} name="1" />
          <TaskMenuItem icon={2138} name="2" />
        </TaskMenu>
        <TaskMenu title="Cooking">
          <TaskMenuItem
            icon={2138}
            name="Chicken"
            task={{
              characterId: "3", taskName: "chicken", taskType: "cooking", amount: 20,
            }}
          />
          <TaskMenuItem
            icon={335}
            name="Trout"
            task={{
              characterId: "3", taskName: "trout", taskType: "cooking", amount: 50,
            }}
          />
          <TaskMenuItem
            icon={331}
            name="Salmon"
            task={{
              characterId: "3", taskName: "salmon", taskType: "cooking", amount: 20,
            }}
          />
          <TaskMenuItem
            icon={377}
            name="Lobster"
            task={{
              characterId: "3", taskName: "lobster", taskType: "cooking", amount: 100,
            }}
          />
          <TaskMenuItem icon={2138} name="4" />
          <TaskMenu title="Cooking Submenu">
            <TaskMenuItem icon={2138} name="Chicken" />
            <TaskMenuItem icon={2138} name="3" />
            <TaskMenuItem icon={2138} name="4" />
          </TaskMenu>
          <TaskMenu title="Cooking Submenu2">
            <TaskMenuItem icon={2138} name="Chicken" />
            <TaskMenuItem icon={2138} name="3" />
            <TaskMenuItem icon={2138} name="4" />
          </TaskMenu>
        </TaskMenu>
      </div>
    </div>
  );
};
