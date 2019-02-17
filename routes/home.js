const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/' , (req , res , next ) => {
 const isAuth = req.session.isLoggedIn == true ? true : false ;
 res.render('shop/index' , {docTitle: 'Home' , path: '/' , isAuth : isAuth});
});

module.exports = router ;