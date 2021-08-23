import { Dispatch } from "redux"
import { authAPI } from "../api/auth-api"
import { setIsLoggedInAC, SetIsLoggedInACType } from "./auth-reduser"

const initialState = {
	status: "loading" as RequestStatusType,
	error: null as string | null,
	isInitialized: false,
}

export const appReducer = (
	state: InitialStateType = initialState,
	action: AppActionsType
): InitialStateType => {
	switch (action.type) {
		case "APP/SET-STATUS":
			return { ...state, status: action.status }
		case "APP/SET-ERROR":
			return { ...state, error: action.error }
		case "APP/IS-INITIALIZED":
			return { ...state, isInitialized: action.isInitialized }
		default:
			return state
	}
}

// actions
export const setAppErrorAC = (error: string | null) => ({
	type: "APP/SET-ERROR" as const,
	error,
})
export const setAppStatusAC = (status: RequestStatusType) => ({
	type: "APP/SET-STATUS" as const,
	status,
})
export const isInitializedAC = (isInitialized: boolean) =>
	({ type: "APP/IS-INITIALIZED", isInitialized } as const)

// thunk
export const initializeAppTC = () => (dispatch: Dispatch<AppActionsType>) => {
	authAPI
		.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
			} else {
			}
		})
		.finally(() => {
			dispatch(isInitializedAC(true))
			// dispatch(setAppStatusAC("succeeded"));
		})
}
// type state
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = typeof initialState

// type  dispatch
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type isInitializedACType = ReturnType<typeof isInitializedAC>

export type AppActionsType =
	| SetAppErrorACType
	| SetAppStatusACType
	| isInitializedACType
	| SetIsLoggedInACType
