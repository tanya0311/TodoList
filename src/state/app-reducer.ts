export const appReducer = (
  state: InitialStateType = initialState,
  action: AppActionsType
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

// actions
export const setAppErrorAC = (error: string | null) => ({
  type: "APP/SET-ERROR" as const,
  error,
});
export const setAppStatusAC = (status: RequestStatusType) => ({
  type: "APP/SET-STATUS" as const,
  status,
});

// type state
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "loading" as RequestStatusType,
  error: null as string | null,
};

export type InitialStateType = typeof initialState;

// type  dispatch
export type AppActionsType = SetAppErrorACType | SetAppStatusACType;

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>;
