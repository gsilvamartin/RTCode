const chai = require('chai');
const express = require('express');
const http = require('http');
const server = express();
const testServer = http.createServer(server);

describe('Express Tests', () => {
    it('Should init express server on port 5000', () => {
        testServer.listen(5000, (error) => {
            chai.expect(error).to.be.undefined;
        });
    });
});