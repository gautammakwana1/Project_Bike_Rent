const User = require('../model/user.model');

module.exports = class userServices {
    async addNewUser(body) {
        try {
            return await User.create(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error from User Services");
        };
    };

    async getUser(body) {
        try {
            return await User.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error from User Services");
        };
    };

    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error from User Services");
        };
    };

    async getAllUser(body) {
        try {
            return await User.find(body);
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error from User Services");
        };
    };

    async updateUser(id, body) {
        try {
            return await User.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error from User Services");
        }
    };

    async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id, { new: true });
        } catch (error) {
            console.log(error);
            return res.json("Internal Server Error from User Services");
        }
    };
};