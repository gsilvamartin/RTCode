const express = require('express')
const server = express()
const dbConnection = require('../database/DatabaseConnection')

server.listen(3000, async () =>{
    console.log("aplicação ligada na porta 3000")
    var x = await dbConnection.connectDatabase();
    console.log(x);
});