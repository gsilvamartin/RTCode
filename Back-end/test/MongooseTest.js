const chai = require('chai');
const express = require('express');
const http = require('http');
const server = express();
const mongoose = require('mongoose');
const mongoConnect = require('../database/DatabaseConnection');

describe('Mongoose Tests', () => {
  //   it('Should connect to mongoose', async () => {
  //     await mongoConnect.getConnection();
  //     chai.expect(mongoose.connection.readyState).to.be.not.undefined.and.not.null;
  //   });
});
