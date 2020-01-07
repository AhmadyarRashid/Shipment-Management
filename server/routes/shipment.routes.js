const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const { authenticateAdmin, authenticateWorker } = require('../helpers/auth');

router.get('/getAllShipments', authenticateAdmin, shipmentController.getAllShipments);
router.post('/addShipment', authenticateAdmin, shipmentController.addShipment);
router.post('/assignWorkers', authenticateAdmin, shipmentController.assignWorkers);
router.post('/deleteShipment', authenticateAdmin, shipmentController.deleteShipment);

router.get('/getAllShipmentsByUserId/:id', authenticateWorker, shipmentController.getAllShipmentsByUserId);
router.post('/updateShipmentStatus', authenticateWorker, shipmentController.updateShipmentStatus);

module.exports = router;