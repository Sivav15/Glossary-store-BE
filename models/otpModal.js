const mongoose = require('mongoose');

const otp = new mongoose.Schema({
    otp : {
        type : Number,
        require : true,
    },
    email : {
        type : String,
        require : true,
    }
})

const otpSchema = mongoose.model("otp",otp);
module.exports = otpSchema;