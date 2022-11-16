import { combineReducers } from "redux";
import cardReducer from "./card.reducer";
import userReducer from "./user.reducer";

const globalReducer = combineReducers({
  cardState: cardReducer,
  userState: userReducer,
});

export default globalReducer;
