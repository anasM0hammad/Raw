const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

//PRODUCT MODEL
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel') ;


//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    
    Product.find()
        .then( products => {
           res.render('shop/product-list' , {docTitle : 'Shop' , path: '/shop' , prods : products })
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
            res.render('shop/cart' , {docTitle : 'Cart' , path : '/cart' , prods : products , total : total });
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
        res.render('shop/product-details' , {docTitle: 'Product Details' , path: '/product-details' , product: product });
    }).catch();       
   
}



//CONTROLLER FUNCTION TO GET ORDER PAGE
exports.getOrder = (req , res , next ) => {
    
    req.user.fetchOrders()
    .then(orders => {
        res.render('shop/order' , {docTitle : 'Orders' , path : '/order' , orders : orders }) ;
    })
   .catch(err => {
       console.log(err);
   })
}


exports.postOrder = (req , res , next) => {
    const d = new Date();
    let products ;
    const date = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear() ;
    const time = d.getHours() + ":" + d.getMinutes()  ;
    req.user.populate('cart.item.prodId').execPopulate()
    .then(user => {
        products = user.cart.item.map(i => {
            return {qty : i.qty , data : {...i.prodId._doc }}  ;
        });
         const order = new Order({
            products : products,
            time : time ,
            date : date ,
            user : {
                userId : req.user,
                name : req.user.name
            }
        });

        return order.save() ;
    })
    .then(result => {
        req.user.cart.item  = [];
        return req.user.save();
    })
    .then(result => {
        res.redirect('/order');
    })
    .catch(err => {
        console.log(err);
    });
}



//GET THE INVOICE
exports.getInvoice = (req , res , next) => {
    const orderId = req.params.orderId ;
    const invoiceName = "invoice-" + orderId + ".pdf" ;

    const filePath = path.join(rootDir , 'data' , 'invoice' , invoiceName) ;
    
    fs.readFile(filePath, (err , fileContent) => {
        if(err){
            return res.redirect('/');
        }
        res.setHeader('content-Type' , 'application-pdf') ;
        res.setHeader('content-Disposition' , 'attachment; filename= "'+invoiceName+'" ') ;
        res.send(fileContent);
    }) ;
}