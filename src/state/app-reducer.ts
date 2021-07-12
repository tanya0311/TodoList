export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState: InitialStateType = {
  // проходит ли сейчас взаимодействие с сервером
  status: "loading" as RequestStatusType,
  // какая-то глобальная ошибка
  // error:  null
  error: null,
};

// export type InitialStateType = typeof initialState;
export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export const setErrorAC = (error: string | null) => ({
  type: "APP/SET-ERROR" as const,
  error,
});
export const setStatusAC = (status: RequestStatusType) => ({
  type: "APP/SET-STATUS" as const,
  status,
});
// для тпипизации fetchTasksTC dispatch 
export type SetErrorACType = ReturnType <typeof setErrorAC > 
export type SetStatusACType = ReturnType <typeof setStatusAC > 
type ActionsType =  SetErrorACType | SetStatusACType ;
