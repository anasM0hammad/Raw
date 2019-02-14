const mongodb = require('mongodb');

const getDb = require('../util/database').getDb ;

class UserModel {
 
    constructor(username , email , cart , id){
        this.name = username ;
        this.email = email;
        this.cart = cart ;
        this._id = id ;
    }

    //TO SAVE A USER
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this) ;
    }

    //ADD PRODUCT TO THE CART
    addToCart(productId){
        const productIndex = this.cart.item.findIndex(p => p.prodId.toString() === productId.toString()) ;
        let newQty = 1 ;
        const updatedCartItem = [...this.cart.item] ;


        if(productIndex >= 0){
           updatedCartItem[productIndex].qty = this.cart.item[productIndex].qty + 1 ;
        }
        else{
            updatedCartItem.push({prodId : new mongodb.ObjectId(productId) , qty : newQty}) ;
        }

       const updatedCart = {
            item : updatedCartItem 
        } ;

        const db = getDb();
       return db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)} , {$set: {cart : updatedCart}}) ;

    }


    //GET CART 
    getCart(){
       return this.cart ;
    }

    //FIND USER BY ID
    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({ _id : new mongodb.ObjectId(id)}) ;
    }

}

module.exports = UserModel ;