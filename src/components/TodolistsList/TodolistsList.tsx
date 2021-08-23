import { Paper } from "@material-ui/core"
import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AddItemForm from "../AddItemForm/AddItemForm"
import { TaskStatuses, TaskType } from "../../api/todolist-api"
import { AppRootStateType } from "../../state/store"
import {
	addTasksTC,
	changeTaskStatusTC,
	changeTaskTitleTC,
	deleteTasksTC,
} from "../../state/tasks-reducer"
import {
	ChangeTLFilterAC,
	changeTodolistTitleTC,
	createTodolistTC,
	deleteTodolistTC,
	fetchTodolistsTC,
	FilterType,
	TodolistDomainType,
} from "../../state/todolists-reducer"
import TodoList from "../Todolist/Todolist"
import Grid from "@material-ui/core/Grid"
import { Redirect } from "react-router-dom"

type TodolistsListType = {
	demo?: boolean // для storybook
}
export type Task1Type = {
	[key: string]: Array<TaskType>
}
export function TodolistsList({ demo = false }: TodolistsListType) {

	let todoList = useSelector<AppRootStateType, Array<TodolistDomainType>>(
		(state) => state.todolists
	)
	let tasks = useSelector<AppRootStateType, Task1Type>((state) => state.tasks)
  const isLoggedIn=useSelector<AppRootStateType, boolean>(state=> state.authMe.isLoggedIn)
	let dispatch = useDispatch()

	useEffect(() => {
		if (demo || !isLoggedIn) {
			return
		}
		dispatch(fetchTodolistsTC())
	}, [])

	const removeTasks = useCallback(
		(id: string, todolistId: string) => {
			let tunk = deleteTasksTC(id, todolistId)
			dispatch(tunk)
		},
		[dispatch]
	)

	const addTask = useCallback((title: string, todolistId: string) => {
		let tunk = addTasksTC(title, todolistId)
		dispatch(tunk)
	}, [])

	const changeTasks = useCallback(
		(id: string, status: TaskStatuses, todolistId: string) => {
			dispatch(changeTaskStatusTC(id, status, todolistId))
		},
		[]
	)

	const changeFilterTL = useCallback(
		(value: FilterType, todolistId: string) => {
			dispatch(ChangeTLFilterAC(todolistId, value))
		},
		[]
	)

	const changeTask1Title = useCallback(
		(id: string, newTitle: string, todolistId: string) => {
			dispatch(changeTaskTitleTC(id, newTitle, todolistId))
		},
		[]
	)

	const addTodolist = useCallback((title: string) => {
		let tunk = createTodolistTC(title)
		dispatch(tunk)
	}, [])

	const removeTodolist = useCallback((todolistId: string) => {
		let tunk = deleteTodolistTC(todolistId)
		dispatch(tunk)
	}, [])
	const changeTodolistTitle = useCallback(
		(todolistId: string, newTitle: string) => {
			dispatch(changeTodolistTitleTC(todolistId, newTitle))
		},
		[]
	)
  if (!isLoggedIn){
    return <Redirect to={'/login'}/>
 }
	return (
		<div className='tlList'>
			<Grid container style={{ padding: "20px" }}>
				<AddItemForm addItem={addTodolist} />
			</Grid>
			<Grid container spacing={9}>
				{todoList.map((tl) => {
					let allTasksTdodList = tasks[tl.id]

					return (
						<Grid item key={tl.id}>
							<Paper style={{ padding: "20px" }}>
								<TodoList
									key={tl.id}
									todolist={tl}
									tasks={allTasksTdodList}
									removeTasks={removeTasks}
									changeFilter={changeFilterTL}
									addTask={addTask}
									changeTasks={changeTasks}
									removeTodolist={removeTodolist}
									changeTask1Title={changeTask1Title}
									changeTodolistTitle={changeTodolistTitle}
									demo={demo}
								/>
							</Paper>
						</Grid>
					)
				})}
			</Grid>
		</div>
	)
}

