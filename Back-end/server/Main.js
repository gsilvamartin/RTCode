const fs = require('fs');
const open = require('open');
const http = require('http');
const express = require('express');
const server = express();
const codeServer = http.createServer(server);
const path = require('path');
const bodyParser = require('body-parser');
const socketCode = require('socket.io')(codeServer);
const compilerService = require('../service/CompilerService');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname + '/../../Front-end/')));
server.use(express.static(path.resolve(__dirname + '/../../node_modules/')));

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
  socket.on('join-code', (room) => {
    socket.leaveAll();
    socket.join(room);
  });

  socket.on('message', (evt) => {
    socket.to(evt[0]).emit('message', evt[1]);
  });
});

/**
 * Handle terminal commands
 *
 * @author Guilherme da Silva Martin
 */
socketCode.on('connection', async (socket) => {
  socket.on('join-terminal', (room) => {
    socket.leaveAll();
    socket.join(room);
  });

  socket.on('term-enter', async (key) => {
    socket.broadcast.to(key[0]).emit('term-enter-data', key[1]);
  });

  socket.on('cmd', async (cmd) => {
    let cmdReturn = await compilerService.executeCommand(cmd[1]);

    socketCode.sockets.to(cmd[0]).emit('term-data', cmdReturn);
  });
});

/**
 * Server port listener
 *
 * @author Guilherme da Silva Martin
 */
codeServer.listen(5000, () => {
  open('http://localhost:5000/code/');
});
