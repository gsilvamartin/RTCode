const database = require('../DatabaseConnection')
let User = require('../models/User')

async function insertUser() {
    const client = await database.getConnection();

    return await client.collection('User').insertOne(new User("Email do usuário", "Nome do usuário", "Imagem do usuário", "Senha do usuário"));
}

async function getAllUsers(){
    const client = await database.getConnection();
    const users = await client.collection('User').find();
    
    return users;
}

module.exports = { insertUser, getAllUsers }