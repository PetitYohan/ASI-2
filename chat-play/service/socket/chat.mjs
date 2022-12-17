import crypto from "crypto"
import InMemorySessionStore from "./sessionStore.mjs"
import InMemoryMessageStore from "./messageStore.mjs"
import { events } from "./event.mjs"

export default {
	ChatSocketIO: (io) => {
		const randomId = () => crypto.randomBytes(8).toString("hex")

		const sessionStore = new InMemorySessionStore()
		const messageStore = new InMemoryMessageStore()

		io.use((socket, next) => {
			console.log(socket.handshake.auth)
			if (!socket.handshake.auth.user) {
				return next(new Error("invalid user"))
			}
			const user = socket.handshake.auth.user
			console.log(user)
			//TODO validate auth token avec call vers backend spring que token user == user
			const userId = user.idUser
			const username = user.login
			const session = sessionStore.findSession(userId)
			if (session) {
				socket.userId = session.userId
				socket.username = session.username
				return next()
			}
			if (!username) {
				return next(new Error("invalid username"))
			}
			socket.userId = userId
			socket.username = username
			next()
		})

		io.on(events.CONNECTION, (socket) => {
			console.log("new socket :" + socket)
			// persist session
			sessionStore.saveSession(socket.userId, {
				userId: socket.userId,
				username: socket.username,
				connected: true,
			})

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

			// forward the private message to the right recipient (and to other tabs of the sender)
			socket.on(events.NEW_MESSAGE, ({ content, to }) => {
				console.log("new message from " + socket.userId)
				const message = {
					content,
					from: socket.userId,
					to,
				}
				socket.to(to).to(socket.userId).emit(events.NEW_MESSAGE, message)
				messageStore.saveMessage(message)
			})

			// notify users upon disconnection
			socket.on(events.DISCONNECT, async () => {
				const matchingSockets = await io.in(socket.userId).allSockets()
				const isDisconnected = matchingSockets.size === 0
				console.log("disconnect of " + socket.id)
				if (isDisconnected) {
					console.log("notify disconnect of " + socket.id)
					socket.broadcast.emit(events.USER_DISCONNECTED, socket.userId)
					sessionStore.saveSession(socket.userId, {
						userId: socket.userId,
						username: socket.username,
						connected: false,
					})
				}
			})
		})
	},
}
