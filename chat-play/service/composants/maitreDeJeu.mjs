import { rooms } from "./gestionRoom.mjs"

export function attack(socket, io, cardAlly, cardEnemy) {
	let enemy
	let me
	//TODO use a map instead ?
	let room = rooms.findIndex(
		(room) =>
			room.players[0].id === socket.id || room.players[1].id === socket.id
	)

	if (room !== -1) {
		let players = rooms[room].players

		//TODO === ?
		if (players[0].id == socket.id) {
			const attack = doAttack(players[0], players[1], cardAlly, cardEnemy)
			players[0] = attack.myPlayer
			players[1] = attack.enemyPlayer
			me = players[0]
			enemy = players[1]
		} else if (players[1].id == socket.id) {
			const attack = doAttack(players[1], players[0], cardAlly, cardEnemy)
			players[1] = attack.myPlayer
			players[0] = attack.enemyPlayer
			me = players[1]
			enemy = players[0]
		}
	}

	//TODO .map(_.hp).reduce(sum)
	if (
		enemy.cards[0].hp +
			enemy.cards[1].hp +
			enemy.cards[2].hp +
			enemy.cards[3].hp +
			enemy.cards[4].hp ==
		0
	) {
		io.to(rooms[room].RoomId).emit("AttackDone", rooms[room])
		io.to(rooms[room].RoomId).emit("AndTheWinnerIs", me.id)
	} else {
		if (me.energy <= 0) {
			io.to(rooms[room].RoomId).emit("turnOf", enemy.id)
			enemy.energy = 2
		}
		io.to(rooms[room].RoomId).emit("AttackDone", rooms[room])
	}
}

function doAttack(myPlayer, enemyPlayer, cardAlly, cardEnemy) {
	if (myPlayer.energy >= 1) {
		let enemyCard = enemyPlayer.cards.find((card) => card.id == cardEnemy)
		let myCard = myPlayer.cards.find((card) => card.id == cardAlly)
		enemyCard.hp = enemyCard.hp - myCard.attack
		if (enemyCard.hp < 0) {
			enemyCard.hp = 0
		}
		myPlayer.energy = myPlayer.energy - 1
	}
	return { myPlayer, enemyPlayer }
}
