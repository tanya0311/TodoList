import React from "react"
import { Provider } from "react-redux"
import { combineReducers, createStore } from "redux"
import { v1 } from "uuid"
import { TaskPriorities, TaskStatuses } from "./api/todolist-api"
import { tasksReducer } from "./state/tasks-reducer"
import { todoListReducer } from "./state/todolists-reducer"
import { applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { AppRootStateType } from "./state/store"
import { appReducer } from "./state/app-reducer"
import { authReducer } from "./state/auth-reduser"

const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todoListReducer,
	app: appReducer,
  authMe: authReducer
})

// export type AppRootStateType = ReturnType<typeof rootReducer>;

// let todolistId1 = v1();
// let todolistId2 = v1();

const initialGlobalState: AppRootStateType = {
	todolists: [
		{
			id: "todolistId1",
			title: "What to learn",
			filter: "all",
			addedDate: "",
			order: 0,
			entityStatus: "idle",
		},
		{
			id: "todolistId2",
			title: "What to buy",
			filter: "all",
			addedDate: "",
			order: 0,
			entityStatus: "loading",
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
	app: {
		status: "idle",
		error: null,
		//  error:'some error' 
		isInitialized:false 
	},
	authMe: { isLoggedIn: false },
}

export const storyBookStore = createStore(
	rootReducer,
	initialGlobalState,
	applyMiddleware(thunkMiddleware)
	// initialGlobalState as AppRootStateType
)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
	return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
