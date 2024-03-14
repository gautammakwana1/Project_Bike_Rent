const OrderServices = require('../../Services/order.services');
const orderService = new OrderServices();
const CartServices = require('../../Services/cart.services');
const cartService = new CartServices();

exports.createOrder = async (req,res)=>{
    try {
        let cart = await cartService.getAllCart(req.query,req.user);
        // console.log(cart);
        if (!cart) {
            return res.json({MESSAGE: "Cart is not found..Please try again"});
        };
        let orderItem = cart.map((item)=>({
            cartItem: item.cartItem._id,
            quantity: item.quantity,
            rent: item.cartItem.rent
        }));
        // console.log(orderItem);
        let totalPrice = orderItem.reduce((total,item)=>(total+= (item.quantity * item.rent)),0);
        // console.log(totalPrice);
        let newOrder = {
            user: req.user._id,
            items: orderItem,
            totalAmount:totalPrice 
        };
        // console.log(newOrder);
        let order = await orderService.addToOrder(newOrder);
        await cartService.updateManyCart(req.user._id,{isDelete: true});
        return res.json({ORDERS:order, MESSAGE: "Order Succesfully Done"});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from order user controller"});
    }
};

exports.getOrder = async (req,res)=>{
    try {
        let order = await orderService.getOrder({_id:req.body.orderID,user:req.user._id,isDelete: false});
        if (!order) {
            return res.json({MESSAGE: "Order is not found from this USER"});
        };
        return res.json({ORDERS:order});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from order user controller"});
    };
};

exports.getAllOrder = async (req,res)=>{
    try {
        let order = await orderService.getAllOrder({isDelete: false});
        if (!order) {
            return res.json({MESSAGE: "Order is not found..Please try again"});
        };
        return res.json({ORDERS: order});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE: "Server Error from order user controller"});
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        let order = await orderService.getOrder({user:req.user._id,_id:req.body.orderID,isDelete: false});
        // console.log(order);
        if (!order) {
            return res.json({ MESSAGE: "Order is not found..." });
        };
        order = await orderService.updateOrder(order._id, { isDelete: true });
        return res.json({MESSAGE: "Order is Deleted Sucessfuly" });
    } catch (error) {
        console.log(error);
        res.json({ MESSAGE: "Internal Server Error From DeleteOrder Controller" });
    }
};