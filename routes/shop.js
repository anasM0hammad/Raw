const path = require('path');

const express = require('express');


const rootDir = require('../util/path');
const shopController = require('../controllers/shopController');
const isAuth = require('../middleware/is-auth');

const router = express.Router() ;

//ROUTE TO GET SHOP PAGE
router.get('/shop', shopController.getProducts);

//ROUTE TO GET CART
router.get('/cart' , isAuth , shopController.getCart);

//ROUTE FOR POST CART REQUEST
router.post('/cart' , isAuth , shopController.postCart);

//ROUTE TO DELETE AN ITEM IN CART
router.get('/delete-cart/:productId' ,isAuth , shopController.getDeleteProductFromCart);

//ROUTE TO GET PRODUCT DETAILS
router.get('/product-details/:productId' , shopController.getProductDetails);

//ROUTE TO GET ORDER PAGE
router.get('/order' ,isAuth ,  shopController.getOrder);

//ROUTE TO ADD CART TO ORDER
router.post('/order' , isAuth , shopController.postOrder) ;

//ROUTE TO ACCESS INVOICE
router.get('/orders/:orderId' , isAuth , shopController.getInvoice);

module.exports = router ;