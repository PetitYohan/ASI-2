import { applyMiddleware, combineReducers } from "redux"
import { createStore } from "redux"
import cardReducer from "./reducers/card.reducer"
import userReducer from "./reducers/user.reducer"
import chatReducer from "./reducers/chat.reducer"
import { socketMiddleware } from "./middleware"

const globalReducer = combineReducers({
	cardState: cardReducer,
	userState: userReducer,
	chatState: chatReducer,
})

const store = createStore(globalReducer, applyMiddleware(socketMiddleware))

export default store
