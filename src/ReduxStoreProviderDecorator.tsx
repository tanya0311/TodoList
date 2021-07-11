import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { TaskPriorities, TaskStatuses } from "./api/todolist-api";
import { tasksReducer } from "./state/tasks-reducer";
import { todoListReducer } from "./state/todolists-reducer";
import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { AppRootStateType } from "./state/store";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListReducer,
});

// export type AppRootStateType = ReturnType<typeof rootReducer>;

const initialGlobalState: AppRootStateType = {
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
        id: v1(),
        title: "CSS",
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
        id: v1(),
        title: "HTML",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
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
  applyMiddleware(thunkMiddleware)
  // initialGlobalState
  // initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
