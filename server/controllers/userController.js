const crypt = require("../helpers/crypt");
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const db = require("../helpers/db");
const { getFailureResponse, getSuccessResponse } = require("../helpers/response");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

module.exports.authenticate = function authenticate(req, res, next) {
    try {
        let { username, password } = req.body;

        const { errors, isValid } = validateLoginInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        db.executeQuery("SELECT * FROM users WHERE username = ?", [username])
            .then(rows => {
                if (rows.length > 0) {
                    crypt
                        .verifyHash(password, rows[0].password)
                        .then(status => {
                            if (status) {
                                const payload = {
                                    id: rows[0].user_id,
                                    firstName: rows[0].first_name,
                                    lastName: rows[0].last_name,
                                    username: rows[0].username//,
                                    //role: rows[0].role
                                };
                                // Sign token
                                jwt.sign(
                                    payload,
                                    config.jwt_secret,
                                    {
                                        expiresIn: 31556926 // 1 year in seconds
                                    },
                                    (err, token) => {
                                        logLastLogin(rows[0].user_id);
                                        res.json({
                                            isSuccess: true,
                                            token
                                        });
                                    }
                                );
                            } else {
                                res.status(200).json(getFailureResponse('Invalid username or password'));
                            }
                        })
                        .catch(err => {
                            res.status(200).json(getFailureResponse('Invalid username or password'));
                        });
                }
                else {
                    res.status(200).json(getFailureResponse('Invalid username or password'));
                }
            })
            .catch(err => {
                console.log('Error in UserController at authenticate function :');
                console.log(err);
                res.status(200).json(getFailureResponse('Network Error'));
            });
    }
    catch (ex) {
        console.log('Error in UserController at authenticate function :' + ex);
        res.status(200).json(getFailureResponse());
    }
}

module.exports.register = function register(req, res, next) {

    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    let { firstName, lastName, username, phone, password, department_id } = req.body;
    var ip = (req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress;
    db.executeQuery("SELECT * FROM users WHERE username = ?", [username])
        .then(rows => {
            if (rows.length > 0) {
                res.status(200).json(getFailureResponse("username already exists."));
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        db.executeQuery("INSERT INTO users (first_name, last_name, username,phone, password,department_id,ip_address) VALUES (?, ?, ?, ?, ?,?,?)",
                            [firstName, lastName, username, phone, hash, department_id, ip])
                            .then(rows => {
                                res.status(200).json(getSuccessResponse());
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(200).json(getFailureResponse());
                            });
                    });
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(200).json(getFailureResponse());
        });
};

module.exports.getAllUsers = function (req, res, next) {
    try {
        db.executeQuery("Select u.* , d.department_name from users u join departments d on u.department_id=d.department_id")
            .then(rows => {
                return res.status(200).json(getSuccessResponse(rows))
            })
            .catch(err => {
                console.log(err)
                return res.status(200).json(getFailureResponse());
            });
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json(getFailureResponse());
    }
};

module.exports.deActivateUser = function (req, res, next) {
    try {
        db.executeQuery("Update users set active=? where user_id=?", [false, req.params.id])
            .then(rows => {
                return res.status(200).json(getSuccessResponse())
            })
            .catch(err => {
                console.log(err)
                return res.status(200).json(getFailureResponse());
            });
    }
    catch (ex) {
        console.log(ex)
        res.status(400).json(getFailureResponse());
    }
};

function logLastLogin(user_id) {
    db.executeQuery("UPDATE users set user_last_login=? where user_id=?", [new Date(), user_id])
        .then(row => {

        })
        .catch(err => {
            console.log(err);
        })
}