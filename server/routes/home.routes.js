const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const auth = require('../helpers/auth');

router.get('/getAllDepartments', auth.authorize(), homeController.getAllDepartments);

module.exports = router;