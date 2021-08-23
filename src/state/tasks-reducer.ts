import { Dispatch } from "redux"
import {
	TaskStatuses,
	TaskType,
	todolistAPI,
	UpdateTaskModelType,
} from "../api/todolist-api"
import {
	handleServerAppError,
	handleServerNetworkError,
} from "../utils/error-utils"
import {
	AppActionsType,
	RequestStatusType,
	setAppStatusAC,
} from "./app-reducer"
import { AppRootStateType } from "./store"
import {
	AddTLACType,
	RemoveTLACType,
	SetTodolistsACType,
} from "./todolists-reducer"
import { AxiosError } from "axios"
import { Task1Type } from "../components/TodolistsList/TodolistsList"

const initialState: Task1Type = {}

export const tasksReducer = (
	stateTasks: Task1Type = initialState,
	action: ActionType
): Task1Type => {
	switch (action.type) {
		case "SET-TASKS": {
			const stateCopy = { ...stateTasks }
			stateCopy[action.todolistId] = action.tasks
			return stateCopy
			// return {...stateTasks, [action.todolistId]:action.tasks};
		}
		case "SET-TODOLISTS": {
			const stateCopy = { ...stateTasks }
			action.todolists.forEach((tl) => {
				stateCopy[tl.id] = []
			})
			return stateCopy
		}

		case "REMOVE-TASKS": {
			let copyStateTasks = { ...stateTasks }
			copyStateTasks[action.todolistId] = copyStateTasks[
				action.todolistId
			].filter((t) => t.id !== action.taskId)
			return copyStateTasks
		}
		case "ADD-TASKS": {
			const stateCopy = { ...stateTasks }
			const tasks = stateCopy[action.task.todoListId]
			const newTasks = [action.task, ...tasks]
			stateCopy[action.task.todoListId] = newTasks
			return stateCopy
		}
		case "CHANGE-TASKS-STATUS": {
			let copyStateTasks = { ...stateTasks }
			let updateTask = copyStateTasks[action.todolistId].map((t) =>
				t.id === action.taskId ? { ...t, status: action.status } : t
			)
			return { ...stateTasks, [action.todolistId]: updateTask }
		}
		case "CHANGE-TASKS-TITLE": {
			let copyStateTasks = { ...stateTasks }
			let updateTask = copyStateTasks[action.todolistId].map((t) =>
				t.id === action.taskId ? { ...t, title: action.title } : t
			)
			return { ...stateTasks, [action.todolistId]: updateTask }
		}
		case "ADD-TODOLIST": {
			return { ...stateTasks, [action.todolist.id]: [] }
		}
		case "REMOVE-TODOLIST": {
			let copyStateTasks = { ...stateTasks }
			delete copyStateTasks[action.todolistId]
			return copyStateTasks
		}
		case "CHANGE-TASK-ENTITY-STATUS": {
			let copyStateTasks = { ...stateTasks }
			let entityStatusTask = copyStateTasks[action.todolistId].map((el) =>
				el.id === action.taskId ? { ...el, entityStatus: action.status } : el
			)
			return { ...stateTasks, [action.todolistId]: entityStatusTask }
		}
		default:
			return stateTasks
	}
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
	return {
		type: "REMOVE-TASKS" as const,
		taskId,
		todolistId,
	}
}
export const addTaskAC = (task: TaskType) => {
	return {
		type: "ADD-TASKS" as const,
		task,
	}
}

export const changeTaskStatusAC = (
	taskId: string,
	status: TaskStatuses,
	todolistId: string
) => {
	return {
		type: "CHANGE-TASKS-STATUS" as const,
		taskId,
		status,
		todolistId,
	}
}

export const changeTaskTitleAC = (
	taskId: string,
	title: string,
	todolistId: string
) => {
	return {
		type: "CHANGE-TASKS-TITLE" as const,
		taskId,
		title,
		todolistId,
	}
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
	return { type: "SET-TASKS", tasks, todolistId } as const
}

export const changeTaskEntitySatatusAC = (
	todolistId: string,
	taskId: string,
	status: RequestStatusType
) => ({
	type: "CHANGE-TASK-ENTITY-STATUS" as const,
	todolistId,
	taskId,
	status,
})

