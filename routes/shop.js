const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminRoutes = require('../routes/admin');

const router = express.Router() ;

router.get('/shop' , (req , res , next)=>{

    const products = adminRoutes.products;
     res.render('shop' , {docTitle: 'Shop' ,  prods: products});
});

module.exports = router ;