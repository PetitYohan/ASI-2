import React, { useState, useContext, useCallback, useEffect } from "react";
import "./MessagePanel.css";

const MessagePanel = (user, onInput) => {
	const [input, setInput] = useState("")

	//TODO user socket service
	const handleInputMessage = useCallback((e) => {
		e.preventDefault()
		onInput(input)
		setInput("")
	}, [])

	const displaySender = (message, index) => {
		return (
			index === 0 ||
			user.messages[index - 1].fromSelf !== user.messages[index].fromSelf
		)
	}

	return (
		<div>
			{console.log("message panel render")}
			<div className="header">
				<i className="icon .icon.connected"></i>${user.username}
			</div>
			<ul className="messages">
				{user.messages.map((message, i) => {
					return (
						<li className="message" key={i}>
							{displaySender(message, i) && (
								<div className="sender">
									{message.fromSelf ? "(yourself)" : user.username}
								</div>
							)}
							{message.content}
						</li>
					)
				})}
			</ul>

			<form onSubmit={handleInputMessage} className="form">
				<textarea
					placeholder="Your message..."
					className="input"
					value={input}
					onChange={(event) => setInput(event.target.value)}
				/>
				<button disabled={!input.length > 0} className="send-button">
					Send
				</button>
			</form>
		</div>
	)
}

export default MessagePanel
