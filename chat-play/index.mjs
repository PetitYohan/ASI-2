import { createServer } from "http"
import express from "express"

import cors from "cors"
import { socketServer } from "./service/socket/socket.mjs"

const app = express()
const httpServer = createServer(app)
const io = socketServer(httpServer)
app.use(
	cors({
		origin: "http://localhost",
	})
)
const PORT = /* process.env.PORT || */ 3000

httpServer.listen(PORT, () =>
	console.log(`server listening at http://localhost:${PORT}`)
)
