const path = require('path');

const express = require('express');

const router = express.Router();

const productController = require('../controllers/products');


//ROUTES FOR GETTING ADD PRODUCT PAGE
router.get('/add-product', productController.getAddProduct);

//ROUTE FOR ADD PRODUCT
router.post('/add-product' , productController.postAddProduct);

module.exports = router ;
