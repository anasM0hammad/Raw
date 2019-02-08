
//PRODUCTS ARRAY
const products = [] ;

// CONTROLLER FUNCTION TO RENDER THE ADD PRODUCT VIEW PAGE
exports.getAddProduct = (req , res ,next) => {
    res.render('add-product' , {docTitle : 'Add Product'});
}

//CONTROLLER FUNCTION TO TAKE THE ADD PRODUCT POST REQUEST
exports.postAddProduct = (req , res , next) => {
    const product = req.body.product ;
    products.push({title : product}) ;
    res.redirect('/shop');
}


//CONTROLLER FUNCTION TO RENDER ALL PRODUCTS ON SHOP PAGE
exports.getProducts = (req , res , next) => {
    res.render('shop' , {docTitle : 'Shop' , prods : products });
}