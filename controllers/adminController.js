
//PRODUCT MODEL
const Product = require('../models/productModel');


// CONTROLLER FUNCTION TO RENDER THE ADD PRODUCT VIEW PAGE
exports.getAddProduct = (req , res ,next) => {
    res.render('admin/add-product' , {docTitle : 'Add Product' , path: '/admin/add-product'});
}

//CONTROLLER FUNCTION TO TAKE THE ADD PRODUCT POST REQUEST
exports.postAddProduct = (req , res , next) => {
    const title = req.body.title ;
    const image = req.body.image ;
    const price = req.body.price ;
    const description = req.body.description ;
    
    const product = new Product({
        title : title ,
        image : image ,
        price : price ,
        description : description ,
        userId : req.user._id
    }) ;

    product.save()
    .then( result => {
       res.redirect('/shop');
    })
    .catch(err => {
        console.log(err);
    });

}


// CONTROLLER FUNCTION TO GET THE EDIT PRODUCT VIEW PAGE
exports.getEditProduct = (req , res ,next) => {
    const productId = req.params.productId;
    Product.findById(productId)
    .then( product => {
        if(!product){
            return res.redirect('/');
         }
         res.render('admin/edit-product' , {docTitle : 'Edit Product' , path: '/admin/edit-product' , product: product}); 
    })
    .catch(err =>{
        console.log(err);
    });
  
 }


// CONTROLLER FUNCTION TO TAKE POST REQUEST FOR EDITTING PRODUCT
 exports.postEditProduct = (req , res , next)=>{
     const title = req.body.title ;
     const price = req.body.price ;
     const image = req.body.image ;
     const description = req.body.description ;
     const productId = req.body.productId ;

     Product.findById(productId)
     .then(product => {
         product.title = title ;
         product.price = price ;
         product.image = image ;
         product.description = description ;

         return product.save();
     })
     .then(result =>{
         res.redirect('/shop');
     })
     .catch(err => {
         console.log(err);
     });

 }



  //CONTROLLER FUNCTION TO DELETE PRODUCT
  exports.deleteProduct = (req , res ,next)=>{
    const productId = req.params.productId ;
    Product.findByIdAndRemove(productId)
        .then( result => {
           res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        });
  }



// CONTROLLER FUNCTION TO GET ALL THE PRODUCTS PAGE
 exports.getProducts = (req , res ,next) => {
    Product.find()
       .then( products => {
        res.render('admin/products' , {docTitle : 'All Products' , path: '/admin/products' , prods : products})
        })
        .catch(err => {
          console.log(err);
       });
   
}