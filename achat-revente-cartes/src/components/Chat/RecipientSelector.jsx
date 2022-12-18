import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedChatRecipient } from "../../core/actions"
//import "./User.css"
import NativeSelect from "@mui/material/NativeSelect"
import { Grid, ListItemText } from "@mui/material"
import { selectSelectedChatRecipient } from "../../core/selectors"

const RecipientSelector = ({ users }) => {
	console.log(users)
	const dispatch = useDispatch()
	const handleSelectRecipient = (userId) => {
		dispatch(updateSelectedChatRecipient(parseInt(userId)))
	}
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)
	//TODO search bar + mode list à droite du chat

	return (
		<Grid container direction="row">
			<NativeSelect
				defaultValue={""}
				onChange={(e) => handleSelectRecipient(e.target.value)}
			>
				{users.map((u, index) => {
					return (
						<option value={u.userId} key={index}>
							{u.username}
						</option>
					)
				})}
			</NativeSelect>
			<Grid item>
				{selectedChatRecipient && (
					<ListItemText>
						{selectedChatRecipient.connected ? "🔵" : "⚪"}
					</ListItemText>
				)}
			</Grid>
		</Grid>
	)
}

export default RecipientSelector
