const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient ;
let _db ;

const mongoConnect = (cb) =>{
    MongoClient.connect('mongodb+srv://anasM0hammad:dWqmd6zjdCD1mV4D@raw-bawen.mongodb.net/shop?retryWrites=true')
    .then(client => {
        console.log('CONNECTED');
        _db = client.db();
        cb();
    })
    .catch();
}

const getDb = () => {
    if(_db){
        return _db ;
    }
}

exports.mongoConnect = mongoConnect ;
exports.getDb = getDb ;