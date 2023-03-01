const mongoose = require("mongoose");

const order = new mongoose.Schema(
    {
        userId :{
           type : mongoose.Schema.Types.ObjectId,
        },
        orderItems : {
            type : Array
        },
        address : {
            type : Object
        },
        paymentId : {
            type : String
        },
        amount : {
            type : Number
        },
        orderDate : {
             type : String,
        },
        paymentMode : {
            type : String,
        },
        isdelivery : {
            type : Boolean,
            default : false,
        },
        deliveryTime : {
            type : String,
            default : "5 minitus",
           
        },
        createdAt: { type: Date, default: Date.now }

    },
    // { timestamps: true }
);

const orderSchema = mongoose.model("orders", order);
module.exports = orderSchema