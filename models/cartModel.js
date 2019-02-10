const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const cartFile = path.join(rootDir , 'data' , 'cart.json');

module.exports = class Cart{
    
    static addProduct(id , price){
      
        fs.readFile(cartFile , (err , content) => {
            let cart = {products: [] , total: 0 };
        
            if(!err){
                cart = JSON.parse(content);
            }

            const existingProductIndex = cart.products.findIndex(p => p.productId === id) ;
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct ;

            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1 ;
                cart.products = [...cart.products] ;
                cart.products[existingProductIndex] = updatedProduct;
            }
            else{
                updatedProduct = {productId: id , qty : 1}
                cart.products = [...cart.products , updatedProduct] ;
            }

            cart.total = cart.total + +price ;

            fs.writeFile(cartFile , JSON.stringify(cart) , (err) =>{
                console.log(err);
            });

        });
        
    }

}