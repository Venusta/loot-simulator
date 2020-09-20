import { TaskState } from "../slices/task";
import { RootState } from "../store";

/**
 * Selects all tasks
 * @param state RootState
 */
export const selectTasks = (state: RootState): TaskState => state.tasks;
