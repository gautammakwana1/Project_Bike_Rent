const mongoose = require('mongoose');

const Product = mongoose.Schema({
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    productImage:{
        type: String,
        required: true
    },
    bikeName:{
        type:String,
        required: true
    },
    numberPlate:{
        type:String,
        required: true,
        unique: true
    },
    rent:{
        type:Number,
        required: true
    },
    bikeBrand:{
        type:String
    },
    description:{
        type: String
    },
    category:[{
        type: String
    }],
    isDelete:{
        type:Boolean,
        default:false
    }
},{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('products',Product);