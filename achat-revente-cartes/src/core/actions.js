/*
 * action types
 */
export const UPDATE_CARDS = "UPDATE_CARDS";
export const UPDATE_CARD = "UPDATE_CARD";
export const UPDATE_USER = "UPDATE_USER";
/*
 * action creators
 */
export function setCards(cards) {
  return { type: UPDATE_CARDS, cards };
}
export function setSelectedCard(card) {
  return { type: UPDATE_CARD, card };
}
export function setUser(user) {
  return { type: UPDATE_USER, user };
}
