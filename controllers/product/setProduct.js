const productSchema = require("../../models/productModal");
const cloudinary = require('cloudinary').v2;
// var multer = require("multer");
// var express = require("express");
// var multerGoogleStorage = require("multer-cloud-storage");
// var app = express();
const dotenv = require('dotenv')
dotenv.config()



// exports.uploadHandler = multer({
//   storage: multerGoogleStorage.storageEngine()
// });

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
  secure: true
});

const setProduct =  async (req, res) => {
  try {
    const {category,product,rate,quantity,unit} = req.body
    // console.log(req.body);
    // console.log(req.files.image.data);
    // console.log(req.files.image.data.toString('base64'));
// 
//     const data1 = {
//       fieldname: 'file',
//       originalname: req.files.image.name,
//       encoding: req.files.image.encoding,
//       mimetype: req.files.image.mimetype,
//       buffer: req.files.image.data,
//       size: req.files.image.size
// };

// var text = req.files.image.toString(req.files.image,'utf8')
// var obj = JSON.parse(text)
// console.log(obj);


    // let imageUpload = await  cloudinary.uploader.upload(req.file.path)
    // console.log(imageUpload.secure_url);
    let data = await productSchema.create({
      category,
      product,
      rate,
      quantity,
      unit,
      image : req.files.image,
    });
    if (data._id) {
      res.status(201).json({
        message: "Product added successfull",
      });
    } 
  } catch (error) {
    res.status(500).json({
      message: "Product added failled",
    });
  }
};

module.exports = setProduct;












// let binary = Buffer.from(req.files.image); //or Buffer.from(data, 'binary')
// let imgData = new Blob(binary.buffer, { type: 'application/octet-binary' });
// let link = URL.createObjectURL(imgData);
// console.log(link);


// data.toString('base64')