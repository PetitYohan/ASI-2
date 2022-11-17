import React, { useState, useContext, useCallback, useEffect } from "react"
import { SocketContext } from "../socket"
import User from "./User"
import MessagePanel from "./MessagePanel"

const Chat = (prop) => {
	const socket = useContext(SocketContext)
	//TODO use store/selector
	const [users, setUsers] = useState([])
	const [selectedUser, setSelectedUser] = useState(null)

	const handleSendMessage = useCallback(() => {
		if (selectedUser) {
			socket.emit("private message", {
				content,
				to: selectedUser.userID,
			})
			selectedUser.messages.push({
				content,
				fromSelf: true,
			})
		}
	}, [])

	const handleSelectUser = (user) => {
		setSelectedUser(user)
	}

	//TODO move to central service
	useEffect(() => {
		socket.on("connect", () => {
			users.forEach((user) => {
				if (user.self) {
					user.connected = true
				}
			})
		})
		socket.on("disconnect", () => {
			users.forEach((user) => {
				if (user.self) {
					user.connected = false
				}
			})
		})
		socket.on("users", (newusers) => {
			newusers.forEach((user) => {
				user.messages.forEach((message) => {
					message.fromSelf = message.from === socket.userID
				})
				for (let i = 0; i < users.length; i++) {
					const existingUser = users[i]
					if (existingUser.userID === user.userID) {
						existingUser.connected = user.connected
						existingUser.messages = user.messages
						return
					}
				}
				user.self = user.userID === socket.userID
				users.push(user)
			})
			// put the current user first, and sort by username
			users.sort((a, b) => {
				if (a.self) return -1
				if (b.self) return 1
				if (a.username < b.username) return -1
				return a.username > b.username ? 1 : 0
			})
		})
		socket.on("user connected", (user) => {
			for (let i = 0; i < users.length; i++) {
				const existingUser = users[i]
				if (existingUser.userID === user.userID) {
					existingUser.connected = true
					return
				}
			}
			users.push(user)
		})
		socket.on("user disconnected", (id) => {
			for (let i = 0; i < users.length; i++) {
				const user = users[i]
				if (user.userID === id) {
					user.connected = false
					break
				}
			}
		})
		socket.on("private message", ({ content, from, to }) => {
			for (let i = 0; i < users.length; i++) {
				const user = users[i]
				const fromSelf = socket.userID === from
				if (user.userID === (fromSelf ? to : from)) {
					user.messages.push({
						content,
						fromSelf,
					})
					break
				}
			}
		})
		//Component unmount => destroy
		return () => {
			socket.off("connect")
			socket.off("disconnect")
			socket.off("users")
			socket.off("user connected")
			socket.off("user disconnected")
			socket.off("private message")
		}
	}, [socket])

	return (
		<div>
			<div class="left-panel">
				{users.map((user, i) => {
					;<User
						key={i}
						user={user}
						selected={selectedUser === user}
						onSelect={handleSelectUser(user)}
					/>
				})}
			</div>
			{selectedUser && (
				<MessagePanel
					user={selectedUser}
					input={handleSendMessage}
					class="right-panel"
				/>
			)}
		</div>
	)
}

export default Chat
