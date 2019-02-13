const getDb = require('../util/database').getDb;

class ProductModel {
    constructor(title , price , image , description){
        this.title = title ;
        this.description = description ;
        this.price = price ;
        this.image = image;
    }

    //TO SAVE THE DATA
    save(){
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then( result => {
            console.log(result);
        })
        .catch();
    }

    //TO FETCH ALL THE PRODUCTS
    static fetchAll(){
        const db = getDb();
        return db.collection('products').find().toArray()
        .then(products => {
            return products;
        })
        .catch() ;

    }

}

module.exports = ProductModel ;