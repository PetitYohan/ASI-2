import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedChatRecipient } from "../../core/actions"
//import "./User.css"
import NativeSelect from "@mui/material/NativeSelect"

const RecipientSelector = ({ users }) => {
	console.log(users)
	const dispatch = useDispatch()
	const handleSelectRecipient = (userId) => {
		dispatch(updateSelectedChatRecipient(parseInt(userId)))
	}
	//TODO search bar + mode list à droite du chat + "🔵" : "⚪"

	return (
		<NativeSelect
			defaultValue={""}
			/* inputProps={{
				name: "age",
				id: "uncontrolled-native",
			}} */
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
	)
}

export default RecipientSelector
