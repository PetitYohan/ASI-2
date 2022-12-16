import {
	UPDATE_CHAT_SELECTED_RECIPIENT,
	INIT_CHAT_RECIPIENTS,
	APPEND_CHAT_RECIPIENT_MESSAGE,
	CHAT_RECIPIENT_CONNECTED,
	CHAT_RECIPIENT_DISCONNECTED,
} from "../actions"

const initialState = {
	recipients: [],
	selectedRecipientId: undefined,
}

/**
 * Reducer
 */
const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_CHAT_SELECTED_RECIPIENT:
			console.log(action.selectedRecipientId)
			if (state.recipients.find((r) => r.userId == action.selectedRecipientId))
				return {
					...state,
					selectedRecipientId: action.selectedRecipientId,
				}
		case INIT_CHAT_RECIPIENTS:
			return {
				...state,
				recipients: action.recipients, //TODO quel structure ? pour l'instant map (otherUser -> messages) + order by timestamp asc !
			}
		case CHAT_RECIPIENT_CONNECTED:
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
					recipients: [...state.recipients, action.recipient],
				}
			}

		case CHAT_RECIPIENT_DISCONNECTED:
			if (state.recipients.find((r) => r.userId === action.recipientId)) {
				const update_list = state.recipients.map((r) => {
					if (r.userId === action.recipientId) {
						return { ...r, connected: false }
					} else {
						return r
					}
				})
				return {
					...state,
					recipients: update_list,
				}
			}

		case APPEND_CHAT_RECIPIENT_MESSAGE:
			//fromself dirty way
			const recipientId = action.message.fromSelf
				? action.message.to
				: action.message.from
			const new_recipients_list = state.recipients.map((r) => {
				if (recipientId === r.userId) {
					const messages = [...r.messages, action.message]
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
