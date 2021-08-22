import { appReducer } from './app-reducer';
import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todolists-reducer';
import {combineReducers, createStore} from 'redux';
import { applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './auth-reduser';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
   tasks: tasksReducer,
   todolists: todoListReducer,
   app: appReducer,
   authMe: authReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;