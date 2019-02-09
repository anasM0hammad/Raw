
//PRODUCT MODEL
const ProductModel = require('../models/productModel');

// CONTROLLER FUNCTION TO RENDER THE ADD PRODUCT VIEW PAGE
exports.getAddProduct = (req , res ,next) => {
    res.render('admin/add-product' , {docTitle : 'Add Product' , path: '/admin/add-product'});
}

//CONTROLLER FUNCTION TO TAKE THE ADD PRODUCT POST REQUEST
exports.postAddProduct = (req , res , next) => {
    const product = new ProductModel(req.body.product) ;
    product.save();
    res.redirect('/shop');
}

// CONTROLLER FUNCTION TO GET THE EDIT PRODUCT VIEW PAGE
exports.getEditProduct = (req , res ,next) => {
    res.render('admin/edit-product' , {docTitle : 'Edit Product' , path: '/admin/edit-product'});
}


// CONTROLLER FUNCTION TO GET ALL THE PRODUCTS PAGE
exports.getProducts = (req , res ,next) => {
    res.render('admin/products' , {docTitle : 'All Products' , path: '/admin/products'});
}