import { Dispatch } from "redux";
import { v1 } from "uuid";
import { TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from "../api/todolist-api";
import { Task1Type } from "../AppWithRedux";
import { AppRootStateType } from "./store";
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
const CHANGE_TITLE_TASKS = "CHANGE-TASKS-TITLE";
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
      // return {...stateTasks, [action.todolistId]:action.tasks};
    }
    case "SET-TODOLISTS": {
      const stateCopy = { ...stateTasks };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });
      return stateCopy;
    }

    case REMOVE_TASKS: {
      // const stateCopy = { ...stateTasks };
      // const tasks = stateCopy[action.todolistId];
      // const newTasks = tasks.filter((t) => t.id !== action.taskId);
      // stateCopy[action.todolistId] = newTasks;
      // return stateCopy;
      let copyStateTasks = { ...stateTasks };
      copyStateTasks[action.todolistId] = copyStateTasks[
        action.todolistId
      ].filter((t) => t.id !== action.taskId);
      return copyStateTasks;
    }
    case ADD_TASKS: {
      const stateCopy = { ...stateTasks };
      //   const newTask: TasksType = {
      //     id: v1(),
      //     title: action.title,
      //     status: TaskStatuses.New,
      //     todoListId: action.todolistId, description: '',
      //     startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
      // }
      //   const tasks = stateCopy[action.todolistId];
      //   const newTasks = [newTask, ...tasks];
      //   stateCopy[action.todolistId] = newTasks;
      //   return stateCopy;
      // const stateCopy = { ...stateTasks };
      const tasks = stateCopy[action.task.todoListId];
      const newTasks = [action.task, ...tasks];
      stateCopy[action.task.todoListId] = newTasks;
      return stateCopy;
    }
    case CHANGE_TASKS: {
      let copyStateTasks = { ...stateTasks };
      let updateTask = copyStateTasks[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, status: action.status } : t
      );
      return { ...stateTasks, [action.todolistId]: updateTask };
    }
    case CHANGE_TITLE_TASKS: {
      let copyStateTasks = { ...stateTasks };
      let updateTask = copyStateTasks[action.todolistId].map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );
      return { ...stateTasks, [action.todolistId]: updateTask };
    }
    case ADD_TODOLIST: {
      return { ...stateTasks, [action.todolist.id]: [] };
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
export const addTaskAC = (task: TaskType) => {
  return {
    type: "ADD-TASKS" as const,
    task,
    // title,
    // todolistId,
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
  return { type: "SET-TASKS", tasks, todolistId } as const;
};

//!    !!!!!!!!!!!!!!!!!!!
// thunks
export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTasks(todolistId).then((res) => {
      // debugger
      const tasks = res.data.items;
      dispatch(setTasksAC(tasks, todolistId));
    });
  };
};
export const deleteTasksTC = (taskId: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      dispatch(removeTaskAC(taskId, todolistId));
    });
  };
};
export const addTasksTC = (title: string, todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTasks(todolistId, title).then((res) => {
      let task = res.data.data.item;
      dispatch(addTaskAC(task));
    });
  };
};
export const changeTaskStatusTC = (
  taskId: string,
  status: TaskStatuses,
  todolistId: string
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let state = getState();
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const updateTask = tasksForCurrentTodolist.find((t) => {
      return t.id === taskId;
    });
    if (updateTask) {
      // const model: UpdateTaskModelType = { ...updateTask, status };
      const model: UpdateTaskModelType = {
            title: updateTask.title,
            startDate: updateTask.startDate,
            priority: updateTask.priority,
            description: updateTask.description,
            deadline: updateTask.deadline,
            status: status,
          };
      todolistAPI.updateTask(todolistId, taskId, model).then((res) => {
        const newTask = res.data.data.item;
        dispatch(changeTaskStatusAC(newTask.id, newTask.status, newTask.todoListId));
      });
    }
  };
};


export const changeTaskTitleTC = (
  taskId: string,
  title:  string,
  todolistId: string
) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let state = getState();
    const allTasksFromState = getState().tasks;
    const tasksForCurrentTodolist = allTasksFromState[todolistId];
    const updateTask = tasksForCurrentTodolist.find((t) => {
      return t.id === taskId;
    });
    if (updateTask) {
      // const model: UpdateTaskModelType = { ...updateTask, status };
      const model: UpdateTaskModelType = {
            title: title,
            startDate: updateTask.startDate,
            priority: updateTask.priority,
            description: updateTask.description,
            deadline: updateTask.deadline,
            status: updateTask.status,
          };
      todolistAPI.updateTask(todolistId, taskId, model).then((res) => {
        const newTask = res.data.data.item;
        dispatch(changeTaskTitleAC(newTask.id, newTask.title, newTask.todoListId));
      });
    }
  };
};
