const express = require('express');
const server = express();
const users = require('./Users');
const bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(users);

server.listen(3000);
