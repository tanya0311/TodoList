import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useCallback, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import "./App.css";
import { AppRootStateType } from "./state/store";
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import {
  AddTLAC,
  ChangeTLFilterAC,
  ChangeTLTitleAC,
  RemoveTLAC,
  todoListReducer,
} from "./state/todolists-reducer";
import TodoList, { TasksPopsType } from "./Todolist";

export type FilterType = "all" | "active" | "completed";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterType;
};
export type Task1Type = {
  [key: string]: Array<TasksPopsType>;
};
function AppWithRedux() {
  let todoList = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  );
  let task1 = useSelector<AppRootStateType, Task1Type>((state) => state.task1);
  let dispatch = useDispatch();

  const removeTasks = useCallback(
    (id: string, todolistId: string) => {
      let action = removeTaskAC(id, todolistId);
      // dispatchTask1(action);
      dispatch(action);
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todolistId: string) => {
      let action = addTaskAC(title, todolistId);
      dispatch(action);
    },
    [dispatch]
  );

  const changeTasks = useCallback(
    (id: string, isDone: boolean, todolistId: string) => {
      dispatch(changeTaskStatusAC(id, isDone, todolistId));
    },
    [dispatch]
  );

  const changeFilterTL = useCallback(
    (value: FilterType, todolistId: string) => {
      dispatch(ChangeTLFilterAC(todolistId, value));
    },
    [dispatch]
  );

  const changeTask1Title = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      let action = AddTLAC(title);
      // dispatchTodolist(action);
      // dispatchTask1(action);
      dispatch(action);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      let action = RemoveTLAC(todolistId);
      // dispatchTodolist(action);
      // dispatchTask1(action);
      dispatch(action);
    },
    [dispatch]
  );
  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) => {
      // dispatchTodolist(ChangeTLTitleAC(todolistId, newTitle));
      dispatch(ChangeTLTitleAC(todolistId, newTitle));
    },
    [dispatch]
  );
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={9}>
          {todoList.map((tl) => {
            let allTasksTdodList = task1[tl.id];

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "20px" }}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    // tasks={tasksForTodolist}
                    tasks={allTasksTdodList}
                    // 1 other variant
                    // tasks={task1[tl.id]}
                    removeTasks={removeTasks}
                    changeFilter={changeFilterTL}
                    addTask={addTask}
                    changeTasks={changeTasks}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTask1Title={changeTask1Title}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
