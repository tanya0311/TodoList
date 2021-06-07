import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    // debugger
    todolistAPI.getTodolists().then((response) => {
      //  debugger
      setState(response.data);
      // setState(response.data[0].title);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.createTodolist("new TL").then((res) => {
      setState(res.data);
      // setState(res.data.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "7ead6b70-713b-4f2a-a727-e993153e6454";
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
// export const UpdateTodolistTitle = () => {
//    const [state, setState] = useState<any>(null)
//    useEffect(() => {
//       const todolistId = 'd65a26f8-12b9-4f98-8003-803fbb00f306'
//! в 1.1/todo-lists/ ${todolistId} где ${todolistId} явл URI-параметром
//       axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'REACT>>>>>11>>>>'}, settings)
//       .then((res) => {
//           setState(res.data)
//    })

//    }, [])

//    return <div> {JSON.stringify(state)}</div>
// }
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "d65a26f8-12b9-4f98-8003-803fbb00f306";
    todolistAPI.updateTodolist(todolistId, "REACT>>>333>>>>").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
