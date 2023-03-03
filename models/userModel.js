const mongoose = require("mongoose");







// const addressSchema = new mongoose.Schema({
//     country:{
//         type : String,
//     },
//     firstName : {
//         type : String,
//     },
//     lastName : {
//         type : String,
//     },
//     address : {
//         type : String,
//     },
//     state : {
//         type : String,
//     },
//     city : {
//         type : String,
//     },
//     pinCode : {
//         type : Number,
//     },
//     mobile : {
//         type : Number,
//     },
// // type: [mongoose.Types.ObjectId],
// })


const user = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique : [true , "Email is allready exists"]},
        password: { type: String, required: true },
        isAdmin: {
            type: Boolean,
            default: false
        }, 
        address : {
            type : Array
        },
        mobile : {
            type : Number
        },
        image : {
            type : String,
            default :"https://res.cloudinary.com/dxkyqflgr/image/upload/v1677569293/profile/gm354elzluwisllrx8tn.png"
        },
        public_id : {
            type : String,
            default : 'none'
        },
        createdAt: { type: Date, default: Date.now }

    },
    // { timestamps: true }
);

const UserSchema = mongoose.model("Users", user);
module.exports = UserSchema