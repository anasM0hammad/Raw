const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

app.use((req , res , next ) => {
  User.findById('5c671c9f14ac4009fcf8bc14')
  .then(user => {
    req.user = user ;
    next();
  })
  .catch(err =>{
    console.log(err);
  });
});

 app.use(homeRouter);
 app.use(shopRouter);
 app.use(authRouter);
 app.use('/admin' , adminRouter);
 app.use(notFoundRouter);

mongoose.connect('mongodb+srv://anasM0hammad:dWqmd6zjdCD1mV4D@raw-bawen.mongodb.net/raw?retryWrites=true')
.then(result => {
  User.findOne()
  .then(user => {
    if(!user){
      const user = new User({
        name : 'Anas',
        email : 'anas123@gmail.com',
        cart : {
          item : []
        }
      }) ;
      user.save() ;
    }
    app.listen(3000);
  }) ;
})
.catch(err => {
  console.log(err);
})


//INITIALIZING TABLES IN DATABASE


