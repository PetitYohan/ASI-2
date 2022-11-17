import React, { useState, useContext, useCallback, useEffect } from "react"
import { SocketContext } from "../socket"

const User = (user, selected) => {
	const socket = useContext(SocketContext)
	const handleClick = () => {
		socket.emit("select")
	}

	return (
		<div class="user" onClick={handleClick} class={selected}>
			<div class="description">
				<div class="name">
					{user.username} {user.self ? " (yourself)" : ""}
				</div>
			</div>
		</div>
	)
}

export default User
