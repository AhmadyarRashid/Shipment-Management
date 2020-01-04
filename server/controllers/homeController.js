const db = require("../helpers/db");
const { getFailureResponse, getSuccessResponse } = require("../helpers/response");

module.exports.getAllDepartments = function (req, res, next) {
    try {
        db.executeQuery("Select * From departments")
            .then(rows => {
                return res.status(200).json(getSuccessResponse(rows));
            })
            .catch(err => {
                console.log(err);
                return res.status(200).json(getFailureResponse());
            });
    }
    catch (ex) {
        console.log(ex)
        res.status(200).json(getFailureResponse());
    }
};