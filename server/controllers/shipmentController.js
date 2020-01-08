const shipment = require('../models/ship');
const { getFailureResponse, getSuccessResponse } = require("../helpers/response");

module.exports.getAllShipments = (req, res, next) => {
    shipment.find({})
        .then(doc => {
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            res.status(200).json(getFailureResponse('error on getting shipments'));
        });
}

module.exports.addShipment = (req, res, next) => {
    const { name, description } = req.body;
    console.log('--add shipments ----', name, description);
    shipment.create({
        name,
        description
    }).then(doc => {
        console.log('----- saved ----', doc);
        res.status(200).json(getSuccessResponse(doc));
    }).catch(err => {
        console.log('---- err -----', err);
        res.status(200).json(getFailureResponse('error on add shipment'));
    });
}

module.exports.assignWorkers = (req, res, next) => {
    const { id, workerList } = req.body;
    console.log('assign worker ----', id, workerList);
    shipment.findOneAndUpdate({ _id: id }, { $set: { workers: workerList } })
        .then(doc => {
            console.log('---- updated ---', doc);
            res.status(200).json(getSuccessResponse(doc));
        })
        .catch(err => {
            console.log('---- error ---', err);
            res.status(200).json(getFailureResponse('error on update user list'))
        })
}

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

module.exports.updateShipmentStatus = (req, res, next) => {
    const { id, status } = req.body;

    const allActiveHandler = process._getActiveHandles();
    const isAnyRequestAvailable = allActiveHandler[3];
    // console.log('----- request in queue ----', isAnyRequestAvailable);
    // if(isAnyRequestAvailable){ // if any timer request in queue
    //     res.status(200).json(getFailureResponse('This shipment is already been requeted'));
    // }else{
        // timer request in queue
        shipment.findOne({_id : id, status: true})
        .then(doc => {
            if(doc == null){
                res.status(200).json(getFailureResponse('Shipment is already closed'));
            }else{
                const random = Math.floor(Math.random() * 60) + 1; // generate random number between 0-60
                console.log('----- random sec ----', random);
                setTimeout(() => {
                    shipment.findOneAndUpdate({ _id: id }, { $set: { status: status } })
                        .then(doc => {
                            res.status(200).json(getSuccessResponse(doc));
                        })
                        .catch(err => {
                            res.status(200).json(getFailureResponse('error on get shipment by user id'))
                        });
                }, random * 1000);
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(200).json(getFailureResponse('Shipment is already closed'));
        });
    // }
   
   
};