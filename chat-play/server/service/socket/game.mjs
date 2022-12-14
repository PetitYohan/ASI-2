import InMemorySessionStore from "./sessionStore.mjs";
import { events } from "./event.mjs";
import { joinRoom, disconnectRoom } from "../composants/gestionRoom.mjs";
import { attack } from "../composants/maitreDeJeu.mjs";

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

      //Sur appui join room
      joinRoom(socket, io);

      //Sur appui fin de game
      disconnectRoom(socket);

      //Sur appui attack
      socket.on("attack", (cards) => {
        const cardAlly = cards[0];
        const cardEnemy = cards[1];
        console.log("a l'attaque " + cardAlly + cardEnemy);
        attack(socket, io, cardAlly, cardEnemy);
      });
    });
  },
};
