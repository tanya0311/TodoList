// import { setErrorAC, setStatusAC } from '../app/app-reducer';
import { Dispatch } from 'redux';
// import { ResponseType } from '../api/todolists-api';
import { ResponseType } from '../api/todolist-api';
import { setErrorAC, setStatusAC } from '../state/app-reducer';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: any) => {
   if (data.messages.length) {
       dispatch(setErrorAC(data.messages[0]))
   } else {
       dispatch(setErrorAC('Some error occurred'))
   }
   dispatch(setStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: any) => {
   dispatch(setErrorAC(error.message ? error.message : 'Some error occurred'))
   dispatch(setStatusAC('failed'))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>