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
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});


const setProduct =  async (req, res) => {
  try {
    const {category,product,amount,quantity,unit} = req.body
    // console.log(req.body);
    // console.log(req.files.image);
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

let dataUrl = Buffer.from(req.files.image.data).toString('base64')

let url = `data:${req.files.image.mimetype};base64,${dataUrl}`

    let imageUpload = await  cloudinary.uploader.upload(url,{ folder: "glossaryProducts" })
    console.log(imageUpload);
    let data = await productSchema.create({
      category,
      product,
      amount,
      quantity,
      unit,
      dummyTotal:amount,
      image :imageUpload.secure_url,
      public_id: imageUpload.public_id,
      availableInStock : quantity,
    });
    if (data._id) {
      res.status(201).json({
        message: "Product added successfull",
      });
    } 
  } catch (error) {
    console.log(error.message);
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