var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

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
        required: [true, 'password address is required']
    }
});

// userSchema.methods.setPassword = function (password) {
//     this.salt = crypto.randomBytes(16).toString('hex');
//     this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };

// userSchema.methods.validatePassword = function (password) {
//     const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     return this.hash === hash;
// };

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