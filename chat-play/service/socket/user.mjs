import { events } from "./event.mjs"

export const UserSocketIO = (socket, sessionStore, messageStore) => {
	socket.on(events.LOGIN, (user) => {
		// utiliser map de correspondance si problématique avec les id de room de jeu

		//TODO validate auth token avec call vers backend spring que token user == user
		const userId = user.idUser
		const username = user.login
		const session = sessionStore.findSession(userId)
		if (session) {
			socket.userId = session.userId
			socket.username = session.username
		} else {
			socket.userId = userId
			socket.username = username
		}
		sessionStore.saveSession(socket.userId, {
			userId: socket.userId,
			username: socket.username,
			connected: true,
		})
		socket.join(socket.userId)

		// fetch existing users
		const users = []
		const messagesPerUser = new Map()
		messageStore.findMessagesForUser(socket.userId).forEach((message) => {
			const { from, to } = message
			const otherUser = socket.userId === from ? to : from
			if (messagesPerUser.has(otherUser)) {
				messagesPerUser.get(otherUser).push(message)
			} else {
				messagesPerUser.set(otherUser, [message])
			}
		})

		sessionStore.findAllSessions().forEach((session) => {
			users.push({
				userId: session.userId,
				username: session.username,
				connected: session.connected,
				messages: messagesPerUser.get(session.userId) || [],
			})
		})

		socket.emit(events.USERS, users)

		// notify existing users
		socket.broadcast.emit(events.USER_CONNECTED, {
			userId: socket.userId,
			username: socket.username,
			connected: true,
			messages: [],
		})
	})

	socket.on(events.DISCONNECT, () => {
		if (socket.userId) {
			console.log("socket disc : " + socket.id)
			socket.broadcast.emit(events.USER_DISCONNECTED, socket.userId)
			sessionStore.saveSession(socket.userId, {
				userId: socket.userId,
				username: socket.username,
				connected: false,
			})
		}
		socket.leave(socket.userId)
	})
}
