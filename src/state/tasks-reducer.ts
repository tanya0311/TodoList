import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskStatuses, TaskType, todolistAPI } from "../api/todolist-api";
import { Task1Type } from "../AppWithRedux";
// import { TasksPopsType } from "../Todolist";
import {
  AddTLACType,
  ADD_TODOLIST,
  RemoveTLACType,
  REMOVE_TODOLIST,
  SetTodolistsActionType,
} from "./todolists-reducer";

// export type TasksType = {
//   id: string;
//   title: string;
//   isDone: boolean;
// };

// export type StateType = Task1Type;
export type ActionType =
  | RemoveTasksACType
  | AddTasksACType
  | ChangeStatusTasksACType
  | ChangeStatusitleACType
  | AddTLACType
  | RemoveTLACType
  | SetTodolistsActionType
  | SetTasksActionType;

export type RemoveTasksACType = ReturnType<typeof removeTaskAC>;
export type AddTasksACType = ReturnType<typeof addTaskAC>;
export type ChangeStatusTasksACType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeStatusitleACType = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksActionType = ReturnType<typeof setTasksAC>;

const REMOVE_TASKS = "REMOVE-TASKS";
const ADD_TASKS = "ADD-TASKS";
const CHANGE_TASKS = "CHANGE-TASKS-STATUS";
const CHANGE_TTITLE_ASKS = "CHANGE-TASKS-TITLE";
const SET_TASKS = "SET-TASKS";

const initialState: Task1Type = {};

export const tasksReducer = (
  stateTasks: Task1Type = initialState,
  action: ActionType
): Task1Type => {
  switch (action.type) {
    case SET_TASKS: {
      const stateCopy = { ...stateTasks };
      stateCopy[action.todolistId] = action.tasks;
      return stateCopy;
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...stateTasks };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }

    case REMOVE_TASKS: {
      let copyStateTasks = { ...stateTasks };
      copyStateTasks[action.todolistId] = copyStateTasks[
        action.todolistId
      ].filter((t) => t.id !== action.taskId);
      return copyStateTasks;
    }
    // case ADD_TASKS: {
    //   const stateCopy = {...stateTasks}
    //   const newTask: TasksType = {
    //       id: v1(),
    //       title: action.title,
    //       isDone: false
    //   }
    //   const tasks = stateCopy[action.todolistId];
    //   const newTasks = [newTask, ...tasks];
    //   stateCopy[action.todolistId] = newTasks;
    //   return stateCopy;
      // const stateCopy = { ...stateTasks };
      // const tasks = stateCopy[action.task.todoListId];
      // const newTasks = [action.task, ...tasks];
      // stateCopy[action.task.todoListId] = newTasks;
      // return stateCopy;
    // }
    case CHANGE_TASKS: {
      let copyStateTasks = { ...stateTasks };
      let updateTask = copyStateTasks[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.status } : t
      );
      return { ...stateTasks, [action.todolistId]: updateTask };
    }
    case CHANGE_TTITLE_ASKS: {
      let copyStateTasks = { ...stateTasks };
      let updateTask = copyStateTasks[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );
      return { ...stateTasks, [action.todolistId]: updateTask };
    }
    case ADD_TODOLIST: {
      return { ...stateTasks, [action.todolistId]: [] };
    }
    case REMOVE_TODOLIST: {
      let copyStateTasks = { ...stateTasks };
      delete copyStateTasks[action.todolistId];
      return copyStateTasks;
    }
    default:
      return stateTasks;
  }
};

export const removeTaskAC = (taskId: string, todolistId: string) => {
  return {
    type: "REMOVE-TASKS" as const,
    taskId,
    todolistId,
  };
};
export const addTaskAC = (title: string, todolistId: string) => {
  return {
    type: "ADD-TASKS" as const,
    title,
    todolistId,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASKS-STATUS" as const,
    taskId,
    status,
    todolistId,
  };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
) => {
  return {
    type: "CHANGE-TASKS-TITLE" as const,
    taskId,
    title,
    todolistId,
  };
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
  return { type: "SET-TASKS" as const, tasks, todolistId };
};

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
      const tasks = res.data.items;
      dispatch(setTasksAC(tasks, todolistId));
    });
  };
};
