import {
	UPDATE_CHAT_SELECTED_RECIPIENT,
	INIT_CHAT_RECIPIENTS,
	APPEND_CHAT_RECIPIENT_MESSAGE,
	UPSERT_CHAT_RECIPIENT,
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
			const recipientToSelect = state.recipients.find(
				(r) => r.id === action.selectedRecipientId
			)
			//|| initialState.selectedRecipient
			console.log(recipientToSelect)
			return {
				...state,
				selectedRecipient: recipientToSelect,
			}
		case INIT_CHAT_RECIPIENTS:
			return {
				...state,
				recipients: action.recipients, //TODO quel structure ? pour l'instant map (otherUser -> messages) + order by timestamp asc !
			}
		case UPSERT_CHAT_RECIPIENT:
			if (state.recipients.find((r) => r.userId === action.recipient.userId)) {
				const update_list = state.recipients.map((r) => {
					if (r.userId === action.recipient.userId) {
						return { ...r, connected: action.recipient.connected }
					} else {
						return r
					}
				})
				return {
					...state,
					recipients: update_list,
				}
			} else {
				return {
					...state,
					recipients: [...state.recipients, action.recipients],
				}
			}

		//TODO test
		case APPEND_CHAT_RECIPIENT_MESSAGE:
			const new_recipients_list = state.recipients.map((r) => {
				if (action.payload.recipient === r.userId) {
					const messages = [...r.messages, action.payload.content]
					return { ...r, messages }
				} else {
					return r
				}
			})
			return {
				...state,
				recipients: new_recipients_list,
			}
		default:
			return state
	}
}

export default chatReducer
