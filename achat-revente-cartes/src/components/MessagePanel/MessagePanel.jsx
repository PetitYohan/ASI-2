import React, { useState, useContext } from "react"
import { useSelector } from "react-redux"
import { selectSelectedChatRecipient } from "../../core/selectors"
import { events } from "../../core/service/socket/event"
import SocketContext from "../../core/service/socket/socket-context"
//import "./MessagePanel.css"

const MessagePanel = ({ user }) => {
	const socket = useContext(SocketContext)
	const [input, setInput] = useState("")
	//TODO utiliser une fct dans service socket qui se charge du emit
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)

	const handleSendMessage = (e) => {
		e.preventDefault()
		if (selectedChatRecipient) {
			socket.emit(events.NEW_MESSAGE, {
				content: input,
				to: selectedChatRecipient.userID,
			})
			//TODO delete, store updated par le .on new msg
			selectedChatRecipient.messages.push({
				content: input,
				fromSelf: true,
			})
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
