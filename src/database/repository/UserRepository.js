const database = require('../DatabaseConnection')
let User = require('../models/User')
var mongodb = require('mongodb');

class UserRepository {
    constructor(database) {
        database = await database.getConnection();
    }
}

async function getUser() {
    const client = await database.getConnection();


}

async function insertUser() {
    const client = await database.getConnection();
    const insertedUser = await client.collection('User').insertOne(new User("Email do usuário", "Nome do usuário", "Imagem do usuário", "Senha do usuário"));

    return insertedUser;
}

async function getAllUsers() {
    const client = await database.getConnection();
    const users = await client.collection('User').find();

    return users;
}

async function deleteUser() {
    const client = await database.getConnection();
    const deletedUser = await client.collection('User').deleteOne({
        "_id": new mongodb.ObjectID("12312312312321")
    });

    return deletedUser;
}

module.exports = { insertUser, getAllUsers }