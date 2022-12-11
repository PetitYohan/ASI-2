//Initialisaion de la waiting list
const waitingList = [];
export const rooms = [];

export function joinRoom(socket, io) {
  socket.on("joinRoom", (userCards) => {
    console.log("demande de join room");
    console.log(userCards);
    waitingList.push({ userId: socket.id, cards: userCards });

    if (waitingList.length > 1) {
      const user1 = waitingList.pop();
      const user2 = waitingList.pop();

      const room = user1.userId + "#" + user2.userId;

      socket.join(room);

      const u1 = {
        id: user1.userId,
        energy: 2,
        cards: user1.cards,
        room: room,
      };
      const u2 = {
        id: user2.userId,
        energy: 2,
        cards: user2.cards,
        room: room,
      };

      io.in(u2.id).socketsJoin(room);

      const roomCreated = { RoomId: room, players: [u1, u2] };

      rooms.push(roomCreated);

      socket.broadcast.to(room).emit("message", function (data) {
        alert(`${u2.id} has joined the room`);
      });
    }
  });
}

export function disconnectRoom(socket) {
  //Handle disconnect
  socket.on("disconnect", () => {
    //Remove the disconnected user from the users list
    let room = rooms.findIndex(
      (room) =>
        room.players[0].id === socket.id || room.players[1].id === socket.id
    );
    if (room !== -1) {
      //Notify the last user
      io.to(room).emit(`user : ${socket.id} left the room`);

      //Remove the room from roomList
      rooms.splice(room, 1);
    }
  });
}
