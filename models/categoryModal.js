const mongoose = require("mongoose")

const Categorys = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: [true,'Already added'],
        trim:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
    }
});

const categorySchema = mongoose.model("categories", Categorys);
module.exports = categorySchema;
