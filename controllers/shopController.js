const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const pdfkit = require('pdfkit');

const ITEMS_PER_PAGE = 6 ;

//PRODUCT MODEL
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel') ;


//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    let page = +req.query.page || 1 ;
    let lastPage ;
    let hasNextPage = true ;
    let hasPreviousPage = true ;
    Product.countDocuments()
    .then(number => {
        lastPage = Math.ceil(number/ITEMS_PER_PAGE) ;
        page > lastPage ? page = lastPage : page = page ;
        lastPage == page ? hasNextPage = false : hasNextPage = true ; 
        page == 1 ? hasPreviousPage = false : hasPreviousPage = true ;
        return Product.find().skip((page-1)*ITEMS_PER_PAGE).limit(ITEMS_PER_PAGE) ;
    })
    .then( products => {
        res.render('shop/product-list' , {docTitle : 'Shop' , path: '/shop' , prods : products, curPage : page , lastPage : lastPage , hasPreviousPage : hasPreviousPage , hasNextPage : hasNextPage })
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
        res.redirect('/cart');
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
    Product.findById(productId)
    .then(product =>{
      return product.populate('userId').execPopulate() ;
    })
    .then(product => {
        const username = product.userId.name ;
        const email = product.userId.email ;
        res.render('shop/product-details' , {docTitle: 'Product Details' , path: '/product-details' , product: product , username : username , email : email });
    })
    .catch(err => {
        console.log(err);
    });       
   
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
    Order.findById(orderId)
    .then(order => {
        if(!order){
            return res.redirect('/');
        }

        if(order.user.userId.toString() !== req.user._id.toString()){
            return res.redirect('/');
        }
        let total = 0;
        let i =1 ;
        const filePath = path.join(rootDir , 'data' , 'invoice' , invoiceName) ;
        const doc = new pdfkit() ;

        res.setHeader('content-Type' , 'application-pdf') ;
        res.setHeader('content-Disposition' , 'attachment; filename= "'+invoiceName+'" ') ;

        doc.pipe(fs.createWriteStream(filePath));
        doc.pipe(res);
        doc.fontSize(26).text('Invoice' , {underline : true}) ;
        doc.fontSize(14).text(' ') ;
        doc.text('-------------------------------------------------------------------') ;
        doc.text(' ');
        order.products.forEach(prod => {
            doc.text(i + ') Item Title : ' + prod.data.title + '       -   Quantity : ' + prod.qty ) ;
            doc.text('    Price :  Rs ' + prod.data.price + ' /-');
            doc.text(' ');
            doc.text(' ');

            total = total + (prod.qty * prod.data.price) ; 
            i++;
        }) ;

         doc.text(' ');
         doc.text(' ');
         doc.text('------------------------------------------------------------------');
         doc.text(' ');
         doc.fontSize(14).text('Order Placed On : ' + order.date + '   ' + order.time) ;
         doc.text('Order will be in 2 - 3 days after placed');
         doc.text(' ');
         doc.fontSize(18).text('Order Total :   Rs ' + total + '/-') ;
         doc.text(' ');
         doc.text('------------------------------------------------------------------');
         doc.fontSize(16).text('Invoice Generated by Ofiicial Raw online Shop Server');

         doc.end();


    })
    .catch(err => {
        console.log(err);
    });

}