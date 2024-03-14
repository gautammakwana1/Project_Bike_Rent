const productServices = require('../../Services/product.services');
const ProductService = new productServices();

exports.getProduct = async (req,res)=>{
    try {
        let product = await ProductService.getProduct({_id:req.body.productID, isDelete: false});
        if (!product) {
            return res.json("Product is not found.Please try again");
        };
        return res.json({PRODUCT: product});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAllProduct = async (req,res)=>{
    try {
        let product = await ProductService.getAllProduct({isDelete: false});
        if (!product) {
            return res.json("Product is not found.Please try again");
        };
        return res.json({PRODUCTS:product});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};