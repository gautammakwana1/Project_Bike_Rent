require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Admin = require('./routes/admin/admin.routes');
const User = require('./routes/user/user.routes');
const Product = require('./routes/admin/product.routes');
const userProduct = require('./routes/user/product.routes');
const userCart = require('./routes/user/cart.routes');
const userOrder = require('./routes/user/order.routes');

const port = process.env.PORT;
const dbUrl = process.env.MONGO_URL;

app.use(express.json());

app.use('/api/admin',Admin);
app.use('/api/admin/product',Product);

app.use('/api/user',User);
app.use('/api/user/product',userProduct);
app.use('/api/user/product/cart',userCart);
app.use('/api/user/product/cart/order',userOrder);

app.listen(port,()=>{
    mongoose.connect(dbUrl)
        .then(console.log("Database Connected"))
        .catch(err => console.log(err));
    console.log("Server is live now...");
});
