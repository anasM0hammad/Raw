const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

//ROUTE TO GET LOGIN PAGE
router.get('/login' , authController.getLogin);


module.exports = router ;