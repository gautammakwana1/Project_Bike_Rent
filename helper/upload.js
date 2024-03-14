const multer = require('multer');

const User = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'images/user');
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    },
});

exports.uploadUser = multer({storage:User});

const Product = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, 'images/product');
    },
    filename: function(req,file,cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    },
});

exports.uploadProduct = multer({storage:Product});