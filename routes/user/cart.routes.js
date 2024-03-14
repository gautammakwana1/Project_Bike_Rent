const express = require('express');
const userCart = express.Router();
const { addToCart, getCart, updateCart, deleteCart } = require('../../controller/User/cart.controller');
const { uploadUser } = require('../../helper/upload');
const { userVerifyToken } = require('../../helper/verifyToken');

userCart.post('/add-Cart',userVerifyToken,uploadUser.any(),addToCart);
userCart.get('/get-Cart',userVerifyToken,getCart);
userCart.put('/update-Cart',userVerifyToken,uploadUser.any(),updateCart);
userCart.delete('/delete-Cart',userVerifyToken,uploadUser.any(),deleteCart);

module.exports = userCart;