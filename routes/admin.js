const path = require('path');
const isAuth = require('../middleware/is-auth');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');


//ROUTE FOR GETTING ADD PRODUCT PAGE
router.get('/add-product',isAuth , adminController.getAddProduct);

//ROUTE FOR ADD PRODUCT
router.post('/add-product' ,isAuth , adminController.postAddProduct);

//ROUTE FOR EDIT PRODUCT PAGE
router.get('/edit-product/:productId' ,isAuth , adminController.getEditProduct);

//ROUTE FOR POST REQ OF EDITTING PAGE
router.post('/edit-product' ,isAuth , adminController.postEditProduct);

//ROUTE FOR DELETING PRODUCT REQ
router.get('/delete-product/:productId' ,isAuth , adminController.deleteProduct);

//ROUTE TO GET ADMIN PRODUCTS PAGE
router.get('/products' , isAuth , adminController.getProducts);

module.exports = router ;
