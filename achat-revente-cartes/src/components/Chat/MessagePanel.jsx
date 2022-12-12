import React, { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../core/actions"
import { selectSelectedChatRecipient } from "../../core/selectors"
//import "./MessagePanel.css"

const MessagePanel = ({ user }) => {
	const [input, setInput] = useState("")
	const dispatch = useDispatch()

	console.log(user)
	const handleSendMessage = (e) => {
		e.preventDefault()
		if (user) {
			const payload = {
				content: input,
				to: user.userId,
			}
			dispatch(sendMessage(payload))
		}
		setInput("")
	}

	const displaySender = (message, index) => {
		return (
			index === 0 ||
			user.messages[index - 1].fromSelf !== user.messages[index].fromSelf
		)
	}

	return (
		<div>
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

			<form onSubmit={handleSendMessage} className="form">
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
