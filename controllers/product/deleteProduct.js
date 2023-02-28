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


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    let {public_id} = await productSchema.findById(id)
  let could =   await cloudinary.uploader.destroy(public_id);

   if(could.result == 'ok'){
    await productSchema.findByIdAndDelete(id)  
    
    res.status(200).json({
      message: "Product delete successfull",
    });
   }else{
    res.status.json({
      message: "Product delete failled",
    });
   }
    
  } catch (error) {
    res.status(500).json({
        message: "Product delete failled",
      });
  }
};

module.exports = deleteProduct;
