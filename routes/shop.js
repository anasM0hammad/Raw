const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminRoutes = require('../routes/admin');

const router = express.Router() ;

router.get('/shop' , (req , res , next)=>{
     console.log('shop' , adminRoutes.products.title)
     res.render('shop' , {docTitle: 'Shop'});
});

module.exports = router ;