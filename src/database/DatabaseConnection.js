const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://guilherme:41477188@clustermessage-pdepm.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

async function connectDatabase(){
    try{
        await client.connect();
        return client;
    }catch(ex){
        return null;
    }
}

module.exports = {connectDatabase}