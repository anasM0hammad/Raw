const path = require('path');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

const products = [];

router.get('/add-product', (req , res , next) => {
  res.render('add-product' , {docTitle: 'Add Product'});
});


router.post('/add-product' , (req , res , next) => {
  products.push({ title : req.body.product }) ;
  res.redirect('/shop');
});

exports.routes = router ;
exports.products = products ;