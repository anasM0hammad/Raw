const express = require('express') ;
const bodyParser = require('body-parser');

const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const homeRouter = require('./routes/home');
const notFoundRouter = require('./routes/404');

const ProductModel = require('./models/productModel');
const UserModel = require('./models/userModel');

const sequelize = require('./util/database');

const app = express();

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req , res , next) => {
  UserModel.findById(1)
  .then(user => {
    req.user = user ;
    next();
  })
  .catch();
});

app.use(homeRouter);

app.use(shopRouter);

app.use('/admin' , adminRouter);

app.use(notFoundRouter);

//DEFING RELATION
ProductModel.belongsTo(UserModel , {constraints : true , onDelete : 'CASCADE'}) ;
UserModel.hasMany(ProductModel);

//INITIALIZING TABLES IN DATABASE
sequelize.sync()
.then( res =>{
  return UserModel.findById(1) ; 
})
.then( user =>{
  if(!user){
   return UserModel.create({ name : 'Anas' , email : 'anas@gmail.com'});
  }
  return user ;
})
.then( user =>{
  app.listen(3000);
})
.catch( err =>{
    console.log(err);
});


