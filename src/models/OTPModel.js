const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    email: {type: String, required: true},
    otp:{type: Number, required:true },
    status:{type: Number, default: 0},
   

}, {timestamps:true,versionKey:false})







const OTPModel = mongoose.model("otps",dataSchema );

module.exports = OTPModel