import { createServer } from "http"
import express from "express"
import { Server } from "socket.io"
import socketRegisters from "./service/socket/chat.mjs"
import cors from "cors"

const app = express()
app.use(cors())
const httpServer = createServer(app)

const io = new Server(httpServer, {
	cors: { origin: "*" },
})

socketRegisters.ChatSocketIO(io);
socketRegistersGame.GameSocketIO(io);

const PORT = /* process.env.PORT || */ 3000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
