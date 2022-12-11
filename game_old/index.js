import gestionRoom from "./gestionRoom.mjs";
import maitreDeJeu from "./maitreDeJeu.mjs";

const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = socketio(server); // Attach socket.io to our server

app.use(express.static("public")); // Serve our static assets from /public

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server started"));

//Handle connection
io.on("connection", function (socket, userCards) {
  //Sur appui join room
  gestionRoom.joinRoom(socket, userCards);

  //Sur appui fin de game
  gestionRoom.disconnectRoom(socket);

  //Sur appui attack
  socket.on("attack", (cardAlly, cardEnemy) => {
    maitreDeJeu.attack(socket, cardAlly, cardEnemy);
  });
});
