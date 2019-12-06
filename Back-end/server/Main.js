const fs = require('fs')
const express = require('express');
const path = require('path');
const server = express();
const users = require('./Users');
const SSHClient = require('ssh2').Client;
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

/**
 * Handle terminal SSH connection.
 * 
 * @author Guilherme da Silva Martin
 */
socketTerminal.on('connection', (socket) => {
    const conn = new SSHClient();
  
    conn
      .on('ready', () => {
        socket.emit('data', '\r\n*** Connection Success ***\r\n');
  
        conn.shell((err, stream) => {
          if (err) return socket.emit('data', '\r\n*** SSH SHELL ERROR: ' + err.message + ' ***\r\n');
          socket.on('data', (data) => {
            stream.write(data);
          });
          stream
            .on('data', (d) => {
              socket.emit('data', d.toString('binary'));
            })
            .on('close', () => {
              conn.end();
            });
        });
      })
      .on('close', () => {
        socket.emit('data', '\r\n*** Server Connection Closed ***\r\n');
      })
      .on('error', (err) => {
          console.log(err);
        socket.emit('data', '\r\n*** Server Connection Error: ' + err.message + ' ***\r\n');
      })
      .connect({
        host: 'localhost',
        port: 22,
        username: 'DESKTOP-S8KEJL1',
        tryKeyboard: true,
        readyTimeout: 60000
    });
  });
