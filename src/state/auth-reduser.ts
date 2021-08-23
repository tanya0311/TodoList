import { Dispatch } from "redux"
import { authAPI, LoginType } from "../api/auth-api"
import {
	handleServerAppError,
	handleServerNetworkError,
} from "../utils/error-utils"
import {
	SetAppErrorACType,
	setAppStatusAC,
	SetAppStatusACType,
} from "./app-reducer"

const initialState = {
	isLoggedIn: false,
}

export const authReducer = (
	state: InitialStateType = initialState,
	action: ActionsType
): InitialStateType => {
	switch (action.type) {
		case "login/SET-IS-LOGGED-IN":
			return { ...state, isLoggedIn: action.value }
		default:
			return state
	}
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
	({ type: "login/SET-IS-LOGGED-IN", value } as const)

// thunks
export const loginTC = (data: LoginType) => (
	dispatch: Dispatch<ActionsType>
) => {
	dispatch(setAppStatusAC("loading"))
	authAPI
		.login(data)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
				dispatch(setAppStatusAC("succeeded"))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
	dispatch(setAppStatusAC("loading"))
	authAPI
		.logout()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatusAC("succeeded"))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

// types
type InitialStateType = typeof initialState

export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

type ActionsType = SetIsLoggedInACType | SetAppStatusACType | SetAppErrorACType
