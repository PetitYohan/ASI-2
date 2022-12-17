import { events } from "./event"
import { socket } from "./socket"

export const userService = {
	login: (user) => socket.emit(events.LOGIN, user),
}
