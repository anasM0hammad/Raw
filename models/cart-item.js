const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const CartItemModel = sequelize.define('userItem' , {

id: {
    type : Sequelize.INTEGER,
    autoIncrement: true ,
    allowNull : false ,
    primaryKey : true 
},

qty : {
    type : Sequelize.INTEGER
}

});


module.exports = CartItemModel ;