 
 const mongoose = require('mongoose');
 const Schema = mongoose.Schema ;

 const UserSchema = new Schema({
    name : {
        type : String ,
        required : true
    },

    email : {
        type : String ,
        required : true 
    },

    cart : {
        item : [{
           prodId : {
               type : Schema.Types.ObjectId,
               ref : 'Product' ,
               required : true
           },

           qty : {
               type : Number ,
               required : true
           }
        }]
    }

 });


  //ADD PRODUCT TO THE CART
    UserSchema.methods.addToCart = function(productId){
        const productIndex = this.cart.item.findIndex(p => p.prodId.toString() === productId.toString()) ;
        let newQty = 1 ;
        const updatedCartItem = [...this.cart.item] ;

        if(productIndex >= 0){
           updatedCartItem[productIndex].qty = this.cart.item[productIndex].qty + 1 ;
        }
        else{
            updatedCartItem.push({prodId : productId , qty : newQty }) ;
        }

       const updatedCart = {
            item : updatedCartItem
        } ;

        this.cart = updatedCart ;
        return this.save();
    }


        //DELETING CART ITEM
       UserSchema.methods.deleteItemFromCart = function(prodId){
            const updatedCartItem = this.cart.item.filter(p => {
                return p.prodId.toString() !== prodId.toString();
            });
            this.cart.item = updatedCartItem ;
            return this.save() ;
        }




 module.exports =  mongoose.model('User' , UserSchema );





//     //RETURN ALL THE PRODUCTS IN CART WITH QUANTITY
//     getCart(){
//        const db = getDb();
//        const prodIds = this.cart.item.map(i => {
//            return i.prodId ;
//        }) ;

//       return db.collection('products').find({_id : {$in : prodIds}}).toArray()
//        .then(products => {
//         return products.map(p => {
//            return {...p , qty : this.cart.item.find(i => {
//                 return i.prodId.toString() === p._id.toString() ;
//            }).qty 
//           };
//         })
//        }) 
     
//     }


//     //DELETING CART ITEM
//     deleteItemFromCart(prodId){
//         const updatedCartItem = this.cart.item.filter(p => {
//             return p.prodId.toString() !== prodId.toString();
//         });
//         const db = getDb();
//         return db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)} , {$set : {cart :{item : updatedCartItem}}}) ;
//     }




//     //FIND USER BY ID
//     static findById(id){
//         const db = getDb();
//         return db.collection('users').findOne({ _id : new mongodb.ObjectId(id)}) ;
//     }


//     //FETCH ORDERS
//     fetchOrders(){
//        const db = getDb();
//        return db.collection('orders').find({'user._id' : new mongodb.ObjectId(this._id)}).toArray() ;
//     }


//     //ADD ORDER FROM CART
//     addOrder(){
//         let order ;
//         const d = new Date() ;
//         const date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() ;
//         const time = d.getHours() + ":" + d.getMinutes() ;
//        return this.getCart()
//         .then( products => {
//             order = {
//                 item : products ,
//                 date : date ,
//                 time : time ,
//                 user : {
//                     _id : new mongodb.ObjectId(this._id) ,
//                     name : this.name 
//                 }
//             }
//             const db = getDb();
//             return db.collection('orders').insertOne(order) ;

//         })
//         .then(result => {
//             const db= getDb();
//             this.cart.item = [] ;
//           return  db.collection('users').updateOne({_id : new mongodb.ObjectId(this._id)} , {$set : {cart : {item : []}}} );
//         })
//         .catch(err => {
//             console.log(err);
//         });
//     }

// }

// module.exports = UserModel ;