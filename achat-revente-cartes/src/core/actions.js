/*
 * action types
 */
export const UPDATE_CARDS = "@@card/UPDATE_CARDS"
export const UPDATE_CARD = "@@card/UPDATE_CARD"
export const UPDATE_USER = "@@user/UPDATE_USER"
export const UPDATE_CHAT_SELECTED_RECIPIENT = "@@chat/UPDATE_SELECTED_RECIPIENT"
export const INIT_CHAT_RECIPIENTS = "@@chat/INIT_RECIPIENTS"
export const UPSERT_CHAT_RECIPIENT = "@@chat/UPSERT_RECIPIENT"
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
	console.log("initChatRecipients : " + JSON.stringify(selectedRecipientId))
	return { type: UPDATE_CHAT_SELECTED_RECIPIENT, selectedRecipientId }
}
export function initChatRecipients(recipients) {
	console.log("initChatRecipients : " + JSON.stringify(recipients))
	return { type: INIT_CHAT_RECIPIENTS, recipients }
}

export function upsertchatRecipient(recipient) {
	console.log("chatRecipientConnected : " + JSON.stringify(recipient))
	return { type: UPSERT_CHAT_RECIPIENT, recipient }
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
