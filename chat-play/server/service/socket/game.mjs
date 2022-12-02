import InMemorySessionStore from "./sessionStore.mjs";
import { events } from "./event.mjs";
import { joinRoom, disconnectRoom } from "../../../../game/gestionRoom.mjs";
import { attack } from "../../../../game/maitreDeJeu.mjs";

export default {
  GameSocketIO: (io) => {
    const sessionStore = new InMemorySessionStore();

    io.on(events.CONNECTION, (socket) => {
      console.log("new socket :" + socket.id);
      // persist session
      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
        connected: true,
      });

      socket.on("connectio", function (data) {
        socket.emit("co");
      });

      socket.on("deconnectio", function (data) {
        socket.emit("deco");
      });

      //Sur appui join room
      joinRoom(socket, io);

      //Sur appui fin de game
      disconnectRoom(socket);

      //Sur appui attack
      socket.on("attack", (cardAlly, cardEnemy) => {
        attack(socket, cardAlly, cardEnemy);
      });
    });
  },
};
