const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server)

var users = {}

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        prep = users[socket.id] + " > " + msg
        io.emit('chat message', prep);
    });
    socket.on('new user', (nick) => {
        console.log(socket.id);
        console.log(nick);
        users[socket.id] = nick
    })
});

server.listen(3000, () => {
    console.log('listening on port *:3000');
});