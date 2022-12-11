import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setSelectedChatRecipient } from "../../core/actions"
//import "./User.css"

const User = ({ user }) => {
	console.log(user)
	const dispatch = useDispatch()
	const handleSelectRecipient = () => {
		dispatch(setSelectedChatRecipient(user))
	}

	return (
		<div className="user" onClick={handleSelectRecipient}>
			<div className="description">
				<div className="name">
					{user.username} {user.self ? " (yourself)" : ""}
				</div>
			</div>
		</div>
	)
}

export default User;
