const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { generateHash, verifyHash } = require('../helpers/crypt');

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
    role: {
        type: String,
        default: 'worker'
    },
    address: {
        type: String
    },
    salt : {
        type: String,
        default: '1800cc65036949f95199f60867127dcd'
    },
    email: {
        type: String,
        required: [true, 'email address is required']
    },
    password: {
        type: String,
        required: [true, 'email address is required']
    },
    token : {
        type: Array,
        default : []
    }
});

userSchema.methods.setPassword = function (password) {
    // this.salt = crypto.randomBytes(16).toString('hex');
    // console.log('salt----',this.salt);
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return hash == this.password;
};

userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

userSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = User = mongoose.model('users', userSchema);