const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

//ROUTE TO GET LOGIN PAGE
router.get('/login' , authController.getLogin);

//ROUTE FOR POST LOGIN REQUEST
router.post('/login' , authController.postLogin);

//ROUTE TO GET SIGNUP PAGE
router.get('/signup' , authController.getSignup) ;


module.exports = router ;