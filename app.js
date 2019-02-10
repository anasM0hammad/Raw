const express = require('express') ;
const bodyParser = require('body-parser');

const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const homeRouter = require('./routes/home');
const notFoundRouter = require('./routes/404');

const db = require('./util/database');

const app = express();

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

db.execute('SELECT * FROM products')
.then((result) => {
    console.log(result);
})
.catch(err => {
    console.log(err);
});

app.use(homeRouter);

app.use(shopRouter);

app.use('/admin' , adminRouter);

app.use(notFoundRouter);

app.listen(3000);
