import { io } from "socket.io-client"
import { events } from "./event"

const URL = "http://localhost:3000"

export const socket = io(URL) //TODO path avec reverse-proxy

/* socket.onAny((event, ...args) => {
	console.log(event, args)
}) */

socket.on(events.CONNECT, () => console.log("socket connected"))
