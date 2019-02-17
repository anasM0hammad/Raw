const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session) ;

const path = require('path');

 const adminRouter = require('./routes/admin');
 const shopRouter = require('./routes/shop');
 const homeRouter = require('./routes/home');
 const authRouter = require('./routes/auth');
 const notFoundRouter = require('./routes/404');


const User = require('./models/userModel') ;

const app = express();

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

const store = new MongoDBStore({
  uri : 'mongodb+srv://anasM0hammad:dWqmd6zjdCD1mV4D@raw-bawen.mongodb.net/raw',
  collection : 'sessions'
});

app.use(session({
  secret : 'I dont Share My secret' ,
  resave : false ,
  saveUninitialized : false ,
  store : store
 }) 
);


app.use((req , res ,next) => {
  if(req.session.isAuthenticated){
    User.findById(req.session.user._id)
    .then(user => {
      req.user = user ;
      next();
    })
    .catch(err => {
      console.log(err);
    });
  }
  next();
});



 app.use(homeRouter);
 app.use(shopRouter);
 app.use(authRouter);
 app.use('/admin' , adminRouter);
 app.use(notFoundRouter);


mongoose.connect('mongodb+srv://anasM0hammad:dWqmd6zjdCD1mV4D@raw-bawen.mongodb.net/raw')
.then(result => {
    app.listen(3000);
})
.catch(err => {
  console.log(err);
})

