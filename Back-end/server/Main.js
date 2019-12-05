const express = require('express');
const http = require('http');
const path = require('path');
const server = express();
const socketServer = http.createServer(server);
const users = require('./Users');
const bodyParser = require('body-parser');
const io = require('socket.io')(socketServer);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname + '/../../Front-end/')));
server.use(express.static(path.resolve(__dirname + '/../../node_modules/')));
server.use(users);

/**
 * Redirect user to coding page.
 * 
 * @author Guilherme da Silva Martin
 */
server.get('/code/:codeid?', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/../../Front-end/code.html'));
});

/**
 * Function performed when there is a new socket connection.
 *
 * @author Guilherme da Silva Martin
 */
io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.leaveAll();
        socket.join(room);
    });

    socket.on('message', (evt) => {
        socket.to(evt[0]).emit('message', evt[1]);
    });
});

/**
 * Function performed when user disconnects from socket.
 *
 * @author Guilherme da Silva Martin
 */
io.on('disconnect', (evt) => {
    console.log(`User disconnected ${evt}`);
});

socketServer.listen(5000);