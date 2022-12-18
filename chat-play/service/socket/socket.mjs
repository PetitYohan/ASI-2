import { ChatSocketIO } from "./chat.mjs"
import { GameSocketIO } from "./game.mjs"
import InMemorySessionStore from "../store/sessionStore.mjs"
import InMemoryMessageStore from "../store/messageStore.mjs"
import { events } from "./event.mjs"
import { UserSocketIO } from "./user.mjs"
import { Server } from "socket.io"

//TODO déplacer dans userservice
const sessionStore = new InMemorySessionStore()
//TODO déplacer dans chatservice
const messageStore = new InMemoryMessageStore()

export const socketServer = (httpServer) => {
	const io = new Server(httpServer, {
		cors: { origin: "*" },
	})

	io.on(events.CONNECTION, (socket) => {
		console.log("new socket : " + socket.id)
		UserSocketIO(socket, sessionStore, messageStore)
		ChatSocketIO(io, socket, messageStore)
		GameSocketIO(io, socket)
	})
	//console.log(io)
	return io
}
