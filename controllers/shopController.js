//PRODUCT MODEL
const ProductModel = require('../models/productModel');

//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    ProductModel.fetchAll(products =>{
        res.render('shop/product-list' , {docTitle : 'Shop' , path: '/shop' , prods : products });
    });    
}

//CONTROLLER FUNCTION TO RENDER CART
exports.getCart = (req , res , next ) =>{
  res.render('shop/cart' , {docTitle: 'Cart' , path: '/cart'});
}

//CONTROLLER FUNCTION TO TAKE CART 
exports.postCart = (req , res , next) => {
    const productId = req.body.productId;
    console.log(productId);
    res.redirect('/');
}

//CONTROLLER FUNCTION TO RENDER CHECKOUT PAGE
exports.getCheckout = (req , res , next ) =>{
    res.render('shop/checkout' , {docTitle: 'Checkout' , path: '/checkout'});
}


//CONTROLLER FUNCTION TO RENDER PRODUCT DETAILS
exports.getProductDetails = (req , res , next ) =>{
    const productId = req.params.productId ;
    ProductModel.fetchById(productId , (product)=>{
        res.render('shop/product-details' , {docTitle: 'Product Details' , path: '/product-details' , product: product});
    });
   
}