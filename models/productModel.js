const products = [] ;

module.exports = class Product {
   
    constructor(title){
       this.title = title ;
    }
   
    //METHOD TO SAVE THE PRODUCT IN PRODUCTS ARRAY
    save(){
      products.push(this);
    }

    //STATIC METHOD TO FETCH PRODUCTS ARRAY
    static fetchAll(){
        return products
    }
}