const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/' , (req , res , next ) => {
 res.render('shop/index' , {docTitle: 'Home' , path: '/'});
});

module.exports = router ;