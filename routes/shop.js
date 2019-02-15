const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const shopController = require('../controllers/shopController');

const router = express.Router() ;

//ROUTE TO GET SHOP PAGE
router.get('/shop', shopController.getProducts);

// //ROUTE TO GET CART
// router.get('/cart' , shopController.getCart);

// //ROUTE FOR POST CART REQUEST
// router.post('/cart' , shopController.postCart);


// //ROUTE TO DELETE AN ITEM IN CART
// router.get('/delete-cart/:productId' , shopController.getDeleteProductFromCart);


//ROUTE TO GET PRODUCT DETAILS
router.get('/product-details/:productId' , shopController.getProductDetails);

// //ROUTE TO GET ORDER PAGE
// router.get('/order' , shopController.getOrder);

// //ROUTE TO ADD CART TO ORDER
// router.post('/order' , shopController.postOrder) ;

module.exports = router ;