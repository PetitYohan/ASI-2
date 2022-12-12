import React from "react"
//import "./Chat.css"
import RecipientSelector from "./RecipientSelector"
import MessagePanel from "./MessagePanel"
import { useSelector } from "react-redux"
import {
	selectChatRecipients,
	selectSelectedChatRecipient,
} from "../../core/selectors"

const Chat = () => {
	const chatRecipients = useSelector(selectChatRecipients)
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)
	return (
		<div>
			{console.log("chat rognard")}
			<RecipientSelector users={chatRecipients} />
			{selectedChatRecipient && selectedChatRecipient.username && (
				<MessagePanel user={selectedChatRecipient} />
			)}
		</div>
	)
}

export default Chat
