const { getFailureResponse, getSuccessResponse } = require("../helpers/response");

// import schema
const user = require('../models/user');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;

    user.findOne({ email })
        .then(doc => {
            if (doc) {
                const match = doc.validatePassword(password);
                if (match) {
                    const tokenReponse = doc.toAuthJSON();

                    user.findOneAndUpdate({ _id: tokenReponse._id }, { $push: { token: tokenReponse.token } })
                        .then(doc1 => {
                            res.status(200).json(getSuccessResponse({ ...tokenReponse, role: doc.role }));
                        })
                        .catch(err => {
                            res.status(200).json(getFailureResponse('Please try again'));
                        });
                } else {
                    res.status(200).json(getFailureResponse('password are wrong'));
                }

            } else {
                res.status(200).json(getFailureResponse('email not exists'));
            }
        });
}

module.exports.registerWorker = async (req, res, next) => {

    const { name, phoneNo, email, password, city, address } = req.body;

    const finalUser = new user({ name, phoneNo, email, password, city, address });

    finalUser.setPassword(password);

    return finalUser.save()
        .then(() => {
            console.log('--- reg data ---', finalUser.toAuthJSON())
            res.json(req.body);
        });
}

module.exports.getAllWorker = (req, res, next) => {
    
    user.find({ role: 'worker' })
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('Some thing failed during fetch user data'));
        });
}

module.exports.deleteWorker = (req, res, next) => {
    console.log('--- delete user ---', req.body);
    user.findOneAndDelete({ _id: req.body.id })
        .then(doc => {
            if (!doc) {
                return res.status(404).send({
                    message: "Note not found with id " + req.body.id
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            return res.status(500).send({
                message: "Could not delete note with id "
            });
        });
}

