let codeServer;
let socketCode;

require('dotenv').config();
const fs = require('fs');
const open = require('open');
const http = require('http');
const https = require('https');
const express = require('express');
const server = express();
const path = require('path');
const users = require('./User');
const code = require('./Code');
const socketio = require('socket.io');
const UtilClass = require('../util/Util');
const ErrorResponse = require('../model/response/ErrorResponse');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/**
 * Starts the server, if the development flag is set to false,
 * the program looks for the ssl key to include in the https server.
 *
 * @author Guilherme da Silva Martin
 */
if (process.env.IS_DEVELOP === 'false') {
  const chain = fs.readFileSync(process.env.SSL_CHAIN, 'utf8');
  const privateKey = fs.readFileSync(process.env.SSL_KEY, 'utf8');
  const certificate = fs.readFileSync(process.env.SSL_CERT, 'utf8');
  const credentials = { key: privateKey, cert: certificate, ca: chain };

  codeServer = https.createServer(credentials, server);
  socketCode = socketio(codeServer);
} else {
  codeServer = http.createServer(server);

  socketCode = socketio(codeServer);
}

/**
 * Express middlewares
 *
 * @author Guilherme da Silva Martin
 */
server.use(cookieParser());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.resolve(__dirname + '/../../Front-end/')));
server.use(express.static(path.resolve(__dirname + '/../../node_modules/')));
server.use(users);
server.use(code);

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
codeServer.listen(5000, '0.0.0.0');
