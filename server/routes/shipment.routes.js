const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const auth = require('../helpers/auth');

router.get('/getAllShipments', shipmentController.getAllShipments);
router.post('/addShipment', shipmentController.addShipment);
router.post('/assignWorkers', shipmentController.assignWorkers);
router.post('/deleteShipment', shipmentController.deleteShipment);
router.get('/getAllShipmentsByUserId/:id', shipmentController.getAllShipmentsByUserId);
router.post('/updateShipmentStatus', shipmentController.updateShipmentStatus);

module.exports = router;