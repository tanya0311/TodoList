import {
	AppBar,
	Button,
	Container,
	IconButton,
	LinearProgress,
	Toolbar,
	Typography,
} from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import "./App.css"
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar"
import { initializeAppTC, RequestStatusType } from "./state/app-reducer"
import { AppRootStateType } from "./state/store"
import { TodolistsList } from "./components/TodolistsList/TodolistsList"
import { Login } from "./features/Login/Login"
import { useEffect } from "react"
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"
import { logoutTC } from "./state/auth-reduser"

type AppType = {
	demo?: boolean // для storybook
}

function AppWithRedux({ demo = false }: AppType) {
	const status = useSelector<AppRootStateType, RequestStatusType>(
		(state) => state.app.status
	)
  const isInitialized=useSelector<AppRootStateType, boolean>(state=> state.app.isInitialized)
  const isLoggedIn=useSelector<AppRootStateType, boolean>(state=> state.authMe.isLoggedIn)
  const dispath = useDispatch()

  useEffect( ()=> {
    dispath(initializeAppTC ())
  },[])

  const logoutHandler= ()=>{
    dispath(logoutTC())
  }
  if (!isInitialized) {
    return <div
        style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <CircularProgress/>
    </div>
 }
	return (
		<BrowserRouter>
			<div className='App'>
				<ErrorSnackbar />
				<AppBar position='static'>
					<Toolbar>
						<IconButton edge='start' color='inherit' aria-label='menu'>
							<Menu />
						</IconButton>
						<Typography variant='h6'>News</Typography>
            { isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
					</Toolbar>
					{status === "loading" && <LinearProgress color='secondary' />}
				</AppBar>

				<Container fixed>
					<Switch>
						<Route
							exact
							path={"/"}
							render={() => <TodolistsList demo={demo} />}
						/>
						<Route path={"/login"} render={() => <Login />} />

						<Route path={"/404"} render={() => <h1>404: PAGE NOT FOUND</h1>} />
						<Redirect from={"*"} to={"/404"} />
					</Switch>
				</Container>
			</div>
		</BrowserRouter>
	)
}

export default AppWithRedux
