import axios from "axios";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  withCredentials: true,
  headers: {
    "API-KEY": "177f53f8-d824-4924-842c-454e53dc1655",
  },
});

export type TodoType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type TaskType={
  id: string;
    title: string;
    description: null | string;
    todoListId: string;
    completed: boolean
    order: number;
    status: number;
    priority: number;
    startDate: null | string;
    deadline: null | string;
    addedDate: string;
}
// type CreateTodolistResponseType = {
//   resultCode: number;
//   messages: Array<string>;
//   fieldsError: Array<string>; //через debugger узнали что есть или Network - тип зопроса - Preview
//   data: {
//     item: TodoType;
//   };
// };

// type UpdateAndDeleteTodolistResponseType = {
//   resultCode: number;
//   messages: Array<string>;
//   data: {};
//   fieldsErrors: Array<string>;
// };

type ResponseType<T> = {
  resultCode: number;
  messages: Array<string>;
  fieldsErrors: Array<string>;
  data: T;
};
type GetResponseTasksType = {
  error: string | null;
  totalCount: number ;
  items:  Array<TaskType>;
};

export const todolistAPI = {
  getTodolists() {
    const promise = instance.get<Array<TodoType>>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = instance.post<ResponseType<{ item: TodoType }>>(
      "todo-lists",
      {
        title,
      }
    );
    return promise;
  },
  deleteTodolist(todolistId: string) {
    const promise = instance.delete<ResponseType<{}>>(
      `todo-lists/${todolistId}`
    );
    return promise;
  },
  updateTodolist(todolistId: string, newTitle: string) {
    const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {
      title: newTitle,
    });
    return promise;
  },
  getTasks(todolistId: string) {
    const promise = instance.get<GetResponseTasksType>(`todo-lists/${todolistId}//tasks`);
    return promise;
  },
  createTasks(todolistId: string, taskTitle: string) {
    const promise = instance.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todolistId}/tasks`,
      {
        title:taskTitle
      }
    );
    return promise;
  },
  updateTask(todolistId: string,taskId:string, newTitle: string) {
    const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`, {
      title: newTitle,
    });
    return promise;
  },
  deleteTask(todolistId: string, taskId:string) {
    const promise = instance.delete<ResponseType<{}>>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
    return promise;
  },
};
