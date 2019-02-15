const mongoose = require('mongoose');

const Schema = mongoose.Schema ;

const ProductSchema = new Schema({
    title : {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    image : {
        type : String,
        require : true 
    },

    description : {
        type : String,
        required : true 
    },

    userId : {
        type : Schema.Types.ObjectId ,
        ref : 'User',
        required : true 
    }

});

//NOW MY MODEL NAME -> PRODUCT
//MONGOOSE WILL CREATE A COLLECTION WITH NAME 'products'
module.exports = mongoose.model('Product' , ProductSchema) ;





// const getDb = require('../util/database').getDb;

// class ProductModel {
//     constructor(title , price , image , description , userId){
//         this.title = title ;
//         this.description = description ;
//         this.price = price ;
//         this.image = image;
//         this.userId = userId ;
//     }

//     //TO SAVE THE DATA
//     save(){
//         const db = getDb();
//         return db.collection('products').insertOne(this)
//         .then( result => {
//             console.log(result);
//         })
//         .catch();
//     }

//     //TO FETCH ALL THE PRODUCTS
//     static fetchAll(){
//         const db = getDb();
//         return db.collection('products').find().toArray()
//         .then(products => {
//             return products;
//         })
//         .catch() ;

//     }


//     //TO FETCH SINGLE PRODUCT
//     static findById(prodId){
//         const db = getDb();
//         return db.collection('products').find({ _id : new mongodb.ObjectId(prodId) })
//         .next()
//         .then(product => {
//             return product ;
//         })
//         .catch();
//     }


//     //TO EDIT PRODUCT
//     static updateProduct(prodId , product){
//         const db = getDb();
//         return db.collection('products').updateOne({ _id : new mongodb.ObjectId(prodId)} , {$set : product})
//         .then(result => {
           
//         })
//         .catch();
//     }


//     //TO DELETE A PRODUCT BY ID
//     static deleteById(prodId){
//         const db = getDb();
//         return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)})
//         .then(result => {

//         })
//         .catch(err => {

//         });
//     }

// }

// module.exports = ProductModel ;