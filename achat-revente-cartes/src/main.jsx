import React from "react"
import ReactDOM from "react-dom/client"
import Auth from "./components/Auth/Auth"
import Home from "./components/Home/Home"
import ErrorPage from "./components/Error/error-page"
import CardTransfert from "./components/CardTransfert/CardTransfert"
import { Provider } from "react-redux"
import store from "./core/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import Chat from "./components/Chat/Chat"
import Game from "./components/Game/Game"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Auth />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/home",
		element: <Home />,
	},
	{
		path: "/buy",
		element: <CardTransfert transac="buy" />,
	},
	{
		path: "/sell",
		element: <CardTransfert transac="sell" />,
	},
	{
		path: "/game",
		element: <Game />,
	},
])
console.log("main")
ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	</Provider>
)
