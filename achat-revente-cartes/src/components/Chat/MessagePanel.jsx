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
import { chatService } from "../../core/service/chatService"
import "./MessagePanel.css"

const MessagePanel = ({ user }) => {
	const [input, setInput] = useState("")
	const dispatch = useDispatch()

	const handleSendMessage = (e) => {
		e.preventDefault()
		if (user) {
			const payload = {
				content: input,
				to: user.userId,
			}
			chatService.sendMessage(payload)
		}
		setInput("")
	}

	//todo en fonction de from self : align="right" ou left + secondary : timestamp
	//todo en-tete avec destinataire : user.username
	return (
		<Grid container direction={"column"}>
			<Grid item>
				<List style={{ overflowY: "scroll", width: "100%" }}>
					{user.messages.map((message, i) => {
						return (
							<Grid container>
								<ListItem key={i}>
									<Grid
										item
										xs={12}
										className={message.fromSelf ? "right" : "left"}
									>
										<ListItemText primary={message.content}></ListItemText>
										<ListItemText
											secondary={new Date(message.timestamp).toLocaleTimeString(
												"fr-FR"
											)}
										></ListItemText>
									</Grid>
								</ListItem>
							</Grid>
						)
					})}
				</List>
			</Grid>
			<Divider />
			<Grid item container direction={"row"}>
				<Grid item xs={10}>
					<TextField
						id="outlined-multiline-flexible"
						label="Message"
						multiline
						maxRows={4}
						value={input}
						onChange={(e) => setInput(e.target.value)}
						style={{ width: "100%" }}
					/>
				</Grid>
				<Grid item xs={1} style={{ alignSelf: "center", marginLeft: "8px" }}>
					<Fab
						color="primary"
						aria-label="add"
						disabled={!input.length > 0}
						size="small"
						onClick={handleSendMessage}
					>
						<SendIcon />
					</Fab>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default MessagePanel
