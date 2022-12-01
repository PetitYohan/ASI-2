import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import User from "../User/User"
import MessagePanel from "../MessagePanel/MessagePanel"
import "./Chat.css"
import {
	selectChatRecipients,
	selectSelectedChatRecipient,
} from "../../core/selectors"

const Chat = () => {
	const recipients = useSelector(selectChatRecipients)
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)

	//TODO move to central service
	useEffect(
		() => {
			console.log("chat mount")
			/* socket.on("connect", () => {
				console.log("chat mounté du balcon")
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
				console.log("new users : " + JSON.stringify(newusers))
				const newUsersState = []
				newusers.forEach((user) => {
					user.messages.forEach((message) => {
						message.fromSelf = message.from === socket.userID
					})
					for (let i = 0; i < recipients.length; i++) {
						const existingUser = recipients[i]
						if (existingUser.userID === user.userID) {
							existingUser.connected = user.connected
							existingUser.messages = user.messages
							return
						}
					}
					user.self = user.userID === socket.userID
					recipients.push(user)
				})
				// put the current user first, and sort by username
				recipients.sort((a, b) => {
					if (a.self) return -1
					if (b.self) return 1
					if (a.username < b.username) return -1
					return a.username > b.username ? 1 : 0
				})
				setUsers([...recipients])
				console.log(recipients)
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
				console.log("chat mount")
				socket.off("connect")
				socket.off("disconnect")
				socket.off("users")
				socket.off("user connected")
				socket.off("user disconnected")
				socket.off("private message")
			} */
		},
		[
			/* socket */
		]
	)

	return (
		<div>
			{console.log("chat rognard")}
			<div className="left-panel">
				{recipients.map((user, i) => {
					;<User key={i} user={user} />
				})}
			</div>
			{selectedChatRecipient && (
				<MessagePanel user={selectedChatRecipient} className="right-panel" />
			)}
		</div>
	)
}

export default Chat
