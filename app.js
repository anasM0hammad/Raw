const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');

// const adminRouter = require('./routes/admin');
// const shopRouter = require('./routes/shop');
// const homeRouter = require('./routes/home');
const notFoundRouter = require('./routes/404');


//const UserModel = require('./models/userModel') ;

const app = express();

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

// app.use((req , res , next ) => {
//   UserModel.findById('5c6567971c9d440000c308b8')
//   .then(user => {
//     req.user = new UserModel(user.name , user.email , user.cart, user._id) ;
//     next();
//   })
//   .catch(err =>{
//     console.log(err);
//   });
// });

// app.use(homeRouter);

// app.use(shopRouter);

// app.use('/admin' , adminRouter);

app.use(notFoundRouter);

mongoose.connect('mongodb+srv://anasM0hammad:dWqmd6zjdCD1mV4D@raw-bawen.mongodb.net/raw?retryWrites=true')
.then(result => {
  console.log('CONNECTED');
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})


//INITIALIZING TABLES IN DATABASE


