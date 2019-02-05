const express = require('express') ;
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(adminRouter);

app.use(shopRouter);

app.use((req , res , next) => {
  res.status(404).send('<h1>Not Found</h1>');
});

app.listen(3000);