// thunks
export const fetchTasksTC = (todolistId: string) => {
	return (dispatch: Dispatch<ActionType>) => {
		dispatch(setAppStatusAC("loading"))
		todolistAPI
			.getTasks(todolistId)
			.then((res) => {
				const tasks = res.data.items
				dispatch(setTasksAC(tasks, todolistId))
				dispatch(setAppStatusAC("succeeded"))
			})
			.catch((error: AxiosError) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const deleteTasksTC = (taskId: string, todolistId: string) => {
	return (dispatch: Dispatch<ActionType>) => {
		dispatch(setAppStatusAC("loading"))
		todolistAPI
			.deleteTask(todolistId, taskId)
			.then((res) => {
				dispatch(removeTaskAC(taskId, todolistId))
				dispatch(setAppStatusAC("succeeded"))
			})
			.catch((error: AxiosError) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const addTasksTC = (title: string, todolistId: string) => {
	return (dispatch: Dispatch<ActionType>) => {
		dispatch(setAppStatusAC("loading"))
		todolistAPI
			.createTasks(todolistId, title)
			.then((res) => {
				if (res.data.resultCode === 0) {
					let task = res.data.data.item
					dispatch(addTaskAC(task))
					dispatch(setAppStatusAC("succeeded"))
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const changeTaskStatusTC = (
	taskId: string,
	status: TaskStatuses,
	todolistId: string
) => {
	return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
		let state = getState()
		const allTasksFromState = getState().tasks
		const tasksForCurrentTodolist = allTasksFromState[todolistId]
		const updateTask = tasksForCurrentTodolist.find((t) => {
			return t.id === taskId
		})
		if (updateTask) {
			// const model: UpdateTaskModelType = { ...updateTask, status };
			const model: UpdateTaskModelType = {
				title: updateTask.title,
				startDate: updateTask.startDate,
				priority: updateTask.priority,
				description: updateTask.description,
				deadline: updateTask.deadline,
				status: status,
			}
			dispatch(setAppStatusAC("loading"))
			todolistAPI
				.updateTask(todolistId, taskId, model)
				.then((res) => {
					const newTask = res.data.data.item
					dispatch(
						changeTaskStatusAC(newTask.id, newTask.status, newTask.todoListId)
					)
					dispatch(setAppStatusAC("succeeded"))
				})
				.catch((error: AxiosError) => {
					handleServerNetworkError(error, dispatch)
				})
		}
	}
}

export const changeTaskTitleTC = (
	taskId: string,
	title: string,
	todolistId: string
) => {
	return (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {
		let state = getState()
		const allTasksFromState = getState().tasks
		const tasksForCurrentTodolist = allTasksFromState[todolistId]
		const updateTask = tasksForCurrentTodolist.find((t) => {
			return t.id === taskId
		})
		if (updateTask) {
			const model: UpdateTaskModelType = {
				title: title,
				startDate: updateTask.startDate,
				priority: updateTask.priority,
				description: updateTask.description,
				deadline: updateTask.deadline,
				status: updateTask.status,
			}
			dispatch(setAppStatusAC("loading"))
			todolistAPI
				.updateTask(todolistId, taskId, model)
				.then((res) => {
					if (res.data.resultCode === 0) {
						const newTask = res.data.data.item
						dispatch(
							changeTaskTitleAC(newTask.id, newTask.title, newTask.todoListId)
						)
						dispatch(setAppStatusAC("succeeded"))
					} else {
						handleServerAppError(res.data, dispatch)
					}
				})
				.catch((error: AxiosError) => {
					handleServerNetworkError(error, dispatch)
				})
		}
	}
}

// type  dispatch actions
export type RemoveTasksACType = ReturnType<typeof removeTaskAC>
export type AddTasksACType = ReturnType<typeof addTaskAC>
export type ChangeStatusTasksACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeStatusitleACType = ReturnType<typeof changeTaskTitleAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type ChangeTaskEntitySatatusACType = ReturnType<
	typeof changeTaskEntitySatatusAC
>

export type ActionType =
	| RemoveTasksACType
	| AddTasksACType
	| ChangeStatusTasksACType
	| ChangeStatusitleACType
	| AddTLACType
	| RemoveTLACType
	| SetTodolistsACType
	| SetTasksActionType
	| AppActionsType
	| ChangeTaskEntitySatatusACType
