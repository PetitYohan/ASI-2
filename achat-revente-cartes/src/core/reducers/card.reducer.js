import { UPDATE_CARD, UPDATE_CARDS } from "../actions";

const initialState = {
  cards: [],
  card: {},
};

/**
 * Reducer
 */
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CARDS:
      return {
        ...state,
        cards: action.cards,
      };
    case UPDATE_CARD:
      return {
        ...state,
        card: action.card,
      };
    default:
      return state;
  }
};

export default cardReducer;
