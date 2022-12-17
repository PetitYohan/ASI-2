import store from "../store"
import { initChatRecipients } from "../actions"

//TODO delete ou move dans middleware

export const events = {
	CONNECT: "connect",
	DISCONNECT: "disconnect",
	LOGIN: "login",
	USERS: "users",
	USER_CONNECTED: "user_connected",
	USER_DISCONNECTED: "user disconnected",
	NEW_MESSAGE: "new_message",
}

export function registerBaseEvents(socket) {
	socket.on(events.CONNECT, (data) => {
		console.log("socket connected")
		registerChatEvents(socket)
		//store.dispatch(events.CONNECT, data)
	})
	socket.on(events.DISCONNECT, (data) => {
		console.log("socket disconnected")
		//store.dispatch(events.DISCONNECT, data)
	})
}

export function registerChatEvents(socket) {
	socket.on(events.USERS, (users) => {
		store.dispatch(initChatRecipients(users, socket))
	})
	socket.on(events.USER_CONNECTED, (data) => {
		console.log("socket USER_CONNECTED : " + data)
		//store.dispatch(events.USER_CONNECTED, data)
	})
	socket.on(events.USER_DISCONNECTED, (data) => {
		console.log("socket USER_DISCONNECTED : " + data)
		//store.dispatch(events.USER_DISCONNECTED, data)
	})
	socket.on(events.NEW_MESSAGE, (message) => {
		console.log("socket NEW_MESSAGE : " + message)
		//store.dispatch(events.NEW_MESSAGE, data)
	})
}
