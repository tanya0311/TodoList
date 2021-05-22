import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import AppWithRedux from "./AppWithRedux";
import { tasksReducer } from "./state/tasks-reducer";
import { todoListReducer } from "./state/todolists-reducer";

const rootReducer = combineReducers({
  task1: tasksReducer,
  todolists: todoListReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

const initialGlobalState = {
  todolists: [
    { id: "todolistId1", title: "What to learn", filter: "all" },
    { id: "todolistId2", title: "What to buy", filter: "all" },
  ],
  task1: {
    ["todolistId1"]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    ["todolistId2"]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  },
};

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
