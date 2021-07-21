import { Dispatch } from "redux";
import { v1 } from "uuid";
import { todolistAPI, TodolistType } from "../api/todolist-api";
import {
  AppActionsType,
  RequestStatusType,
  setAppStatusAC,
} from "./app-reducer";
import { AppRootStateType } from "./store";

const initialState: Array<TodolistDomainType> = [];

export const todoListReducer = (
  stateTL: Array<TodolistDomainType> = initialState,
  action: ActionType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }));
    }
    case "REMOVE-TODOLIST":
      return stateTL.filter((tl) => tl.id !== action.todolistId);

    case "ADD-TODOLIST":
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all",
        entityStatus: "idle",
      };
      return [newTodolist, ...stateTL];

    case "CHANGE-TODOLIST-TITLE":
      return stateTL.map((el) =>
        el.id === action.todolistId ? { ...el, title: action.newTitle } : el
      );

    case "CHANGE-TODOLIST-FILTER":
      return stateTL.map((el) =>
        el.id === action.todolistId ? { ...el, filter: action.filter } : el
      );
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return stateTL.map((el) =>
        el.id === action.todolistId
          ? { ...el, entityStatus: action.status }
          : el
      );
    default:
      return stateTL;
  }
};

// actions
export const RemoveTLAC = (id: string) => {
  return {
    type: "REMOVE-TODOLIST" as const,
    todolistId: id,
  };
};
export const AddTLAC = (todolist: TodolistType) => {
  return {
    type: "ADD-TODOLIST" as const,
    todolist,
  };
};
export const ChangeTLTitleAC = (todolistId: string, newTitle: string) => ({
  type: "CHANGE-TODOLIST-TITLE" as const,
  todolistId,
  newTitle,
});
export const ChangeTLFilterAC = (todolistId: string, filter: FilterType) => ({
  type: "CHANGE-TODOLIST-FILTER" as const,
  todolistId,
  filter,
});
export const changeTLEntitySatatusAC = (
  todolistId: string,
  status: RequestStatusType
) => ({
  type: "CHANGE-TODOLIST-ENTITY-STATUS" as const,
  todolistId,
  status,
});

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return { type: "SET-TODOLISTS" as const, todolists };
};

// thunks
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI.getTodolists().then((res) => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

export const createTodolistTC = (title: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI.createTodolist(title).then((res) => {
      dispatch(AddTLAC(res.data.data.item));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      dispatch(ChangeTLTitleAC(todolistId, title));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};
export const deleteTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTLEntitySatatusAC(todolistId, "loading"));
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(RemoveTLAC(todolistId));
      dispatch(setAppStatusAC("succeeded"));
    });
  };
};

// type state
export type FilterType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

// type  dispatch actions
export type ActionType =
  | RemoveTLACType
  | AddTLACType
  | ChangeTLTitleACType
  | ChangeTLFilterACType
  | SetTodolistsACType
  | ChangeTLEntitySatatusACType
  | AppActionsType;

export type RemoveTLACType = ReturnType<typeof RemoveTLAC>;
export type AddTLACType = ReturnType<typeof AddTLAC>;
export type ChangeTLTitleACType = ReturnType<typeof ChangeTLTitleAC>;
export type ChangeTLFilterACType = ReturnType<typeof ChangeTLFilterAC>;
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>;
export type ChangeTLEntitySatatusACType = ReturnType<
  typeof changeTLEntitySatatusAC
>;
