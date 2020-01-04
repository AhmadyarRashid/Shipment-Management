var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var shipmentSchema = new Schema({
    _id: {
        type: String
    },
    status : {
        type: Boolean
    },
    created_at: {
        type: String
    },
    users: {
        type: Array,
        default : []
    }
});

module.exports = Shipments = mongoose.model('Shipments', shipmentSchema);