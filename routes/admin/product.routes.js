const express = require('express');
const Product = express.Router();
const { uploadProduct } = require('../../helper/upload');
const { adminVerifyToken } = require('../../helper/verifyToken');
const { addProduct, getProduct, getAllProduct, getAllProductAdmin, updateProduct, deleteProduct } = require('../../controller/Admin/product.controller');

Product.post('/add-Product',adminVerifyToken,uploadProduct.single('productImage'),addProduct);
Product.get('/get-Product',uploadProduct.any(),getProduct);
Product.get('/get-all-Product',getAllProduct);
Product.get('/get-all-admin-Product',adminVerifyToken,getAllProductAdmin);
Product.put('/update-Product',adminVerifyToken,uploadProduct.single('productImage'),updateProduct);
Product.delete('/delete-Product',adminVerifyToken,uploadProduct.any(),deleteProduct);

module.exports = Product;