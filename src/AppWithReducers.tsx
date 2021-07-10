// import {
//   AppBar,
//   Button,
//   Container,
//   Grid,
//   IconButton,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@material-ui/core";
// import { Menu } from "@material-ui/icons";
// import React, { useReducer } from "react";
// import { v1 } from "uuid";
// import AddItemForm from "./AddItemForm";
// import {
//   TaskPriorities,
//   TaskStatuses,
//   TaskType,
//   TodolistType,
// } from "./api/todolist-api-2";
// import "./App.css";
// import {
//   addTaskAC,
//   changeTaskStatusAC,
//   changeTaskTitleAC,
//   removeTaskAC,
//   tasksReducer,
// } from "./state/tasks-reducer";
// import {
//   AddTLAC,
//   ChangeTLFilterAC,
//   ChangeTLTitleAC,
//   FilterType,
//   RemoveTLAC,
//   todoListReducer,
// } from "./state/todolists-reducer";
// import TodoList from "./Todolist";

// export type Task1Type = {
//   [key: string]: Array<TaskType>;
// };
// function AppWithReducers() {
//   let todolistId1 = v1();
//   let todolistId2 = v1();

//   let [todoList, dispatchTodolist] = useReducer(todoListReducer, [
//     { id: todolistId1, title: "hello", filter: "all", addedDate: "", order: 0 },
//     { id: todolistId2, title: "123", filter: "all", addedDate: "", order: 0 },
//     // { id:v1(), title: 'yes', filter: 'completed'}
//   ]);

//   let [task1, dispatchTask1] = useReducer(tasksReducer, {
//     [todolistId1]: [
//       // { id: v1(), title: "HTML&CSS", isDone: true },
//       {
//         id: v1(),
//         title: "JS",
//         status: TaskStatuses.Completed,
//         todoListId: todolistId1,
//         description: "",
//         startDate: "",
//         order: 0,
//         priority: TaskPriorities.Low,
//         deadline: "",
//         addedDate: "",
//       },
//       {
//         id: v1(),
//         title: "React",
//         status: TaskStatuses.Completed,
//         todoListId: todolistId1,
//         description: "",
//         startDate: "",
//         order: 0,
//         priority: TaskPriorities.Low,
//         deadline: "",
//         addedDate: "",
//       },
//     ],
//     [todolistId2]: [
//       {
//         id: v1(),
//         title: "01",
//         status: TaskStatuses.Completed,
//         todoListId: todolistId2,
//         description: "",
//         startDate: "",
//         order: 0,
//         priority: TaskPriorities.Low,
//         deadline: "",
//         addedDate: "",
//       },
//       {
//         id: v1(),
//         title: "02",
//         status: TaskStatuses.Completed,
//         todoListId: todolistId2,
//         description: "",
//         startDate: "",
//         order: 0,
//         priority: TaskPriorities.Low,
//         deadline: "",
//         addedDate: "",
//       },
//     ],
//   });

//   function removeTasks(id: string, todolistId: string) {
//     let action = removeTaskAC(id, todolistId);
//     dispatchTask1(action);
//   }

//   //   function addTask(title: string, todolistId: string) {
//   //     let action = addTaskAC(title, todolistId);
//   //     dispatchTask1(action);
//   //   }
//   function addTask(task: TaskType) {
//     let action = addTaskAC(task);
//     dispatchTask1(action);
//   }

//   function changeTasks(id: string, status: TaskStatuses, todolistId: string) {
//     dispatchTask1(changeTaskStatusAC(id, status, todolistId));
//   }

//   function changeFilterTL(value: FilterType, todolistId: string) {
//     dispatchTodolist(ChangeTLFilterAC(todolistId, value));
//   }

//   function changeTask1Title(id: string, newTitle: string, todolistId: string) {
//     dispatchTask1(changeTaskTitleAC(id, newTitle, todolistId));
//   }

//   function addTodolist(title: TodolistType) {
//     let action = AddTLAC(title);
//     dispatchTodolist(action);
//     dispatchTask1(action);
//   }

//   function removeTodolist(todolistId: string) {
//     let action = RemoveTLAC(todolistId);
//     dispatchTodolist(action);
//     dispatchTask1(action);
//   }
//   function changeTodolistTitle(todolistId: string, newTitle: string) {
//     dispatchTodolist(ChangeTLTitleAC(todolistId, newTitle));
//   }
//   return (
//     <div className="App">
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <Menu />
//           </IconButton>
//           <Typography variant="h6">News</Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>

//       <Container fixed>
//         <Grid container style={{ padding: "20px" }}>
//           <AddItemForm addItem={addTodolist} />
//         </Grid>
//         <Grid container spacing={9}>
//           {todoList.map((tl) => {
//             let tasksForTodolist = task1[tl.id];
//             // debugger;
//             if (tl.filter === "completed") {
//               tasksForTodolist = task1[tl.id].filter(
//                 (t) => t.status === TaskStatuses.New
//               );
//             }
//             if (tl.filter === "active") {
//               tasksForTodolist = task1[tl.id].filter(
//                 (t) => t.status === TaskStatuses.Completed
//               );
//             }
//             return (
//               <Grid item>
//                 <Paper style={{ padding: "20px" }}>
//                   <TodoList
//                     key={tl.id}
//                     id={tl.id}
//                     title={tl.title}
//                     tasks={tasksForTodolist}
//                     removeTasks={removeTasks}
//                     changeFilter={changeFilterTL}
//                     addTask={addTask}
//                     changeTasks={changeTasks}
//                     filter={tl.filter}
//                     removeTodolist={removeTodolist}
//                     changeTask1Title={changeTask1Title}
//                     changeTodolistTitle={changeTodolistTitle}
//                   />
//                 </Paper>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default AppWithReducers;
