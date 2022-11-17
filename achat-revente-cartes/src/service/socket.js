import { io } from "socket.io-client"
import { createContext } from "react"
const URL = "http://localhost:3000"
// connect when regisse ok
const socket = io(URL/* , { autoConnect: false } */)

socket.onAny((event, ...args) => {
	console.log(event, args)
})

const SocketContext = createContext();

export {socket, SocketContext}
