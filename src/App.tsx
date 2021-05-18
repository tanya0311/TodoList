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
import React, { useState } from "react";
import { v1 } from "uuid";
import AddItemForm from "./AddItemForm";
import "./App.css";
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
function App() {

  function removeTasks(id: string, todolistId: string) {
    let todolistTasks = task1[todolistId];
    let taskaf = todolistTasks.filter((t) => t.id !== id);
    task1[todolistId] = taskaf;
    setTask1({ ...task1 });
  }

  function addTask(title: string, todolistId: string) {
    let newtask:TasksPopsType = { id: v1(), title: title, isDone: false };
    let tasks2 = task1[todolistId];
    let newTasks = [newtask, ...tasks2];
    task1[todolistId] = newTasks;
    setTask1({ ...task1 });
  }

  function changeTasks(id: string, isDone: boolean, todolistId: string) {
    let tasks = task1[todolistId];
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = isDone;
    }
    setTask1({ ...task1 });
  }

  function changeFilter(value: FilterType, todolistId: string) {
    let Todolist = todoList.find((tl) => tl.id === todolistId);
    if (Todolist) {
      Todolist.filter = value;
      setTodolist([...todoList]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todoList, setTodolist] = useState<Array<TodolistType>>([
    { id: todolistId1, title: "hello", filter: "all" },
    { id: todolistId2, title: "123", filter: "all" },
    // { id:v1(), title: 'yes', filter: 'completed'}
  ]);

  let [task1, setTask1] = useState<Task1Type>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "React", isDone: true },
      { id: v1(), title: "React", isDone: true },
    ],
    [todolistId2]: [
      { id: v1(), title: "01", isDone: true },
      { id: v1(), title: "02", isDone: false },
      { id: v1(), title: "03", isDone: true },
      { id: v1(), title: "04", isDone: true },
    ],
  });

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todoList.filter((tl) => tl.id !== todolistId);
    setTodolist(filteredTodolist);
    delete task1[todolistId];
    setTask1({ ...task1 });
  }

  function addTodolist(title: string) {
    let newTodolistId = v1();
    let newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: "all",
    };
    setTodolist([newTodolist, ...todoList]);
    setTask1({ ...task1, [newTodolistId]: [] });
  }

  function changeTask1Title(id: string, newTitle: string, todolistId: string) {
    let tasks = task1[todolistId];
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
    }
    setTask1({ ...task1 });
  }
  function changeTodolistTitle(todolistId: string, newTitle: string) {
    const todolist = todoList.find((tl) => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
    }
    setTodolist([...todoList]);
  }
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

      <Container fixed >
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={9}>
          {todoList.map((tl) => {
            let tasksForTodolist = task1[tl.id];
            // debugger;
            if (tl.filter === "completed") {
              tasksForTodolist = task1[tl.id].filter((t) => t.isDone === true);
            }
            if (tl.filter === "active") {
              tasksForTodolist = task1[tl.id].filter((t) => t.isDone === false);
            }
            return (
              <Grid item>
                <Paper style={{padding: '20px'}}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodolist}
                    removeTasks={removeTasks}
                    changeFilter={changeFilter}
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

export default App;
