import createServer from "http"
import express from "express"
import ChatSocketIO from "./service/socket/chat"

const app = express()
const httpServer = createServer(app)

const io = Server(httpServer, {
	cors: {
		origin: "http://localhost:3000",
	},
})

const chat = ChatSocketIO(io)

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () =>
	console.log(`server listening at http://localhost:${PORT}`)
)
