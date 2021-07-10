import axios from "axios";

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
  description: null | string;
  todoListId: string;
  // completed: boolean;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: null | string;
  deadline: null | string;
  addedDate: string;
};

type ResponseType<T = {}> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};

export type UpdateTaskModelType  = {
  title: string;
  description: string | null;
  status: number;
  priority: number;
  startDate: string | null;
  // startDate: string ;
  deadline: string | null;
};

type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
export type deleteTasksResponseType = {
  resultCode: number
   messages: string[],
   data: {}
};

export const todolistAPI = {
  getTodolists() {
    const promise = instance.get<Array<TodolistType>>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodolistType }>>(
      "todo-lists",
      {
        title,
      }
    );
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`);
    return promise;
  },
  updateTodolist(todolistId: string, newTitle: string) {
    const promise = instance.put<ResponseType>(`todo-lists/${todolistId}`, {
      title: newTitle,
    });
    return promise;
  },
  getTasks(todolistId: string) {
    const promise = instance.get<GetTasksResponse>(
      `todo-lists/${todolistId}//tasks`
    );
    return promise;
  },
  createTasks(todolistId: string, taskTitle: string) {
    const promise = instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title: taskTitle,
      }
    );
    return promise;
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    const promise = instance.put<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model
    );
    return promise;
  },
  deleteTask(todolistId: string, taskId: string) {
    const promise = instance.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
    return promise;
  },
};
