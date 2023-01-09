const productSchema = require("../../models/productModal");
const cloudinary = require('cloudinary').v2;

const dotenv = require('dotenv')
dotenv.config()


cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
  secure: true
});

const setProduct = async (req, res) => {
  try {
    const {category,product,rate,quantity} = req.body
    console.log(req.body);
    console.log(req.file);
    let imageUpload = await  cloudinary.uploader.upload(req.file.path)
    console.log(imageUpload.secure_url);
    let data = await productSchema.create({
      category,
      product,
      rate,
      quantity,
      image : imageUpload.secure_url
    });
    if (data._id) {
      res.status(201).json({
        message: "Product added successfull",
      });
    } else {
      res.status(400).json({
        message: "Product added failled",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = setProduct;
