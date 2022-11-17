import { io } from "socket.io-client"

const URL = "http://localhost:3000"
const socket = io(URL, { autoConnect: false })

socket.onAny((event, ...args) => {
	console.log(event, args)
})

export const socket = io(URL, { autoConnect: false })
export const SocketContext = React.createContext()
