const express = require('express')
const server = express()
const user = require('../service/UserService')

server.listen(3000, async () =>{
    var users = await user.getAllUsers(null);
    
    users.forEach(element => {
        console.log(element);        
    });
});