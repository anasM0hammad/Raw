const mongoose = require('mongoose') ;

const Schema = mongoose.Schema ;

const OrderSchema = new Schema({
    products : [
        {
            product : {type : Object , required : true },
            qty : {type : Number , required : true }
        }
    ],

    user : {
        userId : {type : Schema.Types.ObjectId , required : true , ref : 'User'},
        name : {type : String , required : true }
    }
}) ;

module.exports = mongoose.model('Order' , OrderSchema) ;