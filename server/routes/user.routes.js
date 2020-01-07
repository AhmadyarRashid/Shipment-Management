const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateAdmin } = require('../helpers/auth');

// routes
router.post('/login', userController.login);
router.post('/registerWorker', userController.registerWorker);
router.get('/getAllWorker', userController.getAllWorker);
router.post('/deleteWorker', userController.deleteWorker);

module.exports = router;