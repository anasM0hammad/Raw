//PRODUCT MODEL
const ProductModel = require('../models/productModel');

//CART MODEL
const CartModel = require('../models/cartModel');

//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    ProductModel.findAll()
        .then( products => {
           res.render('shop/product-list' , {docTitle : 'Shop' , path: '/shop' , prods : products})
        }).catch(err => {
            console.log(err);
       });
}

//CONTROLLER FUNCTION TO RENDER CART
exports.getCart = (req , res , next ) =>{
  req.user.getCart()
  .then( cart => {
     return cart.getProducts();
  })
  .then(products => {
    res.render('shop/cart' , {docTitle: 'Cart' , path: '/cart' , prods: products , total: cart.total});
  })
  .catch();
 
}



//CONTROLLER FUNCTION TO TAKE CART 
exports.postCart = (req , res , next) => {
    const productId = req.body.productId;
    ProductModel.fetchById(productId , (product) => {
        if(!product){
           return res.redirect('/');
        }
        CartModel.addProduct(productId , product.price);
    });
    res.redirect('/');
}


//CONTROLLER FUNCTION TO DELETE A PRODUCT FROM CART
exports.getDeleteProductFromCart = (req , res , next) => {
    const productId = req.params.productId ;
    ProductModel.fetchById(productId , (product) => {
        CartModel.deleteProductFromCart(productId , product.price) ;
        res.redirect('/cart');
    })
   
}




//CONTROLLER FUNCTION TO RENDER CHECKOUT PAGE
exports.getCheckout = (req , res , next ) =>{
    res.render('shop/checkout' , {docTitle: 'Checkout' , path: '/checkout'});
}


//CONTROLLER FUNCTION TO RENDER PRODUCT DETAILS
exports.getProductDetails = (req , res , next ) =>{
    const productId = req.params.productId ;
    ProductModel.findById(productId).then(product =>{
        res.render('shop/product-details' , {docTitle: 'Product Details' , path: '/product-details' , product: product});
    }).catch(); 
       
   
}