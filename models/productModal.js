const mongoose = require("mongoose")

const product = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim:true,
    },
    category:{
        type: String,
        required: true,
        trim:true,
    },
    rate:{
        type: Number,
        required: true,
        trim:true,
    },
    quantity:{
        type: Number,
        required: true,
        trim:true,
    },
    unit   : {
        type: String,
        required: true,
        trim:true,
    },
    image:{
        type: Object,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = mongoose.model("products", product);
module.exports = productSchema;
