const Sequelize = require('sequelize') ;

const sequelize = require('../util/database');

const ProductModel = sequelize.define('products' , {

    id: {
        type : Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    title: {
        type : Sequelize.STRING,
        allowNull : false
    },

    price: {
        type : Sequelize.DOUBLE,
        allowNull: false
    },

    description: {
        type : Sequelize.TEXT,
        allowNull: false
    },

    image: {
        type: Sequelize.TEXT,
        allowNull: false
    }


});

module.exports = ProductModel ;
  
  