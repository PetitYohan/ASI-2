import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import User from "../User/User"
import MessagePanel from "../MessagePanel/MessagePanel"
//import "./Chat.css"
import {
	selectChatRecipients,
	selectSelectedChatRecipient,
} from "../../core/selectors"

const Chat = () => {
	const recipients = useSelector(selectChatRecipients)
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)

	return (
		<div>
			{console.log("chat rognard")}

			<div className="left-panel">
				{recipients.map((user, i) => {
					{
						console.log(user)
					}
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
