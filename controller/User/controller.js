require('dotenv').config();
const userServices = require('../../Services/user.services');
const userservice = new userServices();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../../routes/admin/admin.routes');

const Secret_key = process.env.SECRET_KEY;

exports.addNewUser= async(req,res)=>{
    try {
        let user = await userservice.getUser({email:req.body.email,isDelete:false});
        if(user){
            return res.json({MESSAGE:"User is already register"});
        }
        if(req.file){
            req.body.profileImage= `${req.file.path}`.replace(/\\/g,'/');
        }
        let hashpasword = await bcrypt.hash(req.body.password,10);
        user = await userservice.addNewUser({...req.body,password:hashpasword});
        return res.json({USER:user,MESSAGE:"User create new  account."});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Internal Server Error"});
    };
};

exports.userLogin = async(req,res)=>{
    try {
        let user = await userservice.getUser({email:req.body.email,isDelete:false});
        if(!user){
            return res.json({MESSAGE:"User is not register"});
        }
        let comparePassword = await bcrypt.compare(req.body.password,user.password);
        if(!comparePassword){
            return res.json({MESSAGE:"Password is incorrect"});
        }
        let payLoad={
            userID : user._id
        };
        let token = jwt.sign(payLoad,Secret_key);
        return res.json({TOKEN:token,MESSAGE:"User login success."});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Internal Server Error"});
    };
};

exports.getUser = async (req,res) => {
    try {
        let user = req.user;
        return res.json(user);
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Internal Server Error"});
    };
};

exports.updateUser = async (req,res) => {
    try {
        let user = req.user;
        if(!user){
            return res.json({MESSAGE:"User in not found"});
        };
        if(req.file){
            req.body.profileImage= `${req.file.path}`.replace(/\\/g,'/');
        };
        user = await userservice.updateUser(user._id,{...req.body});
        return res.json({USER: user,MESSAGE:"User update profile success."});
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Internal Server Error"});
    };
};

exports.deleteUser = async(req,res)=>{
    try {
        let user = req.user;
        if(!user){
            return res.json({MESSAGE:"User in not found"});
        };
        user = await userservice.updateUser(user._id,{isDelete:true});
        return res.json("User succesfully deleted"); 
    } catch (error) {
        console.log(error);
        return res.json({MESSAGE:"Internal Server Error"});
    };
};

exports.updatePassword = async (req,res) => {
    try {
        let user = await userservice.getUserById(req.user._id);
        if (!user) {
            return res.json("User is not found");
        };
        let Old = req.body.OldPassword;
        let New = req.body.NewPassword;
        let Confirm = req.body.ConfirmPassword;
        let comparePass = await bcrypt.compare(Old,req.user.password);
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
        user = await userservice.updateUser(req.user._id,{password: hashPassword});
        return res.json("Password is changed succesfully");
    } catch (error) {
        console.log(error);
        return res.json("Internal Server Error");
    };
};