const express = require('express');
const User = express.Router();
const { userVerifyToken } = require('../../helper/verifyToken');
const { uploadUser } = require('../../helper/upload');
const { addNewUser, userLogin, getUser, updateUser, updatePassword, deleteUser } = require('../../controller/User/controller');

User.post('/add-User',uploadUser.single('profileImage'),addNewUser);
User.get('/log-in-User',uploadUser.any(),userLogin);
User.get('/get-User',userVerifyToken,uploadUser.any(),getUser);
User.put('/update-User',userVerifyToken,uploadUser.single('profileImage'),updateUser);
User.put('/update-password-User',userVerifyToken,uploadUser.any(),updatePassword);
User.delete('/delete-User',userVerifyToken,deleteUser);

module.exports = User;