const express = require('express');
const bodyParser =  require('body-parser');
const app = express();
const userResp = require('./repository/users');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/admin/authentication');
const productRouter = require('./routes/admin/products');
const userProduct = require('./routes/userProducts');
const cartsRouter = require('./routes/carts');
const testApi = require('./routes/testApi');
const cors = require('cors')

app.use(express.static('public')) 
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());
app.use(cookieSession({
    keys:['encryption']
}));

app.use(authRouter);
app.use(productRouter);
app.use(userProduct);
app.use(cartsRouter);

app.use(testApi);

app.listen('9000',()=>{
    console.log("listenning on 9000");
});