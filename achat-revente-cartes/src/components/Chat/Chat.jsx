import React from "react"
import "./Chat.css"
import RecipientSelector from "./RecipientSelector"
import MessagePanel from "./MessagePanel"
import { useSelector } from "react-redux"
import {
	selectChatRecipients,
	selectSelectedChatRecipient,
} from "../../core/selectors"
import { Divider, Grid, Typography } from "@mui/material"

const Chat = () => {
	const chatRecipients = useSelector(selectChatRecipients)
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)
	return (
		<Grid container id="chat">
			<Grid item xs={12}>
				<Typography variant="h5" className="header-message">
					Chat
				</Typography>
			</Grid>
			<Divider orientation="vertical" />
			<RecipientSelector users={chatRecipients} />
			{selectedChatRecipient && selectedChatRecipient.username && (
				<MessagePanel user={selectedChatRecipient} />
			)}
		</Grid>
	)
}

export default Chat
