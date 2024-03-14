const express = require('express');
const Admin = express.Router();
const { adminVerifyToken } = require('../../helper/verifyToken');
const { uploadUser } = require('../../helper/upload');
const { registerAdmin, getAllAdmin, getAdmin, updateAdmin, deleteAdmin, deleteAdminPer, loginAdmin, updatePassAdmin, getAllUser } = require('../../controller/Admin/admin.controller');

Admin.post('/add-Admin',uploadUser.single('profileImage'),registerAdmin);
Admin.get('/login-Admin',uploadUser.any(),loginAdmin);
Admin.get('/get-all-Admin',getAllAdmin);
Admin.get('/get-Admin',adminVerifyToken,getAdmin);
Admin.put('/update-Admin',adminVerifyToken,uploadUser.single('profileImage'),updateAdmin);
Admin.put('/update-pass-Admin',adminVerifyToken,uploadUser.any(),updatePassAdmin);
Admin.delete('/delete-Admin',adminVerifyToken,deleteAdmin);
Admin.delete('/delete-Per-Admin',adminVerifyToken,deleteAdminPer);
Admin.get('/get-all-users-Admin',getAllUser);

module.exports = Admin;