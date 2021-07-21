// import { setErrorAC, setStatusAC } from '../app/app-reducer';
import { Dispatch } from 'redux';
// import { ResponseType } from '../api/todolists-api';
import { ResponseType } from '../api/todolist-api';
import {  setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from '../state/app-reducer';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
   if (data.messages.length) {
       dispatch(setAppErrorAC(data.messages[0]))
   } else {
       dispatch(setAppErrorAC('Some error occurred'))
   }
   dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
   dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
   dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch< SetAppErrorACType | SetAppStatusACType>