import { v1 } from "uuid";
import { FilterType, TodolistType } from "../App";
import { AddTLAC, RemoveTLAC, todoListReducer } from "./todolists-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});

test("correct todolist should be removed", () => {
  // const endState = todoListReducer(startState, { type: 'REMOVE-TODOLIST', todolistId: todolistId1})
  const endState = todoListReducer(startState, RemoveTLAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let newTodolistTitle = "New Todolist";

  // const endState = todoListReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})
  const endState = todoListReducer(startState, AddTLAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});
test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const action = {
    type: "CHANGE-TODOLIST-TITLE" as const,
    todolistId: todolistId2,
    newTitle: newTodolistTitle,
  };

  const endState = todoListReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterType = "completed";

  const action = {
    type: "CHANGE-TODOLIST-FILTER" as const,
    todolistId: todolistId2,
    filter: newFilter,
  };

  const endState = todoListReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
