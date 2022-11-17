import React, { useState, useContext, useCallback, useEffect } from "react"
import { SocketContext } from "../../service/socket"

const User = ({user, selected}) => {

	console.log(user);
	const socket = useContext(SocketContext)
	const handleClick = () => {
		socket.emit("select")
	}

	return (
		<div classNameName={`user ${selected}`} onClick={handleClick}>
			<div className="description">
				<div className="name">
					{user.username} {user.self ? " (yourself)" : ""}
				</div>
			</div>
		</div>
	)
}

export default User
