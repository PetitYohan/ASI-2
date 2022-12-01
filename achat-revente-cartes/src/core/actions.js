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
export function setChatRecipients(recipients) {
	console.log("setting recipients : " + JSON.stringify(recipients))
	return { type: UPDATE_RECIPIENTS, recipients }
}
