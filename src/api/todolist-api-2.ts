import axios from "axios";

// const settings = {
//   withCredentials: true,
//   headers: {
//     "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
//   },
// };
const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  withCredentials: true,
  headers: {
    "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
  },
});
export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
// export type CreateTodolistType = {
//   resultCode: number;
//   messages: string[];
//   fieldsErrors:[];
//   data: {item:TodolistType} ;
// };
// export type DeleteUpdateTodolistType = {
//   resultCode: number;
//   messages: string[];
//   fieldsErrors:[];
//   data: {} ;
// };
export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: [];
  data: T;
};
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type TaskType = {
  id: string;
  title: string;
  status: TaskStatuses;
  todoListId: string;
  description: null | string;
  startDate: null | string;
  order: number;
  priority: TaskPriorities;
  deadline: null | string;
  addedDate: string;
};

export type getTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: null;
};
export type deleteTasksResponseType = {
  resultCode: number;
  messages: string[];
  data: {};
};
export type updateTasksModelType = {
  title: string;
  description: string;
  // completed: boolean
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};
// export type UpdateTaskModelType  = {
//    title: string;
//    description: string | null;
//    status: number;
//    priority: number;
//    startDate: string | null;
//    // startDate: string ;
//    deadline: string | null;
//  };

export const todolistApi = {
  getTodolist() {
    return instance.get<TodolistType[]>("todo-lists");
  },

  createTodolist(newtitle: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title: newtitle,
    });
  },
  deleteTodolist(idTL: string) {
    // //! в 1.1/todo-lists/ ${todolistId} где ${todolistId} явл URI-параметром
    return instance.delete<ResponseType>(`todo-lists/${idTL}`);
  },
  updateTodolist(idTL: string, newtitle: string) {
    return instance.put<ResponseType>(`todo-lists/${idTL}`, {
      title: newtitle,
    });
  },
};

export const tasksApi = {
  getTasks(idTl: string) {
    return instance.get<getTasksResponseType>(`todo-lists/${idTl}/tasks`);
  },
  deleteTask(idTL: string, idTask: string) {
    return instance.delete<ResponseType>(`todo-lists/${idTL}/tasks/${idTask}`);
  },
  createTask(idTL: string, newTask: string) {
    return instance.post<ResponseType<TaskType>>(
      `todo-lists/${idTL}/tasks`,
      { title: newTask }
    );
  },

  updateTask(idTL: string, idTask: string, model: updateTasksModelType) {
    return instance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${idTL}/tasks/${idTask}`,
      model
    );
  },
};
