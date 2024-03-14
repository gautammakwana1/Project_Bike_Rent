const CartService = require('../../Services/cart.services');
const cartServices = new CartService();

exports.addToCart = async (req,res)=>{
    try {
        let cart = await cartServices.getCart({cartItem: req.body.cartItem, user: req.user._id,isDelete: false});
        // console.log(cart);
        if (cart) {
            return res.json({MESSAGE: "Cart Item already exist..."});
        };
        cart = await cartServices.addToCart({
            ...req.body, user: req.user._id, cartItem: req.body.cartItem
        });
        return res.json({CARTS:cart, MESSAGE: "New Item is added to the cart"});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from cart controller"});
    }
};

exports.getCart = async(req,res)=>{
    try {
        let cart = await cartServices.getAllCart(req.query, req.user);
        // console.log(cart);
        if (!cart) {
            return res.json({MESSAGE: "Cart Item is not found..Please try again"});
        };
        return res.json({CARTS: cart});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from cart controller"});
    }
};

exports.updateCart = async(req,res)=>{
    try {
        let cart = await cartServices.getCart({user: req.user._id, cartItem:req.body.cartItem, isDelete: false});
        // console.log(cart);
        if (!cart) {
            return res.json({MESSAGE: "Cart Item is not found..Please try again"});
        };
        cart = await cartServices.updateCart(cart._id,{...req.body});
        return res.json({CART:cart, MESSAGE: "Cart is updated succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from cart controller"});
    }
};

exports.deleteCart = async(req,res)=>{
    try {
        let cart = await cartServices.getCart({user: req.user._id, cartItem:req.body.cartItem, isDelete: false});
        if (!cart) {
            return res.json({MESSAGE: "Cart is not found..Please try again"});
        };
        cart = await cartServices.updateCart(cart._id,{isDelete: true});
        return res.json({MESSAGE: "Cart is deleted succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from cart controller"});
    }
};