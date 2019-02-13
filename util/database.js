const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient ;


const mongoConect = (cb) =>{
    MongoClient.connect('')
    .then(client => {
        console.log('CONNECTED');
        cb(client);
    })
    .catch();
}

module.exports = mongoConect ;
