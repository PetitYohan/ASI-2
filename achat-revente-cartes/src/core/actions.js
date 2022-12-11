/*
 * action types
 */
export const UPDATE_CARDS = "UPDATE_CARDS"
export const UPDATE_CARD = "UPDATE_CARD"
export const UPDATE_USER = "UPDATE_USER"
export const UPDATE_SELECTED_RECIPIENT = "UPDATE_SELECTED_RECIPIENT"
export const UPDATE_RECIPIENTS = "UPDATE_RECIPIENTS"
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
	return { type: UPDATE_SELECTED_RECIPIENT, selectedRecipient }
}
export function setChatRecipients(recipients, socket) {
	const newRecipients = []
	recipients.forEach((user) => {
		user.messages.forEach((message) => {
			message.fromSelf = message.from === socket.user.userID
		})
		for (let i = 0; i < recipients.length; i++) {
			const existingUser = recipients[i]
			if (existingUser.userID === user.userID) {
				existingUser.connected = user.connected
				existingUser.messages = user.messages
				break
			}
		}
		user.self = user.userID === socket.user.userID
		newRecipients.push(user)
	})
	// put the current user first, and sort by username
	//newRecipients.sort((a, b) => {
	//	if (a.self) return -1
	//	if (b.self) return 1
	//	if (a.username < b.username) return -1
	//	return a.username > b.username ? 1 : 0
	//})
	return { type: UPDATE_RECIPIENTS, recipients : newRecipients }
}
