const express = require('express') ;
const bodyParser = require('body-parser');

const path = require('path');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const homeRouter = require('./routes/home');

const app = express();

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.use(homeRouter);

app.use(shopRouter);

app.use(adminRouter.routes);

app.use((req , res , next) => {
  res.status(404).send('<h1>Not Found</h1>');
});

app.listen(3000);
