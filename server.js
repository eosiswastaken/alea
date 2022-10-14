const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

var users = {}

app.use(express.static('public'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
    console.log('listening on port 3000');
});


io.on('connection', (socket) => {
    console.log('A user connected !')
    socket.on('chat message', (msg) => {
        sendChatMessage(socket.id, msg);
    });
    socket.on('new user', (nick) => {
        registerNewUser(socket.id, nick);
    });
    socket.on('disconnect', () => {
        console.log('A user disconnected !')
    });
});


function registerNewUser(id, nick) {
    console.log(`New user logged in ! ID : ${id} / Name : ${nick}`);
    users[id] = nick;
}

function sendChatMessage(id, msg) {
    prep = `${users[id]} > ${msg}`
    io.emit('chat message', prep)
}