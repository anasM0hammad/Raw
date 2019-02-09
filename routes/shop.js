const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const shopController = require('../controllers/shopController');

const router = express.Router() ;

//ROUTE TO GET SHOP PAGE
router.get('/shop', shopController.getProducts);

//ROUTE TO GET CART
router.get('/cart' , shopController.getCart);

//ROUTE FOR POST CART REQUEST
router.post('/cart' , shopController.postCart);

//ROUTE TO GET CHECKOUT
router.get('/checkout' , shopController.getCheckout);

//ROUTE TO GET PRODUCT DETAILS
router.get('/product-details/:productId' , shopController.getProductDetails);

module.exports = router ;