const express = require('express');
const server = express();
const users = require('./Users');

server.use(users);

server.listen(3000);
