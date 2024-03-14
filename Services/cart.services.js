const Cart = require('../model/cart.model');

module.exports = class cartServices {
    async addToCart(body) {
        try {
            return await Cart.create(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        }
    };

    async getCart(body) {
        try {
            return await Cart.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        }
    };

    async getAllCart(query,user) {
        try {
            let body = { isDelete: false };
            if (query.me === 'true') {
                body.user = user._id
            }
            let results = await Cart.find(body).populate('cartItem').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
            return results;
        } catch (error) {
            console.log(error);
            return res.json({ message: "Server Error from cart services" })
        }
    };

    async updateCart(id, body) {
        try {
            return await Cart.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        }
    };

    async updateManyCart(user, body) {
        try {
            return await Cart.updateMany({ user: user }, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error");
        }
    };
};