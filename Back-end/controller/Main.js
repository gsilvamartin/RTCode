const fs = require('fs');
const open = require('open');
const http = require('http');
const express = require('express');
const server = express();
const codeServer = http.createServer(server);
const path = require('path');
const users = require('./User');
const UtilClass = require('../util/Util');
const ErrorResponse = require('../model/response/ErrorResponse');
const bodyParser = require('body-parser');
const socketCode = require('socket.io')(codeServer);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname + '/../../Front-end/')));
server.use(express.static(path.resolve(__dirname + '/../../node_modules/')));
server.use(users);

/**
 * Error handler
 *
 * @author Guilherme da Silva Martin
 */
server.use((err, req, res, next) => {
  if (!UtilClass.isNullOrEmpty(err.statusCode)) {
    res.status(err.statusCode).json(new ErrorResponse(err.statusCode, err.message, err.stack));
  } else {
    res.status(500).json(new ErrorResponse(500, err.message, null));
  }

  next();
});

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
 * Server port listener
 *
 * @author Guilherme da Silva Martin
 */
codeServer.listen(5000, () => {
  open('http://localhost:5000/code/');
});
