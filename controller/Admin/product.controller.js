const productServices = require('../../Services/product.services');
const ProductService = new productServices();

exports.addProduct = async (req,res) =>{
    try {
        let product = await ProductService.getProduct({numberPlate:req.body.numberPlate, isDelete: false});
        if (product) {
            return res.json("Product is already exist.Please Enter different");
        };
        if (req.file) {
            req.body.productImage = req.file.path.replace(/\\/g,'/');
        };
        product = await ProductService.addNewProduct({...req.body,admin:req.admin._id });
        return res.json({PRODUCT:product,MESSAGE:"Product is added succesfully"}); 
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getProduct = async (req,res)=>{
    try {
        let product = await ProductService.getProduct({_id: req.body.productID, isDelete: false});
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

exports.getAllProductAdmin = async (req,res)=>{
    try {
        let product = await ProductService.getAllProduct({admin:req.admin._id,isDelete: false});
        if (!product) {
            return res.json("Product is not found.Please try again");
        };
        return res.json({PRODUCTS: product});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.updateProduct = async (req,res)=>{
    try {
        let product = await ProductService.getProduct({admin:req.admin._id,_id:req.body.productID,isDelete:false});
        if (!product) {
            return res.json("Product is not found OR you are not authorized");
        };
        if (req.file) {
            req.body.productImage = req.file.path.replace(/\\/g,'/');
        };
        product = await ProductService.updateProduct(req.body.productID,{...req.body});
        return res.json({PRODUCT:product,MESSAGE: "Product is updated succesfully"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.deleteProduct = async (req,res)=>{
    try {
        let product = await ProductService.getProduct({admin:req.admin._id,_id:req.body.productID,isDelete:false});
        if (!product) {
            return res.json("Product is not found OR you are not authorized");
        };
        product = await ProductService.updateProduct(req.body.productID,{isDelete: true});
        return res.json("Product is deleted succesfully");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};