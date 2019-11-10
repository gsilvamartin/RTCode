const mongoose = require('mongoose');
const uri = 'mongodb+srv://guilherme:41477188@clustermessage-pdepm.gcp.mongodb.net/rtcode?retryWrites=true&w=majority';

const getConnection = async function() {
    try {
        return await mongoose.connect(uri, { useNewUrlParser: true });
    } catch (ex) {
        console.log('banco ja aberto');
    }
};

module.exports = { getConnection };
