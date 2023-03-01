const productSchema = require("../../models/productModal");
const cloudinary = require('cloudinary').v2;
const imageToBase64 = require('image-to-base64');

const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});



const editProduct = async (req, res) => {
  try {
    const { category, product, amount, quantity, unit, id, public_id, changingQuantity } = req.body

    // get the product data in database
    let products = await productSchema.findById(id)


    let availableInStock = products.availableInStock
    if (changingQuantity != 0) {
      if (changingQuantity > 0) {
        req.body.quantity = Number(req.body.quantity) + Number(changingQuantity)
        availableInStock = products.availableInStock + Number(changingQuantity)
      } else {
        if (availableInStock >= Math.abs(changingQuantity) && availableInStock > 0) {
          req.body.quantity = Number(req.body.quantity) - Math.abs(Number(changingQuantity))
          availableInStock = products.availableInStock - Math.abs(Number(changingQuantity))
        }
      }
    }


    //Step : 1 get the image in frontend to image date, and convert to base 64 format
    let dataUrl = Buffer.from(req.files.image.data).toString('base64')

    // step : 2 get the image in datebase and convert to base 64 format 
    let img = await imageToBase64(products.image);


    //step : 3 compare the two image are same if go to if statement, or go to else statement
    let data;
    if (img == dataUrl) {
      data = await productSchema.findByIdAndUpdate(id, {
        category,
        product,
        amount,
        quantity: req.body.quantity,
        unit,
        image: product.image,
        public_id: products.public_id,
        dummyTotal: amount,
        availableInStock,
      });
      res.status(200).json({
        message: "Product edit successfull",
      });
    } else {
      let url = `data:${req.files.image.mimetype};base64,${dataUrl}`
      let imageUpload = await cloudinary.uploader.upload(url, { folder: "glossaryProducts" })
      cloudinary.uploader.destroy(public_id)
      data = await productSchema.findByIdAndUpdate(id, {
        category,
        product,
        amount,
        quantity: req.body.quantity,
        unit,
        image: imageUpload.secure_url,
        public_id: imageUpload.public_id,
        dummyTotal: amount,
        availableInStock,
      });
      res.status(200).json({
        message: "Product edit successfull",
      });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Product edit failled",
    });
  }
};

module.exports = editProduct;










