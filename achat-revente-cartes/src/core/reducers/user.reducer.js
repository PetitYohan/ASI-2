import { UPDATE_USER } from "../actions"

const initialState = {
	user: {},
}

/**
 * Reducer
 */
const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_USER:
			return {
				...state,
				user: action.user,
			}
		default:
			return state
	}
}

export default userReducer
