const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminRoutes = require('../routes/admin');

const router = express.Router() ;

router.get('/shop' , (req , res , next)=>{
     console.log('shop' , adminRoutes.products)
     res.sendFile(path.join(rootDir , 'views' , 'shop.html'));
});

module.exports = router ;