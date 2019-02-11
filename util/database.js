const Sequelize = require('sequelize');

const sequelize = new Sequelize('raw' , 'root' , '' ,  {dialect : 'mysql' , host : 'localhost'}) ;

module.exports = sequelize ;