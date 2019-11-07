const express = require('express')
const server = express()
const user = require('../database/repository/UserRepository')

server.listen(3000, async () =>{
    var users = await user.getAllUsers();
    users.forEach(element => {
        console.log(element);        
    });
});