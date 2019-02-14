const path = require('path');

const express = require('express');

const router = express.Router();

const adminController = require('../controllers/adminController');


//ROUTE FOR GETTING ADD PRODUCT PAGE
router.get('/add-product', adminController.getAddProduct);

//ROUTE FOR ADD PRODUCT
router.post('/add-product' , adminController.postAddProduct);

//ROUTE FOR EDIT PRODUCT PAGE
router.get('/edit-product/:productId' , adminController.getEditProduct);

//ROUTE FOR POST REQ OF EDITTING PAGE
router.post('/edit-product' , adminController.postEditProduct);

//ROUTE FOR DELETING PRODUCT REQ
//router.get('/delete-product/:productId' , adminController.deleteProduct)

//ROUTE TO GET ADMIN PRODUCTS PAGE
router.get('/products' , adminController.getProducts);

module.exports = router ;
