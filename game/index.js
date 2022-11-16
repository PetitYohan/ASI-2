const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const formatMessage = require('../sheeshconnect/helpers/formatDate');

const app = express();
const server = http.createServer(app);
const io = socketio(server); // Attach socket.io to our server

app.use(express.static('public')); // Serve our static assets from /public

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('server started'));

//Initialisaion de la waiting list
const waitingList = [];
const rooms = [];
const users = [];

//Handle connection
io.on('connection', function (socket) {
    socket.on('joinRoom', (username) => {
        if (waitingList.length === 0) {
            waitingList.push(socket.id);
        } else {

            const u1 = { id: socket.id, room: room };
            users.push(u1);


            var u2 = { id: waitingList.pop(), room: room };
            io.in(u2.id).socketsJoin(room);

            rooms.push(
                { RoomId: room, players: [u1, u2] }
            );

            socket.broadcast.to(room).emit(
                'message',
                formatMessage(`${u2.id} has joined the room`)
            );
        }
    });

    //Handle disconnect
    socket.on('disconnect', () => {
        //Remove the disconnected user from the users list
        const index = users.findIndex(user => user.id === socket.id);
        if (index !== -1) {
            const user = users.splice(index, 1)[0];
            users.splice(index, 1);
        }

        //Notify the last user
        io.to(user.room).emit(`user : ${user.id} left the room`);

        //Remove the room from roomList
        index = rooms.findIndex(room => room.RoomId == user.room);
        rooms.splice(index, 1);
    });
});


