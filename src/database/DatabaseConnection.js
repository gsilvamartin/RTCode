const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://guilherme:41477188@clustermessage-pdepm.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

async function getConnection() {
    if (client.isConnected()) {
        return client.db('fastmessage');
    } else {
        var connection = await client.connect();
        return connection.db('fastmessage');
    }
}

module.exports = { getConnection }