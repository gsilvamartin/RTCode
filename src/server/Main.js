const express = require('express');
const server = express();
const user = require('../service/UserService');

server.listen(3000, async () => {
  const repository = await user.default.init();
  const users = await repository.getAllUsers();

  users.forEach((element) => {
    console.log(element);
  });
});
