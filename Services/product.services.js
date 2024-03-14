const Product = require('../model/product.model');

module.exports = class productServices{
    async addNewProduct (body) {
        try {
            return await Product.create(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        };
    };

    async getProduct (body) {
        try {
            return await Product.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        };
    };

    async getProductById (id) {
        try {
            return await Product.findById(id);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        };
    };

    async getAllProduct (body) {
        try {
            return await Product.find(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        };
    };

    async updateProduct (id,body) {
        try {
            return await Product.findByIdAndUpdate(id,{$set:body},{new: true});
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        };
    };
};