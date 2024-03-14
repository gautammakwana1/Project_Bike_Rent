const express = require('express');
const userOrder = express.Router();
const { createOrder, getOrder, getAllOrder, deleteOrder } = require('../../controller/User/order.controller');
const { userVerifyToken } = require('../../helper/verifyToken');
const { uploadUser } = require('../../helper/upload');

userOrder.post('/add-Order',userVerifyToken,createOrder);
userOrder.get('/get-Order',userVerifyToken,uploadUser.any(),getOrder);
userOrder.get('/get-all-Order',getAllOrder);
userOrder.delete('/delete-Order',userVerifyToken,uploadUser.any(),deleteOrder);


module.exports = userOrder;