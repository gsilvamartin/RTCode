const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    _id: {
        $oid: {
            type: 'ObjectId'
        }
    },
    Email: {
        type: 'String'
    },
    Name: {
        type: 'String'
    },
    Image: {
        type: 'String'
    },
    Password: {
        type: 'String'
    }
});

module.exports = mongoose.model('User', userSchema, 'User');
