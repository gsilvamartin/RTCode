const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  Nickname: {
    type: 'String'
  },
  Email: {
    type: 'String'
  },
  Password: {
    type: 'String'
  },
  Image: {
    type: 'String'
  }
});

module.exports = mongoose.model('User', userSchema, 'User');
