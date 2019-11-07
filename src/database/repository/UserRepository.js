const database = require('../DatabaseConnection')

async function getAllUsers(){
    const client = await database.getConnection();

    client.collection('User').insertOne({
        _id: 1,
        Name: 'Guilherme Martin'
    })
}