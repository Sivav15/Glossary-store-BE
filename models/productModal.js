const mongoose = require("mongoose")

const product = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        trim: true,
    },
    unit: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    sold: {
        type: Number,
        default: 0,
        trim: true,
    },
    availableInStock: {
        type: Number,
        default: 0,
        trim: true,
    },
    dummyQuantity: {
        type: Number,
        default: 1,
        trim: true,
    },
    dummyTotal: {
        type: Number,
        default: 0,
        trim: true,
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    },
    public_id:{
        type: String,
    }
});

const productSchema = mongoose.model("products", product);
module.exports = productSchema;
