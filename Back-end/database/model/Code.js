const mongoose = require('mongoose');

let codeSchema = mongoose.Schema({
  CodeName: {
    type: 'String'
  },
  CodeLanguage: {
    type: 'String'
  },
  IsActive: {
    type: 'Boolean'
  },
  UserId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Code', codeSchema, 'Code');
