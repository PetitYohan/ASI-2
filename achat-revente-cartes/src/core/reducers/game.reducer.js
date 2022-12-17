const initialState = {
	enemyCards: [],
	myCards: [],
	room: { players: [{ id: null }, { id: null }] },
	gameStart: false,
	myCard: 0,
	enemyCard: 0,
	myPlayer: 0,
	playerTurn: "",
}

/**
 * Reducer
 */
const gameReducer = (state = initialState, action) => {
	switch (action.type) {
		//TODO
		default:
			return state
	}
}

export default gameReducer
