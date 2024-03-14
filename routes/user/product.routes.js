const express = require('express');
const userProduct = express.Router();
const { getAllProduct, getProduct } = require('../../controller/User/product.controller');
const { uploadProduct } = require('../../helper/upload');

userProduct.get('/get-all-Product',getAllProduct);
userProduct.get('/get-Product',uploadProduct.any(),getProduct);

module.exports = userProduct;