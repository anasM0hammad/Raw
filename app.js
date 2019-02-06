const express = require('express') ;
const bodyParser = require('body-parser');

const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const homeRouter = require('./routes/home');
const notFoundRouter = require('./routes/404');

const app = express();

app.set('view engine' , 'ejs');

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use(homeRouter);

app.use(shopRouter);

app.use(adminRouter.routes);

app.use(notFoundRouter);

app.listen(3000);
