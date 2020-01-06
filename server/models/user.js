var mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String
    },
    phoneNo: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'email address is required']
    },
    password: {
        type: String,
        required: [true, 'email address is required']
    }
});

module.exports = User = mongoose.model('users', userSchema);