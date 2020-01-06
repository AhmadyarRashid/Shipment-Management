const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../helpers/auth');

// routes
router.post('/login', userController.authenticate);
// router.post('/register', userController.register);
// router.get('/getAllUsers', userController.getAllUsers);
// router.put('/deActivateUser/:id', userController.deActivateUser);

router.post('/registerWorker' , userController.registerWorker);
router.get('/getAllWorker', userController.getAllWorker);
router.post('/deleteWorker', userController.deleteWorker);

module.exports = router;