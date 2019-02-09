const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const shopController = require('../controllers/shopController');

const router = express.Router() ;

router.get('/shop', shopController.getProducts);

router.get('/cart' , shopController.getCart);

router.get('/checkout' , shopController.getCheckout);

router.get('/product-details' , shopController.getProductDetails);

module.exports = router ;