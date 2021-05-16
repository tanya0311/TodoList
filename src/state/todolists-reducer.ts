import { v1 } from "uuid";
import { FilterType, TodolistType } from "../App";

export type StateType = Array<TodolistType>;
export type ActionType =
  | RemoveTLACType
  | AddTLACType
  | ChangeTLTitleACType
  | ChangeTLFilterACType;

type RemoveTLACType = {
  type: "REMOVE-TODOLIST";
  todolistId: string;
};
type AddTLACType = {
  type: "ADD-TODOLIST";
  title: string;
};
type ChangeTLTitleACType = {
  type: "CHANGE-TODOLIST-TITLE";
  todolistId: string;
  newTitle: string;
};
type ChangeTLFilterACType = {
  type: "CHANGE-TODOLIST-FILTER";
  todolistId: string;
  filter: FilterType;
};
const REMOVE_TODOLIST = "REMOVE-TODOLIST";
const ADD_TODOLIST = "ADD-TODOLIST";
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE";
const CHANGE_TODOLIST_FILTER = "CHANGE-TODOLIST-FILTER";

export const todoListReducer = (
  stateTL: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case REMOVE_TODOLIST:
      return stateTL.filter((tl) => tl.id !== action.todolistId);

    case ADD_TODOLIST:
      let newTodolistId = v1();
      let newTodolist: TodolistType = {
        id: newTodolistId,
        title: action.title,
        filter: "all",
      };
      return [newTodolist, ...stateTL];
    // return [ {  id: v1(), title: action.title, filter: "all"}, ...stateTL]
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

export const RemoveTLAC = (id: string): RemoveTLACType => {
  return {
    type: "REMOVE-TODOLIST" as const,
    todolistId: id,
  };
};
export const AddTLAC = (title: string): AddTLACType => {
  return {
    type: "ADD-TODOLIST" as const,
    title: title,
  };
};
export const ChangeTLTitleAC = (todolistId: string, newTitle: string): ChangeTLTitleACType => ({
  type: "CHANGE-TODOLIST-TITLE" as const,
  todolistId,
  newTitle,
});
export const ChangeTLFilterAC = (todolistId: string,filter: FilterType): ChangeTLFilterACType => ({
  type: "CHANGE-TODOLIST-FILTER" as const,
  todolistId,
  filter,
});