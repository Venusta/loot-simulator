import { itemSearchData } from "../model/Items";
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import {
  SkillName, EquipmentSlotName, TaskRequirements, TaskOptions, TaskFailMap, TaskRewardMap,
} from "../types/types";

interface TaskBuilderOptions {
  name: string;
}

export class TaskBuilder {
  name: string;
  requirements: TaskRequirements;
  rewards: TaskRewardMap;
  fails: TaskFailMap;
  icon: number;

  constructor(options: TaskBuilderOptions) {
    this.name = options.name;
    this.icon = 0;
    this.requirements = {
      skills: new Map([]),
      items: new Map([]),
      equipment: [],
    };
    this.rewards = {
      exp: new Map([]),
      items: new Map([]),
    };
    this.fails = {
      items: new Map([]),
    };
  }

  setIcon = (icon: number | string): this => {
    if (this.icon !== 0) return this;
    const id = itemSearchData.get(icon);
    this.icon = id;
    return this;
  };

  /**
   * Required skill level for a task
   * @param skill name of a skill e.g. "cooking"
   * @param level required level for the task
   */

  reqSkill = (skill: SkillName, level: number): this => {
    this.requirements.skills.set(skill, level);
    return this;
  };

  /**
   * Required equipment
   * @param slot item slot such e.g. "weapon"
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount required amount for one task, default 1
   */

  reqEquip = (slot: EquipmentSlotName, item: number | string, amount = 1): this => {
    const id = itemSearchData.get(item);
    this.requirements.equipment.push({ slot, item: id, amount });
    return this;
  };

  /**
   * Required item for task
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount required amount for one task, default 1
   */

  reqItem = (item: number | string, amount = 1): this => {
    const id = itemSearchData.get(item);
    this.requirements.items.set(id, amount);
    return this;
  };

  /**
   * Exp reward for completing a task
   * @param skill name of a skill e.g. "cooking"
   * @param amount how much exp to give
   */

  rewardExp = (skill: SkillName, amount: number): this => {
    this.rewards.exp.set(skill, amount);
    return this;
  };

  /**
   * Item you get if you complete the task
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount reward amount for one task, default 1
   */

  rewardItem = (item: number | string, amount = 1): this => {
    const id = itemSearchData.get(item);
    this.setIcon(item); // todo probably remove idfk
    this.rewards.items.set(id, amount); // todo maybe add if multiple of same item
    return this;
  };

  /**
   * Item you get if you fail a task such as burnt food
   * @param item id or name. 4151 or "Abyssal whip"
   * @param amount required amount for one task, default 1
   */

  failItem = (item: number | string, amount = 1): this => {
    const id = itemSearchData.get(item);
    // this.fails.items.push({ item: id, amount });
    this.fails.items.set(id, amount);
    return this;
  };

  /**
 * finalises and returns a task object
 * @param ticks how many ticks per task attempt (600ms per tick), default = 5
 */

  finalise = (ticks = 5): TaskOptions => {
    const duration = ticks * 600;

    const {
      name, requirements, rewards, fails, icon,
    } = this;

    return {
      name,
      requirements,
      rewards,
      duration,
      fails,
      icon,
    };
  };
}
