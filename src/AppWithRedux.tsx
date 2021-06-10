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
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddItemForm from "./AddItemForm";
import { TaskStatuses, TaskType } from "./api/todolist-api";
import "./App.css";
import { AppRootStateType } from "./state/store";
import {
  addTaskAC,
  addTasksTC,
  changeTaskStatusAC,
  changeTaskStatusTC,
  changeTaskTitleAC,
  changeTaskTitleTC,
  deleteTasksTC,
  removeTaskAC,
} from "./state/tasks-reducer";
import {
  AddTLAC,
  ChangeTLFilterAC,
  ChangeTLTitleAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  RemoveTLAC,
  setTodolistsAC,
  TodolistDomainType,
  todoListReducer,
} from "./state/todolists-reducer";
import TodoList from "./Todolist";

export type FilterType = "all" | "active" | "completed";

// export type TodolistType = {
//   id: string;
//   title: string;
//   filter: FilterType;
// };
export type Task1Type = {
  [key: string]: Array<TaskType>;
};
function AppWithRedux() {
  let todoList = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists
  );
  let tasks = useSelector<AppRootStateType, Task1Type>((state) => state.tasks);
  let dispatch = useDispatch();

  useEffect(() => {
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
    [dispatch]
  );

  const changeTask1Title = useCallback(
    (id: string, newTitle: string, todolistId: string) => {
      dispatch(changeTaskTitleTC(id, newTitle, todolistId));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      let tunk = createTodolistTC(title);
      dispatch(tunk);
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todolistId: string) => {
      let tunk = deleteTodolistTC(todolistId);
      dispatch(tunk);
    },
    [dispatch]
  );
  const changeTodolistTitle = useCallback(
    (todolistId: string, newTitle: string) => {
      dispatch(changeTodolistTitleTC(todolistId, newTitle));
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
            let allTasksTdodList = tasks[tl.id];

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
