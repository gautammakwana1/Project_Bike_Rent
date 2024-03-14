require('dotenv').config();
const userServices = require('../../Services/user.services');
const UserService = new userServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Secret_key = process.env.SECRET_KEY;

exports.registerAdmin = async (req,res)=>{
    try {
        let admin = await UserService.getUser({email:req.body.email,isDelete: false});
        if (admin) {
            return res.json("User already registered.Please try to login");
        };
        if (req.file) {
            req.body.profileImage = req.file.path.replace('/\\/g','/');
        };
        let hashpassword = await bcrypt.hash(req.body.password, 10);
        admin = await UserService.addNewUser({...req.body, password: hashpassword, isAdmin: true});
        return res.json({ADMIN:admin,MESSAGE:"New User Registration successfully done"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.loginAdmin = async (req,res)=>{
    try {
        let admin = await UserService.getUser({email:req.body.email,isDelete: false,isAdmin: true});
        if (!admin) {
            return res.json("User is not found");
        };
        let comparePass = await bcrypt.compare(req.body.password,admin.password);
        if (!comparePass) {
            return res.json("Password is not matched");
        };
        let payLoad = {
            adminID : admin._id
        };
        let token = jwt.sign(payLoad,Secret_key);
        return res.json({TOKEN: token , MESSAGE: "Token succesfully generated"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAdmin = async (req,res)=>{
    try {
        let admin = req.admin;
        return res.json({USER: admin});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAllAdmin = async (req,res)=>{
    try {
        let admin = await UserService.getAllUser({isAdmin: true, isDelete: false});
        if (!admin) {
            return res.json("User is not found.Please try again");
        };
        return res.json({USERS: admin});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.updateAdmin = async (req,res)=>{
    try {
        let admin = await UserService.getUserById(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        if (req.file) {
            req.body.profileImage = req.file.path.replace("/\\/g","/");
        };
        admin = await UserService.updateUser(req.admin._id,{...req.body});
        return res.json({USER: admin,MESSAGE: "User is updated succesfully"});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.updatePassAdmin = async (req,res)=>{
    try {
        let admin = await UserService.getUserById(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        let Old = req.body.OldPassword;
        let New = req.body.NewPassword;
        let Confirm = req.body.ConfirmPassword;
        let comparePass = await bcrypt.compare(Old,req.admin.password);
        if (!Old) {
            return res.json("Old Password is not found");
        };
        if (!comparePass) {
            return res.json("Password is not match");
        };
        if (!New) {
            return res.json("New Password is not found");
        };
        if (!Confirm) {
            return res.json("Confirm Password is not found");
        };
        if (Old == New) {
            return res.json("Old & New Password is same,Please try different");
        };
        if (New !== Confirm) {
            return res.json("New & Confirm is not same,Please try again");
        };
        let hashPassword = await bcrypt.hash(Confirm,10);
        admin = await UserService.updateUser(req.admin._id,{password: hashPassword});
        return res.json("Password is changed succesfully");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.deleteAdmin = async (req,res)=>{
    try {
        let admin = await UserService.getUserById(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        admin = await UserService.updateUser(req.admin._id,{ isDelete: true});
        return res.json("User is deleted succesfully done.");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.deleteAdminPer = async (req,res)=>{
    try {
        let admin = await UserService.getUserById(req.admin._id);
        if (!admin) {
            return res.json("User is not found");
        };
        admin = await UserService.deleteUser(req.admin._id);
        return res.json("User is Permanently delted succesfully");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};

exports.getAllUser = async (req,res)=>{
    try {
        let admin = await UserService.getUser(req.admin._id);
        if (!admin) {
        return res.json("User is not found");
        };
        let users = await UserService.getAllUser({isAdmin: false, isDelete: false});
        if (!users) {
            return res.json("Users is not available...");
        };
        return res.json({USERS: users});
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    }
};