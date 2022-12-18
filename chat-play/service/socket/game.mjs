import { joinRoom, disconnectRoom } from "../composants/gestionRoom.mjs"
import { attack } from "../composants/maitreDeJeu.mjs"

export const GameSocketIO = (io, socket) => {
	//Sur appui join room
	joinRoom(socket, io)

	//Sur appui fin de game
	disconnectRoom(socket)

	//Sur appui attack
	socket.on("attack", (cards) => {
		const cardAlly = cards[0]
		const cardEnemy = cards[1]
		attack(socket, io, cardAlly, cardEnemy)
	})
}
