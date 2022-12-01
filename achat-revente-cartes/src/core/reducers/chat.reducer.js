import { UPDATE_SELECTED_RECIPIENT, UPDATE_RECIPIENTS } from "../actions"

const initialState = {
	recipients: [],
	selectedRecipient: { messages: [] },
}

/**
 * Reducer
 */
const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_SELECTED_RECIPIENT:
			return {
				...state,
				selectedRecipient: action.selectedRecipient,
			}
		case UPDATE_RECIPIENTS:
			return {
				...state,
				recipients: action.recipients, //TODO quel structure ? pour l'instant map (otherUser -> messages) + order by timestamp asc !
			}
		default:
			return state
	}
}

export default chatReducer
