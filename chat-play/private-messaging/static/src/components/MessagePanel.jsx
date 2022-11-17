import React, { useState, useContext, useCallback, useEffect } from "react"
import { SocketContext } from "../socket"

const MessagePanel = (user) => {
	const socket = useContext(SocketContext)
	const [input, setInput] = useState("")

	const handleSendMessage = useCallback((e) => {
		e.preventDefault()
		socket.emit("NEW_MESSAGE", input)
		setInput("")
	}, [])

	const displaySender = (message, index) => {
		return (
			index === 0 ||
			user.messages[index - 1].fromSelf !== user.messages[index].fromSelf
		)
	}

	return (
		<>
			<div>
				<div class="header">
					<i class="icon .icon.connected"></i>${user.username}
				</div>
				<ul class="messages">
					{user.messages.map((message, i) => {
						return (
							<li class="message" key={i}>
								{displaySender(message, index) && (
									<div class="sender">
										{message.fromSelf ? "(yourself)" : user.username}
									</div>
								)}
								{message.content}
							</li>
						)
					})}
				</ul>

				<form onSubmit={handleSendMessage} class="form">
					<textarea
						placeholder="Your message..."
						class="input"
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<button disabled={!input.length > 0} class="send-button">
						Send
					</button>
				</form>
			</div>
		</>
	)
}

export default MessagePanel
