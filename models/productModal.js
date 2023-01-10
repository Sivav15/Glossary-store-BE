const mongoose = require("mongoose")

const product = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    rate:{
        type: Number,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const productSchema = mongoose.model("products", product);
module.exports = productSchema;
