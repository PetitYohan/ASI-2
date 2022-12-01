import { io } from "socket.io-client"
import { registerBaseEvents } from "./event"
const URL = "http://localhost:3000"
// connect when regisse ok
const socket = io(URL /* , { autoConnect: false } */)

socket.onAny((event, ...args) => {
	console.log(event, args)
})

registerBaseEvents(socket)

export default socket
