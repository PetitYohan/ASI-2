export const selectCards = (state) => state.cardState.cards
export const selectCard = (state) => state.cardState.card
export const selectUser = (state) => state.userState.user
export const selectSelectedChatRecipient = (state) =>
	state.chatState.selectedRecipient
export const selectConnectedRecipients = (state) =>
	state.chatState.recipients.filter((r) => r.connected === true)
export const selectChatRecipients = (state) => state.chatState.recipients
