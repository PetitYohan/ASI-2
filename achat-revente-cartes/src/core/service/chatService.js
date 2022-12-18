import {
	appendMessage,
	chatRecipientConnected,
	chatRecipientDisconnected,
	initChatRecipients,
} from "../actions"
import { selectUser } from "../selectors"
import store from "../store"
import { events } from "./event"
import { socket } from "./socket"

socket.on(events.NEW_MESSAGE, (message) => {
	store.dispatch(appendMessage(message, selectUser(store.getState())?.idUser))
})
socket.on(events.USERS, (users) => {
	store.dispatch(
		initChatRecipients(users, selectUser(store.getState())?.idUser)
	)
})

socket.on(events.USER_CONNECTED, (user) => {
	store.dispatch(chatRecipientConnected(user))
})

socket.on(events.USER_DISCONNECTED, (user) => {
	store.dispatch(chatRecipientDisconnected(user))
})

export const chatService = {
	sendMessage: (message) => socket.emit(events.NEW_MESSAGE, message),
}
