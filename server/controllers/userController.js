const { getFailureResponse, getSuccessResponse } = require("../helpers/response");

// import schema
const user = require('../models/user');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// login controller to validate login credential after succeefully validate it will return token
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

// register new worker
module.exports.registerWorker = async (req, res, next) => {

    const { name, phoneNo, email, password, city, address } = req.body;
    const finalUser = new user({ name, phoneNo, email, password, city, address });

    // check if user is already exist or not
    user.findOne({email})
        .then(doc => {
            if(doc){ // email is already exists
                res.status(200).json(getFailureResponse('this email is already exists'));
            }else{ // no email exists 
                // calculate hash of password and store it
                finalUser.setPassword(password);
                // now register new user
                return finalUser.save()
                    .then(() => {
                        res.json(req.body);
                    });
            }
        });
}

// get all worker details
module.exports.getAllWorker = (req, res, next) => {

    user.find({ role: 'worker' })
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('Some thing failed during fetch user data'));
        });
}

// delete worker by worker id
module.exports.deleteWorker = (req, res, next) => {
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

// logout user and remove token from db
module.exports.logout = (req, res, next) => {
    const { id, token } = req.body;
    if(id && token){
        user.findOneAndUpdate({_id: id} , {$pop: {token: token}})
            .then(doc => {
                res.status(200).json(getSuccessResponse(doc));
            })
            .catch(err => {
                res.status(200).json(getFailureResponse('logout request failed'));
            });
    }
};