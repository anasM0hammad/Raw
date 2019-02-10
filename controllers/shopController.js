//PRODUCT MODEL
const ProductModel = require('../models/productModel');

//CART MODEL
const CartModel = require('../models/cartModel');

//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    ProductModel.fetchAll(products =>{
        res.render('shop/product-list' , {docTitle : 'Shop' , path: '/shop' , prods : products });
    });    
}

//CONTROLLER FUNCTION TO RENDER CART
exports.getCart = (req , res , next ) =>{
 const cartProduct = [];
  CartModel.fetchCart((cart) =>{
    ProductModel.fetchAll(products => {
        for(product of products){
            const productData = cart.products.find(p=> p.productId === product.productId);
            if(productData){
                cartProduct.push({data : product , qty: productData.qty});
            }
        }

        res.render('shop/cart' , {docTitle: 'Cart' , path: '/cart' , prods: cartProduct , total: cart.total});
    }) ;
  }) ; 
 
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
    ProductModel.fetchById(productId , (product)=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('shop/product-details' , {docTitle: 'Product Details' , path: '/product-details' , product: product});
    });
   
}