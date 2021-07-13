import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItemForm from "./AddItemForm";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import "./App.css";
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar";
import { RequestStatusType } from "./state/app-reducer";
import { AppRootStateType } from "./state/store";
import {
  addTasksTC,
  changeTaskStatusTC,
  changeTaskTitleTC,
  deleteTasksTC,
} from "./state/tasks-reducer";
import {
  ChangeTLFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  FilterType,
  TodolistDomainType,
} from "./state/todolists-reducer";
import TodoList from "./Todolist";

type AppType = {
  demo?: boolean; // для storybook
};
export type Task1Type = {
  [key: string]: Array<TaskType>;
};
function AppWithRedux({demo = false}:AppType) {
  let todoList = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  let tasks = useSelector<AppRootStateType, Task1Type>((state) => state.tasks);
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status
  );
  let dispatch = useDispatch();

  useEffect(() => {
    if (demo) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, []);

  const removeTasks = useCallback(
    (id: string, todolistId: string) => {
      let tunk = deleteTasksTC(id, todolistId);
      dispatch(tunk);
    },
    [dispatch]
  );

  const addTask = useCallback((title: string, todolistId: string) => {
    // debugger
    let tunk = addTasksTC(title, todolistId);
    dispatch(tunk);
  }, []);

  const changeTasks = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(changeTaskStatusTC(id, status, todolistId));
    },
    []
  );

  const changeFilterTL = useCallback(
    (value: FilterType, todolistId: string) => {
      dispatch(ChangeTLFilterAC(todolistId, value));
    },
    []
  );

  const changeTask1Title = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleTC(id, newTitle, todolistId));
    },
    []
  );

  const addTodolist = useCallback((title: string) => {
    let tunk = createTodolistTC(title);
    dispatch(tunk);
  }, []);

  const removeTodolist = useCallback((todolistId: string) => {
    let tunk = deleteTodolistTC(todolistId);
    dispatch(tunk);
  }, []);
  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle));
    },
    []
  );
  return (
    <div className="App">
      <ErrorSnackbar />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
        {status === "loading" && <LinearProgress color="secondary" />}
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={9}>
          {todoList.map((tl) => {
            let allTasksTdodList = tasks[tl.id];

            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "20px" }}>
                  <TodoList
                    key={tl.id}
                    todolist={tl}
                    // id={tl.id}
                    // title={tl.title}
                    // tasks={tasksForTodolist}
                    tasks={allTasksTdodList}
                    // 1 other variant
                    // tasks={task1[tl.id]}
                    removeTasks={removeTasks}
                    changeFilter={changeFilterTL}
                    addTask={addTask}
                    changeTasks={changeTasks}
                    // filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTask1Title={changeTask1Title}
                    changeTodolistTitle={changeTodolistTitle}
                    demo={demo}
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
