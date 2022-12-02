export function connectSocket (socket, user) {
    console.log("connecting socket");
	socket.connect()
    socket.user = user
    console.log(socket);
}