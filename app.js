const express = require('express') ;
const bodyParser = require('body-parser');

const path = require('path');

 const adminRouter = require('./routes/admin');
//const shopRouter = require('./routes/shop');
const homeRouter = require('./routes/home');
const notFoundRouter = require('./routes/404');

const mongoConnect = require('./util/database').mongoConnect;
const userModel = require('./models/userModel') ;

const app = express();

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req , res , next ) => {
  userModel.findById('5c6567971c9d440000c308b8')
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err =>{
    console.log(err);
  });
});

app.use(homeRouter);

//app.use(shopRouter);

app.use('/admin' , adminRouter);

app.use(notFoundRouter);

mongoConnect(client => {
  app.listen(3000);
});


//INITIALIZING TABLES IN DATABASE


