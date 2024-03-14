require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const Secret_key = process.env.SECRET_KEY;

exports.adminVerifyToken = async (req, res, next) => {
    try {
        const authorized = req.headers['authorization'];
        if (typeof authorized !== 'undefined') {
            let token = authorized.split(" ")[1];
            // console.log("Token == ",token);
            const { adminID } = jwt.verify(token, Secret_key);
            req.admin = await User.findOne({ _id: adminID, isDelete: false, isAdmin: true });
            req.admin ? next() : res.json("Invalid User");
        } else {
            return res.json("Token is invalid OR Token is not found");
        };
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error From helper");
    };
};

exports.userVerifyToken = async (req, res, next) => {
    try {
        const authorized = req.headers['authorization'];
        if (typeof authorized !== 'undefined') {
            let token = authorized.split(" ")[1];
            // console.log("Token == ",token);
            const { userID } = jwt.verify(token, Secret_key);
            req.user = await User.findOne({ _id: userID, isDelete: false, isAdmin: false});
            req.user ? next() : res.json("Invalid User");
        } else {
            return res.json("Token is invalid OR Token is not found");
        };
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error From helper");
    };
};