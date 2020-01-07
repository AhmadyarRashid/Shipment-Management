const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateAdmin } = require('../helpers/auth');

// routes
router.post('/login', userController.login);
router.post('/registerWorker', authenticateAdmin, userController.registerWorker);
router.get('/getAllWorker', authenticateAdmin, userController.getAllWorker);
router.post('/deleteWorker', authenticateAdmin, userController.deleteWorker);
router.post('/logout' , userController.logout);

module.exports = router;