const getDb = require('../util/database').getDb;

class ProductModel {
    constructor(title , price , image , description){
        this.title = title ;
        this.description = description ;
        this.price = price ;
        this.image = image;
    }

    save(){
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then( result => {
            console.log(result);
        })
        .catch();
    }
}

module.exports = ProductModel ;