import { v1 } from "uuid";
import { Task1Type } from "../App";
import { TasksPopsType } from "../Todolist";
import {
  AddTLACType,
  ADD_TODOLIST,
  RemoveTLACType,
  REMOVE_TODOLIST,
} from "./todolists-reducer";

export type StateType = Task1Type;
export type ActionType =
  | RemoveTasksACType
  | AddTasksACType
  | ChangeStatusTasksACType
  | ChangeStatusitleACType
  | AddTLACType
  | RemoveTLACType;

type RemoveTasksACType = {
  type: "REMOVE-TASKS";
  taskId: string;
  todolistId: string;
};
type AddTasksACType = {
  type: "ADD-TASKS";
  title: string;
  todolistId: string;
};
type ChangeStatusTasksACType = {
  type: "CHANGE-TASKS-STATUS";
  taskId: string;
  isDone: boolean;
  todolistId: string;
};
type ChangeStatusitleACType = {
  type: "CHANGE-TASKS-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

const REMOVE_TASKS = "REMOVE-TASKS";
const ADD_TASKS = "ADD-TASKS";
const CHANGE_TASKS = "CHANGE-TASKS-STATUS";
const CHANGE_TTITLE_ASKS = "CHANGE-TASKS-TITLE";

export const tasksReducer = (
  stateTasks: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case REMOVE_TASKS: {
      let copyStateTasks = { ...stateTasks };
      copyStateTasks[action.todolistId] = copyStateTasks[
        action.todolistId
      ].filter((t) => t.id !== action.taskId);
      return copyStateTasks;
    }
    case ADD_TASKS: {
      // let copyStateTasks = { ...stateTasks };
      // let tasks = copyStateTasks[action.todolistId];
      // let newTasks = [{ id: v1(), title: action.title, isDone: false }, ...tasks];
      // copyStateTasks[action.todolistId] = newTasks;
      // return copyStateTasks ;
      let newtask: TasksPopsType = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      return {
        ...stateTasks,
        [action.todolistId]: [newtask, ...stateTasks[action.todolistId]],
      };
    }
    case CHANGE_TASKS: {
      let copyStateTasks = { ...stateTasks };
      //  let tasks = copyStateTasks[action.todolistId];
      //  let task = tasks.find((tl) => tl.id === action.taskId)
      //  if (task) {
      //   task.isDone = action.isDone;
      //   return {...copyStateTasks}
      // } else {
      //   return {...copyStateTasks}
      // };
      let updateTask = copyStateTasks[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
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
      return { ...stateTasks, [action.id]: [] };
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

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTasksACType => {
  return {
    type: "REMOVE-TASKS" as const,
    taskId,
    todolistId,
  };
};
export const addTaskAC = (
  title: string,
  todolistId: string
): AddTasksACType => {
  return {
    type: "ADD-TASKS" as const,
    title,
    todolistId,
  };
};

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todolistId: string
): ChangeStatusTasksACType => {
  return {
    type: "CHANGE-TASKS-STATUS" as const,
    taskId,
    isDone,
    todolistId,
  };
};
export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todolistId: string
): ChangeStatusitleACType => {
  return {
    type: "CHANGE-TASKS-TITLE" as const,
    taskId,
    title,
    todolistId,
  };
};
