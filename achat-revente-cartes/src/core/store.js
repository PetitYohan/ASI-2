import { applyMiddleware, combineReducers, compose } from "redux"
import { createStore } from "redux"
import cardReducer from "./reducers/card.reducer"
import userReducer from "./reducers/user.reducer"
import chatReducer from "./reducers/chat.reducer"
import gameReducer from "./reducers/game.reducer"

const globalReducer = combineReducers({
	cardState: cardReducer,
	userState: userReducer,
	chatState: chatReducer,
	gameState: gameReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(globalReducer, composeEnhancers())

export default store
