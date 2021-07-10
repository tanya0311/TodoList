import { Dispatch } from "redux";
import { v1 } from "uuid";
import {  todolistApi, TodolistType } from "../api/todolist-api-2";
import { AppRootStateType } from "./store";

export type FilterType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
  filter: FilterType;
};
// export type StateType = Array<TodolistType>;
export type ActionType =
  | RemoveTLACType
  | AddTLACType
  | ChangeTLTitleACType
  | ChangeTLFilterACType
  | SetTodolistsActionType;

export type RemoveTLACType = ReturnType<typeof RemoveTLAC>;
export type AddTLACType = ReturnType<typeof AddTLAC>;
export type ChangeTLTitleACType = ReturnType<typeof ChangeTLTitleAC>;
export type ChangeTLFilterACType = ReturnType<typeof ChangeTLFilterAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export const REMOVE_TODOLIST = "REMOVE-TODOLIST";
export const ADD_TODOLIST = "ADD-TODOLIST";
export const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE";
export const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER";
export const SET_TODOLISTS = "SET-TODOLISTS";

const initialState: Array<TodolistDomainType> = [];

export const todoListReducer = (
  stateTL: Array<TodolistDomainType> = initialState,
  action: ActionType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case SET_TODOLISTS: {
      return action.todolists.map((tl) => ({
        ...tl,
        filter: "all",
      }));
    }
    case REMOVE_TODOLIST:
      return stateTL.filter((tl) => tl.id !== action.todolistId);

    case ADD_TODOLIST:
      const newTodolist: TodolistDomainType = {
        ...action.todolist,
        filter: "all",
      };
      return [newTodolist, ...stateTL];

    case CHANGE_TODOLIST_TITLE:
      const todolist = stateTL.find((tl) => tl.id === action.todolistId);
      if (todolist) {
        todolist.title = action.newTitle;
        return [...stateTL];
      } else {
        return [...stateTL];
      }
    // return stateTL.map( el=> el.id === action.todolistId ? {...el, title: action.newTitle} : el) ;

    case CHANGE_TODOLIST_FILTER:
      return stateTL.map((el) =>
        el.id === action.todolistId ? { ...el, filter: action.filter } : el
      );
    default:
      return stateTL;
  }
};

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

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return { type: "SET-TODOLISTS" as const, todolists };
};

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistApi.getTodolist().then((res) => {
      dispatch(setTodolistsAC(res.data));
    });
  };
};

export const createTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistApi.createTodolist(title).then((res) => {
      dispatch(AddTLAC(res.data.data.item));
    });
  };
};
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistApi.updateTodolist(todolistId, title).then((res) => {
      dispatch(ChangeTLTitleAC(todolistId, title));
    });
  };
};
export const deleteTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    todolistApi.deleteTodolist(todolistId).then((res) => {
      dispatch(RemoveTLAC(todolistId));
    });
  };
};
