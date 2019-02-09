const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const productFile = path.join(rootDir , 'data' , 'products.json');

  //GET PRODUCTS FROM FILE
 const getProductsFromFile = (cb)=>{
    fs.readFile(productFile , (err , fileContent) => {
        if(!err){
         cb(JSON.parse(fileContent));
        }
        else{
         cb([]);
        }
    }); 
}


module.exports = class Product {
   
    constructor(title , image , price , description){
       this.title = title ;
       this.image = image ;
       this.price = price ;
       this.description = description ;
    }


   
    //METHOD TO SAVE THE PRODUCT IN PRODUCTS ARRAY
    save(){
      let products = [];  
      this.productId = Math.random().toString();
      fs.readFile(productFile , (err , fileContent) =>{
            if(!err){
                products = JSON.parse(fileContent);
                products.push(this);
            }

            fs.writeFile(productFile , JSON.stringify(products) , err =>{
                console.log(err);
            });
      });

    }

    //STATIC METHOD TO FETCH PRODUCTS ARRAY
    static fetchAll(cb){
       getProductsFromFile(cb);
    }


     //STATIC METHOD TO FETCH PRODUCT BY PRODUCT ID
   static fetchById(id , cb){
       getProductsFromFile(products =>{
        const product = products.find(p => p.productId === id);
        cb(product);
       });
   }
       

}

  
  