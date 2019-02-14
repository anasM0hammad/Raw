const mongodb = require('mongodb');

const getDb = require('../util/database').getDb ;

class UserModel {
 
    constructor(username , email){
        this.name = username ;
        this.email = email
    }

    //TO SAVE A USER
    save(){
        const db = getDb();
        return db.collection('users').insertOne(this) ;
    }

    //FIND USER BY ID
    static findById(id){
        const db = getDb();
        return db.collection('users').findOne({ _id : new mongodb.ObjectId(id)}) ;
    }

}

module.exports = UserModel ;