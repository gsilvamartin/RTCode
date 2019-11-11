const mongoose = require('mongoose');
const uri = 'mongodb+srv://XXXXX:XXXXXX@clustermessage-pdepm.gcp.mongodb.net/rtcode?retryWrites=true&w=majority';

const getConnection = async function() {
  try {
    return await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (ex) {
    throw ex;
  }
};

module.exports = { getConnection };
