import { v1 } from "uuid";
import { TodoType } from "../api/todolist-api";
import { FilterType, TodolistType } from "../AppWithRedux";

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

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
};
const initialState:  Array<TodolistDomainType> = [];

export const todoListReducer = (
  stateTL: Array<TodolistDomainType> = initialState,
  action: ActionType
):  Array<TodolistDomainType> => {
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
      // let newTodolistId = v1();
      let newTodolist: TodolistType = {
        // id: newTodolistId,
        id: action.id,
        title: action.title,
        filter: "all",
      };
      return [newTodolist, ...stateTL];
    // return [ {  id: action.id, title: action.title, filter: "all"}, ...stateTL]
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
export const AddTLAC = (title: string) => {
  return {
    type: "ADD-TODOLIST" as const,
    title: title,
    id: v1(),
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

export const setTodolistsAC = (todolists: Array<TodoType>) => {
  return { type: "SET-TODOLISTS" as const, todolists };
};
