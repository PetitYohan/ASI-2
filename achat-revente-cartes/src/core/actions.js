/*
 * action types
 */
export const UPDATE_CARDS = "@@card/UPDATE_CARDS"
export const UPDATE_CARD = "@@card/UPDATE_CARD"
export const UPDATE_USER = "@@user/UPDATE_USER"
export const UPDATE_CHAT_SELECTED_RECIPIENT = "@@chat/UPDATE_SELECTED_RECIPIENT"
export const INIT_CHAT_RECIPIENTS = "@@chat/INIT_RECIPIENTS"
export const CHAT_RECIPIENT_CONNECTED = "@@chat/RECIPIENT_CONNECTED"
export const CHAT_RECIPIENT_DISCONNECTED = "@@chat/RECIPIENT_DISCONNECTED"
export const APPEND_CHAT_RECIPIENT_MESSAGE = "@@chat/APPEND_NEW_MESSAGE"
export const SOCKET_CONNECT = "@@socket/CONNECT"
export const SOCKET_SEND = "@@socket/SEND"
/*
 * action creators
 */
export function setCards(cards) {
	return { type: UPDATE_CARDS, cards }
}
export function setSelectedCard(card) {
	return { type: UPDATE_CARD, card }
}
export function setUser(user) {
	return { type: UPDATE_USER, user }
}
export function updateSelectedChatRecipient(selectedRecipientId) {
	console.log(
		"updateSelectedChatRecipient : " + JSON.stringify(selectedRecipientId)
	)
	return { type: UPDATE_CHAT_SELECTED_RECIPIENT, selectedRecipientId }
}
export function initChatRecipients(recipients) {
	console.log("initChatRecipients : " + JSON.stringify(recipients))
	return { type: INIT_CHAT_RECIPIENTS, recipients }
}

export function chatRecipientConnected(recipient) {
	console.log("chatRecipientConnected : " + JSON.stringify(recipient))
	return { type: CHAT_RECIPIENT_CONNECTED, recipient }
}

export function chatRecipientDisconnected(recipientId) {
	console.log("chatRecipientDisconnected : " + JSON.stringify(recipientId))
	return { type: CHAT_RECIPIENT_DISCONNECTED, recipientId }
}

export function connectSocket(user) {
	console.log("connectSocket : " + JSON.stringify(user))
	return { type: SOCKET_CONNECT, user }
}

export function sendMessage(payload) {
	console.log("sendMessage : " + JSON.stringify(payload))
	return { type: SOCKET_SEND, payload }
}

export function appendSentMessage(payload) {
	console.log("appendSentMessage : " + JSON.stringify(payload))
	const newpayload = { ...payload, recipient: payload.to }
	return { type: APPEND_CHAT_RECIPIENT_MESSAGE, payload: newpayload }
}

export function appendReceiveMessage(payload) {
	console.log("appendReceiveMessage : " + JSON.stringify(payload))
	const newpayload = { ...payload, recipient: payload.from }
	return { type: APPEND_CHAT_RECIPIENT_MESSAGE, payload: newpayload }
}
