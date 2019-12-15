const mongoose = require('mongoose');

let codeSchema = mongoose.Schema({
  CodeName: {
    type: 'String'
  },
  IsActive: {
    type: 'Boolean'
  }
});

module.exports = mongoose.model('Code', codeSchema, 'Code');
