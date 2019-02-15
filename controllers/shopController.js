//PRODUCT MODEL
const Product = require('../models/productModel');
const User = require('../models/userModel');


//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    Product.find()
        .then( products => {
           res.render('shop/product-list' , {docTitle : 'Shop' , path: '/shop' , prods : products})
        }).catch(err => {
            console.log(err);
       });
}



    //CONTROLLER FUNCTION TO RENDER CART 
      exports.getCart = (req , res , next) => {
        let total = 0 ;
        let products = [];
        req.user.populate('cart.item.prodId').execPopulate()
        .then(user => {
            products = user.cart.item ;
            for(product of products){
                total = total + (product.prodId.price * product.qty) ;
            }
            res.render('shop/cart' , {docTitle : 'Cart' , path : '/cart' , prods : products , total : total});
        })
        .catch(err => {
            console.log(err);
        }) ;

      }


//CONTROLLER FUNCTION TO TAKE CART 
exports.postCart = (req , res , next) => {
    const productId = req.body.productId;
    req.user.addToCart(productId)
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });

   
}


//CONTROLLER FUNCTION TO DELETE A PRODUCT FROM CART
exports.getDeleteProductFromCart = (req , res , next) => {
    const productId = req.params.productId ;
    req.user.deleteItemFromCart(productId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => {
        console.log(err);
    });
   
}


//CONTROLLER FUNCTION TO RENDER PRODUCT DETAILS
exports.getProductDetails = (req , res , next ) =>{
    const productId = req.params.productId ;
    Product.findById(productId).then(product =>{
        res.render('shop/product-details' , {docTitle: 'Product Details' , path: '/product-details' , product: product});
    }).catch();       
   
}



// //CONTROLLER FUNCTION TO GET ORDER PAGE
// exports.getOrder = (req , res , next ) => {
//     req.user.fetchOrders()
//     .then(orders => {
//         res.render('shop/order' , {docTitle : 'Orders' , path : '/order' , orders : orders}) ;
//     })
//    .catch(err => {
//        console.log(err);
//    })
// }


// exports.postOrder = (req , res , next) => {
//     req.user.addOrder()
//     .then(result => {
//         res.redirect('/order');
//     })
//     .catch(err => {
//         console.log(err);
//     })
// }