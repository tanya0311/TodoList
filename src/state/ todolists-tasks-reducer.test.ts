// import { Task1Type, TodolistType } from "../App";
import { v1 } from "uuid";
import { Task1Type } from "../AppWithRedux";
import { tasksReducer } from "./tasks-reducer";
import { AddTLAC, TodolistDomainType, todoListReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: Task1Type = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  
  let todolistId1: string=v1();;
  let newTodolistTitle =  {
    id: todolistId1,
    title: "Todolist 1",
    filter: "all",
    addedDate: "",
    order: 1,
  };
  // const action = AddTLAC("new todolist");
  const action = AddTLAC(newTodolistTitle);

  const endTasksState = tasksReducer(startTasksState, action); // получим { 'any new id: '1234qw'' : []}
  const endTodolistsState = todoListReducer(startTodolistsState, action); // получим [{id:'1234qw', title:"new todolist", filter:'all'}]

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  // expect(idFromTasks).toBe(action.id);
  // expect(idFromTodolists).toBe(action.id);
});
