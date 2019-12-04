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
server.use(express.static(path.resolve('../../Front-end/')));
server.use(users);

/**
 * Redirencia o usuário para a página de codificação
 * 
 * @author Guilherme da Silva Martin
 */
server.get('/code/', (req, res) => {
    res.sendFile(path.resolve('../../Front-end/code.html'));
});

/**
 * Função executada quando há uma nova conexão no socket
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
 * Função executada quando o usuário se desconecta do socket
 *
 * @author Guilherme da Silva Martin
 */
io.on('disconnect', (evt) => {
    console.log(`usuário desconectado ${evt}`);
});

socketServer.listen(5000);