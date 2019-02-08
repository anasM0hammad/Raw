
//PRODUCT MODEL
const ProductModel = require('../models/productModel');

// CONTROLLER FUNCTION TO RENDER THE ADD PRODUCT VIEW PAGE
exports.getAddProduct = (req , res ,next) => {
    res.render('add-product' , {docTitle : 'Add Product'});
}

//CONTROLLER FUNCTION TO TAKE THE ADD PRODUCT POST REQUEST
exports.postAddProduct = (req , res , next) => {
    const product = new ProductModel(req.body.product) ;
    product.save();
    res.redirect('/shop');
}


//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    ProductModel.fetchAll(products =>{
        res.render('shop' , {docTitle : 'Shop' , prods : products });
    });
    
}