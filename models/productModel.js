const fs = require('fs');
const path = require('path');

const rootDir = require('../util/path');
const productFile = path.join(rootDir , 'data' , 'products.json');

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
        fs.readFile(productFile , (err , fileContent) => {
          if(!err){
             cb(JSON.parse(fileContent));
          }
          else{
              cb([]);
          }
        });
    }
}