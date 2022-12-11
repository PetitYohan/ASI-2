/*
 * action types
 */
export const UPDATE_CARDS = "CARD:UPDATE_CARDS"
export const UPDATE_CARD = "CARD:UPDATE_CARD"
export const UPDATE_USER = "USER:UPDATE_USER"
export const UPDATE_CHAT_SELECTED_RECIPIENT = "CHAT:UPDATE_SELECTED_RECIPIENT"
export const UPDATE_CHAT_RECIPIENTS = "CHAT:UPDATE_RECIPIENTS"
export const APPEND_CHAT_RECIPIENT_MESSAGE = "CHAT:APPEND_NEW_MESSAGE"
export const SOCKET_CONNECT = "SOCKET:CONNECT"
export const SOCKET_SEND = "SOCKET:SEND"
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
export function setSelectedChatRecipient(selectedRecipient) {
	return { type: UPDATE_CHAT_SELECTED_RECIPIENT, selectedRecipient }
}
export function setChatRecipients(recipients, user) {
	console.log("setting recipients : " + JSON.stringify(recipients))
	return { type: UPDATE_CHAT_RECIPIENTS, recipients }
}

export function connectSocket(user) {
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
