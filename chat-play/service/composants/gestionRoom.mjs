//Initialisaion de la waiting list
const waitingList = []
export const rooms = []

export function joinRoom(socket, io) {
	socket.on("joinRoom", (userCards) => {
		waitingList.push({ userSocket: socket, cards: userCards })

		if (waitingList.length > 1) {
			const user1 = waitingList.pop()
			const user2 = waitingList.pop()

			const room = user1.userSocket.id + "#" + user2.userSocket.id

			socket.join(room)

			const u1 = {
				id: user1.userSocket.id,
				energy: 2,
				cards: user1.cards,
				room: room,
			}
			const u2 = {
				id: user2.userSocket.id,
				energy: 2,
				cards: user2.cards,
				room: room,
			}

			user2.userSocket.join(room)

			const roomCreated = { RoomId: room, players: [u1, u2] }

			rooms.push(roomCreated)

			io.to(room).emit("message", function (data) {
				console.log(`${u2.id} has joined the room`)
			})
			io.to(room).emit("roomCreated", roomCreated)
			io.to(room).emit("turnOf", u2.id)
		}
	})
}

export function disconnectRoom(socket) {
	//Handle disconnect
	socket.on("disconnectRoom", () => {
		//Remove the disconnected user from the users list
		let room = rooms.findIndex(
			(room) =>
				room.players[0].id === socket.id || room.players[1].id === socket.id
		)
		if (room !== -1) {
			//Notify the last user
			console.log(socket.id + " abandonne")
			//Remove the room from roomList
			rooms.splice(room, 1)
		}
	})
}
