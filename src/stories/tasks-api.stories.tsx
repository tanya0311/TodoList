// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { todolistAPI } from "../api/todolist-api";

// export default {
//   title: "API",
// };

// export const GetTasks = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {
//     const todolistId = "d65a26f8-12b9-4f98-8003-803fbb00f306";
//     todolistAPI.getTasks(todolistId).then((res) => {
//       //  debugger
//       setState(res.data);
//     });
//   }, []);

//   return <div> {JSON.stringify(state)}</div>;
// };
// export const CreateTasks = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {
//     const todolistId = "d65a26f8-12b9-4f98-8003-803fbb00f306";
//     todolistAPI.createTasks(todolistId, "Task 6").then((res) => {
//       setState(res.data.data);
//     });
//   }, []);

//   return <div> {JSON.stringify(state)}</div>;
// };

// export const UpdateTasksTitle = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {
//     const todolistId = "d65a26f8-12b9-4f98-8003-803fbb00f306";
//     let taskId = "7465772e-ad57-4f84-8045-46b6a4e7ceaa";
//     todolistAPI.updateTask(todolistId, taskId, "task 1");
//   }, []);

//   return <div> {JSON.stringify(state)}</div>;
// };

// export const DeleteTasks = () => {
//   const [state, setState] = useState<any>(null);
//   useEffect(() => {
//     const todolistId = "d65a26f8-12b9-4f98-8003-803fbb00f306";
//     let taskId = "3cf34f36-6e96-4c7f-a109-486678e26134";
//     todolistAPI.deleteTask(todolistId, taskId);
//   }, []);

//   return <div> {JSON.stringify(state)}</div>;
// };
