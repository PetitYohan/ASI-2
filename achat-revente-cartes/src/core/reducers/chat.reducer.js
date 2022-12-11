import {
	UPDATE_CHAT_SELECTED_RECIPIENT,
	UPDATE_CHAT_RECIPIENTS,
	APPEND_CHAT_RECIPIENT_MESSAGE,
} from "../actions"

const initialState = {
	recipients: [],
	selectedRecipient: { messages: [] },
}

/**
 * Reducer
 */
const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CHAT_SELECTED_RECIPIENT:
			return {
				...state,
				selectedRecipient: action.selectedRecipient,
			}
		case UPDATE_CHAT_RECIPIENTS:
			return {
				...state,
				recipients: action.recipients, //TODO quel structure ? pour l'instant map (otherUser -> messages) + order by timestamp asc !
			}
		case APPEND_CHAT_RECIPIENT_MESSAGE:
			return {
				...state,
				recipients: state.recipients.map((r) => {
					if (action.payload.recipient === r.username) {
						const messages = [...r.messages, action.payload.message]
						return { ...r, messages }
					} else {
						return r
					}
				}),
			}
		default:
			return state
	}
}

export default chatReducer
