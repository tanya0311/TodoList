import axios from "axios";
import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
  },
};
export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => {
      setState(res.data);
    });

    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistTitle, setTodolistTitle] = useState<string>("");

  // useEffect(() => {
  //    todolistAPI.createTodolist('привет').then(res=>{
  //       setState(res.data)
  //    })
  // }, [])

  const createTodolist = () => {
    todolistAPI.createTodolist(todolistTitle).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"Todolist Title"}
          value={todolistTitle}
          onChange={(e) => {
            setTodolistTitle(e.currentTarget.value);
          }}
        />
        <button onClick={createTodolist}>create todolist</button>
      </div>
    </div>
  );
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  // useEffect(() => {
  //       let idTL="bd8b75d7-205e-4423-a767-bab0f5c9c7a5"
  //    todolistAPI.deleteTodolist(idTL).then(res=>{
  //       // debugger
  //       setState(res.data)
  //    })
  // }, [])

  const deleteTodolist1 = () => {
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      setState(res.data);
    });
  };
  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"Todolist id"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <button onClick={deleteTodolist1}>delete todolist</button>
      </div>
    </div>
  );
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");
  const [title, setTitle] = useState<string>("new title");

  // useEffect(() => {
  //     let idTL='c3751c73-fdb1-4abf-a05c-a4336047ec90'
  //   todolistAPI.UpdateTodolist(idTL, 'newTitle1').then(res=>{
  //       setState(res.data)
  //    })
  // }, [])

  const updateTodolist = () => {
    todolistAPI.updateTodolist(todolistId, title).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"Todolist Title"}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <button onClick={updateTodolist}>update todolist</button>
      </div>
    </div>
  );
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  const [todolistId, setTodolistId] = useState<string>("");

  // useEffect(() => {
  //    let idTL='1e5d1ed1-f4fc-4175-a4de-8bb95aa2459b'
  //    todolistAPI.getTasks(idTL).then(res=>{
  //       setState(res.data)
  //    })
  // }, [])

  const getTasks = () => {
    todolistAPI.getTasks(todolistId).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />

        <button onClick={getTasks}>get tasks</button>
      </div>
    </div>
  );
};
export const DeleteTasks = () => {
  const [state, setState] = useState<any>(null);
  const [taskId, setTaskId] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  // useEffect(() => {
  //    let idTL='1e5d1ed1-f4fc-4175-a4de-8bb95aa2459b'
  //    let idTask='dc7f712e-8fcb-4ff4-a46a-c8518169e1a5'
  //    todolistAPI.deleteTask(idTL,idTask ).then(res=>{
  //       setState(res.data)
  //    })
  // }, [])

  const deletTask = () => {
    todolistAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  };
  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <button onClick={deletTask}>delete task</button>
      </div>
    </div>
  );
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [todolistId, setTodolistId] = useState<string>("");

  // useEffect(() => {
  //    let idTL='1e5d1ed1-f4fc-4175-a4de-8bb95aa2459b'
  //    todolistAPI.createTasks(idTL, 'привет').then(res=>{
  //       setState(res.data)
  //    })
  // }, [])
  const createTask = () => {
    todolistAPI.createTasks(todolistId, taskTitle).then((res) => {
      setState(res.data);
    });
  };

  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"Task Title"}
          value={taskTitle}
          onChange={(e) => {
            setTaskTitle(e.currentTarget.value);
          }}
        />
        <button onClick={createTask}>create task</button>
      </div>
    </div>
  );
};
export const UpdateTaskTitle = () => {
  const [state, setState] = useState<any>(null);
  const [title, setTitle] = useState<string>("title 1");
  const [todolistId, setTodolistId] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");
  const [description, setDescription] = useState<string>("descripton 1");
  const [status, setStatus] = useState<number>(0);
  const [priority, setPriority] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");

  // useEffect(() => {
  //    let idTL='1e5d1ed1-f4fc-4175-a4de-8bb95aa2459b'
  //    let idTask='a6c150e5-9145-4945-a3ba-2651149b4ef7'
  //   todolistAPI.updateTask(idTL, idTask, 'newTask').then(res=>{
  //       // debugger
  //       setState(res.data)
  //    })
  // }, [])

  const updateTask = () => {
    todolistAPI
      .updateTask(todolistId, taskId, {
        deadline: "",
        description: description,
        priority: priority,
        startDate: "",
        status: status,
        title: title,
      })
      .then((res) => {
        setState(res.data);
      });
  };

  return (
    <div>
      {" "}
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todolistId"}
          value={todolistId}
          onChange={(e) => {
            setTodolistId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"taskId"}
          value={taskId}
          onChange={(e) => {
            setTaskId(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"Task Title"}
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"Description"}
          value={description}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        <input
          placeholder={"status"}
          value={status}
          type="number"
          onChange={(e) => {
            setStatus(+e.currentTarget.value);
          }}
        />
        <input
          placeholder={"priority"}
          value={priority}
          type="number"
          onChange={(e) => {
            setPriority(+e.currentTarget.value);
          }}
        />
        <button onClick={updateTask}>update task</button>
      </div>
    </div>
  );
};
