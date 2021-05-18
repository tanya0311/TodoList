import { Task1Type, TodolistType } from "../App";
import { tasksReducer } from "./tasks-reducer";
import { AddTLAC, todoListReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: Task1Type = {};
  const startTodolistsState: Array<TodolistType> = [];

  const action = AddTLAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action); // получим { 'any new id: '1234qw'' : []}
  const endTodolistsState = todoListReducer(startTodolistsState, action); // получим [{id:'1234qw', title:"new todolist", filter:'all'}]

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.id);
  expect(idFromTodolists).toBe(action.id);
});
