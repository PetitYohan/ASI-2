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
			//TODO fix duplication si reconnection du meme user
			if (session) {
				socket.sessionID = session.sessionID
				socket.userID = session.userID
				socket.username = session.username
				return next()
			}
			if (!username) {
				return next(new Error("invalid username"))
			}
			socket.sessionID = randomId()
			socket.userID = userId
			socket.username = username
			next()
		})

		io.on(events.CONNECTION, (socket) => {
			console.log("new socket :" + socket.id)
			// persist session
			sessionStore.saveSession(socket.sessionID, {
				userID: socket.userID,
				username: socket.username,
				connected: true,
			})

			// emit session details
			socket.emit("session", {
				sessionID: socket.sessionID,
				userID: socket.userID,
			})

			// join the "userID" room
			socket.join(socket.userID)

			// fetch existing users
			const users = []
			const messagesPerUser = new Map()
			messageStore.findMessagesForUser(socket.userID).forEach((message) => {
				const { from, to } = message
				const otherUser = socket.userID === from ? to : from
				if (messagesPerUser.has(otherUser)) {
					messagesPerUser.get(otherUser).push(message)
				} else {
					messagesPerUser.set(otherUser, [message])
				}
			})

			sessionStore.findAllSessions().forEach((session) => {
				users.push({
					userID: session.userID,
					username: session.username,
					connected: session.connected,
					messages: messagesPerUser.get(session.userID) || [],
				})
			})

			socket.emit(events.USERS, users)

			// notify existing users
			socket.broadcast.emit(events.USER_CONNECTED, {
				userID: socket.userID,
				username: socket.username,
				connected: true,
				messages: [],
			})

			// forward the private message to the right recipient (and to other tabs of the sender)
			socket.on(events.NEW_MESSAGE, ({ content, to }) => {
				console.log("new message from " + socket.userID)
				const message = {
					content,
					from: socket.userID,
					to,
				}
				socket.to(to).to(socket.userID).emit(events.NEW_MESSAGE, message)
				messageStore.saveMessage(message)
			})

			// notify users upon disconnection
			socket.on(events.DISCONNECT, async () => {
				const matchingSockets = await io.in(socket.userID).allSockets()
				const isDisconnected = matchingSockets.size === 0
				if (isDisconnected) {
					socket.broadcast.emit(events.USER_DISCONNECTED, socket.userID)
					sessionStore.saveSession(socket.sessionID, {
						userID: socket.userID,
						username: socket.username,
						connected: false,
					})
				}
			})
		})
	},
}
