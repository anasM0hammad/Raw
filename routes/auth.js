const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController.js');

//ROUTE TO GET LOGIN PAGE
router.get('/login' , authController.getLogin);

//ROUTE FOR POST LOGIN REQUEST
router.post('/login' , authController.postLogin);

//ROUTE TO GET SIGNUP PAGE
router.get('/signup' , authController.getSignup) ;

//ROUTE FOR POST SIGNUP
router.post('/signup' , authController.postSignup) ;

//ROUTE FOR LOGOUT 
router.get('/logout' , authController.getLogout) ;

//ROUTE TO GET RESET PAGE
router.get('/reset' , authController.getReset) ;

//ROUTE TO POST RESET PAGE
router.post('/reset' , authController.postReset) ;

//ROUTE FOR POST RESET PAGE
//router.get('/reset/:token' , authController.postReset) ;

module.exports = router ;