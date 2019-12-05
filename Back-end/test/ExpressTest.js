const express = require('express');
const http = require('http');
const server = express();
const testServer = http.createServer(server);

testServer.listen(5000, () => {
    process.exit(0);
});