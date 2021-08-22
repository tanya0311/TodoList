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
import { useSelector } from "react-redux"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import "./App.css"
import { ErrorSnackbar } from "./components/ErrorSnackbar/ErrorSnackbar"
import { RequestStatusType } from "./state/app-reducer"
import { AppRootStateType } from "./state/store"
import { TodolistsList } from "./components/TodolistsList/TodolistsList"
import { Login } from "./features/Login/Login"

type AppType = {
	demo?: boolean // для storybook
}

function AppWithRedux({ demo = false }: AppType) {
	const status = useSelector<AppRootStateType, RequestStatusType>(
		(state) => state.app.status
	)

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
						<Button color='inherit'>Login</Button>
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
