import { FishingTask } from "../types/types";
import { TaskBuilder } from "./TaskBuilder";

interface TaskBuilderOptions {
  name: string;
}

export class FishingTaskBuilder extends TaskBuilder {
  private weight1: number;
  private weight99: number;

  constructor(options: TaskBuilderOptions) {
    super(options);
    this.weight1 = 0;
    this.weight99 = 20;
  }

  /**
   * weighting for the fishies
   * @param weight1 level 1 weight
   * @param weight99 level 99 weight
   */

  weight = (weight1: number, weight99: number): this => {
    this.weight1 = weight1;
    this.weight99 = weight99;
    return this;
  };

  /**
 * finalises and returns a task object
 * @param ticks how many ticks to fish 1 item (600ms per tick), default = 5
 */

  finalise = (ticks = 5): FishingTask => {
    const duration = ticks;

    const {
      name, requirements, rewards, fails, weight1, weight99, icon,
    } = this;

    return {
      name,
      requirements,
      rewards,
      duration,
      fails,
      weight1,
      weight99,
      icon,
    };
  };
}
