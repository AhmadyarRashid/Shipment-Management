var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema of shipment
var shipmentSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    status : {
        type: Boolean,
        default: true
    },
    created_at: {
        type: String,
        default: new Date()
    },
    workers: {
        type: Array,
        default : []
    }
});

module.exports = Shipments = mongoose.model('Shipments', shipmentSchema);