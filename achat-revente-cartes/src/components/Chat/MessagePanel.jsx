import {
	Divider,
	Fab,
	Grid,
	List,
	ListItem,
	ListItemText,
	TextField,
} from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import React, { useState, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { sendMessage } from "../../core/actions"
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

	//todo en fonction de from self : align="right" ou left + secondary : timestamp
	//todo en-tete avec destinataire : user.username
	return (
		<Grid container>
			<List>
				<ListItem key={user.userId}>
					<ListItemText secondary={user.connected ? "🔵" : "⚪"} align="right">
						{user.username}
					</ListItemText>
				</ListItem>
			</List>
			<Divider orientation="horizontal" />
			<List style={{ overflowY: "auto" }}>
				{user.messages.map((message, i) => {
					return (
						<ListItem key={i}>
							<Grid container>
								<Grid item xs={12}>
									<ListItemText
										align={message.fromSelf ? "right" : "left"}
										primary={message.content}
									></ListItemText>
								</Grid>
								<Grid item xs={12}>
									<ListItemText
										align={message.fromSelf ? "right" : "left"}
										secondary={undefined /* message.time */}
									></ListItemText>
								</Grid>
							</Grid>
						</ListItem>
					)
				})}
			</List>
			<Divider />
			<Grid container style={{ padding: "20px" }}>
				<TextField
					id="outlined-multiline-flexible"
					label="Message"
					multiline
					maxRows={4}
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<Fab
					color="primary"
					aria-label="add"
					disabled={!input.length > 0}
					size="small"
					style={{ alignSelf: "center" }}
					onClick={handleSendMessage}
				>
					<SendIcon />
				</Fab>
			</Grid>
		</Grid>
	)
}

export default MessagePanel
