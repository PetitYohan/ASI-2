import { io } from "socket.io-client"
import {
	appendReceiveMessage,
	appendSentMessage,
	chatRecipientConnected,
	chatRecipientDisconnected,
	initChatRecipients,
	SOCKET_CONNECT,
	SOCKET_SEND,
} from "./actions"
import { events } from "./service/socket/event"

const URL = "http://127.0.0.1:3000"
//TODO test
var socket = null

export const socketMiddleware = (store) => (next) => (action) => {
	switch (action.type) {
		// User request to connect
		case SOCKET_CONNECT:
			// Configure the object
			console.log(action.user)
			socket = io(URL, {
				auth: { user: action.user },
			})
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
				store.dispatch(initChatRecipients(users))
			})

			socket.on(events.USER_CONNECTED, (user) => {
				store.dispatch(chatRecipientConnected(user))
			})
			socket.on(events.USER_DISCONNECTED, (user) => {
				store.dispatch(chatRecipientDisconnected(user))
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
