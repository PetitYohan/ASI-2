import { SocketContext, socket } from "./socket"
import Chat from "./components/Chat"

//TODO merge with card front
const App = () => {
	return (
		<SocketContext.Provider value={socket}>
			<App />
		</SocketContext.Provider>
	)
}
