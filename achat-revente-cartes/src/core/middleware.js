import { io } from "socket.io-client"
import {
	appendReceiveMessage,
	appendSentMessage,
	setChatRecipients,
	SOCKET_CONNECT,
	SOCKET_SEND,
} from "./actions"
import { events } from "./service/socket/event"

const URL = "http://localhost:3000"
//TODO test
var socket = null

export const socketMiddleware = (store) => (next) => (action) => {
	switch (action.type) {
		// User request to connect
		case SOCKET_CONNECT:
			// Configure the object
			socket = io(URL, { query: { user: action.user } })
			socket.onAny((event, ...args) => {
				console.log(event, args)
			})
			// Attach the callbacks
			socket.on("connect", () => console.log("socket connected")) // TODO dispatch(setSocketConnected) ?
			socket.on(events.NEW_MESSAGE, (payload) =>
				store.dispatch(appendReceiveMessage(payload))
			)
			//TODO test if currying works
			socket.on(events.USERS, (users) => {
				store.dispatch(setChatRecipients(users, action.user))
			})

			break

		case SOCKET_SEND:
			//TODO test ack callback
			socket.emit(events.NEW_MESSAGE, action.payload, (callback_payload) =>
				store.dispatch(appendSentMessage(callback_payload))
			)
			break

		case "SOCKET:DISCONNECT":
			socket.disconnect() // TODO dispatch(setSocketDisconnected) ?
			break

		default:
			break
	}

	return next(action)
}
