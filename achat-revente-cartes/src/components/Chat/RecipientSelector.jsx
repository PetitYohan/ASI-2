import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSelectedChatRecipient } from "../../core/actions"
//import "./User.css"
import NativeSelect from "@mui/material/NativeSelect"

const RecipientSelector = ({ users }) => {
	console.log(users)
	const dispatch = useDispatch()
	const handleSelectRecipient = (user) => {
		if (user.self) {
		}
		dispatch(updateSelectedChatRecipient(user.userId))
	}

	return (
		<NativeSelect
			defaultValue={""}
			/* inputProps={{
				name: "age",
				id: "uncontrolled-native",
			}} */
			onChange={(e) => handleSelectRecipient(e.target.value)}
		>
			{users.map((u) => {
				return (
					<option value={u} key={u.id}>
						{u.username}
					</option>
				)
			})}
		</NativeSelect>
	)
}

export default RecipientSelector
