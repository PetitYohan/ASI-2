import { events } from "./event.mjs"

export const ChatSocketIO = (io, socket, messageStore) => {
	//TODO replace session store with chat back microservice rest call

	// forward the private message to the right recipient (and to other tabs of the sender)
	socket.on(events.NEW_MESSAGE, ({ content, to }) => {
		console.log("new message from " + socket.userId)
		const message = {
			content,
			from: socket.userId,
			to,
			timestamp: Date.now(),
		}
		// si utilisation de map de correspondance : .to(to).to(socket.userId) => .to(sockeUsers[to]).to(socket.id)
		io.to([to, socket.userId]).emit(events.NEW_MESSAGE, message)
		messageStore.saveMessage(message)
		console.log("saved new message : " + JSON.stringify(message))
	})
}
