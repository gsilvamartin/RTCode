const express = require('express')
const server = express()
const dbConnection = require('../database/DatabaseConnection')
let dbClient = null;

server.listen(3000, async () =>{
    dbClient = await dbConnection.connectDatabase();

    if(dbClient != null){
        console.log("Aplicação e banco de dados iniciados com sucesso!")
    }
});