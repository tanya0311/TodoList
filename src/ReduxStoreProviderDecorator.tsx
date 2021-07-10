import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "./api/todolist-api-2";
import AppWithRedux from "./AppWithRedux";
import { tasksReducer } from "./state/tasks-reducer";
import { todoListReducer } from "./state/todolists-reducer";
import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListReducer,
});
 
export type AppRootStateType = ReturnType<typeof rootReducer>;

const initialGlobalState = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
      addedDate: "",
      order: 0,
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
      addedDate: "",
      order: 0,
    },
  ],
  tasks: {
    ["todolistId1"]: [
      {
        id: "1",
        title: "CSS",
        // completed: false,
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
    ["todolistId2"]: [
      {
        id: "1",
        title: "CSS",
        // completed: false,
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: "",
        deadline: "",
        addedDate: "",
        order: 0,
        priority: TaskPriorities.Low,
      },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer,
  //   applyMiddleware(thunkMiddleware),
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
