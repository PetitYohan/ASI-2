import React from "react"
import { useDispatch, useSelector } from "react-redux"

const User = ({ user }) => {
	console.log(user)
	const dispatch = useDispatch()
	const selectedChatRecipient = useSelector(selectSelectedChatRecipient)
	const handleSelectRecipient = (user) => {
		dispatch(setSelectedChatRecipient(user))
	}

	return (
		<div
			classNameName={`user ${selectedChatRecipient === user}`}
			onClick={handleSelectRecipient}
		>
			<div className="description">
				<div className="name">
					{user.username} {user.self ? " (yourself)" : ""}
				</div>
			</div>
		</div>
	)
}

export default User
