const mongodb = require('mongodb') ;

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


    //TO FETCH SINGLE PRODUCT
    static findById(prodId){
        const db = getDb();
        return db.collection('products').find({ _id : new mongodb.ObjectId(prodId) })
        .next()
        .then(product => {
            return product ;
        })
        .catch();
    }


    //TO EDIT PRODUCT
    static updateProduct(prodId , product){
        const db = getDb();
        return db.collection('products').updateOne({ _id : new mongodb.ObjectId(prodId)} , {$set : product})
        .then(result => {
           
        })
        .catch();
    }

}

module.exports = ProductModel ;