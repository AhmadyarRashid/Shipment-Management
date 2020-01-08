const shipment = require('../models/ship');
const { getFailureResponse, getSuccessResponse } = require("../helpers/response");
var shipLock = [];

// get all shipments data from db
module.exports.getAllShipments = (req, res, next) => {
    shipment.find({})
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('error on getting shipments'));
        });
}

// add new shipment into db
module.exports.addShipment = (req, res, next) => {
    const { name, description } = req.body;
    shipment.create({
        name,
        description
    }).then(doc => {
        res.status(200).json(getSuccessResponse(doc));
    }).catch(err => {
        res.status(200).json(getFailureResponse('error on add shipment'));
    });
}

// assign worker to specific shipment
module.exports.assignWorkers = (req, res, next) => {
    const { id, workerList } = req.body;
    shipment.findOneAndUpdate({ _id: id }, { $set: { workers: workerList } })
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('error on update user list'))
        })
}

// delete shipment by id
module.exports.deleteShipment = (req, res, next) => {
    const { id } = req.body;
    shipment.findByIdAndDelete(id)
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('error on delete shipment'))
        })
}

// get all shipment data of specific user
module.exports.getAllShipmentsByUserId = (req, res, next) => {
    const { id } = req.params;
    shipment.find({ status: true, 'workers': { $eq: id } })
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('error on get shipment by user id'))
        })
}

// update shipment status by assign worker
module.exports.updateShipmentStatus = (req, res, next) => {
    const { id, status } = req.body;

    /*Ensure that whenever the endpoint is hit the updateShipment function 
    is called at least once with the corresponding ID and status passed to it.*/
    const filterId = shipLock.filter(item => item == id);
    if (filterId.length > 0) {
        res.status(200).json(getFailureResponse('This shipment is already been requeted'));
    } else {
        shipLock.push(id);

        shipment.findOne({ _id: id, status: true })
            .then(doc => {
                if (doc == null) {
                    res.status(200).json(getFailureResponse('Shipment is already closed'));
                } else {

                    /* Whenever the function is called it will generate a random number between 1 and 60. 
                    The function will then wait for a number of seconds equal to the random number. 
                    After the timeout, the function will call the db to update the status of the shipment.*/
                    const random = Math.floor(Math.random() * 60) + 1; // generate random number between 0-60
                    setTimeout(() => {
                        shipment.findOneAndUpdate({ _id: id }, { $set: { status: status } })
                            .then(doc => {
                                res.status(200).json(getSuccessResponse(doc));
                            })
                            .catch(err => {
                                res.status(200).json(getFailureResponse('error on get shipment by user id'))
                            });

                        shipLock = shipLock.filter(item => item !== id);
                    }, random * 1000);
                }

            })
            .catch(err => {
                console.log(err);
                res.status(200).json(getFailureResponse('Shipment is already closed'));
            });
    }
};