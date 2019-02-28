const express = require('express') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session) ;
const csrf = require('csurf');
const flash = require('connect-flash') ;
const multer = require('multer');
const helmet = require('helmet');
const compression = require('compression');

const path = require('path');

const csrfProtection = csrf();

 const adminRouter = require('./routes/admin');
 const shopRouter = require('./routes/shop');
 const homeRouter = require('./routes/home');
 const authRouter = require('./routes/auth');
 const notFoundRouter = require('./routes/404');
 const shopController = require('./controllers/shopController');


const User = require('./models/userModel') ;

const app = express();

app.set('view engine' , 'ejs');

const fileStorage = multer.diskStorage({
  destination : (req , file , cb) => {
    cb(null , 'public/images');
  },
  filename : (req , file , cb)=>{
    cb(null , file.originalname) ;
  }
}) ;

const fileFilter = (req , file , cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null , true);
  }
  else{
    cb(null , false);
  }
}

app.use(compression()) ;
app.use(helmet()) ;
app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage : fileStorage , fileFilter:fileFilter}).single('image'));

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
  if(req.session.isLoggedIn){
    User.findById(req.session.user._id)
    .then(user => {
      req.user = user ;
      next();
    })
    .catch(err => {
      console.log(err);
    });
  }else{
    next();
  }
});

app.post('/order' , shopController.postOrder);

app.use(csrfProtection);

app.use(flash());



app.use((req , res , next) => {
  res.locals.isAuth = req.session.isLoggedIn ;
  res.locals.csrfToken = req.csrfToken();
  next();
});


 app.use(homeRouter);
 app.use(shopRouter);
 app.use(authRouter);
 app.use('/admin' , adminRouter);
 app.use(notFoundRouter);


mongoose.connect(`mongodb+srv://anasM0hammad:dWqmd6zjdCD1mV4D@raw-bawen.mongodb.net/raw`)
.then(result => {
    app.listen(3000);
})
.catch(err => {
  console.log(err);
})

