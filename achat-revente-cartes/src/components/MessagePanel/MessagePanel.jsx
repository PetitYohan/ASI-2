import React, { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../core/actions"
import { selectSelectedChatRecipient } from "../../core/selectors"
//import "./MessagePanel.css"

const MessagePanel = ({ user }) => {
	const [input, setInput] = useState("")
	const dispatch = useDispatch()
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)
	console.log(selectedChatRecipient)
	const handleSendMessage = (e) => {
		e.preventDefault()
		if (selectedChatRecipient) {
			const payload = {
				content: input,
				to: selectedChatRecipient.username,
			}
			dispatch(sendMessage(payload))
		}
		setInput("")
	}

	const displaySender = (message, index) => {
		return (
			index === 0 ||
			selectedChatRecipient.messages[index - 1].fromSelf !==
				selectedChatRecipient.messages[index].fromSelf
		)
	}

	return (
		<div>
			<div className="header">
				<i className="icon .icon.connected"></i>$
				{selectedChatRecipient.username}
			</div>
			<ul className="messages">
				{selectedChatRecipient.messages.map((message, i) => {
					return (
						<li className="message" key={i}>
							{displaySender(message, i) && (
								<div className="sender">
									{message.fromSelf
										? "(yourself)"
										: selectedChatRecipient.username}
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
