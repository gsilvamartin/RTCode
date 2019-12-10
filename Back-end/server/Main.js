const fs = require('fs');
const express = require('express');
const path = require('path');
const server = express();
const users = require('./Users');
const bodyParser = require('body-parser');
const serverSocket = server.listen(5000);
const serverSocketTerminal = server.listen(5001);
const socketCode = require('socket.io').listen(serverSocket);
const socketTerminal = require('socket.io').listen(serverSocketTerminal);

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
socketCode.on('connection', (socket) => {
    socketCode.on('join', (room) => {
        socketCode.leaveAll();
        socketCode.join(room);
    });

    socketCode.on('message', (evt) => {
        socketCode.to(evt[0]).emit('message', evt[1]);
    });
});