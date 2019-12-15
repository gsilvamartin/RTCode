const mongoose = require('mongoose');

let userCode = mongoose.Schema({
  Nickname: {
    type: 'String'
  },
  UserId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  CodeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Code',
    required: true
  }
});

module.exports = mongoose.model('UserCode', userCode, 'UserCode');
